# Content Plan by Platform

**Department:** Marketing & Growth
**Owner:** Community & Outreach
**Last updated:** 2026-04-24
**Status:** v1 — propuesta concentrada en 4 plataformas core, viralidad-first.

---

## Decisión: 4 plataformas core en MVP

Founder pidió pocas plataformas dominadas vs muchas medio-hechas. Resultado:

| Plataforma | Rol | Por qué |
|---|---|---|
| **TikTok** | Viralidad #1 | Algoritmo regala alcance a contenido nicho. Audiencia hispana 18-35 vive ahí. Path a Creator Rewards (10K + 100K views/30d). |
| **Instagram** | Anchor | Diáspora 25-40. Reels + Carousels. Path a brand collabs (5-10K followers). |
| **YouTube Shorts** | SEO + Authority + Path partner | Indexa en Google. Path a Tier 1 monetización (500 subs + 3M Shorts views/90d). |
| **Newsletter (Beehiiv)** | Retention + relación deep | Audiencia engaged. Personalización via DB. Path a sponsorships. |

**Cross-post pasivo (free, sin esfuerzo extra):**
- **Threads** auto-cross desde IG.
- **Spotify playlists** update manual quincenal.

**Deferred a post-MVP:**
- X / Twitter (mes 5+ cuando hablemos a periodistas con press kit).
- Discord (mes 6+ cuando tengamos audiencia para sustentar).
- Bluesky, Reddit, WhatsApp, Telegram, LinkedIn — todos al backlog.

Ya hablo de retiro de plataformas: la energía que se ahorra por NO postear en 8 plataformas vacías la invertimos en hacer 4 muy bien.

---

## Los 4 pilares de contenido

Aplican a TODAS las plataformas, adaptados al formato.

### Pilar 1 — Contenido dinámico desde el archivo (40% del volumen)

**Esto es el corazón.** El archivo + DB + ingestion están constantemente generando eventos. Cada evento es contenido latente.

Eventos que generan posts automáticos:

| Trigger en DB | Post generado |
|---|---|
| Nuevo `release` ingested para artist tracked | "Nuevo: [Artist] · [Release] · [genre tag]" |
| Aniversario de release importante (`released_at == today`) | "Hoy hace X años: [release]" |
| `career_event` con tipo `death` y aniversario | "Hace X años perdimos a [artist]. Su archivo:" |
| Nueva `production_credit` detectada | "[Productor X] tiene crédito de producción en [track]" |
| Nuevo `collaboration` detectado | "[A] x [B] — colaboración detectada en [release]" |
| `entity_stats` milestone (ej. 1M streams en track) | "[Track] cruzó 1M streams en Spotify" |
| `event` próximo en ciudad de user | "[Artist] toca en [city] · [date] · tickets" |
| Press mention nueva tier 1-2 | "[Outlet] habló de [artist]: [link]" |
| User contribution aprobada | "Gracias a [user] agregamos [data]" |
| Hito de archive (`completeness == 100%`) | "[Artist] llegó a 100% completeness" |

Pipeline:
```
SUPABASE EVENT DETECTED (cron + triggers)
  → caption_generator (Gemini API o Claude Max manual)
  → image_generator (Canva template programático o Ideogram free)
  → schedule en Postiz
  → log en social_posts_log
```

**Ventaja:** Luis no escribe nada. El archivo se promueve solo. Exactamente lo que él necesita (orquestador, no ejecutor).

### Pilar 2 — Datos sorprendentes curados (25%)

Hechos que requieren contexto humano que la DB no captura. Curated weekly por whoever drive content (Luis o agent).

Ejemplos:
- "¿Sabías que [productor X] también produjo [hit Y]?"
- "[Artist] grabó [álbum] en una habitación con sábanas en las paredes."
- "Antes de ser [stage name], se llamaba [otro nombre]."
- "[Artist] y [otro Artist] no han colaborado nunca aunque ambos crecieron en [barrio]."

Estos viven en un Notion DB de "facts pendientes" que Luis o agent llena cuando aparece dato curioso. Pipeline los procesa para postear según calendar.

### Pilar 3 — Discovery flash (20%)

Semanal: artista del mes + presentación corta (60-90s en TikTok/Reels, párrafo en newsletter).

Criterio para escoger:
- Completeness ≥75% en archive.
- Spotify popularity 30-60 (no top mainstream, no completamente unknown).
- Algún hook narrativo (origen, productor unique, conexión sorprendente).

Format:
- TikTok/Reels: 60s con clips del artista (audio Spotify + visual del perfil + 3 datos overlay).
- IG carousel: 5 slides "Conoce a [Artist]" + link en bio.
- YouTube Short: derivado del Reel.
- Newsletter: 1 párrafo en bloque "Profundidad".

### Pilar 4 — Proof of work + community (15%)

Transparencia y gratitud.

Ejemplos:
- "+43 tracks nuevos en el archivo esta semana." (auto-generated del query `SELECT count() WHERE created_at > NOW() - 7 DAYS`).
- "Gracias a @user por confirmar la fecha de [release]."
- "Llegamos a 10K artistas en archive."
- "Roadmap actualizado: lo que viene en noviembre."

---

## TikTok — el motor viral

### Audiencia objetivo

Gen Z + millennials hispanos 16-30. Diáspora venezolana en Miami/Madrid/BOG/NYC. Hip-hop curiosos. Nostalgicos del rap de 2010s.

### Cadencia y formatos

**Cadencia mes 1-2:** 3 posts/semana. Mes 3+: 5/semana.

**Distribución de formatos:**

| Formato | % | Producción | Ejemplo |
|---|---|---|---|
| **Data bomb** (30s) | 40% | Auto desde DB | Texto animado sobre clip de archivo: "Hoy hace 14 años salió Apocalipsis. 0 singles oficiales. Cambió todo." |
| **Aniversario emocional** | 20% | Mixto auto + curado | Foto + audio + datos sobre fecha clave |
| **¿Sabías que?** | 20% | Curado manual | Hook 3s + 3 datos + payoff |
| **Discovery del mes** | 15% | Curado | 60s presentando artista poco conocido |
| **Behind the archive** | 5% | Casual | Screenshot del admin + comentario corto |

### Anatomía del TikTok ganador para Dauton

```
0-1s:  HOOK visual (clip + overlay text BIG)
       "Canserbero grabó 'Es Épico' en una laptop prestada."

1-3s:  Confirma curiosidad
       (clip del track + foto de la época)

3-15s: 2-3 datos rápidos overlay
       - "El productor era Kpú, no aparecía en créditos oficiales"
       - "El sample lo encontró en 5 minutos"
       - "Tardó 14 años en tener el reconocimiento que merece"

15-25s: PAYOFF (gancho emocional)
       "Por eso tu archivo tiene su perfil completo. Para que esto no se pierda."

25-30s: CTA discreto
       "→ dauton.media/artists/canserbero"
       (no "follow me!" — "→ link en bio" con texto del Reel)
```

### Hashtags TikTok

Mix nicho + amplio. 5-7 total.

```
#rapvenezolano #canserbero #apache #rapenespanol #hiphoplatino #culturafromvene #archivo
```

**No usar:**
- `#fyp`, `#parati` (algoritmo los penaliza por overuse + no signal).
- Hashtags trending no relacionados.
- Más de 7 (looks like spam).

### Música y audio

- **Audio nativo del archivo** (clips de Spotify de los tracks que mencionamos) cuando es legal usarlo. Bajo "fair use" como referencia editorial.
- **Trending sounds** de TikTok solo si encajan con el formato sobrio. Si suena cringe, no lo forzamos.
- **Voiceover con ElevenLabs** para mini-docs y data bombs.

### Hora de publicar

Para audiencia hispana 18-35:
- **Hora prime LATAM:** 19:00-22:00 ART (UTC-3).
- **Hora prime España:** 21:00-23:00 CEST (UTC+2).
- **Hora prime USA East:** 19:00-22:00 EST (UTC-5).

Postiz schedule en estas ventanas. No hay magic time, hay test.

### Métricas TikTok target (a 6 meses)

- 3K followers
- 5K avg views por post
- 10% engagement rate
- 2-3 posts con > 50K views
- Path al Creator Rewards (10K + 100K views/30d) probable mes 8-12 post-launch.

### Calendar TikTok (semana típica)

```
Lunes:    Data bomb (auto desde aniversario fin de semana)
Martes:   ¿Sabías que? (curado)
Miércoles: Discovery flash o Behind the archive
Jueves:   Data bomb (release nuevo si hubo)
Viernes:  Aniversario emocional o data bomb
Sábado:   skip o boost de un post de la semana
Domingo:  skip
```

---

## Instagram — anchor de marca

### Audiencia objetivo

Diáspora venezolana 25-40. Profesionales con nostalgia cultural. Padres/madres jóvenes que crecieron con Vagos y Maleantes, Apache, Canserbero.

### Cadencia y formatos

**Cadencia:** 3-4 posts feed/semana + stories diarias + 2-3 reels/semana.

**Distribución:**

| Formato | % | Producción |
|---|---|---|
| **Reels** (derived from TikTok) | 45% | Auto cross-post adaptado |
| **Carousels** | 30% | Canva templates + data |
| **Single post** | 15% | Foto + caption denso (heritage moments) |
| **Stories** | diario | Polls, questions, behind-the-archive |

### Carousels — el formato Instagram fuerte para Dauton

**Estructura típica de carousel:**

```
SLIDE 1:  Hook — title + visual fuerte
          "5 productores que definieron el rap caraqueño"

SLIDE 2-9: 1 productor por slide
           - Foto archivo
           - Nombre + año activo
           - 2-3 datos
           - Track icónico (con link en bio)

SLIDE 10: CTA + link
          "Perfiles completos en dauton.media"
```

**Templates a tener en Canva:**
1. "X cosas que [tema]" — listicle visual sobrio.
2. "[Artist] · timeline" — vida en 9 slides.
3. "Hoy hace X años" — single visual con contexto.
4. "Quote with context" — frase + de quién + cuándo + por qué importa.
5. "Connection map" — texto-only visual de "A ↔ B ↔ C" sin grafo complejo.

### Stories — uso diario

- Polls de "qué prefieres": "Mejor álbum de Canserbero?" → Apocalipsis I vs II vs Indigo.
- Question stickers: "Qué artista querés ver en el archivo?" → genera contenido + DB seed inputs.
- Re-share de carousel feed (extiende vida del post).
- Behind-the-archive: screenshots del admin con comentario "Hoy llegamos a 100 perfiles ricos".
- Repost orgánico de menciones de Dauton (cuando llegue).

### Bio y link in bio

```
Archivo del rap hispanohablante.
Foco: Venezuela + diáspora.
dauton.media/[link]
```

**Link in bio:** página custom `dauton.media/links` (no Linktree) con 5-8 items rotativos:
- Waitlist newsletter
- Última adición destacada
- Tool más nueva
- Discord (cuando exista)
- Ko-fi (cuando se active)
- Press / About

### Hora de publicar IG

- Reels: igual que TikTok (19-22 ART).
- Feed posts: 12-14 ART (almuerzo) y 21-22 ART (noche).
- Stories: throughout day.

### Brand collabs (path a monetización)

A partir de 5K-10K followers podemos pitch a marcas alineadas:
- **Marcas de música/streaming** (Bandcamp, Audius, Beatport).
- **Marcas culturales latinas** (no fast fashion).
- **Eventos / festivales** latinos diáspora.
- **Editoriales académicas** con catálogos sobre Latam culture.

Rates 2026 mercado:
- 5-10K followers + niche engaged: $200-500 por Reel.
- 10-25K: $500-1.5K por Reel.
- 25-50K: $1.5K-3K por Reel.

**Decisión:** brand collabs solo cuando NO comprometan integridad editorial. Ningún brand que afecte cómo presentamos un artista. Mantener autoridad > short revenue.

### Métricas IG target (a 6 meses)

- 5K followers
- 1K reach avg post feed
- 15K views avg Reel
- 50% saves rate (significa contenido valioso, no solo entretenimiento)
- 2-3 menciones orgánicas de cuentas culturales relevantes

---

## YouTube Shorts — path a Partner Program

### Audiencia objetivo

Misma que TikTok pero con sesgo a 25+ que descubre vía Google search ("rap venezolano historia") + audience que no usa TikTok.

### Cadencia y formatos

**Cadencia:** 2-3 Shorts/semana (derivados del flow TikTok/Reels).

**Diferencia con TikTok:** YouTube Shorts vive en la cola del algoritmo de YouTube + indexado en Google. Esto significa:
- Title + description + tags importan MUCHO más que en TikTok.
- Video con título tipo "Por qué Canserbero grabó Apocalipsis en una laptop prestada" rankeable en Google directo.
- Hashtags en description (no caption visible).

### Optimization YouTube Shorts

**Title:**
- Format: "[Artist] [evento/dato] [contexto/year]"
- Ejemplos: "Apache colaboró con 12 productores diferentes solo en 2015"
- Keywords ES + EN cuando aplica ("rap venezolano", "venezuelan rap").

**Description:**
- 3-4 líneas con context.
- Link al perfil en archive.
- 5-10 hashtags relevantes al final.

**Tags:**
- Primary: nombre del artista, género, ciudad, year.
- Secondary: temas relacionados.

**Thumbnail (custom):**
- Aunque Shorts no muestra thumbnail en feed móvil, sí lo muestra en search results y desktop.
- Usar mismo estilo Canva con DS.

### Long-form YouTube — deferred a etapa 3+

Los mini-docs largos (8-15 min) se evalúan post-launch. Por ahora solo Shorts. La razón: long-form requiere consistencia editorial alta + production value que ahora no tenemos.

### Path a YouTube Partner Program

**Tier 1 (Fan Funding):** 500 subs + 3M Shorts views en 90 días o 3K watch hours.
- Realista mes 6-9 post-launch.
- Desbloquea: Super Thanks (donations), channel memberships básicos.

**Tier 2 (Ad Revenue):** 1K subs + 10M Shorts views en 90 días o 4K watch hours.
- Realista mes 12+ post-launch (depende viralidad).
- Desbloquea: ads en Shorts feed, full ad revenue.

**Estrategia:**
- Foco en Shorts views, no ads. Tier 1 es suficiente al inicio.
- Cuando un Short hace > 100K views, postear 2-3 más sobre mismo artist/tema para sustain interest.

### Métricas YouTube target (a 6 meses)

- 500 subs (target Tier 1).
- 1M Shorts views totales en mes 6.
- 5+ Shorts con > 10K views.
- 20+ canales latinos suscribiendo (signal).

---

## Newsletter — retention engine

Doc dedicado: [`newsletter-dynamic-content.md`](newsletter-dynamic-content.md).

Resumen:

| Producto | Cadencia | Audiencia |
|---|---|---|
| **"Archivo Abierto" weekly** | sábado AM | All subs (genérico) |
| **"Tu Mes en Dauton" monthly** | primer lunes mes | Subs con favoritos seleccionados |
| **Event-triggered** | inmediato | Subs siguiendo artist específico cuando hay novedad |

Stack: **Beehiiv** (broadcast) + **Resend** (transaccional/triggered).

---

## Cross-platform automation flow

```
EVENTO EN SUPABASE
  ↓
event_classifier (decide formato + plataformas)
  ↓
parallel:
  ├─ TikTok adapter   → script + clip + voz + schedule Postiz
  ├─ IG adapter       → carousel images Canva API + caption + schedule
  ├─ YouTube adapter  → derivado del TikTok + título SEO + tags + schedule
  ├─ Newsletter buffer → guarda evento para próximo digest
  └─ Threads adapter  → auto-cross from IG
  ↓
log en social_posts_log
  ↓
24/48/72h post: scrape metrics → update analytics
```

Ownership: Engineering implementa adapters + scheduler. Community & Outreach define prompts + revisa output antes de programar masivo.

---

## Calendar maestro semanal (vista resumida)

Suponiendo automation activa post-Sprint 5:

| Día | TikTok | IG | YT Short | Newsletter |
|---|---|---|---|---|
| Lun | 1 (data bomb auto) | 1 carousel (curado) | 1 (derived) | — |
| Mar | 1 (sabías que) | 1 reel (derived) | — | — |
| Mié | — | 1 carousel | 1 (data bomb derivado) | — |
| Jue | 1 (data bomb auto) | — | — | — |
| Vie | 1 (discovery o aniversario) | 1 reel + 1 feed | 1 (derived) | — |
| Sáb | — | 1 reel | — | "Archivo Abierto" weekly |
| Dom | — | — | — | — |

**Total semanal:**
- TikTok: 4 posts
- Instagram: 5 posts (mix reels + carousels + 1 feed)
- YouTube Shorts: 3
- Newsletter: 1
- Stories IG: diario (no contadas en tabla)

**Total mensual:**
- ~16 TikToks
- ~20 IG posts
- ~12 Shorts
- 4 newsletters

Realista para automation + 1-2 horas Luis/semana de review.

---

## Lo que NO hacemos por plataforma

### TikTok
- ❌ Trends que no encajen con tono.
- ❌ Hashtags `#fyp #parati` (penalizados).
- ❌ Cambiar voiceover entre videos (mantener voz consistente).
- ❌ Stitch de drama o beef.

### Instagram
- ❌ Posts diarios saturando feed.
- ❌ Compras de followers / engagement pods.
- ❌ Reels de 90s (algoritmo prefiere 30-60).
- ❌ Carousel sin slide CTA al final.

### YouTube
- ❌ Misleading thumbnails / clickbait titles.
- ❌ Long-form sin haber dominado Shorts antes.
- ❌ Tag spam.
- ❌ Re-uploads sin razón (penaliza canal).

### Newsletter
- Ver `newsletter-dynamic-content.md` para detalle.

---

## Validation cycle

Antes de scale automation, testear cada formato 5-7 veces manualmente y revisar metrics:
- Si engagement < 50% del benchmark, iterar formato (no escalar broken).
- Si engagement consistente, automate.

Tiempo invertido en validation: ~2 semanas de cada formato antes de pasar a auto.

---

*See also: [`marketing-strategy-v1.md`](marketing-strategy-v1.md) · [`tools-and-apis.md`](tools-and-apis.md) · [`newsletter-dynamic-content.md`](newsletter-dynamic-content.md) · [`monetization-roadmap.md`](monetization-roadmap.md) · [`launch-plan.md`](launch-plan.md)*
