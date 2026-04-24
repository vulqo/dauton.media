# Legal Research List

**Owner:** Business & Legal agent
**Status:** 🟡 active backlog
**Última actualización:** 2026-04-25

---

## Propósito

Lista viva de cosas a investigar legalmente antes de implementar features. Cada item tiene status, dueño, deadline (si aplica), output esperado.

Cuando Business & Legal hace review de feature y encuentra zona gris, el item aterriza acá.

---

## Items activos

### Alta prioridad (bloquean features MVP)

- [ ] **Perfil público sin claim — derecho al olvido**
  - Contexto: founder quiere que todos los perfiles de artistas relevantes se auto-generen. ¿Qué pasa si un artista pide eliminación?
  - Output esperado: política formal + flujo técnico documentado.
  - Precedente: Wikipedia tiene "right to vanish" para editores. Discogs tiene takedown process. Investigar sus approaches.

- [ ] **Calculadora de ingresos — liability**
  - Contexto: si calculamos $X/mes y artista dice "eso está mal, me perjudica en negociación con mi label", ¿hay exposure?
  - Output: disclaimer legal estándar + metodología pública documentada.
  - Referencia: cómo Soundcharts, Chartmetric manejan esto.

- [ ] **Outreach email masivo — compliance**
  - CAN-SPAM (US): opt-out link, physical address, subject line no deceptivo.
  - GDPR (UE): lawful basis, DPO si aplica, DSR process.
  - CASL (Canadá): consentimiento explícito o implícito.
  - Output: template de email compliant + tooling recomendado (Resend, Mailchimp, etc.).

### Media prioridad

- [ ] **Merch redirect — affiliate disclosure**
  - Si redirigimos a Bandcamp/Shopify del artista: ¿afiliación? ¿Disclosure FTC requirement?
  - Output: política de disclosure si aplicamos.

- [ ] **Showing label contracts info**
  - ¿Podemos mostrar "firmó con X en 2020, salió en 2023"?
  - ¿Data de contratos es pública o es NDA-bound entre artista y label?
  - Output: política de qué data de contratos mostramos + fuente de verdad.

- [ ] **Scraping de social stats (IG, TikTok)**
  - ToS de las plataformas prohíben scraping técnico. Uso de Apify/Bright Data.
  - Fair use vs ToS violation debate.
  - Output: decisión de scrapear o no, con justificación.

- [ ] **Image usage en perfiles**
  - Press photos de artistas: ¿quién es dueño? ¿Podemos usarlas?
  - Fair use para editorial vs uso comercial.
  - Output: política de image attribution + takedown flow.

### Baja prioridad (post-MVP)

- [ ] **User-generated content liability**
  - Correcciones submited por users. Si un user publica info difamatoria: ¿nosotros respondemos?
  - Output: moderation process documentado + Section 230 (US) análisis.

- [ ] **Ticketing comisión (v2.0)**
  - Cuando activemos comisión sobre tickets, ¿somos "payment processor"? ¿Reseller? ¿Agente?
  - Output: structure legal correcta antes de activar.

- [ ] **Merch propia (v2.0)**
  - Tienda hosteada con artistas: sales tax collection, shipping compliance, etc.
  - Output: structure legal + tax framework.

- [ ] **Capital raise**
  - Cuando aparezca oportunidad: Delaware C-corp o LLC? SAFE vs priced round?
  - Output: structure legal pre-deal.

---

## Items cerrados

(Cuando un item se resuelve, se mueve aquí con resolución + fecha.)

---

## Coordinación

- **Con Product Architecture:** cada feature nueva genera items acá.
- **Con Engineering:** items que tocan implementación (ej. takedown flow) generan tickets [ENG] cuando se resuelven.
- **Con external abogado:** items marcados "requiere abogado humano" pausan el feature hasta resolución formal.
