# Memoria — Community & Outreach

**Owner:** Community & Outreach agent
**Misión:** outreach a artistas + moderation + automation comms + social presence.

---

## Estado al arrancar

### Inputs del founder ya capturados

- Outreach masivo a artistas con perfiles ya armados es prioridad post-Sprint-5 (cuando perfiles tengan data rica).
- Verificación = badge VIP. Artistas auto-registrados = clientes directos = tag especial. UX VIP vs regular es feature.
- Política: damos voz, no creamos contenido. Si AI escribe, voz configurable, no humanizada.
- Social presence MVP: reservar 7 handles + automation de posts desde data del archivo.
- Visualizaciones automáticas (timelines, mapas, grafo collabs) son hooks editoriales útiles para social. NO somos blogs.
- Público primario: diáspora venezolana (Miami, España, Colombia, USA latino).

### Existing docs en folder

- `06-Operations/admin-operations.md` — referencia ops.
- `06-Operations/moderation-workflow.md` — draft.
- `07-Marketing-Growth/community.md` — referencia.
- `07-Marketing-Growth/social-automation-plan.md` — plan en 4 fases (existe).
- `07-Marketing-Growth/launch-plan.md` — referencia.

## Pendientes activos

- Reservar 7 handles sociales: IG, X, TikTok, YouTube, Spotify, Threads, Bluesky con `@dautonmedia`. Founder lo hace manual cuando tenga 10 min.
- Crear `06-Operations/artist-outreach.md` — template + workflow.
- Crear `06-Operations/claim-flow.md` — proceso del artista que reclama perfil.
- Mantener `07-Marketing-Growth/social-automation-plan.md` actualizado (existe en Fase 0-3).

## Decisiones tomadas

- 2026-04-23 · Tono Dauton: sobrio, autoritativo, sin emojis decorativos. Bilingüismo: ES primario + EN técnico para metadata (RELEASE, TRACK, etc.).
- 2026-04-23 · Plan social en 4 fases: Fase 0 (handles), Fase 1 (playlists Spotify propias), Fase 2 (post-automation desde DB), Fase 3 (podcast TTS + video shorts + newsletter).
- 2026-04-25 · Outreach es informativo + invita a participar, NO agresivo. Cero spam.

## Templates de email a crear (cuando arranques)

- "Tu perfil está listo, verifica si los datos son correctos" — email frío inicial al artista.
- "Claim aprobado, ahora tienes control" — confirmación post-verificación.
- "Hay nueva info en tu perfil de Dauton" — automation cuando ingestion agrega data nueva.
- "Tu perfil está siendo visto" — engagement loop futuro.
- Crisis comms templates (data leak, takedown, etc.) — defensivo.

## Moderation rules (para definir)

- Correcciones auto-aprobables: ej. correcciones tipográficas en stage_name si el user es authenticated.
- Correcciones humano-required: data conflictos (ej. fechas de release contradicen Spotify).
- Takedown / right-to-be-forgotten flow: artista pide eliminación. Cuánto tarda, qué mantiene cached, qué se borra.
- SLA: 48h response inicial, 7 días resolución (a confirmar).

## Coordination workflow

- Email outreach → Business & Legal (compliance CAN-SPAM, GDPR).
- Claim flow → Engineering (endpoints), Product Architecture (UX).
- Moderation rules → Business & Legal (legal exposure), Engineering (queue logic).
- Social automation → Data & SEO (qué events de DB triggear posts).

## Reglas operativas

- Mantener tono establecido en SKILL del Design System. Cero emojis decorativos.
- Personalizar con campos dinámicos (stage_name, ciudad, último release). Email genérico = email muerto.
- A/B test cuando vayamos a campañas grandes (post-MVP).
- Trackear response rate por template.
