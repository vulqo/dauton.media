# Dauton Media — Instrucciones globales del proyecto

Este archivo lo lee TODO chat / agent del proyecto al iniciar. Aplica a Strategy/PM, Product Architecture, Engineering, Data & SEO, Business & Legal, Community & Outreach.

---

## Sobre el proyecto

Dauton Media es una plataforma para el rap hispanohablante con foco inicial en la diáspora venezolana (Miami, España, Colombia, USA latino). NO es archivo aburrido — es **tool + tech + community**: archivo público de artistas + herramientas útiles para fans / artistas / promotores / labels. NO somos editorial tradicional.

Owner: Luis Figuera (founder), via Vulqo LLC.
Launch target: octubre 2026.

---

## Reglas de eficiencia (NO NEGOCIABLES)

1. **No narres el proceso.** Nada de "Voy a ejecutar...", "Arranco en paralelo...". Ejecuta y reporta.

2. **No hagas recon exhaustivo cuando la tarea es quirúrgica.** Si la tarea es "agregar columna X", eso es 1 migración, no audit del repo.

3. **No llames "crítico" lo que no verificaste.** Confirma evidence antes de escalar.

4. **Una acción a la vez cuando hay dependencia.** Paraleliza sólo tareas verdaderamente independientes.

5. **Push back si algo es mala idea.** Sos especialista en tu área. No yes-man al founder.

6. **Reporte estructurado al cierre:**
   ```
   Hecho: [1 línea]
   Resultado: [3-5 líneas con hallazgos concretos]
   Próximo paso sugerido: [1 línea]
   ```

---

## Estructura del proyecto

```
/                              ← root
├── README.md                  ← overview
├── CLAUDE.md                  ← este archivo
├── COORDINATION.md            ← estado vivo cross-area
├── MEMORY.md                  ← decisiones tomadas + estado
├── ROADMAP.md                 ← qué se construye (v1 draft hasta Product Architecture lo actualice)
├── TASKS.md                   ← board cross-area
│
├── .claude/
│   └── agents/                ← 5 agents por departamento
│       ├── product-architecture.md
│       ├── engineering.md
│       ├── data-seo.md
│       ├── business-legal.md
│       └── community-outreach.md
│
├── memory/                    ← memoria por área (cada agent lee la suya)
│   ├── README.md
│   ├── strategy-pm.md
│   ├── product-architecture.md
│   ├── engineering.md
│   ├── data-seo.md
│   ├── business-legal.md
│   └── community-outreach.md
│
├── 00-Executive/              ← Strategy/PM + Product Architecture
├── 01-Product/                ← Product Architecture
├── 02-Engineering/            ← Engineering (incluye website/)
├── 03-Design/                 ← Design (Claude Design separado, repo es referencia)
├── 04-Editorial/              ← ⚠ replanteamiento pendiente (no somos blogs)
├── 05-Data/                   ← Data & SEO (incluye api-docs/, seed/)
├── 06-Operations/             ← Community & Outreach
├── 07-Marketing-Growth/       ← Community & Outreach + Data & SEO (SEO research)
├── 08-Legal-Compliance/       ← Business & Legal
├── 09-Business/               ← Business & Legal
├── _Execution/                ← work files (sprints, audits, scripts)
└── _Reference/                ← archivado + dev-tools docs
    └── dev-tools/
        └── claude-agents.md   ← cómo funcionan los agents
```

**Cada folder tiene un `README.md` que dice quién es dueño + status + reglas.**

---

## Orden de lectura al inicio (todos los agents)

1. `CLAUDE.md` (este archivo)
2. `COORDINATION.md` (estado vivo)
3. `MEMORY.md` (decisiones)
4. `ROADMAP.md` (qué se construye)
5. `TASKS.md` (board)
6. `memory/{tu-area}.md` (tu memoria específica)
7. `00-Executive/departments.md` (estructura organizacional)
8. Lo específico de tu área cuando la tarea lo requiera

---

## Reglas de coordinación cross-area

- Cada agent tiene su área. NO toques folders de otros sin coordinar.
- Cuando tu trabajo afecta otra área, postealo en `COORDINATION.md` con fecha.
- Tareas que requieren a otro depto se postean en `TASKS.md` con tag (`[ENG]`, `[PRODUCT]`, `[DATA-SEO]`, `[BIZ-LEGAL]`, `[COMMUNITY]`, `[STRATEGY]`).
- Decisiones grandes se reflejan en `MEMORY.md` (raíz) y en tu `memory/{tu-area}.md`.
- Strategy/PM consolida y resuelve conflictos cross-area.

---

## Política de commits (Strategy/PM)

- Cada cierre de sprint genera commits semánticos automáticos vía Desktop Commander (filesystem real del Mac).
- Commits granulares por área (db / website / ingest / docs).
- Push a `main` (único branch).
- Nunca `git push --force`.
- Cada cambio importante también va a `MEMORY.md` con fecha.

---

## Lo que NO hacemos (decisiones founder)

- No mezclar con SHO Companies, Vulqo, Hashery, Focus V — negocios separados.
- No somos editorial tradicional. No escribimos blogs.
- No hosteamos música ni letras — link-out a Spotify/Apple/YouTube/Genius.
- No proyectamos métricas específicas (ej. "1000 users en 3 meses"). Targets qualitativos o rangos.
- No paramos por perfeccionismo en Design — DS v3 está congelado hasta post-MVP.

---

## Estado del proyecto (snapshot)

Para detalle siempre actualizado: ver `MEMORY.md` y `COORDINATION.md`.

- Schema DB completo + 9 migraciones aplicadas.
- 81 people en DB · 76 con spotify_id · 2 enriched (Canserbero, Apache).
- 4 workers reales (Spotify, MB, Wikipedia, Genius) + 4 stubs.
- 23 rutas en App Router · 1 wired a data real.
- Spotify circuit breaker OPEN hasta ~22:00 ART 2026-04-25.
- 5 agents departamentales definidos en `.claude/agents/`.
- Visión de producto en recalibración — Product Architecture chat la cierra.
