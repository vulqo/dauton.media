# Genius API

**Last reviewed:** 2026-04-23
**Used in:** Stage 4 (credits gap-fill donde MB falla), Stage 5 (lyrics URL)

---

## Overview

Genius = crowd-sourced song metadata con annotations. Usos para Dauton:

1. **Fill gaps de producer/writer credits** cuando MusicBrainz no tiene el
   recording (común para rap latino cola larga).
2. **Lyrics URL** para link-out (no hosteamos lyrics, pero linkeamos).
3. **Samples used in song** (cuando Genius lo tiene annotated) — para
   documentar influencias/relaciones.

**Qué sí:** song lookup, artist lookup, contributing artists, lyrics URL,
samples, interpolations.

**Qué no:** discografía completa structured (Spotify/MB mejor), bios
authoritative (Wikipedia mejor), streaming stats (Spotify mejor).

---

## Auth

**Bearer token** (Client Access Token). Server-to-server.

```http
Authorization: Bearer {GENIUS_CLIENT_ACCESS_TOKEN}
```

Token guardado: `_Od6kIOvoaU62wHrIDsFTb8b7J_TPEcorMe4yi_ZK4k1T7HTW7yg9_n-xh7EhYMY`

No expira (a diferencia de Spotify). Rotar manualmente si se filtra.

**OAuth flow existe pero NO lo usamos** — solo relevante si alguna vez
queremos que users linkeen su cuenta Genius, no es MVP.

---

## Base URL

`https://api.genius.com`

Documentación oficial responde con HTML. Content-Type negotiation con
`Accept: application/json` para JSON.

---

## Endpoints que usamos

### GET /search?q={query}
Full-text search. Retorna songs (no artists ni albums).

Response relevante:
```json
{
  "meta": { "status": 200 },
  "response": {
    "hits": [
      {
        "type": "song",
        "result": {
          "id": 12345,
          "title": "Es Épico",
          "primary_artist": { "name": "Canserbero", "id": 678 },
          "url": "https://genius.com/Canserbero-es-epico-lyrics",
          "full_title": "Es Épico by Canserbero"
        }
      }
    ]
  }
}
```

**Gotcha:** hits siempre son canciones. Para artist page usar separate endpoint.

---

### GET /songs/{id}
Song detail con credits.

Response relevante:
```json
{
  "response": {
    "song": {
      "title": "Es Épico",
      "url": "https://genius.com/...",
      "release_date_for_display": "2012",
      "primary_artist": { "name": "Canserbero", "id": 678 },
      "producer_artists": [
        { "name": "Ahiezer", "id": 999 }
      ],
      "writer_artists": [
        { "name": "Tirone González", "id": 678 }
      ],
      "featured_artists": [
        { "name": "Lil Supa", "id": 543 }
      ],
      "song_relationships": [
        { "relationship_type": "samples", "songs": [...] },
        { "relationship_type": "sampled_in", "songs": [...] },
        { "relationship_type": "interpolates", "songs": [...] }
      ]
    }
  }
}
```

**Map:**
- `producer_artists[]` → `production_credits` con `role='producer'`
- `writer_artists[]` → `writing_credits`
- `featured_artists[]` → confirm o add a `collaborations`
- `song_relationships` con type `samples` / `interpolates` → ojo, data
  editorial interesante. Guardar en `sources` con notes, o extender schema
  para `samples` table (post-MVP).

---

### GET /artists/{id}
Artist page data.

Response relevante:
```json
{
  "response": {
    "artist": {
      "id": 678,
      "name": "Canserbero",
      "url": "https://genius.com/artists/Canserbero",
      "image_url": "...",
      "alternate_names": ["Pregonero", "Apóstol del Rap"],
      "instagram_name": "canserberowarclan"
    }
  }
}
```

**Map:** aliases, social handles si faltan.

---

### GET /artists/{id}/songs?sort=popularity&per_page=50
Lista de songs del artista. Útil para crosschcek cobertura.

---

## Rate limits

Genius **NO publica números oficiales.**

Observed por la comunidad:
- ~600 req/min sustainable sin 429
- Bursts OK hasta ~1000 req/min

**Worker setup:** 300 rpm budget (half de observed max) to be safe. 100
artistas × ~5 calls cada uno = 500 calls = < 2 min.

---

## Errores

| Code | Meaning | Action |
|---|---|---|
| 401 | Token inválido | Check env var, alert |
| 404 | Song/artist not found | Mark absent, no retry |
| 429 | Rate limit (raro) | Sleep 30s, retry |
| 5xx | Genius down | Backoff, retry 3× |

---

## Costos

**$0.** Genius no tiene tier pagado público (tienen deals enterprise que no
aplican aquí).

---

## Caveats

1. **Cobertura de rap latino es incompleta.** Pillars grandes están (Canserbero,
   Apache, McKlopedia). Cola larga VE: 40-50% cobertura.

2. **Credits frecuentemente parciales.** Una canción puede tener `primary_artist`
   pero sin producer_artists. Frecuente. No es bug, es falta de contribución
   comunitaria.

3. **Lyrics NO se descargan via API.** Solo URL. El contenido de lyrics está
   protegido; Genius explícitamente prohibe scraping de lyrics body. Nosotros
   link-out, no scrape. Esto alinea con política Dauton ("no hosteamos lyrics").

4. **Samples/interpolates son oro editorial.** Si Genius tiene `sampled_in`
   data para un track, es evidencia citeable de influencia → guardar como
   `source_type='article', title='Genius annotation'` con URL.

5. **Duplicate artists.** Genius tiene a veces 2 entries para mismo artista
   (typos históricos). Heurística de merge: si `url` tiene slug muy similar
   (>0.9 trigram), tratar como misma entidad.

6. **No client_id/secret needed para Bearer flow** — los tenemos guardados
   pero no los usamos. Solo Client Access Token.

---

## References

- Official docs: https://docs.genius.com
- API console: https://genius.com/api-clients
- Env var: `GENIUS_CLIENT_ACCESS_TOKEN`
- Code ownership: `src/lib/queries/genius.ts` (por crear Stage 4)
- n8n workflow: `_Execution/workflows/06-worker-genius.json`

---

## Changelog

- 2026-04-23 · Initial doc · Luis + Cowork
