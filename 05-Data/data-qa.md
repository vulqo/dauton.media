# Data Quality Assurance

**Department:** Data
**Owner:** Luis Figuera
**Last updated:** April 22, 2026

---

## Purpose

Data quality is the difference between an archive that gets cited and one that gets dismissed. Our moat is data. That moat only works if the data is defensibly correct.

This document defines how we measure, detect, and correct data quality issues across the archive.

---

## Quality dimensions

We track five dimensions of quality. Each has metrics and thresholds.

### 1. Accuracy
The claim matches reality. No wrong dates, no wrong credits, no misattributions.

**Target:** ≥98% accuracy on spot-checked fields.

### 2. Completeness
Entity has the expected data for its type and prominence.

**Target:** average completeness score ≥60% across all MVP artists; ≥90% for pillar artists.

### 3. Consistency
The same concept is represented the same way across the graph. "Caracas" is always spelled the same. "Hip-hop" and "hip hop" don't both exist.

**Target:** zero duplicate canonical values.

### 4. Source coverage
Facts have citations. No unsourced claims.

**Target:** ≥95% of published claims have at least one source attached.

### 5. Freshness
Data reflects current reality. Follower counts not from a year ago. Active-since / active-until are current.

**Target:** all "active" artists refreshed within the last 30 days.

---

## Detection: automated QA

Runs nightly. Reports in admin dashboard.

### Check: Duplicate candidates
Pairs of `people` records with fuzzy name match ≥0.85 or shared external IDs.
→ Admin review queue.

### Check: Orphan entities
Entities with zero relationships and zero press mentions after 14 days in system.
→ Either enrich or remove.

### Check: Unsourced claims
`press_mentions`, `career_events`, `label_eras`, `relationships` records with empty `source_ids`.
→ Flag for sourcing pass.

### Check: Date inconsistencies
- `released_date` before `active_since` of primary artist.
- `to_date` before `from_date` on any era/membership.
- Future dates in past-oriented fields.
- `death_date` without `status = 'deceased'`.

### Check: Genre mismatches
Artists tagged with `rap` but with 0 tracks containing rap-associated tags from MusicBrainz/Genius.
→ Likely bad Spotify genre inheritance; review.

### Check: Schema/value violations
- Role not in allowed enum.
- Event type not in allowed list.
- Slug collisions (should be prevented at write but double-check).
- URL fields without valid URL format.

### Check: Cross-source conflicts
Same fact (e.g., artist's origin city) claimed differently across sources.
→ Show both, require resolution.

### Check: Completeness regression
Any entity whose completeness score dropped.
→ Investigate (might indicate accidental data loss).

### Check: Broken external links
Periodic check (weekly) of external source URLs for 404/timeout.
→ Attempt to recover from Wayback Machine archive.

---

## Detection: human QA (sampling)

Automated checks miss semantic errors. We augment with sampling.

### Weekly audit batch
Sample 20 entities per week (random, weighted toward recently-edited).
For each:
- Visual inspection of the public page.
- Source spot-check: pick 3 claims, verify sources match.
- Typos, broken formatting, layout bugs.

### Pre-publish review
Any entity transitioning from `review` to `public` passes through a 60-second admin review:
- Does the page render correctly?
- Are the sources legitimate?
- Is the bio free of fabrication?
- Are the streaming links verified?

### Artist self-review
When an artist claims their profile, we prompt them to confirm:
- Name spelled correctly.
- Origin correct.
- Discography reflects their career.
- No missing major collaborators.

Claimed artists with flagged corrections accelerate to top of correction queue.

---

## Correction workflow

See `06-Operations/moderation-workflow.md` for the moderation details. Summary of how corrections enter the system:

1. **User correction form:** public, submitted by any authenticated user.
2. **Admin spotted:** any editor making a change adds to edit_history.
3. **Claimed artist correction:** verified artist's correction, higher trust.
4. **QA batch correction:** from the weekly audit.
5. **Self-healing:** some updates happen automatically (re-ingested data overriding stale values with matching sources).

---

## Source credibility heuristics

Not all sources are equal. When two sources conflict, we use credibility tier + recency + specificity to decide.

### Credibility tier
See `04-Editorial/taxonomy.md`. Tier 1 outlets beat tier 3 unless tier 3 has specific primary evidence.

### Recency
For time-sensitive claims (current label, current city), newer sources beat older.

### Specificity
A source that directly addresses the claim beats a source that mentions it in passing.

### Artist statement
The subject's own public statement on Instagram / interview is authoritative for non-disputable self-identification (name, pronouns, origin of choice).

### When sources truly conflict
We display both: "Según [Source A], … Según [Source B], …" We do not silently pick one.

---

## Data integrity guards at write time

Not just detection — prevention.

### Database level
- Foreign key constraints enforced always.
- Check constraints on enum values.
- NOT NULL on required identity fields.
- Unique constraints on slugs, external IDs.
- Triggers that reject inconsistent date combinations.

### Application level
- Zod schemas validate all admin form inputs before they hit the DB.
- TypeScript generated from Supabase schema; catches type mismatches at compile time.
- Server actions wrap all writes in transactions. Partial writes not possible.

### Ingestion level
- Claude extraction outputs validated against strict schemas. Non-conforming outputs rejected.
- External API responses validated for shape before parsing.
- Confidence scoring attached to any AI-extracted claim.

---

## Dedup strategy

Duplicate records are the most insidious data quality issue because once they exist, every subsequent ingestion can either worsen or mask the duplication.

### Preventing duplicates

- Slug generation uses canonical stage name + conflict resolution suffixes.
- Before creating a `people` record, fuzzy-match against existing names. High match → suggest linking, not creating.
- External IDs (Spotify, MusicBrainz) unique — enforced at DB level. Can't accidentally create two records for same Spotify artist.

### Resolving detected duplicates

When admin confirms two records are the same person:
1. Pick canonical record (older / more complete).
2. Migrate all foreign keys from duplicate → canonical.
3. Merge aliases into canonical.aliases.
4. Redirect old slug to new via slug_history.
5. Delete (soft) duplicate record.

Operation is transactional and logged.

---

## Data auditing and provenance

Every fact in the archive should be answerable to: **"Where did this come from?"**

### Mechanisms

- `edit_history` table records every field change: who, when, what, why, what source.
- `sources` table is first-class. Every press mention, career event, label era, relationship has `source_ids[]`.
- Raw external API responses persisted — we can always trace back to what Spotify or MusicBrainz said on a given date.

### Public-facing transparency

- Entity pages show sources at the bottom.
- Editorial articles show sources inline and in footer.
- About page explains our sourcing methodology.
- Every correction we make is logged publicly-visible (or at least statistically visible in an "edits this month" counter).

---

## Metrics dashboard (internal)

Admin dashboard shows, at a glance:

- Total entities by type.
- Completeness distribution (histogram).
- Source coverage percentage.
- Corrections queue size.
- Dedup candidates open.
- Orphans flagged.
- External link health (% alive).
- Last pipeline run status.
- Claude cost this month.

---

## Quality incidents

When a serious data error is discovered publicly (e.g., a press outlet points out we have wrong info):

1. Acknowledge within 24 hours.
2. Investigate root cause: bad source? bad ingestion? bad manual edit?
3. Fix the specific entity immediately.
4. Fix the root cause (if ingestion bug, patch pipeline; if bad source, downgrade its credibility tier).
5. Document in `incidents/` log.
6. If affected multiple entities, run a targeted sweep to fix all.

No defensive communication. Clear, short acknowledgment. Fix. Move on.

---

## Quality metrics target (MVP launch)

At v1.0 launch:

- [ ] Sample of 50 pillar/notable artist pages: ≥98% accuracy on manual audit.
- [ ] 95%+ of press_mentions have valid, live source URLs.
- [ ] 0 duplicate `people` records in public state.
- [ ] 100% of entities have at least 1 source (even if just Spotify).
- [ ] Completeness score average ≥60% across all public artists.
- [ ] Pillar artists ≥90% completeness.
- [ ] All external links tested alive within 7 days pre-launch.

---

*See also: [`source-catalog.md`](./source-catalog.md), [`ingestion-pipelines.md`](./ingestion-pipelines.md), [`06-Operations/moderation-workflow.md`](../06-Operations/moderation-workflow.md)*
