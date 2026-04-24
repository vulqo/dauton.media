# YouTube Data API v3

**Last reviewed:** 2026-04-23
**Used in:** Stage 2 (channel metadata), Stage 6 (transcript scan for videos)
**Skill:** `transcript-extractor` (consume el output; no habla directo al API)

---

## Overview

Usamos YouTube para dos cosas:
1. **Channel metadata** del canal oficial del artista (handle, subscriber count,
   video count). Metadata-only, no ingestion de cada video.
2. **Scan de canales curados** (El Apartaco + futuros) para descubrir entrevistas
   nuevas. Obtenemos lista de videos → luego `yt-dlp` descarga captions (no
   consume quota del API).

**Qué NO usamos vía API:** caption extraction (lo hace yt-dlp localmente),
audio download (también yt-dlp), video-level engagement metrics (no MVP).

---

## Auth

**API Key** (no OAuth — estamos leyendo data pública).

Header: ninguno. Query param:
```
?key={YOUTUBE_API_KEY}
```

API key guardada: `AIzaSyDpWn16y0G8_fPRWpMxlBqXAv9mLzWox3w`.

**Restrictions recomendadas en GCP Console:**
- HTTP referrer: `https://dauton-media.vercel.app/*`, `http://localhost:3000/*`
- API restrictions: solo "YouTube Data API v3"

---

## Base URL

`https://www.googleapis.com/youtube/v3`

---

## Endpoints que usamos

### GET /channels?part=snippet,statistics&id={channelId}&key=...
Detalle de un canal.

Response relevante:
```json
{
  "items": [{
    "id": "UCxxx",
    "snippet": {
      "title": "Canserbero Oficial",
      "customUrl": "@canserberooficial",
      "description": "...",
      "thumbnails": { "high": { "url": "..." } }
    },
    "statistics": {
      "subscriberCount": "892453",
      "videoCount": "47"
    }
  }]
}
```

**Quota cost:** 1 unit (`channels.list` = 1).

**Map:** `people.youtube_channel_id, photo_url (if missing from Spotify)`.

---

### GET /search?part=snippet&channelId={id}&type=video&order=date&maxResults=50&key=...
Lista los N videos más recientes de un canal. Usado en Stage 6 para scan
periódico de canales como El Apartaco.

**Quota cost:** **100 units** (`search.list`). ⚠ Este es el call caro.

**Pattern:** correrlo 1× por canal por semana. Con 5 canales curados = 500
units/semana = 2000/mes. Bien dentro del quota.

---

### GET /videos?part=snippet,contentDetails,statistics&id={videoId1,videoId2,...}&key=...
Detalles de múltiples videos en un solo call. Batch up to 50 IDs.

**Quota cost:** 1 unit × parts requested. Con 3 parts = 3 units.

Response relevante:
```json
{
  "items": [{
    "id": "...",
    "snippet": {
      "title": "Apache · Entrevista Exclusiva",
      "description": "...",
      "publishedAt": "2024-03-15T...",
      "channelTitle": "El Apartaco"
    },
    "contentDetails": {
      "duration": "PT1H23M12S"
    },
    "statistics": {
      "viewCount": "450000"
    }
  }]
}
```

**Map:** duración `PT1H23M12S` = 1h 23min 12s. Parse ISO 8601 duration.
Filter videos > 25 min como candidatos para transcript.

---

### GET /captions?videoId={id}&part=snippet&key=...
**NO lo usamos.** El endpoint de captions requiere OAuth para descargar
el contenido (solo metadata es public). yt-dlp hace esto mejor sin consume
quota.

---

## Rate limits (quota)

**Default: 10,000 units/day.**

Costo por endpoint:
| Endpoint | Cost |
|---|---|
| `channels.list` | 1 |
| `videos.list` | 1 + 2 (si pedís stats) = 3 |
| `search.list` | 100 |
| `playlists.list` | 1 |
| `playlistItems.list` | 1 |
| `commentThreads.list` | 1 |

**Cálculo para MVP:**
- 100 artistas × 1 channel lookup = 100 units (one-shot, Stage 2)
- 5 canales curados × 100 (search) + batch videos × 3 = 500 + ~30 = 530/semana
- = 2120/mes
- Plenty de margin para explorar más canales.

**Si excedemos:** apply for quota increase via YouTube API console. Gratis,
toma 1-2 semanas. Justificar uso real.

---

## Errores

| Code | Meaning | Action |
|---|---|---|
| 400 | Invalid request | Log + no retry |
| 401 | API key invalid/restricted | Alert, rotate key |
| 403 `quotaExceeded` | Daily quota hit | Pause worker, retry at UTC midnight |
| 403 `keyInvalid` | Wrong restrictions | Check GCP console |
| 404 | Video/channel deleted | Mark stale, no retry |
| 429 | Rare, usually quota | Same as 403 quotaExceeded |
| 5xx | YouTube side | Backoff, retry max 3× |

---

## Costos

**$0** within default quota.

Si requerimos quota increase más de lo que Google da gratis:
- Paid tier existe pero casi nadie lo necesita. Default 10K/day = effective
  cap of ~100 channel scans + 10K video lookups. Más que suficiente para MVP.

---

## Caveats

1. **Quota reset at midnight Pacific Time.** Worker debe saber la zona para
   scheduler inteligente.

2. **Duration format ISO 8601.** `PT1H23M12S` = regex parse. Trivial pero
   fácil de olvidar.

3. **`customUrl` (handle) puede no estar.** Canales viejos sin handle →
   usar channel ID directo. Nuestro `people.youtube_channel_id` almacena
   el ID canónico (`UCxxx`), el handle es secundario.

4. **Videos privados/deleted.** Si un video desaparece, videos.list lo
   omite sin error. Detectar ausencia como señal de deletion.

5. **Descripción contiene oro.** El text en `snippet.description` de un
   video de entrevista frecuentemente incluye tracklist, créditos, links.
   Parsear con Claude para extraer career events.

6. **NO descargar captions/audio vía API.** Usar yt-dlp en el worker n8n
   (Docker image con yt-dlp preinstalado). El API de captions requiere
   OAuth del dueño del canal.

---

## yt-dlp (companion tool — no es API pero relevante)

```bash
# captions solamente (rápido)
yt-dlp --skip-download --write-sub --sub-lang es --sub-format vtt \
       --write-auto-sub -o '%(id)s.%(ext)s' \
       https://youtube.com/watch?v=...

# audio para Whisper fallback
yt-dlp --extract-audio --audio-format mp3 --audio-quality 0 \
       -o '%(id)s.%(ext)s' https://youtube.com/watch?v=...
```

Con n8n container: usar imagen `jauderho/yt-dlp:latest` o instalar via
apt/pip.

**Legal:** yt-dlp no viola YouTube ToS para uso analítico con rate limit
razonable. No republicamos el contenido — extraemos quotes ≤15 palabras
con attribution visible a YouTube source URL.

---

## References

- Official docs: https://developers.google.com/youtube/v3
- Quota calculator: https://developers.google.com/youtube/v3/determine_quota_cost
- yt-dlp docs: https://github.com/yt-dlp/yt-dlp
- Env var: `YOUTUBE_API_KEY`
- Code ownership: `src/lib/queries/youtube.ts` (por crear Stage 6)
- n8n workflow: `_Execution/workflows/05-worker-youtube.json`,
  `_Execution/workflows/08-worker-yt-transcript.json`

---

## Changelog

- 2026-04-23 · Initial doc · Luis + Cowork
