# Prompt para Claude Code — Sprint 3 (infra ingestion)

**Cómo usar:** copia todo entre los `---` y pégalo en Claude Code con el
workspace apuntando a `/Users/luisfiguera/Downloads/Vulqo LLC/Projects/Dauton Media/`.

**Pre-requisito:** Sprint 2 cerrado (routing real + /artists/[slug] conectado
a data). Si Sprint 2 no está cerrado, Luis pausa este prompt.

---

Hola, soy Luis. Spotify Premium activo, 5 APIs con keys listas. Este sprint
es **puro infra de ingestion**. No toques UI ni data real. Al final queda
el scaffolding listo para Sprint 4 (primer pipeline vivo: Spotify catalog).

## Contexto rápido (lo estrictamente necesario)

Lee estos archivos ANTES de escribir código:

1. `_Execution/ingestion-playbook.md` — plan por etapas, arquitectura del
   queue, priority formula, circuit breakers. **Fuente de verdad del diseño.**
2. `_Execution/credentials-checklist.md` — env vars con valores reales.
3. `05-Data/api-docs/README.md` — índice de docs. Cada doc tiene
   endpoints + rate limits por API.
4. `02-Engineering/data-model.md` — schema existente.

No leas más. La tarea es quirúrgica.

## Tarea 1 — Env vars en `.env.local`

Agrega al final de `02-Engineering/website/.env.local`:

```
# Ingestion APIs (Sprint 3)
SPOTIFY_CLIENT_ID=3907dbac0ee74d459d0f11c7089fdc9a
SPOTIFY_CLIENT_SECRET=464966e6e9364e0f84f90705f5e73f35
YOUTUBE_API_KEY=AIzaSyDpWn16y0G8_fPRWpMxlBqXAv9mLzWox3w
GENIUS_CLIENT_ID=GDv1XcCEVbL1FcjEJt8N-FsPkzPVTOzlnT-Ff8XTjcjOs9kiVOIyC5Uy0yLkaL_V
GENIUS_CLIENT_SECRET=mamRpnE5wBt86-_whBfyZL8bc6BRPWwvuZybvqA-RqffLyUbTddNOsk2SGE0uQzkmU-gOLPJZSp6-oP5qWO9qA
GENIUS_CLIENT_ACCESS_TOKEN=_Od6kIOvoaU62wHrIDsFTb8b7J_TPEcorMe4yi_ZK4k1T7HTW7yg9_n-xh7EhYMY
BRAVE_SEARCH_API_KEY=BSAe-eWDvuvxh97XnnbGcFIggGhGNoj
FIRECRAWL_API_KEY=fc-3e8bf55a29c34e9f8d7255026f488ad8
MUSICBRAINZ_USER_AGENT=DautonMedia/0.1 (luis@shocompanies.com)
```

No copies las env vars a Vercel todavía — los workers corren local (n8n
local) así que no las necesita Vercel este sprint.

Verifica que `.env.local` sigue en `.gitignore` (debe estar ya).

## Tarea 2 — Migración 0005: ingestion infrastructure

Crea `02-Engineering/website/supabase/migrations/20260424000000_ingestion_infra.sql`
con las 4 tablas descritas en `ingestion-playbook.md` sección "Queue architecture":

```sql
-- =============================================================================
-- 0005 · Ingestion infrastructure (Sprint 3)
-- =============================================================================

-- Queue: cada item representa una unidad de trabajo a ejecutar contra un API
create table if not exists ingestion_queue (
  id              uuid primary key default gen_random_uuid(),
  entity_type     text not null,             -- 'person' | 'release' | 'track' | 'article' | 'video'
  entity_ref      text not null,             -- uuid del entity en DB O ID externo (spotify_id, etc.)
  source          text not null,             -- 'spotify' | 'musicbrainz' | 'youtube' | 'genius' | 'brave' | 'firecrawl' | 'wikipedia' | 'whisper'
  operation       text not null,             -- 'fetch_artist' | 'fetch_discography' | 'search_press' | etc.
  priority        integer default 5,          -- 1-10, higher = more important
  payload         jsonb default '{}'::jsonb,
  attempts        integer default 0,
  max_attempts    integer default 5,
  next_attempt_at timestamptz default now(),
  last_attempt_at timestamptz,
  status          text default 'queued',     -- 'queued' | 'in_flight' | 'done' | 'failed' | 'dead_letter'
  error_log       text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);
create index if not exists iq_status_next_idx on ingestion_queue (status, next_attempt_at)
  where status in ('queued', 'in_flight');
create index if not exists iq_source_status_idx on ingestion_queue (source, status);
create index if not exists iq_entity_idx on ingestion_queue (entity_type, entity_ref);

-- Rate budget por source
create table if not exists ingestion_rate_limits (
  source                    text primary key,
  requests_per_minute       integer,
  requests_per_day          integer,
  requests_used_current_min integer default 0,
  requests_used_today       integer default 0,
  window_minute_start       timestamptz default now(),
  window_day_start           timestamptz default now(),
  circuit_state             text default 'closed',   -- 'closed' | 'half_open' | 'open'
  circuit_opened_at         timestamptz,
  consecutive_failures      integer default 0,
  updated_at                timestamptz default now()
);

-- Raw responses persistidos. Nos permite replay de parsing sin re-fetch.
create table if not exists raw_responses (
  id           uuid primary key default gen_random_uuid(),
  source       text not null,
  url          text,
  method       text default 'GET',
  status_code  integer,
  body         jsonb,
  headers      jsonb,
  fetched_at   timestamptz default now(),
  queue_item_id uuid references ingestion_queue(id) on delete set null
);
create index if not exists rr_source_fetched_idx on raw_responses (source, fetched_at desc);
create index if not exists rr_queue_item_idx on raw_responses (queue_item_id);

-- Pipeline run logs (para observability + cost tracking)
create table if not exists pipeline_runs (
  id                  uuid primary key default gen_random_uuid(),
  pipeline_id         text not null,       -- 'P1' | 'P2' | 'P3' | ...
  trigger_source      text,                -- 'cron' | 'manual' | 'event'
  started_at          timestamptz default now(),
  ended_at            timestamptz,
  status              text default 'running',   -- 'running' | 'success' | 'partial_success' | 'failed'
  entities_created    integer default 0,
  entities_updated    integer default 0,
  entities_skipped    integer default 0,
  external_api_calls  jsonb default '{}'::jsonb,   -- { spotify: 23, musicbrainz: 5, ... }
  claude_tokens_in    integer default 0,
  claude_tokens_out   integer default 0,
  estimated_cost_usd  numeric(10, 4) default 0,
  error_summary       text
);
create index if not exists pr_pipeline_started_idx on pipeline_runs (pipeline_id, started_at desc);

-- ---------------------------------------------------------------------------
-- Tablas nuevas de entidades para recibir data de APIs externos
-- ---------------------------------------------------------------------------

-- Videos (YouTube channel scans + transcript processing de Stage 6)
create table if not exists videos (
  id                  uuid primary key default gen_random_uuid(),
  youtube_id          text unique not null,
  channel_youtube_id  text,
  channel_title       text,
  title               text not null,
  description         text,
  published_at        timestamptz,
  duration_seconds    integer,
  view_count          bigint,
  processed_at        timestamptz,
  transcript_source   text,       -- 'yt_captions_es' | 'yt_captions_auto' | 'whisper' | 'none'
  transcript_language text,
  status              text default 'discovered',   -- 'discovered' | 'fetched' | 'transcribed' | 'processed' | 'failed' | 'skipped'
  error_log           text,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);
create index if not exists videos_channel_idx on videos (channel_youtube_id);
create index if not exists videos_status_idx on videos (status);
create index if not exists videos_published_idx on videos (published_at desc);

-- Entity stats (polimórfica) — snapshots de follower/subscriber/popularity over time
-- Spotify followers, Spotify popularity, YouTube subscribers, YouTube video views, etc.
create table if not exists entity_stats (
  id            uuid primary key default gen_random_uuid(),
  entity_type   text not null,        -- 'person' | 'release' | 'track' | 'video'
  entity_id     uuid not null,
  source        text not null,        -- 'spotify' | 'youtube' | 'last.fm' | etc.
  metric        text not null,        -- 'followers' | 'popularity' | 'subscribers' | 'views' | 'monthly_listeners'
  value         bigint not null,
  captured_at   timestamptz default now()
);
create index if not exists es_entity_idx on entity_stats (entity_type, entity_id, metric, captured_at desc);
create index if not exists es_source_idx on entity_stats (source, captured_at desc);

-- ---------------------------------------------------------------------------
-- Columnas nuevas en tablas existentes
-- ---------------------------------------------------------------------------

-- tracks.explicit — Spotify siempre lo expone
alter table tracks add column if not exists explicit boolean default false;

-- people.gender — MB expone cuando aplica. Null-OK siempre.
alter table people add column if not exists gender text;

-- Current snapshots (denormalized para evitar JOINs caros en listings)
alter table people add column if not exists spotify_followers   bigint;
alter table people add column if not exists spotify_popularity  integer;
alter table people add column if not exists youtube_subscribers bigint;
alter table people add column if not exists last_stats_sync_at  timestamptz;

-- Enable RLS on new entity tables
alter table videos       enable row level security;
alter table entity_stats enable row level security;

-- Public read policies (consistentes con resto del archivo)
create policy "public read videos"       on videos       for select using (status = 'processed');
create policy "public read entity_stats" on entity_stats for select using (true);

-- Seed rate limits (see 05-Data/api-docs/ for sourced numbers)
insert into ingestion_rate_limits (source, requests_per_minute, requests_per_day) values
  ('spotify',     180,  null),
  ('musicbrainz', 60,   null),
  ('youtube',     null, 10000),
  ('genius',      300,  null),
  ('brave_free',  60,   66),
  ('firecrawl',   30,   null),
  ('whisper',     30,   null),
  ('wikipedia',   null, null),
  ('claude',      null, null)
on conflict (source) do nothing;

-- Enable RLS on ingestion tables (admin-only access via service role)
alter table ingestion_queue     enable row level security;
alter table ingestion_rate_limits enable row level security;
alter table raw_responses       enable row level security;
alter table pipeline_runs       enable row level security;

-- No policies = only service role can read/write. Intentional.
```

Aplica con `supabase db push`. Verifica con:

```sql
select source, requests_per_minute, requests_per_day, circuit_state
from ingestion_rate_limits order by source;
-- debe retornar 9 rows
```

## Tarea 3 — Skills stubs en `src/lib/skills/`

Crea la estructura:

```
src/lib/skills/
  index.ts                      (re-exports)
  _shared.ts                    (common types, Claude client, retry logic)
  bio-drafter.ts
  press-extractor.ts
  credit-reconciler.ts
  dedup-judge.ts
  transcript-extractor.ts
  entity-resolver.ts
  event-deduplicator.ts
  social-post-generator.ts
  __tests__/
    bio-drafter.test.ts
    press-extractor.test.ts
    (resto: stubs con 1 test placeholder)
```

Cada skill file sigue el patrón:

```ts
// src/lib/skills/bio-drafter.ts
import { z } from 'zod';
import { callClaudeWithSchema, type SkillResult } from './_shared';

/**
 * Skill: bio-drafter
 * Purpose: drafts a ≤80-word Spanish bio from Wikipedia summary + Spotify data.
 * Referenced docs: 05-Data/api-docs/wikipedia-wikidata.md, spotify.md
 */

export const BioDrafterInput = z.object({
  stage_name: z.string(),
  wikipedia_summary: z.string().nullable(),
  spotify_genres: z.array(z.string()).default([]),
  active_since: z.string().nullable(),
  active_until: z.string().nullable(),
  top_collaborators: z.array(z.string()).max(5).default([]),
});

export const BioDrafterOutput = z.object({
  bio_short: z.string().max(500),  // ~80 words ≈ 500 chars safe limit
  claims_used: z.array(z.string()),
  confidence: z.number().min(0).max(1),
});

export type BioDrafterInput = z.infer<typeof BioDrafterInput>;
export type BioDrafterOutput = z.infer<typeof BioDrafterOutput>;

const PROMPT = `
Eres un editor sobrio que escribe bios cortas para un archivo de rap
hispanohablante. Tono: autoritativo, factual, sin hype, sin emojis, sin
"icono del rap", sin "genio lírico".

REGLAS:
1. Nunca inventes datos. Si no tienes evidencia, no lo menciones.
2. Máximo 80 palabras.
3. Español formal pero accesible.
4. Estructura sugerida: [origen, años activos, por qué importa, 1-2 colaboradores clave].
5. Si falta data crítica, el bio puede ser de 30 palabras. Mejor corto y
   sólido que largo y especulativo.

INPUT:
- stage_name: {{stage_name}}
- wikipedia_summary: {{wikipedia_summary}}
- spotify_genres: {{spotify_genres}}
- active_since: {{active_since}}
- active_until: {{active_until}}
- top_collaborators: {{top_collaborators}}

OUTPUT (JSON):
{
  "bio_short": "...",
  "claims_used": ["cada frase del bio debe tener una claim aquí que
                   cite dónde viene la info"],
  "confidence": 0.0-1.0
}
`.trim();

export async function draftBio(
  input: BioDrafterInput
): Promise<SkillResult<BioDrafterOutput>> {
  return callClaudeWithSchema({
    prompt: PROMPT,
    input,
    outputSchema: BioDrafterOutput,
    skillName: 'bio-drafter',
  });
}
```

Cada uno de los otros skills sigue el mismo patrón: Zod input/output + prompt
estricto + exported function. Stubs OK — el prompt final se afina cuando
arranquemos el pipeline que los usa (Sprint 5+). **Por ahora solo queremos
que compilen, exporten los tipos, y tengan un test placeholder que pase.**

`_shared.ts` debe exportar:
- `callClaudeWithSchema<T>(args)` — wrapper que toma prompt + schema, llama
  Claude API con `anthropic-sdk`, parsea response, valida contra schema.
  Retorna `{ success: true, data: T }` o `{ success: false, error, raw_response }`.
- `type SkillResult<T>` — discriminated union.
- Retry logic: si Claude retorna JSON inválido, retry 1× con prompt más
  estricto. Si falla otra vez, `success: false`.

Instala `@anthropic-ai/sdk` si no está:

```bash
cd 02-Engineering/website
npm install @anthropic-ai/sdk zod
```

**Decisión de Luis (2026-04-23):** en MVP NO usamos Anthropic API. Luis tiene
Claude Max — la ejecución de skills se orquesta manualmente desde una sesión
de Claude Code (no runtime automation). Los skills deben:

1. Scaffold compilable **sin** `ANTHROPIC_API_KEY`.
2. Exponer una interface `LLMCaller` para que el caller sea pluggable:
   - `ClaudeMaxManualCaller`: escribe input a
     `_pending_skills/{skill}/{queue_item_id}.input.json`. El worker marca
     el queue item con `status='awaiting_skill_execution'`. Luis (en Claude
     Code) ejecuta prompt estándar: "lee todos los inputs pendientes en
     `_pending_skills/bio-drafter/*.input.json`, ejecuta el prompt del skill,
     escribe outputs a `.output.json`". Un script `consume-skill-outputs.ts`
     lee los `.output.json` y reanuda los queue items.
   - `AnthropicAPICaller`: implementación para futuro, `throw "not configured"`
     por ahora.
   - `MockCaller`: para tests.
3. **NO importes `@anthropic-ai/sdk` en este sprint.** Solo el type scaffolding.

Este approach es manual pero legítimo con Max. Cuando Luis decida pagar API,
cambia el caller en un file y listo.

## Tarea 4 — Estructura `src/lib/ingest/` (code-first, NO n8n)

Decisión de Luis (2026-04-23): arquitectura full-code TypeScript. n8n queda
descartado por limitaciones en documentación/integraciones cuando la mayoría
del work se hace con Claude Code directamente.

Crea la siguiente estructura con **stubs compilables** (no implementation
real del fetch/parse — eso viene en Sprint 4+):

```
02-Engineering/website/src/lib/ingest/
  index.ts                  (re-exports públicos)
  _types.ts                 (QueueItem, WorkerResult, RateLimitState, etc.)

  clients/                  (thin wrappers de cada API — auth + base fetch)
    _base.ts                (abstract BaseClient con retry + logging)
    spotify.ts
    musicbrainz.ts
    youtube.ts
    genius.ts
    brave.ts
    firecrawl.ts
    wikipedia.ts
    whisper.ts

  queue/
    dispatcher.ts           (runDispatcher: lee N items, dispatch, respeta rate limits)
    rate-limit.ts           (checkBudget, consume, circuit breaker)
    backoff.ts              (exponential backoff helper)

  workers/                  (uno por source — consume queue.operation + payload)
    _base.ts                (abstract Worker interface)
    spotify.ts
    musicbrainz.ts
    youtube.ts
    genius.ts
    brave.ts
    firecrawl.ts
    wikipedia.ts

  pipelines/                (Stage-level orchestration — queue items + dependencies)
    stage-2-catalog.ts      (placeholder ahora; lleno en Sprint 4)
    stage-3-bios.ts
    stage-4-credits.ts
    stage-5-press.ts
    stage-6-transcripts.ts
```

### `_types.ts` debe exportar

```ts
export type QueueSource = 'spotify' | 'musicbrainz' | 'youtube' | 'genius'
                         | 'brave' | 'firecrawl' | 'wikipedia' | 'whisper';

export type QueueItem = {
  id: string;
  entity_type: 'person' | 'release' | 'track' | 'article' | 'video';
  entity_ref: string;
  source: QueueSource;
  operation: string;
  priority: number;
  payload: Record<string, unknown>;
  attempts: number;
  max_attempts: number;
};

export type WorkerResult =
  | { ok: true; created: number; updated: number; next_items?: Partial<QueueItem>[] }
  | { ok: false; error: string; retryable: boolean };

export interface Worker {
  source: QueueSource;
  execute(item: QueueItem): Promise<WorkerResult>;
}

export type RateLimitState = {
  source: QueueSource;
  requests_per_minute: number | null;
  requests_per_day: number | null;
  requests_used_current_min: number;
  requests_used_today: number;
  circuit_state: 'closed' | 'half_open' | 'open';
};
```

### `queue/dispatcher.ts` skeleton

```ts
import { createServerSupabase } from '@/lib/supabase';
import type { QueueItem, Worker } from '../_types';
import { getWorker } from '../workers';
import { checkBudgetOrBlock } from './rate-limit';

export async function runDispatcher(opts: { maxItems?: number; sources?: string[] } = {}) {
  const supa = createServerSupabase();
  const startedAt = Date.now();

  // 1. Fetch N items respecting each source's rate budget
  const { data: items } = await supa
    .from('ingestion_queue')
    .select('*')
    .in('status', ['queued'])
    .lte('next_attempt_at', new Date().toISOString())
    .order('priority', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(opts.maxItems ?? 20);

  const results = { processed: 0, succeeded: 0, failed: 0, skipped_rate_limit: 0 };

  for (const item of items ?? []) {
    // 2. Budget check
    const budget = await checkBudgetOrBlock(item.source);
    if (!budget.ok) { results.skipped_rate_limit++; continue; }

    // 3. Mark in_flight
    await supa.from('ingestion_queue')
      .update({ status: 'in_flight', last_attempt_at: new Date().toISOString(), attempts: item.attempts + 1 })
      .eq('id', item.id);

    // 4. Dispatch to worker
    const worker = getWorker(item.source);
    try {
      const result = await worker.execute(item as QueueItem);
      // 5. Mark done or re-queue
      if (result.ok) {
        await supa.from('ingestion_queue').update({ status: 'done' }).eq('id', item.id);
        results.succeeded++;
      } else {
        await handleFailure(supa, item, result);
        results.failed++;
      }
    } catch (e: any) {
      await handleFailure(supa, item, { ok: false, error: e.message, retryable: true });
      results.failed++;
    }
    results.processed++;
  }

  return { ...results, duration_ms: Date.now() - startedAt };
}

async function handleFailure(supa: any, item: QueueItem, result: Extract<WorkerResult, { ok: false }>) { /* TODO Sprint 4 */ }
```

Los workers son stubs:

```ts
// src/lib/ingest/workers/spotify.ts
import type { Worker, QueueItem, WorkerResult } from '../_types';

export const spotifyWorker: Worker = {
  source: 'spotify',
  async execute(item: QueueItem): Promise<WorkerResult> {
    // Scaffold: real implementation arrives in Sprint 4
    return { ok: false, error: 'spotify worker not implemented yet', retryable: false };
  },
};
```

El rest de workers igual — solo el shape de la interface para que `getWorker()`
compile.

### Instalación de deps

```bash
cd 02-Engineering/website
npm install zod
npm install -D tsx vitest
```

**NO instales `@anthropic-ai/sdk` este sprint.** Se agrega cuando Luis
decida migrar a API post-MVP.

## Tarea 5 — CLI entry + Vercel Cron endpoint

### CLI: `scripts/ingest/dispatch.ts`

```ts
#!/usr/bin/env -S tsx
import 'dotenv/config';
import { runDispatcher } from '@/lib/ingest/queue/dispatcher';

const maxItems = Number(process.env.MAX_ITEMS ?? 20);
runDispatcher({ maxItems })
  .then((r) => { console.log(JSON.stringify(r, null, 2)); })
  .catch((e) => { console.error(e); process.exit(1); });
```

Uso:
```bash
cd 02-Engineering/website
npx tsx scripts/ingest/dispatch.ts
# o con custom max
MAX_ITEMS=5 npx tsx scripts/ingest/dispatch.ts
```

### GitHub Actions cron (gratis, default)

**Decisión Luis (2026-04-23):** no pagamos Vercel Pro por ahora. El cron
recurring se hace con GitHub Actions (gratis, 2000 min/mes, 6h timeout).

Crea `.github/workflows/ingest-dispatch.yml`:

```yaml
name: Ingest Dispatcher

on:
  workflow_dispatch:         # manual trigger desde UI GitHub
  schedule:
    - cron: '*/30 * * * *'   # cada 30 min

jobs:
  dispatch:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: 02-Engineering/website/package-lock.json

      - name: Install deps
        working-directory: 02-Engineering/website
        run: npm ci

      - name: Run dispatcher
        working-directory: 02-Engineering/website
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
          SPOTIFY_CLIENT_ID: ${{ secrets.SPOTIFY_CLIENT_ID }}
          SPOTIFY_CLIENT_SECRET: ${{ secrets.SPOTIFY_CLIENT_SECRET }}
          YOUTUBE_API_KEY: ${{ secrets.YOUTUBE_API_KEY }}
          GENIUS_CLIENT_ACCESS_TOKEN: ${{ secrets.GENIUS_CLIENT_ACCESS_TOKEN }}
          BRAVE_SEARCH_API_KEY: ${{ secrets.BRAVE_SEARCH_API_KEY }}
          FIRECRAWL_API_KEY: ${{ secrets.FIRECRAWL_API_KEY }}
          MUSICBRAINZ_USER_AGENT: ${{ secrets.MUSICBRAINZ_USER_AGENT }}
          MAX_ITEMS: '100'
        run: npx tsx scripts/ingest/dispatch.ts
```

**NO actives el schedule este sprint.** Comenta la sección `schedule:` hasta
que tengamos workers reales (Sprint 4+). Deja el `workflow_dispatch` para
que Luis pueda trigger manual desde GitHub UI cuando quiera probar.

Crea también `_Execution/ingestion-deployment.md` documentando:
- Cómo activar el schedule cuando esté listo (descomentar + push)
- Cómo agregar los secrets en GitHub Settings → Secrets → Actions
- Cómo hacer `gh workflow run ingest-dispatch.yml` desde CLI
- Cómo ver logs: `gh run list --workflow=ingest-dispatch.yml`

## Tarea 6 — Smoke test

Agrega un script `02-Engineering/website/scripts/smoke-ingestion.ts`:

```ts
// Run: npx tsx scripts/smoke-ingestion.ts
import { createClient } from '@supabase/supabase-js';

const supa = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  // Insert dummy queue item
  const { data: item, error: ie } = await supa
    .from('ingestion_queue')
    .insert({
      entity_type: 'person',
      entity_ref: 'smoke-test',
      source: 'spotify',
      operation: 'fetch_artist',
      priority: 10,
      payload: { stage_name: 'Smoke Test' },
    })
    .select()
    .single();
  if (ie) throw ie;

  console.log('✓ inserted queue item', item.id);

  // Read back
  const { data: read } = await supa
    .from('ingestion_queue')
    .select('*')
    .eq('id', item.id)
    .single();

  console.log('✓ read back:', read?.status, read?.source);

  // Clean up
  await supa.from('ingestion_queue').delete().eq('id', item.id);
  console.log('✓ cleanup');

  // Check rate limits seeded
  const { data: rl, count } = await supa
    .from('ingestion_rate_limits')
    .select('source', { count: 'exact' });
  console.log(`✓ rate_limits seeded: ${count} rows`);

  console.log('\nSmoke test passed.');
}

main().catch((e) => { console.error(e); process.exit(1); });
```

Ejecuta:
```bash
cd 02-Engineering/website
npx tsx scripts/smoke-ingestion.ts
```

Debe imprimir "Smoke test passed."

## Tarea 7 — Reporte de cierre

Formato estricto:

```
Hecho: [1 línea]
Env vars: X/9 en .env.local
Migración 0005: aplicada | falló (razón)
Tablas nuevas: ingestion_queue, ingestion_rate_limits, raw_responses, pipeline_runs, videos, entity_stats
Columnas nuevas: tracks.explicit, people.gender, people.spotify_followers, people.spotify_popularity, people.youtube_subscribers, people.last_stats_sync_at
rate_limits seeded: 9/9 | X/9
Skills stubs: X/8 compilan, Y/8 tests pasan
Ingest structure: src/lib/ingest/ creada con stubs · npm run dispatch CLI funciona
GitHub Actions workflow: .github/workflows/ingest-dispatch.yml creado (schedule commented)
Smoke test: passed | failed (razón)
Próximo paso sugerido: [1 línea — típicamente "Sprint 4: primer worker Spotify real"]
```

## Scope explícito — NO hagas

- **NO escribas implementación real de los workers** (solo stubs). Eso es Sprint 4+.
- **NO ejecutes fetches reales** contra APIs externos. Este sprint es infra.
- **NO hagas deploy a Vercel** — `vercel.json` queda listo pero no activado.
- **NO edites tablas existentes** de forma destructiva — solo `alter table ADD column`
  con valores default seguros.
- **NO hagas commit** — Luis revisa antes de push.
- **NO modifiques UI ni componentes React**.
