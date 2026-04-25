# Memoria — Community & Outreach

**Owner:** Community & Outreach agent
**Misión:** outreach 1:1 a artistas + claim flow + moderation + social posting operativo (ejecuta calendario de Marketing & Growth).
**Scope reducido:** 2026-04-25. Marketing macro (brand, launch, content calendar, partnerships, growth analytics, AI stack) se separó al chat **Marketing & Growth** (`07-Marketing-Growth/`). Email discovery (workers + scraping) se movió a **Data & SEO**.

---

## Boundary clara

**Community & Outreach hace:**
- Outreach 1:1 a artistas (envío de emails personalizados, tracking de respuestas, follow-ups).
- Claim flow operativo (UX del proceso por el cual el artista reclama perfil).
- Moderation de correcciones (queue, SLA, escalation, takedowns).
- Social posting operativo (ejecuta el calendario que Marketing & Growth define; escribe posts; agenda; responde).

**Community & Outreach NO hace** (lo hace Marketing & Growth):
- Brand strategy, voice & tone macro, messaging frameworks.
- Launch plan, Dauton Day, partnerships con medios.
- Content calendar maestro, content pillars, narrativas a 6 meses.
- Growth analytics, KPIs cross-canal, performance reports.
- AI marketing stack (qué herramientas usamos, qué pagamos).
- Email newsletter strategy (Marketing define formato y cadencia; Community puede ejecutar envíos si toca).

**Community & Outreach NO hace** (lo hace Data & SEO):
- Email discovery automation (workers que sacan emails de fuentes públicas).
- Schema de `artist_contact_emails`.
- Programmatic SEO, schemas, sitemap.

---

## Estado al arrancar

### Inputs del founder ya capturados

- Outreach masivo a artistas con perfiles ya armados es prioridad post-Sprint-5 (cuando perfiles tengan data rica).
- Verificación = badge VIP. Artistas auto-registrados = clientes directos = tag especial. UX VIP vs regular es feature.
- Política: damos voz, no creamos contenido. Si AI escribe, voz configurable, no humanizada.
- Social presence MVP: reservar 7 handles + automation de posts desde data del archivo.
- NO somos blogs. NO foco editorial. Visualizaciones tipo timeline/mapa/grafo NO son prioridad — el founder lo descartó explícito. Para social hooks usá data del archivo (releases nuevos, eventos, milestones), no visualizaciones forzadas.
- Público primario: diáspora venezolana (Miami, España, Colombia, USA latino).

### Existing docs en folder propio (06-Operations)

- `06-Operations/admin-operations.md` — referencia ops.
- `06-Operations/moderation-workflow.md` — draft.
- `06-Operations/artist-outreach.md` v1 — flujo + 4 templates + cohorts + tracking + anti-spam (live).

### Docs de Marketing & Growth (referencia, no propios)

Vivos en `07-Marketing-Growth/`. Community los lee como input cuando ejecuta posting o outreach:

- `07-Marketing-Growth/community.md`
- `07-Marketing-Growth/social-automation-plan.md` — plan en 4 fases.
- `07-Marketing-Growth/launch-plan.md` — referencia.
- `07-Marketing-Growth/marketing-strategy-v1.md` — tesis + audiencias + 5 content pillars + 3 voces + funnel + KPIs.
- `07-Marketing-Growth/social-platform-playbook.md` — 12 plataformas con cadencias.
- `07-Marketing-Growth/email-marketing-strategy.md` — newsletter "Archivo Abierto" bi-semanal.
- `07-Marketing-Growth/ai-marketing-stack.md` — Tier 1 + Tier 2 stack.

**Si Community necesita modificarlos: postea en `TASKS.md` con tag `[MARKETING]` y espera respuesta del Marketing & Growth chat.** No los toca solo.

---

## Pendientes activos

- Reservar 7 handles sociales: IG, X, TikTok, YouTube, Spotify, Threads, Bluesky con `@dautonmedia`. Founder lo hace manual cuando tenga 10 min.
- Draft `06-Operations/claim-flow.md` — proceso del artista que reclama perfil.
- Definir SLA y rules concretas en `06-Operations/moderation-workflow.md` (draft → live).
- Plan operativo de social posting (cuando Marketing & Growth entregue calendar formal).

---

## Completados antes del scope reducido (2026-04-24)

- `06-Operations/artist-outreach.md` v1 — flujo + 4 templates (profile_ready, followup_unopened, claim_approved, profile_update) + cohorts + tracking (`artist_outreach_log`) + anti-spam rules.
- Marketing macro v1 (escrito mientras Community tenía scope amplio, ahora ownership de Marketing & Growth):
  - `07-Marketing-Growth/marketing-strategy-v1.md`
  - `07-Marketing-Growth/launch-plan.md` v2
  - `07-Marketing-Growth/ai-marketing-stack.md`
  - `07-Marketing-Growth/social-platform-playbook.md`
  - `07-Marketing-Growth/email-marketing-strategy.md`
- `06-Operations/email-discovery-playbook.md` — pipeline de discovery (ahora ownership de Data & SEO).

**Estos docs son starting point para Marketing & Growth y Data & SEO. Community los entrega como herencia, no como propios.**

---

## Decisiones tomadas

- 2026-04-23 · Tono Dauton: sobrio, autoritativo, sin emojis decorativos. Bilingüismo: ES primario + EN técnico para metadata (RELEASE, TRACK, etc.).
- 2026-04-23 · Plan social en 4 fases: Fase 0 (handles), Fase 1 (playlists Spotify propias), Fase 2 (post-automation desde DB), Fase 3 (podcast TTS + video shorts + newsletter).
- 2026-04-25 · Outreach es informativo + invita a participar, NO agresivo. Cero spam.
- 2026-04-25 · Scope reducido: marketing macro → Marketing & Growth chat. Email discovery → Data & SEO. Community queda lean: 1:1 + claim + moderation + posting.

---

## Templates de email (vivos en artist-outreach.md)

- "Tu perfil está listo, verifica si los datos son correctos" — email frío inicial.
- "Followup unopened" — recordatorio si no abrió.
- "Claim aprobado, ahora tienes control" — post-verificación.
- "Hay nueva info en tu perfil de Dauton" — automation post-ingestion.
- A crear: "Tu perfil está siendo visto" — engagement loop futuro.
- A crear: Crisis comms templates (data leak, takedown, etc.).

---

## Moderation rules (para definir)

- Correcciones auto-aprobables: ej. correcciones tipográficas en stage_name si el user es authenticated.
- Correcciones humano-required: data conflictos (ej. fechas de release contradicen Spotify).
- Takedown / right-to-be-forgotten flow: artista pide eliminación. Cuánto tarda, qué mantiene cached, qué se borra.
- SLA: 48h response inicial, 7 días resolución (a confirmar).

---

## Coordination workflow

- Email outreach copy/templates → coordinar con **Marketing & Growth** (voice consistency) + **Business & Legal** (CAN-SPAM, GDPR).
- Email discovery / scraping de fuentes → **Data & SEO** lo dueña; Community recibe los emails y los usa.
- Claim flow → **Engineering** (endpoints), **Product Architecture** (UX).
- Moderation rules → **Business & Legal** (legal exposure), **Engineering** (queue logic).
- Social automation triggers → **Data & SEO** (qué events de DB triggean posts) + **Marketing & Growth** (qué se postea, calendar).
- Social posting operativo → Community ejecuta calendar de Marketing & Growth, no inventa estrategia propia.

---

## Reglas operativas

- Mantener tono establecido por Marketing & Growth (no inventar voz propia en outreach masivo).
- Personalizar con campos dinámicos (stage_name, ciudad, último release). Email genérico = email muerto.
- A/B test cuando vayamos a campañas grandes (post-MVP) — coordinar con Marketing.
- Trackear response rate por template y reportar a Marketing & Growth para feedback de copy.
