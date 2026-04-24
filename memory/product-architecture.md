# Memoria — Product Architecture

**Owner:** Product Architecture chat
**Misión:** definir visión + personas + scope + features priorizados. Eres el dueño del "QUÉ" del producto.

---

## Estado al arrancar este chat

Strategy/PM consolidó esto del founder antes de que abrieras este chat. Léelo, asume nada, profundizá vos:

### Inputs del founder (aún sin formalizar como visión)

- **Posicionamiento intuido**: tool + tech + community. NO editorial.
- **Producto base**: archivo público de artistas latinos con perfiles auto-generados de fuentes públicas, enriquecidos progresivamente.
- **Verificación**: badge VIP. Perfiles públicos siempre. Artistas registrados directamente = clientes directos = tag especial. Sensación VIP vs regular.
- **4 personas principales identificadas**: Fan, Artista, Promotor, Label. Hay perfiles secundarios que profundizar (managers, venues, sellos digitales, periodistas, etc.).
- **Foco MVP**: arrancar con UNA persona. Probable: Fan. Pero la decisión es tuya.
- **Público primario inicial**: diáspora venezolana (Miami, España, Colombia, USA latino). VE locales = métricas + validación.
- **Monetización**: free para fans, monetización empieza con artistas/managers/venues/labels. Precios bajos $5/mes - $12/año según feature. Comisiones futuras sobre merch/tickets cuando haya tracción.
- **MVP financiación**: al menos UNA vía clara o activable post-tracción.
- **12 meses target**: producto funcional + demanda de fans.
- **Editorial NO existe en el producto.** Sin blogs, sin reviews, sin ensayos. NO se reemplaza con visualizaciones — el founder dijo explícito "no quiero dedicarme a hacer blogs ni modos de visualización de esa data que sean la historia del rock venezolano en una línea de tiempo, por ciudad o diferente". Si aparece una visualización con tráfico SEO real, puede entrar como feature SEO en Data & SEO.
- **Calculadora de ingresos** = ejemplo de SEO tool. Hay que pensar más casos.
- **Outreach**: una vez perfiles armados, email masivo a artistas para verificar.

### Inputs de Strategy/PM

- Mi audit en `_Execution/product-architecture-audit.md` (10 secciones, hecho 2026-04-24). Ya sabe el founder que mi 1% de comprensión no debe contaminar la visión real.
- Audit Design vs Repo en `_Execution/design-vs-repo-audit.md` (12 gaps identificados).
- Las preguntas estratégicas en sección 8 del audit son starting point, no respuestas.

### Lo que el founder espera que vos hagas

1. **Profundizar visión** — no copiar lo que tengo arriba. Preguntar al founder lo que necesites para construir una visión REAL.
2. **Documentar personas a profundidad** — cada una con: dolor, jobs-to-be-done, qué hace hoy sin Dauton, qué queremos que haga con Dauton, qué features de MVP los enganchan, qué post-MVP.
3. **Decidir UNA persona primaria para MVP** — con justificación.
4. **Definir scope del MVP final** — features in/out, con dependencias claras.
5. **Definir flujos prioritarios** — happy path por persona.
6. **Articular diferencial competitivo** — el founder dice "no tenemos competencia, son APIs y referencias". Profundizar.
7. **Coordinar con Data & SEO** sobre features SEO candidatas (calculadora de ingresos + más).
8. **Coordinar con Business & Legal** sobre vías de monetización por feature.

### Cosas que el founder NO quiere

- Que repliquemos blogs editoriales tradicionales.
- Que metas tienda propia o tickets directos en MVP — solo redirección a plataformas externas.
- Que asumas que sé lo que está bien — el founder es el dueño de la visión, vos la articulás.
- Que me sigas referenciando con "Strategy/PM dice X" — vos sos el dueño del PRODUCTO, yo orquesto.

---

## Output esperado de este chat

Archivos que vas a crear o reescribir:

- `00-Executive/product-vision.md` — versión nueva, reemplaza vision.md actual
- `00-Executive/user-personas.md` — los 4+ con use cases detallados
- `00-Executive/positioning.md` — diferencial + elevator pitch + posicionamiento
- `01-Product/mvp-scope.md` — reescritura completa con visión nueva
- `01-Product/feature-roadmap.md` — fases + features priorizados
- `01-Product/feature-specs/{feature}.md` — un archivo por feature con: persona target, valor, dependencias, métricas de éxito
- `01-Product/user-flows.md` — happy paths por persona

Cuando termines, postea outcome en `COORDINATION.md`. Strategy/PM (yo) consolida y propaga al resto de departamentos.

## Decisiones que tomes — registralas acá

(Tu chat las va llenando.)

## Preguntas abiertas que tenés

(Tu chat las va llenando. Cuando llegues a algo que el founder debe responder, anotalo acá Y en TASKS.md con tag [PRODUCT].)
