# Prompt para Claude Design — Sprint 1 paralelo (MVP filter + export completo)

**Cómo usar:** copia todo entre los `---` y pégalo en Claude Design (la sesión
donde vive tu Design System).

---

Hola, soy Luis. El MVP está avanzando del lado de código (schema aplicado en
Supabase, 15 pillars sembrados, homepage conectada a data real). Necesito que
el Design System se alinee con el **MVP scope real** antes de que Claude Code
siga migrando pantallas. El zip que me exportaste por última vez tenía 26
componentes; tu reporte reciente dice que hay **33**. Falta transparencia y
sobre todo filtro MVP.

## Contexto crítico — qué es y qué no es el MVP

El MVP ship en octubre 2026. Alcance:

**Páginas MVP (todas deben existir en el DS):**
- Homepage
- Artist directory + Artist profile
- Producer directory + Producer profile (derivado de people con role=producer)
- Label directory + Label profile
- Release profile
- Track page
- Crew profile
- City profile (+ Cities index)
- Event profile
- Compare view (2-4 entidades)
- Search results
- User profile (logged-in view)
- User list page (public shareable)
- 404
- Auth (login/signup)
- Static pages: About, Methodology, Style guide público, Credits, Privacy, Terms

**Fuera de MVP — marcar como `@deprecated — not in MVP scope` en SKILL.md:**
- Shop, Product, SellerDashboard, Membership (merch + premium no van en v1)
- Messages, Notifications (deferido post-MVP)
- Comments threaded (mvp-scope.md: "Comment system on entities. Deferred to
  avoid moderation burden at launch")
- CVExport modal (no tiene caso de uso en MVP)
- Venues, VenuesListing, VenuePage (mvp-scope: "Venues... Schemas exist but
  no UI" — no se muestran en v1)

## Tarea 1 — Alineación del SKILL.md con MVP

Edita `SKILL.md` y agrega al final una sección:

```md
## MVP scope (2026-04-23) — source of truth

Components and pages in this kit that ship in v1.0 (launch oct 2026):
[lista arriba]

@deprecated — not in MVP scope:
- Shop, Product, SellerDashboard, Membership: merch + premium are post-MVP
- Messages, Notifications: deferred
- Comments threaded: deferred (moderation burden)
- CVExport modal: no MVP use case
- Venues, VenuesListing, VenuePage: schema exists, no UI in v1

If a new component is requested, check this list first. If it's @deprecated,
push back and confirm with Luis before designing.
```

## Tarea 2 — Crear los componentes MVP faltantes

De los 33 que dices tener, los que sabemos que **no estaban en el zip anterior**
pero sí son MVP:

1. **404 page** — tipográfica, ligada al tono (ej. `"404 · RUTA NO ARCHIVADA"`),
   sugiere volver a `/` o a búsqueda.
2. **Auth page** (login/signup combo) — email + magic link + Google OAuth
   buttons. Sobrio, sin gradientes. El CTA "ENTRAR" del Nav apunta acá.
3. **SearchResults page** — filtros por tipo (Artista, Release, Productor,
   Crew, Label, Ciudad, Event, Artículo), grid de EntityCards por tipo, empty
   state, loading state.
4. **About** page (editorial long-form con la misma plantilla que Article).
5. **ClaimCreditModal** — diálogo para que un user reclame un perfil de Person
   (ej. "Soy Apache, este perfil es mío"). Flow: botón en ArtistPage →
   verification en 48h copy → confirm.
6. **ContributeModal** — diálogo para correction submission. Fields: entity
   (auto), field_name (dropdown), current_value (auto), suggested_value
   (input), reason, source_url. Copy sobrio, no gamificado.
7. **PhotoUploadModal** — Admin-only. Upload de press photo para entity, con
   campo `photo_credit` obligatorio (el SKILL ya dice "nunca foto sin crédito").

Para cada uno: diseña estados **empty / loading / error / success**.
Especialmente los modales necesitan estado `submitted → pending review → approved
→ rejected` con copy sobrio.

## Tarea 3 — Estados empty/loading/error para templates principales

Hoy los templates asumen data abundante. La realidad: al launch vamos a tener
15 pillars y 0 releases/tracks/collabs. Diseña:

- **Empty state por template**: HomePage, ArtistPage, ReleasePage, CityPage,
  EventPage, SearchResults. Copy tipográfico, no ilustración. Ej:
  `"SIN RELEASES · PRÓXIMAMENTE"` con monospace, color `--fg-3`.
- **Loading skeleton por template**: barras + bloques con shimmer sutil (sin
  emoji, sin spinner redondeado — bloques rectangulares alineados al grid).
- **Error state**: `"NO SE PUDO CARGAR · REINTENTAR"` + botón, tono sobrio.

Guárdalo como un preview nuevo: `preview/components-states.html`.

## Tarea 4 — Export limpio MVP-only

Cuando termines las 3 tareas anteriores, exporta un zip con:

- `SKILL.md` con la sección MVP scope agregada
- `README.md` reflejando el estado real
- `colors_and_type.css` (sin cambios esperados)
- `ui_kits/dauton-media-web/components/` **solo los componentes MVP**.
  Los `@deprecated` ponlos en `ui_kits/dauton-media-web/_deprecated/` para
  que queden trazables pero no se migren al repo.
- `preview/` completo (incluyendo `components-states.html` nuevo)
- `index.html` del kit actualizado para incluir los componentes nuevos
  (404, Auth, SearchResults, About) + los 3 modales.

Mándale el zip a Luis para que él lo pase a Cowork, y Cowork decide qué porta
Claude Code al repo.

## Reglas non-negotiables (repaso)

- Dark-only (`--bg-0: #0a0a0a`). Light mode sólo para editorial long-form.
- Zero emoji. Zero gradientes decorativos. Zero noise/patterns. Zero 3D.
- Sharp corners `0 / 2 / 4` px. Max `8`.
- Sin drop shadows para jerarquía — usa borders (`--border-1`) + bg shift.
- Uppercase + mono para metadata. Title case + display para entity names.
  Sentence case para body.
- No alojamos música — `PlatformLinks` es el ÚNICO punto donde se menciona
  audio.
- Color semántico estricto: `--yellow` = CTA, `--red` = alert/breaking/missing,
  `--teal` = entity-type/geo, `--cyan` = links/citations, `--navy` = verified.
- Foto sin crédito = inválido. Todos los templates que muestran imagen deben
  tener campo de credit visible.
