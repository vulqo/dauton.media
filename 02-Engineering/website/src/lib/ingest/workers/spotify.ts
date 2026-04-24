import { createClient } from '@supabase/supabase-js';
import type { Worker, QueueItem, WorkerResult } from '../_types';
import {
  getSpotifyArtist, searchSpotifyArtist, getRelatedArtists,
  getAllPlaylistTracks, RateLimitError
} from '../clients/spotify';
import { persistRawResponse } from '../_persist';
import { recordFailure, recordSuccess } from '../queue/rate-limit';

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function normalizeName(n: string): string {
  return n.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ').trim();
}

const HIP_HOP_GENRES = ['hip hop', 'rap', 'latin', 'venezuelan', 'urban', 'trap', 'reggaeton', 'boom bap'];
function isHipHopAdjacent(genres: string[]): boolean {
  const normalized = genres.map(g => g.toLowerCase());
  return normalized.some(g => HIP_HOP_GENRES.some(k => g.includes(k)));
}

// Spotify's Client Credentials flow returns 403 for playlist tracks even on
// public playlists (restriction enforced since 2023). We fall back to queuing
// search operations so Stage 1 can proceed without user-level OAuth.
const SEARCH_QUERIES_BY_PLAYLIST: Record<string, string[]> = {
  '5uuNL2vYlOv2qOHyLiG2Iq': ['rap venezolano', 'hip hop venezolano', 'Canserbero', 'Akapellah', 'Apache', 'Lil Supa', 'Neutro Shorty', 'Micro TDH', 'Rxnde Akozta'],
  '0432DFGQKxtcOI6HPvVvZ8': ['trap venezolano', 'drill venezolano', 'Cayro', 'Oldtape', 'Nerza', 'Jeiby', 'McKlopedia', 'Trainer', 'Lil Goofy'],
  '0dKEoagPfH7ieydlm3FStg': ['rap latino clasicos', 'latin hip hop clasico', 'Gabylonia'],
  '08DmBTpl9TxX3V407dzmwU': ['latin hip hop', 'rap en espanol'],
};

async function fetchPlaylistArtists(item: QueueItem): Promise<WorkerResult> {
  const supa = getServiceClient();
  const playlistId = item.payload.playlist_id as string;
  if (!playlistId) return { ok: false, error: 'Missing playlist_id', retryable: false };

  const artistIds = new Set<string>();
  const artistNames = new Map<string, string>();

  try {
    for await (const track of getAllPlaylistTracks(playlistId)) {
      for (const artist of track.artists) {
        artistIds.add(artist.id);
        artistNames.set(artist.id, artist.name);
      }
    }
    await recordSuccess('spotify');
  } catch (e: any) {
    if (e instanceof RateLimitError) {
      await recordFailure('spotify');
      return { ok: false, error: e.message, retryable: true };
    }

    // 403 Forbidden: Client Credentials cannot access playlist tracks.
    // Fall back to search-based discovery for this playlist.
    if (e.message.includes('403')) {
      const queries = SEARCH_QUERIES_BY_PLAYLIST[playlistId];
      if (!queries || queries.length === 0) {
        return { ok: false, error: `403 on playlist ${playlistId} and no fallback queries configured`, retryable: false };
      }

      const queueItems = queries.map(q => ({
        entity_type: 'person' as const,
        entity_ref: `search:${q}`,
        source: 'spotify',
        operation: 'search_artists_by_query',
        priority: 8,
        payload: { query: q, source_playlist: playlistId },
      }));

      for (let i = 0; i < queueItems.length; i += 50) {
        await supa.from('ingestion_queue').insert(queueItems.slice(i, i + 50));
      }

      return { ok: true, created: queueItems.length, updated: 0 };
    }

    return { ok: false, error: e.message, retryable: true };
  }

  // Check which spotify_ids already exist
  const ids = Array.from(artistIds);
  const { data: existing } = await supa
    .from('people')
    .select('spotify_id')
    .in('spotify_id', ids);

  const existingIds = new Set((existing ?? []).map((r: any) => r.spotify_id));
  const newIds = ids.filter(id => !existingIds.has(id));

  // Queue resolve for new artists
  if (newIds.length > 0) {
    const queueItems = newIds.map(spotifyId => ({
      entity_type: 'person' as const,
      entity_ref: spotifyId,
      source: 'spotify',
      operation: 'resolve_artist_by_name',
      priority: 6,
      payload: {
        spotify_id: spotifyId,
        spotify_name: artistNames.get(spotifyId) ?? '',
        source_playlist: playlistId,
      },
    }));

    // Insert in batches of 50
    for (let i = 0; i < queueItems.length; i += 50) {
      await supa.from('ingestion_queue').insert(queueItems.slice(i, i + 50));
    }
  }

  return { ok: true, created: newIds.length, updated: 0 };
}

async function searchArtistsByQuery(item: QueueItem): Promise<WorkerResult> {
  const supa = getServiceClient();
  const query = item.payload.query as string;
  if (!query) return { ok: false, error: 'Missing query', retryable: false };

  let artists;
  try {
    artists = await searchSpotifyArtist(query, 10);
    await recordSuccess('spotify');
  } catch (e: any) {
    if (e instanceof RateLimitError) await recordFailure('spotify');
    return { ok: false, error: e.message, retryable: true };
  }

  if (artists.length === 0) return { ok: true, created: 0, updated: 0 };

  const ids = artists.map(a => a.id);
  const { data: existing } = await supa
    .from('people')
    .select('spotify_id')
    .in('spotify_id', ids);

  const existingIds = new Set((existing ?? []).map((r: any) => r.spotify_id));
  const newOnes = artists.filter(a => !existingIds.has(a.id));

  if (newOnes.length > 0) {
    const queueItems = newOnes.map(a => ({
      entity_type: 'person' as const,
      entity_ref: a.id,
      source: 'spotify',
      operation: 'resolve_artist_by_name',
      priority: 6,
      payload: {
        spotify_id: a.id,
        spotify_name: a.name,
        source_query: query,
      },
    }));

    for (let i = 0; i < queueItems.length; i += 50) {
      await supa.from('ingestion_queue').insert(queueItems.slice(i, i + 50));
    }
  }

  return { ok: true, created: newOnes.length, updated: 0 };
}

async function resolveArtistByName(item: QueueItem): Promise<WorkerResult> {
  const supa = getServiceClient();
  const { spotify_id, spotify_name } = item.payload as { spotify_id: string; spotify_name: string };
  if (!spotify_id || !spotify_name) return { ok: false, error: 'Missing spotify_id or spotify_name', retryable: false };

  // Check if already resolved by spotify_id
  const { data: existingById } = await supa
    .from('people')
    .select('id, slug, stage_name, spotify_id')
    .eq('spotify_id', spotify_id)
    .single();

  if (existingById) {
    // Already resolved — just queue fetch_artist_details if needed
    await supa.from('ingestion_queue').insert({
      entity_type: 'person',
      entity_ref: existingById.id,
      source: 'spotify',
      operation: 'fetch_artist_details',
      priority: 7,
      payload: { spotify_id },
    });
    return { ok: true, created: 0, updated: 0 };
  }

  const normalizedInput = normalizeName(spotify_name);

  // Fuzzy match using pg_similarity
  const { data: candidates } = await supa.rpc('fuzzy_match_person', {
    p_name: normalizedInput,
    p_threshold: 0.5,
    p_limit: 5,
  }) as { data: Array<{ id: string; slug: string; stage_name: string; similarity: number }> | null };

  let personId: string | null = null;
  let isCreated = false;

  if (candidates && candidates.length > 0) {
    const top = candidates[0];
    if (top.similarity >= 0.9) {
      // High confidence match — update with spotify_id
      await supa.from('people').update({ spotify_id }).eq('id', top.id);
      personId = top.id;
    } else if (top.similarity >= 0.7) {
      // Ambiguous — create as review candidate
      const slug = `${spotify_id.slice(0, 8)}-${normalizedInput.replace(/\s+/g, '-').slice(0, 30)}`;
      const { data: created } = await supa.from('people').insert({
        slug,
        stage_name: spotify_name,
        spotify_id,
        visibility: 'review',
        is_peripheral: false,
      }).select('id').single();
      personId = created?.id ?? null;
      isCreated = true;
    }
  }

  if (!personId) {
    // No match — create as review
    const slug = `sp-${spotify_id.slice(0, 12)}`;
    const { data: created } = await supa.from('people').insert({
      slug,
      stage_name: spotify_name,
      spotify_id,
      visibility: 'review',
      is_peripheral: true,
    }).select('id').single();
    personId = created?.id ?? null;
    isCreated = true;
  }

  if (personId) {
    await supa.from('ingestion_queue').insert({
      entity_type: 'person',
      entity_ref: personId,
      source: 'spotify',
      operation: 'fetch_artist_details',
      priority: 7,
      payload: { spotify_id },
    });
  }

  return { ok: true, created: isCreated ? 1 : 0, updated: isCreated ? 0 : 1 };
}

async function fetchArtistDetails(item: QueueItem): Promise<WorkerResult> {
  const supa = getServiceClient();
  const spotifyId = (item.payload as any).spotify_id as string;
  if (!spotifyId) return { ok: false, error: 'Missing spotify_id', retryable: false };

  let artist;
  try {
    artist = await getSpotifyArtist(spotifyId);
    await persistRawResponse({ source: 'spotify', url: `/artists/${spotifyId}`, body: artist, queue_item_id: item.id });
    await recordSuccess('spotify');
  } catch (e: any) {
    await recordFailure('spotify');
    return { ok: false, error: e.message, retryable: !(e.message.includes('404')) };
  }

  // Find person by spotify_id
  const { data: person } = await supa
    .from('people')
    .select('id, stage_name, photo_url')
    .eq('spotify_id', spotifyId)
    .single();

  if (!person) return { ok: false, error: `No person found with spotify_id=${spotifyId} (race — retrying)`, retryable: true };

  // Spotify can return artist objects with missing fields on edge cases
  // (deleted/deactivated artists, regional restrictions). Guard all reads.
  const followers = artist.followers?.total ?? null;
  const popularity = typeof artist.popularity === 'number' ? artist.popularity : null;
  const images = Array.isArray(artist.images) ? artist.images : [];
  const genres = Array.isArray(artist.genres) ? artist.genres : [];

  // Update person
  const photoUrl = images[0]?.url ?? null;
  await supa.from('people').update({
    spotify_followers: followers,
    spotify_popularity: popularity,
    last_stats_sync_at: new Date().toISOString(),
    photo_url: person.photo_url ?? photoUrl, // don't overwrite existing photo
    updated_at: new Date().toISOString(),
  }).eq('id', person.id);

  // Insert entity_stats (skip if values are null)
  const statsRows: Array<{ entity_type: string; entity_id: string; source: string; metric: string; value: number }> = [];
  if (followers != null) statsRows.push({ entity_type: 'person', entity_id: person.id, source: 'spotify', metric: 'followers', value: followers });
  if (popularity != null) statsRows.push({ entity_type: 'person', entity_id: person.id, source: 'spotify', metric: 'popularity', value: popularity });
  if (statsRows.length > 0) await supa.from('entity_stats').insert(statsRows);

  // Genre matching (only exact matches in our genres table)
  if (genres.length > 0) {
    const normalizedGenres = genres.map(g => g.toLowerCase().replace(/\s+/g, '-'));
    const { data: matchedGenres } = await supa
      .from('genres')
      .select('id, slug')
      .in('slug', normalizedGenres);

    if (matchedGenres && matchedGenres.length > 0) {
      const genreInserts = matchedGenres.map(g => ({
        person_id: person.id,
        genre_id: g.id,
        is_primary: false,
      }));
      await supa.from('people_genres').upsert(genreInserts, { onConflict: 'person_id,genre_id', ignoreDuplicates: true });
    }
  }

  return { ok: true, created: 0, updated: 1 };
}

async function fetchRelatedArtists(item: QueueItem): Promise<WorkerResult> {
  const supa = getServiceClient();
  const spotifyId = (item.payload as any).spotify_id as string;
  if (!spotifyId) return { ok: false, error: 'Missing spotify_id', retryable: false };

  let related;
  try {
    related = await getRelatedArtists(spotifyId);
    await recordSuccess('spotify');
  } catch (e: any) {
    await recordFailure('spotify');
    return { ok: false, error: e.message, retryable: true };
  }

  // Filter to hip-hop adjacent only
  const filtered = related.filter(a => isHipHopAdjacent(a.genres)).slice(0, 10);

  if (filtered.length === 0) return { ok: true, created: 0, updated: 0 };

  // Check which already exist
  const ids = filtered.map(a => a.id);
  const { data: existing } = await supa
    .from('people')
    .select('spotify_id')
    .in('spotify_id', ids);

  const existingIds = new Set((existing ?? []).map((r: any) => r.spotify_id));
  const newOnes = filtered.filter(a => !existingIds.has(a.id));

  if (newOnes.length > 0) {
    const queueItems = newOnes.map(a => ({
      entity_type: 'person' as const,
      entity_ref: a.id,
      source: 'spotify',
      operation: 'resolve_artist_by_name',
      priority: 4,
      payload: {
        spotify_id: a.id,
        spotify_name: a.name,
        source: `related_of:${spotifyId}`,
      },
    }));
    await supa.from('ingestion_queue').insert(queueItems);
  }

  return { ok: true, created: newOnes.length, updated: 0 };
}

export const spotifyWorker: Worker = {
  source: 'spotify',
  async execute(item: QueueItem): Promise<WorkerResult> {
    switch (item.operation) {
      case 'fetch_playlist_artists':  return fetchPlaylistArtists(item);
      case 'search_artists_by_query': return searchArtistsByQuery(item);
      case 'resolve_artist_by_name':  return resolveArtistByName(item);
      case 'fetch_artist_details':    return fetchArtistDetails(item);
      case 'fetch_related_artists':   return fetchRelatedArtists(item);
      default:
        return { ok: false, error: `unknown operation: ${item.operation}`, retryable: false };
    }
  },
};
