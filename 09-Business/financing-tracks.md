# Financing Tracks — Dauton Media

**Owner:** Business & Legal agent
**Última actualización:** 2026-04-25 · draft v1 (reemplaza skeleton anterior)
**Status:** draft — pendiente review con founder + Product Architecture

---

## Propósito

Este documento ordena **las 8 vías de monetización / financiamiento identificadas** por momento de activación, no por tamaño potencial. Cada vía tiene: (1) un disparador concreto — qué tiene que ser verdad antes de activarla, (2) una mecánica de revenue, (3) un benchmark externo que justifica el rango de pricing, (4) los riesgos principales, y (5) qué desbloquea la siguiente vía.

**Principio rector del founder:** "los que mueven el dinero son artistas, managers, venues, labels." Los fans nunca pagan por acceder al archive core. La monetización escala desde donación voluntaria → subscripciones profesionales → transacciones (merch/tickets) → data B2B → capital.

**Regla:** no activamos una vía hasta que su disparador esté cumplido. Activar antes = monetizar sin producto + desgastar goodwill sin revenue real.

---

## Vista cronológica — 8 tracks

| # | Track | Fase | Disparador | Mecánica | Rango ticket | Audiencia |
|---|---|---|---|---|---|---|
| 1 | Donaciones Ko-fi | MVP launch (oct 2026) | Sitio público + ≥ 500 fans únicos/mes | One-time + recurring donations | $3-50 por donación | Fans pasionales |
| 2 | Subscripción Artista Pro | Fase 4 (Q1 2027) | 10+ artistas verified editando + ≥ 1 pidiendo features pro | Monthly/annual subscription | $8/mes · $80/año | Artistas con carrera activa |
| 3 | Subscripción Manager | Fase 4-5 | Feature manager existe + 5+ managers sondeados con interés | Multi-artist dashboard subscription | $20-50/mes | Managers independientes |
| 4 | Comisión Merch | Post-tracción (Fase 3-4) | 200+ perfiles con merch link + ≥ 1,000 clicks/mes en redirects | Affiliate externo → tienda hosteada | 5-10% venta · $5/mes host fee | Artistas vendiendo merch |
| 5 | Comisión Tickets | Fase 4 (post-partnerships) | 3+ partnerships promotores + integración con ticketing platform | Commission por ticket vendido | 3-10% por ticket | Promotores + fans |
| 6 | Sponsorship Editorial | Fase 4-5 | Audiencia orgánica ≥ 10k MAU + 1 visualización killer | Sponsor week por sección/visualización | $500-2,500 por week | Brands culturales + labels |
| 7 | Data Licensing B2B | Año 2 (post v2.0) | ≥ 1,000 perfiles ricos + ≥ 3 conversaciones labels | Monthly B2B tier + API access | $200-1,500/mes | Labels, promotores, music-tech |
| 8 | Capital externo | Condicional | MRR ≥ $2k consistente OR usage viral OR oportunidad concreta | Convertible note o SAFE | $250k-2M seed | Angels LatAm, music funds |

---

## Detalle por track

### Track 1 — Donaciones Ko-fi

**Disparador:** sitio público con archive navegable (perfiles ricos + tools SEO + visualizaciones) + evidencia de ≥ 500 fans únicos/mes. Sin audiencia, la donación se siente performativa.

**Mecánica:** widget Ko-fi embebido en footer + CTA en perfiles que recibieron contribución comunitaria. Nunca paywall. Idealmente sumar PayPal.me para cubrir LatAm donde Ko-fi puede no convertir.

**Benchmark externo:**
- 404 Media, Aftermath, Defector — modelo reader-funded recurring, aunque con subs pagas (no Ko-fi). Lógica "apoyá el trabajo" funciona.
- RYM — subs optional $12/año, 200k+ users pagando voluntariamente.
- Genius — nunca monetizaron donaciones (modelo publicitario; falló).

**Rango ticket realista Año 1:** $50-300 MRR equivalente. No es stream serio — es **signal de PMF** ("alguien valoró esto suficiente para pagar voluntariamente"). Si no llega a $50/mes en 6 meses post-launch, producto no resuena.

**Riesgos:**
- Legal: ninguno significativo — Ko-fi procesa. Validar que Vulqo LLC puede recibir payouts a cuenta US.
- Business: optimizar por donaciones distrae del producto real.

**Desbloquea:** nada directamente — termómetro cualitativo, no fuente de capital operativo.

---

### Track 2 — Subscripción Artista Pro

**Disparador:** 10+ artistas verified activamente editando perfiles + al menos 1 pidiendo explícitamente features pro (analytics propios, vanity URL, destacado en búsquedas, press kit premium). Sin demanda expresa, no construimos.

**Mecánica:** tier pago con features diferenciadas sobre el claim + verify gratuito. Monthly o annual con 20% descuento.

**Tier propuesto:**
- **Free Verified:** claim, edit bio/contact/links/next events/merch links. Badge verified.
- **Pro ($8/mes o $80/año):** analytics privados (streams agregados + followers trend + perfil pageviews), vanity URL (`dauton.media/canserbero` vs `dauton.media/artists/canserbero`), destacado editorial, press kit customizable, early access a herramientas nuevas, soporte directo.

**Benchmark externo:**
- **Spotify for Artists:** free (Spotify monetiza streams, no al artista).
- **Bandcamp Artist Pro:** $10/mes — unlimited storage + private listener analytics.
- **Soundcloud Pro Unlimited:** $16/mes — unlimited upload + analytics.
- **Chartmetric Artist:** no existe tier artista — es B2B $140+/mes.
- **Notion Personal Pro:** $5-8/mes.
- **Genius Artist Verified:** free (Genius monetiza con ads + licensing).

**Takeaway:** $5-10/mes es el sweet spot para artista indie sin major label. $15+ es prohibitivo para el target LatAm (diáspora VE con capital pero 90%+ indie). **Propongo $8/mes · $80/año** como entry point.

**Rango ticket realista Año 2:** 50 artistas pro × $80/año = $4,000/año ≈ $333/mes MRR. Optimista Año 3: 500 artistas = $40k/año.

**Riesgos:**
- **Legal:** si prometemos "analytics" y Spotify cambia API (ya pasó en 2024, `followers` y `popularity` removidos) no podemos entregar → incumplimiento. Features pro deben ser 100% bajo nuestro control (vanity URL, destacado, press kit), no dependientes de terceros.
- **Business:** resistencia indie a pagar por portfolio gratuito en otros lados. Pitch tiene que ser "reemplaza tu Notion personal + manager asistente" — tiempo ahorrado, no vanity.
- **⚠ Founder check:** plan-maestro.md principio #6 dice "Free para el fan y el artista, siempre." Este track lo **contradice**. **Decisión a resolver con founder antes de Fase 4.** Mi postura: claim + edit básico queda free (sostiene el principio); Pro es add-on opcional. Si el founder mantiene "artist always free for everything", se tacha este track y se compensa con Tracks 3 + 6 más agresivos.

**Desbloquea:** Track 3 (managers quieren bulk tier si manejan 5+ artistas pro).

---

### Track 3 — Subscripción Manager

**Disparador:** existe feature específico para managers (multi-artist dashboard, bulk edit, booking coordination) + 5+ managers sondeados con interés validado. Sin feature distintivo, no hay nada que vender — un manager puede usar 5 cuentas Artist Pro.

**Mecánica:** tier Manager con N seats y multi-artist dashboard.

**Tier propuesto:**
- **Manager Solo ($20/mes):** 3 artistas bajo su manejo + dashboard unificado + booking coordination + outreach templates.
- **Manager Team ($50/mes):** 10 artistas + 3 seats + custom branding en press kits.

**Benchmark externo:**
- **Chartmetric Starter:** $140/mes — B2B music data, target manager/label.
- **Soundcharts Essential:** $99/mes — similar.
- **Artlogic (gallery managers):** $79/mes.
- **Notion Team:** $10/user/mes.

**Takeaway:** mercado espera $50-150/mes para manager tools. $20-50/mes nos posiciona como **entry-level para managers emergentes LatAm** que no pagan Chartmetric.

**Rango ticket realista Año 2-3:** 20 managers × $30/mes = $600/mes MRR. Nicho chico pero fidelizado.

**Riesgos:**
- Legal: multi-seat requiere data access clara — un manager accediendo a analytics de sus artistas necesita consent explícito del artista vía claim flow.
- Business: volumen bajo en LatAm — muchos managers son freelance sin budget SaaS.

**Desbloquea:** tracción B2B que evoluciona a Track 7 (label tier).

---

### Track 4 — Comisión Merch

**Disparador:** 200+ perfiles con al menos 1 link merch externo + ≥ 1,000 clicks/mes en redirects (medibles). Sin volumen, no hay conversación con Bandcamp/Shopify para affiliate.

**Mecánica — dos modelos:**

**4a) Affiliate externo (MVP / early):** Bandcamp no tiene programa affiliate oficial formal (**legal-research-list item #X**). Amazon sí, Shopify affiliate sí vía Shopify Collabs. Artista mantiene tienda, Dauton recibe commission.
- Rango: 3-10% por venta referida.

**4b) Tienda hosteada con host fee (post-tracción):** artista paga $5-10/mes por tienda hosteada en Dauton + commission 5%. Benchmark: Shopify Basic $29/mes. Montar infra de ecommerce es pesado — **solo si Track 2 funciona**, sino es over-engineering.

**Benchmark externo:**
- **Bandcamp:** 15% digital, 10% merch físico al artista.
- **Shopify affiliate:** 20% recurring sobre subs de merchants referidos.
- **Amazon Music Affiliate:** 2-5% por referral.

**Rango ticket realista:** depende del tráfico. Con 10k MAU + 5% clicks comprando a $25 avg × 5% commission = $625/mes (optimista). Real Año 2: $100-300/mes.

**Riesgos:**
- **Legal — FTC affiliate disclosure:** obligatorio US, disclaimer "Dauton Media puede recibir comisión" en cada link. Falla frecuente en sitios LatAm. Item en legal-research-list.
- **Legal — GDPR:** tracking de clicks requiere cookie consent si identificamos al user.
- **Business:** el artista puede bypassear Dauton y compartir link directo en su IG. Propuesta de valor para pasar por Dauton (tracking centralizado + conversión de perfil a venta) tiene que estar clara.

**Desbloquea:** hábito de usuarios comprando a través de Dauton → base para Track 5.

---

### Track 5 — Comisión Tickets

**Disparador:** 3+ partnerships con promotores LatAm/Miami/España activos + integración técnica con al menos 1 ticketing platform (Ticketmaster Discovery API, Eventbrite API affiliate, Bandsintown). Sin partnership, tickets se venden en sitios externos sin nosotros en la cadena.

**Mecánica:**
- **5a) Redirect tracking-only (Fase 3 MVP):** 0% commission, tracking para negociar affiliate después.
- **5b) Affiliate Eventbrite / Ticketmaster:** Eventbrite "Refer-A-Friend" → $5-10 por ticket comprado vía link. Ticketmaster Discovery Partners Program es selectivo.
- **5c) Commission directa con promotor partner:** Dauton como canal de venta + promotor paga 5-10% por ticket vendido.

**Benchmark externo:**
- **Bandsintown Plus (B2B):** $499/mes plan promotor — similar tier. No affiliate público.
- **Songkick Detour:** murió. Modelo afiliado no escaló.
- **Ticketmaster Partner:** commission 5-8% estándar.
- **Eventbrite Referral Partner:** 2-5% del valor del ticket.

**Rango ticket realista Año 2-3:** 100 tickets/mes × $30 avg × 5% = $150/mes. Nicho chico hasta que haya eventos masivos de diáspora.

**Riesgos:**
- **Legal — ToS de ticketing platforms:** algunos prohíben reventa/afiliación sin contrato formal. Legal research item.
- **Legal — registro como reseller:** Vulqo LLC US no necesita registro especial para affiliate US; sí puede necesitar registros tributarios en países donde ocurre el evento (España tiene IVA para servicios digitales).
- **Business:** promotores LatAm notoriamente informales — formalizar partnership es fricción alta.

**Desbloquea:** base de data de eventos + ticketing viva → Track 7 (labels compran ese insight).

---

### Track 6 — Sponsorship Editorial (NO tradicional)

**Disparador:** audiencia orgánica ≥ 10k MAU consistente + al menos 1 visualización "killer" (timeline, mapa, grafo) compartible que atraiga prensa. Sin audiencia sostenida, ningún sponsor serio paga.

**Mecánica — formato sponsor week:** un brand/label patrocina una sección o visualización durante una semana. Ejemplos:
- "Mapa del reggaetón latino presented by [brand]".
- "Timeline del rap venezolano presented by [label]".
- "Calculadora de ingresos sponsored by [music-tech startup]".

**Principios non-negotiable:**
- Sponsor NUNCA revisa contenido editorial ni visualización.
- Disclosure explícito.
- No sponsors de gambling, crypto spec, alcohol targeting menores.
- Lista pública de sponsors actuales + históricos.

**Benchmark externo:**
- **Stratechery sponsor week:** $5k-10k/semana (audiencia global high-income).
- **The Hustle newsletter sponsor:** $500-2k por slot.
- **404 Media:** $300-1k por sponsor newsletter.
- **Remezcla (LatAm cultural):** $1k-3k por native content week.

**Rango ticket realista Año 2-3:** 1 sponsor/mes × $1,500 = $1,500/mes (optimista). Año 3 con audiencia: 2-3 sponsors/mes × $2k = $4-6k/mes.

**Riesgos:**
- **Legal — disclosure:** FTC + EU requieren "Sponsored by" visible.
- **Business — conflicto editorial:** si sponsor es label con beef con artista del archive, presión. Mitigación: contrato explicita no injerencia.
- **Reputación:** sponsor equivocado (ej. crypto scam que quiebra) quema reputación. Due diligence previo.

**Desbloquea:** credibilidad para conversaciones con labels → Track 7.

---

### Track 7 — Data Licensing B2B (Dashboards Labels/Promotores)

**Disparador:** dataset con ≥ 1,000 perfiles ricos verificables + ≥ 3 conversaciones reales con labels o music-tech companies pidiendo acceso. Sin conversación real, es vendor speculation.

**Mecánica — tiers B2B:**
- **Scout Tier ($200-500/mes):** search avanzado por ciudad/género/tracción + export limitado + alerts de artistas emergentes.
- **Label Tier ($500-1,500/mes):** Scout + historial de contratos (si tenemos) + signals A&R + dashboard custom + soporte.
- **Enterprise (custom):** API access, data dump, whitelabel reports.

**Benchmark externo:**
- **Chartmetric Pro:** $140-700/mes. Líder del espacio, cobertura anglo + latina parcial.
- **Soundcharts Pro:** $99-699/mes.
- **Viberate:** $0-99/mes.
- **Luminate (ex MRC Data):** $10k+/año enterprise only.

**Takeaway:** $200-1,500/mes nos posiciona como **mid-tier complement para cobertura LatAm underserved por Chartmetric**. Value prop: "si buscás artista venezolano emergente, Chartmetric no lo tiene, nosotros sí."

**Rango ticket realista Año 2-3:** 5 labels × $500/mes = $2,500/mes. Optimista Año 3: 15 labels + 10 promotores + 2 enterprise = $10-15k/mes. Acá la curva se pone seria.

**Riesgos:**
- **Legal — data protection:** GDPR/CCPA/LOPDGDD España aplican si perfilamos personas. Artistas como figuras públicas en rol profesional tienen excepción parcial (interés legítimo) pero no absoluta.
- **Legal — scraping ToS:** si el dataset se alimenta de Spotify/Genius/Bandsintown y sus ToS prohíben licensing derivativo, estamos expuestos. **Validación crítica antes de activar este track.**
- **Business:** margen alto, venta lenta. Ciclos enterprise de 6+ meses.

**Desbloquea:** escala de revenue que justifica Track 8 si se decide.

---

### Track 8 — Capital Externo

**Disparador (disyuntivo, basta uno):**
- MRR ≥ $2,000 consistente 3+ meses → demostrable.
- Usage viral sin MRR (100k+ MAU) → demostrable.
- Oportunidad específica aparece (angel de música LatAm, fund específico, estratégico con interés activo).

**Mecánica:** angel o pre-seed con convertible note o SAFE. NO equity financing tradicional antes de $10k MRR o product/market fit obvio. Target raise: $250k-2M según tracción.

**Benchmark externo:**
- **Chartmetric:** bootstrap hasta adquisición por Warner. Sin capital externo mayor.
- **Songkick:** raised $10M+ Series A, exit a Warner/Ticketmaster.
- **Bandcamp:** bootstrap hasta adquisición Epic Games ($20M+ deal 2022).
- **Genius:** raised $77M venture, monetización mediocre post-adquisición por MediaLab.

**Takeaway:** **el espacio premia bootstrap + exit vs VC-scale ride.** Levantar demasiado = presión 10x que music-data platforms no sostienen. Filosofía founder ("cuando aparezca oportunidad, no forzado") **es correcta y coherente con el benchmark.**

**Rango:** $250k angel (válido con $2k MRR + equipo de 1) → $1-2M pre-seed (válido con $10k MRR + tracción demostrable). Ownership dilution target: ≤ 20% pre-seed.

**Fondos + angels potenciales a mapear en `stakeholder-list.md` (pendiente):**
- Magma Partners (LatAm + música).
- Kaszek Ventures (LatAm).
- Angels conectados con música latina.
- Music-tech funds US: Concord Music Publishing, Plus Eight Equity.

**Riesgos:**
- **Legal — cap table complexity:** Vulqo LLC no está diseñada para equity. Rearquitectura legal ANTES de cualquier term sheet: probable conversión a C-Corp Delaware. Abogado humano obligatorio.
- **Legal — reg compliance:** Reg D en US, prospecto si hay europeos.
- **Business — optionality:** mantener optionality de bootstrap hasta que un deal justifique dilución. Regla: si la oferta no compra ≥ 2 años de runway sin hipotecar decisión editorial, rechazar.

**Desbloquea:** velocidad de expansión (LatAm completo + tier B2B completo + 1-3 hires). Pero también: cambio de relación founder-proyecto (board, reporting, métricas fixed).

---

## Orden de activación recomendado

```
MVP launch (oct 2026)
├── ACTIVAR: Track 1 (Ko-fi)
└── PREPARAR: Tracks 4, 5 (redirect tracking sin commission todavía)

Fase 3-4 (ene-abr 2027, post-tracción inicial)
├── ACTIVAR: Track 2 (Artist Pro) — si feature pro justifica
├── ACTIVAR: Track 4 (Comisión merch) — via affiliate externo
└── PREPARAR: Track 6 (sponsor week piloto)

Fase 4-5 (jun-dic 2027, audiencia ≥ 10k MAU)
├── ACTIVAR: Track 6 (Sponsorship editorial)
├── ACTIVAR: Track 5 (Comisión tickets via partner)
└── ACTIVAR: Track 3 (Manager tier) — si volumen lo justifica

Año 2 (2028)
├── ACTIVAR: Track 7 (Data licensing B2B)
└── EVALUAR: Track 8 (capital) — solo si tracción + oportunidad concreta

Año 3+
└── Track 7 escala + Track 8 ejecuta si se decidió
```

---

## Inconsistencias a resolver con founder

1. **`plan-maestro.md` principio #6 ("free para el fan y el artista, siempre") vs Artist Pro Tier $5-15/mes (mismo plan-maestro, sección 5).** Decisión pendiente: ¿cobramos Artist Pro o no? Mi recomendación: **cobrar** — `free claim + verify + edit básico` cumple el principio; `Pro` es add-on opcional y es el mercado estándar. Si se decide "nunca cobrar al artista": tachar Track 2, compensar con Track 3 más agresivo + Track 6.

2. **"No tenemos competencia" (founder-inputs) vs benchmark real.** Chartmetric, Soundcharts, Viberate existen con cobertura LatAm parcial. NO son competidores directos (somos más nicho + verticalizado), pero son el **techo de pricing de Track 7**. Importante internalizarlo para no pricing en el aire.

3. **Hipótesis "data pública = legal safe" del founder.** No validada. Riesgos reales en Tracks 4, 5, 7 dependen de ToS de fuentes (Spotify, Genius, Bandsintown). Propuesta: item #1 de `legal-research-list.md` antes de cualquier activación de Track 7.

---

## Pendiente siguiente

- [ ] `pricing-strategy.md` — detalle de tiers Artist Pro + Manager + B2B con features exactos (no solo pricing).
- [ ] `stakeholder-list.md` — fondos + angels + labels + promotores potenciales para Tracks 6, 7, 8.
- [ ] `08-Legal-Compliance/legal-research-list.md` — inventario de validaciones legales por track.
- [ ] Resolver con founder las 3 inconsistencias arriba antes de mover este doc a v2.
- [ ] Reemplazar `09-Business/monetization.md` (legacy de era "Culture Wiki") una vez este doc + `pricing-strategy.md` estén aprobados.

---

*Cross-refs: `_Execution/founder-inputs-consolidated.md`, `00-Executive/plan-maestro.md`, `memory/business-legal.md`.*
