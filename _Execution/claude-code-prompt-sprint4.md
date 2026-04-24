# Prompt para Claude Code — Sprint 4 (Spotify worker real + Stage 1 bootstrap)

**Cómo usar:** pegar todo entre los `---` en Claude Code con el workspace
apuntando a `/Users/luisfiguera/Downloads/Vulqo LLC/Projects/Dauton Media/`.

**Pre-requisito:** Sprint 3 aplicado (migración 0005, src/lib/ingest/
scaffolding, 15 pillars ya en DB sin spotify_id aún).

---

Hola, soy Luis. Sprint 3 cerró limpio. Ahora arrancamos el **primer pipeline
vivo**: Stage 1 bootstrap de artistas via playlists de Spotify. Al final
de este sprint, la tabla `people` pasará de 15 pillars a ~150-250 candidatos
en estado `review`, y los 15 pillars tendrán su `spotify_id` asignado.

Scope estricto: **solo Spotify**. No MusicBrainz, no YouTube, no credits,
no press. Solo identificar artistas y sus Spotify IDs.

## Contexto mínimo (leer antes de escribir código)

1. `_Execution/ingestion-playbook.md` — Stage 1 y Stage 2 spec.
2. `05-Data/api-docs/spotify.md` — endpoints, rate limits, auth, gotchas.
3. `05-Data/seed/spotify-playlists.json` — 5 playlists prioritarias para este sprint.
4. `src/lib/ingest/clients/spotify.ts` — stub actual.
5. `src/lib/ingest/workers/spotify.ts` — stub actual.

Nothing else.

## Tarea 1 — `SpotifyClient` real

Implementar en `src/lib/ingest/clients/spotify.ts`. Specs:

### Auth
- Client Credentials flow.
- Token cache in-memory con TTL (refresh 5 min antes de expiry).
- Método privado `getToken(): Promise<string>`.

### Métodos públicos

```ts
class SpotifyClient {
  // Single artist
  getArtist(spotifyId: string): Promise<SpotifyArtist>;

  // Search
  searchArtist(q: string, limit?: number): Promise<SpotifyArtist[]>;

  // Discography
  getArtistAlbums(spotifyId: string, opts?: {
    include_groups?: Array<'album'|'single'|'compilation'|'appears_on'>;
    limit?: number;
    offset?: number;
    market?: string;  // default 'ES'
  }): Promise<{ items: SpotifyAlbum[]; next: string | null; total: number }>;

  getAlbumTracks(albumId: string, opts?: { limit?: number; offset?: number }):
    Promise<{ items: SpotifyTrack[]; next: string | null; total: number }>;

  getTrack(trackId: string): Promise<SpotifyTrack>;

  // Discovery
  getRelatedArtists(spotifyId: string): Promise<SpotifyArtist[]>;
  getPlaylistTracks(playlistId: string, opts?: { limit?: number; offset?: number }):
    Promise<{ items: Array<{ track: SpotifyTrack | null }>; next: string | null }>;
}
```

### Reglas
- **Rate limiting:** cada call pasa por `consumeBudget('spotify')` de
  `src/lib/ingest/queue/rate-limit.ts`. Si circuit open → throw
  `RateLimitError`.
- **Retry on 429:** parse `Retry-After` header, sleep ese tiempo, retry max
  2×. Si falla 3× → throw.
- **Retry on 5xx:** exponential backoff 1s → 2s → 4s, max 3×.
- **Raw response logging:** cada call exitosa escribe a `raw_responses`
  table via un helper compartido `persistRawResponse({ source: 'spotify', url, body, queue_item_id? })`. Mismo helper para todos los workers.
- **Type definitions:** declarar `SpotifyArtist`, `SpotifyAlbum`, `SpotifyTrack`,
  `SpotifyImage` en `src/lib/ingest/clients/spotify.types.ts` alineados con
  responses reales de Spotify (solo los campos que usamos, no el full shape).

### Gotcha de paginación
Spotify retorna `next` URL completa. Client sigue siguiéndolo hasta null
(o `maxPages` param para cortar). Expose método helper:
```ts
async *getAllAlbums(spotifyId, opts): AsyncGenerator<SpotifyAlbum>
async *getAllPlaylistTracks(playlistId): AsyncGenerator<SpotifyTrack>
```

## Tarea 2 — `spotifyWorker.execute()` con operations

En `src/lib/ingest/workers/spotify.ts`, reemplazar stub con switch real:

```ts
async execute(item: QueueItem): Promise<WorkerResult> {
  switch (item.operation) {
    case 'fetch_playlist_artists': return fetchPlaylistArtists(item);
    case 'resolve_artist_by_name':  return resolveArtistByName(item);
    case 'fetch_artist_details':    return fetchArtistDetails(item);
    case 'fetch_related_artists':   return fetchRelatedArtists(item);
    default:
      return { ok: false, error: `unknown operation: ${item.operation}`, retryable: false };
  }
}
```

### Operation `fetch_playlist_artists`
Input: `payload.playlist_id` (Spotify playlist ID).
Proceso:
1. Fetch all tracks via `getAllPlaylistTracks`.
2. Extract unique `artist.id`s (skip null tracks — playlists podridas).
3. Para cada artist extracted:
   - Si no hay `people` row con ese `spotify_id` → queue `resolve_artist_by_name`
     con payload `{ spotify_id, spotify_name, source_playlist: playlist_id }`
4. Retorna count de new queue items.

### Operation `resolve_artist_by_name`
Input: `payload: { spotify_id, spotify_name, source_playlist? }`.
Proceso:
1. Check if already exists by `spotify_id` → skip (return already-resolved).
2. Fuzzy match contra `people.stage_name` (normalized lowercase, no accents):
   - Exact match (score 1.0) → update existing row con `spotify_id`.
   - Trigram similarity > 0.9 (using `pg_trgm`) → update existing (log as possible match).
   - 0.7-0.9 → CREATE new row con `visibility='review'`, log as ambiguous_match candidate.
   - < 0.7 → CREATE new row con `visibility='review'`, `is_peripheral=true` si el name tiene clear non-VE signal (default false).
3. Para el row updated/created: queue `fetch_artist_details` con payload `{ spotify_id }`.
4. Retorna created=1 or updated=1.

**Normalización de nombre:**
```ts
function normalizeName(n: string): string {
  return n.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')  // strip accents
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')                  // strip punct
    .replace(/\s+/g, ' ').trim();
}
```

### Operation `fetch_artist_details`
Input: `payload: { spotify_id }` or `entity_ref = people.id`.
Proceso:
1. `GET /v1/artists/{id}`.
2. Update `people` row:
   - `spotify_id` (confirm)
   - `stage_name` solo si estaba empty
   - `photo_url` ← `images[0].url` (highest res)
   - `spotify_followers`, `spotify_popularity`, `last_stats_sync_at`
3. Also insert `entity_stats` rows:
   - `{ entity_type: 'person', entity_id, source: 'spotify', metric: 'followers', value: followers.total }`
   - idem metric='popularity'
4. Genres:
   - Spotify retorna genres array. NO los pusheamos a `genres` table
     automáticamente — pueden ser ruido. Guardar en `people_genres` con
     genre lookup solo para matches exactos en nuestra tabla `genres`
     existente. Logs para genres new.
5. Retorna updated=1.

### Operation `fetch_related_artists`
Input: `payload: { spotify_id }`.
Proceso:
1. `GET /v1/artists/{id}/related-artists`.
2. Filter: solo artists con genre overlap a "hip hop" / "rap" / "latin" /
   "venezuelan" (cualquier genre que contenga esos substrings).
3. Para cada filtered (up to top 10):
   - Queue `resolve_artist_by_name` con payload `{ spotify_id, spotify_name, source: 'related_of:' + spotify_id }`.
4. Retorna new_items count.

## Tarea 3 — `runStage1Bootstrap` pipeline

En `src/lib/ingest/pipelines/stage-1-seed.ts`:

```ts
export async function runStage1Bootstrap(opts?: {
  dryRun?: boolean;
  includeRelated?: boolean;  // default true — expand via related_artists after playlist scan
}): Promise<{
  playlistsScanned: number;
  candidatesQueued: number;
  existingPillarsResolved: number;
}>
```

Steps:
1. Lee `05-Data/seed/spotify-playlists.json`.
2. Filter playlists con `mvp_priority in ['critical', 'high']` (5 playlists).
3. Por cada playlist: enqueue `fetch_playlist_artists` con payload `{ playlist_id }`.
4. Espera queue empty para Spotify (poll cada 3s, max 10 min).
5. Pillars resolution check: count pillars con `spotify_id` null → should be ~0.
6. Si `includeRelated=true`: para cada pillar con spotify_id, queue `fetch_related_artists`.
7. Espera queue empty otra vez.
8. Return summary.

## Tarea 4 — CLI `scripts/ingest/bootstrap-seed.ts`

```ts
// Run: npx tsx scripts/ingest/bootstrap-seed.ts [--dry-run] [--no-related]
import 'dotenv/config';
import { runStage1Bootstrap } from '@/lib/ingest/pipelines/stage-1-seed';
import { runDispatcher } from '@/lib/ingest/queue/dispatcher';

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const includeRelated = !process.argv.includes('--no-related');

  console.log(`Starting Stage 1 Bootstrap (dryRun=${dryRun}, includeRelated=${includeRelated})`);

  const startCount = await countPeople();
  console.log(`People before: ${startCount}`);

  const result = await runStage1Bootstrap({ dryRun, includeRelated });
  console.log('Bootstrap enqueued:', result);

  if (!dryRun) {
    // Drain the queue for Spotify until empty
    let iterations = 0;
    while (iterations++ < 200) {
      const r = await runDispatcher({ maxItems: 50, sources: ['spotify'] });
      console.log(`Dispatch iter ${iterations}:`, r);
      if (r.processed === 0 && r.skipped_rate_limit === 0) break;
      await new Promise(res => setTimeout(res, 2000));
    }
  }

  const endCount = await countPeople();
  console.log(`People after: ${endCount} (delta: ${endCount - startCount})`);
  console.log(`Pillars with spotify_id: ${await countPillarsWithSpotify()}/15`);
}

main().catch(e => { console.error(e); process.exit(1); });
```

## Tarea 5 — CLI helper `scripts/admin/approve-artist.ts`

Mientras no tenemos admin UI, Luis necesita approve manual:

```ts
// Run: npx tsx scripts/admin/approve-artist.ts <slug-or-stage-name> [--public]
import 'dotenv/config';
// ... reads arg, updates visibility='public' if --public, logs to edit_history
```

Simple, sin feature creep. Actualiza `people.visibility='public'` + log.

## Tarea 6 — Smoke test end-to-end

Corre en secuencia y reporta:

```bash
cd 02-Engineering/website

# 1. Dry run: sin writes, solo fetch & parse
npx tsx scripts/ingest/bootstrap-seed.ts --dry-run
# → debe loggear playlist tracks count, no error de auth, sin DB writes

# 2. Real run (sin related para test más rápido)
npx tsx scripts/ingest/bootstrap-seed.ts --no-related
# → espera cierre, People delta > 50

# 3. Verifica estado DB
psql $DATABASE_URL -c "select visibility, count(*) from people group by visibility"
# → 15 review (pillars now resolved) + N review (new from playlists) + 0 public probably
# → pillars should now have spotify_id

# 4. Related expansion
npx tsx scripts/ingest/bootstrap-seed.ts
# → añade ~50-100 more via related_artists
```

Verifica también:
```sql
select count(*) from entity_stats where source='spotify' and metric='followers';
-- debería ser ≈ al número de people con spotify_id

select count(*) from raw_responses where source='spotify';
-- debería ser > 0 y < 5000

select * from pipeline_runs order by started_at desc limit 3;
-- debería mostrar los runs recientes con estimated_cost_usd = 0 (Spotify es free)
```

## Tarea 7 — Reporte de cierre

Formato estricto:

```
Hecho: [1 línea]
SpotifyClient: implementado · auth OK · X métodos públicos
Worker operations: fetch_playlist_artists, resolve_artist_by_name, fetch_artist_details, fetch_related_artists
Stage 1 Bootstrap run:
  - playlists scanned: 5/5 | X/5
  - candidates queued: X
  - pillars resolved (spotify_id set): 15/15 | X/15
  - people total after: X (delta +Y)
entity_stats rows created: X
raw_responses rows: X
Smoke test: passed | failed (step que falló)
Issues encontrados: [list o "ninguno"]
Próximo paso sugerido: [1 línea — típicamente Sprint 5 Stage 2 (discografía + tracks)]
```

## Scope explícito — NO hagas

- **NO toques workers de otras fuentes** (MusicBrainz, YouTube, Genius, Brave, Firecrawl, Wikipedia, Whisper).
- **NO implementes Stage 2** (discografía, tracks, collaborations). Eso es Sprint 5.
- **NO ejecutes skills de Claude** — este sprint es 100% data fetching, no LLM.
- **NO hagas commit** — Luis revisa antes de push.
- **NO toques UI ni componentes React**.
- **NO expandas el scope** aunque descubras algo jugoso. Log y seguí.
- **NO consumas credits gratuitos** — Spotify es free. Pero si ves que
  Claude Code quiere hacer algo que consume Brave/Firecrawl/YouTube quota,
  detente — eso es scope de otros sprints.
