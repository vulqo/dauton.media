# PROMPT PARA CLAUDE COWORK — RETOMAR DAUTON MEDIA

**Cómo usar:** copia todo el bloque de abajo (entre las líneas de `---`) y pégalo en
una sesión nueva de Cowork. Asegúrate de abrir el workspace apuntando a:

`/Users/luisfiguera/Downloads/Vulqo LLC/Projects/Dauton Media/`

---

Hola, soy Luis. Estoy retomando el proyecto Dauton Media desde donde lo dejé con
otra instancia de Claude. Te pongo al día:

## Qué es Dauton Media

Media brand independiente dedicada al rap hispanohablante con foco editorial en la
escena venezolana. Plataforma digital que combina:
- Archivo de referencia (tipo Wikipedia/Discogs)
- Discovery interactivo (tipo Genius/RYM)
- Publicación editorial light (tipo Pitchfork, pero automatizada)

Evolución de Dauton Store (moda urbana, Mérida 2020) → ahora Dauton Media LLC bajo
Vulqo. Operado solo por mí + agentes automatizados (no empleados).

## Decisiones estratégicas ya tomadas

- **Launch target:** 6 meses (oct 2026)
- **MVP scope:** archivo público + cuentas de usuario (favoritos, contribuciones)
- **Estructura empresarial:** hybrid — cashflow-backed con optionality para levantar
  capital eventualmente. Delaware LLC separada de Vulqo (a formar ~2 meses antes del
  launch, no ahora). Detalles en `_Reference/company-structure-notes.md`.
- **Worldwide desde día 1** en términos de contenido/audiencia, pero monetización en
  v1 solo vía donaciones (Ko-fi). Pasarelas de pago complejas y freemium llegan en v2.
- **No hosteamos lyrics ni audio propio** — todo linkeado a plataformas externas
  (Spotify, Genius, YouTube).

## Estado actual del build

### Estructura del folder del proyecto

```
/Users/luisfiguera/Downloads/Vulqo LLC/Projects/Dauton Media/
├── 00-Executive/       # vision, strategy, okrs
├── 01-Product/         # prd, roadmap, mvp-scope
├── 02-Engineering/
│   ├── architecture.md
│   ├── data-model.md   # 17 entidades, 9 en MVP
│   ├── stack.md
│   ├── api-strategy.md
│   └── website/        # ← Next.js app (código real)
├── 03-Design/          # brand, design-system, ux-principles
├── 04-Editorial/       # editorial-policy, style-guide, taxonomy
├── 05-Data/            # source-catalog, ingestion-pipelines
├── 06-Operations/      # admin-ops, moderation
├── 07-Marketing-Growth/ # seo, launch, community
├── 08-Legal-Compliance/ # privacy, ip-fair-use, terms
├── 09-Business/        # monetization, financial-model
├── _Execution/         # prompt-pack, claude-design-setup
└── _Reference/         # docs archivados post-MVP
```

### Tech stack ya desplegado

- **Repo:** GitHub `vulqo/dauton.media`
- **Deploy:** Vercel proyecto `dauton-media` (vulqollc team)
  - URL: https://dauton-media.vercel.app
  - Root directory: `02-Engineering/website`
  - Auto-deploy desde `main`
- **Backend:** Supabase (cuenta de Vulqo, NO SHO Companies — esto es importante, no
  mezclar con la org de SHO)
- **Env vars ya configuradas en Vercel:** `NEXT_PUBLIC_SUPABASE_URL`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`
- **Frontend:** Next.js con varias pantallas ya migradas desde Claude Design
  (homepage, artist, release, etc.)

### Las 9 entidades MVP

Person, Crew, Label, Release, Track, City, Event, Article, Source. Ver
`02-Engineering/data-model.md` para schema completo.

## Lo que necesito de ti AHORA

Trabaja con máxima autonomía. Puedes usar terminal, leer/escribir archivos,
ejecutar código, conectarte a Supabase, desplegar a Vercel, hacer commits a git.
Te doy full access. Si necesitas algo confirma primero pero luego ejecuta sin
pedir permiso cada 3 mensajes.

**Prioridad P0 a validar primero:**

1. Verifica a qué proyecto de Supabase apunta el `NEXT_PUBLIC_SUPABASE_URL` en
   Vercel. Debería ser un proyecto en la org de Vulqo llamado algo como
   `dauton-media` o similar.
2. Si no existe proyecto Supabase dedicado todavía, créalo (región us-east-1 o
   us-east-2, plan Free inicial).
3. Reporta qué hay en ese proyecto: tablas, migraciones, RLS policies.

**Después validamos el siguiente paso juntos:**

Probablemente sea crear el schema de las 9 entidades MVP si está vacío, o revisar
lo que ya hay si Claude Code avanzó con algo.

## Archivos clave para leer si necesitas contexto

- `README.md` (raíz) — overview del proyecto
- `01-Product/mvp-scope.md` — alcance exacto del MVP
- `02-Engineering/data-model.md` — entidades y relaciones
- `02-Engineering/stack.md` — decisiones de tech
- `_Execution/prompt-pack/README.md` — los 12 prompts que usé con Claude Design
- `_Reference/company-structure-notes.md` — decisiones de empresa para post-MVP

## Reglas de trabajo

- Directo, sin preámbulos largos
- Corrección inmediata si algo está mal, no reformulo suavemente
- Push back si crees que voy en mala dirección
- Evita sobreingeniería — el MVP es archivo + usuarios, no más
- No mezcles con mis otras empresas (SHO Companies, Vulqo LLC, Hashery, Focus V)

Arranca por la Prioridad P0. Cuando termines reportas qué encontraste y decidimos
el siguiente paso.
