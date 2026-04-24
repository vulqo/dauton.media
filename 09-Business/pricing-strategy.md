# Pricing Strategy

**Owner:** Business & Legal agent
**Status:** 🔴 skeleton — pendiente
**Última actualización:** 2026-04-25

---

## Contexto

Según founder:
- **Free para fans en MVP** con donación opcional (Ko-fi).
- **Monetización empieza con artistas/managers/venues/labels.**
- **Precios bajos:** $5/mes o $12/año según feature.
- **Comisión vs tarifa fija** depende del feature.

Referencia: `_Execution/founder-inputs-consolidated.md` (sección "Monetización").

---

## Tiers propuestos (preliminar, Business & Legal refina)

### Fan

- **Free.** Donación opcional vía Ko-fi.
- Post-MVP considerar "Fan+" con features tipo: listas privadas, notificaciones de nuevos releases, etc. No definido todavía.

### Artista

- **Free:** perfil público auto-generado + claim + edit básica + badge VIP.
- **Pro ($5/mes o $12/año):**
  - Custom domain (`dauton.media/apache` vs `apache.dauton.media`).
  - Analytics privados (quién vio mi perfil, desde dónde).
  - Newsletter a fans que claim followed.
  - Priority moderation (sus correcciones se procesan primero).
  - Portfolio exportable PDF.
  - Más a definir por Product Architecture.

### Manager

- **Pro ($12/mes o $108/año):**
  - Gestión de múltiples perfiles de artistas bajo una cuenta.
  - Dashboard analytics agregado.
  - Bulk updates (ej. mover tour dates a todos sus artistas).
  - Más a definir.

### Venue / Promotor

- **Free:** listing de eventos + perfil del venue/promotor.
- **Pro ($15/mes o $150/año):**
  - Dashboard de búsqueda de artistas (filtros avanzados por city/género/stats).
  - Contact inbox integrado.
  - Analytics de eventos.
  - Acceso a data segmentada.

### Label

- **Pro ($50/mes o $500/año):**
  - A&R tools: filtros por growth rate, collabs con pillars, city scenes emergentes.
  - Investment signals dashboard.
  - Contact inbox.
  - Acceso full a data + exportaciones.

---

## Comisiones (post-tracción, NO MVP)

- **Merch tienda propia de Dauton:** comisión ~10-15% + suscripción del artista por host ($10/mes).
- **Tickets integrados:** comisión 5-10% según venue partnership.
- **Sponsorship editorial:** flat fee por campaña, TBD.

---

## Benchmarks externos (Business & Legal llena con research real)

- **Bandcamp Pro:** $X/mes (TBD).
- **Spotify for Artists:** free para verified.
- **Soundcharts / Chartmetric:** $140-700/mes (nuestra franja alta).
- **Notion / Airtable:** $5-12 individual tier (nuestra franja baja).
- **Bandsintown for Artists:** $X/mes.
- **Linkfire / Linktree Pro:** $5-20/mes.

---

## Reglas

- **Precios low-ball en MVP** para validar demanda antes de maximizar revenue.
- **Año discount** (12x vs 10x o 11x) incentiva commitment.
- **Trial gratis 14 días** para tiers Pro (a evaluar).
- **No lock-in:** cancelación fácil.
- **No surprise charges.** Upgrade/downgrade explícito.

---

## Pendientes

- Business & Legal refina tiers con research externo.
- Product Architecture valida que features por tier están alineados con personas definidas.
- Comisiones se determinan cuando features existan (post-MVP).

---

## Coordinación

- **Con Product Architecture:** alignment de features por tier.
- **Con Engineering:** implementación de tier logic + Stripe integration (post-MVP).
- **Con Community & Outreach:** comunicación del pricing en outreach + página pricing.
