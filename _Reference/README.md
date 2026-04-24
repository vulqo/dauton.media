# _Reference/

**Owner principal:** todos (read-only para la mayoría)
**Status:** archivado + dev tools

## Qué hay acá

Material de referencia que el proyecto consulta pero NO modifica activamente. Dos categorías:

### Archived
Decisiones o documentos que ya no son operativos pero conservamos para contexto histórico.

### Dev tools
Documentación de herramientas que usamos para desarrollar (Cowork, Claude Code, Claude Agents, Desktop Commander). NO son APIs del producto — son herramientas internas del equipo.

## Estructura

```
_Reference/
├── README.md                          ← este archivo
├── company-structure-notes.md         ← decisiones de empresa post-MVP (archivadas)
├── design-system-v3/                  ← snapshot del DS v3 (gitignored)
└── dev-tools/                         ← docs de herramientas internas
    └── claude-agents.md               ← setup y uso de Claude Agents
```

## Reglas

- Material acá NO se modifica salvo por el owner del archivo original.
- Para agregar algo nuevo de "dev tool" (ej. Desktop Commander, Cowork features, etc.), seguir el formato de `dev-tools/claude-agents.md`.
- El folder `design-system-v3/` está gitignored — es snapshot externo, no fuente de verdad.
