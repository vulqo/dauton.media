# System Architecture

**Department:** Engineering
**Owner:** Luis Figuera
**Last updated:** April 22, 2026
**Status:** v1 — Approved for build

---

## Architectural principles

1. **Serverless by default.** No servers to maintain until proven necessary.
2. **Postgres as source of truth.** Everything persistent goes through Supabase Postgres. No side-stores, no Firebase, no MongoDB.
3. **SSR for SEO, ISR for speed, CSR for interactivity.** Next.js handles this natively — use each where it fits.
4. **Ingestion is always asynchronous.** No user action triggers a long-running data fetch. Pipelines run on schedule or on admin trigger.
5. **Cache aggressively at the edge.** Entity pages are read-heavy and change rarely. Revalidate only when data changes.
6. **One admin tool, no external dashboards.** All editorial and ingestion work happens in the admin route of the same Next.js app. No separate WordPress, no separate Strapi.
7. **Schema-first, not code-first.** The database schema is the spec. Types are generated from it.

---

## High-level topology

```
┌──────────────┐      ┌─────────────────────┐      ┌──────────────┐
│   Browsers   │────▶│   Cloudflare DNS     │────▶│    Vercel    │
└──────────────┘      │   + WAF + Turnstile  │      │  (Next.js 14)│
                      └─────────────────────┘      └──────┬───────┘
                                                          │
                     ┌────────────────────────────────────┼────────────────────────────────┐
                     │                                    │                                │
                     ▼                                    ▼                                ▼
              ┌─────────────┐                      ┌─────────────┐                 ┌─────────────┐
              │  Supabase   │                      │  Upstash    │                 │ Claude API  │
              │  Postgres   │                      │  Redis      │                 │ (Anthropic) │
              │  + Auth     │                      │  (cache)    │                 └─────────────┘
              │  + Storage  │                      └─────────────┘
              │  + pgvector │
              └──────┬──────┘
                     │
                     │ (webhooks / polling)
                     ▼
              ┌─────────────┐
              │  n8n        │◀──── cron triggers (daily/weekly)
              │  workflows  │
              └──────┬──────┘
                     │
          ┌──────────┴────────────────────────────────────┐
          ▼                ▼                ▼             ▼
    ┌─────────┐      ┌─────────┐     ┌─────────┐   ┌─────────┐
    │ Spotify │      │MusicBrz │     │ YouTube │   │ Genius  │
    └─────────┘      └─────────┘     └─────────┘   └─────────┘
          │                │                │             │
          └────────────────┴────────────────┴─────────────┘
                              (external APIs)
```

## Components

### Frontend (Vercel + Next.js 14)

- **Framework:** Next.js 14 App Router.
- **Rendering strategy:**
  - Entity pages: **ISR (Incremental Static Regeneration)** with `revalidate: 3600` (1h) + on-demand revalidation triggered from admin on data change.
  - Search and directories: **SSR** for first load, client-side interactivity after.
  - Admin routes: **CSR** with protected server actions.
  - Homepage: **ISR** with 15-minute revalidation.
- **Styling:** Tailwind + shadcn/ui.
- **Animation:** Framer Motion (used sparingly — section reveals, timeline scroll).
- **Graph visualizations:** React Flow for interactive graphs, Visx for timelines and charts.
- **Maps:** MapLibre GL with OpenMapTiles style (free) or Mapbox free tier.
- **Forms:** react-hook-form + Zod validation.
- **State:** TanStack Query for server state. Zustand if local state grows beyond trivial.

### Backend / data (Supabase)

- **Postgres 15** with extensions: `uuid-ossp`, `pgvector`, `pg_trgm`, `postgis` (for geographic queries), `pgcrypto`.
- **Auth:** email + password, Google OAuth, magic links.
- **Storage:** bucket for uploaded artist photography, release covers when we host them, source screenshots.
- **Row-Level Security:** on every table, enforced at database level.
- **Edge Functions:** lightweight tasks triggered by database events (e.g., revalidate ISR on entity update).

### Cache (Upstash Redis)

- **Purpose:** cache expensive graph queries and computed aggregations (top producers by placements, collaborator counts, etc.).
- **TTL:** entity-level 1h, aggregation queries 24h.
- **Invalidation:** on admin write to underlying data.
- **Tier:** free until throughput requires paid. Usage estimated <10k ops/day for MVP.

### Automation (n8n)

- **Deployment:** self-hosted on existing Vulqo Mac Mini server.
- **Use cases:**
  - Scheduled ingestion: run daily to pull new releases from Spotify for all tracked artists.
  - Scheduled enrichment: weekly pass over incomplete profiles to find new press.
  - Scheduled QA: nightly cross-check for orphan entities, duplicate detection.
  - On-demand pipelines: triggered from admin UI for single-artist enrichment.
- **Workflows defined:** see `05-Data/ingestion-pipelines.md`.

### AI layer (Claude API)

- **Models:**
  - Claude Sonnet 4.6: entity extraction from unstructured text (press articles, Wikipedia), bio drafting assist, cross-link ambiguity resolution.
  - Claude Haiku 4.5: validation passes, deduplication checks, simple field extraction at scale.
- **Budget:** see `09-Business/financial-model.md`. MVP cap: $150/month.
- **Patterns:**
  - Structured outputs (JSON mode with strict schemas).
  - Prompt caching for repeated context (entity definitions, style guide).
  - Retry with exponential backoff on rate limits.
  - Never called directly from user-facing routes. Only from admin actions or background jobs.

### External APIs (ingestion sources)

See `05-Data/source-catalog.md` for full catalog. Core set:
- Spotify Web API, MusicBrainz, YouTube Data API, Genius, Wikipedia, Wikidata SPARQL, Apple Music, Deezer, Last.fm, Discogs.

Search/discovery: SerpAPI or Brave Search API. Firecrawl for scraping.

## Request flow examples

### Example 1 — Public fan visits artist page

1. User requests `culturewiki.example/artists/akapellah`.
2. Cloudflare serves from edge cache if available.
3. Otherwise, Vercel ISR serves the statically generated page (revalidated hourly).
4. Page includes: identity, discography (via database query), graph data for collaborator network (cached in Redis).
5. Client hydrates. React Flow renders network from pre-fetched JSON.
6. User clicks a collaborator. Next.js router navigates, same pattern repeats.

**Latency target:** first paint ≤ 1.0s, time-to-interactive ≤ 2.5s on 4G.

### Example 2 — Admin ingests new artist

1. Admin enters artist name in admin UI, clicks "ingest."
2. Next.js server action creates a pending record in database.
3. Action triggers n8n webhook with artist ID.
4. n8n workflow:
   - Queries Spotify API, resolves artist ID.
   - Fetches discography, writes to `releases` and `collaborations`.
   - Queries MusicBrainz for additional credits.
   - Queries Wikipedia, sends text to Claude for structured bio extraction.
   - Writes results to staging tables (not public yet).
5. Admin receives notification (email or in-app) that enrichment is ready for review.
6. Admin reviews in moderation queue, approves or edits.
7. Approval promotes staging data to live tables.
8. Next.js ISR revalidation triggered for affected entity pages.

**End-to-end target:** ingestion pipeline completes in ≤5 minutes per artist.

### Example 3 — User submits a correction

1. User on public page clicks "suggest correction."
2. Form captures: field, current value, suggested value, reason, optional source URL.
3. Submission writes to `corrections_queue` table.
4. Admin dashboard shows count. Admin reviews, approves or rejects.
5. If approved, correction applied to live record + entry added to `edit_history` for auditability.

## Non-functional requirements

### Performance
- Core Web Vitals in green on all entity pages.
- p95 TTFB < 300ms (global).
- Database queries for entity page: ≤ 5 queries total, ≤ 100ms aggregate.

### Reliability
- Target availability: 99.5% (Year 1). Vercel + Supabase baseline comfortably exceed this.
- Database backups: automatic daily (Supabase), retention 7 days on free tier, 30 days on Pro.
- Manual weekly export of core tables to S3-compatible storage (Backblaze B2) for belt-and-suspenders redundancy.

### Security
- All admin routes gated by Supabase Auth + role check at server-action level.
- RLS policies enforce read/write restrictions at database level — defense in depth.
- No secrets in frontend bundles. All API keys used only server-side or in n8n.
- Cloudflare Turnstile on correction submission form, newsletter signup.
- Rate limits on API routes (via Vercel middleware or Upstash ratelimit).

### Scalability
- MVP traffic assumption: 5k-50k unique monthly visitors. Current stack handles this with headroom.
- Scaling trigger for Supabase Pro ($25/mo): when free tier approaches limits (500MB DB, 2GB bandwidth).
- Scaling trigger for Vercel Pro ($20/mo): when team collaboration or analytics needed, or bandwidth > 100GB/month.

### Observability
- Vercel built-in logs and analytics.
- Sentry for frontend error tracking (free tier sufficient for MVP).
- Supabase logs for database query monitoring.
- n8n execution history for pipeline debugging.
- Custom admin dashboard: entity counts, last ingestion timestamps, queue sizes.

## Deployment

- **Environments:** `dev` (local), `preview` (Vercel preview deployments per PR), `production`.
- **Branching:** GitHub, `main` = production. Feature branches for each piece of work.
- **CI:** GitHub Actions running typecheck, lint, tests on PR.
- **CD:** Vercel auto-deploys `main` to production.
- **Database migrations:** Supabase CLI with versioned SQL migrations. Applied via GitHub Action on merge.

## Technical debt philosophy

Track debt explicitly in `02-Engineering/tech-debt.md` (create as it accumulates). Budget 20% of each sprint to debt reduction. Debt that compounds (bad schema, weak types, untested critical path) gets prioritized aggressively.

---

*See also: [`data-model.md`](./data-model.md), [`stack.md`](./stack.md), [`api-strategy.md`](./api-strategy.md)*
