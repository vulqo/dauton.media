# MVP Scope

**Department:** Product
**Owner:** Luis Figuera
**Last updated:** April 22, 2026

---

## What ships in the MVP

The MVP is what goes live at v1.0 (Week 10). Everything below is in scope. Anything not listed here is explicitly out of scope for MVP.

### Data

- **Entity types live:** artists, producers, labels, releases, tracks, crews, cities, events, articles, sources.
- **Entity types scaffolded but empty:** venues, studios, DJs, journalists, videos, awards, brands, samples, scenes. (Schemas exist. Not populated until Phase 2.)
- **Venezuelan artists:** 100+ with Layer 1 (identity) + Layer 2 (discography) complete.
- **Pillar artists:** 15 with Layers 1-7 at ≥90% completeness.
- **Collaborators (non-Venezuelan):** appear as peripheral entities with Layer 1 only.

### Pages

- Homepage with featured artists, scene stats, recent additions.
- Artist directory, filterable.
- Artist profile (all conditional sections).
- Producer directory (includes dual-role artists).
- Producer profile.
- Label directory.
- Label profile.
- Release profile.
- Track page (if tracks.length worth of detail exists).
- Crew profile.
- City profile.
- Event profile.
- Compare view (2-4 entities).
- Search results page.
- User profile (logged-in view).
- User list page (public shareable).
- Static pages: about, methodology, style guide (public), credits, privacy, terms.

### Features

- Global search with entity-type filters (Postgres FTS).
- Cross-linking parser active site-wide.
- Completeness score visible on all entity pages.
- Collaborator network graph on artist pages.
- Career timeline on artist pages.
- Label journey visualization.
- User auth (email + Google OAuth).
- Save to favorites, create public/private lists.
- Newsletter signup (Resend).
- Correction submission form (goes to moderation queue).
- Admin: entity CRUD, ingestion queue, source management, moderation queue.

### SEO and distribution

- Dynamic sitemap segmented by entity type.
- Structured data: MusicGroup, Person, MusicAlbum, MusicRecording, Event, Place schemas.
- OG image generation per entity.
- Meta tags per entity.
- Plausible analytics.

---

## What does NOT ship in the MVP

These are explicitly deferred to later releases, and I am listing them to prevent scope creep.

- **Editorial writing.** No long-form pieces. Scaffolding exists but no public articles. → v2.0
- **Premium tier / payments.** No Stripe, no paywall. → v2.5
- **Artist verification flow.** No "claim profile" with ID verification. Manual request via correction form. → Phase 2
- **Mobile apps.** Responsive web only. → Not planned for year 1.
- **API access.** No public API. → Phase 3
- **English edition.** Spanish only. → Phase 3
- **Comment system on entities.** Deferred to avoid moderation burden at launch. → Phase 2
- **Badges, achievements, gamification.** Not for MVP.
- **Audio embeds beyond link-outs.** We link to Spotify/Apple, don't embed players on every page.
- **Lyrics.** Not even links. Genius owns that space.
- **Venues, studios, journalists, videos, awards, brands, samples.** Schemas exist but no UI.

---

## Minimum data targets for MVP launch

For the MVP to feel credible at launch, these minimums must be hit:

| Entity type | MVP target | Stretch |
|---|---|---|
| Artists (Venezuelan core) | 100 | 150 |
| Artists total (incl. collaborators) | 250 | 400 |
| Producers | 40 | 60 |
| Releases | 1,000 | 1,500 |
| Tracks | 5,000 | 8,000 |
| Labels | 30 | 50 |
| Crews | 20 | 30 |
| Collaboration edges | 5,000 | 8,000 |
| Production credits | 1,500 | 3,000 |
| Press mentions | 300 | 500 |
| Cities with associated entities | 15 | 25 |
| Career events | 500 | 1,000 |
| Sources (unique) | 200 | 400 |

If the minimums are not met by Week 10, v1.0 delays by 1-2 weeks. We do not launch an empty platform.

---

## Pillar artists (Week 11-12 curation target)

The 15 artists selected for deep manual curation before soft launch. These are the "demo pages" — if someone lands on Culture Wiki for the first time, these are the profiles that prove the platform is serious.

**Selection pending.** Luis to finalize in collaboration with editorial direction. Rough draft list (subject to change):

1. Canserbero
2. Apache
3. Akapellah
4. Gabylonia
5. McKlopedia
6. Lil Supa
7. Nerza
8. Cayro
9. Oldtape (as producer-primary)
10. Micro TDH (if scope includes trap)
11. Lil Goofy
12. Rxnde Akozta (Cuban-Venezuelan; tests diaspora model)
13. Neutro Shorty
14. Jeiby
15. Trainer

For each pillar: Layer 1 + 2 + 3 + 4 + 5 + 6 + 7 populated. ≥15 press citations. Photography curated. Bio long written (≥400 words, sourced).

---

## Pre-launch checklist (v1.0 gate)

- [ ] Data minimums met (see table above).
- [ ] All 15 pillar artists at ≥90% completeness.
- [ ] Every template renders correctly at all data densities.
- [ ] Lighthouse performance ≥90 on representative pages.
- [ ] Accessibility audit: zero critical WCAG violations.
- [ ] SEO: sitemap validates, structured data passes Google's Rich Results test.
- [ ] Legal pages live.
- [ ] Methodology page live (explains how data is sourced).
- [ ] Admin workflows tested end-to-end.
- [ ] Ingestion pipelines documented and runnable.
- [ ] Moderation queue tested with real corrections.
- [ ] Newsletter welcome email shipping.
- [ ] Analytics confirmed capturing data.
- [ ] Backup and disaster recovery procedure documented.
- [ ] 5 external testers have tried the site and given feedback.

---

*See also: [`prd.md`](./prd.md), [`roadmap.md`](./roadmap.md), [`05-Data/source-catalog.md`](../05-Data/source-catalog.md)*
