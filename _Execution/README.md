# _Execution — Dauton Media

**Propósito:** workspace operativo donde vive la ejecución del proyecto, separado de
la documentación de planning de los departamentos (00-09).

Mientras la documentación departamental dice **qué** es el producto y **por qué**,
este folder dice **cómo** se ejecuta el trabajo día-a-día.

---

## Estructura

```
_Execution/
├── README.md                          ← este archivo
└── claude-design-setup/               ← setup para Claude Design
    ├── README.md                      ← guía de uso del setup
    ├── notes-field.md                 ← contenido para "Any other notes?"
    └── assets-to-upload/              ← archivos para drag-and-drop
        ├── 01-logo-master-color.png
        ├── 02-logo-master-black.png
        ├── 03-logo-horizontal-color.png
        ├── 05-monograma-favicon.png
        ├── 06-manual-identidad-dauton-store.pdf
        └── 07-design-brief.pdf
```

---

## Cómo arrancar

### 1. Setup de Claude Design (YA)

Ir a `claude-design-setup/` y seguir el `README.md`. Te toma 10-15 minutos y deja
el design system configurado para todas las sesiones futuras.

### 2. Prompt pack para generación de pantallas (SIGUIENTE)

Después del setup exitoso, generaremos el prompt pack secuencial:

- FASE A: Brand evolution (3 prompts)
- FASE B: Core screens (5 prompts)
- FASE C: Editorial & user flows (3 prompts)
- FASE D: Shop integration (1 prompt)

Ese pack se guardará en `_Execution/prompt-pack/` una vez validemos el setup.

---

## Próximos sub-folders planificados

A medida que avancemos en la ejecución, este folder se irá poblando con:

- `prompt-pack/` — biblioteca de prompts para Claude Design
- `design-iterations/` — outputs de Claude Design guardados versionados
- `skills/` — skill definitions para Cowork y Claude Code
- `agents/` — configs de OpenClaw agents headless
- `decisions/` — ADRs (Architecture Decision Records)
- `CLAUDE.md` — rules file para Claude Code cuando exista el repo de código

---

*Ver `../README.md` para overview del proyecto completo.*
