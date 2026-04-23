# IP and Fair Use

**Department:** Legal & Compliance
**Owner:** Luis Figuera
**Last updated:** April 22, 2026

---

## Purpose

Culture Wiki operates at the intersection of factual reference (protected), editorial commentary (protected), and music industry data (mostly public but with complications). This document clarifies our posture on intellectual property and fair use, guides operational decisions, and identifies risks.

This document is internal. It informs how we build and operate. It does not replace legal advice, which is required before public launch and for specific edge cases.

---

## Core principle

**We publish facts about the music industry. We do not republish the music industry's content.**

Facts — who recorded what when, who produced which track, who toured with whom — are not copyrightable. The expression, sound recordings, lyrics, images, videos, and artwork produced by artists and labels are copyrighted.

We build a factual graph on top of public information. We link to the copyrighted works. We do not host them.

---

## What we do not reproduce

### Music
- We do not host audio files.
- We do not embed unauthorized streaming players.
- We link to official Spotify, Apple Music, YouTube where official versions exist.
- We do not link to unauthorized uploads or piracy sites.

### Lyrics
- We do not display lyrics.
- We link to Genius (or equivalent) when lyrics exist there.
- If we quote a lyric line in an editorial piece, we treat it as any other copyrighted quote — brief, transformative, for purposes of commentary or analysis. Maximum one or two lines per piece. Prefer paraphrase.

### Album art / photos
- We display album covers on release pages under **fair use for factual reference** (identifying the release). This is a long-standing industry practice (Discogs, RYM, AllMusic all do this).
- We display artist photos we've either: licensed, received explicit permission for, used from Creative Commons sources with attribution, or that are clearly in the public domain.
- Photos sourced via social media or press photos without explicit permission are flagged for eventual replacement. We use them cautiously, at small size, with attribution, and remove on request.

### Music videos
- We link to official uploads on YouTube.
- We may embed official uploads using the official YouTube embed (which is the artist's own distribution choice).
- We never re-upload videos.

### Article text (from press sources)
- We quote briefly (≤15 words) for attribution.
- We summarize in our own words.
- We do not reproduce paragraphs or substantial excerpts.
- We link to the original article for readers who want to read in full.

### Podcast audio / transcripts
- Phase 2+ if we transcribe podcasts: short excerpts only, transformed into factual extraction (who said what, when). Full transcripts not reproduced.

---

## What we create

### Our own text
All editorial prose on Culture Wiki is original writing by our staff or contributors. No Wikipedia text pasted. No rewording so close to a source that it qualifies as derivative.

AI-assisted writing follows the same standard: AI may help draft, but the final text is original, edited, and fact-checked.

### Our own data structure
The graph — the way we organize entities and relationships — is our original editorial work, even when the underlying facts came from public sources.

### Our own imagery
Where we create supporting imagery (OG images, editorial illustrations, scene diagrams), we produce them or commission them. No stock imagery of music stereotypes.

---

## Fair use analysis (our posture)

US fair use considers four factors:

### Factor 1: Purpose and character of the use
Our use is:
- **Transformative** — we organize, contextualize, and cross-reference; we are not a substitute for the original.
- **Non-commercial in nature** even when we monetize (reference archives are information services, akin to newspapers).
- **Educational and factual** — we document, inform, and preserve cultural history.

### Factor 2: Nature of the copyrighted work
- Facts are not copyrightable.
- Factual expressions (press articles reporting events) receive thinner copyright protection than creative expression.
- Album titles, names, dates, discographies are facts.

### Factor 3: Amount and substantiality of use
- We use minimal amounts — album covers at small size, brief quotes, factual extraction.
- We do not use "the heart" of any work (e.g., a signature hook, a memorable lyric line).

### Factor 4: Effect on the market
- We do not substitute for any original work. We drive traffic to streaming, press articles, and artists' own platforms.
- We plausibly increase the market for documented artists and works (we are a discovery engine).

This analysis applies to US law (Vulqo LLC is US-registered). Similar fair-dealing analyses exist in Venezuelan, EU, and other jurisdictions, with variations. Legal counsel to verify per jurisdiction before expansion.

---

## Specific copyright risk areas

### Risk: Album cover art
- **Precedent:** Discogs, RYM, AllMusic, Genius, and Wikipedia all display album art for factual identification. Industry-standard practice.
- **Our approach:** display at reasonable thumbnail sizes. Link to source (label / official channel). Respect takedown requests.
- **Mitigation:** maintain a takedown response process.

### Risk: Artist photographs
- **Highest risk area.** Press photos are often stock agency photos with aggressive licensing.
- **Our approach:**
  - Prefer: artist-provided photos, Creative Commons, public-domain historical.
  - Fallback: press photos used at small size with attribution.
  - Eliminate: uploaded stock agency photos without license.
- **Mitigation:** prioritize outreach to artists to request usable photos directly.

### Risk: Embedding social posts
- When embedding a tweet or Instagram post as source evidence, use the platform's official embed. The platforms have licenses to redistribute.

### Risk: Video frame grabs for illustration
- Small, contextual use may be fair. Frame grabs of music videos used to identify visuals of a release, with attribution to the official video: low risk.
- Phase 2 consideration.

### Risk: Press article text
- Quotes ≤15 words per source. One quote per source per piece maximum. Summarize in our words.
- Link always to original.
- Never reproduce full paragraphs.

### Risk: Lyrics in editorial
- Maximum 1-2 lines quoted per editorial piece for commentary/analysis.
- Never on entity pages.

### Risk: AI training data allegations
- We do not train AI models on copyrighted content. We use third-party AI providers (Anthropic, Voyage) whose own training practices are their responsibility.
- We use AI to process public and licensed content, not to generate derivative creative works.

---

## Database rights

Data itself (facts) is not copyrighted in US law. The selection, arrangement, and curation of data *can* receive copyright protection as a compilation.

**Our database is protected as a compilation** — the specific way we structure entities, the editorial decisions about what constitutes a noteworthy artist, the curation of sources and their framing.

Consequences:
- Our data can be licensed (see `09-Business/monetization.md`).
- Scrapers who systematically copy our database may infringe.
- Third-party data (MusicBrainz, Wikidata, etc.) we use is open by license; we comply with their terms.

### License of our own data (when we're ready to share)

Likely approach:
- **Non-commercial use:** freely available under CC BY-SA or equivalent.
- **Commercial use:** requires licensing agreement.
- **Academic use:** free with citation.

Decision on specific license terms to be made closer to data licensing launch.

---

## Trademark

### Our brand
"Culture Wiki" (or final name, pending) will be trademarked when name is final. Cost ~$300-500 for US registration.

### Other brands mentioned
Artist names, label names, crew names — we use them descriptively to identify the subjects. This is nominative fair use and generally non-infringing.

---

## Takedown and DMCA

### DMCA agent registration
Before public launch, Vulqo LLC registers a DMCA designated agent with the US Copyright Office. Cost: $6/filing. Required for safe harbor under the DMCA.

Agent information published on the site at `/legal/dmca`.

### Takedown process

Upon receipt of a proper DMCA notice or equivalent takedown request:

1. Acknowledge receipt within 72 hours.
2. Evaluate the claim:
   - Is the claim facially valid?
   - Is the content clearly infringing or is it fair use?
3. If content is clearly infringing: remove or restrict. Notify the uploader if applicable.
4. If content is fair use and we have a strong position: respond with our legal basis for retention, invite counter-notice.
5. Track all takedown requests in `/legal/takedowns-log.md` (internal).
6. For repeat claimants with weak claims: document pattern, may push back more firmly.

### Counter-notice
Users whose corrections or content is removed pursuant to a DMCA takedown can submit a counter-notice.

### Bad-faith takedowns
Legally, bad-faith takedowns are actionable. We reserve the right to respond accordingly.

---

## Defamation and right-of-publicity

### Defamation risks
Facts that could harm an artist's reputation if false:
- Criminal activity.
- Addictions, mental health issues.
- Romantic / family controversies.
- Professional disputes.

We only publish such facts when:
- Reported by Tier 1-2 sources independently.
- Or self-acknowledged by the artist publicly.

### Right-of-publicity
Using an artist's name and likeness for factual identification is standard reference-work practice and protected. Using their name/likeness in commercial advertising without consent is not.

We do not use artist names/likenesses in marketing of our own brand (e.g., "Join Culture Wiki, mentioned by [Artist]") unless artist consents.

---

## Terms of Service considerations

Key IP-related terms in user ToS (see `terms-draft.md`):

- Users warrant that content they submit (corrections, lists, articles) doesn't infringe third-party rights.
- Users grant us a license to display, modify, and redistribute their submissions as part of the archive.
- Users can request removal; we retain accepted factual corrections as part of the archive.
- We disclaim responsibility for user-submitted content beyond reasonable moderation.

---

## Risk ranking

| Risk | Likelihood | Severity | Our mitigation |
|---|---|---|---|
| Photo rights claim | Medium | Low-medium | Sourcing hierarchy + takedown process |
| Press scraping complaint | Low | Low | Quote <15w, attribute, link out |
| Label / artist objection to sourced facts | Low-medium | Low | Sourcing rigor, correction process |
| Defamation claim | Low | Medium | Source requirements on sensitive claims |
| Scraping of our data | Low (early) → Medium (later) | Low-medium | Rate limits, ToS clarity, eventual API |
| AI content concern | Low | Low | Human editing, factual nature of AI assist |

---

## What to do if we receive a legal inquiry

1. Do not respond immediately.
2. Forward to Luis.
3. Luis reviews and consults legal counsel if serious.
4. Respond within the required legal timeline.
5. Document in `/legal/inquiries-log.md`.

Serious matters (lawsuits, government orders) get counsel immediately.

---

## Pre-launch legal checklist

- [ ] DMCA agent registered with US Copyright Office.
- [ ] Privacy policy finalized and reviewed by counsel.
- [ ] Terms of Service finalized and reviewed by counsel.
- [ ] Cookie policy or explicit disclosure if using cookies beyond essential.
- [ ] Trademark filed for brand name (or at least filed).
- [ ] Photo usage audit: all launch-day photos have identified source and permission basis.
- [ ] About page and methodology page drafted with clear source transparency.
- [ ] Contact emails set up: privacy@, legal@, copyright@, dmca@.

---

*See also: [`privacy-policy-draft.md`](./privacy-policy-draft.md), [`terms-draft.md`](./terms-draft.md)*
