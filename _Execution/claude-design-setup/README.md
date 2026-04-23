# CLAUDE DESIGN — SETUP GUIDE

**Proyecto:** Dauton Media
**Preparado:** April 23, 2026
**URL del setup:** claude.ai/design → Settings → Design System → Create new

---

## 🎯 LO QUE VAS A HACER

Vas a configurar el Design System de Dauton Media en Claude Design. Este documento tiene
las 6 piezas exactas que el formulario de setup te va a pedir, listas para copy-paste o
drag-and-drop.

**Tiempo estimado:** 10-15 minutos de setup. Después puedes empezar a generar diseños.

---

## 📋 LLENADO DEL FORMULARIO — CAMPO POR CAMPO

### CAMPO 1 — "Company name and blurb"

Copia y pega esto:

```
Dauton Media: media brand independiente dedicada al rap hispanohablante con foco
editorial en la escena venezolana. Plataforma digital que combina archivo de
referencia (tipo Wikipedia/Discogs), discovery interactivo (tipo Genius/RYM) y
publicación editorial (tipo Pitchfork). Evolución de Dauton Store (moda urbana,
Mérida 2020). Incluye también una sección de merch/shop integrada al universo
editorial. Personalidad de sello discográfico establecido con autoridad
periodística seria. Aesthetic: streetwear drop culture × archivo brutalist ×
data-rich densidad.
```

---

### CAMPO 2 — "Link code on GitHub"

**Déjalo vacío.** Todavía no tenemos repositorio de código.

---

### CAMPO 3 — "Link code from your computer"

**Déjalo vacío.** Todavía no tenemos código.

---

### CAMPO 4 — "Upload a .fig file"

**Déjalo vacío.** Todavía no tenemos Figma.

---

### CAMPO 5 — "Add fonts, logos and assets"

Drag-and-drop los siguientes archivos desde el folder `assets-to-upload/`:

1. `01-logo-master-color.png` (imagotipo vertical, amarillo + negro)
2. `02-logo-master-black.png` (imagotipo vertical, solo negro)
3. `03-logo-horizontal-color.png` (imagotipo horizontal)
4. `05-monograma-favicon.png` (monograma D+S aislado)
5. `06-manual-identidad-dauton-store.pdf` (manual de marca completo)
6. `07-design-brief.pdf` (brief del proyecto)

**NO subas** los archivos `.ai` (Illustrator) ni versiones múltiples del mismo logo —
Claude Design se confunde con demasiados archivos redundantes. 6 archivos es el sweet
spot: tiene el ADN visual + el contexto completo.

---

### CAMPO 6 — "Any other notes?"

Copia y pega el contenido de `notes-field.md` (documento separado en este folder).
Es largo pero está optimizado — Claude Design lo procesa completo.

---

## ⚙️ DESPUÉS DEL SETUP

Una vez que Claude Design procese el formulario:

1. Te va a mostrar una propuesta inicial del design system (colores, tipografía,
   componentes) derivada de tus assets y notas.

2. **Valídala contra el brief** (`07-design-brief.pdf`) — especialmente:
   - ¿Mantuvo la paleta base correcta? (negro dominante + amarillo + rojo + teal + cyan + navy)
   - ¿Propuso una display font digital contemporánea? (o quedó en Montserrat todo)
   - ¿Capturó el vibe streetwear editorial o derivó a algo genérico?

3. Si hay desviaciones, refina conversando con Claude Design. Ejemplos:
   - "Mantén la paleta pero agrega el amarillo #ffce37 como acento primario más prominente"
   - "Reemplaza la display font por algo más condensado tipo PP Neue Machina o similar"
   - "El background debe ser más oscuro, #0a0a0a no #1a1a1a"

4. Cuando el design system esté aprobado, **guárdalo** con el nombre "Dauton Media".
   Todos los prompts siguientes lo heredan automáticamente.

---

## 🚀 PRIMER PROMPT DE PRUEBA (después de setup)

Una vez guardado el design system, ejecuta este prompt como validación:

```
Genera una versión del wordmark "DAUTON MEDIA" en 3 direcciones:

1. Tipográfico puro — letras extrabold geométricas sin símbolo (evolución del wordmark
   actual de Dauton Store que ves en los assets, cambiando "STORE" por "MEDIA")

2. Wordmark + monograma D+M — evoluciona el monograma D+S original (ver asset) a un
   D+M entrelazado geométrico con el mismo ADN gráfico señalético

3. Wordmark + el monograma D+S existente — manteniendo el monograma actual pero
   cambiando "STORE" a "MEDIA" en el lockup

Muestra las 3 direcciones sobre fondo negro #0a0a0a y fondo amarillo #ffce37.
Tamaños: 48px, 120px, 480px para validar escalabilidad.
```

Si Claude Design ejecuta este prompt bien, el design system está listo para producción.

---

*Continuar con el prompt pack principal: `../prompt-pack/` (pendiente, siguiente sesión).*
