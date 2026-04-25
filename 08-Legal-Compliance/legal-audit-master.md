# Legal Audit Master — Dauton Media

**Owner:** Business & Legal agent
**Última actualización:** 2026-04-25
**Status:** v1 — fuente de verdad para review de features
**Revisión:** post cada feature nuevo + trimestral global.

---

## Cómo leer este doc

Cada feature tiene entrada con:

- **Status:** ✓ CLEAR · ⚠ CAVEAT · ✗ BLOCKER · 🟡 PENDING (no implementado todavía)
- **Fase:** 1 / 2 / 3 / 4 / post-MVP (según `00-Executive/plan-maestro.md`)
- **Fuentes de data afectadas**
- **Riesgos identificados**
- **Mitigaciones requeridas** (si aplicables)
- **Precedente industria** (cuando existe)
- **Business implication** (cuando Legal afecta monetización)

Entradas marcadas ⚠ o ✗ son accionables. Las ✓ sirven de precedente para features futuros similares (fast-track Clase A del workflow).

---

## Índice de features auditados

### MVP (Fase 1-3, en construcción)
1. [Ingestion de data pública vía APIs oficiales](#f1)
2. [Perfiles públicos auto-generados sin claim](#f2)
3. [Display de album art + artist photos](#f3)
4. [Display de streams / popularity metrics](#f4)
5. [Bios generadas con AI](#f5)
6. [Visualizaciones (timeline, mapa, grafo)](#f6)
7. [Calculadora de ingresos del artista](#f7)
8. [Herramientas SEO adicionales (TBD Data&SEO)](#f8)
9. [Claim flow + verified badge del artista](#f9)
10. [Auth (signup, magic link, Google OAuth)](#f10)
11. [Favoritos + listas privadas + listas públicas](#f11)
12. [Contribuciones de usuarios (correcciones)](#f12)
13. [Eventos públicos (Eventbrite / Ticketmaster / Bandsintown)](#f13)
14. [Merch redirect externo (Bandcamp / Shopify artista)](#f14)
15. [Tickets redirect externo](#f15)
16. [Press kit descargable del artista](#f16)
17. [Ko-fi donations](#f17)
18. [Email outreach masivo a artistas](#f18)
19. [Static pages (About / Methodology / Privacy / Terms)](#f19)

### Post-MVP (Fase 4+, diseño previo)
20. [Artist Pro Tier (subscription)](#f20)
21. [Manager Tier + multi-artist dashboard](#f21)
22. [Promoter Search (B2B)](#f22)
23. [Calculadora costo evento](#f23)
24. [Booking kit Pro](#f24)
25. [Data licensing B2B (dashboards labels/promotores)](#f25)
26. [Comisión merch (affiliate)](#f26)
27. [Comisión tickets (affiliate / partnership)](#f27)
28. [Sponsorship editorial (sponsor week)](#f28)
29. [Tienda propia merch con host fee](#f29)
30. [Capital raise (angel / pre-seed)](#f30)

### Propuestas nuevas (ver `09-Business/new-opportunities.md`)
31. [Tip jar integrado artista→fan](#f31)
32. [Public API freemium](#f32)
33. [Newsletter premium digest](#f33)
34. [Sync licensing referral](#f34)
35. [Venues directory premium](#f35)

---

## 1. Ingestion de data pública vía APIs oficiales <a id="f1"></a>

**Status:** ✓ CLEAR (con mitigaciones ya en código)
**Fase:** 1 (en producción)
**Fuentes:** Spotify Web API, MusicBrainz, Wikipedia, Wikidata, Genius API, YouTube Data API, Eventbrite API (pending integration).

**Riesgos:**
- ToS restrictivas pueden limitar redistribución comercial (especialmente Spotify + Genius + YouTube).
- Rate limits + bans por uso abusivo (precedente: Sprint 4 Spotify 23h ban).

**Mitigaciones aplicadas:**
- `05-Data/api-docs/*` documenta ToS de cada fuente.
- Rate limiting con spacing configurable + circuit breaker.
- Attribution visible en footer (pending implementación completa — item Engineering).

**Mitigaciones requeridas:**
- YouTube metadata con TTL ≤ 30 días (Developer Policy).
- Logos + attribution footer por fuente.
- Remover cualquier scraper IG si existe (ver feature #4).

**Precedente industria:** Chartmetric, Soundcharts, Viberate, RYM — todos ingieren vía API oficial con attribution. Industry standard.

**Business implication:** desbloquea Track 7 (Data Licensing) con caveat — data de Spotify NO redistribuible; MB es el spine del B2B, Spotify es enriquecimiento visible-only.

---

## 2. Perfiles públicos auto-generados sin claim <a id="f2"></a>

**Status:** ⚠ CAVEAT
**Fase:** 1 (en producción parcial — 81 people en DB)
**Fuentes:** agregación multi-source.

**Riesgos:**
1. **GDPR — Right of erasure (Art. 17).** Usuario UE (artista o no-artista que aparezca en data) puede solicitar remoción. Aplica incluso si es figura pública en rol profesional — no es veto automático de erasure, pero requiere balance test.
2. **Defamation.** Si una bio generada por AI afirma algo falso o perjudicial sin source válido, exposición civil.
3. **Derecho al olvido (España LOPDGDD, Argentina).** Similar a GDPR pero jurisdicción-específico.
4. **Right of publicity (US).** Uso factual-informacional protegido por First Amendment + precedente Feist. Uso comercial (marketing, sponsored ads usando nombre artista sin consent) NO.
5. **Data incorrecta.** Si mostramos "Artista X · Caracas · 1985" y es incorrecto, puede dañar reputación + exposure legal.

**Mitigaciones requeridas (obligatorias pre-launch):**
- ✅ **Takedown / erasure process operativo** en `takedown-disputes.md`. Endpoint `privacy@dauton.media` + form en site.
- ✅ **Bio generation pipeline con source attribution** — cada afirmación factual en bio tiene source trazable en `sources` table. Si source no existe, la afirmación no entra.
- ✅ **Disclaimer visible** en perfil sin claim: "Perfil generado automáticamente desde fuentes públicas. ¿Sos este artista? Reclamalo aquí."
- ✅ **Sensitive categories NEVER in auto-bio:** religión, orientación sexual, salud, vida privada no-profesional, adicciones, criminal record. Solo datos profesionales + fechas públicas + colaboraciones + discografía.
- ✅ **Audit log** de cambios en perfil con source y timestamp — para defender contra claims de alteración.

**Precedente industria:**
- **IMDb:** perfiles de personas sin claim, con takedown process. Demandada múltiples veces por right-of-publicity, mayormente gana por First Amendment.
- **Wikipedia:** perfiles sin claim, takedown process, neutrality policy. Modelo más cercano a Dauton.
- **Chartmetric:** perfiles sin claim, process de corrección. Nunca demandada públicamente.

**Business implication:** el claim flow (feature #9) monetiza este feature indirectamente — convertir perfiles auto-generados en Artistas Pro.

**Decisión operativa:**
- Proceder con perfiles auto-generados.
- **Obligatorio antes de launch:** mitigaciones listadas arriba.
- Documentar cada takedown en `/08-Legal-Compliance/takedowns-log.md` (interno).

---

## 3. Display de album art + artist photos <a id="f3"></a>

**Status:** ⚠ CAVEAT por photos, ✓ CLEAR por album art
**Fase:** 1 (en producción)

### Album art
**Precedente firme:** Discogs, RYM, AllMusic, Genius, Wikipedia — display de cover art para factual identification es fair use US documentado. No litigation significativa en 20+ años.

**Mitigaciones:**
- Size cap: thumbnail 300×300, full 800×800 max.
- Attribution al label cuando conocido.
- Respetar takedown requests vía DMCA.

### Photos de artistas
**Riesgo ALTO.** Press photos son frecuentemente stock agency (Getty, AP) con aggressive licensing enforcement.

**Mitigaciones obligatorias:**
1. **Jerarquía de sourcing:**
   - Priority 1: artista sube su propia foto vía claim flow (license grant a Dauton).
   - Priority 2: Wikipedia/Commons con licencia CC compatible.
   - Priority 3: press photos solo si provienen del artista o label (con attribution + consent documentado).
   - **PROHIBIDO:** Getty/AP/stock agency sin licencia.
2. **Small size + attribution visible.**
3. **Takedown response < 72h.**
4. **Photo audit log** — cada foto tiene campo `source` + `license_type` + `attribution_text`.

**Decisión operativa:**
- Engineering: agregar columnas a tabla `people`: `photo_source`, `photo_license`, `photo_attribution`.
- Launch: solo fotos con licencia documentada. Perfiles sin foto licenciada muestran placeholder / iniciales.

---

## 4. Display de streams / popularity metrics <a id="f4"></a>

**Status:** ⚠ CAVEAT
**Fase:** 1 (parcial)
**Fuentes:** Spotify API (limitado post-2024), scraping IG (prohibido — ver tos-compliance.md), third-party aggregators.

**Riesgos:**
- **Spotify post-2024:** followers + popularity removidos del Client Credentials flow. Si mostramos stats stale, users asumen que son real-time (potencial misleading).
- **IG scraping:** prohibido por ToS.
- **Precisión:** mostrar "1.2M monthly listeners" si viene de estimación propia sin disclosure es misleading.

**Mitigaciones:**
- **Timestamp visible** en cada métrica mostrada ("última actualización: 2 días").
- **Source attribution** ("via Spotify API, refreshed weekly").
- **Ranges en vez de números exactos** cuando la fuente es estimación propia ("~1-2M monthly listeners").
- **NO IG scraping** — remover workers si existen. Solo IG connectado vía claim flow + user consent.

**Mandato Engineering:** validar que no hay worker IG scrapeando en el repo. Si hay, remover.

---

## 5. Bios generadas con AI <a id="f5"></a>

**Status:** ⚠ CAVEAT
**Fase:** 2 (en diseño — stage-3-bios.ts scaffolded)

**Riesgos:**
- **Defamation por hallucination.** AI puede afirmar hechos falsos. Si afirmamos que "X artista tuvo problema con la ley" sin source y es falso, exposición.
- **Copyright por parafraseo demasiado cercano a Wikipedia.** Si el AI copia sintaxis de Wikipedia, viola CC BY-SA viralidad.
- **Sesgo.** Bios generadas pueden reforzar estereotipos.

**Mitigaciones obligatorias:**
1. **Source grounding obligatorio.** Cada afirmación factual en bio tiene un `source_id` trazable. El skill `bio-drafter` solo usa afirmaciones con source.
2. **Blacklist de categorías sensibles** (ya listado en feature #2).
3. **Human-in-the-loop para Tier 1 artistas** — top 50 pillars tienen review manual antes de publicar. Tier 2+ auto-publica con flag "generated".
4. **Disclaimer visible:** "Bio generada automáticamente desde fuentes. Reportar error aquí."
5. **Edit history** trazable — si alguien (user o artista) edita, queda registro.

**Precedente industria:**
- **Wikipedia:** neutrality + source requirement. Modelo a imitar.
- **Spotify Daylist / editorial AI:** disclosed como generado.

**Business implication:** feature core del MVP — no-op si no se hace bien. El 100% de perfiles tendrán bio generada.

---

## 6. Visualizaciones (timeline, mapa, grafo) <a id="f6"></a>

**Status:** ✓ CLEAR
**Fase:** 2

**Riesgos:** mínimos — son derivados factuales de data ya auditada.

**Mitigaciones:**
- Attribution fuentes visible en footer de cada viz.
- Si la viz destaca a un artista específico (ej. centro del grafo), no implicar endorsement comercial.

**Precedente:** Chartmetric dashboards, MusicBrainz visualizations, Wikipedia categorías. Fair use estándar.

**Business implication:** core SEO magnet — contribuye a Tracks 6 (sponsorship editorial) y 1 (donations signal).

---

## 7. Calculadora de ingresos del artista <a id="f7"></a>

**Status:** ⚠ CAVEAT
**Fase:** 2 (diseño)

**Riesgos:**
1. **Liability por estimación incorrecta.** Si decimos "Artista X gana $Y" y el artista discrepa, potencial reclamo.
2. **Derecho de publicidad.** Usar nombre del artista + cifra comercial puede rozar commercial speech.
3. **Misinformation viral.** Screenshots de la calculadora usados out-of-context para avergonzar al artista.
4. **ToS Spotify:** si la calculadora depende del uso masivo de API Spotify para estimar, puede violar "data mining" clause.

**Mitigaciones obligatorias:**
1. **Disclaimer fuerte y visible:** "Estimación basada en promedios públicos de royalties por plataforma. NO refleja ingresos reales del artista, que dependen de acuerdos privados con labels, publishing, features, etc."
2. **Ranges, no números exactos:** "Estimado $800-$3,500/mes por streams en Spotify" — NO "$2,347/mes".
3. **Metodología pública** en `/calculator/methodology`: fuentes de royalty rates, assumptions, limitaciones.
4. **Opt-out para artistas claim-ed.** Si un artista reclama perfil y pide que no se muestre calculator en su página, se respeta.
5. **No usar para marketing.** No "Enterate cuánto gana X" en ads — solo tool orgánico.
6. **Rate limit queries por IP** para evitar abuso + ToS Spotify violation.

**Precedente:**
- **Spotify Royalty Calculator** (tools como soundcharts royalty calc, bandcamp's own): disclaimers similares, no-litigation.
- **Celebrity Net Worth**: modelo de estimaciones públicas con disclaimer. Demandada varias veces, gana por First Amendment.

**Business implication:** es el hero SEO feature MVP. Clave para Track 1 (donations via audiencia orgánica) y Track 6 (sponsor future).

---

## 8. Herramientas SEO adicionales <a id="f8"></a>

**Status:** 🟡 PENDING (depende de Data & SEO chat)
**Fase:** 2-3

**Mandato:** cada herramienta nueva que Data & SEO proponga pasa por review Clase B (48h). Precedente general: si es derivada de data ya auditada + tiene disclaimer + no es advice financiero/legal directo → probable ✓ clear o ⚠ caveat leve.

**Items candidatos mencionados:** "cuánto gana" (feature #7), mapa de colabs, timeline, calculadora costo evento (feature #23).

**Research item:** `legal-research-list.md` → "Revisar cada herramienta SEO cuando Data&SEO la proponga."

---

## 9. Claim flow + verified badge <a id="f9"></a>

**Status:** ⚠ CAVEAT
**Fase:** 2

**Riesgos:**
1. **Identity verification falla.** Alguien reclama perfil de artista legítimo fraudulentamente.
2. **Fake verification.** Falla en detectar impersonation → daño al artista real + a Dauton reputación.
3. **Data protection.** Si pedimos ID (passport) para verify, hay que tratar como sensitive data.

**Mitigaciones obligatorias:**
1. **Multi-factor verification:**
   - Email matching (spotify.com o dominio oficial artista).
   - Social auth (Twitter/IG verificado con match de name).
   - Video selfie + holding ID (Dauton NO almacena el ID — solo el hash de verificación).
   - Para tier high-profile: email directo a label manager conocido.
2. **ID NEVER stored** — solo verification result + timestamp. Fotos de ID se eliminan post-verification.
3. **Reversible.** Badge verified se puede remover si descubrimos fraud, con notice al user.
4. **Dispute process** para artistas que reclaman que alguien verificó un perfil fraudulentamente.

**Research item:** evaluar servicio third-party de verificación (Persona, Veriff, Onfido) — offload el compliance burden. Costo: $0.50-$2 per verification.

**Business implication:** gate principal para Track 2 (Artist Pro). Malo verify = monetización rota.

---

## 10. Auth (signup, magic link, Google OAuth) <a id="f10"></a>

**Status:** ✓ CLEAR
**Fase:** 1 (pendiente implementación)
**Infra:** Supabase Auth.

**Mitigaciones ya cubiertas:**
- Supabase Auth tiene compliance GDPR + CCPA built-in.
- Password hashing automático.
- Session management secure.

**Mandato:**
- Privacy policy + terms aceptación en signup (checkbox obligatorio).
- Double opt-in para email marketing si aplicable.
- Age gate 13+ (COPPA compliance).

**Precedente:** cada SaaS moderno usa Supabase Auth / Auth0 / etc sin review adicional.

---

## 11. Favoritos + listas privadas + listas públicas <a id="f11"></a>

**Status:** ✓ CLEAR
**Fase:** 2

**Mandato:**
- Default `is_public=false` en listas (ya decidido + migración aplicada).
- User puede cambiar a público explícitamente.
- Terms acceptation incluye grant de license para display de listas públicas.

**Precedente:** Spotify Playlists, Genius forolibraries, RYM lists.

---

## 12. Contribuciones de usuarios (correcciones) <a id="f12"></a>

**Status:** ⚠ CAVEAT
**Fase:** 2

**Riesgos:**
1. **Spam/vandalism** — user agrega data falsa/maliciosa.
2. **Copyright infringement** — user pega texto copyrighted como "corrección".
3. **Liability por contenido user-generated** — protección DMCA Section 512(c) (safe harbor) aplica si tenemos proceso + DMCA agent registrado.

**Mitigaciones obligatorias:**
1. **Moderación pre-publish.** Low-risk changes (typos, social links) auto-aprobadas; high-risk (bios, claims de credits) requieren human review via queue (ya implementado en schema).
2. **ToS aceptación** en signup — user grants Dauton license para usar contribuciones.
3. **DMCA safe harbor:** agent registrado con US Copyright Office (item pre-launch en compliance-calendar).
4. **Audit log** — cada contribución + estado + reviewer.
5. **Ban process** para users con pattern de mal comportamiento.

---

## 13. Eventos públicos <a id="f13"></a>

**Status:** ✓ CLEAR (con integración API)
**Fase:** 2-3
**Fuentes:** Eventbrite API, Ticketmaster Discovery (pending partner), Bandsintown (pending API key).

**Mitigaciones:**
- Data vía API oficial + refresh regular.
- Link-out a plataforma origen para compra.

**Business implication:** base para Track 5 (comisión tickets post-partnership).

---

## 14. Merch redirect externo <a id="f14"></a>

**Status:** ⚠ CAVEAT
**Fase:** 3

**Riesgos:**
1. **Affiliate disclosure FTC.** Si eventualmente recibimos commission (incluso post-MVP), disclosure obligatorio desde el primer día con tracking.
2. **Link-out safety.** Si Dauton enlaza a "tienda del artista" y la tienda resulta ser phishing, exposición a Dauton.
3. **Brand confusion.** User puede creer que Dauton vende el merch.

**Mitigaciones obligatorias:**
1. **Disclaimer on link:** "Tienda externa operada por el artista/tercero. Dauton Media no procesa la venta."
2. **Verificación de merch link** — claim flow del artista incluye validación del URL.
3. **FTC disclosure template ready** — aunque MVP no tenga commission, el template está listo para activar.
4. **Abrir en new tab + rel="noopener nofollow sponsored"** cuando sea affiliate (post-tracción).

**Precedente:** Genius links a merch + Bandcamp links — precedente fair linking.

---

## 15. Tickets redirect externo <a id="f15"></a>

**Status:** ✓ CLEAR
**Fase:** 3

Igual que feature #14 — link-out puro, sin processing, sin commission MVP.

---

## 16. Press kit descargable <a id="f16"></a>

**Status:** ⚠ CAVEAT
**Fase:** 3

**Riesgos:**
1. Press kit contiene bio + fotos + stats + contacto. Si Dauton genera y distribuye sin claim del artista, potencial right-of-publicity issue si usado comercialmente.
2. Fotos usadas en press kit — mismo issue que feature #3.

**Mitigaciones:**
- Press kit solo generado para perfiles **claim-ed** (el artista autorizó).
- Fotos incluidas solo con license grant del artista.
- Watermark / attribution visible ("Generated via Dauton Media, [date]").

**Business implication:** feature pro potencial (Booking Kit Pro Fase 4).

---

## 17. Ko-fi donations <a id="f17"></a>

**Status:** ✓ CLEAR
**Fase:** 3

**Mitigaciones:**
- Ko-fi es processor — ellos cumplen KYC + payments compliance.
- Vulqo LLC recibe payouts directo a account US.
- Disclosure en site: "Donations process via Ko-fi, no-refund unless error."

**Research item:** confirmar que Vulqo LLC tiene Ko-fi account compatible con payouts internacionales si donors de LatAm/UE.

---

## 18. Email outreach masivo a artistas <a id="f18"></a>

**Status:** ⚠ CAVEAT
**Fase:** 3

**Riesgos:**
1. **CAN-SPAM (US).** Emails a artistas US requieren: identificación clara, unsubscribe link funcional, dirección física.
2. **GDPR (UE).** Emails a artistas UE requieren base legal — probablemente interés legítimo B2B, pero con opt-out claro. Si el artista no es "business contact" ni es figura pública profesional, requiere consent.
3. **CASL (Canadá).** Similar a GDPR pero más strict.
4. **LatAm.** LOPDGDD España, LGPD Brasil, etc.
5. **Reputation damage.** Outreach spammy → reports a Gmail/Outlook → dominio Dauton blackhouse.

**Mitigaciones obligatorias:**
1. **Template CAN-SPAM compliant:**
   - From clara: "Dauton Media <hello@dauton.media>"
   - Unsubscribe link en cada email.
   - Physical address en footer (Vulqo LLC address).
   - No subject misleading.
2. **Opt-out DB.** Email unsubscribed → never contacted again.
3. **Interés legítimo documentado** — email se dirige al artista en su capacidad profesional con info sobre SU perfil en Dauton. Justificación documentada.
4. **Volume progresivo.** No 500 emails/día desde dominio fresco. Warmup: 20, 50, 100, 200 emails/día escalando.
5. **Reputation monitoring** — check blacklist services, SPF/DKIM/DMARC bien.
6. **Segmentación jurisdicción:** emails a UE incluyen disclosure GDPR-specific (derechos, opt-out). Emails a US incluyen CAN-SPAM requirements.

**Herramienta recomendada:** Resend (ya en stack) + ListMonk o Instantly para outreach. NO bulk blast desde Gmail personal.

**Business implication:** core de go-to-market para Track 2 (Artist Pro conversion). Hacerlo mal quema el canal permanentemente.

---

## 19. Static pages (About / Methodology / Privacy / Terms) <a id="f19"></a>

**Status:** ✓ CLEAR (contenido pending)
**Fase:** 3 pre-launch

**Mandato:**
- `/about` — historia + misión + equipo. Ya existe route.
- `/methodology` — cómo se construye el archive, qué fuentes. Ya existe route.
- `/privacy` — ver `privacy-policy-draft.md` v2. Live pre-launch.
- `/terms` — ver `terms-draft.md` v2. Live pre-launch.
- `/legal/dmca` — process + agent contact. Nueva route, pending.
- `/legal/takedown` — form de takedown. Nueva route, pending.

---

## 20. Artist Pro Tier <a id="f20"></a>

**Status:** ⚠ CAVEAT
**Fase:** 4

**Riesgos:**
1. **Sales tax.** Subscription SaaS US tiene nexus rules por state (SST: Streamlined Sales Tax). Vulqo LLC nexus state + states con revenue > threshold.
2. **VAT UE.** Si cobramos a artistas UE, VAT moss / IOSS aplica. $0-10,000 usualmente under threshold, > $10,000 requiere registro.
3. **Chargebacks + refunds policy.**
4. **Feature parity con lo prometido.** Si Pro incluye "analytics Spotify" y Spotify cambia API, feature muere — refund liability.

**Mitigaciones obligatorias:**
1. **Stripe como processor** — compliance PCI + sales tax automation (Stripe Tax) + VAT handling built-in.
2. **ToS específico Pro tier** en terms-draft.md: cancellation anytime, refund policy clear, features subject to change con notice.
3. **No-refund default** (industry standard) pero with "best effort if changes materially break feature set."
4. **Features pro independientes de APIs externas** donde posible — vanity URL, destacado editorial, priority support son 100% nuestros.

**Research items:**
- Confirmar state of Vulqo LLC (NJ vs DE) para determinar sales tax nexus primary.
- Umbrales de states para sales tax económico nexus (Wayfair).

**Business implication:** Track 2 de financing-tracks.md. Pricing $8/mes validado vs Bandcamp Pro / Soundcloud Pro.

---

## 21. Manager Tier + multi-artist dashboard <a id="f21"></a>

**Status:** ⚠ CAVEAT
**Fase:** 4-5

**Riesgos:** extra a Artist Pro:
1. **Multi-artist access = data sharing.** Manager ve analytics de artistas que maneja → cada artista tiene que consentir explícitamente.
2. **GDPR data processor.** Si Dauton provee dashboard de analytics del artista al manager, Dauton es data processor y el contrato manager-artista es el legal basis.

**Mitigaciones obligatorias:**
1. **Artist consent flow:** artista (claim-ed + Pro) autoriza explícitamente a su manager a ver analytics.
2. **Revocable anytime** desde UI del artista.
3. **Audit log** — manager X accedió a dashboard de artista Y en timestamp Z.
4. **Terms específico manager** incluye data handling clauses.

**Business implication:** Track 3.

---

## 22. Promoter Search (B2B) <a id="f22"></a>

**Status:** ⚠ CAVEAT
**Fase:** 4

**Riesgos:**
1. **Data export.** Si promoter puede exportar listas de artistas + contactos, puede usar esa lista para spam outside Dauton.
2. **Contact info sharing.** Mostrar email/phone de artistas a promoters requiere opt-in del artista.

**Mitigaciones obligatorias:**
1. **Contact info hidden by default.** Artista con claim opta-in a "I'm accepting booking inquiries via Dauton."
2. **Contact revelation gated:** promoter paga subscription + cada contact reveal se logga + artista notificado.
3. **Anti-scrape on search:** rate limits, IP blocks si pattern anómalo.
4. **ToS promoter:** no mass-contact, no export to third-party lists, breach = ban.

**Business implication:** Track 7 complementario.

---

## 23. Calculadora costo evento <a id="f23"></a>

**Status:** ⚠ CAVEAT
**Fase:** 4

Similar a calculadora de ingresos (feature #7) pero target promoter. Mismos riesgos:
- Disclaimer fuerte.
- Ranges no exactos.
- No usar nombre del artista en marketing.

---

## 24. Booking Kit Pro <a id="f24"></a>

**Status:** ✓ CLEAR
**Fase:** 4

Extensión del Press Kit (feature #16). Solo para artistas claim-ed + Pro. Mitigaciones idénticas a #16.

---

## 25. Data licensing B2B <a id="f25"></a>

**Status:** ⚠ CAVEAT SERIA
**Fase:** post-MVP (año 2)

**Riesgos:**
1. **ToS de fuentes prohíben redistribución derivativa.** Spotify + YouTube explícitos. Data licensada NO puede incluir data raw de esas fuentes.
2. **GDPR obligations al licensee.** Si el dataset contiene data de artistas UE, el licensee es co-controller o sub-processor → contrato DPA obligatorio.
3. **Liability por accuracy.** Licensee puede reclamar si data errónea causa decisión de negocio costosa.

**Mitigaciones obligatorias:**
1. **Dataset derivative-only.** Fields expuestos B2B: MusicBrainz-sourced (CC0) + Wikidata (CC0) + data propia (contribuciones verified). NO Spotify raw, NO YouTube raw.
2. **Contrato de licencia B2B formal** — drafted por agent, incluye:
   - Definición de uso permitido (internal, non-resale).
   - DPA clauses (GDPR).
   - Limitation of liability ($X monto).
   - Attribution "Powered by Dauton Media" en producto derivado.
   - Termination anytime con 30d notice.
3. **No Spotify data resold.** Cualquier feature del dashboard que use Spotify data es display-only con attribution; el licensee no puede re-API-ificar.

**Research items:**
- Validar DPA template via Shopify DPA o similar industry standard.
- Decisión: ¿API access para licensee, o data dump trimestral? API tiene compliance más complejo pero value add más grande.

**Business implication:** Track 7. Revenue potencial alto, complejidad legal alta.

---

## 26. Comisión merch (affiliate) <a id="f26"></a>

**Status:** ⚠ CAVEAT
**Fase:** 3-4

**Riesgos:**
1. **FTC Endorsement Guide.** Disclosure obligatorio en US.
2. **EU Directive 2005/29/EC.** Disclosure obligatorio en UE.
3. **Amazon Associates / Shopify Collabs** — cada uno tiene ToS específico + requisitos de disclosure.

**Mitigaciones obligatorias:**
1. **Disclosure estandarizada cerca del link:** "Dauton Media puede recibir comisión si compras vía este link."
2. **Disclosure general en footer:** "Este sitio contiene links afiliados."
3. **Disclosure en privacy-policy** que mencione uso de tracking affiliate.
4. **Cookie consent** si usamos cookies para tracking cross-site.

**Research items:**
- Bandcamp no tiene programa affiliate público — explorar partnership directo.
- Shopify Collabs eligibility (Dauton as influencer/publisher).

**Business implication:** Track 4.

---

## 27. Comisión tickets (affiliate / partnership) <a id="f27"></a>

**Status:** ⚠ CAVEAT
**Fase:** 4

**Riesgos:** similares a #26 más:
1. **Ticket reseller laws** (US) — 27 states con laws específicas. Dauton como referer (no reseller) generalmente exempt pero verify por state.
2. **VAT/IVA services digitales UE** si promoter partner opera en UE y nosotros cobramos commission.

**Mitigaciones obligatorias:**
1. Partner Program approval (Eventbrite, Ticketmaster, Bandsintown) antes de activar commission.
2. Stripe como processor para commission payouts.
3. FTC disclosure idéntico a #26.

**Business implication:** Track 5.

---

## 28. Sponsorship editorial <a id="f28"></a>

**Status:** ⚠ CAVEAT
**Fase:** 4-5

**Riesgos:**
1. **FTC Native Advertising Disclosure.** "Sponsored by X" obligatorio.
2. **Editorial vs advertising boundary.** Si sponsor influye contenido, pierde fair use protection + pierde credibilidad.
3. **Brand safety del sponsor.** Si archive expone un artista con beef contra el sponsor, conflict.

**Mitigaciones obligatorias:**
1. **Contrato sponsor explícito:**
   - Sponsor NO review contenido.
   - Sponsor NO pide coverage de artistas específicos.
   - Dauton retiene editorial control 100%.
   - Termination por cualquier parte con 14d notice.
2. **Disclosure visible** en cada impresión sponsoreada.
3. **Sponsor policy pública** — lista de sponsors actuales + pasados.
4. **Blacklist sponsors:** gambling, crypto spec, alcohol a menores, brands en litigio con scene.

**Business implication:** Track 6.

---

## 29. Tienda propia merch con host fee <a id="f29"></a>

**Status:** ✗ BLOCKER (post-MVP, múltiples research items)
**Fase:** Post v1.5 / año 2

**Riesgos:**
1. **Payments processor nexus** — si Dauton procesa pagos directo, obligaciones PCI + AML/KYC.
2. **Sales tax por state** — nexus económico por cada state donde vendemos.
3. **Shipping regulations internacional** si artista envía a múltiples países.
4. **Returns/refunds policy.**
5. **Seller liability** si producto es defectuoso, copyright infringement, etc.

**Mitigaciones:**
1. **NO procesar pagos directo.** Usar Stripe Connect como platform — Dauton es platform, artista es merchant of record. Artista asume liability primaria.
2. **Stripe Connect cubre la mayoría del compliance.**
3. **Marketplace agreement** artista↔Dauton que clarifica roles + liability.
4. **ToS buyer/seller** específicos.

**Research items (múltiples):**
- Stripe Connect setup + requisitos.
- Marketplace facilitator laws por state (algunos states obligan a Dauton a collect + remit sales tax on behalf of merchants).
- Umbral económico por jurisdicción.

**Business implication:** Track 4b (host fee model). Complejidad alta — verify ROI vs esfuerzo legal.

---

## 30. Capital raise <a id="f30"></a>

**Status:** ⛔ TRIGGER DE ABOGADO HUMANO
**Fase:** Condicional (Track 8)

**Razón:** cap table + SAFE/convertible drafting + Delaware C-Corp conversion + Reg D compliance = no-go para el agent.

**Mandato cuando aparezca oportunidad:**
1. Agent documenta estado actual del proyecto para briefing al abogado.
2. Founder contacta abogado corporate US (referencia: Stripe Atlas legal partners, Orrick Founder Series, Cooley GO).
3. Presupuesto estimado: $5k-15k para primera ronda angel/pre-seed.

---

## 31-35. Nuevas oportunidades — ver `09-Business/new-opportunities.md`

Cada una será auditada individualmente cuando pase a diseño. Notas preliminares:

- **Tip jar integrado (artista → fan):** Stripe Connect platform model. PCI compliance handled by Stripe. KYC del artista obligatorio. ⚠ CAVEAT post-claim.
- **Public API freemium:** ToS + rate limits + API terms + key management. ✓ CLEAR con ToS redactados.
- **Newsletter premium digest:** CAN-SPAM + GDPR. ✓ CLEAR con mitigaciones estándar (feature #18).
- **Sync licensing referral:** contrato tripartito complejo. ⚠ CAVEAT — requires contract template.
- **Venues directory premium:** similar a Yelp for Business. ✓ CLEAR.

---

## Matriz de severidad × probabilidad (top-level)

| Riesgo | Probabilidad | Severidad | Mitigación primaria |
|---|---|---|---|
| Photo rights claim | Media | Baja-Media | Sourcing hierarchy + takedown |
| GDPR erasure request | Media | Baja | Process operativo |
| Spotify API ban | Media | Media | Rate limiting + circuit breaker |
| Defamation claim por bio AI | Baja | Media-Alta | Source grounding + review top 50 |
| Artist disputa perfil no claim | Media | Baja | Claim flow + takedown fácil |
| Scraping IG detectado | Alta si se hace | Alta | **NO scraping — remove if exists** |
| ToS violation Spotify por data licensing | Media | Alta | No redistribuir raw Spotify data |
| CAN-SPAM violation outreach | Media | Media | Template + warmup + opt-out |
| FTC affiliate non-disclosure | Media | Baja-Media | Disclosure template ready |
| Sales tax non-collect | Media post-Pro | Media | Stripe Tax automation |
| Lawsuit serio | Baja | Alta | TRIGGER abogado humano |

---

## Dependencias para Engineering (consolidado)

Items que tienen que estar implementados antes de exposure público de cada feature:

1. **Pre-launch obligatorio:**
   - DMCA agent registrado US Copyright Office.
   - Privacy + Terms live.
   - `/legal/dmca` + `/legal/takedown` pages.
   - Attribution fuentes visible en footer.
   - Cookie consent banner si aplica.
   - Email de contacto: privacy@, legal@, dmca@, corrections@.
   - `is_public=false` default en user_profiles (ya aplicado).
   - Source attribution en cada bio AI (source_id trazable).
   - Takedown process operativo con response 72h.
2. **Pre-Fase 4:**
   - YouTube metadata TTL ≤ 30d refresh logic.
   - Stripe Tax para sales tax automation.
   - Identity verification vendor integrado.
   - CAN-SPAM-compliant email template.
3. **Pre-Track 7 (data licensing):**
   - DPA template redactado.
   - License contract template.
   - API rate limiting + analytics.

---

*Cross-refs: `tos-compliance.md`, `feature-review-workflow.md`, `takedown-disputes.md`, `privacy-framework.md`, `compliance-calendar.md`, `legal-research-list.md`, `09-Business/monetization-audit.md`.*
