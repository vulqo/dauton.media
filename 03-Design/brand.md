# Brand

**Department:** Design
**Owner:** Luis Figuera
**Last updated:** April 22, 2026
**Status:** Draft — pending naming decision

---

## Brand positioning

**Culture Wiki is the serious archive for Spanish-language hip-hop.**

Three words do the heavy lifting:

- **Serious** — not a fan blog, not a meme page, not a listicle site. Credible.
- **Archive** — permanence, depth, reference. Not news, not trends.
- **Spanish-language hip-hop** — specific audience, specific culture, specific voice.

We want to feel closer to *The Criterion Collection*, *The Marginalian*, *ESPN's The Undefeated*, *Rate Your Music*, and *Pitchfork's Best Of lists* — than to Genius, HotNewHipHop, or typical urban blogs.

## Name (pending decision)

"Culture Wiki" is a working title. Candidates to evaluate:

| Name | Pros | Cons |
|---|---|---|
| Culture Wiki | Descriptive, English friendly | Generic, not culturally specific |
| La Fuente | "The Source" — double meaning (water, source of truth), evocative | Common term, SEO fight |
| La Plaza | Evokes public square where hip-hop was born in barrios | Geographic ambiguity |
| Archivo | Direct, serious, single-word weight | Common, SEO fight |
| Cuaderno | "Notebook" — humble, writerly, intimate | Too soft? |
| El Catálogo | Professional, reference-feeling | Generic |
| La Hemeroteca | Archive of printed press; evocative for old-school fans | Obscure to younger audience |
| Muralla | Wall — graffiti heritage, strength, permanence | Heavy |
| Rima | Rhyme — direct hip-hop term | Too narrow (excludes trap/other urban) |
| La Liga | The League — unity, competition | Gaming/sports connotation |

**Recommended path:** a short Spanish-language name with English-friendly pronunciation. Final decision by end of Week 1.

## Tagline options

Draft set to evaluate once name is settled:

- "El archivo del rap en español."
- "Donde vive la historia del rap."
- "Todo el rap. Un solo lugar."
- "La memoria de la cultura."

## Tone of voice

### We sound like

- A **knowledgeable older sibling** who has been in the scene for 15 years and respects it, not a hype man.
- An **academic who still listens** — rigorous but not pretentious.
- A **peer**, not an authority to be feared. We care what the scene thinks.
- **Bilingual-capable** but primarily Spanish. When we use English, it's because the word is better (tiene sentido, not performative).

### We don't sound like

- A blog chasing clicks.
- A magazine writer trying to prove they're in the know.
- A corporate voice pretending to be cool.
- An algorithm trying to be a human.
- A fan who has lost perspective.

### Voice principles

- **Declarative over hedged.** "Apache firmó con…" not "Parece que Apache firmó con…"
- **Sourced over speculative.** "Según Rolling Stone…" beats "dicen que…"
- **Specific over general.** "el 3 de marzo de 2018" beats "hace unos años."
- **Concrete over abstract.** "grabó en el Studio 5 de Caracas" beats "grabó en un estudio importante."
- **Respectful of the subject.** We never mock, sensationalize, or condescend.
- **Neutral on disputes.** "Hubo un desacuerdo público" beats "se pelearon feo."

## Visual direction

### Mood

- **Archive over magazine.** Think library stacks, contact sheets, record liner notes — not glossy covers.
- **Confident minimalism.** Strong typography, lots of white space, purposeful image use.
- **Graph-aware.** The visual identity should embrace network/graph metaphors subtly.
- **Venezuelan without being flag-waving.** Nuanced cultural signals, not tourist-board clichés.

### Not this

- Gradients that scream Web3/crypto.
- Neon and graffiti-as-decoration (we respect the culture, we don't costume it).
- Stock photos of hands holding microphones.
- Generic "urban" design tropes.

### Color (draft palette — to validate in design-system.md)

**Primary:**
- Deep black or near-black background (not pure `#000` — something like `#0D0D0F` with slight warmth).
- Off-white text (`#F4F1EA` — archive paper feel).

**Accent (venezolano sin ser bandera):**
- One restrained accent color. Candidates: deep mustard, oxidized copper, moss green, muted cobalt. Not red/yellow/blue primary.

**Semantic:**
- Success: muted green.
- Warning/pending: muted amber.
- Destructive: muted burgundy (not bright red).

**Principle:** the palette should work as printed on newsprint. If it only looks good on a screen, it's too digital.

### Typography

**Candidates to test:**

**Serif (for headings and editorial):**
- Söhne Breit — if budget allows.
- GT Sectra — distinctive serif with editorial gravitas.
- Spectral — Google Fonts, archival feel, free.
- Playfair Display — free but overused.
- Recommended starting point: **Spectral** (free, high quality) with upgrade path to GT Sectra if we want premium.

**Sans (for UI and body):**
- Inter — safe, universal, free.
- Söhne — premium, beautiful.
- Recommended starting point: **Inter**.

**Mono (for timestamps, IDs, source URLs):**
- JetBrains Mono or IBM Plex Mono. Both free.

### Layout principles

- **Single-column reading width for editorial content.** ~65-75ch.
- **Two-column grid for entity pages.** Main content + context sidebar.
- **Dense data tables.** When we show comparative tables, they should look like reference material — thin borders, tight spacing, monospace for numerical columns.
- **Images with captions and credits.** Every image has attribution, always.

### Logo direction

To be designed. Constraints:

- Works in favicon, OG image, print.
- Monochromatic primary version.
- Optional color variant.
- No illustrations of microphones, headphones, or hands.
- Wordmark-first preferred. If symbol, must be geometric and distinctive.

## Brand assets inventory (to produce)

- [ ] Logo (primary, monochrome, icon, favicon variants)
- [ ] Typography specimens
- [ ] Color palette with tokens
- [ ] Component library (via shadcn/ui customization)
- [ ] OG image template (dynamic generation)
- [ ] Email templates (Resend, React Email)
- [ ] Social profile pictures and banners
- [ ] Document templates (internal, for press pitches)
- [ ] Press kit page
- [ ] 404 / empty states / error pages

## Naming conventions (internal)

These names structure how the team talks about the product internally:

- **Entity** — a node in the graph (artist, release, label, etc.)
- **Profile** — an entity's page.
- **Spotlight** — a pillar-curated artist profile at >90% completeness.
- **Layer** — the 8 data layers of an artist profile.
- **Edge / connection / relationship** — any typed link between two entities.
- **Seed** — the initial set of artists for a new market.
- **Feature** — a collaboration on a track (to avoid confusing with product features: when product features are ambiguous, we say "product feature").
- **The graph** — always lowercase. Never "The Graph" (that's a web3 product).

---

*See also: [`design-system.md`](./design-system.md), [`ux-principles.md`](./ux-principles.md), [`04-Editorial/style-guide.md`](../04-Editorial/style-guide.md)*
