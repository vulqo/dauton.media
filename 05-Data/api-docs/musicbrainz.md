# MusicBrainz API

**Last reviewed:** 2026-04-23
**Used in:** Stage 4 (deep credits)
**Skill:** `credit-reconciler` (merge MB + Genius + Spotify)

---

## Overview

Fuente principal de **production credits** a nivel de recording (producer,
engineer, mix, master, writer, etc.). Únic source open-data de this depth
para rap latino.

**Qué sí:** producer credits, engineer credits, writing credits, label
relationships con catalog numbers, ISWC, artist aliases, crew memberships
(band members), artist-to-artist relationships (mentor, collaborator, etc).

**Qué no:** popularidad, streaming numbers, cover art (sí pero pobre). No
descubrimiento de artistas nuevos — MusicBrainz es tesaurus, no trending.

---

## Auth

**Ninguna.** Solo `User-Agent` header requerido.

```http
User-Agent: DautonMedia/0.1 (luis@shocompanies.com)
```

Sin User-Agent → 403 eventualmente.

Si necesitáramos higher rate limit, se puede aplicar a MB admin
(gratis, proceso manual, 1-2 semanas).

---

## Base URL

`https://musicbrainz.org/ws/2`

Response default XML. Para JSON agregar `fmt=json` query param.

---

## Endpoints que usamos

### GET /artist/{mbid}?inc=url-rels+artist-rels+releases&fmt=json
Artist detalle. `mbid` es el MusicBrainz ID (UUID).

Response relevante:
```json
{
  "id": "f1e58f5b-...",
  "name": "Canserbero",
  "country": "VE",
  "gender": "male",
  "life-span": { "begin": "1988-08-11", "end": "2015-01-20", "ended": true },
  "relations": [
    {
      "type": "member of band",
      "artist": { "id": "...", "name": "CB Feat" }
    },
    {
      "type": "producer",
      "artist": { "id": "...", "name": "Ahiezer" }
    }
  ]
}
```

---

### GET /url?resource={spotify_url}&fmt=json
Cross-resolve: dado un Spotify URL, obtener el MBID.

```http
GET /url?resource=https://open.spotify.com/artist/7x5qPe0...&fmt=json&inc=artist-rels
```

**Pattern:** primer paso para cualquier artista con `spotify_id` conocido
= try to resolve a MBID. Si no encuentra → fallback a search by name.

---

### GET /artist/?query={name}&fmt=json
Fallback search cuando no hay Spotify→MB direct resolution.

```http
GET /artist/?query=artist:"Canserbero" AND country:VE&fmt=json
```

Retorna top matches con score 0-100. Accept si score ≥ 85.

---

### GET /release-group/{mbid}?inc=artist-credits+releases+url-rels&fmt=json
"Release group" en MB = álbum conceptual (todas sus ediciones). A nosotros
nos interesa el release group, no las ediciones individuales.

---

### GET /recording/{mbid}?inc=artist-rels+work-rels+isrcs&fmt=json
Track detalle con producer/engineer/writer credits. Este es el endpoint más
valioso — es donde vive la data única.

Response relevante:
```json
{
  "id": "...",
  "title": "Es Épico",
  "relations": [
    { "type": "producer", "artist": { "id": "...", "name": "Ahiezer" } },
    { "type": "recording engineer", "artist": { "id": "...", "name": "..." } },
    { "type": "mix", "artist": { "id": "...", "name": "Juan Carlos Ballesta" } },
    { "type": "vocal", "artist": { "id": "...", "name": "Lil Supa" } }
  ],
  "isrcs": ["QMGBZ2500019"]
}
```

**Map:** cada `relations[]` con `type=producer|recording engineer|mix|master`
→ `production_credits` row. Tipo `lyricist|composer|writer` → `writing_credits`.
Tipo `vocal|performer` en un recording donde no es primary → `collaborations`.

---

## Rate limits

**1 request per second per IP.** Hard. No negotiable sin aplicar increase.

Con 1 req/s:
- 100 artistas × 20 calls (artist + 10 recordings + 5 releases) = 2000 calls
- = 2000 seconds = 33 min puro fetch sin pausa
- En práctica con parsing + writes: ~1h

**Worker setup:**
- Semaforo global de 1 req/s
- Burst: NO. One-at-a-time.
- Run durante horas non-peak (no saturar ni romper)

---

## Errores

| Code | Meaning | Action |
|---|---|---|
| 400 | Query malformada | Log, no retry |
| 404 | MBID no existe | Mark `musicbrainz_id_invalid`, skip |
| 429 | Rate limited | Sleep 2s, retry (debe ser raro si respetamos 1 rps) |
| 503 | Service unavailable | Backoff, retry |

No hay 401/403 para uso público.

---

## Costos

**$0.** Open data, CC0-like.

Optional: donar a MetaBrainz Foundation (organización detrás de MB). No
relación con rate limit.

---

## Caveats

1. **Data coverage irregular para rap latino.** Pillars grandes tienen data
   rica (Canserbero MB entry bien detallado). Cola larga VE: 30% cobertura,
   60% mínimo, 10% nulo.

2. **Relations legibilidad.** El campo `type` es un vocabulario open. Normalizar
   al enum nuestro:
   - `producer` → `'producer'`
   - `co-producer` → `'co-producer'`
   - `recording engineer` / `engineer` → `'engineer'`
   - `mix` → `'mix'`
   - `master` / `mastering` → `'master'`
   - `vocal` / `lead vocals` → `'feature'` (si no es primary)
   - `lyricist` / `writer` → writing_credits con `role='writer'`
   - `composer` → writing_credits con `role='composer'`

3. **UUID mismatches.** MBID de un artista puede cambiar si MB admin hace
   merges. Nunca usar MBID como clave primaria, solo referencia; `people.id`
   sigue siendo nuestro UUID.

4. **Release groups vs releases.** MB distingue el álbum conceptual (release
   group) de sus ediciones (release: CD, digital, vinyl cada una con su propio
   MBID). Nosotros almacenamos a nivel release group en `releases` — mismo
   `musicbrainz_id` apunta al release group.

5. **Cover art via Cover Art Archive.** MB tiene integration con coverartarchive.org:
   `https://coverartarchive.org/release-group/{mbid}/front-500.jpg`. Úsalo
   como fallback si Spotify no tiene cover.

---

## References

- Official docs: https://musicbrainz.org/doc/MusicBrainz_API
- Cover art: https://wiki.musicbrainz.org/Cover_Art_Archive
- Relationship types: https://musicbrainz.org/relationships
- Env var: `MUSICBRAINZ_USER_AGENT`
- Code ownership: `src/lib/queries/musicbrainz.ts` (por crear Stage 4)
- n8n workflow: `_Execution/workflows/03-worker-musicbrainz.json`

---

## Changelog

- 2026-04-23 · Initial doc · Luis + Cowork
