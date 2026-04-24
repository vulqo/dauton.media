# SEO Tools Roadmap

**Owner:** Data & SEO agent
**Status:** 🔴 skeleton — pendiente que Data & SEO chat lo llene en primer sprint
**Última actualización:** 2026-04-25

---

## Contexto

El founder estableció que Dauton Media no es archivo pasivo sino **herramientas útiles para fans**. La **calculadora de ingresos** fue mencionada como ejemplo de SEO tool que atrae tráfico orgánico y funnel al perfil del artista. Este doc es el backlog de SEO tools candidatas con ranking.

Referencia: `_Execution/founder-inputs-consolidated.md` (sección "Features destacadas").

---

## Framework de evaluación

Cada SEO tool se evalúa con 4 dimensiones:

1. **Keyword volume** (estimado de búsquedas/mes en ES) — high / medium / low
2. **Complejidad técnica** — baja (calculadora simple sobre DB) / media (requiere más data) / alta (requiere API nueva o ML)
3. **Valor de negocio** — directo (funnel a profile), indirecto (authority building), tangencial
4. **Fit con archive existente** — usa data que ya tenemos / requiere scraping nuevo / requiere partnership

---

## SEO tools candidatas (a priorizar)

### 1. Calculadora de ingresos por streams

- **Keyword principal:** "cuánto gana X en Spotify" — volumen estimado high en ES.
- **Complejidad:** baja — stream counts de Spotify + fórmulas públicas de payout.
- **Valor:** directo (funnel a profile del artista).
- **Riesgo legal:** moderado — disclaimer requerido, Business & Legal review.
- **Fit con archive:** ✓ data ya accesible.
- **Status:** prioridad #1 para discutir con Product Architecture.

### 2. [pendiente — Data & SEO llena]

---

## Otras candidatas a explorar (founder mencionó que hay que pensar más)

Ideas starting point para Data & SEO chat. No están priorizadas aún.

- "Quién produjo X" — keyword cola larga, único valor en español.
- "Discografía completa de X por año" — keyword cola larga.
- "Mapa del rap venezolano" — visualización geográfica.
- "Timeline del rap latino" — visualización temporal con events + releases.
- "Comparador de artistas" (reutilizar CompareView del Design).
- "Dónde nació/vive X artista" — preguntas comunes SEO.
- "Colaboraciones famosas de X" — grafo accesible.
- "Próximos conciertos de X" — pulls Eventbrite.
- "Artistas de {city}" — filtro por ciudad, útil para diáspora searches.
- "Historia de {sello}" — timeline de labels.

---

## Output format cuando Data & SEO llene

Para cada tool:

```
### N. Nombre de la tool
- **Keyword principal:** "..." — volumen estimado: H / M / L
- **Complejidad técnica:** baja / media / alta
- **Valor de negocio:** ...
- **Riesgo legal:** ... (flag si requiere Business & Legal review)
- **Fit con archive:** ...
- **Data required:** qué tablas/fuentes usa
- **Output UX:** cómo se ve la página
- **Funnel:** qué acción esperamos del visitante post-uso
- **Prioridad propuesta:** P0 / P1 / P2 (a consensuar con Product Architecture)
```

---

## Coordinación

- **Con Product Architecture:** propuesta de tools → discusión → decisión de prioridad → ticket [ENG] para implementar.
- **Con Engineering:** viabilidad técnica + estimado esfuerzo.
- **Con Business & Legal:** review de riesgos legales por tool.
