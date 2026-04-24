# Firecrawl API

**Last reviewed:** 2026-04-23
**Used in:** Stage 5 (article extraction post-Brave), Stage 6 fallback (scraping de sitios sin caption ni API)

---

## Overview

Firecrawl convierte una URL en markdown limpio, listo para LLM. Maneja JS-rendered
pages, bypasses de cookies/consent, extracción por readability. Lo que
`curl https://article.com | html-to-text` haría mal, Firecrawl lo hace bien.

**Qué sí:** scrape single URL → markdown + metadata, crawl de site completo,
browser interactions para pages con forms/login.

**Qué no:** search (usamos Brave), audio/video extraction (usamos yt-dlp
+ Whisper), bypass de hard paywalls (no intentar).

---

## Auth

**Bearer token:**
```http
Authorization: Bearer {FIRECRAWL_API_KEY}
Content-Type: application/json
```

API key guardada: `fc-3e8bf55a29c34e9f8d7255026f488ad8`

---

## Base URL

`https://api.firecrawl.dev/v2`

---

## Endpoints que usamos

### POST /scrape
Convierte una URL en markdown + metadata.

```http
POST /scrape
Content-Type: application/json
Authorization: Bearer fc-...

{
  "url": "https://elnacional.com/article/...",
  "formats": ["markdown"],
  "onlyMainContent": true,
  "waitFor": 2000
}
```

Opciones relevantes:
- `formats`: `["markdown"]` (default), también `["html", "rawHtml", "links", "screenshot"]`
- `onlyMainContent: true`: quita nav, footer, ads. **Siempre usar esto.**
- `waitFor`: ms para wait después de page load. 2000 para sites con lazy-load.
- `includeTags` / `excludeTags`: CSS selectors to keep/remove
- `mobile`: boolean, si true usa UA móvil
- `timeout`: ms, default 30000

Response:
```json
{
  "success": true,
  "data": {
    "markdown": "# Canserbero: 10 años después...\n\n**Por M. Silva**\n\n...",
    "metadata": {
      "title": "Canserbero: 10 años después de Apocalipsis",
      "description": "...",
      "author": "M. Silva",
      "sourceURL": "https://elnacional.com/...",
      "statusCode": 200,
      "language": "es",
      "publishedTime": "2024-03-15T..."
    }
  }
}
```

**Map:** markdown → pasa a `press-extractor` skill. Metadata → `articles` row.

---

### POST /crawl
Full-site crawl. Útil si querés ingestar un blog de un artista entero.
No es MVP — solo si por ejemplo un medio venezolano tiene un archivo histórico
y queremos mirror.

```http
POST /crawl
{
  "url": "https://blog.com",
  "limit": 100,
  "maxDepth": 3,
  "excludePaths": ["/tag/*", "/author/*"]
}
```

Retorna `jobId` → poll `GET /crawl/{jobId}` para status.

---

### POST /interact
Clicks, forms, login. No usado en MVP. Potencial futuro si encontramos press
archives detrás de paywall-soft (pedir email pero sin pago).

---

### POST /search
Firecrawl tiene su propio search, pero Brave es mejor/más barato.
**No usar.**

---

## Rate limits

Según plan Firecrawl:

| Plan | Credits/mes | Scrape RPS |
|---|---|---|
| Free | 500 | 1-2 |
| Hobby | 3,000 | 5 |
| Standard | 100,000 | 50 |

Luis tiene cuenta via Vulqo — confirmar plan exacto en
https://www.firecrawl.dev/pricing.

**Cálculo MVP:**
- Stage 5: 100 artistas × 5 URLs Brave/semana × 50% hit rate nuevo = 250 scrapes/mes
- Fits en Hobby plan.

---

## Errores

| Code | Meaning | Action |
|---|---|---|
| 400 | Malformed request | Log, no retry |
| 401 | Invalid API key | Alert |
| 402 | Out of credits | Pause worker, alert |
| 408 | Timeout (page taking too long) | Retry with `waitFor` higher |
| 422 | Page not scrapable | Mark as failed, log URL |
| 429 | RPS exceeded | Backoff, retry |
| 5xx | Firecrawl side | Retry 3× |

---

## Costos

- Usa credits del plan existente (Vulqo account).
- **Estimate MVP:** ~250-500 credits/mes en Stage 5. Stage 6 fallback
  (sitios sin API de transcript) ~100/mes.
- Total ~500 credits/mes → cabe en Hobby ($19/mes).

---

## Caveats

1. **`onlyMainContent: true` es crítico.** Sin él, el markdown incluye nav
   bars, related articles, comments — ruido que confunde al `press-extractor`.

2. **Sitios con heavy JS pueden timeout.** `waitFor: 2000` o `5000` típicamente
   suficiente. Si persiste timeout, `actions: [{type: 'wait', milliseconds: 5000}]`.

3. **Publishers con paywalls duros (NYTimes, WSJ):** Firecrawl NO los
   bypassa. Retorna la parte visible. Para nosotros, 99% de press venezolano
   es open — no es problema.

4. **Idioma detection es reliable.** `metadata.language` usualmente correcto.
   Usar para filtrar en caso de que Brave retornara resultado no-español.

5. **No lyrics ni audio content.** Si un URL retorna solo lyrics (Letras.com
   style) Firecrawl lo scrape pero nosotros lo descartamos en el filter
   post-scrape.

6. **NO instalar el CLI** en nuestro stack — llamamos REST directamente
   desde n8n HTTP Request node o Next.js server actions. El CLI es para
   trabajo interactivo local, no parte del pipeline.

---

## References

- Official docs: https://docs.firecrawl.dev
- Pricing: https://www.firecrawl.dev/pricing
- Dashboard: https://www.firecrawl.dev/app
- Env var: `FIRECRAWL_API_KEY`
- Code ownership: `src/lib/queries/firecrawl.ts` (por crear Stage 5)
- n8n workflow: `_Execution/workflows/07-worker-brave-firecrawl.json`

---

## Changelog

- 2026-04-23 · Initial doc · Luis + Cowork
