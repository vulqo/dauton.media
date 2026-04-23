# Source Catalog

**Department:** Data
**Owner:** Luis Figuera
**Last updated:** April 22, 2026

---

## Purpose

Every external source Culture Wiki uses for data ingestion, enrichment, or reference. For each source: what it is, what we get from it, auth requirements, rate limits, costs, reliability, and current status.

This is the master reference document for anyone working on the ingestion pipelines.

---

## Tier 1 — Core ingestion sources

### Spotify Web API

- **URL:** https://developer.spotify.com/documentation/web-api
- **Purpose:** Artist discography, metadata, popularity, genres, related artists, ISRC codes, collaborations.
- **Auth:** OAuth 2.0 client credentials flow. Requires Client ID + Secret.
- **Rate limit:** ~180 requests/minute, soft limits on bursts.
- **Cost:** Free for commercial use within terms.
- **Reliability:** Excellent. High uptime.
- **Primary data we pull:**
  - Artist: ID, name, image, genres, popularity, followers.
  - Artist albums: all release types, release date, tracks, label, total tracks.
  - Tracks: title, duration, ISRC, featured artists, explicit flag, preview URL.
  - Related artists (for graph suggestions).
- **Limitations:**
  - No deep production credits (beat makers, mix engineers usually missing).
  - Genres are broad Spotify internal categories, often incorrect for Latin artists.
  - Some older releases missing.
- **Status:** To be set up. Need Luis to register app at developer.spotify.com.

### MusicBrainz

- **URL:** https://musicbrainz.org/doc/MusicBrainz_API
- **Purpose:** Deep production credits, label history, relationships between artists, alternative IDs (ISWC, discogs), recording vs release vs work distinctions.
- **Auth:** None (optional user-agent header strongly requested). No API key.
- **Rate limit:** 1 request per second per IP (hard limit). Can apply for higher limit.
- **Cost:** Free. Open data (CC0-like for data).
- **Reliability:** Good. Community-maintained, some gaps for Latin artists.
- **Primary data we pull:**
  - Recording credits (producer, writer, engineer, performer roles).
  - Artist relationships (collaborators, mentors, members of groups).
  - Label releases with exact imprint and catalog numbers.
  - Alternative aliases and name history.
- **Strengths for our project:**
  - Only source with reliable producer-level credits at scale.
  - Open data means we can build on top without restrictions.
- **Limitations:**
  - Latin artist coverage uneven — big names have rich data, smaller artists sparse.
  - Rate limit requires careful batching.
- **Status:** Ready to use immediately, no signup needed.

### YouTube Data API v3

- **URL:** https://developers.google.com/youtube/v3
- **Purpose:** Artist channel metadata, official videos, view counts, descriptions.
- **Auth:** API key (Google Cloud Console).
- **Rate limit:** 10,000 quota units/day default. Each type of call costs different units (search = 100, video details = 1).
- **Cost:** Free within quota. Paid tier exists but rarely needed.
- **Reliability:** Excellent.
- **Primary data we pull:**
  - Artist channel: handle, subscriber count (if public), video count.
  - Video metadata: title, description (rich source of collab information), publish date, views.
  - Captions / auto-generated subtitles (Phase 2 — for interview transcription).
- **Status:** Need Luis to enable API, create API key.

### Genius API

- **URL:** https://docs.genius.com
- **Purpose:** Lyrics URLs (we link, we don't host), partial credits, samples, some annotation context.
- **Auth:** Bearer token (register app on Genius).
- **Rate limit:** No hard published limit; informally ~hundreds/minute.
- **Cost:** Free.
- **Reliability:** Good for popular tracks; patchy for underground.
- **Primary data we pull:**
  - Song metadata, producer and writer credits (when present).
  - Samples used in song.
  - Lyrics URL (we link to Genius rather than host).
- **Limitations:**
  - Latin coverage is incomplete.
  - Many tracks have partial or no credits even when present on Genius.
- **Status:** Need Luis to create Genius API app.

### Wikipedia + Wikidata

- **Wikipedia URL:** https://en.wikipedia.org/api/rest_v1 (and `es` variant)
- **Wikidata URL:** https://query.wikidata.org/sparql
- **Purpose:** Bios, structured facts, cross-IDs (links between Spotify, MusicBrainz, IMDb, etc.).
- **Auth:** None (user-agent requested).
- **Rate limit:** Fair use. No hard limit enforced.
- **Cost:** Free.
- **Reliability:** Good for established artists; thin for underground.
- **Primary data we pull:**
  - Artist bio text (for seed — later replaced or curated).
  - Structured facts: birth, origin, instruments, labels, associated acts.
  - Cross-platform IDs via Wikidata SPARQL queries.
- **Limitations:**
  - Many Venezuelan rap artists have no or stub Wikipedia entries.
  - Wikipedia bio text is CC BY-SA, not public domain — attribution required if we use verbatim. We use as seed and rewrite.
- **Status:** Ready to use.

---

## Tier 2 — Enrichment sources

### Apple Music API

- **URL:** https://developer.apple.com/documentation/applemusicapi
- **Purpose:** Cross-check metadata, fill Spotify gaps, occasionally better credits.
- **Auth:** Developer token (requires Apple Developer account, $99/year).
- **Rate limit:** Generous for server-to-server.
- **Cost:** $99/year for Apple Developer. Decision: skip until post-MVP unless clear need emerges.
- **Status:** Deferred.

### Deezer API

- **URL:** https://developers.deezer.com
- **Purpose:** Metadata cross-check, some Latin catalog differences from Spotify.
- **Auth:** None for public data; OAuth for user-scoped.
- **Rate limit:** Fair use.
- **Cost:** Free.
- **Status:** Use selectively for cross-check.

### Last.fm API

- **URL:** https://www.last.fm/api
- **Purpose:** User-generated genre tags, similar artists (for discovery suggestions), scrobble data.
- **Auth:** API key.
- **Rate limit:** 5 req/sec.
- **Cost:** Free.
- **Value for us:**
  - Tags are crowdsourced and often more accurate than Spotify's algorithmic genres.
  - "Similar artists" can suggest graph connections we've missed.
- **Status:** Secondary source, use for enrichment.

### Discogs API

- **URL:** https://www.discogs.com/developers
- **Purpose:** Physical release data (rare for Latin rap but valuable when present), release variations, collectible info.
- **Auth:** Personal token.
- **Rate limit:** 60 requests/minute.
- **Cost:** Free.
- **Value for us:**
  - When physical releases exist, Discogs has label + catalog + year data more reliably than streaming.
  - Useful for historical research on 90s-2000s Venezuelan rap tapes/CDs.
- **Status:** Use selectively for historical deep-dives.

### AllMusic

- **URL:** https://www.allmusic.com (no public API)
- **Purpose:** Rich editorial bios and discographies (English).
- **Auth:** N/A — scraped if used.
- **Cost:** None for scraping at low volume; ToS-sensitive.
- **Status:** Reference only. Do not scrape at scale.

---

## Search and discovery APIs

### SerpAPI

- **URL:** https://serpapi.com
- **Purpose:** Automated web search for press discovery, checking for new coverage.
- **Auth:** API key.
- **Rate limit:** Depends on plan.
- **Cost:** Starts at $50/month for 5,000 searches. Free tier of 100 searches/month.
- **Value for us:** Primary engine for discovering new press mentions of artists.
- **Status:** Decision between SerpAPI (reliability) and Brave (cost). Likely start with Brave free tier.

### Brave Search API

- **URL:** https://brave.com/search/api/
- **Purpose:** Same as SerpAPI. Alternative provider.
- **Auth:** API key.
- **Rate limit:** Free tier: 2,000 queries/month. Paid tier from $3/1K queries.
- **Cost:** Free tier generous for MVP.
- **Status:** Start here.

### Firecrawl

- **URL:** https://firecrawl.dev
- **Purpose:** Scrape full article content from press URLs discovered via search.
- **Auth:** API key.
- **Cost:** Luis already has account through Vulqo.
- **Value for us:** Reliable extraction of article body text for Claude to process.
- **Status:** Active, in use.

---

## Scraping sources (no API — used sparingly)

### Primary research targets via scraping

- Specific Venezuelan hip-hop websites (historical blogs, where they survive).
- Wayback Machine snapshots of defunct scene sites.
- YouTube comments / descriptions for collaboration hints (where API falls short).

### Rules for scraping

- Respect robots.txt.
- User-Agent identifies us as Culture Wiki with contact email.
- Rate limited generously (no more than 1 req/second to any single host).
- Always check Terms of Service before scraping at scale.
- Prefer archive.org when possible.

---

## Social platforms

We reference social accounts but do not pull data from social APIs in MVP. Reasons:

- Instagram API is heavily restricted.
- TikTok API is limited to certain partner accounts.
- Twitter API is expensive post-2023 changes.

What we do:

- Store handles in artist records.
- Link to social profiles.
- Phase 2: consider RSS mirrors or Apify for selective social data.

---

## Proprietary / premium (future)

### Chartmetric

- **URL:** https://chartmetric.com
- **Purpose:** The gold standard for music analytics. Streaming metrics, playlist additions, social metrics, market insights.
- **Cost:** $140/month (Essentials) — $700+/month (Pro).
- **When to add:** Post-MVP, when we can use the insights for either editorial angles or B2B sales.
- **Status:** Deferred.

### Soundcharts

- **URL:** https://soundcharts.com
- **Purpose:** Similar to Chartmetric. Strong on emerging markets.
- **Cost:** Custom enterprise pricing.
- **Status:** Deferred.

### Luminate (formerly Nielsen Music / MRC Data)

- **Purpose:** Sales and streaming data, rights-holder grade.
- **Cost:** Enterprise only, not accessible to small operations.
- **Status:** Not realistic for years.

---

## Summary by priority for MVP

**Week 1-2 (setup):**
- Spotify API credentials.
- YouTube API key.
- Genius API app.
- Brave Search API key (or free tier).
- MusicBrainz user-agent configuration (no signup).

**Week 2-4 (first ingestion):**
- Spotify → discography.
- MusicBrainz → credits.
- YouTube → channel metadata.
- Wikipedia + Wikidata → bio seeds.

**Week 5-6 (enrichment):**
- Genius → credits gap-fill.
- Last.fm → genre tag cross-check.
- Brave Search + Firecrawl → press discovery.

**Week 7-8 (refinement):**
- Discogs → historical releases.
- Deezer → metadata cross-check.

---

## Data freshness policy

| Source | Re-fetch frequency | Rationale |
|---|---|---|
| Spotify artist details | Weekly | Follower counts, new releases |
| Spotify discography | Daily for tracked artists | Catch new releases fast |
| MusicBrainz | Monthly | Slow-changing, authoritative |
| YouTube channel | Weekly | View counts evolve |
| Genius | Monthly | Editorial updates slow |
| Wikipedia | Monthly | Slow-changing |
| Press discovery | Weekly per artist | Balance coverage with cost |

---

## Legal posture

Every source is used under its terms. Key points:

- **Spotify:** use is permitted per developer terms; attribution of source (Spotify logo link-back where appropriate) required.
- **MusicBrainz:** CC0 data. No attribution strictly required but we credit them.
- **Wikipedia:** text is CC BY-SA. We do not republish verbatim — we use as research to write our own, original prose.
- **Genius:** lyrics are copyrighted; we link, we don't reproduce. Metadata use is permitted.
- **Wayback Machine:** archived content falls under fair use for reference.
- **Press articles retrieved via Firecrawl:** we extract metadata and short quotes for citation. We do not republish articles.

Full legal review in `08-Legal-Compliance/ip-and-fair-use.md`.

---

*See also: [`ingestion-pipelines.md`](./ingestion-pipelines.md), [`data-qa.md`](./data-qa.md)*
