# SEO Tools Roadmap — Dauton Media

**Owner:** Data & SEO chat
**Última actualización:** 2026-04-25 · v0.3 (post-research Eventbrite + Spotify decision)
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

## Filtros aplicados

- **Founder descartó visualizaciones editoriales** (mapa interactivo del rap, timeline rap VE) como foco directo. Default: **NO priorizar** salvo que keyword research demuestre tráfico real medible. Quedan listadas abajo como "deprioritized pending evidence".
- **Founder descartó hostear lyrics** (riesgo legal). Solo linkamos a Genius.
- **Founder descartó editorial tradicional** (blogs, reviews). Tools sí, blogs no.

---

## Criterios de ranking

| Criterio | Definición | Escala |
|---|---|---|
| **Keyword potential** | Volumen estimado + cantidad de variantes long-tail | Bajo / Medio / Alto |
| **Complejidad técnica** | Esfuerzo de implementación (data + queries + UI) | Bajo / Medio / Alto |
| **Valor de negocio** | Tracción al perfil + autoridad + diferenciación | Bajo / Medio / Alto |
| **Data readiness** | % de datos ya en DB hoy o post-Sprints próximos | 0-100% |
| **Riesgo legal** | Verde (data pública atribuida) / Amarillo (gris) / Rojo (NO) | Verde / Amarillo / Rojo |

**Caveat:** los rangos vienen de Brave SERP + Google Trends + intuición. **Validación formal pendiente** (próximo output: `keyword-research.md`).

---

## Ranking final (8 tools activas)

| # | Tool | KW potential | Complejidad | Valor | Data ready | Legal | MVP fit |
|---|---|---|---|---|---|---|---|
| 1 | **Quién produjo [canción]** | Alto | Bajo | Alto | 30% (post-Stage 4) | Verde | ✅ P1 |
| 2 | **Calculadora de ingresos del artista** | Alto | Medio | Alto | 60% | Amarillo | ✅ P1 |
| 3 | **Discografía completa de [artista]** | Alto | Bajo | Medio-Alto | 90% (post-Sprint 5) | Verde | ✅ P1 |
| 4 | **Próximos conciertos de [artista]** | Medio-Alto | Medio | Alto | 0% (req Eventbrite + Setlist.fm) | Verde | 🟡 P2 |
| 5 | **Grafo de colaboraciones de [artista]** | Medio | Medio | Alto | 50% (post-Stage 4) | Verde | 🟡 P2 |
| 6 | **Buscador de samples** | Medio | Bajo | Medio-Alto | 40% | Verde | 🟡 P2 |
| 7 | **Artistas similares a [artista]** | Medio | Bajo-Medio | Medio | 50% | Verde | 🟢 P3 |
| 8 | **Comparador head-to-head** | Bajo-Medio | Bajo | Medio | 80% | Verde | 🟢 P3 |

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
- Schema ya existe. Worker MB scaffolded (Sprint 6), Genius idem (Sprint 6.5). **Ejecución de Stage 4 pendiente** (post-Sprint 7).
- Hoy: 0% drained. En 30-60 días post-Stage 4: 30-60% de tracks de pillars con producer credit.

**Complejidad técnica:** baja. Query con joins. Página estática SSG por slug. Bonus: agregar samples ("ese beat sampleó X").

**Valor de negocio:**
- Productores latinos están INVISIBILIZADOS en español. Jeiby, Kpú, Ahiezer, Big Yamo, Bnsino, Trooko — buscarlos hoy es un dolor real.
- KW intent: alta (la persona busca un crédito específico).
- Funnel doble: el productor también es persona en DB → segunda entrada al archive.
- Diferenciación: nadie en español cubre esto bien.

**Legal:** verde. MusicBrainz (CC0) + Genius API (uso permitido). Atribución obligatoria.

**Riesgos:**
- Conflicto de credits MB vs Genius (smoke ya mostró: Genius dijo Kpú produjo "Es Épico"). Resolver via skill `credit-reconciler` (stub Sprint 3).
- Tracks sin créditos = página vacía. Solución: fallback "información no disponible — ¿conoces al productor? contribuye".

**Acción:** **MVP P1.** Data llega gratis con Stage 4 ya scoped. Sólo UI + slug + SEO meta.

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

**Data necesaria — context refactorizado post-research 2026:**

⛔ Cambios irreversibles que cierran opciones que tenía como viables:
- Spotify Web API removió `followers` + `popularity` con Client Credentials (nov 2024).
- Spotify Web API ahora requiere Premium + Extended Quota requiere 250K MAU (feb 2026 — fuera de alcance).
- Diciembre 2025 Spotify desactivó **86M cuentas** post-incidente Anna's Archive. Enforcement REAL en 2026 — scraping de `open.spotify.com` ya no es gris, es prohibitivo.

✅ Opciones viables HOY:
- **(a) Estimación con bandas** — free, default. `tracks.popularity_score` (0-100, sí lo retorna API) + número tracks + antigüedad + playlists. Output como rango ("$1,500 — $4,200 / mes"). 1 sprint.
- **(c) Soundcharts API** — autorizado, $10-50/mes Starter. Monthly listeners reales. Sin riesgo legal. Upgrade post-launch.
- **(d) Kworb.net scrape** — fallback gris (Kworb scrapea, nosotros re-scrapeamos su HTML). Free. Mantenimiento alto. Solo si presupuesto Soundcharts no aprobado.

⛔ DESCARTADAS:
- Scraping `open.spotify.com` directo: riesgo de ban Premium account + ToS violación documentada + enforcement activo.
- OAuth user flow: dev mode limitado a 25 test users, no alcanza para 1000 artistas.

Detalle completo en `seo/decisions/spotify-listeners-workaround.md`.

**Tarifas para fórmula:** $0.003-$0.005 / stream (Spotify), $0.008-$0.013 (Apple Music), variantes por país.

**Complejidad técnica:** baja-media.
- Strategy (a): SQL + funciones puras. **1 sprint.**
- Strategy (c) Soundcharts: integración API + nuevo worker. **1 sprint adicional** post-budget approval.
- Strategy (d) Kworb fallback: Playwright + parser + cache 24h. **1.5 sprints.**

**Valor de negocio:**
- KW "cuánto gana [artista] spotify" tiene volumen real en LATAM.
- Funnel directo al perfil + branding "los que saben de la economía del rap latino".
- UI critical: bandas visuales ($X — $Y / mes), no número único. Confianza implícita en el rango.

**Legal:** verde con strategy (a) y (c). Amarillo gris con (d). Rojo descartado con scraping directo.

**Riesgos residuales:**
- Estimación pobre = artista molesto. Mitigación: bandas + disclaimer + sources visibles.
- Strategy (c) requiere budget founder ($120-600/año).

**Acción:** **MVP P1 con strategy (a).** Marketing como "Estimador". Upgrade automático a (c) Soundcharts cuando founder apruebe budget post-launch.

**Push back resuelto:** strategy (b) eliminada del set viable. (a) es ahora 1 sprint clean. (c) es 1 sprint adicional post-budget.

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

**Complejidad técnica:** baja. Query directo + render. Necesita la página `/releases/[slug]` (deuda en `_Execution/design-vs-repo-audit.md`).

**Valor de negocio:**
- Competidores: Wikipedia, Discogs, Genius — ninguno con UX limpia en español + links Spotify+Apple+YouTube juntos.
- Diferenciación: completitud automatizada + UX en español + multi-platform.

**Legal:** verde. Spotify metadata + atribución.

**Riesgos:**
- Releases con fecha incorrecta de Spotify (catálogo viejo re-uploadeado). Mitigación: cross-check con MusicBrainz.

**Acción:** **MVP P1.** Bloqueado por Sprint 5. Una vez drenado, esto es 1 sprint de UI.

---

### 4. Próximos conciertos de [artista] — `/eventos/[artist-slug]`

**Pitch:** "¿Dónde toca tu artista favorito? Próximos conciertos en Venezuela, España, Miami y Latam."

**Keywords primarias (ES):**
- "conciertos [artista]"
- "[artista] en [ciudad]"
- "[artista] tour [año]"
- "próximos conciertos [artista]"
- "shows de [artista] en [país]"

**Long-tail:** combinatorial artista × ciudad × año. Cada combinación con un evento real = landing única.

**Volumen estimado:** medio-alto. KW intent altísima (la persona quiere comprar tickets). Capa local diáspora ("Apache en Madrid", "Akapellah en Miami") es exactamente el público primario.

**Data necesaria — context refactorizado post-research 2026:**

⛔ Bloqueador crítico descubierto: **Eventbrite removió el endpoint de búsqueda global en diciembre 2019.** Solo se puede consultar por `organization_id` o `venue_id` ya conocido. Impacto: no podemos hacer "buscar 'rap Miami' → eventos" vía API.

✅ Arquitectura híbrida obligatoria:
1. **Mantener DB de organizers + venues latinos relevantes** (curated initial 50-100 entries, scraping de listings públicos para growth).
2. **Eventbrite API** consultada por cada org/venue del DB → filtro por categoría Music+Hip Hop/Rap/Latin + keyword match con artistas.
3. **Setlist.fm** para históricos por MBID (ya scoped Stage 7a).
4. **Bandsintown** reactivado parcial (free) para complementar artistas que tocan en venues no-Eventbrite.
5. **Scraping IG de promotores VE locales** (Apartaco, La Guarimba, etc.) — post-MVP, Firecrawl + Claude extraction.

Detalle completo en `api-docs/eventbrite.md`.

**Cobertura esperada:**
- Miami latino: alta (Eventbrite) ✅
- España (Madrid/Barcelona): alta (Eventbrite) ✅
- Colombia (Bogotá/Medellín): media — parte usa Tu Boleta o Pass Line (locales)
- USA Latino (NYC/LA/Houston): alta (Eventbrite) ✅
- Caracas + interior VE: BAJA en Eventbrite — depende del scraping IG post-MVP

**Complejidad técnica:** media-alta (subió desde "media" original).
- 1 worker Eventbrite con loop por org_id.
- 1 worker Setlist.fm.
- 1 cron de scraping de listings públicos Eventbrite para descubrir orgs nuevos.
- Tabla `events_orgs_seed` nueva con organizer_ids curados.
- Stage 7a (Setlist.fm) sigue siendo válido para históricos.
- ~2-3 sprints incluyendo curación inicial.

**Valor de negocio:** sin cambios — KW intent transaccional alta. Diáspora primaria. Habilita affiliate Fase 3.

**Legal:** verde. Eventbrite ToS requiere mostrar event title + link directo a eventbrite.com (compliance fácil).

**Riesgos:**
- Curación manual inicial es overhead que no anticipé. ~10-15h de research + DB seeding.
- Eventos VE locales requieren scraping IG (no Eventbrite). Defer a v2.0.
- Sin programa de affiliate público de Eventbrite — monetización tickets requiere partnerships directos con promotores.

**Acción:** **P2 con scope expandido.** Bloqueado por: (a) signup Eventbrite + Setlist.fm API keys, (b) Sprint 7a Setlist.fm execution, (c) curación inicial DB de orgs latinos. Mover a P1.5 si queremos cobertura de eventos críticos para launch.

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
- `collaborations` + `tracks.featured_artists`. Spotify Stage 2 puebla parcial. MB completa vía relationships.
- Hoy: 0%. Stage 4-5 lo cubre.

**Complejidad técnica:** media. D3 force graph + zoom + filtros. Schema lo soporta.

**Valor de negocio:**
- Killer feature para fans. "Con quién colaboró Apache" es búsqueda real.
- Diferenciación alta. Spotify "Related Artists" es algorítmico, no relacional. Genius no visualiza grafo.
- Funnel: cada nodo es perfil → cross-funnel intra-archive.

**Legal:** verde.

**Riesgos:**
- Grafo denso = ilegible. Necesita filtros (top-N, por año, por tipo de colab).

**Acción:** **P2.** Requiere Stage 4-5 ejecutado.

---

### 6. Buscador de samples — `/samples/[track-slug]`

**Pitch:** "Qué canciones samplea esta. Qué canciones la samplearon a ella."

**Keywords primarias (ES):**
- "samples de [canción]"
- "qué sampleó [canción]"
- "[canción] que sampleó"
- "sample de [canción] [artista]"

**Volumen estimado:** medio. Nicho intenso de fans hardcore + producers + crate diggers.

**Data necesaria:**
- Genius samples API (scaffolded Sprint 6.5). Hoy: 0% drained. Smoke test ya mostró 1 sample relationship en Es Épico.
- Coverage limitada: Genius cubre samples solo donde la community los anotó. Cola larga underground = patchy.

**Complejidad técnica:** baja. Tabla `track_samples` con direction (samples / sampled_by). Query directo. UI minimal.

**Valor de negocio:**
- Underserved en español. WhoSampled.com domina en inglés con UX vieja. En español casi nadie.
- Funnel doble: ambos artistas (sampler y sampled) son perfiles.
- Branding: credibilidad con productores y fans hardcore.

**Legal:** verde. Genius API permite uso de metadata.

**Riesgos:**
- Coverage spotty. Mitigar con CTA "agregar sample" (contribuciones — schema ya tiene `contributions`).

**Acción:** **P2.** Bajo esfuerzo, valor de comunidad alto.

---

### 7. Artistas similares a [artista] — `/similares/[artist-slug]`

**Pitch:** "Si te gusta [artista], probablemente te gusten estos. Recomendación basada en colabs reales + ciudad + género + Last.fm."

**Keywords primarias (ES):**
- "raperos como [artista]"
- "rap parecido a [artista]"
- "similar a [artista]"
- "artistas como [artista]"
- "rap [género/ciudad] como [artista]"

**Volumen estimado:** medio. KW intent alta — la persona busca discovery. Long-tail por artista.

**Data necesaria:**
- Híbrido: `collaborations` + same `city_id` + same `genre_id` + Last.fm "similar artists" API (a integrar — secondary source en `source-catalog.md`).
- Algoritmo simple ranking: weight por colab directa > misma ciudad > mismo género > Last.fm.

**Complejidad técnica:** baja-media. SQL ranking + UI cards. Last.fm integration pendiente (1 sprint para worker).

**Valor de negocio:**
- Cross-funnel intra-archive: cada recomendación es nuevo perfil clickeable.
- Captura discovery KW (intent alta).
- Diferenciación: Spotify recomienda algorítmicamente, nosotros con relación REAL (colab, ciudad, género).

**Legal:** verde. Last.fm API permite uso.

**Riesgos:**
- Recomendaciones malas si data del artista es delgada. Mitigación: requerir mínimo de colabs/data antes de mostrar tool.

**Acción:** **P3.** Requiere Last.fm worker + ejecución Stage 4 + city resolution.

---

### 8. Comparador head-to-head de artistas — `/comparar/[artist-a]-vs-[artist-b]`

**Pitch:** "Apache vs Akapellah. Quién tiene más streams, más colabs, más alcance."

**Keywords primarias (ES):**
- "[artista A] vs [artista B]"
- "diferencia entre [A] y [B]"
- "quién es mejor [A] o [B]"

**Volumen estimado:** bajo-medio en cada combinación, combinatorial gigante (n*(n-1)/2). Con 100 artistas → 4,950 páginas potenciales. **Riesgo de thin content si se generan masivamente sin curation.**

**Data necesaria:**
- streams, releases count, collaborations count, ciudad, géneros — todo en schema.
- `CompareView` componente ya existe (Sprint Design Sync v3).

**Complejidad técnica:** baja. Componente UI ya existe.

**Valor de negocio:**
- KW intent: medio.
- Combinatorial atractivo para SEO pero riesgoso (Google penaliza thin auto-generated content).
- Mitigación: solo generar comparaciones con relación real (han colaborado, misma ciudad, mismo género). Selectivo, no masivo.

**Legal:** verde.

**Riesgos:**
- Penalización SEO por thin content masivo si se hace sin filtro.

**Acción:** **P3.** Lanzar selectivo (top 50 pares relevantes) y medir antes de escalar.

---

## Tools deprioritized pending KW evidence

Founder no las quiere como foco, pero las dejo listadas. Solo entran al backlog activo si keyword research formal demuestra tráfico real medible.

### Mapa interactivo del rap por ciudad — `/mapa/[ciudad-slug]`
- KW: "rap caraqueño", "raperos de [ciudad]", "rap venezolano en miami / madrid".
- Coste: pipeline de city resolution + viz.
- **Default: NO priorizar.** Reactivar solo si la KW research demuestra volumen >2k búsquedas/mes en ES para términos geo.

### Timeline del rap venezolano / latino — `/timeline/[escena-slug]`
- KW: "historia del rap venezolano", "evolución del rap latino", "primer rapero venezolano".
- Coste: alto (curación + storytelling + viz temporal).
- **Default: NO priorizar.** Border con regla "no editorial". Reactivar solo si KW research justifica + Product Architecture aprueba el border.

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

- `[ENG]` Worker para resolver `people.city_id` desde Wikipedia/MB/Genius (bloqueante para tool #7 + viz deprioritized).
- `[ENG]` Decisión técnica: estrategia stream counts / monthly listeners (a/b/c según opciones de tool #2). Coordinar con `[BIZ-LEGAL]`.
- `[ENG]` Last.fm worker (bloqueante para tool #7).
- `[BIZ-LEGAL]` Review de scraping `open.spotify.com` para tool #2 — riesgo ToS.
- `[PRODUCT]` Validar prioridad MVP de tools #1, #2, #3. Mi recomendación: P1.
- `[PRODUCT]` Decidir slug structure: `/{tool-name}/{artist}` directo (mi voto, mejor SEO ES) vs `/herramientas/{tool}/{artist}`.
- `[DATA-SEO]` (mío) Investigación profunda Eventbrite API (bloqueante para tool #4 + prioridad founder).
- `[DATA-SEO]` (mío) Keyword research formal (Ahrefs / Brave SERP) para validar volúmenes de este doc.

### Consultas pendientes a Engineering

- Capacidad de implementar 3 tools P1 en paralelo a Sprint 5/7 ejecución, ¿o las metemos en cola post-Stage 4 drained?
- Costo de scraping `open.spotify.com` (tool #2 strategy b): rate limit propio + headless browser vs HTTP simple + HTML parse.

### Consultas pendientes a Product Architecture

- Confirmar que las 8 tools encajan con visión recalibrada. Mi propuesta: tools como "feature crítico fan-first" según Pillar 2 del MVP.
- Confirmar deprioritización de mapa/timeline. ¿Reabrir si KW evidence aparece, o cierre definitivo?

---

## Próximos outputs (orden propuesto)

1. **`05-Data/keyword-research.md`** — keyword research formal en español. Volúmenes reales (Brave SERP + Google Trends). Validar/refutar las hipótesis de este doc.
2. **`05-Data/api-docs/eventbrite.md`** — investigación profunda Eventbrite API (gap declarado por founder + bloqueante para tool #4).
3. **Decision doc: Spotify monthly-listeners workaround.** Costos y riesgos de las 3 opciones (a/b/c) para tool #2.

---

## Last reviewed

- 2026-04-25 — Data & SEO chat — v0.2 (refactor post-feedback founder: deprioritized mapa/timeline, agregadas próximos conciertos + similares).
- 2026-04-25 — Data & SEO chat — v0.1 inventario inicial.
