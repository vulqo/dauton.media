# New Opportunities — Vías de monetización propuestas por el agent

**Owner:** Business & Legal agent
**Última actualización:** 2026-04-25
**Status:** v1 — propuestas para review founder

---

## Propósito

El agent (en su rol comercial) analizó el plan original (`financing-tracks.md` v1) y detectó **vías de revenue no consideradas** que tienen alto fit con la visión Dauton + bajo riesgo legal + leverage de assets ya existentes. Este doc las propone con rationale + condiciones de activación.

Cada propuesta tiene:
- **Concepto** (qué es).
- **Por qué encaja** (alignment).
- **Por qué fue ignorada hasta ahora** (gap).
- **Riesgos**.
- **Recursos necesarios**.
- **Recomendación final** (priority).

---

## Propuesta #9 — Venue Premium Directory

### Concepto
Directorio público de venues (espacios de música, clubs, festivales) con perfiles claim-eables estilo Yelp / Google Business. Venue Basic gratis (perfil con info pública), Venue Pro $15/mes para destacado en su ciudad + featured listings + analytics de visitas.

### Por qué encaja
1. **Plan-maestro lo lista explícitamente** como audiencia (sección "VENUES — capa local, GTM de captación masiva vía SEO geográfico"). Pero NO está en `financing-tracks.md` — gap detectado.
2. **Leverage de schema existente:** entity `Event` ya existe + relación con `City` + concepto de claim flow. Extension natural.
3. **Sinergia con eventos ingestion:** los eventos que populamos (Eventbrite) ya tienen venue como parámetro. Cada evento conecta a un venue.
4. **SEO local:** "salas de música en Caracas", "clubs reggaetón Miami" — long-tail keywords con poca competencia.
5. **Modelo Yelp validado** — venues pagan por destacado consistentemente.

### Por qué fue ignorada
- `financing-tracks.md` v1 se enfocó en artistas (audiencia primaria). Venues quedaron en plan-maestro pero sin monetización clara.
- Ninguna persona en el chat de planning lo proposó como revenue.

### Pricing sugerido
- **Venue Basic:** $0 — claim + edit info + photos + próximos eventos.
- **Venue Pro $15/mes o $150/año:** Basic + destacado en city listing + eventos featured (boost en search) + analytics (visits, clicks a tickets) + soporte.
- **Venue Premium $35/mes** (post-tracción): Pro + sponsored placement en ciudad + advanced analytics + integration con sus ticketing.

### Riesgos
- ⚠ Legal: data pública de venues OK. Privacy minimal — direcciones, capacidad, history son business data.
- ⚠ Mercado: venues LatAm informales — friction baja para Basic, pero conversión a Pro requiere demostrar ROI (más visits, más bookings).
- ⚠ Técnico: nueva entity Venue + claim flow extension + featured logic. ~3 semanas.

### Recursos necesarios
- **Plataforma:** Stripe (subscription), Vercel (hosting), Supabase (DB) — ya en stack.
- **Marketing:** outreach a 50 venues en Caracas + Miami + Madrid en Fase 4. Plantillas email + cold call si aplica.
- **Partnership:** ninguna requerida en MVP. Eventbrite/Bandsintown ingestion ya da data de venues.
- **Costo activación:** $0 incremental. Costo operativo: tiempo founder + Community.

### Revenue realista
- Y2: 20 venues × $15 = $300/mes MRR.
- Y3: 100 venues × $20 promedio = $2,000/mes MRR.

### Recomendación
**ALTA PRIORIDAD.** Activar **Fase 4 junto a Artist Pro**. Es un track independiente que monetiza una persona explícitamente listada en plan-maestro pero olvidada en el primer pass de financing-tracks.

---

## Propuesta #10 — Sync Licensing Referral

### Concepto
Conectar artistas Dauton con oportunidades de sync licensing (ads, series, films, video games). Productores audiovisuales buscan música; Dauton facilita el match. Commission por placement exitoso (10-15%).

### Por qué encaja
1. **Catalog LatAm underrepresented** en libraries existentes (Musicbed, Artlist, Songtradr, Shutterstock Music). Mercado real.
2. **Artistas latinos buscan estas opportunities** activamente — tradicionalmente accesible solo via labels grandes o agencias caras.
3. **Leverage del claim flow:** artista verified en Dauton declara "abierto a sync" en su perfil → entra al pool elegible.
4. **High ticket per deal:** sync placement típico $500-$10,000+.

### Por qué fue ignorada
- `financing-tracks.md` se enfocó en revenue recurring (subs + commissions volume). Sync es revenue puntual + alto ticket — modelo diferente que no encajó en el framework original.

### Mecánica
1. Artista claim-ed marca disponibilidad sync + género + tags (mood, BPM, language).
2. Productores audiovisuales (post-Y1, requiere outreach específico) acceden a search interno.
3. Match → contacto vía Dauton → deal directo entre artista y productor.
4. Dauton recibe 10-15% commission del deal vía contrato tripartito.

### Riesgos
- ⚠ Legal: contrato tripartito complejo (artista / Dauton / licensee). Template pending — research item P2.5.
- ⚠ Mercado: ciclos de sync largos (6-12 meses). No es revenue mensual.
- ⚠ Operativo: requiere outreach a productores audiovisuales LatAm/US Latino. No automatizable inicialmente.

### Recursos necesarios
- **Plataforma:** UI de search + filtering (extension de Promoter Search). Stripe Connect para payout commission.
- **Marketing:** outreach a productores ads LatAm (agencias en Miami, México, Madrid). 1 person-month effort.
- **Partnership:** opcional partnership con Sync agencies establecidas (Songtradr LatAm office? — research).
- **Costo activación:** ~$5k en outreach + tooling.

### Revenue realista
- Y2: 5 deals × $1,000 commission = $5,000 (anual, no mensual).
- Y3: 30 deals × $1,500 commission = $45,000 anual.

### Recomendación
**MEDIA-ALTA PRIORIDAD.** Activar Fase 4-5 post-claim flow + 50+ artistas Pro. Es **diferenciador real** vs competencia (ningún competitor LatAm lo ofrece). Buy-in del founder requerido — esto es B2B sales, no purely product.

---

## Propuesta #11 — Public API Freemium

### Concepto
API pública con tier free (rate-limited 1000 req/día) + tier paid ($19/mes 10k req/día, $49/mes 50k req/día). Como Genius API, MusicBrainz, Spotify (pero target LatAm).

### Por qué encaja
1. **Marketing secundario excelente** — API pública = credibility tech + atrae developers + posible casos de uso inesperados.
2. **Target nicho:** academic research, music-tech startups LatAm, journalists data-driven.
3. **Leverage del dataset existente** — no requiere construir nada nuevo, solo expose con rate limits.

### Por qué fue ignorada
- Original plan se enfocó en Track 7 Data Licensing como B2B. API freemium es B2D (developers) — segmento no considerado.

### Mecánica
- Endpoint REST + key auth.
- Free tier: 1k/día, attribution required.
- Paid: $19/mes 10k req, $49/mes 50k req, $199/mes unlimited.
- ToS API (drafted by agent).

### Riesgos
- ⚠ Legal: ToS API + restrictions (e.g., no redistribución masiva sin license).
- ⚠ Técnico: rate limiting + monitoring + API documentation. ~4 semanas.
- ⚠ Mercado: developer adoption es slow burn. No esperar revenue Y1.

### Recursos
- **Plataforma:** API + key management. Posible build sobre Supabase + Vercel edge functions.
- **Marketing:** docs en site + Hacker News post + developer communities LatAm (DEV.to, Slack groups).
- **Costo:** ~$5k incremental Y2.

### Revenue realista
- Y2: 5 paid users × $30 promedio = $150/mes.
- Y3: 30 users × $40 = $1,200/mes.

### Recomendación
**MAYBE Y2.** Activar si hay 3+ inbound requests de developers durante Y1. Skip si no hay signal.

---

## Propuesta #12 — Newsletter Premium Digest

### Concepto
Newsletter weekly: free tier con highlights + Premium $3/mes con deep-dive + early access a herramientas + members-only content.

### Por qué encaja
1. **Audiencia recurring engagement** — newsletter es el retention play más probado de media indie.
2. **Pre-MVP infrastructure cost low** — Beehiiv o Ghost.

### Por qué fue ignorada
- Founder rechazó "editorial tradicional / blogs". Newsletter puede sentirse igual.

### Cómo evitar el conflicto con visión founder
**Framing crítico:** newsletter NO es editorial blog content. Es **curated digest automatizado**:
- Lista de releases nuevos de la semana (auto-pulled).
- Top 3 visualizaciones más vistas.
- 1 nuevo perfil destacado (auto-extracted).
- 1 evento upcoming destacado.
- Stats agregados ("Esta semana: X nuevos artistas, Y nuevos events").
- **Comentario humano breve** (founder o automation) tipo "Why this matters" — 100 palabras max.

Premium tier agrega:
- Top 10 releases (vs 3 free).
- 1 deep-dive auto-generated (timeline expandido, comparison chart, etc).
- Early access a herramientas pre-launch.

### Riesgos
- ⚠ Alignment con founder — discutir framing antes de activar.
- ⚠ Mercado: newsletter paga es nicho. Audiencia mínima viable: 5k suscriptos free para conversión 1-3% a paid.

### Recursos
- **Plataforma:** Beehiiv ($39/mes) o Ghost.
- **Marketing:** waitlist + lead magnet (calculadora de ingresos = lead magnet natural).
- **Costo:** $39-50/mes plataforma.

### Revenue realista
- Y2 (5k suscriptos free, 100 paid): 100 × $3 = $300/mes.
- Y3 (10k free, 300 paid): $900/mes.

### Recomendación
**MAYBE — discutir alignment con founder.** Si SÍ se activa, framing como "curated digest" es crítico. Activar post-MVP cuando audiencia llegue a 5k+ free subs.

---

## Propuesta #13 — Tip Jar Integrado (Fan → Artist)

### Concepto
Cada perfil de artista verified tiene tip jar embebido. Fan tippea $1-100. Stripe Connect — Dauton 10% commission, artista 90%.

### Por qué encaja
1. **Modelo Patreon / Bandcamp tip / Ko-fi pero integrado al perfil** — friction baja, conversion potencialmente alta.
2. **Win-win:** artista monetiza fans existentes, Dauton revenue automático con cero outreach.
3. **No mata otras plataformas** — complementa.
4. **Sinergia con claim flow** — solo artistas claim-ed pueden activar.

### Por qué fue ignorada
- Original plan no consideró revenue donations-style en perfil del artista (solo Dauton recibiendo donations).

### Mecánica
1. Artista claim-ed activa "tip jar" en settings.
2. Stripe Connect Express onboarding (KYC by Stripe).
3. Fans ven botón "Tip [Artista]" en su perfil.
4. Tip $1-100, Stripe procesa, Dauton 10% commission, artista recibe 90% en su connected account.

### Riesgos
- ⚠ Legal: Stripe Connect + KYC del artista. PCI by Stripe. Marketplace facilitator considerations.
- ⚠ Técnico: Stripe Connect Express integration + payout flows. 3 semanas.
- ⚠ Mercado: depende del volumen de fans engaged. Niche use case probablemente.

### Recursos
- **Plataforma:** Stripe Connect Express ($0 base + processing fees).
- **Marketing:** comunicación a artistas claim-ed que el feature está disponible.
- **Costo:** development time + Stripe fees.

### Revenue realista
- Y2: 50 artistas activos × $10/mes promedio en tips × 10% = $50/mes commission.
- Y3 con volume: $200-500/mes commission.

### Recomendación
**MEDIA PRIORIDAD.** Activar Fase 4-5 post claim flow maduro. Fácil de discontinuar si no convierte.

---

## Propuesta #15 — Annual "State of Rap Hispano" Report

### Concepto
Reporte anual data-rich (50-100 pages) sobre el estado del rap/urbano hispano. Print + digital. $20-50 individual, $200-500 institutional license.

### Por qué encaja
1. **Leverage del dataset acumulado** — al final de Y2, Dauton tiene data unique.
2. **Branding play fuerte** — "El reporte de la industria" = autoridad cultural.
3. **Audience expansion:** universidades, journalists, agencies, labels.
4. **Modelo probado:** Pollstar, IFPI, Music Business Worldwide reports.

### Por qué fue ignorada
- Original plan no consideró revenue puntual (one-time) — solo recurring.

### Mecánica
- Q4 cada año, Dauton publica annual report.
- Free executive summary + paid full report.
- Print edition limited (500 copies, $50).
- Digital PDF $30.
- Institutional license $300 (incluye derecho a citar/distribuir interno).

### Riesgos
- ⚠ Operativo: requiere editorial work + design. ~2 person-months.
- ⚠ Mercado: institutional sales lentos (universidades, labels grandes).

### Recursos
- **Plataforma:** PDF/print production. Lulu o IngramSpark para print-on-demand.
- **Marketing:** outreach a universidades + media + labels.
- **Costo:** $2-5k production primer year.

### Revenue realista
- Y2 first edition: 100 sales × $30 + 5 institutional × $300 = $4,500 one-time.
- Y3 second edition: 300 sales × $35 + 15 institutional × $300 = $15,000.

### Recomendación
**MEDIA PRIORIDAD Y2-Y3.** Es brand play más que revenue play. Activar Q4 2027 si dataset maduro + 1 colaborador editorial freelance.

---

## Propuesta #16 — Label Verified Onboarding as a Service

### Concepto
Label contrata a Dauton para onboardear 50-100 artistas de su roster de una vez, con verify completo + bios + photos + stats. Service fee upfront $2-5k.

### Por qué encaja
1. **Mercado real:** labels LatAm valoran presencia digital consistente. Onboardear roster artist-by-artist es manual + caro.
2. **Leverage de claim flow:** lo que hacemos artist-individual lo hacemos batch para label.
3. **Open door para Track 7 (Data Licensing):** label que hace onboarding probablemente compra data tier después.

### Por qué fue ignorada
- Original plan tenía Track 7 (Label Tier B2B) pero no esta vía intermedia upfront-fee.

### Mecánica
- Label contacts Dauton, define roster (50-200 artistas).
- Dauton genera perfiles ricos + verifica via comunicación con label rep.
- Output: link list + report con metrics + integration con Label Pro tier (sub-tier follow up).
- Service fee $2-5k pagado upfront.

### Riesgos
- ⚠ Legal: contrato B2B + DPA + scope clarity.
- ⚠ Operativo: 50 artistas onboarding = ~1 month work. No escalable infinito.
- ⚠ Mercado: labels LatAm pueden no tener budget service.

### Recursos
- **Plataforma:** existing claim flow + bulk tools.
- **Marketing:** outreach a 5-10 labels (Rimas, Rich Music, Neon16, Warner Latina, Sony Latin).
- **Costo:** sales + onboarding execution time.

### Revenue realista
- Y2: 2-3 labels × $3,500 = $7-10k one-time.
- Y3: 5-8 labels × $4k = $20-32k anual.

### Recomendación
**MEDIA-ALTA PRIORIDAD.** Outreach proactive a labels Q1-Q2 2027. Si primer label sign, blueprint para escalar.

---

## Resumen de impacto si activamos las propuestas top

Asumiendo activación condicional + tracción razonable:

| Propuesta | Activación | Y2 MRR esperado | Y3 MRR esperado |
|---|---|---|---|
| #9 Venue Directory | Fase 4 | $300 | $2,000 |
| #10 Sync Licensing | Fase 4-5 | $400 | $3,750 |
| #13 Tip Jar | Fase 4-5 | $50 | $350 |
| #15 Annual Report (anualized) | Q4 2027 | $375 | $1,250 |
| #16 Label Onboarding (anualized) | Q1 2027+ | $625 | $2,000 |
| **Total NEW opportunities** | | **$1,750/mes** | **$9,350/mes** |

Comparado con plan original (financing-tracks):
- Y2 plan original: ~$1,500/mes MRR.
- Y2 plan original + nuevas: **~$3,250/mes MRR.**
- Y3 plan original: ~$10k/mes.
- Y3 plan original + nuevas: **~$19k/mes.**

**Las propuestas duplican el revenue potencial sin agregar complejidad legal mayor.**

---

## Lo que NO propuse (y por qué)

| Idea descartada | Razón |
|---|---|
| Streaming platform propio | Compite con Spotify, viola visión "no-DSP". |
| Coupon / discount platform | Race to bottom, low margin, distrae. |
| Verified ID-as-a-service para terceros | Privacy nightmare. Out of scope. |
| Music NFTs | Volatilidad + reputación. Founder no lo quiere. |
| Online radio / podcast hosting | Out of scope core. |
| Crowdsourced lyric translation | Lyrics hosting prohibido políticamente. |
| Music tutoring marketplace | Out of scope core. |
| Branded merch del artista hosteado por Dauton | Ya descartado en monetization-audit.md (#4b complexity). |

---

*Cross-refs: `monetization-audit.md`, `financing-tracks.md`, `revenue-streams-requirements.md`, `pricing-strategy.md`.*
