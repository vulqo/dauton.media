# AI Marketing Stack — Herramientas, APIs, Costos

**Department:** Marketing & Growth
**Owner:** Community & Outreach
**Last updated:** 2026-04-24
**Status:** draft v1 — recomendación pendiente budget approval.

---

## Filosofía del stack

Luis es orquestador, no ejecutor. Cada herramienta del stack debe cumplir una de dos funciones:
1. **Generar contenido** desde data de Supabase sin intervención humana.
2. **Programar + distribuir + medir** ese contenido sin que Luis abra la app.

Si una herramienta requiere > 30 min/semana de Luis para operar, no entra al stack. Preferimos APIs y workflows code-first (`n8n` o TypeScript directo) antes que dashboards.

---

## Tier 1 — Stack mínimo viable (launch octubre 2026)

Estos son los imprescindibles. Costo total estimado: **$85-120/mes**.

### Email sender — **Resend**
- **Costo:** $20/mes plan Pro (50K emails, 3 dominios, 99.99% uptime).
- **Por qué:** API-first, React Email components, DKIM/SPF/DMARC automáticos, buena reputación de IP, logging rico.
- **Alternativa considerada:** Loops ($49/mes más UI-friendly) — descartado porque Luis no toca el UI, orquesta con código.
- **Uso:** artist outreach (artist-outreach.md), newsletter a fans, transaccionales (claim approved, etc.).
- **Setup crítico:** dominio `dauton.media` con SPF + DKIM + DMARC validados antes del primer envío.

### Social scheduler — **Metricool**
- **Costo:** $22/mes Advanced plan (IG, X, TikTok, YouTube, Threads, Bluesky, LinkedIn).
- **Por qué:** soporta las 7 plataformas que queremos, tiene API decente, analytics unificados, calendar view.
- **Alternativa:** Publer ($12/mes básico). Más barato pero analytics más limitados. Backup si cashflow aprieta.
- **Uso:** schedule los posts auto-generados desde Supabase events. Adaptation por plataforma.

### Newsletter hosting — **Beehiiv** (free tier hasta 2.5K subs)
- **Costo:** $0 hasta 2.5K subscribers, luego $39-99/mes.
- **Por qué:** editor moderno, segmentation decente, referral tools nativas, ad network monetization futuro (el día que tengamos tracción).
- **Alternativa:** Resend React Email + Supabase table propia ($0, pero más trabajo).
- **Uso:** "Archivo Abierto" — newsletter bi-weekly con digest de adiciones al archivo.

### Analytics — **Plausible** + **PostHog**
- **Costo:** Plausible $9/mes + PostHog free tier.
- **Por qué:** Plausible = privacy-first web analytics (no cookie banner). PostHog = product analytics (funnels, recordings, feature flags) free hasta 1M events/mes.
- **Uso:** Plausible para marketing attribution. PostHog para producto interno.

### CRM ligero — **Notion database + propia tabla Supabase**
- **Costo:** $0 (Luis ya tiene Notion).
- **Por qué:** CRM dedicado (Attio $29/mes) es overkill hasta tener > 100 contacts activos. Notion DB para artists outreach tracking + press contacts + partnership leads.
- **Upgrade path:** Attio cuando lleguemos a > 300 contactos o el equipo crezca.

### Link-in-bio — **bio propia en `dauton.media/linktree`** (custom)
- **Costo:** $0 (parte del site).
- **Por qué:** Linktree / Beacons imponen branding. Hacemos propia con mismo DS + tracking integrado.

---

## Tier 2 — AI content generation (mes 2+)

Costo total estimado cuando activo: **$60-150/mes variable según uso**.

### Text generation — **Claude API (Anthropic)**
- **Costo:** pay-per-token. Estimado $30-80/mes según volumen.
- **Modelo primario:** Claude Sonnet 4.6 (balance costo/calidad). Opus 4.6 solo para tareas críticas (crisis comms, editorial denso).
- **Uso:**
  - Generación de captions desde event data (`social-post-generator` skill).
  - Drafting de newsletter a partir de week digest.
  - Personalización de email outreach (`{{stage_name}}` en el copy + matiz por ciudad).
  - Reconciliación de credits cross-source (Stage 4 ingestion).
- **Alternativa MVP:** Claude Max manual workflow (ya definido en MEMORY) para no pagar API hasta v1+. Skills generan `.input.json`, Luis ejecuta batch desde Claude Code, `consume-skill-outputs.ts` reanuda el queue.
- **Decisión recomendada:** arrancar con Claude Max manual hasta tener 10+ posts/semana. Swap a API cuando el manual duela.

### Image generation — **Flux 1.1 Pro via Replicate** o **Ideogram 2.0**
- **Costo:** Flux ~$0.04/imagen. Ideogram $8-20/mes tier.
- **Por qué dos:**
  - **Flux:** mejor para imágenes conceptuales, moods, backgrounds. Fotorealistic + estilizado.
  - **Ideogram:** mejor para imágenes con **texto legible** (Midjourney es terrible con texto). Crítico para cards con data.
- **Uso:**
  - OG images por entity (auto-generado por Next.js con Satori + Vercel OG, no requiere AI).
  - Carousels de IG con data: "3 tracks para empezar con [Artist]" — 10 slides generados.
  - Covers para newsletter y tool launches.
- **Alternativa económica:** Flux Schnell gratis open-source via Replicate en ciertos tiers.

### Video generation — **Runway Gen-3 Alpha** o **Veo 3** (cuando disponible)
- **Costo:** Runway $15-35/mes según plan. Veo 3 via Google AI Studio pricing TBD.
- **Uso:** mini-docs de 30-90 segundos sobre artistas. "Una Venezuela que rapeaba" tipo piezas.
- **Alternativa MVP:** **Remotion** (React-based video gen) self-hosted. $0 compute si local. Menos espectacular pero más controlable.
- **Decisión recomendada:** Remotion para contenido regular (template-based shorts). Runway/Veo para launches y piezas especiales.

### Video editing AI — **Opus Clip** o **Vizard**
- **Costo:** Opus Clip $19-79/mes. Vizard $19-49/mes.
- **Uso:** tomar un long-form (ej. livestream de Dauton Day 6h) y extraer 20-40 shorts automáticamente. Subtitling + reframing + viral scoring.
- **Decisión recomendada:** evaluar con free tier de ambos en julio 2026. Escoger 1.

### Voz — **ElevenLabs**
- **Costo:** $22/mes Creator tier (100K caracteres/mes, voice cloning básico).
- **Uso:**
  - Narración de mini-docs.
  - Podcast automation Fase 3.
  - TTS de data milestones ("Hoy hace 14 años salió Apocalipsis...") para reels con voiceover.
- **Voice cloning:** una voz "house" de Dauton (grabada por Luis o actor de voz por $100-200 one-time).

### Transcription — **Deepgram Nova-3** o **Whisper local**
- **Costo:** Deepgram $0.0043/min ≈ $5/mes por volumen realista. Whisper local = $0 compute.
- **Uso:** transcribir entrevistas de podcasts donde se mencionan artistas → extraer credits + press mentions automáticamente.
- **Decisión recomendada:** Whisper local en GitHub Actions si se activa workflow de transcripts. Deepgram si necesitamos speed + diarization.

---

## Tier 3 — Discovery + Intelligence (mes 3+)

### SEO — **Ahrefs** (Luis ya tiene)
- **Costo:** $0 incremental (existing subscription).
- **Uso:** keyword research para Data & SEO team, backlink monitoring, competitor gap analysis.

### Social listening — **Brand24** o **Mention**
- **Costo:** $99-149/mes Brand24. $49/mes Mention.
- **Uso:** alerts cuando alguien menciona "Dauton", "dauton.media", o nombres de pillars. Capturar oportunidades de amplificación.
- **Alternativa gratis:** Google Alerts + Twitter search queries + script propio con bluesky-api (free).
- **Decisión recomendada:** arrancar con gratis. Subir a Brand24 post-launch si volumen justifica.

### Podcast discovery — **Listen Notes API** o **Podchaser**
- **Costo:** Listen Notes $99/mes Business tier o free tier limitado.
- **Uso:** encontrar podcasts latinos que hablan de rap y hacer outreach targeted.
- **Alternativa:** manual curation con spreadsheet en mes 1-3.

### Journalist database — **Muck Rack** (enterprise) o **Prowly**
- **Costo:** Prowly $258/mes mínimo. Muck Rack custom quote.
- **Decisión recomendada:** **NO pagar**. Para v1 suficiente manual curation de 50 periodistas latinos culturales. Base en Notion. Reevaluar en v2.

### Competitive analysis — **Similarweb** (disponible como MCP connector)
- **Costo:** free tier básico, paid tiers caros.
- **Uso:** monitorear tráfico de Genius, RYM, Remezcla para calibrar ambition.

---

## Tier 4 — Automation infrastructure

### Workflow engine — **n8n self-hosted** (ya tenemos base)
- **Costo:** $0 (Vercel deploy o Railway $5/mes).
- **Uso:** orchestrate workflows complejos que cruzan Supabase + Resend + Metricool + Claude API.
- **Alternativa:** código TypeScript propio + cron de GitHub Actions (lo que ya está montado para ingestion).
- **Decisión recomendada:** extender la infra de ingestion (TypeScript + GitHub Actions) antes que n8n. Mismo stack = menos context switching.

### Backup scheduler — **GitHub Actions**
- **Costo:** $0 (free tier 2K minutes/mes).
- **Uso:** cron jobs para generación de posts semanales, backups, SEO monitoring.

---

## Tier 5 — APIs críticas para conseguir data (NO content gen)

Las que alimentan el marketing además de la ingestion.

### Email discovery (artistas)

| API | Costo | Uso | Legalidad |
|---|---|---|---|
| **Apify** actors (IG, TikTok, Bandcamp scrapers) | $49/mes Starter | Parsear bios públicas de artistas por handle | ✓ datos públicos declarados |
| **Firecrawl** (ya tenemos) | $20/mes | Scrape sites propios de artistas (dauton.media → Firecrawl → parse email) | ✓ respetando robots.txt |
| **Wikidata SPARQL** | $0 free | Query `P968 (email)` + `P856 (official website)` por MBID | ✓ dominio público |
| **Whois API** (WhoisXMLAPI) | $12/mes | Lookup registrar contact del dominio propio del artista | ✓ GDPR-compliant registrars redactan, pero muchos indie no |

**Regla anti-spam dura:** solo emails públicamente declarados por el artista o su management. Nunca data brokers, nunca leaks, nunca scraping de sites privados. Ver `../06-Operations/email-discovery-playbook.md` para pipeline detallado.

### Social APIs (para publicar + listen)

| Plataforma | API | Costo | Limitación clave |
|---|---|---|---|
| **Instagram** | Meta Graph API (via IG Business account + FB Page) | $0 | Requiere IG Business, approval Meta, rate limits |
| **X (Twitter)** | X API v2 Basic tier | $200/mes | Caro. Alternativa: Typefully ($15/mes) via scheduling |
| **TikTok** | TikTok Content Posting API | $0 pero approval required | Very strict, launch pending approval 2-4 semanas |
| **YouTube** | YouTube Data API v3 | $0 hasta 10K quota/día | Generoso para publicar |
| **Threads** | Meta Graph API same as IG | $0 | Reciente, API aún limitada |
| **Bluesky** | AT Protocol | $0 free and open | Fácil, ideal para bot editorial |
| **Spotify** | Web API | $0 | Ya tenemos para ingestion, reusar para playlists |

**Decisión recomendada:** usar Metricool como capa de abstracción ($22/mes) en vez de manejar 7 APIs separadas. Solo usar API directa para Bluesky (bot editorial) + Spotify (playlists). El resto vía Metricool.

### Análisis competitivo

| Herramienta | Costo | Uso |
|---|---|---|
| **Similarweb MCP** | free tier | Tráfico de competidores |
| **Ahrefs** | Luis ya tiene | Backlinks + keywords |
| **BuiltWith** | $0 free lookup | Stack de competidores |

---

## AI models cheat sheet (abril 2026)

Actualizado a lo que conozco al cutoff de mayo 2025, más lanzamientos conocidos públicamente desde entonces. **Validar precios actuales antes de comprometer**.

### Text reasoning / copywriting
- **Claude Opus 4.6** — top calidad para copy denso, crisis, research. $$$.
- **Claude Sonnet 4.6** — sweet spot costo/calidad. Default para generación.
- **Claude Haiku 4.5** — velocidad + batch. Para personalization masiva.
- **GPT-5 / o3** — alternativa OpenAI. Uso puntual si Claude no dispo.
- **Gemini 2.5 Pro** — contextos largos (1M tokens) si necesitamos analizar docs enteros.

### Image
- **Flux 1.1 Pro / Flux Dev** — conceptual, fotoreal.
- **Ideogram 2.0/3.0** — texto legible en imagen (crítico para cards).
- **Midjourney v7** — estilizado, premium look.
- **Recraft V3** — vector + brand-consistent.

### Video
- **Veo 3 (Google)** — audio + video sincronizado.
- **Sora (OpenAI)** — narrativa cinematográfica.
- **Runway Gen-3 Alpha Turbo** — speed + control.
- **Kling 2.0** — barato + decent quality.
- **Remotion** — template-based, zero AI, total control.

### Music (para jingles, transiciones — no bootlegs)
- **Suno v4** — full tracks con vocals. **Cuidado legal con uso comercial.**
- **Udio v1.5** — similar.
- **Stable Audio 2** — solo música (no vocals), más safe legalmente.
- **Regla Dauton:** **NO publicamos música AI-generada con vocals**. Solo beats instrumentales + transiciones cortas para podcasts/reels. Nunca "covers" ni voces imitando a artistas reales.

### Voice / TTS
- **ElevenLabs v3+** — voice cloning, multiple languages, expresividad.
- **Cartesia Sonic** — ultra-low-latency (para live).
- **OpenAI TTS** — buena y barata.

### Transcription
- **Whisper Large-v3** — open-source, free, local.
- **Deepgram Nova-3** — speed + diarization.
- **AssemblyAI** — speaker labels + chapters.

---

## Costos consolidados (escenario realista mes 6 post-launch)

| Categoría | Herramienta | Mensual |
|---|---|---|
| Email sender | Resend | $20 |
| Social scheduler | Metricool | $22 |
| Newsletter | Beehiiv | $0 (< 2.5K subs) |
| Analytics | Plausible | $9 |
| AI text | Claude API | $50 |
| AI image | Flux via Replicate | $15 |
| AI video | Runway + Remotion | $35 |
| Voice | ElevenLabs | $22 |
| Transcription | Whisper local | $0 |
| Email discovery | Apify | $49 |
| Firecrawl | (shared with ingestion) | $0 incremental |
| **Total operating** | | **~$222/mes** |

Si cashflow ajusta, se puede recortar a **$90/mes** manteniendo: Resend, Metricool, Plausible, Whisper local, scraping propio con Firecrawl, y Claude Max manual (no API). Ese escenario austero funciona hasta mes 3-4 de post-launch; luego el tiempo manual de Luis se vuelve costoso.

---

## Ownership de cada capa

| Capa | Owner operacional | Backup |
|---|---|---|
| Email sender (Resend setup + dominio) | Engineering | — |
| Email templates + outreach copy | Community & Outreach | — |
| Social scheduling + content calendar | Community & Outreach | — |
| Content generation scripts (post-generator skill) | Engineering implementa, Community define prompts | — |
| AI stack (Claude, Flux, Runway) credentials | Community & Outreach | Engineering para integración |
| Analytics setup + dashboards | Data & SEO + Engineering | — |
| CRM / outreach tracking | Community & Outreach | — |

---

## Decisiones pendientes (requieren founder input)

1. **Budget approval.** ¿Aprobamos Tier 1 ($85-120/mes) desde mes 1? ¿Tier 2 activo desde mes 3?
2. **Claude API vs Claude Max manual.** ¿Empezamos con manual y migramos, o pagamos API desde mes 1? Impacta ~$50/mes.
3. **X API $200/mes.** ¿Vale la pena X en el stack o preferimos solo Metricool + cross-post de otros canales?
4. **Handles: ya reservados?** Ver TASKS.md — Luis debe confirmar.
5. **Voice cloning:** ¿Luis quiere usar su voz como "house voice" o contratamos actor?

---

*See also: `marketing-strategy-v1.md` · `social-platform-playbook.md` · `launch-plan.md`*
