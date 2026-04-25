# Tools & APIs — Stack Free-First

**Department:** Marketing & Growth
**Owner:** Community & Outreach
**Last updated:** 2026-04-24
**Status:** v1 — todo gratis hasta tener tracción real, luego escalamos.

---

## Filosofía

Cero presupuesto en MVP. Solo migramos a paid cuando una herramienta gratis nos limita en forma concreta y medible (no anticipada). Cada paid feature debe justificarse con un "qué cambia si pago" específico.

Reemplaza conceptualmente al doc anterior `ai-marketing-stack.md` (que dejo como referencia histórica de la propuesta full-stack).

---

## Categorías

1. Gestión de redes (scheduler + analytics)
2. Newsletter / email
3. AI text (copy, drafts, personalization)
4. AI imagen (cards, OG images, posts)
5. AI video (shorts, mini-docs)
6. AI voz (TTS para narración)
7. Workflow / automation engine
8. APIs de data (alimentar contenido dinámico)
9. APIs de discovery (emails de artistas, eventos)
10. Analytics (web)

---

## 1. Gestión de redes — scheduler + analytics

### Recomendado: **Postiz** (open-source, self-hosted, free)

**Qué es:** plataforma open-source de gestión de redes con AI integrada — alternative a Buffer/Hootsuite. Schedule, analytics, AI content generator, AI image generator, smart agents.

**Por qué la elijo:**
- 100% free si self-host (Docker en Vercel/Railway).
- AI integrado (post copy + imagen + agente que sugiere) sin pagar por créditos extra.
- Soporta IG, X, TikTok, YouTube, Threads, LinkedIn, Bluesky.
- Open-source: si necesitamos extender, modificamos código.

**Trade-off:** requiere setup técnico (1 día de Engineering). Pero es one-time.

**Alternativas free consideradas:**

| Tool | Free tier | Limitación crítica |
|---|---|---|
| **Buffer** | 3 canales · 10 posts queued · sin AI gratis | AI requiere paid |
| **Metricool** | 1 marca · 50 posts/mes · 5 AI credits | AI gasta rápido, free es light |
| **Publer** | 3 cuentas · 10 posts queued | Similar a Buffer |
| **Later** | 1 perfil/red · 10 posts/mes · sin AI | Muy limitado |
| **Mixpost** | self-hosted free | Sin AI integrado, más para teams |

**Decisión:** Postiz como primary. Buffer free como backup si Postiz da problemas técnicos.

**Ticket [ENG]:** deploy Postiz en Railway/Vercel + conectar las cuentas de Dauton.

---

## 2. Newsletter / Email

### Recomendado: **Beehiiv** (newsletter) + **Resend** (transaccional)

**Beehiiv** — para newsletter "Archivo Abierto" + recap personalizado.
- **Qué es:** plataforma de newsletter creator-first con editor moderno + analytics + monetización nativa (sponsorships marketplace).
- **Free tier:** 2,500 subscribers, unlimited sends, 0% comisión sobre futuras subscriptions, basic templates.
- **Por qué Beehiiv vs Kit:** Kit ofrece 10K subs gratis pero solo 1 automation y sin integraciones. Beehiiv 2.5K es suficiente para mes 1-6, y cuando crezcamos tenemos monetización integrada (boost, ad network, sponsorship marketplace) que Kit no tiene.

**Resend** — para emails transaccionales (welcome, claim approved, profile update).
- **Qué es:** API de envío de email pensada para developers. React Email components.
- **Free tier:** 3,000 emails/mes, 100 emails/día, 1 dominio.
- **Por qué:** API-first (lo necesitamos para automation desde Supabase triggers). Beehiiv es para broadcast, Resend para transaccional 1-a-1.

**Decisión combinada:** Beehiiv para los envíos masivos + Resend para los triggered. Stack hybrid.

---

## 3. AI text — copy, drafts, personalization

### Recomendado: **Claude (vía Max que ya tenés)** + **Gemini 2.5 Pro free**

**Claude Max (Luis ya paga):**
- **Qué es:** subscription para usar Claude Opus/Sonnet en chat + Claude Code.
- **Costo:** $0 incremental (already paid).
- **Uso para Dauton:** writing copy, drafting newsletter, generating personalization, prompt engineering.
- **Limitación:** uso manual (no API automática). Workflow `_pending_skills` ya está montado para batch processing manual desde Claude Code.

**Gemini 2.5 Pro vía Google AI Studio (free tier):**
- **Qué es:** modelo de Google con free tier API para developers (rate-limited pero generoso).
- **Costo:** $0 hasta hitting rate limits (~1500 requests/día actualmente).
- **Uso para Dauton:** automation que SÍ necesite API directa (auto-generación de captions desde events de DB cuando Luis no esté).
- **Limitación:** calidad ~Sonnet 4-level, suficiente para captions y digests cortos. No usaría para crisis comms.

**ChatGPT como segundo cerebro:**
- **Qué es:** la otra app de chat AI principal.
- **Free tier:** GPT-5 limitado, GPT-4o ilimitado.
- **Uso para Dauton:** segunda opinión cuando Claude da algo dudoso, brainstorming en otro modelo, herramienta GPTs para casos específicos (ej. SEO research GPT).

**Decisión:** workflow primary Claude Max manual. Gemini API gratis para automation cuando Luis no esté. ChatGPT como sparring partner.

---

## 4. AI imagen — cards, OG images, posts

### Recomendado: **Canva** + **Ideogram free** + **OG via Vercel Satori**

**Canva (free tier):**
- **Qué es:** plataforma de diseño con templates + Magic Media (image gen) + Magic Resize (re-format multi-plataforma) + Magic Eraser.
- **Free tier:** unlimited designs + 50 Magic Media generations/mes + brand kit básico.
- **Uso para Dauton:** posts IG carousel, cover newsletter, story templates, brand assets.

**Ideogram (free tier):**
- **Qué es:** AI image gen líder en imágenes con texto legible (Midjourney y DALL-E suckean en texto).
- **Free tier:** 10 imágenes/día con Ideogram 2.0.
- **Uso para Dauton:** cards con stats ("Apache · 14 colaboraciones · Caracas") donde el texto es protagonista.

**Vercel Satori (built-in):**
- **Qué es:** librería para generar OG images con React/JSX. Built into Next.js.
- **Costo:** $0 (parte del hosting).
- **Uso para Dauton:** OG image dinámico por entity. Cuando alguien comparte `dauton.media/artists/canserbero`, ve un card con foto + name + 3 stats automático. Crítico para SEO + viralidad de links.

**Skip por ahora:**
- Midjourney ($10/mes mínimo, no necesario en mvp).
- Flux via Replicate (paga por imagen, mejor cuando volumen lo justifica).

---

## 5. AI video — shorts + mini-docs

### Recomendado: **CapCut** + **InVideo AI** + **OpusClip free**

**CapCut (free, app móvil + desktop):**
- **Qué es:** editor de video con AI features (auto-captions, auto-cuts, AI templates) — propiedad de ByteDance, está hecho para TikTok.
- **Costo:** free (versión Pro existe pero gratis cubre 90% del use case).
- **Uso para Dauton:** edit final de TikToks/Reels, subtitulado automático, templates virales.

**InVideo AI (free tier):**
- **Qué es:** generador de video desde prompt — describes el video y arma script + visuals + música.
- **Free tier:** generaciones limitadas con watermark.
- **Uso para Dauton:** prototype rápido de mini-docs antes de produce custom. O para batches de "data bombs" donde el watermark no mata el formato.

**OpusClip (free tier):**
- **Qué es:** corta long-form (entrevista, video largo) en shorts virales con AI scoring.
- **Free tier:** 60 min de procesamiento al mes.
- **Uso para Dauton:** cuando un podcast latino menciona artistas tracked, descargamos el episode → OpusClip extrae los moments con menciones → posteamos como "highlight de un podcast". Atribución clara al podcast original.

**Skip por ahora:**
- Runway / Veo / Sora — caro, se evalúa en mes 4+ si el formato lo justifica.
- Synthesia / HeyGen (avatares AI) — el founder dijo no embajadores ni reps de marca. Nuestra "voz" es la data, no un personaje.

---

## 6. AI voz — TTS para narración

### Recomendado: **ElevenLabs free tier**

**ElevenLabs (free tier):**
- **Qué es:** TTS líder + voice cloning. Sounds humano, con expresividad y multilingual.
- **Free tier:** 10,000 caracteres/mes (~10 min de audio).
- **Uso para Dauton:** narración de mini-docs y data bombs donde queramos voiceover. Voz "house" de Dauton.

**Alternativa más barata:**
- **OpenAI TTS** vía API — buena calidad, $15 por 1M chars. Free tier no.
- **Google Cloud TTS** — free tier 4M chars/mes pero menos natural.

**Decisión:** ElevenLabs free para empezar (10 min/mes alcanza para 5-10 shorts). Si volumen lo demanda, Google TTS gratis como backup.

**Voice cloning:** dejado para etapa 3+ (cuando definamos voz "house"). Free tier de ElevenLabs incluye basic cloning (1 voz, 1-shot).

---

## 7. Workflow / automation engine

### Recomendado: **n8n self-hosted** + **GitHub Actions** + **Supabase pg_cron**

**n8n (self-hosted, free):**
- **Qué es:** Zapier open-source. Visual workflows que conectan APIs + DB + AI.
- **Costo:** $0 si self-host (Railway $5/mes opcional, o Vercel $0 con limits).
- **Uso para Dauton:** cuando el workflow es complejo y cambia (ej. "evento detected → genera caption → genera imagen → schedule en Postiz → log en DB"). Visual = más fácil iterar.

**GitHub Actions:**
- **Qué es:** cron + CI/CD nativo de GitHub.
- **Costo:** $0 (2K minutes/mes free para repos privados).
- **Uso para Dauton:** crons predecibles (ej. "domingo 6am: genera newsletter draft"). Ya está montado para ingestion. Reusable.

**Supabase pg_cron (built-in):**
- **Qué es:** scheduler de SQL dentro de Postgres.
- **Costo:** $0 (parte de Supabase).
- **Uso para Dauton:** queries periódicas que generan event triggers (ej. "find artists con cumpleaños hoy" → insert en queue → automation procesa).

**Decisión:** GitHub Actions para crons simples + n8n para workflows complejos visuales + pg_cron para queries DB-only.

---

## 8. APIs de data — alimentar contenido dinámico

Estas son las APIs que ya tenemos o vamos a usar para generar el contenido **dinámico desde el archivo** (pilar central).

### Internas — alimentadas por ingestion

- **Supabase API (REST + GraphQL)** — ya tenemos. Query directo del archivo: `releases`, `tracks`, `people`, `events`, `career_events`, `press_mentions`. Esta es la fuente principal del contenido dinámico.
  - **Free tier:** 500 MB DB + 5 GB egress + 2 GB file storage. Suficiente para MVP.

### Externas — música y eventos

| API | Para qué la usamos | Free tier | Status |
|---|---|---|---|
| **Spotify Web API** | Detectar nuevos releases de artistas tracked, popularity stats, playlists own | $0 (Client Credentials) | ya tenemos |
| **MusicBrainz API** | Cross-platform IDs, release groups, credits | $0 (con User-Agent header) | ya tenemos |
| **Wikipedia REST API** | Bios + extracts | $0 | ya tenemos |
| **Genius API** | Lyrics metadata, samples, song credits | $0 | ya tenemos |
| **YouTube Data API** | Channel updates, video uploads, view counts | $0 hasta 10K quota/día | ya tenemos |
| **Bandsintown API** | Eventos / conciertos por artista | $0 con app key | a evaluar mes 2-3 |
| **Setlist.fm API** | Histórico de setlists en tours | $0 | a evaluar mes 3 |
| **Songkick API** | Eventos + locations | $0 con key | a evaluar mes 3 |

**Para "eventos cercanos":** Bandsintown es el más rico para indie hispanos. Setlist.fm para histórico. Eventbrite (deferred per Data & SEO ticket) para eventos diáspora.

### Externas — search y press

| API | Para qué | Free tier |
|---|---|---|
| **Brave Search API** | SEO research + monitor menciones | 2K queries/mes free |
| **Firecrawl** | Scrape sitios oficiales artistas + press releases | $20/mes ya pagado |
| **Wikidata SPARQL** | Cross-platform IDs, dates, P968 (email) | $0 unlimited |

---

## 9. APIs de discovery — emails de artistas

Ver `../06-Operations/email-discovery-playbook.md` para detalle. Stack:

- **Apify actors** — IG bio scraper, TikTok scraper, Bandcamp scraper. Free tier ~$5 credits/mes (cubre ~1000 perfiles si bien optimizado).
- **Wikidata SPARQL** — gratis, propiedades P968 (email) + P856 (website).
- **MusicBrainz URL relations** — gratis, links sociales por MBID.
- **Firecrawl** — websites oficiales (ya tenemos).
- **Whoisxmlapi** — solo si necesitamos whois lookup. Free tier 1000 lookups/mes.

**Decisión:** empezamos con Wikidata + MB + Firecrawl (los 3 son free + ya tenemos infra). Si hit rate < 30%, agregamos Apify free tier. Whois solo casos específicos.

---

## 10. Analytics — web

### Recomendado: **Umami self-hosted** + **PostHog free**

**Umami (open-source, self-hosted, free):**
- **Qué es:** analytics web privacy-first, no cookies.
- **Costo:** $0 (self-host en Vercel + Supabase para storage).
- **Uso:** tráfico al site, referrers, paths más visitados.

**PostHog (free tier):**
- **Qué es:** product analytics + funnels + feature flags + session recordings.
- **Free tier:** 1M events/mes + 5K session recordings/mes (muy generoso).
- **Uso:** funnels (claim flow conversion, newsletter signup conversion), event tracking de tools SEO.

**Skip por ahora:**
- Plausible ($9/mes — Umami es alternativa free para mismo caso).
- Google Analytics — privacy compliance pain.
- Sentry para errors → mover a etapa 2 cuando haya producción real.

---

## Resumen — Stack MVP completo (todo $0)

| Capa | Herramienta | Costo |
|---|---|---|
| Social scheduler + AI | Postiz self-hosted | $0 |
| Newsletter | Beehiiv free (2.5K subs) | $0 |
| Email transaccional | Resend free (3K/mes) | $0 |
| AI text (manual) | Claude Max (existing) | $0 incremental |
| AI text (auto) | Gemini 2.5 Pro free API | $0 |
| AI imagen | Canva free + Ideogram free | $0 |
| OG images | Vercel Satori | $0 |
| AI video edit | CapCut free | $0 |
| AI video gen | InVideo AI free + OpusClip 60min | $0 |
| AI voz | ElevenLabs free (10K chars/mes) | $0 |
| Workflow | GitHub Actions + n8n self-hosted + pg_cron | $0 |
| Web analytics | Umami self-hosted | $0 |
| Product analytics | PostHog free tier | $0 |
| Music data APIs | Spotify, MB, Wikipedia, Genius, YouTube | $0 |
| Email discovery | Wikidata, MB, Firecrawl | $0 incremental |
| **Total operating** | | **$0/mes** |

---

## Cuándo migramos a paid

### Trigger para cada upgrade

| Tool | Free → Paid trigger | Costo aproximado |
|---|---|---|
| Beehiiv | > 2,500 subs | $49-99/mes según subs |
| Resend | > 3K emails/mes | $20/mes Pro |
| ElevenLabs | > 10 min/mes audio | $22/mes Creator |
| Postiz | bug crítico o feature missing | $9-29/mes Cloud |
| Apify | > 1K perfiles/mes | $49/mes Starter |
| Gemini API | rate limits hits regularmente | API pay-per-token |
| Claude API | si Max manual workflow se vuelve cuello de botella | $30-80/mes según uso |

**Regla:** ningún upgrade sin métrica concreta de uso ya en límite. No anticipamos.

---

## Lista consolidada de APIs

Para que ENG tenga el inventario en un sitio:

### APIs externas que necesitamos integrar

```
Music Data:
  - Spotify Web API           (have)
  - MusicBrainz API           (have)
  - Wikipedia REST API        (have)
  - Genius API                (have)
  - YouTube Data API v3       (have)
  - Bandsintown API           (mes 2-3)
  - Setlist.fm API            (mes 3+)

AI / Content Gen:
  - Anthropic API (Claude)    (defer, Max manual primero)
  - Google AI Studio (Gemini) (mes 1)
  - ElevenLabs API            (mes 2 cuando narremos)
  - Ideogram API              (mes 2 si volumen lo demanda)
  - OpenAI TTS                (backup mes 3+)

Marketing:
  - Resend API                (mes 1)
  - Beehiiv API               (mes 2)
  - Postiz API                (mes 1, self-hosted)
  - GitHub Actions API        (have via gh CLI)
  - Supabase pg_cron          (have)

Discovery:
  - Apify actors              (mes 2-3)
  - Whoisxmlapi               (mes 4+)
  - Firecrawl                 (have)
  - Wikidata SPARQL           (have)

Analytics:
  - Umami self-hosted         (mes 1)
  - PostHog API               (mes 1)
  - Plausible API             (skip, usa Umami)

Search:
  - Brave Search API          (have)
```

### Social plataformas (vía Postiz)

Postiz absorbe la complejidad — connectamos cuentas y él se encarga.

```
- Instagram Graph API
- X API v2
- TikTok Content Posting API
- YouTube Data API v3 (uploads)
- Threads API
- Bluesky AT Protocol
- Spotify Web API (playlists, ya tenemos)
```

Si Postiz falla en una plataforma específica, fallback a API directa.

---

## Decisiones que necesito de Founder

1. **Postiz self-hosted vs Buffer free** — Postiz tiene mejor AI pero requiere setup. ¿OK pedir a Engineering 1 día para deploy?
2. **Newsletter platform: Beehiiv ahora** — confirmar el dominio que usaremos para envío (`hola@dauton.media` o `archivo@dauton.media`).
3. **Voice "house" para ElevenLabs** — ¿clonamos voz de Luis o usamos una stock? Diferencia es nostalgia (la tuya tiene historia) vs profesional (stock más predictible).

---

*See also: [`marketing-strategy-v1.md`](marketing-strategy-v1.md) · [`content-plan-by-platform.md`](content-plan-by-platform.md) · [`newsletter-dynamic-content.md`](newsletter-dynamic-content.md) · [`monetization-roadmap.md`](monetization-roadmap.md) · [`launch-plan.md`](launch-plan.md)*
