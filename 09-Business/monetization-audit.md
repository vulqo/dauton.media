# Monetization Audit — Dauton Media

**Owner:** Business & Legal agent
**Última actualización:** 2026-04-25
**Status:** v1 — audit completo de todas las vías contempladas + propuestas nuevas

---

## Propósito

Este doc es la auditoría completa de cada vía de monetización que Dauton contempla, actualmente o como propuesta nueva. Por cada vía evaluamos:

- **Viabilidad legal** (¿hay blocker en `08-Legal-Compliance/legal-audit-master.md`?)
- **Viabilidad técnica** (¿qué platform + integration requiere?)
- **Viabilidad de mercado** (¿hay demanda validable?)
- **Esfuerzo de activación** (tiempo + costo + dependencies)
- **Alignment con visión founder**
- **Revenue realista** (primer año + optimista año 2-3)

Cada vía recibe scoring A/B/C + recomendación de activación/no-activación.

---

## Resumen ejecutivo

| # | Vía | Viabilidad | Revenue potencial Y1 | Recomendación |
|---|---|---|---|---|
| 1 | Donaciones Ko-fi | **A** | $50-300/mes | **SÍ — activar MVP launch** |
| 2 | Artist Pro subscription | **A** | $0-333/mes | **SÍ — activar Fase 4 con tier $8** |
| 3 | Manager subscription | **B** | $0-600/mes Y2 | **SÍ condicional — activar post-Artist Pro tracción** |
| 4 | Comisión merch | **B** | $0-300/mes Y2 | **SÍ — affiliate externo, NO tienda propia MVP** |
| 5 | Comisión tickets | **B** | $0-150/mes Y2 | **SÍ — solo con Partner Program** |
| 6 | Sponsorship editorial | **A** | $0-2k/mes Y2 | **SÍ — activar con audiencia ≥ 10k MAU** |
| 7 | Data licensing B2B | **B+** | $0-2.5k/mes Y2 | **SÍ — solo con dataset derivativo propio** |
| 8 | Capital externo | **condicional** | N/A | **Reactive solo — no pursue proactive** |
| 9 | **Venue premium directory** (nueva) | **A** | $0-500/mes Y2 | **SÍ — activar Fase 4 con Track 2** |
| 10 | **Sync licensing referral** (nueva) | **B+** | $0-1k/mes Y2 | **SÍ — activar post-Claim flow** |
| 11 | **Public API freemium** (nueva) | **B** | $0-200/mes Y2 | **MAYBE — activar Y2 si demanda** |
| 12 | **Newsletter premium** (nueva) | **B** | $0-150/mes Y2 | **MAYBE — activar con audiencia ≥ 5k suscriptos** |
| 13 | **Tip jar integrado** (nueva) | **B** | $0-100/mes Y2 | **SÍ condicional — activar post-claim flow maduro** |
| 14 | **Co-designed merch drops** (nueva) | **C** | Variable | **NO MVP — evaluar Y2-Y3** |
| 15 | **Annual "State of Scene" report** (nueva) | **B** | $0-2k one-time Y2 | **SÍ — activar Q4 2027 si dataset maduro** |
| 16 | **Label verified onboarding** (nueva) | **B** | $0-5k one-time Y2 | **SÍ — activar con primer label interesado** |
| 17 | **Promoter search B2B** (ya en roadmap) | **A** | $0-400/mes Y2 | **SÍ — activar Fase 4** |
| 18 | **Crowdfunding musical** (nueva) | **C** | Especulativo | **NO — fuera de scope** |
| 19 | **Educational masterclasses** (nueva) | **C** | Especulativo | **NO MVP — evaluar Y3 si partnership** |
| 20 | **Tienda propia merch** (roadmap) | **C** | Alto costo-complejidad | **NO MVP — evaluar Y2 si Track 4 escala** |

**Scoring:**
- **A** = alineado, viable, revenue clear, low complexity.
- **B** = viable con condiciones / esfuerzo moderado.
- **B+** = viable pero requiere research o partnership específico.
- **C** = complejo, riesgo alto, o fuera de scope actual.

---

## Vías originales (auditadas)

### Vía #1 — Donaciones Ko-fi

**Scoring: A** (activar MVP launch)

**Evaluación:**
- ✅ Legal: ✓ clear — Ko-fi procesa + disclaimer simple.
- ✅ Técnico: widget embed en footer. < 1 día de trabajo.
- ✅ Mercado: fans pasionales donan si valoran el producto. Modelo probado (RYM $12/año, 404 Media reader-funded).
- ✅ Alignment: 100% con principio "free para fans con donación opcional".
- Revenue: termómetro de PMF, no stream material.

**Recomendación:** activar MVP launch. Usar como **signal de validation cualitativa**, no como revenue plan.

**Ver también:** `revenue-streams-requirements.md` §Ko-fi + `go-to-market-playbook.md` §Donations.

---

### Vía #2 — Artist Pro subscription

**Scoring: A** (activar Fase 4 con $8/mes)

**Evaluación:**
- ⚠ Legal: caveat — features pro deben ser 100% Dauton-controlled (vanity URL, destacado, press kit), NO dependientes de APIs externas que pueden morir (ej. "Spotify analytics" es frágil).
- ✅ Técnico: Stripe + feature gating. Tiempo implementación: 2-3 semanas.
- ✅ Mercado: validado vs Bandcamp Pro ($10/mes), Soundcloud Pro ($16/mes). Sweet spot $5-10/mes para indie.
- ⚠ Alignment: tensión con principio "free siempre para artista" — resuelto: claim + edit básico es free, Pro es add-on opcional (mercado estándar).
- Revenue: 50 artistas Y2 = $333/mes. 500 artistas Y3 = $3,333/mes.

**Condición crítica:** **NO activar antes de tener 10+ artistas claim-ed pidiendo features pro.** Construir features que nadie pidió es over-engineering.

**Features pro validadas:**
1. Vanity URL (`dauton.media/canserbero`).
2. Destacado editorial / priority en búsquedas.
3. Press kit customizable.
4. Analytics básicos de perfil (pageviews, clicks, claims events) — **no stream analytics dependientes de Spotify**.
5. Early access a herramientas nuevas.
6. Soporte directo (email + 48h SLA).
7. Remove Dauton branding de press kit.

**Recomendación:** activar Fase 4, pricing $8/mes · $80/año (descuento 17%).

---

### Vía #3 — Manager subscription

**Scoring: B** (condicional — activar post-Artist Pro success)

**Evaluación:**
- ⚠ Legal: multi-artist access requiere consent flow de cada artista → manager.
- ✅ Técnico: extension de Artist Pro con multi-artist dashboard. 2 semanas.
- ⚠ Mercado: target limitado en LatAm. Chartmetric ($140+/mes) demasiado caro, Soundcharts similar. Dauton $20-50/mes es entry-level.
- ✅ Alignment: inputs founder lo mencionan explícitamente.
- Revenue: 20 managers Y2 × $30/mes = $600/mes.

**Condición crítica:** **requiere 5+ managers sondeados con interés validado antes de construir.** Si no hay signal, skip y volver después.

**Tiers:**
- Manager Solo ($20/mes): hasta 3 artistas.
- Manager Team ($50/mes): hasta 10 artistas + 3 seats.

**Recomendación:** activar Fase 4-5, post Artist Pro validado con 20+ suscriptos.

---

### Vía #4 — Comisión merch

**Scoring: B** (SÍ affiliate externo, NO tienda propia en MVP)

**Dos modelos diferenciados:**

**4a) Affiliate externo (Fase 3-4):**
- ✅ Legal: ⚠ caveat — FTC disclosure obligatorio. Template listo.
- ⚠ Técnico: tracking links + analytics. 1 semana.
- ⚠ Mercado: depende del tráfico. Bandcamp sin programa afiliado oficial (research item P1.5). Shopify Collabs posible.
- Revenue: modesto sin alto tráfico. Y2 estimado $100-300/mes.

**4b) Tienda propia con host fee (Y2+):**
- ✗ Legal: múltiples research items (marketplace facilitator laws, sales tax, seller liability).
- ✗ Técnico: Stripe Connect + fulfillment + returns. 2-3 meses implementación.
- ⚠ Mercado: alta complejidad para revenue incierto. Bandcamp ya existe y el artista lo usa.
- ✗ Alignment: si artistas ya tienen Shopify/Bandcamp, por qué construir competencia?

**Recomendación:** activar 4a en Fase 3-4. **NO activar 4b en MVP ni Y2** — reevaluar Y3 solo si Track 4a escala.

---

### Vía #5 — Comisión tickets

**Scoring: B** (SÍ solo con Partner Program)

**Evaluación:**
- ⚠ Legal: ToS Ticketmaster + Eventbrite requieren partnership formal. Research items P1.6, P1.7.
- ⚠ Técnico: integración API + tracking. 2 semanas post-approval.
- ⚠ Mercado: depende 100% de volumen + partnerships con promotores LatAm.
- Revenue: modesto hasta escala. Y2 estimado $150/mes.

**Recomendación:** activar Fase 4. Redirect tracking (0% commission) desde Fase 3 para construir data + narrativa antes de partnership.

---

### Vía #6 — Sponsorship editorial

**Scoring: A** (activar con audiencia ≥ 10k MAU)

**Evaluación:**
- ⚠ Legal: caveat — FTC native advertising disclosure + contrato sponsor.
- ✅ Técnico: low tech — es negociación + delivery editorial.
- ✅ Mercado: brands culturales pagan por audiencia cualificada LatAm. Benchmark: Remezcla $1-3k/native content week.
- ✅ Alignment: no compromete producto fan/artista (es layer independiente).
- Revenue: Y2 $1.5k/mes, Y3 $4-6k/mes con audiencia.

**Recomendación:** preparar pipeline Fase 4-5. Activar con ≥ 10k MAU consistente. Prioridad: 1 sponsor piloto antes de escalar.

---

### Vía #7 — Data licensing B2B

**Scoring: B+** (SÍ con dataset derivativo propio)

**Evaluación:**
- ⚠⚠ Legal: restricciones MÚLTIPLES. Spotify + YouTube prohíben redistribución. Dataset B2B solo puede incluir: MusicBrainz (CC0) + Wikidata (CC0) + data propia (contribuciones verified). DPA obligatorio con licensee.
- ⚠ Técnico: API + rate limiting + monitoring + documentation. 3-4 semanas.
- ⚠ Mercado: ciclos B2B largos (6+ meses). Competencia: Chartmetric ($140-700/mes), Soundcharts, Viberate. Value prop Dauton = **cobertura LatAm underserved**.
- Revenue: Y2 $2.5k/mes con 5 labels × $500. Y3 optimista $10-15k/mes.

**Condiciones críticas:**
1. Dataset must be **derivative-only** (sin Spotify/YouTube raw).
2. DPA template signed + contract framework.
3. 3+ conversaciones reales con labels pidiendo acceso antes de build API.

**Recomendación:** priorizar año 2 post MVP sólido. Primer outreach Q1 2028.

---

### Vía #8 — Capital externo

**Scoring: condicional** (reactive only)

**Evaluación:**
- ⛔ Legal: **requiere abogado humano**. Fuera de scope agent.
- ✅ Alignment: filosofía founder "cuando aparezca oportunidad, no forzado" = correcta. Benchmark industria (Chartmetric bootstrap → Warner acquisition vs Genius VC-ride → mediocre exit) confirma: bootstrap + exit es el camino premiado en music-data.
- Disparador: MRR ≥ $2k consistente, OR viral usage, OR angel específico con interés.

**Recomendación:** NO pursue proactive. Si aparece interés, contactar corporate lawyer primero. Referencias pre-compiladas en `stakeholder-list.md` §Legal contacts.

---

## Vías en roadmap original (no en financing-tracks v1) — auditadas

### Vía #17 — Promoter Search B2B

**Scoring: A** (en roadmap original, validado)

**Evaluación:**
- ⚠ Legal: contact info hidden by default, opt-in del artista requerido, anti-scrape on search.
- ✅ Técnico: feature gate + search avanzado + contact reveal logging. 3 semanas.
- ✅ Mercado: promotores LatAm sin tool equivalente a Bandsintown Plus ($499/mes). Pricing Dauton $30-79/mes = entry-level.
- Revenue: Y2 10 promoters × $40 = $400/mes.

**Recomendación:** activar Fase 4 junto a Artist Pro. Es core de proposition Promoter persona.

### Vía #20 — Tienda propia merch

**Scoring: C** (NO MVP)

Ya evaluado en #4b. Mantener el NO.

---

## Propuestas nuevas (ver `new-opportunities.md` para detalle)

### Vía #9 — Venue premium directory

**Scoring: A** (activar Fase 4)

Concepto: directorio de venues por ciudad (Caracas, Maracay, Miami, Madrid, etc.) con claim flow estilo Yelp. Venues pagan para destacar + featured listings.

**Evaluación:**
- ✅ Legal: similar a artist claim. Data pública de venues.
- ✅ Técnico: entity Venue ya en schema (City + Event existen). Extension de claim flow. 2 semanas.
- ✅ Mercado: venues en diáspora VE buscan visibilidad. Yelp model validado.
- ✅ Alignment: plan-maestro.md explícitamente menciona venues como capa GTM local.
- Revenue: Y2 20 venues × $12-25/mes = $300-500/mes.

**Pricing sugerido:** Venue Basic (free claim) + Venue Pro $15/mes (destacado en ciudad + eventos featured + analytics visits).

**Recomendación:** ALTA PRIORIDAD — activar junto a Artist Pro Fase 4. Sinergia con eventos ingestion.

### Vía #10 — Sync licensing referral

**Scoring: B+** (activar post-claim flow maduro)

Concepto: conectar artistas con opportunities de sync licensing (ads, series, films). Dauton refiere, commission por placement exitoso (10-15%).

**Evaluación:**
- ⚠ Legal: contrato tripartito artista/Dauton/licensee. Template pending.
- ⚠ Técnico: alert system + tagging artistas disponibles para sync. 3 semanas.
- ⚠ Mercado: mercado real pero fragmented. Competidores: Musicbed, Artlist, Songtradr, Shutterstock Music. Dauton como specialist LatAm emerging.
- Revenue: Y2 especulativo $200-1000/mes. Y3 con scale posible $5k/mes.

**Recomendación:** activar Fase 4-5 post-claim flow + 50+ artistas pro. Valor diferenciador: nicho LatAm underrepresented en catalog sync.

### Vía #11 — Public API freemium

**Scoring: B** (maybe Y2)

Concepto: API pública con tier free (rate-limited) + tier paid. Como Genius API, MusicBrainz.

**Evaluación:**
- ✅ Legal: ToS propios redactables por agent. Compliance relativamente simple.
- ⚠ Técnico: API + auth + rate limiting + documentation. 4 semanas.
- ⚠ Mercado: depende de developer interest. Target: devs latinos, academic research, music-tech startups.
- Revenue: modesto al inicio — $0-200/mes Y2.

**Recomendación:** priorizar Y2 si hay 3+ inbound requests de developers. Marketing secundario bueno (credibilidad tech).

### Vía #12 — Newsletter premium digest

**Scoring: B** (maybe con audiencia 5k+ suscriptos)

Concepto: newsletter weekly curated con highlights de la semana (nuevos releases, eventos, artistas emergentes). Free tier + Premium $3/mes con deep-dive adicional.

**Evaluación:**
- ⚠ Legal: CAN-SPAM + GDPR template ya hecho.
- ✅ Técnico: Beehiiv o Ghost. < 1 semana setup.
- ⚠ Mercado: newsletter paga es nicho. Benchmark: Aftermath, Defector. Target: 500-1000 paying subs realista.
- ⚠ Alignment: **puede parecer editorial tradicional que founder rechazó.** Necesita framing: no es "blog content" es "curated digest automated" + un poco de commentary.
- Revenue: 500 subs × $3 = $1,500/mes. Potencial pero lejano.

**Recomendación:** NOT MVP. Activar solo si audiencia newsletter free llega a 5k+ suscriptos y hay demanda señalada.

### Vía #13 — Tip jar integrado (fan → artist)

**Scoring: B** (condicional post-claim flow)

Concepto: fan tippea directamente al artista desde su perfil. Stripe Connect. Dauton toma 10% commission.

**Evaluación:**
- ⚠ Legal: Stripe Connect + KYC del artista. PCI compliance por Stripe.
- ⚠ Técnico: Stripe Connect onboarding + tip UI + commission logic. 3 semanas.
- ⚠ Mercado: modelo Patreon / Bandcamp / Ko-fi pero integrado al perfil. Friction baja = posible conversión ok.
- Revenue: depende 100% del volumen. Y2 especulativo $50-200/mes commission.

**Recomendación:** activar Fase 4-5 post claim flow maduro. Valor claro: artista claim + usa Dauton como tip jar en todos sus links. Quid pro quo claro.

### Vía #14 — Co-designed merch drops

**Scoring: C** (NO MVP)

Concepto: Dauton × Artist drops. Co-design merch limited edition. Revenue share 50/50.

**Evaluación:**
- Alta complejidad operativa (design + production + fulfillment).
- Low margin likely.
- Distrae de core producto.

**Recomendación:** NO MVP. Reevaluar Y3 como brand extension si Dauton tiene cultura + audiencia.

### Vía #15 — Annual "State of Scene" report

**Scoring: B** (activar Q4 2027 si dataset maduro)

Concepto: reporte anual data-rich sobre rap hispano. Print + digital. $20-50 por unidad + institutional licenses.

**Evaluación:**
- ✅ Legal: data propia + fuentes licenciadas. OK.
- ✅ Técnico: producción editorial + design. 2 meses work, annual cadence.
- ✅ Mercado: institutional buyers (universidades, labels, media). Revenue one-time por edición.
- Revenue: 100 sales × $30 = $3k one-time Y2.

**Recomendación:** primer edition Q4 2027, "State of Rap Hispano 2027". Requiere dataset maduro + 1 colaborador editorial.

### Vía #16 — Label verified onboarding as a service

**Scoring: B** (activar con primer label interesado)

Concepto: label contrata a Dauton para onboardear 50-100 artistas de su roster de una, con verify + profiles completos. Upfront fee.

**Evaluación:**
- ⚠ Legal: contrato B2B + DPA.
- ⚠ Técnico: tools existentes extendidas (bulk claim + bulk edit).
- ✅ Mercado: labels LatAm valoran presencia digital consistente. Ticket $2-5k/batch.
- Revenue: 3 labels Y2 × $3k = $9k año one-time.

**Recomendación:** activar si aparece primer label interesado (outreach proactive). Complementario a Track 7 Label Tier.

### Vía #18 — Crowdfunding musical

**Scoring: C** (NO)

Concepto: platform para fans financien álbum de artistas. Kickstarter-style.

**Evaluación:**
- Complejidad regulatoria alta (money services, KYC estricto).
- Competencia ya existe (Kickstarter, Patreon, Seed&Spark).
- Fuera de scope core.

**Recomendación:** NO. Fuera de scope.

### Vía #19 — Educational masterclasses

**Scoring: C** (NO MVP)

Concepto: platform para artistas establecidos hospeden masterclasses (Kpú sobre producción, por ejemplo). Dauton como platform, revenue share.

**Evaluación:**
- Complejidad: content hosting, streaming, DRM, payments.
- Competencia: MasterClass, Domestika.
- Alignment: no es nuestro core.

**Recomendación:** NO MVP. Evaluar Y3 solo como partnership (Dauton = audiencia, partner = platform).

---

## Propuestas filtradas que considerai y descarté

| Propuesta | Razón descarte |
|---|---|
| Affiliate Spotify Premium | Spotify no tiene programa affiliate público. Apple Music sí pero LatAm coverage pobre. Low ROI. |
| Sponsored artist "pay for coverage" | Viola principio editorial + rompe credibilidad. NO. |
| Display advertising (AdSense) | Destroys UX, SEO, brand. Ya rechazado en `monetization.md` legacy. Mantener rechazo. |
| Crypto / NFT integration | Volatilidad + reputación + founder no lo quiere. NO. |
| Feed social / comments públicos | Out of scope (plan-maestro rechaza red social). |
| Job board music industry | Fuera de scope core. Delegate a LinkedIn. |
| Ticketing directo propio | Complejidad regulatoria alta. Redirect suficiente post-tracción. |

---

## Priorización consolidada — orden de activación

```
MVP launch (oct 2026)
├── ACTIVAR: Vía #1 Ko-fi
├── REDIRECT tracking sin commission: Vías #4a (merch), #5 (tickets)
└── PREPARAR: claim flow como gate para todo lo demás

Fase 4 (ene-abr 2027) — post tracción inicial
├── ACTIVAR: Vía #2 Artist Pro ($8/mes)
├── ACTIVAR: Vía #9 Venue Premium Directory (nueva, ALTA prioridad)
├── ACTIVAR: Vía #17 Promoter Search ($30-79/mes)
├── ACTIVAR: Vía #4a Merch affiliate (post Bandcamp / Shopify partnership)
└── PREPARAR: Vía #6 Sponsorship piloto

Fase 4-5 (jun-dic 2027) — audiencia ≥ 10k MAU
├── ACTIVAR: Vía #6 Sponsorship Editorial (sponsor week piloto)
├── ACTIVAR: Vía #5 Comisión tickets (via partner approved)
├── ACTIVAR: Vía #3 Manager Tier (condicional demanda)
├── ACTIVAR: Vía #10 Sync licensing referral (nueva)
└── ACTIVAR: Vía #13 Tip jar integrado (nueva, condicional)

Año 2 (2028)
├── ACTIVAR: Vía #7 Data Licensing B2B (dataset derivativo propio)
├── ACTIVAR: Vía #16 Label verified onboarding (nueva, con first label)
├── ACTIVAR: Vía #15 Annual State of Scene Report (nueva)
├── EVALUAR: Vía #11 Public API freemium (si demanda developers)
├── EVALUAR: Vía #12 Newsletter premium (si audiencia 5k+)
└── EVALUAR: Vía #8 Capital (solo si trigger + abogado)

Y3+
└── Según tracción — scale lo que funciona, descartar lo que no.
```

---

## Contradicciones resueltas con founder

### Resuelto #1: "Artista free siempre" vs Artist Pro Tier $8/mes
**Decisión:** Claim + verify + edit básico **SÍ es free siempre** (cumple principio). Artist Pro es **add-on opcional** para features adicionales (vanity URL, analytics, press kit pro). Mercado estándar (Bandcamp Pro, Soundcloud Pro). Principio preservado en su intención central: ningún artista queda excluido por no pagar.

### Resuelto #2: "No tenemos competencia"
**Decisión:** Aceptamos que no hay competidor 1:1, pero **el mercado tiene players adyacentes** (Chartmetric, Soundcharts, Viberate, Bandsintown Plus) que imponen **techo de pricing B2B**. Nuestro posicionamiento es **nicho LatAm underserved**, no "no-competitor". Esto informa todo el pricing Track 3, 7, 17.

### Resuelto #3: "Data pública = legal safe"
**Decisión:** NO. Data pública puede tener restricciones contractuales vía ToS. Ver `08-Legal-Compliance/tos-compliance.md` por fuente. Implicación: Track 7 data licensing solo con dataset **derivativo propio**, NO raw data de Spotify/YouTube.

---

## Métricas de éxito del plan de monetización (no compromisos)

- **Q4 2026 (launch):** Ko-fi activo + >$50 donations total = signal PMF.
- **Q2 2027:** 10 Artist Pro subs + 5 Venues activos = $180/mes MRR.
- **Q4 2027:** $1k MRR total (Artist Pro + Venue + Promoter + sponsor piloto).
- **Q2 2028:** $3k MRR + primer data licensing deal.
- **Q4 2028:** $10k MRR sustentable + decisión capital vs bootstrap.

---

*Cross-refs: `financing-tracks.md`, `new-opportunities.md`, `revenue-streams-requirements.md`, `pricing-strategy.md`, `08-Legal-Compliance/legal-audit-master.md`.*
