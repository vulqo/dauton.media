# Estructura organizacional — Departamentos

**Owner:** Strategy/PM
**Status:** Live document
**Última actualización:** 2026-04-25

Dauton Media opera como una startup distribuida con un fundador (Luis) + agentes AI especializados por departamento. Cada departamento es un chat Cowork dedicado con su propio contexto, archivos de área y memoria.

---

## Cómo está estructurado

| # | Departamento | Chat Cowork | Folder primario | Folders secundarios | Misión en una línea |
|---|---|---|---|---|---|
| 1 | **Strategy & PM** | "Strategy/PM" (orchestrator) | `00-Executive/`, `01-Product/`, raíz | todo el repo (read-only para coordinar) | Mente maestra de orquestación. Coordina sin hacer producto. |
| 2 | **Product Architecture** | "Product Architecture" | `01-Product/`, `00-Executive/` | `03-Design/` (referencia) | Define visión, personas, scope, features priorizados. |
| 3 | **Engineering** | "Engineering" | `02-Engineering/` | `_Execution/sprints/` | Construye y mantiene la plataforma. |
| 4 | **Data & SEO** | "Data & SEO" | `05-Data/` | parte de `07-Marketing-Growth/` (SEO research) | Define qué APIs consumimos, qué tools SEO construimos, qué keywords. |
| 5 | **Business & Legal** | "Business & Legal" | `09-Business/`, `08-Legal-Compliance/` | — | Modelos de monetización, financiamiento, legal review por feature. |
| 6 | **Community & Outreach** | "Community & Outreach" | `06-Operations/`, parte de `07-Marketing-Growth/` | — | Outreach a artistas, moderation, automation de comms, social. |

**No tienen chat Cowork dedicado pero existen como folders:**
- `03-Design/` — design system, tokens, brand. Lo administra Luis directamente con Claude Design (separado de Cowork). Engineering y Product Architecture lo consultan como referencia.
- `04-Editorial/` — su rol original (editorial tradicional) está en revisión. Decisión pendiente del Product Architecture chat.

---

## Cómo se coordina

**Archivos compartidos que TODOS los chats leen al iniciar:**

1. `CLAUDE.md` — reglas de eficiencia globales
2. `COORDINATION.md` — estado vivo cross-area
3. `MEMORY.md` — decisiones tomadas
4. `ROADMAP.md` — qué se está construyendo
5. `TASKS.md` — board cross-area
6. `00-Executive/departments.md` (este archivo)
7. `memory/{su-area}.md` — memoria específica del área

**Reglas de comunicación:**

- Cada chat cierra con un update breve a `COORDINATION.md` si su trabajo afecta otra área.
- Tareas que necesitan a otro depto se postean en `TASKS.md` con tag de área.
- Decisiones grandes se documentan en `MEMORY.md` (sección historial).
- Strategy/PM consolida diariamente y resuelve conflictos cross-area.

**Ownership de archivos:**

- Cada folder tiene un README que dice quién lo dueña.
- Modificaciones a archivos de otro departamento requieren aviso en TASKS.md o COORDINATION.md.
- Los archivos en raíz (`COORDINATION.md`, `ROADMAP.md`, `TASKS.md`, `MEMORY.md`) son shared — cualquiera edita pero Strategy/PM los consolida.

---

## Detalle por departamento

### 1. Strategy & PM

**Quién:** Cowork orchestrator. Mano derecha del founder.
**Misión:** orquestar el avance de los otros 5 departamentos sin hacer su trabajo. Mantener el roadmap, coordinar bloqueos, traducir visión a sprints.
**No hace:** producto (eso lo hace Product Architecture), código (eso lo hace Engineering), pricing (Business & Legal), SEO (Data & SEO).
**Outputs típicos:** updates a COORDINATION.md/ROADMAP.md/TASKS.md, prompts para Claude Code, audits de gaps.

### 2. Product Architecture

**Quién:** chat Cowork dedicado a producto. Owner de la visión.
**Misión:** definir qué es Dauton Media, para quién, en qué orden, con qué features. Escribe la visión, las personas, el scope. Decide priorización entre departamentos a propuesta de cada uno.
**No hace:** implementación.
**Outputs típicos:** `00-Executive/product-vision.md`, `00-Executive/user-personas.md`, `01-Product/feature-specs/*.md`, `01-Product/mvp-scope.md` (revisado).

### 3. Engineering

**Quién:** chat Cowork técnico. Genera prompts para Claude Code.
**Misión:** implementar lo que Product Architecture aprueba. Mantener schema, workers, frontend, deploys.
**No hace:** decidir qué se construye (eso pasa por Product Architecture).
**Outputs típicos:** sprints en `02-Engineering/website/`, migraciones, prompts en `_Execution/sprints/`, audits técnicos.

### 4. Data & SEO

**Quién:** chat Cowork de data + market research.
**Misión:** identificar qué APIs consumir, qué keyword opportunities existen, qué SEO tools tiene sentido construir, qué data hace falta para qué feature. Bridge entre Engineering (qué se puede ingerir) y Product Architecture (qué crea valor).
**No hace:** implementar workers (Engineering) ni decidir scope final (Product Architecture).
**Outputs típicos:** `05-Data/api-docs/`, `05-Data/seo-tools-roadmap.md`, `05-Data/keyword-research.md`, `05-Data/source-catalog.md`.

### 5. Business & Legal

**Quién:** chat Cowork de monetización + cumplimiento legal.
**Misión:** definir cómo monetizamos cada feature, validar legalmente cada feature antes de implementar, llevar lista de research legal pendiente, gestionar pricing y modelos de revenue.
**No hace:** features (Product Architecture decide qué), implementación (Engineering hace).
**Outputs típicos:** `09-Business/monetization.md`, `09-Business/pricing-strategy.md`, `08-Legal-Compliance/feature-legal-review.md`, `08-Legal-Compliance/legal-research-list.md`.

### 6. Community & Outreach

**Quién:** chat Cowork de comunicación con artistas + moderation + social.
**Misión:** outreach a artistas (email masivo, claim flow), moderation de correcciones que llegan, automation de comms recurrentes, plan de social presence.
**No hace:** features de community como user-lists o comments (Product Architecture decide).
**Outputs típicos:** `06-Operations/artist-outreach.md`, `06-Operations/moderation-workflow.md`, `07-Marketing-Growth/social-automation-plan.md`, `07-Marketing-Growth/community.md`.

---

## Flujo típico de trabajo

1. **Product Architecture** define una nueva feature o caso de uso (ej. "calculadora de ingresos para fans").
2. **Strategy/PM** la agrega al `ROADMAP.md` y a `TASKS.md` con dependencias claras.
3. **Data & SEO** valida si tenemos la data + estima keyword opportunity.
4. **Business & Legal** revisa monetización (gratis o pago?) + legal compliance.
5. **Engineering** estima esfuerzo + implementa cuando llega su turno.
6. **Community & Outreach** prepara outreach o comms relacionados.
7. Al cerrar, cada depto actualiza su `memory/` y postea outcome en `COORDINATION.md`.

---

## Estado actual de los chats

| Depto | Chat | Status |
|---|---|---|
| Strategy & PM | activo | live (este chat) |
| Product Architecture | a abrir | bootstrap prompt en `_Execution/bootstrap-prompts/` |
| Engineering | a abrir | bootstrap prompt en `_Execution/bootstrap-prompts/` |
| Data & SEO | a abrir | bootstrap prompt en `_Execution/bootstrap-prompts/` |
| Business & Legal | a abrir | bootstrap prompt en `_Execution/bootstrap-prompts/` |
| Community & Outreach | a abrir | bootstrap prompt en `_Execution/bootstrap-prompts/` |

**Recomendación de orden de apertura:**
1. **Product Architecture primero** — sin visión clara, los demás departamentos trabajan a ciegas.
2. Después, los demás en paralelo: Engineering, Data & SEO, Business & Legal, Community & Outreach.
3. Strategy/PM (este chat) coordina todo en background.
