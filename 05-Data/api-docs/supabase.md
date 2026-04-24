# Supabase (Postgres + Auth + Storage + Realtime)

**Last reviewed:** 2026-04-23
**Used in:** Always (our entire data layer)
**Project:** `pmckviaplfxjfqubuknt` · org Vulqo

---

## Overview

Supabase es nuestro backend completo. Capas que usamos:

- **Postgres** (managed): todas las 31 tablas de data model.
- **Auth**: email magic link + Google OAuth para user accounts.
- **Storage**: photos de press, covers (si los hospedamos; default es
  link-out a Spotify cdn).
- **RLS policies**: gate de lectura/escritura, aplicadas en migrations 0001
  y 0002.
- **PostgREST** (auto-generated REST API): consumido por el frontend con
  `@supabase/supabase-js`.
- **Edge Functions** (TypeScript Deno): opcional para jobs pequeños; para
  jobs grandes preferimos n8n.

---

## Auth

Varias keys según el caller:

- `NEXT_PUBLIC_SUPABASE_URL` — public, usado en browser.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public, respeta RLS. Usado desde
  browser para user-facing reads.
- `SUPABASE_SERVICE_ROLE_KEY` — **secreto**. Bypasses RLS. Solo en server
  (API routes, server actions, n8n workers). **NUNCA exponer en browser.**
- `DATABASE_URL` — Postgres direct connection. Solo para migrations
  (supabase CLI) y workers que requieren PSQL.

Headers PostgREST:
```http
apikey: {key}
Authorization: Bearer {key}
```

---

## Base URLs

- REST: `https://pmckviaplfxjfqubuknt.supabase.co/rest/v1`
- Auth: `https://pmckviaplfxjfqubuknt.supabase.co/auth/v1`
- Storage: `https://pmckviaplfxjfqubuknt.supabase.co/storage/v1`
- Postgres direct: `db.pmckviaplfxjfqubuknt.supabase.co:5432`
- Dashboard: `https://supabase.com/dashboard/project/pmckviaplfxjfqubuknt`

---

## Endpoints clave (PostgREST patterns)

### Read con joins (via foreign key)

```typescript
supabase
  .from('people')
  .select('*, cities:origin_city_id(name, slug)')
  .eq('visibility', 'public')
  .is('deleted_at', null)
```

Esto genera SQL con JOIN automático.

### Count exacto (HEAD request)

```typescript
const { count } = await supabase
  .from('people')
  .select('*', { count: 'exact', head: true })
  .eq('is_venezuelan', true);
```

### Insert con ON CONFLICT

```typescript
supabase
  .from('people')
  .upsert([{ slug: 'apache', stage_name: 'Apache', ... }], {
    onConflict: 'slug',
    ignoreDuplicates: false  // update on conflict
  })
```

### Full-text search con pg_trgm

```typescript
supabase
  .from('people')
  .select('*')
  .ilike('stage_name', `%${query}%`)
  .limit(10)
```

Para fuzzy real, usar RPC function que expone `similarity()`:
```sql
create function search_people_fuzzy(q text)
returns setof people as $$
  select * from people
  where deleted_at is null
    and visibility = 'public'
    and stage_name % q
  order by similarity(stage_name, q) desc
  limit 20;
$$ language sql stable;
```

---

## Rate limits

Supabase hosted Pro tier (que usamos):
- **Database**: depende del plan. Free = shared compute; Pro = ~50 conn.
- **PostgREST**: ~1000 req/s para anon role (dev experience); más con
  service role.
- **Auth**: 30 req/s.
- **Storage**: por bandwidth.

Actual plan: verificar en dashboard. Default nuevo = Free (500MB DB, 5GB
bandwidth, 50K MAU auth).

---

## Errores

Estándar REST:
| Code | Meaning |
|---|---|
| 401 | Key wrong o faltante |
| 403 | RLS bloqueó la operación |
| 404 | Recurso no existe |
| 409 | Unique constraint violation (conflict) |
| 422 | Validation (CHECK constraint, type mismatch) |
| 500 | Server error (postgres side) |

**403 es el más frecuente.** Significa que la RLS policy negó el acceso.
Debugging: revisar la policy, ver si el JWT tiene el claim esperado.

---

## Costos

**Free tier:**
- 500 MB DB
- 5 GB bandwidth/mes
- 50K MAU
- 1 GB storage

**Pro ($25/mes):**
- 8 GB DB, escalable
- 250 GB bandwidth
- 100K MAU
- 100 GB storage
- Daily backups

**MVP estimate:** free tier cabe fácil (25K tracks × ~500 bytes = 12 MB data).
Upgrade a Pro al llegar a ~5K MAU o 400 MB DB.

---

## Caveats

1. **Service role key bypassa RLS. NUNCA en browser.** En Next.js, wrap
   en server-only imports (`import 'server-only'` top del module).

2. **Dirección nested vs separate queries.** PostgREST resolves nested via
   FK auto:
   ```
   .select('*, cities:origin_city_id(*)')
   ```
   Pero para joins complejos (ej. tracks via releases via artist), fuck
   PostgREST. Escribir una **database function** que retorne el shape que
   necesitás y llamarla con `.rpc('function_name')`.

3. **RLS performance.** Policies con `EXISTS(select from user_profiles ...)`
   correrán POR CADA row. Para tablas grandes (releases con 10K+ rows),
   asegurate que las FKs en la policy tengan índices. Ya hicimos esto en
   migración 0002.

4. **Postgres connection pooler.** Vercel + Supabase combination tiene
   issues con pooling. Usar `DATABASE_URL` con pgBouncer endpoint
   (`db.{ref}.supabase.co:6543`) para serverless functions. Direct 5432
   solo para migrations.

5. **Timezone.** Postgres stores `timestamptz` en UTC internamente. PostgREST
   retorna ISO con timezone. Cliente TS debería hacer `new Date(...)` y
   formatear localmente.

6. **Realtime subscriptions.** Disponible pero no lo usamos en MVP. Potencial
   futuro para "who's viewing this artist right now" en admin dashboard.

---

## Migrations history

| # | File | Applied | What |
|---|---|---|---|
| 0001 | `20260423000000_initial_schema.sql` | 2026-04-23 | 31 tables, RLS, 25 policies, seeds countries/cities/genres |
| 0002 | `20260423010000_schema_fixes.sql` | 2026-04-23 | editors corrections policies, `user_profiles.is_public`, 15 FK indexes |
| 0003 | `20260423020000_seed_pillars.sql` | 2026-04-23 | 15 pillar artists with Layer 1 |
| 0004 | `20260423030000_seed_pillar_roles.sql` | 2026-04-23 | people_roles for pillars (Akapellah dual artist+producer) |

Próximas migraciones esperadas:
- 0005: `ingestion_queue`, `ingestion_rate_limits`, `raw_responses`, `pipeline_runs` (Stage 0)

---

## References

- Docs: https://supabase.com/docs
- Dashboard: https://supabase.com/dashboard/project/pmckviaplfxjfqubuknt
- JS client: https://supabase.com/docs/reference/javascript
- CLI: `supabase --help`
- Env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`
- Code ownership: `src/lib/supabase.ts` (browser + server clients)
- Types: `src/lib/database.types.ts`

---

## Changelog

- 2026-04-23 · Initial doc · Luis + Cowork
