# Takedown & Disputes — Proceso operativo

**Owner:** Business & Legal agent
**Última actualización:** 2026-04-25
**Status:** v1 — live pre-launch

---

## Propósito

Dauton Media opera un archive público con perfiles auto-generados, contenido sourced de múltiples plataformas, y contribuciones de users. Esto inevitablemente genera takedown requests, disputas de artistas, y ocasionalmente amenazas legales. Este doc define el proceso estandarizado para responder rápido, legalmente defendible, y sin escalation innecesaria.

**Principio:** responder rápido, escalar solo cuando el caso lo justifica. Un takedown mal manejado = reputación dañada + potencial lawsuit. Un takedown bien manejado = oportunidad de convertir reclamante en claim del artista.

---

## Categorías de requests

### Categoría A — DMCA Copyright Takedown (US)
**Qué es:** notice formal bajo 17 USC §512(c) alegando infracción de copyright sobre material en Dauton.
**Plazo de respuesta:** 24-72h (best practice industry).
**Responsable:** agent evalúa + recomienda. Founder ejecuta la decisión final.

### Categoría B — GDPR Right to Erasure (UE)
**Qué es:** solicitud de individual UE para eliminar sus datos personales bajo Art. 17 GDPR.
**Plazo:** **30 días máximo** (obligatorio GDPR).
**Responsable:** idem A.

### Categoría C — Artist Dispute (non-legal)
**Qué es:** artista o manager reclama que algo en su perfil es incorrecto / ofensivo / no-autorizado, sin invocar DMCA ni GDPR.
**Plazo:** 5 días hábiles para response inicial.
**Responsable:** agent recomienda, founder + Community & Outreach coordinan.

### Categoría D — Defamation / Reputation Claim
**Qué es:** individual alega que afirmación factual en Dauton es falsa y perjudicial.
**Plazo:** 48h response inicial + investigación 7 días.
**Responsable:** agent + founder. Si escala a amenaza legal formal → trigger abogado humano.

### Categoría E — Cease and Desist / Lawsuit Threat
**Qué es:** carta formal de abogado o entidad amenazando acción legal.
**Plazo:** response en 24h (ack of receipt, not substantive response).
**Responsable:** **TRIGGER DE ABOGADO HUMANO.** Agent documenta, founder contrata.

### Categoría F — Right of Publicity / Privacy Complaint
**Qué es:** reclamo por uso no autorizado de nombre/likeness (usualmente US).
**Plazo:** 7 días.
**Responsable:** agent + founder.

### Categoría G — Bad-faith / Spurious Claim
**Qué es:** takedown notice que es patentemente falso (no tiene derechos, o el contenido es claramente fair use).
**Plazo:** evaluación 48h + response firme.
**Responsable:** agent. Si reincidente, documentar pattern.

---

## Flujo operativo — paso a paso

### Paso 1: Recepción + clasificación

Todos los emails a `legal@dauton.media`, `privacy@dauton.media`, `dmca@dauton.media` entran a queue triage.

**Checklist de clasificación:**
- ¿Tiene firma + identificación clara del claimant?
- ¿Identifica el contenido específico con URL?
- ¿Invoca base legal (DMCA, GDPR, defamation, etc.)?
- ¿Es cease-and-desist formal con abogado?

Clasificar en A-G según table arriba.

### Paso 2: Acknowledgment

Responder **dentro de 24h** con template por categoría (ver §Templates abajo). El ack reconoce receipt sin admitir liability.

### Paso 3: Evaluación

Para cada categoría, el agent evalúa:

- **Validez del claim.** ¿Tiene el claimant derechos legítimos?
- **Precedente interno.** ¿Tenemos caso similar documentado?
- **Fair use analysis** (si copyright).
- **Compliance check** (si GDPR).
- **Source validity** (si defamation).
- **Risk exposure** si no actuamos vs si actuamos.

### Paso 4: Decisión

Veredicto en 4 categorías:

1. **✓ Comply immediate.** El claim es válido, cumplimos.
2. **⚠ Comply with conditions.** Modificamos el contenido, no removemos completo.
3. **✗ Reject with justification.** El claim no es válido, respondemos con base legal.
4. **⛔ Escalate.** Cease and desist formal, lawsuit threat → abogado humano.

### Paso 5: Ejecución

- Si comply: remover/modificar contenido + notificar claimant + log en audit.
- Si reject: enviar response con base legal + invitar counter-notice si DMCA.
- Si escalate: founder contacta abogado + agent documenta.

### Paso 6: Documentation

Cada caso se loggea en `08-Legal-Compliance/takedowns-log.md` (internal):

```
## Case #{YYYY-NNN}

Fecha receipt: {fecha}
Categoría: {A-G}
Claimant: {nombre / entidad}
Contenido afectado: {URLs}
Claim basis: {DMCA / GDPR / defamation / etc}
Decisión: {comply / comply-partial / reject / escalate}
Fundamento: {1-2 líneas}
Acción ejecutada: {descripción}
Timeline: ack-D{n}, resolved-D{n}
Follow-up: {si hay}
```

### Paso 7: Follow-up monitoring

- 30 días post-resolution: check si claimant re-contactó.
- Pattern detection: mismo claimant con múltiples claims → flag.
- Compliance report trimestral: agregado de casos.

---

## Templates de response

### Template A1 — DMCA Ack of Receipt

```
Subject: Acknowledgment of DMCA Notice — Case #{YYYY-NNN}

[Claimant name],

Thank you for your notice regarding content on Dauton Media. We have received your communication on [date] and assigned it reference #{YYYY-NNN}.

We take copyright seriously and are evaluating your claim. You will receive a substantive response within 72 hours.

For our records, please confirm:
- The specific URL(s) of the allegedly infringing content.
- Your relationship to the copyrighted work (owner, authorized agent).
- A good-faith statement that the use is not authorized and that your claim is accurate under penalty of perjury.

If your initial notice already contained these, no action needed.

Regards,
Dauton Media Legal Team
legal@dauton.media
Vulqo LLC | [address]
```

### Template A2 — DMCA Comply

```
Subject: Re: DMCA Notice Resolution — Case #{YYYY-NNN}

[Claimant name],

Per your DMCA notice #{YYYY-NNN}, we have removed the following content on [date]:
- {URL 1}
- {URL 2}

The user who uploaded the content (if applicable) has been notified and has the right to submit a counter-notice under 17 USC §512(g).

If you believe your work has been infringed on other pages of Dauton Media, please submit a separate notice.

Regards,
Dauton Media Legal Team
```

### Template A3 — DMCA Reject (fair use)

```
Subject: Re: DMCA Notice Evaluation — Case #{YYYY-NNN}

[Claimant name],

We have carefully reviewed your DMCA notice referenced as #{YYYY-NNN}.

After legal analysis, we believe the use of [content] on Dauton Media is a protected fair use under 17 USC §107, specifically:
- The use is transformative — we organize and contextualize factual information for reference and commentary purposes.
- We use the minimum necessary to identify the work (thumbnail-size image / brief factual reference).
- Our use does not substitute for the original work or harm its market.
- The purpose is non-commercial in substance — providing a factual reference archive for cultural documentation.

Precedent: industry practice (Discogs, AllMusic, Wikipedia, RateYourMusic) establishes that factual reference display of cover art, artist names, and discography metadata is protected fair use in the United States.

Accordingly, we decline to remove the content at this time.

If you disagree, you retain the right to pursue judicial remedies. However, please note that under 17 USC §512(f), knowingly material misrepresentations in a takedown notice may subject you to liability for damages.

Regards,
Dauton Media Legal Team
```

### Template B1 — GDPR Erasure Ack

```
Subject: Acknowledgment — GDPR Article 17 Request #{YYYY-NNN}

[Requester name],

We have received your request dated [date] to erase personal data concerning you from Dauton Media, submitted under Article 17 of the General Data Protection Regulation.

Under GDPR, we have up to 30 days to evaluate and respond. Our evaluation will consider:
- The nature of the data concerned.
- Your status (public figure in professional capacity vs private individual).
- Our legal basis for processing (legitimate interest as cultural archive).
- Balance between your rights and our obligations to maintain factual record.

You will receive a substantive response within 30 days from [date].

If you want to expedite, please provide:
- Identification confirming your identity.
- The specific URL(s) or data points you seek removed.
- The basis of your erasure claim (e.g., data inaccurate, processing unlawful, objection under Art. 21).

Regards,
Dauton Media Privacy Team
privacy@dauton.media
```

### Template B2 — GDPR Erasure Partial Comply

```
Subject: Re: GDPR Erasure Request #{YYYY-NNN} — Partial Resolution

[Requester name],

Per your Article 17 request #{YYYY-NNN}, we have completed the following review:

**Erased:**
- {specific data point 1}
- {specific data point 2}

**Retained under legitimate interest (Art. 6(1)(f)) and freedom of expression exception (Art. 17(3)(a)):**
- {data point 3}: reason: [you are a public figure in your professional capacity as an artist; this data is factual and referenced to public sources].

Our position: maintaining factual records of public cultural history is a legitimate interest that, after balance test, overrides erasure in this specific context. We retain the following data points based on Art. 85 (freedom of expression and archival research).

You retain the right to:
- Submit a complaint to your data protection authority.
- Request further specificity from us.
- Pursue further legal remedies.

Our data protection contact: privacy@dauton.media

Regards,
Dauton Media Privacy Team
```

### Template C1 — Artist Dispute Ack

```
Subject: Re: Your profile on Dauton Media

Hi [Artist],

Thanks for reaching out about your profile on Dauton Media. We take feedback from artists very seriously — your input makes the archive better.

Here's what we can do:

1. **Claim your profile** (free, 5 minutes): gives you the ability to edit bio, contact info, social links, and add verified info. This is the fastest way to resolve most concerns.
   → [link to /claim?artist={slug}]

2. **If a specific fact is wrong:** reply with the fact + source (where you've stated it publicly), and we'll correct it within 48 hours.

3. **If a photo or cover art needs removal:** tell us which one and why, we'll act within 72 hours.

4. **If you want your profile removed entirely:** this is rare (Dauton is a cultural archive of public information), but we evaluate case-by-case. Reply with your reasoning.

Looking forward to hearing what works best.

Regards,
Dauton Media Team
hello@dauton.media
```

### Template D1 — Defamation Ack

```
Subject: Receipt of your inquiry — Case #{YYYY-NNN}

[Requester name],

We have received your communication dated [date] regarding [content] on Dauton Media.

We take accuracy seriously. Our editorial approach is source-grounded: every factual assertion on the archive is traceable to a documented source. We are reviewing the specific content you've flagged.

Please provide within 48 hours:
- The specific URL and exact statement you believe is inaccurate.
- Evidence supporting your position (e.g., original source, correction from primary source).
- Your role/relationship to the subject (if not the subject themselves).

We will complete our review within 7 days and respond with our decision. Options include: correction, clarification, removal, or retention with justification.

If you have received this response and intend to pursue legal remedies, please note that we have a documented editorial process with source citation for all factual claims.

Regards,
Dauton Media Editorial Team
corrections@dauton.media
```

### Template E1 — C&D / Lawsuit Ack (PAUSE — flag abogado)

```
⛔ STOP — DO NOT USE WITHOUT FOUNDER APPROVAL + LAWYER REVIEW

[Template for internal use only — any C&D or lawsuit threat triggers immediate escalation]

Subject: Receipt acknowledgment — [case ref]

We acknowledge receipt of your communication dated [date].

This matter is being reviewed by our legal counsel. We will respond substantively through counsel within the applicable deadline.

Please direct further correspondence to: legal@dauton.media

Vulqo LLC
[address]
```

**Founder action cuando llega C&D:**
1. NO responder substantively.
2. Solo enviar ack mínimo (template arriba) — dentro de 24h.
3. Contactar abogado (referencias: Cooley GO, Orrick Founder Series, Davis Wright Tremaine, local corporate attorney).
4. Agent documenta case state para briefing al abogado.
5. Preservar **todos** los records del caso (emails, content, logs).

### Template G1 — Bad-faith rejection

```
Subject: Re: Your claim regarding {content} — Case #{YYYY-NNN}

[Claimant],

We have reviewed your claim of [date] regarding [content] on Dauton Media.

After careful evaluation, we determine that:
- [Specific reason: e.g., "you have not established ownership of the work"]
- [Specific reason: e.g., "the use is protected by fair use"]
- [Specific reason: e.g., "the content is a factual statement supported by public sources"]

Under 17 USC §512(f), knowingly material misrepresentations in a DMCA notice may expose the sender to liability for damages and attorney's fees. We are documenting this communication.

This matter is closed on our end. Further baseless claims may be referred to our counsel.

Regards,
Dauton Media Legal Team
```

---

## Pre-launch checklist

Items que tienen que estar operativos antes de exposure público del site:

- [ ] **Email aliases configurados:** `legal@`, `privacy@`, `dmca@`, `corrections@`, `hello@` — todos redirigen a founder o queue.
- [ ] **DMCA designated agent registrado** con US Copyright Office. Cost: $6. Required para safe harbor 17 USC §512.
  - Filing online: [copyright.gov/dmca-directory](https://www.copyright.gov/dmca-directory/).
  - Info del agent se publica en `/legal/dmca` del site.
- [ ] **Page `/legal/dmca`** con proceso + info del agent + template de notice para claimant.
- [ ] **Page `/legal/takedown`** con form simple para non-DMCA takedowns (GDPR + artista dispute).
- [ ] **Takedown log** creado en `08-Legal-Compliance/takedowns-log.md`.
- [ ] **Privacy policy + terms** live con referencias a estos contactos.
- [ ] **Claim flow** operativo — reduce dramáticamente el volumen de disputes al dar al artista un camino de auto-servicio.
- [ ] **Training founder** en cómo triagear los 7 categorías.

---

## Métricas operativas

Post-launch, trackear mensualmente:

- **Volume por categoría** (A-G).
- **Turnaround time** promedio por categoría.
- **Comply rate** vs **Reject rate**.
- **Repeat claimants** — potencial bad actors.
- **Escalations a abogado** — si >3/año, reconsidar stack legal.
- **Claim-to-convert rate** — de los artists que disputan, qué % terminan claiming el perfil.

---

## Decisiones pre-tomadas (para speed en response)

### Auto-comply (inmediato, sin review profundo):
1. Photo removal request del artista.
2. GDPR erasure de user registrado (fan que creó cuenta y pide delete).
3. Data correction con source válido provided.
4. Legacy/test data de early development que el artista reclame.

### Auto-reject con template:
1. DMCA notice sin firma o identificación.
2. Takedown de "toda la página del artista" cuando está claim-ed por alguien más.
3. Claim de copyright sobre data factual (fechas, colaboraciones).
4. Claim de "remove me porque no quiero estar" sin base legal válida para figura pública.

### Always escalate:
1. Cualquier mención de "lawsuit", "court", "litigation".
2. Letter from law firm letterhead.
3. Government subpoena o court order.
4. Claim de >$10k damages.

---

*Cross-refs: `legal-audit-master.md`, `privacy-framework.md`, `ip-and-fair-use.md`, `compliance-calendar.md`.*
