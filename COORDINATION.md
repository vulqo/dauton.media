# Dauton Media — Coordination Hub

**Propósito:** este archivo es el centro de coordinación entre todos los chats de Cowork (departamentos). Todo chat lee esto al inicio. Si algo cambia que afecta a otra área, se anota acá.

**Última actualización:** 2026-04-25 · sesión Strategy/PM

---

## Estado vivo

**Fase del proyecto:** MVP construction · semana 4 de 12.
**Launch target:** octubre 2026.
**Foco actual:** archivo + ingestion automatizada + perfiles ricos. Sin auth, sin moneitzación, sin tienda propia.

**Spotify circuit breaker:** OPEN (rate limit ban hasta ~22:00 ART 2026-04-25). Sprint 5 Stage 2 bloqueado hasta que cierre.

**Nivel de data actual:** 81 people en DB · 76 con spotify_id · 2 con MBID + datos ricos (Canserbero, Apache).

---

## Departamentos activos

| Depto | Chat | Folder primario | Status |
|---|---|---|---|
| **Strategy & PM** | actual (chat principal) | `00-Executive/`, `01-Product/`, raíz | activo |
| **Product Architecture** | agent listo en `.claude/agents/product-architecture.md` | `01-Product/`, `00-Executive/` | a invocar |
| **Engineering** | agent listo en `.claude/agents/engineering.md` | `02-Engineering/` | a invocar |
| **Data & SEO** | agent listo en `.claude/agents/data-seo.md` | `05-Data/` | a invocar |
| **Business & Legal** | agent listo en `.claude/agents/business-legal.md` | `09-Business/`, `08-Legal-Compliance/` | a invocar |
| **Community & Outreach** | agent listo en `.claude/agents/community-outreach.md` | `06-Operations/`, `07-Marketing-Growth/` | a invocar |

Cada chat de departamento se documenta en `00-Executive/departments.md`.

---

## Archivos centrales que TODOS los chats deben leer al iniciar

1. **`CLAUDE.md`** — reglas de eficiencia globales del proyecto
2. **`COORDINATION.md`** (este archivo) — estado cross-area
3. **`MEMORY.md`** — estado vivo + decisiones tomadas
4. **`ROADMAP.md`** — fuente única de roadmap MVP
5. **`TASKS.md`** — board cross-area de tareas pendientes
6. **`00-Executive/product-vision-v2.md`** — visión recalibrada del producto
7. **`00-Executive/user-personas.md`** — los 4+ roles de usuario
8. **`00-Executive/departments.md`** — estructura organizacional
9. **`memory/{area}.md`** — memoria específica de su área (cada chat lee la suya)

---

## Decisiones cross-area pendientes

- [ ] **CONFLICT [BIZ-LEGAL ↔ FOUNDER]: Subscripción Artista Pro contradice principio del plan-maestro.**
  - **Detectado por:** Business & Legal chat (en `09-Business/financing-tracks.md`, Track 2).
  - **Conflict:** plan-maestro.md principio #6 dice *"Free para el fan y el artista, siempre."* Pero el track de monetización Artista Pro ($8/mes · $80/año) implica que features pro requieren pago.
  - **Postura Business & Legal:** claim + edit básico queda free (sostiene el principio); Pro es add-on opcional con features no-esenciales (analytics privados, vanity URL, press kit). Es interpretation razonable.
  - **Postura alternativa:** mantener "artist always free for everything", tachar Track 2 entero, compensar con Tracks 3+ (manager tier) y 6+ (sponsorship/comisiones) más agresivos.
  - **Acción:** **founder decide antes de Fase 4 (Q1 2027)**. NO bloquea MVP launch — afecta roadmap de monetización post-launch.

(Esta sección lista decisiones que requieren input de múltiples áreas. Se mueven a `TASKS.md` cuando son ejecutables.)

---

## Bloqueadores activos

- **Spotify circuit breaker** abierto hasta ~22:00 ART 25-abr — bloquea Engineering Sprint 5 Stage 2.
- **Nuevos chats de departamento sin abrir** — Luis los abrirá manualmente con prompts que prepara Strategy/PM en Parte 2.

---

## Cambios recientes (last 5 entries — log)

- 2026-04-25 · Strategy/PM · **Estructura departamental formalizada.** 5 agents en `.claude/agents/` + memory por área en `memory/` + README por folder + CLAUDE.md actualizado. Listo para que founder abra los chats Cowork con cada agent.
- 2026-04-25 · Strategy/PM · Recalibración de visión iniciada. Visión NUEVA es responsabilidad del Product Architecture chat (a abrir).
- 2026-04-24 · Engineering · Sprint 6.5 cerrado · Wikipedia + Genius scaffolded · race fix Sprint 4 aplicado.
- 2026-04-24 · Engineering · Sprint 6 cerrado · MusicBrainz scaffold · 2 pillars enriched (Canserbero, Apache).
- 2026-04-24 · Engineering · Sprint 4 cerrado con incidente · Spotify rate limit ban 23h.

---

## Cómo actualizar este archivo

- **Cualquier chat** puede agregar una entrada al log de "Cambios recientes" cuando cierra una decisión o sprint.
- **Cualquier chat** puede agregar un bloqueador o decisión cross-area pendiente.
- **Strategy/PM** revisa y consolida diariamente. Mantiene este archivo limpio.
- Mantener log de cambios recientes a últimas 5 entradas. Lo demás se archiva a `MEMORY.md`.
