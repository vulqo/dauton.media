# Auditoría de arquitectura de producto — Dauton Media

**Fecha:** 2026-04-24
**Autor:** Cowork
**Scope:** snapshot del proyecto al cierre de Sprint 6.5. No se tocó código para este documento. Análisis orientado a producto/negocio.

---

## 1. Resumen general del sistema

Dauton Media es un archivo digital del rap hispanohablante, con foco editorial en la escena venezolana. El producto se posiciona como cruce entre tres cosas ya existentes: la estructura de referencia de Wikipedia/Discogs (datos citables, relaciones entre entidades), la experiencia de descubrimiento de Genius/RateYourMusic (grafo navegable, citas inline, credits) y la voz editorial curada de Pitchfork/NTS Radio. La personalidad visual hereda de Dauton Store (marca de streetwear venezolana de 2020): geometría, señalética, dark mode, sobriedad autoritativa.

En la práctica, es una plataforma content-led. El valor diferencial no está en features de software sino en la calidad y profundidad de la data: quién produjo qué, qué label lo firmó, qué venue lo vio tocar, qué medio lo cubrió, qué track muestreó a cuál. El objetivo declarado es ser la fuente citable para prensa, académicos y fans del rap en español, empezando por Venezuela y expandiendo pan-hispano (Colombia, México, España) post-MVP.

El MVP target es octubre 2026, con monetización inicial sólo vía donaciones (Ko-fi). Freemium, memberships, merch y advertising están todos diferidos post-MVP. El producto no aloja música ni letras — enlaza a Spotify, Apple Music, YouTube, Genius. Su moat es data + voz editorial, no catálogo.

---

## 2. Flujos principales del usuario

El sistema contempla cuatro tipos de usuario, cada uno con un flujo dominante.

El **visitante público no registrado** es el usuario principal. Entra al sitio (típicamente vía Google o redes), busca un artista o lo encuentra en home, lee la bio, ve la discografía con credits, hace click hacia Spotify, y vuelve cuando quiere más contexto. Este flujo debe funcionar perfecto sin auth.

El **usuario registrado** se suma por opt-in cuando quiere guardar favoritos o crear listas públicas compartibles. Auth básica con email magic link y Google OAuth. La experiencia base sigue igual; registrarse no desbloquea contenido, solo agrega utilidades personales.

El **contribuidor** es un subset del registrado que usa el formulario de corrección para reportar datos incorrectos o faltantes. Su sugerencia va a una cola de moderación donde un editor aprueba o rechaza. Hoy este flujo existe en schema pero no en UI.

El **artista verificado** es un caso especial: solicita reclamar su propio perfil, pasa por una verificación humana en 48h, y luego tiene algún grado de control editorial sobre su entidad. Diseñado en schema (`people.claimed_by_user_id`) pero tampoco implementado en UI.

Adicionalmente existe un flujo **admin/editor**: aprueba correcciones, revisa entidades en estado review, triggerea re-enriquecimiento, modera la cola de ingestion. Hoy esto se hace por CLI y consultas SQL; no hay admin UI.

---

## 3. Entidades principales del sistema

La entidad central es **Person**. Representa a cualquier humano relevante: MC, productor, DJ, ingeniero, fotógrafo, videógrafo, periodista, manager. Un mismo Person puede tener múltiples roles simultáneos (ej. Akapellah es artist + producer). Esta tabla es el hub del grafo — casi todas las demás entidades apuntan hacia ella.

**Release** (álbum, EP, single, mixtape, compilación) pertenece a un primary artist y puede tener features. Cada Release contiene Tracks, cada Track tiene credits de producción (producer, co-producer, mix, master, engineer), writing (writer, lyricist, composer) y colaboraciones (featured artists, vocal).

**Crew** es una banda, dúo o colectivo. Personas se unen y salen de crews con fechas (crew_memberships).

**Label** es la discográfica. Tiene eras por artista (label_eras), con fechas, tipo de deal (signed, licensing, distribution), y circunstancia de salida. Los labels también pueden tener labels padre (sub-sellos).

**City** ancla la geografía. Caracas, Maracay, Valencia, Mérida, Bogotá, etc. Las personas tienen origin_city y current_city. Las labels y events se ubican en city.

**Event** cubre conciertos, battles, release parties, awards, controversias públicas, beefs, hitos históricos. Con event_participants (personas y crews involucradas).

**Article** representa cobertura de prensa externa o, eventualmente, editorial propia. Vincula a entidades vía press_mentions (quién es el sujeto, en qué artículo, con qué prominencia, qué quote).

**Source** es toda evidencia citable: un artículo, un video, una entrevista, un libro, un post. Cualquier hecho en el archivo debería idealmente apuntar a uno o más sources.

**User** (user_profiles) extiende la tabla auth.users de Supabase con display_name, avatar, y booleans is_editor/is_admin. Users pueden tener favoritos (user_favorites) y crear listas públicas o privadas (user_lists + user_list_items).

Entidades operativas: **corrections_queue** (sugerencias de corrección pendientes), **edit_history** (audit trail de todo cambio), **slug_history** (para 301 redirects cuando un slug cambia), **relationships** (relaciones persona-persona tipo mentor, rival, colaborador).

Entidades de ingestion (no user-facing): **ingestion_queue**, **ingestion_rate_limits**, **raw_responses**, **pipeline_runs**, **videos** (YouTube scan), **entity_stats** (snapshots de followers/popularity over time).

---

## 4. Datos y relaciones

El grafo tiene un hub claro y varios spokes que irradian desde Person.

Un Person tiene discografía vía Releases (primary_artist) y colaboraciones (features en tracks/releases de otros). Tiene producer credits (producer en tracks de otros artistas). Tiene writing credits (lyricist, composer). Tiene pertenencia a Crews con fechas. Tiene relaciones con Labels con fechas (label_eras). Tiene una City de origen y una actual. Tiene hitos en su timeline (career_events). Tiene mentions en press (press_mentions vinculando a articles). Y tiene relaciones directas con otras Persons (mentor, rival, family).

Un Release tiene su Label (opcional), su lista de Tracks, sus genres. Cada Track tiene duration, ISRC, y links a Spotify/Apple/YouTube/Genius. Los credits viven en production_credits (producer por track), writing_credits (writers por track) y collaborations (features por track).

La city ancla releases (indirectamente a través del artist), events, labels. Las event_participants son personas o crews. Los events se taguean con tipo (concert, battle, release, award, controversy, beef, historic).

Los articles apuntan a outlets (media_outlets con credibility_tier 1-5). Cada press_mention vincula un article con una entity target (person, release, crew, label, event) y marca prominencia y quote.

Los sources son el soporte citatorio transversal. Cada press_mention, career_event, label_era, relationship puede llevar source_ids con arrays de sources que lo respaldan.

En la capa de usuario, user_favorites es polimórfico (user_id + entity_type + entity_id). Listas también son polimórficas.

El completeness_score por entity es un número 0-100 calculado sobre qué tan rica es su data (cuántos releases, cuántos credits, cuánto bio, cuántos sources). Sirve para priorizar enrichment y mostrar progreso público.

---

## 5. APIs e integraciones

El sistema se alimenta de nueve fuentes externas para hacer ingestion y enrichment.

**Spotify Web API** es la fuente primaria de identidad musical: artist ID, discografía (álbumes, singles, compilaciones, appears_on), tracks con ISRC y features, cover art, related artists. Gratis pero requiere Spotify Premium activo (política 2025). Sufrimos un ban de 23 horas al hacer 600 requests demasiado rápidos; ya tenemos circuit breaker.

**MusicBrainz** es la única fuente open-data con producer-level credits confiables a escala. Es community-maintained. Rate limit duro de 1 request por segundo. Gratis, sin auth (solo User-Agent). Clave para el diferencial editorial.

**YouTube Data API v3** la usamos para metadata de canales de artistas y, post-MVP, para escanear canales como El Apartaco en busca de entrevistas largas que alimentan la pipeline de transcripts.

**Genius API** provee credits de productor/writer cuando MusicBrainz falla (común en rap latino cola larga), lyrics URL (link-out, no hosteamos lyrics), y datos de samples/interpolaciones (relación track-a-track valiosa editorialmente).

**Wikipedia y Wikidata** se usan como seed para bios y como fuente de cross-platform IDs (resolver Spotify ↔ MusicBrainz ↔ IMDb ↔ Discogs). El texto de Wikipedia no se copia — se reescribe vía Claude con source attribution.

**Brave Search API** es nuestro motor de discovery para press mentions. Tier gratis (2,000 queries/mes) más que suficiente durante el MVP.

**Firecrawl** extrae markdown limpio de artículos de prensa encontrados vía Brave. Necesario porque muchos sitios de medios venezolanos tienen JS pesado y requieren rendering browser.

**OpenAI Whisper** se usará como fallback para transcribir audio cuando YouTube no provee captions auto-generados. Costo $0.006 por minuto, aprox $5-10/mes para el MVP.

**Supabase** es nuestro backend completo: Postgres gestionado, Auth con magic link + OAuth, Storage para fotos (cuando llegue PhotoUploadModal), RLS policies, PostgREST para consumir desde frontend, y Edge Functions si las necesitamos.

**Vercel** hostea el frontend Next.js, auto-deploy desde GitHub push a main, y eventualmente ejecutará crons (aunque decidimos usar GitHub Actions gratis por ahora).

**Claude** (vía Max plan, sin Anthropic API todavía) ejecuta los skills de extraction, reconciliation y bio-drafting. Este flujo es semi-manual actualmente (Luis dispara prompts específicos cuando toca).

Integraciones futuras contempladas: Setlist.fm (setlists históricos de conciertos, requiere MBID), Resend (newsletter), ElevenLabs o OpenAI TTS (podcast automation), Bandsintown (eventos futuros, post-MVP).

---

## 6. Backend y lógica de negocio

La lógica crítica vive en cuatro capas.

La **base de datos Supabase** concentra más lógica de la habitual para un Postgres. Las RLS policies gobiernan quién puede leer y escribir qué: lectura pública de entidades archive en estado public, escritura restringida a editors y admins para correcciones, posesión estricta de favoritos y listas por usuario. Triggers automáticos actualizan updated_at en cada write y recalculan completeness_score cuando una entity se modifica. Constraints enforcean integridad (no self-referencing en relationships, enums validados en roles y types, slug único, FKs con cascade donde corresponde). La mayoría de estas reglas están declaradas en SQL, no en código TS — lo cual es bueno para consistencia pero requiere leer migraciones para entender el comportamiento.

La **capa de ingestion** vive en `src/lib/ingest/`. Una queue (ingestion_queue) almacena items pendientes por source. Un dispatcher lee items respetando rate budgets por source y dispatch a workers específicos (uno por API: Spotify, MusicBrainz, Wikipedia, Genius, más stubs). Los workers hacen fetch, parsean, normalizan y hacen write a las tablas de dominio. Todo fetch externo se persiste crudo en raw_responses para poder re-parsear sin re-fetch. Errores se manejan con retry exponencial y circuit breakers por source para evitar bans extensos.

La **capa de skills** (`src/lib/skills/`) contiene las funciones cognitivas: bio-drafter (reescribe Wikipedia en voz Dauton), press-extractor (saca quotes citables de artículos completos), credit-reconciler (merge MB + Genius + Spotify), dedup-judge (decide si dos personas son la misma), entity-resolver (fuzzy match de menciones en texto a entidades en DB), transcript-extractor (extrae career_events y quotes de transcripts de video), event-deduplicator (merge de eventos mencionados en múltiples videos). Hoy son stubs con Zod schemas definidos pero sin runtime real — dependen de Claude Max manual mientras no paguemos API.

El **frontend Next.js** es mayoritariamente presentation logic. Los server components en `src/app/` hacen fetch vía `src/lib/queries/` (wrappers sobre supabase-js) y pasan data a components. Las queries hoy son mínimas (people, releases, search básico). La lógica de negocio que aparece en frontend es menor: normalización de slugs, parse de duration, composición de meta tags para SEO.

La **moderación y approval** viven entre la DB (corrections_queue, edit_history, user_profiles.is_editor) y scripts CLI (approve-artist, retry-dead-letter). No hay UI de admin todavía — todo se hace con comandos de terminal. Funcional para Luis solo, no escala a múltiples editores.

---

## 7. Riesgos de arquitectura

**Riesgos críticos que pueden impedir el launch:**

El gap más grande es de **data wiring**. Hoy sólo una ruta del sitio (`/artists/[slug]`) consume data real de Supabase. Las otras veinte rutas muestran mock o empty state. Si mañana lanzamos, el visitante ve un ArtistPage funcional y todo lo demás vacío o falso. Cerrar esto requiere aproximadamente doce queries nuevas y el wiring de once páginas dinámicas.

**Auth no está implementado.** Existe la ruta `/auth` con un placeholder, pero no hay wiring a Supabase Auth, no hay signin real, no hay sesión, no hay protección de endpoints. Todos los flujos que dependen de usuario identificado (favoritos, listas, correcciones, claims) están bloqueados.

**Los skills cognitivos no tienen runtime automático.** Sin pagar Anthropic API o sin flujo manual estructurado, no podemos drafteear bios ni extraer quotes a escala. Para procesar 100 artistas × 5 quotes + bio cada uno, el workflow manual con Claude Max toma decenas de sesiones. Esto pone en riesgo alcanzar los mínimos de data del launch.

**El `entity_stats` no se puebla para Spotify** porque Client Credentials ya no retorna followers ni popularity (cambio 2024). Perdemos growth tracking a menos que implementemos OAuth user flow o scraping público de open.spotify.com. Impacta narrativa editorial ("X creció un 40% el último año").

**Rate limit bans reales.** Spotify nos baneó 23 horas con 600 requests rápidos. MusicBrainz es 1 request por segundo duro. Stage 4 Credits (MB + Genius para miles de tracks) tomará días de runtime async. Si algo falla en producción, debugging puede costar otro día. Requiere monitoring básico que no existe.

**Duplicación Design ↔ Code.** Once componentes están marcados @deprecated en Design pero siguen en el repo (EraPage, VenuePage, VenuesListing, OnboardingPage, Comments, más el bloque store completo que ya purgamos parcialmente). Y al revés, doce componentes de Design todavía no están portados. Si Design vuelve a iterar sobre algo ya portado, hay drift silencioso.

**Riesgos menores pero trackeados:**

Cinco componentes usan `any` en props de entities porque hoy no hay data real. Cuando la haya, hay que tipar contra `database.types.ts`. Property drift es riesgo real.

`/privacy` y `/terms` leen sus contenidos markdown via `path.join(process.cwd(), '..', ...)`. Esto funciona hoy en Vercel con cwd específico, pero es frágil ante cambios de deploy structure.

`/join` (Sprint 2) y `/auth` (Sprint DS v3) coexisten sin decisión resuelta. El chip ENTRAR ahora apunta a `/auth`. Queda `/join` huérfano.

El tab EDITORIAL del Nav apunta a una vista que no existe (editorial fue diferido a v2). Link roto desde punto de vista del usuario.

El GitHub PAT está embebido en `.git/config` del Mac de Luis. Si alguien accede al filesystem, el token se compromete. Mitigar migrando a macOS Keychain (`git config credential.helper osxkeychain`).

**No hay tests.** Cero unit tests, cero end-to-end, cero snapshot. El único gate es `next build` pasando. En un proyecto con tanta lógica de ingestion, esto es riesgo acumulado.

**Legal drafts sin revisión formal.** `privacy-policy-draft.md` y `terms-draft.md` existen pero no pasaron por abogado ni revisión seria. Lanzar con esto en VE/LatAm es legalmente tibio; lanzar con presencia en UE sería más problemático (GDPR implica DPO, cookies banner real, DSR flow).

**Riesgos organizacionales a mediano plazo:**

El **Claude Max manual workflow no escala** más allá de unos 100 artistas. Luis ejecutando skills a mano para cada bio y cada quote no es realista para v1.5 Polish (15 pillars a 90%, que requiere ≥15 press citations extracted por pillar, aproximadamente 225 extractions de quote solo en eso). Decisión pendiente: pagar Anthropic API con cap de $30-50/mes, o bajar ambición.

**Scope v1.5 Polish muy ambicioso.** Curar 15 pillars a 90% completeness en dos semanas requiere bios long (≥400 palabras cada una), fotografía curada real (no placeholders), mínimo 15 press citations por pillar, timeline de carrera sourced. Esto es trabajo editorial serio, no ingestion automática. Sin un plan explícito de quién hace esto, las dos semanas se convierten en seis.

**Posicionamiento con huecos.** El sitio dice "Pitchfork + Genius" pero el Pitchfork side (editorial, opinión, features long-form) está diferido a v2.0. Lanzar sólo como archive hace el claim engañoso. Ajustar posicionamiento de MVP ("archivo citable con editorial en desarrollo") o adelantar al menos 5-10 artículos al launch.

**Monetización sólo Ko-fi** es razonable para validación pero no sostiene infraestructura si crece (Supabase Pro $25, Vercel Pro $20, Anthropic API, Firecrawl, Resend, TTS). Pre-launch hay que tener números de break-even y fuentes alternativas (patreon, sponsorships editoriales, B2B data licensing).

---

## 8. Preguntas importantes que debes responder antes de seguir

Estas son preguntas de producto, no de código. Cada una impacta decisiones downstream:

**Sobre el usuario prioritario.** El producto atiende hoy a cuatro usuarios distintos (visitante, registrado, contribuidor, artista). ¿Cuál debe funcionar perfecto al launch? Mi intuición dice visitante → registrado → contribuidor → artista, pero esto debe ser explícito porque define qué flujos se priorizan.

**Sobre la data mínima aceptable al launch.** Hoy tenemos 81 people en DB, 2 con data rica. El roadmap dice 100 con Layer 1-2 y 15 a Layer 7 (90%). Si llegamos a octubre con 50 y 5, ¿se retrasa el launch o se lanza "smaller"? Criterio explícito ayuda a decidir dónde empujar.

**Sobre depth vs breadth.** ¿Vale más 50 artistas con data impecable o 250 con data media? El claim editorial ("fuente citable") resiste poco data mediocre; el claim de "archivo" resiste poco data escasa. Decisión clave que define la identidad.

**Sobre B2C vs B2B.** ¿El producto apunta a fans casuales del rap (B2C, tráfico orgánico, ads eventuales) o a medios y industria (B2B, data licensing, sponsorships)? Ambos usos son posibles con el mismo data model, pero las features secundarias divergen (B2C necesita mejor search + favoritos, B2B necesita API + exports).

**Sobre editorial en v1.** ¿Lanzamos con 0, 5 o 20 artículos? El producto sin editorial es archive puro, lo cual es válido pero no es "Pitchfork". Cinco artículos manuales de Luis pre-launch pueden cambiar cómo percibe el primer visitante.

**Sobre Anthropic API.** ¿Se presupuesta $30-50/mes para skills automatizadas o se mantiene workflow manual? La diferencia es "100 artistas enriched en una semana" vs "100 artistas enriched en dos meses". Impacto directo en el launch.

**Sobre quién modera.** Correcciones van a un queue. Si Luis es el único editor al launch, la velocidad de aprobación será su bottleneck. ¿Hay editores externos? ¿Cómo se onboardean?

**Sobre los pillars finales.** La lista de 15 es draft. ¿Quién la finaliza? ¿Con qué criterio? Esta decisión define el canon editorial del primer launch. Recomiendo no delegar este call.

**Sobre diáspora.** Rxnde Akozta es cubano-venezolano, marcado is_venezuelan=true. ¿Artistas VE radicados en España, USA, Colombia entran al core o a peripheral? ¿Colombianos que colaboran frecuente con VE? Regla clara previene inconsistencias curatoriales.

**Sobre flujo de reclamo de perfil.** Existe schema (`claimed_by_user_id`). No hay UI, no hay proceso de verificación. ¿Cómo verifica Dauton que un user es realmente el artista? ¿48 horas de ventana para qué exactamente? ¿Un artista verified gana control editorial total de su perfil o solo puede sugerir?

**Sobre privacidad de usuarios.** `user_profiles.is_public` default false. Pero hay `user_lists.is_public=true` para compartir listas. Cuando un visitante entra a `/u/luis/lists/canon-2015`, ¿ve el username? ¿El display_name? ¿El avatar? Política explícita.

**Sobre backup y DR.** Free tier Supabase sin backups automáticos. Pre-launch hay que upgrade a Pro ($25/mes) o tener plan de backup manual. Si pasan 3 días con data loss, el producto pierde credibilidad instantáneamente.

**Sobre validación para hacer entity public.** Hoy es manual (`visibility='public'`). ¿Debería haber validación automática — ej. completeness ≥ 40% — antes de que algo sea visible?

**Sobre ads y sostenibilidad.** El sitio nunca dice ad-free pero implícitamente lo es. ¿Es compromiso? Si llegamos a 10K MAU, ¿se meten ads, se abre membership, se cierra scope?

**Sobre multi-idioma.** Roadmap menciona ES → EN en Phase 3. ¿Serio o aspirational? Si serio, i18n debería considerarse en el data model desde el MVP (hoy solo campos _es).

**Sobre conflictos de data.** Genius dice Kpú, MusicBrainz dice Ahiezer. ¿Política final cuando los skills no pueden resolver? ¿Mostrar ambas fuentes? ¿Curador humano decide?

---

## 9. Recomendación de arquitectura de producto

Propongo pensar el producto en **ocho módulos conceptuales** con responsabilidades claras.

**Archive Core** contiene Person, Release, Track, Crew, Label. Es el grafo musical central. Debe funcionar 100% al launch con data rica para al menos 50 artistas. Es el "qué" del producto.

**Geography + Events** contextualiza: City, Event, future Venue. Ubica temporalmente y geográficamente el grafo. Útil para descubrimiento ("¿qué pasó en Maracay en 2010?").

**Editorial** es el layer de voz: Article, press_mentions, sources. Es la línea divisoria entre "archivo" y "media brand". Hoy existe el schema pero casi nada de contenido. Recomiendo decidir si v1 lanza con 5-10 artículos escritos manualmente o si editorial queda oficialmente en v1.1.

**Community** es el layer opt-in de usuario: User, favorites, user_lists, corrections. El visitante no necesita registrarse para consumir el producto. Community debe ser opt-in y no bloquear nada del core.

**Ingestion Engine** es el motor invisible: workers, queue, skills, pipelines, rate limits, raw_responses. Corre 24/7 en background. El usuario final jamás lo ve. Su éxito se mide por cuánta data de calidad entra por día.

**Moderation** cubre corrections_queue, edit_history, admin approval. Hoy es CLI-only. Debe crecer a UI cuando haya volumen (> 20 correcciones pendientes). Al launch probablemente Luis modera solo.

**Authorization** es transversal — RLS policies en Supabase, roles en user_profiles, claim flows. Es single source of truth de seguridad. Cualquier lógica de permisos debe terminar pasando por acá.

**Distribution** cubre el website principal, social automation (futura), newsletter (futuro), SEO. Es cómo el archivo llega a la audiencia.

**Responsabilidades y orden de prioridad:**

Primero vienen Archive Core y Geography, porque son lo que el visitante ve. Sin estas dos funcionando con data real, no hay producto. Segundo viene Ingestion Engine, porque sostiene Archive Core. Tercero viene Authorization, porque habilita Community. Cuarto viene Editorial, y aquí hay que decidir si es v1 o v1.1. Quinto Community, Distribution, Moderation — todos layers que se activan progresivamente.

**Simplificaciones concretas que recomiendo:**

Eliminar del repo todo lo @deprecated en design: EraPage, VenuePage, VenuesListing, OnboardingPage (cuando se decida /join → /auth redirect), MembershipPage si llegó, y los rastros de Shop/Product/Seller ya borrados pero con referencias huérfanas. Reduce superficie cognitiva.

Congelar Design v3 hasta post-MVP. El DS actual ya define más vistas que las que mvp-scope requiere. Cualquier iteración visual nueva antes del launch es scope creep.

Diferir editorial formal a v1.1 excepto por 1-3 artículos manuales que Luis escriba pre-launch como "muestra". Esto elimina la presión de escribir 20 artículos en 2 semanas y mantiene un claim editorial mínimo.

Diferir admin UI a v1.1. Hasta no tener 50+ correcciones pendientes, CLI alcanza. Construir admin UI ahora es trabajo que no mueve el launch.

Diferir user lists y favoritos a v1.0-late. El visitante no registrado puede consumir 100% del producto sin estas features. Mejor lanzar con 0 features de community que con community buggy.

**Lo que debe definirse antes de seguir construyendo:**

El happy path del visitante MVP, pantalla por pantalla, con data real requirements. Tres pantallas: Home → Artist → Release. Qué fields deben existir para que cada una "se sienta completa". Esto define el mínimo viable de data por entity.

La lista final de 15 pillars con commitment explícito de curación. Sin esta lista finalizada y aceptada, los esfuerzos de enrichment están disparados.

La decisión sobre editorial en v1.

La decisión sobre Anthropic API.

Política de privacy de users — qué se expone públicamente cuando user opta por listas públicas.

---

## 10. Próximos pasos recomendados

Antes de tocar más código, los próximos pasos son decisiones de producto, no implementaciones.

Primero, **alinear scope documentado**. Leer mvp-scope, roadmap y vision juntos y resolver las contradicciones. El claim "Pitchfork hispano" requiere editorial; el scope MVP lo difiere. O se ajusta el claim ("archivo citable en construcción") o se adelanta al menos algo de editorial. Decisión explícita.

Segundo, **definir el happy path del visitante MVP** con specs de data mínima. Tres pantallas: Home, Artist, Release. Qué información debe renderizar cada una para que el sitio "se sienta cuidado". Esto se convierte en definition of done para pre-launch.

Tercero, **finalizar los 15 pillars** con plan de curación explícito: quién escribe cada bio long, qué fuentes se usan, de dónde vienen las fotos, quién verifica.

Cuarto, **decidir Anthropic API vs workflow manual**. Si API, presupuestar $30-50/mes. Si manual, reducir ambición de data al launch (quizás 50 artistas enriquecidos en vez de 100).

Quinto, **política explícita de privacy de users**. Qué se expone cuando publican listas. Qué protege `user_profiles.is_public=false`.

Sexto, **legal review de privacy y terms**. Incluso básico. Especialmente si hay planes de operar en UE eventualmente.

Séptimo, **plan de ingestion post-launch**. Cuándo corre cada pipeline, quién vigila, qué pasa cuando un worker falla en producción. Monitoring mínimo.

Octavo, **decisión sobre editorial v1** con número explícito. Cero, tres, diez o veinte artículos. Quién los escribe. Cuándo.

Noveno, **upgrade a Supabase Pro pre-launch**. Daily backups. 25 dólares al mes son baratos comparados con perder data.

Décimo, **roadmap post-launch realista**. Qué pasa el día 31 después del launch. ¿Editorial? ¿User accounts activos? ¿Expansión pan-hispana? Saber esto antes del launch previene el síndrome de "lanzamos y no sabemos qué sigue".

Luego de cerrar esas decisiones, el trabajo de código se vuelve mecánico: terminar Sprint 5 (discografía), Sprint 7 (credits), Sprint 8 (transcripts o setlists), wire happy path a data real, implementar auth, crear admin básica, cargar contenido static, polish SEO. Todo factible en 4-6 semanas con las decisiones de producto cerradas. Sin cerrar esas decisiones, cada sprint va a chocar contra ambigüedades y scope creep.

---

## Una observación final

El proyecto tiene una base sólida poco común para un MVP: documentación extensa en docs/áreas, schema rico, ingestion pipeline scaffolded con rate limits reales, design system con identidad clara. El gap no es técnico. Es de decisiones de producto que siguen "abiertas" porque nadie las forzó a cerrar.

La mayor parte del riesgo del launch octubre 2026 no viene del código faltante (eso se cierra con trabajo disciplinado) sino de decisiones estratégicas pendientes: editorial sí o no, Anthropic sí o no, pillars con qué criterio, legal review, política de privacy. Cada una de esas decisiones tomada hoy ahorra una semana de trabajo downstream.

Recomendación final: reservá medio día esta semana para responder las preguntas de la sección 8. Con eso, el resto del MVP se ejecuta solo.
