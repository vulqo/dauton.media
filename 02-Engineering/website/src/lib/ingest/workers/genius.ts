import { createClient } from '@supabase/supabase-js';
import type { Worker, QueueItem, WorkerResult } from '../_types';
import { geniusSearch, geniusGetSong, geniusGetArtist } from '../clients/genius';
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

async function resolveGeniusArtistByName(item: QueueItem): Promise<WorkerResult> {
  const supa = getServiceClient();
  const payload = item.payload as { person_id: string; stage_name: string };
  if (!payload.person_id || !payload.stage_name) {
    return { ok: false, error: 'Missing person_id or stage_name', retryable: false };
  }

  let hits;
  try {
    hits = await geniusSearch(`${payload.stage_name} rap`, 10);
    await recordSuccess('genius');
  } catch (e: any) {
    await recordFailure('genius');
    return { ok: false, error: e.message, retryable: true };
  }

  const normalizedInput = normalizeName(payload.stage_name);
  const match = hits.find(h => normalizeName(h.primary_artist.name) === normalizedInput);
  if (!match) return { ok: true, created: 0, updated: 0 };

  let artist;
  try {
    artist = await geniusGetArtist(match.primary_artist.id);
    await recordSuccess('genius');
  } catch (e: any) {
    await recordFailure('genius');
    return { ok: false, error: e.message, retryable: true };
  }

  if (!artist) return { ok: true, created: 0, updated: 0 };

  const { data: person } = await supa
    .from('people')
    .select('aliases, instagram_handle, twitter_handle')
    .eq('id', payload.person_id)
    .single();

  const updates: Record<string, any> = {
    genius_id: artist.id.toString(),
    updated_at: new Date().toISOString(),
  };

  if (!person?.instagram_handle && artist.instagram_name) updates.instagram_handle = artist.instagram_name;
  if (!person?.twitter_handle && artist.twitter_name) updates.twitter_handle = artist.twitter_name;

  if (artist.alternate_names && artist.alternate_names.length > 0) {
    const existing = person?.aliases ?? [];
    const merged = Array.from(new Set([...existing, ...artist.alternate_names]));
    updates.aliases = merged;
  }

  await supa.from('people').update(updates).eq('id', payload.person_id);

  return { ok: true, created: 0, updated: 1 };
}

async function fetchGeniusSongCredits(item: QueueItem): Promise<WorkerResult> {
  const supa = getServiceClient();
  const payload = item.payload as {
    track_id: string;
    genius_song_id?: number;
    title?: string;
    artist_name?: string;
  };
  if (!payload.track_id) {
    return { ok: false, error: 'Missing track_id', retryable: false };
  }

  let song;
  try {
    if (payload.genius_song_id) {
      song = await geniusGetSong(payload.genius_song_id);
    } else if (payload.title && payload.artist_name) {
      const hits = await geniusSearch(`${payload.title} ${payload.artist_name}`, 5);
      const normArtist = normalizeName(payload.artist_name);
      const match = hits.find(h => normalizeName(h.primary_artist.name) === normArtist);
      if (match) song = await geniusGetSong(match.id);
    }
    await recordSuccess('genius');
  } catch (e: any) {
    await recordFailure('genius');
    return { ok: false, error: e.message, retryable: true };
  }

  if (!song) return { ok: true, created: 0, updated: 0 };

  let creditsCreated = 0;

  const resolvePerson = async (artistId: number, artistName: string): Promise<string | null> => {
    const { data: existing } = await supa
      .from('people')
      .select('id')
      .eq('genius_id', artistId.toString())
      .maybeSingle();

    if (existing) return existing.id;

    const slug = `genius-${artistId}`;
    const { data: created } = await supa.from('people').insert({
      slug,
      stage_name: artistName,
      genius_id: artistId.toString(),
      is_peripheral: true,
      visibility: 'draft',
    }).select('id').single();

    return created?.id ?? null;
  };

  for (const p of song.producer_artists ?? []) {
    const personId = await resolvePerson(p.id, p.name);
    if (!personId) continue;
    try {
      await supa.from('production_credits').insert({ track_id: payload.track_id, person_id: personId, role: 'producer' });
      creditsCreated++;
    } catch {}
  }

  for (const w of song.writer_artists ?? []) {
    const personId = await resolvePerson(w.id, w.name);
    if (!personId) continue;
    try {
      await supa.from('writing_credits').insert({ track_id: payload.track_id, person_id: personId, role: 'writer' });
      creditsCreated++;
    } catch {}
  }

  for (const f of song.featured_artists ?? []) {
    const personId = await resolvePerson(f.id, f.name);
    if (!personId) continue;
    try {
      await supa.from('collaborations').insert({ track_id: payload.track_id, person_id: personId, role: 'feature' });
      creditsCreated++;
    } catch {}
  }

  await supa.from('tracks').update({
    genius_id: song.id.toString(),
    has_lyrics_external_link: song.url,
    updated_at: new Date().toISOString(),
  }).eq('id', payload.track_id);

  return { ok: true, created: creditsCreated, updated: 1 };
}

async function fetchGeniusSamples(item: QueueItem): Promise<WorkerResult> {
  const payload = item.payload as { genius_song_id: number };
  if (!payload.genius_song_id) return { ok: false, error: 'Missing genius_song_id', retryable: false };

  const supa = getServiceClient();

  let song;
  try {
    song = await geniusGetSong(payload.genius_song_id);
    await recordSuccess('genius');
  } catch (e: any) {
    await recordFailure('genius');
    return { ok: false, error: e.message, retryable: true };
  }

  if (!song) return { ok: true, created: 0, updated: 0 };

  const interesting = new Set(['samples', 'interpolates', 'cover_of']);
  const sourceRows: Array<{ source_type: string; title: string; url: string }> = [];

  for (const rel of song.song_relationships ?? []) {
    if (!interesting.has(rel.relationship_type)) continue;
    for (const s of rel.songs ?? []) {
      sourceRows.push({
        source_type: 'article',
        title: `Genius annotation: ${song.title} ${rel.relationship_type} ${s.primary_artist.name} — ${s.title}`,
        url: `https://genius.com/songs/${s.id}`,
      });
    }
  }

  let created = 0;
  for (const row of sourceRows) {
    try {
      await supa.from('sources').insert(row);
      created++;
    } catch {}
  }

  return { ok: true, created, updated: 0 };
}

export const geniusWorker: Worker = {
  source: 'genius',
  async execute(item: QueueItem): Promise<WorkerResult> {
    switch (item.operation) {
      case 'resolve_genius_artist_by_name':  return resolveGeniusArtistByName(item);
      case 'fetch_genius_song_credits':      return fetchGeniusSongCredits(item);
      case 'fetch_genius_samples':           return fetchGeniusSamples(item);
      default:
        return { ok: false, error: `unknown operation: ${item.operation}`, retryable: false };
    }
  },
};
