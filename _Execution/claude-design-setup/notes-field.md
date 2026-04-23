# "ANY OTHER NOTES?" — CONTENIDO PARA COPY-PASTE

**Instrucción:** copia todo el bloque de abajo (desde la línea con el primer `#` hasta
el final) y pégalo en el campo "Any other notes?" del setup de Claude Design.

Claude Design procesa markdown, así que mantén el formato.

---

## PROYECTO

Dauton Media es una media brand dedicada al rap hispanohablante con foco editorial en
la escena venezolana. La plataforma digital que vamos a diseñar combina tres capas:

1. **Archivo de referencia** (tipo Wikipedia/Discogs): datos estructurados y citables
   de cada artista, productor, label, release, evento.
2. **Plataforma de discovery** (tipo Genius/RYM pre-2019): exploración interactiva
   del grafo que conecta la escena.
3. **Publicación editorial** (tipo Pitchfork/Remezcla): long-form, entrevistas,
   análisis históricos.

Incluye también una sección de shop/merch integrada al universo editorial (drops
culturales conectados a artículos), no como e-commerce genérico.

## HERENCIA DE MARCA

Dauton Media es la evolución de **Dauton Store** (Mérida, Venezuela, 2020). La tienda
original se transforma en una media brand más grande. Ver los assets adjuntos:

- Logo horizontal color: monograma D+S amarillo geométrico entrelazado
- Logo master: lockup vertical con wordmark "DAUTON STORE" extrabold geométrico
- Monograma aislado: el símbolo D+S como favicon

El nombre viene de "downtown" (pronunciación fonética adaptada al español).
Concepto: "estar en el centro de cada ciudad". Para Media, el concepto se extiende
a "ser el centro cultural del rap hispanohablante".

El manual original define los colores como **paleta de señalización de tránsito**:
simplicidad y presencia urbana.

## LO QUE HEREDAMOS TAL CUAL

- El nombre Dauton y su concepto downtown
- La paleta base: negro, blanco, gris + acentos amarillo/rojo/teal/cyan/navy
- Montserrat como tipografía de cuerpo (body text)
- La filosofía urbana y el vibe streetwear

## LO QUE EVOLUCIONA

- **Wordmark:** "DAUTON STORE" → "DAUTON MEDIA". Mantener el mismo tratamiento
  tipográfico geometric sans extrabold que ves en los assets, solo cambia la palabra.
- **Monograma:** el D+S se jubila. Necesitamos un nuevo monograma que preserve el ADN
  gráfico (geométrico, entrelazado, señalético) pero represente a Dauton Media.
  Opciones: D+M entrelazado siguiendo la misma lógica visual que el D+S original;
  o D solo como forma arquitectónica dominante; o wordmark tipográfico puro sin símbolo.
- **Tipografía display:** el manual original usa Hands Brush como script para titulares
  destacados. Eso NO escala digitalmente. Reemplazar por una display font contemporánea
  con carácter streetwear. Candidatos: PP Neue Machina, ABC Diatype, Pangram Sans
  Rounded, GT America Condensed, Space Grotesk Bold. Condensada, geométrica, con carácter.
- **Modo principal:** dark mode dominante (el manual original es print/light-first).
  Fondo base #0a0a0a o #171717, no blanco.
- **Color como sistema semántico:** los 5 acentos del manual pasan a ser señalización
  funcional dentro del producto (no decorativa).

## PALETA FINAL — USO SEMÁNTICO

Cada color tiene un significado funcional específico, no decorativo:

**Base neutrals (dark mode):**
- #0a0a0a — fondo primario (negro profundo)
- #171717 — surfaces elevadas
- #262626 — borders y dividers
- #ffffff — texto primario
- #a3a3a3 — texto secundario
- #666666 — texto terciario

**Acentos semánticos:**
- #ffce37 (amarillo) — CTAs primarios, completeness score alto, highlights,
  acción principal
- #D93D4A (rojo señalización) — alerts, breaking news, missing data warnings,
  badges urgentes
- #04756F (teal) — categorías del archivo, tipo de entidad, geografía
- #0093C6 (cyan) — links, referencias cruzadas inline, citations
- #244C5A (navy) — verified profiles, badges institucionales, partnerships

## TIPOGRAFÍA DIGITAL

- **Body (todo el cuerpo editorial y UI):** Montserrat (400, 500, 600, 700)
- **Display headlines:** propón una display font contemporánea streetwear.
  Candidatos fuertes: PP Neue Machina, ABC Diatype, Pangram Sans, GT America
  Condensed, Space Grotesk Bold. Genera 3 mockups comparados para poder elegir.
- **Monospace (data, metadata, IDs, fechas, credits):** JetBrains Mono o
  IBM Plex Mono.
- **Wordmark:** mantiene el estilo geometric sans extrabold del wordmark
  actual de Dauton Store (ver asset `imagotipo-positivo.png`), solo cambiando
  "STORE" por "MEDIA".

## PRINCIPIOS VISUALES NON-NEGOTIABLE

1. **Tipografía como arquitectura.** Headlines enormes (72-140px desktop),
   contraste brutal entre tamaños, tipografía dominante sin necesidad de
   imágenes o ilustraciones para comunicar.

2. **Densidad intencional.** NO espacios vacíos lujosos estilo Apple. Mucha
   información visible pero jerarquizada. El usuario debe sentir que hay
   profundidad y trabajo serio detrás.

3. **Monospace para data.** Credits, fechas, stats, IDs, completeness scores
   → siempre en monospace. Dice "esto es dato real, verificable, no decoración".

4. **Color como señal.** Cada uso de los 5 acentos debe tener un motivo
   funcional (según la tabla de arriba). Nunca decorativo.

5. **Zero decoración.** Cada elemento tiene función. Sin patterns de fondo,
   sin gradientes, sin ilustraciones abstractas 3D.

6. **Contraste alto.** Oscuro dominante. Acentos saturados. Tipografía blanca y
   amarilla. El contraste es brutal, no sutil.

7. **Grid visible.** El sistema se percibe detrás de cada layout. Columnas
   marcadas, alineaciones estrictas.

8. **Bordes afilados.** Radius máximo 8px. Preferencia por 0px, 2px, 4px.
   Nunca pills redondeadas tipo iOS.

## LO QUE **NO** QUEREMOS (EVITAR A TODA COSTA)

- Gradientes tipo SaaS moderno (especialmente purple gradients sobre blanco)
- Ilustraciones vectoriales 3D abstractas
- Dark mode genérico gris+cyan (cualquier dashboard de SaaS típico)
- Skeuomorfismo musical: turntables, vinilos, micrófonos, headphones, ondas de sonido
- Glitch effects como estética de sistema (OK puntualmente, no como identidad)
- Imágenes stock genéricas de hip-hop (manos con cadenas, grafitis genéricos)
- Tipografías sobreusadas: Inter, Roboto, Arial, system fonts genéricos
- Layouts de "label con roster" tradicionales
- Animaciones decorativas estilo Awwwards
- Wikipedia/enciclopedia aburrida (somos archivo con IDENTIDAD, no beige)
- Menús hamburguesa en desktop (tenemos mucho contenido que mostrar, no esconder)
- Búsqueda escondida en un icon pequeño (la búsqueda es de primer nivel)
- Pills redondeadas tipo iOS (bordes afilados siempre)

## REFERENCIAS VISUALES (MOOD BOARD)

El brief PDF adjunto tiene el mood board completo con 6 referencias, cada una con
"qué tomamos" y "qué evitamos":

1. **NTS Radio** (nts.live) — densidad editorial + personalidad radio pirata +
   archivo profundo
2. **Places + Faces** (placesplusfaces.com) — archivo crudo + bloques de foto +
   metadata tipográfica
3. **Supreme** (supreme.com) — cultura de drops + box logo + tipografía dominante
4. **Pitchfork** (pitchfork.com) — autoridad editorial + sistema de scoring +
   entidades linkeadas
5. **Genius pre-2019** — dark + acentos amarillos + data-rich cards +
   relationships visibles
6. **Highsnobiety / 032c** — tipografía como arquitectura + bloques de color +
   contraste extremo

**Fórmula de posicionamiento:** Dauton Media = NTS Radio + Pitchfork + Genius.
Con personalidad de Supreme pero el rigor de un archivo serio.

## ARQUITECTURA DEL PRODUCTO (CONTEXTO PARA TEMPLATES)

El producto es un grafo de 17 tipos de entidades (9 en MVP). Cada página es una
**vista dinámica del grafo**, no un documento estático. Templates principales:

- **Artist** — bio, discografía, créditos, colaboradores, press, editorial relacionado
- **Release** — cover art, tracklist, credits, audio preview, plataformas, reviews
- **Track** — metadata, audio preview, credits, samples, lyrics link
- **Person** (producer/DJ/engineer) — roles, producciones, credits, colaboradores
- **Crew / Label** — members, roster, releases, timeline
- **City** — escena local, artistas asociados, timeline, venues
- **Article** (editorial) — long-form con entidades linkeadas inline, sources
- **Source** — la cita como entidad citable

Features de producto clave a considerar en UI:
- **Completeness score** visible (0-100% en cada entidad)
- **Verified badges** para artistas que claman su perfil
- **Sources/citations** como first-class citizens con links inline cyan
- **Sugerir correción** (contribuciones de usuarios)
- **Audio player** persistente para previews de 30s
- **Navegación de grafo** (colaboradores, relaciones, cross-references)
- **Search** prominente (no escondido)

## ALCANCE ESPERADO

Design system completo para el MVP incluyendo:

- Brand evolution (logo system + typography + palette aplicada)
- Component library (buttons, nav, footer, cards, pills, forms, search,
  audio player, modals, tabs, breadcrumbs, pagination, alerts, empty states)
- Screen designs (homepage, artist, release, track, person, crew, label, city,
  editorial index, article, search, auth flows, user dashboard, shop/drops)
- Mobile + desktop para cada template
- User flows visualizados (los 5 flujos críticos del brief)
- Motion guidelines (principios, durations, easings)

## PRIORIDADES DE DISEÑO (RANKING)

Cuando haya tensión entre principios, resolver en este orden:

1. Legibilidad y densidad de información
2. Navegabilidad del grafo
3. Autoridad y legitimidad visual
4. Branding y personalidad
5. Performance (Lighthouse ≥90)
6. Escalabilidad de templates
7. Responsive (mobile discovery + desktop lectura)
8. Accessibility (WCAG AA)
9. Brand extensibility (futuros productos Dauton Media)
10. Merch integration

## TONO EDITORIAL (AFFECTA MICROCOPY)

El tono del producto es:

- **Sobrio pero con energía.** No frío ni corporativo; no casual ni meme.
- **Bilingüe: español primario, inglés técnico.** Metadata puede estar en inglés
  (RELEASE, TRACK, PRODUCER) pero contenido editorial y UI labels en español.
- **Directo, no floweries.** "Ver discografía" no "Explora el universo sonoro"
- **Autoridad, no arrogancia.** "Completeness 87%" no "¡Casi perfecto!"
- **Cultural, no marketinero.** Respeta a los artistas y a la escena.

---

*Archivo adjunto: `07-design-brief.pdf` tiene el brief completo de 22 páginas con
mood board visual, sitemap, flujos, y especificaciones completas. Úsalo como
fuente de verdad cuando tengas dudas.*
