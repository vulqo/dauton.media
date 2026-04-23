# Taxonomy

**Department:** Editorial
**Owner:** Luis Figuera
**Last updated:** April 22, 2026

---

## Purpose

This document defines the controlled vocabularies used across Culture Wiki: genre tags, role types, event categories, relationship types, outlet tiers, and more. Consistency here is what lets the graph queries work — if "productor" and "producer" and "beatmaker" are three different tags, comparisons and aggregations break.

All taxonomies are managed as lookup tables in the database. Values here are the canonical set — additions require explicit approval (not silent creation in admin UI).

---

## Genres

Hip-hop is a broad culture. We track it granularly.

### Primary genres

| Slug | Display | Scope |
|---|---|---|
| `rap` | Rap | Parent genre, includes all sub-styles |
| `hip-hop` | Hip-Hop | Synonym of rap in most cases; used for cultural/multi-element contexts |
| `trap` | Trap | Sub-style defined by 808s, hi-hat rolls, Atlanta-influenced |
| `boom-bap` | Boom bap | Classic, sample-based, 90s-influenced |
| `drill` | Drill | UK/Chicago-derived aggressive sub-style |
| `rap-experimental` | Rap experimental | Avant-garde, genre-bending |
| `rap-conciencia` | Rap consciente | Lyrically conscious, sociopolitical focus |
| `freestyle` | Freestyle | Improvisation culture; can overlap with battle culture |
| `battle-rap` | Battle rap | Competitive rap, tarima culture |

### Adjacent genres (MVP: tagged when hip-hop-adjacent)

| Slug | Display | When to tag |
|---|---|---|
| `r-n-b` | R&B | Hip-hop-adjacent vocals |
| `neoperreo` | Neoperreo | When artist crosses from trap into neoperreo |
| `reggaeton` | Reggaetón | Only when a primarily hip-hop artist crosses into reggaetón — we do not catalog reggaetón-native artists as a rule |
| `dembow` | Dembow | Rare tag, only on crossover |
| `afrobeats` | Afrobeats | Crossover only |

### Regional/cultural tags (not genres, applied additionally)

- `rap-venezolano` — Venezuelan identity tag.
- `rap-en-español` — Language/cultural umbrella tag.
- `underground` — Independent scene marker.
- `mainstream` — Commercially established.
- `diaspora` — Venezuelan artists based outside Venezuela.

---

## Role types (for people_roles)

| Value | Description |
|---|---|
| `artist` | Primary performer (rapper, MC, singer with rap context) |
| `producer` | Beatmaker, mixer, overall production |
| `engineer` | Mix engineer, mastering, recording |
| `songwriter` | Lyricist, ghostwriter, composer |
| `dj` | DJ, both scene and production |
| `videographer` | Music video director or producer |
| `manager` | Artist manager |
| `journalist` | Music journalist, critic |
| `host` | Podcast host, radio host, event host |
| `executive` | Label executive, A&R |
| `photographer` | Music photographer |
| `event-organizer` | Promoter, tarima organizer, festival organizer |

A person can hold multiple roles simultaneously. Akapellah is `artist` (primary) and occasionally `producer`. Oldtape is `producer` (primary) and sometimes `artist`.

---

## Release types

| Value | Description |
|---|---|
| `album` | Full-length studio release (commonly ≥ 8 tracks) |
| `ep` | Extended play (commonly 3-7 tracks) |
| `single` | 1-2 track release |
| `mixtape` | Mixtape (definitional flexibility honored — artist's classification wins) |
| `compilation` | Multiple-artist compilation |
| `live` | Live recording |
| `remix` | Remix-focused release |

---

## Collaboration roles (on a track)

| Value | Description |
|---|---|
| `primary` | Main artist on the track |
| `feature` | Featured artist |
| `vocal` | Provided vocals (hook, bridge) without being billed as feature |
| `hook` | Specifically a hook/chorus contribution |
| `uncredited` | Confirmed contribution not officially credited |

---

## Production credit roles

| Value | Description |
|---|---|
| `producer` | Full production credit |
| `co-producer` | Secondary production credit |
| `beat` | Beat-only credit (beat lease, etc.) |
| `mix` | Mixing engineer |
| `master` | Mastering engineer |
| `engineer` | General recording engineer |
| `instrumentation` | Played instruments on track |

---

## Label deal types

| Value | Description |
|---|---|
| `signed` | Full signing to the label |
| `licensing` | Licensing deal (artist retains more rights) |
| `distribution` | Distribution-only |
| `imprint` | Artist's own imprint hosted under the label |
| `independent` | Self-released under artist's own label |
| `unknown` | Acknowledged unknown; better than guessing |

### Label departure types

| Value | Description |
|---|---|
| `current` | Still on this label |
| `amicable` | Left on good terms |
| `dispute` | Left with legal or public dispute |
| `expired` | Contract simply ended |
| `acquired` | Label was acquired; artist moved with or without it |
| `unknown` | Acknowledged unknown |

---

## Event types

| Value | Description |
|---|---|
| `concert` | Performance |
| `festival` | Festival appearance |
| `battle` | Rap battle, tarima |
| `release` | Album/single release date |
| `award` | Received an award |
| `nomination` | Nominated for an award |
| `controversy` | Notable public controversy |
| `beef` | Documented feud event |
| `legal` | Legal matter (arrest, lawsuit, court) |
| `historic` | Defining scene moment |
| `personal` | Personal life event (only when public and contextually relevant) |
| `collaboration-announced` | Public collab announcement |
| `tour` | Tour dates, appearances |

### Career event categories (more granular, for the person-specific timeline)

| Value | Description |
|---|---|
| `milestone` | General career milestone |
| `signing` | Label signing |
| `departure` | Label or crew departure |
| `release` | Release milestone |
| `collaboration` | Notable collab |
| `recognition` | Award, nomination, list inclusion |
| `media` | Major media moment |
| `personal` | Personal life event |
| `legal` | Legal moment |
| `beef` | Beef-related event |
| `hiatus` | Pause in career |
| `return` | Return from hiatus |
| `transition` | Change in style, genre, or approach |

---

## Relationship types

Between people (for the relationships table):

| Value | Directional? | Description |
|---|---|---|
| `collaborator` | Bidirectional | Frequent collaborator |
| `mentor` | Directional (A mentors B) | Documented mentorship |
| `influenced_by` | Directional (A influenced by B) | Claimed or documented influence |
| `rival` | Bidirectional | Documented rivalry or beef |
| `family` | Bidirectional | Family relationship (when public) |
| `crew_mate` | Bidirectional | Members of same crew |
| `label_mate` | Bidirectional | Were on same label concurrently |
| `romantic` | Bidirectional | Public romantic relationship (use sparingly, only when publicly documented) |

---

## Source types

For the sources table:

| Value | Description |
|---|---|
| `article` | Written press article |
| `interview` | Interview piece (print or video) |
| `podcast` | Podcast episode |
| `video` | YouTube or other video |
| `social-post` | Instagram, Twitter, TikTok post (archive) |
| `official-statement` | Label, artist, or management statement |
| `academic` | Academic publication |
| `book` | Book reference |
| `documentary` | Documentary film |
| `liner-notes` | Album liner notes or booklet |
| `database` | Structured source (MusicBrainz, Discogs) |
| `streaming-platform` | Spotify, Apple Music metadata |

---

## Outlet credibility tiers

Applied to media_outlets. Guides how we weight multiple conflicting sources.

| Tier | Description | Examples |
|---|---|---|
| `tier-1` | Legacy press, heavily edited, established track record | Billboard, Rolling Stone, The New York Times, El País |
| `tier-2` | Established online outlets, edited, specialized | Remezcla, HipHopDX, Complex, Pitchfork |
| `tier-3` | Independent blogs with sustained editorial, some editing | Mid-tier Spanish music blogs |
| `tier-4` | Social posts, small blogs, aggregators | Small outlets, fan sites |
| `tier-5` | Unverified, anonymous, primary-source-only | Forum posts, anonymous tips |

When sources conflict, tier-1 prevails unless tier-2+ with specific evidence contradicts.

---

## Venue / studio types (Phase 2)

Venues:
- `club`, `stage` (tarima), `arena`, `festival-grounds`, `street`, `private`, `tv-studio`, `radio-studio`

Studios:
- `commercial` (rentable), `label` (owned by label), `home` (artist's own), `shared` (collective)

---

## Languages

For tracks (language of lyrics):

| Value | Notes |
|---|---|
| `es` | Spanish |
| `en` | English |
| `pt` | Portuguese |
| `fr` | French |
| `multi` | Multiple languages in the same track |

---

## Cities — canonical list (seed)

We maintain a canonical list. Admin-only additions. Initial seed for Venezuela:

- Caracas (and Distrito Capital)
- Maracay (Aragua)
- Valencia (Carabobo)
- Maracaibo (Zulia)
- Barquisimeto (Lara)
- Ciudad Guayana (Bolívar)
- Mérida (Mérida)
- Cumaná (Sucre)
- San Cristóbal (Táchira)
- Puerto Ordaz (Bolívar)

For diaspora:
- Madrid, Barcelona (Spain)
- Miami, New York (USA)
- Bogotá, Medellín (Colombia)
- Mexico City, Guadalajara (Mexico)
- Buenos Aires (Argentina)
- Santiago (Chile)

More added as needed.

---

## Naming convention enforcement

- Slugs are lowercase, hyphenated, ASCII-only. "akapellah," "canserbero," "apache-el-real."
- When disambiguating: "apache-rap-vz" vs. "apache-band-us" if needed. Slug conflict resolver in admin handles this.
- Aliases stored in the `aliases` array on the person record. Search matches any alias → resolves to canonical record.

---

## Change management

Additions to any taxonomy above require:
1. Proposal in admin interface (or in a discussion doc).
2. Editor review.
3. Commit to this file with rationale.

Removing a value from an existing set requires migration plan for any data using it.

---

*See also: [`editorial-policy.md`](./editorial-policy.md), [`02-Engineering/data-model.md`](../02-Engineering/data-model.md)*
