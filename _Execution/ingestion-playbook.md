# Ingestion Playbook

**Department:** Data / Engineering
**Owner:** Luis Figuera
**Last updated:** 2026-04-23
**Status:** draft · plan source of truth para Sprints 3-8

Este playbook define el plan por etapas para poblar Dauton Media con data real.
Cada etapa es: input → proceso → output → entregable verificable.

Reglas:
- **Nunca improvises sobre la marcha.** Si algo no cabe en una etapa definida,
  se documenta aquí primero, después se ejecuta.
- **Cada etapa es replicable.** Workflows de n8n guardados como JSON en
  `_Execution/workflows/` para que el orden se pueda re-correr o clonar
  para nuevos mercados (Colombia, México, etc.).
- **El queue es el corazón.** Todo fetch externo pasa por él. Respeta rate
  limits, se reanuda tras fallos, hace visible el costo por API.
- **Confidence scoring universal.** Cada claim insertada lleva score 0-1.
  Alta confianza publica; media va a admin review; baja se descarta.

---

## Arquitectura en una pantalla

```
┌────────────────────────────────────────────────────────────────┐
│                          N8N (self-hosted)                     │
│                                                                │
│   Dispatcher (cron every 60s)                                  │
│        │                                                       │
│        ├─ reads ingestion_queue respecting rate budgets        │
│        │                                                       │
│        └─ dispatches to worker workflows:                      │
│             ├─ Spotify worker                                  │
│             ├─ MusicBrainz worker                              │
│             ├─ Wikipedia/Wikidata worker                       │
│             ├─ YouTube worker                                  │
│             ├─ Genius worker                                   │
│             ├─ Brave+Firecrawl worker (press)                  │
│             └─ YT-Transcript worker                            │
│                                                                │
│   Each worker:                                                 │
│        1. fetch raw                                            │
│        2. persist raw_response                                 │
│        3. call Claude skill (transform)                        │
│        4. insert into domain tables                            │
│        5. re-queue follow-ups                                  │
│        6. mark completed + log cost                            │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌────────────────────────────────────────────────────────────────┐
│                          Supabase                              │
│  domain tables · ingestion_queue · ingestion_rate_limits       │
│  raw_responses · pipeline_runs · edit_history                  │
└────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    Next.js website (reads public tables)
```

---

## Stage 0 · Infrastructure + credentials (Sprint 3)

**Duration:** 2-3 días. **Platform:** Claude Code + Luis.

**Inputs:**
- API credentials para 5 plataformas (ver `credentials-checklist.md`).
- Decisión de host n8n (Railway recomendado, $5/mes).

**Proceso:**
1. Luis obtiene credentials y las pega en `02-Engineering/website/.env.local` + Vercel.
2. Claude Code deploys n8n en Railway usando template oficial.
3. Claude Code crea migración `0005_ingestion_queue.sql` con tablas:
   - `ingestion_queue` (source, entity_ref, priority, status, attempts, next_attempt_at, payload)
   - `ingestion_rate_limits` (source, rpm, rpd, used_today, window_start, circuit_state)
   - `raw_responses` (id, source, url, status_code, body jsonb, fetched_at)
   - `pipeline_runs` (pipeline_id, started_at, ended_at, entities_touched, cost_usd, status)
4. Claude Code crea `src/lib/skills/` con stubs tipados Zod:
   - `bio-drafter` · `press-extractor` · `credit-reconciler` · `dedup-judge` · `transcript-extractor` · `entity-resolver` · `event-deduplicator`
5. Claude Code crea n8n workflow "dispatcher" + rate-limit refill cron.

**Entregable:**
- n8n corriendo en Railway, login funciona.
- Dispatcher workflow visible en UI, sin dispatches todavía.
- Skills stubs con tests unitarios pasando.
- Migración 0005 aplicada.

**Smoke test:**
- Insertar 1 fila dummy en `ingestion_queue` con source='test'.
- Dispatcher la lee, la marca processed, log sale.

---

## Stage 1 · Bootstrap seed (Sprint 3 end → Sprint 4 start)

**Duration:** 1 día (Luis 4h, Claude Code 2h). **Platform:** manual + Spotify.

**Inputs:**
- Los 15 pillars ya están en DB (migración 0003).
- **Luis provee:**
  - CSV manual `05-Data/seed/manual-seed.csv` con 30-50 nombres adicionales conocidos
    (formato: `stage_name,legal_name?,city,role,is_venezuelan,notes`).
  - Lista de 5-10 **playlists Spotify** de rap venezolano (URLs o IDs).
  - Lista de 3-5 **canales YouTube** de entrevistas relevantes (URLs).

**Proceso (Claude Code):**
1. Import del CSV manual → `people` rows con `visibility='review'`.
2. Por cada playlist ID: Spotify `GET /v1/playlists/{id}/tracks`, extrae artists
   únicos, dedup vs ya existentes → queue como candidates.
3. Por cada pillar: Spotify `GET /v1/artists/{id}/related-artists` → top 20,
   dedup → queue.
4. MusicBrainz query `?query=country:VE AND (tag:rap OR tag:hip-hop)&type=artist`
   → dedup → queue.
5. Total candidatos → vista admin "review queue" con botones approve/reject.
6. Luis revisa. Aprobados pasan a `visibility='review'` + entran en Stage 2.
   Rechazados marcados como `is_peripheral=false + visibility='draft'` para
   no volver a sugerirse.

**Entregable:**
- 150-250 candidatos en `people` en estado review.
- Luis aprueba batch de ~100 artistas MVP core.
- Lista de channels YouTube guardada en `05-Data/seed/youtube-sources.json`.
- Lista de playlists guardada en `05-Data/seed/spotify-playlists.json`.

**Metodología replicable:** para expandir a Colombia post-MVP, se corre el
mismo Stage 1 con `country:CO` en MB, playlists colombianas, related_artists
de pillars colombianos.

---

## Stage 2 · Spotify catalog (Sprint 4)

**Duration:** 3-4 días. **Platform:** Claude Code wiring + n8n execution.

**Rate limit:** Spotify 180 req/min. Cada artista requiere ~20-30 calls
(artist details, albums paginated, tracks per album). Capacidad:
~6 artistas/min → 100 artistas en ~17 minutos puro fetch. En la práctica
con overhead y writes ~1 hora.

**Inputs:**
- Artistas en `people` con `visibility='review'` y `spotify_id` null o vacío.

**Proceso (worker Spotify):**
1. Para cada artista sin `spotify_id`:
   - `GET /v1/search?q={stage_name}&type=artist` → top 3 matches
   - Matching score (nombre + genres + followers + country inferido)
   - Alto match → auto-assign. Bajo → admin disambiguation queue.
2. Con `spotify_id` conocido:
   - `GET /v1/artists/{id}` → update `followers, popularity, genres, photo_url`
   - `GET /v1/artists/{id}/albums?include_groups=album,single,compilation&limit=50`
     → paginate until done
   - Por cada album: `GET /v1/albums/{id}/tracks` → insert `releases` + `tracks`
   - Extraer features → si feature no existe en `people`, crear con
     `is_peripheral=true, visibility='draft'`
   - Insertar `collaborations` rows
3. Trigger completeness recompute.
4. Revalidate Vercel page.

**Output esperado:**
- Cada artista core: 1-15 releases, 10-150 tracks, 5-30 collaborations.
- Peripheral artists auto-creados (features de otros países, colaboraciones one-off).

**Costos:**
- Spotify: $0 (free).
- Claude: 0 (no extraction en este stage, solo matching).
- Total por 100 artistas: ~$0.

**Entregable:**
- 100 artistas con discografía completa renderizando en `/artists/[slug]`.
- Homepage muestra "últimos releases" real con data.
- `SmokeTest`: `select count(*) from releases` > 500.

---

## Stage 3 · Bios + identity (Sprint 5)

**Duration:** 2-3 días. **Platform:** Claude Code + skill `bio-drafter`.

**Inputs:**
- Artistas con Spotify ID y sin `bio_short` o `bio_short` draft.

**Proceso:**
1. Wikipedia query: `GET {lang}.wikipedia.org/api/rest_v1/page/summary/{name}`
   (primero ES, fallback EN).
2. Wikidata SPARQL: cross-platform IDs (MB, IMDb, Discogs), birth_date,
   origin, active years.
3. Skill `bio-drafter` prompt:
   - Input: wiki summary + Spotify genres + top 3 collaborators + career span
   - Output schema: `{ bio_short ≤ 80 words ES, claims_used[], confidence 0-1 }`
   - Reglas del prompt: **zero invention**. Si no hay evidencia de X, no lo
     menciones. Tono sobrio. Sin emojis. Sin "icono del rap", "genio lírico".
4. Persist `bio_short` con `visibility='review'`. Admin approves → public.

**Source tracking:** cada bio lleva `source_ids[]` apuntando a la Wikipedia
page + los Spotify data points usados.

**Costos:**
- Claude: ~2K input / 200 output tokens por artista = ~$0.01/artista.
- 100 artistas = ~$1 total.

**Entregable:**
- 100 artistas con bio corta sourced.
- Admin ve queue de bios para aprobar.
- Pillar artists (15) pasan por revisión manual más profunda de Luis.

---

## Stage 4 · Credits (MusicBrainz) (Sprint 6)

**Duration:** 4-5 días (rate limit hace lento). **Platform:** n8n + skill
`credit-reconciler`.

**Rate limit:** MusicBrainz 1 req/s hard. Plan: correr 24/7 desde n8n.

**Inputs:**
- Releases con `musicbrainz_id` null y Spotify ID conocido.

**Proceso:**
1. MB lookup by Spotify URL relationship: `GET /ws/2/url?resource=spotify.com/...`
   → retorna release group ID.
2. `GET /ws/2/release-group/{id}?inc=artist-credits+recordings+labels`
   → fetch release + tracks + labels.
3. Por cada track: `GET /ws/2/recording/{id}?inc=work-rels+artist-rels`
   → producer, engineer, writer relationships.
4. Skill `credit-reconciler`:
   - Input: credits desde Spotify (básico), MB (profundo), Genius (variable)
   - Output: merged credits con `conflicts[]` marcando discrepancias
   - Conflicts van a admin resolution queue
5. Persist `production_credits`, `writing_credits`, `label_eras`.

**Cobertura esperada:** MB tiene data rica para pillars (Canserbero, Apache,
Akapellah tienen MB extenso). Cola larga venezolana: ~30% cobertura.
Completamos con Genius en Stage siguiente.

**Entregable:**
- Todos los releases con credits visibles.
- Producer directory navegable (lista de productores con track counts).

---

## Stage 5 · Press discovery (Sprint 7)

**Duration:** 3 días setup + ongoing. **Platform:** n8n + Brave + Firecrawl
+ skill `press-extractor`.

**Rate limit:** Brave free 2K/mes = 66/día. Plan: 3 queries/artista/semana
= 300 queries/semana para 100 artistas. Fit en free hasta que scale.

**Inputs:**
- Artistas en estado `public` sin press_mentions o última revisión > 7 días.

**Proceso (worker Brave+Firecrawl):**
1. Build 3 queries por artista:
   - `"{stage_name}" rap venezolano`
   - `"{stage_name}" entrevista`
   - `"{stage_name}" {latest_release_title}` (si existe)
2. Brave Search API → up to 20 results per query.
3. Filter: domain whitelist (tier 1-3 outlets) + recent (< 3 años default).
4. Dedup contra `articles.url` existente.
5. Firecrawl `POST /v2/scrape` → body markdown.
6. Skill `press-extractor` prompt:
   - Input: article markdown + artist context (stage_name, city, pillars he collabs with)
   - Output: `{ quote ≤ 15 words, prominence, tags[], career_events[], confidence }`
7. High confidence → auto-publish press_mention.
   Low confidence → admin review.

**Outlet whitelist:** empezamos con 30 outlets curados en
`05-Data/seed/media-outlets.json` con credibility tier asignado.
Nuevos outlets descubiertos van a admin review para tier asignación.

**Costos:**
- Brave: $0 hasta 2K/mes, luego $10/mes.
- Firecrawl: según plan Vulqo.
- Claude: ~3K in / 400 out = ~$0.04 por artículo. 300 artículos/mes = $12/mes.

**Entregable:**
- Cada pillar con ≥5 press_mentions.
- Cada artista core con ≥3 press_mentions.
- Admin ve queue de review con thumbnail del artículo + quote propuesto.

---

## Stage 6 · YouTube transcripts (Sprint 8)

**Duration:** 5-7 días. **Platform:** n8n + yt-dlp + Whisper (fallback) +
skills `transcript-extractor` + `entity-resolver` + `event-deduplicator`.

**Inputs:**
- Canales YouTube curados en `05-Data/seed/youtube-sources.json` (empezamos
  con El Apartaco + 4-5 más que Luis confirme).
- Para cada canal: scan de últimos N videos filtrados por duración > 25 min.

**Proceso (worker YT-Transcript):**

**Fase A · Scraping (resuelto):**
1. n8n YouTube node con channel ID → lista últimos 50 videos.
2. Filter: duración > 25 min + not processed (`videos.youtube_id` lookup).
3. yt-dlp con flags `--sub-lang es --write-auto-sub --skip-download` →
   captions SRT.
4. Si no hay captions: yt-dlp `--extract-audio --audio-format mp3` →
   Whisper API ($0.006/min).
5. Persist raw transcript en `raw_responses`.

**Fase B · Processing masivo (el valor real):**

1. **Chunking con overlap:**
   - Split transcript en chunks de 2K palabras con 200 overlap.
   - Cada chunk conserva timestamps.

2. **Extracción paralela per chunk — skill `transcript-extractor`:**
   - Input: chunk text + artist context + diccionario live de stage_names en DB
   - Output schema:
     ```
     {
       quotes: [{ text ≤15w, timestamp_start, speaker_inferred }],
       mentions: [{ name_raw, role_inferred, context_sentence, timestamp }],
       events: [{ date_or_year, city?, title, description, people_involved[] }],
       topics: string[]
     }
     ```
   - Reglas del prompt: extract, don't paraphrase. Si cita textual, reproducir
     literal ≤15 palabras. Skip si no hay claim clara.

3. **NER + fuzzy reconciliation — skill `entity-resolver`:**
   - Input: `mentions[]` + DB snapshot de people/labels/cities/events
   - Output: `{ entity_type, entity_id | null, confidence }` por mention
   - Algoritmo: exact match on stage_name → pg_trgm fuzzy (threshold 0.85) →
     context disambiguation (co-occurrence con otros artistas del dict).
   - Si confidence < 0.6 → marcar para admin review.

4. **Cross-video dedup — skill `event-deduplicator`:**
   - Input: eventos extraídos + eventos ya en DB con descripciones similares
   - Output: `{ action: 'merge' | 'new' | 'discard', target_id?, reason }`
   - Similitud: fecha (año) + participantes overlap + cosine similarity
     de descripción.

5. **Confidence routing:**
   - High (> 0.85): auto-insert con `visibility='public'`.
   - Medium (0.6-0.85): insert con `visibility='review'` + admin notif.
   - Low (< 0.6): discard, log en pipeline_runs.

**Costos por entrevista de 1h:**
- Captions: $0 (mayoría).
- Whisper fallback: ~$0.36 si no hay captions (30% de videos estimado).
- Claude extraction: ~8 chunks × 2K in / 500 out = ~$0.10-0.15.
- Claude NER + dedup: ~$0.02.
- **Total promedio**: ~$0.20 por video de 1h.
- Con 5 canales × 50 videos = 250 videos × $0.20 = **$50 one-shot** para
  procesar historial completo.

**Entregable:**
- Base con ≥50 transcripts procesados.
- ≥500 quotes en `press_mentions` tagueadas como `source_type='video'`.
- ≥200 nuevos `career_events` estructurados.
- Pillars como Apache, Canserbero, Lil Supa con timeline rico.

**Value diferencial:** ningún competidor tiene rap venezolano con career
events citables a timestamps de video con source atribuible. Esta es la
razón por la que prensa va a citar a Dauton Media.

---

## Stage 7 · Continuous enrichment (ongoing)

**Always-on.** Estos jobs corren en n8n como cron.

| Job | Cadence | Purpose |
|---|---|---|
| New release monitor | Daily | Spotify: ¿algún artista tracked sacó algo nuevo? |
| Press discovery refresh | Weekly per artist | Brave: nuevos artículos publicados |
| Transcript channel scan | Weekly | YouTube: nuevos videos en canales curados |
| Follower snapshot | Weekly | Spotify + YouTube: track de crecimiento |
| External link health | Weekly | HEAD check de URLs en sources, fallback Wayback |
| Dedup sweep | Nightly | pg_trgm + shared external IDs → dedup candidates |
| Orphan detection | Nightly | Entities sin relations ni press ni releases |
| Completeness recompute | On write (trigger) | + Weekly full sweep |

Cada job reporta a `pipeline_runs` con cost + entidades tocadas. Admin
dashboard muestra gasto Claude del mes en tiempo real.

---

## Queue architecture detalle

### Rate limit registry (valores iniciales)

```json
{
  "spotify":     { "rpm": 180, "rpd": null,   "priority_base": 10 },
  "musicbrainz": { "rpm": 60,  "rpd": null,   "priority_base": 8  },
  "youtube":     { "rpm": null, "rpd": 10000, "priority_base": 7  },
  "genius":      { "rpm": 600, "rpd": null,   "priority_base": 5  },
  "brave_free":  { "rpm": null, "rpd": 66,    "priority_base": 6  },
  "firecrawl":   { "rpm": 30,  "rpd": null,   "priority_base": 9  },
  "whisper":     { "rpm": 30,  "rpd": null,   "priority_base": 4  }
}
```

### Queue item lifecycle

```
queued → in_flight → done
         ↓
       failed → backoff → queued (if attempts < 5)
                         → dead_letter (if attempts ≥ 5)
```

### Priority formula

```
effective_priority = item.priority_base
                   + source.priority_base
                   + staleness_bonus  (days since last attempt, max 10)
                   - failure_penalty  (attempts × 2)
```

### Circuit breaker por source

Tracked en `ingestion_rate_limits.circuit_state`:
- `closed`: todo normal.
- `half_open`: último fallo reciente, admit 1 request de prueba.
- `open`: 3+ fallos consecutivos → pausa 15 min, reset contador.

---

## Replicabilidad: templates n8n

Todo workflow se guarda como JSON export en `_Execution/workflows/`:
- `01-dispatcher.json`
- `02-worker-spotify.json`
- `03-worker-musicbrainz.json`
- `04-worker-wikipedia.json`
- `05-worker-youtube.json`
- `06-worker-genius.json`
- `07-worker-brave-firecrawl.json`
- `08-worker-yt-transcript.json`
- `09-cron-new-releases.json`
- `10-cron-press-refresh.json`
- `11-cron-transcript-scan.json`

Cada export es importable directamente en otra instancia n8n. Para rollout
a Colombia (Sprint N del roadmap), clonar + cambiar `country:VE` por
`country:CO` en las queries de seed.

---

## Métricas de éxito por stage

| Stage | Métrica | Target |
|---|---|---|
| 0 | n8n responsive, dispatcher corre | ✓/✗ |
| 1 | Candidates revisados by Luis | 150-250 |
| 2 | Artistas con releases reales | 100+ |
| 3 | Artistas con bio_short public | 100+ |
| 4 | Releases con ≥1 producer credit | 70% |
| 5 | Pillars con ≥5 press_mentions | 15/15 |
| 6 | Transcripts procesados | 50+ |
| 7 | Data freshness (< 7 días stale) | 95% |

Estas métricas van al admin dashboard y se revisan en standup semanal.

---

*See also: [`05-Data/source-catalog.md`](../05-Data/source-catalog.md) ·
[`05-Data/ingestion-pipelines.md`](../05-Data/ingestion-pipelines.md) ·
[`05-Data/data-qa.md`](../05-Data/data-qa.md) ·
[`credentials-checklist.md`](./credentials-checklist.md)*
