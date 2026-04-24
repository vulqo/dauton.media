# memory/ — memoria por área

Cada chat de Cowork mantiene su propia memoria de área. Aquí guarda decisiones internas, contexto operativo, deuda técnica acumulada, lecciones aprendidas, lo que NO necesita estar en `MEMORY.md` global pero sí necesita persistir entre sesiones del mismo chat.

## Archivos

- `strategy-pm.md` — Strategy & PM (orchestrator)
- `product-architecture.md` — Product Architecture (visión + personas + scope)
- `engineering.md` — Engineering (sprints + deuda técnica + decisiones de stack)
- `data-seo.md` — Data & SEO (APIs evaluadas, keywords, tools roadmap)
- `business-legal.md` — Business & Legal (pricing, modelos, legal research)
- `community-outreach.md` — Community & Outreach (outreach, moderation, social)

## Reglas

- Cada chat lee SU archivo al iniciar.
- Cada chat escribe a SU archivo cuando aprende algo o cierra una decisión.
- Cambios que afecten a otros departamentos se reflejan también en `MEMORY.md` (raíz) o `COORDINATION.md`.
- Mantener entradas datadas. Cuando un archivo pasa 200 líneas, mover entradas viejas a `_Reference/memory-archive/{area}-{fecha}.md`.
