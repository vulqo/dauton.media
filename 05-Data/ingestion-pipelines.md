# Ingestion Pipelines

**Department:** Data
**Owner:** Luis Figuera
**Last updated:** April 22, 2026

---

## Overview

All data flows from external sources into Culture Wiki via defined pipelines. Each pipeline has: a trigger, a sequence of steps, input/output contracts, and error handling. Pipelines are idempotent and safe to re-run.

Implementation platforms:
- **n8n (self-hosted):** scheduled and on-demand pipelines for external-facing ingestion.
- **Next.js server actions:** admin-triggered ingestion for single-record enrichment.
- **Postgres functions:** in-database computations (completeness, deduplication candidates).

---

## Pipeline catalog

### P1 — Initial artist seeding

**Trigger:** Admin enters artist search query → system suggests candidates from Spotify → admin confirms.

**Steps:**
1. Query Spotify Search API for artist name.
2. Return top 5 matches with display (name, image, follower count, top genre) to admin UI.
3. Admin selects correct artist → creates `people` record with `visibility = 'review'`, slug auto-generated.
4. Trigger P2 (full artist enrichment).

**Output:** `people` record in review state, ready for enrichment pipeline.

---

### P2 — Full artist enrichment

**Trigger:** Completion of P1, or admin-triggered re-enrichment.

**Steps:**

1. **Fetch Spotify artist details**
   - Endpoint: `GET /v1/artists/{id}`
   - Store: name, followers, popularity, genres, images.
   - Write to: `people` (update), `raw_responses` (persist raw).

2. **Fetch Spotify discography**
   - Endpoint: `GET /v1/artists/{id}/albums?include_groups=album,single,compilation,appears_on&limit=50`
   - Paginate until complete.
   - For each album: create or update `releases` record.
   - For each album: fetch tracks (`GET /v1/albums/{id}/tracks`).
   - For each track: create or update `tracks` record.
   - For each track's artists: if not in our people table, create as `is_peripheral = true`.
   - Create `collaborations` records for all featured artists.

3. **Fetch MusicBrainz data**
   - Lookup artist by Spotify ID first (via URL relationships).
   - If not found, query by name.
   - Fetch relationships: producer, engineer, member-of-band.
   - Fetch release credits for each matched release.
   - Write to: `production_credits`, `writing_credits`, `crew_memberships`.

4. **Fetch Wikipedia/Wikidata**
   - Query Wikidata SPARQL for person matching Spotify ID or name.
   - Extract structured: birth date, origin, instruments, record labels.
   - Fetch Wikipedia summary (Spanish, fallback English).
   - Store Wikipedia URL as source.
   - **Do not** paste Wikipedia text verbatim — queue summary text for Claude re-writing.

5. **Fetch YouTube channel**
   - Find official channel (Spotify external IDs, manual entry, or search).
   - Store channel ID, handle, subscriber count.

6. **Fetch Genius artist data**
   - Query Genius artist by name.
   - For top songs: fetch song metadata, extract producers and writers.
   - Merge with existing credits data, flag conflicts for admin review.

7. **Claude pass: bio drafting**
   - Input: Wikipedia summary + Spotify genres + career highlights + notable collaborators.
   - Prompt: generate `bio_short` (~80 words) in Spanish, neutral tone, no invention.
   - Output to `people.bio_short` with status 'draft' — needs admin approval before going public.

8. **Compute completeness score**
   - Run `compute_completeness_for_person(person_id)` SQL function.
   - Update `people.completeness_score`.

9. **Revalidate**
   - Trigger Vercel revalidation for artist page.

**Output:** Fully enriched `people` record plus child records in review state.

**Estimated duration:** 2-4 minutes per artist.

**Estimated API cost per artist:**
- Spotify: ~10-30 calls.
- MusicBrainz: ~20-50 calls (rate-limited to 1/sec → 20-50 seconds).
- Wikipedia: 2-3 calls.
- Genius: ~5-10 calls.
- Claude: ~1 bio drafting call (~2k input tokens, ~300 output tokens) → ~$0.02.

**Total Claude cost per artist ingestion:** ~$0.02-0.05.

---

### P3 — Press discovery

**Trigger:** Scheduled weekly per tracked artist. Also admin-triggerable.

**Steps:**

1. **Build query set**
   - Primary: `"[stage_name]" rap Venezuela`
   - Secondary: `"[stage_name]" entrevista`
   - Tertiary: `"[stage_name]" [last known single title]`

2. **Run search via Brave Search API**
   - 3 queries × up to 20 results each.
   - Filter: news category preferred, relevant domains (from outlet whitelist + high-authority domains).

3. **Deduplicate against existing articles table**
   - Match by URL, title fuzzy match.

4. **Fetch full article via Firecrawl**
   - Extract: title, published date, author, body text.

5. **Claude extraction pass**
   - Input: full article text, artist context.
   - Prompt: extract relevant quote (max 15 words, direct), subject prominence, tags, any dates of career events mentioned.
   - Output: structured JSON for `press_mentions` + optionally `career_events`.

6. **Persist with confidence scoring**
   - High confidence (source tier 1-2 + explicit mention): auto-publish.
   - Lower confidence: admin review queue.

**Output:** New `articles` + `press_mentions` records; possibly new `career_events` entries.

**Estimated per-artist per-week cost:**
- Brave Search: 3 queries = within free tier limit.
- Firecrawl: 3-10 article fetches.
- Claude: 3-10 extraction calls, avg 3k tokens in / 400 out → ~$0.05-0.15/artist/week.

---

### P4 — New release monitoring

**Trigger:** Daily cron for all tracked artists.

**Steps:**

1. For each artist with Spotify ID:
   - Fetch latest 5 releases from Spotify.
   - Compare to our DB.
   - Any new releases → insert into `releases` + trigger collaboration / credit enrichment.

2. Generate admin digest email: "X new releases today."

3. On any new release, revalidate artist page + homepage.

**Cost:** Trivial. Pure Spotify API, no Claude needed unless a new release triggers metadata enrichment.

---

### P5 — Relationship graph computation

**Trigger:** Nightly. Also on-demand.

**Steps:**

1. For each artist, recompute aggregates:
   - Top collaborators (by number of tracks together).
   - Related artists (by collaboration network proximity).
   - Label-mates (by overlapping label eras).

2. Cache results in Upstash Redis with 24h TTL.

3. Detect new inferred relationships:
   - If artist A and artist B have ≥3 collaborations and no `relationships` record, create inferred `collaborator` edge.

**Cost:** Trivial. Internal queries only.

---

### P6 — Deduplication detection

**Trigger:** Nightly.

**Steps:**

1. For each pair of people records:
   - Check for high similarity in stage_name (fuzzy match with `pg_trgm`).
   - Check for shared streaming IDs (Spotify, MusicBrainz).
   - Check for overlapping collaborations.

2. If similarity score > threshold → insert into `dedup_candidates` table for admin review.

**Output:** Admin queue of possible duplicates.

---

### P7 — Completeness recomputation

**Trigger:** After any write to: people, releases, press_mentions, label_eras, career_events, crew_memberships.

**Steps:**

1. Database trigger calls `compute_completeness_for_person(person_id)`.
2. Update `completeness_score` column.

This is cheap and runs inline with writes.

---

### P8 — Orphan detection

**Trigger:** Nightly.

**Steps:**

1. Scan for entities with no relationships, no press, no releases.
2. Flag in admin dashboard as "orphan" — either needs enrichment or should be removed.

**Output:** Admin report of orphan entities.

---

## Pipeline observability

Every pipeline execution logs:
- Pipeline ID, trigger source, target entity IDs.
- Start time, end time, duration.
- Records created / updated / skipped.
- External API calls made (count per source).
- Claude token usage (input/output).
- Errors and warnings.

Stored in `pipeline_runs` table. Admin dashboard shows:
- Last run of each pipeline.
- Success rate over time.
- Cost per pipeline per day.

---

## Error handling

**External API failures:**
- 429 (rate limit): exponential backoff, retry up to 5 times.
- 500-class: retry up to 3 times, log if still failing.
- 4xx (auth, not found): do not retry, log as anomaly.

**Partial failures:**
- A pipeline that fails in step 5 of 9 should not lose the work of steps 1-4. All pipelines are designed step-wise idempotent.
- Re-running the same pipeline on the same entity should produce the same result (or an updated result if data has changed upstream).

**Claude failures:**
- Rate limit: retry with backoff.
- Invalid JSON output: retry once with stricter prompt, then route to admin review.
- Hard refusal: log, skip extraction, continue pipeline.

**Long-running pipelines:**
- Pipelines > 10 minutes are split into sub-steps with checkpoints.
- Checkpoints stored in `pipeline_state` so re-runs resume from last successful step.

---

## Privacy and compliance

- Raw responses from external APIs are persisted in `raw_responses` but contain only public data (no personal user data).
- Respect `robots.txt` when scraping.
- Do not attempt to bypass paywalls. If an article requires subscription, record title and URL but not full text.
- Never re-publish copyrighted text verbatim. Extracted quotes are ≤ 15 words.

---

## Playbooks for common scenarios

### Adding a new artist manually (fast path)
Admin → "Add artist" → Spotify search → select → P2 runs in background. Artist appears in admin review queue in 3-5 minutes.

### Re-enriching an artist after data improves
Admin → artist page → "Re-enrich" button → P2 re-runs. Existing data preserved; new data merged.

### Bulk seeding from a list of names
CSV upload in admin → for each row, queue P1 + P2. Processes serially at rate-limit-respecting pace.

### Fixing bad data from a bad ingestion
Admin manually corrects in entity editor → `edit_history` records change → revalidation triggered.

### Recovering from a corrupt pipeline run
`raw_responses` table retains original external data → re-parse without re-fetching → fix applied downstream.

---

*See also: [`source-catalog.md`](./source-catalog.md), [`data-qa.md`](./data-qa.md), [`02-Engineering/architecture.md`](../02-Engineering/architecture.md)*
