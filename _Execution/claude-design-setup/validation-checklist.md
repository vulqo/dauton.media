# CHECKLIST — VALIDACIÓN DEL DESIGN SYSTEM INICIAL

**Cuándo usar esto:** después de que Claude Design termine los ~5 min de procesamiento,
te va a mostrar una "Design System review" tab. Este documento es tu checklist para
aprobar o pedir cambios antes de empezar a generar pantallas.

**Reglas del juego:**
- Si algo falla un criterio ❌, pide el fix usando el **chat** (no inline comments)
- Si algo es aceptable pero no ideal 🟡, decide si vale la pena la iteración ahora
  o si lo dejamos para después
- Si todo pasa ✅ → guardas el design system y avanzas a Fase A del prompt pack

---

## 1️⃣ PALETA DE COLORES

### Background / Surfaces
- [ ] Fondo primario es oscuro profundo (#0a0a0a o #121212 o #171717 — no más claro)
- [ ] Surface elevada tiene contraste visible pero sutil con el background (típicamente #1a1a1a o #1f1f1f)
- [ ] Borders/dividers son sutiles pero visibles (#262626 o #2a2a2a)

### Text
- [ ] Text primary blanco puro #ffffff
- [ ] Text secondary gris claro legible (~#a3a3a3 o similar)
- [ ] Text tertiary gris medio (~#666666) usado para metadata, no contenido primario

### Acentos — los 5 colores semánticos de Dauton
- [ ] Amarillo #ffce37 está presente — este es el acento protagonista
- [ ] Rojo #D93D4A está presente para alerts/urgencia
- [ ] Teal #04756F está presente para categorías
- [ ] Cyan #0093C6 está presente para links/references
- [ ] Navy #244C5A está presente para verified/institutional

### Contraste
- [ ] Amarillo #ffce37 sobre negro #0a0a0a pasa WCAG AA (debería — ratio ~10:1)
- [ ] Todos los acentos tienen contraste suficiente sobre fondos oscuros
- [ ] Ningún acento está "ahogado" — todos se leen claros

**Pregunta crítica:** ¿el sistema se ve como Dauton Media o como un dashboard SaaS genérico?
Si el amarillo no domina visualmente, hay que decirle a Claude Design:

> "El amarillo #ffce37 debe ser el acento protagonista, más prominente en la UI.
> Es un highlight de señalización de tránsito, no un accent decorativo. Mostrar un
> ejemplo donde el amarillo rellene un área grande (hero CTA, highlight completeness,
> o label block)."

---

## 2️⃣ TIPOGRAFÍA

### Display / Headlines
- [ ] La display font NO es Inter, Roboto, Arial, ni una system sans genérica
- [ ] Tiene carácter streetwear/editorial claro — condensed, geometric, extrabold, etc.
- [ ] Las opciones probables que funcionan: PP Neue Machina, ABC Diatype, Pangram Sans,
      GT America Condensed, Space Grotesk Bold, Druk, Monument Extended
- [ ] Los headlines grandes (72-140px) se ven memorables, no genéricos

### Body
- [ ] Montserrat está presente como body (400, 500, 600, 700)
- [ ] La legibilidad a 14-16px es buena

### Monospace
- [ ] Hay una mono font para data/metadata (JetBrains Mono, IBM Plex Mono, Berkeley Mono, o similar)
- [ ] Se usa específicamente en metadata, no en contenido corrido

### Escala tipográfica
- [ ] Hay al menos 5-6 tamaños de display (H1 a H6 + body)
- [ ] El contraste entre tamaños es brutal (H1 debe ser 3-4x más grande que H3)
- [ ] El H1 display en desktop está entre 72-120px (no 48px como un sitio genérico)

**Pregunta crítica:** si la display font es aburrida/genérica, pide:

> "Dame 3 opciones de display font contemporánea con carácter streetwear para comparar.
> Candidatos fuertes: PP Neue Machina, ABC Diatype, Pangram Sans. Aplicar cada una a
> un headline real de 96px diciendo 'LA HISTORIA NO CONTADA DEL RAP VENEZOLANO' sobre
> fondo #0a0a0a."

---

## 3️⃣ SPACING & RADIUS

### Spacing
- [ ] Escala base de 4px (4, 8, 12, 16, 24, 32, 48, 64, 96, 128)
- [ ] Las secciones grandes usan espacio generoso (64-128px de padding vertical)
- [ ] Los componentes pequeños son compactos (8-12px de padding interno)

### Radius
- [ ] Máximo 8px en radius — nada de pills redondeadas tipo iOS
- [ ] Preferencia por 0px (brutalist) o 2-4px (sutil)
- [ ] Si hay pills totalmente redondeadas (border-radius: 9999px), hay que decir:

> "No queremos pills completamente redondeadas. Bordes afilados o radius máximo 4px.
> Convertir todos los pills al formato rectangular."

---

## 4️⃣ WORDMARK / LOGO

Este es crítico porque le subiste los assets de Dauton Store. Claude Design debería
haber generado algo relacionado:

- [ ] Hay un wordmark "DAUTON MEDIA" generado (NO "DAUTON STORE" del original)
- [ ] La tipografía del wordmark es geometric sans extrabold similar al original
- [ ] Hay al menos una versión horizontal y una vertical
- [ ] Se ve bien sobre fondo negro

**Si no generó wordmark o salió mal:**

> "Evoluciona el wordmark 'DAUTON STORE' que subí como asset al nuevo wordmark
> 'DAUTON MEDIA'. Mantén la misma tipografía geometric sans extrabold y el mismo
> tratamiento. Dame 3 direcciones: (1) solo wordmark tipográfico, (2) wordmark +
> monograma D+M evolucionado del D+S original, (3) wordmark + monograma D simplificado."

---

## 5️⃣ COMPONENTES BÁSICOS

Claude Design probablemente generó un UI kit con:

### Buttons
- [ ] Primary button usa amarillo #ffce37 con texto negro
- [ ] Secondary button tiene contraste claro (outline blanco o fill gris oscuro)
- [ ] Los botones NO son redondeados tipo pill
- [ ] Hay estados: default, hover, disabled

### Cards
- [ ] Background de card es distinto al background de página (surface elevada)
- [ ] Border sutil visible o shadow sutil
- [ ] Padding interior consistente

### Navigation
- [ ] Nav bar oscura, sticky
- [ ] Logo a la izquierda, links al centro/derecha
- [ ] Active state visible (underline amarillo o similar)

### Forms
- [ ] Inputs tienen background visible (no flotantes sobre negro)
- [ ] Focus states claros (probablemente con el amarillo)
- [ ] Labels en mono o caps pequeñas

### Pills / Badges
- [ ] Pills con esquinas cuadradas o muy poco radius
- [ ] Colores semánticos aplicados correctamente (amarillo, teal, cyan, rojo, navy)

---

## 6️⃣ MOTION (si Claude Design generó algo)

- [ ] Duration base rápida (150-250ms para micro-interactions)
- [ ] Easing sharp, no elástico (ease-out, cubic-bezier con front-loaded curve)
- [ ] Cero animaciones decorativas
- [ ] Sin bouncy/springy excesivos

---

## 🚨 RED FLAGS QUE REQUIEREN CORRECCIÓN INMEDIATA

Si ves cualquiera de esto, hay que pedir cambio antes de avanzar:

❌ Background light/beige en vez de dark (el manual original es print-first, pero la web es dark-first)
❌ Gradientes purple/blue en fondo (SaaS aesthetic genérico)
❌ Pills redondeadas tipo iOS en todas partes
❌ Amarillo relegado a detalle minúsculo (debe ser protagonista)
❌ Display font es Inter, Roboto, o similar genérica
❌ Falta alguno de los 5 acentos semánticos
❌ Wordmark dice "DAUTON STORE" en vez de "DAUTON MEDIA"
❌ Ilustraciones 3D abstractas, emojis, o stock imagery

---

## ✅ CUÁNDO APROBAR Y AVANZAR

Aprueba el design system cuando:

1. Todos los ❌ arriba estén resueltos
2. Al menos el 80% del checklist principal está ✅
3. El sistema se "siente" como Dauton Media (editorial + streetwear + archivo serio)
4. El amarillo es protagonista, no decoración
5. La tipografía display tiene carácter

Una vez aprobado:
- Save/Guardar el design system con el nombre "Dauton Media"
- Tomar screenshots de las páginas de tokens para referencia
- Avanzar a los prompts de la Fase A (pendientes, siguiente sesión)

---

## 📸 QUÉ MANDARME DE VUELTA

Para que yo pueda ayudarte a validar el output, mándame screenshots de:

1. La paleta de colores aplicada
2. La escala tipográfica con los ejemplos de headline
3. El wordmark generado (si lo hay)
4. Al menos 2-3 componentes (buttons, cards, nav)
5. Cualquier red flag que hayas notado

Con eso hago un análisis puntual y decidimos si aprobamos o iteramos.
