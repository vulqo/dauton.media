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
| **Product Architecture** | agent en `.claude/agents/product-architecture.md` | `01-Product/`, `00-Executive/` | a invocar |
| **Engineering** | agent en `.claude/agents/engineering.md` | `02-Engineering/` | a invocar |
| **Data & SEO** | agent en `.claude/agents/data-seo.md` | `05-Data/` (+ `06-Operations/email-discovery-playbook.md`) | activo |
| **Business & Legal** | agent en `.claude/agents/business-legal.md` | `09-Business/`, `08-Legal-Compliance/` | activo |
| **Community & Outreach** | agent en `.claude/agents/community-outreach.md` | `06-Operations/` (artist outreach + claim + moderation) | activo (scope reducido 2026-04-25) |
| **Marketing & Growth** | agent en `.claude/agents/marketing-growth.md` | `07-Marketing-Growth/` | a invocar (separado de Community 2026-04-25) |

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

- [x] **RESUELTO 2026-04-25 [BIZ-LEGAL ↔ FOUNDER]: Subscripción Artista Pro — Opción A aprobada.**
  - Founder eligió: claim + edit básico queda **free para todo artista** (mantiene principio). Pro es **add-on opcional** con features no-esenciales (analytics privados, vanity URL, press kit). El artista NUNCA necesita pagar para tener perfil + claim + edit + verificación.
  - Implicaciones:
    - Track 2 de `09-Business/financing-tracks.md` queda con esa interpretación explícita en su tier definition.
    - Pricing strategy se ajusta: las features Pro deben ser claramente NICE-TO-HAVE, no must-have.
    - Marketing posiciona "Tu perfil, tu control, gratis" como mensaje permanente — Pro es solo extra.
  - Owner cierre: Business & Legal chat actualiza pricing-strategy.md + financing-tracks.md con esta decisión final.

(Esta sección lista decisiones que requieren input de múltiples áreas. Se mueven a `TASKS.md` cuando son ejecutables.)

---

## Bloqueadores activos

- **Spotify circuit breaker** abierto hasta ~22:00 ART 25-abr — bloquea Engineering Sprint 5 Stage 2.
- **Nuevos chats de departamento sin abrir** — Luis los abrirá manualmente con prompts que prepara Strategy/PM en Parte 2.

---

## Cambios recientes (last 5 entries — log)

- 2026-04-25 · Strategy/PM · **Marketing & Growth separado de Community & Outreach.** 6º agent creado en `.claude/agents/marketing-growth.md` + memory + onboarding prompt. Community queda lean: outreach 1:1 + claim + moderation + social posting operativo. Marketing toma: brand strategy, launch plan, content calendar, partnerships con medios, growth analytics, AI marketing stack. Email discovery operativo movido a Data & SEO scope. Decisión: Business & Legal siguen juntos hasta triggers (3+ partnerships activos, 3+ legal items críticos, primer feature controversial, capital raise serio).
- 2026-04-25 · Data & SEO · **Eventbrite research + Spotify decision cerrados.** ⚠ Eventbrite API search global removida 2019 — tool #4 sube de scope a arquitectura híbrida. Spotify scraping `open.spotify.com` **eliminado** del set viable: 86M bans dic 2025, ToS enforcement activo. Calculadora MVP usa strategy (a) bandas + upgrade Soundcharts ($10-50/mes) post-budget. Docs: `api-docs/eventbrite.md`, `seo/decisions/spotify-listeners-workaround.md`. Roadmap v0.3 actualizado.
- 2026-04-25 · Data & SEO · **Sistema SEO operativo formalizado** en `05-Data/seo/` (6 docs: README, stack, keyword-framework, content-engine, audit-cadence, features-creativas). Cubre: stack tools sin GSC, AI/automation stack, 11 APIs pendientes con instrucciones, programmatic SEO i18n (es/en/pt), 17 audits automatizados, 11 features creativas adicionales al roadmap.
- 2026-04-25 · Data & SEO · **SEO tools roadmap v0.2** entregado en `05-Data/seo-tools-roadmap.md`. 8 tools priorizadas (3 P1, 3 P2, 2 P3) + 2 deprioritized (mapa/timeline post-feedback founder).
- 2026-04-25 · Strategy/PM · **Estructura departamental formalizada.** 5 agents en `.claude/agents/` + memory por área en `memory/` + README por folder + CLAUDE.md actualizado. Listo para que founder abra los chats Cowork con cada agent.
- 2026-04-25 · Strategy/PM · Recalibración de visión iniciada. Visión NUEVA es responsabilidad del Product Architecture chat (a abrir).
- 2026-04-24 · Engineering · Sprint 6.5 cerrado · Wikipedia + Genius scaffolded · race fix Sprint 4 aplicado.
- 2026-04-24 · Engineering · Sprint 6 cerrado · MusicBrainz scaffold · 2 pillars enriched (Canserbero, Apache).

---

## Cómo actualizar este archivo

- **Cualquier chat** puede agregar una entrada al log de "Cambios recientes" cuando cierra una decisión o sprint.
- **Cualquier chat** puede agregar un bloqueador o decisión cross-area pendiente.
- **Strategy/PM** revisa y consolida diariamente. Mantiene este archivo limpio.
- Mantener log de cambios recientes a últimas 5 entradas. Lo demás se archiva a `MEMORY.md`.
