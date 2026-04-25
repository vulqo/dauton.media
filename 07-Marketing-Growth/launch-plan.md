# Launch Plan — Octubre 2026

**Department:** Marketing & Growth
**Owner:** Community & Outreach
**Last updated:** 2026-04-24 · **rewritten v2**
**Status:** propuesta — pendiente founder feedback.

**Nota:** esta versión reemplaza el launch-plan anterior (estaba escrito bajo la visión "Culture Wiki editorial heavy", ya superada). La nueva visión es fan-first + archivo + tools + zero editorial tradicional.

---

## Launch philosophy

Dauton lanza **silencioso y sustentado**. No buscamos "launch day viral". Buscamos que al terminar el launch month tengamos:

1. 50+ perfiles ricos públicamente explorables.
2. 3 tools SEO activas rankeando para al menos 5 keywords.
3. 500+ emails en newsletter.
4. 3-5 menciones orgánicas de periodistas / creadores latinos.
5. 10+ artistas con claim iniciado.
6. Base de contenido social automatizado corriendo en piloto automático.

Viral sin producto profundo quema credibilidad para siempre. Preferimos 2K usuarios correctos que vuelven, antes que 100K curiosos que nunca regresan.

---

## Timeline macro (mayo 2026 → octubre 2026)

```
MES 1 - MAYO     FOUNDATION      handles, waitlist, infra email, primer contenido
MES 2 - JUNIO    SEEDING         playlists Spotify, contenido 3x/semana, Discord soft
MES 3 - JULIO    CREATIVE PUSH   mini-docs AI, primera tool SEO, micro-influencer colab
MES 4 - AGOSTO   COMMUNITY BUILD newsletter formal, segundas tools, Reddit AMA
MES 5 - SEPT     OUTREACH+PRESS  masivo a artistas, press kit, embargo stories
MES 6 - OCT      DAUTON DAY      launch event digital, 7 días intensivos, PR push
```

---

## MES 1 — MAYO 2026: Foundation

**Meta del mes:** tener toda la infra lista para ejecutar y capturar las primeras 200 señales de interés (waitlist + primeros followers).

### Semana 1

- [ ] Reservar 7 handles: `@dautonmedia` en IG, X, TikTok, YouTube, Threads, Bluesky; `Dauton Media` en Spotify. Owner: Luis (15 min).
- [ ] Configurar dominio `dauton.media` con SPF + DKIM + DMARC para Resend. Owner: Engineering ticket.
- [ ] Setup cuenta Resend + test email a 3 emails personales para validar entregabilidad.
- [ ] Setup Plausible en dauton.media (no cookies, no GDPR banner).
- [ ] Landing page pre-launch con waitlist: `dauton.media/lista` — animación de grafo de colaboraciones Canserbero-Apache como hook visual. Captura email + ciudad.
- [ ] Set up Metricool o Publer con las 7 cuentas conectadas.

### Semana 2

- [ ] Producir los primeros 10 "data-as-content" posts manuales como training set:
  - 3x aniversarios (Canserbero muerte, Apocalipsis release, Apache debut).
  - 3x carousel "3 tracks para empezar con [pillar]".
  - 2x visualization (timeline de rap VE + mapa productores Caracas).
  - 2x "proof of work" (screenshots del archivo, completeness counter).
- [ ] Publish cadence: 3x/semana en IG + X + TikTok.
- [ ] Newsletter signup form activado. Bonus: enviar un welcome email con "3 hechos sorprendentes del rap VE" como teaser (Resend + React Email).

### Semana 3

- [ ] Crear las 3 playlists Spotify propias:
  1. **Dauton · Archivo** (best-of rap VE, ~40 tracks).
  2. **Dauton · Nueva Generación** (2020+, ~25 tracks).
  3. **Dauton · Canserbero Extended** (tributo + covers + samples).
- [ ] Pre-populate con tracks ya seedeados en DB.
- [ ] Share playlists desde cuenta personal Luis + cuentas Dauton como cross-promo.
- [ ] Primer blog post en LinkedIn de Luis: "Por qué estoy construyendo un archivo del rap hispano". NO editorial de Dauton — esto es personal de founder. Atrae inversores/partners.

### Semana 4

- [ ] Primer newsletter "Archivo Abierto #1" — envío a waitlist con: lo que estamos haciendo + primer teaser de artista (ej. Canserbero deep dive visual, sin texto largo).
- [ ] Test Discord server (beta): 5-10 personas invitadas (círculo cercano + algunos fans vocales).
- [ ] Métrica de mes: 200 emails en waitlist, 500 followers combinados.

**Deliverables del mes:**
- 7 handles activos con bio + foto perfil + primer post.
- 30 posts publicados (10 por semana entre las 3 plataformas principales).
- 3 playlists Spotify activas.
- 200+ emails en waitlist.
- Newsletter #1 enviado.
- Infra email validada + SPF/DKIM/DMARC 100%.

---

## MES 2 — JUNIO 2026: Seeding

**Meta del mes:** escalar cadencia + capturar primeros micro-influencers + validar qué contenido engancha.

### Content cadence (escalada vs mayo)

| Plataforma | Cadence | Quién genera |
|---|---|---|
| Instagram | 4 posts/semana + 3 stories | Auto 2 + manual 2 |
| TikTok | 3/semana | Auto (data-driven) |
| X (Twitter) | 8/semana (~1.2/día) | Auto 6 + manual 2 |
| YouTube Shorts | 2/semana | Derivado de TikToks |
| Threads | 5/semana | Repurpose X |
| Bluesky | 3/semana | Custom bot editorial |
| Newsletter | 1/2 semanas | Claude-drafted, Luis reviews |

### Acciones específicas

- [ ] Activar pipeline automático de posts desde events de Supabase (si Engineering lo entrega en tiempo). Ver `social-automation-plan.md` Fase 2.
- [ ] Discord deferido a post-launch (founder no lo prioriza en MVP, requiere mod time).
- [ ] Añadir 20 perfiles de artistas nuevos (coordinación Data + Engineering).
- [ ] Activar newsletter weekly "Archivo Abierto" — primer envío genérico a 500+ subs.

### Métricas mes 2

- 500+ emails waitlist.
- 2K followers combinados.
- 3+ micro-influencers respondidos con interés.
- Discord con 50+ miembros.
- Newsletter #2 + #3 enviados con open rate > 40%.

---

## MES 3 — JULIO 2026: Creative Push

**Meta del mes:** introducir formatos de mayor producción + lanzar primera tool SEO.

### Mini-docs AI (formato estrella del mes)

Serie: **"Archivo Vivo"** — mini-documentales de 60-90 segundos sobre pillars.

Pipeline de producción:
1. Claude drafts script de 90s desde data del archivo (bio + 3 hitos + 1 quote si hay).
2. Midjourney / Flux genera 6-8 frames clave del storyboard.
3. Runway Gen-3 o Veo 3 genera video 10s por shot = ~80s total.
4. ElevenLabs narra con voz "house" de Dauton.
5. Edit final en Descript + export para IG Reels / TikTok / YT Shorts.

Target: 1 mini-doc por semana = 4 en el mes.

Primeros 4: Canserbero, Apache, Akapellah, McKlopedia.

**Costo por mini-doc:** ~$5 (Runway credits + ElevenLabs). Vs $500+ si se contrata producción tradicional.

### Primera tool SEO pública

Coordinación con Data & SEO: lanzar la **calculadora de ingresos Spotify** (o la que ellos recomienden primero).

Marketing launch de la tool:
- Press release corto enviado a 10 outlets via email personalizado.
- Thread en X explicando los cálculos + inviting a compartir.
- Post IG carousel: "¿Cuánto gana tu artista favorito en Spotify?" con 5 ejemplos.
- SEO-optimized landing con schema.org + FAQ.
- Target keyword: "cuánto paga Spotify por stream 2026".

### Partnership con podcast

Outreach a 1 podcast latino grande (Los Primitivos, El Podcast de Marlos, o similar). Pitch: "Tenemos data exclusiva sobre [tema que cubrieron recientemente]. Los queremos cuando liberen episodio."

No pedimos ser sponsors. Solo ser citados como fuente.

### Métricas mes 3

- 1K+ emails waitlist.
- 5K followers combinados.
- 4 mini-docs publicados con vistas combinadas > 50K.
- 1 tool SEO live con tráfico orgánico medible.
- 1 podcast mencionando Dauton.

---

## MES 4 — AGOSTO 2026: Community Build

**Meta del mes:** profundizar comunidad + formalizar newsletter + expandir tools.

### Newsletter formalización

Lanzar **"Archivo Abierto"** con cadence predecible: cada 2 domingos.

Formato fijo:
- **Esta quincena:** adiciones al archivo (top 5 con 1 frase c/u).
- **Profundidad:** 1 artista/release destacado (150 palabras max).
- **Mapa:** evento destacado (si hay).
- **Tool:** herramienta nueva o destacada.
- **Lectura del editor:** 3 links externos curados (no nuestro content).

Target mes 4: 800 subs, open rate > 45%, click rate > 8%.

### Expansión de tools (coordinado con Data & SEO)

Tool #2 live. Candidatos:
- Comparador de discografías (input: 2 artistas → output: overlap + complementos).
- "¿Qué rap escuchaba tu ciudad en [año]?" — interactivo con filtros.
- "Descubrí productor" — input track → output productor con link a perfil.

### Discord events

- Weekly listening party: 1 release clásico por semana, post-chat en canal dedicado.
- Q&A con Luis: 1 AMA abierto al mes.
- "Archivistas" role: usuarios que contribuyen correcciones consistentes ganan badge.

### Reddit AMA

Hacer AMA en r/rapespanol (o equivalente activo en 2026). Prep: 2 semanas antes, responder primero en comments de posts relevantes para earn credibilidad, luego mod approval.

### Métricas mes 4

- 1.5K+ emails newsletter.
- 10K followers combinados.
- Discord 200+ miembros activos.
- 2 tools SEO live con tráfico orgánico combined > 2K/mes.
- Reddit AMA con 100+ upvotes.

---

## MES 5 — SEPTIEMBRE 2026: Outreach + Press

**Meta del mes:** outreach masivo a artistas + press kit distribuido + teaser de launch.

### Outreach masivo a artistas

Ejecutar `../06-Operations/artist-outreach.md` una vez Sprint 5 + Sprint 7 estén cerrados:

- Cohort pillars (15): envío semana 1.
- Cohort top relevancia (50-100): envío semana 2-3.
- Cohort long tail: defer a post-launch para no quemar dominio durante press week.

Expect: 3-8 artistas reclamando su perfil durante septiembre. Cada claim aprobado = post de social comunicando.

### Press kit distribuido

Press kit formal disponible en `dauton.media/prensa`:
- Logo assets (monocromo, color, favicon).
- 5 screenshots del archivo.
- Fact sheet 1 página: qué es, por qué, data highlights.
- Founder bio (Luis).
- 3 "story angles" concretos para periodistas:
  1. "Primer archivo estructurado del rap hispano — foco diáspora venezolana."
  2. "Herramientas que el indie artist necesita y no existen (calculadora Spotify, comparador, etc.)."
  3. "Cómo la data pública puede construir memoria cultural — caso Venezuela."

Distribución: email personalizado a ~30 periodistas latinos culturales. Embargoed para release el día del launch (mes 6).

### Teaser trailer

Video de 30-60 segundos producido con Runway + ElevenLabs. Tono sobrio, tipo Criterion Collection trailer. Publicado el 1 octubre anunciando "Dauton Day: 15 octubre".

### Métricas mes 5

- 8-15 artistas con claim iniciado.
- 5 periodistas respondiendo al press kit pidiendo más.
- Newsletter 2.5K subs.
- Followers combinados 20K.
- Teaser trailer 100K vistas combined.

---

## MES 6 — OCTUBRE 2026: Dauton Day Launch

**Meta del mes:** el lanzamiento oficial. 1 evento central + 1 semana de contenido denso + PR push.

### Dauton Week — semana del 12 octubre 2026

**Sin livestream** (founder descartó). Sin embajadores ni reps. Sin panel con artistas.

Reemplazo: **lanzamiento escalonado de 7 días** con contenido denso pre-producido y publicación coordinada multi-plataforma.

Producción del contenido pre-lanzamiento (septiembre):
- 12 mini-docs AI de 60-90s (1 por pillar) producidos con Runway/InVideo + ElevenLabs.
- Set de 10 carousels IG con highlights del archive.
- 1 video largo YouTube (8-10 min) "Por qué construimos Dauton" — voz house, sin face cam.
- Newsletter especial "El archivo está abierto".
- Press kit publicado en `dauton.media/prensa`.
- 1 thread X largo (cuando activemos cuenta en mes 5).

Sin necesidad de moderación en vivo, sin riesgo técnico de livestream, sin dependencia de invitados.

### Launch week (12-19 octubre)

- **Lunes 12:** Release del teaser trailer (30s, producido con Runway + ElevenLabs) + press embargo lifts. Newsletter especial "El archivo está abierto" enviada AM.
- **Martes 13:** Primera ola de artículos (periodistas con embargo). Mini-doc de pillar #1 publicado en TikTok/IG/YT.
- **Miércoles 14:** "Story angle #2" — tools / calculadora de ingresos. Push X (cuenta activada en mes 5). Mini-doc pillar #2.
- **Jueves 15:** Mini-doc pillar #3 + carousel IG "Las 10 historias que nadie te contó del rap VE".
- **Viernes 16:** Mini-doc pillar #4 + thread X largo "Cómo construimos el archive".
- **Sábado 17:** Newsletter "Tu Mes en Dauton" piloto a 50 early adopters con favoritos seleccionados.
- **Domingo 18:** Dauton Wrapped primera edición pública — resumen de launch con métricas en site (transparencia).
- **Lunes 19:** "Qué viene post-launch" — roadmap pública + ask feedback abierto.

Cada día publica 1-2 piezas core multi-plataforma. Sin eventos en vivo. La narrativa del launch se construye via cadencia, no via momento culminante.

### Ko-fi campaign

Durante launch week, activamos Ko-fi con meta concreta (no "apoyar la causa"):
- "$500 = 100 nuevos perfiles de artistas en noviembre."
- "$1000 = herramienta X construida."
- Máxima transparencia sobre uso de fondos.

### Métricas launch

Targets realistas:
- 2.5K+ emails en newsletter.
- 15K+ followers combinados (TikTok + IG + YT).
- 3+ menciones en press tier 1-2.
- Mini-docs combined views: 500K+.
- 15+ artistas con claim completo.
- 100K+ visitas al site durante launch week.
- $300-1K Ko-fi donations.
- 50+ subs activan personalized monthly recap (signal de engagement deep).

---

## Post-launch (noviembre 2026 en adelante)

Plan post-launch vive en doc separado (a escribir en octubre). Esbozo:

- Mes 7 (nov): long tail outreach a artistas (resto del cohort).
- Mes 7-8: tool #3 + #4.
- Mes 8-9: English-speaking launch para diáspora bilingüe + USA Latino.
- Mes 10-12: partnership B2B con labels y promotores (si ecosistema pide).
- Mes 12: retrospectiva + decisión sobre v2.

---

## Risk register del launch

| Risk | Likelihood | Mitigation |
|---|---|---|
| Sprint 5 o 7 se atrasan → outreach se retrasa | Alta | Fallback: launch con los pillars (15) perfectamente pulidos en vez de 100 medio-terminados |
| Sender reputation baja → emails caen en spam | Media | Warm-up agresivo desde mayo, no enviar a cold list sin validar antes |
| Algún artista pide takedown público | Media | Política `moderation-workflow.md` + protocolo de crisis comms listo |
| Periodistas ignoran el pitch | Alta | Plan B: publish story angles en medium propio, viralizar en X |
| Livestream técnico falla el día D | Baja-Media | Pre-grabar backup de las 3 secciones más importantes |
| Costos AI disparados si video gen se vuelve adictivo | Media | Cap mensual ($100/mes) en dashboards de Runway/ElevenLabs |
| Founder burnout pre-launch | Media | No exceder 10h/semana de Luis en marketing. Todo automático o delegable |

---

## Requisitos para que este plan funcione

**De Engineering:**
- Site deploye estable con 99.5%+ uptime en Sept-Oct.
- Endpoint /api/og/[entity]/[slug] generando OG images.
- Esquema.org MusicGroup en todas las pages.
- Tabla `artist_outreach_log` + unsubscribe endpoint.
- Export de data para tools SEO.

**De Data & SEO:**
- Al menos 2 tools SEO publicadas antes del launch.
- Keyword research concreto por tool.
- Sitemap + schema markup complete.

**De Business & Legal:**
- Templates de email outreach firmados (CAN-SPAM + GDPR).
- Privacy policy + terms on site.
- Política de crisis comms firmada.
- Press kit legal-cleared.

**De Product Architecture:**
- Claim flow end-to-end funcional (blocker para outreach).
- UX de newsletter signup definida.

**De Founder (Luis):**
- 7 handles reservados (15 min).
- Approval del budget Tier 1-2 AI stack.
- 5 horas/semana mínimo para review de outputs (nadie más puede hacer voz de founder).

---

## Ownership

| Área | Owner | Backup |
|---|---|---|
| Timeline + coordinación cross-área | Community & Outreach | Strategy/PM |
| Copy de social + newsletter | Community & Outreach | — |
| Mini-docs production (script + render) | Community & Outreach | — |
| Tools SEO | Data & SEO | — |
| Dauton Day producción técnica | Engineering + Community | — |
| Press outreach | Community & Outreach | Founder |
| Artist outreach | Community & Outreach | — |

---

*See also: `marketing-strategy-v1.md` · `ai-marketing-stack.md` · `social-platform-playbook.md` · `social-automation-plan.md` · `../06-Operations/artist-outreach.md`*
