# 03-Design

**Owner principal:** Luis (founder) + Claude Design (separado de Cowork)
**Consumed by:** Engineering, Product Architecture
**Status:** referencia

## Qué hay acá

Brand identity, design system, UX principles. Es la fuente visual del producto.

## Archivos vigentes

| Archivo | Owner | Status |
|---|---|---|
| `brand.md` | Design | live |
| `design-system.md` | Design | live |
| `ux-principles.md` | Design | live |

## Cómo se trabaja

- Iteración visual sucede en **Claude Design** (herramienta separada de Cowork).
- Cuando Design genera un nuevo export del DS, Strategy/PM hace audit vs repo y genera prompt para Engineering portar lo nuevo.
- Snapshots del design system v3 archivados en `_Reference/design-system-v3/` (gitignored).
- Engineering NO modifica componentes ya portados sin acuerdo con Design (regla de "1 dueño por momento" para evitar drift).

## Estado actual del DS

- Versión vigente: v3 (zip handoff).
- 41 componentes JSX. 12 portados a TSX en repo (Sprint Design Sync v3).
- 11 marcados @deprecated.
- 12 gaps identificados en `_Execution/design-vs-repo-audit.md`.

## Reglas

- Design v3 está **CONGELADO** hasta post-MVP (decisión founder 2026-04-25).
- Próxima iteración visual: post-launch v1.0.
