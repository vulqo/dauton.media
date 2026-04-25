# SEO Stack — Dauton Media

**Owner:** Data & SEO chat
**Última actualización:** 2026-04-25 · v0.1
**Status:** 0 herramientas conectadas. Plan de conexión abajo.

---

## Filosofía del stack

Sin GSC al inicio (dominio en `dauton-media.vercel.app`, sin tráfico todavía). Componer un stack equivalente a Ahrefs+GSC+Semrush con APIs/herramientas más baratas o gratis. **Cada herramienta es invocable programáticamente** o pasa al backlog.

Costo target del stack SEO mensual antes de launch: **<$30 USD/mes**.
Post-launch (con tráfico): **<$150 USD/mes** hasta MRR positivo.

---

## Tier 0 — gratuitas, conectar HOY

| Herramienta | Para qué | Costo | Auth | Status |
|---|---|---|---|---|
| **Bing Webmaster Tools** | Alternativa a GSC: search analytics, indexed pages, backlinks, crawl errors | Free unlimited | Verify domain via DNS TXT | 🔴 pendiente signup |
| **IndexNow** | Push URLs nuevas a Bing/Yandex/Naver/Seznam en segundos | Free protocol | UUID en `/{key}.txt` root | 🔴 pendiente |
| **Microsoft Clarity** | Heatmaps + session recording + frustration metrics | Free unlimited | Script tag o GTM | 🔴 pendiente |
| **Cloudflare Web Analytics** | Web Vitals + traffic + privacy-first | Free unlimited | JS snippet o CF proxy | 🔴 pendiente |
| **Ahrefs Free Webmaster Tools** | Site audit + backlink monitor (limitado) para dominios verificados | Free | Verify domain | 🔴 pendiente |
| **Google Search Console** | Cuando el dominio launch (custom domain) | Free | DNS TXT verify | 🟡 deferred — tras dominio custom |
| **Lighthouse CI** | Audits de perf + SEO + a11y en CI/CD | Free OSS | npm install | 🔴 pendiente integración |
| **Pa11y** | A11y testing (signal SEO desde 2024) | Free OSS | npm install | 🔴 pendiente |
| **Schema.org Validator** | Validar JSON-LD antes de deploy | Free web | API call | 🔴 pendiente |
| **pytrends** (Google Trends unofficial) | Trend curves para keyword timing | Free Python lib | No auth | 🔴 pendiente |

---

## Tier 1 — paid pero baratas, conectar al definir scope

| Herramienta | Para qué | Costo | Auth | Status |
|---|---|---|---|---|
| **DataForSEO API** | SERP, Keywords Data, Rank Tracker, Backlinks. Ahrefs-grade vía API. | Pay-per-call: SERP $0.0006, KW data $0.0075, Rank $0.001 | Basic Auth (login/password) | 🔴 pendiente · ~$30 budget inicial |
| **Brave Search API** | SERP scraping ético + ya tenemos key | $0 hasta 2K queries/mes, $3/1K después | API key (ya tenemos) | 🟢 conectada |
| **Plausible / Umami** | Analytics privacy-first | Plausible $9/mes (10k pv) · Umami self-hosted free | Script tag | 🔴 decidir cuál |
| **Last.fm API** | Similar artists + tags (alimenta tool #7) | Free | API key + secret | 🔴 pendiente signup |
| **Eventbrite API** | Eventos VE + diáspora (tool #4) | Free | OAuth o API token | 🔴 pendiente investigación profunda |
| **Setlist.fm API** | Setlists históricos (Stage 7a) | Free 1440 req/día | API key + accept JSON | 🔴 pendiente signup |

---

## Tier 2 — opcionales, evaluar post-launch

| Herramienta | Para qué | Costo | Decisión |
|---|---|---|---|
| Screaming Frog SEO Spider Pro | Crawler completo > 500 URLs | $259/año | Comprar cuando archive >500 URLs públicas |
| Ahrefs / Semrush full | Backlinks + KW gap + content opportunities | $99-$249/mes | NO pagar antes de $1k MRR |
| Glimpse | Mejor que Google Trends + integraciones | $25/mes | Evaluar tras KW research v1 |
| AnswerThePublic API | Auto-suggest mining | $9/mes | Skip — DataForSEO Keyword Suggestions cubre similar |
| SerpAPI | Backup de Brave/DataForSEO | $50/mes | Skip — Brave + DataForSEO cubre |
| WebPageTest API | Performance deep-dive | $0.04/run paid | Skip — Lighthouse CI cubre |

---

## AI + Automation Stack

Documentado acá porque alimenta directamente el SEO content engine y los audits. Cross-reference con `02-Engineering/architecture.md` cuando Engineering documente su lado.

### Modelos LLM

| Modelo | Para qué en SEO | Cómo se llama |
|---|---|---|
| **Claude Sonnet 4.6** | Bio drafting, meta tags refinement, FAQ generation, content rewriting, KW intent classification | Vía Claude Max manual workflow (default) o Anthropic API (post-decisión founder) |
| **Claude Opus 4.6** | Tareas complejas: clustering semántico de KWs, content briefs largos, prompt engineering meta | Same callers |
| **Claude Haiku 4.5** | Tareas masivas baratas: traducir slugs, generar variants de meta description, classificar entities | Same callers |
| **Perplexity API** | Research de tendencias (qué busca el público en tiempo real, qué dicen los blogs/redes) | API key paga |
| **OpenAI text-embedding-3-small** | Embeddings para clustering semántico de keywords + internal linking similarity | $0.02/M tokens — barato |

### Plataformas de orquestación

| Plataforma | Uso en SEO | Costo | Status |
|---|---|---|---|
| **Claude Agent SDK / Cowork** | Agents departamentales (este chat). Investigación KW, brief writing, audit reviews. | Plan Claude Max | 🟢 activo |
| **GitHub Actions** | Cron schedules de audits SEO + content regen + sitemap rebuild | Free tier 2k min/mes | 🟢 setup en sprint 3 |
| **Supabase Edge Functions** | Workers SEO: rank tracker, audit runner, schema validator | Free tier generoso | 🟡 evaluar vs Workers |
| **Cloudflare Workers** | Edge SEO: redirects dinámicos, A/B test de title/meta, IndexNow push | Free tier 100k req/día | 🔴 pendiente |
| **n8n** | Orquestación visual de workflows complejos (deferred — code-first decision) | Self-hosted free | ⛔ deferred |
| **Vercel Cron Jobs** | Schedules ligeros (sitemap rebuild, IndexNow ping nuevas URLs) | Pro $20/mes | 🟡 evaluar |

### Vector store

| Tecnología | Uso | Costo |
|---|---|---|
| **Supabase pgvector** | Embeddings de keywords + content. Internal linking by similarity. SEO content gap detection. | Incluido en plan Supabase actual |

### Headless browser para scraping ético

| Tool | Uso | Costo |
|---|---|---|
| **Playwright** | Audits de render (cómo ve un crawler nuestra SPA), scrape `open.spotify.com` (calculadora #2 strategy b), screenshot generation | Free |
| **Puppeteer** | Backup de Playwright | Free |

---

## APIs PENDIENTES — instrucciones precisas para signup

Para cada una: link, pasos exactos, dónde guardar la credential, en qué doc se actualiza al integrar.

### 1. Bing Webmaster Tools API · 🔴 URGENTE pre-launch

- **Por qué:** alternativa a GSC. Provee: search queries, indexed pages, crawl errors, backlinks (limitados pero accionables).
- **URL signup:** https://www.bing.com/webmasters/
- **Pasos:**
  1. Sign in con cuenta Microsoft (puede ser nueva, dedicada al proyecto: `seo@dauton.media` o similar).
  2. Add site → ingresar `https://dauton-media.vercel.app` (o dominio custom cuando launch).
  3. Verify ownership: opción **DNS TXT** preferida (no HTML file porque no podemos editar Vercel build). Vercel permite agregar TXT records si dominio es custom; mientras esté en `.vercel.app`, usar XML file via Next.js public folder.
  4. Settings → API access → **Generate API key**.
  5. Importar Google Search Console data si el dominio ya tiene GSC (no aplica hoy).
- **Docs API:** https://learn.microsoft.com/en-us/bingwebmaster/
- **Credential storage:** `BING_WEBMASTER_API_KEY` en `.env.local` + Vercel envvars production.
- **Doc target al integrar:** crear `../api-docs/bing-webmaster.md`.

### 2. IndexNow · 🔴 URGENTE pre-launch

- **Por qué:** notifica a Bing/Yandex/Naver/Seznam en segundos cuando publicas URL nueva. Aceleración de indexing crítica para programmatic SEO masivo.
- **URL spec:** https://www.indexnow.org/documentation
- **Pasos:**
  1. Generar UUID (cualquier UUID v4 sirve como key). Ej. `node -e "console.log(crypto.randomUUID())"`.
  2. Crear archivo `public/{key}.txt` con el contenido siendo el mismo UUID.
  3. Deploy a Vercel para que el archivo sea accesible en `https://{dominio}/{key}.txt`.
  4. POST a `https://api.indexnow.org/indexnow` con payload:
     ```json
     {
       "host": "dauton.media",
       "key": "{key}",
       "keyLocation": "https://dauton.media/{key}.txt",
       "urlList": ["https://dauton.media/url1", "..."]
     }
     ```
- **Credential storage:** `INDEXNOW_KEY` en envvars.
- **Worker target:** `src/lib/seo/indexnow.ts` con función `pushUrls(urls: string[])` invocada en `revalidatePath` hooks.
- **Doc target:** crear `../api-docs/indexnow.md`.

### 3. DataForSEO API · 🟡 conectar antes de keyword research v1

- **Por qué:** Ahrefs-grade KW data + SERP + rank tracker, pay-per-call. Substituye Ahrefs/Semrush a una fracción del costo para scope MVP.
- **URL signup:** https://app.dataforseo.com/register
- **Pasos:**
  1. Sign up → email verify.
  2. Buy credits: mínimo $50 para testing. Recomendado $100 para KW research v1 + 3 meses de rank tracking.
  3. Dashboard → API Access → copy login + password (NO API key separada — usa Basic Auth).
- **Endpoints clave para nosotros:**
  - `POST /v3/serp/google/organic/live/advanced` — SERPs de Google ES (España/LATAM)
  - `POST /v3/keywords_data/google/search_volume/live` — search volume real
  - `POST /v3/dataforseo_labs/google/related_keywords/live` — related KWs
  - `POST /v3/dataforseo_labs/google/keyword_suggestions/live` — KW suggestions
  - `POST /v3/dataforseo_labs/google/historical_rank_overview/live` — rank tracking
- **Docs:** https://docs.dataforseo.com/v3/
- **Credential storage:** `DATAFORSEO_LOGIN` + `DATAFORSEO_PASSWORD` en envvars.
- **Doc target:** crear `../api-docs/dataforseo.md`.

### 4. Microsoft Clarity · 🔴 conectar pre-launch

- **Por qué:** heatmaps + session recordings + rage clicks. Free unlimited. Identifica fricción UX que afecta SEO (bounce rate, dwell time).
- **URL signup:** https://clarity.microsoft.com/
- **Pasos:**
  1. Sign in con Microsoft account (la misma de Bing Webmaster).
  2. New project → ingresar dominio.
  3. Copy tracking code (script tag).
  4. Insertar via Next.js `Script` component en `app/layout.tsx` con `strategy="afterInteractive"`.
- **Credential storage:** `NEXT_PUBLIC_CLARITY_PROJECT_ID` en envvars.
- **Doc target:** crear `../api-docs/clarity.md`.

### 5. Cloudflare Web Analytics · 🟢 fácil, free

- **Por qué:** Web Vitals real + traffic + privacy-first. Sin cookies. Free unlimited.
- **URL signup:** https://dash.cloudflare.com/?to=/:account/web-analytics
- **Pasos:**
  1. Cloudflare account (puede ser personal o nueva dedicada al proyecto).
  2. Web Analytics → Add a site.
  3. Pegar el JS snippet en `<head>` via Next.js `Script` component.
- **Credential storage:** `NEXT_PUBLIC_CF_BEACON_TOKEN` en envvars.
- **Doc target:** crear `../api-docs/cloudflare-analytics.md`.

### 6. Ahrefs Free Webmaster Tools (AWT) · 🟢 fácil, free

- **Por qué:** site audit semi-automatizado + backlink monitor (limitado a tu dominio verificado).
- **URL signup:** https://ahrefs.com/webmaster-tools
- **Pasos:**
  1. Crear cuenta Ahrefs free.
  2. Add a project → verify domain via DNS TXT, HTML file, o Google Analytics.
  3. Site Audit → Run.
- **Output:** dashboard web (no API en free tier). Manual check semanal.
- **Doc target:** sección en `audit-cadence.md`.

### 7. Last.fm API · 🟡 antes de tool SEO #7

- **Por qué:** similar artists + tags. Alimenta tool "Artistas similares" y enriquece géneros.
- **URL signup:** https://www.last.fm/api/account/create
- **Pasos:**
  1. Sign in / register Last.fm account.
  2. Create app → name "Dauton Media", description "Music archive for Latin American hip-hop", callback URL "https://dauton.media".
  3. Copy API key + shared secret.
- **Endpoints clave:** `artist.getsimilar`, `artist.gettoptags`, `tag.gettopartists`.
- **Rate limit:** 5 req/sec. Generoso.
- **Credential storage:** `LASTFM_API_KEY` + `LASTFM_SHARED_SECRET` en envvars.
- **Doc target:** crear `../api-docs/lastfm.md`.

### 8. Eventbrite API · 🟡 prioridad founder

- **Por qué:** poblar `/eventos/[artist-slug]` con eventos reales de diáspora VE.
- **URL signup:** https://www.eventbrite.com/platform/api
- **Pasos:**
  1. Eventbrite account.
  2. Account Settings → Developer Links → API Keys.
  3. Create OAuth app o use private token.
- **Endpoints clave:** `/v3/events/search/?q=&location.address=Miami&expand=venue,organizer`. (Necesita validación profunda — research deferred a `../api-docs/eventbrite.md`).
- **Rate limit:** 1000 calls/hr (público) — confirmar.
- **Credential storage:** `EVENTBRITE_PRIVATE_TOKEN` en envvars.

### 9. Setlist.fm API · 🟡 antes de Stage 7a

- **Por qué:** setlists históricos para tool eventos pasados + valor editorial.
- **URL signup:** https://www.setlist.fm/settings/api
- **Pasos:**
  1. Setlist.fm account.
  2. Settings → API → Apply for API key (auto-aprobado en horas).
- **Auth:** header `x-api-key: {key}` + `Accept: application/json`.
- **Rate limit:** 2 req/s, 1440/día. Suficiente para weekly scan.
- **Doc target:** crear `../api-docs/setlist-fm.md`.

### 10. Plausible o Umami (decidir) · 🟡 antes de launch

- **Plausible:** SaaS, $9/mes, 10k pageviews. Setup en 5 min. https://plausible.io/
- **Umami v2:** self-hosted, free. Deploy en Vercel/Cloudflare con Postgres. https://umami.is/docs/install

**Mi recomendación:** **Umami self-hosted en Vercel + Supabase.** Reusa infra. Privacy-first. Costo $0. Maintenance ~1h/setup, 0 ongoing.

- **Pasos Umami:**
  1. `git clone https://github.com/umami-software/umami.git` o "Deploy to Vercel" button del README.
  2. Apuntar `DATABASE_URL` al Supabase actual o un schema dedicado.
  3. Deploy → admin login → create website → copy tracking code.
- **Credential storage:** `NEXT_PUBLIC_UMAMI_WEBSITE_ID` + `NEXT_PUBLIC_UMAMI_SCRIPT_URL`.
- **Doc target:** crear `../api-docs/umami.md`.

### 11. Spotify scraping (open.spotify.com) · 🔴 PENDIENTE LEGAL

- **Por qué:** monthly listeners para calculadora de ingresos strategy (b).
- **No es API:** scraping HTML público. Spotify ToS prohíbe pero enforcement bajo para uso público no-comercial.
- **Coordinación obligatoria:** ticket `[BIZ-LEGAL]` ya abierto en TASKS.md.
- **Si Biz-Legal aprueba:**
  - Tool: Playwright headless con rate limit 1 req / 5s por IP.
  - Endpoint: `https://open.spotify.com/artist/{spotify_id}` → parse `monthly_listeners` desde JSON-LD embedded o HTML.
  - Cache aggressive: refresh weekly, no daily.
- **Si Biz-Legal NO aprueba:** strategy (a) en calculadora (estimación con bandas).

---

## APIs explícitamente NO necesarias

- **Google Custom Search API** — capped a 100 queries/día free. Brave + DataForSEO superior.
- **SerpAPI** — duplica Brave + DataForSEO con peor pricing.
- **Moz API** — métrica DA está deprecada estructuralmente, Moz no se actualiza al ritmo de SEO 2026. Skip.
- **Majestic API** — backlinks-only, Ahrefs cubre cuando paguemos.
- **Hunter.io / Apollo** — outreach, no SEO. Es Community & Outreach.

---

## Configuración del repo (qué hago llegar a Engineering)

Ticket `[ENG]` para Sprint próximo: setup `src/lib/seo/`:

```
src/lib/seo/
├── analytics/
│   ├── plausible.ts (o umami.ts)
│   ├── clarity.ts
│   └── cloudflare.ts
├── indexnow.ts          ← push URLs a Bing/Yandex
├── schema/              ← JSON-LD generators por entity
│   ├── person.ts
│   ├── musicGroup.ts
│   ├── musicAlbum.ts
│   ├── musicRecording.ts
│   ├── musicEvent.ts
│   ├── article.ts
│   ├── breadcrumb.ts
│   ├── faqPage.ts
│   └── website.ts
├── sitemap/
│   ├── generate.ts      ← build sitemap por idioma
│   └── routes.ts        ← lista de routes con priority + changefreq
├── meta/
│   ├── templates.ts     ← title/desc por route type, i18n
│   └── og.ts            ← Vercel OG image generator
└── audit/
    ├── lighthouse-ci.ts
    ├── pa11y.ts
    └── schema-validator.ts
```

Ticket también incluye envvars listadas arriba.

---

## Last reviewed

- 2026-04-25 — Data & SEO chat — v0.1 inicial.
