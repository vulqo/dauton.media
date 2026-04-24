import { createClient } from '@supabase/supabase-js';
import type { Worker, QueueItem, WorkerResult } from '../_types';
import {
  mbGetArtist, mbGetReleaseGroup, mbGetRecording,
  mbResolveArtistByUrl, mbSearchArtist, MBRateLimitError, RELATION_MAP
} from '../clients/musicbrainz';
import { persistRawResponse } from '../_persist';
import { recordFailure, recordSuccess } from '../queue/rate-limit';

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

async function resolveMbidBySpotify(item: QueueItem): Promise<WorkerResult> {
  const supa = getServiceClient();
  const payload = item.payload as { person_id: string; spotify_id: string };
  if (!payload.person_id || !payload.spotify_id) {
    return { ok: false, error: 'Missing person_id or spotify_id', retryable: false };
  }

  const spotifyUrl = `https://open.spotify.com/artist/${payload.spotify_id}`;
  let mbid: string | null = null;

  try {
    const { mbid: resolvedMbid } = await mbResolveArtistByUrl(spotifyUrl);
    mbid = resolvedMbid;
    await recordSuccess('musicbrainz');
  } catch (e: any) {
    if (e instanceof MBRateLimitError) await recordFailure('musicbrainz');
    if (!String(e.message).includes('404')) {
      return { ok: false, error: e.message, retryable: true };
    }
  }

  // Fallback to search by stage_name
  if (!mbid) {
    const { data: person } = await supa
      .from('people')
      .select('stage_name')
      .eq('id', payload.person_id)
      .single();

    if (person?.stage_name) {
      try {
        const results = await mbSearchArtist(person.stage_name, { country: 'VE', limit: 5 });
        const best = results.find(r =>
          r.score >= 85 && (r.country === 'VE' || r.name.toLowerCase() === person.stage_name.toLowerCase())
        );
        if (best) mbid = best.id;
        await recordSuccess('musicbrainz');
      } catch (e: any) {
        if (e instanceof MBRateLimitError) await recordFailure('musicbrainz');
        return { ok: false, error: e.message, retryable: true };
      }
    }
  }

  await supa.from('people').update({
    musicbrainz_id: mbid,
    updated_at: new Date().toISOString(),
  }).eq('id', payload.person_id);

  if (mbid) {
    await supa.from('ingestion_queue').insert({
      entity_type: 'person',
      entity_ref: payload.person_id,
      source: 'musicbrainz',
      operation: 'fetch_artist_rels',
      priority: 6,
      payload: { person_id: payload.person_id, mbid },
    });
  }

  return { ok: true, created: 0, updated: 1 };
}

async function fetchArtistRels(item: QueueItem): Promise<WorkerResult> {
  const supa = getServiceClient();
  const payload = item.payload as { person_id: string; mbid: string };
  if (!payload.person_id || !payload.mbid) {
    return { ok: false, error: 'Missing person_id or mbid', retryable: false };
  }

  let artist;
  try {
    artist = await mbGetArtist(payload.mbid, ['url-rels', 'artist-rels', 'release-groups']);
    await persistRawResponse({
      source: 'musicbrainz',
      url: `/artist/${payload.mbid}`,
      body: artist,
      queue_item_id: item.id,
    });
    await recordSuccess('musicbrainz');
  } catch (e: any) {
    if (e instanceof MBRateLimitError) await recordFailure('musicbrainz');
    return { ok: false, error: e.message, retryable: !String(e.message).includes('404') };
  }

  const updates: Record<string, any> = { updated_at: new Date().toISOString() };
  if (artist.gender) updates.gender = artist.gender;

  const lifeSpan = artist['life-span'];
  if (lifeSpan?.begin) {
    updates.birth_date = lifeSpan.begin.length === 4 ? `${lifeSpan.begin}-01-01` : lifeSpan.begin;
    updates.birth_date_precision = lifeSpan.begin.length === 4 ? 'year' : lifeSpan.begin.length === 7 ? 'month' : 'day';
  }
  if (lifeSpan?.end) {
    updates.death_date = lifeSpan.end.length === 4 ? `${lifeSpan.end}-01-01` : lifeSpan.end;
  }
  if (lifeSpan?.ended === true) {
    updates.status = 'deceased';
  }

  // URL relations — cross-platform IDs
  for (const rel of artist.relations ?? []) {
    if (rel.type === 'discogs' && rel.url?.resource) {
      const m = rel.url.resource.match(/discogs\.com\/artist\/(\d+)/);
      if (m) updates.discogs_id = m[1];
    } else if (rel.type === 'youtube' && rel.url?.resource) {
      const m = rel.url.resource.match(/youtube\.com\/(?:channel\/|c\/|@)([^/?]+)/);
      if (m) updates.youtube_channel_id = m[1];
    } else if (rel.type === 'wikidata' && rel.url?.resource) {
      const m = rel.url.resource.match(/wikidata\.org\/(?:wiki\/|entity\/)(Q\d+)/);
      if (m) updates.wikidata_id = m[1];
    }
  }

  await supa.from('people').update(updates).eq('id', payload.person_id);

  // Queue fetch_release_group_recordings for each release-group (capped)
  const releaseGroups = artist['release-groups'] ?? [];
  const queueItems = releaseGroups.slice(0, 50).map(rg => ({
    entity_type: 'release' as const,
    entity_ref: rg.id,
    source: 'musicbrainz',
    operation: 'fetch_release_group_recordings',
    priority: 4,
    payload: { release_group_mbid: rg.id, person_id: payload.person_id },
  }));

  if (queueItems.length > 0) {
    for (let i = 0; i < queueItems.length; i += 50) {
      await supa.from('ingestion_queue').insert(queueItems.slice(i, i + 50));
    }
  }

  return { ok: true, created: 0, updated: 1 };
}

async function fetchReleaseGroupRecordings(item: QueueItem): Promise<WorkerResult> {
  const supa = getServiceClient();
  const payload = item.payload as { release_group_mbid: string; person_id: string };

  let rg;
  try {
    rg = await mbGetReleaseGroup(payload.release_group_mbid, ['artist-credits', 'releases']);
    await recordSuccess('musicbrainz');
  } catch (e: any) {
    if (e instanceof MBRateLimitError) await recordFailure('musicbrainz');
    return { ok: false, error: e.message, retryable: !String(e.message).includes('404') };
  }

  // Find matching release in DB (by mbid or title+year+artist)
  const { data: matchedRelease } = await supa
    .from('releases')
    .select('id, title, released_date')
    .or(`musicbrainz_id.eq.${payload.release_group_mbid},title.ilike.${rg.title}`)
    .eq('primary_artist_id', payload.person_id)
    .limit(1)
    .maybeSingle();

  if (!matchedRelease) {
    // Stage 2 Spotify hasn't populated this release yet. Skip gracefully.
    return { ok: true, created: 0, updated: 0 };
  }

  // Update release with mbid
  await supa.from('releases').update({ musicbrainz_id: payload.release_group_mbid }).eq('id', matchedRelease.id);

  // Queue fetch_recording_credits for each track
  const firstRelease = (rg.releases ?? [])[0];
  if (!firstRelease?.media) return { ok: true, created: 0, updated: 1 };

  const allTracks = firstRelease.media.flatMap(m => m.tracks ?? []);
  const queueItems: any[] = [];

  for (const mbTrack of allTracks) {
    // Try to match track in DB by track_number + title
    const { data: track } = await supa
      .from('tracks')
      .select('id')
      .eq('release_id', matchedRelease.id)
      .eq('track_number', parseInt(mbTrack.number, 10))
      .maybeSingle();

    if (track) {
      queueItems.push({
        entity_type: 'track',
        entity_ref: track.id,
        source: 'musicbrainz',
        operation: 'fetch_recording_credits',
        priority: 3,
        payload: { recording_mbid: mbTrack.recording.id, track_id: track.id },
      });
    }
  }

  if (queueItems.length > 0) {
    for (let i = 0; i < queueItems.length; i += 50) {
      await supa.from('ingestion_queue').insert(queueItems.slice(i, i + 50));
    }
  }

  return { ok: true, created: 0, updated: 1 };
}

async function fetchRecordingCredits(item: QueueItem): Promise<WorkerResult> {
  const supa = getServiceClient();
  const payload = item.payload as { recording_mbid: string; track_id: string };

  let recording;
  try {
    recording = await mbGetRecording(payload.recording_mbid, ['artist-rels', 'work-rels', 'isrcs']);
    await persistRawResponse({
      source: 'musicbrainz',
      url: `/recording/${payload.recording_mbid}`,
      body: recording,
      queue_item_id: item.id,
    });
    await recordSuccess('musicbrainz');
  } catch (e: any) {
    if (e instanceof MBRateLimitError) await recordFailure('musicbrainz');
    return { ok: false, error: e.message, retryable: !String(e.message).includes('404') };
  }

  // Update track
  const trackUpdates: Record<string, any> = { musicbrainz_id: payload.recording_mbid, updated_at: new Date().toISOString() };
  if (recording.isrcs && recording.isrcs.length > 0) {
    trackUpdates.isrc = recording.isrcs[0];
  }
  await supa.from('tracks').update(trackUpdates).eq('id', payload.track_id);

  // Insert credits
  let credits_created = 0;

  for (const rel of recording.relations ?? []) {
    const mapping = RELATION_MAP[rel.type];
    if (!mapping || mapping.target === 'skip') continue;
    if (!rel.artist?.id) continue;

    // Resolve person_id by MBID; create peripheral if missing
    let personId: string | null = null;
    const { data: existingPerson } = await supa
      .from('people')
      .select('id')
      .eq('musicbrainz_id', rel.artist.id)
      .maybeSingle();

    if (existingPerson) {
      personId = existingPerson.id;
    } else {
      // Create peripheral
      const slug = `mb-${rel.artist.id.slice(0, 12)}`;
      const { data: created } = await supa.from('people').insert({
        slug,
        stage_name: rel.artist.name,
        musicbrainz_id: rel.artist.id,
        is_peripheral: true,
        visibility: 'draft',
      }).select('id').single();
      personId = created?.id ?? null;
    }

    if (!personId) continue;

    const insertRow: Record<string, any> = {
      track_id: payload.track_id,
      person_id: personId,
      role: mapping.role,
    };

    try {
      await supa.from(mapping.target).insert(insertRow);
      credits_created++;
    } catch {
      // Ignore dupe inserts (no unique constraint, just best-effort)
    }
  }

  return { ok: true, created: credits_created, updated: 1 };
}

export const musicbrainzWorker: Worker = {
  source: 'musicbrainz',
  async execute(item: QueueItem): Promise<WorkerResult> {
    switch (item.operation) {
      case 'resolve_mbid_by_spotify':          return resolveMbidBySpotify(item);
      case 'fetch_artist_rels':                return fetchArtistRels(item);
      case 'fetch_release_group_recordings':   return fetchReleaseGroupRecordings(item);
      case 'fetch_recording_credits':          return fetchRecordingCredits(item);
      default:
        return { ok: false, error: `unknown operation: ${item.operation}`, retryable: false };
    }
  },
};
