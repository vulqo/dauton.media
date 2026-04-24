# Prompt para Claude Code — Sprint 6.5 (Wikipedia + Genius scaffolding + race fix)

**Cómo usar:** pegá entre los `---` en Claude Code con workspace en
`/Users/luisfiguera/Downloads/Vulqo LLC/Projects/Dauton Media/`.

**Pre-requisito:** ninguno bloqueante. Este sprint corre **en paralelo** con
el cooldown de Spotify. Wikipedia = no auth. Genius = token que ya tenemos.

**Objetivo:** dejar Wikipedia + Genius workers listos para usar en Stage 3
(bios) y Stage 4 (credits gap-fill). Smoke test mínimo sobre Canserbero +
Apache (los 2 pillars que ya tienen MBID desde Sprint 6). Fix de la race
condition de los 21 dead_letter de Sprint 4.

---

Hola, soy Luis. Mientras espera el cooldown de Spotify, avanzamos con 3
scaffolds que no dependen de él. Scope cerrado.

## Contexto mínimo

1. `05-Data/api-docs/wikipedia-wikidata.md` — endpoints REST + SPARQL, user-agent, rate limit.
2. `05-Data/api-docs/genius.md` — Bearer auth, endpoints, rate limit.
3. `src/lib/ingest/workers/musicbrainz.ts` — patrón de referencia (Sprint 6 cerrado limpio).
4. `MEMORY.md` sección 2026-04-24 Sprint 4 — deuda técnica "race condition 21 dead_letter".

## Tarea 1 — `WikipediaClient` real

En `src/lib/ingest/clients/wikipedia.ts`. Reemplazar stub.

### Auth
- Ninguna. User-Agent only (reusa `MUSICBRAINZ_USER_AGENT` env var).

### Base URLs
- Wikipedia ES: `https://es.wikipedia.org/api/rest_v1`
- Wikipedia EN: `https://en.wikipedia.org/api/rest_v1`
- Wikidata SPARQL: `https://query.wikidata.org/sparql`

### Métodos

```ts
class WikipediaClient {
  // Summary de un artículo (fallback ES → EN)
  getSummary(title: string, lang?: 'es' | 'en'): Promise<{
    title: string;
    extract: string;            // plain text summary
    thumbnail_url?: string;
    page_url: string;
    language: 'es' | 'en';
  } | null>;

  // SPARQL a Wikidata — pasa query + retorna bindings
  sparql(query: string): Promise<Array<Record<string, { type: string; value: string }>>>;

  // Helper común: dado un Wikidata Q-ID, retorna cross-platform IDs conocidos
  getCrossPlatformIds(wikidataQid: string): Promise<{
    spotify_id?: string;
    musicbrainz_id?: string;
    apple_music_id?: string;
    youtube_channel_id?: string;
    discogs_id?: string;
  }>;
}
```

### Reglas
- Spacing 500ms entre calls (conservative, no hay rate limit oficial).
- withTimeout 10s.
- persistRawResponse en cada call exitosa.
- Fallback logic: `getSummary(title, 'es')` → si 404 → retry con `'en'` → si 404 → return null.

## Tarea 2 — Wikipedia worker operations (2)

En `src/lib/ingest/workers/wikipedia.ts`.

### Operation `fetch_wikipedia_summary`
Input: `payload: { person_id, stage_name, wikidata_qid? }`.
Proceso:
1. `getSummary(stage_name)` — sin wikidata_qid, intenta por nombre.
2. Si retorna, guardar en raw_responses y **log** para futuro bio-drafter (NO escribir `people.bio_short` — ese es trabajo del skill `bio-drafter` en Stage 3 via Claude Max manual).
3. Si `wikidata_qid` existe en payload, después llamar `getCrossPlatformIds(qid)` y actualizar `people` con los IDs faltantes que MB no dio.
4. Return `{ ok: true, updated: N }`.

### Operation `resolve_wikidata_cross_ids`
Input: `payload: { person_id }`.
Proceso:
1. Read `people` row. Si ya tiene `wikidata_id`, saltar al step 3.
2. Si no, SPARQL query:
   ```sparql
   SELECT ?item WHERE {
     ?item wdt:P1902 "{spotify_id}" .
   }
   LIMIT 1
   ```
   (si hay spotify_id) o
   ```sparql
   SELECT ?item WHERE {
     ?item wdt:P434 "{musicbrainz_id}" .
   }
   LIMIT 1
   ```
   (si hay musicbrainz_id)
3. Si resuelve, update `people.wikidata_id = Qxxx`.
4. Con Qxxx resuelto, `getCrossPlatformIds(qid)` y backfill campos nuevos
   (`discogs_id`, `apple_music_id`, `youtube_channel_id`) solo si están null
   en `people`.
5. Return.

## Tarea 3 — `GeniusClient` real

En `src/lib/ingest/clients/genius.ts`.

### Auth
- Bearer token: `Authorization: Bearer ${process.env.GENIUS_CLIENT_ACCESS_TOKEN}`
- Base URL: `https://api.genius.com`

### Métodos

```ts
class GeniusClient {
  // Search songs (Genius no busca artists directo, solo songs)
  search(query: string, perPage?: number): Promise<Array<{
    id: number;
    title: string;
    full_title: string;
    url: string;
    primary_artist: { id: number; name: string };
  }>>;

  // Song detail con credits
  getSong(id: number): Promise<{
    id: number;
    title: string;
    url: string;
    release_date_for_display?: string;
    primary_artist: { id: number; name: string };
    producer_artists: Array<{ id: number; name: string }>;
    writer_artists: Array<{ id: number; name: string }>;
    featured_artists: Array<{ id: number; name: string }>;
    song_relationships: Array<{
      relationship_type: string;   // 'samples' | 'sampled_in' | 'interpolates' | 'cover_of' | etc
      songs: Array<{ id: number; title: string; primary_artist: { name: string } }>;
    }>;
  } | null>;

  // Artist detail (for aliases + social handles)
  getArtist(id: number): Promise<{
    id: number;
    name: string;
    alternate_names: string[];
    instagram_name?: string;
    twitter_name?: string;
    facebook_name?: string;
    url: string;
  } | null>;

  // Songs de un artist (paginate)
  getArtistSongs(artistId: number, opts?: { page?: number; perPage?: number; sort?: 'popularity' | 'title' }):
    Promise<{ songs: Array<{ id: number; title: string }>; next_page: number | null }>;
}
```

### Reglas
- Spacing 200ms (no hay rate limit oficial, conservative).
- withTimeout 10s.
- persistRawResponse cada call.
- 404 en getSong/getArtist retorna null (no throw).

## Tarea 4 — Genius worker operations (3)

En `src/lib/ingest/workers/genius.ts`.

### Operation `resolve_genius_artist_by_name`
Input: `payload: { person_id, stage_name }`.
Proceso:
1. `search(stage_name + " rap")` (agregamos "rap" para reducir false positives tipo comunes).
2. Filter: primary_artist con `name` normalizado (igual que en musicbrainz) que matchee stage_name.
3. Si hay match, `getArtist(artist_id)`:
   - update `people`:
     - `genius_id = artist.id.toString()`
     - `instagram_handle`, `twitter_handle` desde alternate_names si están null
     - `aliases` agregar `alternate_names` a la lista
4. Return.

### Operation `fetch_genius_song_credits`
Input: `payload: { track_id, genius_song_id }` O `payload: { track_id, title, artist_name }` (buscar por nombre).
Proceso:
1. Si viene `genius_song_id`: `getSong(id)` directo.
2. Si no: `search(title + ' ' + artist_name)`, tomar top match con `primary_artist.name` matcheando.
3. Extraer credits:
   - `producer_artists[]` → `production_credits` con `role='producer'`
   - `writer_artists[]` → `writing_credits`
   - `featured_artists[]` → `collaborations` con `role='feature'` (si no existe ya)
4. Resolver `person_id` para cada credit: lookup por `genius_id` en `people`, si no existe → crear como `is_peripheral=true, visibility='draft'` con `genius_id` set.
5. Update `tracks.genius_id = song.id.toString()`, `tracks.has_lyrics_external_link = song.url`.
6. Return.

### Operation `fetch_genius_samples`
Input: `payload: { genius_song_id }`.
Proceso:
1. `getSong(id)`.
2. Extract `song_relationships` where `relationship_type in ('samples', 'interpolates', 'cover_of')`.
3. Insert rows en `sources` con:
   - `source_type='article'` (por ahora, hasta que haya tabla samples)
   - `title='Genius annotation: {title} {relationship_type} {source.title}'`
   - `url=song.url`
4. Retornar count. Este operation es optional — solo si Luis prioritiza samples data.

## Tarea 5 — Pipeline scaffolds (no execution)

En `src/lib/ingest/pipelines/stage-3-bios.ts`: scaffold con `throw "execute in Sprint 8 after Stage 4 completes"`.

La pipeline stage-4-credits.ts ya existe scaffolded de Sprint 6. Actualizar
su doc comment para mencionar que también enqueueará genius ops.

## Tarea 6 — Fix race condition Sprint 4 (21 dead_letter)

En `src/lib/ingest/workers/spotify.ts`, operation `fetch_artist_details`:

**Bug actual:** el worker lee `people` por `entity_ref = people.id`. Si
el queue item se crea antes que el `people` row (race con `resolve_artist_by_name`),
el lookup falla → "No person found".

**Fix:** cambiar el payload de `fetch_artist_details` para que incluya
`spotify_id`, y el worker:

1. Primero intenta lookup por `spotify_id` (si hay uno en payload).
2. Fallback a lookup por `entity_ref = people.id`.
3. Si ninguno encuentra → retornar `{ ok: false, retryable: true }` con `attempts + 1` y `next_attempt_at = now() + 60s` (en vez de dead-letter inmediato).

Retry con backoff — el race resuelve en < 1 min típicamente.

**Además:** para los 21 existentes en `dead_letter`, crear CLI oneshot
`scripts/admin/retry-dead-letter.ts`:

```ts
// Run: npx tsx scripts/admin/retry-dead-letter.ts spotify
// Re-enqueue dead_letter items of given source, resetting attempts to 0.
```

Uso: Luis corre `npx tsx scripts/admin/retry-dead-letter.ts spotify` después
de cooldown y los 21 re-procesan con el nuevo código.

## Tarea 7 — Smoke tests (mínimos)

### Wikipedia smoke

```bash
cd 02-Engineering/website
npx tsx scripts/ingest/mb-smoke.ts canserbero  # ya pasó en Sprint 6
# Wikipedia no tiene smoke dedicado — scaffold puro.
```

Agregar `scripts/ingest/wiki-smoke.ts`:

```ts
// Run: npx tsx scripts/ingest/wiki-smoke.ts [slug]
import 'dotenv/config';
import { wikipediaClient } from '@/lib/ingest/clients/wikipedia';

async function main() {
  const slug = process.argv[2] ?? 'canserbero';
  const stageName = slug === 'canserbero' ? 'Canserbero' : slug;

  console.log(`Wiki smoke: ${stageName}`);

  const summary = await wikipediaClient.getSummary(stageName, 'es');
  console.log('Summary:', summary?.extract?.slice(0, 200), '...');
  console.log('URL:', summary?.page_url);

  // SPARQL test: resolve by MBID (Canserbero: 70a3344d-3f48-4843-ac93-e9e031d86b01)
  const bindings = await wikipediaClient.sparql(`
    SELECT ?item WHERE { ?item wdt:P434 "70a3344d-3f48-4843-ac93-e9e031d86b01" . } LIMIT 1
  `);
  console.log('Wikidata QID:', bindings[0]?.item?.value);
}
main().catch(e => { console.error(e); process.exit(1); });
```

### Genius smoke

`scripts/ingest/genius-smoke.ts`:

```ts
// Run: npx tsx scripts/ingest/genius-smoke.ts [query]
import 'dotenv/config';
import { geniusClient } from '@/lib/ingest/clients/genius';

async function main() {
  const query = process.argv[2] ?? 'Canserbero Es Épico';
  console.log(`Genius search: ${query}`);

  const results = await geniusClient.search(query, 5);
  console.log('Top results:', results.map(r => `${r.primary_artist.name} — ${r.title}`));

  if (results[0]) {
    const song = await geniusClient.getSong(results[0].id);
    console.log('Song credits:');
    console.log('  Producers:', song?.producer_artists?.map(p => p.name).join(', ') || '(none)');
    console.log('  Writers:', song?.writer_artists?.map(w => w.name).join(', ') || '(none)');
    console.log('  Featured:', song?.featured_artists?.map(f => f.name).join(', ') || '(none)');
  }
}
main().catch(e => { console.error(e); process.exit(1); });
```

Correr:
```bash
npx tsx scripts/ingest/wiki-smoke.ts canserbero
# → debe retornar summary + QID Q18821745

npx tsx scripts/ingest/genius-smoke.ts 'Canserbero Es Épico'
# → debe retornar primary_artist Canserbero, producer Ahiezer, features Lil Supa
```

## Tarea 8 — Reporte de cierre

```
Hecho: [1 línea]

WikipediaClient: X métodos · spacing 500ms · withTimeout 10s
Wikipedia worker operations: fetch_wikipedia_summary, resolve_wikidata_cross_ids

GeniusClient: X métodos · auth OK · spacing 200ms
Genius worker operations: resolve_genius_artist_by_name, fetch_genius_song_credits, fetch_genius_samples

Pipeline stage-3-bios.ts: scaffolded with throw

Race condition fix (Sprint 4 dead_letter):
  - spotifyWorker.fetch_artist_details: spotify_id fallback lookup ✓
  - retry con 60s backoff antes de dead-letter ✓
  - CLI scripts/admin/retry-dead-letter.ts creado ✓

Smoke tests:
  - wiki-smoke.ts canserbero: summary + QID resolved
  - genius-smoke.ts Canserbero: primary artist + producers + features

TypeScript: clean
Build: clean

Issues encontrados: [list o "ninguno"]

Próximo paso sugerido:
  Esperar cooldown Spotify. Post-cooldown ejecutar:
  1. scripts/admin/retry-dead-letter.ts spotify (resuelve los 21)
  2. bootstrap-seed.ts para terminar los 5 pillars pendientes
  3. Sprint 5 Stage 2 catalog
```

## Scope explícito — NO hagas

- **NO ejecutes** fetches reales contra Genius o Wikipedia fuera del smoke test.
- **NO ejecutes** `runStage3Bios` ni `runStage4Credits` completos (solo scaffolds).
- **NO toques** `src/lib/ingest/workers/spotify.ts` más allá del fix del race condition (Tarea 6).
- **NO escribas** `people.bio_short` desde Wikipedia summary — ese trabajo es del skill `bio-drafter` via Claude Max manual flow en Sprint 8. Solo persist raw.
- **NO toques** UI.
- **NO hagas commit** — Cowork commitea al cierre siguiendo política.
