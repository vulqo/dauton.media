# Decision Doc — Spotify monthly listeners workaround

**Owner:** Data & SEO chat
**Status:** decisión tomada · pendiente Biz-Legal nota informativa.
**Última actualización:** 2026-04-25
**Bloquea/desbloquea:** tool SEO #2 (Calculadora de ingresos).

---

## TL;DR

**Decisión:** combinar **(a) estimación con bandas** como default + **(c) Soundcharts API tier ligero** cuando founder apruebe ~$10-50/mes. **Eliminamos (b) scraping `open.spotify.com`** del set de opciones — el riesgo legal de hoy 2026 es prohibitivo.

---

## Por qué tuvimos que volver a evaluar

Mi push back inicial al founder (este mismo turno) listaba 3 opciones: (a) bandas estimadas, (b) scraping `open.spotify.com`, (c) OAuth user flow. Después de research profunda, **(b) y (c) ya no son viables** por cambios 2024-2026.

---

## Findings que cambian la decisión

### 1. Spotify Web API ya NO retorna `followers`/`popularity` con Client Credentials

- **Cambio:** noviembre 2024.
- **Fuente:** [Spotify Developer Blog — Introducing changes to Web API](https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api).
- **Impacto:** confirma lo que ya teníamos en `api-docs/spotify.md`. Strategy via API pública sin scraping = imposible.

### 2. Spotify Web API ahora requiere PREMIUM para development mode + restricciones agresivas

- **Cambio:** febrero 2026.
- **Fuente:** [Spotify Developer Blog — Update on Developer Access](https://developer.spotify.com/blog/2026-02-06-update-on-developer-access-and-platform-security) + [TechCrunch coverage](https://techcrunch.com/2026/02/06/spotify-changes-developer-mode-api-to-require-premium-accounts-limits-test-users/).
- **Impacto:** acceder al API requiere cuenta Premium (Luis ya tiene, OK). Pero Extended Quota ahora exige empresa registrada + 250K MAU + presencia en mercados clave — **fuera de alcance para Dauton MVP**.
- **Implica:** OAuth user flow técnicamente accesible pero limitado a ~25 test users en development mode. No alcanza para alimentar perfiles públicos del archive.

### 3. Scraping `open.spotify.com` — enforcement REAL en 2025-2026

- **Diciembre 2025:** Spotify desactivó **86 millones** de cuentas tras el scraping masivo de Anna's Archive (256M tracks metadata).
- **Fuente:** [Slashdot — Spotify desactiva 86M accounts](https://entertainment.slashdot.org/story/25/12/24/1939236/) · [Equixly — Lessons from Spotify scraping](https://equixly.com/blog/2026/01/11/spotify-data-scraping/).
- **Impacto:** rate limits bajaron de ~180 req/min a ~100 req/min. Behavioral fingerprinting bloqueador implementado. **Bans permanentes están ocurriendo** incluso para uso público no-comercial si Spotify lo detecta como scraping sistemático.
- **Spotify ToS (sept 2025):** prohíbe explícitamente "crawling/scraping" y ML training. No es zona gris; es violación documentada.
- **Implica:** estrategia (b) tiene **riesgo legal alto + riesgo operacional alto**. La cuenta Premium del founder podría ser desactivada. Reputación de marca en riesgo si se descubre.

### 4. Spotify for Artists analytics

- Solo accesible al artista logueado en su propio dashboard. Sin endpoint público.
- **Implica:** no nos sirve para alimentar perfiles de 1000 artistas que no controlamos.

---

## Opciones reales hoy (2026-04)

### (a) Estimación con bandas — strategy free

Usa `tracks.popularity_score` (0-100, sí lo retorna API), número de tracks, antigüedad del catálogo, presencia en playlists editoriales. Output como rango ("$1,500 — $4,200 / mes").

- **Costo:** $0.
- **Precisión:** baja. Bandas honestas, no números defendibles.
- **Riesgo legal:** verde.
- **Mantenimiento:** mínimo. Pure SQL + funciones puras.
- **Implementación:** 1 sprint.

### (b) Scraping `open.spotify.com` — DESCARTADA

- **Riesgo legal:** crítico (ToS violación documentada + enforcement activo).
- **Riesgo operacional:** crítico (ban Premium account, rate limits caídos, fingerprinting bloqueador).
- **Verdict:** **no procede.** Ni siquiera con Biz-Legal review favorable — el riesgo de ban del Premium account del founder y la potencial pérdida de la sesión Web API actual son demasiado altos.

### (c) Soundcharts API — autorizada, paid

- **Pricing 2026:** Starter desde **$10-50/mes** (datos públicos básicos), Pro $499/mes (catálogo enterprise).
- **Datos:** monthly listeners + radio + social — autorizado por Spotify.
- **Costo anual MVP:** ~$120-600.
- **Precisión:** ⭐⭐⭐⭐⭐ (autorizado, parecido a lo que ve Spotify for Artists).
- **Riesgo legal:** verde.
- **Mantenimiento:** mínimo (API estable).
- **Verdict:** **opción premium recomendada cuando Dauton pueda gastar ~$15-50/mes**.

### (d) Songstats API — autorizada, paid

- **Pricing 2026:** $99/mes flat, 18 DSPs cubiertos.
- **Limit:** 1K hits / 30d (10 req concurrentes).
- **Verdict:** $99 es alto vs Soundcharts Starter $10-50. Skip salvo que Soundcharts no de los datos esperados.

### (e) Kworb.net scraping — gris pero menos riesgoso que open.spotify.com

- **Costo:** $0.
- **Datos:** Kworb scrapea Spotify y mantiene rankings públicos (free, activo abril 2026, lag 1-2h).
- **Riesgo legal:** **gris**. Kworb hace el scraping, no nosotros — pero re-scrapeamos su HTML. Su ToS no es restrictivo (single dev hobby project, no enforcement).
- **Riesgo operacional:** medio. Kworb puede bloquear nuestro scraper o cambiar HTML structure sin aviso.
- **Mantenimiento:** alto (parsear HTML que puede cambiar).
- **Verdict:** **fallback decente** si presupuesto Soundcharts no aprobado. Build it lean — Playwright + parser + cache 24h.

### (f) ListenBrainz / MusicBrainz datasets — community

- ListenBrainz crowdsourced, no Spotify oficial.
- **Verdict:** no nos da Spotify monthly listeners. Skip.

---

## Decisión final

**Para MVP launch (octubre 2026):**
- **Default:** strategy **(a) bandas estimadas** integrada en tool #2.
- **Etiquetado en UI:** "Estimación con bandas — basada en data pública de Spotify Web API".
- **Disclaimer en cada landing:** "Este es un estimador, no una calculadora exacta. La data oficial solo la conoce el artista en Spotify for Artists."

**Upgrade path (post-launch, según presupuesto founder):**
- **Si founder aprueba ~$15-50/mes:** integrar Soundcharts Starter API → cambiar la fórmula a usar monthly listeners reales. Mismo UI, mejor precisión, sin cambio legal.
- **Si presupuesto no disponible:** evaluar Kworb.net scraping como fallback (decisión separada con Biz-Legal review).

**Lo que NO hacemos jamás:**
- Scraping `open.spotify.com` directo. Riesgo prohibitivo en 2026.
- Vender la calculadora como "exacta". Marketing siempre habla de "estimación".

---

## Implicaciones para tool #2

- **Sprint estimate:** 1 sprint (no 2-3 como push back inicial sugería con strategy b).
- **Data ready:** ~95% (track popularity ya está en DB cuando Sprint 5 drena).
- **UI critical:** banda visual ($X — $Y / mes), no número único. Confianza implícita en el rango.
- **Schema.org:** `Person` + `FAQPage` con preguntas tipo "¿Cuánto gana X en Spotify?", "¿Cómo se calcula?", "¿Por qué es estimación?".

---

## Acciones derivadas

| Acción | Owner | Status |
|---|---|---|
| Actualizar `seo-tools-roadmap.md` tool #2 con esta decisión | Data & SEO (yo) | hecho en este turno |
| Eliminar ticket `[BIZ-LEGAL] Review scraping open.spotify.com` — ya no aplica | Data & SEO (yo) | hecho en este turno |
| Crear ticket `[BIZ-LEGAL]` informativo: documentar enforcement Spotify 2025-2026 + por qué no scrapeamos | Data & SEO (yo) | hecho en este turno |
| Si presupuesto post-launch: ticket `[LUIS]` Soundcharts Starter signup | — | en watchlist post-launch |
| Implementar fórmula bandas en `src/lib/seo/calculators/earnings.ts` | Engineering | después de Sprint 5 drena |

---

## References

- Spotify Developer Blog — [Changes to Web API (Nov 2024)](https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api)
- Spotify Developer Blog — [Update on Developer Access (Feb 2026)](https://developer.spotify.com/blog/2026-02-06-update-on-developer-access-and-platform-security)
- TechCrunch — [Spotify changes developer mode (Feb 2026)](https://techcrunch.com/2026/02/06/spotify-changes-developer-mode-api-to-require-premium-accounts-limits-test-users/)
- Slashdot — [86M accounts deactivated (Dec 2025)](https://entertainment.slashdot.org/story/25/12/24/1939236/)
- Equixly — [Lessons from Spotify scraping (Jan 2026)](https://equixly.com/blog/2026/01/11/spotify-data-scraping/)
- Spotify User Guidelines (Sept 2025): https://www.spotify.com/us/legal/user-guidelines/
- Soundcharts pricing: https://soundcharts.com/en/pricing
- Songstats: https://musicanalyticstools.com/music-api/
- Kworb.net: https://kworb.net/

---

## Last reviewed

- 2026-04-25 — Data & SEO chat — decisión final post-research.
