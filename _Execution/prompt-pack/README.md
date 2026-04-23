# DAUTON MEDIA — CLAUDE DESIGN PROMPT PACK

**Proyecto:** Dauton Media
**Fase actual:** Design System configurado → Generación de pantallas
**Herramienta:** claude.ai/design
**Fecha:** April 23, 2026

---

## CÓMO USAR ESTE DOCUMENTO

### Orden de ejecución

12 prompts en 4 fases. **Ejecutar en orden.** Cada fase construye sobre la anterior.

```
FASE A — Brand Evolution        (3 prompts)  — 30-45 min
FASE B — Core Entity Screens    (5 prompts)  — 60-90 min
FASE C — Editorial + User       (3 prompts)  — 30-45 min
FASE D — Shop Integration       (1 prompt)   — 15-20 min
```

### Reglas operativas

1. **Un prompt a la vez.** Espera output completo antes de avanzar.
2. **Cada prompt en un nuevo project/chat dentro de Claude Design.** No acumules 12 prompts en la misma sesión — el contexto se satura. Ver "Tips" de la doc de Anthropic.
3. **Guarda cada output** con el nombre del prompt (ej: `A1-wordmark`, `B1-homepage`). Usa el Export → HTML bundle + PDF.
4. **Review cada output contra el brief** antes de pasar al siguiente. Si algo no cuadra, usa chat para iterar (2-3 rondas máx). Si no converge, pausa y me escribes.
5. **Inline comments para ajustes quirúrgicos**, chat para cambios estructurales.
6. **Token awareness**: cada prompt consume Opus 4.7 tokens. Si hit el weekly limit, considera activar extra usage o pausar.

### Template de iteración (cuando algo no sale bien)

```
Esto no cumple [criterio específico del brief].

Necesito que:
1. [Cambio concreto 1 con referencia a spacing/color/type]
2. [Cambio concreto 2]

Mantén intacto: [lo que SÍ salió bien]
```

---

## 🎨 FASE A — BRAND EVOLUTION

> **Objetivo:** validar que la marca Dauton Media está lista visualmente antes de
> aplicarla a pantallas. Si esto falla, todo lo demás falla.

---

### PROMPT A.1 — WORDMARK & LOGO SYSTEM

```
Diseña el logo system completo de DAUTON MEDIA.

CONTEXTO: Ya subí al design system los assets originales de Dauton Store
(monograma D+S amarillo geométrico entrelazado + wordmark "DAUTON STORE"
geometric sans extrabold). Dauton Media evoluciona esa marca.

Genera 3 DIRECCIONES de logo system. Cada dirección muestra:

1. Wordmark principal "DAUTON MEDIA" (lockup horizontal)
2. Wordmark compacto (stack vertical, 2 líneas)
3. Monograma reducido para favicon/app icon
4. Una aplicación real (ej: signature de newsletter o watermark en un cover art)

---

DIRECCIÓN 1 — TIPOGRÁFICA PURA (BRUTALIST)
"DAUTON MEDIA" en display font extrabold geometric condensed, tracking ajustado.
SIN símbolo. El wordmark ES el logo. Estilo Supreme/Highsnobiety.
Para el monograma reducido: lockup "DM" extremadamente tight.

DIRECCIÓN 2 — WORDMARK + MONOGRAMA D+M EVOLUCIONADO
"DAUTON MEDIA" + un nuevo monograma D+M entrelazado siguiendo el mismo ADN
geométrico señalético del D+S original. Las dos letras entretejidas con la
misma lógica constructiva que se ve en el imagotipo original que subí.

DIRECCIÓN 3 — WORDMARK + MONOGRAMA D ARQUITECTÓNICO
"DAUTON MEDIA" + un monograma reducido a la D como forma dominante
brutalist, con la M incorporada sutilmente o simplemente ausente. Más
arquitectónico y menos entrelazado que el original. Estilo 032c/Trap Magazine.

---

Para cada dirección muestra:
- Sobre fondo negro #0a0a0a (uso primario)
- Sobre fondo amarillo #ffce37 (uso de impacto)
- Sobre fondo blanco (uso para print/invoice/legal)
- Tamaños: 24px, 48px, 120px, 480px (validar escalabilidad)

NO QUEREMOS:
- Ondas de sonido, notas musicales, vinilos, micrófonos, turntables
- Cualquier skeuomorfismo de "sello discográfico" obvio
- Gradientes, sombras, efectos 3D
- Tipografías script, handwritten, brush (el Hands Brush original se jubila)
```

**Qué validar antes de avanzar:**
- ✅ Una de las 3 direcciones se siente indudablemente "Dauton Media"
- ✅ El wordmark es legible a 24px (favicon/menu)
- ✅ Funciona sobre fondos negro + amarillo
- ✅ Preserva ADN del original (geometric sans extrabold)

---

### PROMPT A.2 — TYPOGRAPHY SYSTEM IN USE

```
Muestra el sistema tipográfico completo de Dauton Media aplicado en contextos
reales, NO solo como muestra de fonts.

Diseña una página A4 vertical sobre fondo negro #0a0a0a que contenga:

1. HERO HEADLINE MASSIVE (ocupa ~40% del espacio):
   "LA HISTORIA NO CONTADA DEL RAP VENEZOLANO"
   Tipografía display grande (96-140px). Jerarquía visual brutal.
   El headline se divide en 3 líneas con distinto tratamiento tipográfico:
   línea 1 "LA HISTORIA" neutral, línea 2 "NO CONTADA DEL" en un tamaño más
   pequeño, línea 3 "RAP VENEZOLANO" con bloque amarillo detrás estilo highlight.

2. ESCALA TIPOGRÁFICA con labels:
   H1 Display (96px) → "Canserbero"
   H2 Display (64px) → "Discografía completa"
   H3 Display (40px) → "Apocalipsis, 2012"
   H4 Title (24px) → "Tracks destacados"
   Body Large (18px) → párrafo editorial de 2 oraciones
   Body (14px) → párrafo editorial de 4 oraciones
   Caption (12px) → "Publicado el 12.02.2012 · 8 min read"
   Mono Label (11px, uppercase, tracking expanded) → "RELEASE · ID 4871 · COMPLETENESS 94%"

   Cada item de la escala muestra: nombre técnico (izq mono pequeño) +
   ejemplo aplicado (der grande).

3. PÁRRAFO EDITORIAL DE PRUEBA (120 palabras):
   Un párrafo body editorial real sobre el rap venezolano, demostrando cómo se
   siente leer en este sistema. Debe sentirse como Pitchfork o The Fader —
   denso pero legible, con personalidad. Incluye 2 links inline en cyan #0093C6
   (ej: [Canserbero], [Apocalipsis]) y 1 footnote numérica.

4. DATA-HEAVY BLOCK (ficha técnica en monospace):
   Formato tabla clave:valor con 8 campos, todo en monospace:
   ARTIST           CANSERBERO
   RELEASE          APOCALIPSIS
   YEAR             2012
   LABEL            GUERRILLA SEED
   TRACKS           15
   PRODUCER         LIL SUPA
   ENGINEER         JOSE ROJAS
   COMPLETENESS     94%

5. COMBINACIÓN EN COMPOSICIÓN EDITORIAL:
   Una vista final que combina headline + body + data block en la misma página,
   demostrando cómo conviven los 3 registros tipográficos en una pantalla real.

CERO imágenes o ilustraciones — solo tipografía y color sobre el fondo oscuro.
El objetivo es sentir cómo funciona el sistema antes de diseñar pantallas.
```

**Qué validar:**
- ✅ Display font tiene carácter memorable
- ✅ Escala tiene contraste brutal entre tamaños
- ✅ Monospace se lee distinto del body, como "data real"
- ✅ Los links cyan y highlights amarillos son visibles pero no ruidosos

---

### PROMPT A.3 — PALETTE IN APPLICATION

```
Aplica la paleta completa de Dauton Media en una página de muestras FUNCIONAL —
no swatches abstractos, sino cada color en su USO semántico específico.

Diseña una sola página larga (scrollable, fondo negro #0a0a0a) con 7 secciones
verticales separadas por dividers sutiles:

SECCIÓN 1 — HEADER TIPO PANEL DE TRÁFICO:
Una franja horizontal con los 5 acentos como 5 columnas iguales, cada una con:
- Background del color accent
- Texto en mono blanco encima con el hex code
- Una palabra corta que resume la función (ACCIÓN / URGENCIA / ARCHIVO / REF / VERIFIED)
Esto es el "manual en miniatura" del sistema semántico.

SECCIÓN 2 — AMARILLO #ffce37 EN ACCIÓN
3-4 ejemplos reales:
- Botón CTA "EXPLORAR ARCHIVO →" (primary button)
- Badge "94% COMPLETO" sobre una card
- Highlight inline dentro de un headline ("LA HISTORIA NO CONTADA")
- Progress bar de completeness al 87%

SECCIÓN 3 — ROJO #D93D4A EN ACCIÓN
- Alert banner: "BREAKING · Nueva entrevista con Apache publicada hace 2h"
- Badge "NEW" sobre un article card
- Missing data warning: "3 TRACKS SIN CRÉDITOS"
- Badge urgente de countdown: "DROP EN 48H"

SECCIÓN 4 — TEAL #04756F EN ACCIÓN
- Category pills en grupo: [RAPPER] [PRODUCER] [DJ] [ENGINEER]
- Geographic tags: [VENEZUELA] [COLOMBIA] [MÉXICO]
- Entity type badges usados en resultados de búsqueda

SECCIÓN 5 — CYAN #0093C6 EN ACCIÓN
- Un párrafo body con 4 inline links en cyan (ej: "Según [Canserbero], la escena
  de [Caracas] a finales de los 2000s estaba liderada por [MCKlopedia] y otros...")
- Badge "VER FUENTE" al final de un hecho citado
- Lista de references al final de un artículo con números superíndice linkeados

SECCIÓN 6 — NAVY #244C5A EN ACCIÓN
- Verified artist badge con checkmark: "APACHE ✓ VERIFIED"
- Institution partner badge: "IN PARTNERSHIP WITH [CENTRO CULTURAL]"
- Premium membership badge: "ARCHIVE+ MEMBER"

SECCIÓN 7 — AT-A-GLANCE: USO COMBINADO CONTROLADO
Una card compleja de perfil de artista que usa los 5 acentos simultáneamente
pero de forma NO caótica:
- Nombre en display blanco grande
- Pill amarillo "RAPPER"
- Pill teal "CARACAS"
- Badge rojo "NEW INTERVIEW"
- Link cyan "Ver discografía →"
- Badge navy "VERIFIED"

La card debe demostrar que cuando los 5 acentos conviven, el sistema se sostiene
gracias al peso jerárquico correcto.

Todo sobre fondo negro dominante. Este es el test de que el sistema funciona
en dark mode primario.
```

**Qué validar:**
- ✅ Cada color tiene un caso de uso claro, no decorativo
- ✅ El amarillo se siente protagonista, no igualado a los otros
- ✅ La sección 7 (combinada) no se ve caótica

---

## 🖼️ FASE B — CORE ENTITY SCREENS

> **Objetivo:** diseñar los 5 templates más importantes del MVP. Cada uno es
> una vista dinámica del grafo de 17 entidades.

---

### PROMPT B.1 — HOMEPAGE

```
Diseña la HOMEPAGE de Dauton Media en desktop (1440px) y mobile (390px).

GOAL: Un usuario nuevo entiende en 5 segundos que esto es archivo serio +
editorial con personalidad streetwear. Un usuario recurrente ve inmediatamente
lo nuevo (últimos releases, nuevo editorial, destacados).

AUDIENCIA: fans serios del rap hispano, periodistas/researchers, artistas/industria,
diáspora hispanohablante.

LAYOUT DESKTOP (top-to-bottom):

1. NAV BAR (sticky, fondo #0a0a0a, border-bottom sutil):
   - Logo "DAUTON MEDIA" (wordmark) izquierda
   - Links centro-derecha: ARCHIVO · EDITORIAL · ESCENAS · SHOP · ABOUT
   - Right: Search icon + botón amarillo "Subscribe"

2. HERO EDITORIAL (100vh):
   - Editorial destacado con headline brutal: "LA HISTORIA NO CONTADA DEL RAP VENEZOLANO"
   - Subtítulo: "40 AÑOS DE CULTURA HIP-HOP EN VENEZUELA · ARCHIVO DROP 012"
   - Metadata abajo en mono: "8K PALABRAS · 22 FUENTES · 12 MIN LEER"
   - CTA sutil: "LEER AHORA →"
   - Sin imagen — todo tipografía + color. Puedes agregar un bloque amarillo
     detrás de una palabra clave del headline

3. LATEST RELEASES (horizontal scroll strip):
   Título H2 mono arriba: "ÚLTIMOS RELEASES INDEXADOS"
   6 cards visibles:
   - APOCALIPSIS · Canserbero · 2012 · 94%
   - MUERTE · Canserbero · 2012 · 89%
   - EL TAMBORERO · Apache · 2018 · 76%
   - VIEJA ESCUELA · Akapellah · 2016 · 82%
   - EVIDENCIA · Lil Supa · 2019 · 71%
   - LOS VENCIDOS · Neutro Shorty · 2020 · 68%
   Cada card: cover art (placeholder cuadrado oscuro), título, artista, año,
   completeness badge en amarillo

4. FEATURED ARTISTS (grid 3x2):
   Título: "ARTISTAS DESTACADOS"
   Tiles con nombre grande en display + ciudad en mono + pill rol:
   CANSERBERO / Caracas / [RAPPER]
   APACHE / Guarenas / [RAPPER]
   AKAPELLAH / Maracay / [RAPPER]
   MCKLOPEDIA / Caracas / [LYRICIST]
   LIL SUPA / Caracas / [PRODUCER]
   NEUTRO SHORTY / Valencia / [RAPPER]
   Foto placeholder (bloque oscuro con iniciales grandes amarillas centradas).

5. EDITORIAL FEED (lista vertical densa):
   Título: "ÚLTIMOS ARTÍCULOS"
   4 entries separadas por dividers:
   - Badge pill [REVIEW] / [INTERVIEW] / [FEATURE] / [HISTORY]
   - Título display grande
   - Metadata mono: autor · fecha · tiempo lectura
   - Excerpt de 1 línea
   - Thumbnail pequeño a la derecha (placeholder)

6. SHOP DROP HERO:
   "DROP 012 — CÁPSULA CANSERBERO 30 AÑOS"
   Layout horizontal: imagen producto placeholder izq, contenido der.
   - Nombre drop grande
   - Contenido: "T-shirt + Vinilo + Zine editorial"
   - Precio: "$85 USD"
   - Badge "LIMITED EDITION · 120 UNITS"
   - CTA amarillo "VER DROP →"

7. FOOTER:
   Logo Dauton Media grande al top.
   3 columnas de links: PRODUCTO / SOBRE / LEGAL
   Newsletter input + botón "Suscribirme"
   Social icons minimales (X, IG, YT sin colores)
   Copyright mono en gris abajo.

LAYOUT MOBILE (390px):
Misma información stackeada vertical. Menú hamburguesa en nav. Hero headline
responsive pero sigue siendo grande (no achicar a 32px). Cards en 1 columna
con scroll horizontal. Shop drop como card individual.

CRITERIOS DE ÉXITO:
- Dark mode dominante, amarillo como acento visible
- Tipografía de Fase A aplicada correctamente
- Densidad alta — "este sitio tiene contenido serio"
- Grid visible, columnas percibibles
- Contraste extremo en headlines
- Cero decoración innecesaria
```

---

### PROMPT B.2 — ARTIST PROFILE PAGE

```
Diseña la ARTIST PROFILE PAGE en desktop + mobile.

EJEMPLO PARA LLENAR: perfil de APACHE
- Nicolás Hernández, rapper venezolano
- Guarenas, activo desde 2005
- 34 releases, 87 colaboraciones
- 91% completeness, verified

GOAL: el visitante (fan serio o journalist) encuentra todo sobre el artista
en un lugar — bio, discografía, créditos, colaboradores, press, editorial
relacionado — y puede navegar al grafo desde ahí.

LAYOUT DESKTOP:

1. NAV BAR (mismo sticky que homepage)

2. BREADCRUMB (mono tenue):
   Archivo → Rappers → Venezuela → Apache

3. HEADER HERO (en dos columnas 40/60):
   IZQ: Portrait grande (placeholder: bloque oscuro con X de líneas + label
        "ARTIST PHOTO"). Abajo: flag venezolana + "GUARENAS, VENEZUELA" en mono.
   DER:
   - "APACHE" (nombre gigante display ~120px)
   - "Nicolás Hernández" (nombre real, mono)
   - Pills: [RAPPER] amarillo / [GUARENAS] teal / [EST. 2005] gris oscuro
   - Badge navy "✓ VERIFIED · CLAIMED BY ARTIST"
   - Bio 60 palabras en body editorial
   - Row de botones minimal: "★ Favorito" / "↗ Compartir" / "✏ Sugerir edición"

4. STATS STRIP (4 columnas horizontales):
   Cada stat: label mono pequeño arriba + número grande display amarillo abajo.
   DISCOGRAFÍA: 34 RELEASES
   COLABORACIONES: 87 ARTISTAS
   COMPLETENESS: 91%
   EN LA ESCENA: 21 AÑOS

5. TABS NAVIGATION (sticky al scroll):
   BIO · DISCOGRAFÍA · COLABORADORES · CRÉDITOS · PRENSA · EDITORIAL · SHOP
   Brutalist — solo texto mono uppercase, active state = underline amarillo.

6. SECCIÓN BIO (activa por default):
   Long-form bio ~400 palabras. Entidades mencionadas linkeadas inline
   en cyan. Cada claim con footnote numérica a fuente.
   Al final, TIMELINE horizontal compacto:
   2005 DEBUT → 2012 BREAKTHROUGH → 2018 EL TAMBORERO → 2024 NOW

7. DISCOGRAFÍA (grid 4 cols desktop, 2 mobile):
   Cards de release: cover art placeholder cuadrado, título, año,
   type pill (ALBUM/EP/MIXTAPE/SINGLE), completeness %, botón play (▶).

8. COLABORADORES (grid tipográfico, 6x4):
   Título: "87 ARTISTAS CONECTADOS"
   Cada tile: iniciales grandes display + nombre completo mono + pill con
   "X TRACKS JUNTOS". No grafo de red visual — sistema tipográfico que
   TRANSMITE la densidad de conexiones sin ser spaghetti.

9. CRÉDITOS (tabla brutalist):
   Tabla tipo liner notes de vinilo. Columnas mono:
   TRACK · RELEASE · ROLE · YEAR · SOURCE
   30 filas de placeholder data. Estilo terminal / catálogo.

10. PRENSA (lista vertical):
    Cada entrada: logo outlet placeholder + título artículo + fecha + excerpt.

11. EDITORIAL RELACIONADO (strip horizontal):
    Artículos de Dauton Media sobre Apache. Cards como homepage.

12. SHOP RELACIONADO (strip pequeño):
    Merch relacionado a Apache (si existe).

13. FOOTER (mismo que homepage)

LAYOUT MOBILE:
Todo stackea vertical. Tabs se vuelven un scroll horizontal. Stats strip
en 2x2. Colaboradores grid 3x4 en mobile. Discografía grid 2 cols.

CRITERIOS:
- El usuario entiende en 10 segundos todo sobre Apache
- Hay caminos obvios para navegar a colaboradores/releases/articles
- Completeness 91% visible y entendible
- Verified badge comunica autoridad sin ser LinkedIn-cringe
```

---

### PROMPT B.3 — RELEASE DETAIL PAGE

```
Diseña la RELEASE DETAIL PAGE en desktop + mobile.

EJEMPLO: APOCALIPSIS · Canserbero · 2012 · Guerrilla Seed · 94% completeness

LAYOUT DESKTOP:

1. NAV + BREADCRUMB (Archivo → Releases → Venezuela → Apocalipsis)

2. HERO (2 columnas 50/50):
   IZQ: Cover art grande 500x500px (placeholder cuadrado oscuro con título en
        grande al centro). Botón play overlay al hacer hover.
   DER:
   - Pill [ALBUM] amarillo
   - "APOCALIPSIS" (título display ~96px)
   - "CANSERBERO" (artist, display 40px, linkeado cyan)
   - Metadata mono: "2012 · 15 TRACKS · 58 MIN · GUERRILLA SEED"
   - Badge completeness "94% COMPLETO"
   - CTAs: "▶ Reproducir preview" (outline) / "★ Favorito" / "↗ Compartir"
   - Streaming links row: Spotify, Apple Music, YouTube (icons mono blancos)

3. TRACKLIST (tabla brutalist):
   Columnas: # · TRACK NAME · DURATION · PLAY · CREDITS
   15 filas. Cada row con hover highlight sutil. Play button lleva a track page.
   Tracks ejemplo:
   01. INTRO (Apocalipsis)              1:45  ▶  [producer: Lil Supa]
   02. CREDO                            3:52  ▶  [producer: Lil Supa]
   03. JEREMÍAS 17:5                    4:10  ▶  [producer: Lil Supa]
   04. MAQUIAVÉLICO                     3:38  ▶  [producer: Big Hozone]
   ... etc

4. CREDITS (grid 3 columnas, estilo liner notes):
   Headers mono: PRODUCTION / MUSICIANS / TECHNICAL
   Cada columna lista roles con nombre linkeado cyan:
   Producer: Lil Supa, Big Hozone
   Engineer: José Rojas
   Mix: Jay Rajagopalan
   Master: Mike Marsh
   Cover art: Tonny López
   ... etc

5. RELATED (4 secciones horizontales):
   - Otros releases de Canserbero (cards como homepage)
   - Releases del mismo label (Guerrilla Seed)
   - Releases producidos por Lil Supa
   - Releases de 2012 en Venezuela

6. PRESS & EDITORIAL:
   Lista vertical de artículos de prensa + editoriales de Dauton Media
   sobre este release.

7. FOOTER

LAYOUT MOBILE:
Hero cover art 100% width + info debajo stacked. Tracklist sigue en tabla
pero más compacta. Credits en 1 columna. Related strips en horizontal scroll.

DETALLES:
- El cover art es el HERO — debe ser grande y protagónico
- La tabla de tracklist debe sentirse como un catálogo serio, no playlist de Spotify
- Streaming links son discretos (outline, no colored), no queremos competir con
  plataformas sino enlazar
- Cada elemento citable (producer, engineer, etc) linkeado al grafo
```

---

### PROMPT B.4 — TRACK DETAIL PAGE

```
Diseña la TRACK DETAIL PAGE en desktop + mobile.

EJEMPLO: "JEREMÍAS 17:5" por Canserbero, del álbum Apocalipsis (2012).

LAYOUT DESKTOP:

1. NAV + BREADCRUMB (Archivo → Releases → Apocalipsis → Jeremías 17:5)

2. HERO (layout centered compacto):
   - Badge pill pequeño: [TRACK] teal
   - "JEREMÍAS 17:5" (título display ~96px, centered)
   - "CANSERBERO · APOCALIPSIS · 2012" (mono 18px)
   - Duración: "04:10"
   - Big play button central: círculo amarillo con ▶ negro, 120px
   - Progress bar del audio player inline abajo del play button
   - Controles: prev / play / next / volume

3. META GRID (4 columnas data-heavy):
   RELEASE            APOCALIPSIS
   POSITION           03 / 15
   DURATION           4:10
   BPM                92
   KEY                D MINOR
   PRODUCER           LIL SUPA
   ENGINEER           JOSÉ ROJAS
   WRITER             TIRONE JOSÉ GONZÁLEZ

4. CREDITS DETALLADO:
   Sección expandida con todos los créditos técnicos:
   - Performer: Canserbero (vocals, lyrics)
   - Producer: Lil Supa (beat production, arrangement)
   - Additional vocals: [vacío — missing data warning rojo]
   - Engineer: José Rojas (recording, mixing)
   - Master: Mike Marsh
   - Sample sources: [ver lista]

5. SAMPLES USED (si aplica — card especial):
   "CONTIENE SAMPLES DE:"
   Lista de samples con cada uno como card pequeña:
   - Nombre del track sampleado + artista original + año + 30s preview

6. LYRICS LINK:
   Card grande: "LETRAS NO DISPONIBLES EN DAUTON MEDIA"
   Explainer: "Por respeto a los autores y derechos, no hospedamos letras
   directamente. Ver en [Genius] [AZ Lyrics] [SoundHound]"
   Los links externos son cyan, sin tracking marketing.

7. EDITORIAL RELACIONADO:
   Artículos que mencionan este track. Cards horizontal scroll.

8. RELATED TRACKS:
   4 cards: otros tracks del mismo álbum, otros tracks del productor,
   tracks del mismo año, tracks con samples similares.

9. FOOTER

LAYOUT MOBILE:
Hero centered se mantiene. Play button más pequeño pero sigue siendo dominante.
Meta grid en 2x4. Todo stackea vertical.

CRITERIOS:
- El audio player es el elemento central
- La página se siente como "liner notes de una canción individual"
- Missing data está visible (rojo) para invitar a contribuir
- Cero intentos de mostrar lyrics — respetar derechos, linkear a plataformas
```

---

### PROMPT B.5 — PERSON PAGE (PRODUCER / DJ / ENGINEER)

```
Diseña la PERSON PAGE (para roles no-rapper) en desktop + mobile.

EJEMPLO: LIL SUPA · Producer, multi-instrumentista, también rapper · Caracas

Esta es distinta de Artist Profile porque enfatiza ROLES MÚLTIPLES y CRÉDITOS
sobre otros artistas, no bio + discografía propia.

LAYOUT DESKTOP:

1. NAV + BREADCRUMB

2. HERO (2 columnas):
   IZQ: Portrait
   DER:
   - "LIL SUPA" (display grande)
   - "José Alberto Álvarez" (real name mono)
   - MÚLTIPLES pills de roles: [PRODUCER] [RAPPER] [MULTI-INSTRUMENTALIST]
   - Pill teal [CARACAS]
   - Bio corta 40 palabras

3. STATS (5 columnas esta vez):
   PRODUCCIONES: 142 TRACKS
   COLABORADORES: 38 ARTISTAS
   LABELS: 12
   DISCOGRAFÍA PROPIA: 6 RELEASES
   COMPLETENESS: 78%

4. TABS:
   BIO · PRODUCCIONES · COLABORADORES · DISCOGRAFÍA PROPIA · CRÉDITOS · EDITORIAL

5. PRODUCCIONES (esta tab es el core):
   "142 TRACKS PRODUCIDOS"
   Tabla filtrable/ordenable:
   YEAR · ARTIST · RELEASE · TRACK · ROLE · LABEL
   2012  Canserbero  Apocalipsis  Jeremías 17:5  Beat, Arrangement  Guerrilla Seed
   2012  Canserbero  Apocalipsis  Credo          Beat               Guerrilla Seed
   ... 140 filas más
   Filter pills encima: [TODOS] [2012] [2013] [2014] ... (por año)
                        [TODOS] [Canserbero] [Apache] ... (por artista)

6. COLABORADORES (grid tipográfico tipo Artist Page sección 8)

7. DISCOGRAFÍA PROPIA (grid de releases donde es artist, no producer)

8. CRÉDITOS DETALLADO (tabla más completa que sección 5):
   Rol específico por proyecto: BEAT, ARRANGEMENT, MIX, SAMPLE FLIP, etc.

9. EDITORIAL RELACIONADO + FOOTER

LAYOUT MOBILE:
Igual que Artist pero tabla de producciones se vuelve cards stackeadas verticales.

CRITERIOS:
- Enfatiza el volumen de trabajo (142 tracks, 38 artists)
- La tabla de producciones es el elemento protagónico
- Filtros accesibles rápido (pills, no dropdowns escondidos)
- Roles múltiples visibles en el header
```

---

## 📝 FASE C — EDITORIAL & USER

> **Objetivo:** los templates que hacen que Dauton Media sea una publicación,
> no solo un archivo.

---

### PROMPT C.1 — ARTICLE DETAIL PAGE (LONG-FORM EDITORIAL)

```
Diseña la ARTICLE DETAIL PAGE para un long-form editorial en desktop + mobile.

EJEMPLO: "LA HISTORIA NO CONTADA DEL RAP VENEZOLANO" — 8K palabras, 22 fuentes,
12 min lectura, por L. Figuera, publicado el 22 abril 2026.

Este template es la razón por la que Dauton Media se siente como Pitchfork
evolucionado, no como Wikipedia. Aquí la autoridad editorial se construye visualmente.

LAYOUT DESKTOP:

1. NAV BAR (igual sticky)

2. HEADER DEL ARTÍCULO (full width, altura ~80vh):
   - Pill grande arriba: [FEATURE] amarillo
   - Título MASSIVE centered:
     "LA HISTORIA NO CONTADA DEL"
     [RAP VENEZOLANO]  ← el segundo renglón con highlight amarillo de fondo
   - Deck/subtítulo (28px): "40 años de cultura hip-hop en Venezuela, desde los
     primeros cyphers en Plaza Venezuela hasta la diáspora global post-2015."
   - Author line mono: "BY L. FIGUERA · 22 APRIL 2026 · 12 MIN READ"
   - Scroll indicator sutil abajo

3. META STRIP (justo antes del body, separado por line top/bottom):
   - Dificultad de lectura: "AVANZADO · 12 MIN"
   - Cantidad de fuentes: "22 FUENTES CITADAS"
   - Entidades mencionadas: "34 ARTISTAS · 12 RELEASES · 8 CIUDADES"
   - Share buttons: X · Copy link · Email

4. BODY EDITORIAL (contenido principal — 8 párrafos ejemplo):
   - Ancho de columna: 720px centered (óptimo para lectura)
   - Body large (18px) con line-height generoso (1.7)
   - Drop cap en el primer párrafo (letra gigante amarilla)
   - Entidades mencionadas inline linkeadas cyan con underline sutil:
     "...según [Canserbero], la escena de [Caracas] a finales de los 2000s..."
   - Pull quotes intercaladas:
     ╔══════════════════════════════════════╗
     ║ "El rap venezolano nació en la calle, ║
     ║  no en los estudios. Esa es su verdad" ║
     ║  — APACHE, entrevista 2018             ║
     ╚══════════════════════════════════════╝
     Pull quote grande, display, con tratamiento brutalist (sin italics)
   - Subheadings H2 en display amarillo
   - Footnotes numéricas superíndice cyan
   - Al menos 2 "ENTITY CARDS" embedded inline: una card rectangular que al aparecer
     en el texto muestra un mini-perfil de una entidad (con link al perfil completo)

5. SOURCES / CITATIONS (sección al final del body):
   Título: "FUENTES (22)"
   Lista numerada mono, cada entry:
   [01] Nombre del outlet/libro/entrevista · Autor · Fecha · Link

6. ENTITIES MENTIONED (sección grid):
   Título: "ENTIDADES MENCIONADAS EN ESTE ARTÍCULO"
   Grid horizontal de cards pequeñas: artistas, releases, ciudades, labels
   mencionados, cada uno linkeado a su página.

7. RELATED ARTICLES (3 cards horizontales):
   Artículos relacionados de Dauton Media.

8. COMMENTS / DISCUSSION (si aplica en MVP):
   O un sign-up prompt: "SUSCRÍBETE PARA CONTINUAR LA CONVERSACIÓN"

9. FOOTER

LAYOUT MOBILE:
Título se mantiene grande pero responsive. Ancho de columna 90vw. Entity cards
y pull quotes siguen pero más compactas.

CRITERIOS:
- La lectura se siente como Pitchfork/Fader, no como Medium
- Las entity cards y pull quotes rompen el flow en el momento correcto
- Cita/fuente accesible (click footnote → scrollea a la sección sources)
- Sin anuncios ni popups de newsletter invasivos
```

---

### PROMPT C.2 — SEARCH RESULTS

```
Diseña la SEARCH RESULTS PAGE en desktop + mobile.

Search es first-class citizen en Dauton Media — no un icono escondido.

EJEMPLO: búsqueda "canserbero" con 47 resultados mezclando tipos de entidad.

LAYOUT DESKTOP:

1. SEARCH BAR (hero, full width, sticky al top):
   Input gigante centered con placeholder "Buscar artistas, releases, tracks, editorial..."
   Justo debajo: query actual con chip removable: [canserbero ×]
   Resultados count: "47 RESULTADOS"

2. FILTERS SIDEBAR (izquierda, 240px width):
   Título: "FILTRAR POR"
   
   TYPE (checkboxes):
   [✓] ARTIST (3)
   [✓] RELEASE (12)
   [✓] TRACK (24)
   [✓] ARTICLE (5)
   [ ] PERSON (1)
   [ ] CITY (1)
   [ ] LABEL (1)
   
   COUNTRY (checkboxes):
   [✓] Venezuela (45)
   [ ] Colombia (1)
   [ ] México (1)
   
   YEAR (range slider):
   2005 ─────────●────────── 2024
   
   COMPLETENESS (range slider):
   0% ──────●────────── 100%
   (Mostrar solo ≥70%)
   
   SORT BY (dropdown):
   RELEVANCE / MOST RECENT / MOST COMPLETE / ALPHABETICAL

3. RESULTS COLUMN (centro, resto del espacio):
   Cada resultado es una card horizontal con:
   - Pill de tipo entidad (color semántico correspondiente)
   - Nombre/título principal (display medium)
   - Metadata secundaria (mono)
   - Excerpt/contexto (body small)
   - Completeness bar (si aplica)
   - Pequeño thumbnail a la derecha (placeholder)
   
   Ejemplos:
   ┌───────────────────────────────────────────────────────┐
   │ [ARTIST]  CANSERBERO                          [▣]      │
   │ Tirone José González · Caracas · 2001-2015             │
   │ Rapero venezolano considerado uno de los más...        │
   │ 98% ████████████████████░                              │
   └───────────────────────────────────────────────────────┘
   ┌───────────────────────────────────────────────────────┐
   │ [RELEASE]  APOCALIPSIS                         [▣]      │
   │ Canserbero · 2012 · Album · 15 tracks                  │
   │ Considerado el álbum definitivo del rap venezolano...  │
   │ 94% ██████████████████░░                               │
   └───────────────────────────────────────────────────────┘
   ┌───────────────────────────────────────────────────────┐
   │ [ARTICLE]  EL LEGADO DE CANSERBERO 10 AÑOS DESPUÉS    │
   │ L. Figuera · 15 enero 2025 · 8 min read                │
   │ Una década después de su muerte, revisamos...          │
   └───────────────────────────────────────────────────────┘
   
   8-10 cards visibles antes del paginator.

4. PAGINATION (brutalist):
   [‹ PREV]  1 2 3 4 5 [NEXT ›]  (mono, sin rounded)

5. EMPTY STATE (si hay 0 resultados):
   Una card con layout claro:
   - Icon/typo grande diciendo "0 RESULTADOS"
   - Sugerencias: "Prueba: [canserbero]  [rap caracas]  [hip hop venezuela]"
   - CTA: "O explora el archivo por escena →"

LAYOUT MOBILE:
Filters como bottom sheet (se abre con botón "FILTER" en el header). Cards
stackean vertical. Sidebar desaparece.

CRITERIOS:
- Search bar es dominante, no secundaria
- Cada resultado tiene CONTEXTO suficiente para decidir si clickear
- Los filtros son discoverable pero no ruidosos
- Empty state no se siente como error
```

---

### PROMPT C.3 — AUTH FLOWS + USER DASHBOARD

```
Diseña DOS pantallas relacionadas en desktop + mobile:

A) AUTH FLOW (sign in + sign up)
B) USER DASHBOARD (home del usuario logged in)

---

A) AUTH FLOW

Layout split screen desktop (50/50):

IZQUIERDA (50vw): Fondo amarillo #ffce37 con tipografía brutalist negra:
- Wordmark "DAUTON MEDIA" arriba
- Headline grande:
  "ARCHIVE.
   DISCOVER.
   CONTRIBUTE."
- Subtítulo mono: "EL ARCHIVO DEL RAP HISPANOHABLANTE"
- Al fondo: "FREE · $5/MO ARCHIVE+ · $15/MO INSTITUTION"

DERECHA (50vw): Fondo #0a0a0a con el form:
- Toggle "Sign In / Sign Up" (2 tabs grandes)
- Input Email
- Input Password
- "Forgot password?" link cyan
- Botón primary amarillo "Continuar"
- Divider "O"
- Botón secondary outline "Sign in with Google"
- Botón secondary outline "Sign in with Apple"
- Footer legal sutil mono

MOBILE:
Stack vertical — amarillo arriba (30vh), form abajo (70vh).

---

B) USER DASHBOARD

LAYOUT DESKTOP:

1. NAV + SALUDO:
   "BUENAS, LUIS" (display grande)
   Subtítulo: "11 CONTRIBUCIONES · 47 FAVORITOS · ARCHIVE+ MEMBER"

2. QUICK ACTIONS (4 cards horizontales):
   - "Sugerir una corrección"
   - "Agregar un artista"
   - "Reportar data incompleta"
   - "Ver mis listas"

3. FEED PERSONALIZADO (2 columnas):
   IZQ (primary, 70%):
   "PARA TI"
   - Nuevas entradas en entidades que sigues
   - Nuevos editoriales que podrían interesarte
   - Alerts: "Apache agregó 3 nuevos tracks" / "Canserbero tiene nueva entrevista"
   
   DER (secondary, 30%):
   "TU ACTIVIDAD"
   - Contribuciones recientes con status (approved/pending/rejected)
   - Favoritos recientes
   - Listas que creaste

4. TUS LISTAS (grid):
   Cards con nombre de lista + número de items + cover stitched (4 cover arts).
   Ejemplos: "Clásicos venezolanos" / "Producción Lil Supa" / "Para escribir"

5. CONTRIBUTIONS HISTORY (tabla):
   Tabla mono con todas tus aportes.
   DATE · ENTITY · CHANGE · STATUS
   2026-04-20  Apache        Bio update        APPROVED ✓
   2026-04-18  Apocalipsis   Track 3 credits   PENDING ⏳
   2026-04-15  Canserbero    Source added      APPROVED ✓

6. ACCOUNT SETTINGS link en footer de la página

LAYOUT MOBILE:
Todo stackea. Quick actions 2x2. Feed y Activity como tabs.

CRITERIOS:
- El dashboard se siente útil, no vacío — siempre hay algo para hacer
- Las contribuciones son protagonistas (gamifica la participación sin ser cringe)
- Archive+ membership visible pero no en face
- Sin notificaciones push molestas o badges count grandes
```

---

## 🛍️ FASE D — SHOP INTEGRATION

> **Objetivo:** merch integrado al universo editorial, no e-commerce pegado.

---

### PROMPT D.1 — SHOP INDEX + DROP DETAIL PAGE

```
Diseña DOS pantallas relacionadas:

A) SHOP INDEX — home del shop con todos los drops
B) DROP DETAIL PAGE — detalle de un drop específico

Clave conceptual: NO es un e-commerce tradicional. Es una "sección del archivo"
con drops culturales conectados al contenido editorial.

---

A) SHOP INDEX

LAYOUT DESKTOP:

1. NAV + HERO DEL SHOP:
   Headline grande: "DROPS"
   Subtítulo mono: "CÁPSULAS EDITORIALES LIMITADAS · CONECTADAS AL ARCHIVO"

2. UPCOMING DROP (card grande destacada):
   Banner full-width con countdown:
   "DROP 013 · EN 48H · CÁPSULA APACHE"
   Countdown en display grande mono: "47:23:11"
   CTA: "→ Notifícame cuando lance"

3. ACTIVE DROPS (grid 3 cols):
   Cards de drops actualmente disponibles:
   - Imagen hero del drop (placeholder)
   - Badge "LIMITED · 42/120 UNITS LEFT"
   - Título drop: "DROP 012 · CANSERBERO 30 AÑOS"
   - Contenido: "T-SHIRT + VINILO + ZINE"
   - Precio: "$85 USD"
   - CTA amarillo "VER DROP"

4. ARCHIVED DROPS (strip horizontal, tratamiento más bajo contraste):
   Drops previos sold out, para contexto histórico.
   Cada card tiene overlay "SOLD OUT" en mono.

5. MEMBERSHIP CTA (section card):
   "ARCHIVE+ MEMBERS GET EARLY ACCESS TO DROPS"
   Lista de beneficios en bullets mono.
   CTA outline "Ver membresía"

6. FOOTER

---

B) DROP DETAIL PAGE

LAYOUT DESKTOP:

1. NAV + BREADCRUMB (Shop → Drop 012 — Canserbero 30 Años)

2. HERO (2 columnas 60/40):
   IZQ: Carousel de imágenes del drop (placeholders, 5 thumbs debajo).
   DER:
   - Badge "DROP 012 · LIMITED · 42/120"
   - Título "CÁPSULA CANSERBERO 30 AÑOS" (display ~72px)
   - Subtítulo mono: "EDITORIAL DROP · 10 ABRIL 2026"
   - Precio big "$85 USD"
   - Ship info mono: "SHIPS IN 2-3 WEEKS · WORLDWIDE"
   - Size selector (S/M/L/XL — pills brutalist)
   - Quantity selector
   - CTA amarillo big "AGREGAR AL CARRITO"
   - Secondary "Guardar para después"

3. CONTENIDO DEL DROP (qué incluye):
   Lista con imágenes pequeñas + descripción:
   - T-SHIRT cápsula edición limitada (diseño + quote de Canserbero)
   - VINILO 7" con track inédito
   - ZINE EDITORIAL 32 PÁGINAS — "El legado de Canserbero, 30 años"

4. STORY / CONTEXT (tratamiento editorial):
   Sección de body editorial con foto grande + texto contando la historia del
   drop. "Este drop nace en conjunto con la publicación del editorial
   [El Legado de Canserbero 10 Años Después]. Cada pieza está diseñada..."
   Links cyan al artículo editorial relacionado.

5. RELATED CONTENT (cards horizontales):
   - El editorial principal relacionado
   - Perfil de Canserbero
   - Otros drops relacionados

6. FAQ (accordion):
   SHIPPING · RETURNS · SIZING · SUSTAINABILITY

7. FOOTER

LAYOUT MOBILE:
Hero stack vertical. Carousel swipeable. CTAs sticky al bottom.

CRITERIOS:
- El drop NO se ve como producto de Shopify genérico
- La conexión con el editorial es VISIBLE, no escondida
- El precio es discreto, no gritando ofertas
- No hay "Customer Reviews ★★★★☆" — esto es cultura, no review tea
- "Sold out" no es dramático — es archivo histórico
```

---

## 🎯 DESPUÉS DE COMPLETAR LAS 4 FASES

Cuando tengas los 12 outputs aprobados:

1. **Export cada uno** como HTML bundle + PDF.
2. **Guárdalos** en `_Execution/design-iterations/[fecha]/[fase]-[prompt-name]/`
3. **Consolida** en un documento summary: qué funcionó, qué quedó mid, qué iterarías.
4. **Next step:** handoff a Claude Code para implementación, o Send to Canva para
   marketing material derivado.

---

## 🧰 TROUBLESHOOTING

### Si Claude Design se desvía del brief
Usa este reminder en el chat:
> "Volver a las reglas del design system: dark mode dominante, amarillo #ffce37
> como acento protagonista, tipografía display con carácter streetwear, cero
> decoración innecesaria, bordes afilados."

### Si salen pills redondeadas tipo iOS
> "Cambiar todos los pills/badges a bordes rectangulares o radius máximo 4px.
> Esto es brutalist editorial, no iOS."

### Si el amarillo se ve decorativo
> "El amarillo debe ser PROTAGONISTA visual. Más prominente, más grande, más
> contrastado contra el fondo. Es señalización de tráfico, no detalle."

### Si el layout se siente SaaS/genérico
> "Esto se siente demasiado como un dashboard SaaS genérico. Queremos editorial
> brutalist — headlines masivos, tipografía dominante, densidad intencional,
> cero whitespace lujoso."

### Si token budget se agota
Exporta lo que tengas, pausa, espera al reset semanal, continúa desde donde
te quedaste con un nuevo project usando el mismo design system.

---

*Documento vivo. Iteramos prompts basado en qué funciona en la práctica.*
