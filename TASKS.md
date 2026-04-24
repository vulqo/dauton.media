# TASKS — Board cross-area

**Propósito:** lista única de tareas pendientes que cruzan entre departamentos. Cada chat puede agregar, reclamar y cerrar tareas. Las tareas internas de un departamento se manejan en su propio folder, no acá.

**Última actualización:** 2026-04-25 · Strategy/PM

**Formato de cada tarea:**
```
- [ ] [AREA] título corto · owner · status · last-updated
      detail/notes opcionales
```

**Áreas disponibles:** `STRATEGY` `PRODUCT` `ENG` `DATA-SEO` `BIZ-LEGAL` `COMMUNITY` `DESIGN`

---

## Activas — alta prioridad

- [ ] [PRODUCT] Definir visión completa del producto · owner: Product Architecture chat · status: pending chat creation · 2026-04-25
      Bloquea: actualización de ROADMAP.md, mvp-scope.md, departments.md sección scope.
- [ ] [STRATEGY] Bootstrap prompts para 5 chats departamento · owner: Strategy/PM · status: in progress · 2026-04-25
      Files en `_Execution/bootstrap-prompts/`.

---

## Activas — media prioridad

- [ ] [ENG] Sprint 5 Stage 2 (Spotify discografía) · owner: Engineering · status: blocked by Spotify cooldown · 2026-04-25
      Cooldown estimado fin: 2026-04-25 ~22:00 ART. Scheduled task verifica.
- [ ] [DATA-SEO] Inventario inicial de SEO tools candidatas · owner: Data & SEO chat · status: pending chat creation · 2026-04-25
      Output esperado: lista de keyword opportunities + features SEO viables (calculadora de ingresos como ejemplo).
- [ ] [BIZ-LEGAL] Lista de legal research items · owner: Business & Legal chat · status: pending chat creation · 2026-04-25
      Output esperado: lista de cosas a investigar antes de cada feature público.
- [ ] [COMMUNITY] Email outreach templates a artistas con perfil armado · owner: Community & Outreach chat · status: pending chat creation · 2026-04-25
      Bloqueado hasta que perfiles estén ricos. Plan a tener listo para activar post-Sprint 5.

---

## Backlog — para revisar cuando haya capacidad

- [ ] [ENG] Sprint UI-fill: 5 rutas faltantes + 12 queries · ver `_Execution/design-vs-repo-audit.md`
- [ ] [ENG] Sprint 6 Continuación: Stage 4 Credits ejecución · post Stage 2
- [ ] [ENG] Sprint 8: Eventbrite ingestion · prioridad alta para diáspora
- [ ] [ENG] Sprint 9: YouTube transcripts (El Apartaco) · requiere decisión Anthropic API
- [ ] [STRATEGY] Reorganizar folders viejos (04-Editorial → re-purpose) · post-visión Product Architecture

---

## Cerradas recientes

- [x] [STRATEGY] Audit Design v3 vs repo · `_Execution/design-vs-repo-audit.md` · 2026-04-24
- [x] [STRATEGY] Audit de arquitectura de producto · `_Execution/product-architecture-audit.md` · 2026-04-24
- [x] [ENG] Sprint 6.5 Wikipedia + Genius + race fix · 2026-04-24
- [x] [ENG] Sprint 6 MusicBrainz scaffold · 2026-04-24
- [x] [ENG] Design Sync v3 — 12 componentes + 13 rutas · 2026-04-24

---

## Cómo trabajar este archivo

- Cualquier chat agrega tareas que afecten a otro área (ej. Engineering pide review de Legal).
- Una tarea solo se marca `[x]` cuando el outcome está commit en repo o documentado.
- Strategy/PM revisa diario y mueve cerradas a `MEMORY.md` cuando pasen 7 días.
- Si una tarea bloquea otra, marcar dependencia en notes.
