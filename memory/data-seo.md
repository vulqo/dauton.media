# Memoria — Data & SEO

**Owner:** Data & SEO agent
**Misión:** identificar APIs + keyword opportunities + SEO tools. Bridge Engineering ↔ Product Architecture.

---

## Estado al arrancar

### APIs ya documentadas (`05-Data/api-docs/`)

| API | Status | Notas críticas |
|---|---|---|
| Spotify | ✓ documentada · worker live | Client Credentials NO retorna followers/popularity (cambio 2024). Rate limit ban 23h con 600 calls. Spacing 300ms mínimo. |
| MusicBrainz | ✓ documentada · worker scaffolded | 1 req/s hard. Sin auth (User-Agent). Único source con producer credits a escala. |
| YouTube Data API v3 | ✓ documentada · stub | Quota 10K/día. API key ya configurada. |
| Genius | ✓ documentada · worker scaffolded | Bearer token configurado. 404 → null. |
| Brave Search | ✓ documentada · stub | Free tier 2K queries/mes. API key configurada. |
| Firecrawl | ✓ documentada · stub | Reusa cuenta Vulqo. API key configurada. |
| Wikipedia/Wikidata | ✓ documentada · worker scaffolded | Sin auth (User-Agent). SPARQL para cross-IDs. |
| OpenAI Whisper | ✓ documentada · stub | Pendiente API key. $0.006/min audio. |
| Supabase | ✓ documentada | DB+Auth+Storage. Project: pmckviaplfxjfqubuknt. |

### APIs investigadas pero no integradas

- **Bandsintown** — events futuros. Cobertura VE baja (~10%). Defer a v2.0.
- **Setlist.fm** — setlists históricos. Cobertura buena para pillars. Recomendado agregar como Stage 7a. Requiere MBID (encadena con MusicBrainz).
- **Ticketmaster Discovery** — eventos con tickets. Cobertura VE ~0%. Skip.
- **Eventbrite** — mencionado por founder como prioridad para poblar eventos VE diáspora. **PENDIENTE investigación profunda.**

### Seeds curados

- `05-Data/seed/spotify-playlists.json` — k12jamz playlists (5 críticas/altas para MVP).
- Playlists pendientes: women VE, producer beats, freestyle battles, Colombian/Spanish curators (gap identificado).

## Decisiones tomadas

- 2026-04-24 · Stage 7a (events) = Setlist.fm. Bandsintown defer. Ticketmaster skip.
- 2026-04-24 · Spotify Client Credentials no provee follower/popularity. Workaround pendiente: OAuth user flow O scraping open.spotify.com.
- 2026-04-24 · Stage 1 bootstrap pivot: search-based en vez de playlist-based porque user playlists API restringida.

## SEO tools — ideas (sin priorizar todavía)

- **Calculadora de ingresos** (mencionada por founder como ejemplo). Keyword: "cuánto gana X en Spotify". Stream count + payout formula.
- **Discografía completa de X por año** — keyword cola larga.
- **Quién produjo X** — keyword cola larga, único valor en español.
- **Mapa del rap venezolano** — visualización geográfica con artists por city.
- **Timeline rap latino** — visualización temporal con events + releases.
- **Comparador de artistas** — feature que ya existe en design (CompareView).

## Pendientes de investigar (high priority)

- Eventbrite API: viabilidad para poblar eventos VE + diáspora.
- Spotify OAuth user flow: cómo recuperar followers/popularity.
- Apify o servicios de scraping para social stats (IG followers, TikTok views) si APIs no proveen.
- Last.fm: tags + similar artists.
- Discogs: physical releases history.
- Musixmatch: alternativa Genius para lyrics.

## Reglas operativas

- Cada API nueva → doc en `05-Data/api-docs/` siguiendo template existente.
- Cada SEO tool propuesta → entry en `05-Data/seo-tools-roadmap.md` con: keyword, volumen estimado, complejidad, valor de negocio.
- Coordinar con Engineering antes de comprometer timeline (rate limits + costos).
- Coordinar con Business & Legal si la API tiene términos restrictivos.
