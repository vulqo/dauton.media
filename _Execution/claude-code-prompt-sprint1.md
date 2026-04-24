# Prompt para Claude Code — Sprint 1 (Schema fixes + seed pillars)

**Cómo usar:** abre Claude Code con el workspace apuntando a
`/Users/luisfiguera/Downloads/Vulqo LLC/Projects/Dauton Media/` y pega todo el
bloque entre `---`.

---

Hola, soy Luis. Cowork hizo un audit del schema que tú aplicaste en Sprint 0 y
encontró gaps. La migración de fixes ya está escrita en disco. Tu trabajo hoy
es aplicarla y después sembrar los pillars artists del MVP.

## Contexto mínimo que necesitas

- Schema vivo: proyecto Supabase `pmckviaplfxjfqubuknt` en la org de Vulqo.
- Credenciales locales: `02-Engineering/website/.env.local` tiene
  `DATABASE_URL` + keys. Úsalas.
- Spec de producto: `01-Product/mvp-scope.md` (sección "Pillar artists").
- Migración 0001 ya aplicada. 31 tablas, RLS on, 35 policies. Seeds: countries,
  cities, genres (10 cada uno). Resto vacío.

## Tarea 1 — Aplicar migración 0002 (schema fixes)

El archivo ya existe:
`02-Engineering/website/supabase/migrations/20260423010000_schema_fixes.sql`

Aplícalo:

```bash
cd "02-Engineering/website" && \
supabase db push --db-url "$DATABASE_URL"
```

(el `DATABASE_URL` vive en `.env.local`; si el CLI no lo toma, exporta
`export $(grep -v '^#' .env.local | xargs)` primero)

Verifica después con una query rápida:

```sql
-- debe retornar 4 policies nuevas
select policyname, cmd from pg_policies
where tablename = 'corrections_queue' or tablename = 'user_profiles';

-- debe mostrar la columna nueva
select column_name, data_type, column_default
from information_schema.columns
where table_name = 'user_profiles' and column_name = 'is_public';

-- debe retornar >= 15 índices nuevos
select indexname from pg_indexes
where schemaname = 'public' and indexname like '%_idx%' order by indexname;
```

## Tarea 2 — Crear y aplicar migración 0003 con pillars mínimos

Crea el archivo
`02-Engineering/website/supabase/migrations/20260423020000_seed_pillars.sql`
con INSERTs idempotentes (`on conflict do nothing`) para los 15 pillars
listados en `01-Product/mvp-scope.md`:

Canserbero, Apache, Akapellah, Gabylonia, McKlopedia, Lil Supa, Nerza, Cayro,
Oldtape, Micro TDH, Lil Goofy, Rxnde Akozta, Neutro Shorty, Jeiby, Trainer.

Para cada uno inserta UN row en `people` con **solo Layer 1 mínimo**:

- `slug` — kebab-case del stage_name (sin acentos ni ñ)
- `stage_name`
- `origin_city_id` — `(select id from cities where slug='caracas')` como default;
  si conoces ciudad específica (ej. Akapellah → Maracay, Canserbero → Maracay)
  úsala
- `is_venezuelan = true` (Rxnde Akozta es Cubano-Venezuelano; márcalo true
  también, es el test case de diáspora del MVP)
- `status = 'active'` (Canserbero = `'deceased'`)
- `visibility = 'public'`
- `bio_short` — 1 línea sobre por qué es pillar (ej. "Referente ineludible
  del rap venezolano de los 2000s. Fallecido en 2015.")
- Todo lo demás `null` — no inventes fechas, IDs externos, ni bios largas.
  Esos los llena el pipeline de ingestion después.

Aplica la migración igual que la 0002.

## Tarea 3 — Smoke tests

```sql
select count(*) from people;                     -- 15
select count(*) from people where is_venezuelan; -- 15
select stage_name, origin_city_id is not null as has_city from people order by stage_name;
```

Todos deben pasar.

## Tarea 4 — Reporte de cierre

Formato estricto:

```
Hecho: [1 línea]
Migración 0002: aplicada / falló (razón)
Migración 0003: aplicada / falló (razón)
Smoke tests: 3/3 ok o X/3 (cuál falló y por qué)
Próximo paso sugerido: [1 línea — típicamente "conectar ArtistPage a query
                       select * from people where visibility='public'"]
```

## Scope explícito

- NO toques componentes React todavía.
- NO modifiques `src/lib/supabase.ts`.
- NO crees una tarea 4/5/6 por tu cuenta. Si encuentras algo raro, pausa y
  reporta, no inventes scope.
- NO commit & push automático — deja el commit para que yo revise el diff en
  GitHub o te lo pida después.
