# Compliance Calendar — Dauton Media

**Owner:** Business & Legal agent
**Última actualización:** 2026-04-25
**Status:** v1 — live

---

## Propósito

Qué hay que hacer cuándo, para evitar lapses legales. Divide en: (1) pre-launch obligatorio, (2) post-launch recurrente, (3) trigger-based.

Revisión de este doc: trimestral + cuando cambia jurisdicción/scope.

---

## 1. Pre-launch obligatorio (antes de exposure público)

**Target:** completar antes de launch público (Fase 3, sep-oct 2026).

### Registration + filings

- [ ] **DMCA designated agent** registrado con US Copyright Office
  - Filing: [copyright.gov/dmca-directory](https://www.copyright.gov/dmca-directory/)
  - Cost: $6 inicial + $6 renewal cada 3 años
  - Agent info publicada en `/legal/dmca`
  - **Owner:** founder
  - **Timeline:** 1 día

- [ ] **Trademark Dauton Media** en USPTO (opcional pero recomendado)
  - Cost: $350 filing fee + $200-500 if lawyer-assisted
  - Consideración: trademark search previo (TESS database gratis) para verificar clear
  - **Owner:** founder (el agent puede hacer search preliminar)
  - **Timeline:** 30 días (search + filing), 6-12 meses hasta approval
  - **Priority:** antes de major PR/launch para evitar squatters

- [ ] **Domain legalese.** Confirmar que `dauton.media` (o dominio final) está registrado a nombre de Vulqo LLC, no de persona natural
  - **Owner:** founder

- [ ] **Confirmar state of Vulqo LLC** (NJ vs DE) — afecta governing law clause en terms + cap table futuro
  - **Owner:** founder (check estate records Vulqo LLC)
  - **Research item abierto** (ver legal-research-list.md)

### Documents + policies

- [ ] **Privacy policy v2** live en `/privacy`
  - Drafted — ver `privacy-policy-draft.md` (pending reescritura para Dauton)
  - **Owner:** agent drafts, founder approves, Engineering publishes

- [ ] **Terms of Service v2** live en `/terms`
  - Drafted — ver `terms-draft.md` (pending reescritura para Dauton)
  - **Owner:** agent drafts, founder approves, Engineering publishes

- [ ] **DMCA policy** en `/legal/dmca`
  - Incluye: process, agent contact, counter-notice info, form template
  - **Owner:** agent drafts

- [ ] **Takedown form** en `/legal/takedown`
  - Form para non-DMCA requests (artist dispute, GDPR)
  - **Owner:** agent drafts content, Engineering implementa UI

- [ ] **Cookie policy** si usamos cookies beyond essential
  - Actualmente: solo esenciales (session). Plausible es cookieless → probablemente no hace falta banner robusto
  - **Owner:** agent evalúa post analytics decision

- [ ] **IP & fair use** policy interna en `/methodology`
  - Publicada para transparency (sanitized version)
  - **Owner:** agent

### Infrastructure + contracts

- [ ] **DPAs signed** con cada sub-processor
  - Supabase — DPA automático activable
  - Vercel — DPA disponible
  - Stripe — DPA standard
  - Resend — DPA standard
  - Cloudflare — DPA disponible
  - Plausible — GDPR compliant por defecto
  - **Owner:** founder ejecuta, agent coordina

- [ ] **Email aliases configurados**
  - `hello@`, `legal@`, `privacy@`, `dmca@`, `corrections@`, `security@`
  - Route to founder inbox con labels
  - **Owner:** founder (Google Workspace o similar)

- [ ] **SPF / DKIM / DMARC** para domain
  - Necesario para email deliverability + reputation
  - Specialmente crítico antes de outreach campaign (Fase 3-4)
  - **Owner:** founder + Engineering

### Engineering dependencies (critical path)

- [ ] YouTube metadata TTL ≤ 30 días (refresh o delete)
- [ ] Attribution fuentes visible en footer
- [ ] Remover cualquier scraper IG si existe
- [ ] Cover art size cap (max 800×800 in DB)
- [ ] DMCA takedown endpoint operativo
- [ ] User data export + delete endpoints
- [ ] Bio generation pipeline con source_id grounding
- [ ] Sensitive categories blacklist aplicada
- [ ] Age gate 13+ en signup
- [ ] GPC / Do Not Sell header respect

---

## 2. Post-launch recurrente

### Mensual

- [ ] **Takedown log review** — revisar `takedowns-log.md`. Identificar patterns + response time metrics.
- [ ] **Compliance spot-check** — sample 5 perfiles aleatorios + verificar source attribution + photo license documentada.
- [ ] **Bio review** (si pipeline activo) — revisar 10 bios auto-generadas por quality + accuracy + sensitive categories compliance.

### Trimestral

- [ ] **Rerun ToS check** — cada fuente externa. ¿Cambió ToS desde último check?
  - Spotify, MB, Wiki, Genius, YouTube, Eventbrite, Ticketmaster, Bandsintown.
  - Documentar changes en `tos-compliance.md` con fecha.
- [ ] **Compliance dashboard** — métricas de takedowns, DSAR requests, incidents.
- [ ] **Legal research list** — triagear items abiertos.
- [ ] **Secret rotation** — rotate DB password + API keys de criticidad alta.
- [ ] **DPA review** — ¿algún sub-processor cambió? ¿nueva versión de DPA?

### Anual

- [ ] **LLC annual fee** paid (NJ o DE según state)
  - NJ: $75/año
  - DE: $300/año
- [ ] **Policy review** — privacy, terms, DMCA. ¿Cambios regulatorios? ¿evolución producto?
- [ ] **Trademark renewal** (año 6-10 después de filing, ver timeline USPTO)
- [ ] **DMCA agent renewal** (cada 3 años, $6)
- [ ] **Tax filings** — Vulqo LLC federal + state. Coordinar con CPA si aplica.
- [ ] **Insurance review** — E&O / cyber liability si ya contratado. Ver §4.

### Every 2 años

- [ ] **Legal framework refresh** — reviewpor cambio material en: GDPR (eRegulation, AI Act), CCPA (CPRA implementación), LatAm (nuevas leyes), industria música (copyright office updates).

---

## 3. Trigger-based (se activa cuando algo pasa)

### Trigger: primer DMCA / takedown request

- Aplicar template de `takedown-disputes.md`.
- Log en `takedowns-log.md`.
- Response dentro de timeline por categoría.

### Trigger: primer GDPR erasure request

- Template B1 / B2.
- 30 días máximo respuesta.
- Log + decisión documentada.

### Trigger: primer cease-and-desist / lawsuit threat

- **⛔ ESCALAR A ABOGADO HUMANO.**
- Preservar records (litigation hold).
- Founder contacta abogado corporate US.
- Agent documenta estado.

### Trigger: breach de seguridad detectado

- Activar breach response plan (ver `privacy-framework.md` §Breach response plan).
- 72h para notificar authorities UE si aplica.
- 72h para notificar affected users si riesgo alto.

### Trigger: primera transacción con user UE (Ko-fi o Stripe)

- Confirmar DPA Stripe/Ko-fi activo.
- Confirmar SCCs en place.
- Update privacy policy con DPO contact si volume escala.

### Trigger: primera activación de Track 2 (Artist Pro subscription)

- Setup Stripe Tax para sales tax automation.
- Sales tax nexus evaluation (states con economic nexus > threshold).
- VAT UE evaluation (umbral €10,000/año cross-border).
- ToS específico Pro tier en terms.

### Trigger: primera activación de Track 7 (Data Licensing B2B)

- DPA template signed con licensee.
- License contract signed.
- Compliance certification (si licensee lo pide) — baseline GDPR + CCPA.

### Trigger: primera activación de Track 8 (Capital raise)

- **⛔ ABOGADO HUMANO OBLIGATORIO.**
- Cap table setup.
- SAFE/convertible drafting.
- Reg D filings (US).
- Potential Delaware C-Corp conversion (si aplica).

### Trigger: expansion a nueva jurisdicción (oficina física o empleados)

- **⛔ ABOGADO HUMANO** (tax + corporate).
- Evaluation de nexus.

### Trigger: artista alto-profile claim el perfil

- Manual review del claim flow.
- Photo + bio manual QA.
- Notification a founder.

### Trigger: primera inquiry desde law enforcement (subpoena, warrant)

- **⛔ ABOGADO HUMANO.**
- No respond substantively sin counsel.
- Preserve records.

---

## 4. Stack legal mínimo a contratar (prioridades)

Dado que founder decidió no tener abogado permanente, estos son los items que SÍ requieren contratación puntual:

### Priority 0 — esencial pre-launch
1. **CPA / accountant** para Vulqo LLC — tax filings + advisory (probablemente ya existe).

### Priority 1 — high-value, bajo costo
2. **Trademark filing** Dauton Media — DIY via TEAS Plus ($250) o con trademark lawyer ($500-1500 all-in). Lawyer recommended para primera vez.

### Priority 2 — activable cuando aparezca trigger
3. **Corporate lawyer US** para capital raise — referencias: Cooley GO, Orrick Founder Series, Wilson Sonsini Startup Kit. Quotes on file pre-aplicación. ≈ $5-15k primera ronda.
4. **Litigation counsel** para C&D / lawsuit — no precontratado; contratar reactive si necesario.
5. **Privacy counsel UE** si expansión masiva UE o incident grave — caro ($400-800/hr). Activar solo con trigger específico.

### Priority 3 — considerar con revenue
6. **E&O / Cyber liability insurance** — cuando MRR > $1k. Cost: $500-1500/año para startup pequeño. Cubre defamation, IP claims, data breach.
7. **Media / publishers insurance** — si activamos Track 6 (sponsorship editorial). Cost similar.

---

## 5. Estimación de costos legales

### Pre-launch one-time
| Item | Cost |
|---|---|
| DMCA agent registration | $6 |
| Trademark filing (DIY TEAS Plus) | $350 |
| Trademark lawyer (opcional) | +$500-1,500 |
| LLC Annual fee (primer pago) | $75-300 |
| Policy drafting (agent-done) | $0 |
| **Total pre-launch** | **$431 - $1,856** |

### Año 1 recurrente
| Item | Cost |
|---|---|
| LLC annual fee | $75-300 |
| Email infra (parte de stack) | incluido |
| **Total año 1** | **$75 - $300** |

### Trigger-based (cuando aplique)
| Item | Cost estimado |
|---|---|
| Corporate lawyer capital raise | $5,000-15,000 |
| Litigation defense (if needed) | $10,000-100,000+ |
| E&O insurance (cuando MRR $1k+) | $500-1,500/año |
| VAT registration UE (cuando aplique) | $500-1,500 setup |

**Budget sugerido año 1:** $500 core + $2,000 reserve para unexpected. Total $2,500.

Esto es dramáticamente más barato que el "abogado review pre-launch de $1,500" del `financial-model.md` legacy, porque el agent asumió esa función. El caveat es que si aparece lawsuit en año 1, los costos pueden dispararse rápido.

---

## 6. Red flags para escalar inmediato al founder

El agent **escala** al founder (interrumpe workflow normal) cuando detecta:

1. C&D letter, lawsuit threat, subpoena.
2. Government/police inquiry.
3. Breach de seguridad confirmado.
4. Media coverage negativa sobre Dauton (reputational).
5. Takedown claim en cascada (> 5 claims simultáneos relacionados).
6. Cambio material en ToS de fuente crítica (Spotify, MB).
7. Legislación nueva que afecta directamente (ej. EU AI Act si aplicamos AI bios).

---

*Cross-refs: `legal-audit-master.md`, `takedown-disputes.md`, `privacy-framework.md`, `legal-research-list.md`.*
