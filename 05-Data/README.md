# 05-Data

**Owner principal:** Data & SEO agent
**Status:** activo

## Qué hay acá

Catálogo de fuentes de datos, documentación de APIs, ingestion pipelines, criterios de QA, seeds curados, SEO research.

## Subfolders + archivos vigentes

| Item | Owner | Status |
|---|---|---|
| `api-docs/` | Data & SEO | live · 9 APIs documentadas (Spotify, MusicBrainz, YouTube, Genius, Brave, Firecrawl, Wikipedia/Wikidata, Whisper, Supabase) |
| `api-docs/README.md` | Data & SEO | índice + template de cómo documentar APIs nuevas |
| `seed/` | Data & SEO | live · seeds curados (k12jamz playlists) |
| `source-catalog.md` | Data & SEO | live · catálogo de fuentes evaluadas |
| `ingestion-pipelines.md` | Data & SEO | live · spec de pipelines |
| `data-qa.md` | Data & SEO | live · criterios calidad |

## Pendientes (para Data & SEO chat)

- `seo-tools-roadmap.md` — ranking de SEO tools candidatas con keyword volumen + complejidad + valor.
- `keyword-research.md` — keywords prioritarias en español.
- Investigación profunda Eventbrite API (founder lo marcó prioridad).
- Investigación Spotify OAuth user flow para recuperar followers/popularity.

## Reglas

- API nueva → doc en `api-docs/` siguiendo template existente.
- SEO tool propuesta → entry en `seo-tools-roadmap.md`.
- Engineering consume specs de acá pero no las modifica — proponen cambios via TASKS.md con tag [DATA-SEO].
- Cada API tiene "last reviewed" en frontmatter o al final del doc; review semestral.
