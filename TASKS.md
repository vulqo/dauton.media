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

- [ ] [MARKETING-GROWTH] Bloquear website launch hasta marketing system listo · owner: Marketing & Growth + Engineering + Founder · 2026-04-24
      Founder explícito: orden estricto = (1) Sprint 5+7 cerrados → (2) branding finalizado → (3) marketing system live (X automation + newsletter counter + WhatsApp Channel + Reddit) → (4) landing email capture activa todo el período → (5) WEBSITE LAUNCH. Detalle en `07-Marketing-Growth/launch-plan.md` rewrite v3.

- [ ] [MARKETING-GROWTH] Pre-launch foundation entregada · owner: Marketing & Growth · status: PAUSED por founder · 2026-04-24
      Docs nuevos en `07-Marketing-Growth/`: tools-and-apis.md (updated), credentials-vault.md, brand-visual-system.md, x-dynamic-content-plan.md, local-ai-decision.md, mention-monitoring-agent.md, podcast-leverage-plan.md, admin-panel-spec.md, whatsapp-channels-plan.md, reddit-strategy.md, newsletter-dynamic-content.md (expanded). API docs en `05-Data/api-docs/`: postiz.md, elevenlabs.md, canva.md, resend.md, beehiiv.md, ideogram.md, google-ai-studio-gemini.md. **PAUSE per founder 2026-04-24:** todo el marketing system salvo X automation MVP. Re-evaluate post-validation X.

- [ ] [MARKETING-GROWTH] X automation MVP — foco único · owner: Marketing & Growth + Engineering · status: in progress · 2026-04-24
      Spec en `07-Marketing-Growth/x-mvp-spec.md`. Hallazgo crítico: X eliminó free tier feb 2026 — Fase 0 = manual posting validate, Fase 1 = Buffer free, Fase 2 = paid API ($10-30/mes pay-per-use). Bloqueado por: schema additions + populate twitter_handles + Sprint 5 discografía.

- [ ] [ENG] Migración 0009 X automation MVP · owner: Engineering · status: pending · 2026-04-24
      Spec completo en `07-Marketing-Growth/x-mvp-spec.md`. Agregar a releases: `relevance_score`, `release_status`. Nueva tabla: `upcoming_releases`. Nueva tabla: `x_publication_queue`. RLS para ambas. Bulk populate `relevance_score` con heurística (pillars=10/8/6 según release_type, default=5).

- [ ] [ENG] Worker `populate-twitter-handles.ts` · owner: Engineering · status: pending · 2026-04-24
      Bloqueante MVP X (founder regla: no mention = no post). Pipeline: Wikidata SPARQL P2002 → MB URL relations social → Spotify bio scrape → Apify IG bio fallback. Target: ≥80% pillars con handle, ≥60% top relevance.

- [ ] [ENG] Worker `populate-birth-dates.ts` bulk · owner: Engineering · status: pending · 2026-04-24
      Extender MB worker existing + Wikidata fallback. Bulk para todos people sin birth_date. Necesario para trigger birthday.

- [ ] [ENG] Worker `detect-upcoming-releases.ts` · owner: Engineering · status: pending · 2026-04-24
      Daily cron Spotify API → query albums per artist tracked, filter `release_date > today` → insert en `upcoming_releases`. Trigger 5 founder priority.

- [ ] [ENG] Pipeline `src/lib/content/x-automation/` · owner: Engineering · status: pending · 2026-04-24
      Full code TS, sin n8n. 5 triggers (release_anniversary, birthday, death_anniversary, new_release, upcoming_release_*). GitHub Actions cron diario 06:00 ART. Output a `x_publication_queue` con `status=pending_review` para review manual Fase 0. Email a Luis con queue del día via Resend.

- [ ] [LUIS] Decisiones X MVP · owner: Founder · 2026-04-24
      (1) Aceptar manual posting Fase 0 vs paid API directo desde día 1 ($10-30/mes pay-per-use). (2) Trigger death anniversary: estricto "no mention = no post" o exception si cuenta deceased no existe. (3) Threshold para Fase 2 paid (mi propuesta: 500 followers + 1K avg impressions sostenido 4 semanas). (4) Pre-save detection: solo Spotify API o también monitoreamos artist tweets.

- [ ] [LUIS] Cuenta X `@dautonmedia` setup · owner: Founder · 2026-04-24
      Reservar handle. Verificar perfil (bio + foto + cover). Bio sugerida: "Archivo del rap hispanohablante. Foco: Venezuela + diáspora." Sin link al website hasta que esté habilitado.

- [ ] [ENG] Deploy Postiz self-hosted en Railway + DB Postgres dedicada · owner: Engineering · 2026-04-24
      Spec completo en `05-Data/api-docs/postiz.md`. Confirmed seguro tras research multi-source. Subdominio `postiz.dauton.media`. DB en Supabase Postgres dedicado (separado del DB principal). Conectar las cuentas sociales (X, IG, TikTok, YT, Threads, Bluesky) post-deploy.

- [ ] [LUIS] Reservar handles redes sociales · owner: Founder · 2026-04-24
      `@dautonmedia` en X, IG, TikTok, YT, Threads, Bluesky + WhatsApp Channel "Dauton Media · Archivo" + cuenta Spotify "Dauton Media". 30 min. Multi-cuenta (test accounts) deferred a etapa 2.

- [ ] [LUIS] Setup Google Workspace dauton.media + emails dedicados por plataforma · owner: Founder · 2026-04-24
      $7/user/mes. Aliases: `admin@`, `social-ig@`, `social-tk@`, `social-x@`, `social-yt@`, `newsletter@`, `monitoring@`, `archive@`, `hola@`. Detalle `credentials-vault.md`.

- [ ] [LUIS] Cuentas a configurar inmediato · owner: Founder · 2026-04-24
      (1) Postiz self-hosted via Engineering → admin login. (2) Canva free + Brand Kit cargado (manual). (3) ElevenLabs free tier + decisión voice "house" (clonar Luis vs voice library). (4) Ideogram free tier. (5) Resend free tier + verify dominio dauton.media. (6) Google AI Studio + obtener key Gemini.

- [ ] [LUIS] Decisión voice "house" ElevenLabs · owner: Founder · 2026-04-24
      Opción A clonar voz Luis (1-3 min audio clean en cuarto silencioso) vs Opción B voice library standard. Affecta tone consistency cross-content. Doc en `05-Data/api-docs/elevenlabs.md`.

- [ ] [DESIGN] Brand Kit v1 (colors + fonts + logos + 5 master references AI) · owner: Design · 2026-04-24
      Spec en `07-Marketing-Growth/brand-visual-system.md`. Crítico antes de generation masiva — sin esto el contenido sale inconsistente. Master references van a Midjourney `--sref` cuando upgradeemos. Mientras Flux Schnell + Ideogram + Canva templates.

- [ ] [DESIGN] 7 templates Canva iniciales · owner: Design + Community · 2026-04-24
      `dauton_carousel_artist_5slides`, `dauton_carousel_listicle_10slides`, `dauton_story_data_card`, `dauton_story_poll_template`, `dauton_newsletter_cover`, `dauton_yt_thumbnail`, `dauton_og_image_template`. Detalle `05-Data/api-docs/canva.md`.

- [ ] [ENG] Schema additions marketing automation · owner: Engineering · 2026-04-24
      Tablas a agregar (ver docs respectivos): `x_publication_queue`, `curated_facts`, `social_posts_log`, `mentions_log`, `mentions_proposed_actions`, `media_creators_directory`, `podcast_episodes`, `podcast_entity_mentions`, `podcast_clips`, `newsletter_subscribers`, `newsletter_user_followed_artists`, `user_alert_subscriptions`, `email_send_log`, `reddit_post_queue`. RLS roles: admin/editor/moderator/subscriber.

- [ ] [ENG] Counter "1/1000 subs" widget en landing pre-launch · owner: Engineering · 2026-04-24
      Widget dinámico con Supabase Realtime. Display sub count + percentage + barra. Auto-trigger primer envío masivo cuando hit 1K. Spec en `07-Marketing-Growth/newsletter-dynamic-content.md`.

- [ ] [ENG] Admin panel `dauton.media/admin` · owner: Engineering · status: spec ready · 2026-04-24
      Spec completo en `07-Marketing-Growth/admin-panel-spec.md`. Phase 0 (week 1-3 implementación): auth + dashboard overview + X queue approval + newsletter draft preview + manual job trigger.

- [ ] [ENG] X dynamic content pipeline (`src/lib/content/x-pipeline.ts`) · owner: Engineering · 2026-04-24
      Full code TypeScript. Sin n8n. GitHub Actions cron diario consume events de DB → generate tweets via Gemini → schedule en Postiz → log + scrape metrics 48h después. Detalle `07-Marketing-Growth/x-dynamic-content-plan.md`.

- [ ] [ENG] Mention monitoring agent (`src/lib/automation/mention-monitor/`) · owner: Engineering · 2026-04-24
      Spec en `07-Marketing-Growth/mention-monitoring-agent.md`. Cron 30min · X + Bluesky + Reddit search → classify + propose action via Gemini → admin panel review queue.

- [ ] [ENG] Podcast leverage pipeline (`src/lib/content/podcast/`) · owner: Engineering · 2026-04-24
      Spec en `07-Marketing-Growth/podcast-leverage-plan.md`. Discovery via Listen Notes free → ingestion RSS → Whisper local transcription → entity detection → fact extraction → review queue.

- [ ] [BIZ-LEGAL] Review marketing system pre-launch · owner: Business & Legal · 2026-04-24
      Items: (1) ElevenLabs free tier commercial use review. (2) WhatsApp Channels TOS LATAM. (3) Reddit cuenta brand transparency. (4) Apify scraping bios IG/TikTok. (5) Podcast clipping fair use. (6) Mention monitoring scrape policy.

- [ ] [LUIS + BIZ-LEGAL] TikTok jurisdicción cuenta · owner: Founder + Biz-Legal · 2026-04-24
      Para Creator Rewards Program 2026 elegibilidad: cuenta debe estar registrada en USA / UK / DE / JP / KR / FR / MX / BR. Decisión bloquea long-term TikTok strategy. Venezuela y España no elegibles.

- [ ] [LUIS] Bitwarden / 1Password setup para vault Dauton · owner: Founder · 2026-04-24
      Estructura propuesta en `credentials-vault.md`. 2FA obligatorio en cada cuenta crítica.

- [ ] [BIZ-LEGAL] WhatsApp Channels formal review · owner: Business & Legal · 2026-04-24
      LGPD (Brasil), LFPDPPP (México), GDPR (España). Channels son broadcast — opt-in user-driven. Aún así formalizar política antes de scale.

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

- [x] [DATA-SEO] Curación inicial DB orgs + venues latinos · 2026-04-25 (reasignado)
      Founder confirmó que el scraping de organizations + venues lo hacen externamente con tool propia. Data & SEO solo define qué consumir. Cerrado de mi side.

- [ ] [DATA-SEO] Apify integration spec + Stage 8 multi-platform expansion · owner: Data & SEO · status: queued · 2026-04-25
      Output: spec de actors a usar (Spotify monthly listeners, IG profiles, Eventbrite discovery, TikTok trends, SoundCloud, Audiomack, Bandcamp). Doc en `api-docs/apify.md` ya tiene mapping. Falta scope específico por sprint.

- [x] [DATA-SEO ↔ MARKETING-GROWTH] Alinear ownership SEM · 2026-04-25 (deferred con SEM)
      SEM deferred por founder. Conversación se reabre cuando SEM se active.

- [ ] [ENG] Lookup video oficial YouTube por track (Stage 2.5) · proposed by Data & SEO · 2026-04-25
      Después de Spotify track ingestion, query YouTube `q="{stage_name} {track_title} official"` → top result si match. Persistir `tracks.youtube_video_id` + `youtube_video_match_confidence`. Crítico para embed iframes en pages de tracks. Detalle en `api-docs/youtube.md` sección "Embeds + iframes".

- [ ] [ENG] Embed iframes YouTube + privacy-enhanced + lazy + JSON-LD VideoObject · proposed by Data & SEO · 2026-04-25
      En `/canciones/{slug}` y `/discos/{slug}`. Usar `youtube-nocookie.com` + `loading="lazy"` + facade pattern para LCP-critical. Schema VideoObject obligatorio. Spec en `api-docs/youtube.md` sección "Embeds + iframes para SEO".

- [ ] [DATA-SEO] Keyword research v1 preliminar (sin DataForSEO) · owner: Data & SEO chat · status: in progress · 2026-04-25
      Versión preliminar usando Brave Search + Google Trends + SERP analysis manual. Identificar competencia + intent classification. Volúmenes refinados después con DataForSEO.

- [ ] [LUIS] Signup APIs SEO 🔴 URGENTE · 2026-04-25
      Instrucciones precisas en `05-Data/seo/stack.md` sección "APIs PENDIENTES". Free + 5 min cada uno: (1) Bing Webmaster Tools, (2) IndexNow (generar UUID), (3) Microsoft Clarity, (4) Cloudflare Web Analytics, (5) Ahrefs Free Webmaster Tools. Bloquea audit-cadence implementation.

- [x] [LUIS] APIFY_TOKEN provisto · 2026-04-25
      Token guardado en `.env.local` (gitignored). Pendiente: ticket [ENG] sync a Vercel envvars production.

- [ ] [ENG] Sync APIFY_TOKEN a Vercel envvars production + preview · proposed by Data & SEO · 2026-04-25
      Token vive en `02-Engineering/website/.env.local`. Replicar en Vercel project settings → Environment Variables. NO commitear el token al repo.

- [ ] [ENG] Audit + ampliar social handles en `people` table · proposed by Data & SEO · 2026-04-25
      Founder pidió que tengamos TODOS los social handles + relaciones sociales enlazadas. Schema actual ya tiene: `instagram_handle, twitter_handle, tiktok_handle, youtube_channel_id, website_url`. Agregar si falta: `threads_handle, bluesky_handle, twitch_handle, telegram_channel, whatsapp_business`. Para "relaciones sociales" usar tabla `relationships` ya existente con tipos: `collaborator, mentor, signed_to, friend_of, beefed_with, label_mate`. Validar cobertura schema vs lista. Engineering lo decide.

- [x] [LUIS] SEM accounts signup · 2026-04-25 (deferred)
      Founder confirmó SEM = estrategia comercial, no prioridad MVP. Doc `seo/sem-strategy.md` queda archivado como referencia futura. Reactivar cuando founder dé greenlight.

- [ ] [LUIS] DataForSEO signup + $50-100 credits · 2026-04-25
      https://app.dataforseo.com/register. Bloquea KW research v1. Single payment, paga-por-uso después.

- [ ] [LUIS] Last.fm + Eventbrite + Setlist.fm API keys · 2026-04-25
      Free signups con instrucciones en `05-Data/seo/stack.md`. Bloquean tools SEO #4, #6, #7 y Stage 7a.

- [ ] [ENG] Setup `src/lib/seo/` infra · proposed by Data & SEO · 2026-04-25
      Spec en `05-Data/seo/stack.md` sección "Configuración del repo". Incluye: schema generators (JSON-LD por entity), sitemap dinámico, meta templates, OG image generator, IndexNow worker, Lighthouse CI gate, schema validator gate. **No bloquea Sprint 5 ejecución** — sprint paralelo cuando capacity.

- [ ] [ENG] Worker Apify wrapper · proposed by Data & SEO · 2026-04-25
      `src/lib/ingest/workers/apify.ts` — wrapper genérico para correr actors + poll status + consume datasets. Webhook handler. Cost monitoring en tabla `apify_runs`. Detalle en `api-docs/apify.md`.

- [ ] [ENG] `/llms.txt` + `/llms-full.txt` + `/api/llm-context/[entity]/[slug]` · proposed by Data & SEO · 2026-04-25
      GEO/AEO infrastructure. LLMs (ChatGPT/Perplexity/Claude/Bing Copilot) usan estos endpoints/files para citation. Spec en `seo/geo-aeo-strategy.md`.

- [ ] [ENG] Verificar NO existe scraper IG en repo (Biz-Legal P0.2) · proposed by Data & SEO · 2026-04-25
      Business & Legal flagged urgent. Yo confirmo: Data & SEO no tiene workers de IG scraping en repo. Si Engineering tiene algo legacy, eliminar. Vía permitida es Apify.

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
- [x] [BIZ-LEGAL] Lista de legal research items · owner: Business & Legal · 2026-04-25
      Cerrado. Output: `08-Legal-Compliance/legal-research-list.md` v2 — 8 items P0 (pre-launch), 9 items P1 (pre-Fase 4), 6 items P2 (trigger-based), 6 items P3 (low priority). 8 items resueltos archivados.

- [x] [BIZ-LEGAL] Auditoría legal completa de features MVP + post-MVP · owner: Business & Legal · 2026-04-25
      Cerrado. Output: `08-Legal-Compliance/legal-audit-master.md` — 30+ features con ✓/⚠/✗ + mitigaciones + precedentes industria. Workflow async no-bloqueante en `feature-review-workflow.md`. Coordinación con Engineering: cada feature ⚠ tiene mitigaciones claras, no bloquea.

- [x] [BIZ-LEGAL] Auditoría comercial completa de monetización · owner: Business & Legal · 2026-04-25
      Cerrado. Outputs: `09-Business/monetization-audit.md` (20 vías scoring A/B/C), `new-opportunities.md` (5 nuevas high prio), `pricing-strategy.md` (tiers detallados con benchmarks), `revenue-streams-requirements.md` (plataforma/marketing/costos por vía), `go-to-market-playbook.md`, `stakeholder-list.md`.

- [x] [BIZ-LEGAL] ToS analysis por fuente externa · owner: Business & Legal · 2026-04-25
      Cerrado. Output: `08-Legal-Compliance/tos-compliance.md` — Spotify, MusicBrainz, Wikipedia/Wikidata, Genius, YouTube, Instagram, Eventbrite, Ticketmaster, Bandsintown, Firecrawl. Mandates derivados a Engineering.

- [x] [BIZ-LEGAL] Privacy + DMCA + takedown framework completo · owner: Business & Legal · 2026-04-25
      Cerrado. Outputs: `privacy-framework.md` (GDPR + CCPA + LatAm), `takedown-disputes.md` (7 templates por categoría), `compliance-calendar.md` (pre-launch + recurrente + trigger-based). Drafts privacy-policy + terms reescritos v2 (eran "Culture Wiki").

- [ ] [ENG] 🔴 URGENTE — Auditar si existe IG scraper en repo · proposed by Business & Legal · 2026-04-25
      Research item P0.2. Plan-maestro Fase 1 mencionaba "Instagram (públicas) → normalización" — si implementado, viola Meta ToS. Engineering busca en `02-Engineering/website/src/lib/ingest/workers/`. Si existe, pausar + decisión: remover o cambiar a IG vía claim flow + token (legítimo).

- [ ] [ENG] YouTube metadata TTL ≤ 30d · proposed by Business & Legal · 2026-04-25
      YouTube Developer Policy obliga refresh o delete cada 30d. Engineering implementa cron job en tabla `videos`. Detalle en `08-Legal-Compliance/tos-compliance.md` §5.

- [ ] [ENG] Photo audit log columns · proposed by Business & Legal · 2026-04-25
      Agregar a `people` columns: `photo_source`, `photo_license`, `photo_attribution`. Cover art size cap 800×800 max. Detalle en `legal-audit-master.md` #3.

- [ ] [ENG] Bio AI source_id grounding · proposed by Business & Legal · 2026-04-25
      Verificar que skill `bio-drafter` SOLO usa afirmaciones con `source_id` trazable + sensitive categories blacklist (religión, salud, sexualidad, política). Item P0.8.

- [ ] [ENG] DMCA + takedown endpoints + email aliases · proposed by Business & Legal · 2026-04-25
      Pre-launch obligatorio: DMCA agent registered + page `/legal/dmca` + page `/legal/takedown` + email aliases (privacy@, legal@, dmca@, corrections@, security@). User data export + delete endpoints. Detalle en `compliance-calendar.md` §1.

- [ ] [ENG] Attribution fuentes en footer · proposed by Business & Legal · 2026-04-25
      Logos + attribution visible para Spotify, MusicBrainz, Wikipedia, Genius, YouTube en footer del site. ToS requirement.

- [ ] [LUIS] DMCA agent register US Copyright Office ($6) · 2026-04-25
      Pre-launch obligatorio. Item P0.7. Filing: copyright.gov/dmca-directory. Required para safe harbor 17 USC §512.

- [ ] [LUIS] Confirmar state Vulqo LLC (NJ vs DE) · 2026-04-25
      Item P0.1. Afecta governing law clause en Terms + cap table futuro. Lookup en records Vulqo LLC.

- [ ] [LUIS] Confirmar Supabase region + activar DPAs · 2026-04-25
      Items P0.3 + P0.4. Activar DPAs con Supabase, Vercel, Stripe, Resend, Cloudflare, Plausible.

- [ ] [LUIS] Trademark search "Dauton Media" en TESS USPTO · 2026-04-25
      Item P0.5. Search preliminar gratuita en tmsearch.uspto.gov. Decisión filing post-search ($350 DIY o $500-1500 con lawyer-assisted).

- [ ] [LUIS] Ko-fi account compatibility check · 2026-04-25
      Item P0.6. Verificar Ko-fi acepta Vulqo LLC + payouts US + donors LatAm/UE sin fricción. Pre-launch obligatorio.

- [x] [BIZ-LEGAL] Review pipeline email outreach + discovery · 2026-04-25
      Cerrado parcialmente. CAN-SPAM + GDPR template documentado en `legal-audit-master.md` #18 + research item P1.4. Pendiente: review específica de los 4 templates concretos en `06-Operations/artist-outreach.md` cuando Community & Outreach lo passe a review.

- [x] [BIZ-LEGAL] Review scraping `open.spotify.com` · 2026-04-25
      Ya cerrado (línea 87). Refleja también en `tos-compliance.md` §1: scraping Spotify UI prohibido por ToS. Solo API oficial con Client Credentials + circuit breaker. Decisión técnica + legal alineadas.

- [x] [BIZ-LEGAL] Cross-area audit completo · owner: Business & Legal · 2026-04-25
      Cerrado. Output: `08-Legal-Compliance/cross-area-audit.md` + updates a 7 docs (tos-compliance, legal-audit-master, legal-research-list, compliance-calendar, monetization-audit, pricing-strategy, stakeholder-list). 6 P0 + 8 P1 + 4 P2 nuevos research items + 9 vías monetización nuevas detectadas + 8 decisiones founder pendientes.

- [ ] [BIZ-LEGAL → FOUNDER] 8 decisiones founder pendientes post cross-area audit · 2026-04-25
      Detalle en `08-Legal-Compliance/cross-area-audit.md` §4. Lista corta:
      (1) Apify policy (recomiendo Opción C híbrida).
      (2) Voice + AI image policy (recomiendo zero artistas reales).
      (3) TikTok account jurisdiction (recomiendo US o MX).
      (4) Multi-cuenta IG/TikTok (recomiendo 1+1 max vs 3-5 propuesto).
      (5) Bot disclosure Bluesky (recomiendo activar con disclosure obligatoria).
      (6) X API tier $200/mes (recomiendo defer hasta volumen).
      (7) Newsletter premium pricing (reconciliado a $5/mes).
      (8) Brand collabs IG/TikTok (¿cuenta Dauton OK o NO también?).

- [ ] [ENG] 🔴 URGENTE — Verificar `.gitignore` cubre `credentials-vault.md` · proposed by Business & Legal · 2026-04-25
      Item P0.9. Antes de populate keys reales en el doc. Si ya commiteado con keys: rotar TODAS + scrub git history. También verificar que `.env.local` está gitignored.

- [ ] [ENG] Migrar GitHub PAT embebido en remote URL · proposed by Business & Legal · 2026-04-25
      Deuda conocida (`MEMORY.md` 2026-04-24). Migrar a Keychain credential helper (`git config --global credential.helper osxkeychain`) y re-set origin sin token.

- [ ] [COMMUNITY] Replanteo `06-Operations/email-discovery-playbook.md` v2 · proposed by Business & Legal · 2026-04-25
      Item P1.16. Eliminar Apify IG/Twitter scraping del Tier 1. Pipeline aprobado en `cross-area-audit.md` §1.1: Wikidata + MusicBrainz + website propio + Meta Graph API post-claim + manual.

- [ ] [COMMUNITY+ENG] Replanteo `07-Marketing-Growth/mention-monitoring-agent.md` v2 · proposed by Business & Legal · 2026-04-25
      Item P1.17. Eliminar IG/TikTok scraping. Sources aprobadas: X read API + Bluesky AT Protocol + Reddit API + YouTube Data API comments + Brave + Google Alerts.

- [ ] [COMMUNITY+ENG] Replanteo claim-flow social bio code verification · proposed by Business & Legal · 2026-04-25
      Item derivado P0.10. Plan B: oEmbed oficial IG/X/YouTube + screenshot manual + post-claim Meta Graph token.

- [ ] [LUIS] DPAs activar con sub-processors · proposed by Business & Legal · 2026-04-25
      Items P0.4 + P1.11-15. Beehiiv, Apify, DocuSign, Postiz (self-hosted = N/A pero docs review), ElevenLabs. La mayoría auto-activable en dashboard del provider.
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

- [x] [COMMUNITY] Draft `06-Operations/claim-flow.md` v1 · owner: Community & Outreach · 2026-04-25
      Cerrado. Output: `06-Operations/claim-flow.md` v1 — principios + 6 estados de `claim_status` + 4 trigger points + flow paso a paso + 5 métodos de verificación (Spotify URL match, social bio code, email match silencioso, manual, estate) + edit permissions matrix + 10 edge cases + endpoint surface + interacción con moderation. Endpoints proposal pendiente validación Engineering. Deriva 7 tickets cross-area (abajo).

- [ ] [ENG] Validar endpoint surface + tablas claim flow · proposed by Community & Outreach · 2026-04-25
      Spec en `06-Operations/claim-flow.md` sección "Endpoints requeridos". 11 endpoints + columnas nuevas en `people` (claim_status enum, direct_customer, claimed_by_user_id, claimed_at, verification_method) + tabla `claim_verification_attempts` + flag `submitted_by_verified_artist` en `corrections_queue`. Confirmar feasibility antes de cerrar claim-flow v2.

- [ ] [PRODUCT] UX final del claim flow paso 0-2 · proposed by Community & Outreach · 2026-04-25
      Mockups en DS para landing `/claim/[handle]`, picker de método de verificación (Spotify URL / social bio code / manual / estate), form de paso 2 (bio + foto + links + merch + eventos), pantalla de confirmación. Spec funcional en `06-Operations/claim-flow.md`.

- [ ] [BIZ-LEGAL] Política menores de edad para claim · proposed by Community & Outreach · 2026-04-25
      EC-3 en claim-flow.md. Q0 legal — `birth_date < 18` bloquea claim self-service; falta política formal de consentimiento de tutor/management + criterio de prueba aceptable. Sin esto, claims de menores se aceptan solo manual con escalation a Luis.

- [ ] [BIZ-LEGAL] Política estate / deceased claims · proposed by Community & Outreach · 2026-04-25
      EC-2 en claim-flow.md. Reclamación legítima de perfil de artista fallecido vía estate / family / manager. Falta criterio formal de prueba (will, power of attorney, label/management contract) + qué fuente cross-check requerimos + SLA específico.

- [ ] [DATA-SEO + ENG] Worker Apify para social bio code scrape · proposed by Community & Outreach · 2026-04-25
      Verificación 1.2 en claim-flow.md depende de un worker que scrappea bio de IG/X/YouTube buscando código `DAUTON-XXXXXX`. Operación dueña Data & SEO (consistente con email discovery), implementación Engineering. Fall-through a manual review si 3 intentos fallan.

- [ ] [COMMUNITY] `moderation-workflow.md` v2 — integrar reglas de claim · owner: Community & Outreach · 2026-04-25
      Update post-claim-flow v1: agregar sección "Interacción con claim flow" cubriendo (a) verified artist self-edits skip queue, (b) verified artist sugiere cambio estructural → SLA 48h con flag, (c) other-user correction sobre verified → notify artist + 7d window, (d) right-to-be-forgotten escalation a Biz-Legal, (e) dispute resolution. Pasar de draft a live.

- [ ] [COMMUNITY] Templates email faltantes en `artist-outreach.md` v2 · owner: Community & Outreach · 2026-04-25
      Templates a agregar: `email_claim_pending_review` (ack 24-48h post manual review submit), `email_claim_abandoned_reminder` (T+10d desde `claim_in_progress` sin avance, antes del revert T+14d), "tu perfil está siendo visto" (engagement loop futuro), crisis comms (data leak, takedown — coordinar con Biz-Legal antes de redactar).

---

## Backlog — para revisar cuando haya capacidad

- [ ] [ENG] Sprint UI-fill: 5 rutas faltantes + 12 queries · ver `_Execution/design-vs-repo-audit.md`
- [ ] [ENG] Sprint 6 Continuación: Stage 4 Credits ejecución · post Stage 2
- [ ] [ENG] Sprint 8: Eventbrite ingestion · prioridad alta para diáspora
- [ ] [ENG] Sprint 9: YouTube transcripts (El Apartaco) · requiere decisión Anthropic API
- [ ] [STRATEGY] Reorganizar folders viejos (04-Editorial → re-purpose) · post-visión Product Architecture

### ENG-PROPOSED (Sprint 7 mega-sprint follow-ups)

- [ ] [ENG-PROPOSED] **Stage 4 Credits sequencing**: requires Stage 2 (Spotify discography) to populate `releases` + `tracks` first. `src/lib/ingest/pipelines/stage-2-catalog.ts` currently throws (`Sprint 4 not implemented`). Sequence to unblock: (1) drain Spotify queue for `resolve_artist` + `fetch_artist_details`, (2) implement `runStage2Catalog`, (3) only then run Stage 4 (MB credits + Genius gap-fill). Do not attempt Stage 4 with 0 releases.
- [ ] [ENG-PROPOSED] **Resolve last 3 unresolved pillars**: Gabylonia, Lil Goofy, Nerza still have `spotify_id IS NULL` after Sprint 7 drain. The names are common/ambiguous on Spotify search; needs manual `slug→spotify_id` mapping or a higher-priority queue item with an explicit search query that disambiguates (e.g. "Gabylonia rap venezolano").
- [ ] [ENG-PROPOSED] **Spotify rate-limit hit during Sprint 7 detect-upcoming run**: 23.9h ban opened at 2026-04-25 14:16 ART (Retry-After: 86073 s). Root cause: `getArtistAlbums` in `src/lib/ingest/clients/spotify.ts` did not enforce 300 ms spacing on the Client-Credentials path; 5 paginated calls × 3 artists in <3 s tripped Spotify's abuse heuristic. **Fix landed in Sprint 7**: `respectSpacing()` is now called at the top of `spotifyFetch`. Detect-upcoming should be safe to re-run after the ban lifts (~2026-04-26 14:16 ART), but operators must verify circuit_state is `closed` before any Spotify call.
- [ ] [ENG-PROPOSED] **Spotify limit cap dropped to 10**: Spotify's `/artists/{id}/albums` now returns 400 "Invalid limit" for `limit > 10` on Client-Credentials tokens (April 2026 tightening). Already patched in `getArtistAlbums` (clamp via `ARTIST_ALBUMS_MAX_LIMIT`). Audit other client methods (`getAlbumTracks`, `getPlaylistTracks`) for similar caps.
- [ ] [ENG-PROPOSED] **Wikidata QID coverage gap**: only 1/81 people has `wikidata_id`, blocking Tier 1/2 fallbacks for both `populate-twitter-handles` and `populate-birth-dates`. A Sprint 8 worker should bulk-resolve QIDs for the 80 remaining (use `wikiSparql` with `wdt:P1902 ?spotify` reverse lookup against existing `spotify_id`s).
- [ ] [ENG-PROPOSED] **MusicBrainz ID coverage gap**: only 2/81 have `musicbrainz_id`. Tier 2 of `populate-twitter-handles` needs MB IDs to be useful; a Sprint 8 backfill via `mbResolveArtistByUrl` against Spotify URLs would unlock dozens more handles.

---

## Cerradas recientes

- [x] [ENG] Sprint 7 Mega — X automation schema, twitter/birth/upcoming workers, Spotify spacing fix · 2026-04-25
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
