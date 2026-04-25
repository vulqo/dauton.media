# Features SEO Creativas — Dauton Media

**Owner:** Data & SEO chat
**Última actualización:** 2026-04-25 · v0.1
**Status:** propuestas. Cada una requiere validación de Product Architecture antes de comprometerse a roadmap.

---

## Cómo leer este doc

Complemento de `../seo-tools-roadmap.md` (8 tools priorizadas, P1-P3). Acá propongo **features adicionales** que descubrí pensando en programmatic SEO + el data model existente. Cada una:

- Es 100% auto-generada desde DB (cero contenido manual).
- Funnel obligatorio al perfil del artista o productor.
- Tiene KW potential identificado en español.
- Es **complemento**, no reemplazo del roadmap principal.

---

## A. Generador de Press Kit (EPK) auto

**Slug:** `/{locale}/artistas/{slug}/press-kit`

**Pitch:** "Press kit completo del artista, descargable como PDF. Auto-generado desde data verificable."

**KW primarias:**
- "press kit [artista]"
- "epk [artista]"
- "biografía oficial [artista]"
- "[artista] información para prensa"

**Volumen estimado:** bajo en cabeza por artista, **muy alto strategic value** — atrae al PROPIO artista (gateway al claim flow del founder).

**Data desde DB:**
- bio_long, photo_url, top_tracks, top_collaborators, social_links, contact (si claimed), latest_release.
- Componer en single-page web + endpoint que renderiza PDF (Vercel + `@react-pdf/renderer` o Puppeteer).

**Funnel especial:**
- "¿Eres [artista]? Reclama tu perfil para personalizar este press kit." → claim flow.
- Promotores que descarguen el PDF entran a tracking → futura DB de promotores para tier B2B.

**Schema:**
- `Person` + `WebPage` con `mainEntity`.

**Acción:** **P2 prioridad alta.** Data ready post-Stage 5. Bajo costo técnico. Alto valor estratégico (recruiting de claims).

---

## B. Productor Profile (separar productores como entity SEO)

**Slug:** `/{locale}/productores/{slug}`

**Pitch:** "Toda la obra de [productor]: tracks producidos, colaboraciones, samples, evolución."

**KW primarias:**
- "productor [nombre]"
- "[nombre] productor venezolano"
- "todas las canciones producidas por [nombre]"
- "beats de [nombre]"
- "[nombre] productor de quién"

**Volumen estimado:** medio en cabeza por productor top, **cola larga ENORME** porque productores latinos están INVISIBILIZADOS (Jeiby, Kpú, Ahiezer, Big Yamo, Bnsino, Trooko).

**Data desde DB:**
- `people WHERE role='producer'` (existente vía `people_roles`).
- JOIN `production_credits` → todos los tracks producidos.
- JOIN tracks → artists colaboradores.
- Computed: número de tracks, primer track, último track, top collabs, géneros.

**Diferenciación:**
- Genius cubre half-assed en EN. Wikipedia casi nada en ES. WhoSampled cubre samples. Nadie tiene perfil de productor latino consolidado en español.

**Funnel:**
- Cada track linkea al perfil del productor → archive cross-funnel.
- Productor también puede claim su perfil → segundo gateway al claim flow.

**Schema:**
- `Person` con `jobTitle: 'Music producer'` + `ItemList` de tracks producidos.

**Acción:** **P1 alongside tool #1** (Quién produjo). Misma data, mismo sprint. Doblamos el output SEO con un sprint.

---

## C. "Quién canta con quién" — landing por par de artistas

**Slug:** `/{locale}/colaboraciones/{slug-a}-y-{slug-b}` (alpha-ordered)

**Pitch:** "Todas las canciones donde [A] y [B] aparecen juntos."

**KW primarias:**
- "[A] y [B] canciones juntos"
- "todas las colaboraciones [A] [B]"
- "[A] feat [B]"
- "[A] con [B]"

**Volumen estimado:** combinatorial. Pares con colab real tienen volumen. Pares populares (Apache + Akapellah, Canserbero + McKlopedia) volumen high.

**Data desde DB:**
- `tracks` con `featured_artists` que contengan ambos slugs.
- `collaborations` table.
- Filter: solo generar landing si hay ≥ 2 tracks juntos (evita thin content).

**Diferenciación:**
- Spotify "appears on" no tiene URL canónica.
- Genius no agrupa colabs.
- Auto-curation con threshold = quality control.

**Funnel:**
- Top de la página: cards a perfiles de A y B.
- Cada track linkea a /canciones/{slug}.

**Schema:**
- `WebPage` con `about` array de 2 `Person` + `ItemList` de tracks.

**Acción:** **P2 post Stage 5.** Threshold ≥ 2 tracks evita thin content (única regla crítica para SEO sano).

---

## D. Cronología de carrera del artista

**Slug:** `/{locale}/artistas/{slug}/cronologia`

**Pitch:** "La carrera de [artista] año por año: lanzamientos, hitos, controversias, eventos."

**KW primarias:**
- "carrera de [artista]"
- "qué hizo [artista] en [año]"
- "cronología [artista]"
- "evolución [artista]"

**Volumen estimado:** medio. Long-tail por año.

**Data desde DB:**
- `releases` con release_date.
- `career_events` table.
- `press_mentions` ordenados por fecha.
- `event_participants` via events.

**Diferenciación:**
- No es timeline visual editorial (founder descartó). Es **timeline auto-generado en lista** desde data verificable. Cada item con cita-source.
- Wikipedia no estructura así. Genius no estructura así.

**Schema:**
- `Person` + `ItemList` (events) + cada event como `Event` con `startDate`.

**Acción:** **P2.** Data llega post-Stage 5 + P3 press discovery.

---

## E. Mejores canciones de [artista]

**Slug:** `/{locale}/artistas/{slug}/mejores-canciones`

**Pitch:** "Las canciones más populares de [artista], ordenadas por streams + relevance."

**KW primarias:**
- "mejores canciones de [artista]"
- "top canciones [artista]"
- "[artista] sus mejores temas"
- "canciones más escuchadas de [artista]"

**Volumen estimado:** alto en cabeza por artista popular. Cola larga combinatorial.

**Data desde DB:**
- `tracks` con popularity_score.
- Score compuesto: popularity × (1 + featured_count × 0.1) × (1 + has_video × 0.2).
- Top 20.

**Diferenciación:**
- Spotify "Top tracks" en perfil del artista no es URL canónica indexable.
- Última.fm cubre con UX vieja, sin LATAM-specific.
- Genius "popular" no es LATAM-aware.

**Funnel:**
- Cada track → /canciones/{slug}.
- Sidebar: similares, productores, collabs.

**Schema:**
- `Person` + `ItemList` de top tracks con `MusicRecording`.

**Acción:** **P1.5 — barata, alta KW.** Datos prácticamente listos post-Sprint 5. Dejarla afuera del roadmap principal sería desperdicio.

---

## F. "¿Quién es [productor/artista emergente]?" landing

**Slug:** `/{locale}/quien-es/{slug}`

**Pitch:** "Conoce a [persona]: bio rápida, lo que hace, su obra principal."

**KW primarias:**
- "quién es [persona]"
- "[persona] biografía"
- "[persona] de dónde es"

**Volumen estimado:** alto en cabeza para emergentes (gente busca antes de saber quién son). Decae con artistas mega-famosos (donde Wikipedia/Genius dominan).

**Data desde DB:**
- `people` cualquier role.
- 80-word bio + 3 facts + photo.
- "Lee más" → /artistas/{slug} o /productores/{slug}.

**Diferenciación:**
- Page super-corta optimizada para *featured snippet* SEO (Google "answer box").
- FAQPage schema con las preguntas más obvias.

**Schema:**
- `Person` + `FAQPage` con 5 Q&As estándar.

**Acción:** **P3.** Útil como puerta SEO, low effort, pero menos crítica que tools transaccionales.

---

## G. "Productores emergentes" radar curado

**Slug:** `/{locale}/productores-emergentes` (single page, no slug)

**Pitch:** "Los productores latinos que están subiendo. Curado mensual desde la data del archive."

**KW primarias:**
- "productores emergentes rap latino"
- "nuevos productores hip hop venezolano"
- "productores en ascenso 2026"
- "productores latinos jóvenes"

**Volumen estimado:** medio. Editorial-like KW pero generamos TODO con data.

**Data desde DB:**
- `people WHERE role='producer'` con:
  - 1+ track en últimos 12 meses.
  - completeness_score > 40.
  - listener growth > X% (post-Stage 5 con stats reales).

**Diferenciación:**
- No existe en español. Equivalent en EN es Pitchfork "Rising" lists pero editoriales.
- Auto-curated = honesto.

**Refresh:**
- Cron mensual regenera lista. Old list permanece accesible vía `?month=2026-04` query param.

**Schema:**
- `WebPage` + `ItemList`.

**Acción:** **P2.** 1 sprint, alta autoridad de marca.

---

## H. Sample digger — qué sampleó qué (cross-cutting)

**Slug:** `/{locale}/samples/desde/{decade}` y `/{locale}/samples/genero/{genre}`

**Pitch:** "Qué canciones del soul fueron sampleadas por el rap latino. Qué canciones de los 90s alimentaron a la generación 2020."

**KW primarias:**
- "samples del soul rap latino"
- "qué sampleó el rap venezolano"
- "samples de los 70s en hip hop"
- "qué canciones samplearon"

**Volumen estimado:** medio. Audiencia: producers, crate diggers, fans hardcore.

**Data desde DB:**
- `samples` table (tool #6 lo puebla).
- Filter por década o género de la canción origen.

**Diferenciación:**
- WhoSampled tiene este pivot pero no por idioma. Nadie lo hace en español.
- Atrae internal traffic de productores que buscan inspiración.

**Schema:**
- `WebPage` + `ItemList` con cada relationship como elemento.

**Acción:** **P3.** Complemento de tool #6 cuando esté shippeado.

---

## I. "Influencias musicales de [artista]" — text storytelling auto

**Slug:** `/{locale}/artistas/{slug}/influencias`

**Pitch:** "De quién aprendió [artista]. Qué artistas formaron su estilo."

**KW primarias:**
- "influencias de [artista]"
- "quién influyó en [artista]"
- "[artista] inspirado en quién"

**Volumen estimado:** medio. Audiencia: fans investigando + estudiantes de música.

**Data desde:**
- Wikidata "influenced by" + "influence of" relations (vía Wikidata SPARQL en `WikipediaClient`).
- Last.fm "similar artists" como proxy.
- Collaborations >5 tracks como proxy de influence.

**Generación de texto:**
- Claude Haiku con prompt: "Genera 3 párrafos en español sobre las influencias de {artist}. Datos: {wikidata_influences}, {top_collabs}. Tono neutral, verificable. NO inventar."
- Post-publication review queue para humano si confidence < 0.7.

**Diferenciación:**
- Único auto-curated SEO content en español sobre influencias.
- **Border con regla "no editorial"**: el texto es auto-generado, sourced, neutral. Más cerca de Wikipedia que de blog opinion. Validación necesaria con Product Architecture.

**Schema:**
- `Person` + `Article` (con sources cited).

**Acción:** **P3 con validación Product Architecture.** Si pasa el filtro "no editorial", es high-value SEO con KW intent informativa fuerte.

---

## J. Eventos pasados épicos por ciudad

**Slug:** `/{locale}/ciudades/{slug}/eventos-historicos`

**Pitch:** "Los conciertos legendarios del rap [ciudad]. Setlists, fotos, reseñas."

**KW primarias:**
- "conciertos rap [ciudad]"
- "eventos hip hop [ciudad] historia"
- "shows rap legendarios [ciudad]"

**Volumen estimado:** medio para ciudades grandes (Caracas, Madrid, Miami).

**Data desde:**
- `events` filtrados por city_id.
- JOIN `event_setlists` (Setlist.fm Stage 7a).
- Solo events con > X attendance o > X media coverage.

**Diferenciación:**
- Nada equivalente en español. Mezcla de archivismo + ciudad-pride.

**Schema:**
- `Place` + `ItemList` de `MusicEvent`.

**Acción:** **P3.** Requiere Setlist.fm + Eventbrite drained.

---

## K. "Decade in rap" — landings programáticas por década + país

**Slug:** `/{locale}/decadas/{decade}/rap-{country}` ej. `/decadas/2020s/rap-venezolano`

**Pitch:** "Lo que pasó en el rap [país] entre [year-start] y [year-end]. Releases, hitos, artistas que emergieron."

**KW primarias:**
- "rap venezolano de los 2010"
- "mejores raperos de los 2020 venezuela"
- "hip hop colombiano década 2010"

**Volumen estimado:** alto en cabeza ("rap venezolano 2020s" tiene búsquedas reales).

**Data desde:**
- `releases` filtrados por release_date década + country (vía artist's origin_country).
- `people` activos en la década.
- Top 30 + storytelling de transición.

**Diferenciación:**
- Wikipedia tiene listas crudas. Nadie tiene UX dedicada en español.
- **Border con "no editorial":** es un listing + auto-text de 2-3 párrafos generados por Claude desde data. Validación necesaria.

**Schema:**
- `WebPage` + `ItemList` + `Article`.

**Acción:** **P3 conditional con Product Architecture.** Si pasa filtro, es muy fuerte para autoridad de marca.

---

## Resumen de features creativas — ranking propuesto

| # | Feature | KW | Esfuerzo | Strategic value | Acción |
|---|---|---|---|---|---|
| **B** | Productor Profile | Alto cola larga | Bajo (data lista) | Muy alto (productores invisibles + claim) | **P1 alongside tool #1** |
| **A** | Press Kit auto | Bajo head, alto strategic | Medio (PDF gen) | Muy alto (gateway claim) | **P2 alta** |
| **E** | Mejores canciones | Alto | Bajo | Medio-Alto | **P1.5** |
| **C** | Quién canta con quién | Medio combinatorial | Bajo | Medio-Alto | P2 |
| **D** | Cronología de carrera | Medio | Medio | Medio | P2 |
| **G** | Productores emergentes | Medio | Bajo | Alto (autoridad) | P2 |
| **F** | Quién es [persona] | Alto cola larga emergentes | Bajo | Medio | P3 |
| **H** | Sample digger pivot | Medio | Bajo | Medio | P3 (post tool #6) |
| **I** | Influencias musicales | Medio | Medio (Claude+review) | Alto si pasa "no editorial" | P3 conditional |
| **J** | Eventos históricos por ciudad | Medio | Medio | Medio | P3 |
| **K** | Decade in rap | Alto | Medio | Alto si pasa "no editorial" | P3 conditional |

---

## Próximas iteraciones de creativos

Cada vez que Engineering shippa una nueva entity o ingestion drained, hago un pass por este doc para identificar nuevas features posibles. Refresh cadence: mensual.

---

## Last reviewed

- 2026-04-25 — Data & SEO chat — v0.1 inicial.
