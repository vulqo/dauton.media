# Dauton Media — Roadmap maestro

**Owner:** Luis Figuera
**Última actualización:** 2026-04-25 · Strategy/PM
**Status:** Live document — fuente única de verdad para el roadmap.

---

## Visión a 12 meses

**Producto funcional con demanda real de fans.** En 12 meses queremos:

- Archive público de artistas latinos (foco diáspora venezolana) con perfiles ricos auto-generados de fuentes públicas + verificación opcional vía claim del artista.
- Al menos una herramienta SEO con tráfico orgánico real (calculadora de ingresos como ejemplo, hay que pensar más).
- Comunicación directa con artistas: outreach masivo a perfiles ya armados pidiendo verificación.
- Al menos UNA vía de monetización activa (subscription artistas o comisión merch o sponsorship).
- Tracción medible que destrabe el resto: financiación si aparece la oportunidad, escala a más mercados, features de promotores y labels.

---

## Visión a 24 meses

**Plataforma reconocida en el ecosistema musical latino.** Para esa fecha:

- Soluciones específicas activas para 2-3 perfiles de usuario (artista + promotor o label).
- Mapa expandido a USA latino y mercados clave (Colombia, México, España).
- Tienda integrada con artistas + sistema de tickets en colaboración con promotores.
- Posicionamiento como sistema operativo del rap hispanohablante.

---

## Foco actual del MVP (qué se construye HOY)

El producto MVP es **el archivo público con herramientas útiles para FANS**. Decisión tomada: arrancamos con experiencia de fan resuelta perfecta antes de construir features para artistas/promotores/labels.

**Por qué fan primero:** sin fans usando el producto, los perfiles no tienen valor para artistas. Sin perfiles que importen, no hay nada que el artista quiera reclamar/optimizar. Fan-first crea la audiencia que después convierte el resto.

Pero en MVP los perfiles de artistas YA EXISTEN (auto-generados por ingestion). El "feature para artistas" en MVP = **claim + verify + edit**. No es lanzamiento separado.

### Pillars del MVP

1. **Archivo público completo** — perfiles auto-generados de TODOS los artistas relevantes (filtros por relevancia: 10M+ followers primero, luego bajamos).
2. **Herramientas SEO útiles para fans** — calculadora de ingresos (ejemplo). Otras a definir en Data & SEO. Cada herramienta es puerta de entrada al perfil completo del artista.
3. **Herramientas útiles adicionales** — features que aumentan valor del archivo desde una perspectiva SEO/utility. La calculadora de ingresos es ejemplo. Otras a definir por Data & SEO chat. Visualizaciones tipo timeline/mapa/grafo NO son foco — solo entran si tienen tráfico SEO medible.
4. **Verificación opcional para artistas** — badge VIP + capacidad de editar/agregar al perfil. Outreach masivo via email.
5. **Eventos públicos** — populated vía Eventbrite y otras fuentes. Redirección a tickets en plataformas externas.
6. **Merch público** — links gratuitos a tiendas externas del artista (Bandcamp, Shopify, etc.). Sin comisión en MVP.

### Lo que NO está en MVP (deferido)

- Editorial tradicional (blogs, reviews, ensayos largos). NO existen en el producto.
- Visualizaciones tipo "historia del rap VE" (timeline/mapa/grafo). NO son foco. Solo entran como SEO tools si una tiene tráfico real.
- Tienda propia / hosting de merch. Solo redirección.
- Venta directa de tickets. Solo redirección.
- Dashboards B2B para promotores y labels. Post-MVP.
- Subscriptions / pagos. MVP es 100% gratis para fans + donación opcional.
- Mensajería interna, comments, notificaciones internas. Post-MVP.
- App mobile nativa. Mobile web responsive es suficiente.

---

## Dependencies del MVP

**Cosas que tienen que estar listas antes del launch:**

- Schema de DB completo y poblado (en marcha — 31 tablas + 8 migraciones aplicadas).
- Ingestion automatizada de Spotify, MusicBrainz, Wikipedia, Genius corriendo en cron (en marcha — workers scaffolded, falta runtime real).
- Páginas públicas de las entidades core: Person, Release, Track, City, Crew, Label, Event, Article. Cada una con data real (en marcha — 1/8 wired hoy).
- Search funcional vía Postgres FTS (parcial).
- 1-3 herramientas SEO útiles construidas y rankeando. (Pendiente — depende de Data & SEO research).
- Outreach a artistas: email tool + plantillas de claim (Pendiente — Community & Outreach).
- Legal review de cada feature público (Pendiente — Business & Legal).
- Privacy + terms revisados (drafts existen, falta review formal).
- Auth básica de Supabase (deferido a final del MVP — solo necesaria para claim flow del artista).

---

## Sprints completados

| Sprint | Deliverable | Owner | Status |
|---|---|---|---|
| 0 | Schema inicial 31 tablas + RLS + seeds ref | Engineering | ✓ |
| 1 | Schema fixes + 15 pillars seed | Engineering | ✓ |
| 2 | App Router + wire Supabase básico + purga legacy | Engineering | ✓ |
| 3 | Ingestion infra code-first | Engineering | ✓ |
| 4 | Spotify Stage 1 bootstrap (con incidente rate limit) | Engineering | ✓ |
| 6 | MusicBrainz scaffold | Engineering | ✓ |
| 6.5 | Wikipedia + Genius + race fix | Engineering | ✓ |
| Design Sync v3 | 12 componentes TSX + 13 rutas | Engineering | ✓ |

---

## Sprints próximos

| Sprint | Deliverable | Owner | Bloqueado por |
|---|---|---|---|
| 5 | Spotify Stage 2 (discografía + tracks + collabs) | Engineering | Spotify cooldown (~22:00 ART 25-abr) |
| 7 | Stage 4 Credits ejecución (MB + Genius drain) | Engineering | Sprint 5 |
| UI-fill | Rutas faltantes (`/releases/[slug]`, `/producers`, `/labels`, etc) + queries | Engineering | Decisión scope final |
| Data & SEO Research #1 | Inventario de herramientas SEO candidatas + keyword research | Data & SEO | Chat Data & SEO abierto |
| Personas deep-dive | Use cases detallados por persona (Fan, Artista, Promotor, Label, secundarios) | Strategy/PM | — |
| Eventbrite ingestion | Worker para poblar eventos VE + diáspora | Engineering + Data & SEO | Después de Sprint 7 |
| 8 | YouTube transcripts (Apartaco) — opcional MVP | Engineering | Decisión Anthropic API o Max manual |
| Auth flow | Supabase Auth wired + claim modal | Engineering | Fin del MVP |
| Outreach campaign | Email templates + lista de artistas top + automation | Community & Outreach | Perfiles armados |
| Legal review batch | Cada feature MVP pasa por review | Business & Legal | Features definidos |

---

## Métricas a 12 meses (no compromisos, signals)

- Perfiles de artistas en archive: target 1000+ (auto-poblados, todos los relevantes en VE + diáspora con seguidores).
- Perfiles claimed por artistas: 30+ activos editando.
- Fans con cuenta: opcional métrica, MVP no requiere registro.
- Tráfico orgánico: features SEO traen X visitantes/mes (X TBD según research).
- Outreach: 500+ emails enviados a artistas con perfil ya armado.
- Eventos en archive: cobertura de eventos VE diáspora (Miami, España, Colombia) últimos 12 meses.

---

## Métricas qualitativas

- Artistas relevantes hablan de Dauton Media en sus redes (mención orgánica).
- Promotor o label nos contacta para preguntar por data.
- Algún medio cita el archivo como fuente.
- Número de correcciones recibidas (signal de uso real, no solo tráfico).

---

## Cómo actualizar este roadmap

- Strategy/PM es el dueño. Otros chats proponen cambios via TASKS.md o COORDINATION.md.
- Cuando un sprint cierra, se mueve de "Sprints próximos" a "Sprints completados" con el outcome.
- Cuando aparece nueva feature aprobada, se agrega a "Sprints próximos".
- Cambios grandes de visión se reflejan en `00-Executive/product-vision-v2.md` primero, después en este roadmap.
