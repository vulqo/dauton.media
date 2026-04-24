/**
 * Stage 3: Biographical content via Wikipedia + bio-drafter skill.
 *
 * Prerequisites before execution:
 *   1. Stage 2 Spotify + Stage 4 MusicBrainz must have populated baseline facts
 *      (birth_date, city, top collaborators, discography).
 *   2. Stage 4 credits complete so top_collaborators is queryable.
 *
 * Flow when executed:
 *   1. Select people con bio_short IS NULL y musicbrainz_id IS NOT NULL
 *   2. Queue fetch_wikipedia_summary per person (batch by language preference es → en)
 *   3. Queue resolve_wikidata_cross_ids to backfill external IDs from Wikidata
 *   4. Writer _pending_skills/bio-drafter/{item}.input.json with:
 *      { stage_name, wikipedia_summary, spotify_genres, active_since,
 *        top_collaborators }
 *   5. Luis executes bio-drafter skill manually via Claude Max
 *   6. consume-skill-outputs.ts script reads .output.json and updates
 *      people.bio_short
 *
 * Execute in Sprint 8 after Stage 4 completes.
 */

export async function runStage3Bios(_opts?: {
  limit?: number;
  onlyPillars?: boolean;
  dryRun?: boolean;
}): Promise<never> {
  throw new Error(
    'runStage3Bios: scaffolded — execute in Sprint 8 after Stage 4 populates credits + collaborators'
  );
}
