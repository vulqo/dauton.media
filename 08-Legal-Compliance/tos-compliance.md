# ToS Compliance — Fuentes externas de data

**Owner:** Business & Legal agent
**Última actualización:** 2026-04-25
**Status:** v1 — live
**Revisión obligatoria:** cada 6 meses o cuando la fuente actualice ToS.

---

## Propósito

Cada fuente externa que ingiere Dauton Media tiene Terms of Service que limitan qué podemos mostrar, almacenar, redistribuir, o monetizar con su data. Este doc es el **mapa vigente** de lo que cada ToS permite y prohíbe, y qué decisiones operativas se derivan.

La hipótesis del founder ("data pública = legal safe") **no es correcta en abstracto** — data pública puede tener restricciones contractuales vía ToS que limitan uso derivativo. Este doc baja esa hipótesis a evidencia por fuente.

---

## Resumen ejecutivo

| Fuente | Tipo licencia | ¿Podemos mostrar? | ¿Podemos cachear en DB? | ¿Podemos monetizar derivadamente? | Status Dauton |
|---|---|---|---|---|---|
| **Spotify Web API** | ToS propietaria, developer policy restrictiva | Sí con attribution | Sí temporalmente | ⚠ restrictivo — no data licensing | ✓ en uso |
| **MusicBrainz** | CC0 (data) + CC BY-NC-SA (cover art archive) | Sí | Sí permanente | Sí (data is CC0) | ✓ en uso |
| **Wikipedia / Wikidata** | CC BY-SA 4.0 (Wikipedia) / CC0 (Wikidata) | Sí con attribution | Sí | Sí con attribution | ✓ en uso |
| **Genius API** | ToS propietaria, no-redistribution de lyrics | Metadata sí, lyrics NO | Metadata sí | ⚠ restrictivo | ✓ en uso (sin lyrics) |
| **YouTube Data API** | ToS YouTube + Google Developer Policy | Metadata sí, oficial embed sí | Limitado (ver §24h rule) | ⚠ restrictivo | ⚠ parcial |
| **Instagram** | ToS restrictiva, no scraping permitido | Embed oficial sí | NO scraping | NO sin API | ✗ NO usar scraping |
| **Eventbrite API** | ToS developer | Sí | Sí | Sí con partnership | pendiente integración |
| **Ticketmaster Discovery** | Partner program, application gated | Sí (partners) | Sí limitado | Sí con partnership | pendiente partnership |
| **Bandsintown API** | ToS + partner program | Sí | Sí limitado | Sí con partnership | pendiente aplicación |
| **Firecrawl (scraping tool)** | Nuestra tool — el riesgo es la fuente que scrapeamos | Depende de fuente | Depende de fuente | Depende de fuente | caso por caso |

---

## Por fuente — detalle

### 1. Spotify Web API

**Documento consultado:** [developer.spotify.com/terms](https://developer.spotify.com/terms) + Developer Policy.

**Lo que permite:**
- Consulta de metadata de artistas, álbumes, tracks vía API.
- Display de album art (con attribution "powered by Spotify" cuando aplica).
- Link-out a Spotify URIs.
- Oficial embed player (iframe de Spotify) para reproducción.
- Caching temporal de data para performance.

**Lo que prohíbe explícitamente:**
- **Redistribuir data de Spotify a terceros comerciales.** Esto matta Track 7 (Data Licensing B2B) si el dataset se alimenta solo de Spotify.
- **Crear producto que compita con Spotify.** No aplica a Dauton.
- **Data mining masivo para modelos predictivos** sin approval específico. Aplica si usamos Spotify data en una calculadora de ingresos con alto volumen de queries.
- **Uso en publicidad o marketing pagado.** Feature comercial legítimo con attribution está permitido.

**Cambios 2024 relevantes:**
- `followers` y `popularity` removidos del Client Credentials flow. Documentado en `05-Data/api-docs/spotify.md`. Solo vía OAuth user flow o scraping UI (este último no permitido).

**Decisión operativa Dauton:**
- ✓ Ingestion para archive público con attribution visible: ALINEADO.
- ✓ Calculadora de ingresos basada en data pública (streams, duración, features): ALINEADO si volumen razonable.
- ⚠ Data Licensing B2B (Track 7): **NO puede alimentarse solo de Spotify.** Necesita mezcla con MB, Genius, Wikidata, y data propia (contribuciones). El licensee recibe data derivada + agregada, no raw Spotify data.
- ⚠ Sponsored features con Spotify data visible: requiere attribution + disclosure.

**Attribution requerido:** logo Spotify + "Data via Spotify" en footer de cualquier sección que use su data. Ver Spotify Design Guidelines.

**Rate limits:** Spotify no documenta límite exacto público. Burst penalty hasta ~23h confirmado empíricamente (Sprint 4 incidente). Regla operativa: spacing 300ms mínimo + circuit breaker cuando `Retry-After > 30s`.

---

### 2. MusicBrainz

**Documento consultado:** [musicbrainz.org/doc/About/Data_License](https://musicbrainz.org/doc/About/Data_License).

**Licencia:**
- Core database (artists, releases, recordings, relationships): **CC0** (dominio público).
- Cover Art Archive: **CC BY-NC-SA** para download, pero linkout libre.

**Lo que permite:**
- Ingestion total.
- Redistribución total (el data es CC0 — literalmente dominio público).
- Uso comercial.
- Data licensing B2B.
- Contribuciones upstream (nosotros corregimos, ellos reciben).

**Lo que requiere:**
- Rate limit: 1 req/s hard. Documentado. User-Agent obligatorio con contacto.
- Si somos commercial grande: sugieren donación (no obligatoria).

**Lo que prohíbe:**
- Nada material. Es CC0.

**Decisión operativa Dauton:**
- ✓✓ Esta es nuestra fuente **más libre legalmente**. Base ideal para Track 7 data licensing.
- ✓ Estrategia: maximizar MB como "spine" del grafo, con Spotify/Genius/Wiki como enriquecimiento secundario.
- ✓ Contribuir upstream cuando corregimos data — goodwill + compliance moral con CC0 ethos.

---

### 3. Wikipedia / Wikidata

**Documento consultado:** Wikimedia Terms of Use + licencias CC.

**Licencia:**
- Wikipedia text: **CC BY-SA 4.0** (atribución + share-alike).
- Wikidata: **CC0** (dominio público).
- Wikipedia images: varía — mayoría CC, algunas fair use que NO pueden redistribuirse fuera de Wikipedia.

**Lo que permite (CC BY-SA):**
- Copiar, redistribuir, modificar, uso comercial.
- Con atribución + mismo license para derivados.

**Lo que requiere:**
- Attribution: "Source: Wikipedia contributors" + link al artículo específico + license notice.
- Share-alike: cualquier derivado de texto de Wikipedia queda bajo CC BY-SA. **Esto es viral** — si mezclamos texto de Wikipedia con nuestras bios, la mezcla queda CC BY-SA.

**Decisión operativa Dauton:**
- ✓ Wikidata (CC0) para cross-IDs y datos estructurados: ilimitado.
- ⚠ Wikipedia summaries: **no copiar texto literal** a bios del artista. Usar como **source para fact-check + para enriquecer data estructurada** (fechas, colaboraciones). Si citamos fragmento textual, attribution explícita + considerar si la bio queda viralmente CC BY-SA.
- **Decisión firme:** bios del artista en Dauton son **originales**, generadas por nosotros (AI + fact-check manual), usando Wikipedia como fuente pero no como texto. Así evitamos contaminación viral de CC BY-SA en nuestro contenido.
- ⚠ Imágenes de Wikipedia: solo las que sean CC BY / CC BY-SA / public domain. Nunca las marcadas "fair use" (esas solo valen dentro de Wikipedia).

---

### 4. Genius API

**Documento consultado:** genius.com/developers/docs.

**Licencia/ToS:**
- API gratuita con Client Access Token.
- **Lyrics NO se redistribuyen por API.** Solo metadata (canción, producers, writers, samples, relationships).
- Para lyrics, solo link-out a Genius.com.

**Lo que permite:**
- Metadata: canciones, álbumes, producers, writers, samples — sí.
- Artist pages, relationships, featured artists — sí.

**Lo que prohíbe:**
- Scrapear lyrics de Genius.com (explícito en ToS).
- Redistribuir data de Genius en producto que compita.

**Decisión operativa Dauton:**
- ✓ Ingestion de metadata + samples + credits: ALINEADO con ToS.
- ✗ Hostear lyrics propios: NO (ya es política Dauton — no hospedamos lyrics).
- ✓ Link-out a Genius para lyrics: ALINEADO.
- ⚠ Si activamos Track 7 Data Licensing: la data de credits Genius **puede** redistribuirse en paquete con attribution, pero conservador — **preferir MB como fuente de credits** para el B2B licensing; Genius como secundario/complemento.

---

### 5. YouTube Data API + YouTube Content

**Documento consultado:** YouTube API Services Terms of Service + Developer Policy.

**Licencia/ToS:**
- API gratuita con quota diaria.
- **YouTube Developer Policy sección III.E.4.a:** data obtenida vía API debe refrescarse cada 30 días O eliminarse. No almacenamiento permanente de metadata.
- Embed oficial permitido (iframe player). Reproducción controlada por YouTube + creator.

**Lo que permite:**
- Consulta de metadata: video ID, title, channel, upload date, duration, view count (snapshot).
- Oficial embed en nuestro site.
- Linkout al video.
- Display de thumbnail oficial (vía API).

**Lo que prohíbe:**
- Re-upload de videos.
- Scrape de transcripts fuera del API oficial (que limita qué transcripts expone).
- Caching permanente — max 30 días, después refresh o delete.
- Monetizar YouTube data en producto que cause daño competitivo a YouTube.

**Decisión operativa Dauton:**
- ✓ Embed oficial de videos en páginas de release/track: ALINEADO.
- ✓ Metadata con refresh ≤ 30d: ALINEADO. **Engineering tiene que implementar refresh/expiry en `videos` table.** Item en legal-research-list.
- ⚠ Transcripts Apartaco (Sprint 9 candidato): si usamos transcripts del API oficial, OK. Si scrapeamos transcripts fuera del API, **violación**. Decisión: usar Whisper nuestro sobre audio oficial, NO scrapear transcripts de YouTube UI.
- ✗ Data licensing B2B con data YouTube: **NO incluir** — el 30d refresh rule lo hace impráctico + YouTube specifically prohibits.

---

### 6. Instagram / Meta (scraping de stats públicos)

**Documento consultado:** Meta Platform Terms + Instagram ToS.

**Status:** **ALTA RESTRICCIÓN.**

**Lo que permite:**
- Instagram Basic Display API (deprecated 2024) / Instagram Graph API: limitada a la propia cuenta del developer o Business accounts con permission.
- oEmbed oficial para embed de posts.
- User-provided access tokens para cuentas claim-ed.

**Lo que prohíbe:**
- **Scraping de perfiles públicos sin API:** explícito en ToS, violación.
- Caso legal de referencia: *HiQ Labs v. LinkedIn* 2022 (Circuit US) dejó en gris scraping de público, pero el 9° Circuit revisado dijo que scraping puede violar CFAA si hay bloqueo técnico. **Riesgo real.**
- Meta ha blocked IPs y demandado civilmente a scrapers comerciales (ej. Bright Data case 2023).

**Decisión operativa Dauton:**
- ✗ **NO scraping de Instagram para followers/stats.** Period.
- ✓ Opción 1: esperar a que el artista haga claim + conectar su IG vía Graph API con su token (legítimo).
- ✓ Opción 2: usar third-party aggregators con licencia (ej. Social Blade API si existe program) — auditar cada uno ANTES de integrar.
- ✓ Opción 3: dato ingresado manualmente o via user-contribution (followers count = snapshot público, no scraped).
- ⚠ Si un worker del repo scrapea IG (ej. en plan-maestro.md se menciona "Instagram (públicas) → normalización"): **BLOCKER hasta cambiar estrategia.** Abrir ticket [BIZ-LEGAL] urgente para verificar.

**Research pendiente:** ¿el repo actual tiene scraper IG funcionando? Si sí, pausar y evaluar.

---

### 7. Eventbrite API

**Documento consultado:** eventbrite.com/platform/api.

**ToS:**
- API gratuita para consumer use + tier partner.
- Permite consultar eventos públicos por location, keyword, artist.
- Permite "promoter" accounts para referrals.

**Lo que permite:**
- Mostrar eventos públicos + detalles + link-out.
- Affiliate program: Dauton refiere, Eventbrite paga (% variable).
- Caching de data con refresh regular.

**Lo que prohíbe:**
- Venta directa de tickets sin autorización.
- Usar Eventbrite data para promover plataforma competidora.

**Decisión operativa Dauton:**
- ✓ Ingestion de eventos Venezuela + diáspora (Miami, España, Colombia, USA latino): ALINEADO.
- ✓ Redirect-to-Eventbrite con tracking: ALINEADO.
- ⚠ Affiliate commission (Track 5): solicitar program partner formal. Item en legal-research-list.
- Priority integración: **alta** (según ROADMAP.md, eventos diáspora es prioridad).

---

### 8. Ticketmaster Discovery API

**Documento consultado:** developer.ticketmaster.com.

**ToS:**
- API gated — requiere application + approval.
- Partner Program para commission.

**Lo que permite:**
- Consulta de eventos + artists + venues.
- Display + link-out.
- Commission en Partner Program.

**Lo que prohíbe:**
- Uso sin API key approved.
- Re-selling de tickets sin autorización específica.

**Decisión operativa Dauton:**
- Aplicación a Partner Program: item en legal-research-list, priority post-Fase 3.
- Fallback si rechazan: Eventbrite + Bandsintown + direct-from-promoter.

---

### 9. Bandsintown API

**Documento consultado:** artists.bandsintown.com/support/api-installation.

**ToS:**
- API gated con application.
- Gratuita para uso básico, Bandsintown Plus paid tier para features avanzados.

**Lo que permite:**
- Consulta de tours, upcoming events.
- Display en site propio.
- Partner program para referrals.

**Lo que prohíbe:**
- Redistribuir data sin attribution.
- Uso sin API key.

**Decisión operativa Dauton:**
- Aplicar API key + explorar Partner Program: item en legal-research-list, priority Fase 3-4.

---

### 10. Firecrawl (herramienta de scraping)

**Status especial:** Firecrawl es **nuestra herramienta**, no una fuente. El riesgo legal viene de **qué scrapeamos con ella**, no de la tool misma.

**Reglas operativas Dauton para Firecrawl:**
- Solo scraping de sitios que explícitamente permitan crawling (check `robots.txt`).
- Respetar rate limits del sitio target.
- No bypass de paywalls ni anti-scraping.
- Priorizar siempre API oficial sobre scraping.
- Si el sitio no tiene API pero permite scraping: proceder con spacing conservador + attribution.
- Si el sitio prohíbe scraping en ToS/robots.txt: **NO usar**.

**Uso actual documentado:** `05-Data/api-docs/firecrawl.md` (ver detalle).

---

## Precedentes legales relevantes (US)

### Fair use industry practice para cover art
**Precedente:** Discogs, RYM, AllMusic, Genius, Wikipedia — todos muestran cover art de releases para factual identification sin licencia. Industry standard 20+ años sin litigation significativa.
**Aplicación Dauton:** display de cover art en páginas de release está protegido por **fair use nominativo**. Mantener size razonable (thumbnail 300×300, full 800×800 max).

### Scraping de data pública
**Precedente:** *HiQ Labs v. LinkedIn* (9th Cir. 2022, remanded). Permite scraping de data pública pero sujeto a state law.
**Aplicación Dauton:** scraping solo donde no hay ToS prohibition + no bloqueo técnico deliberado.

### Facts are not copyrightable
**Precedente:** *Feist Publications v. Rural Telephone* (1991, SCOTUS). Facts + compilaciones de facts no son copyrightables per se; la selección y arrangement editorial sí.
**Aplicación Dauton:** nuestro "grafo editorial" (cómo estructuramos entidades + qué artistas incluimos + cómo los categorizamos) **es nuestro IP**. Los facts sueltos no.

### Right of publicity
**Precedente:** varía por estado (California muy strict, Tennessee, NY). Uso factual-informacional permitido; uso comercial endorsement prohibido sin consent.
**Aplicación Dauton:** mostrar nombre + carrera del artista en archive público: OK (facts + interés público). Usar nombre del artista en marketing de Dauton ("Join, as seen by [Artist]"): NO sin consent.

---

## Mandatos derivados para Engineering

Items que Engineering tiene que implementar como consecuencia de este análisis (detallados en legal-audit-master.md):

1. **YouTube metadata expiry ≤ 30d** en tabla `videos` — refresh job o delete.
2. **Attribution visible** en footer de cada fuente (Spotify logo, MusicBrainz footer, Wikipedia attribution).
3. **No storage de lyrics** — solo link-out a Genius.
4. **No scraping de Instagram** sin API + token — si hay worker haciendolo, remover.
5. **Cover art size cap** — max 800×800 en DB, thumbnail servido 300×300.
6. **DMCA takedown endpoint** funcional pre-launch.
7. **Rate limit spacing configurable** por fuente (ya implementado para Spotify + MB, aplicar a resto).

---

*Cross-refs: `legal-audit-master.md`, `feature-review-workflow.md`, `05-Data/api-docs/*`.*
