# Marketing Strategy v1 — Dauton Media

**Department:** Marketing & Growth
**Owner:** Community & Outreach
**Last updated:** 2026-04-24
**Status:** draft v1 — propuesta macro, pendiente feedback founder.

---

## Tesis

Dauton Media no es un producto que se vende. Es una **autoridad de referencia** que se construye. El marketing no es CTR ni conversión en v1 — es **hacer que la escena del rap hispano reconozca a Dauton como el lugar canónico donde vive su data**.

Éxito del marketing a 12 meses no es "X usuarios registrados". Es:

1. Cuando un periodista cultural busca "rap venezolano historia", encontramos primero.
2. Cuando un artista se googlea a sí mismo, aparecemos en página 1.
3. Cuando un podcast discute la escena, nos citan como fuente.
4. Cuando un fan quiere profundizar, nos bookmarkea.

Eso es el moat. Tráfico, emails y claims son consecuencia.

---

## Diferenciación — contra qué competimos

No competimos contra Genius (letras), Rolling Stone (periodismo), Remezcla (cultura latina amplia), ni Spotify (playlists). Competimos contra **"no existe"**. No hay fuente canónica de data estructurada para el rap hispano, menos aún venezolano.

Nuestro benchmark de producto: **Rate Your Music + Discogs + MusicBrainz**, pero para rap hispano, con tono editorial sobrio y auto-generado. No blog. No listicles. No reseñas. Data + visualizaciones + acceso.

Nuestro benchmark de marca: **The Criterion Collection + Pitchfork Best-Ofs + NTS Radio**. Sobrio, autoritativo, fuera de la carrera del hype.

---

## Audiencias primarias (priorizadas)

### 1. El fan informed (priority 1 — MVP)

El nerd cultural del rap hispano, usualmente 22-40 años, diáspora venezolana en Miami/Madrid/Bogotá/Houston/NYC. Consume Genius, RYM, tiene playlists elaboradas, conoce a Canserbero desde antes de que muriera. Sufre al googlear "productor de Indigo" y encontrar basura. Es nuestro ideal customer profile.

Canales donde vive: **Reddit (r/rapespanol, r/hiphopespanol), Twitter/X (niche rap accounts), YouTube (long-form reviews), Spotify (playlists), Discord (servers de rap)**.

Hook: "Alguien por fin está haciendo esto serio."

### 2. El artista auto-representado (priority 2 — post-Sprint 5)

Artista independiente sin team de management. Usa Spotify for Artists, maneja su propio IG, booka sus shows. Quiere visibilidad + verificación + control de narrativa sin pagar PR.

Canales donde vive: **Instagram (DMs + Reels), WhatsApp, email (si se consigue)**.

Hook: "Ya existe tu perfil, verificalo y tomás control."

### 3. El curador/gatekeeper (priority 3 — pre-launch)

Periodista cultural (Remezcla, Rolling Stone LatAm, Noisey ES, Cromos, El País cultura), DJ de radio universitaria, podcaster latino (Los Primitivos, El Podcast de Maluma — cualquier podcast con componente cultural), library musicologist, booker de festival.

Canales: **email profesional, LinkedIn, Twitter/X**.

Hook: "Tenés acceso anticipado al único archivo estructurado del rap hispano."

---

## Audiencias secundarias (post-MVP)

- Labels (v2 — B2B dashboard).
- Promotores / bookers (v2).
- Academia (research grants potential).
- Brands que buscan autenticidad cultural latina (sponsored content v3+).

---

## Los 4 pilares de contenido

Sin blogs. Sin reviews. Sin "Top 10". El contenido sale del archive + DB. Eliminé visualizaciones complejas (timeline / mapa / grafo) como pilares — el founder ya las descartó como prioridad. Si Data & SEO valida que generan tráfico orgánico, entonces sí, pero como herramientas SEO, no como hooks de social.

### Pilar 1 — Contenido dinámico desde archive + DB (40%) ← **CENTRAL**

Eventos en Supabase generan posts automáticos sin intervención humana. Es el corazón de Dauton: el archive se promueve solo.

| Trigger DB | Post generado |
|---|---|
| Nuevo `release` ingested | "Nuevo: [Artist] · [Release]" |
| Aniversario `released_at` | "Hoy hace X años: [release]" |
| `career_event` muerte / aniversario | "Hace X años perdimos a [artist]" |
| Nueva `production_credit` detectada | "[Productor] tiene crédito en [track]" |
| Nuevo `collaboration` detectado | "[A] x [B] — colab detectada en [release]" |
| Press mention nueva tier 1-2 | "[Outlet] habló de [artist]" |
| User contribution aprobada | "Gracias a [user] agregamos [data]" |
| Hito archive (10K artists, 100% pillar) | "[Hito] alcanzado" |
| Event próximo en ciudad declared | "[Artist] toca en [city] · [date]" |

Pipeline: Supabase event → AI agent draft → Postiz schedule → log + metrics scrape 24/48/72h después.

**Ventaja crítica:** Luis no escribe nada. Cero mantenimiento. Reutiliza la inversión en ingestion.

### Pilar 2 — Datos sorprendentes curados (25%)

Hechos que requieren contexto humano que la DB no captura.

- "¿Sabías que [productor X] también produjo [hit Y]?"
- "[Artist] grabó [álbum] en una habitación con sábanas en las paredes."
- "Antes de ser [stage name], se llamaba [otro nombre]."

Notion DB de "facts pendientes" alimentado weekly por Luis o agent. Pipeline procesa.

### Pilar 3 — Discovery flash (20%)

Artista del mes. Criterio: completeness ≥75% + Spotify popularity 30-60 + algún hook narrativo.

Format: 60-90s clip / 5-slide carousel / 1-paragraph en newsletter.

### Pilar 4 — Proof of work + community (15%)

Transparencia + gratitud + milestones del archive.

- "+43 tracks nuevos en el archive esta semana."
- "Gracias a @user."
- "10K artistas en archive."

Detalle por plataforma con calendarios en `content-plan-by-platform.md`. Doc dedicado newsletter en `newsletter-dynamic-content.md`.

---

## Las 3 voces (coexisten en redes)

1. **Voz archivista (70%):** declarativa, factual, citada. "Apache firmó con X en 2016." No opinión.
2. **Voz editorial (20%):** matizada, con contexto. Aniversarios importantes, hitos culturales, muertes.
3. **Voz comunitaria (10%):** amplificación curada. Retweet de logros de artistas verificados. Nunca controversia, nunca beef.

Las 3 usan el mismo tono sobrio del DS: autoritativo sin arrogancia, cero emojis decorativos. Diferencia es el tipo de contenido, no el estilo.

---

## Funnel conceptual

```
TOP (awareness)    — TikTok, IG Reels, YouTube Shorts, Reddit, X.
                     Objetivo: que descubran Dauton y lo vean como legitimo.

MID (engagement)   — Newsletter, Discord, Spotify playlists.
                     Objetivo: relación recurrente. Bookmark.

BOTTOM (action)    — Profile claim, sugerir corrección, Ko-fi donation,
                     uso de tools SEO.
                     Objetivo: contribución activa al ecosistema.
```

No todos los contenidos convierten a todos los niveles. Es OK tener 80% top-funnel en el primer año — el mid y bottom maduran con el tiempo.

---

## Principios operativos

1. **Automation first.** Si un post se puede generar desde data, va por automation. Manual solo para hitos editoriales específicos.
2. **Multi-plataforma desde infra única.** Un generador → adapters por plataforma. No escribimos 3 veces.
3. **Cero spam.** Outreach es informativo + invita. Si no responden, respetar silencio.
4. **Fuentes citables.** Todo post con dato linka al entity en dauton.media. Redes son puerta, no destino.
5. **No comprar tráfico en v1.** Si un funnel necesita ads para funcionar, algo está mal en el contenido.
6. **Measure twice, post once.** Cada nuevo formato se testea con 3-5 posts antes de escalar.
7. **Founder no ejecuta.** Luis orquesta. Todo lo que Luis tenga que hacer manual > 2 horas/semana es red flag.

---

## KPIs qualitativos (primeros 12 meses)

Metrics binarios (sí/no):

- [ ] ¿Al menos 1 periodista nos citó como fuente en un artículo publicado?
- [ ] ¿Al menos 1 artista mencionó Dauton en su IG o X orgánicamente?
- [ ] ¿Aparecemos en página 1 de Google para "rap venezolano historia"?
- [ ] ¿Algún podcast latino mencionó el archivo?
- [ ] ¿Algún profesor de Latin Studies o musicología nos compartió con estudiantes?

Metrics numéricos (directional, no promesas):

- Tráfico orgánico mensual: baseline 0 → target 10K/mes al mes 6, 50K/mes al mes 12.
- Newsletter subscribers: 0 → 500 al mes 6, 3K al mes 12.
- Artistas con claim completado: 0 → 30 al mes 6, 150 al mes 12.
- Social followers combined (IG+TT+X+YT): 0 → 5K al mes 6, 25K al mes 12.
- Referring domains (Ahrefs): 0 → 20 al mes 6, 100 al mes 12.

---

## Qué NO hacemos

- ❌ Product Hunt launch (audiencia mismatch).
- ❌ Paid influencer posts (comprometería autoridad).
- ❌ Listicles ("27 cosas que no sabías del rap venezolano" — cringe).
- ❌ SEO spam / keyword stuffing.
- ❌ Clickbait / outrage titles.
- ❌ Comentarios públicos sobre beefs activos.
- ❌ Hot takes sobre escándalos.
- ❌ Tomar bando en disputas.
- ❌ Emojis decorativos (regla SKILL del DS).
- ❌ Stories de IG tipo "wake up + coffee".
- ❌ Newsletter con "hola amigos!".
- ❌ Paid ads en v1. Solo orgánico + partnerships.

---

## Cuando sí haríamos paid (v2+)

Solo cuando:
- Hay métrica orgánica demostrada.
- Hay feature específico que se quiere amplificar (ej. calculadora de ingresos tiene 50K views orgánicos → $500 en Meta ads para retarget).
- CAC/LTV hace sentido (post-monetización).
- Presupuesto no compromete cashflow base.

Nunca paid para "hacer awareness de la marca en general". Solo para feature concreto con intent claro.

---

## Dependencies y cross-area

| Requiere | Owner | Status |
|---|---|---|
| Perfiles ricos (Sprint 5 + 7 cerrados) | Engineering | pending |
| Tools SEO publicadas y rankeando | Data & SEO | pending chat creation |
| Legal review de templates + copyright assets | Business & Legal | pending chat creation |
| Dominio `dauton.media` setup + SPF/DKIM/DMARC | Engineering | pending |
| Schema.org MusicGroup en todas las pages de artist | Engineering + Data & SEO | pending |
| OG image auto-generada por entity | Engineering | pending |

---

## Las 4 etapas de trabajo

Founder pidió etapas claras. Estas son.

### Etapa 1 — Foundation (mayo-julio 2026)
- Tooling free-first setup (ver `tools-and-apis.md`).
- 4 plataformas core configuradas: TikTok, IG, YT Shorts, Newsletter.
- Content piloto manual (validar formatos antes de automate).
- Newsletter weekly genérico arranca.
- **Sin monetización.** Ko-fi tampoco aún.

### Etapa 2 — Seeding (agosto-septiembre 2026)
- Pipeline automation desde DB activo (depende Sprint 5+7 cerrados).
- Newsletter "Tu Mes en Dauton" personalizado en beta.
- Outreach masivo a artistas (post artist-outreach.md).
- Press kit publicado.
- **Sin monetización.** Ko-fi soft launch al final del período.

### Etapa 3 — Launch (octubre 2026)
- Dauton Week (sin livestream — 7 días de contenido denso pre-producido).
- Press push con embargo lifts.
- Newsletter especial.
- **Monetización soft:** Ko-fi activo con goals concretos.

### Etapa 4 — Monetization (noviembre 2026 →)
- Activación de paths según thresholds: YouTube Tier 1, Beehiiv Boost, brand collabs IG cuando lleguemos a 5-10K.
- TikTok Creator Rewards cuando hit 10K + 100K views/30d (mes 8-12 probable).
- Detalle completo en `monetization-roadmap.md`.

---

## Próximos pasos

Ver:
- `launch-plan.md` — timeline mes-a-mes hasta octubre 2026.
- `tools-and-apis.md` — stack free-first + APIs con descripciones simples.
- `content-plan-by-platform.md` — calendarios y formatos por plataforma.
- `newsletter-dynamic-content.md` — newsletter dinámico desde DB (incluye "Tu Mes en Dauton" personalizado).
- `monetization-roadmap.md` — paths de monetización por plataforma + etapas.
- `social-platform-playbook.md` — ejecución por plataforma (versión anterior con más plataformas — deprioritizar a las 4 core).
- `../06-Operations/email-discovery-playbook.md` — email harvesting.
- `../06-Operations/artist-outreach.md` — outreach a artistas con perfil.

---

*See also: `launch-plan.md` · `ai-marketing-stack.md` · `social-platform-playbook.md` · `email-marketing-strategy.md` · `content-pillars.md`*
