# Legal Research List — Items abiertos

**Owner:** Business & Legal agent
**Última actualización:** 2026-04-25
**Status:** v2 — live backlog (reemplaza v1 2026-04-25 anterior)

---

## Propósito

Inventario priorizado de items legales que requieren investigación o decisión antes de ciertos triggers. Se consolida con `TASKS.md` tag `[BIZ-LEGAL]`.

**Formato:**
- **P0:** blocker, resolver antes de launch público.
- **P1:** resolver antes de fase/feature específica.
- **P2:** resolver cuando aparezca trigger.
- **P3:** low-priority, nice-to-have.

---

## P0 — Pre-launch

### P0.1 — State of Vulqo LLC (NJ vs DE)
**Contexto:** el draft de Terms (Section 16) asume NJ como governing law. El agent no tiene evidencia confirmada del state.
**Acción:** founder confirma estado exacto + fecha de registration + EIN activo.
**Output:** update `terms-draft.md` + afecta Delaware C-Corp conversion planning (si capital raise algún día).
**Owner:** founder (lookup en records Vulqo LLC).
**Deadline:** antes de publicar Terms v2.

### P0.2 — Auditar si existe worker de Instagram scraping en repo
**Contexto:** `plan-maestro.md` Fase 1 mencionaba "Instagram (públicas) → normalización". Si implementado, viola Meta ToS (ver `tos-compliance.md` §6).
**Acción:** Engineering busca en `02-Engineering/website/src/lib/ingest/workers/` si hay worker IG. Si sí, pausar + evaluar alternatives.
**Output:** ✗ blocker hasta remover o cambiar approach.
**Owner:** Engineering + agent.
**Deadline:** ASAP (riesgo material).

### P0.3 — Confirmar Supabase region (US vs EU)
**Contexto:** impacta transferencias internacionales declaradas en privacy policy.
**Acción:** Engineering confirma region del project `pmckviaplfxjfqubuknt`.
**Output:** update privacy policy con region real.
**Owner:** Engineering.
**Deadline:** pre-launch.

### P0.4 — Confirmar DPA disponibles con cada sub-processor
**Contexto:** GDPR Art. 28 obliga DPA con cada processor.
**Acción:** verificar y activar DPA en: Supabase, Vercel, Stripe, Resend, Cloudflare, Plausible. La mayoría tiene DPA auto-activable en dashboard.
**Output:** checklist completo en `privacy-framework.md`.
**Owner:** founder.
**Deadline:** pre-launch.

### P0.5 — Trademark search preliminar "Dauton Media"
**Contexto:** antes de major launch + marketing.
**Acción:** search en [TESS (USPTO)](https://tmsearch.uspto.gov/) + Madrid System + states relevantes LatAm. Agent puede hacer search inicial.
**Output:** reporte de conflictos + decisión filing.
**Owner:** agent ejecuta search, founder decide filing.
**Deadline:** 30 días pre-launch.

### P0.6 — Ko-fi account compatible con Vulqo LLC + payouts internacionales
**Contexto:** launch MVP incluye Ko-fi donations como único revenue activo.
**Acción:** verificar que Ko-fi acepta Vulqo LLC como recipient + payouts a cuenta US funcional + accepts donors de LatAm/UE sin fricción.
**Output:** Ko-fi activo pre-launch.
**Owner:** founder.
**Deadline:** pre-launch.

### P0.7 — DMCA designated agent registrado
**Contexto:** safe harbor 17 USC §512 obligatorio para protección contra user-generated content claims.
**Acción:** filing online en US Copyright Office ($6).
**Output:** agent info publicada en `/legal/dmca`.
**Owner:** founder.
**Deadline:** pre-launch.

### P0.8 — Confirmar que bios AI pipeline tiene source_id grounding
**Contexto:** defamation mitigation (feature #5 legal-audit-master).
**Acción:** Engineering verifica que skill `bio-drafter` solo usa afirmaciones con `source_id` trazable en DB.
**Output:** code verification + audit.
**Owner:** Engineering.
**Deadline:** antes de ejecución masiva de bios.

---

## P1 — Pre-Fase 4

### P1.1 — Sales tax nexus evaluation (para Artist Pro activation)
**Contexto:** cuando activamos subscriptions, cada state con economic nexus threshold requiere sales tax collection.
**Acción:** Stripe Tax automation solves most. Setup + states whitelisted + confirm con threshold actual por state.
**Output:** Stripe Tax activado.
**Owner:** founder + agent.
**Deadline:** pre-Track 2 activation (Fase 4).

### P1.2 — VAT MOSS / IOSS UE
**Contexto:** si cobramos a artistas UE > €10,000/año, VAT registration obligatorio.
**Acción:** monitorear revenue UE. Si se acerca a umbral, activar IOSS.
**Output:** threshold tracking + activation plan.
**Owner:** founder + agent monitoreo.
**Deadline:** trigger-based, cuando revenue UE > €5,000 (early warning).

### P1.3 — Identity verification vendor (para claim flow)
**Contexto:** Artist claim verify requiere ID verification en tier high-profile.
**Acción:** evaluar Persona, Veriff, Onfido. Costs $0.50-$2/verification.
**Output:** vendor seleccionado + integration spec.
**Owner:** agent evalúa, Engineering integra.
**Deadline:** pre-claim flow launch (Fase 2).

### P1.4 — CAN-SPAM compliance email template + infra
**Contexto:** outreach masivo a artistas (Fase 3).
**Acción:** draft template compliant (unsubscribe, address, no misleading subjects). Setup Resend + ListMonk o Instantly con warmup.
**Output:** template + infra email lista.
**Owner:** agent drafts, Community & Outreach ejecuta.
**Deadline:** pre-Fase 3.

### P1.5 — Affiliate program Bandcamp
**Contexto:** Bandcamp no tiene programa affiliate público formal. Track 4 depende de algún mechanism.
**Acción:** contactar Bandcamp directamente (support@bandcamp.com) proponiendo partnership. Fallback: Shopify Collabs para artistas en Shopify.
**Output:** decisión partnership / alternative.
**Owner:** Business & Legal + Community & Outreach.
**Deadline:** pre-Track 4 activation.

### P1.6 — Ticketmaster Partner Program application
**Contexto:** Track 5 depende de API + commission.
**Acción:** aplicar a Partner Program en developer.ticketmaster.com.
**Output:** approval o rechazo. Si rechazado, fallback Eventbrite.
**Owner:** founder.
**Deadline:** pre-Fase 4.

### P1.7 — Eventbrite Referral Partner / Affiliate
**Contexto:** fallback primario.
**Acción:** aplicar vía Eventbrite developer portal.
**Output:** affiliate activo.
**Owner:** founder.
**Deadline:** pre-Fase 4.

### P1.8 — Bandsintown API key + Partner Program
**Contexto:** fuente primaria para tours/eventos.
**Acción:** aplicar vía Bandsintown.
**Output:** API key activa.
**Owner:** founder.
**Deadline:** Fase 3.

### P1.9 — Label contracts data — qué podemos mostrar
**Contexto:** plan-maestro menciona "historial de contratos" para Label tier. ¿Contratos son data pública o NDA-bound?
**Acción:** investigar fuentes públicas de label contracts (RIAA filings, label press releases, LinkedIn career history). Decision: solo mostrar data públicamente declarada, nunca inferred.
**Output:** política "qué data de contratos mostramos" documentada.
**Owner:** agent.
**Deadline:** pre-Track 7 Label tier.

---

## P2 — Trigger-based

### P2.1 — DPA template para data licensing B2B (Track 7)
**Contexto:** cuando primer licensee, necesitamos contract + DPA.
**Acción:** agent drafts template basado en Shopify DPA / industry standard.
**Output:** `08-Legal-Compliance/data-licensing-contract-template.md`.
**Owner:** agent.
**Deadline:** Track 7 activation trigger.

### P2.2 — Marketplace Facilitator laws (Track 4b — tienda propia)
**Contexto:** algunos states obligan a platform a collect + remit sales tax on behalf of merchants.
**Acción:** evaluar states relevantes + decisión Stripe Connect setup.
**Output:** tax handling plan para marketplace model.
**Owner:** agent + founder.
**Deadline:** Track 4b activation (post-tracción).

### P2.3 — Publisher insurance (E&O / cyber)
**Contexto:** activar cuando MRR > $1,000 + activamos sponsorship editorial.
**Acción:** quote de 3 carriers (Hiscox, Chubb, Coalition for cyber).
**Output:** insurance policy active.
**Owner:** founder.
**Deadline:** trigger ($1k MRR).

### P2.4 — Corporate lawyer referrals preparados
**Contexto:** cuando capital raise aparezca, no perder tiempo buscando.
**Acción:** agent compila lista de lawyers especializados. En `09-Business/stakeholder-list.md`.
**Output:** contactos + quotes.
**Owner:** agent.
**Deadline:** antes de Q3 2027.

### P2.5 — Contract template sync licensing referral (new opportunity)
**Contexto:** si activamos Track 14 propuesto (sync licensing referral), contract tripartito.
**Acción:** agent drafts template cuando feature entre a Product pipeline.
**Output:** template ready.
**Owner:** agent.
**Deadline:** trigger-based.

### P2.6 — YouTube transcripts via Whisper
**Contexto:** Sprint 9 menciona "YouTube transcripts". Usar Whisper sobre audio oficial es legal; scrapear transcripts del YouTube UI no.
**Acción:** confirmar que pipeline usa Whisper (no scraping).
**Output:** arquitectura confirmada.
**Owner:** Engineering.
**Deadline:** Sprint 9 planning.

---

## P3 — Low priority / backlog

### P3.1 — Trademark internacional (Madrid System)
**Contexto:** cuando hay revenue meaningful fuera de US.
**Acción:** extend trademark a UE + LatAm key countries.
**Output:** Madrid filing.
**Owner:** founder.
**Deadline:** post año 1.

### P3.2 — Secret rotation automation
**Contexto:** actualmente manual.
**Acción:** setup rotation schedule en 1Password + Vercel env vars.
**Owner:** Engineering.
**Deadline:** año 2.

### P3.3 — Accessibility compliance (ADA / WCAG)
**Contexto:** ley US requiere que sitios públicos sean accessible. Precedentes de lawsuits (Domino's case 2019).
**Acción:** audit WCAG 2.1 AA del site pre-launch.
**Output:** accessibility statement en site.
**Owner:** Engineering + Design.
**Deadline:** pre-launch ideal.

### P3.4 — Review de Schrems III / Data Privacy Framework
**Contexto:** transferencias UE-US evolucionan.
**Acción:** review anual.
**Owner:** agent.
**Deadline:** anual.

### P3.5 — AI Act (EU) compliance
**Contexto:** EU AI Act entró en vigor 2024. Dauton usa AI para bios.
**Acción:** evaluar si Dauton qualifica como "limited risk" AI system (probable). Disclosure + documentation.
**Output:** disclosure visible + internal documentation.
**Owner:** agent.
**Deadline:** post año 1.

### P3.6 — User-generated content liability (Section 230)
**Contexto:** correcciones de users. Si user publica info difamatoria, Section 230 (US) da safe harbor.
**Acción:** Moderation process + ToS terms cubren esto. Audit periódico.
**Output:** process documentado.
**Owner:** agent + Engineering.
**Deadline:** ya cubierto en ToS, review anual.

---

## Items resueltos (archivo)

### ✓ 2026-04-25 — Política de bios con AI sin violar CC BY-SA Wikipedia
Resuelto: bios son originales + source-grounded, no copia literal de Wikipedia. Documentado en `tos-compliance.md` §3 + `legal-audit-master.md` #5.

### ✓ 2026-04-25 — Fair use para cover art
Resuelto: precedente industria firme (Discogs, RYM, Wikipedia). Mitigation documentada.

### ✓ 2026-04-25 — YouTube 30-day cache rule
Resuelto: identificado como mandato Engineering. Ver `tos-compliance.md` §5.

### ✓ 2026-04-25 — Calculadora de ingresos liability
Resuelto: disclaimer fuerte + ranges no exactos + metodología pública + opt-out para artistas claim-ed. Ver `legal-audit-master.md` #7.

### ✓ 2026-04-25 — Image usage en perfiles
Resuelto: jerarquía de sourcing + takedown process + audit log. Ver `legal-audit-master.md` #3.

### ✓ 2026-04-25 — Affiliate merch disclosure
Resuelto: FTC disclosure template + footer global + link-level. Ver `legal-audit-master.md` #26.

### ✓ 2026-04-25 — Outreach email compliance
Resuelto: CAN-SPAM + GDPR template + warmup plan. Ver `legal-audit-master.md` #18.

### ✓ 2026-04-25 — Perfil sin claim + right to erasure
Resuelto: balance test + interés legítimo + claim flow como primera opción. Ver `legal-audit-master.md` #2 + `privacy-framework.md`.

---

## Cómo se agregan items

Cualquier chat puede agregar item con formato:

```
### {P0/P1/P2/P3}.{N} — {título}
**Contexto:** {por qué importa}
**Acción:** {qué hay que hacer}
**Output:** {deliverable}
**Owner:** {quién}
**Deadline:** {cuándo}
```

El agent triagea semanalmente.

---

*Cross-refs: `legal-audit-master.md`, `compliance-calendar.md`, `TASKS.md`.*
