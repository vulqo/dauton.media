/**
 * Detect upcoming releases from Spotify for tracked artists.
 *
 * For each person with a `spotify_id` we fetch the artist albums (album +
 * single, market=ES) and filter to entries whose `release_date` is in the
 * future. Each future entry is upserted into `upcoming_releases` (dedup by
 * Spotify album id). A second pass reconciles upcoming → released once a
 * matching `releases` row appears.
 *
 * Rate limit: spotifyClient enforces 300 ms spacing internally (Sprint 6.5).
 * Cap:        100 artists per run (configurable). Pillars first.
 * Circuit:    if Spotify returns Retry-After > 30 s the dispatcher's circuit
 *             breaker is opened and the run aborts.
 */

import { createClient } from '@supabase/supabase-js';
import { getArtistAlbums, RateLimitError } from '../clients/spotify';
import type { SpotifyAlbum } from '../clients/spotify.types';

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

/**
 * Spotify release_date can be 'YYYY' | 'YYYY-MM' | 'YYYY-MM-DD'.
 * For comparison purposes pad to YYYY-MM-DD (latest-possible day in the period)
 * so a 2026 album doesn't immediately get treated as past on Jan 1.
 */
export function dateInFuture(releaseDate: string, today = new Date().toISOString().slice(0, 10)): boolean {
  let normalized = releaseDate;
  if (releaseDate.length === 4) normalized = `${releaseDate}-12-31`;
  else if (releaseDate.length === 7) normalized = `${releaseDate}-31`;
  return normalized > today;
}

/** Spotify often labels EPs as 'single' with 4-6 tracks. Normalize. */
export function mapReleaseType(albumType: string, totalTracks: number): string {
  if (albumType === 'compilation') return 'compilation';
  if (albumType === 'album') return 'album';
  if (albumType === 'single') return totalTracks >= 4 ? 'ep' : 'single';
  return albumType;
}

/** Pad partial Spotify dates to YYYY-MM-DD for storage in `date` columns. */
function normalizeScheduledDate(raw: string): string {
  if (raw.length === 4) return `${raw}-12-31`;
  if (raw.length === 7) return `${raw}-01`;
  return raw;
}

interface PersonRow {
  id: string;
  stage_name: string;
  spotify_id: string | null;
  is_pillar: boolean | null;
}

export async function detectUpcomingReleases(opts: {
  maxArtists?: number;
  dryRun?: boolean;
} = {}): Promise<{
  scanned: number;
  upcomingFound: number;
  inserted: number;
  updated: number;
  rateLimitHit: boolean;
}> {
  const maxArtists = opts.maxArtists ?? 100;
  const supa = getServiceClient();

  const { data: peopleRaw } = await supa
    .from('people')
    .select('id, stage_name, spotify_id, is_pillar')
    .not('spotify_id', 'is', null)
    .neq('status', 'deceased')
    .order('is_pillar', { ascending: false })
    .limit(maxArtists);

  const people = (peopleRaw ?? []) as PersonRow[];

  let upcomingFound = 0;
  let inserted = 0;
  let updated = 0;

  for (let i = 0; i < people.length; i++) {
    const p = people[i];
    if (!p.spotify_id) continue;

    try {
      // Spotify (April 2026): Client-Credentials cap on `limit` for
      // /artists/{id}/albums is 10. Paginate up to 50 albums (sorted newest
      // first by Spotify) — that's enough to catch any upcoming/announced
      // release within the look-ahead window.
      const albumItems: SpotifyAlbum[] = [];
      const PAGE = 10;
      const PAGES = 5;
      for (let page = 0; page < PAGES; page++) {
        const r = await getArtistAlbums(p.spotify_id, {
          include_groups: ['album', 'single'],
          limit: PAGE,
          offset: page * PAGE,
        });
        if (!r.items?.length) break;
        albumItems.push(...r.items);
        if (!r.next) break;
      }

      for (const album of albumItems) {
        if (!album.release_date) continue;
        if (!dateInFuture(album.release_date)) continue;

        upcomingFound++;
        const releaseType = mapReleaseType(album.album_type, album.total_tracks ?? 1);
        const scheduledDate = normalizeScheduledDate(album.release_date);

        const row = {
          person_id: p.id,
          title: album.name,
          scheduled_release_date: scheduledDate,
          release_type: releaseType,
          spotify_id: album.id,
          source: 'spotify',
          source_detail: `${p.stage_name} discography scan`,
          status: 'pending',
        };

        console.log(`  ↑ upcoming: ${p.stage_name} — "${album.name}" ${scheduledDate} (${releaseType})`);

        if (!opts.dryRun) {
          const { data: existing } = await supa
            .from('upcoming_releases')
            .select('id')
            .eq('spotify_id', album.id)
            .maybeSingle();

          if (existing) {
            const { error: upErr } = await supa.from('upcoming_releases').update({
              scheduled_release_date: scheduledDate,
              detected_at: new Date().toISOString(),
            }).eq('id', existing.id);
            if (upErr) console.warn(`Update failed for ${album.name}: ${upErr.message}`);
            else updated++;
          } else {
            const { error: insErr } = await supa.from('upcoming_releases').insert(row);
            if (insErr) console.warn(`Insert failed for ${album.name}: ${insErr.message}`);
            else inserted++;
          }
        }
      }
    } catch (e: unknown) {
      if (e instanceof RateLimitError) {
        console.error(`RATE LIMIT HIT — stopping run. Retry-After: ${e.retryAfterSeconds}s`);
        // Open the dispatcher's circuit breaker explicitly so subsequent
        // runs respect the cooldown.
        await supa.from('ingestion_rate_limits').update({
          circuit_state: 'open',
          circuit_opened_at: new Date().toISOString(),
          consecutive_failures: 5,
        }).eq('source', 'spotify');
        return { scanned: i, upcomingFound, inserted, updated, rateLimitHit: true };
      }
      const msg = (e as Error).message ?? String(e);
      console.warn(`Error fetching albums for ${p.stage_name}: ${msg}`);
    }
  }

  return {
    scanned: people.length,
    upcomingFound,
    inserted,
    updated,
    rateLimitHit: false,
  };
}

/** Reconcile upcoming → released when scheduled date passes and a matching releases row exists. */
export async function reconcileUpcomingToReleased(): Promise<{ reconciled: number }> {
  const supa = getServiceClient();

  const today = new Date().toISOString().slice(0, 10);
  const { data: candidates } = await supa
    .from('upcoming_releases')
    .select('id, person_id, title, scheduled_release_date, spotify_id')
    .lte('scheduled_release_date', today)
    .is('fulfilled_release_id', null)
    .eq('status', 'pending');

  let reconciled = 0;

  for (const u of candidates ?? []) {
    let releaseId: string | null = null;

    if (u.spotify_id) {
      const { data: r } = await supa
        .from('releases')
        .select('id')
        .eq('spotify_id', u.spotify_id)
        .maybeSingle();
      releaseId = r?.id ?? null;
    }

    if (!releaseId) {
      const { data: r } = await supa
        .from('releases')
        .select('id')
        .eq('primary_artist_id', u.person_id)
        .ilike('title', u.title)
        .maybeSingle();
      releaseId = r?.id ?? null;
    }

    if (releaseId) {
      const { error } = await supa.from('upcoming_releases').update({
        fulfilled_release_id: releaseId,
        status: 'released',
      }).eq('id', u.id);
      if (!error) reconciled++;
    }
  }

  return { reconciled };
}
