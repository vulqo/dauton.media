# Content Engine — Dauton Media

**Owner:** Data & SEO chat (spec) + Engineering (implementación)
**Última actualización:** 2026-04-25 · v0.1
**Status:** spec lista. Implementación bloqueada hasta `[ENG]` ticket abierto.

---

## Tesis

**Cero contenido manual.** Cada página SEO de Dauton Media se genera desde la DB vía template. Cuando Engineering ingestea data nueva, la siguiente revalidate trigger publica páginas nuevas SEO-ready, schema-validated, en todos los idiomas activos. Luis no escribe nada en bloggers/CMS jamás.

Templates SON el contenido. La diferenciación SEO viene de:
1. **Densidad de data verificable** (más cita-able que cualquier blog).
2. **Internal linking estructural** (cada página referencia 5-15 otras del archive).
3. **Schema.org rich** (eligible para rich results en LATAM SERPs).
4. **i18n nativo** (hreflang + URLs traducidas + content traducido).
5. **Velocidad** (SSG + ISR, no SSR; <1s LCP target).

---

## Arquitectura de routes (Next.js App Router con i18n)

### Estructura

```
src/app/[locale]/
├── layout.tsx                     ← root layout con <html lang={locale}>, hreflang, JSON-LD WebSite
├── page.tsx                       ← homepage (/{locale}/)
├── artistas/
│   ├── page.tsx                   ← directorio /{locale}/artistas
│   └── [slug]/
│       ├── page.tsx               ← perfil
│       ├── discografia/page.tsx
│       ├── colaboraciones/page.tsx
│       ├── eventos/page.tsx
│       ├── similares/page.tsx
│       ├── calculadora-ingresos/page.tsx
│       ├── press-kit/page.tsx
│       ├── cronologia/page.tsx
│       └── mejores-canciones/page.tsx
├── canciones/
│   └── [slug]/
│       ├── page.tsx
│       ├── quien-produjo/page.tsx
│       └── samples/page.tsx
├── discos/
│   └── [slug]/
│       ├── page.tsx
│       ├── tracklist/page.tsx
│       └── creditos/page.tsx
├── productores/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── crews/
│   └── [slug]/page.tsx
├── ciudades/
│   └── [slug]/page.tsx
├── generos/
│   └── [slug]/page.tsx
├── eventos/
│   └── [slug]/page.tsx
├── comparar/
│   └── [pair]/page.tsx            ← /{locale}/comparar/apache-vs-akapellah
├── colaboraciones/
│   └── [pair]/page.tsx
├── decadas/
│   └── [decade]/[country]/page.tsx
└── [...slug]/                     ← legacy slug fallback via slug_history
```

### Locale routing

- `/{locale}` con `locale ∈ {es, en, pt}`. ES default, EN/PT post-launch.
- Middleware redirige `/` → `/es/` con detection de Accept-Language fallback a ES.
- URLs traducidas por path segment, no por locale prefix solo:
  - `/es/artistas/canserbero` ↔ `/en/artists/canserbero` ↔ `/pt/artistas/canserbero`
  - **Slug es siempre canónico (ES)**, NO se traduce. Más simple, menos errores, mejor para cross-link.
- Path segments traducidos (`artistas`, `canciones`, etc.) viven en `i18n/routes.ts`:
  ```ts
  export const pathSegments = {
    artists:    { es: 'artistas',  en: 'artists',     pt: 'artistas' },
    songs:      { es: 'canciones', en: 'songs',       pt: 'canciones' },
    albums:     { es: 'discos',    en: 'albums',      pt: 'discos' },
    producers:  { es: 'productores', en: 'producers', pt: 'produtores' },
    crews:      { es: 'crews',     en: 'crews',       pt: 'crews' },
    cities:     { es: 'ciudades',  en: 'cities',      pt: 'cidades' },
    events:     { es: 'eventos',   en: 'events',      pt: 'eventos' },
    compare:    { es: 'comparar',  en: 'compare',     pt: 'comparar' },
    discography: { es: 'discografia', en: 'discography', pt: 'discografia' },
    earnings:   { es: 'calculadora-ingresos', en: 'earnings-calculator', pt: 'calculadora-ganhos' },
    similar:    { es: 'similares', en: 'similar',     pt: 'similares' },
    pressKit:   { es: 'press-kit', en: 'press-kit',   pt: 'press-kit' },
    timeline:   { es: 'cronologia', en: 'timeline',   pt: 'cronologia' },
    bestSongs:  { es: 'mejores-canciones', en: 'best-songs', pt: 'melhores-cancoes' },
    whoProduced: { es: 'quien-produjo', en: 'who-produced', pt: 'quem-produziu' },
    samples:    { es: 'samples',   en: 'samples',     pt: 'samples' },
    tracklist:  { es: 'tracklist', en: 'tracklist',   pt: 'tracklist' },
    credits:    { es: 'creditos',  en: 'credits',     pt: 'creditos' },
    collaborations: { es: 'colaboraciones', en: 'collaborations', pt: 'colaboracoes' },
    decades:    { es: 'decadas',   en: 'decades',     pt: 'decadas' },
    genres:     { es: 'generos',   en: 'genres',      pt: 'generos' },
  };
  ```

### Library

- **next-intl** v3+ — routing + translations + middleware.
- Decision contra `next-i18next`: next-intl es 1st class App Router, lighter, mejor TypeScript.

---

## i18n architecture

### Translation files

```
src/messages/
├── es.json                        ← base (dauton primary)
├── en.json
└── pt.json
```

### Namespace structure (jerárquico)

```json
{
  "common": {
    "site_name": "Dauton Media",
    "tagline": "El archivo del rap hispanohablante.",
    "cta_view_profile": "Ver perfil completo",
    "footer_credits": "..."
  },
  "navigation": { "artists": "Artistas", "songs": "Canciones", ... },
  "templates": {
    "artist_profile": {
      "meta_title": "{stage_name} — Biografía, discografía y ingresos | Dauton",
      "meta_description": "Conoce todo sobre {stage_name}: discografía completa, colaboraciones, productores e ingresos estimados en Spotify.",
      "h1": "{stage_name}",
      "section_discography": "Discografía",
      "section_collaborations": "Colaboraciones",
      "section_earnings": "Ingresos estimados",
      ...
    },
    "earnings_calculator": {
      "meta_title": "¿Cuánto gana {stage_name} en Spotify? | Dauton",
      "meta_description": "Estimación de ingresos mensuales de {stage_name} en streams basada en data pública.",
      "h1": "¿Cuánto factura {stage_name}?",
      "disclaimer": "Estimación basada en data pública...",
      "low_band": "Mínimo estimado",
      "high_band": "Máximo estimado",
      ...
    },
    "who_produced": {
      "meta_title": "¿Quién produjo \"{track_title}\" de {stage_name}? | Dauton",
      "h1": "Productor de \"{track_title}\"",
      ...
    },
    ...
  },
  "errors": { ... },
  "schema": {
    "person_description_template": "{stage_name} es {role} {origin}. {short_bio}",
    "track_description_template": "..."
  }
}
```

### Dynamic content (texto generado desde DB)

- Slugs **NO** se traducen.
- `description_es`, `bio_short`, `bio_long` en DB **SÍ** se traducen vía pipeline P9 (nuevo, ver abajo).
- Stage names, titles, álbum names → **NO** se traducen (son nombres propios). El template wrapper sí: el `meta_description` que dice "Conoce a..." se traduce, el nombre del artista no.

### Pipeline P9 — Auto-traducción de campos editoriales

**Trigger:** después de P2 (full artist enrichment) o cuando `bio_short.es` cambia.

**Steps:**
1. Detectar locales activos (es default, en/pt si flag activo).
2. Para cada locale ≠ es:
   - Llamar Claude Haiku con prompt: "Traduce este texto al {locale} manteniendo nombres propios y términos del rap. Output JSON: `{translation: '...'}`."
   - Almacenar en columna `bio_short_{locale}` (o tabla `entity_translations` polimórfica).
3. Marcar status = `auto_translated`. Editor humano puede revisar y promover a `verified`.

**Cost:** ~$0.0005 por traducción de bio_short. 1000 artistas × 2 locales = $1. Negligible.

### Hreflang

Cada page emite en `<head>`:
```html
<link rel="alternate" hreflang="es" href="https://dauton.media/es/artistas/canserbero" />
<link rel="alternate" hreflang="en" href="https://dauton.media/en/artists/canserbero" />
<link rel="alternate" hreflang="pt" href="https://dauton.media/pt/artistas/canserbero" />
<link rel="alternate" hreflang="x-default" href="https://dauton.media/es/artistas/canserbero" />
```

Generado automáticamente desde `src/lib/seo/meta/alternates.ts`.

---

## Schema.org JSON-LD

### Reglas

1. Cada página emite **exactamente** los schemas que aplican. Sin schemas redundantes.
2. JSON-LD es el único formato (no microdata, no RDFa).
3. Validación pre-deploy: build falla si Schema.org Validator API rechaza.
4. Nested + `@graph` para múltiples entidades por página.

### Schemas por tipo de página

| Página | Schemas |
|---|---|
| Homepage | `WebSite` (con SearchAction sitelinks) + `Organization` |
| `/artistas/{slug}` | `Person` (o `MusicGroup` si crew) + `BreadcrumbList` + `ItemList` (top tracks) |
| `/canciones/{slug}` | `MusicRecording` + `BreadcrumbList` + `MusicAlbum` (parent release) |
| `/canciones/{slug}/quien-produjo` | `MusicRecording` + `Person` (productor) + `FAQPage` ("¿Quién produjo...?") + `BreadcrumbList` |
| `/discos/{slug}` | `MusicAlbum` + `ItemList` (tracks) + `BreadcrumbList` |
| `/eventos/{slug}` | `MusicEvent` + `Place` (venue) + `Offer` (link a ticket si aplica) |
| `/calculadora-ingresos/{slug}` | `Person` + `FAQPage` (preguntas comunes) + `BreadcrumbList` |
| `/comparar/{a}-vs-{b}` | 2x `Person` + `WebPage` con `about` array |
| `/ciudades/{slug}` | `Place` + `ItemList` (artistas de la ciudad) |
| `/productores/{slug}` | `Person` (con `jobTitle: 'Music producer'`) + `ItemList` (tracks producidos) |

### Generators

```
src/lib/seo/schema/
├── person.ts          ← Person + MusicGroup
├── musicAlbum.ts
├── musicRecording.ts
├── musicEvent.ts
├── breadcrumb.ts      ← genérico, recibe array de segments
├── faqPage.ts         ← genérico, recibe array de Q&A
├── itemList.ts        ← genérico, recibe items + URL pattern
├── webSite.ts         ← homepage solo
├── organization.ts
└── index.ts           ← compose por route
```

Cada generator es función pura: recibe entity desde DB, retorna JSON-LD object. Composición en `index.ts`:

```ts
export function getSchemaForRoute(route: RouteType, data: any, locale: string): JsonLd[] {
  switch (route) {
    case 'artist_profile': return [
      personSchema(data.person, locale),
      breadcrumbSchema([...]),
      itemListSchema(data.topTracks, locale),
    ];
    // ...
  }
}
```

### Validación

Pre-deploy hook (Vercel build step) corre:
```sh
npm run validate:schema
```

Que internamente:
1. Crawl 50 sample URLs (1 por route type).
2. Extract JSON-LD del HTML rendered.
3. POST a Schema.org Validator API.
4. Si cualquier error de schema → build fail.

---

## Templates por route — spec

Cada route type tiene un spec con: title, meta description, H1, content sections, internal links, schema.

### Spec template (formato canónico)

```yaml
route: /{locale}/artistas/{slug}
locales: [es, en, pt]
data_source:
  - people WHERE slug = ? AND visibility = 'public'
  - JOIN tracks via featured_artists (top 10 by popularity)
  - JOIN releases (top 5 by release_date)
  - JOIN collaborations (top 10)
  - JOIN production_credits (where person is producer)
  - JOIN cities, genres
title_template:
  es: "{stage_name} — Biografía, discografía y análisis | Dauton"
  en: "{stage_name} — Biography, discography and analysis | Dauton"
  pt: "{stage_name} — Biografia, discografia e análise | Dauton"
meta_description_template:
  es: "Conoce todo sobre {stage_name}: discografía completa, colaboraciones, productores y data verificable. Archivo del rap hispanohablante."
  en: "Everything about {stage_name}: complete discography, collaborations, producers, and verified data. Latin hip-hop archive."
  pt: "Tudo sobre {stage_name}: discografia completa, colaborações, produtores e dados verificáveis."
og_image:
  generator: "vercel-og"
  template: "artist-card"
  data: [stage_name, photo_url, top_genre]
h1: "{stage_name}"
sections:
  - id: "header"
    content: photo + name + city + genre + verified badge
  - id: "stats"
    content: "{spotify_followers} seguidores · {tracks_count} canciones · {collaborations_count} colaboraciones"
  - id: "bio"
    content: bio_long fallback bio_short fallback empty_state
  - id: "discography_preview"
    content: top 5 releases con ItemList JSON-LD
    cta: link a /artistas/{slug}/discografia
  - id: "top_tracks"
    content: top 10 tracks con ItemList
  - id: "collaborations_preview"
    content: top 10 con CTA a /artistas/{slug}/colaboraciones
  - id: "produced_by"
    content: lista de productores con count y link a /productores/{slug}
  - id: "similar_artists"
    content: top 5 similar (algorithm en tool #7)
internal_links:
  - to: /artistas/{slug}/discografia
    anchor_template: { es: "Discografía completa de {stage_name}", en: "...", pt: "..." }
  - to: /artistas/{slug}/colaboraciones
  - to: /artistas/{slug}/calculadora-ingresos
  - to: /ciudades/{origin_city.slug}
  - to: /generos/{primary_genre.slug}
  - to: /artistas/{collaborator.slug} (top 5)
  - to: /productores/{producer.slug} (top 3)
schema:
  - Person (con sameAs: spotify_id, genius_id, musicbrainz_id)
  - BreadcrumbList
  - ItemList (top tracks)
  - FAQPage (auto-generated: "¿De dónde es {stage_name}?", "¿Cuántos años tiene {stage_name}?", "¿Cuántas canciones tiene {stage_name}?")
sitemap:
  priority: 0.9 (primary content)
  changefreq: weekly
indexnow_on_change: true
```

Cada route nuevo se especifica con este template y vive en `src/lib/seo/routes/{route_id}.spec.yaml`. Engineering implementa la page.tsx contra el spec.

### Specs prioritarios para shipping

Sprints next entregables (orden):

1. `artist_profile` (página principal del archive — bloqueante)
2. `track_detail`
3. `release_detail`
4. `who_produced` (tool #1)
5. `discography` (tool #3)
6. `earnings_calculator` (tool #2)
7. `producer_profile` (entidad nueva, alta prioridad SEO)
8. `crew_detail`
9. `city_detail`
10. `events_detail` + `events_directory`
11. `comparison`
12. `collaborations_pair`

---

## Internal linking strategy (auto)

Internal linking NO es manual. Reglas vivas en `src/lib/seo/internal-links.ts` que cualquier template invoca:

```ts
linksForArtist(person, max = 12) → Link[]
linksForTrack(track, max = 12) → Link[]
linksForCity(city, max = 20) → Link[]
linksForProducer(producer, max = 15) → Link[]
```

Cada función:
1. Genera N links candidatos basados en relaciones DB.
2. Rankea por: relevance score + completeness score del target + freshness.
3. Diversifica: max 3 links a misma entity type, balance con cities/genres/producers.
4. Anchor text rotativo (3 variants por target, sample randomizado consistente por seed).

**Output structure:**
- 60% in-content links (renderizados dentro de prose).
- 20% sidebar / "related" widgets.
- 20% breadcrumbs + nav.

**Orphan detection:** worker semanal corre query `pages WITHOUT incoming links`. Si encuentra orphans, agrega al hub (homepage o directory) o aumenta link weight desde entities relacionadas.

---

## Sitemap dinámico

### Estructura

```
/sitemap.xml                        ← sitemap index
├── /sitemap-static-{locale}.xml    ← homepage, about, etc. por locale
├── /sitemap-artists-{locale}.xml   ← 1 por locale, max 50k URLs
├── /sitemap-tracks-{locale}.xml    ← shardeado si >50k
├── /sitemap-tools-{locale}.xml     ← landings de tools
├── /sitemap-cities-{locale}.xml
├── /sitemap-events-{locale}.xml
└── /sitemap-images.xml             ← imágenes de artists/releases con captions
```

### Build

- Generación on-demand via Vercel ISR + Next.js Route Handler.
- Cache 1h.
- Cada URL emite `<lastmod>` desde `updated_at`, `<changefreq>` desde route spec, `<priority>` desde route spec.
- `<xhtml:link rel="alternate" hreflang>` para cada locale.

### Push a buscadores

- **IndexNow** auto-push en cada `revalidatePath()` que cubra una URL crítica.
- **Bing Webmaster** sitemap submit manual al inicio + verify auto-discovery.
- **Google Search Console** cuando se conecte el dominio custom.

---

## Open Graph + Twitter Cards

### OG image generator (Vercel OG / Satori)

```
src/app/api/og/[type]/route.ts
```

Templates por type:
- `artist-card`: photo + stage_name + city + verified badge
- `track-card`: cover + track_title + artist_name
- `tool-card`: "¿Cuánto gana X?" / "¿Quién produjo Y?" + brand
- `comparison`: 2 photos + nombres + "VS"

OG image URL es deterministic: `/api/og/artist-card?slug={slug}&locale={locale}`. Cache eternamente — invalida solo si photo cambia.

### Meta tags por page

Centralizados en `src/lib/seo/meta/templates.ts`. Cada route invoca su template, recibe object `{title, description, ogImage, ogType, twitterCard, alternates}`, lo emite en `generateMetadata`.

---

## Indexing strategy

### Phased indexing

No publicamos las 8000 páginas el mismo día. Risk de soft-404 si data delgada.

**Phase 1 (week 1-2 post-launch):**
- 50 pillar artists (completeness > 70%)
- Their tracks + releases con data rica
- 1-2 herramientas P1 conectadas a esos artistas

**Phase 2 (week 3-6):**
- Release lock: solo artistas con completeness > 50% se publican.
- Los demás quedan `visibility = 'review'` hasta que ingestion complete.
- Sitemap solo incluye public.

**Phase 3 (month 2-3):**
- Open archive: completeness > 30%.
- Programmatic city pages, producer pages, comparison pages activas.

### Robots.txt

```
User-agent: *
Allow: /

# Block draft/review pages
Disallow: /es/_drafts/
Disallow: /en/_drafts/
Disallow: /pt/_drafts/

# Sitemaps
Sitemap: https://dauton.media/sitemap.xml
```

API y admin no llevan robots — se protegen vía middleware con `noindex` header.

### Canonicals

- `<link rel="canonical">` en cada page apunta a la URL del current locale.
- Variantes del mismo content (paginated, filtered) usan `?page=N` con `<link rel="prev/next">` si aplica, o `noindex` para filters.

---

## FAQ generation (programmatic)

Cada perfil de artista emite un FAQ schema con 5-8 Q&As auto-generados desde DB:

```
¿De dónde es {stage_name}? — {origin_city.name}, {country.name}.
¿Cuántos años tiene {stage_name}? — {age} años (nacido el {birth_date}).
¿Cuántas canciones tiene {stage_name}? — {count} canciones registradas.
¿Quién produce a {stage_name}? — Sus productores principales son {producers}.
¿Con quién ha colaborado {stage_name}? — Top colaboradores: {collaborators}.
¿Cuál es el último álbum de {stage_name}? — {latest_release.title} ({year}).
¿Cuál es el género de {stage_name}? — {primary_genre}.
```

Plantillas en `src/lib/seo/faq/templates.ts`. Renderiza solo Q&As cuyas respuestas no son null. Si menos de 3 disponibles, no emite FAQPage schema (Google penaliza FAQs delgados).

---

## Performance targets

| Métrica | Target | Tool de medición |
|---|---|---|
| LCP (homepage) | < 1.5s | Cloudflare Web Analytics + Lighthouse |
| LCP (artist profile) | < 2.0s | same |
| INP | < 200ms | same |
| CLS | < 0.05 | same |
| TTFB | < 400ms | Vercel Analytics |
| Lighthouse Perf | > 95 | Lighthouse CI gate |
| Lighthouse SEO | = 100 | Lighthouse CI gate (build fail si < 100) |
| Lighthouse A11y | > 95 | Lighthouse CI |

Build fail si gates Lighthouse no se cumplen en sample de 20 URLs random.

---

## Last reviewed

- 2026-04-25 — Data & SEO chat — v0.1 inicial.
