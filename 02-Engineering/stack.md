# Technology Stack

**Department:** Engineering
**Owner:** Luis Figuera
**Last updated:** April 22, 2026

---

## Stack at a glance

| Layer | Tool | Tier | Monthly cost (MVP) |
|---|---|---|---|
| Frontend framework | Next.js 14 (App Router) | OSS | $0 |
| UI system | Tailwind + shadcn/ui | OSS | $0 |
| Hosting | Vercel | Hobby | $0 |
| Database + Auth + Storage | Supabase | Free → Pro | $0 → $25 |
| Cache | Upstash Redis | Free tier | $0 |
| Automation | n8n (self-hosted) | OSS | $0 |
| LLM | Claude API | PAYG | ~$100 |
| Email | Resend | Free (3k/mo) | $0 |
| Analytics | Plausible | Paid | $9 |
| Error tracking | Sentry | Free | $0 |
| DNS + WAF + CDN | Cloudflare | Free | $0 |
| Domain | Cloudflare Registrar | — | ~$1/mo |
| Bot protection | Cloudflare Turnstile | Free | $0 |
| **MVP total** | | | **~$135/mo** |

---

## Frontend

### Next.js 14 (App Router)

**Why:**
- Best-in-class SSR/ISR for SEO-heavy sites.
- Server components reduce client JS for read-heavy pages.
- First-class Vercel integration.
- Luis already uses it.

**Key features we rely on:**
- ISR with on-demand revalidation (critical for entity updates).
- Server actions for admin mutations.
- Middleware for slug history redirects and rate limiting.
- Dynamic OG image generation via `ImageResponse`.

### Tailwind + shadcn/ui

**Why shadcn over alternatives:**
- We own the components. Not a library dependency.
- Radix primitives under the hood = accessibility by default.
- Easy to customize per brand.

### Specialized UI libraries

- **Framer Motion** — section reveals, timeline scroll animations. Used sparingly.
- **React Flow** — collaborator networks, production lineage graphs. The canonical choice for interactive graphs.
- **Visx** — timelines, charts, scatter plots. More flexible than Chart.js, less heavy than D3.
- **MapLibre GL** — maps. Free, no API key needed with OpenMapTiles.
- **React Hook Form + Zod** — forms with typed validation.
- **TanStack Query** — server state. Not for DB reads in server components, but for admin UI and user-specific client state.

### Why not…

- **Remix** — Next.js has more ecosystem traction; ISR is the right primitive for this use case.
- **Astro** — excellent for content sites but weaker at interactive UIs (graphs, admin).
- **SvelteKit** — smaller community, less shadcn-equivalent polish.

---

## Backend / Database

### Supabase

**Why:**
- Single-vendor covers Postgres + Auth + Storage + Realtime + Edge Functions.
- pgvector built-in for semantic search later.
- RLS policies enforced at database level — security doesn't depend on app code being perfect.
- Generous free tier, predictable Pro pricing.
- Excellent TypeScript client.
- Luis already uses it.

**Specific features used:**
- Postgres 15 with extensions: `uuid-ossp`, `pgvector`, `pg_trgm`, `postgis`, `pgcrypto`.
- Row-Level Security on all tables.
- Database triggers for `updated_at`, slug history, completeness score recomputation.
- Storage for artist photos, release covers, source archive screenshots.
- Realtime subscriptions (not used in MVP — reserved for Phase 2 collaborative features).
- Edge Functions for triggering Vercel revalidation on data changes.

### Cache: Upstash Redis

**Why:**
- Serverless Redis — no ops overhead.
- REST interface works from Edge runtime.
- Free tier 10k commands/day covers MVP.

**Used for:**
- Expensive aggregations (top collaborators, top producers by placements).
- Rate limit counters.
- Graph query results for hot entity pages.

---

## Automation

### n8n

**Why self-hosted n8n:**
- Luis runs it already on his Mac Mini server.
- Free. No per-execution pricing.
- Visual workflows legible for non-code collaborators later.
- Strong HTTP Request nodes for any API.

**Workflows (see `05-Data/ingestion-pipelines.md`):**
- Daily: check all tracked artists for new Spotify releases.
- Weekly: press discovery pass for incomplete profiles.
- On-demand: full enrichment of a single artist (triggered from admin).
- Nightly: QA — orphan detection, duplicate suggestions, completeness score recompute.

**When to migrate to Inngest / Trigger.dev:**
- If reliability becomes an issue on self-hosted.
- If long-running jobs (full graph rebuilds) become frequent.

---

## AI / LLM

### Claude API

**Why Anthropic:**
- Highest quality for structured extraction tasks in our testing.
- Strong Spanish-language handling.
- Native tool use + structured outputs.
- Prompt caching reduces repeated-context costs significantly.
- Luis has integration experience and cost optimization patterns.

**Model mix:**
- **Claude Sonnet (current latest)** — entity extraction from articles, bio drafting, cross-link disambiguation, editorial assist.
- **Claude Haiku** — high-volume validation, deduplication scoring, cheap first-pass classifiers.

**Budget controls:**
- Hard monthly cap: $150/mo during MVP.
- Logging of every call with cost attribution.
- Prompt caching on entity definitions and style guide (reused across calls).

### Embeddings

- **Voyage AI** (voyage-3) — embeddings for semantic search over bios, articles, editorial pieces. Cheaper than OpenAI, higher quality for multilingual.
- Stored in Supabase via pgvector.

### Transcription (when Phase 2+)

- **Whisper via Groq** — fast, cheap. For transcribing YouTube interviews once we get to extracting from video.
- **AssemblyAI** — fallback with better speaker diarization if needed.

---

## External data APIs

Detailed in `05-Data/source-catalog.md`. Here, summary only.

**Tier 1 (critical for MVP):**
- Spotify Web API — discography, metadata.
- MusicBrainz — deep credits, open data.
- YouTube Data API — channels, videos.
- Genius API — lyrics links, some credits, samples.
- Wikipedia + Wikidata SPARQL — bios, structured facts.

**Tier 2 (enrichment):**
- Apple Music, Deezer — cross-check metadata.
- Last.fm — genre tags, similar artists.
- Discogs — physical releases, rare data.

**Search:**
- SerpAPI ($50/mo) or Brave Search API (free tier) — automated web search for press discovery.
- Firecrawl — scraping (Luis already uses).

**Enterprise-grade (later):**
- Chartmetric — best-in-class music analytics. $140/mo. Added post-MVP if ROI clear.

---

## Admin and editorial tooling

**All admin lives in the same Next.js app.** Reasoning: one codebase, one auth, shared types, no context switching.

- **TipTap** — rich text editor for bios and editorial pieces. Extensible, ProseMirror-based.
- **Zod + react-hook-form** — form validation.
- **Custom components:**
  - Entity editor (with conditional fields based on entity type).
  - Source attacher (searches sources table, attaches to any fact).
  - Ingestion control (trigger pipelines, see queue status).
  - Moderation queue (review corrections).
  - Press review (triage press discovery results).

**Not using:**
- WordPress, Strapi, Payload, Directus, Sanity — too heavy for our needs, too opinionated, adds surface area without benefit when we own the schema.
- Retool / Internal.io — proprietary, would couple admin to a third-party tool. We build our own.

---

## Email and engagement

### Resend

**Why:** clean API, strong deliverability, React email templates, generous free tier.

**Used for:**
- Transactional: email verification, password reset, correction acknowledgment.
- Newsletters: weekly digest of new entries, editorial pieces.

### Web push (Phase 2)

- **OneSignal** free tier or Web Push API native.

### Discord

- Community server for power users, superfans, contributors. Not built — just set up. Moderation effort kept low at first.

---

## SEO and analytics

### Plausible

**Why over GA4:**
- Privacy-first, cookie-less → no GDPR banner needed.
- Simple, legible dashboards.
- No sampling of data.
- $9/mo for MVP traffic.

### SEO infrastructure

- Structured data (schema.org): `MusicGroup`, `MusicAlbum`, `MusicRecording`, `Person`, `Event`, `Place`. Implemented as reusable components.
- Dynamic sitemap split by entity type. Regenerated on schedule and on-demand.
- OG images generated via Vercel `ImageResponse` — unique per entity.
- Canonical URLs everywhere. Slug redirects via middleware.

### Ahrefs

Luis already subscribes. Used for:
- Competitor backlink analysis.
- Keyword research for editorial topics.
- Rank tracking for target queries.

---

## Error tracking and observability

- **Sentry** (free tier) — frontend exceptions, source-mapped.
- **Vercel logs** — server action errors, middleware issues.
- **Supabase logs** — slow queries, RLS denials.
- **n8n execution history** — pipeline failures.
- **Custom admin dashboard** — entity counts, ingestion health, queue sizes. Built in-app.

---

## Security

- All secrets in Vercel env vars. Never in client bundle.
- RLS on every table.
- Supabase Auth with MFA for admin users (required).
- Cloudflare WAF default ruleset + custom rules for `/admin`.
- Cloudflare Turnstile on public forms.
- Rate limits on public API routes via Upstash ratelimit middleware.

---

## Legal / compliance tech

- **Termly** or hand-written policies reviewed by a lawyer — see `08-Legal-Compliance/`.
- **Cookie consent** — not required under Plausible (cookieless) unless we add other tracking.
- **GDPR / data subject requests** — handled manually via email for MVP. Automated flow post-launch.

---

## Development environment

- **Node.js 20 LTS**, **pnpm** package manager.
- **TypeScript strict mode.**
- **Supabase CLI** for local development with Dockerized Postgres.
- **GitHub Actions** for CI (typecheck, lint, tests, migration validation).
- **Vercel Preview Deployments** for every PR.
- **Biome** for formatting and linting (faster than ESLint + Prettier).

---

## Decision log

| Date | Decision | Rationale |
|---|---|---|
| 2026-04-22 | Supabase over Firebase | Postgres relational model fits the graph; RLS > Firebase security rules for this shape of data. |
| 2026-04-22 | Custom admin over WordPress | Data model complexity wouldn't fit ACF cleanly; engineering velocity higher with shared types. |
| 2026-04-22 | Next.js over Remix/Astro | Breadth of ISR + Vercel synergy + existing Luis experience. |
| 2026-04-22 | Claude over OpenAI | Quality on extraction tasks, Spanish-language handling, prompt caching economics. |
| 2026-04-22 | n8n over Inngest/Trigger.dev | Zero marginal cost on self-hosted infra Luis already runs. Revisit if reliability suffers. |

---

*See also: [`architecture.md`](./architecture.md), [`data-model.md`](./data-model.md), [`05-Data/source-catalog.md`](../05-Data/source-catalog.md)*
