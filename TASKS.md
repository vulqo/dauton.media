# TASKS — Board cross-area

**Propósito:** lista única de tareas pendientes que cruzan entre departamentos. Cada chat puede agregar, reclamar y cerrar tareas. Las tareas internas de un departamento se manejan en su propio folder, no acá.

**Última actualización:** 2026-04-25 · Strategy/PM

**Formato de cada tarea:**
```
- [ ] [AREA] título corto · owner · status · last-updated
      detail/notes opcionales
```

**Áreas disponibles:** `STRATEGY` `PRODUCT` `ENG` `DATA-SEO` `BIZ-LEGAL` `COMMUNITY` `DESIGN`

---

## Activas — alta prioridad

- [ ] [PRODUCT] Definir visión completa del producto · owner: Product Architecture chat · status: pending chat creation · 2026-04-25
      Bloquea: actualización de ROADMAP.md, mvp-scope.md, departments.md sección scope.
- [ ] [STRATEGY] Bootstrap prompts para 5 chats departamento · owner: Strategy/PM · status: in progress · 2026-04-25
      Files en `_Execution/bootstrap-prompts/`.

---

## Activas — media prioridad

- [ ] [ENG] Sprint 5 Stage 2 (Spotify discografía) · owner: Engineering · status: blocked by Spotify cooldown · 2026-04-25
      Cooldown estimado fin: 2026-04-25 ~22:00 ART. Scheduled task verifica.
- [x] [DATA-SEO] Inventario inicial de SEO tools candidatas · owner: Data & SEO chat · 2026-04-25
      Cerrado. Output: `05-Data/seo-tools-roadmap.md` v0.2 — 8 tools priorizadas (3 P1, 3 P2, 2 P3) + 2 deprioritized (mapa/timeline) + 7 descartadas con razón.

- [x] [DATA-SEO] Sistema operativo SEO formalizado · owner: Data & SEO chat · 2026-04-25
      Cerrado. 6 docs en `05-Data/seo/`: README, stack (tools + AI/automation + 11 APIs pendientes), keyword-framework (metodología sin GSC), content-engine (programmatic SEO i18n + JSON-LD), audit-cadence (17 audits automatizados), features-creativas (11 features SEO adicionales).

- [ ] [DATA-SEO] Keyword research v1 (DataForSEO + clusters semánticos) · owner: Data & SEO chat · status: blocked by DataForSEO signup · 2026-04-25
      Output: `05-Data/keyword-research.md` con tabla de KWs scoreadas + clusters por tool + watchlist. Metodología en `seo/keyword-framework.md`.

- [x] [DATA-SEO] Investigación profunda Eventbrite API · owner: Data & SEO chat · 2026-04-25
      Cerrado. Output: `05-Data/api-docs/eventbrite.md`. ⚠ Bombazo: API search global removida 2019. Tool #4 requiere arquitectura híbrida (DB orgs curados + Eventbrite por org_id + Setlist.fm + Bandsintown free + scraping IG VE). Subió scope.

- [x] [DATA-SEO] Decision doc: Spotify monthly-listeners workaround · owner: Data & SEO chat · 2026-04-25
      Cerrado. Output: `05-Data/seo/decisions/spotify-listeners-workaround.md`. Decisión: strategy (a) bandas default + (c) Soundcharts post-budget. (b) scraping ELIMINADO del set viable post-research (86M bans dic 2025, ToS enforcement activo).

- [ ] [DATA-SEO] Curación inicial DB orgs + venues latinos para Eventbrite ingestion · owner: Data & SEO chat · status: queued · 2026-04-25
      ~10-15h research manual. Output: tabla `events_orgs_seed` con organizer_ids + venue_ids de Miami latino, NYC, LA, Madrid, Barcelona, Bogotá. Bloqueante para tool SEO #4.

- [ ] [DATA-SEO] Keyword research v1 preliminar (sin DataForSEO) · owner: Data & SEO chat · status: in progress · 2026-04-25
      Versión preliminar usando Brave Search + Google Trends + SERP analysis manual. Identificar competencia + intent classification. Volúmenes refinados después con DataForSEO.

- [ ] [LUIS] Signup APIs SEO 🔴 URGENTE · 2026-04-25
      Instrucciones precisas en `05-Data/seo/stack.md` sección "APIs PENDIENTES". Free + 5 min cada uno: (1) Bing Webmaster Tools, (2) IndexNow (generar UUID), (3) Microsoft Clarity, (4) Cloudflare Web Analytics, (5) Ahrefs Free Webmaster Tools. Bloquea audit-cadence implementation.

- [ ] [LUIS] DataForSEO signup + $50-100 credits · 2026-04-25
      https://app.dataforseo.com/register. Bloquea KW research v1. Single payment, paga-por-uso después.

- [ ] [LUIS] Last.fm + Eventbrite + Setlist.fm API keys · 2026-04-25
      Free signups con instrucciones en `05-Data/seo/stack.md`. Bloquean tools SEO #4, #6, #7 y Stage 7a.

- [ ] [ENG] Setup `src/lib/seo/` infra · proposed by Data & SEO · 2026-04-25
      Spec en `05-Data/seo/stack.md` sección "Configuración del repo". Incluye: schema generators (JSON-LD por entity), sitemap dinámico, meta templates, OG image generator, IndexNow worker, Lighthouse CI gate, schema validator gate. **No bloquea Sprint 5 ejecución** — sprint paralelo cuando capacity.

- [ ] [ENG] Migración: tabla `seo_audit_runs` · proposed by Data & SEO · 2026-04-25
      Schema en `05-Data/seo/audit-cadence.md`. Necesaria antes de cualquier audit worker.

- [ ] [ENG] i18n architecture (next-intl) · proposed by Data & SEO · 2026-04-25
      Spec en `05-Data/seo/content-engine.md`. ES default + EN/PT activables. Path segments traducidos, slug canónico ES, hreflang automático, translation files en `src/messages/`. Crítico hacerlo ANTES de programmatic SEO masivo (refactor sería costoso post-launch).

- [ ] [ENG] Pipeline P9 — auto-traducción de bios · proposed by Data & SEO · 2026-04-25
      Spec en `05-Data/seo/content-engine.md` sección i18n. Claude Haiku + tabla `entity_translations` polimórfica + status workflow (`auto_translated` → admin review → `verified`). Cost ~$0.0005/traducción.

- [ ] [ENG] Productor Profile entity SEO · proposed by Data & SEO · 2026-04-25
      Feature creativa B en `05-Data/seo/features-creativas.md`. **P1 alongside tool #1** — misma data, sprint compartido. Route `/{locale}/productores/{slug}`.

- [ ] [PRODUCT] Validar features creativas top-priority · proposed by Data & SEO · 2026-04-25
      Mi propuesta para integrar al roadmap MVP: (B) Productor Profile P1, (E) Mejores canciones P1.5, (A) Press Kit auto P2 (gateway claim flow). Lista completa de 11 en `05-Data/seo/features-creativas.md`.

- [ ] [PRODUCT] Validar features con border "no editorial" · proposed by Data & SEO · 2026-04-25
      Features (I) Influencias musicales, (K) Decade in rap, (D) Cronología — auto-generan texto descriptivo via Claude desde data. ¿Pasan filtro "no editorial"? Solo data + storytelling neutral sourced. Detalle en features-creativas.md.

- [ ] [ENG] Worker para resolver `people.city_id` desde Wikipedia/MB/Genius · proposed by Data & SEO · 2026-04-25
      Bloqueante para tool SEO #7 (Artistas similares) y para futuras visualizaciones geo si KW research las reactiva.

- [ ] [ENG] Last.fm worker (similar artists + tags) · proposed by Data & SEO · 2026-04-25
      Bloqueante para tool SEO #7. Free tier 5 req/s. API key requerido (low effort signup).

- [x] [BIZ-LEGAL] Review scraping `open.spotify.com` · 2026-04-25 (descartado por research técnica)
      No requiere review legal — la decisión técnica ya descartó la opción tras descubrir 86M bans dic 2025 + ToS sept 2025 + enforcement activo. Detalle en `seo/decisions/spotify-listeners-workaround.md`.

- [ ] [BIZ-LEGAL] Nota informativa: enforcement Spotify 2025-2026 · proposed by Data & SEO · 2026-04-25
      Solo registro para futuro. NO scraping `open.spotify.com` directo bajo ningún caso. Soundcharts es la opción autorizada cuando presupuesto disponible.

- [ ] [LUIS] Soundcharts Starter signup ($10-50/mes) · status: WATCHLIST post-launch · 2026-04-25
      Upgrade path para calculadora de ingresos cuando founder apruebe budget. Reemplaza estrategia (a) bandas con monthly listeners reales autorizados. https://soundcharts.com/en/pricing

- [ ] [PRODUCT] Validar prioridad MVP de tools SEO #1, #2, #3 · proposed by Data & SEO · 2026-04-25
      Mi recomendación: P1 (launch). Decisión necesaria antes de comprometer scope MVP.

- [ ] [PRODUCT] Confirmar deprioritización de mapa/timeline como SEO tools · proposed by Data & SEO · 2026-04-25
      Founder los descartó como foco. ¿Reabrir si KW evidence aparece, o cierre definitivo?

- [ ] [PRODUCT] Decidir slug structure SEO tools · proposed by Data & SEO · 2026-04-25
      `/{tool-name}/{artist}` directo (mi voto, mejor SEO ES) vs `/herramientas/{tool}/{artist}`.
- [ ] [BIZ-LEGAL] Lista de legal research items · owner: Business & Legal chat · status: pending chat creation · 2026-04-25
      Output esperado: lista de cosas a investigar antes de cada feature público.
- [x] [COMMUNITY] Email outreach templates a artistas con perfil armado · owner: Community & Outreach · 2026-04-24
      Draft v1 en `06-Operations/artist-outreach.md` con 4 templates. Bloqueado activación hasta Sprint 5 + 7 + Biz-Legal review.

- [ ] [COMMUNITY] Plan de marketing macro + launch plan oct 2026 · owner: Community & Outreach · status: draft entregado · 2026-04-24
      Docs entregados en `07-Marketing-Growth/`: marketing-strategy-v1.md, launch-plan.md (rewrite v2), ai-marketing-stack.md, social-platform-playbook.md, email-marketing-strategy.md. Y `06-Operations/email-discovery-playbook.md`. Pendiente founder feedback para v2.

- [ ] [BIZ-LEGAL] Review completo del pipeline email outreach + discovery · owner: Business & Legal · status: pending · 2026-04-24
      Incluye: (a) CAN-SPAM + GDPR de los 4 templates de artist-outreach.md, (b) validación legal del email discovery pipeline (scraping TOS de IG/X/Bandcamp, bases legales de contacto, derecho al olvido), (c) decisión de dirección física para footer CAN-SPAM, (d) review de política de crisis comms.

- [ ] [ENG] Infra email outreach + discovery · owner: Engineering · status: pending · 2026-04-24
      Requiere: (a) tabla `artist_outreach_log` + `artist_contact_emails` + RLS, (b) endpoint `/unsubscribe/[token]` + logging, (c) Resend setup en `dauton.media` con SPF/DKIM/DMARC, (d) workers de email discovery (IG bio via Apify, X bio, Bandcamp, YouTube About, Wikidata SPARQL, MB URL-rels, Firecrawl website). Detalle en `06-Operations/email-discovery-playbook.md`.

- [ ] [ENG] OG images auto-generadas por entity · owner: Engineering · status: pending · 2026-04-24
      Endpoint `/api/og/[entity]/[slug]` usando Vercel Satori con DS. Requerido para marketing: cada post que linka a un entity tiene card consistente.

- [ ] [ENG+DATA-SEO] Schema.org MusicGroup + MusicAlbum + Person en pages · status: pending · 2026-04-24
      Crítico para SEO + Google Knowledge Panel pickup + rich snippets.

- [ ] [STRATEGY] Budget approval AI marketing stack · owner: Founder · status: pending · 2026-04-24
      Tier 1 (~$85/mes: Resend + Metricool + Plausible + Beehiiv free) desde mes 1 + Tier 2 (~$150/mes: Claude API + Flux + Runway + ElevenLabs + Apify) desde mes 3. Detalle en `07-Marketing-Growth/ai-marketing-stack.md`.

- [ ] [COMMUNITY] Reservar 7 handles sociales · owner: Luis (Founder) · status: pending · 2026-04-24
      `@dautonmedia` en IG, X, TikTok, YouTube, Threads, Bluesky; `Dauton Media` en Spotify. 15 min.

- [ ] [COMMUNITY] Draft `06-Operations/claim-flow.md` · owner: Community & Outreach · status: pending · 2026-04-24
      Complemento de artist-outreach: qué pasa desde que el artista clickea "reclamar" hasta badge verified. Coordinar UX con Product Architecture.

---

## Backlog — para revisar cuando haya capacidad

- [ ] [ENG] Sprint UI-fill: 5 rutas faltantes + 12 queries · ver `_Execution/design-vs-repo-audit.md`
- [ ] [ENG] Sprint 6 Continuación: Stage 4 Credits ejecución · post Stage 2
- [ ] [ENG] Sprint 8: Eventbrite ingestion · prioridad alta para diáspora
- [ ] [ENG] Sprint 9: YouTube transcripts (El Apartaco) · requiere decisión Anthropic API
- [ ] [STRATEGY] Reorganizar folders viejos (04-Editorial → re-purpose) · post-visión Product Architecture

---

## Cerradas recientes

- [x] [STRATEGY] Audit Design v3 vs repo · `_Execution/design-vs-repo-audit.md` · 2026-04-24
- [x] [STRATEGY] Audit de arquitectura de producto · `_Execution/product-architecture-audit.md` · 2026-04-24
- [x] [ENG] Sprint 6.5 Wikipedia + Genius + race fix · 2026-04-24
- [x] [ENG] Sprint 6 MusicBrainz scaffold · 2026-04-24
- [x] [ENG] Design Sync v3 — 12 componentes + 13 rutas · 2026-04-24

---

## Cómo trabajar este archivo

- Cualquier chat agrega tareas que afecten a otro área (ej. Engineering pide review de Legal).
- Una tarea solo se marca `[x]` cuando el outcome está commit en repo o documentado.
- Strategy/PM revisa diario y mueve cerradas a `MEMORY.md` cuando pasen 7 días.
- Si una tarea bloquea otra, marcar dependencia en notes.
