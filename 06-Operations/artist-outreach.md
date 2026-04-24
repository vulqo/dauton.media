# Artist Outreach

**Owner:** Community & Outreach agent
**Status:** 🔴 skeleton — pendiente que Community & Outreach chat lo llene
**Última actualización:** 2026-04-25

---

## Contexto

Una vez que los perfiles de artistas estén armados con data rica (post-Sprint 5 Stage 2 de Spotify + MB + Wikipedia), lanzamos campaign de outreach masivo por email a artistas pidiendo:
1. Que verifiquen si los datos de su perfil son correctos.
2. Que reclamen su perfil si quieren editarlo/agregar contenido.

Según el founder: "Ahí ya tenemos contacto directo con artistas sin siquiera tener publico al mostrar el archivo bien hecho."

---

## Flujo completo (a llenar)

### 1. Identificación de artistas a contactar

**Criterios de selección:**
- Artistas en DB con perfil ≥ X% completo (threshold TBD — quizás 40%).
- Tienen email público o se puede extraer vía ingestion.
- Priorizar diáspora venezolana primero.

**Fuentes de email:**
- Spotify for Artists contact (pocas veces pública).
- Bandcamp bio (muchas veces tiene email).
- IG bio (scrape).
- Manager listado en press — contactar manager primero.

### 2. Secuencia de emails

**Email #1 — Discovery** (cold outreach inicial)
- Subject: "Tu perfil en Dauton Media está listo"
- Tono: informativo, invita a revisar. NO vende nada.
- Content: "Armamos tu perfil con data pública de {X fuentes}. Si algo está mal, nos avisas acá [link correction form]. Si querés reclamarlo y editarlo, acá [link claim flow]."
- CTA: ver perfil → verificar datos.

**Email #2 — Si no responde en 7 días**
- Soft reminder. Destaca feature específico ("tu discografía completa está linkeada", "tenemos los credits de productores").

**Email #3 — Claim approved (post verification)**
- Subject: "Bienvenido a Dauton Media — tu perfil es oficial"
- Tono: profesional, sin efusividad.
- Content: guide de edición + badge VIP explicado.

**Email #4 — Updates recurrentes** (automation)
- Cuando ingestion agrega nueva info relevante.
- Opt-out claro.

### 3. Tracking

- Tabla `outreach_campaigns` (a crear en DB si es necesario).
- Metrics: open rate, click rate, response rate, conversion to claim.
- A/B test post-MVP launch.

### 4. Tooling

- Plataforma de email marketing: opciones a evaluar con Business & Legal:
  - Resend (dev-friendly, pay-as-you-go).
  - Mailchimp (standard).
  - Beehiiv (newsletter-oriented).
- Requisitos: DKIM + SPF + compliance CAN-SPAM (EU GDPR si hay direcciones UE).

---

## Templates (a redactar)

Cuando Community & Outreach chat arranque, redacta los 4 emails con:
- ES como primary, con variaciones EN para artistas en USA/España.
- Campos dinámicos: {stage_name}, {origin_city}, {latest_release_title}.
- Tono sobrio del DS. Cero emojis decorativos.
- Longitud: 5-8 oraciones max. Nadie lee más.

---

## Reglas

- **NO spam.** Outreach informativo + invita. No agresivo.
- **Opt-out claro en cada email.**
- **Personalización obligatoria** — email genérico = email muerto.
- **Validación legal de cada campaign** con Business & Legal antes de enviar.

---

## Coordinación

- **Business & Legal:** compliance CAN-SPAM / GDPR / políticas de email marketing.
- **Engineering:** endpoints para tracking (open/click) + correction form + claim flow.
- **Product Architecture:** UX del claim flow + correction form.
- **Data & SEO:** identifica artistas con perfil ≥ threshold para outreach.
