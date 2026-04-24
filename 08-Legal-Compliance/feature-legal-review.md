# Feature Legal Review Framework

**Owner:** Business & Legal agent
**Status:** 🔴 skeleton — pendiente
**Última actualización:** 2026-04-25

---

## Propósito

Cada feature pública que se propone (por Product Architecture) pasa por este framework **antes** de que Engineering la implemente. Output: ✓ clear / ⚠ caveat / ✗ blocker, con razones concretas.

Según founder: "Debemos tener un departamento legal que revise cada new feature que queremos implementar. Esto debe estar documentado."

---

## Checklist por feature

Para cada feature nueva, Business & Legal completa:

### 1. Data sources
- [ ] ¿Qué fuentes de data alimenta esta feature?
- [ ] ¿Todas son públicas? (Spotify, MB, Wikipedia = sí. Social scraping = gris.)
- [ ] ¿Respetamos ToS de cada fuente?
- [ ] ¿Hay atribución cuando corresponde?

### 2. Privacy
- [ ] ¿La feature expone PII (Personally Identifiable Information)?
- [ ] ¿Hay datos de users en la feature? (email, IP, etc.)
- [ ] ¿Se requiere consentimiento explícito?
- [ ] ¿Se puede ejercer "right to be forgotten"?

### 3. Copyright / IP
- [ ] ¿La feature muestra contenido copyrighted?
- [ ] ¿Hay uso de imágenes? ¿Con qué licencia?
- [ ] ¿Hay citas textuales? ¿≤15 palabras (fair use)?
- [ ] ¿Hay redirección vs hosting? (redirección menos riesgo).

### 4. Liability
- [ ] Si la feature muestra data estimada (ej. calculadora de ingresos), ¿hay disclaimer?
- [ ] ¿Qué pasa si la data está mal y el afectado (artista, label) reclama?
- [ ] ¿Tenemos proceso de corrección + takedown?

### 5. Regulatory (UE/US)
- [ ] ¿Aplicable GDPR (data de users EU)? Si sí, DPO / DSR flow / cookies banner real.
- [ ] ¿Aplicable CCPA (California)? Si sí, opt-out.
- [ ] ¿Aplicable COPPA? (menos probable, no apuntamos a <13).
- [ ] ¿CAN-SPAM para emails outreach?

### 6. Terms & Policy
- [ ] ¿Actualiza `privacy-policy-draft.md` o `terms-draft.md`?
- [ ] ¿Requiere review de abogado humano antes de launch?

---

## Output format por feature

```markdown
## Feature: {nombre}

- **Proponente:** Product Architecture
- **Fecha review:** YYYY-MM-DD
- **Veredicto:** ✓ clear | ⚠ caveat | ✗ blocker

### Data sources
{análisis del checklist 1}

### Privacy
{análisis del checklist 2}

### Copyright / IP
{análisis del checklist 3}

### Liability
{análisis del checklist 4}

### Regulatory
{análisis del checklist 5}

### Caveats / mitigations required
- Caveat 1: {...} → mitigation: {...}
- Caveat 2: {...} → mitigation: {...}

### Research items added to legal-research-list.md
- [ ] Item 1
- [ ] Item 2
```

---

## Reviews archivadas

Cuando Business & Legal completa un review, se archiva aquí para referencia histórica:

### Calculadora de ingresos (pendiente review)
- Esperando propuesta formal de Product Architecture.
- Pre-flag: disclaimer obligatorio, liability si artista discrepa con estimación.

### Outreach email masivo (pendiente review)
- Esperando propuesta de Community & Outreach.
- Pre-flag: CAN-SPAM compliance (US), GDPR si emails llegan a UE, opt-out obligatorio.

### Perfil público sin claim (pendiente review)
- Feature base del MVP.
- Pre-flag: right-to-be-forgotten flow requerido, política de takedown definida.

### Merch redirect (pendiente review)
- Esperando propuesta.
- Pre-flag: affiliate disclosure requirements (FTC en US), ToS de Bandcamp/Shopify destino.

---

## Coordinación

- **Con Product Architecture:** Product propone feature → Business & Legal hace review → veredicto en COORDINATION.md.
- **Con Engineering:** si review ⚠ o ✗, Engineering NO implementa hasta que mitigations estén en spec.
- **Con Community & Outreach:** outreach campaigns pasan review específico.
