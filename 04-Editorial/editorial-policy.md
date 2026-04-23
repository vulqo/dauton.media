# Editorial Policy

**Department:** Editorial
**Owner:** Luis Figuera (pending dedicated editorial lead)
**Last updated:** April 22, 2026

---

## Mission

The editorial layer gives the archive its voice. It turns a database into a publication. Without editorial, we're a reference site. With editorial, we're a cultural institution.

Editorial does three things:

1. **Contextualizes the graph.** Articles explain why the data matters — scenes, moments, movements, feuds, breakthroughs.
2. **Breaks news within the archive.** Interviews, exclusives, analyses that only live here.
3. **Elevates craft.** Demonstrates the seriousness the archive claims. A plain archive plus excellent writing becomes cited.

---

## Scope

### What we publish

- **Artist profiles** (long-form) — 1,500-3,000 words, deeply sourced, published alongside the structured data on an artist's page. Pillar artists get these.
- **Scene histories** — regional, era-specific, or movement-specific pieces. "Caracas underground, 2005-2012." "La generación trap de Maracay."
- **Interviews** — primary-source conversations with artists, producers, journalists, stakeholders. Transcripted, edited, footnoted.
- **Essays** — thematic, analytical, historical. Not reviews of current releases; context pieces.
- **Lists with reasoning** — "The 25 most influential Venezuelan rap tracks, explained." Always with argument, never just ranking.
- **Deep dives** — single-artist, single-album, single-event explorations.
- **Historical recovery** — recovering obscure or lost moments of the scene.

### What we don't publish

- **Album/single reviews.** We don't grade new music. We're not Pitchfork. This is a deliberate non-compete.
- **News aggregation.** We're not chasing the daily news cycle.
- **Industry gossip.** No speculation, no rumor.
- **Paid promotions framed as editorial.** No sponcon disguised as coverage.
- **Listicles without substance.** "Top 10 hype songs" without argument is not for us.
- **Anything we can't source.**

---

## Editorial principles

### 1. Source everything
Every factual claim needs a source. Where a claim is contested, sources for multiple sides. Where a claim is the writer's opinion, label it clearly.

### 2. Quote generously, attribute precisely
We let artists and subjects speak in their own voices. Quotes are cited with interview date, outlet, and link. Never paraphrase when a direct quote is available.

### 3. Show the work
When we make a claim, we show how we arrived at it. The article structure often includes a "How I know this" note for non-obvious claims.

### 4. Neutrality on feuds, criticism of the scene allowed
We do not take sides in artist-vs-artist conflicts. We can criticize structural issues in the scene (exploitation, sexism, industry practices) — but the criticism is sourced and directed, never aimed at specific artists' personal lives.

### 5. Respect the subject
We write about real people. They have families, reputations, ongoing careers. Factual, fair, dignified.

### 6. Historical humility
When we write about eras we didn't live, we lean on primary sources — the people who were there. We don't pretend to have omniscient perspective on moments we know only secondhand.

### 7. Cultural specificity
We write in Spanish, primarily for Spanish-speaking readers, with Venezuelan cultural context by default. We don't over-explain to imagined English-speaking audiences. When we reference a neighborhood, a slang term, a historical moment — we explain it if truly obscure, but we don't condescend.

### 8. Editorial independence
Editorial decisions are not influenced by:
- Advertisers.
- Artist managers or PR.
- Labels.
- Audience metrics (we won't chase traffic with clickbait).
- Personal relationships of the writers.

---

## Editorial process

### Pitching
- Writers pitch stories internally via a simple form: headline, thesis, sources, length estimate.
- Editor-in-chief (Luis until hired) reviews within 48h.
- Approved pitches become drafts.

### Drafting
- Drafts live in Google Docs or Notion during writing phase.
- Writers name collaborators, interview subjects, and sources at the top of the doc.
- Fact-check pass before edit pass.

### Editing
- Structural edit first: argument, structure, pacing.
- Line edit second: prose quality, clarity, voice.
- Copy edit third: grammar, consistency.
- Final read-through for libel risk, fairness, sensitivity.

### Fact-checking
- Every factual claim marked.
- Fact-checker (or self-check for short pieces) verifies each against sources.
- Sources attached to the article record in the CMS.

### Publishing
- Draft imported into admin CMS.
- Entity cross-links verified.
- OG image generated/curated.
- Scheduled publish time set.
- Newsletter mention queued if applicable.

### Post-publish
- Corrections: fix immediately, note at bottom of article with date and nature of correction.
- Updates: if story develops, add a dated update note at top.
- Never quietly edit published pieces except for typos.

---

## Voice and register

### Writing voice
Serious without being academic. Warm without being chummy. Opinionated where opinion is earned.

**Do:**
- "Apache redefinió el flow venezolano con *Yakuza* en 2013."
- "El impacto real de Canserbero trasciende su corta carrera."
- "La escena de Maracay, tradicionalmente subvalorada, produjo…"

**Don't:**
- "Este épico rapero absolutamente legendario…" (hype)
- "Se podría decir que tal vez Apache influyó…" (hedge)
- "¡No te pierdas este artículo brutal sobre…" (clickbait)

### Register
Primary audience: Spanish-speaking hip-hop fans, 20-45, culturally engaged. Secondary: journalists, industry, academics.

- Use Venezuelan Spanish as default, with pan-Hispanic accessibility.
- Slang where it fits naturally; not performatively.
- Avoid insider jargon that excludes newer fans — explain on first use.
- Long sentences OK. Complex structure OK. Underestimate no one.

---

## Content calendar

### MVP-era (months 4-6, editorial launch phase)
- 1 piece per week, minimum.
- Mix: 2 artist profiles / 1 scene piece / 1 interview per month.
- Heavy investment in the first 10 pieces — these set the quality bar.

### Growth-era (months 7-12)
- 2 pieces per week (with contributor support).
- Continue the mix plus occasional experimental formats (oral histories, visual essays).

### Long-term
- Sustained rhythm of 2-3 pieces per week.
- Annual features: year-in-review, decade retrospectives, scene state-of.
- Anniversaries leveraged (album anniversaries, artist birthdays, scene milestones).

---

## Relationship with entities

### How articles reference entities
Every mention of an artist, producer, label, release, or place in an editorial piece auto-links to that entity's profile. The parser handles this at publish time.

### How entity pages reference articles
Every published article about an entity appears in the "Press" section of that entity's profile, tagged as "Culture Wiki editorial."

### How articles contribute to data
Facts asserted in articles are additions to the graph. If a writer reports "X firmó con Y sello en 2019," that becomes a `label_era` entry with the article as source.

---

## Writers and contributors

### In-house writers
Initially: Luis as editor and occasional writer. As revenue allows, one or two paid contributors.

### Contributor profiles
Every writer has a page on the site: bio, list of articles. Contributors are public — no pseudonyms unless specific justification (political safety, etc.).

### Payment
When contributors are paid: per-piece rate scaled to length and reporting depth. Rates public (transparency).

### Rights
Contributors grant Culture Wiki perpetual publishing rights. Contributors retain copyright and can republish elsewhere after 30 days with attribution.

---

## Moderation of entity-level community content

This document is about editorial. User-submitted content (corrections, list descriptions, profile notes) is governed by `06-Operations/moderation-workflow.md`.

Editorial does not moderate comments. If/when comments are added to editorial pieces (post-MVP), community moderation applies.

---

*See also: [`style-guide.md`](./style-guide.md), [`taxonomy.md`](./taxonomy.md), [`03-Design/brand.md`](../03-Design/brand.md)*
