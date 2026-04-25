# Feature Review Workflow — Legal + Business

**Owner:** Business & Legal agent
**Última actualización:** 2026-04-25
**Status:** v1 — live

---

## Objetivo

Revisar cada feature **sin bloquear** a Product Architecture ni a Engineering. El agent Legal + Business interviene async, con SLA claro, checklist pre-definida, y decisión pre-mapeada para features con precedente. Engineering no se para esperando veredictos.

---

## Las 3 clases de review

### Clase A — Fast-track (auto-clear)

Features que ya tienen precedente documentado en `legal-audit-master.md` con ✓ clear y mitigaciones genéricas aplicables. Ejemplos:

- Display de album cover en página de release.
- Embed oficial de YouTube.
- Agregar campo editable al claim del artista.
- Nueva visualización sobre data ya auditada.

**SLA:** cero espera. Product Architecture cita el precedente en el spec (`ver legal-audit-master.md §X.Y`), Engineering procede. El agent Legal registra el feature en el audit log pero no necesita re-review.

### Clase B — Standard review (48h async)

Features con elementos nuevos pero sin bandera roja obvia. Ejemplos:

- Nueva fuente de ingestion (ej. Discogs después de haber auditado MusicBrainz).
- Nueva visualización que combina data de múltiples fuentes.
- Nuevo canal de monetización post-tracción.
- Cambio material en auth flow.

**SLA:** 48h hábiles desde que Product Architecture postea el request en `TASKS.md` con tag `[BIZ-LEGAL]`. Engineering puede empezar scaffolding en paralelo, el veredicto llega antes de que haya que exponer el feature público.

**Output:** post en `COORDINATION.md` con formato
```
Legal review {feature}: ✓ clear | ⚠ caveat | ✗ blocker
- Risks: {list}
- Mitigations required pre-launch: {list}
- Research items opened: {list con link a legal-research-list.md}
- Revenue model implications: {list}
```

### Clase C — Deep review (1-2 semanas)

Features con riesgo alto, jurisdicciones nuevas, o dependencia en partnership formal. Ejemplos:

- Activar comisión de tickets (requiere partnership + KYC + possible reg tributario).
- Activar data licensing B2B (requiere validar ToS de cada fuente + contrato licensee).
- Capital raise (aquí se sale del scope del agent — ver trigger de abogado humano).
- Expansión a jurisdicción no cubierta (ej. UE operación física vs US-only SaaS).

**SLA:** 1-2 semanas. Engineering **no empieza** hasta que el veredicto esté, para no gastar tiempo en algo que puede ser ✗ blocker.

---

## Checklist por review (aplicable a cualquier clase)

El agent ejecuta estas 10 preguntas en orden. Las primeras 4 son eliminatorias — si alguna responde `NO` con severity alta, el veredicto es ✗ blocker hasta mitigar.

### 1. Fuente de la data

- ¿De dónde sale la data que este feature expone?
- ¿La fuente está auditada en `tos-compliance.md`?
- ¿El uso cae dentro de lo permitido por la ToS de esa fuente?

### 2. Datos personales

- ¿El feature muestra, almacena o procesa datos de personas identificables?
- Si sí, ¿son figuras públicas en rol profesional (artistas) o privados (fans registrados)?
- ¿Qué base legal de procesamiento aplica? (GDPR: interés legítimo / consentimiento / contrato / obligación legal).

### 3. Content de terceros

- ¿El feature muestra contenido con copyright (cover art, fotos, lyrics, audio, video)?
- Si sí, ¿está bajo fair use documentado, licencia explícita, o linkout a fuente oficial?
- ¿Tenemos DMCA process operativo para takedown?

### 4. Representación factual

- ¿El feature hace afirmación factual sobre una persona o entidad (ej. "Artista X ganó Y")?
- Si sí, ¿está sourced con evidencia trazable?
- ¿Hay riesgo de defamation si la afirmación es errónea o mal interpretada?

### 5. Consentimiento / opt-in

- ¿El feature requiere consentimiento del user? (claim flow, email opt-in, cookies).
- ¿El mecanismo de consentimiento es granular y revocable?

### 6. Obligaciones de disclosure

- ¿Hay link afiliado, sponsor, o interés económico?
- ¿Requiere disclosure FTC (US) o equivalente UE?

### 7. Transferencias de data

- ¿El feature envía data a tercero (analytics, AI provider, processor)?
- ¿Hay DPA (Data Processing Agreement) firmado con ese tercero?

### 8. Transacciones financieras

- ¿El feature procesa dinero?
- Si sí, ¿quién es el procesador (Stripe, Ko-fi, affiliate)?
- ¿Hay exposición tributaria en jurisdicciones nuevas?

### 9. Moderación

- ¿El feature acepta user-generated content?
- Si sí, ¿hay flow de moderación + términos de aceptación?

### 10. Reversibilidad

- Si el feature genera un problema legal post-launch, ¿es reversible sin daño a users?
- ¿Cuál es el tiempo-a-takedown si tenemos que remover?

---

## Decision matrix — cómo traducir checklist a veredicto

| Condición | Veredicto |
|---|---|
| Las 10 preguntas responden con "OK precedente documentado" | **✓ clear** fast-track |
| Respuestas OK pero requiere 1-3 mitigaciones concretas (ej. agregar disclosure, incluir opt-out, DPA pending) | **⚠ caveat** con lista de mitigaciones |
| Al menos 1 respuesta indica riesgo sin precedente + mitigación inmediata imposible | **✗ blocker** hasta research |
| Entra en trigger de abogado humano (capital, lawsuit, jurisdicción nueva) | **PAUSAR** + alertar founder |

---

## Coordinación con Engineering — cómo no bloquear

**Regla 1:** Engineering puede arrancar scaffolding de un feature con veredicto ⚠ caveat, siempre que el spec incluya las mitigaciones listadas. El veredicto ⚠ **no es blocker** — es un contrato: "podés construir, pero con estas restricciones."

**Regla 2:** Engineering **no expone** a producción un feature con veredicto ⚠ sin haber aplicado las mitigaciones. El PR de Engineering referencia el veredicto en el commit message: `feat(X): Y — legal ⚠, mitigations: [lista]`.

**Regla 3:** Para Clase A fast-track, Engineering no espera nada. Cita el precedente y sigue.

**Regla 4:** Si Engineering encuentra algo durante implementación que el review no cubrió (ej. "tenemos que llamar a API Z que no estaba listada"), postea en `COORDINATION.md` con tag `[BIZ-LEGAL]` y el agent hace micro-review en 24h.

---

## Monitoring post-launch

Cada feature lanzada queda en watchlist del agent:

- **Semana 1:** monitor de quejas, takedown requests, complaints a privacy@.
- **Mes 1:** revisar analytics si hay signal de mis-use (ej. bot scraping, queries anómalas).
- **Trimestre:** rerun del checklist — ¿cambió algo en ToS de fuentes? ¿nueva regulación? ¿precedente relevante?

Findings del monitoring se documentan como entrada en `legal-audit-master.md` bajo el feature correspondiente.

---

## Templates de output (copy-paste ready)

### Template review ✓ clear

```
Legal review: {feature} — ✓ CLEAR

Fecha: {fecha}
Clase: {A/B}
Checklist: pasa las 10 preguntas con precedente.
Precedente: {link a sección de legal-audit-master.md}
Riesgos residuales: ninguno material.
Mitigaciones requeridas: ninguna extra.
Revenue implications: {si aplica}
Next step: Engineering procede.
```

### Template review ⚠ caveat

```
Legal review: {feature} — ⚠ CAVEAT

Fecha: {fecha}
Clase: B
Checklist: pasa 10/10 con {N} mitigaciones pre-launch.
Riesgos: {lista con severidad}
Mitigaciones requeridas (no bloqueantes pero obligatorias pre-exposición pública):
  1. {mitigación 1}
  2. {mitigación 2}
  ...
Research items abiertos: {lista con link a legal-research-list.md si aplica}
Revenue implications: {si aplica}
Next step: Engineering scaffolds con mitigaciones. Agent monitorea exposición pública.
```

### Template review ✗ blocker

```
Legal review: {feature} — ✗ BLOCKER

Fecha: {fecha}
Clase: C
Checklist: falla en pregunta(s) #{N}.
Razón: {descripción}
Severity: {alta/media}
Research plan:
  - {item 1} · timeline {X días}
  - {item 2} · timeline {Y días}
Unblock criteria: {condiciones para mover a ⚠ o ✓}
Next step: Engineering NO arranca este feature. Founder notificado.
```

### Template escalation a abogado humano

```
⛔ TRIGGER DE ABOGADO HUMANO — {feature}

Razón: {uno de los 3 triggers}
  - Capital raise con term sheet
  - Lawsuit / subpoena / cease-and-desist
  - Cambio jurisdicción / entidad legal

Acción inmediata:
  1. Pausar cualquier ejecución del feature.
  2. Founder contacta abogado corporate US.
  3. Agent documenta estado actual para handoff.
  4. No avanzar hasta approval del abogado.

Referencias para el abogado: {docs relevantes}
```

---

## Métricas del workflow (monitoreo interno)

- **Turnaround promedio** por clase: target A = 0h, B ≤ 48h, C ≤ 10d.
- **Reviews por mes:** tracking para calibrar scope.
- **Veredictos revertidos post-launch:** si un ✓ tuvo que volver a ⚠, documentar qué lo causó — mejora del checklist.
- **Research items cerrados vs abiertos:** si abiertos > 10 sin movimiento, backlog.

---

*Cross-refs: `legal-audit-master.md`, `tos-compliance.md`, `legal-research-list.md`, `COORDINATION.md`.*
