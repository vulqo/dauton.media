# 08-Legal-Compliance

**Owner principal:** Business & Legal agent
**Status:** activo · framework completo v1 entregado 2026-04-25
**Posición del founder:** no hay abogado humano contratado. Business & Legal agent es la fuente de verdad para operación normal.

---

## Advertencia crítica — límites del agent como fuente legal

El agent de Business & Legal **puede** operar como fuente de verdad para:

- Interpretar ToS de plataformas externas (Spotify, YouTube, Genius, etc.) y definir qué podemos hacer con su data.
- Aplicar frameworks legales conocidos (GDPR, CCPA, DMCA, CAN-SPAM, FTC disclosure, fair use US).
- Redactar drafts de policies, ToS, templates de takedown, disclosures.
- Evaluar riesgo por feature con matriz severidad × probabilidad.
- Mantener compliance calendar + research list + audit trail de decisiones.

El agent **NO puede** reemplazar abogado humano en estos 3 momentos:

1. **Capital raise con term sheet real.** Cap table, Delaware C-Corp conversion, SAFE/convertible note drafting, cumplimiento Reg D — requiere abogado corporate US. No-negotiable.
2. **Lawsuit, subpoena, cease-and-desist o orden judicial.** Respuesta requiere representation humana. Presumir lo contrario es negligencia.
3. **Cambio de jurisdicción / entidad legal.** Pasar de Vulqo LLC (NJ/DE?) a otra estructura requiere abogado fiscal + corporate.

Fuera de esos 3 casos, el agent opera como fuente de verdad y el founder procede con las recomendaciones documentadas.

---

## Lo que hay acá — archivos vigentes

| Archivo | Status | Rol |
|---|---|---|
| `legal-audit-master.md` | v1 · 2026-04-25 | **Centro de gravedad.** Audit de todos los features MVP y post-MVP con ✓/⚠/✗ + mitigaciones. |
| `feature-review-workflow.md` | v1 · 2026-04-25 | Workflow async para no bloquear a Engineering ni Product. |
| `tos-compliance.md` | v1 · 2026-04-25 | Análisis ToS de cada fuente externa (Spotify, MB, Wiki, Genius, YT, Eventbrite, Ticketmaster, Bandsintown, IG). |
| `takedown-disputes.md` | v1 · 2026-04-25 | DMCA + right to erasure + defamation + bad-faith process + templates. |
| `privacy-framework.md` | v1 · 2026-04-25 | GDPR / CCPA / LatAm framework específico para Dauton. |
| `compliance-calendar.md` | v1 · 2026-04-25 | Qué hay que hacer cuándo (pre-launch, anual, trigger-based). |
| `legal-research-list.md` | v1 · 2026-04-25 | Items abiertos priorizados. |
| `privacy-policy-draft.md` | v2 · 2026-04-25 | Reescrita para Dauton Media (antes Culture Wiki). |
| `terms-draft.md` | v2 · 2026-04-25 | Reescrita para Dauton Media. |
| `ip-and-fair-use.md` | v2 · 2026-04-25 | Reescrita para Dauton Media. |

## Reglas operativas

- Cada feature pública nueva → review legal async antes de Engineering implemente (workflow en `feature-review-workflow.md`, target turnaround 48h para review básico).
- Output del review en COORDINATION.md como `Legal review {feature}: ✓ clear | ⚠ caveat | ✗ blocker`.
- Si el veredicto es ⚠, el feature **no se bloquea** — se agregan las mitigaciones listadas al spec de Engineering. Si es ✗, research paralelo con timeline claro.
- Si un item entra en uno de los 3 triggers que requieren abogado humano → pausar + alertar al founder explícitamente.
