# Audit · Design System v3 vs Repo actual

**Fecha:** 2026-04-24
**Autor:** Cowork
**Input:** index.html interactive prototype del design system v3 + snapshot del repo
**Fuente de verdad design:** el MVP_ROUTES del `ui_kits/dauton-media-web/index.html`

---

## Resumen ejecutivo

- Design system define **30 vistas MVP** + 11 @deprecated. Repo tiene **21 rutas** + **31 componentes TSX** (4 de los cuales son @deprecated y deben revisarse).
- **Gaps críticos identificados: 12** (8 rutas MVP faltantes + 4 componentes sin portar).
- **Data wiring real: 1/21 páginas** (solo ArtistPage consume data de Supabase). Resto en mock o empty state.
- **Modales MVP:** 0/3 portados (ClaimCreditModal, ContributeModal, PhotoUploadModal).
- **Páginas static:** 4/7 con ruta creada pero sin contenido real.

**Veredicto:** el diseño está MUY adelantado al código. Hay aproximadamente 2 sprints de UI-only work para cerrar el gap estructural (rutas + wiring mínimo), y luego el content + auth wiring por separado.

---

## 1. Design system — todo lo que define (inventario completo)

### 1.1 MVP_ROUTES (30 views)

```
Core (11):          home, artist, release, track, article, city, cities-index,
                    event, profile, label, crew
Directories (4):    dir-artists, dir-producers, dir-labels, venues
Archive/discovery(3): compare, search, user-list
Auth (3):           auth, login, signup
Static (7):         about, methodology, credits, privacy, terms, styleguide, 404
```

### 1.2 Aliases (UX shortcuts)

```
ciudades → city          artists → dir-artists
tienda → shop            producers → dir-producers
drops → shop             labels → dir-labels
inbox → notifications    editorial → article  (⚠ no hay editorial-index real)
pro → membership
```

### 1.3 Componentes MVP (cargados en `<script>` tags + usados en rutas)

```
Chrome (7):         Nav, Footer, EntityCard, PlatformLinks, CommandPalette,
                    Faq, tweaks-panel (dev tool, no production)

Modales MVP (3):    ClaimCreditModal, ContributeModal, PhotoUploadModal

Templates MVP (19): HomePage, ArtistPage, ReleasePage, ArticlePage, CityPage,
                    CitiesIndexPage, EventPage, ProfilePage, AuthPage,
                    SearchResultsPage, AboutPage, NotFoundPage,
                    DirectoryPage, LabelProfile, CrewProfile, TrackPage,
                    CompareView, UserListPage, StaticPage, VenuesListing*
```
*VenuesListing está en MVP del design pero `mvp-scope.md` lo excluye — resolver.*

### 1.4 Componentes @deprecated (en design, NO MVP)

```
Comments, CVExportModal, VenuePage, OnboardingPage, MembershipPage,
EraPage, ShopPage, ProductPage, SellerDashboard, MessagesPage,
NotificationsPage
```

---

## 2. Repo actual — todo lo que existe

### 2.1 Componentes TSX (31 total en `src/components/`)

**MVP portados (desde design):**
```
AboutPage, ArtistPage, ArticlePage, AuthPage, CityPage, CommandPalette,
CompareView, CrewProfile, DirectoryPage, EntityCard, EventPage, Faq,
Footer, HomePage, LabelProfile, Nav, NavWrapper, NotFoundPage,
PlatformLinks, ProfilePage, ReleasePage, SearchResultsPage, StaticPage,
TrackPage, UserListPage
```

**Auxiliares (wrappers client/server split):**
```
NavWrapper, OnboardingPageWrapper
```

**@deprecated según design pero presentes en repo (4):**
```
Comments, EraPage, VenuePage, VenuesListing, OnboardingPage
```
(OnboardingPage todavía vive porque `/join` existe desde Sprint 2.)

### 2.2 Rutas App Router (21 total)

**Root + chrome:**
```
/ (HomePage), /not-found (NotFoundPage), /auth (AuthPage)
```

**Dinámicas (entidades):**
```
/artists/[slug]       ✓ wired a Supabase
/articles/[slug]      mock
/cities/[slug]        mock
/crews/[slug]         mock
/events/[slug]        mock
/labels/[slug]        mock
/tracks/[slug]        mock
/u/[user]/lists/[list] mock
```

**Index / listing:**
```
/artists (page.tsx)   existe pero sin comparar vs design dir-artists spec
/cities (page.tsx)    existe
/directory/[type]     genérico de fallback (creado en Sprint DS v3)
```

**Static:**
```
/about, /compare, /join, /methodology, /privacy, /search, /terms
```

### 2.3 Queries Supabase wireadas (3)

```
src/lib/queries/
  people.ts    (getPeople, getPersonBySlug)  ← usado en /artists/[slug]
  releases.ts  (exists, not yet consumed)
  search.ts    (exists, partial use)
```

---

## 3. Gap analysis detallado — design vs repo

### 3.1 Rutas MVP que FALTAN en repo (8)

| Design route | Expected path | Status | Priority | Blocker |
|---|---|---|---|---|
| `release` | `/releases/[slug]` | ❌ ruta ausente | **P0 CRÍTICO** | componente existe, solo falta page.tsx + wiring |
| `dir-producers` | `/producers` | ❌ | **P0** (MVP explicit) | necesita page.tsx que use DirectoryPage + query people con role=producer |
| `dir-labels` | `/labels` (index) | ❌ | **P0** (MVP explicit) | page.tsx + query de labels |
| `crews` index | `/crews` (index) | ❌ | P1 | page.tsx + query crews (aún no hay crews en DB, scaffold placeholder) |
| `profile` index | `/u/[user]` | ❌ | P1 | page.tsx usando ProfilePage (hoy solo /u/[user]/lists/[list] existe) |
| `credits` | `/credits` | ❌ | P3 | page.tsx + contenido static |
| `styleguide` | `/styleguide` | ❌ | P3 (MVP lista "style guide público") | page.tsx exponiendo DS tokens |
| Editorial index | `/editorial` o `/articles` | ❌ | P2 | Nav tab apunta a "editorial" pero no hay listing page — hay que decidir si es listing o deferido a v2.0 post-editorial |

### 3.2 Componentes que FALTAN en repo (4)

| Design component | Status | Priority | Notas |
|---|---|---|---|
| `CitiesIndexPage` | ❌ no portado | P1 | `/cities/page.tsx` existe pero no sé si usa DirectoryPage genérico o algo distinto. Verificar. |
| `ClaimCreditModal` | ❌ | P2 | Para flow "reclamar perfil" en ArtistPage. Wire-blocked hasta auth real. |
| `ContributeModal` | ❌ | P2 | Para correction submission. Wire-blocked hasta auth real. |
| `PhotoUploadModal` | ❌ | P2 | Admin-only, para hero photos. Requiere Storage Supabase setup. |

### 3.3 Componentes EN REPO pero @deprecated en design (5)

Estos deben resolverse:

| Component | Status repo | Design says | Acción recomendada |
|---|---|---|---|
| `OnboardingPage` | activo en `/join` | @deprecated, AuthPage lo reemplaza | **301 redirect** `/join → /auth`, borrar TSX |
| `Comments` | TSX existe, no usado | @deprecated (post-MVP) | Dejar en repo como opt-in, no wirear. Sin uso hoy. |
| `EraPage` | TSX existe, no usado | @deprecated | **Borrar TSX** (no lo usamos) |
| `VenuePage` | TSX existe, no usado | @deprecated | **Borrar TSX** (Venues NO es MVP per mvp-scope) |
| `VenuesListing` | TSX existe, no usado | MVP del design PERO mvp-scope dice "no UI for venues in v1" | **Conflict**: resolver con Luis. Mi voto: borrar, alineado a mvp-scope. |

### 3.4 Data wiring gap — por ruta

| Route | Componente | Data source actual | Data source target | Gap |
|---|---|---|---|---|
| `/` | HomePage | `getPeople(limit=15)` partial | + featured releases, events feed, articles feed | **HIGH** — mock data hardcoded |
| `/artists/[slug]` | ArtistPage | `getPersonBySlug` ✓ | + releases, press_mentions, career_events, collabs | **HIGH** — solo bio renderiza, resto empty state |
| `/artists` | listing | — | `getPeople(role=artist)` | **HIGH** |
| `/releases/[slug]` | ReleasePage | **ruta no existe** | `getReleaseBySlug` + tracks + collabs | **CRÍTICO** |
| `/tracks/[slug]` | TrackPage | mock | `getTrackBySlug` + credits + platform links | **HIGH** |
| `/articles/[slug]` | ArticlePage | mock | `getArticleBySlug` + press_mentions | P2 (editorial deferido) |
| `/cities/[slug]` | CityPage | mock | `getCityBySlug` + artists in city + events | MEDIUM |
| `/cities` | index | ? (verificar) | `getCities` | MEDIUM |
| `/events/[slug]` | EventPage | mock | `getEventBySlug` + participants + setlists | MEDIUM |
| `/labels/[slug]` | LabelProfile | mock | `getLabelBySlug` + roster + releases | MEDIUM |
| `/labels` | ruta no existe | — | `getLabels` | P0 (MVP explicit) |
| `/crews/[slug]` | CrewProfile | mock | `getCrewBySlug` + members | MEDIUM |
| `/crews` | ruta no existe | — | `getCrews` | MEDIUM |
| `/producers` | ruta no existe | — | `getPeople(role=producer)` | P0 |
| `/u/[user]` | ruta no existe | — | `getUserBySlug` + sus lists | P1 |
| `/u/[user]/lists/[list]` | UserListPage | mock | `getUserListBySlug` + items resolved | P2 |
| `/search` | SearchResultsPage | `searchPeople` partial | + searchReleases, searchTracks, searchLabels | HIGH |
| `/auth` | AuthPage | static placeholder | Supabase Auth wiring | HIGH |
| `/compare` | CompareView | null entities | query N entities | LOW |
| `/about, /privacy, /terms, /methodology` | StaticPage | partial .md read | real content + react-markdown | MEDIUM |

### 3.5 Queries Supabase que FALTAN (12)

En `src/lib/queries/` solo hay `people.ts`, `releases.ts`, `search.ts`. Faltan:

```
tracks.ts         getTrackBySlug, searchTracks
cities.ts         getCities, getCityBySlug, getCityArtists
events.ts         getEvents, getEventBySlug, getEventParticipants
articles.ts       getArticles, getArticleBySlug, getArticlePressMentions
labels.ts         getLabels, getLabelBySlug, getLabelRoster
crews.ts          getCrews, getCrewBySlug, getCrewMembers
users.ts          getUserBySlug, getUserLists, getUserFavorites
user-lists.ts     getUserListBySlug, getUserListItems
collaborations.ts getArtistCollabs (junction helpers)
press.ts          getPressMentionsForEntity
career-events.ts  getCareerEventsForPerson
sources.ts        getSourcesForEntity
```

---

## 4. Inconsistencias DS vs mvp-scope.md

Algunas contradicciones que hay que resolver:

1. **VenuesListing** — design lo incluye en MVP, `mvp-scope.md` dice "Venues... Schemas exist but no UI in v1". **Mi voto: seguir mvp-scope, borrar del repo.**

2. **editorial alias** — design mapea `editorial → article`. No hay listing. Pero `mvp-scope.md` difirió editorial a v2.0. Nav actual tiene tab `EDITORIAL` que apunta a... nada claro. **Mi voto: eliminar tab EDITORIAL del Nav (ya lo diferimos), o renombrar a algo acorde con MVP.**

3. **Producer directory** — mvp-scope.md lista "Producer directory (includes dual-role artists)" — esto es P0. Design lo tiene como `dir-producers`. Repo no tiene ruta. **Crear `/producers`.**

4. **Track page** — ruta existe en repo, componente existe en design. Bien alineado pero sin wire.

5. **Style guide público** — mvp-scope.md lo lista como static page ("about, methodology, style guide (público)"). Design tiene `styleguide` route. Repo no. **Crear, exponer design tokens en una página pública.**

---

## 5. Resumen de gaps priorizados

### P0 — Blocker MVP (debe cerrarse antes del launch)

1. **Ruta `/releases/[slug]`** + wire a query releases.
2. **Ruta `/producers`** (index) + query `getPeople(role=producer)`.
3. **Ruta `/labels`** (index) + query labels.
4. **Wire queries faltantes** para las entidades core (tracks, cities, events, labels, crews). 12 archivos nuevos en `src/lib/queries/`.

### P1 — Importante pre-launch

5. **Ruta `/u/[user]`** (ProfilePage index).
6. **Ruta `/crews`** (index).
7. **HomePage conectada** a featured releases/events/articles real.
8. **ArtistPage expandida** — releases, press, career_events, gallery (post-Stage-2 cuando haya data).
9. **`CitiesIndexPage`** verificar si está bien portado o hay que crear.
10. **Purga deprecated components** (EraPage, VenuePage, VenuesListing) — housekeeping.
11. **Resolver `/join` vs `/auth`** — 301 redirect.

### P2 — Para functional MVP

12. **Supabase Auth wiring** en AuthPage.
13. **Portar 3 modales**: ClaimCreditModal, ContributeModal, PhotoUploadModal.
14. **Admin UI** `/admin/queue` + approval flow.
15. **Storage bucket** para PhotoUploadModal.

### P3 — Polish + static content

16. **CreditsPage**.
17. **StyleGuidePage** (expone tokens del DS).
18. **Contenido real** en privacy/terms/methodology + upgrade react-markdown.
19. **Deuda técnica bundle** (props `any`, etc.).

### NO MVP / decisión pendiente

- Editorial tab/listing → defer a v2.0.
- VenuesListing → borrar (contradice mvp-scope).
- Comments → defer.
- MessagesPage, NotificationsPage → defer.

---

## 6. Sprint propuesto: "Sprint UI-fill"

Un sprint consolidado que cierra los P0 + la mayor parte de P1 con Claude Code en 2-3h.

**Scope:**
- Crear las 4 rutas faltantes P0: `/releases/[slug]`, `/producers`, `/labels`, y `/crews`.
- Agregar la ruta P1 `/u/[user]`.
- Crear 12 archivos de queries en `src/lib/queries/` (tracks, cities, events, articles, labels, crews, users, user-lists, collaborations, press, career-events, sources).
- Wire data real en las 10 rutas dinámicas existentes (hoy mock).
- 301 redirect `/join → /auth` + borrar OnboardingPage TSX.
- Purga deprecated (EraPage, VenuePage, VenuesListing) con confirmación Luis.
- Verificar CitiesIndexPage porting.
- Eliminar tab EDITORIAL del Nav si Luis confirma defer.

**Data required (NO bloquea):**
- Muchas rutas van a mostrar empty states porque no hay data aún (crews, labels poblados, releases vendrán de Sprint 5 Stage 2). OK — el wire queda listo para cuando la data llegue.

**Dependencies:**
- No depende de cooldown Spotify.
- No depende de Sprints 5/6/6.5/7/8.
- Puede correr en paralelo con cualquiera.

---

## 7. Decisiones que requieren Luis

1. **VenuesListing**: ¿seguir mvp-scope (borrar) o seguir design (mantener)? Mi recomendación: **borrar**.
2. **Tab EDITORIAL en Nav**: ¿mantener como placeholder o sacar? Mi recomendación: **sacar** hasta que haya editorial real.
3. **`/join` vs `/auth`**: ¿redirect o mantener ambos? Mi recomendación: **301 redirect `/join → /auth` + borrar OnboardingPage**.
4. **Comments, EraPage components**: ¿borrar del repo o dejar opt-in? Mi recomendación: **borrar EraPage/VenuePage**, dejar Comments (se puede activar post-MVP).
5. **Sprint UI-fill vs esperar Sprint 5 Stage 2**: ¿arrancar en paralelo ahora o después de Stage 2? Mi recomendación: **arrancar ya**, cierra gaps estructurales sin depender de data.

---

*See also: `_Execution/claude-code-prompt-sprint6.5.md`, `01-Product/mvp-scope.md`, `MEMORY.md`*
