# Claude Agents (Subagents) — Setup y uso

**Última actualización:** 2026-04-25 · Strategy/PM
**Fuente:** [Claude Code: Subagents](https://code.claude.com/docs/en/sub-agents) · [Agent Teams](https://code.claude.com/docs/en/agent-teams) · [Agent SDK](https://platform.claude.com/docs/en/agent-sdk/overview)
**Aplicación en este proyecto:** definir 5 agents departamentales (Product Architecture, Engineering, Data & SEO, Business & Legal, Community & Outreach).

---

## Resumen

Subagents son agents especializados de Claude Code, definidos como archivos Markdown con frontmatter YAML en `.claude/agents/{name}.md`. Cada uno tiene su propio system prompt + tools restringidas + contexto inicial. Se invocan vía `/agents` selector o CLI `claude --agent={name}`.

**No confundir con:**
- **Agent SDK** — para deployment formal, hosting, permission auditing. Es producción enterprise.
- **Cowork chats** — son sesiones aisladas pero no necesariamente agents formalmente definidos. Sí pueden invocar subagents.

---

## Setup correcto

### 1. Estructura de archivos

```
{project-root}/
└── .claude/
    └── agents/
        ├── product-architecture.md
        ├── engineering.md
        ├── data-seo.md
        ├── business-legal.md
        └── community-outreach.md
```

### 2. Frontmatter YAML obligatorio

```yaml
---
name: "Product Architecture"
description: "Define visión, personas, scope, features priorizados"
model: inherit  # usa el mismo modelo del chat principal
tools: [Read, Grep, Glob, WebSearch, Write, Edit]
permissionMode: read-write
---
```

### Campos clave

- **`name`** — display name del agent.
- **`description`** — corto, dice qué hace. Aparece en `/agents` selector.
- **`model`** — `inherit` o modelo específico (`claude-opus-4-6`, `claude-sonnet-4-6`, etc.). `inherit` recomendado para evitar lock-in.
- **`tools`** — lista de tools permitidas. Filtra qué puede hacer. Si no incluís `Bash`, no puede ejecutar shell. Si no incluís `Write`, no puede escribir archivos.
- **`permissionMode`** — `read-only` | `read-write` | `restricted`.

### 3. Body del archivo (system prompt)

Después del frontmatter, prosa Markdown que actúa como system prompt del agent. Patrón recomendado:

```md
You are the **{Department} Agent** for Dauton Media.

## On every startup, read in order:
1. /Users/.../CLAUDE.md
2. /Users/.../COORDINATION.md
3. /Users/.../MEMORY.md
4. /Users/.../ROADMAP.md
5. /Users/.../memory/{your-area}.md
6. (other area-specific docs)

## Your mission
{descripción clara, 2-3 frases}

## Your responsibilities
- Bullet 1
- Bullet 2

## What you DO NOT do
- Otra área lo hace, no toques X
- No tomes decisiones que correspondan a Y
```

### 4. Auto-load de archivos compartidos

NO hay campo `contextFiles` en el frontmatter. La forma de "obligar" a leer archivos al inicio es escribirlo en el body del system prompt como parte de las instrucciones. Cada agent debe arrancar con:

> "On every startup, read in order: CLAUDE.md, COORDINATION.md, MEMORY.md, ROADMAP.md, TASKS.md, memory/{your-area}.md"

---

## Invocación

### Desde Claude Code CLI
```bash
claude --agent=product-architecture
```

### Desde Cowork UI
- Comando `/agents` muestra selector visual.
- Cada agent abre una nueva sesión aislada.

### Cambio de agent dentro de Cowork
- `/agents` y seleccionás otro.
- El nuevo agent NO comparte contexto del chat anterior — lee desde files.

---

## Coordinación entre agents

**No hay sistema formal cross-agent. Coordinación vía filesystem:**

- Archivos compartidos: `COORDINATION.md`, `ROADMAP.md`, `TASKS.md`, `MEMORY.md`.
- Cada agent escribe outcomes en `COORDINATION.md` cuando afecta a otra área.
- Agents NO pueden invocar otros agents directamente (no hay tool `InvokeAgent`).
- El usuario (founder) es el "router" entre agents: cierra un agent, abre otro con contexto fresco vía files.
- Strategy/PM (este chat) actúa como dispatcher humano-asistido.

---

## Limitaciones a tener en cuenta

1. **Cada agent es una sesión nueva** cuando se invoca. No mantiene historial entre invocaciones.
2. **Memory persistente** = solo los archivos en filesystem. El agent debe leerlos al inicio (por eso el patrón "On every startup, read...").
3. **Tools restringidas** son enforcement real — si limitás `tools: [Read, Grep]`, el agent no puede escribir aunque el system prompt diga que sí.
4. **No hay queue inter-agent** — si Engineering produce algo que Business & Legal debe revisar, debe quedar marcado en TASKS.md y el founder abre Business & Legal y le indica.
5. **Costo**: cada agent invocado consume tokens del plan del usuario. Múltiples agents corriendo en paralelo multiplican consumo.

---

## Best practices aprendidas

1. **Body del agent file debe ser denso pero corto** — 100-300 líneas máximo. Demasiado texto satura el system prompt y reduce calidad de output.
2. **Repetir reglas críticas** ("DON'T do X") explícitamente. Los agents tienden a expandir scope si no se les pone freno.
3. **Definir output expected** en el system prompt — qué archivos debe crear, qué formato.
4. **Reglas de coordinación al final del body** — qué hace al cerrar trabajo (postea a COORDINATION.md, etc).
5. **Versionar `.claude/agents/`** en git — cambios en agents afectan calidad downstream.
6. **Limitar tools al mínimo necesario** — `Read+Grep+Glob` para agents puramente de research; solo agents de implementación tienen `Bash+Write+Edit`.

---

## Referencias oficiales

- [Sub-agents](https://code.claude.com/docs/en/sub-agents)
- [Agent Teams (experimental)](https://code.claude.com/docs/en/agent-teams)
- [Agent SDK](https://platform.claude.com/docs/en/agent-sdk/overview)
- [The AI Agent Factory](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/general-agents)

---

## Setup hecho en Dauton Media

Ver `.claude/agents/`:
- `product-architecture.md` — visión, personas, scope
- `engineering.md` — implementación técnica
- `data-seo.md` — APIs, keywords, SEO tools
- `business-legal.md` — monetización, financiamiento, legal review
- `community-outreach.md` — outreach artistas, moderation, social

Strategy/PM (chat principal) NO es un agent — es el chat orchestrator default desde donde se invocan los agents.
