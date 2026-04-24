# _Execution — Dauton Media

**Owner principal:** Strategy/PM (orchestration), Engineering (sprint prompts)
**Propósito:** workspace operativo donde vive la ejecución del proyecto. Mientras la documentación departamental (00-09) dice **qué** y **por qué**, este folder dice **cómo** se ejecuta el trabajo día-a-día.

---

## Archivos clave vigentes (2026-04-25)

### Coordination + setup

- `cowork-handoff-prompt.md` — prompt original de bootstrap del proyecto
- `cowork-setup-guide.md` — guide de setup
- `credentials-checklist.md` — tracker de credenciales con valores reales
- `commit-sprints-3-4.sh` — script ya ejecutado (legacy, mantener como referencia)

### Playbooks (referencia operativa)

- `ingestion-playbook.md` — 7 stages de ingestion (Data & SEO + Engineering)
- `ingestion-deployment.md` — deploy guide

### Sprint prompts (snapshots inmutables después de pegar)

- `claude-code-prompt-sprint1.md` ... `claude-code-prompt-sprint6.md`
- `claude-code-prompt-sprint6.5.md`
- `claude-code-prompt-design-sync-v3.md`
- `claude-design-prompt-sprint1.md`

### Audits + research

- `design-vs-repo-audit.md` — audit Design v3 vs repo · 12 gaps identificados
- `product-architecture-audit.md` — audit producto · 10 secciones · input para Product Architecture chat
- `research-events-apis.md` — Bandsintown/Setlist.fm/Ticketmaster evaluados · veredicto Setlist.fm = Stage 7a

### Setup legacy (Claude Design v1)

- `claude-design-setup/` — assets para setup original de Claude Design
- `prompt-pack/` — pack de 12 prompts originales para Claude Design

---

## Reglas

- Prompts de sprint son **inmutables** después de pegar a Claude Code. Si cambian requirements, nuevo prompt con nombre nuevo.
- Audits son docs de un momento — no se actualizan. Nuevo audit = archivo nuevo con fecha.
- Scripts shell ejecutados quedan como referencia (transparencia > espacio).

## Quién escribe acá

- **Strategy/PM** — la mayoría de los archivos (prompts de sprint, audits, coordination scripts).
- **Engineering** — agrega sprint prompts cuando los redacta.
- **Data & SEO** — agrega research turns acá.
- **Otros agents** — pueden agregar audits/research si pertenece a operación cross-area.
