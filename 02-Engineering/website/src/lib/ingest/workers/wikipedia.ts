import { createClient } from '@supabase/supabase-js';
import type { Worker, QueueItem, WorkerResult } from '../_types';
import { wikiGetSummary, wikiSparql, wikiGetCrossPlatformIds } from '../clients/wikipedia';
import { recordFailure, recordSuccess } from '../queue/rate-limit';

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

async function fetchWikipediaSummary(item: QueueItem): Promise<WorkerResult> {
  const supa = getServiceClient();
  const payload = item.payload as { person_id: string; stage_name: string; wikidata_qid?: string };

  if (!payload.person_id || !payload.stage_name) {
    return { ok: false, error: 'Missing person_id or stage_name', retryable: false };
  }

  let summary;
  try {
    summary = await wikiGetSummary(payload.stage_name, 'es');
    await recordSuccess('wikipedia');
  } catch (e: any) {
    await recordFailure('wikipedia');
    return { ok: false, error: e.message, retryable: true };
  }

  if (!summary) {
    return { ok: true, created: 0, updated: 0 };
  }

  // If wikidata_qid known, backfill cross-platform IDs
  if (payload.wikidata_qid) {
    try {
      const ids = await wikiGetCrossPlatformIds(payload.wikidata_qid);
      const updates: Record<string, any> = { updated_at: new Date().toISOString() };

      const { data: person } = await supa
        .from('people')
        .select('spotify_id, musicbrainz_id, apple_music_id, youtube_channel_id, discogs_id')
        .eq('id', payload.person_id)
        .single();

      if (person) {
        if (!person.spotify_id && ids.spotify_id) updates.spotify_id = ids.spotify_id;
        if (!person.musicbrainz_id && ids.musicbrainz_id) updates.musicbrainz_id = ids.musicbrainz_id;
        if (!person.apple_music_id && ids.apple_music_id) updates.apple_music_id = ids.apple_music_id;
        if (!person.youtube_channel_id && ids.youtube_channel_id) updates.youtube_channel_id = ids.youtube_channel_id;
        if (!person.discogs_id && ids.discogs_id) updates.discogs_id = ids.discogs_id;

        if (Object.keys(updates).length > 1) {
          await supa.from('people').update(updates).eq('id', payload.person_id);
        }
      }
    } catch {
      // Non-fatal
    }
  }

  return { ok: true, created: 0, updated: 1 };
}

async function resolveWikidataCrossIds(item: QueueItem): Promise<WorkerResult> {
  const supa = getServiceClient();
  const payload = item.payload as { person_id: string };
  if (!payload.person_id) {
    return { ok: false, error: 'Missing person_id', retryable: false };
  }

  const { data: person } = await supa
    .from('people')
    .select('spotify_id, musicbrainz_id, wikidata_id, apple_music_id, youtube_channel_id, discogs_id')
    .eq('id', payload.person_id)
    .single();

  if (!person) return { ok: false, error: 'Person not found', retryable: false };

  let qid: string | null = person.wikidata_id ?? null;

  if (!qid) {
    // Resolve QID via SPARQL, prefer spotify_id then musicbrainz_id
    let query: string | null = null;
    if (person.spotify_id) {
      query = `SELECT ?item WHERE { ?item wdt:P1902 "${person.spotify_id}" . } LIMIT 1`;
    } else if (person.musicbrainz_id) {
      query = `SELECT ?item WHERE { ?item wdt:P434 "${person.musicbrainz_id}" . } LIMIT 1`;
    }

    if (!query) return { ok: true, created: 0, updated: 0 };

    try {
      const bindings = await wikiSparql(query);
      await recordSuccess('wikipedia');
      const raw = bindings[0]?.item?.value;
      if (raw) {
        const m = raw.match(/Q\d+$/);
        qid = m ? m[0] : null;
      }
    } catch (e: any) {
      await recordFailure('wikipedia');
      return { ok: false, error: e.message, retryable: true };
    }

    if (qid) {
      await supa.from('people').update({ wikidata_id: qid, updated_at: new Date().toISOString() }).eq('id', payload.person_id);
    }
  }

  if (!qid) return { ok: true, created: 0, updated: 0 };

  // Backfill cross-platform IDs
  try {
    const ids = await wikiGetCrossPlatformIds(qid);
    const updates: Record<string, any> = { updated_at: new Date().toISOString() };

    if (!person.spotify_id && ids.spotify_id) updates.spotify_id = ids.spotify_id;
    if (!person.musicbrainz_id && ids.musicbrainz_id) updates.musicbrainz_id = ids.musicbrainz_id;
    if (!person.apple_music_id && ids.apple_music_id) updates.apple_music_id = ids.apple_music_id;
    if (!person.youtube_channel_id && ids.youtube_channel_id) updates.youtube_channel_id = ids.youtube_channel_id;
    if (!person.discogs_id && ids.discogs_id) updates.discogs_id = ids.discogs_id;

    if (Object.keys(updates).length > 1) {
      await supa.from('people').update(updates).eq('id', payload.person_id);
    }
  } catch {
    // Non-fatal
  }

  return { ok: true, created: 0, updated: 1 };
}

export const wikipediaWorker: Worker = {
  source: 'wikipedia',
  async execute(item: QueueItem): Promise<WorkerResult> {
    switch (item.operation) {
      case 'fetch_wikipedia_summary':     return fetchWikipediaSummary(item);
      case 'resolve_wikidata_cross_ids':  return resolveWikidataCrossIds(item);
      default:
        return { ok: false, error: `unknown operation: ${item.operation}`, retryable: false };
    }
  },
};
