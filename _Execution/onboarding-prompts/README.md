# Onboarding prompts

**Propósito:** prompts iniciales que Luis pega al abrir cada chat Cowork departamental. Cada prompt indica al agent: quién es, qué archivos leer, cómo coordinar con los demás, qué outputs entregar.

**Cómo usarlos:** abrís un nuevo chat Cowork con el mismo workspace (`/Users/luisfiguera/Downloads/Vulqo LLC/Projects/Dauton Media`), pegás el contenido del prompt correspondiente, y el chat arranca con contexto completo.

## Los prompts

| # | Departamento | Archivo | Prioridad para abrir |
|---|---|---|---|
| 1 | Product Architecture | `01-product-architecture.md` | **PRIMERO** — cierra la visión |
| 2 | Engineering | `02-engineering.md` | En paralelo post-Product Architecture |
| 3 | Data & SEO | `03-data-seo.md` | En paralelo post-Product Architecture |
| 4 | Business & Legal | `04-business-legal.md` | En paralelo post-Product Architecture |
| 5 | Community & Outreach | `05-community-outreach.md` | En paralelo post-Product Architecture |

**Strategy/PM** (chat actual) es el orquestador — no tiene onboarding prompt (es el chat principal donde vive Luis + Cowork mente maestra).

## Orden recomendado de apertura

1. **Product Architecture primero.** Define visión, personas, scope, priorización de features. Sin esto los demás trabajan a ciegas.
2. Después de que Product Architecture cierre su primer output, los 4 restantes arrancan en paralelo.
3. Strategy/PM coordina todo.

## Cuando abras un chat

1. Copiar contenido del prompt correspondiente.
2. Pegarlo al agent (chat Cowork nuevo).
3. El agent lee sus archivos de contexto, confirma que entendió, pregunta si algo, y arranca.
4. Cuando cierra trabajo, postea outcome en `COORDINATION.md` y/o `TASKS.md`.
5. Strategy/PM consolida diariamente.
