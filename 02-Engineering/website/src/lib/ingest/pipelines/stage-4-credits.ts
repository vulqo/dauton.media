/**
 * Stage 4: Production credits via MusicBrainz.
 *
 * Prerequisites before execution:
 *   1. Spotify Stage 2 (runStage2Catalog) must have populated `releases` + `tracks`.
 *   2. At least 15 pillar people rows with spotify_id resolved.
 *
 * Why this is scaffolded, not executed yet (Sprint 6):
 *   - Stage 2 Spotify is blocked by a 23h rate-limit cooldown (2026-04-23 → 2026-04-24).
 *   - Running Stage 4 before Stage 2 completes means the `fetch_release_group_recordings`
 *     operations skip every release (nothing to match against). Wasted MB rate budget.
 *
 * Flow when executed:
 *   1. Select people con spotify_id IS NOT NULL y musicbrainz_id IS NULL
 *   2. Queue `resolve_mbid_by_spotify` per person
 *   3. Drain dispatcher for source='musicbrainz' (~1 req/s, takes ~hour for 76 artists)
 *   4. `fetch_artist_rels` populates birth_date, gender, cross-platform IDs,
 *      and enqueues `fetch_release_group_recordings` per release-group
 *   5. `fetch_release_group_recordings` matches DB releases and queues
 *      `fetch_recording_credits` per track
 *   6. `fetch_recording_credits` populates production_credits, writing_credits,
 *      collaborations tables
 *
 * Expected runtime: days for full catalog (thousands of tracks × 1.1s MB spacing).
 * Mitigation: run async via GitHub Actions cron; dispatcher handles retries.
 *
 * Execute in Sprint 7 when Stage 2 Spotify has completed.
 */

export async function runStage4Credits(_opts?: {
  limit?: number;
  onlyPillars?: boolean;
  dryRun?: boolean;
}): Promise<never> {
  throw new Error(
    'runStage4Credits: scaffolded — execute in Sprint 7 after Stage 2 Spotify populates releases/tracks'
  );
}
