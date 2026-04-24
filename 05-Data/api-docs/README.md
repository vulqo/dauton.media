# API Docs · Dauton Media

**Purpose:** resumen operativo autoritativo de cada API externa que usamos.
Fuente de verdad local para que no haya que abrir el navegador cada vez.

**Rule:** cada workflow de n8n y cada skill de Claude que consume un API
**debe** referenciar su doc correspondiente aquí. Si una doc está
desactualizada y el API cambió, se actualiza aquí PRIMERO, después se
propaga a los workflows.

---

## Índice

| # | API | Stage uso | Doc local | Doc oficial |
|---|---|---|---|---|
| 1 | **Spotify Web API** | Stage 2 (catalog) | [`spotify.md`](./spotify.md) | https://developer.spotify.com/documentation/web-api |
| 2 | **MusicBrainz** | Stage 4 (credits) | [`musicbrainz.md`](./musicbrainz.md) | https://musicbrainz.org/doc/MusicBrainz_API |
| 3 | **YouTube Data API v3** | Stage 6 (transcripts) + Stage 2 (channels) | [`youtube.md`](./youtube.md) | https://developers.google.com/youtube/v3 |
| 4 | **Genius** | Stage 4 enrichment (credits gap) | [`genius.md`](./genius.md) | https://docs.genius.com |
| 5 | **Brave Search** | Stage 5 (press discovery) | [`brave-search.md`](./brave-search.md) | https://api.search.brave.com/app/documentation |
| 6 | **Firecrawl** | Stage 5 (article extraction) | [`firecrawl.md`](./firecrawl.md) | https://docs.firecrawl.dev |
| 7 | **Wikipedia / Wikidata** | Stage 3 (bios) | [`wikipedia-wikidata.md`](./wikipedia-wikidata.md) | https://en.wikipedia.org/api/rest_v1 |
| 8 | **OpenAI Whisper** | Stage 6 fallback audio | [`openai-whisper.md`](./openai-whisper.md) | https://platform.openai.com/docs/api-reference/audio |
| 9 | **Supabase** | Always (DB + Auth) | [`supabase.md`](./supabase.md) | https://supabase.com/docs |

---

## Formato estándar de cada doc

Para mantener consistencia, cada doc sigue la misma estructura:

1. **Overview** — qué es, para qué lo usamos en Dauton
2. **Auth** — cómo se autentica (header, query, Bearer, etc.)
3. **Base URL**
4. **Endpoints que usamos** — cada uno con purpose, request shape, response shape útil, gotchas
5. **Rate limits** — números reales, cómo detectarlos, cómo recuperar
6. **Errores** — códigos relevantes y cómo reaccionar
7. **Costos** — free tier, paid tier, cálculo para MVP
8. **Caveats** — cosas que nos han mordido o vamos a necesitar saber
9. **References** — link a doc oficial + a skill en `src/lib/skills/` que lo usa
10. **Last reviewed** — fecha + por quién

---

## Política de update

- Cuando una API cambia (deprecation, nuevo endpoint, rate limit nuevo):
  1. Actualizar el doc local aquí
  2. Bumpear `last_reviewed` a la fecha de hoy
  3. Documentar el cambio en el changelog al final del doc
  4. Buscar referencias a ese endpoint en `src/lib/skills/` y workflows n8n
  5. Actualizar código si aplica
- Review scheduled: cada 6 meses, Luis + Claude revisan cada doc y bumpean `last_reviewed`.
- Si un nuevo API entra en uso, crear su doc aquí ANTES de empezar a implementar.
