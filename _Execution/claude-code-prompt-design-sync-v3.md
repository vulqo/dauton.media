# Prompt para Claude Code — Design Sync v3 (paralelo, no bloquea Sprint 5)

**Cómo usar:** pegar entre los `---` en Claude Code con workspace en
`/Users/luisfiguera/Downloads/Vulqo LLC/Projects/Dauton Media/`.

**Pre-requisito:** zip `Dauton Media Design System-handoff (1).zip` está en
`~/Downloads/` (confirmar antes de pegar).

**⚠ Advertencias importantes (leer antes de ejecutar):**
- El prompt original que Claude Design te sugirió — "Implement: ui_kits/dauton-media-web/index.html" — es **peligroso**. `index.html` es un SPA monolítico con Babel JIT + localStorage router. Si lo tomás literal, destruís el App Router real de Next.js que construimos en Sprint 2. **NO implementes ese index.html**. Tratá el `index.html` como referencia visual, no como target.
- Este sprint es **paralelo a Sprint 5** (Spotify Stage 2, esperando cooldown). NO toques `src/lib/ingest/`, `src/lib/queries/`, workers, migraciones, schema, scripts, ni `scripts/`. Este sprint es **solo frontend**.
- **NO hagas commit al final** — Luis revisa diff primero.

---

Hola, soy Luis. Claude Design entregó el v3 del design system con 12 componentes
MVP nuevos. Este sprint es portearlos a TSX + crear sus rutas en App Router.

## Tarea 0 — Save point (primero, sin excepción)

**ANTES de cualquier otro cambio,** commitea el trabajo uncommitted de
Sprints 3 y 4:

```bash
cd "/Users/luisfiguera/Downloads/Vulqo LLC/Projects/Dauton Media"
git status --short
```

Si hay cambios sin commit, hacer **3 commits semánticos separados** (no un
super-commit):

1. `git add 02-Engineering/website/supabase/migrations/*.sql MEMORY.md` →
   `git commit -m "feat(db): Sprint 3-4 migrations 0005-0007 (ingestion infra + rate_limit_rpc + fuzzy_match_rpc)"`
2. `git add 02-Engineering/website/src/lib/ingest 02-Engineering/website/scripts 02-Engineering/website/.github` →
   `git commit -m "feat(ingest): Spotify worker + Stage 1 bootstrap + dispatcher"`
3. `git add -A` → `git commit -m "docs: api-docs + ingestion playbook + credentials checklist"`

Push a main: `git push origin main`

Si NO hay cambios uncommitted, skip y seguí.

## Tarea 1 — Descomprimir el design system v3 a `_Reference/`

```bash
cd "/Users/luisfiguera/Downloads/Vulqo LLC/Projects/Dauton Media"
mkdir -p _Reference/design-system-v3
unzip -o "$HOME/Downloads/Dauton Media Design System-handoff (1).zip" -d _Reference/design-system-v3/
```

Agregar a `.gitignore` del repo root:
```
_Reference/design-system-v3/
```

(No queremos commitear los 40+ JSX del design system — es reference, no source.)

## Tarea 2 — Leer el SKILL.md del v3

Leé `_Reference/design-system-v3/dauton-media-design-system/project/SKILL.md`
entero. Son las reglas non-negotiables: dark-only, zero emoji, sharp corners,
uppercase + mono para metadata, color semántico estricto.

Todo componente que portees DEBE respetar estas reglas.

## Tarea 3 — Portar los 12 componentes MVP nuevos a TSX

Para cada uno, **crear nuevo archivo TSX en `src/components/`** (no
sobrescribir existentes). Toman el JSX del v3, convertilo a TSX con:
- `'use client'` al top si usa hooks o eventos
- Props tipadas (ej. `go: (view: string) => void` para navegación)
- Usa `useRouter` de `next/navigation` para navegación real, NO el pattern
  `go('view')` del SPA original
- Mantén las mismas classes CSS (`dm-*`) — están definidas en `globals.css`
- Remover cualquier emoji (SKILL.md non-negotiable)

Los 12 a portar:

| JSX source | TSX target | Notas |
|---|---|---|
| `AboutPage.jsx` | `src/components/AboutPage.tsx` | Estático, contenido editorial. |
| `AuthPage.jsx` | `src/components/AuthPage.tsx` | Login/signup. Hooks de Supabase Auth — déjalo como stub por ahora (onClick → placeholder). El wiring real viene después. |
| `CompareView.jsx` | `src/components/CompareView.tsx` | Compare 2-4 entidades. Acepta prop `entities: Person[]`. Con array vacío, muestra empty state. |
| `CrewProfile.jsx` | `src/components/CrewProfile.tsx` | Acepta prop `crew: Crew`. Con null, empty state. |
| `DirectoryPage.jsx` | `src/components/DirectoryPage.tsx` | Directory filtrable (genérico). Acepta `{ entities, entityType }`. |
| `LabelProfile.jsx` | `src/components/LabelProfile.tsx` | Como CrewProfile pero para Label. |
| `NotFoundPage.jsx` | `src/components/NotFoundPage.tsx` | 404 tipográfico. |
| `SearchResultsPage.jsx` | `src/components/SearchResultsPage.tsx` | Filtros por tipo, empty state. Acepta `{ results, query }`. |
| `StaticPage.jsx` | `src/components/StaticPage.tsx` | Template para privacy/terms/methodology. Acepta `{ title, content }`. |
| `TrackPage.jsx` | `src/components/TrackPage.tsx` | Acepta prop `track: Track`. |
| `UserListPage.jsx` | `src/components/UserListPage.tsx` | User list pública. Acepta `{ list: UserList, items: Array<Entity> }`. |
| `Faq.jsx` | `src/components/Faq.tsx` | Expandable FAQ. Acepta prop `items: Array<{q, a}>`. |

**Regla de data:** si el componente en v3 tiene mock data hardcoded, conservarlo
como default prop value. El wiring a Supabase viene después.

## Tarea 4 — Crear las rutas en App Router

Agregar páginas nuevas bajo `src/app/`. Cada una como **server component**
que importa el TSX correspondiente y le pasa data (con mock por ahora si
falta query).

| Ruta | File | Componente | Fuente de data |
|---|---|---|---|
| `/about` | `src/app/about/page.tsx` | `<AboutPage />` | static |
| `/auth` | `src/app/auth/page.tsx` | `<AuthPage />` | static |
| `/compare` | `src/app/compare/page.tsx` | `<CompareView entities={[]} />` | empty (por ahora) |
| `/crews/[slug]` | `src/app/crews/[slug]/page.tsx` | `<CrewProfile crew={null} />` | TODO: `getCrewBySlug` cuando tengamos crews populated |
| `/directory/[type]` | `src/app/directory/[type]/page.tsx` | `<DirectoryPage entities={[]} entityType={type} />` | placeholder — útil para producers/journalists/etc. |
| `/labels/[slug]` | `src/app/labels/[slug]/page.tsx` | `<LabelProfile label={null} />` | TODO query |
| `/search` | `src/app/search/page.tsx` | `<SearchResultsPage query={searchParams.q} results={[]} />` | Hook a query `src/lib/queries/search.ts` que ya existe |
| `/privacy` | `src/app/privacy/page.tsx` | `<StaticPage title="Privacidad" content={...} />` | Reciclar texto de `08-Legal-Compliance/privacy-policy-draft.md` |
| `/terms` | `src/app/terms/page.tsx` | `<StaticPage title="Términos" content={...} />` | Reciclar `08-Legal-Compliance/terms-draft.md` |
| `/methodology` | `src/app/methodology/page.tsx` | `<StaticPage title="Metodología" content={...} />` | Placeholder con texto corto |
| `/tracks/[slug]` | `src/app/tracks/[slug]/page.tsx` | `<TrackPage track={null} />` | TODO query |
| `/u/[user]/lists/[list]` | `src/app/u/[user]/lists/[list]/page.tsx` | `<UserListPage list={null} items={[]} />` | TODO query |

**Para `not-found.tsx`** (Next.js convention): crear `src/app/not-found.tsx`
que renderiza `<NotFoundPage />`. Esta captura todos los 404 globales.

**`generateMetadata`** por ruta dinámica (igual que `/artists/[slug]`):
title + description mínimas. Ver `src/app/artists/[slug]/page.tsx` como template.

## Tarea 5 — Actualizar `Nav.tsx` chip "ENTRAR" → ruta `/auth`

El chip de Nav.tsx hoy apunta a `setView('join')`. Con routing real, cambiarlo
a Link hacia `/auth`.

```tsx
// Antes:
<a className="dm-chip" onClick={() => setView('join')}>ENTRAR</a>
// Después:
<Link href="/auth" className="dm-chip">ENTRAR</Link>
```

(Si `Nav.tsx` ya no recibe `setView` post-Sprint-2 y usa `useRouter`, solo
agregá el Link.)

## Tarea 6 — NO hacer (importante)

- **NO sobrescribir** ninguno de estos archivos existentes: `page.tsx`,
  `Nav.tsx` (excepto el chip mencionado), `HomePage.tsx`, `ArtistPage.tsx`,
  `ReleasePage.tsx`, `ArticlePage.tsx`, `CityPage.tsx`, `EventPage.tsx`,
  `Footer.tsx`, `CommandPalette.tsx`, `EntityCard.tsx`, `PlatformLinks.tsx`,
  `OnboardingPage.tsx`, `ProfilePage.tsx`, `VenuePage.tsx`, `VenuesListing.tsx`,
  `EraPage.tsx`, `Comments.tsx`. Tienen ediciones de Sprint 2 que NO debemos perder.
- **NO portar**: `MessagesPage.jsx`, `NotificationsPage.jsx`, `ShopPage.jsx`,
  `ProductPage.jsx`, `SellerDashboard.jsx`, `MembershipPage.jsx`,
  `tweaks-panel.jsx`, `CVExportModal.jsx` (NO son MVP — ver `01-Product/mvp-scope.md`).
- **NO portar** los modales `ClaimCreditModal.jsx`, `ContributeModal.jsx`,
  `PhotoUploadModal.jsx` en este sprint. Los porteamos cuando el flow de
  contribuciones esté wireable (post Sprint 6+). Sí podés portarlos como
  stubs sin handlers si querés, pero NO los wire en páginas todavía.
- **NO toques** `src/lib/ingest/`, `src/lib/queries/`, `src/lib/supabase.ts`,
  `src/lib/database.types.ts`, `src/lib/skills/`, `scripts/`, `supabase/migrations/`,
  `.github/`, `vercel.json`. Este sprint es solo componentes + rutas.
- **NO toques `globals.css`.** Los tokens del v3 son idénticos al v2 actual.
- **NO copies `venues-v3.css`** al repo. Venues es out-of-scope MVP.
- **NO introduzcas** el pattern `view/setView/localStorage` del SPA. Usar
  Next.js routing (`useRouter`, `Link`, `usePathname`).
- **NO commitees** al final. Luis revisa diff antes.

## Tarea 7 — Build check + smoke

```bash
cd 02-Engineering/website
npx tsc --noEmit   # TypeScript clean
npm run build      # Next.js build sin errores
```

Verificaciones manuales:
- `localhost:3000/about` → renderiza AboutPage
- `localhost:3000/auth` → renderiza AuthPage
- `localhost:3000/search?q=canserbero` → renderiza SearchResultsPage con query en UI
- `localhost:3000/privacy` → StaticPage con título "Privacidad"
- `localhost:3000/ruta-inventada-xyz` → NotFoundPage (vía `not-found.tsx`)

## Tarea 8 — Reporte de cierre

Formato estricto:

```
Hecho: [1 línea]
Save point (commits + push): done | skipped (no uncommitted)
Design v3 descomprimido a _Reference/: sí
.gitignore actualizado: sí

Componentes TSX portados (12/12):
  ✓ AboutPage, AuthPage, CompareView, CrewProfile, DirectoryPage,
    LabelProfile, NotFoundPage, SearchResultsPage, StaticPage,
    TrackPage, UserListPage, Faq

Rutas nuevas creadas:
  ✓ /about, /auth, /compare, /crews/[slug], /directory/[type],
    /labels/[slug], /search (updated), /privacy, /terms, /methodology,
    /tracks/[slug], /u/[user]/lists/[list], not-found.tsx

Componentes NO portados (respetando scope):
  - MessagesPage, NotificationsPage (deferidos post-MVP)
  - ShopPage, ProductPage, SellerDashboard, MembershipPage (legacy, ya purgados)
  - CVExportModal (no MVP)
  - ClaimCreditModal, ContributeModal, PhotoUploadModal (portear post Sprint 6)
  - tweaks-panel (dev tool)

TypeScript: clean (0 errors)
Build: clean
Preview smoke:
  /about       ✓
  /auth        ✓
  /search?q=X  ✓
  /privacy     ✓
  /xyz (404)   ✓

Issues encontrados: [list o "ninguno"]

Próximo paso sugerido: esperar Sprint 5 Spotify Stage 2 post-cooldown.
```

NO commit al final.
