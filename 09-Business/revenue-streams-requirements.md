# Revenue Streams Requirements

**Owner:** Business & Legal agent
**Última actualización:** 2026-04-25
**Status:** v1 — operacional

---

## Propósito

Por cada vía de revenue activable o activa, este doc lista **qué necesitamos** concretamente: plataforma técnica, marketing, partnerships, infra, costo, timeline a primer revenue. Es el blueprint operativo que Engineering + Community & Outreach + founder usan para activar.

---

## Vía #1 — Donaciones Ko-fi

**Status:** activa MVP launch (Q4 2026).

### Plataforma
- **Ko-fi.com** (preferred) — más popular para creators, 0% fees on tips, plan Gold $6/mes para custom branding.
- Backup: PayPal.me + Stripe Donations.

### Setup técnico
- [ ] Crear Vulqo LLC Ko-fi account (research item P0.6).
- [ ] Embeber widget en footer del site.
- [ ] Page `/support` con CTA grande + opción membership.
- [ ] Tracking con Plausible para conversion.

### Marketing requerido
- Mensaje claro: "Apoya el archive cultural más completo del rap hispano."
- Soft CTAs en perfiles de artistas que recibieron contribución comunitaria.
- Newsletter mention (opcional).

### Partnerships
- Ninguna requerida.

### Costo
- $0-72/año (Ko-fi Gold opcional para custom branding).

### Timeline a primer revenue
- Día 1 post-launch.
- $50/mes target a 6 meses post-launch.

### Métricas
- Donations totales acumulados.
- Average donation size.
- Repeat donors %.

---

## Vía #2 — Artist Pro Subscription

**Status:** activable Fase 4 (Q1 2027).

### Plataforma
- **Stripe** — subscription + Stripe Tax (sales tax automation) + Stripe Connect si futuro tip jar / merchant onboarding.
- **Stripe Customer Portal** para self-service cancel/upgrade.

### Setup técnico
- [ ] Stripe account verificado para Vulqo LLC (probablemente ya existe).
- [ ] Stripe Tax activado (research item P1.1).
- [ ] Subscription product creado en Stripe ($8/mes + $80/año).
- [ ] Webhook endpoint en Vercel para sync subscription status → Supabase.
- [ ] Feature gating logic en `02-Engineering/website/src/lib/auth/`.
- [ ] Customer portal embed.
- [ ] Email transactional via Resend (welcome, payment failed, cancel confirmation).

### Marketing requerido
- Landing page `/pro` con value prop + features list + CTA + FAQ.
- Outreach campaign a artistas claim-ed (template Resend).
- Comparison page vs Bandcamp Pro / Soundcloud Pro (subtle, not aggressive).

### Partnerships
- Ninguna critical, pero **trial via partner labels** sería boost (e.g., un label acepta que Dauton ofrezca 6 meses Pro free a artistas de su roster como "perk").

### Costo
- Stripe processing fees: 2.9% + $0.30 por transacción.
- Stripe Tax: 0.5% additional.
- **Net per $8 sub:** ~$7.45.

### Timeline a primer revenue
- Activación Fase 4 (Q1 2027).
- Primer revenue: día 1 si campaign tiene listo.
- Target $300/mes MRR a 6 meses post-activation.

### Métricas
- MRR.
- Conversion rate (claim → Pro).
- Churn mensual.
- LTV.

---

## Vía #3 — Manager Subscription

**Status:** condicional Fase 4-5.

### Plataforma
- Stripe (mismo setup #2) + multi-seat logic en Supabase.

### Setup técnico
- Multi-artist dashboard (extension Artist Pro).
- Consent flow artista → manager (artist accepts manager link).
- Audit log de acceso del manager a data del artista.

### Marketing
- Outreach directa a managers conocidos (lista en `stakeholder-list.md`).
- LinkedIn Sales Navigator (Vulqo ya tiene access?) para identification.

### Partnerships
- Ninguna requerida.

### Costo
- Stripe fees (same).
- Tooling: $0 incremental.

### Timeline a primer revenue
- Activable post Artist Pro tracción (Q3 2027 realistic).
- Primer revenue: ~30 días post-launch del feature.

### Métricas
- Manager subs activos.
- Avg artistas por manager.
- Cross-conversion (manager → encourage artistas a Pro).

---

## Vía #4a — Comisión Merch (Affiliate)

**Status:** activable Fase 3-4.

### Plataforma
- **Bandcamp:** sin programa affiliate público — research item P1.5 (contactar directly).
- **Shopify Collabs:** disponible para "publishers" — Dauton aplica.
- **Amazon Associates:** programa estándar, fácil setup.
- **Tracking propio:** UTM parameters + Plausible conversion tracking.

### Setup técnico
- Tracking links generation por artista perfil → merch link.
- Plausible custom events para click tracking.
- Affiliate ID environment vars per provider.

### Marketing requerido
- "Add merch link" feature en claim flow (artista declara dónde vende).
- Disclosure FTC visible cerca del link.

### Partnerships
- **Bandcamp partnership** — outreach a `support@bandcamp.com` con propuesta. Sin programa público pero LARGE artists tienen affiliate negotiated.
- **Shopify Collabs application.**

### Costo
- $0 incremental.

### Timeline a primer revenue
- Affiliate ID activable inmediatamente.
- Pero **revenue real depende del tráfico**. Y2 estimado $100/mes.

### Métricas
- Click-through rate desde perfil.
- Conversion rate affiliate.
- Top-converting artistas (insights).

---

## Vía #5 — Comisión Tickets

**Status:** activable Fase 4 con Partner Programs approved.

### Plataforma
- **Eventbrite Referral Partner** — research item P1.7.
- **Ticketmaster Discovery Partner** — research item P1.6 (selectivo).
- **Bandsintown** — research item P1.8.

### Setup técnico
- Eventbrite + Ticketmaster API integration en `src/lib/ingest/workers/`.
- Affiliate ID + tracking parameters en redirects.
- Conversion analytics.

### Marketing
- Mismo perfil de artista + featured events page por ciudad.
- "Buy tickets" CTAs visibles.

### Partnerships REQUIRED
- **Eventbrite Partner Program** application.
- **Ticketmaster** application.
- **Bandsintown** API key + Plus tier consideration.

### Costo
- $0 incremental setup.
- Possible Bandsintown Plus $499/mes si features avanzados.

### Timeline a primer revenue
- Aplicación a partners: 30-60 días.
- Activación: Fase 4.
- Primer revenue: depende del volumen events + clicks.

### Métricas
- Tickets vendidos via Dauton.
- Commission earned.
- Top-converting events.

---

## Vía #6 — Sponsorship Editorial

**Status:** activable Fase 4-5.

### Plataforma
- **Sales toolkit:** template de pitch + media kit con audience demographics + caso studies.
- **Stripe Invoicing** para sponsor payments.
- **Site:** sponsored sections con disclosure.

### Setup técnico
- Component sponsor banner / sponsored section reusable.
- Disclosure logic visible.
- Tracking analytics for sponsor dashboard.

### Marketing requerido
- **Media kit PDF** con: audience size, demographics, traffic sources, content examples.
- **Sales pitch deck** para approach a brands + labels.
- Outreach a 20-30 brands target via founder + Community.

### Partnerships
- Inicialmente ningunas. Eventualmente partnership con brand consultancy LatAm.

### Costo
- $0 setup.
- Effort: 1 person-month sales esfuerzo primer 3 meses.

### Timeline a primer revenue
- Outreach inicio: 3 meses pre-activación.
- Primer sponsor: 6 meses realistic post outreach inicio.
- Primer revenue: $1,000-2,000 piloto.

### Métricas
- Active sponsors.
- Avg deal size.
- Renewal rate.

---

## Vía #7 — Data Licensing B2B

**Status:** Y2 (post MVP solidified).

### Plataforma
- **API endpoint** dedicado en Vercel edge functions.
- **API key management** custom + Stripe.
- **Documentation site** (Mintlify, ReadMe.com, o custom).
- **Analytics dashboard** para tracking usage por licensee.

### Setup técnico
- API design (REST or GraphQL).
- Rate limiting + quota enforcement.
- API key auth.
- Billing integration (Stripe).
- Compliance: DPA template + license agreement template (research items P2.1).

### Marketing requerido
- **Sales materials B2B:** pitch deck + sample data dump + case study.
- **Documentation pública** del API (free tier preview).
- **Outreach a 10-20 labels + music-tech companies.**

### Partnerships
- Ningunas críticas, pero co-marketing con MusicBrainz (CC0 ethos) podría boost.

### Costo
- Tooling docs: $0-200/mes (Mintlify if used).
- Engineering: 4 weeks initial build.
- Sales: ongoing effort.

### Timeline a primer revenue
- Build: 1.5 months.
- Sales cycle: 3-6 meses por enterprise deal.
- Primer revenue: 6-9 meses post-build.

### Métricas
- Active licensees.
- API usage / quota utilization.
- Renewal rate.
- Revenue per licensee.

---

## Vía #9 — Venue Premium Directory (NUEVA)

**Status:** activable Fase 4.

### Plataforma
- **Same stack** (Stripe + Supabase + Next.js).
- Nueva entity: `venues` table (puede ya existir parcialmente vía Event).

### Setup técnico
- Schema: agregar entity Venue con: name, city, capacity, type, photos, description, opening_hours, ticketing_link, claimed_by_user_id.
- Claim flow extension para venues (similar a artist claim).
- Featured logic + city listing pages.
- Stripe subscription para Venue Pro $15/mes.

### Marketing
- Outreach a 50 venues en Caracas + Miami + Madrid + Bogotá. Email + DM Instagram.
- Plantilla "Reclamá el perfil de tu venue gratis" + value prop.

### Partnerships
- Eventbrite ingestion ya populates eventos asociados a venues.
- Possible: partnership con asociaciones de venues (ej. Lapa Brasil association — TBD si existe equivalent VE).

### Costo
- Engineering: 3 semanas.
- Marketing: tiempo + Mailchimp / Resend ($20/mes).

### Timeline a primer revenue
- Build: 3 semanas.
- Outreach campaign: 1-2 meses overlapping.
- Primer revenue: 6-8 semanas post-launch.

### Métricas
- Venues claimed.
- Venue Pro subs.
- Events via Dauton (sinergia).
- Revenue per city.

---

## Vía #10 — Sync Licensing Referral (NUEVA)

**Status:** activable Fase 4-5.

### Plataforma
- Extension de Promoter Search.
- Stripe Connect para commission payout cuando deal cierra.
- Contract template + e-signature (DocuSign $10/mes o HelloSign).

### Setup técnico
- Artist profile field "open to sync" + tags (mood, BPM, language, instrumental).
- Search interface para producers (gated B2B).
- Contact reveal con tracking + auto-contract trigger.

### Marketing
- Outreach a music supervisors LatAm + agencies en Miami/Madrid.
- Posicionamiento: "Catalog LatAm que Songtradr no tiene."

### Partnerships
- Ideal: partnership con agencia sync establecida (Songtradr LatAm office, Bunker Music, etc.).
- Music supervisors freelance contacts.

### Costo
- DocuSign $10/mes.
- Outreach effort: 1 person-month inicial.

### Timeline a primer revenue
- Build: 3 semanas.
- Outreach + first deal: 4-6 meses.
- Primer revenue: ~6 meses post-activation. Highly variable.

### Métricas
- Deals brokered.
- Avg commission per deal.
- Artists in sync pool.

---

## Vía #11 — Public API Freemium (NUEVA)

**Status:** maybe Y2.

### Plataforma
- API + key management (custom o Kong / Tyk).
- Documentation: Mintlify ($0-50/mes startup tier).
- Stripe para paid tiers.

### Setup técnico
- 4 semanas (similar a Track 7 build pero más liviano).

### Marketing
- Hacker News post + DEV.to + Slack/Discord developer communities LatAm.
- Sample applications open-source.

### Costo
- $50/mes Mintlify.
- $0 incremental Stripe.

### Timeline
- Build: 4 semanas.
- Activation Y2 si demand validated.

---

## Vía #12 — Newsletter Premium (NUEVA, condicional)

**Status:** maybe Y2 con audiencia 5k+.

### Plataforma
- **Beehiiv** ($39-79/mes) o **Ghost** ($9-25/mes). Beehiiv tiene mejor monetization built-in (subscriptions).
- Email infra para automation (Resend ya en stack para auto-content).

### Setup técnico
- Auto-extraction de "this week's highlights" de Supabase (cron job).
- Editorial template + brief human commentary.
- Premium content gate.

### Marketing
- Lead magnets (calculadora de ingresos como signup).
- Cross-promotion en site.

### Costo
- Beehiiv $39-79/mes.

### Timeline
- Setup: 1 semana.
- Activation: condicional 5k+ free subs.

---

## Vía #13 — Tip Jar Integrado (NUEVA)

**Status:** Fase 4-5.

### Plataforma
- **Stripe Connect Express** — onboarding del artista, KYC by Stripe.

### Setup técnico
- Stripe Connect onboarding flow.
- Tip UI en perfil del artista.
- Commission split logic (90/10).

### Marketing
- Notificación a artistas claim-ed que feature está disponible.

### Costo
- Stripe Connect: 0.25% + $2/account active mensual + standard processing.

### Timeline
- Build: 3 semanas.
- Primer revenue: organic post-activation.

---

## Vía #15 — Annual State of Scene Report (NUEVA)

**Status:** Q4 2027.

### Plataforma
- PDF production (Adobe / Figma).
- Print-on-demand (Lulu, IngramSpark, Blurb).
- Stripe Invoicing para sales B2B.

### Setup técnico
- Report template design.
- Data extraction scripts del dataset Dauton.

### Marketing
- Pre-order campaign 2 meses antes de release.
- Outreach a universidades (cultural studies, Latin American studies departments).
- Press release a media latina.

### Partnerships
- Ideal: co-author / endorsement de figura cultural reconocida.

### Costo
- Design: $1-3k.
- Print POD: $0 upfront (per-unit).
- Marketing: $500.

### Timeline
- Production: 2 meses.
- Release: Q4 anual.
- Revenue: $4-15k by edition.

---

## Vía #16 — Label Verified Onboarding (NUEVA)

**Status:** activable Q1-Q2 2027 con outreach proactive.

### Plataforma
- Existing claim flow + bulk operations.
- Contract template (B2B service agreement) + DocuSign.

### Setup técnico
- Bulk import tools (CSV → claim batch).
- Bulk verify workflow.

### Marketing
- Outreach directo a 10 labels target.
- Pitch deck + sample report.

### Partnerships
- N/A — Dauton es el provider.

### Costo
- DocuSign $10/mes.
- Time: ~1 person-month por engagement.

### Timeline
- First label conversation: 1-2 meses outreach.
- Onboarding execution: 1 mes.
- Primer revenue: 3-4 meses post-outreach.

---

## Vía #17 — Promoter Search B2B (en roadmap)

**Status:** activable Fase 4.

### Plataforma
- Stripe (subscription).
- Search + filter UI (extension de archive search).

### Setup técnico
- Subscription gate.
- Search avanzado + filters (city, genre, tracción, availability).
- Contact reveal logging + opt-in del artista.
- Anti-scrape (rate limits, CAPTCHA opcional).

### Marketing
- Outreach a 30 promotores LatAm + USA latino.

### Costo
- Engineering: 3 semanas.
- Outreach effort.

### Timeline
- Build + outreach overlapping.
- Primer revenue: 2-3 meses post-launch.

---

## Stack consolidado de plataformas necesarias

### Core (ya en uso)
- Vercel — hosting + edge functions.
- Supabase — DB + auth + storage.
- Cloudflare — DNS + CDN.
- Plausible — analytics.
- Resend — transactional email.
- GitHub Actions — cron jobs.

### Monetization-specific (a activar progresivamente)
- **Stripe** (Fase 4) — subscriptions + tax + connect.
- **Stripe Connect Express** (Fase 4-5) — para tip jar + merchant onboarding.
- **Ko-fi** (MVP launch) — donations.
- **DocuSign** o **HelloSign** (Fase 4-5) — contracts (sync, label, sponsor).
- **Beehiiv** o **Ghost** (Y2 condicional) — newsletter.
- **Mintlify** o **ReadMe.com** (Y2 condicional) — API docs.
- **Lulu / IngramSpark** (Y2 condicional) — print-on-demand reports.

### Marketing-specific
- **Resend** (ya) — transactional + outreach (con warmup).
- **Instantly** o **ListMonk** (Fase 3+) — bulk outreach campaigns.
- **LinkedIn Sales Navigator** (Vulqo subscription, Fase 4+) — sales prospecting.

---

## Costos consolidados estimados

### MVP launch (Q4 2026)
- Ko-fi: $0
- Stripe: $0 base
- **Total: $0/mes**

### Fase 4 (Q1 2027)
- Stripe processing: variable
- DocuSign: $10/mes
- Resend tier with outreach: $20/mes
- **Total: $30/mes + variable**

### Y2 expanded
- Newsletter platform: $39-79/mes
- API docs platform: $50/mes
- Mailing tool (Instantly): $30-100/mes
- **Total: $150-260/mes**

---

*Cross-refs: `monetization-audit.md`, `pricing-strategy.md`, `go-to-market-playbook.md`, `08-Legal-Compliance/legal-audit-master.md`.*
