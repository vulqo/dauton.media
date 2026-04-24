# Prompt para Claude Code — Sprint 5 (Stage 2: discografía + tracks)

**Cómo usar:** pegar entre los `---` en Claude Code con workspace en
`/Users/luisfiguera/Downloads/Vulqo LLC/Projects/Dauton Media/`.

**Pre-requisitos:**
- Sprint 4 aplicado.
- Spotify circuit breaker CERRADO (verificar: `select circuit_state from ingestion_rate_limits where source='spotify'` debe retornar `'closed'`). Si está OPEN, esperar cooldown.
- Los 15/15 pillars con `spotify_id` (post-cooldown los 5 pendientes deberían resolver automático).

---

Hola, soy Luis. Sprint 4 cerró con 76 people resueltos con `spotify_id`
pero `entity_stats` vacío y rate limit hit. Ahora arrancamos Stage 2:
**discografía + tracks + collaborations** desde los artistas ya resueltos.

**Lección Sprint 4 que debés respetar:** Spotify abofetea con 23h retry
si hacés >600 calls rápidas. Este sprint va a generar ~900-1500 calls.
Hay que aplicar disciplina de spacing para NO repetir el ban.

## Contexto mínimo (leer antes de escribir código)

1. `05-Data/api-docs/spotify.md` — **leer sección ⚠ Critical caveats**
   actualizada post-Sprint-4. Reglas nuevas de rate limit, timeout obligatorio.
2. `_Execution/ingestion-playbook.md` — Stage 2 spec.
3. `02-Engineering/data-model.md` — shapes de `releases`, `tracks`, `collaborations`.
4. Código existente: `src/lib/ingest/workers/spotify.ts`, `src/lib/ingest/clients/spotify.ts`.

## Tarea 1 — Rate limit discipline (primero, no último)

**Antes de cualquier nueva llamada**, actualizar `SpotifyClient` para que
cada call tenga **spacing mínimo 300ms entre requests consecutivos** (no
solo rpm budget). Pattern:

```ts
class SpotifyClient {
  private lastCallAt = 0;
  private readonly minSpacingMs = 300;

  private async respectSpacing() {
    const elapsed = Date.now() - this.lastCallAt;
    if (elapsed < this.minSpacingMs) {
      await new Promise(r => setTimeout(r, this.minSpacingMs - elapsed));
    }
    this.lastCallAt = Date.now();
  }

  // Llamar en cada request después de consumeBudget, antes del fetch
}
```

**Cap al `Retry-After` handler:** si Spotify retorna `Retry-After > 30`
segundos, **NO dormir ese tiempo** en el worker. En lugar de eso:
1. Abrir circuit breaker para Spotify.
2. Marcar la queue item como `retryable=true` pero con `next_attempt_at = now() + Retry-After segundos`.
3. Retornar `{ ok: false, error: 'rate_limit_extended', retryable: true }`.
4. El dispatcher verá circuit open y parará a dispatch hacia Spotify.

Esto evita que un solo worker call bloquee el proceso 23h.

## Tarea 2 — Extender `spotifyWorker.execute()` con 2 operations nuevas

### Operation `fetch_discography`
Input: `payload: { spotify_id }` (o `entity_ref = people.id` con spotify_id en row).
Proceso:
1. `getAllArtistAlbums(spotify_id, { include_groups: ['album','single','compilation','appears_on'], market: 'ES' })`
2. Para cada album retornado:
   - **Filter out `appears_on`** donde el artist NO es primary (solo un feature
     en el álbum de otro). No crear `releases` row para esos — solo usarlos
     para detectar colaboraciones.
   - Si es primary artist o same_set_primary:
     - Upsert en `releases`:
       - `slug = slugify(title + '-' + year)` con fallback si duplicado
       - `primary_artist_id = people.id` del artista
       - `title`, `released_date` (YYYY-MM-DD o YYYY-MM-01 o YYYY-01-01 según precision), `released_date_precision`
       - `release_type` mapeado: album_type `album` → `'album'`, `single` → `'single'`, `compilation` → `'compilation'`. Si `album_type=single` y `total_tracks >= 4` → `'ep'`.
       - `total_tracks`, `spotify_id`, `cover_url` (images[0].url)
       - `visibility='review'` (admin debe aprobar antes de público)
     - Queue `fetch_album_tracks` con payload `{ release_id, spotify_album_id }`
   - Si es `appears_on` (feature):
     - NO crear release row, pero queue `fetch_album_tracks_for_feature`
       con payload `{ spotify_album_id, featuring_person_id: people.id }`
3. Return count.

### Operation `fetch_album_tracks`
Input: `payload: { release_id, spotify_album_id }`.
Proceso:
1. `getAllAlbumTracks(spotify_album_id)` (paginate).
2. Para cada track:
   - Upsert en `tracks`:
     - `slug = slugify(release.slug + '-' + track.track_number + '-' + track.name)`
     - `release_id`, `title`, `duration_seconds = Math.round(duration_ms/1000)`, `track_number`
     - `isrc` desde `external_ids.isrc` (null OK)
     - `explicit` desde el campo explicit ✓
     - `spotify_id`
   - Para cada artist en `track.artists[]`:
     - Si es el primary del release: skip (ya lo es).
     - Si es otro que YA está en `people` con spotify_id: insert `collaborations` con `role='feature'`, `track_id`.
     - Si es otro que NO está: crear `people` row con `is_peripheral=true`, `visibility='draft'`, spotify_id, stage_name = artist.name (sin trigger de fetch_artist_details todavía — queue solo si prioridad alta)
     - Insert `collaborations`.
3. Return.

### Operation `fetch_album_tracks_for_feature`
Input: `payload: { spotify_album_id, featuring_person_id }`.
Proceso: como `fetch_album_tracks` pero **NO crea `releases` ni `tracks` rows nuevas**. Solo:
1. Busca si el album ya existe como release en DB (por spotify_id). Si no, skip (no es nuestro scope crear el release de otro artista).
2. Si existe: por cada track, si el featuring_person_id aparece en `track.artists[]` → insert `collaborations` con `role='feature'`.

## Tarea 3 — Pipeline `runStage2Catalog`

En `src/lib/ingest/pipelines/stage-2-catalog.ts`:

```ts
export async function runStage2Catalog(opts?: {
  limit?: number;      // opcional: solo N artists (util para smoke test con 3-5)
  onlyPillars?: boolean;   // true = solo los 15 pillars
  dryRun?: boolean;
}): Promise<{
  artistsProcessed: number;
  queueItemsEnqueued: number;
}>
```

Steps:
1. Select `people` con `spotify_id IS NOT NULL` y `visibility IN ('public', 'review')`.
2. Si `onlyPillars=true`, filtrar `visibility='public' AND is_venezuelan=true`.
3. Si `limit`, aplicar limit.
4. Para cada artist, enqueue `fetch_discography` con payload `{ spotify_id }`.
5. Return.

**Ejecución real:** el dispatcher drena a ritmo de 300ms por call. Si hay
76 artists × ~5 albums promedio × (1 fetch_discography + 5 fetch_album_tracks)
= ~456 calls + 76 = 532 calls. Bajo el threshold de 600 pero apretado.

**Recomendación:** correr `runStage2Catalog({ onlyPillars: true })` primero
(15 artists → ~90 calls, seguro). Validar output. Luego expandir.

## Tarea 4 — CLI `scripts/ingest/catalog.ts`

```ts
// Run: npx tsx scripts/ingest/catalog.ts [--pillars-only] [--limit=N] [--dry-run]
import 'dotenv/config';
import { runStage2Catalog } from '@/lib/ingest/pipelines/stage-2-catalog';
import { runDispatcher } from '@/lib/ingest/queue/dispatcher';

async function main() {
  const pillarsOnly = process.argv.includes('--pillars-only');
  const limitArg = process.argv.find(a => a.startsWith('--limit='));
  const limit = limitArg ? Number(limitArg.split('=')[1]) : undefined;
  const dryRun = process.argv.includes('--dry-run');

  console.log(`Stage 2 Catalog (pillarsOnly=${pillarsOnly}, limit=${limit}, dryRun=${dryRun})`);

  const r1 = await runStage2Catalog({ onlyPillars: pillarsOnly, limit, dryRun });
  console.log('Enqueued:', r1);

  if (!dryRun) {
    // Drain with respect to rate limits
    let iterations = 0;
    while (iterations++ < 500) {
      const r = await runDispatcher({ maxItems: 20, sources: ['spotify'] });
      console.log(`Dispatch iter ${iterations}:`, r);
      if (r.processed === 0 && r.skipped_rate_limit === 0) break;
      await new Promise(res => setTimeout(res, 1000));  // 1s between dispatch cycles
    }
  }

  // Status summary
  console.log('\n=== Final state ===');
  // count releases, tracks, collaborations
}

main().catch(e => { console.error(e); process.exit(1); });
```

## Tarea 5 — Smoke test end-to-end

**Importante: correr en 3 fases incrementales, NO todo de una.**

### Fase A: Dry run
```bash
npx tsx scripts/ingest/catalog.ts --pillars-only --dry-run
# → debe loggear "Would enqueue 15 items" sin DB writes
```

### Fase B: Solo 3 pillars (para validar shape)
```bash
npx tsx scripts/ingest/catalog.ts --pillars-only --limit=3
# → observa logs. Verifica en DB:
```
```sql
select p.stage_name, count(r.id) as releases, count(t.id) as tracks
from people p
left join releases r on r.primary_artist_id = p.id
left join tracks t on t.release_id = r.id
where p.slug in (
  select slug from people where is_venezuelan and visibility='public' limit 3
)
group by p.stage_name;
```

### Fase C: Si Fase B clean, expandir a todos los pillars
```bash
npx tsx scripts/ingest/catalog.ts --pillars-only
# → 15 pillars totales
```

### Fase D (opcional este sprint): candidatos en review
```bash
npx tsx scripts/ingest/catalog.ts
# → todos los 76 con spotify_id. CUIDADO con rate limit.
# Si circuit se abre → parar, reportar, dejar para próximo sprint.
```

## Tarea 6 — Verificaciones finales

```sql
-- releases count
select count(*), release_type from releases group by release_type;

-- tracks count
select count(*) from tracks;
select count(*) filter (where isrc is not null) as with_isrc from tracks;
select count(*) filter (where explicit) as explicit from tracks;

-- collaborations
select role, count(*) from collaborations group by role;

-- peripherals creados
select count(*) from people where is_peripheral;

-- rate limit state
select source, circuit_state, requests_used_today
from ingestion_rate_limits where source='spotify';
```

## Tarea 7 — Reporte de cierre

Formato estricto:

```
Hecho: [1 línea]
Rate-limit discipline: min spacing implementado X ms, cap retry X s
Worker operations agregados: fetch_discography, fetch_album_tracks, fetch_album_tracks_for_feature
Pipeline runStage2Catalog: implementado + CLI

Smoke test fases:
  Fase A (dry run):       passed | failed
  Fase B (3 pillars):     passed | failed
  Fase C (15 pillars):    passed | failed | skipped (razón)
  Fase D (76 total):      passed | failed | skipped (razón)

Resultados DB post-ejecución:
  - releases:        X  (albums:Y, eps:Z, singles:W, compilations:V)
  - tracks:          X  (con ISRC: Y, explicit: Z)
  - collaborations:  X  (feature: Y, vocal: Z, primary: W)
  - peripherals:     X  (is_peripheral=true creados automáticamente)

Rate limit state final:
  - spotify circuit:        closed | half_open | open
  - requests_used_today:    X
  - Retry-After máximo visto: Xs

Queue estado:
  - done:          X
  - queued:        X
  - dead_letter:   X (con razones)

Issues encontrados: [list o "ninguno"]

Próximo paso sugerido:
  [típicamente: Sprint 6 MusicBrainz credits + Genius enrichment, o
   fase D si quedó skipped, o admin approval flow si hay muchos reviews]
```

## Scope explícito — NO hagas

- **NO toques otros workers** (MusicBrainz, YouTube, Genius, Brave, Firecrawl, Wikipedia).
- **NO implementes production_credits / writing_credits** — eso es Sprint 6 con MusicBrainz.
- **NO intentes resolver entity_stats** — el API change de Spotify lo imposibilita en este sprint. Queda como deuda técnica documentada.
- **NO ejecutes Fase D** si Fase C deja algún error o el circuit se pone half_open. Para antes.
- **NO hagas commit**.
- **NO toques UI**.

## Cuando termine este sprint

Los `/artists/[slug]` del preview site van a mostrar releases reales en vez
de `dm-empty-state` bloqueado. Ese es el visible win.

Si Fase D corre limpia, tendremos:
- ~300-500 releases
- ~3,000-5,000 tracks
- ~2,000+ collaborations

Suficiente para que el sitio "se sienta" como archivo real antes de meter
bios + press + transcripts en Sprints 6-8.
