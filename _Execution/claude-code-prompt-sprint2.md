# Prompt para Claude Code — Sprint 2 (routing real + purga + wire)

**Cómo usar:** copia todo entre los `---` y pégalo en Claude Code con el
workspace apuntando a `/Users/luisfiguera/Downloads/Vulqo LLC/Projects/Dauton Media/`.

---

Hola, soy Luis. Sprint 1 quedó aplicado en DB (people=15, roles=17,
user_profiles.is_public). Cowork hizo además una purga parcial de legacy
(quitó imports de ShopPage/ProductPage/SellerDashboard en page.tsx, el tab
TIENDA en Nav.tsx y la sección DROPS en HomePage.tsx). Faltan 5 cosas en este
sprint. No commitees todavía — al final del sprint te diré yo cuándo.

## Tarea 1 — Borrar los 3 archivos huérfanos

Cowork removió los imports pero no pudo borrar los archivos desde su sandbox.
Bórralos tú:

```bash
cd 02-Engineering/website/src/components
rm ShopPage.tsx ProductPage.tsx SellerDashboard.tsx
```

Verifica que nada en `src/` los referencia (no debería):

```bash
grep -rn -iE "ShopPage|ProductPage|SellerDashboard" src/
```

## Tarea 2 — Arreglar los errores TS en search.ts

`src/lib/queries/search.ts` línea 43 y 60 tenían `TS2352: Conversion of type
'{ name: any; slug: any; }[]' to type '{ name: string; slug: string; }' may
be a mistake...`. Si todavía están, corrígelos con el patrón correcto:
Supabase nested select `cities:origin_city_id(name, slug)` devuelve un objeto
(o array según la versión). Revisa cómo lo tipaste y alinéalo con la response
real. `npx tsc --noEmit` debe salir limpio al final.

## Tarea 3 — Migrar a Next.js routing real (App Router)

Hoy `page.tsx` es un switcher con `useState` + `localStorage` + el truco
`viewName:viewSlug`. Esto no escala para SEO y el MVP exige sitemap dinámico
+ structured data por entidad (`01-Product/mvp-scope.md` → sección "SEO and
distribution").

Migra a App Router real. Estructura objetivo mínima:

```
src/app/
  layout.tsx            (ya existe — mantén)
  page.tsx              (home — server component fetcheando pillars)
  artists/
    page.tsx            (directory)
    [slug]/page.tsx     (artist profile — server component)
  releases/
    [slug]/page.tsx
  cities/
    page.tsx            (index — "CIUDADES" tab del Nav)
    [slug]/page.tsx
  events/
    [slug]/page.tsx
  articles/
    [slug]/page.tsx
  search/
    page.tsx            (search results con ?q=)
```

Reglas de esta migración:

- Páginas que hacen queries deben ser **server components** (async functions,
  fetching con `getPeople`/`getPersonBySlug` en el server). Los subcomponentes
  interactivos quedan con `'use client'`.
- **Mantén los nombres de componentes existentes** (`ArtistPage`, `HomePage`,
  etc.). Ellos reciben props de sus wrappers server. El componente sigue siendo
  client para interacciones, el wrapper server hace el fetch.
- `Nav.tsx` deja de recibir `view`/`setView` — usa `useRouter()` y
  `usePathname()` de `next/navigation` para el estado activo. El chip "ENTRAR"
  apunta a `/join`.
- `CommandPalette` al submit navega con `router.push('/search?q=' + q)`.
- Borra `page.tsx` root viejo con el switcher. Borra `const STORAGE_KEY = 'dm-view'`.
- `generateMetadata` por ruta dinámica (ej. en `artists/[slug]/page.tsx`) con
  title `{stage_name} — Dauton Media` y description del `bio_short`.

## Tarea 4 — Conectar `/artists/[slug]` a data real end-to-end

Esta es la prueba de que el wire funciona:

1. Server component en `app/artists/[slug]/page.tsx` llama `getPersonBySlug(slug)`.
2. Si `null` → `notFound()` de `next/navigation`.
3. Si existe → pasa el `person` como prop a `<ArtistPage />`.
4. `ArtistPage` hoy tiene mock data hardcoded (gallery, stats, bio larga,
   discografía). Reemplaza los campos que **sí tenemos en DB**:
   - `stage_name`, `slug`, `bio_short`, `is_venezuelan`, `status` (badge
     "FALLECIDO" si `status='deceased'`), city name via join, active_since
   - Para todo lo demás (releases, collabs, gallery, stats) **renderiza
     empty-state placeholder** con copy tipo `"SIN DATOS · PROXIMAMENTE"`
     alineado al DS. No inventes mock.
5. Breadcrumb: `DAUTON / {city?.name ?? 'VENEZUELA'} / ARTISTAS / {stage_name}`.

Smoke test: abre `localhost:3000/artists/canserbero` y
`localhost:3000/artists/apache`. Ambos deben cargar con bio, ciudad,
badge fallecido donde aplica.

## Tarea 5 — Reporte de cierre

Formato estricto:

```
Hecho: [1 línea]
Legacy files borrados: sí | no (razón)
TS errors: 0 | N (cuáles)
Routing migrado: páginas nuevas creadas = [lista], página vieja borrada = sí | no
/artists/[slug] end-to-end: ok | falló (razón)
Próximo paso sugerido: [1 línea]
```

## Scope explícito — NO hagas

- NO migres Shop/Product/Seller (borrados).
- NO migres Editorial, Venues, Membership a rutas reales todavía (no son MVP
  inmediato). Si están en el Nav como placeholders, déjalos como anclas `href="#"`
  con un comentario `// TODO: not in MVP scope`.
- NO hagas commit ni push — yo te digo cuándo.
- NO toques el schema — esta sprint es puro frontend.
