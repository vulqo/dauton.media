# Product Requirements Document

**Department:** Product
**Owner:** Luis Figuera
**Last updated:** April 22, 2026
**Status:** v1 — Approved for build

---

## 1. Product summary

Culture Wiki is a web platform that catalogs Spanish-language rap as a connected graph of entities (artists, producers, labels, releases, tracks, venues, events, and more), renders them through reusable templates with dynamic sections, and supports both structured discovery and editorial publishing.

The core UX loop is: **discover an entity → explore its connections → discover more entities**. Every name on every page is a link. Every link leads to another fully-realized profile. The archive compounds in value as it grows.

## 2. The three layers

### Layer 1 — Reference archive (data)
Structured, sourced, citable. Every artist, producer, label, release, track, venue, event has a canonical record with links to authoritative sources.

### Layer 2 — Discovery platform (graph)
The entities above are interconnected through typed relationships with metadata. Users navigate the graph. Visualizations surface patterns (collaboration networks, production lineages, label rosters over time, geographic scenes).

### Layer 3 — Editorial publication (voice)
Original writing that contextualizes the archive: artist profiles written by humans, scene histories, reviews, interviews, analyses. The editorial layer pulls entities from the archive and embeds them as live links.

All three layers share the same underlying data model. Editorial pieces are not separate content — they are views over the graph with authored prose.

## 3. Product pillars

### Pillar 1 — The graph is the product
Entity pages are not static. They are rendered views of a dynamic, interconnected database. Every relationship is a navigable link. Every data point has a source.

### Pillar 2 — Templates, not pages
Each entity type (artist, producer, label, etc.) has one template. Sections within the template render conditionally based on available data. No custom pages for individual entities, ever.

### Pillar 3 — Progressive disclosure
A profile with 20% completeness is still valuable. A profile with 80% completeness is richer. The site works at every level of completeness. Completeness score is visible and invites contribution.

### Pillar 4 — Source-first editorial
No fact enters the database without a source. Sources are first-class entities in the system. Every page displays its sources.

### Pillar 5 — Cross-linking by default
Any mention of a known entity in any text is automatically linked to that entity's page. This is not manual work — it's a system-level feature.

## 4. Scope: MVP

### In scope

- **Entity types (launch set):** artists, producers, labels, releases, tracks, crews, cities, events, articles (press), sources.
- **Entity types (Phase 2):** venues, studios, DJs, journalists, videos, awards, brands, samples, scenes.
- **Layers 1 and 2 complete for MVP.** Layer 3 (editorial) arrives in Phase 2.
- **Public browsing, search, entity pages, graph visualizations, timelines, comparative tables.**
- **User accounts** (Supabase Auth): favorites, public/private lists, newsletter subscription.
- **Admin panel** (custom, Next.js protected routes): entity CRUD, source management, ingestion control, moderation queue.
- **Spanish-language UI.** English edition in Phase 3+.
- **Venezuelan-focused roster.** Pan-Hispanic collaborators appear as peripheral entities with Layer 1 data only.

### Out of scope (MVP)

- Lyrics (copyright-heavy, Genius already owns this).
- Hosted audio or video.
- User-generated content beyond lists and corrections.
- Mobile native apps.
- Paid subscriptions (Phase 2).
- API access (Phase 3).
- English translations (Phase 3).
- Artist verification flow with document proof (Phase 2).

## 5. User personas

### Fan — primary, broad
Someone who loves the music and wants context. Comes in through search ("Canserbero discografía", "productor X"), through social shares, through editorial articles. Stays for the graph.

**Needs:** complete discography, clear relationships between artists, historical context, easy navigation between related entities.

### Journalist / writer — primary, narrow but high-value
Researches for articles, interviews, features. Needs sourced, citable facts fast.

**Needs:** accuracy, source visibility, copyable citations, dates verified, quote attribution.

### Artist / manager — secondary
Searches for their own profile. Wants to verify their story is told correctly. Wants to see the scene in context.

**Needs:** ability to claim profile, correct errors, see their own impact visualized.

### Label A&R / industry — tertiary but valuable
Looks for emerging talent, maps of collaborators, label history to understand where artists have been.

**Needs:** network visualizations, filterable rosters, career timeline patterns.

### Researcher / academic — tertiary
Cites the archive in academic or journalistic work.

**Needs:** stable URLs, clear sourcing, exportable data, citation format.

## 6. Key user flows

### Flow 1 — Fan discovers an artist
1. Arrives from Google search or social.
2. Lands on artist page.
3. Sees hero (photo, name, origin, bio intro).
4. Scrolls through sections: discography timeline, collaborators, label journey, press, career events.
5. Clicks a collaborator's name → navigates to that artist's profile.
6. Repeats 5+ times before leaving.

**Success:** ≥3 entity pages per session.

### Flow 2 — Journalist researches a piece
1. Searches for artist name.
2. Lands on profile.
3. Opens press section, scans citations.
4. Clicks through to a specific event or collaboration.
5. Copies formatted citation.

**Success:** citation copied, external link to source clicked.

### Flow 3 — Artist sees their own profile
1. Searches their own name.
2. Lands on profile.
3. Sees bio, discography, relationships.
4. Clicks "claim this profile" → email verification.
5. Submits correction for a specific field.

**Success:** correction submitted and processed.

### Flow 4 — Registered user curates
1. Logs in.
2. Browses artists, clicks "save" on several.
3. Creates a named list ("Caracas scene pioneers").
4. Adds artists to list.
5. Makes list public.
6. Shares URL.

**Success:** public list created, shared externally.

## 7. Entity page template (spec)

Every entity type has a template with conditional sections. Below is the artist template as the reference case.

```
<ArtistPage>
  <Hero />                                    — always
  <QuickFacts />                              — always
  <Bio />                                     — if bio_long exists
  <DiscographyTimeline />                     — if releases.length > 0
  <ProducedByOthers />                        — if has production credits as subject
  <ProducedForOthers />                       — if role includes 'producer' and credits exist
  <CollaboratorNetwork graph />               — if collaborations.length ≥ 3
  <LabelJourney />                            — if label_eras.length > 0
  <CrewHistory />                             — if crew_memberships.length > 0
  <CareerTimeline />                          — if career_events.length ≥ 3
  <BusinessVentures />                        — if brands.length > 0
  <PressCoverage />                           — if articles.length > 0
  <InfluencesReceived />                      — if influences_from.length > 0
  <InfluencesGiven />                         — if influences_to.length > 0
  <SceneContext />                            — if scenes.length > 0
  <RelatedArtists />                          — always (computed from graph)
  <Sources />                                 — always (if count > 0)
  <EditHistory />                             — admin/editor only
</ArtistPage>
```

Similar templates exist for every entity type. See `02-Engineering/templates-spec.md`.

## 8. Comparative and computed views

First-class components that render over the graph:

- **Compare** — 2-4 artists side by side, customizable fields.
- **Ranking** — sorted list with filters ("top producers by placements in 2020-2024").
- **Network** — force-directed graph of connections around a node.
- **Timeline** — chronological events filtered by entity, period, type.
- **Map** — geographic view of cities, venues, scenes.
- **Table** — filterable, sortable, exportable data view of any entity type.

These are not separate pages hand-built for each query. They are parameterized components that work against the graph.

## 9. Completeness system

Every entity has a **completeness score** (0-100) computed from which data layers are filled. Public. Visible on the profile.

Rationale:
- Invites contribution from community and from the artist themselves.
- Lets us prioritize internal work (fill the most-visited incomplete profiles first).
- Signals to users what to trust — a 90% complete profile is different from a 25% one.

Scoring rubric is defined in `02-Engineering/data-model.md`.

## 10. What success looks like (product metrics)

**Quality**
- Completeness score average across all artists ≥ 60%.
- Source coverage: every published fact has ≥1 source attached.
- Cross-link density: average of ≥15 internal links per artist page.

**Engagement**
- Pages per session ≥ 3 (strong signal of graph navigation working).
- Return visitor rate ≥ 20% within 30 days.
- Registered users / total sessions ≥ 3%.

**Authority**
- Referring domains ≥ 300 by month 12.
- First press citation by month 6.
- First artist-claimed profile by month 4.

## 11. Versioning and releases

- **v0** (Sprint 0-2) — Private build, no public URL.
- **v1** (Sprint 3-4) — Soft launch. Public URL, core entity pages, auth.
- **v1.5** (Sprint 5-6) — All MVP features complete. Editorial scaffolding ready.
- **v2** (Month 6+) — Editorial layer live. Published pieces.
- **v2.5** (Month 9+) — Monetization active.
- **v3** (Year 2) — Pan-Hispanic expansion.

## 12. Dependencies

- Final data model (`02-Engineering/data-model.md`) — must be frozen before Sprint 2.
- Brand identity (`03-Design/brand.md`) — must be decided before Sprint 3 (frontend build).
- Editorial style guide (`04-Editorial/style-guide.md`) — must exist before first published bio.
- Legal review (`08-Legal-Compliance/`) — before public launch.

---

*See also: [`roadmap.md`](./roadmap.md), [`mvp-scope.md`](./mvp-scope.md), [`02-Engineering/data-model.md`](../02-Engineering/data-model.md)*
