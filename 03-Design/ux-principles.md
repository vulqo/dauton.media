# UX Principles

**Department:** Design
**Owner:** Luis Figuera
**Last updated:** April 22, 2026

---

## Core principles

These are the decisions we make by default when a design question arises. When in doubt, follow these.

### 1. Navigation is the product
The graph is the value. Every page must make it easy to leave and land somewhere better. Names are links. Images are links. Relationships are links. If a user can't click from an artist profile into a producer, a label, a collaborator, and a scene, we've failed.

### 2. Depth earns attention, not chrome
We don't compete on slick animations or design-forward aesthetics. We compete on the density and quality of what's behind each page. UX stays out of the way so the information can shine.

### 3. Progressive disclosure by default
A profile with partial data is still valuable. Never hide sections that have something — always hide sections that have nothing. Never fake content to fill a template.

### 4. Source visibility is a feature
Sources are not hidden in footnotes. They appear next to claims. Users should feel the rigor of the archive on every page. This is also a trust-building UX pattern — it signals seriousness.

### 5. Mobile is the first audience
Most discovery happens on mobile (Google search, social shares, messenger). Mobile layouts must be excellent — not tolerable.

### 6. Speed is respect
A fast site respects the user's time and signals competence. ISR + edge caching + small client bundles. A 2-second page load is a failure.

### 7. Empty states teach
Instead of apologizing for emptiness, tell the user what goes there, why it might be empty, and what they can do.

### 8. Corrections are welcome, not controversial
The "suggest correction" action should be visible but not in-your-face. Making it easy signals humility. Errors are inevitable; what matters is how fast we fix them.

### 9. Admin is a first-class user
Luis and future editors spend hours in the admin. Admin UX gets as much care as public UX. Keyboard shortcuts, bulk actions, powerful search.

### 10. Respect the subject
Every entity is a real person or institution. UI copy, placement, and emphasis should honor that. No design decisions that mock, sensationalize, or diminish.

---

## Information hierarchy patterns

### On any entity page, the hierarchy is:

1. **Who/what is this?** (hero — name, identity, one-line positioning)
2. **Why should I care?** (quick facts — the context signals: origin, active since, notable for)
3. **What's the story?** (bio — if present)
4. **What have they done?** (discography, major works)
5. **Who are they connected to?** (collaborators, crew, label history)
6. **How have others talked about them?** (press, career events)
7. **Where can I learn more?** (sources, external links)

This ordering is true whether it's an artist, label, producer, or crew. Adjust vocabulary, keep structure.

---

## Patterns we use

### The entity card
Reusable building block for directories, search results, related sections, list items. Always includes: photo (or initial), name, role, origin, one-line context. Never includes more than 4 pieces of data.

### The conditional section
Profile sections render only if data present. Each section has a consistent header ("Discografía," "Colaboradores," "Prensa"). Clear visual boundary between sections.

### The pill
Small metadata chip used for genres, tags, roles, crew memberships. Always clickable — leads to filtered view of related entities.

### The cross-link
Any name of a known entity in body text is underlined subtly (dotted or light style) and becomes a full link on hover. Distinguishable from regular body text but not distracting.

### The source citation
Small superscript or inline badge next to a claim. Click opens source detail modal with URL, date, outlet, and archive link.

### The completeness meter
Visible but not intrusive. Shows as a small circle or bar near the entity name. Tooltip explains what would fill it.

---

## Patterns we avoid

### The feed
No infinite-scrolling feed of updates. We are archive-shaped, not feed-shaped.

### The modal trap
Minimize modals. Prefer inline expansion or dedicated pages. Only use modals for destructive confirmations or focused tasks (correction submission).

### The auto-playing anything
No auto-playing audio, video, carousels, or animations.

### The hamburger menu on desktop
Desktop has enough space for explicit navigation. Mobile hamburger is fine.

### The generic "Loading..."
Use skeleton states that mirror the loaded layout. The user should see where things will appear before they appear.

### The dark pattern
No "are you sure you want to cancel your subscription?" guilt trips. No "500 people are viewing this" manipulation. No false urgency.

---

## Critical flows (UX specs)

### Discovery flow (landing from Google)

Goal: user finds what they searched, clicks around, stays.

- Entity page loads in <1s.
- Hero instantly answers "who is this."
- Within 3 seconds of page load, user can see: photo, name, origin, role, a list of releases or events.
- Scroll reveals more depth.
- At least 10 clickable entities visible on the first screen after hero.

### Correction flow

Goal: user who notices an error can report it fast.

- "Suggest correction" button visible on every entity page (bottom-right corner, subtle).
- Click opens a focused form (not full modal — side panel on desktop, drawer on mobile).
- Form auto-fills current value of the selected field.
- User enters new value and reason, optionally a source URL.
- Submit → toast confirmation + email confirmation.
- 3 total clicks from noticing error to submission.

### Registration flow

Goal: passive browser → authenticated user → engaged user.

- No hard gates. Everything is browsable without account.
- Account prompts only appear when user tries: favoriting, creating a list, subscribing to updates on an entity.
- Registration form minimal: email + password or OAuth. No captchas unless abuse detected.
- Post-registration: welcome email + immediate action on whatever triggered the prompt.

### Admin ingestion flow

Goal: editor can seed a new artist in <2 minutes.

- Admin → "Add artist."
- Search bar with Spotify integration — type name, pick from Spotify results, confirm.
- Supabase creates pending record.
- Background pipeline runs.
- Editor gets notification when ready.
- One-click promote from staging to live.

---

## Specific design challenges

### Challenge 1: How to show an artist who is also a producer

Solution: tabs or dual-sections within the same profile. "As artist" and "As producer" views. Same identity, different perspectives on the graph.

### Challenge 2: How to show relationships without overwhelming

Solution: visualize only the top-N relationships by weight (number of collaborations, duration, etc.). Full relationship list behind a "See all" action.

### Challenge 3: How to indicate data confidence

Solution: three tiers displayed subtly:
- **Verified** — green check. Multiple independent sources or artist-claimed.
- **Sourced** — no indicator (default). Has ≥1 source.
- **Unverified** — amber question mark. Inherited from early ingestion, not yet sourced.

### Challenge 4: How to surface the graph without a dedicated "graph view"

Solution: small network teasers on each profile (6-8 nodes, the closest collaborators). Clicking expands to full interactive graph. Full graph exists but isn't the primary navigation.

### Challenge 5: How to handle disputed information

Solution: if a fact is disputed (two sources disagree), show both with attribution. "According to [Source A]… According to [Source B]…" Never pick one silently.

---

## Content-first reminders

- Before designing a page, ask: what's the content?
- Before designing a component, ask: does a simpler existing one work?
- Before adding a feature, ask: does it serve the core loop?
- Before polishing, ask: does the rough version already work?

---

*See also: [`brand.md`](./brand.md), [`design-system.md`](./design-system.md), [`01-Product/prd.md`](../01-Product/prd.md)*
