# OpenAI Whisper API

**Last reviewed:** 2026-04-23
**Used in:** Stage 6 fallback (YouTube videos sin captions)
**Skill:** `transcript-extractor` (consume el output texto + timestamps)

---

## Overview

Whisper = modelo de speech-to-text de OpenAI. Lo usamos **solo como fallback**
cuando `yt-dlp` no consigue captions de YouTube (ni manuales ni auto-generadas).

**Qué sí:** transcribe audio mp3/mp4/wav → texto con timestamps, auto-detect
language, translate-to-EN opcional.

**Qué no:** speaker diarization (separar voz de host vs. invitado) — Whisper
NO lo hace. Para diarization hay que usar librerías externas (pyannote.audio)
post-transcripción. No MVP; diarization se resuelve con Claude que infiere
speaker por contexto.

---

## Auth

**Bearer token:**
```http
Authorization: Bearer {OPENAI_API_KEY}
Content-Type: multipart/form-data
```

Env var: `OPENAI_API_KEY` — pendiente, se obtiene al arrancar Stage 6.

---

## Base URL

`https://api.openai.com/v1`

---

## Endpoints que usamos

### POST /audio/transcriptions
Transcribe audio → texto.

```http
POST /audio/transcriptions
Content-Type: multipart/form-data

file: <audio.mp3 binary>
model: whisper-1
language: es
response_format: verbose_json
timestamp_granularities[]: segment
```

Parámetros relevantes:
- `file`: mp3/mp4/wav/m4a/webm. Max 25 MB. Para audio > 25 MB, split en chunks.
- `model`: `whisper-1` (único disponible en API, aunque localmente hay whisper-large-v3)
- `language`: ISO 639-1 (ej. `es`). Default auto-detect. **Siempre pasar `es`**
  para nuestro use case (mejora accuracy).
- `response_format`: `json` | `verbose_json` | `text` | `srt` | `vtt`
- `timestamp_granularities`: `["segment"]` (default) | `["word", "segment"]`
- `temperature`: 0 (default, most deterministic)

Response (`verbose_json`):
```json
{
  "language": "spanish",
  "duration": 4532.1,
  "text": "Apache, bienvenido al programa...",
  "segments": [
    {
      "id": 0,
      "start": 0.0,
      "end": 4.2,
      "text": "Apache, bienvenido al programa.",
      "avg_logprob": -0.15,
      "no_speech_prob": 0.01
    }
  ]
}
```

**Map:** para transcript processing, usar `segments[]` — cada uno tiene
timestamp start/end. Pasar a `transcript-extractor` en chunks con timestamps
preservados.

---

### POST /audio/translations
Transcribe + traduce a inglés. **NO usamos.** Nuestro target es español.

---

## Rate limits

**Tier 1 (free trial):** 3 req/min
**Tier 2+ (con pago >$5):** 500 req/min

Audio > 25 MB hay que chunking (ffmpeg split en segments de 10 min con overlap).

---

## Errores

| Code | Meaning | Action |
|---|---|---|
| 400 | File format no soportado / corrupto | Log, skip |
| 401 | Bad API key | Alert |
| 413 | File > 25 MB | Chunk with ffmpeg |
| 429 | Rate limit | Backoff exponential |
| 500 | OpenAI side | Retry 3× |

---

## Costos

**$0.006 / minuto de audio** (whisper-1 via API).

MVP estimate:
- Canal El Apartaco: ~50 videos × 60 min promedio = 3,000 min
- 30% no tienen captions útiles y requieren Whisper → 900 min
- 900 × $0.006 = **$5.40 one-shot** para procesar historial completo del canal
- Scan semanal: ~2-3 videos nuevos × 60 min × 30% = ~1 min/semana = $0.006/semana

**Cap de gasto recomendado:** $20/mes hard cap en OpenAI dashboard. Alerta
a $10. Más que suficiente.

---

## Caveats

1. **25 MB límite de archivo.** Audio MP3 128kbps → 25 MB = ~27 min. Para
   videos > 27 min → chunking con ffmpeg:
   ```bash
   ffmpeg -i video.mp3 -f segment -segment_time 1200 -c copy out_%03d.mp3
   ```
   1200s = 20 min chunks con overlap visual (20 min pesa ~18 MB).
   Juntar transcripts preservando timestamps (sumar offset por chunk).

2. **Accuracy en nombres propios venezolanos:** mediana. `Canserbero` funciona.
   `Rxnde Akozta` puede salir como `Rende Acosta`. Mitigación: pasar al
   `transcript-extractor` un diccionario de stage_names en DB como
   contexto — Claude corrige.

3. **Música de fondo degrada accuracy.** Entrevistas pasan, freestyles
   en vivo con beat de fondo sale mucho peor. Detectar con `no_speech_prob`
   alto (> 0.5) = posiblemente música, filtrar segments.

4. **`language=es` mejora accuracy notablemente.** Whisper tiene code-
   switching capability pero si le decís el lenguaje primario lo hace mejor.

5. **Formato de segment vs word:** `word` granularidad es lindo pero 3×
   más tokens. Para extraction nos basta `segment`. Si alguna vez necesitamos
   align a palabra exacta (clip para social media), re-transcribe ese video
   con `word`.

6. **Alternative: local Whisper.** Si costo escala mucho, correr Whisper
   local en n8n (`openai-whisper` pip package o `whisper.cpp`). Free pero
   requiere GPU o ~4× tiempo en CPU. No MVP.

---

## References

- Official docs: https://platform.openai.com/docs/api-reference/audio
- Pricing: https://platform.openai.com/docs/pricing
- Usage dashboard: https://platform.openai.com/usage
- Env var: `OPENAI_API_KEY` (por crear Stage 6)
- Code ownership: `src/lib/queries/whisper.ts` (por crear)
- n8n workflow: parte de `08-worker-yt-transcript.json`

---

## Changelog

- 2026-04-23 · Initial doc · Luis + Cowork
