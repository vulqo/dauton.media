# Email Discovery Playbook — Cómo Conseguimos Emails de Artistas

**Department:** Operations · Community & Outreach
**Owner:** Community & Outreach
**Last updated:** 2026-04-24
**Status:** draft v1 — propuesta, requiere validation Business & Legal antes de ejecutar.

---

## Principio no negociable

**Solo usamos emails declarados públicamente por el propio artista o su management autorizado.** Nunca:

- Data brokers (Hunter.io enrichment, Apollo, RocketReach, ZoomInfo, etc.) — son B2B y además éticamente problemáticos para contactar artistas.
- Leaks o breaches (haveibeenpwned, databases filtradas).
- Scraping de áreas privadas (inbox, panels, directorios de management sin declaración pública).
- Compras de listas.
- Email guessing (`firstname.lastname@...`) sin verificación.

La razón no es solo legal (GDPR, CAN-SPAM, CCPA). Es reputacional: si un artista nos odia porque lo contactamos con email que no sabía que teníamos, quemamos la relación con todo su círculo para siempre. El rap hispano es una comunidad interconectada — mala reputación se propaga en 48h.

---

## Fuentes válidas (orden de preferencia)

### Tier 1 — Altamente confiables

Emails declarados directamente por el artista en su bio pública.

1. **Instagram bio** — `@[artista]` → bio contiene `hola@artista.com` o similar.
2. **Twitter/X bio** — mismo patrón.
3. **Website propio del artista** — dominio del artista con página "Contact" o footer con email.
4. **Linktree / Beacons / Koji** — links pages con "Booking" o "Contact".
5. **Bandcamp bio** — sección "about" contiene email.
6. **Spotify for Artists profile** — si el artista publicó email de contacto en su bio de Spotify (raro pero ocurre).
7. **YouTube About page** — sección "Business inquiries".

### Tier 2 — Confiables con verificación

Emails declarados por management autorizado del artista.

1. **Press releases oficiales** — comunicados publicados en sites del artista o PR agency listando contact@manager.com.
2. **EPK (Electronic Press Kit)** del artista disponible públicamente.
3. **Manager/Label listado en bio del artista** — si el artista dice "Booking: email@management.com", ese email es válido para outreach (pero el copy cambia — ver below).

### Tier 3 — Derivables (requiere validación humana)

No vienen directamente del artista, pero son inferibles con alta confianza.

1. **Wikidata** — `P968 (email)` o `P856 (official website)` → scrape el sitio oficial.
2. **MusicBrainz** — URL relations `email` o `website official` → mismo flujo que Wikidata.
3. **Bandsintown / Songkick** — booking contact si es público.
4. **Whois del dominio propio** — registrar contact email (si GDPR no redactó, muchos indie usan email real).

**Tier 3 requiere:** validación humana antes de incluir en batch + marcar en DB como `source='derived'` para reporting diferenciado.

### No-gos (nunca)

- Email inferido por pattern sin fuente pública.
- Email extraído de DMs privados (aunque sea público en otro contexto).
- Email comprado a terceros.
- Email de breach.
- Email listado en directorios de industry que no son oficiales del artista.

---

## Pipeline técnico de discovery

Este pipeline corre en GitHub Actions cron semanal después de Sprint 5. Output: tabla `artist_contact_emails` en Supabase con columnas de sourcing + verification status.

### Stage 1 — Enumerar sources por artista

Para cada `people` row con `completeness_score >= 70` y sin email ya registrado:

```
FOR artist IN people:
  sources_to_check = []
  IF artist.instagram_handle: sources_to_check.append('instagram')
  IF artist.twitter_handle: sources_to_check.append('twitter')
  IF artist.spotify_id: sources_to_check.append('spotify_artist_page')
  IF artist.youtube_channel_id: sources_to_check.append('youtube_about')
  IF artist.bandcamp_handle: sources_to_check.append('bandcamp')
  IF artist.genius_id: sources_to_check.append('genius_profile')
  IF artist.wikidata_id: sources_to_check.append('wikidata')
  IF artist.musicbrainz_id: sources_to_check.append('mb_urls')
  IF artist.official_website: sources_to_check.append('website_direct')
```

### Stage 2 — Scrape por source

Dispatcher llama workers específicos:

#### Worker: Instagram bio
- **Tool:** Apify IG scraper actor (`apify/instagram-scraper`).
- **Costo:** ~$0.50 por 1000 perfiles.
- **Output:** bio text → regex para email pattern → validar con DNS MX.
- **Rate limit:** respetamos límites de Apify para evitar bans.
- **Ejemplo output:** `bio="📍 Caracas. Booking: contacto@apache.com"` → extrae `contacto@apache.com` + source `'instagram_bio'`.

#### Worker: Twitter/X bio
- **Tool:** Apify X scraper actor.
- **Output:** bio → regex → email.
- **Nota:** desde 2024 X API es $$$. Usamos scraping de bio público (no requiere API).

#### Worker: Spotify artist page bio
- **Tool:** Spotify Web API (ya tenemos).
- **Endpoint:** `/artists/{id}` → campo `bio` si public.
- **Nota:** rarely email in Spotify bio, pero worth checking.

#### Worker: YouTube About
- **Tool:** YouTube Data API `channels.list` with part `snippet,brandingSettings`.
- **Output:** `brandingSettings.channel.channelDescription` + "Business inquiries" link.
- **Costo:** $0 dentro de quota.

#### Worker: Bandcamp bio
- **Tool:** Firecrawl sobre `{handle}.bandcamp.com` → scrape "about" section.
- **Costo:** $0.02/scrape (tenemos Firecrawl de ingestion).

#### Worker: Genius profile
- **Tool:** Genius API `/artists/{id}` → fields `description` + `urls`.
- **Costo:** $0 (tenemos key).

#### Worker: Wikidata
- **Tool:** Wikidata SPARQL.
- **Query ejemplo:**
  ```sparql
  SELECT ?email ?website WHERE {
    wd:Q18821745 wdt:P968 ?email .
    wd:Q18821745 wdt:P856 ?website .
  }
  ```
- **Costo:** $0.

#### Worker: MusicBrainz URL relations
- **Tool:** MB API `/artist/{mbid}?inc=url-rels`.
- **Parse:** relations con type `official homepage`, `bandcamp`, `youtube`, etc.
- **Costo:** $0.

#### Worker: Website directo
- **Tool:** Firecrawl sobre domain propio.
- **Parse:** footer email + página "contact".
- **Costo:** $0.02/scrape.

### Stage 3 — Normalization + dedupe

Para cada artista, aggregate de todas las sources:

```
{
  person_id: "...",
  candidates: [
    { email: "apache@gmail.com", source: "instagram_bio", confidence: 0.9 },
    { email: "apache@gmail.com", source: "twitter_bio", confidence: 0.9 },
    { email: "booking@ohmgr.com", source: "website_footer", confidence: 0.7 }
  ]
}
```

Reglas de dedupe:
- Si el mismo email aparece en ≥2 sources: alta confianza, marcar `verified: true`.
- Si aparece solo en 1 source de Tier 1: media confianza.
- Si aparece solo en Tier 2 (management/booking): alta confianza para outreach pero copy adaptado.
- Si aparece solo en Tier 3 (derivado): requiere review humano.

### Stage 4 — Validation (anti-bounce)

Antes de insertar en `artist_contact_emails`:

1. **DNS MX check:** el dominio del email acepta mail? (librería `mail-check` de npm).
2. **Disposable email check:** rechazar `@mailinator.com`, `@guerrillamail.com`, etc.
3. **Role-based email check:** `info@`, `contact@`, `admin@` son aceptables pero marcar `is_role_based: true` — copy adaptado.
4. **SMTP verification:** NO hacer (genera ruido en logs del servidor receptor + puede flag como spam). Solo DNS-level.

### Stage 5 — Insert en Supabase

Schema propuesto para Engineering:

```sql
CREATE TABLE artist_contact_emails (
  id uuid PRIMARY KEY,
  person_id uuid REFERENCES people NOT NULL,
  email text NOT NULL,
  source text NOT NULL,               -- 'instagram_bio', 'twitter_bio', 'wikidata', etc.
  source_url text,                    -- URL específica donde se encontró
  tier smallint NOT NULL,             -- 1, 2, 3
  confidence numeric(3,2),            -- 0.00 - 1.00
  is_role_based boolean DEFAULT false, -- true si info@, contact@, etc.
  is_management boolean DEFAULT false, -- true si apunta a manager/label
  verified_count smallint DEFAULT 1,   -- cuántas sources lo confirman
  dns_mx_valid boolean,
  last_checked_at timestamptz,
  opt_out boolean DEFAULT false,       -- true si pidieron eliminación
  created_at timestamptz DEFAULT now(),
  UNIQUE (person_id, email)
);

CREATE INDEX ON artist_contact_emails(person_id);
CREATE INDEX ON artist_contact_emails(email);
```

RLS: read-only para editors + admin. No exposure público (contiene PII).

---

## Copy adaptado por source tier

El email outreach cambia según dónde conseguimos el email.

### Tier 1 — Email directo del artista

Copy normal (template `email_1_profile_ready` en `artist-outreach.md`). Tú le hablas directamente.

### Tier 2 — Email de management/booking

Copy adaptado:

```
Asunto: Dauton Media — perfil de {{stage_name}}

Buenos días,

Les escribo desde Dauton Media, un archivo del rap hispanohablante.

Ya tenemos publicado el perfil de {{stage_name}}:
{{profile_url}}

El material lo armamos con fuentes públicas (Spotify, MusicBrainz, Wikipedia, Genius). Si pudiera reenviar esta nota a {{stage_name}} o al responsable de comunicación, podría revisar el contenido y, si le interesa, reclamar el perfil para tomar control editorial:

{{claim_url}}

Gracias por el tiempo.

— Equipo Dauton Media
```

Más formal, tono menor a management. Claim sigue siendo invite.

### Tier 3 — Email derivado

NO enviamos outreach masivo automático. Flag para review humano. Community & Outreach valida caso-por-caso antes de enviar.

---

## Fuentes que NO scrapeamos

Para transparencia total — estas fuentes NO las tocamos aunque técnicamente puedan tener emails:

- **Grupos de Facebook privados.**
- **Discord servers externos.**
- **Whatsapp groups / channels.**
- **Inbox de IG/Twitter DMs** (aunque Luis tenga acceso — no se usa para harvesting).
- **Directorios de managers que requieren login.**
- **Anuncios de eventos en eventbrite/resident advisor** (contact fields son organizers, no artists).
- **Listas de contactos de labels filtradas.**

---

## Tamaño esperado de catch

Estimación basada en benchmarks de discovery en otros nichos:

| Cohort | Total artists | Hit rate | Emails conseguidos |
|---|---|---|---|
| Pillars (15) | 15 | 80% | ~12 |
| Top relevancia (100) | 100 | 50-60% | ~50-60 |
| Long tail (500) | 500 | 30-40% | ~150-200 |
| **Total** | 615 | 35% avg | **~200-270** |

Parece bajo pero es realistic. La mayoría de artistas independientes no publica email en redes. Management emails compensan (más fáciles de conseguir).

Para el resto (65%+ sin email), **DM en IG sigue siendo opción** pero:
- 1 DM por artista, nunca más.
- Copy sobrio sin request inmediato.
- Link al perfil + claim opcional.
- Si no responden en 7d, dejamos en paz.

---

## Refresh cadence

Pipeline corre cada semana. Pero los emails se capturan una vez y se refrescan cada 6 meses:

- Alta churn: artistas cambian emails con frecuencia (cambio de management).
- Si un email bounces 2+ veces consecutivas, flag `invalid`, rescrape desde sources.
- Si un artista con email en DB cambió su Instagram bio, rescan.

---

## Legalidad (dependencia Biz-Legal)

Requiere validación Business & Legal antes de ejecutar pipeline completo.

Puntos específicos a confirmar:

1. **GDPR (artistas en UE - España principalmente):**
   - Base legal para contacto: "intereses legítimos" (art. 6.1.f) es tentador. Validar.
   - Honor `opt-out` immediato + derecho al olvido.
   - DPO contact en privacy policy.

2. **CAN-SPAM (USA + diáspora USA):**
   - Unsubscribe link en cada email.
   - Dirección física en footer.
   - No falsear sender / subject line.

3. **LGPD (Brasil — no es foco principal pero hay diáspora VE en Brasil):**
   - Similar GDPR. Honor opt-out.

4. **LFPDPPP (México):**
   - Consent requirement más laxo pero honor opt-out.

5. **Ley venezolana de protección de datos:**
   - En evolución. Benchmark: aplicar standard más alto (GDPR) por seguridad.

6. **Legal de scraping:**
   - Apify y similar: cumplimos TOS de cada plataforma.
   - Scraping de bios públicas generalmente permitido, pero TOS de IG/X prohibe scraping a escala. Riesgo real de ban de cuenta Dauton si se identifica. Mitigación: usar Apify como proxy (ellos absorben ban risk).

Ticket [BIZ-LEGAL]: review + sign-off del pipeline + sign-off de los copy templates.

---

## Ownership

| Etapa | Owner |
|---|---|
| Pipeline implementación | Engineering |
| Workers por source | Engineering |
| Tabla `artist_contact_emails` + RLS | Engineering |
| Prompts / copy de outreach | Community & Outreach |
| Validation tier 3 (derivados) | Community & Outreach |
| Legal review | Business & Legal |
| Monitoring bounces / opt-outs | Community & Outreach |

---

## Métricas del pipeline

Dashboard a crear (admin panel):

- Total artists con email encontrado / total artists con completeness ≥70.
- Breakdown por source (cuántos de IG vs Twitter vs Wikidata, etc.).
- Distribución de tiers.
- Bounce rate post-envío.
- Opt-out rate post-envío.
- Time-to-email-found (desde completeness = 70% hasta email verificado).

---

## Próximos pasos

1. Biz-Legal review de este playbook completo.
2. [ENG] ticket: schema `artist_contact_emails` + workers de discovery.
3. Community valida output de workers con primeros 30 artistas antes de scale.
4. Refresh de `artist-outreach.md` con lógica de tier-based copy.
5. Integración con pipeline de outreach: email discovery → cohort query → batch send via Resend.

---

*See also: `artist-outreach.md` · `../07-Marketing-Growth/ai-marketing-stack.md` · `moderation-workflow.md` · `admin-operations.md`*
