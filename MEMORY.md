# Dauton Media — Memoria del Proyecto

*Este archivo lo leen/editan Luis y Claude. Se actualiza cada vez que hay una
decisión nueva o un cambio de estado.*

---

## Identidad del proyecto

**Qué es:** media brand dedicado al rap hispanohablante con foco editorial en
Venezuela. Combina archivo de referencia (Wikipedia/Discogs), discovery
(Genius/RYM), y editorial light (Pitchfork pero automatizado).

**Owner:** Luis Figuera, via Vulqo LLC (estructura empresarial propia pendiente
post-MVP, ver `_Reference/company-structure-notes.md`).

**Posicionamiento:** "NTS Radio + Pitchfork + Genius" para el rap hispano.

---

## Decisiones estratégicas activas

- **Launch target:** 6 meses (octubre 2026)
- **MVP scope:** archivo público + cuentas de usuario (favoritos, contribuciones)
  — sin editorial pesado, sin pagos, sin merch, sin eventos con ticketing
- **Monetización v1:** solo donaciones (Ko-fi). Freemium y pasarelas worldwide
  vienen en v2.
- **Dirección empresarial:** hybrid — cashflow-backed con optionality de levantar
  capital si aparece algo estratégico
- **Worldwide en contenido/audiencia** desde día 1, pero monetización worldwide
  solo en v2
- **No hosteamos lyrics ni audio propio** — linkeamos a Spotify, Genius, YouTube
- **Motor de contenido automatizado** desde día 1 (crítico para SEO/autoridad)
- **Luis es orchestrator, no ejecutor** — el trabajo lo hacen sistemas
  automatizados, no humanos

---

## Stack y estado actual (actualizado 2026-04-23 tarde)

### Infraestructura confirmada

- **Repo:** GitHub `vulqo/dauton.media`
- **Deploy:** Vercel proyecto `dauton-media` (vulqollc team)
  - projectId: `prj_ekqm5a02yNkKfK2UrzAaqLEwZR3V`
  - teamId: `team_oIGMu0bO0zgLUSGCGeVIdg4h`
  - URL producción: https://dauton-media.vercel.app
  - Root directory en Vercel: `02-Engineering/website`
  - Auto-deploy desde push a `main`
- **Supabase:** proyecto dedicado en la org de Vulqo
  - project_ref: `pmckviaplfxjfqubuknt`
  - URL: `https://pmckviaplfxjfqubuknt.supabase.co`
  - NO mezclar con SHO Companies (otra org)

### Env vars seteadas

En `.env.local` (2026-04-23) + Vercel production/preview:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `DATABASE_URL`

**Pendiente validación rápida:** confirmar que Vercel tiene las 4 seteadas en
environment "Production" (no solo "Preview"). Cowork dice que sí, no mostró
reporte explícito.

### Schema de base de datos (aplicado 2026-04-23)

31 tablas en producción siguiendo `02-Engineering/data-model.md`:
- 9 entidades MVP core: Person, Crew, Label, Release, Track, City, Event,
  Article, Source
- Entidades soporte ya implementadas: Country, Genre + jerarquía, tablas de
  relaciones many-to-many
- User-facing: users, favorites, contributions, user_lists,
  contribution_approvals
- RLS habilitado en todas las tablas: lectura pública donde corresponde,
  write restringido a editors/admins
- Triggers `updated_at` automáticos en todas las entidades core
- `pg_trgm` para fuzzy search por nombre
- Índices trigram listos

### Seed data inicial cargado

- 10 países
- 10 ciudades (incluye Caracas, Maracay, Mérida, Valencia)
- 10 géneros con jerarquía

### Código actual

- **Stack:** Next.js + Supabase + Tailwind
- **Cliente Supabase configurado:** `src/lib/supabase.ts` con cliente browser
  (RLS) + cliente server (service role)
- **`@supabase/supabase-js`** instalado
- **Pantallas migradas desde Claude Design:** homepage, artist, release, track,
  otros (revisar `src/components/` para lista actual)
- **Componentes legacy a limpiar eventualmente:** ShopPage, ProductPage,
  SellerDashboard (residuos de Dauton Store previo, no prioridad hoy)

### Security notes

- Password de DB Supabase `Media.Dauton2026$` fue usada en CLI command —
  eventualmente rotar y guardar en gestor tipo 1Password
- `.env.local` está en `.gitignore` ✓

---

## Las 9 entidades del MVP

Person, Crew, Label, Release, Track, City, Event, Article, Source.

Ver `02-Engineering/data-model.md` para schema completo con relaciones.

---

## Prioridades actualizadas

### ✅ P0 — COMPLETADO (2026-04-23)

- ✓ Supabase project creado y apuntado correctamente
- ✓ Schema aplicado (31 tablas, RLS, triggers, índices)
- ✓ Seed inicial mínimo (países/ciudades/géneros)
- ✓ Cliente Supabase en website
- ✓ Env vars seteadas
- ✓ Deploy pipeline funcionando

### 🟡 P1 — ACTIVO: Conectar frontend a data real

Empezar por **ARTIST**. Razones:
1. Es la entidad ancla del grafo — todo se conecta a artistas
2. `ArtistPage` ya diseñada desde Claude Design
3. Permite validar flow completo: query → render → navegación
4. Con 1-2 artistas seedeados se ve end-to-end funcional

**Secuencia sugerida:**

1. **Artist page conectada:**
   - Insertar 1-2 artistas seed (Apache + Canserbero completos)
   - Hacer que `ArtistPage` consuma data real vía Supabase
   - Implementar routing dinámico `/artist/[slug]`
   - Validar que completeness score se calcula/muestra

2. **Release page conectada:**
   - Insertar 2-3 releases de esos artistas (Apocalipsis, etc.)
   - `ReleasePage` consumiendo data real
   - Linkeado desde artist page

3. **Track page conectada:**
   - Tracks insertados con créditos completos
   - `TrackPage` con metadata + credits desde DB
   - Audio player linkeado a Spotify/YouTube (no hospedado)

4. **Homepage conectada:**
   - Últimos releases destacados
   - Artistas destacados
   - Feed editorial (vacío o placeholder por ahora)

5. **Search básico:**
   - Input funcional usando `pg_trgm`
   - Results page con filtros por tipo

### 🟡 P1.5 — Auth y contribuciones (paralelo o después de P1)

6. Auth flow con Supabase Auth (email + magic link + Google OAuth)
7. Sistema de contribuciones end-to-end (ya tiene schema, falta UI)
8. Verified profiles flow conectado

### 🔵 P2 — Producto completo (semanas 3-8)

9. User dashboard básico (favoritos, contribuciones, listas)
10. Static pages: About, Manifiesto, Privacy, Terms
11. SEO foundations: metadata por entidad, sitemap, robots.txt, schema.org

### 🟢 P3 — Automation engine (semanas 6-14)

12. Motor de contenido automatizado (n8n + Claude API + OpenClaw)
13. Moderación automatizada con escalamiento a humano
14. SEO monitoring semanal
15. Community health alerts

---

## Criterios de éxito (6 meses post-launch)

- 1,000 usuarios registrados en los primeros 3 meses
- Al menos 1 artículo de prensa citando como fuente
- 50+ artistas verificados
- 100+ contribuciones aprobadas
- Tiempo promedio de sesión >3 min
- 0 escándalos legales

---

## Preferencias de trabajo de Luis

- Directo, sin preámbulos largos
- Corrección inmediata si algo está mal, no rephrasea suavemente
- Acepta push back directo si algo es mala idea
- Odia sobreingeniería
- "Vibe coder" — usa AI extensivamente
- Prefiere automatización sobre manualidad
- Plan Claude Max

---

## Qué NO hacer

- ❌ Mezclar con SHO Companies, Vulqo, Hashery, Focus V
- ❌ Sugerir editorial pesado, pagos complejos, o merch en v1
- ❌ Proponer abogados caros, CFO virtual, o multi-entity antes de PMF
- ❌ Hostear lyrics o audio propio (riesgo legal innecesario)
- ❌ Narrar el proceso excesivamente en Cowork (gasta tokens)
- ❌ Recon exhaustivo cuando la tarea es quirúrgica
- ❌ Leer los 30 docs de área a menos que la tarea específica lo requiera

---

## Historial de decisiones importantes

### 2026-04-23 (mañana)

- Definido MVP scope (archivo + usuarios, no editorial pesado)
- Decidido no monetizar en v1 (solo Ko-fi donations)
- Decidido dirección hybrid (cashflow-backed con optionality para capital)
- Archivadas notas de estructura de empresa post-MVP en `_Reference/`
- Confirmado que Supabase de Dauton Media vive en org de Vulqo, no SHO
- Migración a Cowork para tener más autonomía ejecutiva

### 2026-04-23 (tarde)

- Supabase project creado (`pmckviaplfxjfqubuknt`) en org Vulqo
- Schema completo aplicado: 31 tablas con RLS, triggers, índices trigram
- Seed inicial: 10 países, 10 ciudades, 10 géneros con jerarquía
- Cliente Supabase configurado en website + `.env.local`
- CLAUDE.md actualizado con reglas estrictas de eficiencia después de detectar
  recon exhaustivo innecesario
- Decisión: próximo paso es ARTIST (entidad ancla del grafo) antes que Release
  o Track

### 2026-04-23 (post Sprint 1 audit)

- Audit Cowork detectó que el reporte inicial de "26 tablas" era impreciso — son
  31 (contó las de soporte: relationships, slug_history, edit_history,
  corrections_queue, user_list_items). 35 policies, todas las tablas con ≥1
  policy. Verificado vía PostgREST.
- Gaps identificados: corrections_queue sin UPDATE/DELETE para editors;
  edit_history sin INSERT policy (por diseño, lo escribe service_role); policy
  `public profiles readable` exponía todos los user_profiles.
- Migración **0002_schema_fixes.sql** escrita por Cowork y aplicada por Claude
  Code. Agrega policies UPDATE/DELETE en corrections_queue, columna
  `user_profiles.is_public boolean default false`, y 15 índices sobre FKs (genres
  parent, labels country/city/parent, media_outlets country, sources outlet,
  articles author, production_credits, press_mentions subject, slug_history
  entity, user_favorites/user_list_items entity polimórfico).
- Decisión de producto: `user_profiles.is_public` default **false** (privacy por
  defecto; se activa cuando user opta por listas públicas o reclamar perfil).
- Migraciones **0003_seed_pillars.sql** y **0004_seed_pillar_roles.sql** creadas
  por Claude Code. Estado live: `people=15`, `people_roles=17` (Akapellah dual
  artist+producer, más otro con role extra).
- **Design System zip v2 = v1 byte-por-byte**. El reporte de Claude Design
  describe 33 componentes JSX pero el zip sólo incluye 26. Componentes no
  incluidos en zip: 404, Auth, Messages, Notifications, About, SearchResults,
  Membership, y los 4 modales (ClaimCredit, PhotoUpload, CVExport, Contribute).
- **Legacy store purgado del repo** (Cowork): imports y casos de ShopPage,
  ProductPage, SellerDashboard removidos de `page.tsx`. Tab TIENDA removido de
  `Nav.tsx`. Chip "HAZTE MIEMBRO" → "ENTRAR". Sección DROPS y tile DROPS
  removidos de `HomePage.tsx`. Los 3 archivos `.tsx` quedaron huérfanos en
  `src/components/` (sandbox no pudo borrarlos — Claude Code debe borrar en
  Sprint 2).
- **Data wire arrancó** (Claude Code): `src/lib/queries/{people,releases,search}.ts`
  + `database.types.ts`. `HomePage.tsx` consume `getPeople` con loading state.
  `page.tsx` soporta routing con slug vía `viewName:viewSlug`. Deuda: `search.ts`
  tenía errores TS2352 (pendiente confirmar si se resolvieron).
- **Todo uncommitted**. Claude Code dejó el commit para revisión de Luis.

### 2026-04-23 (late evening — arquitectura ingestion)

- **APIs Sprint 3 con credenciales reales**: Spotify (Client ID + Secret),
  YouTube API Key, Genius Client Access Token, Brave Search API Key, Firecrawl
  (reused de Vulqo). Luis confirmó Spotify Premium activo (requerido desde
  2025 para usar Web API).
- **Arquitectura ingestion: code-first TypeScript, NO n8n.** Decisión de Luis
  post-revisión. Ventajas: stack único, type safety end-to-end, mejor
  source control, Claude Code genera código más eficientemente que configs
  de n8n. Workers viven en `src/lib/ingest/workers/`, dispatcher en
  `src/lib/ingest/queue/`, orchestration en `src/lib/ingest/pipelines/`.
- **Cron recurring: GitHub Actions (gratis)** — NO Vercel Pro ($20/mes deferred).
  Workflow en `.github/workflows/ingest-dispatch.yml`, schedule commented
  hasta Sprint 4. Luis puede trigger manual via GitHub UI o `gh workflow run`.
- **LLM caller para skills: Claude Max workflow (NO Anthropic API)** en MVP.
  Los skills exponen interface `LLMCaller` pluggable. Default implementation
  `ClaudeMaxManualCaller` escribe inputs a `_pending_skills/{skill}/*.input.json`
  y el queue item queda `status='awaiting_skill_execution'`. Luis ejecuta
  prompt estándar desde Claude Code: "procesa todos los inputs pendientes de
  bio-drafter". Un script `consume-skill-outputs.ts` reanuda los queue items.
  Manual pero aprovecha el Max sin pagar API. Swap a `AnthropicAPICaller`
  cuando Luis decida pagar (solo cambia el caller en un file).
- **Documentación de APIs creada en `05-Data/api-docs/`** — 9 docs (Spotify,
  MusicBrainz, YouTube, Genius, Brave, Firecrawl, Wikipedia/Wikidata,
  OpenAI Whisper, Supabase). Regla: cada worker referencia su doc. Si un API
  cambia, se actualiza doc PRIMERO y después el código.
- **Schema gaps identificados + agregados al Sprint 3 migración 0005**:
  - Nuevas tablas: `ingestion_queue`, `ingestion_rate_limits`, `raw_responses`,
    `pipeline_runs`, `videos`, `entity_stats` (polimórfica).
  - Nuevas columnas: `tracks.explicit`, `people.gender`,
    `people.spotify_followers`, `people.spotify_popularity`,
    `people.youtube_subscribers`, `people.last_stats_sync_at`.
- **Seeds adicionales creados**:
  - `05-Data/seed/spotify-playlists.json` — 9 playlists de k12jamz con
    priority MVP (5 críticas/altas, 4 out-of-scope).
  - Seedcademy.io agregado a `05-Data/source-catalog.md` como plan futuro
    (post-MVP, con notas legales).
- **Social automation plan** en `07-Marketing-Growth/social-automation-plan.md`:
  Fase 0 (reservar 7 handles), Fase 1 (playlists Spotify propias), Fase 2
  (post-automation desde Supabase events), Fase 3 (podcast TTS + video
  shorts + newsletter).
- **APIs adicionales identificadas (eventos + otros)**: Bandsintown,
  Setlist.fm, Ticketmaster Discovery. **Deferred** a research turn entre
  Sprint 4 y 5 para evitar scope creep.
- **Sprint 3 unblocked** para Claude Code: todos los pendientes resueltos,
  prompt en `_Execution/claude-code-prompt-sprint3.md` listo para pegar.

### 2026-04-23 (Sprint 2 cerrado)

Claude Code reportó Sprint 2 completo:
- **Legacy purgado completo**: `ShopPage.tsx`, `ProductPage.tsx`,
  `SellerDashboard.tsx` eliminados. 0 imports restantes.
- **TS errors: 0**. Build clean.
- **Migración a App Router real**: SPA con localStorage convertida.
  10 rutas generadas: `/`, `/artists`, `/artists/[slug]`, `/cities`,
  `/cities/[slug]`, `/events/[slug]`, `/articles/[slug]`, `/search`, `/join`.
- **`/artists/[slug]` end-to-end conectado**:
  - `localhost:3000/artists/canserbero` → `<title>Canserbero — Dauton Media</title>` ✓
  - `localhost:3000/artists/apache` → 200 con contenido ✓
  - `localhost:3000/artists/nonexistent` → 404 ✓
- Deuda pendiente: bloques `dm-empty-state` en `ArtistPage` donde hay que
  conectar releases/tracks reales (target Sprint 4 post ingestion).

### 2026-04-24 (Sprint 4 cerrado — Spotify worker + Stage 1 bootstrap)

**Deliverables:**
- SpotifyClient con 9 métodos públicos + auth Client Credentials + token cache + timeout via Promise.race.
- 5 worker operations (se agregó `search_artists_by_query` por 403 en playlist tracks).
- Pipeline `runStage1Bootstrap`, CLI `bootstrap-seed.ts`, CLI `approve-artist.ts`.
- 3 migraciones aplicadas: `0005` (ya estaba), `0006_rate_limit_rpc`, `0007_fuzzy_match_rpc` (pg_trgm exposed).

**Resultado vs targets:**
- `people`: 15 → 81 (+66 candidatos en review)
- `people.spotify_id`: 0 → 76
- Pillars con spotify_id: **10/15** (pending: gabylonia, jeiby, lil-goofy, mcklopedia, nerza — se auto-resuelven post-cooldown)
- `raw_responses` (spotify): 600 rows
- `pipeline_runs`: 5 con status=success
- Queue: 232 done, 246 queued, 21 dead_letter

**Hallazgos críticos documentados en `05-Data/api-docs/spotify.md`:**
1. ⛔ Spotify Client Credentials **ya NO retorna `followers` ni `popularity`** (cambio 2024). `entity_stats` queda vacío hasta implementar OAuth user flow o scraping público.
2. ⛔ `/playlists/{id}/tracks` retorna 403 para user playlists (k12jamz). Implementado fallback search-based. Editorial playlists sí funcionan.
3. 🚨 Rate limit real: 429 tras ~600 calls rápidas, `Retry-After: 83,578s` (~23h). Burst-pattern penalty. Nueva regla: **spacing 300ms mínimo + cap 30s per retry + circuit breaker abre si Retry-After > 30s**.
4. ⚠ Node 20 fetch sin timeout default → fix obligatorio con `withTimeout` / `AbortController` en todos los clients.

**Deuda técnica asumida:**
- 21 dead_letter "No person found" = race entre `resolve_artist_by_name` y subsecuentes workers mapeando dos spotify_ids al mismo people. Claude Code los descarta como duplicados legítimos.
- 5 pillars sin resolver (search directo ya encolado, drena post-cooldown).
- `entity_stats` vacío para metrics de Spotify.

**Estado operativo:**
- Spotify circuit: OPEN hasta ~21:00 ART mañana (2026-04-25).
- Queue auto-resume: sí, al primer success post-cooldown.
- Sprint 5 arranca cuando queue drene sin errores (validación: 15/15 pillars con spotify_id).
- TypeScript clean, preview site sirve data real.
- Zero commits — Luis revisará diff antes de push.

### 2026-04-24 (commits Sprints 3-4 + política commits Cowork)

**Commits pusheados a `main`** (vía Desktop Commander sobre filesystem real del Mac, evitando el `.git/` read-only del sandbox):

- `7abd199` · `feat(db): sprints 3-4 migrations — ingestion infra, schema fixes, seed pillars, rate-limit + fuzzy-match RPCs` · 5 files, +417.
- `e7d6b37` · `feat(website): App Router real + purge legacy store` · 21 files, +518 / -1423.
- `8caf473` · `feat(ingest): Spotify worker + dispatcher + Stage 1 bootstrap + skills stubs` · 50 files, +4068.
- `9a2edda` · `docs: api-docs, ingestion playbook, credentials, memory, social plan` · 30 files, +5968.

Working tree limpio. 106 archivos commiteados entre los 4. Total +10,971 / -1,900 líneas.

**Política de commits Cowork (aprobada 2026-04-24):**
- Cada vez que un sprint de Claude Code cierra OK, Cowork hace los commits semánticos directamente (via Desktop Commander → bash del Mac), en commits separados por área (db, website, ingest, docs). Luego push a `main`.
- Cowork NUNCA hace `git push --force`.
- Entre sprints, si Cowork edita docs por iniciativa propia (MEMORY, api-docs, prompts), los incluye en el próximo commit batch al cerrar el turno.
- Si hay deuda técnica o WIP, Cowork lo separa en commit propio `fix` o `chore` para revert granular.
- Luis no necesita ejecutar nada — solo revisar en GitHub si quiere.

**Deuda security detectada** (2026-04-24):
- El `git remote get-url origin` tiene el GitHub PAT embebido en la URL (`https://vulqo:ghp_8rcQ...@github.com/...`). Esto es visible en `.git/config` local. Riesgo: si alguien tiene access al filesystem del Mac o al `.git/` del repo, el token queda expuesto. Mitigación: migrar a macOS Keychain credential helper (`git config --global credential.helper osxkeychain`) y re-set origin sin token. **NO urgente** pero registrado para tocar en algún ventana de housekeeping.

### 2026-04-24 (Design Sync v3 cerrado — 12 componentes + 13 rutas)

**Deliverables:**
- 12 componentes TSX portados desde design system v3 (JSX → TSX) con `'use client'` según aplique, props tipadas, `useRouter`/`Link` de `next/navigation` en vez del pattern SPA `go('view')`.
- 13 rutas nuevas en App Router: `/about`, `/auth`, `/compare`, `/crews/[slug]`, `/directory/[type]`, `/labels/[slug]`, `/methodology`, `/privacy`, `/terms`, `/tracks/[slug]`, `/u/[user]/lists/[list]`, `not-found.tsx` global, y `/search` actualizado.
- `Nav.tsx`: chip **ENTRAR** ahora apunta a `/auth` (antes `/join`).
- Design system v3 descomprimido en `_Reference/design-system-v3/` (gitignored).
- Build clean, 0 TypeScript errors, 14 static pages prerendered + dynamic routes.
- Commit `3571995` pushed.

**Componentes NO portados (scope cerrado):**
- MessagesPage, NotificationsPage — deferred post-MVP
- ShopPage, ProductPage, SellerDashboard, MembershipPage — legacy ya purgado
- CVExportModal — no MVP use case
- ClaimCreditModal, ContributeModal, PhotoUploadModal — wire-blocked hasta Sprint 6+ (moderación + contribuciones)
- tweaks-panel — dev tool interno de design

**Deuda técnica asumida (Design Sync v3):**
1. **Props con `any`** en `CompareView`, `CrewProfile`, `LabelProfile`, `TrackPage`, `UserListPage`. Aceptable mientras usen mock/null. Cuando Sprint 5 trae releases/tracks reales + Sprint 6 trae crews/labels, tipar contra `database.types.ts` (`Person`, `Crew`, `Label`, `Track`, `UserList`).
2. **StaticPage sin markdown parser real.** Splittea por `\n\n` en `<p>`. Headings y links del `.md` aparecen como texto literal. Upgrade a `react-markdown` + `remark-gfm` cuando haya tiempo (5 min de trabajo, mejora UX notablemente).
3. **`/privacy` y `/terms` leen `.md`** via `path.join(process.cwd(), '..', '..', ...)` con try/catch fallback. Correcto en Vercel con `cwd=02-Engineering/website`, pero frágil si cambia deploy structure. Alternativa: import estático via MDX.
4. **`/join` y `/auth` coexisten.** `/join` es OnboardingPage (Sprint 2), `/auth` es AuthPage nuevo. Decidir: delete `/join`, o 301 redirect `/join → /auth`, o diferenciar roles (join = signup flow, auth = login). Decisión pospuesta a Sprint 6 (cuando wireamos Supabase Auth real).
5. **Glyphs preservados correctamente**: `✓ → ← ∅ ♪ ×` son convención existente (no pictográfico). Removidos de UserListPage los pictográficos `♡ ↗ ⧉ ◆` por regla SKILL.md.

**Stats del commit:** 26 files, +1278 / -51.

### 2026-04-24 (Sprint 6 cerrado — MusicBrainz scaffold + smoke sobre 2 pillars)

**Deliverables:**
- Migración **0008** `20260424030000_add_external_ids.sql`: columnas nuevas `people.wikidata_id`, `people.discogs_id`, `tracks.musicbrainz_id`. (`people.musicbrainz_id`, `people.youtube_channel_id`, `releases.musicbrainz_id` ya existían del 0001.)
- `MusicBrainzClient` real con 6 métodos (`getArtist`, `searchArtist`, `resolveArtistByUrl`, `resolveReleaseGroupByUrl`, `getReleaseGroup`, `getRecording`). Rate limit 1 req/s + spacing 1.1s + `withTimeout` 10s + `MBRateLimitError` custom. User-Agent only, no API key.
- Worker con 4 operations: `resolve_mbid_by_spotify`, `fetch_artist_rels`, `fetch_release_group_recordings`, `fetch_recording_credits`.
- `RELATION_MAP` con 15 tipos MB → `production_credits` / `writing_credits` / `collaborations`.
- Pipeline `stage-4-credits.ts` scaffolded con throw explícito + rationale docs (execution deferred al Sprint 7 post-Stage-2).
- CLI `scripts/ingest/mb-smoke.ts`.

**Smoke test — 2/2 pillars resueltos:**

- **Canserbero**: MBID `70a3344d-3f48-4843-ac93-e9e031d86b01` via search fallback (MB sin link Spotify registrado, score 100). 14 relations, 23 release-groups. Datos poblados: `gender=Male`, `birth_date=1988-03-11` (canonical MB), `death_date=2015-01-20`, `status=deceased`, `discogs_id=3339525`, `wikidata_id=Q18821745`, `youtube_channel_id=UC-Gh7ndBnNZvGRjCzlt2Ecw`.
- **Apache**: MBID `54e965b5-235e-415f-bf0c-3bef104bacc5` via Spotify URL (first try). 3 relations, 14 release-groups. Datos poblados: `gender=Male`, `birth_date=1982-05-15`.

**Corrección importante:** mi prompt Sprint 6 asumía `Canserbero birth_date = 1988-08-11`. MB dice **1988-03-11**. MB es la fuente canónica — usar MB, no memoria de Luis ni de Claude Code. MEMORY queda actualizada.

**Commits pusheados:**
- `be5a0bb` · `feat(db): migration 0008 — add external IDs`
- `f50cae4` · `feat(ingest): MusicBrainz client + worker scaffold + smoke test (Sprint 6)`

**Deuda técnica nueva:**
- **Gender casing:** MB retorna `"Male"` capitalizado, nosotros asumíamos lowercase. No bloquea (columna es text). Si usamos enum estricto, `.toLowerCase()` en el worker antes de insert. Low priority.
- **Bug fix aplicado:** `mbFetch` duplicaba `fmt=json` cuando el path ya lo traía, retornando 406. Fix: detectar `fmt=` antes de appendear. No rollback needed.

**Stats commits:** 6 files, +709 / -10.
