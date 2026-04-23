# API Strategy

**Department:** Engineering
**Owner:** Luis Figuera
**Last updated:** April 22, 2026

---

## Scope

This document defines:
1. How external APIs are consumed (ingestion).
2. How internal APIs are structured (between frontend, Supabase, admin).
3. When and how a public Culture Wiki API might exist.

---

## External APIs (ingestion)

### Design principles

- **Never call external APIs from user-facing routes.** All external calls happen in background jobs, in n8n workflows, or in admin-triggered server actions. Users never wait on third-party responses.
- **Cache everything.** Once we have data from Spotify about a release, we don't re-fetch unless stale (staleness defined per source).
- **Retry with backoff.** All external calls use exponential backoff on 429/5xx errors.
- **Respect rate limits.** Use the most restrictive rate limit across sources as the pipeline's natural pace.
- **Persist raw responses.** Before parsing, we store the raw JSON response in a `raw_responses` table keyed by (source, endpoint, params, fetched_at). This lets us re-parse without re-fetching if our extraction logic improves.

### API inventory

See `05-Data/source-catalog.md` for the detailed catalog. Summary by tier:

**Tier 1 (daily / weekly use):**
| API | Auth | Rate limit | Use for |
|---|---|---|---|
| Spotify Web API | OAuth client credentials | 180 req/min | Discography, metadata, IDs |
| MusicBrainz | None (User-Agent required) | 1 req/sec | Deep credits, relationships |
| YouTube Data API v3 | API key | 10k quota units/day | Channels, videos |
| Genius API | Bearer token | ~unlimited practical | Credits, lyrics links, samples |
| Wikipedia REST | None | ~fair use | Bios, facts |
| Wikidata SPARQL | None | ~fair use | Structured entity data |

**Tier 2 (on-demand enrichment):**
| API | Auth | Rate limit | Use for |
|---|---|---|---|
| Apple Music API | Developer token | ~reasonable | Metadata cross-check |
| Deezer API | None | ~fair use | Metadata cross-check |
| Last.fm API | API key | 5 req/sec | Genre tags, similar artists |
| Discogs | Personal token | 60 req/min | Physical release history |

**Search:**
| API | Purpose |
|---|---|
| SerpAPI or Brave Search API | Automated web search for press discovery |
| Firecrawl | Article extraction, existing Vulqo account |

### Ingestion flow pattern

Every ingestion follows the same pattern:

```
1. Identify target (artist, release, etc.)
2. Check cache / last-fetched timestamp
3. If stale or missing → fetch from external API
4. Persist raw response to raw_responses
5. Parse response → staging table
6. Validation pass (Claude or rules)
7. If valid → apply to live tables
8. If ambiguous → route to admin moderation queue
9. Trigger downstream: revalidation, relationship updates
```

This pattern is implemented in each n8n workflow and each admin-triggered enrichment.

---

## Internal API: frontend ↔ database

### Public (read) access

**Pattern:** Next.js server components query Supabase directly via the `supabase-js` SDK using the **anonymous key**. RLS policies on every table ensure only public data is returned.

**No separate REST/GraphQL layer.** The database IS the API. Type safety comes from generated types.

**Examples:**

```typescript
// Server component: artist page
const artist = await supabase
  .from('people')
  .select(`
    *,
    origin_city:cities(name, country:countries(name_es)),
    roles:people_roles(role_type),
    releases(id, slug, title, released_date, cover_url),
    label_eras(from_date, to_date, deal_type, label:labels(name, slug)),
    press_mentions(
      quote_es,
      article:articles(title, url, published_date, outlet:media_outlets(name))
    )
  `)
  .eq('slug', slug)
  .eq('visibility', 'public')
  .is('deleted_at', null)
  .single();
```

RLS automatically restricts to `visibility = public`. One query, one round-trip, exactly the data needed.

### Authenticated (write) access

**Pattern:** Server actions in Next.js, which receive the user's JWT, validate the action, and write to Supabase using the user's session.

```typescript
'use server';
export async function addToFavorites(entityType: string, entityId: string) {
  const supabase = createServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new UnauthorizedError();
  
  return supabase.from('user_favorites').insert({
    user_id: user.id,
    entity_type: entityType,
    entity_id: entityId
  });
}
```

RLS enforces that users can only write their own favorites, their own lists, etc.

### Admin access

**Pattern:** Admin routes use a **service-role key** server-side only, bypassing RLS. Every admin action is wrapped in a middleware that:
1. Verifies the user is authenticated.
2. Verifies `user_profiles.is_admin = true` or `is_editor = true`.
3. Rate-limits admin actions to prevent runaway scripts.
4. Writes to `edit_history` on every mutation for audit trail.

---

## Realtime

Supabase Realtime is **not used in MVP**. Listed as a Phase 2 capability for:
- Live admin dashboard (queue sizes updating).
- Collaborative editing when multiple editors onboard.
- Live counts on public site (e.g., "500 people are browsing").

---

## Webhooks

### Outbound

- **Vercel revalidation webhook** — Supabase database trigger calls an Edge Function that hits Vercel's `/api/revalidate` endpoint with entity slug. ISR refresh triggered. Payload signed with HMAC.

### Inbound

- **Spotify release webhooks** — if we opt into Spotify's release notification webhooks (when available), updates flow into our ingestion queue.
- **Stripe webhooks** (Phase 2.5) — subscription events.

---

## Public Culture Wiki API — Phase 3+

**Decision:** no public API in MVP or early growth. Reasons:
- Premature commitment to API shape before we know the access patterns consumers want.
- API key management, rate limiting, documentation — all real cost.
- The data value is higher if we keep it behind the platform until we know who the buyers are.

**When to open it:**
- At least one serious B2B customer has signed a data agreement.
- We have support capacity for API consumers.
- The core data model is stable (no expected breaking changes for 6+ months).

**Likely shape when it ships:**
- REST over GraphQL. Simpler to document, cache, rate-limit.
- Versioned: `/v1/people/:slug`, `/v1/releases/:slug`.
- API keys per consumer, tiered pricing.
- Strict rate limits.
- Stable URLs: every entity's API endpoint never changes once published.

**Example endpoints (future):**
```
GET /v1/people?country=VE&role=artist&limit=50
GET /v1/people/:slug
GET /v1/people/:slug/collaborators
GET /v1/people/:slug/releases
GET /v1/releases/:slug
GET /v1/labels/:slug/roster?as_of=2022-01-01
GET /v1/search?q=...&entity_type=person
```

---

## Rate limiting (our public surface)

Even without a public API, public pages need protection from abuse.

- **Per IP:** 120 requests/minute for browse pages, 60/min for search.
- **Per authenticated user:** more generous, scaled to membership tier once applicable.
- **Admin endpoints:** no limit on the user's own actions, hard cap on destructive operations (e.g., bulk imports).

Implemented via Upstash Ratelimit middleware in Vercel.

---

## API-related open questions

- Do we expose an RSS/Atom feed of new entities and editorial pieces? (Leaning yes for Phase 2 — cheap, SEO positive, power-user friendly.)
- Do we offer a bulk dataset download (e.g., quarterly CSV of all artists) for researchers? (Leaning yes — free for non-commercial, licensed for commercial.)
- Do we support embedded widgets (e.g., "embed this artist's discography" iframe)? (Not decided — requires design and security work.)

---

*See also: [`architecture.md`](./architecture.md), [`data-model.md`](./data-model.md)*
