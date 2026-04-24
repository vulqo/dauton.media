# Wikipedia + Wikidata

**Last reviewed:** 2026-04-23
**Used in:** Stage 3 (bios seed), Stage 1 (cross-platform IDs)
**Skill:** `bio-drafter` (re-escribe summary en nuestra voz)

---

## Overview

Dos APIs complementarias de la misma fundación (Wikimedia):

- **Wikipedia REST API** — text bios, artículos, resúmenes.
- **Wikidata SPARQL** — structured facts, cross-IDs (Spotify → MusicBrainz
  → IMDb → Discogs, etc.), geographical data.

Usamos ambas como **seed reference** para bios. Wikipedia da narrativa,
Wikidata da facts estructurados.

**Legal:** Wikipedia text es CC BY-SA. **NO republicamos verbatim.** Usamos
como research → `bio-drafter` escribe nuestra prosa original con atribución
a Wikipedia como source.

---

## Auth

**Ninguna.** Solo User-Agent.

```http
User-Agent: DautonMedia/0.1 (luis@shocompanies.com)
```

---

## Base URLs

- Wikipedia ES: `https://es.wikipedia.org/api/rest_v1`
- Wikipedia EN (fallback): `https://en.wikipedia.org/api/rest_v1`
- Wikidata SPARQL: `https://query.wikidata.org/sparql`

---

## Endpoints que usamos

### GET /page/summary/{title} (Wikipedia REST)
Summary de un artículo. Nuestro punto de entrada.

```http
GET https://es.wikipedia.org/api/rest_v1/page/summary/Canserbero
```

Response relevante:
```json
{
  "title": "Canserbero",
  "extract": "Tirone José González Orama (Caracas, Venezuela; 11 de agosto de 1988 — Maracay, 20 de enero de 2015), conocido por su nombre artístico Canserbero...",
  "content_urls": {
    "desktop": { "page": "https://es.wikipedia.org/wiki/Canserbero" }
  },
  "thumbnail": { "source": "...", "width": 320 }
}
```

**Pattern:**
1. Buscar en `es.wikipedia.org/api/rest_v1/page/summary/{stage_name}`
2. Si 404, fallback a `en.wikipedia.org`
3. Si 404 ambos, bio seed = empty, `bio-drafter` opera con Spotify genres + highlights only

---

### SPARQL endpoint (Wikidata)
Query estructurada a Wikidata. Ejemplo: "dado el Spotify ID, dame MBID y
fecha de nacimiento".

```sparql
SELECT ?item ?itemLabel ?birthDate ?mbid WHERE {
  ?item wdt:P1902 "4CT1E7EvCM..." .   # Spotify artist ID
  OPTIONAL { ?item wdt:P569 ?birthDate . }
  OPTIONAL { ?item wdt:P434 ?mbid . }  # MusicBrainz artist ID
  SERVICE wikibase:label { bd:serviceParam wikibase:language "es" . }
}
```

Request:
```http
GET https://query.wikidata.org/sparql?query={urlencoded}&format=json
```

**Property IDs relevantes:**
- `P1902` = Spotify artist ID
- `P434` = MusicBrainz artist ID
- `P2722` = Deezer artist ID
- `P2850` = Apple Music artist ID
- `P2397` = YouTube channel ID
- `P569` = date of birth
- `P570` = date of death
- `P19` = place of birth
- `P20` = place of death
- `P27` = country of citizenship
- `P136` = genre
- `P358` = discography

Lista completa: https://www.wikidata.org/wiki/Wikidata:List_of_properties/music

---

## Rate limits

**Wikipedia:** "fair use", sin número oficial. ~200 req/s es conservador.

**Wikidata SPARQL:** 5 queries/s recomendado. Queries complejas (> 30s) pueden
timeout — simplificar.

---

## Errores

| Code | Meaning | Action |
|---|---|---|
| 404 | Artículo no existe | Fallback idioma, luego skip |
| 429 | Rate (raro) | Backoff |
| 500 / 503 | Wikimedia down | Retry 3× |

SPARQL timeout → simplificar query o paginar.

---

## Costos

**$0.** Gratis forever. Donar a Wikimedia Foundation si queremos ser buenos
ciudadanos (recomendado, deducible en varios países).

---

## Caveats

1. **Muchos artistas VE rap no tienen Wikipedia.** Esto es esperado — la
   cola larga no está documentada. `bio-drafter` debe operar con null-OK
   input y producir bio con `claims_used: []` si no hay datos verificables
   y marcar `confidence: low` (admin review).

2. **Wikipedia ES vs EN cobertura.** Para latin rap, ES > EN mostly. Pero
   pillars sí suelen tener entrada EN. Pattern: try ES first, fallback EN,
   use whichever has longer `extract`.

3. **Infobox data NO viene en /summary.** Para infobox detallado, usar
   SPARQL a Wikidata (que tiene la misma data estructurada), o Wikipedia
   `/page/html` + parser HTML. Preferimos SPARQL.

4. **Re-writing rule:** el prompt de `bio-drafter` debe ser explícito:
   > "NUNCA copiar frases literales del input Wikipedia. Reescribir con
   > estructura: [origen, años activos, por qué importa, colaboradores clave].
   > Citar Wikipedia como source (source_ids)."

5. **Wikidata IDs cambian raramente pero pueden.** No usar como clave
   primaria, solo referencia.

6. **Ambiguedad de nombres.** "Apache" puede ser disambiguation page.
   Usar `pageprops.disambiguation` en response para detectar. Si es dis
   → buscar la entrada específica con sufijo (ej. "Apache (rapero venezolano)").

---

## References

- Wikipedia REST API: https://en.wikipedia.org/api/rest_v1/
- Wikidata SPARQL: https://query.wikidata.org
- Property list música: https://www.wikidata.org/wiki/Wikidata:List_of_properties/music
- Env var: `WIKIPEDIA_USER_AGENT` (reusamos el de MB)
- Code ownership: `src/lib/queries/wikipedia.ts` (por crear Stage 3)
- n8n workflow: `_Execution/workflows/04-worker-wikipedia.json`

---

## Changelog

- 2026-04-23 · Initial doc · Luis + Cowork
