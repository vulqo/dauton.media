# 02-Engineering

**Owner principal:** Engineering
**Status:** activo

## Qué hay acá

Documentación técnica del stack + el código fuente del website.

## Archivos vigentes

| Archivo / folder | Owner | Status |
|---|---|---|
| `architecture.md` | Engineering | live |
| `data-model.md` | Engineering | live (sincronizado con migraciones aplicadas) |
| `stack.md` | Engineering | live |
| `api-strategy.md` | Engineering | live |
| `website/` | Engineering | repo Next.js + Supabase migrations |

## Subfolders

- `website/` — código Next.js del frontend + backend logic (workers, queries, skills).
- `website/supabase/migrations/` — fuente de verdad del schema. 9 migraciones aplicadas a 2026-04-25.

## Reglas

- Cambios al schema → nueva migración (NUNCA modificar migraciones aplicadas).
- Cambios al stack → documentar decisión en `memory/engineering.md` con justificación.
- Sprints se ejecutan a través de Engineering agent. Strategy/PM hace los commits + push.
- Código uncommitted al cierre de cada turno = OK; Strategy/PM consolida.
