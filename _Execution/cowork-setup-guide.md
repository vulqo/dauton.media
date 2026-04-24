# SETUP GUIDE — MIGRAR DAUTON MEDIA A CLAUDE COWORK

**Tiempo estimado:** 5 minutos

---

## Pre-requisitos

- Claude Desktop app instalada (macOS)
- Plan Claude Max (ya lo tienes)
- Los archivos `CLAUDE.md` y `MEMORY.md` ya están pre-poblados en la raíz del
  folder (yo los dejé listos)

---

## Pasos exactos

### 1. Abrir Claude Desktop → Cowork

- Abre Claude Desktop
- En el sidebar izquierdo, click en la tab **Cowork** (no Chat)

### 2. Verificar configuración de Cowork

Antes de crear el proyecto, confirma settings:

- Settings → **Capabilities**
  - ✅ Enable both memory features
  - ✅ Tool access: "Load tools when needed"
  - ✅ Enable all connectors relevantes (Supabase, Vercel, GitHub, n8n)

### 3. Crear el proyecto

- En Cowork, click **Projects** en el sidebar
- Click **+ New project** (arriba a la derecha)
- Selecciona **Use existing folder**
- Navega a:
  `/Users/luisfiguera/Downloads/Vulqo LLC/Projects/Dauton Media/`
- Nombra el proyecto: **Dauton Media**

### 4. Configurar el proyecto

En la pantalla de setup:

**Instructions:** déjalo vacío o escribe algo corto como
"Read CLAUDE.md first, always." Todo lo importante ya está en los archivos.

**Context:** el folder local ya está conectado automáticamente. Opcional: si
tienes un chat project relacionado en Claude.ai, puedes linkearlo también.

**Scheduled tasks:** déjalo vacío por ahora. Esto se agrega después cuando
tengamos workflows recurrentes (ej: SEO monitoring semanal).

Click **Create**.

### 5. Primera sesión — el comando crítico

Al abrir el proyecto recién creado, escribe exactamente esto como primer mensaje:

```
He creado este Cowork Project. Lee CLAUDE.md y MEMORY.md de la raíz y todos los
archivos que estos mencionen como relevantes. Después dame un resumen breve de:
(1) qué sabes sobre el proyecto, (2) qué instrucciones vas a seguir, (3) cuál es
el P0 actual y cómo propones abordarlo. Si algo es ambiguo usa ask_user_input.
```

Esto hace 3 cosas:
- Fuerza a Cowork a hacer el onboarding completo
- Verifica que entendió el contexto antes de ejecutar algo
- Establece el patrón de trabajo (leer contexto → plan → ejecutar)

### 6. Segunda sesión en adelante

Los mensajes siguientes pueden ser directos:
- "Verifica a qué Supabase apunta el Vercel"
- "Crea el schema de las 9 entidades"
- "Mejora esta pantalla de artista agregando X"

Cowork ya tiene memoria del proyecto, no tienes que re-explicar contexto.

---

## Qué hace cada archivo que dejé pre-poblado

### `CLAUDE.md` (raíz del folder)

Instrucciones cortas que Cowork lee al inicio de cada sesión. Le dice:
- Cómo operar (máxima autonomía, sin pedir permiso cada vez)
- Qué archivos leer para onboarding
- Reglas de trabajo
- P0 actual

### `MEMORY.md` (raíz del folder)

Estado vivo del proyecto. Incluye:
- Identidad y posicionamiento
- Decisiones estratégicas activas
- Stack e infraestructura actual
- Las 9 entidades MVP
- Prioridades P0-P3
- Criterios de éxito
- Preferencias de Luis
- Qué NO hacer
- Historial de decisiones

**Importante:** Cowork puede editar este archivo cuando le dices "recuerda esto"
o "codifica este principio". Es colaborativo entre tú y Claude.

---

## Conectores que probablemente quieres tener activos

Desde la investigación de tu contexto, estos son los que te sirven para Dauton
Media (ya tienes la mayoría conectados):

- ✅ **Supabase** (crítico — verifica que la cuenta sea Vulqo, no SHO)
- ✅ **Vercel**
- ✅ **GitHub** (via Claude Code)
- ✅ **n8n** (para el motor de contenido)
- ✅ **Ahrefs** (para SEO monitoring)
- Opcional: Slack (si vas a recibir alerts), Gmail (si envías newsletter)

**Importante sobre Supabase:** tu MCP actual está conectado a `bot@shocompanies.com`
que solo ve la org de SHO. Para Dauton Media necesitas que Cowork use una
instancia de Supabase conectada a tu cuenta de Vulqo. Esto se configura en:

`Settings → Connectors → Supabase → agregar/reemplazar con cuenta de Vulqo`

---

## Primer comando útil para Cowork (post-onboarding)

Una vez Cowork te haya confirmado que leyó todo, puedes pedirle:

```
Ejecuta la P0: verifica a qué proyecto de Supabase apunta el Vercel, dime qué
tablas tiene, si necesitamos crear proyecto nuevo en la org de Vulqo, y prepara
un plan concreto para avanzar con el schema de las 9 entidades MVP.
```

---

## Si algo falla

- **Cowork no ve el folder:** cierra y reabre Claude Desktop. Reconecta el
  folder desde Settings → Cowork → Folder access.
- **MEMORY.md no se actualiza solo:** pídele explícitamente "actualiza MEMORY.md
  con esta nueva decisión".
- **Pierde contexto entre sesiones:** verifica que memory esté enabled en
  Settings → Capabilities.
- **No carga connectors:** Settings → Connectors → verifica que estén activos y
  autenticados con las cuentas correctas.

---

*Actualizado: April 23, 2026*
