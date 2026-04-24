# SEO Tools Roadmap — Dauton Media

**Owner:** Data & SEO chat
**Última actualización:** 2026-04-25 · v0.1 (inventario inicial)
**Status:** activo. Pendiente validar volúmenes con keyword tool real (Ahrefs / Brave SERP en próximo output).

---

## Tesis del documento

Cada SEO tool de Dauton Media es una **puerta de entrada al perfil del artista**, no un destino final. Estructura objetivo:

```
/{tool-slug}/{artist-slug}   ← landing SEO en español
        │
        └─→ CTA gigante: "Ver perfil completo de {Artista}"
                  │
                  └─→ /artists/{artist-slug}
```

Cada tool genera tantas landing pages como artistas/tracks tenga el archive. Con 81 people hoy → 8 tools = ~650 páginas SEO indexables. A 1000 artistas (target 12 meses) → 8000 páginas. Cola larga estructural.

**Lenguaje primario:** español. **Mercados primarios:** Venezuela + diáspora (Miami, España, Colombia, USA latino).

---

## Criterios de ranking

| Criterio | Definición | Escala |
|---|---|---|
| **Keyword potential** | Volumen estimado + cantidad de variantes long-tail | Bajo / Medio / Alto |
| **Complejidad técnica** | Esfuerzo de implementación (data + queries + UI) | Bajo / Medio / Alto |
| **Valor de negocio** | Tracción al perfil + autoridad + diferenciación | Bajo / Medio / Alto |
| **Data readiness** | % de los datos ya en DB hoy o post-Sprint próximos | 0-100% |
| **Riesgo legal** | Verde (data pública atribuida) / Amarillo (gris) / Rojo (NO) | Verde / Amarillo / Rojo |

**Caveat de volúmenes:** los rangos vienen de Brave SERP + Google Trends + intuición sobre el espacio. **Hay que validarlos formalmente** (próximo output: `keyword-research.md`).

---

## Ranking final (8 tools, ordenadas por prioridad MVP)

| # | Tool | KW potential | Complejidad | Valor | Data ready | Legal | MVP fit |
|---|---|---|---|---|---|---|---|
| 1 | **Quién produjo [canción]** | Alto | Bajo | Alto | 30% (post-Stage 4) | Verde | ✅ P1 |
| 2 | **Calculadora de ingresos del artista** | Alto | Medio | Alto | 60% | Amarillo | ✅ P1 |
| 3 | **Discografía completa de [artista]** | Alto | Bajo | Medio-Alto | 90% (post-Sprint 5) | Verde | ✅ P1 |
| 4 | **Mapa interactivo del rap por ciudad** | Medio | Medio-Alto | Alto | 70% | Verde | 🟡 P2 |
| 5 | **Grafo de colaboraciones de [artista]** | Medio | Medio | Alto | 50% (post-Stage 4) | Verde | 🟡 P2 |
| 6 | **Buscador de samples** | Medio | Bajo | Medio-Alto | 40% | Verde | 🟡 P2 |
| 7 | **Comparador head-to-head de artistas** | Bajo-Medio | Bajo | Medio | 80% | Verde | 🟢 P3 |
| 8 | **Timeline del rap venezolano / latino** | Medio-Alto | Alto | Alto | 50% | Verde | 🟢 P3 |

**P1 = launch MVP** · **P2 = primeros 90 días post-launch** · **P3 = fase 2-3 post-tracción.**

---

## Detalle por tool

---

### 1. Quién produjo [canción] — `/quien-produjo/[track-slug]`

**Pitch:** "Buscás quién hizo el beat de tu canción favorita. Te lo decimos en 1 segundo."

**Keywords primarias (ES):**
- "quién produjo [canción]"
- "productor de [canción]"
- "beat de [canción] quien lo hizo"
- "quien produjo [canción] [artista]"

**Long-tail:** una variante por cada track ingestado. Con 1000 tracks → 4000+ variantes potenciales.

**Volumen estimado:** medio-alto. La búsqueda existe globalmente y en español está casi vacía competitivamente (Genius la cubre a medias en inglés, casi nada en ES con UI clara).

**Data necesaria:**
- `tracks` + `production_credits` + `people` (productores). MusicBrainz y Genius pueblan esto.
- Schema ya existe. Worker MusicBrainz scaffolded (Sprint 6), Genius idem (Sprint 6.5). **Pero ejecución de Stage 4 todavía pendiente** (post-Sprint 7).
- Hoy: 0% de tracks tienen credits drained. En 30-60 días post-Stage 4: 30-60% de tracks de pillars deberían tenerlos.

**Complejidad técnica:** baja. Query simple con joins. Página estática SSG por slug. Bonus: agregar samples ("ese beat sampleó X").

**Valor de negocio:**
- Productores latinos están INVISIBILIZADOS en español. Jeiby, Kpú, Ahiezer, Big Yamo, Bnsino, Trooko — buscarlos hoy es un dolor real.
- KW intent: alta (la persona busca un crédito específico).
- Funnel a perfil doble: el productor también es persona en la DB → segunda entrada al archive (perfil de productor).
- Diferenciación: nadie en español cubre esto bien.

**Legal:** verde. MusicBrainz (CC0) + Genius API (uso permitido para metadata). Atribución a fuentes obligatoria.

**Riesgos:**
- Conflicto de credits MB vs Genius (ya visto en smoke: Genius dijo Kpú produjo "Es Épico", asumimos Ahiezer). Resolver via skill `credit-reconciler` (stub Sprint 3).
- Tracks sin créditos = página vacía. Solución: fallback "información no disponible — ¿conoces al productor? contribuye".

**Acción:** **MVP P1.** La data llega gratis con Stage 4 (que ya está scoped). Cero esfuerzo de ingestion adicional. Sólo UI + slug + SEO meta.

---

### 2. Calculadora de ingresos del artista — `/calculadora-ingresos/[artist-slug]`

**Pitch:** "¿Cuánto factura tu rapero favorito? Estimación basada en streams, plataformas y tarifas reales."

**Keywords primarias (ES):**
- "cuánto gana [artista] en spotify"
- "ingresos spotify [artista]"
- "cuánto cobra [artista] por mes"
- "cuánto paga spotify por stream"
- "cuánto factura [artista]"

**Volumen estimado:** alto en cabeza ("cuánto gana spotify rapero" tiene volumen serio en LATAM), distribución larga por artista.

**Data necesaria — ⛔ bloqueador real:**
- Stream counts → Spotify Client Credentials ya NO retorna `followers` ni `popularity` desde 2024 (documentado en `api-docs/spotify.md`).
- Workarounds (en orden de viabilidad):
  - **(a) Estimación con bandas:** `tracks.popularity_score` (0-100) + número de tracks + antigüedad + presencia en playlists editoriales. Output como rango ("$1,500 — $4,200 / mes"). Honesto y aún SEO-rico.
  - **(b) Scraping `open.spotify.com/artist/{id}`** que sí muestra monthly listeners públicamente. Legalmente gris (Spotify ToS prohíbe scraping pero el riesgo enforcement para uso público no-comercial es bajo). **Riesgo legal medio.**
  - **(c) OAuth user flow** con un usuario propio activo. Estable pero requiere mantenimiento del token.
- Tarifas: $0.003-$0.005 por stream (Spotify), $0.008-$0.013 (Apple Music), variantes por país.

**Complejidad técnica:** media.
- Si vamos por (a): todo SQL + funciones puras. 1 sprint.
- Si (b): nuevo worker scraping con rate limit estricto + headless browser fallback. 2-3 sprints.
- Si (c): OAuth flow con refresh + monitoring del token. 2 sprints.

**Valor de negocio:**
- Founder lo nombró killer SEO feature. Es válido — KW "cuánto gana [artista] spotify" tiene volumen real.
- Funnel directo al perfil (botón "Ver perfil de [Artista] →").
- Branding: nos posiciona como "los que saben de la economía del rap latino".

**Legal:** amarillo si vamos por (b). Verde si (a). **Coordinar con Business & Legal antes de implementar (b).**

**Riesgos:**
- Estimación incorrecta = artista molesto + posible PR negativo. Mitigación: declarar bandas + "estimación basada en data pública, no oficial".
- Si Spotify cambia HTML de open.spotify.com, scraper se rompe. Mantenimiento on-going.

**Acción:** **MVP P1 con strategy (a) por defecto.** Marketing como "Estimador" no "Calculadora exacta". Upgrade a (b)/(c) post-launch si KW performance justifica el riesgo.

**Push back para founder:** la calculadora no es 1 sprint si queremos precisión real. Si hacemos (a) bien, es 1 sprint. Si queremos números defendibles, son 3 sprints. **Decidir cuál tier antes de comprometer launch.**

---

### 3. Discografía completa de [artista] por año — `/discografia/[artist-slug]`

**Pitch:** "Toda la discografía, ordenada cronológicamente, con links directos a cada plataforma de stream."

**Keywords primarias (ES):**
- "discografía [artista]"
- "todos los álbumes de [artista]"
- "todos los discos de [artista]"
- "álbumes de [artista] orden cronológico"

**Volumen estimado:** alto en cabeza ("discografía canserbero", "discografía akapellah" tienen búsquedas mensuales medibles).

**Data necesaria:**
- `releases` + `tracks`. Spotify Stage 2 (Sprint 5) cubre el 90% al ejecutarse. Hoy bloqueado por cooldown.
- En 1 semana post-Sprint 5: 90%+ de pillars con discografía completa. Resto del archive en 30 días.

**Complejidad técnica:** baja. Query directo + render. Necesita la página `/releases/[slug]` (deuda identificada en `_Execution/design-vs-repo-audit.md`).

**Valor de negocio:**
- Competidores: Wikipedia, Discogs, Genius — ninguno tiene UX limpia en español ni links a Spotify+Apple+YouTube juntos.
- Diferenciación moderada: ganamos por completitud automatizada + UX en español + multi-platform.
- Funnel a perfil: directo.

**Legal:** verde. Spotify metadata + atribución.

**Riesgos:**
- Releases con fecha incorrecta de Spotify (catálogo viejo re-uploadeado). Mitigación: cross-check con MusicBrainz.

**Acción:** **MVP P1.** Bloqueado por Sprint 5 ejecución. Una vez drenado, esto es 1 sprint de UI.

---

### 4. Mapa interactivo del rap por ciudad — `/mapa/[ciudad-slug]`

**Pitch:** "Quiénes son los raperos de Caracas, de Maracay, de Madrid, de Miami. Visualizado."

**Keywords primarias (ES):**
- "rap caraqueño"
- "rap venezolano por ciudad"
- "raperos de [ciudad]"
- "hip hop maracucho / valenciano / mirandino / madrileño"
- "rap venezolano en miami / madrid / bogotá"

**Volumen estimado:** medio en cabeza, alto en cola larga geográfica. Cada ciudad VE + cada destino diáspora = nueva landing.

**Data necesaria:**
- `people` con `city_id` resuelto. Hoy: 81 people, mayoría con city link parcial. Necesita pipeline de "resolver origen" (Wikipedia, Genius bio, MB area).
- Visualización: Mapbox o D3 con marker clustering.

**Complejidad técnica:** media-alta (viz + pipeline de city resolution). Schema ya soporta `cities` con lat/lng.

**Valor de negocio:**
- Es el "mapa de todo bro, será increíble" del founder. Pillar 3 del MVP (visualizaciones).
- Viraliza en redes (sharable). Captura keyword diáspora.
- Funnel directo (click en marker → perfil).

**Legal:** verde.

**Riesgos:**
- City resolution puede ser ruidoso (Caracas vs municipio Libertador vs etc). Necesita normalizador.

**Acción:** **P2.** No bloquea launch. Requiere pipeline de city resolution corriendo bien primero.

---

### 5. Grafo de colaboraciones de [artista] — `/colaboraciones/[artist-slug]`

**Pitch:** "Con quién ha colaborado tu artista. Network completo visualizado."

**Keywords primarias (ES):**
- "colaboraciones de [artista]"
- "[artista] feat"
- "con quién ha colaborado [artista]"
- "[artista A] con [artista B]" (combinatorial)

**Volumen estimado:** medio. Combinatorial entre artistas crea cola larga ENORME.

**Data necesaria:**
- `collaborations` table + `tracks.featured_artists`. Spotify Stage 2 puebla parcial. MB completa vía relationships.
- Hoy: 0%. Stage 4-5 lo cubre.

**Complejidad técnica:** media. D3 force graph + zoom + filtros. Schema lo soporta.

**Valor de negocio:**
- Killer feature para fans. "Con quién colaboró Apache" es búsqueda real.
- Diferenciación alta. Spotify "Related Artists" es algorítmico no relacional. Genius no visualiza grafo.
- Funnel: cada nodo es perfil → click → artist page. Cross-funnel intra-archive.

**Legal:** verde.

**Riesgos:**
- Grafo demasiado denso es ilegible. Necesita filtros (top-N, por año, por tipo de colab).

**Acción:** **P2.** Requiere Stage 4-5 ejecutado.

---

### 6. Buscador de samples — `/samples/[track-slug]`

**Pitch:** "Qué canciones samplea esta. Qué canciones la samplearon a ella."

**Keywords primarias (ES):**
- "samples de [canción]"
- "qué sampleó [canción]"
- "[canción] que sampleó"
- "sample de [canción] [artista]"

**Volumen estimado:** medio. Nicho intenso de fans hardcore + producers + crate diggers. Comunidad activa.

**Data necesaria:**
- Genius samples API (scaffolded Sprint 6.5). Hoy: 0% drained, 1 sample relationship visto en smoke (Es Épico → 1 sample).
- Coverage limitada: Genius cubre samples solo donde la community los anotó. Cola larga underground = patchy.

**Complejidad técnica:** baja. Tabla `track_samples` con direction (samples / sampled_by). Query directo. UI minimal.

**Valor de negocio:**
- Underserved en español. WhoSampled.com domina en inglés con UX vieja. En español casi nadie cubre esto.
- Funnel doble: ambos artistas (sampler y sampled) son perfiles.
- Branding: credibilidad con productores y fans hardcore.

**Legal:** verde. Genius API permite uso de metadata.

**Riesgos:**
- Coverage spotty. Mitigar con CTA "agregar sample" (contribuciones — schema ya tiene `contributions`).

**Acción:** **P2.** Bajo esfuerzo, valor de comunidad alto.

---

### 7. Comparador head-to-head de artistas — `/comparar/[artist-a]-vs-[artist-b]`

**Pitch:** "Apache vs Akapellah. Quién tiene más streams, más colabs, más alcance."

**Keywords primarias (ES):**
- "[artista A] vs [artista B]"
- "diferencia entre [A] y [B]"
- "quién es mejor [A] o [B]"

**Volumen estimado:** bajo-medio en cada combinación, combinatorial gigante (n*(n-1)/2). Con 100 artistas → 4,950 páginas potenciales. **Riesgo de thin content si se generan masivamente sin curation.**

**Data necesaria:**
- streams, releases count, collaborations count, ciudad, géneros — todo en schema.
- `CompareView` componente ya existe (importado en Sprint Design Sync v3).

**Complejidad técnica:** baja. Componente UI ya existe.

**Valor de negocio:**
- KW intent: medio (curiosidad casual a veces).
- Combinatorial atractivo para SEO pero riesgoso (Google penaliza thin auto-generated content).
- Mitigación: solo generar comparaciones con relación real (han colaborado, misma ciudad, mismo género). Selectivo, no masivo.

**Legal:** verde.

**Riesgos:**
- Penalización SEO por thin content masivo si se hace sin filtro.

**Acción:** **P3.** Lanzar selectivo (top 50 pares relevantes) y medir performance antes de escalar.

---

### 8. Timeline del rap venezolano / latino — `/timeline/[escena-slug]`

**Pitch:** "La historia del rap venezolano en una sola página interactiva. Cada año, cada release, cada artista."

**Keywords primarias (ES):**
- "historia del rap venezolano"
- "evolución del rap latino"
- "cuándo empezó el rap en venezuela"
- "raperos venezolanos por año"
- "primer rapero venezolano"

**Volumen estimado:** medio-alto en cabeza. Long-tail por escena (Caracas, Maracay, etc) y década.

**Data necesaria:**
- `releases` con fecha + `people.birth_date` + `career_events`.
- Hoy: parcial. Necesita curación + completitud post-Stage 5.
- Para escenas específicas (Caracas 2000-2010, etc) requiere tagging editorial mínimo.

**Complejidad técnica:** alta (visualización temporal + curación + storytelling).

**Valor de negocio:**
- High autoridad de marca. Nos posiciona como "los archivistas oficiales".
- Compartible. Va en Twitter/IG.
- Funnel: cada hito linkea al perfil/release.

**Legal:** verde.

**Riesgos:**
- Curación humana mínima (qué hito es "fundacional"). Border con la regla "no editorial" del founder — pero el contenido ES la data, sólo la presentación es curada. **Validar con Product Architecture.**

**Acción:** **P3.** Más esfuerzo, mayor autoridad. Lanzar para VE primero, replicar por país después.

---

## Tools que descarté

| Tool descartado | Razón |
|---|---|
| **Letras de [canción]** | Hosteamos lyrics = riesgo legal directo. Solo linkamos a Genius. NO. |
| **Edad / origen del artista** | Ya está en perfil. No necesita tool dedicada. |
| **Top tracks de [artista]** | Ya está en perfil. Mismo. |
| **Estadísticas de seguidores en tiempo real** | Spotify Client Credentials ya no provee. Misma data que tool #2 — redundante. |
| **Lyrics annotation** | Genius lo hace bien. No competimos en lyrics análisis. |
| **Calculadora de costo de booking** | Founder lo deferrió a Fase 4 (`plan-maestro.md`). Tool B2B post-MVP. |
| **Predictor de quién va a explotar** | Especulación, no archivo. No fit con principio "data verificable con fuentes". |

---

## Coordinación con otros deptos

### Tickets propuestos para `TASKS.md`

- `[ENG]` Worker para resolver `people.city_id` desde Wikipedia/MB/Genius (bloqueante para tool #4).
- `[ENG]` Decisión técnica: estrategia stream counts / monthly listeners (a/b/c según opciones de tool #2). Coordinar con `[BIZ-LEGAL]`.
- `[BIZ-LEGAL]` Review de scraping `open.spotify.com` para tool #2 — riesgo ToS.
- `[PRODUCT]` Validar prioridad MVP de tools #1, #2, #3. Mi recomendación: P1.
- `[PRODUCT]` Decidir slug structure: `/herramientas/{tool}/{artist}` vs `/{tool-name-direct}/{artist}`. Mi voto: el segundo (mejor SEO ES).
- `[DATA-SEO]` Investigación profunda Eventbrite API.
- `[DATA-SEO]` Keyword research formal (Ahrefs / Brave SERP) para validar volúmenes de este doc.

### Consultas pendientes a Engineering

- Capacidad de implementar 3 tools P1 en paralelo a Sprint 5/7 ejecución, ¿o las metemos en cola post-Stage 4 drained?
- Costo de scraping `open.spotify.com` (tool #2 strategy b): rate limit propio + headless browser vs HTTP simple + HTML parse.

### Consultas pendientes a Product Architecture

- Confirmar que las 8 tools encajan con visión recalibrada. Mi propuesta: tools como "feature crítico fan-first" según Pillar 2 del MVP.
- Tool #8 (timeline) requiere curación mínima — ¿pasa el filtro de "no editorial"?

---

## Próximos outputs (orden propuesto)

1. **`05-Data/keyword-research.md`** — keyword research formal en español. Volúmenes reales (Brave SERP + Google Trends + lo que tengamos). Validar las hipótesis de este doc.
2. **`05-Data/api-docs/eventbrite.md`** — investigación profunda Eventbrite API. Cobertura para diáspora VE, costos, auth, rate limits.
3. **Decision doc: Spotify monthly-listeners workaround.** Costos y riesgos de las 3 opciones (a/b/c) para tool #2.

---

## Last reviewed

- 2026-04-25 — Data & SEO chat — v0.1 inventario inicial.
