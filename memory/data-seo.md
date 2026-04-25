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
- **Eventbrite** — research profunda completada 2026-04-25. Doc en `api-docs/eventbrite.md`. ⚠ **Bombazo:** API search global removida diciembre 2019. Solo viable arquitectura híbrida (DB de organizers + venues curados → consulta por org_id). Cobertura: alta diáspora (Miami, USA latino, Madrid/Barcelona), baja VE local. Free tier API ($0).
- **Soundcharts API** — descubierta 2026-04-25 como opción autorizada para monthly listeners. $10-50/mes Starter. Reemplaza el riesgo legal del scraping `open.spotify.com`.
- **Kworb.net** — fallback gris free para monthly listeners. Mantenimiento alto.

### Seeds curados

- `05-Data/seed/spotify-playlists.json` — k12jamz playlists (5 críticas/altas para MVP).
- Playlists pendientes: women VE, producer beats, freestyle battles, Colombian/Spanish curators (gap identificado).

## Decisiones tomadas

- 2026-04-24 · Stage 7a (events) = Setlist.fm. Bandsintown defer. Ticketmaster skip.
- 2026-04-24 · Spotify Client Credentials no provee follower/popularity. Workaround pendiente: OAuth user flow O scraping open.spotify.com.
- 2026-04-24 · Stage 1 bootstrap pivot: search-based en vez de playlist-based porque user playlists API restringida.

## SEO tools — inventario priorizado (v0.2, 2026-04-25)

Doc completo: `05-Data/seo-tools-roadmap.md`. Resumen del ranking:

**P1 (MVP):**
1. **Quién produjo [canción]** · `/quien-produjo/[track-slug]` · KW Alto · Compl Bajo · Data 30% (post-Stage 4) · Legal Verde.
2. **Calculadora de ingresos** · `/calculadora-ingresos/[artist-slug]` · KW Alto · Compl Medio · Data 60% · Legal Amarillo. **Push back enviado al founder:** versión real-time exacta NO es 1 sprint. Strategy (a) bandas = 1 sprint, (b) scraping open.spotify.com = 2-3 sprints + riesgo legal, (c) OAuth = 2 sprints. Default propuesto: (a).
3. **Discografía completa** · `/discografia/[artist-slug]` · KW Alto · Compl Bajo · Data 90% (post-Sprint 5) · Legal Verde.

**P2 (post-launch 90 días):**
4. **Próximos conciertos del artista** · `/eventos/[artist-slug]` · requiere Eventbrite API + Setlist.fm. Foco diáspora.
5. **Grafo de colaboraciones** · `/colaboraciones/[artist-slug]` · requiere Stage 4-5 drained.
6. **Buscador de samples** · `/samples/[track-slug]` · Genius API ya scaffolded.

**P3 (post-tracción):**
7. **Artistas similares** · `/similares/[artist-slug]` · requiere Last.fm worker + city resolution.
8. **Comparador head-to-head** · `/comparar/[a]-vs-[b]` · CompareView ya existe pero riesgo thin content.

**Deprioritized pending KW evidence (founder no quiere foco):**
- Mapa interactivo del rap por ciudad.
- Timeline rap VE / latino.

**Descartadas:** letras (legal), edad/origen (ya en perfil), top tracks (ya en perfil), stats real-time (Spotify no provee), lyrics annotation (Genius lo hace), booking calc (B2B post-MVP), predictor (no fit con archive).

## Decisiones agregadas en este turno

- 2026-04-25 · Mapa + Timeline deprioritized. Solo entran si keyword research formal demuestra volumen real medible.
- 2026-04-25 · Calculadora de ingresos: strategy (a) bandas como default MVP. (b) scraping open.spotify.com pendiente review legal.
- 2026-04-25 · Slug structure preferida: `/{tool-name}/{artist}` directo (mejor SEO ES que `/herramientas/{tool}/{artist}`). Pendiente confirmar con Product Architecture.
- 2026-04-25 · Last.fm a integrar como secondary source (tool #7).
- 2026-04-25 · Cada SEO tool funnel obligatorio al perfil del artista. CTA gigante "Ver perfil completo".

## Sistema operativo SEO formalizado (2026-04-25)

Sub-folder `05-Data/seo/` creado con 6 docs operativos:

- `seo/README.md` — índice y principios del sistema
- `seo/stack.md` — herramientas SEO (free + paid) + AI/automation stack + 11 APIs pendientes con instrucciones precisas de signup
- `seo/keyword-framework.md` — metodología KW research sin GSC. Sources, scoring (0-100 fórmula), taxonomía intent/funnel/geo, workflow batch + listening continuo
- `seo/content-engine.md` — programmatic SEO completo: routes Next.js i18n (es/en/pt), schemas JSON-LD por entity, sitemap dinámico, internal linking auto, FAQ generation, OG image generator
- `seo/audit-cadence.md` — 17 audits automatizados con frecuencia + thresholds + alerting Slack
- `seo/features-creativas.md` — 11 features SEO adicionales más allá del roadmap v0.2 (Press Kit auto, Productor Profile, Mejores canciones, Decade in rap, etc.)

### Decisiones técnicas clave del sistema

- **Sin GSC al inicio.** Stack alterno: Bing Webmaster Tools + IndexNow + DataForSEO + Brave SERP + Cloudflare Web Analytics + Microsoft Clarity + Plausible/Umami.
- **Recomendación analytics:** Umami self-hosted en Vercel + Supabase (free, privacy-first). Plausible solo si setup time crítico.
- **i18n architecture:** next-intl + slug canónico ES + path segments traducidos. Sin slug duplicate por locale.
- **Schema.org generators:** módulos puros en `src/lib/seo/schema/{entity}.ts`. Build fail si validator rechaza.
- **Indexing phased:** Phase 1 (50 pillars con completeness >70%), Phase 2 (>50%), Phase 3 (>30%). Evita soft-404 en programmatic SEO masivo.
- **Pipeline P9 nueva:** auto-traducción de campos editoriales (bio_short, bio_long) vía Claude Haiku. ~$0.0005 por traducción. Marca status `auto_translated` con review queue.
- **Sample URLs:** lista de 20 URLs en `audit/sample-urls.ts` que reciben Lighthouse + schema + speed checks.

### Features creativas top-priority (a integrar al roadmap)

- **Productor Profile** (`/productores/{slug}`) — P1 alongside tool #1. Misma data, doble output.
- **Press Kit auto** — P2 alta, gateway al claim flow del founder.
- **Mejores canciones de [artista]** — P1.5, data prácticamente lista.

### APIs pendientes priorizadas (instrucciones en stack.md)

- 🔴 URGENTE: Bing Webmaster Tools, IndexNow, Microsoft Clarity, Cloudflare Web Analytics
- 🟡 antes de KW research v1: DataForSEO API ($50-100 budget inicial)
- 🟡 alongside features: Last.fm, Eventbrite, Setlist.fm
- 🟢 fácil free: Ahrefs Free Webmaster Tools, Plausible/Umami

## Decisiones críticas tomadas 2026-04-25 (segunda iteración)

### Calculadora de ingresos (tool #2)

**Decisión final:** strategy (a) **estimación con bandas** como default MVP. Strategy (c) **Soundcharts API** ($10-50/mes) como upgrade post-launch cuando founder apruebe budget.

**Strategy (b) scraping `open.spotify.com` ELIMINADA** del set viable. Razones:
- Spotify desactivó 86M cuentas dic 2025 post-incidente Anna's Archive.
- Spotify Web API requiere Premium + Extended Quota requiere 250K MAU desde feb 2026.
- ToS sept 2025 prohíbe explícitamente scraping. Enforcement REAL.
- Riesgo de ban del Premium account de Luis es prohibitivo.

Decision doc completo en `seo/decisions/spotify-listeners-workaround.md`.

### Tool #4 Próximos conciertos — scope expandido

**Bombazo Eventbrite:** API search global removida 2019. Tool requiere arquitectura híbrida:
1. DB curada de organizers + venues latinos (50-100 entries inicial).
2. Loop por org_id consultando Eventbrite API.
3. Setlist.fm para históricos.
4. Bandsintown reactivado parcial (free).
5. Scraping IG promotores VE locales (Apartaco, etc.) — post-MVP.

Subió de "P2 media complejidad" a "P2 media-alta complejidad, ~2-3 sprints" + ~10-15h curación inicial.

### Tickets actualizados

- `[BIZ-LEGAL] Review scraping open.spotify.com` → **ELIMINADO**. Decisión técnica ya descartó la opción.
- `[BIZ-LEGAL] Nota informativa enforcement Spotify 2025-2026` → **NUEVO**. Solo registro.
- `[LUIS] Soundcharts Starter signup` → **WATCHLIST** post-launch (cuando presupuesto disponible).
- `[ENG] Worker Eventbrite con scope híbrido` → reemplaza el ticket genérico Eventbrite.
- `[DATA-SEO] Curación inicial DB orgs latinos` → **NUEVO**, propio.

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
