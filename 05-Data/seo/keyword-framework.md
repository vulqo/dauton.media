# Keyword Research Framework — Dauton Media

**Owner:** Data & SEO chat
**Última actualización:** 2026-04-25 · v0.1
**Status:** metodología lista. Primera iteración de KW research v1 entregada en `keyword-research.md` (output próximo).

---

## Por qué este doc existe

Sin un framework consistente, cada análisis de KW termina siendo opinión. Este doc define **cómo investigamos**, **qué fuentes**, **cómo scorificamos** y **cómo priorizamos** — para que cualquier output de KW research sea reproducible y auditable.

---

## Contexto de mercado para Dauton

- **Idioma primario:** español. KWs en EN como secundario post-launch.
- **Mercados primarios:** Venezuela + diáspora (Miami / España / Colombia / USA latino). Geo-segment importa mucho.
- **Verticales del archive:** rap latino, hip-hop hispanohablante, productores, eventos, lyrics linkout, samples.
- **Audiencia 1:** fans (rol #1 según founder, driver de crecimiento orgánico).
- **Audiencia 2:** artistas + productores (claim flow).
- **Audiencia 3:** promotores + labels (post-MVP).
- **Tono editorial:** archivo + tool, NO blog. Por eso priorizamos KWs informativas con intent específica → match con tools, no con artículos.

---

## Fuentes de datos KW (sin GSC)

| Fuente | Tipo de señal | Cómo se usa |
|---|---|---|
| **DataForSEO** | Volumen real + difficulty + CPC + variants | Validar volúmenes hipotéticos. SERP overview por KW. Fuente primaria. |
| **Google Trends (pytrends)** | Curva temporal + relacionadas + breakouts | Detectar timing (estacional vs growing) y new emerging KWs. |
| **Brave Search SERP** | Resultados reales en LATAM/España | Análisis de competencia + intent classification. |
| **Bing Webmaster Tools** | KW que ya rankeamos (post-launch) | Iterativo, no inicial. |
| **Reddit (r/rapenespanol, r/Venezuela, r/musicabuena, r/hiphopheads)** | Lenguaje real del fan | Listening: cómo nombran a productores, artistas, eventos. |
| **YouTube Search Suggest** | Auto-suggestions | Mismo intent que Google muchas veces. Mining via headless browser. |
| **TikTok Search** | Tendencias de descubrimiento Gen Z | Lenguaje informal. Manual review semanal. |
| **Spotify search behavior (proxy)** | Top artistas + búsquedas asociadas | Inferred from playlists' titles + descriptions. |
| **AnswerThePublic / AlsoAsked** | "People also ask" | Manual mensual. No worth pagar API. |
| **Genius forum + comments** | Slang + nombres alternativos | Manual checks por artista. |

**Volúmenes en este framework siempre vienen acompañados de:**
- Source ID (qué tool lo midió).
- Fecha de medición.
- Geo-segment (ES, MX, VE, US-Latino, ES-ES, CO).
- Confidence: ALTA si DataForSEO ≥ 2 chequeos consistentes / MEDIA si Trends + Brave coinciden / BAJA si solo intuición.

---

## Taxonomía de keywords

Toda KW que ingresamos se clasifica con estas dimensiones:

### A. Intent

| Intent | Descripción | Match con tool de Dauton |
|---|---|---|
| **Discovery** | "raperos venezolanos buenos", "rap como canserbero" | Tool #7 Similares + perfil hub |
| **Specific lookup** | "discografía akapellah", "biografía apache" | Tool #3 Discografía + perfil |
| **Question / how** | "cuánto gana apache spotify", "quién produjo es épico" | Tool #1 + Tool #2 |
| **Transactional** | "concierto apache madrid 2026", "tickets canserbero" | Tool #4 Eventos |
| **Comparison** | "akapellah vs apache", "diferencia trap reggaeton" | Tool #8 Comparador |
| **Editorial** (no priority) | "historia rap venezolano", "mejor disco rap latino 2026" | NO match — descartado por founder |

### B. Funnel stage

- **TOFU** (top of funnel) — descubrimiento. Trae tráfico amplio. Ej. "rap venezolano".
- **MOFU** (middle) — investigación. Ej. "mejores raperos venezolanos 2026".
- **BOFU** (bottom) — acción. Ej. "tickets apache madrid 2026".

### C. Geo

ES (genérico), VE, CO, MX, ES-ES (España), US-Latino, AR, otros LATAM.

### D. Entity dependency

- **Per-artist:** se multiplica por cada artista del archive.
- **Per-track:** por cada track.
- **Per-city:** por cada ciudad.
- **Standalone:** una sola landing, no combinatorial.

### E. Cluster

Agrupamiento semántico vía embeddings (OpenAI text-embedding-3-small + clustering en pgvector). Cada cluster mapea a 1 tool/template. Se rebuilds mensual.

---

## Scoring framework

Cada KW recibe un score compuesto de 0-100. La fórmula:

```
score = (volume_normalized × 0.35)
      + (intent_match_score × 0.25)
      + (data_readiness × 0.20)
      + (kd_inverse × 0.10)
      + (strategic_bonus × 0.10)
```

### Componentes:

- **volume_normalized (0-100):** log-normalize del search volume mensual. 0 si sin data; 100 si > 10k MSV.
- **intent_match_score (0-100):** qué tan bien la KW matchea una tool/template existente. 100 si coincide con tool P1; 50 si requiere tool nueva; 0 si requiere editorial (descartado).
- **data_readiness (0-100):** % de la data necesaria que ya está en DB. 100 si full ready; 0 si requiere worker nuevo.
- **kd_inverse (0-100):** 100 - DataForSEO Keyword Difficulty. Más alto = más fácil rankear.
- **strategic_bonus (0-100):** ajuste manual por valor de marca. Ej. KWs de productores latinos invisibilizados = +50 aunque volumen sea bajo.

KWs con score ≥ 70 entran a backlog activo. 40-69 → watchlist. < 40 → descartar.

---

## Workflow de keyword research

### Paso 1 — Seed list (entity-driven)

Para Dauton, las semillas de KW vienen de la DB, no de brainstorming. Para cada entity en MVP, generar variants mecánicas:

**Per-artist** (`people` table):
```
{stage_name}                                  → discovery TOFU
{stage_name} biografía                        → specific lookup
{stage_name} discografía                      → specific lookup
{stage_name} mejores canciones                → discovery MOFU
{stage_name} cuánto gana spotify              → question
{stage_name} concierto {city}                 → transactional (combinatorial)
{stage_name} feat                             → discovery
{stage_name} colaboraciones                   → discovery
{stage_name} edad                             → question
{stage_name} de dónde es                      → question
{stage_name} novia / pareja                   → question (cuidado: low quality?)
{stage_name} muerte / murió                   → question (canserbero, etc.)
quién es {stage_name}                         → question
{stage_name} vs {other_stage_name}            → comparison
```

**Per-track** (`tracks` table):
```
{title} {artist}                              → specific
{title} letra                                 → discovery (link out, no on-page)
{title} significado                           → question
{title} sample                                → question
{title} quién produjo                         → question
{title} año                                   → question
```

**Per-release** (`releases` table):
```
{title} álbum                                 → specific
{title} {artist} canciones                    → discovery
{title} fecha lanzamiento                     → question
```

**Per-city** (`cities` table):
```
rap {city_name}                               → discovery
raperos de {city_name}                        → discovery
hip hop {city_name}                           → discovery
escena rap {city_name}                        → discovery
```

**Per-producer** (`people` con role=producer):
```
{producer_name} producciones                  → discovery
beats de {producer_name}                      → discovery
quién es {producer_name} productor            → question
```

Cada plantilla genera N keyword candidates donde N = count(rows) en la tabla. Con 81 people × 12 templates = ~972 KWs candidatos solo de artistas.

### Paso 2 — Volumen + difficulty (DataForSEO batch)

Mandar la seed list en batches de 1000 a DataForSEO `keywords_data/google/search_volume`. Cost: ~$7.50 / 1000 KWs.

Filtrar:
- Volume mensual > 10 (corte mínimo viable).
- Geo: ES, VE, CO, MX, ES-ES, US.

### Paso 3 — Intent classification (Claude pass)

Para cada KW que pasa el filtro, Claude Haiku clasifica intent + funnel stage + match con tool. Costo: ~$0.001/KW. Con 1000 KWs = $1.

### Paso 4 — Cluster con embeddings

Embeddings de cada KW en OpenAI text-embedding-3-small. Clustering K-means o HDBSCAN en pgvector. Output: 30-80 clusters semánticos.

Cada cluster recibe un nombre (auto-asignado por Claude desde la KW central) y se asigna a una tool/template.

### Paso 5 — Scoring + ranking

Aplicar fórmula. Output a `keyword-research.md` con tabla:

```
| Cluster | KW central | Volume agregado | KD avg | Intent | Tool target | Score | Status |
```

### Paso 6 — Action backlog

KWs/clusters con score ≥ 70 → ticket `[ENG]` o `[DATA-SEO]` para implementar la tool/page que las cubre.

KWs en watchlist (40-69) → revisión mensual; subir a backlog si volumen crece o data lista cambia.

---

## Geo-segmentación específica diáspora VE

Cada KW se chequea en estos 5 geos prioritarios:

1. **ES (genérico hispano)** — base.
2. **VE (Venezuela)** — público local.
3. **US (US-Latino)** — diáspora primaria. Geos US: Miami, NYC, LA, Houston, Orlando.
4. **ES-ES (España)** — diáspora europea. Madrid, Barcelona.
5. **CO (Colombia)** — vecino + diáspora reciente.

Si una KW tiene volumen alto solo en 1 geo, la landing target ese geo via metadata + hreflang. Si tiene volumen across, la landing es genérica ES con hreflang regional.

---

## Listening continuo (no-batch)

Además del batch research mensual, corren listeners pasivos:

| Listener | Frecuencia | Output |
|---|---|---|
| **Reddit search** ("rap" + "hip-hop" + nombres VE) | Diaria via API | Slack alerts si > X menciones nuevas |
| **YouTube auto-suggest scrape** (top 30 artistas) | Semanal | Append a watchlist con confidence MEDIA |
| **Google Trends rising** (queries hispanas) | Diaria | Alert si breakout > 100% week-over-week relacionado al archive |
| **Brand monitor** ("dauton media", "dauton.media", "calculadora rap") | Diaria | Saber cuándo nos linkean |
| **Competitor mentions** (Genius, Last.fm, Wikipedia equivalentes hispanos) | Semanal | Detectar gaps de cobertura |

Implementación: workers en `src/lib/seo/listeners/` schedulados via GitHub Actions o Cloudflare Workers cron.

---

## Métricas del keyword program

| Métrica | Definición | Target 6 meses post-launch |
|---|---|---|
| KWs ranking top 10 | KWs con posición Bing/Google ≤ 10 | 50+ |
| KWs ranking top 3 | Posición ≤ 3 | 10+ |
| KW coverage | KWs en backlog activo / KWs candidatas | > 60% |
| Avg score backlog | Promedio del score de KWs en backlog | > 65 |
| Tools shipped vs planned | P1+P2 tools shipped | 6/8 |

---

## Outputs derivados de este framework

- `keyword-research.md` (próximo) — primera iteración v1 con resultados.
- `keyword-watchlist.md` — KWs que aún no priorizamos pero monitoreamos.
- `kw-clusters/{cluster-id}.md` — 1 doc por cluster importante con KW + content brief para Engineering.

---

## Last reviewed

- 2026-04-25 — Data & SEO chat — v0.1 inicial.
