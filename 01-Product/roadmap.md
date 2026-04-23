# Roadmap

**Department:** Product
**Owner:** Luis Figuera
**Last updated:** April 22, 2026
**Horizon:** 12 months

---

## Release train overview

| Release | Codename | Window | Theme |
|---|---|---|---|
| v0.1 | Foundation | Weeks 1-2 | Infrastructure + data model |
| v0.2 | Seed | Weeks 3-4 | First 50 artists ingested with Layer 1-2 |
| v0.3 | Graph | Weeks 5-6 | Relationships populated, graph functional |
| v0.4 | Press | Weeks 7-8 | Press coverage layer operational |
| v1.0 | Public | Weeks 9-10 | Public launch, auth, SEO complete |
| v1.5 | Polish | Weeks 11-12 | Editorial spotlight on 15 pillar artists |
| v2.0 | Voice | Months 4-6 | Editorial layer live |
| v2.5 | Revenue | Months 7-9 | Memberships, sponsorships |
| v3.0 | Expansion | Months 10-12 | Pan-Hispanic rollout begins |

---

## v0.1 — Foundation (Weeks 1-2)

**Goal:** ship infra, schema, admin shell.

- Domain purchased, DNS configured (Cloudflare).
- Supabase project created. Schema v1 deployed per `02-Engineering/data-model.md`.
- Next.js 14 app scaffolded. Deployed to Vercel.
- Admin route group protected by Supabase Auth + role check.
- Basic admin CRUD for: artists, releases, labels, sources.
- n8n server configured for pipeline orchestration.

**Exit criteria:** Luis can create an artist in admin, add a release, add a source, and see it render on a basic public page.

## v0.2 — Seed (Weeks 3-4)

**Goal:** populate the first wave of data.

- Spotify API ingestion pipeline live.
- MusicBrainz integration live (primary source for credits).
- Wikipedia/Wikidata reader for bios.
- YouTube API reader for verified channels.
- Deduplication logic: one artist = one record regardless of alias.
- Seed 50+ Venezuelan artists. Layer 1 (identity) and Layer 2 (discography) complete.
- Admin review queue for enrichment results before they go live.

**Exit criteria:** 50 artists have complete identity + discography + streaming links, with ≥95% data accuracy on sampled review.

## v0.3 — Graph (Weeks 5-6)

**Goal:** the graph becomes real.

- Collaboration edges auto-populated from release features.
- Production credits ingested from MusicBrainz, Genius, Spotify.
- Label relationships inferred from release imprints.
- Crew memberships: seed data + manual admin interface for curation.
- Cross-linking parser operational: mentions of known entities in any text become links.
- First graph visualizations live (collaborator network on artist pages).

**Exit criteria:** clicking a producer on any release page leads to a producer page that shows every track they've produced.

## v0.4 — Press (Weeks 7-8)

**Goal:** external validation layer.

- Web search pipeline for press discovery (SerpAPI or Brave).
- Firecrawl integration for full-article retrieval.
- Claude extraction of: publication, date, subject, quote.
- Press mentions table populated for all seeded artists.
- Source table grows with every press citation.
- Press section renders on artist pages.

**Exit criteria:** every seeded artist has ≥3 sourced press mentions from ≥2 distinct outlets.

## v1.0 — Public (Weeks 9-10)

**Goal:** the platform becomes accessible.

- All entity page templates finalized and responsive.
- Search (global, fast) with entity-type filters.
- Directory pages for each entity type with filters.
- User auth live: signup, login, password reset, email verification.
- User favorites and lists functional.
- SEO: sitemap, robots.txt, schema.org markup, OG images, meta tags for every entity.
- Legal pages live: privacy, terms, credits, about.
- Analytics: Plausible installed.
- Public URL live. No more staging.

**Exit criteria:** Lighthouse ≥90 on all templates, 200+ entity pages indexable, zero critical accessibility violations.

## v1.5 — Polish (Weeks 11-12)

**Goal:** the showcase.

- 15 pillar artists get full manual curation:
  - Bio long written (sourced, fact-checked).
  - Complete label journey.
  - Career events timeline ≥10 entries each.
  - ≥15 press mentions.
  - Relationships marked explicitly.
  - Hero photography curated.
- These are the pages shown in any demo or external conversation.
- First newsletter sent to private list.
- Soft launch to close circle.

**Exit criteria:** 15 pillar profiles are at ≥90% completeness and demo-ready.

## v2.0 — Voice (Months 4-6)

**Goal:** editorial layer goes live.

- Editorial CMS interface in admin.
- Article template with entity embedding.
- First 12 editorial pieces published (≈weekly cadence).
- Editorial newsletter in Resend.
- Contributor onboarding for 1-2 external writers.
- "Articles" as a navigable section of the site.

## v2.5 — Revenue (Months 7-9)

**Goal:** first paid infrastructure.

- Stripe integration.
- Membership tier definitions, feature gating.
- Premium-only features live (advanced search, exports, ad-free, early access).
- Sponsorship inventory defined and sold.
- First deals closed.

## v3.0 — Expansion (Months 10-12)

**Goal:** pan-Hispanic rollout begins.

- Editorial sprint into one next market (Colombia or Mexico).
- Seed 100+ artists from the new market.
- Localized homepage sections.
- Expanded editorial calendar covering the new scene.

---

## Roadmap dependencies (external)

| Dependency | Needed by | Status | Owner |
|---|---|---|---|
| Final project name | v0.1 | Pending | Luis |
| Domain registration | v0.1 | Pending | Luis |
| API credentials (Spotify, MB, YT, Genius) | v0.2 | Pending | Luis |
| Pillar artist list (15 names) | v1.5 | Pending | Luis |
| Legal pages drafted | v1.0 | Pending | Review via template |

## Change log

- 2026-04-22: Initial roadmap drafted.

---

*See also: [`prd.md`](./prd.md), [`mvp-scope.md`](./mvp-scope.md)*
