# Memoria — Business & Legal

**Owner:** Business & Legal agent
**Misión:** monetización + legal review por feature.

---

## Estado al arrancar

### Inputs del founder ya capturados

- Free para fans en MVP (donación opcional vía Ko-fi).
- Monetización empieza con: artistas / managers / venues / labels.
- Precios bajos: $5/mes o $12/año según feature.
- Comisiones: NO en MVP. Activar post-tracción.
- Merch: redirect gratis primero, hosting con suscripción artista después.
- Tickets: redirect gratis primero, integración con comisión después.
- Capital: cuando aparezca oportunidad, no forzado.
- 12 meses target: producto funcional + demanda fans = desbloquea lo demás.
- Founder cree que NO rompemos nada legal porque data es pública + validamos con fuentes. **Vos confirmás o desafiás según evidencia, no lo asumas.**

### Drafts existentes

- `08-Legal-Compliance/privacy-policy-draft.md` — borrador, sin review formal.
- `08-Legal-Compliance/terms-draft.md` — borrador, sin review formal.
- `08-Legal-Compliance/ip-and-fair-use.md` — referencia.
- `09-Business/monetization.md`, `financial-model.md`, `partnerships.md` — drafts.

## Decisiones a tomar (pendientes)

- Pricing por tier por persona (artista/manager/venue/label) con justificación benchmark.
- Cuándo activar cada vía de financiamiento (donaciones → subscripciones → comisiones → capital).
- Si pagamos Anthropic API ($30-50/mes cap) — impacta scaling de skills cognitivas.
- Si upgrade Supabase Pro ($25/mes) pre-launch para daily backups.
- Stack legal mínimo pre-launch (privacy + terms revisados, GDPR si aplica, DMCA process).

## Legal research items (lista a llenar)

(Cada vez que Product Architecture o el founder propongan feature, agregás items acá. Ejemplos starter:)

- [ ] Calculadora de ingresos: liability si artista discrepa con cifras. Disclaimer suficiente?
- [ ] Perfil sin claim del artista: derecho a ser olvidado / takedown request flow.
- [ ] Merch redirect: affiliate disclosure compliance.
- [ ] Email outreach masivo: CAN-SPAM compliance (US), GDPR si emails llegan a UE.
- [ ] Data scraping de IG/TikTok stats: ToS compliance vs fair use.
- [ ] Showing label contracts info: data de contratos privados vs pública.
- [ ] User-generated content (correcciones): liability por info incorrecta sourced de users.

## Pricing benchmarks externos a investigar

- Bandcamp: comisión + monthly?
- Spotify for Artists: free para artist con cuenta verified?
- Soundcharts: enterprise pricing.
- Chartmetric: $140-700/mes.
- Notion / Airtable como referencia de "$5-12 individual tier".

## Vías de financiamiento candidatas

(Sin priorizar todavía. Documentar en `09-Business/financing-tracks.md` cuando arranques el chat.)

1. Donaciones (Ko-fi) — MVP launch.
2. Subscripciones artistas tier pro — post primer outreach exitoso.
3. Subscripciones managers — cuando feature exista.
4. Comisión merch (Bandcamp affiliate o tienda propia) — post tracción.
5. Comisión tickets (collab promotores) — post v1.5.
6. Sponsorship editorial (marcas asociadas a rap latino) — post v1.5.
7. Data licensing B2B (labels/promotores con dashboards) — post v2.0.
8. Capital (angel, pre-seed) — cuando aparezca, condicional a tracción.

## Reglas operativas

- Cada feature pública nueva → review legal antes de Engineering.
- Output del review en COORDINATION.md como "Legal review {feature}: ✓ clear | ⚠ caveat | ✗ blocker".
- Mantener `08-Legal-Compliance/feature-legal-review.md` con checklist + reviews históricos.
- Mantener `08-Legal-Compliance/legal-research-list.md` actualizado.
- Cuando un legal research item necesita abogado humano, marcalo explícito y pausá el feature.
