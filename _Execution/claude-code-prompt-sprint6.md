# Prompt para Claude Code — Sprint 6 (MusicBrainz worker scaffolding)

**Cómo usar:** pegá entre los `---` en Claude Code con workspace en
`/Users/luisfiguera/Downloads/Vulqo LLC/Projects/Dauton Media/`.

**Pre-requisito:** ninguno que dependa de Spotify. Este sprint corre EN
PARALELO al cooldown del circuit Spotify. MB tiene rate limit 1 req/s
propio — no pisa a nadie.

**Objetivo del sprint:** dejar listo el `MusicBrainzClient` real + workers
+ pipeline scaffolding, ejecutar smoke test sobre 1-2 pillars (Canserbero,
Apache). **NO ejecutar Stage 4 completo** — ese corre en Sprint 7 cuando
Spotify Stage 2 haya poblado `releases` y `tracks`.

---

Hola, soy Luis. Mientras Spotify está en cooldown (retry-after ~23h),
aprovechemos para adelantar el worker de MusicBrainz. Al terminar este
sprint, cuando Stage 2 Spotify cierre, solo queueamos fetch_recording_credits
y drena solo.

## Contexto mínimo (leer antes de escribir código)

1. `05-Data/api-docs/musicbrainz.md` — auth (user-agent only), rate limit
   (1 req/s HARD), endpoints, relationship types, mapping a nuestro schema.
2. `02-Engineering/data-model.md` — shapes de `production_credits`,
   `writing_credits`, `collaborations`, `label_eras`.
3. Código existente: `src/lib/ingest/workers/musicbrainz.ts` (stub),
   `src/lib/ingest/clients/musicbrainz.ts` (stub).
4. Cómo lo hace Spotify: `src/lib/ingest/workers/spotify.ts` — mismo patrón.

## Tarea 1 — `MusicBrainzClient` real

Implementar en `src/lib/ingest/clients/musicbrainz.ts`.

### Auth
- **Ninguna.** Solo User-Agent. Leer de env `MUSICBRAINZ_USER_AGENT`.
- Base URL: `https://musicbrainz.org/ws/2`
- Todos los responses en `fmt=json`.

### Rate limiting (CRÍTICO)
- **1 req/s hard**. No burst. No negociar.
- Usar spacing `minSpacingMs = 1100` (sobre el límite para margen).
- Usar `consumeBudget('musicbrainz')` del rate-limit registry.
- `withTimeout` de 10s por call (mismo pattern de Spotify).

### Métodos

```ts
class MusicBrainzClient {
  // Resolve MB Artist ID by external URL (ej. Spotify URL)
  resolveArtistByUrl(spotifyUrl: string): Promise<{ mbid: string | null; artist?: MBArtist }>;

  // Search artist by name (fallback si URL resolve falla)
  searchArtist(name: string, opts?: { country?: string; limit?: number }):
    Promise<Array<{ mbid: string; name: string; score: number; country?: string }>>;

  // Full artist with relationships
  getArtist(mbid: string, inc?: string[]): Promise<MBArtistFull>;

  // Release-group (album conceptual) con tracks
  getReleaseGroup(mbid: string, inc?: string[]): Promise<MBReleaseGroup>;

  // Recording (track) con credits
  getRecording(mbid: string, inc?: string[]): Promise<MBRecording>;

  // Resolve release-group MBID desde Spotify album URL
  resolveReleaseGroupByUrl(spotifyAlbumUrl: string): Promise<string | null>;
}
```

### Types (en `src/lib/ingest/clients/musicbrainz.types.ts`)

Solo los campos que usamos. Ejemplo:

```ts
export type MBArtist = {
  id: string;                    // MBID (UUID)
  name: string;
  country?: string;              // ISO country code ("VE")
  gender?: 'male' | 'female' | 'other' | 'not applicable';
  'life-span'?: {
    begin?: string;              // YYYY-MM-DD or YYYY
    end?: string;
    ended?: boolean;
  };
  aliases?: Array<{ name: string; locale?: string; primary?: boolean }>;
};

export type MBArtistFull = MBArtist & {
  relations?: Array<{
    type: string;                // 'member of band' | 'producer' | 'collaborator' | etc.
    direction: 'backward' | 'forward';
    artist?: { id: string; name: string };
    url?: { resource: string };
  }>;
};

export type MBRecording = {
  id: string;
  title: string;
  length?: number;               // ms
  isrcs?: string[];
  relations?: Array<{
    type: string;                // 'producer' | 'recording engineer' | 'mix' | 'vocal' | 'lyricist' | 'composer' | etc.
    direction: 'backward' | 'forward';
    artist?: { id: string; name: string };
  }>;
};

export type MBReleaseGroup = {
  id: string;
  title: string;
  'first-release-date'?: string;
  'primary-type'?: string;       // 'Album' | 'Single' | 'EP' | 'Compilation'
  releases?: Array<{
    id: string;
    title: string;
    media?: Array<{
      'track-count': number;
      tracks?: Array<{
        id: string;              // track MBID
        number: string;           // track number as string
        title: string;
        length?: number;
        recording: { id: string; title: string; length?: number };
      }>;
    }>;
  }>;
};
```

### Gotchas documentados en `musicbrainz.md`

- Relation types son vocabulario abierto. Normalizar con mapping explícito:
  ```ts
  const RELATION_MAP: Record<string, { target: 'production_credits' | 'writing_credits' | 'collaborations' | 'skip'; role: string }> = {
    'producer': { target: 'production_credits', role: 'producer' },
    'co-producer': { target: 'production_credits', role: 'co-producer' },
    'recording engineer': { target: 'production_credits', role: 'engineer' },
    'engineer': { target: 'production_credits', role: 'engineer' },
    'mix': { target: 'production_credits', role: 'mix' },
    'master': { target: 'production_credits', role: 'master' },
    'mastering': { target: 'production_credits', role: 'master' },
    'lyricist': { target: 'writing_credits', role: 'lyricist' },
    'composer': { target: 'writing_credits', role: 'composer' },
    'writer': { target: 'writing_credits', role: 'writer' },
    'vocal': { target: 'collaborations', role: 'feature' },
    'lead vocals': { target: 'collaborations', role: 'feature' },
    'featured artist': { target: 'collaborations', role: 'feature' },
    'member of band': { target: 'skip', role: 'band_member' },  // lo manejamos via crew_memberships fuera de credits
  };
  ```

## Tarea 2 — Worker operations (4)

En `src/lib/ingest/workers/musicbrainz.ts`, reemplazar stub con switch.

### Operation `resolve_mbid_by_spotify`
Input: `payload: { person_id, spotify_id }` (o derivar de `entity_ref`).
Proceso:
1. Construir URL: `https://open.spotify.com/artist/{spotify_id}`.
2. `resolveArtistByUrl(url)`.
3. Si hay MBID → `update people set musicbrainz_id = $1 where id = $2`.
4. Si no → fallback `searchArtist(people.stage_name, { country: 'VE', limit: 5 })`. Accept si score ≥ 85 y (country='VE' OR stage_name exact match).
5. Si aún no → marcar `people.musicbrainz_id = null` explícitamente (no re-intentar), log.
6. Queue `fetch_artist_rels` con payload `{ person_id, mbid }` si resolvió.
Return `{ ok: true, updated: 1 }`.

### Operation `fetch_artist_rels`
Input: `payload: { person_id, mbid }`.
Proceso:
1. `getArtist(mbid, ['url-rels', 'artist-rels', 'release-groups'])`.
2. Update `people`:
   - `gender` si presente
   - `birth_date`/`death_date` desde life-span (parse precision)
   - `status = 'deceased'` si life-span.ended = true
3. URL relations → cross-platform IDs:
   - Spotify URL → confirmar `spotify_id` (ya lo tenemos, sanity check)
   - Discogs URL → parsear `discogs_id`
   - YouTube URL → `youtube_channel_id`
4. Artist relations `member of band` → log para futuro crew_memberships
   processing (no insertar ahora — no tenemos todos los crews en DB).
5. Por cada release-group retornado en el artist:
   - Queue `fetch_release_group_recordings` con payload `{ release_group_mbid, person_id }`
Return `{ ok: true, updated: 1, next_items: N }`.

### Operation `fetch_release_group_recordings`
Input: `payload: { release_group_mbid, person_id }`.
Proceso:
1. `getReleaseGroup(mbid, ['artist-credits', 'releases'])`.
2. Buscar `release` en DB por `musicbrainz_id = release_group_mbid` O por
   matching título+año+primary_artist. Si no existe, **skip** (Stage 2
   Spotify todavía no lo poblo; Sprint 7 re-encolará).
3. Si existe: por cada recording en primary release (tomar `releases[0].media[].tracks[]`):
   - Queue `fetch_recording_credits` con payload `{ recording_mbid, track_id }`
     (track_id de nuestra DB, resuelto por matching track_number/title en el release).
Return `{ ok: true, next_items: N }`.

### Operation `fetch_recording_credits` (el endpoint clave)
Input: `payload: { recording_mbid, track_id }`.
Proceso:
1. `getRecording(mbid, ['artist-rels', 'work-rels', 'isrcs'])`.
2. Update `tracks` row:
   - `musicbrainz_id = recording_mbid`
   - `isrc` si falta y MB lo tiene
3. Por cada `relation` en response:
   - Lookup `RELATION_MAP[relation.type]`.
   - Si `target = 'skip'` → continue.
   - Resolver `person_id` del artist en la relation: lookup por `people.musicbrainz_id = relation.artist.id`. Si no existe → crear como `is_peripheral=true, visibility='draft'`.
   - Insert en la tabla target (`production_credits` o `writing_credits` o `collaborations`) con (`track_id`, `person_id`, `role`). ON CONFLICT DO NOTHING.
4. Return `{ ok: true, created: N, updated: 1 }`.

## Tarea 3 — Pipeline `stage-4-credits.ts` (scaffolding, no execution)

En `src/lib/ingest/pipelines/stage-4-credits.ts`:

```ts
export async function runStage4Credits(opts?: {
  limit?: number;
  onlyPillars?: boolean;
  dryRun?: boolean;
}) {
  /*
   * Flow:
   * 1. Select people con spotify_id IS NOT NULL y musicbrainz_id IS NULL
   * 2. Queue resolve_mbid_by_spotify
   * 3. Drain dispatcher (musicbrainz source)
   * 4. Verification: people con mbid resolved
   *
   * Execution: solo scaffolding en este sprint. Smoke test lo corre
   * sobre 2 artistas específicos en Tarea 5.
   */
  throw new Error('runStage4Credits: scaffolded — execute in Sprint 7 after Stage 2 completes');
}
```

Doc comment explícito de "por qué se difiere".

## Tarea 4 — CLI `scripts/ingest/mb-smoke.ts`

Script CLI específico para smoke test manual (no corre el pipeline completo):

```ts
// Run: npx tsx scripts/ingest/mb-smoke.ts [slug]
import 'dotenv/config';
import { mbClient } from '@/lib/ingest/clients/musicbrainz';

async function main() {
  const slug = process.argv[2] ?? 'canserbero';
  console.log(`MB smoke test on ${slug}`);

  // 1. Fetch spotify_id from DB by slug
  // 2. resolveArtistByUrl
  // 3. If mbid, fetch artist rels
  // 4. Print summary

  // (logic)
}
main().catch(e => { console.error(e); process.exit(1); });
```

## Tarea 5 — Smoke test real sobre 2 pillars

Correr secuencialmente (no en paralelo, respetar 1 req/s MB):

```bash
cd 02-Engineering/website
npx tsx scripts/ingest/mb-smoke.ts canserbero
# → expected: resolve MBID vía Spotify URL, fetch artist rels.
#   Canserbero MB tiene data rica. Debería retornar life-span (1988-08-11 / 2015-01-20),
#   gender=male, relations con Ahiezer (producer), Lil Supa (collaborator), etc.

npx tsx scripts/ingest/mb-smoke.ts apache
# → similar check sobre Apache. MB data varía.
```

**Verificar en DB:**
```sql
select stage_name, musicbrainz_id, gender, birth_date, death_date, status
from people where slug in ('canserbero', 'apache');
```

Ambos deben tener `musicbrainz_id` no-null si el smoke test pasa.

**NO correr `runStage4Credits` completo.** Solo el smoke.

## Tarea 6 — Reporte de cierre

```
Hecho: [1 línea]
MusicBrainzClient: implementado · X métodos · rate-limit 1 req/s + spacing 1.1s + withTimeout 10s
Worker operations scaffolded: resolve_mbid_by_spotify, fetch_artist_rels, fetch_release_group_recordings, fetch_recording_credits
Pipeline stage-4-credits.ts: scaffolded con throw "execute in Sprint 7"

Smoke test (canserbero):
  - MBID resolved: yes | no
  - Artist rels fetched: X relations total
  - people update: gender, birth_date, death_date populated (list what)

Smoke test (apache):
  - MBID resolved: yes | no
  - Artist rels fetched: X

DB state:
  - people con musicbrainz_id: X (esperado 2)
  - raw_responses (musicbrainz): X

TypeScript: clean (0 errors)

Issues encontrados: [list o "ninguno"]

Próximo paso sugerido:
  Sprint 7 (post-Spotify-Stage-2): implementar runStage4Credits real,
  queue resolve_mbid_by_spotify para los 76 artists, drenar (takes ~1h
  por rate limit MB), queue fetch_recording_credits para todos los tracks,
  drenar (~days de runtime pero async).
```

## Scope explícito — NO hagas

- **NO toques Spotify worker ni client.** Spotify está en cooldown, el código funciona.
- **NO ejecutes `runStage4Credits`** completo. Solo scaffolding + smoke.
- **NO populate crew_memberships** desde MB `member of band` relations en este sprint. Se maneja aparte.
- **NO crees peripheral `people` rows** durante el smoke test. Solo update a people existentes.
- **NO toques UI.**
- **NO modifiques migración 0005.** El schema ya tiene todo.
- **NO hagas commit** — Cowork commitea al cierre del sprint siguiendo política.
