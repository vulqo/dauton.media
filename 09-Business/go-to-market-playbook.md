# Go-to-Market Playbook — Dauton Media

**Owner:** Business & Legal agent
**Última actualización:** 2026-04-25
**Status:** v1 — tácticas de activación por vía

---

## Propósito

Por cada vía de revenue activable, este doc define **cómo lanzamos**: hook inicial, canales, materials, KPIs de validación, budget. Es el "qué hacemos en la semana 1, semana 4, semana 12 después de activar".

Coordina con Community & Outreach para outreach humano + Engineering para tooling + Data & SEO para distribution.

---

## Principios de GTM

1. **Producto-led primero, sales después.** Cada vía idealmente convierte por self-service. Sales human es para B2B + edge cases.
2. **Soft launch antes de hard launch.** 1-2 weeks beta cerrada con users selectos antes de público.
3. **Mide conversión por canal.** UTM tags + Plausible + spreadsheet weekly review.
4. **Iterate rápido.** Si una vía no convierte después de 90 días, kill o pivot.
5. **No paid acquisition Y1.** Organic + outreach + partnerships only. Save paid ads para Y2 cuando hay LTV data.

---

## Vía #1 — Donaciones Ko-fi (MVP launch)

### Hook
"Apoya el archive cultural más completo del rap hispano. Dauton se sostiene con tu apoyo y ningún anunciante."

### Materiales necesarios
- [ ] Footer button visible "❤ Apoya Dauton" linking a Ko-fi.
- [ ] Page `/support` con narrativa breve + CTA + impact statement ("Tu apoyo permite mantener X+ perfiles activos").
- [ ] Footer mention en newsletter (si activamos).

### Canales
- Site footer (always-on).
- Soft mention en perfiles de artistas que recibieron contribución (subtle).
- Twitter / IG announcement post-launch.

### Timeline week 1-12
- W1 (launch week): widget live + page activa.
- W4: primer review de conversion. ¿Ratio MAU / donors?
- W12: snapshot. Si <$50/mes total, estamos bajo expectativa — re-evaluar messaging.

### KPIs
- Donations totales acumulados.
- Avg donation $.
- Repeat donors %.
- Conversion rate visitantes → donors (baseline 0.1-0.5%).

### Budget
- $0-72/año (Ko-fi Gold optional).

---

## Vía #2 — Artist Pro Subscription (Fase 4)

### Hook
"Reemplazá tu Notion personal y tu manager asistente con un perfil pro que se mantiene solo. $8/mes."

### Pre-launch (4 weeks antes de activación)

- [ ] Survey a 20 artistas claim-ed gratis: "¿qué features pagaríais?"
- [ ] Validate top 3 features pedidos vs features planeados.
- [ ] Adjust feature set si gap.

### Launch sequence

**Week 0:** activación técnica (Stripe + feature gates).

**Week 1: Soft launch a primer 10 artistas friendly**
- DM personal: "Estamos lanzando Pro. Te queremos como primer 10 supporters. Si te suscribís hoy, $8/mes for life + un slot Pro early."
- Goal: 5/10 conversion, validar producto.

**Week 2-3: Email a todos los artistas claim-ed**
- Template Resend con value prop + features + CTA.
- A/B test: subject line "Tu perfil ahora puede ser Pro" vs "Nuevo en Dauton: features que pediste".

**Week 4: Public announcement**
- Twitter / IG post con visual demo.
- Newsletter mention.
- Page `/pro` con waitlist convertida.

**Week 5-12: Sales follow-up**
- Email re-engagement a artistas que vieron `/pro` pero no convirtieron.
- Offer trial de 30 días si artistas piden.

### Materiales necesarios
- [ ] Page `/pro` con value prop + features list + pricing + FAQ + testimonials (post-week 4).
- [ ] Email sequence (3 emails: announce, value, last chance).
- [ ] Demo video 60s mostrando features (Loom).
- [ ] Comparison table vs Bandcamp Pro / Soundcloud Pro / Notion (subtle).

### Canales
- Email outbound a artistas claim-ed (primary).
- Site CTAs en perfiles claim-ed gratis ("Upgrade to Pro").
- Newsletter (si activo).
- Twitter / IG.

### KPIs
- Conversion rate (claim → Pro): target 10-15% within 90 días.
- Churn mensual: target < 5%.
- LTV target: > $200 (~25 meses).
- MRR target Q3 2027: $300/mes (40 subs).

### Budget
- $0 incremental (existing tools).
- Time: 1 person-month sales effort weeks 1-12.

---

## Vía #3 — Manager Subscription (post Artist Pro)

### Hook
"Manejá hasta 3 artistas con un dashboard. $20/mes. Mucho más barato que Chartmetric."

### Pre-launch
- Identify 10 managers conocidos (vía artistas claim-ed que tengan manager listed).
- Validate feature set con 5 of them ("¿qué dashboard necesitarías?").

### Launch
- Direct outreach a 10 managers identified.
- Offer 60 días free trial (excepción a "no trials" — B2B sales cycle más largo).

### KPIs
- 5/10 conversion target.
- $100/mes MRR Q4 2027.

### Budget
- $0 incremental.
- Time: ~30 hours sales effort.

---

## Vía #4a — Comisión Merch Affiliate (Fase 3-4)

### Hook (silencioso para fans, explícito para artistas)
"Si tu fan compra merch desde tu perfil Dauton, vos ganás. Affiliate setup automático."

### Pre-launch
- [ ] Aplicar Shopify Collabs (research item P1.5).
- [ ] Outreach a Bandcamp para partnership (research item P1.5).
- [ ] Setup Amazon Associates (instant).

### Launch
- Auto-apply tracking links a todos los merch links externos en perfiles.
- Comunicar a artistas claim-ed: "Tu link de Bandcamp ahora trackea conversiones via Dauton."

### Materiales
- [ ] FTC disclosure visible cerca del link + footer global.
- [ ] Dashboard analytics para artistas (clicks + estimated commission).

### KPIs
- Click-through rate desde perfil → merch external (baseline 2-5%).
- Conversion rate affiliate (baseline 1-2%).
- Revenue per click (variable).

### Budget
- $0 incremental.

---

## Vía #5 — Comisión Tickets (Fase 4)

### Hook
"Cuando un fan compra ticket via Dauton, vos ganás visibility, nosotros ganamos commission, todos ganamos."

### Pre-launch
- [ ] Aplicar Eventbrite Referral Partner.
- [ ] Aplicar Ticketmaster Partner Program.
- [ ] Aplicar Bandsintown API.

### Launch
- Auto-tracking en redirect-to-tickets links (ya implementado pre-MVP redirect).
- Activar commission cuando partner approval llega.

### KPIs
- Tickets sold via Dauton/mes.
- Commission earned/mes.

### Budget
- $0 (excepto possible Bandsintown Plus si features avanzados $499/mes).

---

## Vía #6 — Sponsorship Editorial (Fase 4-5)

### Hook (sales pitch a brands)
"Dauton Media: la plataforma con la audiencia más cualificada del rap hispano. Patrocina una sección editorial transparente, sin perder credibilidad."

### Pre-launch (3 meses antes)
- [ ] Build media kit PDF: audience size, demographics, traffic sources, content examples, sample sponsor formats.
- [ ] Sales pitch deck con casos de uso (sponsor week mapa, sponsor week timeline).
- [ ] Lista de 30 brands target en `stakeholder-list.md` §Sponsors.

### Launch sequence

**Month 1:** outreach inicial (cold + warm).
- LinkedIn + email a brand managers en target companies.
- Goal: 3-5 conversaciones.

**Month 2:** primer pitch.
- Pitch a 1-2 brands con highest fit.
- Goal: 1 piloto $500-1,500.

**Month 3:** ejecución piloto + case study.

**Month 4+:** scale outreach con case study.

### Materiales
- Media kit PDF.
- Pitch deck.
- Case study post-piloto.
- Sponsor week format spec (1-pager).

### KPIs
- Outreach → meeting rate (target 10-15%).
- Meeting → signed deal rate (target 20%).
- Avg deal size (target $1,500).
- Active sponsors mensuales.

### Budget
- $0 setup.
- Sales time: 1-2 person-months.
- Possible commission a sales freelance: $200-500 per closed deal (Y2+).

---

## Vía #7 — Data Licensing B2B (Y2)

### Hook (sales B2B)
"La cobertura LatAm que Chartmetric no tiene. API + dashboards. Desde $300/mes."

### Pre-launch (3 meses)
- [ ] Build API + dashboards.
- [ ] DPA template + license contract drafted.
- [ ] Sample data dump preparado para demo.
- [ ] Pitch deck B2B.

### Launch sequence

**Month 1:** outreach a 5 labels target.
- Vía LinkedIn + email + warm intros.
- Goal: 3 calls scheduled.

**Month 2:** demos + proposals.

**Month 3-6:** sales cycle B2B (slow).

### KPIs
- Outreach → demo: target 30%.
- Demo → close: target 20%.
- Avg ACV: $5,000-10,000.

### Budget
- Tooling: $50-100/mes (API docs platform).
- Sales: 4 person-months Y2.

---

## Vía #9 — Venue Premium Directory (Fase 4, NUEVA)

### Hook
"El perfil de tu venue, gratis. Si querés destacar en tu ciudad, $15/mes."

### Pre-launch
- [ ] Identificar 50 venues target en Caracas, Maracay, Maracaibo + Miami, Madrid, Bogotá, Medellín, BA.
- [ ] Crear template outreach (email + DM IG).

### Launch sequence

**Week 1:** activación feature.

**Week 2-4:** outreach a 50 venues con email "Reclamá tu perfil gratis" — soft entry.

**Week 5-8:** segundo touch a venues claim-ed: "Querés destacar en tu ciudad por $15/mes?"

**Week 9-12:** featured testimonial + city-specific marketing.

### Materiales
- Email template "Reclamá gratis tu venue".
- Email template "Upgrade a Pro".
- Page `/venues` showcase del directorio.
- Demo video.

### Canales
- Email + IG DM (primary).
- Cold visit a venues clave (founder + Community).

### KPIs
- Venues claim-ed (target 30 of 50 outreached = 60%).
- Conversion claim → Pro (target 15%).
- MRR target Q4 2027: $300/mes (20 venues × $15).

### Budget
- $20/mes Mailchimp/Resend para outreach automation.
- Founder/Community time.

---

## Vía #10 — Sync Licensing Referral (Fase 4-5, NUEVA)

### Hook (a artistas)
"Dauton te conecta con productores de cine, ads y series buscando música. Tú decidís cada deal. Dauton cobra 12% solo si el deal cierra."

### Hook (a productores audiovisuales)
"Catalog LatAm que Songtradr no tiene. Búscanos por mood, género, BPM."

### Pre-launch
- [ ] Build feature: "open to sync" flag + tags en perfil.
- [ ] DocuSign account + contract template.
- [ ] Outreach list: 30 music supervisors LatAm + Latin US.

### Launch sequence

**Month 1:** activar para artistas claim-ed Pro. Mensaje claro de qué es.

**Month 2-3:** outreach a music supervisors / agencies.

**Month 4+:** primer deal closing cycle (variable).

### Materiales
- Onepager para music supervisors (PDF).
- Sample search demo.
- Contract template tripartito.

### KPIs
- Artists in sync pool: target 50+ Y2.
- Deals brokered: target 5+ Y2.
- Avg commission per deal: $500-1,500.

### Budget
- $10/mes DocuSign.
- Time: 2 person-months sales.

---

## Vía #13 — Tip Jar (Fase 4-5, NUEVA)

### Hook (a artistas)
"Tus fans pueden tippearte directamente desde tu perfil. Dauton 10%, vos 90%. Lo activás cuando querés."

### Pre-launch
- Stripe Connect Express integration tested.

### Launch
- Email a artistas claim-ed Pro: "Activá tu tip jar en 2 minutos."
- Soft launch: 10 artistas pilots.
- Public announcement post-pilot success.

### KPIs
- Artists con tip jar activo (target 30%+ de Pro subs).
- Tips totales / mes.
- Commission ganada.

### Budget
- Stripe Connect fees.
- Engineering integration time.

---

## Vía #15 — Annual State of Scene Report (Q4 2027, NUEVA)

### Hook
"State of Rap Hispano 2027 — el primer reporte data-driven de la escena. $30 digital, $50 print + digital."

### Pre-launch (3 meses antes)
- Pre-order page con waitlist + 20% off lock.
- Cover design + sample pages publicadas.
- Press outreach a media (Remezcla, Red Bull Music, Billboard Latin).

### Launch
- Q4 2027 release.
- Print run limited (500 copies).
- Digital sales open ongoing.

### Materiales
- Cover design + 5 sample pages.
- Press release.
- Pre-order landing page.

### KPIs
- Pre-orders.
- Total sales primer 90 días.
- Press coverage (mentions).

### Budget
- $1-3k design + production.
- Print POD self-funded.

---

## Vía #16 — Label Verified Onboarding (Q1-Q2 2027, NUEVA)

### Hook (a labels)
"Onboardeamos los 100 artistas de tu roster en Dauton, con perfiles completos + verify, en 30 días. $4,500."

### Pre-launch
- Build bulk import tools.
- Pitch deck B2B.
- DocuSign B2B agreement template.

### Launch sequence

**Month 1:** outreach a 5 labels seleccionados (Rimas, Rich Music, Neon16, etc).

**Month 2-3:** primer engagement signing.

**Month 3-4:** delivery primer engagement.

### KPIs
- Engagements closed: target 2 Y2.
- Avg engagement size: $3,500.

### Budget
- $10/mes DocuSign.
- 1 person-month por engagement.

---

## Vía #17 — Promoter Search B2B (Fase 4)

### Hook
"Encontrá artistas en LatAm que no encontrás en otras platforms. Filtrar por city + género + tracción. Desde $30/mes."

### Pre-launch
- Feature build (3 weeks).
- 10 promotores beta access gratis (1 mes).

### Launch
- Public launch post-beta.
- Outreach a 30 promotores LatAm (lista en `stakeholder-list.md`).

### KPIs
- Subs: 10 Q4 2027.
- MRR: $400/mes Y2.

---

## Sales materials inventory

### MVP (Fase 3)
- Site itself (perfiles + tools = best demo).
- About page + Methodology page.
- Press release launch (template ready).

### Fase 4
- [ ] Pro landing page `/pro`.
- [ ] Email sequence Pro.
- [ ] Demo video Pro (60s).
- [ ] Venue landing `/venues`.
- [ ] Sponsor media kit PDF.
- [ ] Pitch deck Pro (sales deck).

### Fase 4-5
- [ ] Promoter search demo.
- [ ] Sync licensing onepager.
- [ ] Tip jar onepager.

### Y2
- [ ] Data licensing pitch deck.
- [ ] API documentation site.
- [ ] Annual report design + sample pages.
- [ ] Label onboarding pitch deck.

---

## Marketing channels priority

### MVP launch
1. **Organic SEO** (Data & SEO chat owns this) — long-tail keywords artistas + visualizaciones.
2. **Social** — Twitter + IG founder + Dauton handles.
3. **PR** — outreach a Remezcla, Red Bull Music, LOUD, latin music media.
4. **Community** — Reddit (r/musica, r/Venezuela), Discord servers de música latina.

### Fase 4+
1. SEO (continued).
2. **Outreach masivo a artistas** (Community owns).
3. **B2B sales** (founder owns).
4. **Newsletter** (if activado).
5. **Partnerships** — co-marketing con Remezcla / labels / promotores.

### Y2+
1. **Paid acquisition** — Google + Meta ads para Pro signup. Test budget $500/mes inicialmente.
2. **PR escalado** — Billboard, Rolling Stone Latin.
3. **Conferences** — SXSW, Latin GRAMMY week, Bizmedia events.

---

## Budget GTM consolidado

### MVP launch (Q4 2026)
- $0-100/mes (mostly free tooling).

### Fase 4 (Q1 2027)
- $50-200/mes — Resend tier + DocuSign + ListMonk for outreach.

### Y2
- $200-500/mes — newsletter + API docs + sales tools.
- $500-2,000/mes paid acquisition (test).

### Y3
- $2,000-5,000/mes — paid + partnerships + conferences.

---

## Decision rules — when to kill a vía

Si después de 90 días post-activación:
- **Conversion rate < 50% del target** → review messaging + features.
- **Conversion rate < 25% del target** → kill or pivot.

Si después de 6 meses:
- **MRR < 30% del target** → re-evaluate completely.
- **Churn > 15% mensual** → pause new acquisition, fix product first.

---

*Cross-refs: `monetization-audit.md`, `pricing-strategy.md`, `revenue-streams-requirements.md`, `stakeholder-list.md`.*
