# SEO operations — Dauton Media

**Owner:** Data & SEO chat
**Última actualización:** 2026-04-25 · v0.1

---

## Qué hay acá

Este folder contiene todo el aparato operativo de SEO de Dauton Media. Es un **sistema**, no documentación pasiva. Cada doc define automatizaciones que corren sin Luis.

| Doc | Qué define |
|---|---|
| [`stack.md`](./stack.md) | Herramientas SEO + AI/automation + APIs pendientes con instrucciones de signup |
| [`keyword-framework.md`](./keyword-framework.md) | Metodología de keyword research sin GSC. Sources, scoring, taxonomía. |
| [`content-engine.md`](./content-engine.md) | Programmatic SEO: templates por entity, JSON-LD, i18n, sitemap dinámico, internal linking |
| [`audit-cadence.md`](./audit-cadence.md) | Checks SEO automatizados (frecuencia + qué alerta + thresholds) |
| [`features-creativas.md`](./features-creativas.md) | Features SEO propuestas más allá del roadmap v0.2 |

Doc complementario en `../seo-tools-roadmap.md` — ranking de las 8 herramientas SEO priorizadas (calculadora de ingresos, quién produjo, etc.). Este folder es **el cómo** las construimos y operamos.

---

## Principios operativos

1. **Sin contenido manual.** Cada página SEO sale de la DB vía template. Luis nunca escribe un blog post.
2. **i18n desde el primer commit.** Todo string en archivo de traducción. Slugs dual (canónico + traducido). Hreflang siempre.
3. **Schema.org en cada página.** JSON-LD auto-generado desde el modelo. Sin schema = no shipping.
4. **Auditoría automatizada semanal.** Si Lighthouse/crawler/sitemap baja umbrales, alerta a Slack/Discord.
5. **Sin GSC al inicio.** Bing Webmaster Tools + Cloudflare/Plausible Analytics + DataForSEO + Brave SERP cubren la función. GSC se conecta cuando el dominio launch tenga traffic.
6. **AI agents, no humanos.** Investigación de KW, generación de bios, refinamiento de meta tags, traducciones — todo via Claude/Perplexity con prompts versionados.
7. **Cada decisión SEO es un commit.** Cambios al content engine → migration + commit. Cambios al sitemap → revalidate trigger.

---

## Estado al iniciar

- 0 herramientas SEO conectadas (sin GSC, sin Bing, sin analytics).
- 0 schema.org en el repo.
- 0 i18n config (proyecto está hardcoded ES).
- 1 SEO tools roadmap (v0.2 con 8 tools priorizadas).
- 9 APIs ya documentadas en `../api-docs/` (data ingestion, no SEO ops).

**Backlog inmediato (próximos outputs):** ver `audit-cadence.md` sección "Roadmap de implementación".

---

## Cómo lee otros chats este folder

- **Engineering:** lee `content-engine.md` para implementar templates + sitemap + i18n. Lee `audit-cadence.md` para implementar workers de check.
- **Product Architecture:** lee `features-creativas.md` para evaluar fit con visión + lee `keyword-framework.md` para entender por qué priorizamos features.
- **Business & Legal:** lee `stack.md` sección "APIs amarillas/rojas" para review legal antes de integrar.
- **Community & Outreach:** lee `keyword-framework.md` para alinear copy de outreach con KW que ya estamos optimizando.
