# Credentials Checklist · Dauton Media Ingestion

**Owner:** Luis Figuera
**Purpose:** tracker único de credenciales externas + donde viven + rotation.
**Last updated:** 2026-04-23

Cada credencial vive en 3 lugares:
1. Password manager (1Password preferido) — fuente de verdad, rotable.
2. `02-Engineering/website/.env.local` — desarrollo local (gitignored ✓).
3. Vercel environment variables (production + preview).

---

## Status global

| Platform | Token tipo | Obtenido | En `.env.local` | En Vercel | Creado | Rotation due |
|---|---|---|---|---|---|---|
| Supabase URL + keys | 4 vars | ✓ | ✓ | ✓ | 2026-04-23 | Q3 2026 password |
| Firecrawl | API key | ✓ `fc-3e8bf55a29...` | ⚠ por añadir | ⚠ por añadir | (Vulqo pre-existente) | 2027-04-23 |
| Spotify | Client ID + Secret | ✓ Ambos recibidos | ⚠ por añadir | ⚠ por añadir | 2026-04-23 | 2027-04-23 |
| YouTube Data API v3 | API key | ✓ `AIzaSyDpWn...` | ⚠ por añadir | ⚠ por añadir | 2026-04-23 | 2027-04-23 |
| Genius | Client Access Token | ✓ `_Od6kIOv...` | ⚠ por añadir | ⚠ por añadir | 2026-04-23 | 2027-04-23 |
| Brave Search | API key (free tier) | ✓ `BSAe-eW...` | ⚠ por añadir | ⚠ por añadir | 2026-04-23 | 2027-04-23 |
| OpenAI (Whisper) | API key | ⚠ post-Sprint 5 | — | — | — | +1 año tras crear |
| n8n | — | ❌ **descartado** — stack full TypeScript, orchestration en `src/lib/ingest/` | — | — | — | — |

---

## Platform-by-platform

### 1. Spotify Web API

**Obtener:**
1. Requiere **Spotify Premium activo** en la cuenta que crea el app (política
   2025 de Spotify).
2. https://developer.spotify.com/dashboard
3. Create app con los valores abajo → Save → Copy Client ID + generar Client Secret.

**Valores para el form (ajustados a 256 char limit):**
```
App name:        Dauton Media

App description (252 chars, ≤256 OK):
Archivo digital del rap hispanohablante con foco en Venezuela. Indexamos 
discografías, metadata y colaboraciones de artistas públicos vía Web API 
para un archivo editorial de referencia. Uso no comercial, server-to-server, 
sin reproducción de audio.

Website:         https://dauton-media.vercel.app
Redirect URIs:   https://dauton-media.vercel.app/api/auth/spotify/callback
                 http://localhost:3000/api/auth/spotify/callback
Web API:         ☑
☑ Agree TOS
```

**Env vars (ambos recibidos 2026-04-23):**
```
SPOTIFY_CLIENT_ID=3907dbac0ee74d459d0f11c7089fdc9a
SPOTIFY_CLIENT_SECRET=464966e6e9364e0f84f90705f5e73f35
```

**Rate limit:** ~180 rpm en client credentials flow. Hard limits en bursts.

**Auth flow:** client credentials (server-to-server). No hay user auth —
no necesitamos redirect_uri operativo, pero Spotify lo pide en el form.

---

### 2. YouTube Data API v3

**Obtener:**
1. https://console.cloud.google.com → Select project "Dauton Media" (o crear)
2. APIs & Services → Library → "YouTube Data API v3" → Enable (ya hecho por Luis).
3. APIs & Services → Credentials → Create credentials → API Key.
4. Copy key (formato `AIzaSy...`).
5. Restrict key (recomendado, no obligatorio):
   - Application restrictions → HTTP referrers →
     `https://dauton-media.vercel.app/*` y `http://localhost:3000/*`
   - API restrictions → Restrict → solo YouTube Data API v3.

**Env var (valor real guardado 2026-04-23):**
```
YOUTUBE_API_KEY=AIzaSyDpWn16y0G8_fPRWpMxlBqXAv9mLzWox3w
```

**Quota:** 10,000 units/day default. Calls cuestan distinto:
- `search.list` = 100 units
- `videos.list` = 1 unit
- `channels.list` = 1 unit

Con ingestion eficiente (channels + videos batched), 10K/day alcanza.
Si escalamos, Google permite apply for quota increase (gratis, toma 1-2 semanas).

---

### 3. Genius API

**Obtener:**
1. https://genius.com/api-clients → New API Client
2. Llenar con los valores abajo → Save.
3. Te da 3 tokens: **Client ID**, **Client Secret**, **Client Access Token**.
4. Usamos solo el Client Access Token (Bearer server-to-server, sin OAuth).

**Valores para el form:**
```
APP NAME:         Dauton Media
ICON URL:         (vacío por ahora, agregar cuando tengamos monograma hosteado)
APP WEBSITE URL:  https://dauton-media.vercel.app
REDIRECT URI:     https://dauton-media.vercel.app/api/auth/genius/callback
```

**Env var (valor real guardado 2026-04-23):**
```
GENIUS_CLIENT_ID=GDv1XcCEVbL1FcjEJt8N-FsPkzPVTOzlnT-Ff8XTjcjOs9kiVOIyC5Uy0yLkaL_V
GENIUS_CLIENT_SECRET=mamRpnE5wBt86-_whBfyZL8bc6BRPWwvuZybvqA-RqffLyUbTddNOsk2SGE0uQzkmU-gOLPJZSp6-oP5qWO9qA
GENIUS_CLIENT_ACCESS_TOKEN=_Od6kIOvoaU62wHrIDsFTb8b7J_TPEcorMe4yi_ZK4k1T7HTW7yg9_n-xh7EhYMY
```
Usamos principalmente el **Client Access Token** (Bearer). Client ID/Secret
solo serían necesarios si alguna vez hacemos OAuth con user consent.

**Rate limit:** no publicado oficialmente. ~600 rpm en la práctica. Informal.

---

### 4. Brave Search API

**Obtener:**
1. https://api.search.brave.com → Sign up
2. Elegir **Search** (no Answers). Free tier: 2,000 queries/mes.
3. Dashboard → API Keys → Create key.

**Decisión:** start free tier. Upgrade a Pro ($3/1K queries, ~$10/mes) cuando
pasemos de 60 artistas activos con weekly refresh.

**Env var (valor real guardado 2026-04-23):**
```
BRAVE_SEARCH_API_KEY=BSAe-eWDvuvxh97XnnbGcFIggGhGNoj
```

**Rate limit free tier:** 2K/mes absolute + 1 query/second.

---

### 5. Firecrawl

**Estado:** ✓ Obtenido. `fc-3e8bf55a29c34e9f8d7255026f488ad8`.

**Env var:**
```
FIRECRAWL_API_KEY=fc-3e8bf55a29c34e9f8d7255026f488ad8
```

**NO instalar el CLI.** Nosotros llamamos REST API desde código:
```
POST https://api.firecrawl.dev/v2/scrape
Authorization: Bearer fc-3e8bf55a29...
```

**Rate limit:** según plan Vulqo actual (confirmar con tu dashboard).

---

### 6. MusicBrainz

**Obtener:** **no requiere signup ni key.** Identificación por User-Agent.

**Env var:**
```
MUSICBRAINZ_USER_AGENT=DautonMedia/0.1 (luis@shocompanies.com)
```

**Rate limit:** 1 req/s hard. No negotiable para free. Aplicar para higher
limit es posible pero no necesario para nuestro volumen.

---

### 7. OpenAI (Whisper) — post Sprint 5

**Obtener:**
1. https://platform.openai.com → API keys → Create new secret key.
2. Set usage limit mensual ($20 default está bien para MVP).

**Env var:**
```
OPENAI_API_KEY=sk-...
```

**Costo:** Whisper $0.006/min. Budget MVP ~$10/mes (fallback cuando YouTube
no tiene captions).

**Cuándo obtener:** justo antes de Sprint 8 (YouTube transcripts). No urgente.

---

### 8. n8n (self-hosted)

**Deploy:**
1. https://railway.app → New Project → Deploy from template → n8n
2. Attach Postgres addon (gratis en Railway starter).
3. Set env vars en Railway:
   - `N8N_HOST`, `N8N_PORT=5678`, `N8N_PROTOCOL=https`
   - `N8N_BASIC_AUTH_ACTIVE=true`, `N8N_BASIC_AUTH_USER=luis`,
     `N8N_BASIC_AUTH_PASSWORD=<strong>`
   - `DB_TYPE=postgresdb`, etc. (Railway autoinjecta).
4. Custom domain opcional: `n8n.dauton.media` cuando tengamos dominio.

**Credentials que van DENTRO de n8n (no en Vercel):**
Todas las API keys de arriba también se configuran en n8n vía "Credentials"
UI para que los workflow nodes las usen. n8n las encripta at rest con una
clave `N8N_ENCRYPTION_KEY`.

**Costo:** Railway ~$5/mes starter.

---

## Rotation policy

| Credential | Rotate when |
|---|---|
| Supabase service role | Anualmente o si se filtra |
| Spotify Client Secret | Anualmente |
| YouTube API Key | Anualmente o si excedemos quota por abuso |
| Genius Client Access Token | Anualmente |
| Brave API Key | Anualmente |
| Firecrawl | Según política Vulqo |
| OpenAI | Anualmente o al exceder budget set |
| n8n admin password | Q3 2026 (6 meses) |

**Proceso de rotation:**
1. Generar nueva credential en el provider.
2. Actualizar `.env.local` + Vercel + n8n.
3. Revocar la vieja en provider.
4. Deploy de Vercel + restart n8n.
5. Update esta tabla.

---

## Checklist de Luis antes de Sprint 3

- [ ] Confirmar Spotify Premium activo en la cuenta que registrará el app
      (o decidir qué cuenta usar)
- [ ] Crear Spotify App → pegarme Client ID + Secret
- [ ] Crear YouTube API Key (con restrictions) → pegarme la key
- [ ] Crear Genius API Client → pegarme Client Access Token
- [ ] Sign up Brave Search API → pegarme API key (free tier)
- [ ] Confirmar Firecrawl API key vigente (ya recibido: `fc-3e8bf55a29...`)
- [ ] Decidir Railway vs Fly vs otro host para n8n
- [ ] Proveer CSV `05-Data/seed/manual-seed.csv` con 30-50 artistas conocidos
- [ ] Proveer `05-Data/seed/spotify-playlists.json` con 5-10 playlist IDs
- [ ] Proveer `05-Data/seed/youtube-sources.json` con canales (El Apartaco + 3-5 más)

Una vez estos 10 ítems están ✓, Claude Code arranca Sprint 3 sin fricción.
