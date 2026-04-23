# Moderation Workflow

**Department:** Operations
**Owner:** Luis Figuera
**Last updated:** April 22, 2026

---

## What we moderate

Three streams of inbound content require moderation:

1. **User corrections** — public users submitting fixes to entity data.
2. **Ingestion review queue** — AI-extracted data flagged as uncertain by confidence scoring.
3. **User-submitted lists and descriptions** — user-generated text on public lists.

Comments on editorial pieces and general user interactions are deferred to Phase 2 — not moderated in MVP.

---

## Stream 1 — User corrections

### Intake
User clicks "Sugerir corrección" on any entity page. Form captures:
- Entity type and ID (auto-filled from page).
- Field being corrected (dropdown of eligible fields).
- Current value (auto-filled, read-only).
- Suggested value.
- Reason (free text, required).
- Source URL (optional but strongly encouraged).
- User's authenticated account is attached.

Submission goes to `corrections_queue` with `status = 'pending'`.

### Triage SLA
- All corrections reviewed within 7 days.
- Corrections from **claimed artist profiles** reviewed within 48 hours.
- Corrections with source URLs reviewed before those without.

### Review decision tree

For each correction:

1. **Is the correction clear and actionable?**
   - No → request clarification from user via email. Status = `needs_info`.
   - Yes → proceed.

2. **Is there a source for the suggested value?**
   - User-provided source → evaluate credibility (see Source assessment below).
   - No source provided → editor researches. If editor can source it independently, proceed. If not, reject with explanation.

3. **Does the suggested value contradict existing sourced data?**
   - Yes, with weaker source → reject or hold.
   - Yes, with stronger source → update and note conflict resolution in edit_history.
   - No → straightforward accept.

4. **Does the correction raise moderation flags?** (defamation, harassment, disinformation)
   - Yes → reject and note.
   - No → proceed.

5. **Apply the change.**
   - Update entity record.
   - Add to `edit_history` with reason = "Correction from user [id]".
   - Attach source to affected claim.
   - Trigger revalidation of the entity page.

6. **Notify user.**
   - Accepted → thank-you email with link to the updated page.
   - Rejected → explanation email with option to re-submit with more detail.
   - Held → wait-note if we need more research.

### Source assessment for user corrections

- **Tier 1-2 source attached** → high trust; editor often accepts directly if claim is plausible.
- **Tier 3-4 source** → editor verifies before accepting.
- **Social media self-claim by artist** → acceptable for self-identification (name, pronouns, origin by preference); insufficient for factual claims (dates, collaborations).
- **No source, but claim is verifiable by cross-checking** → editor checks.
- **No source, claim is not verifiable** → reject.

### Common correction patterns

- **Typo / spelling fix:** auto-accept if minor.
- **Missing streaming link:** verify and add.
- **Corrected date:** require source.
- **Corrected credits:** require source (MusicBrainz, liner notes, interview).
- **Biographical fact:** require source.
- **Defamatory addition:** reject, flag for review.

---

## Stream 2 — Ingestion review queue

AI-extracted data is confidence-scored. High confidence auto-publishes; lower confidence routes here.

### Triage
Queue shows pending items with:
- Source of the claim (which external data + which pipeline).
- Extracted claim (structured).
- Confidence score.
- Target entity.
- Context snippet (original text the AI extracted from).

### Review actions
- **Accept** → promote to live data.
- **Accept with edit** → modify the extracted value, then promote.
- **Reject** → dismiss; train AI with correction example.
- **Escalate** → flag for second opinion from another editor.
- **Defer** → hold pending external verification.

### Common flags for review
- Claude returned ambiguous JSON (missing fields, confidence < 0.7).
- Multiple sources contradict each other.
- Extracted date outside expected range.
- Extracted entity not found in our people table (creates peripheral entry).

### SLA
- Queue reviewed daily. No item waits more than 72 hours.

---

## Stream 3 — User-generated text (lists, descriptions)

Users can create public lists with custom titles and descriptions. These are user-generated content with public visibility.

### Moderation approach
- **Automated pre-filter:** simple profanity filter + known-spam-phrase filter at write time. Blocks submission with generic "Please revise" message.
- **Post-publish surveillance:** nightly scan of newly-public lists for flagged terms. Editor reviews, hides if problematic.
- **Report-to-editor:** "Report this list" button on public lists. Fills a report queue; reviewed within 7 days.

### What's not allowed on user content
- Hate speech, slurs, harassment of specific people.
- Sexual content involving minors (auto-block + report per legal obligations).
- Commercial spam.
- Coordinated disinformation campaigns.
- Deliberate misinformation about artists.
- Doxxing.
- Deliberate misspellings of artist names to defame.

### Enforcement
- First violation: hide content, notify user with warning.
- Second violation: hide content, temporary suspension (7 days).
- Third violation: account suspension.
- Immediate suspension for: CSAM, explicit harassment, doxxing.

---

## Moderation principles

### 1. Speed matters
A correction sitting for weeks signals we don't care. Turnaround is a trust signal.

### 2. Transparency over opacity
Users who get rejected corrections deserve clear explanations. Users whose content gets hidden deserve to know why.

### 3. Source > opinion
When disputes arise between users and editors, the conversation is "what does the source say?" not "who has more authority?"

### 4. Artist preference respected
When an artist self-identifies or claims their profile, their voice carries weight for self-related facts. Third-party claims about them still need sources.

### 5. Archive > audience
If a popular claim is unsourced, it gets removed even if it makes users unhappy. The archive is the value. Popularity is not.

### 6. Never silent-edit contested claims
When we update a contested fact, the update is visible in edit history. No quiet revisions.

---

## Special cases

### Defamation risk
Any correction introducing a claim that could damage reputation of a real person (criminal activity, addictions not publicly confirmed, romantic affairs):

- Treated as defamation-risk.
- Requires: two independent Tier 1-2 sources, OR primary-source statement.
- If approved, language follows `04-Editorial/style-guide.md` conventions for sensitive topics.
- If rejected, user informed that the claim needs verifiable sources.

### Deceased artists
Corrections for deceased artists get additional care:
- Death dates require obituary or official announcement.
- Cause of death stated only if publicly confirmed.
- Tributes welcome on user lists; hagiography in our records is not.

### Ongoing legal matters
- We report facts as publicly reported.
- We do not speculate on outcomes.
- We update as legal process resolves.

### Artist requests to modify or remove
- Cosmetic updates (photo, bio phrasing): accepted if reasonable.
- Factual corrections: require source.
- "Please remove my profile": evaluated case-by-case. For public figures who are actively performing/releasing, profiles are generally retained as public interest / archive value.

### Legal takedown requests
- DMCA, defamation claims → handled per `08-Legal-Compliance/`.
- Emergency: temporarily hide content pending review.
- Non-emergency: acknowledge within 72 hours, respond within 7 days.

---

## Moderator training (for future hires)

New moderators shadow existing editor for one full week before independent review. Training covers:

- This document.
- Style guide (`04-Editorial/style-guide.md`).
- Taxonomy (`04-Editorial/taxonomy.md`).
- Source catalog (`05-Data/source-catalog.md`).
- Common edge cases (compiled from actual queue history).

Review sample of 50 real corrections with editor, discuss each.

---

## Metrics we track

- Correction submission volume.
- Time to review (median, p95).
- Acceptance rate.
- Rejection reasons distribution.
- Repeat submitter rate (users submitting multiple corrections).
- Source-included vs. source-absent rate.
- Error rate (corrections we accepted that turned out wrong).

Goal: correction throughput grows without error rate climbing.

---

## When moderation is overloaded

If the queue grows beyond capacity:

1. **Prioritize:** claimed-artist corrections, source-backed corrections, higher-traffic entities.
2. **Batch:** dedicate blocks of time instead of scattered reviews.
3. **Hire:** see `admin-operations.md` for trigger thresholds.
4. **Trust more:** consider granting trusted-contributor status to repeated high-quality correction submitters, allowing their edits to go live with post-hoc review.

---

*See also: [`admin-operations.md`](./admin-operations.md), [`05-Data/data-qa.md`](../05-Data/data-qa.md), [`08-Legal-Compliance/terms-draft.md`](../08-Legal-Compliance/terms-draft.md)*
