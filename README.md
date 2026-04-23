# Culture Wiki

**Status:** Pre-launch / Planning
**Owner:** Luis Figuera (Vulqo LLC)
**Last updated:** April 22, 2026

---

## What this is

Culture Wiki is a digital archive, discovery platform, and editorial outlet documenting Spanish-language rap music, with editorial focus on Venezuelan hip-hop culture.

It combines three layers into a single experience:

1. **Reference archive** — structured, citable data about every artist, producer, label, release, and event in the scene (Wikipedia / Discogs quality).
2. **Discovery platform** — interactive exploration of the graph that connects the scene (Genius / RYM quality).
3. **Editorial publication** — long-form writing, interviews, analyses, and historical context (Pitchfork / Remezcla quality).

The product is independent, not tied to any single source, podcast, label, or media partner.

---

## Documentation structure

This repository is organized by department, mirroring how a serious media/tech company operates. Each department owns a set of documents relevant to their scope. Documents cross-reference each other rather than duplicating information.

| Department | Scope | Key docs |
|---|---|---|
| **[00-Executive](./00-Executive/)** | Vision, strategy, company-level OKRs | `vision.md`, `strategy.md`, `okrs.md` |
| **[01-Product](./01-Product/)** | Product definition, roadmap, feature specs | `prd.md`, `roadmap.md`, `mvp-scope.md` |
| **[02-Engineering](./02-Engineering/)** | Architecture, data model, tech stack | `architecture.md`, `data-model.md`, `stack.md`, `api-strategy.md` |
| **[03-Design](./03-Design/)** | Brand, visual language, UX principles | `brand.md`, `design-system.md`, `ux-principles.md` |
| **[04-Editorial](./04-Editorial/)** | Content strategy, style guide, taxonomy | `editorial-policy.md`, `style-guide.md`, `taxonomy.md` |
| **[05-Data](./05-Data/)** | Source catalog, enrichment pipelines, QA | `source-catalog.md`, `ingestion-pipelines.md`, `data-qa.md` |
| **[06-Operations](./06-Operations/)** | Processes, tooling, admin workflows | `admin-operations.md`, `moderation-workflow.md` |
| **[07-Marketing-Growth](./07-Marketing-Growth/)** | SEO, launch plan, community | `seo-strategy.md`, `launch-plan.md`, `community.md` |
| **[08-Legal-Compliance](./08-Legal-Compliance/)** | Privacy, IP, terms of service | `privacy-policy-draft.md`, `ip-and-fair-use.md`, `terms-draft.md` |
| **[09-Business](./09-Business/)** | Monetization, partnerships, financial model | `monetization.md`, `financial-model.md`, `partnerships.md` |

---

## How to use this

- **Read `00-Executive/vision.md` first** if you're new to the project.
- **Read `01-Product/prd.md`** for the product definition.
- **Read `02-Engineering/data-model.md`** for the technical foundation.
- Everything else is reference material for the specific domain.

All documents are living. Updates happen as decisions get made, validated, or changed.

---

## Open decisions (pending)

These decisions are unresolved and blocking nothing critical yet, but should be made before Sprint 2:

- [ ] **Project name** — "Culture Wiki" is a working title. Final brand name pending.
- [ ] **Domain** — depends on name.
- [ ] **Scope model** — default assumption: Venezuelan-first fully cataloged in MVP, then expand to pan-Hispanic. Validate in `01-Product/mvp-scope.md`.
- [ ] **Genre breadth** — default assumption: urban music broad (rap, trap, drill, adjacent), reggaetón only when it intersects with hip-hop. Validate in `04-Editorial/taxonomy.md`.
- [ ] **Editorial from MVP?** — default assumption: archive first, editorial in Phase 2. Validate in `04-Editorial/editorial-policy.md`.

---

## Principles (non-negotiable)

1. **Every fact has a source.** No source, no publish.
2. **Independence.** No single source owns this project.
3. **Data as graph, not catalog.** Everything connects to everything.
4. **Scale by design.** One template per entity type. Thousands of entries, zero custom pages.
5. **Editorial neutrality.** We document the scene. We don't take sides.
6. **Open correction.** Errors get fixed fast, publicly.
