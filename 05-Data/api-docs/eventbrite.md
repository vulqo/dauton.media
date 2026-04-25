# Eventbrite Platform API

**Status:** ⚠️ viable parcial · **NO sirve para descubrimiento masivo**.
**Last reviewed:** 2026-04-25 · Data & SEO chat.
**Stage uso:** TBD — depende de decisión arquitectura post-finding.

---

## TL;DR (verdict primero)

**Eventbrite NO sirve como source único** para poblar `/eventos/[artist-slug]` desde búsquedas tipo "rap Miami" / "hip hop Madrid" / "concierto venezolano España".

**Razón crítica:** Eventbrite **removió el endpoint de búsqueda pública global** (`GET /v3/events/search/`) en **diciembre 2019**. Hoy solo se puede consultar eventos por `organization_id` o `venue_id` ya conocido.

**Implicación:** para alimentar nuestro tool #4 necesitamos **arquitectura híbrida**:
1. Mantener una DB de organizers + venues latinos relevantes (curado o scraping de su listing público).
2. Consultar Eventbrite API por cada org/venue de la DB.
3. Filtrar client-side por keywords ("rap", "hip hop", "urbano latino").

Alternativa más realista: combinar Eventbrite (donde aplique) + Setlist.fm (históricos confirmados, ya scoped Stage 7a) + scraping ético de IG/promotores VE locales (Apartaco, etc.) post-MVP.

---

## Overview

Eventbrite Platform API — REST API para integraciones de ticketing y discovery. Diseñada principalmente para **organizers que quieren extender su flujo** y para sites partners con relación comercial.

**Lo que NO es:** un Songkick/Bandsintown que indexa eventos de toda la red.

---

## Auth

**OAuth 2.0** con dos modalidades:

| Tipo | Cuándo | Cómo |
|---|---|---|
| **Anonymous OAuth Token** (Private Token) | Apps que solo leen su propia data o data pública del organizer | Crear app en dashboard → copiar private token |
| **Personal OAuth Token** | Apps que actúan en nombre de un usuario | Standard 3-leg OAuth flow con `client_id` + `client_secret` |

**Para Dauton:**
- Private token alcanza si solo consumimos data pública.
- No hay `tier free vs paid` separado en la API misma — la API es free.

**Docs:** https://www.eventbrite.com/platform/docs/authentication

---

## Base URL

```
https://www.eventbriteapi.com/v3/
```

Auth header en cada request:
```
Authorization: Bearer {PRIVATE_TOKEN}
```

---

## Endpoints relevantes

### Lo que SÍ existe y sirve

| Endpoint | Uso |
|---|---|
| `GET /v3/events/{event_id}/` | Detalle de un evento. Incluye name, description, start, end, url, venue_id, organizer_id, capacity, status. |
| `GET /v3/events/{event_id}/?expand=venue,organizer,ticket_classes,category` | Mismo + relaciones expandidas. **Importante** — sin `expand`, devuelve solo IDs. |
| `GET /v3/organizations/{org_id}/events/` | Listar todos los eventos públicos de un organizer. |
| `GET /v3/organizations/{org_id}/events/?status=live&order_by=start_asc&expand=venue` | Próximos eventos del organizer ordenados. |
| `GET /v3/venues/{venue_id}/` | Detalle de un venue. |
| `GET /v3/venues/{venue_id}/events/` | Eventos de un venue conocido. |
| `GET /v3/categories/` | Lista de categorías ("Music", "Hip Hop / Rap", "Latin", etc.). |

### Lo que YA NO existe

| Endpoint | Status |
|---|---|
| `GET /v3/events/search/?q=&location=` | ⛔ **REMOVIDO diciembre 2019**. No reemplazo público. |
| Categorías browse-by | ⛔ Solo via web pública (eventbrite.com/d/{location}/{category}/), no via API. |

---

## Rate limits

**Oficial:**
- 1,000 requests / hour por token.
- 48,000 requests / day por token.

**Reportes devs 2024-2025:** se cumplen consistentemente. No hay throttle silencioso reportado.

**Aumento de límites:** disponible bajo solicitud directa al support de Eventbrite. No garantizado, requiere caso de uso justificable y partnership.

**Para Dauton:** 48k/día alcanza largo si nuestra DB de organizers se mantiene en cientos, no miles.

---

## Schemas útiles

### Event object (response shape resumida)

```json
{
  "id": "1234567890",
  "name": { "text": "Apache en Madrid - Tour 2026", "html": "..." },
  "description": { "text": "...", "html": "..." },
  "url": "https://www.eventbrite.com/e/apache-en-madrid-1234567890",
  "start": { "timezone": "Europe/Madrid", "local": "2026-09-15T22:00:00", "utc": "2026-09-15T20:00:00Z" },
  "end": { ... },
  "status": "live",  // "draft", "live", "started", "ended", "completed", "canceled"
  "currency": "EUR",
  "venue_id": "v_98765",
  "organizer_id": "o_54321",
  "category_id": "103",   // Music
  "subcategory_id": "3008",  // Hip Hop / Rap
  "online_event": false,
  "capacity": 500,
  "is_free": false,
  "logo": { "url": "https://..." },
  "_expanded_": {
    "venue": { "name": "Sala X", "address": { "city": "Madrid", "country": "ES", ... }, "latitude": "...", "longitude": "..." },
    "organizer": { "name": "Promotora X", "id": "...", "url": "..." }
  }
}
```

### Mapping a nuestro schema

| Eventbrite | → Dauton |
|---|---|
| `id` | `events.external_id` (con `external_source = 'eventbrite'`) |
| `name.text` | `events.title` |
| `start.utc` | `events.event_date` |
| `venue.address.city` | resolve → `events.city_id` |
| `category_id = 103` + `subcategory_id ∈ {hip-hop, latin}` | filter inicial |
| `url` | `events.external_url` (CTA "Comprar entrada") |
| `organizer.name` | `events.metadata.organizer` |
| `venue.name` + `venue.lat/lng` | `events.venue` o nueva tabla |

**Atribución obligatoria por ToS:** event title + link directo a eventbrite.com debe estar visible. No removable.

---

## Costos

- **API:** $0. No hay tier paid de la API misma.
- **Transaccional (si vendemos tickets nosotros):** $1.79/ticket + 3.7% service fee + 2.9% payment processing. **No aplica para Dauton MVP** — solo redirigimos.

---

## Términos de uso (compliance)

[https://www.eventbrite.com/help/en-us/articles/833731/eventbrite-api-terms-of-use/](https://www.eventbrite.com/help/en-us/articles/833731/eventbrite-api-terms-of-use/)

**Permitido:**
- Mostrar eventos en sitios de terceros con título + link a eventbrite.com.
- Redirigir users a comprar en Eventbrite.

**Prohibido:**
- Replicar la búsqueda de Eventbrite (¿implícito por el deprecation de search API?).
- Uso de trademarks Eventbrite sin consentimiento escrito.
- Crear competidor de Eventbrite con su data.

**No hay programa público de affiliate / commission.** Dauton redirige sin tracking comercial — fase de monetización tickets requiere partnerships directos con promotores latinos, no Eventbrite affiliate.

---

## Cobertura geográfica para nuestro use case

Eventos visibles vía web pública (no via API search — que no existe):

| Región | Cobertura rap/hip hop/urbano latino | Nota |
|---|---|---|
| **Miami** | Excelente | Wynwood, Miami Beach, Hialeah. Promotores como Chocolate Latte, Latino Vibes, etc. |
| **NYC + LA + Houston + Orlando** | Buena | Diáspora latina activa. |
| **Madrid + Barcelona** | Buena | Hip-hop hispanohablante consolidado. |
| **Bogotá + Medellín** | Media | Eventos sí, pero parte usa Tu Boleta (local) o Pass Line. |
| **Caracas + interior VE** | Baja a nula | Eventbrite poco usado. La diáspora VE en otras ciudades sí. |
| **CDMX + Guadalajara + Monterrey** | Buena | Hip-hop mexicano consolidado, parte en Boletia (local) o BoletoMovil. |

**Implicación:** Eventbrite cubre bien la **diáspora**, no el **VE local**. Esto coincide con el público primario de Dauton (diáspora) — bueno.

---

## Comparación contra alternativas

| Plataforma | Search API global | Status 2026 | Cobertura LATAM/diáspora |
|---|---|---|---|
| **Eventbrite** | ⛔ removido 2019 | Sirve por org/venue específico | Buena en USA latino + España |
| **Songkick** | ⛔ discontinued para devs externos 2017 | Sin API pública | — |
| **Bandsintown** | ✅ existe | Free `app_id` | Cobertura VE baja, USA latino media |
| **Setlist.fm** | ✅ existe | Free, requiere MBID | Históricos buenos para pillars |
| **Ticketmaster Discovery** | ✅ existe | Free 5K/día | VE = ~0%, USA latino ~5-10% |
| **Dice.fm** | ✅ existe | Beta access required | Emergente. Buena UX pero cobertura latina aún limitada. |
| **SeatGeek** | ✅ existe | Free tier limited | USA cobertura buena. LATAM mínima. |

---

## Estrategia recomendada para Dauton

Dado que no hay search global en Eventbrite, **arquitectura híbrida** es la única vía:

### Paso 1 — Construir DB de organizers + venues latinos relevantes

**Curación inicial manual** (50-100 entries):
- Organizers conocidos en Miami latino, NYC, LA, Madrid, Barcelona, Bogotá.
- Venues fijos donde hay residencia hip-hop latino (ej. Sala But Madrid, Mansion Wynwood, Conga Room LA).
- Sources: Google búsqueda manual, IG de los promotores, listings públicos.

**Mantenimiento automático:**
- Worker semanal scrape `eventbrite.com/d/{location}/music--hip-hop-rap/` (URL pública, no API).
- Extract organizer IDs nuevos.
- Add a DB. Marcar como `pending_review` para curación.

### Paso 2 — Consultar Eventbrite API por cada organizer

Cron diaria: `for each organizer_id → GET /v3/organizations/{org_id}/events/?status=live&expand=venue,organizer`.

Filtrar:
- Category = Music + Subcategory ∈ Hip Hop/Rap/Latin.
- Venue.country ∈ países target diáspora.
- Title o description contiene keywords (artistas en nuestra DB).

### Paso 3 — Match con artistas Dauton

Para cada event:
- Parse title + description buscando stage_names de la `people` table (con fuzzy match).
- Si match → insert en `event_participants(event_id, person_id)`.
- Generar URL `/eventos/{event_slug}` y aparecer en `/artistas/{slug}/eventos`.

### Paso 4 — Fallback con Bandsintown + scraping IG

Para artistas con poco match desde Eventbrite (artistas VE locales que tocan en sitios sin Eventbrite):
- Reactivar Bandsintown ingestion (ya scoped Stage 7b, deferred a v2.0).
- Scraping ético de IG de promotores VE locales (Apartaco, La Guarimba, etc.) con Firecrawl + Claude extraction. Post-MVP.

---

## Caveats

- **Search API removal** es definitivo. Eventbrite no lo va a reactivar (estrategia anti-aggregator).
- Algunos events tienen `description` oculto cuando organizer no quiere indexing externo. Los excluimos.
- Events `online_event = true` lo más probable es que no nos sirvan — filtrar.
- Currency varies por country. Mostramos en local + tooltip USD.

---

## Acción para Luis (signup)

1. Sign up en https://www.eventbrite.com/platform/api con email dedicado al proyecto.
2. Account Settings → Developer Links → API Keys → **Generate Private Token**.
3. Guardar como `EVENTBRITE_PRIVATE_TOKEN` en `.env.local` + Vercel envvars production.
4. Sin paso adicional — token funciona inmediato.

---

## References

- [API docs](https://www.eventbrite.com/platform/api)
- [API ToS](https://www.eventbrite.com/help/en-us/articles/833731/eventbrite-api-terms-of-use/)
- [Authentication docs](https://www.eventbrite.com/platform/docs/authentication)
- [Search API removal context (2019)](https://www.eventbrite.com/platform/docs/changelog) — historial de breaking changes.

---

## Last reviewed

- 2026-04-25 — Data & SEO chat — research profunda post-prioridad founder.
