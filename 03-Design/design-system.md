# Design System

**Department:** Design
**Owner:** Luis Figuera
**Last updated:** April 22, 2026
**Status:** Draft

---

## Purpose

The design system is the set of tokens, components, and patterns that define how Culture Wiki looks and behaves. It's the bridge between brand intent (see `brand.md`) and shipped UI. One source of truth, consumed by the frontend codebase.

**Implementation:** Tailwind CSS config + shadcn/ui components customized to match tokens. No separate Figma source of truth in MVP — the code is the spec.

---

## Design tokens

### Color tokens

```
--color-bg                — primary page background (near-black)
--color-bg-raised         — card backgrounds, hover states
--color-bg-muted          — dividers, inactive states
--color-text-primary      — body text on dark bg
--color-text-secondary    — supporting text
--color-text-muted        — metadata, timestamps, sources
--color-accent            — brand accent (single color, restrained)
--color-accent-muted      — hover states of accent
--color-success           — verified, claimed, approved
--color-warning           — pending review, incomplete
--color-destructive       — errors, deletion, disputes
--color-border            — default borders
--color-border-strong     — emphasized borders, focus rings
```

Actual hex values are defined when brand palette is finalized. Tokens are referenced, not hardcoded, in components.

### Typography tokens

```
--font-serif        — for headings, editorial prose
--font-sans         — for UI, body text, forms
--font-mono         — for timestamps, IDs, URLs, data tables

--text-xs           — 12px
--text-sm           — 14px
--text-base         — 16px (body default)
--text-lg           — 18px
--text-xl           — 20px
--text-2xl          — 24px
--text-3xl          — 30px
--text-4xl          — 36px
--text-5xl          — 48px (hero only)

--leading-tight     — 1.2  (headings)
--leading-snug      — 1.4  (subheadings)
--leading-normal    — 1.5  (UI)
--leading-relaxed   — 1.7  (body reading)
```

### Spacing tokens

Stick to Tailwind's default 4px-based spacing scale. No custom values unless a specific design pattern requires it.

### Radii

```
--radius-sm         — 4px   (badges, small controls)
--radius-md         — 8px   (buttons, inputs, cards)
--radius-lg         — 12px  (larger cards, modals)
--radius-full       — 9999px (circular — avatars only)
```

### Shadows

Kept restrained. A dark UI doesn't need heavy shadows.

```
--shadow-sm         — subtle card elevation
--shadow-md         — hover elevation
--shadow-lg         — modal, popover
```

---

## Component library

Built on shadcn/ui primitives, customized to match brand tokens. We own the component code — not a library dependency.

### Core primitives (shadcn-provided, customized)

- Button (variants: primary, secondary, ghost, destructive, link)
- Input, Textarea, Select, Combobox
- Checkbox, Radio, Switch
- Dialog, Drawer, Popover, Tooltip
- Tabs, Accordion, Collapsible
- Table (with sort, filter primitives)
- Toast (for action feedback)
- Skeleton (for loading states)
- Badge, Avatar

### Project-specific components

Built once, used everywhere. Each has its own file in `/components/app/`.

#### Entity components

- `<EntityLink>` — smart link to any entity. Accepts `type` and `slug` or `id`. Resolves to correct URL, renders name with optional preview card on hover.
- `<EntityHero>` — hero section for entity pages (photo, name, roles, origin, quick facts). Accepts any entity type.
- `<EntitySection>` — conditional wrapper for profile sections. Renders only if `data` is present.
- `<SourceBadge>` — small "source" chip, click to open source detail.
- `<CompletenessMeter>` — circular or bar indicator of entity completeness.
- `<VerifiedBadge>` — indicator for artist-claimed profiles.

#### Graph / visualization components

- `<CollaboratorNetwork>` — force-directed graph, React Flow. Configurable depth.
- `<Timeline>` — horizontal or vertical timeline of events.
- `<DiscographyTimeline>` — specialized timeline for releases with covers.
- `<LabelJourney>` — visualization of label eras over time.
- `<MapView>` — MapLibre-based map for geographic views.
- `<CompareTable>` — side-by-side comparison of 2-4 entities.
- `<StatCard>` — single metric with label and context.

#### Content components

- `<Prose>` — styled wrapper for editorial text. Auto-parses entity mentions into `<EntityLink>`s.
- `<QuotedPassage>` — formatted quote with attribution.
- `<PressMentionCard>` — press mention preview with outlet logo.
- `<CareerEventItem>` — timeline entry with date, title, sources.

#### Admin components

- `<EntityEditor>` — polymorphic form for editing any entity type.
- `<SourceAttacher>` — search + attach sources to any fact.
- `<ReviewQueue>` — moderation queue interface.
- `<IngestionPanel>` — trigger and monitor ingestion workflows.

---

## Layout patterns

### Entity page layout

```
┌─────────────────────────────────────────────────────────┐
│                     Site header                          │
├─────────────────────────────────────────────────────────┤
│                                                         │
│             <EntityHero /> (full-width)                 │
│                                                         │
├───────────────────────────┬─────────────────────────────┤
│                           │                             │
│                           │    Quick facts              │
│    Main content           │    Completeness             │
│    (entity sections       │    Claimed by               │
│     rendered              │    Key relationships        │
│     conditionally)        │    External links           │
│                           │                             │
│                           │                             │
├───────────────────────────┴─────────────────────────────┤
│                     Sources section                      │
├─────────────────────────────────────────────────────────┤
│                       Footer                            │
└─────────────────────────────────────────────────────────┘
```

On mobile, sidebar collapses under main content.

### Directory page layout

- Filter sidebar (sticky on desktop, drawer on mobile).
- Grid of entity cards (responsive: 1/2/3/4 columns).
- Pagination or infinite scroll (infinite for directories under 1000 items, paginated above).

### Editorial article layout

- Single column, reading-optimized width (~72ch).
- Large typography.
- Sidebar for related entities (desktop only).
- End-of-article suggestions: more articles, related entities.

---

## Interaction patterns

### Hover previews for entity links

When hovering an `<EntityLink>`, after 300ms, show a compact preview card with:
- Photo (if applicable)
- Stage name + role
- 1-line bio
- Completeness indicator

On mobile, no hover — tap navigates directly.

### Loading states

Every data-bound component has a `Skeleton` loading state with similar shape to the loaded state. No generic spinners.

### Empty states

Every list/section has a designed empty state with:
- Short explanation of why it's empty.
- Action if applicable ("Suggest a source," "Browse related").

### Error states

- Network errors: toast with retry.
- Not found: dedicated page with search, suggestions.
- Permission denied: redirect to login with return URL.

---

## Responsive strategy

**Breakpoints** (Tailwind defaults):
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Mobile-first by default.** All components designed mobile-first, enhanced for wider viewports. Graphs have mobile fallback views (lists instead of graphs on small screens).

**Test matrix:**
- iPhone 13 / iOS Safari
- Pixel 7 / Chrome Android
- iPad
- 1366x768 Windows laptop (still common)
- 1920x1080 desktop
- 2560x1440 desktop (most common designer resolution — don't over-optimize only for this)

---

## Accessibility

Target: **WCAG 2.1 AA** at minimum, AAA where reasonable.

- All interactive elements keyboard accessible.
- Focus states visible and strong.
- Color contrast meets 4.5:1 for body text, 3:1 for large text.
- ARIA labels on icon-only buttons.
- Alt text on every image (generated from entity context when applicable).
- Skip links for keyboard users.
- No auto-playing audio or video.
- Respect `prefers-reduced-motion`.
- Semantic HTML always.

Audit on each major release with axe DevTools, Lighthouse, and manual keyboard navigation.

---

## Motion

Used sparingly. Every motion must have purpose.

**Use motion for:**
- Revealing sections on scroll (subtle).
- Transitions between states (page-to-page, hover previews appearing).
- Confirming user actions (subtle checkmark animation).

**Avoid motion for:**
- Decoration.
- Drawing attention without purpose.
- Long or fancy animations on first page load.

**Durations:**
- Micro-interactions: 150-200ms.
- Section transitions: 300-400ms.
- Never above 500ms.

**Easing:**
- Default: `ease-out` (deceleration feels natural).
- Bounces and overshoots: avoid.

---

## Iconography

- **Lucide Icons** (shadcn default). Consistent, open-source, comprehensive.
- 1-weight stroke icons. No mixed icon sets.
- Sized at 16/20/24px depending on context.
- Never use emojis as icons in UI (only potentially in editorial content).

---

## Versioning

This design system is versioned alongside the code. Breaking changes:
- Color palette overhaul.
- Typography scale change.
- Component API change.

Minor changes:
- New component.
- New variant.
- Bugfix.

Changelog lives at the bottom of this document once we're shipping:

## Changelog

- 2026-04-22: Initial design system draft.

---

*See also: [`brand.md`](./brand.md), [`ux-principles.md`](./ux-principles.md)*
