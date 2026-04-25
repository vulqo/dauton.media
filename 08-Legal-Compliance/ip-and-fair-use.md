# IP & Fair Use — Dauton Media

**Owner:** Business & Legal agent
**Última actualización:** 2026-04-25
**Status:** v2 — reemplaza v1 (era "Culture Wiki")

---

## Propósito

Este doc clarifica la posición de Dauton Media sobre IP + fair use, guía decisiones operativas, e identifica riesgos. Es interno — informa cómo construimos. Versión pública sanitizada va en `/methodology`.

---

## Principio central

**Publicamos facts sobre la industria musical hispana. NO republicamos el contenido de la industria musical.**

Facts — quién grabó qué cuándo, quién produjo cuál track, quién colaboró con quién — no son copyrightables (precedente *Feist Publications v. Rural Telephone*, SCOTUS 1991). Las expresiones, sound recordings, lyrics, imágenes, videos y artwork producidos por artistas y labels SÍ son copyrighted.

Construimos un grafo factual sobre información pública. Linkeamos a los trabajos copyrighted. No los hosteamos.

---

## Lo que NO reproducimos

### Música
- NO hosteamos audio files.
- NO embebemos streaming players no autorizados.
- Linkeamos a Spotify, Apple Music, YouTube oficiales.
- NO linkeamos a uploads no autorizados o sitios de piratería.
- Embed oficial de Spotify (iframe) permitido — es la distribución del artista.

### Lyrics
- NO mostramos lyrics.
- Linkeamos a Genius cuando existan.
- Si citamos una línea en editorial (raro — no somos editorial blog), fair use con max 1-2 líneas por pieza, transformativo.

### Album art / photos
- **Album covers:** mostramos en páginas de release bajo **fair use para factual identification**. Precedente industrial firme (Discogs, RYM, AllMusic, Wikipedia — todos lo hacen sin litigation).
  - Size cap: thumbnail 300×300, full 800×800 max.
  - Attribution al label cuando conocido.
- **Photos de artistas:** jerarquía estricta (ver `legal-audit-master.md` #3):
  1. Priority 1: artista sube su foto vía claim flow (license grant).
  2. Priority 2: Wikipedia/Commons con license CC compatible.
  3. Priority 3: press photos del artista/label con attribution + consent documentado.
  4. **PROHIBIDO:** Getty/AP/stock agency sin licencia.

### Music videos
- Linkeamos a uploads oficiales en YouTube.
- Embebemos usando el embed oficial de YouTube (es la distribución del artista/label).
- NUNCA re-subimos videos.

### Press article text
- Citamos brevemente (≤15 palabras) con atribución.
- Summarizamos en palabras propias.
- NO reproducimos párrafos ni excerpts substanciales.
- Linkeamos siempre al original.

### Podcast audio / transcripts
- Fase futura: si transcribimos podcast oficial con Whisper sobre audio propio del creator — fair use para factual extraction.
- NUNCA scrapeamos transcripts de YouTube UI (viola ToS).

---

## Lo que creamos

### Nuestro propio texto
Todo contenido editorial en Dauton Media es original — nosotros o contributors. NO texto de Wikipedia pegado. NO rewording tan cercano que califique como derivativo.

**Bios AI-assisted:** el AI puede ayudar a draftear, pero el texto final es original, source-grounded, fact-checked. Ver pipeline en `legal-audit-master.md` #5.

### Nuestra estructura de data
El grafo — cómo organizamos entidades y relaciones, qué artistas incluimos, qué categorizamos cómo — es nuestro IP editorial, protegido como compilation (precedente *Feist*).

### Nuestra imagen + herramientas
Calculadora de ingresos, visualizaciones, timelines, grafos — código + diseño + data propia. Nuestro IP.

---

## Fair use analysis (nuestra posición — US law)

US fair use (17 USC §107) considera 4 factores:

### Factor 1: Purpose and character of the use
Nuestro uso es:
- **Transformativo** — organizamos, contextualizamos, cross-referenciamos; no somos substituto del original.
- **Informacional + educativo** — documentamos, preservamos historia cultural.
- Commercial en naturaleza (post-monetization) pero **reference archives son information services** con strong fair use precedent incluso cuando monetizan.

### Factor 2: Nature of the copyrighted work
- Facts no son copyrightables (*Feist*).
- Factual expressions (prensa reportando eventos) tienen thin copyright protection.
- Album titles, nombres, fechas, discographies son facts.

### Factor 3: Amount and substantiality of use
- Usamos mínimos — thumbnails de cover art, quotes breves, factual extraction.
- NO usamos "el corazón" de ningún trabajo (hook signature, línea memorable de lyric).

### Factor 4: Effect on the market
- NO substituimos ningún trabajo original. Drivemos tráfico a streaming, press articles, plataformas del artista.
- Plausiblemente **aumentamos** market para artistas documentados (somos discovery engine).

Este análisis aplica a US law (Vulqo LLC US-registered). Fair dealing equivalents existen en Venezuelan, EU, y otras jurisdicciones, con variaciones. El agent mantiene position por jurisdicción en `compliance-calendar.md` + research items.

---

## Risk areas específicos

### Risk: Album cover art
- **Precedente:** Discogs, RYM, AllMusic, Genius, Wikipedia — todos muestran cover art para factual ID. Industry-standard 20+ años sin litigation.
- **Nuestro approach:** thumbnails + link to source (label cuando conocido) + respeto a takedown.
- **Mitigation:** DMCA process operativo.

### Risk: Photos de artistas
- **Highest risk area.** Press photos frecuentemente son stock agency (Getty, AP) con aggressive enforcement.
- **Approach:** jerarquía de sourcing (arriba) + photo audit log en DB (columns `photo_source`, `photo_license`, `photo_attribution`).
- **Mitigation:** priorizar claim flow para obtener photos directly del artista con license grant.

### Risk: Embedding social posts
- Oficial embed (Twitter, IG, YouTube) = plataforma tiene license para redistribuir. Low risk.
- NUNCA screenshot + re-host.

### Risk: Press article text
- Quotes ≤15 palabras por source. Summarize en nuestras palabras. Link al original.

### Risk: AI training data allegations
- NO entrenamos AI models con copyrighted content.
- Usamos third-party AI providers (Anthropic) cuyas training practices son responsabilidad de ellos.
- Usamos AI para procesar contenido público y licensed, no para generar trabajos derivativos creativos.

### Risk: Database rights
- En US: data = facts (no copyrightable), compilation selection/arrangement SÍ protegido.
- En UE: Database Directive 96/9/EC da sui generis protection si inversión substancial en obtaining/verifying/presenting data. **Nos aplica** → nuestra base de datos está protegida en UE.
- Consecuencia: podemos LICENCIAR nuestra data (Track 7).
- Scrapers sistemáticos de Dauton infringen.

### Risk: Defamation
- Solo publicamos facts sensitivos (criminal record, disputes profesionales) cuando:
  - Reportados por Tier 1-2 sources independientes, o
  - Auto-reconocidos por el artista públicamente.
- Sensitive categories (salud, religión, sexualidad, política) **NUNCA** entran al archive auto.

### Risk: Right-of-publicity (US + states strict como CA, TN)
- Uso de nombre + carrera del artista para factual ID = reference-work práctica estándar, protected.
- Uso en advertising/marketing commercial de Dauton (ej. "Join, as seen by [Artist]") **SIN consent del artista = violation.** Ban.

---

## Base de datos — licensing propio

Cuando activemos Track 7 (data licensing B2B, año 2):

**Licencia propuesta:**
- **Uso no-comercial académico:** free con cita.
- **Uso comercial estándar:** tier pricing (ver `09-Business/pricing-strategy.md`).
- **Enterprise:** acuerdos custom.

**Limitaciones licensee:**
- NO incluir data de Spotify raw (ToS Spotify prohíbe redistribución).
- NO incluir data de YouTube raw (Developer Policy 30-day rule).
- SÍ incluir: data propia + MB (CC0) + Wikidata (CC0) + data agregada propia.
- DPA obligatorio.

---

## Trademark

### Nuestra marca
"Dauton Media" pendiente de trademark filing USPTO. Research item P0.5 en `legal-research-list.md`.
- Cost DIY TEAS Plus: $350.
- Cost con trademark lawyer: $500-1,500 all-in (recomendado para primera vez).

### Otras marcas mencionadas
Nombres de artistas, labels, crews — usados descriptivamente para identificar sujetos. **Nominative fair use**, generalmente non-infringing (*New Kids on the Block v. News America Publishing* 9th Cir. 1992).

---

## Takedown + DMCA

Ver `takedown-disputes.md` para proceso completo con templates.

Pre-launch obligatorio:
- DMCA Designated Agent registrado con US Copyright Office ($6). Required para safe harbor 17 USC §512.
- Agent info publicada en `/legal/dmca`.
- Endpoint + form operativos en `/legal/takedown`.

---

## ToS considerations para users

Key IP-related terms en user ToS (`terms-draft.md` §5, §7, §8):

- Users garantizan que contenido que envían no infringe third-party rights.
- Users grant license a Dauton para display + redistribute sus submissions como parte del archive.
- Users pueden pedir remoción — retenemos correcciones factuales accepted como parte del archive.
- Disclaimamos responsabilidad por user-submitted content más allá de moderation razonable (Section 230 safe harbor US).

---

## Risk ranking consolidado

| Risk | Likelihood | Severity | Mitigación primaria |
|---|---|---|---|
| Photo rights claim | Media | Baja-Media | Sourcing hierarchy + photo audit log + takedown |
| Press scraping complaint | Baja | Baja | Quote <15w, atribución, link out |
| Label / artist objection a facts | Baja-Media | Baja | Source rigor + correction process + claim flow |
| Defamation claim | Baja | Media-Alta | Source requirements + sensitive categories blacklist |
| Scraping de nuestra data por tercero | Baja (early) → Media (later) | Baja-Media | Rate limits + ToS claridad + eventual API con terms |
| AI content concern | Baja | Baja | Source-grounding + disclaimers + review Tier 1 |
| Database rights infringement | Baja | Media | Terms claros + sui generis EU protection |

---

## Qué hacer si recibimos legal inquiry

1. NO responder substantively.
2. Forward a founder.
3. Founder + agent evalúan categoría (ver `takedown-disputes.md`).
4. Si categoría A-D: responder vía template.
5. Si categoría E (C&D, lawsuit): **TRIGGER abogado humano**. Solo ack mínimo + contratar counsel.
6. Documentar en `takedowns-log.md`.

---

## Pre-launch legal checklist (consolidado)

- [ ] DMCA agent registrado con US Copyright Office.
- [ ] Privacy policy v2 live.
- [ ] Terms v2 live.
- [ ] `/legal/dmca` + `/legal/takedown` pages operativos.
- [ ] Trademark search ejecutado + decisión filing.
- [ ] Attribution fuentes visible en footer.
- [ ] Photo audit log implementado (columns en DB).
- [ ] Cover art size cap aplicado (Engineering).
- [ ] Email aliases operativos: privacy@, legal@, dmca@, corrections@.
- [ ] Sensitive categories blacklist aplicada en bio pipeline.
- [ ] No IG scraper activo (confirmar).
- [ ] Takedowns-log.md creado.

---

*See also: [`privacy-policy-draft.md`](./privacy-policy-draft.md), [`terms-draft.md`](./terms-draft.md), [`takedown-disputes.md`](./takedown-disputes.md), [`legal-audit-master.md`](./legal-audit-master.md), [`tos-compliance.md`](./tos-compliance.md).*
