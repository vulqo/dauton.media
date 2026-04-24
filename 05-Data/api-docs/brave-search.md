# Brave Search API

**Last reviewed:** 2026-04-23
**Used in:** Stage 5 (press discovery)
**Skill:** `press-extractor` (consume URLs encontradas)

---

## Overview

Discovery de artículos de prensa. Un fetch de Brave retorna URLs + snippets
que después Firecrawl convierte en texto completo para que Claude extraiga
quotes y eventos.

**Qué sí:** web results, news results, freshness filter, domain filter,
language filter.

**Qué no:** scraping directo (Firecrawl), answers generados (producto
separado que no usamos).

**NO usar el producto "Answers" ($4/1K queries)** — retorna LLM summary
en vez de raw URLs. Nosotros queremos raw.

---

## Auth

**Header:**
```http
X-Subscription-Token: {BRAVE_SEARCH_API_KEY}
Accept: application/json
```

API key guardada: `BSAe-eWDvuvxh97XnnbGcFIggGhGNoj`

---

## Base URL

`https://api.search.brave.com/res/v1`

---

## Endpoints que usamos

### GET /web/search?q={query}&count=20&country=ve&search_lang=es&freshness=py
Web search general.

Query params relevantes:
- `q`: query string. Usamos `"{stage_name}" rap venezolano` + variaciones
- `count`: 1-20 (default 10). Pedimos 20.
- `country`: `ve`, `co`, `mx`, `es`, `us`, `ar` — boostea results de ese mercado
- `search_lang`: `es` para priorizar español
- `freshness`: `pd` (past day) | `pw` (week) | `pm` (month) | `py` (year)
- `safesearch`: `off` (default `moderate`). Algunos rap lyrics triggeran filter.
- `result_filter`: `web,news` (excluye discussions, videos, etc.)

Response relevante:
```json
{
  "query": { "original": "Canserbero rap venezolano" },
  "web": {
    "results": [
      {
        "title": "Canserbero: 10 años después de Apocalipsis",
        "url": "https://elnacional.com/...",
        "description": "...",
        "age": "2 months ago",
        "language": "es",
        "meta_url": { "hostname": "elnacional.com" }
      }
    ]
  },
  "news": {
    "results": [...]
  }
}
```

**Map:** url → dedup contra `articles.url` → si nuevo, queue para Firecrawl
scrape.

---

### GET /news/search?q=...
Solo news verticals. Más relevante para press discovery.

**Gotcha:** `news` subset del /web/search también retorna news. Prefiero
`/web/search` con `result_filter=web,news` para un call.

---

### GET /suggest/v1?q=...
Autocomplete suggestions. No lo usamos (no tiene caso en ingestion).

---

## Rate limits

**Free tier** (lo que usamos inicialmente):
- 2,000 queries / mes
- 1 query / second (QPS)

**Pro tier** ($3/1K queries):
- 20 QPS
- No monthly cap, pay-as-you-go

**Cálculo MVP:**
- Stage 5 arranque: 15 pillars × 3 queries/semana × 4 semanas = 180/mes
- Plus 100 artistas secundarios × 1 query/semana = 400/mes
- Total = ~580/mes → FIT en free tier
- Cuando escalemos a 250 artistas: ~3,000/mes → **upgrade a Pro ($10/mes)**

---

## Errores

| Code | Meaning | Action |
|---|---|---|
| 400 | Bad query | Log + no retry |
| 401 | Invalid key | Alert + rotate |
| 422 | Validation (params inválidos) | Log |
| 429 | Rate limit | Sleep + retry con backoff |
| 5xx | Brave side | Retry 3× con backoff |

Response body en error: `{"type": "ErrorResponse", "error": { "id": "...", "status": ..., "code": "..." }}`

---

## Costos

**Free tier** (current): $0 hasta 2K/mes.

**Pro tier:** $5/1K queries (ver screenshot de Luis — "$5.00 / per 1,000 requests").
Con 3K/mes = $15/mes. Con $5 free in credits mensual = **$10/mes netos**.

**Mi recomendación:** quedarnos en free hasta superar 2K/mes. El upgrade
es trivial, no hay que cambiar código, solo pagar.

---

## Caveats

1. **Query construction matters.** `"Canserbero"` (quoted) es más específico
   que `Canserbero` unquoted. Usar quoted para stage_names ambiguos (ej.
   "Apache" → sin quotes saldría helicóptero).

2. **`country=ve` boost es suave.** No excluye otros países; solo boostea.
   Para filtrar estricto, post-filter por domain TLD (`.com.ve`, `.ve`) +
   domain whitelist.

3. **Domain whitelist es crítica.** Sin filter, 60% de results son agregadores
   (Letras.com, MusicasOficiales.blogspot) sin valor editorial. Mantener lista
   de ~30 outlets confiables en `05-Data/seed/media-outlets.json` con tier.

4. **`freshness=py` (past year) es buen balance.** Press > 1 año rara vez
   aporta vs. lo que ya capturamos.

5. **SafeSearch off recomendado.** Letras y títulos de rap frecuentemente
   triggeran moderate. No tenemos menores de audiencia.

6. **Brave cache results.** Si corrés la misma query 2 veces en < 1h,
   respuesta puede ser idéntica. Para "refresh" real, usar `freshness=pd`.

---

## Estrategia de queries por artista (Stage 5)

Por cada artista, 3 queries/semana:

1. `"{stage_name}" rap venezolano` — general context
2. `"{stage_name}" entrevista` — interview discovery
3. `"{stage_name}" {latest_release_title}` — release coverage (si hay release
   reciente)

Total = 3 queries × 100 artistas × 4 semanas = 1,200 queries/mes (free tier OK).

---

## References

- Official docs: https://api.search.brave.com/app/documentation
- Pricing: https://brave.com/search/api/
- Dashboard: https://api.search.brave.com/app/dashboard
- Env var: `BRAVE_SEARCH_API_KEY`
- Code ownership: `src/lib/queries/brave.ts` (por crear Stage 5)
- n8n workflow: `_Execution/workflows/07-worker-brave-firecrawl.json`

---

## Changelog

- 2026-04-23 · Initial doc · Luis + Cowork
