# Financing Tracks

**Owner:** Business & Legal agent
**Status:** 🔴 skeleton — pendiente
**Última actualización:** 2026-04-25

---

## Contexto

Según founder:
- **Cada feature debe estar directamente ligada a una vía de financiación.**
- **MVP debe tener al menos UNA vía clara o activable post-tracción.**
- **Capital (inversión externa):** se decide cuando aparezca la oportunidad, no forzado.
- **12 meses target:** producto funcional + demanda fans → desbloquea el resto.

---

## Vías de financiación identificadas

Ordenadas por momento de activación. Cada una tiene disparador claro.

### 1. Donaciones (Ko-fi) — ACTIVA DESDE MVP LAUNCH
- **Qué es:** botón "donar" en footer + página dedicada.
- **Audiencia:** fans que valoran el archivo.
- **Disparador de activación:** launch.
- **Expectativa revenue:** $X/mes (low, validación cultural más que material).
- **Esfuerzo:** bajo — integrar Ko-fi widget.
- **Riesgo:** ninguno.

### 2. Subscripción artista Pro — ACTIVA POST-OUTREACH SUCCESS
- **Qué es:** $5/mes o $12/año para features pro del artista (custom domain, analytics, newsletter, etc.).
- **Audiencia:** artistas que reclamaron perfil y quieren más control/visibilidad.
- **Disparador:** > 50 artistas claimed + features pro listos.
- **Expectativa revenue:** escalable con tamaño de base claimed.
- **Esfuerzo:** medio — Stripe integration + feature gating.
- **Riesgo:** bajo.

### 3. Subscripción manager — ACTIVA POST-PRO-ARTISTA
- **Qué es:** $12/mes para managers gestionando múltiples artistas.
- **Audiencia:** managers (mercado más chico que artistas pero paga más).
- **Disparador:** existencia de feature multi-perfil gestión.
- **Expectativa revenue:** baja volumen pero alta por cuenta.
- **Esfuerzo:** medio.

### 4. Comisión merch — ACTIVA POST-TIENDA-PROPIA
- **Qué es:** ~10-15% comisión sobre ventas en tienda Dauton. Más subscripción $10/mes del artista por host.
- **Audiencia:** artistas sin e-commerce establecido.
- **Disparador:** v2.0 — tienda hosteada implementada.
- **Expectativa revenue:** alta si tracción buena.
- **Esfuerzo:** alto — fulfillment logistics, payments, taxes.
- **Riesgo:** medio (regulatory, sales tax, shipping).

### 5. Comisión tickets — ACTIVA POST-VENUE-PARTNERSHIPS
- **Qué es:** 5-10% comisión sobre ventas de tickets integradas.
- **Audiencia:** venues + promotores + fans.
- **Disparador:** v2.0 — partnerships con venues principales.
- **Expectativa revenue:** estacional pero alta.
- **Esfuerzo:** alto — partnerships + payment processing.
- **Riesgo:** medio (regulatory + KYC).

### 6. Subscripción venue/promotor — ACTIVA POST-DATA-DASHBOARDS
- **Qué es:** $15/mes para venues/promotores con dashboard de búsqueda + contact inbox.
- **Audiencia:** venues + promotores + bookers.
- **Disparador:** existencia de features B2B (filtros avanzados, analytics).
- **Expectativa revenue:** mediana volumen, alta por cuenta.
- **Esfuerzo:** medio — feature gating + dashboards.

### 7. Subscripción label — ACTIVA POST-A&R-TOOLS
- **Qué es:** $50/mes+ para labels con A&R tools + data exports.
- **Audiencia:** sellos independientes + majors.
- **Disparador:** features B2B maduras + data licensing structure.
- **Expectativa revenue:** baja volumen muy alta por cuenta.
- **Esfuerzo:** alto (sales cycle B2B).
- **Riesgo:** bajo.

### 8. Sponsorship editorial — POST-V1.5
- **Qué es:** marcas asociadas a cultura (ropa, bebidas, eventos) sponsorean segmentos del archive.
- **Audiencia:** brands targeting diáspora latina / rap culture.
- **Disparador:** > 10K MAU orgánicos.
- **Expectativa:** flat fee por campaña ($2-10K).
- **Esfuerzo:** alto (sales + deliverables).
- **Riesgo:** bajo.

### 9. Data licensing B2B — POST-V2.0
- **Qué es:** API paga o exports para analytics firms, research, música industry.
- **Audiencia:** B2B data buyers.
- **Disparador:** data quality + coverage establecida.
- **Expectativa:** enterprise pricing.
- **Esfuerzo:** alto — legal + infra API.

### 10. Capital externo — CUANDO APAREZCA OPORTUNIDAD
- **Qué es:** angel / pre-seed investment.
- **Audiencia:** investors en music-tech, latin market.
- **Disparador:** "cuando aparezca la oportunidad, no forzado" (founder).
- **Expectativa:** $50K-500K según ronda.
- **Qué desbloquea:** contratación, marketing paid, infra scale.
- **Esfuerzo:** alto — fundraising cycle.

---

## Timeline propuesto (refinable)

| Mes | Vías activas | Expectativa acumulada |
|---|---|---|
| 0-3 (launch) | Donaciones | Validación cultural, $X simbólico |
| 3-6 | Donaciones + Artist Pro | Primer recurring revenue |
| 6-9 | + Manager Pro | Expansión B2B light |
| 9-12 | + Venue/Promotor | Múltiples streams recurring |
| 12-18 | + Merch comisión | Transactional revenue |
| 18-24 | + Tickets + Sponsorship | Revenue diversificado |
| 24+ | + Label + Data licensing + Capital opcional | Scale |

---

## Reglas

- **Precio low-ball en MVP** — validar antes de maximizar.
- **Cada vía tiene disparador claro** — no activamos por activar.
- **Activar UNA a la vez** — no saturar audiencia.
- **Trackear conversion al activar** cada vía.
- **Pivotar rápido** si una vía no responde después de 3 meses.

---

## Coordinación

- **Con Product Architecture:** validar que cada feature contribuye a una vía.
- **Con Engineering:** implementación de payment processing cuando cada vía se activa.
- **Con Community & Outreach:** comunicación a audiencias cuando vías se activan.
- **Con founder:** decisión final sobre pricing + timing.
