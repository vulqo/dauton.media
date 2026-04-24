# Spotify Web API

**Last reviewed:** 2026-04-23
**Used in:** Stage 1 (bootstrap seed via playlists), Stage 2 (catalog enrichment)
**Skill:** — (queries directas desde `src/lib/queries/spotify.ts` · no requiere skill Claude)

---

## Overview

Fuente primaria de discografías, metadata estructural, popularidad, relaciones
entre artistas. Es el API más maduro del stack para lo que necesitamos.

**Qué sí:** artist IDs, followers, genres (Spotify-flavor), popularity score,
álbumes con tracks, tracks con features, ISRC codes, related artists, playlists.

**Qué no:** deep production credits (producer, engineer, mix). Los credits de
Spotify son incompletos para rap latino — van a MusicBrainz + Genius.

---

## Auth

**Flow:** Client Credentials (server-to-server, no user consent).

```http
POST https://accounts.spotify.com/api/token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic <base64(client_id:client_secret)>

grant_type=client_credentials
```

**Response:**
```json
{
  "access_token": "BQDe...",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

Token vive 1h. Cachear en Redis/memory hasta 5 min antes de expiry, re-fetch.

**Headers subsecuentes:**
```
Authorization: Bearer {access_token}
```

---

## Base URL

`https://api.spotify.com/v1`

---

## Endpoints que usamos

### GET /artists/{id}
Detalles de artista. Lo primero tras asignar `spotify_id`.

Response relevante:
```json
{
  "id": "...",
  "name": "Canserbero",
  "genres": ["latin hip hop", "venezuelan hip hop"],
  "popularity": 64,
  "followers": { "total": 892453 },
  "images": [{ "url": "...", "width": 640 }]
}
```

**Map to Dauton:** `people.spotify_id, photo_url, completeness++`.

---

### GET /search?q={query}&type=artist&limit=5
Buscar candidatos durante Stage 1 cuando solo tenemos el nombre.

Matching score recomendado:
- stage_name exact match (normalized) → +10
- first genre contains `latin|hip-hop|rap|venezuelan` → +5
- followers > 1000 → +2
- followers > 100000 → +3

Aceptar si score ≥ 12. Si no, admin disambiguation queue.

---

### GET /artists/{id}/albums
Discografía paginada.

Query params:
- `include_groups=album,single,compilation,appears_on` (pedir los 4)
- `limit=50` (max)
- `offset={n}` para paginar
- `market=ES` (o `VE` — forces regional visibility; opcional)

**Gotcha:** `appears_on` incluye álbumes donde el artista aparece solo como
feature. Útil para poblar `collaborations` pero NO crear un `release` record
— ese release pertenece al primary artist.

---

### GET /albums/{id}/tracks
Tracks de un álbum con metadata mínima (sin popularity ni audio features).

Para track detail completo:

### GET /tracks/{id}
Detalles profundos de track. Incluye `external_ids.isrc`.

Response relevante:
```json
{
  "id": "...",
  "name": "Es Épico",
  "duration_ms": 234000,
  "explicit": false,
  "track_number": 3,
  "external_ids": { "isrc": "QMGBZ2500019" },
  "artists": [
    { "id": "...", "name": "Canserbero" },
    { "id": "...", "name": "Lil Supa" }
  ]
}
```

**Map to Dauton:** insert `tracks` row; para cada artist en `artists[]` que
no es `primary_artist_id` del release → crear `collaborations` row.

---

### GET /artists/{id}/related-artists
20 artistas relacionados. Usamos en Stage 1 para expandir el seed.

**Limitación:** el algoritmo de "related" de Spotify es broad y occasionally
sugiere artistas de géneros distintos. Filtrar por genre overlap antes de
accept.

---

### GET /playlists/{id}/tracks
Tracks de una playlist con sus artistas.

Para nuestras 5 playlists seed (ver `05-Data/seed/spotify-playlists.json`),
iteramos y extraemos `track.artists[]` → dedup → queue como candidates.

**Gotcha:** playlists con 1000+ tracks paginan (50 por request). Loop.

---

## Rate limits

Spotify no publica números duros. Observed:
- ~180 req/min por app (client credentials)
- Bursts de 5-10 req/s OK
- Bursts sostenidos > 20 req/s → 429

**Headers para watching:**
- `Retry-After: {seconds}` en respuesta 429

**Worker setup:** 180 rpm budget, sleep 400ms entre requests para stay safe.
Con capacidad ~150 rpm efectivos. 100 artistas × 20 calls promedio = 2000
calls → ~14 min puro fetch.

---

## Errores

| Code | Meaning | Action |
|---|---|---|
| 400 | Bad request | Log + no retry (bug nuestro) |
| 401 | Expired token | Refresh token, retry 1× |
| 403 | Forbidden (app scope wrong) | Log, alert, no retry |
| 404 | Not found | Mark entity `spotify_id_invalid=true`, no retry |
| 429 | Rate limit | Sleep `Retry-After` seconds, retry |
| 500-503 | Spotify side | Exponential backoff, max 5 retries |

---

## Costos

- **Free for commercial use** within developer terms.
- **Requires Spotify Premium** en la cuenta que crea el app (política 2025).
  Costo: ~$11/mes por la cuenta premium.
- **Dev token limits:** ninguno explícito para client credentials; Spotify
  puede suspender apps abusivas.

**Total Spotify cost for MVP:** $11/mes (Premium de la cuenta que registra).

---

## ⚠ Critical caveats (updated 2026-04-24, post-Sprint 4 empirical findings)

### ⛔ Client Credentials flow NO retorna `followers` ni `popularity`
Discovered in Sprint 4 production runs. `GET /v1/artists/{id}` con token de
Client Credentials retorna el objeto del artist SIN los campos `followers.total`
ni `popularity`. Estos campos SÍ aparecen en User Authorization flow (OAuth
con usuario logueado), pero no en server-to-server.

**Implicación:** `entity_stats` rows para `metric='followers'` y `metric='popularity'`
no se pueden poblar con Client Credentials. Todo worker code debe guardear
contra null en esos campos.

**Workarounds para recuperar stats:**
- **OAuth user flow** (requiere user consent, no es server-to-server limpio)
- **Spotify-for-Artists API** (solo funciona si la cuenta Dauton Media
  "reclama" el artista — no aplicable a artistas ajenos)
- **Web scraping de open.spotify.com** (los stats son públicos en la UI)
- **Last.fm** como proxy para popularity (tiene play counts)
- **Chartmetric** post-MVP ($140/mes) — tiene stats estables

**Recomendación:** por ahora dejar `entity_stats` vacío para follower/popularity.
Cuando tengamos OAuth user flow para otra feature (ej. user logs in with
Spotify to import favorites), aprovecharlo para backfillear stats de artists.

### ⛔ `/playlists/{id}/tracks` retorna 403 en Client Credentials (cambio 2024)
Spotify restringió el acceso a user playlists — tanto propias como de otros
users — para tokens server-to-server en algún punto de 2024. Respuesta:
`403 Forbidden`.

**Solución aplicada (Sprint 4):** se implementó un **fallback search-based
bootstrap**. En lugar de leer tracks de las playlists de k12jamz, el worker
usa `search_artists_by_query` con queries curadas por playlist theme
(ej. para "Rap Venezolano" → queries como `"rap venezolano"`, `"hip hop venezuela"`,
`"trap venezolano"`). Funcional pero pierde el signal de curaduría humana.

Editorial playlists (creadas por Spotify oficial) SÍ son readable con
Client Credentials. Pero k12jamz es user, por eso falla.

### 🚨 Rate limit real observado (Sprint 4)
**En Sprint 4 se hit un 429 tras ~600 calls rápidas** (sin spacing explícito).
El `Retry-After` header retornado fue **83,578 segundos ≈ 23 horas**. El
circuit breaker local se abrió y la queue pausó.

Esto es MUY agresivo comparado con los ~180 rpm que Spotify informalmente
permite. La causa probable es un **burst pattern penalty** — hacer 600 calls
en pocos minutos está dentro del rpm estándar pero triggerea throttling
extendido como anti-abuse measure.

**Regla operativa post-Sprint 4:**
- Spacing mínimo **300 ms entre calls** desde el worker (no solo confiar en el rpm budget).
- No exceder **200 calls/minuto sostenido** (no 180 como en el rpm budget inicial).
- Cap al `Retry-After` handler: **max 30 segundos por intento**. Si el retry
  real es > 30s, el circuit breaker debe abrirse y la queue pausar esa fuente.

### ⚠ Node 20 / undici fetch sin timeout nativo
El `fetch` global en Node 20 (via undici) **no tiene timeout default**. Una
request que hangs infinitamente bloquea el worker. Sprint 4 sufrió esto
durante testing — fixed con un helper `withTimeout(promise, ms)` usando
`Promise.race`.

**Patrón obligatorio para todos los clients futuros:**
```ts
const ac = new AbortController();
const timer = setTimeout(() => ac.abort(), 12_000);
try {
  const res = await fetch(url, { ...opts, signal: ac.signal });
  return res;
} finally {
  clearTimeout(timer);
}
```
O usar `withTimeout` compartido en `_base.ts`.

---

## Caveats (additional — legacy discovery)

1. **Genres son imprecisos para rap latino.** Spotify asigna `latin hip hop`
   genérico. No confiar para categorización fina — usar Last.fm + MusicBrainz
   tags.

2. **Nombres con acentos o caracteres especiales.** Normalizar antes de buscar:
   `Rxnde Akozta` a veces aparece como `Rxnde Akózta`. Intentar ambas formas.

3. **`appears_on` pollution.** Si un artista aparece una vez en compilado
   genérico ("Latino Hits 2015"), saldrá en su `albums`. Filter out albums
   donde el artista no es primary artist.

4. **Country restrictions.** Algunos releases solo disponibles en ciertos
   mercados. Pasar `market=ES` por default (rap español + venezolano visible
   ahí); si missing, retry con `market=US`.

5. **ISRC no siempre está.** Algunos tracks viejos venezolanos no tienen
   ISRC. Dejar null y no romper el pipeline.

6. **Token caching.** NO pedir un nuevo token por request. Cachear 55 min,
   renovar a los 55.

---

## References

- Official docs: https://developer.spotify.com/documentation/web-api
- App dashboard: https://developer.spotify.com/dashboard
- Env vars: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`
- Code ownership: `src/lib/queries/spotify.ts` (por crear en Stage 2)
- n8n workflow: `_Execution/workflows/02-worker-spotify.json` (por crear)

---

## Changelog

- 2026-04-23 · Initial doc · Luis + Cowork
- 2026-04-24 · Post-Sprint 4 empirical findings (critical):
  - Client Credentials no retorna followers/popularity (cambio Spotify 2024)
  - `/playlists/{id}/tracks` retorna 403 para user playlists (k12jamz) — implementado fallback search-based
  - Rate limit real: 429 tras 600 calls rápidas, retry-after 83,578s (~23h). Regla nueva: spacing 300ms mínimo, cap 30s per retry
  - Node 20 fetch sin timeout default — fix con `withTimeout` obligatorio
  - Entity stats para followers/popularity queda sin poblar hasta resolver OAuth o scraping
