# SEO Strategy

**Department:** Marketing & Growth
**Owner:** Luis Figuera
**Last updated:** April 22, 2026

---

## Why SEO is strategic, not tactical

For a reference site, organic search is the primary acquisition channel. Most of our audience will arrive through queries like:

- "[artist name] discografía"
- "[artist name] biografía"
- "[artist name] productor"
- "quién es [artist name]"
- "[album name]"
- "rap venezolano historia"

Every artist, release, producer, and scene is a potential landing page for hundreds of long-tail queries. With 200+ entities at launch and 1,000+ by Year 1, the long-tail surface area is massive.

**The SEO bet:** we can rank for the first-seat result on nearly every Spanish-language rap artist query within 12 months by combining structured data + editorial depth + page speed + freshness.

---

## Competitive landscape for our target queries

For most Venezuelan rap artist queries, current SERPs show:

1. Wikipedia (usually a stub or thin entry).
2. Spotify artist page (no context).
3. Genius artist page (no deep context).
4. YouTube channel.
5. Random Latin music blogs (often thin, often outdated).
6. Social profiles.

None of these provide a deep, sourced, navigable reference. Our opportunity is real — we just have to execute.

For broader hip-hop queries (e.g., "rap en español historia"), competition is stronger from Wikipedia, Remezcla, Rolling Stone ES. These are aspirational targets, not initial targets.

---

## Technical SEO foundation

### Structured data (schema.org)

Every entity page ships with JSON-LD structured data:

- **Artists** → `MusicGroup` or `Person` with role MusicGroup member.
- **Producers** → `Person` with `jobTitle` = producer.
- **Releases** → `MusicAlbum` (or variants for EP/single).
- **Tracks** → `MusicRecording`.
- **Events** → `MusicEvent`.
- **Labels** → `Organization` with `subjectOf` linked to releases.
- **Cities** → `Place`.
- **Editorial articles** → `Article` with `author`, `datePublished`, `about` pointing to entity.

This is the single highest-impact SEO lever for a data-dense site. Google rewards structured data for music entities strongly.

### URL structure

```
/artistas/[slug]
/productores/[slug]
/sellos/[slug]
/releases/[slug]
/tracks/[slug]
/crews/[slug]
/ciudades/[slug]
/eventos/[slug]
/escritos/[slug]                  (editorial articles)
/busqueda?q=[query]
/comparar?ids=[id1],[id2]
```

Slugs are lowercase, hyphenated, stable. Slug changes are tracked in `slug_history` and 301-redirected at middleware level.

### Sitemaps

Segmented by entity type:
- `/sitemap.xml` (index).
- `/sitemaps/artists.xml`
- `/sitemaps/producers.xml`
- `/sitemaps/labels.xml`
- `/sitemaps/releases.xml`
- `/sitemaps/editorial.xml`

Generated dynamically; regenerated daily.

### robots.txt

Allow all crawling. Disallow `/admin`, `/api/admin/`. Reference sitemap.

### Page speed

- Entity pages statically generated (ISR) with 1-hour revalidation.
- Edge caching via Vercel.
- Images: Next/Image with lazy loading, AVIF/WebP.
- Total JS bundle: target < 150KB on entity pages.
- Core Web Vitals: all green.

### Mobile

Mobile-first indexing is the reality. Every page must excel on mobile.

### HTTPS, canonical, international

- HTTPS enforced.
- Canonical URLs on every page.
- `hreflang` tags ready for Phase 3 English edition.

---

## On-page SEO

### Title tags
Formula per entity:
- Artist: `[Stage name] — Biografía, discografía y colaboradores | Culture Wiki`
- Release: `[Title] — [Artist] (YYYY) | Culture Wiki`
- Producer: `[Name] — Productor | Culture Wiki`
- Label: `[Name] — Sello discográfico | Culture Wiki`
- Editorial: `[Article title] | Culture Wiki`

Within ~60 characters when possible; longer if the entity name is long.

### Meta descriptions
Formula per entity:
- Artist: `[Stage name], [artist role] [origin]. [Biographical summary 1 line]. Discografía, colaboraciones y prensa.`
- Release: `[Title], [release type] de [Artist] publicado en [year]. Tracklist, créditos de producción y contexto.`

Within 155 characters.

### Headings structure
- One H1 per page (the entity name or article title).
- H2 for major sections (Discografía, Colaboradores, Prensa, etc.).
- H3 for subsections.
- Never skip levels.

### Content requirements
- Minimum 300 words of original body text on any public entity page (usually achieved via bio + event descriptions + press summaries).
- Editorial articles: minimum 800 words.
- All copy in Spanish by default.

### Internal linking
- Every entity mention in any page links to that entity's profile (automatic via cross-link parser).
- Each entity page has a "Related artists" section with 6-8 algorithm-suggested internal links.
- Editorial articles end with "Explorar más" section linking to profiles of mentioned entities.

---

## Content SEO strategy

### Seed content (MVP pre-launch)
Focus entirely on completeness of entity pages. 200+ artists with rich pages is more SEO-valuable at launch than 20 editorial pieces.

### Ongoing content (post-MVP)
Editorial pieces optimize for:
- Long-tail topic coverage that's underserved: "Historia del rap en Maracay," "Productores venezolanos más influyentes," "Canserbero: análisis de Vida."
- Branded queries tied to our editorial (once we have a brand).
- Interview features that become the canonical record of the conversation.

### Content cadence (post-editorial launch)
- 1-2 new editorial pieces per week.
- 5-10 new entities added per week.
- Major monthly piece (deep dive or interview).
- Quarterly: "state of the scene" roundup.

---

## Link-building

### Organic (primary)
- Be cited by press for interesting data points we publish.
- Press release or tip-sheet for notable editorial: "Aquí hay un dato curioso sobre [artista]," offered to journalists freely.
- Be a useful source for Wikipedia editors — they'll cite us as a secondary source once we have editorial authority.

### Partnership-based
- Cross-link with aligned independent outlets (not competitors) — e.g., a Venezuelan electronic music archive.
- Appear in curated lists of "useful music resources."

### Never
- No link farms.
- No paid links.
- No automated comment posting.
- No reciprocal link agreements with low-quality sites.

### Target by month 12
- 300+ referring domains.
- 50+ from DR-40+ domains.
- 10+ from Tier 1-2 press outlets.

---

## Keyword research approach

### Priority 1 — Head + modifier per entity
For each artist we document, the core queries are:
- `[artist] biografía`
- `[artist] discografía`
- `[artist] productor`
- `[artist] pareja` (sometimes, depending on fame level)
- `[artist] edad`
- `[artist] origen`

These are covered automatically by comprehensive entity pages.

### Priority 2 — Scene-level queries
- `rap venezolano`
- `rap en español`
- `rap conciencia`
- `trap venezolano`
- `productores venezolanos`
- `batalla de rap venezuela`

These are competitive; approach through editorial depth and pillar content pages.

### Priority 3 — Long-tail feature queries
- `mejor álbum rap venezolano 2020`
- `quién produjo [track]`
- `cuándo murió canserbero`
- `historia del tarima`

These emerge naturally from entity pages; also addressed by editorial.

### Tooling
- Ahrefs (Luis subscription) — primary keyword research tool.
- Google Search Console — track real performance from day 1.
- Google Trends — identify rising queries.

---

## Rich results and SERP features

Queries we actively target for rich results:

- **Knowledge Panel eligibility:** achieved through consistent structured data + Wikipedia alignment + external mentions.
- **Music carousels:** our structured data signals us as a music data source.
- **People Also Ask:** appearing requires strong topical authority — realistic target for Year 2.
- **Site links:** emerge naturally for strong brand queries.

---

## Measurement

### Weekly
- Search Console: click-throughs, impressions, top queries, top pages.
- Plausible: organic vs. direct vs. referral split.

### Monthly
- Ahrefs: DR, referring domains, keyword rankings for tracked set.
- Competitive analysis vs. Wikipedia/Genius on overlapping queries.
- Review page-speed metrics.

### Quarterly
- Core Web Vitals audit.
- Structured data validation sweep.
- Internal link audit.
- Re-benchmark the top 50 target queries.

### Year 1 targets

| Metric | Target |
|---|---|
| Organic monthly visitors | 15,000+ by March 2027 |
| Indexed pages | 5,000+ |
| Pages ranking in top 10 for target queries | 500+ |
| Referring domains | 300+ |
| Ahrefs Domain Rating | 30+ |
| Avg. position for branded queries | 1-2 |
| Avg. position for artist-name queries | top 5 |

---

## Risks and mitigations

### Risk 1: Google algorithm changes penalize AI-touched content
**Mitigation:** our content is AI-assisted but human-verified. Original sourced facts, not AI-generated summaries.

### Risk 2: Major competitor (Genius) expands Latin coverage aggressively
**Mitigation:** velocity + specificity. We're more thorough per entity.

### Risk 3: Wikipedia gets a burst of Latin hip-hop editors
**Mitigation:** unlikely. Even if it happened, Wikipedia can't match our depth on releases, credits, career events.

### Risk 4: We produce thin pages (low completeness) that hurt our domain authority
**Mitigation:** never ship a public page with < 20% completeness. Default to `noindex` on pages below threshold.

### Risk 5: Programmatic SEO penalty
**Mitigation:** we're not programmatic SEO — our pages are reference entries with real content, not spun templates. Still, avoid repetitive patterns (identical section headers verbatim, identical meta patterns that read as generated).

---

*See also: [`launch-plan.md`](./launch-plan.md), [`community.md`](./community.md), [`02-Engineering/architecture.md`](../02-Engineering/architecture.md)*
