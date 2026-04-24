# Memoria — Engineering

**Owner:** Engineering agent
**Misión:** construir y mantener la plataforma. Implementa lo que Product Architecture aprueba.

---

## Stack actual

- **Frontend:** Next.js 16 (App Router) + TypeScript estricto + CSS variables del DS (no Tailwind).
- **Backend:** Supabase (Postgres + Auth + Storage + RLS).
- **Hosting:** Vercel (auto-deploy desde push a main).
- **Ingestion:** TypeScript code-first (NO n8n). Workers en `src/lib/ingest/workers/`. Dispatcher con queue + rate limits.
- **Skills cognitivas (Claude):** stubs en `src/lib/skills/` con interfaz LLMCaller. Default Claude Max manual workflow hasta que se pague Anthropic API.
- **Cron:** GitHub Actions (gratis), schedule commented hasta primer pipeline live.

## Estado del repo (snapshot 2026-04-25)

- 17 commits en `main`, todo limpio.
- 81 people en DB. 76 con spotify_id. 2 con MBID + datos ricos (Canserbero, Apache).
- 4 workers reales: Spotify, MusicBrainz, Wikipedia, Genius.
- 4 stubs: YouTube, Brave, Firecrawl, Whisper.
- 31 componentes TSX, 21 rutas App Router.
- 1/21 rutas con data real wireada (`/artists/[slug]`).
- 12 queries Supabase faltantes.

## Sprints completados

| Sprint | Outcome |
|---|---|
| 0 | Schema 31 tablas + RLS |
| 1 | Schema fixes + 15 pillars seed |
| 2 | App Router + wire básico + purga legacy |
| 3 | Ingestion infra code-first |
| 4 | Spotify Stage 1 (con incidente rate limit ban 23h) |
| 6 | MusicBrainz scaffold |
| 6.5 | Wikipedia + Genius + race fix |
| Design Sync v3 | 12 componentes TSX + 13 rutas |

Ver `MEMORY.md` (raíz) para detalle por sprint.

## Bloqueadores activos

- **Spotify circuit breaker OPEN** — cooldown estimado fin: 2026-04-25 ~22:00 ART.
- **Sprint 5 Stage 2** bloqueado por lo anterior.
- **Sprint UI-fill** pausado — necesita confirmación de scope MVP por Product Architecture antes de crear rutas que pueden cambiar.

## Deuda técnica registrada

- Props `any` en 5 componentes nuevos del Design Sync v3.
- StaticPage sin react-markdown parser real.
- `/privacy` y `/terms` leen .md vía `path.join(...)` frágil.
- `/join` y `/auth` coexisten — decisión pendiente Product Architecture.
- Tab EDITORIAL en Nav apunta a vista vacía.
- Gender casing: MB retorna `"Male"` capitalizado, asumimos lowercase.
- Entity_stats vacío para Spotify followers/popularity (API change 2024).
- GitHub PAT embebido en `.git/config` — migrar a Keychain.
- Cero tests (unit + E2E + snapshot).

## Reglas de trabajo

- Cada sprint cierra con commits semánticos + push (Strategy/PM ejecuta vía Desktop Commander).
- Nunca commit `--force` ni push directo a producción sin save point.
- `next build` debe pasar antes de cierre de sprint.
- Schema changes con `ADD COLUMN IF NOT EXISTS` o nuevas migraciones, nunca DROP destructivo.
- Worker nuevo → spacing + withTimeout + persistRawResponse + circuit breaker. Patrón establecido en Spotify y MusicBrainz.

## Decisiones de stack que persisten

- 2026-04-23 · n8n descartado, full code TypeScript.
- 2026-04-23 · Vercel Pro $20/mes deferido. GitHub Actions free para cron.
- 2026-04-23 · Anthropic API NO comprada todavía. Workflow manual con Claude Max.
- 2026-04-24 · Skills tienen interface LLMCaller pluggable para swap futuro.

## Pendientes míos (cuando arranque este chat)

- Esperar definición scope MVP de Product Architecture.
- Entonces: Sprint 5 (post-cooldown), Sprint UI-fill, Sprint 7 (Stage 4 credits), Sprint Eventbrite ingestion.
- En paralelo: ir cerrando deuda técnica registrada.
