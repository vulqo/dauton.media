# Artist Outreach — Flujo y Templates

**Department:** Operations · Community & Outreach
**Owner:** Community & Outreach chat
**Last updated:** 2026-04-24 · draft v1
**Status:** draft — no enviar hasta validación Business & Legal + perfiles ricos (post-Sprint-5).

---

## Propósito

Operacionalizar la comunicación 1:1 (automatizada en batch) con artistas que ya tienen un perfil auto-generado en Dauton Media. El objetivo del outreach **no es convencer al artista de que exista un perfil** — el perfil ya existe y es público. El outreach es informativo + invita a claim/verificación para ganar control editorial.

Regla de oro: **outreach informativo, nunca agresivo, nunca promocional**. Si el artista no responde, no insistimos más de dos veces.

---

## Cuándo arrancar

Outreach masivo se activa cuando se cumplan TODAS estas condiciones:

1. Sprint 5 (Spotify Stage 2) cerrado → perfiles tienen discografía + tracks + collabs.
2. Sprint 7 (Stage 4 credits ejecución) cerrado → perfiles tienen production/writing credits reales.
3. Auth flow wired (Supabase Auth + claim modal) → el artista puede reclamar sin fricción.
4. Biz-Legal firmó los templates (CAN-SPAM compliance US, GDPR compliance EU).
5. Unsubscribe endpoint funcional + logging (Engineering).

Hasta que las 5 condiciones se cumplan, la campaign queda en estado `ready-but-paused`.

---

## Identificación de artistas a contactar

Query base sobre `people` (orden de prioridad):

### Cohort 1 — Pillars (15 artistas)

Los 15 pillars del seed original. Alto valor simbólico: si uno reclama y verifica, señal de legitimidad para el resto.

Criterio SQL:
```sql
SELECT slug, stage_name, primary_city_id, completeness_score
FROM people
WHERE is_pillar = true
  AND completeness_score >= 80
  AND contact_email IS NOT NULL
ORDER BY completeness_score DESC;
```

### Cohort 2 — Top relevancia (50-100 artistas)

Artistas venezolanos o de diáspora con alta relevancia medida por Spotify popularity + followers.

Criterio SQL:
```sql
SELECT slug, stage_name, primary_city_id, completeness_score
FROM people
WHERE completeness_score >= 75
  AND (spotify_popularity >= 40 OR spotify_followers >= 10000)
  AND country_code IN ('VE', 'ES', 'CO', 'US', 'MX')
  AND is_pillar = false
  AND contact_email IS NOT NULL
ORDER BY spotify_popularity DESC
LIMIT 100;
```

### Cohort 3 — Long tail (500+ artistas)

Resto del archivo con completeness ≥70 y al menos 1 release. Outreach en batches semanales de 50-100 para no quemar dominio de envío.

### Fuente del email del artista

Orden de preferencia:
1. **Email público declarado** en bio de Instagram / Twitter / Spotify profile (parseado por worker).
2. **Email en Genius profile** (si es el artista quien lo puso).
3. **Management / booking email** listado públicamente en sitio propio del artista.
4. **DM a redes** — última opción, NO escalar. Si no hay email público, se omite del batch y se marca `outreach_status = 'no_contact_found'`.

**Nunca** se usa email obtenido de scraping de sites privados, data brokers, o leaks. Biz-Legal lo confirmará pero la regla interna es clara: solo email público declarado por el propio artista o su management.

---

## Secuencia de outreach

Cada artista recibe esta secuencia, espaciada:

```
T+0    → Email 1: "Tu perfil está listo. Verifica los datos."
T+10d  → Email 2 (si no abrió): recordatorio suave, mismo subject diferente copy.
T+30d  → Email 3 (si no abrió ni respondió): última nota, cierre respetuoso.

— cualquier respuesta o unsubscribe detiene la secuencia automática —

— si el artista reclama:
  T+immediate → Email 4: "Claim recibido. Estamos revisando."
  T+48h max   → Email 5: "Claim aprobado. Tienes control de tu perfil."
  (o rechazo con explicación clara)

— si el artista ya tiene claim aprobado:
  T+on_event  → Email 6: "Actualización en tu perfil" (automation desde ingestion).
```

Cadence control:
- Ningún artista recibe más de 1 email por semana por parte de Dauton.
- Si el artista pidió `unsubscribe_all`, se excluye de todo — incluso alertas de claim (solo se envía si él mismo volvió a hacer claim).
- Festividades locales y aniversarios sensibles (muertes públicas) → pausar 48h la secuencia.

---

## Tracking

Tabla nueva a pedir a Engineering (ticket [ENG]):

```
artist_outreach_log
  id                 uuid
  person_id          uuid REF people
  cohort             text      -- 'pillar' | 'top' | 'long_tail'
  template_key       text      -- 'email_1_profile_ready', etc.
  sent_at            timestamptz
  email_sent_to      text
  opened_at          timestamptz
  clicked_at         timestamptz
  replied_at         timestamptz
  claim_started_at   timestamptz
  claim_completed_at timestamptz
  unsubscribed_at    timestamptz
  bounce_reason      text
  notes              text
```

Métricas a monitorear por cohort:
- Open rate (target pillar ≥60%, top ≥40%, long tail ≥25%).
- Reply rate (target pillar ≥30%, top ≥10%, long tail ≥3%).
- Claim completion rate (target pillar ≥20%, top ≥5%, long tail ≥1%).
- Bounce rate (si supera 5%, pausar batch — problema de quality de la lista).
- Unsubscribe rate (si supera 2%, revisar copy — algo suena a spam).

---

## Templates

**Reglas transversales para todos los templates:**
- Subject line ≤60 caracteres, sin clickbait, sin emojis, sin MAYÚSCULAS de alarma.
- From: `Dauton Media <hola@dauton.media>` (cuando el dominio esté activo).
- Reply-to: `hola@dauton.media`, monitoreado humano hasta que escale el equipo.
- Footer obligatorio: dirección física (Vulqo LLC), link unsubscribe, link a privacy policy. Requerido por CAN-SPAM.
- Personalización: `{{stage_name}}`, `{{city}}`, `{{latest_release}}`, `{{profile_url}}`, `{{claim_url}}`, `{{unsubscribe_url}}`. Email sin data personalizada = email muerto.
- Idioma: ES por default. EN opcional si el artista está marcado `primary_language='en'` (diáspora de segunda generación).
- Sin emojis decorativos. Permitido: guiones, paréntesis, tipografía estándar.
- Longitud target: ≤8 oraciones de cuerpo. Email largo = email no leído.

---

### Template 1 — "Tu perfil está listo" (frío inicial)

**Template key:** `email_1_profile_ready`
**Trigger:** cohort batch send, T+0.
**Goal:** que el artista abra, lea, y haga click al perfil para ver su data.

```
Subject: Tu perfil en Dauton Media está publicado

Hola {{stage_name}},

Te escribo desde Dauton Media, un archivo del rap hispanohablante con foco en la escena venezolana y su diáspora.

Ya tenemos publicado tu perfil:
{{profile_url}}

La data la armamos desde fuentes públicas (Spotify, MusicBrainz, Wikipedia, Genius). Incluye tu discografía, créditos de producción y escritura cuando aplica, ciudad, colaboraciones detectadas, y enlaces a tus plataformas.

No te estamos pidiendo nada — el perfil ya es público. Pero si querés verificarlo y tomar control para editar, corregir datos, o agregar información que no detectamos automáticamente, podés reclamarlo acá:

{{claim_url}}

Verificado = badge visible + control editorial del perfil. Gratis. Sin compromiso comercial.

Si todo está correcto y no querés hacer nada, no tenés que responder. Si encontrás algo que arreglar, podés sugerir una corrección desde el mismo perfil sin crear cuenta.

Gracias por tu trabajo.

— Equipo Dauton Media
https://dauton.media

---
Vulqo LLC · [physical address]
No querés recibir estos mensajes: {{unsubscribe_url}}
Privacy policy: https://dauton.media/privacy
```

**Variantes EN** (para `primary_language='en'`): traducción directa, mismo tono sobrio.

---

### Template 2 — "Recordatorio suave" (follow-up si no abrió)

**Template key:** `email_2_followup_unopened`
**Trigger:** T+10d, sólo si `opened_at IS NULL` y `unsubscribed_at IS NULL`.
**Goal:** segundo intento sin insistir. Si no abre esta, T+30d cierra la secuencia.

```
Subject: Seguimiento — tu perfil en Dauton Media

Hola {{stage_name}},

Te escribí hace unos días sobre tu perfil en Dauton Media. Mandamos esto una vez más por si el primer mensaje se perdió en la bandeja.

Tu perfil: {{profile_url}}
Reclamar / editar: {{claim_url}}

Si no te interesa, no hay problema — esto es el último recordatorio automático. Respondiendo "no" a este mail te quitamos de la lista sin preguntas.

— Equipo Dauton Media

---
Vulqo LLC · [physical address]
{{unsubscribe_url}} · https://dauton.media/privacy
```

---

### Template 3 — "Claim aprobado" (confirmación)

**Template key:** `email_3_claim_approved`
**Trigger:** `claim_approved` event desde moderation queue.
**Goal:** confirmar + entregar control + dar expectativas claras.

```
Subject: Claim aprobado — tu perfil de Dauton Media

Hola {{stage_name}},

Tu claim está aprobado. Desde ahora podés:

— Editar tu bio y datos personales
— Agregar / corregir créditos que no detectamos automáticamente
— Subir foto de perfil
— Aprobar o rechazar correcciones que otros usuarios sugieran sobre tu perfil

Tu perfil ya muestra el badge de verificación.

Dashboard: {{dashboard_url}}
Perfil público: {{profile_url}}

Reglas básicas:
— Podés editar texto y datos. Cambios grandes (fechas, colaboraciones) pueden requerir fuente.
— Correcciones sobre data técnica (MBID, Spotify ID, discografía) entran a review para no romper el grafo. Respondemos en 48h.
— Si necesitás borrar algo por motivos personales o legales, escribinos a hola@dauton.media y lo evaluamos.

Cualquier duda, respondiendo a este mail te contestamos en menos de 48h.

— Equipo Dauton Media

---
Vulqo LLC · [physical address]
{{unsubscribe_url}} · https://dauton.media/privacy
```

---

### Template 4 — "Nueva info en tu perfil" (automation post-claim)

**Template key:** `email_4_profile_update`
**Trigger:** artista verificado + ingestion detecta data nueva relevante (nuevo release, nuevo press mention tier 1-2, nueva colaboración).
**Cadence cap:** máximo 1 por semana por artista, agrupando updates.
**Goal:** mantener al artista engaged con el producto como herramienta útil.

```
Subject: Novedad en tu perfil de Dauton — {{update_type}}

Hola {{stage_name}},

Detectamos estas adiciones en tu perfil desde la última vez:

{{#each updates}}
— {{this.type}}: {{this.summary}}
  Fuente: {{this.source}}
{{/each}}

Ver perfil: {{profile_url}}

Si algo está mal o querés matizar, editalo desde tu dashboard o respondé este mail.

— Dauton Media

---
{{unsubscribe_url}} · preferencias de notificación: {{preferences_url}}
```

Nota: este template admite modulación en frecuencia. El artista puede en su dashboard decir "solo mensual" o "solo cuando sea tier 1". Engineering debe exponer estas preferencias (ticket [PRODUCT]).

---

## Crisis comms — borrador inicial

Templates defensivos para tocar si ocurre:

- **Takedown solicitado por artista:** respuesta dentro de 72h, escalada a Biz-Legal si hay duda. Template key: `email_takedown_acknowledge`.
- **Data incorrecta visible públicamente:** comunicación al artista afectado (si es público) + corrección + nota en edit_history. Template key: `email_data_error_apology`.
- **Data breach:** comunicación masiva siguiendo GDPR / LatAm equivalentes. Coordinar con Biz-Legal + Engineering. Template key: `email_breach_notification`.

Estos NO se redactan ahora. Se redactan cuando haya una política formal de incident response firmada por Biz-Legal (ticket [BIZ-LEGAL]).

---

## Coordinación cross-area requerida antes de enviar

| Dependencia | Owner | Status | Ticket |
|---|---|---|---|
| Compliance review CAN-SPAM + GDPR de los 4 templates | Business & Legal | pending | [BIZ-LEGAL] pendiente |
| Endpoint `/unsubscribe/[token]` + logging | Engineering | pending | [ENG] pendiente |
| Tabla `artist_outreach_log` + RLS | Engineering | pending | [ENG] pendiente |
| Claim flow UI + API (modal + endpoint) | Engineering + Product | pending | ver `claim-flow.md` |
| Email sender (Resend account + SPF/DKIM/DMARC setup para `dauton.media`) | Engineering | pending | [ENG] pendiente |
| Query de cohort selection probada sobre data real | Data & SEO + Community | pending | [DATA-SEO] + [COMMUNITY] |
| Decisión de dirección física para footer CAN-SPAM | Business & Legal | pending | [BIZ-LEGAL] pendiente |

---

## Anti-spam + sender reputation

Reglas operativas para no quemar el dominio de envío:

1. **Warm-up del dominio:** primeros batches ≤50 emails/día la primera semana, escalar gradualmente a 500/día al mes.
2. **Bounce rate cap:** si un batch pasa 5% bounces, pausar y limpiar lista antes de reenviar.
3. **SPF + DKIM + DMARC** obligatorios configurados en Vercel DNS antes del primer envío real.
4. **Suppression list:** cualquier unsubscribe, hard bounce, o complaint se persiste en tabla y nunca se toca al mismo email de nuevo.
5. **Monitoring:** Resend dashboard + alertas si spam complaint rate >0.1%.

---

## Métricas del programa

Reportar mensualmente en un doc breve compartido con Strategy/PM:

- Emails enviados por cohort.
- Open / reply / claim rate vs target.
- Tiempo promedio de claim (desde `sent_at` hasta `claim_completed_at`).
- Lista de feedback cualitativo recibido vía reply (artistas señalando correcciones, quejas, sugerencias).
- Adjustments al template / cadence en el próximo ciclo.

---

## Qué NO hacemos en outreach

- No vendemos nada. No hay paid tier en MVP.
- No ofrecemos promoción / boost / destacado. Dauton Media no cobra por visibilidad.
- No comparamos al artista con otros. No hacemos benchmarks públicos.
- No pedimos exclusividad, datos privados, o contenido sin compensar.
- No insistimos más de 2 recordatorios. Si no responden, respetar silencio.
- No hacemos outreach a menores de edad sin involucrar a su management / tutor legal (ticket [BIZ-LEGAL] para política formal).
- No reutilizamos la lista de emails fuera del outreach de Dauton Media. No se vende, no se comparte, no se cruza con SHO Companies ni otra entidad.

---

## Próximos pasos (owner: Community & Outreach)

1. Validar este draft con Luis (founder) — ajustes de voz, criterio de cohorts, reglas anti-spam.
2. Abrir ticket [BIZ-LEGAL] en `TASKS.md` pidiendo review CAN-SPAM + GDPR de los 4 templates.
3. Abrir ticket [ENG] para tabla `artist_outreach_log` + endpoint unsubscribe + Resend setup.
4. Draft paralelo de `06-Operations/claim-flow.md` — el qué-pasa-cuando-reclaman complementa este doc.
5. Cuando Sprint 5 + 7 cierren, correr cohort query en staging para dimensionar batch real.

---

*See also: [`moderation-workflow.md`](./moderation-workflow.md) · [`../07-Marketing-Growth/social-automation-plan.md`](../07-Marketing-Growth/social-automation-plan.md) · [`admin-operations.md`](./admin-operations.md)*
