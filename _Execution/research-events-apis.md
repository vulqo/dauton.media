# Research · Events APIs para Dauton Media

**Autor:** Cowork
**Fecha:** 2026-04-24
**Pregunta:** ¿vale la pena agregar Stage 7 (events ingestion) al playbook con Bandsintown / Setlist.fm / Ticketmaster?
**Veredicto:** **Sí para Setlist.fm** (alto valor, bajo esfuerzo). Bandsintown **condicional** (complemento). Ticketmaster **skip** (cobertura VE ~0).

---

## Contexto del problema

El data model de Dauton Media tiene `events`, `event_participants`, `career_events`. Hoy están vacíos. Llenarlos manualmente es caro. Las APIs externas pueden automatizar:

- **Eventos futuros** (conciertos próximos de un artista) → agenda pública en `/artists/[slug]`.
- **Eventos históricos** (qué tocó, dónde, cuándo) → timeline editorial + setlists reales con tracks performed.

---

## 1. Setlist.fm API ⭐ RECOMENDADO

**URL docs:** https://api.setlist.fm/docs/1.0/index.html

### Lo que entrega
- Setlists históricos por artista: lista de shows con venue + ciudad + país + fecha + **tracks tocados en orden**.
- Búsqueda por MusicBrainz ID (MBID) — **encaja perfecto con Stage 4** que ya resuelve MBIDs.
- Cada setlist linkea a venue (con lat/lng), festival parent, y tour name si aplica.

### Auth y rate limit
- API key gratis con signup en `api.setlist.fm/docs/1.0/ui.html`.
- Header: `x-api-key: {key}` + `Accept: application/json`.
- Rate limit: **2 req/s, 1440/día** free tier. Suficiente para scan diario de 15 pillars + weekly de 100 artistas.

### Cobertura para Dauton
- **Pillars grandes sí están**: Canserbero (10+ setlists documentados), Apache, McKlopedia, Akapellah tienen data. Alta confianza.
- **Artistas medianos parcialmente**: 30-50% de los 66 candidatos del bootstrap probablemente tienen algo.
- **Cola larga underground**: escasa. Setlist.fm se alimenta de contribuciones de fans; artistas sin fan base activa quedan fuera.

### Mapeo a nuestro schema
| Setlist.fm field | → Dauton |
|---|---|
| `setlist.id` | `events.external_id` (nueva col o meta) |
| `setlist.eventDate` | `events.event_date` |
| `setlist.venue.name + city.name + country` | `events.title` generated + `events.city_id` lookup |
| `setlist.artist.mbid` | JOIN vs `people.musicbrainz_id` |
| `setlist.tour.name` | `events.description_es` o metadata |
| `setlist.sets.set[].song[].name` | **NUEVO: `event_setlist` table** (setlist_id, event_id, track_id, position) |

**Requiere una migración 0008** con tabla `event_setlists` (track tocado en evento). Simple.

### Valor único
"Canserbero tocó Es Épico en el Teatro Teresa Carreño, 14 sept 2013, como tercera canción del set" — esto NO lo tiene nadie más estructurado. Citable en editorial. Enlace permanente a setlist.fm como source.

### Costos
- **$0 free tier.** 1440 req/día = 15 pillars × weekly refresh = 60 req/semana. Plenty.

### Verdict
**Agregar como Stage 7a.** Bajo esfuerzo (1 sprint), alto valor diferenciador.

---

## 2. Bandsintown API (condicional)

**URL docs:** https://app.swaggerhub.com/apis-docs/Bandsintown/PublicAPI/3.0.1 (ruta actual — la de `artists.bandsintown.com/support/api` retorna 404).

### Lo que entrega
- Eventos **futuros** de un artista (endpoint `/artists/{name}/events?app_id={id}`).
- Artist info (tracker count, links).
- Eventos pasados (últimos N, limitado).

### Auth y rate limit
- `app_id` gratis (signup como developer).
- Query param: `?app_id={id}`.
- Rate limit: informal ~500 rpm. OK.

### Cobertura para Dauton
- **Venezuela core: baja.** Bandsintown es strong en USA/Europa/Canadá, débil en LATAM. Pillars VE que giran internacionalmente (Apache en España, Akapellah en tours LATAM) sí aparecen.
- **Diáspora venezolana: media.** Artistas VE radicados en Miami / Madrid / Buenos Aires con tour activity → Bandsintown los tiene.
- **Underground local: ~0.** Pocos shows VE locales cargados a Bandsintown.

### Mapeo a nuestro schema
| Bandsintown field | → Dauton |
|---|---|
| `event.id` | `events.external_id` |
| `event.datetime` | `events.event_date` |
| `event.venue.name + location` | `events.title` + `events.city_id` |
| `event.artist_id` | JOIN vs `people.bandsintown_id` (nueva col) |

### Costos
- **$0 free tier.** Ningún tier pagado exigido para nuestro uso.

### Verdict
**Condicional.** Agregar como Stage 7b si:
- Apuntamos agenda pública de shows (caso de uso "próximos conciertos de Apache" en `/artists/[slug]`).
- Tenemos capacidad de completar con scraping local (IG/Facebook) para cubrir eventos VE que no están en BIT.

Si la feature "próximos eventos" no es MVP (y no lo es según `01-Product/mvp-scope.md` — eventos son post-MVP), **defer a v2.0**.

---

## 3. Ticketmaster Discovery API (SKIP)

**URL docs:** https://developer.ticketmaster.com/products-and-docs/apis/discovery-api/v2/

### Lo que entrega
- Eventos con tickets a la venta + venues + attractions (artists).
- Endpoint `events.json?keyword={name}&countryCode=XX`.

### Cobertura para Dauton
- **Venezuela: ~0%.** Ticketmaster NO opera en Venezuela. Zero shows VE cargados.
- **Diáspora internacional: baja.** Shows de artistas VE en USA/España a veces aparecen si el venue usa Ticketmaster. Cobertura parcial: quizás 5-10% de los shows que queremos capturar.

### Costos
- Free tier: 5000 req/día, 5 req/s. Generoso.

### Verdict
**SKIP.** El esfuerzo de integrar no se compensa con la cobertura para nuestro scope core (rap hispanohablante con foco VE). Reconsiderar post-MVP si orientamos producto a diáspora VE en USA.

---

## 4. Otra fuente potencial (mencionar, no implementar)

### Facebook/Meta Events
- IG/Facebook tienen events públicos. Scraping de IG Stories/posts de pillars o de canales como El Apartaco/La Guarimba permitiría capturar flyers de shows VE locales.
- Legalmente gris pero no ilegal. Firecrawl puede parsear.
- **Deferrido:** scraping manual por ahora, automation en v2.0.

### Songkick
- API **discontinued** para uso general en 2017. Skip.

---

## Propuesta Stage 7 — events ingestion

### Stage 7a · Setlist.fm (incluir)
- Sprint dedicado (~1 sprint, 1-2h Claude Code): cliente, worker, pipeline, smoke test.
- Requiere Stage 4 (MBIDs) completado. Encadenamos post-Sprint 7 de credits.
- Migración 0008: tabla `event_setlists` para tracks performed.
- Métricas target: 50+ events para los 15 pillars con setlists completos.

### Stage 7b · Bandsintown (deferrido a v2.0)
- Requiere feature "próximos eventos" en UI que NO es MVP.
- Valor real: agenda pública en `/artists/[slug]`.
- Diferir hasta que MVP launch y decidamos roadmap post-launch.

### Stage 7c · Scraping VE local (deferrido a v2.0)
- IG Stories de Apartaco + pillars + venues.
- Firecrawl + Claude extraction.
- Valor: cubre los eventos VE que ninguna API tiene.
- Defer porque depende de skill-caller (Claude API) que todavía no pagamos.

---

## Decisión recomendada para Luis

**Agregar Stage 7a (Setlist.fm) al playbook** con orden:
- Sprints actuales (4-7) quedan como están.
- **Sprint 8** original (YouTube transcripts) pasa a **Sprint 9**.
- **Nuevo Sprint 8 = Setlist.fm integration**.

Esto da un win editorial importante sin costo. Setlist.fm data + MBIDs + tracks reales de Dauton = posibilidad de escribir artículos tipo "Los tres shows de Canserbero en Apocalipsis Tour" con fuentes directas.

**Bandsintown + Ticketmaster quedan documentados pero deferidos.**

**Acción para Luis antes de Sprint 8:**
- Signup en `api.setlist.fm/docs/1.0/ui.html` → obtener API key (5 min).
- Agregar `SETLIST_FM_API_KEY=...` a credentials checklist.
- Ningún otro bloqueante.
