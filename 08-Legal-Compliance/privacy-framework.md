# Privacy Framework — Dauton Media

**Owner:** Business & Legal agent
**Última actualización:** 2026-04-25
**Status:** v1 — live
**Jurisdicciones cubiertas:** US (federal + states relevantes), UE (GDPR), LatAm (principales).

---

## Propósito

Definir el framework de privacidad de Dauton Media por tipo de data + tipo de user + jurisdicción. Este doc es la base para `privacy-policy-draft.md` (la versión pública en español) y guía operacional para Engineering + Business & Legal.

---

## Mapa de data procesada

### Data de artistas (figuras públicas en rol profesional)
**Nivel:** data pública, base legal primaria = interés legítimo (GDPR Art. 6(1)(f)) + freedom of expression (Art. 85).

- Nombre artístico + nombre legal si público.
- Fecha nacimiento + ciudad origen.
- Discografía, colaboraciones, producers, writers.
- Eventos públicos.
- Links sociales públicos.
- Photos con licencia.
- Stats públicas (streams, followers) de APIs oficiales.

**Sensitive categories que NUNCA entran al archive auto:**
- Salud / salud mental.
- Religión.
- Orientación sexual / identidad de género (excepto auto-declarado públicamente por el artista en fuente).
- Opiniones políticas.
- Affiliation sindical.
- Data biométrica.
- Criminal record no confirmed por fuente oficial.

### Data de users registrados (fans, artistas claim-ed, managers, promoters)
**Nivel:** data personal, base legal = consentimiento + contrato.

- Email.
- Password (hashed).
- Display name.
- OAuth identity (Google provider ID).
- Favoritos + listas.
- Contribuciones + approval history.
- Login history (security).
- IP (temporalmente, security).

### Data procesada como platform (Stripe Connect cuando aplica)
**Nivel:** payment data, processed by Stripe (not stored by Dauton).

- Cards — **nunca stored por Dauton**. Stripe-only.
- Subscription status + billing email.

### Data de infra (technical)
- Analytics agregados (Plausible — cookieless, no PII).
- Error logs (Sentry — sanitized, no PII).
- Access logs — 90 días retention.

---

## Bases legales por tipo de procesamiento

### Para artistas (no registrados, perfil auto-generado)

| Procesamiento | Base legal primaria | Fundamento |
|---|---|---|
| Display de perfil público | **Interés legítimo (Art. 6(1)(f))** | Archive de cultural musical hispana es interés legítimo documentado. Balance test pasa porque: (a) datos son factual + profesional, (b) fuentes públicas, (c) artista puede objetar vía takedown + claim. |
| Bio generada por AI | Interés legítimo + Art. 85 (archival/journalistic) | Procesamiento para expression + archival research es excepción GDPR. |
| Display de stats | Interés legítimo | Data pública de APIs oficiales con attribution. |
| Retención indefinida | Interés legítimo + Art. 89 (archival) | Archive histórico tiene excepción de limitación temporal. |
| Sensitive categories (EXCLUIDAS) | N/A — no procesamos | Política Dauton: sensitive categories no entran. |

### Para users registrados

| Procesamiento | Base legal |
|---|---|
| Cuenta + login | **Ejecución de contrato (Art. 6(1)(b))** |
| Favoritos + listas | Ejecución de contrato |
| Contribuciones | Ejecución de contrato + consent específico cuando aplica |
| Newsletter | **Consentimiento (Art. 6(1)(a))** — opt-in explícito double opt-in |
| Analytics | Interés legítimo (cookieless) |
| Security monitoring | Interés legítimo + obligación legal |

### Para data licensing B2B (post-MVP)

| Procesamiento | Base legal |
|---|---|
| Licensing de dataset a tercero | **Interés legítimo** + DPA con licensee |
| Licensee = data processor (o joint controller) | Contrato con obligaciones Art. 28 GDPR |

---

## Derechos del data subject

### Artistas (no registrados)

Derechos aplicables:
- **Acceso (Art. 15):** solicitar copia de data que Dauton procesa sobre ellos. Response 30 días.
- **Rectificación (Art. 16):** corregir data incorrecta. **Resolvible via claim flow** — el artista reclama perfil y edita él mismo. Más rápido que DSAR formal.
- **Erasure (Art. 17):** balance test. NO erasure automática — figura pública en rol profesional tiene limitado derecho al olvido en archive de interés cultural. Decisión caso por caso documentada.
- **Objeción (Art. 21):** pueden objetar procesamiento basado en interés legítimo. Balance test.
- **Portabilidad (Art. 20):** aplicable si entran como user registrado (claim + cuenta).

### Users registrados

Derechos plenos:
- Acceso, rectificación, erasure, portabilidad, objeción, retiro de consent.
- Response 30 días.
- DSAR vía `privacy@dauton.media`.

### California residents (CCPA / CPRA)

Derechos equivalentes a GDPR:
- Right to know.
- Right to delete.
- Right to opt-out of sale/sharing.
- Right to correct.
- Right to limit use of sensitive data.

**Dauton no vende data personal.** Esto elimina uno de los grandes compliance vectors CCPA.

**Do Not Sell/Share** signal (GPC — Global Privacy Control): implementar respeto automático al header. Item Engineering.

### Otras jurisdicciones LatAm

| Jurisdicción | Ley | Cobertura Dauton |
|---|---|---|
| España | LOPDGDD (local implementation GDPR) | Cubierta por GDPR compliance. |
| México | LFPDPPP (Ley Federal de Protección de Datos Personales en Posesión de Particulares) | Derechos ARCO (Acceso, Rectificación, Cancelación, Oposición). Similar approach. |
| Argentina | Ley 25.326 | Derechos similares. Habeas data constitucional. |
| Colombia | Ley 1581 de 2012 | Derechos similares. |
| Brasil | LGPD | Casi idéntica a GDPR. Compliance GDPR ≈ compliance LGPD. |
| Venezuela | No hay ley específica de protección de datos personales (2026). | Aplicamos standard más alto (GDPR). |

**Posición Dauton:** aplicar GDPR como baseline global. Es el estándar más alto → satisface las otras jurisdicciones. Evita fragmentation de políticas.

---

## Implementación técnica (mandatos Engineering)

### Infraestructura de privacy

1. **User data export endpoint.** Admin tool para generar dump de toda la data de un user (DSAR response).
2. **User data delete endpoint.** Admin tool con cascada:
   - Delete user_profiles + auth.
   - Delete favoritos + listas privadas.
   - Anonymize contribuciones (mantener en archive pero sin attribution).
3. **Takedown endpoint para artistas no-registrados.** Admin tool para eliminar/anonymizar rows en people + people_roles + associated.
4. **Audit log.** Tabla `data_access_log` con quién accedió qué cuándo (para compliance + security).
5. **Retention jobs.** Cron que elimina:
   - Access logs > 90 días.
   - Sentry errors > 90 días.
   - Inactive accounts > 2 años (con notification 30 días antes).
6. **Cookie consent banner.** Solo esenciales + opt-in para analytics (si usamos cookies alguna vez). Plausible es cookieless → probablemente no necesitamos banner robusto.
7. **GPC / Do Not Sell respect.** Header check in edge middleware.

### Seguridad

1. **Password hashing:** Supabase Auth (argon2 / bcrypt).
2. **TLS everywhere** — Vercel edge + Supabase HTTPS.
3. **Row-Level Security** (Supabase) — ya aplicado.
4. **Secret rotation** — password DB, API keys rotation schedule trimestral.
5. **2FA opcional** para admin accounts (founder + editors).
6. **Breach notification plan:** si breach detectado, 72h para notificar a authorities UE + users afectados (GDPR Art. 33-34).

---

## Retención de data

| Tipo | Período | Razón |
|---|---|---|
| Perfil artista público | Indefinido | Archive cultural (Art. 89 GDPR + purpose limitation exception). |
| User cuenta activa | Indefinido mientras activa | Ejecución de contrato. |
| User cuenta inactiva (sin login 2 años) | Notificar + eliminar después de 30 días sin response | Minimization. |
| Access logs | 90 días | Security. |
| Error logs | 90 días | Debugging. |
| Email logs (outreach) | 2 años | Marketing + compliance CAN-SPAM. |
| Contribution history | Indefinido (si accepted), 1 año (si rejected) | Archive historical + learning. |
| Stripe data | Per Stripe retention + 7 años (tax regs US) | Compliance financial. |
| Takedown logs | Indefinido | Legal defense. |

---

## Transferencias internacionales

Dauton procesa data en:
- **Supabase** (US o EU region — pendiente confirmar region actual).
- **Vercel** (edge global).
- **Cloudflare** (edge global).
- **Stripe** (US + compliant regions).
- **Resend** (US).
- **Plausible** (EU — compliant default).

Users UE → data transferred to US:
- **SCCs (Standard Contractual Clauses)** con cada provider US.
- **Privacy Policy** declara transfer + basis.
- **Res judicata Schrems II:** provider debe tener supplementary measures (encryption at rest + in transit). Todos los providers listados los tienen.

---

## Children / COPPA

- Site NO dirigido a < 13 años.
- Age gate 13+ en signup.
- Si detectamos user < 13 sin consent parental → delete inmediato + notification.

---

## Breach response plan

**Detección:**
- Monitoring automático (Sentry alerts, Supabase security alerts, Cloudflare WAF).
- User report via security@dauton.media.

**Respuesta (primeras 72h):**

1. **H+0 — Detection:** founder + agent notificados.
2. **H+2 — Contain:** isolate el sistema afectado. Revocar tokens comprometidos.
3. **H+6 — Investigate:** scope + affected users + data types.
4. **H+24 — Document:** log completo del incidente.
5. **H+48 — Notify authorities (si aplica UE):** Supervisory Authority del lead DPA.
6. **H+72 — Notify affected users** si el breach crea riesgo alto a rights/freedoms.

**Post-breach:**
- Patch + re-audit.
- Update security measures.
- Incident report público (sanitized) si warranted.

---

## Roles + responsibilities

| Rol | Responsable | Qué hace |
|---|---|---|
| Data Controller | Vulqo LLC | Decide purpose + means del procesamiento. |
| DPO (Data Protection Officer) | NO obligatorio para Vulqo tamaño actual, pero funcionalmente = Business & Legal agent + founder | Supervisa compliance. |
| Data Processor (sub-processors) | Supabase, Vercel, Stripe, Resend, Cloudflare | DPA signed con cada uno. |
| Data Subjects | Artistas públicos + users registrados | Ejercen derechos vía `privacy@dauton.media`. |

---

## Checklist pre-launch

- [ ] Privacy policy live en `/privacy` — versión español (user-facing) + english (B2B).
- [ ] Terms live en `/terms`.
- [ ] `/legal/dmca` + `/legal/takedown` pages operativos.
- [ ] DPA signed con Supabase, Vercel, Stripe, Resend, Cloudflare.
- [ ] Email endpoints operativos: privacy@, legal@, dmca@, corrections@, security@.
- [ ] Takedown process operativo (ver `takedown-disputes.md`).
- [ ] User delete + export endpoints implementados.
- [ ] Cookie banner (si decidimos usar cookies beyond essential).
- [ ] GPC respect en edge middleware.
- [ ] Age gate 13+ en signup.
- [ ] Breach response plan accessible a founder.
- [ ] Sensitive categories blacklist aplicada en bio generation pipeline.

---

*Cross-refs: `privacy-policy-draft.md`, `terms-draft.md`, `takedown-disputes.md`, `legal-audit-master.md`.*
