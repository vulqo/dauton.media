# SEO Audit Cadence — Dauton Media

**Owner:** Data & SEO chat
**Última actualización:** 2026-04-25 · v0.1
**Status:** schedule definido. Implementación pendiente — ticket `[ENG]` en TASKS.md.

---

## Filosofía

Auditoría SEO es **automatizada y on-going**, no proyecto trimestral. Cada chequeo corre en su propia frecuencia, escribe a un store de eventos (`seo_audit_runs` table) y dispara alerta solo cuando un threshold se cruza. Luis nunca revisa dashboards al voleo — Slack/email/Discord lo agarra cuando algo importa.

---

## Audit runs (schedule maestro)

| Audit | Frecuencia | Tool | Alerta si... |
|---|---|---|---|
| **Lighthouse CI sample** | Cada PR + diaria 04:00 ART | lighthouse-ci | perf < 90, SEO < 100, a11y < 90 en cualquier URL del sample |
| **Schema.org validation** | Pre-deploy + diaria | schema.org Validator API | cualquier error de schema en URLs del sample |
| **Sitemap integrity** | Cada deploy + diaria | custom worker | URLs en sitemap retornan != 200 / sitemap > 50k entries por shard |
| **Internal links broken** | Semanal (lunes 06:00) | custom Playwright crawl | > 0.5% links broken |
| **Orphan pages** | Semanal | SQL query sobre routes vs internal_links | > 1% pages sin incoming links |
| **Duplicate titles/metas** | Semanal | DB query sobre `meta_cache` | cualquier duplicate en mismo locale |
| **Index coverage (Bing)** | Semanal | Bing Webmaster API | indexed pages dropped > 5% week-over-week |
| **Rank tracking (top 200 KWs)** | Diaria | DataForSEO Rank Tracker | top 10 → top 11+ en KW prioritaria |
| **Brand monitoring** | Diaria | Brave Search "site:" + brand search | nuevos backlinks o nuevas menciones |
| **Crawl errors (Bing)** | Diaria | Bing Webmaster API | > 10 errores nuevos / día |
| **Hreflang errors** | Semanal | custom validator | hreflang asimétrico o falta de x-default |
| **Robots.txt + accessibility** | Diaria | custom check | robots cambió o /sitemap.xml retorna != 200 |
| **Page speed regression** | Cada deploy | Cloudflare Web Analytics + Lighthouse | LCP regression > 200ms en p75 |
| **Structured data warnings (Bing)** | Semanal | Bing Webmaster API | nuevos warnings |
| **Content freshness** | Mensual | DB query | entities con `updated_at > 90 días` y completeness > 80% (oportunidad re-enrichment) |
| **Competitor SERP shift** | Semanal | DataForSEO + Brave SERP | nuevo competitor entra top 3 en KW prioritaria |
| **Anomaly detection traffic** | Diaria | Plausible/Umami + Cloudflare | drop > 30% day-over-day en sesiones top routes |

---

## Implementación

### Workers SEO

```
src/lib/seo/audit/
├── runners/
│   ├── lighthouse.ts        ← lighthouse-ci wrapper
│   ├── schema-validator.ts
│   ├── sitemap-integrity.ts
│   ├── internal-links.ts    ← Playwright crawl
│   ├── orphans.ts           ← SQL only
│   ├── duplicate-meta.ts
│   ├── bing-coverage.ts
│   ├── rank-tracker.ts      ← DataForSEO
│   ├── brand-monitor.ts
│   ├── crawl-errors.ts
│   ├── hreflang.ts
│   ├── robots-check.ts
│   ├── speed-regression.ts
│   ├── structured-warnings.ts
│   ├── content-freshness.ts ← SQL
│   ├── serp-shift.ts        ← DataForSEO
│   └── anomaly-detection.ts ← stat-test sobre time series
├── store.ts                 ← write/read seo_audit_runs table
├── alerts.ts                ← dispatch a Slack/Discord/email
└── thresholds.ts            ← config central de thresholds editable sin redeploy
```

### Scheduling

**GitHub Actions** para crons de proyecto:

```yaml
# .github/workflows/seo-audit-daily.yml
name: SEO Audit — Daily
on:
  schedule:
    - cron: '0 8 * * *'   # 08:00 UTC = 04:00 ART
  workflow_dispatch:

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run audit:lighthouse:sample
      - run: npm run audit:schema:sample
      - run: npm run audit:robots
      - run: npm run audit:speed:regression

  bing-data:
    runs-on: ubuntu-latest
    steps:
      - run: npm run audit:bing:coverage
      - run: npm run audit:bing:crawl-errors
      - run: npm run audit:bing:warnings

  rank:
    runs-on: ubuntu-latest
    steps:
      - run: npm run audit:rank:track-top-200

  brand:
    runs-on: ubuntu-latest
    steps:
      - run: npm run audit:brand:monitor

  anomaly:
    runs-on: ubuntu-latest
    steps:
      - run: npm run audit:anomaly:traffic
```

```yaml
# .github/workflows/seo-audit-weekly.yml
name: SEO Audit — Weekly
on:
  schedule:
    - cron: '0 9 * * 1'   # Lunes 09:00 UTC = 05:00 ART

jobs:
  weekly:
    runs-on: ubuntu-latest
    steps:
      - run: npm run audit:internal-links
      - run: npm run audit:orphans
      - run: npm run audit:duplicate-meta
      - run: npm run audit:hreflang
      - run: npm run audit:serp-shift
```

### Storage

Tabla nueva (migración pendiente):

```sql
create table seo_audit_runs (
  id uuid primary key default gen_random_uuid(),
  audit_type text not null,           -- 'lighthouse', 'schema', etc.
  ran_at timestamptz default now(),
  status text not null,                -- 'success', 'partial', 'failed'
  metrics jsonb not null,              -- { lcp_p75: 1.4, perf_score: 96, ... }
  alerts_fired text[] default '{}',    -- nombres de alerts disparadas
  duration_ms integer,
  notes text
);
create index on seo_audit_runs (audit_type, ran_at desc);
create index on seo_audit_runs (ran_at desc) where status != 'success';
```

### Alertas

`src/lib/seo/audit/alerts.ts` dispatch:
- **Slack** webhook a canal `#dauton-seo-alerts` (Luis ya tiene Slack workspace propio).
- Nivel **CRITICAL** (perf regression, indexing drop, brand monitor): mention `@here`.
- Nivel **WARNING** (orphans, duplicates): mensaje normal.
- Nivel **INFO** (content freshness, ranking moves): digest semanal lunes 09:00.

---

## Dashboard

Una página admin única en `/admin/seo` (gated detrás de Supabase auth, role admin):

- Tabla `seo_audit_runs` con filtros (last 7 / 30 días, by audit_type).
- Tarjetas KPI: LCP p75, Indexed pages, Top 10 rankings, Top 3 rankings, Crawl errors.
- Time series por métrica clave.
- "Action items" — lista de alerts no resueltas con click-to-investigate.

Implementación: Next.js Route Handler que consulta la table + Plausible/Umami API + DataForSEO API. Sin librería de dashboards — vanilla con Tailwind para mantenerse lean.

---

## Roadmap de implementación

### Phase 1 — pre-launch (Sprint próximo de Engineering)

- [ ] Tabla `seo_audit_runs` (migration).
- [ ] `audit:lighthouse:sample` — Lighthouse CI gate en cada PR.
- [ ] `audit:schema:sample` — Schema validator gate en pre-deploy.
- [ ] `audit:robots` y `audit:sitemap-integrity` — daily.
- [ ] Alert dispatch a Slack.

### Phase 2 — launch week

- [ ] Bing Webmaster connect + `audit:bing:*`.
- [ ] DataForSEO connect + `audit:rank:track-top-200`.
- [ ] `audit:brand:monitor`.
- [ ] `audit:anomaly:traffic` — necesita 1 semana de baseline pre-trigger.

### Phase 3 — month 1 post-launch

- [ ] `audit:internal-links` (cuando archive > 500 páginas).
- [ ] `audit:orphans`.
- [ ] `audit:hreflang` (cuando EN o PT lanzados).
- [ ] `audit:serp-shift`.

### Phase 4 — month 3+

- [ ] `audit:content-freshness` mensual.
- [ ] `audit:duplicate-meta`.
- [ ] Dashboard `/admin/seo` completo.

---

## Sample URLs para audits sampling

`audit:lighthouse:sample` no corre en todas las páginas (sería caro). Corre sobre sample fijo:

```
1. /es/                                    (homepage)
2. /es/artistas/canserbero                 (artist profile, full data)
3. /es/artistas/{nuevo}                    (artist profile, thin data — edge case)
4. /es/canciones/es-epico                  (track detail)
5. /es/discos/apocalipsis                  (release)
6. /es/canciones/es-epico/quien-produjo    (tool #1)
7. /es/artistas/canserbero/calculadora-ingresos (tool #2)
8. /es/artistas/canserbero/discografia     (tool #3)
9. /es/artistas/canserbero/eventos         (tool #4)
10. /es/artistas/canserbero/colaboraciones (tool #5)
11. /es/canciones/es-epico/samples         (tool #6)
12. /es/artistas/canserbero/similares      (tool #7)
13. /es/comparar/canserbero-vs-apache       (tool #8)
14. /es/productores/jeiby                  (producer profile)
15. /es/crews/3dueños                      (crew)
16. /es/ciudades/caracas                   (city)
17. /es/eventos/{slug}                     (event detail)
18. /es/buscar?q=apache                    (search results)
19. /en/artists/canserbero                 (locale alt)
20. /pt/artistas/canserbero                (locale alt)
```

Lista vive en `src/lib/seo/audit/sample-urls.ts` y se actualiza cuando una nueva route type entra en producción.

---

## Métricas que reportamos a Strategy/PM

Mensual (último día del mes), Cowork/Strategy/PM lee `seo_audit_runs` y genera reporte en `_Execution/seo-monthly-{YYYY-MM}.md`:

- Indexed pages (Bing): trend.
- Top 10 rankings: cuántos y cuáles.
- Top 3 rankings: cuántos y cuáles.
- Traffic: sessions, top routes (sin GA — vía Plausible/Umami).
- Errors: total + nuevas + resueltas.
- Avg Lighthouse perf (sample p75).
- Tools shipped del roadmap.

Strategy/PM consolida con métricas de producto (claims, contributions) en su update mensual.

---

## Last reviewed

- 2026-04-25 — Data & SEO chat — v0.1 inicial.
