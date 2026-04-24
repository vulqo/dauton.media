# Social Presence + Automation Plan

**Department:** Marketing / Growth
**Owner:** Luis Figuera
**Last updated:** 2026-04-23
**Status:** draft · plan vivo para fases 1-3

Dauton Media necesita presencia en redes desde antes del launch para
(a) atraer audiencia temprana, (b) validar tono y voz editorial, (c)
generar backlinks y menciones que aceleran SEO y autoridad.

La disciplina no es "postear todos los días". Es **construir sistemas que
mantengan presencia consistente sin que Luis tenga que ejecutar manualmente.**
Luis es orquestador, no ejecutor (ver `MEMORY.md`).

---

## Principios

1. **Automatizable = default.** Si un post se puede generar desde data en
   Supabase, va por automation. Solo override manual para hitos editoriales.
2. **Sobrio, sin hype.** Mismo tono del Design System SKILL.md:
   "autoridad, no arrogancia". Zero emoji decorativo, sí selectivo.
3. **Fuentes citables.** Todo lo que postamos con dato debe linkear a la
   página del entity en dauton.media. La red social es puerta de entrada,
   no destino.
4. **Multi-plataforma desde infra única.** Un generador → múltiples
   platform adapters. No creamos contenido 3 veces.

---

## Fases

### Fase 0 — Reserva de handles (ahora, pre-launch)

**Goal:** evitar squatters. Registrar handles antes que otros lo hagan.

Plataformas para reservar:
- Instagram: `@daauton.media` (confirmar disponibilidad; fallback `@dautonmedia` o `@dauton.archive`)
- Twitter/X: `@dautonmedia`
- TikTok: `@dautonmedia`
- YouTube: canal `@DautonMedia`
- Spotify: cuenta editorial `Dauton Media`
- Threads (Meta): sigue IG, reserve con mismo handle
- Bluesky: `@dauton.media` (usar custom domain)

**Acción Luis:** reservar los 7 handles. Subir logo (monograma desde DS).
Bio estándar: "Archivo del rap hispanohablante. dauton.media" + link.

**Acción Cowork:** guardar handles reservados en `memory/` cuando lo confirmemos.

### Fase 1 — Playlists Spotify propias (mes 1-2, pre-launch)

**Goal:** construir presencia en Spotify antes del sitio, aprovechando
que es la fuente principal de ingesta Y un canal de distribución.

Playlists a crear:
1. **"Dauton Media · Archivo"** — best-of rap VE curado. ~50 tracks. Update
   mensual con adiciones.
2. **"Dauton Media · Nueva Generación"** — 2020-hoy. ~30 tracks. Update
   semanal cuando Stage 4 detecte nuevos releases.
3. **"Dauton Media · Producers VE"** — beats instrumentales de productores
   VE. ~40 tracks. Update mensual.
4. **"Dauton Media · Canserbero & Coros"** — pillar-focused. Una playlist
   por pillar cuando tengamos la data completa (Stage 3).

**Ruta técnica:** una vez tengamos `SPOTIFY_CLIENT_SECRET`, Luis crea las
playlists manualmente desde la cuenta Dauton Media. Después un n8n job
semanal:
1. Query Supabase: nuevos releases de artistas tracked
2. Spotify `POST /v1/playlists/{id}/tracks` → add
3. Regla: no más de 3 additions/semana por playlist (evitar inflación)

**Metric:** followers por playlist, track retention (via Spotify for Artists
si aplica).

### Fase 2 — Post-automation desde Supabase (mes 2-3, pre-launch)

**Goal:** un script genera 3-5 posts/semana desde events en Supabase sin
intervención Luis.

**Event triggers** que se postean automáticamente:
- Nuevo pillar artist alcanza completeness ≥ 90%
- Aniversario de release emblemático (ej. "Hoy hace 14 años salió Apocalipsis")
- Nuevo press mention de tier 1 outlet
- Death anniversaries (con sensibilidad — Canserbero 20 enero)
- Nueva colaboración detectada por ingestion
- Hito de data: "500 tracks archivados", "30 productores documentados"

**Post generator (skill nueva: `social-post-generator`)**:
```
Input:  { event_type, entity, data, platform }
Output: { caption, hashtags[], image_url, card_meta }
```

**Platforms** (adapters):
- **Instagram**: usar Meta Graph API o tool como `Buffer` / `Publer` via n8n
- **Twitter/X**: `X API v2` (paid tier $100/mes mínimo 2024+). Alternative:
  `Typefully` o `Buffer` via IG reuse.
- **Threads**: Meta API misma cuenta IG
- **Bluesky**: `at-proto` API (gratis)
- **LinkedIn**: post manual desde Luis para conexiones music industry

**Imagery:**
- Para posts de artist: OG image generada por Next.js (`/api/og/artist/[slug]`)
  usando el Design System. Genera image con monogram + bio + streaming logos.
- Para data milestones: typographic card, bg `--bg-0`, monograma.

**Cadence target:**
- IG: 4 posts/semana (2 auto + 2 editorial curado Luis)
- Twitter: 8/semana (6 auto + 2 curado)
- TikTok: 1/semana (manual al principio; video-auto viene en Fase 3)

### Fase 3 — Video + audio automation (mes 4-6, post-launch)

**Goal:** vibe de NTS Radio — presencia regular sin que Luis grabe nada.

**Auto-mixtape podcast (semanal):**
- n8n pulls top 10 tracks added this week + 5 classics
- Genera tracklist + intro escrita por Claude (2 min read)
- TTS (ElevenLabs o OpenAI TTS) voice de host consistente
- Append audio → post a Spotify Podcasts + Apple Podcasts vía RSS
- Cost estimate: ~$5-10/mes en TTS

**Video shorts (semanal):**
- Template de 30s: monogram + nombre artista + cita (del transcript extracted
  en Stage 6) + snippet de un track
- Generated con `remotion.dev` (React-based video generation)
- Auto-post a TikTok + Reels + YouTube Shorts via Buffer/Publer
- Cost: compute de remotion render. Si local, $0.

**Newsletter (biweekly):**
- Digest de 5-7 items: new additions, press found, upcoming events, new
  editorial piece
- Generated por Claude desde events de la quincena
- Send via Resend ($20/mes base plan)
- Embed signup form en footer del site

---

## Presencia como media brand (vs. solo archive)

Dauton Media no es solo base de datos — es una voz cultural. Tres
"voces" coexisten en social:

1. **Voz archivista (default, 70% del contenido):** fechas, datos, quotes
   con source, "hoy hace X años…". Sobria, citatoria.
2. **Voz editorial (20%):** opiniones suaves cuando hay razón (aniversario
   importante, muerte, reunión de grupo icónico).
3. **Voz comunitaria (10%):** retweets/shares de artistas del archivo
   cuando ellos anuncian algo importante. Amplificación curada.

Estas tres voces todas usan el mismo tono (sobrio, autoritativo) pero
diferente tipo de contenido.

---

## Métricas de éxito

| Fase | Métrica | Target al launch (mes 6) |
|---|---|---|
| 0 | Handles reservados | 7/7 |
| 1 | Playlists con > 100 followers | 3/4 |
| 2 | Posts/semana avg | 6 |
| 2 | IG followers | 500 |
| 2 | Twitter followers | 300 |
| 3 | Podcast episodes en vivo | 4 |
| 3 | Newsletter subs | 200 |

Tracking: un sheet simple en admin dashboard + Plausible analytics para
tráfico de referral desde social.

---

## Rules of engagement (content moderation)

- **Zero DMs personal.** Dauton Media responde pero no inicia. Si un artista
  o medio quiere colaboración, email `luis@shocompanies.com` (o
  `hola@dauton.media` cuando esté activo).
- **No beef.** Si un artista está en pelea pública, documentamos con
  fuentes (career_event `category='beef'`) pero no tomamos bando en social.
- **Correcciones públicas.** Si alguien nos corrige con fuente válida,
  agradecer, actualizar el entity, y tweet/post "Actualizado con tu aporte".
  Construye trust.
- **Muertes.** Post sobrio ± aniversario. Nunca sensationalizar. Un data
  point + un link al perfil.

---

## Tooling stack

| Layer | Tool | Cost | Status |
|---|---|---|---|
| Post scheduler | Buffer o Publer | $6-15/mes | evaluar |
| Newsletter | Resend | $20/mes | futuro (mes 4) |
| TTS (podcast) | OpenAI TTS o ElevenLabs | $5-20/mes | futuro (mes 4) |
| Video gen | Remotion (self-hosted) | $0 | futuro (mes 5) |
| Analytics social | Plausible (site) + native platform insights | $9/mes | futuro (mes 2) |
| Link in bio | Bento.me o custom page en dauton.media | $0 custom | mes 1 |

---

## Next actions (para Luis)

- [ ] Reservar los 7 handles en Fase 0 (esta semana)
- [ ] Crear cuenta Dauton Media en Spotify (con Premium si vamos a usar
      Spotify for Artists — decisión separada)
- [ ] Decidir: Buffer vs Publer vs custom cuando arranquemos Fase 2
- [ ] Confirmar si queremos podcast o solo newsletter como canal editorial

---

## Plan futuro de content intelligence

Post-launch, considerar construir un "content angle generator" que
combine:
- Trending queries sobre rap latino (Google Trends + Twitter search)
- New releases detected por Stage 4
- Archive gaps (artistas que faltan contexto que cierto Ask demanda)

→ Sugiere al editor (Luis) qué ángulos editoriales tendrían impacto
inmediato. No content posteado sin revisión Luis durante los primeros
6 meses; después, confidence scoring como en ingestion permite auto-post
de low-risk content.

---

*See also: [`05-Data/ingestion-playbook.md`](../_Execution/ingestion-playbook.md) ·
[`03-Design/brand.md`](../03-Design/brand.md) ·
[`04-Editorial/style-guide.md`](../04-Editorial/style-guide.md)*
