# Data Model

**Department:** Engineering
**Owner:** Luis Figuera
**Last updated:** April 22, 2026
**Status:** v1 — Frozen for Sprint 0

---

## Design philosophy

This is the spec of the database. Everything in the product reads from or writes to these tables. Changes to this document require explicit versioning and a migration plan.

**Core principles:**

1. **Polymorphic nodes via roles, not via inheritance.** One `people` table, roles assigned per person, per context. A person can be artist+producer without duplicating records.
2. **Rich edges.** Relationships (collaborations, memberships, label eras) are first-class tables with their own metadata, not simple join tables.
3. **Sources are citizens.** The `sources` table is referenced from every factual claim. A fact without a source is not a fact.
4. **Slugs over IDs for public URLs.** Internal references use UUIDs. Public URLs use slugs. Slug changes are tracked in `slug_history`.
5. **Soft-delete over hard-delete.** `deleted_at` timestamp. Entities are never fully purged; they're hidden.
6. **Audit trail by default.** Every write updates `updated_at`; `edit_history` captures detail for reviewed fields.

---

## Entity overview

| Entity | Plural | Purpose | MVP? |
|---|---|---|---|
| Person | people | Canonical human. Artists, producers, DJs, journalists, managers — all people live here. | Yes |
| Role | people_roles | Assigns role types to people. A person can have multiple. | Yes |
| Crew | crews | Groups, collectives, labels-as-crews. | Yes |
| Label | labels | Record labels, publishers, imprints. | Yes |
| Release | releases | Albums, EPs, singles, mixtapes, compilations. | Yes |
| Track | tracks | Individual songs. | Yes |
| City | cities | Geographic references for origin, scene, venue. | Yes |
| Country | countries | Lookup table. | Yes |
| Venue | venues | Historical clubs, stages, festivals. | Phase 2 |
| Studio | studios | Recording studios. | Phase 2 |
| Event | events | Concerts, battles, controversies, historical moments. | Yes |
| Scene | scenes | Geographic + temporal clusters (e.g., "Caracas underground 2005-2012"). | Phase 2 |
| Genre | genres | Genre taxonomy. | Yes |
| MediaOutlet | media_outlets | Publications, podcasts, channels. | Yes |
| Article | articles | Individual press pieces. | Yes |
| Video | videos | Music videos, documentaries, interviews. | Phase 2 |
| Award | awards | Prizes, nominations, list inclusions. | Phase 2 |
| Brand | brands | Artist-owned or endorsed brands. | Phase 2 |
| Sample | samples | Songs that have been sampled. | Phase 2 |
| Source | sources | Canonical reference for any cited claim. | Yes |
| User | users | Authenticated accounts (Supabase Auth). | Yes |

---

## Tables (DDL intent)

Below is the schema specification in Postgres DDL style. Exact column types, indexes, and constraints are finalized during migration write-up. This is the contract.

### 1. Reference tables

```sql
create table countries (
  id uuid primary key default gen_random_uuid(),
  code_iso_2 text unique not null,      -- 'VE', 'CO', 'MX'
  code_iso_3 text unique not null,      -- 'VEN', 'COL', 'MEX'
  name_es text not null,
  name_en text not null
);

create table cities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  country_id uuid not null references countries(id),
  region text,                          -- state/province
  lat double precision,
  lng double precision,
  population integer,
  description_es text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index on cities (country_id);

create table genres (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  parent_genre_id uuid references genres(id),
  description_es text
);
```

### 2. People and roles (the polymorphic core)

```sql
create table people (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  stage_name text not null,
  legal_name text,                          -- nullable; only if publicly known
  aliases text[] default '{}',
  birth_date date,
  birth_date_precision text,                -- 'year', 'month', 'day'
  death_date date,                          -- for deceased artists
  origin_city_id uuid references cities(id),
  current_city_id uuid references cities(id),
  bio_short text,                           -- one-paragraph summary
  bio_long text,                            -- editorial-curated, sourced
  photo_url text,
  photo_credit text,
  is_venezuelan boolean generated always as (
    -- derived from origin_city_id join; see function
    false
  ) stored,
  is_peripheral boolean default false,      -- true if only appears via collaboration
  active_since date,
  active_until date,
  status text default 'active',             -- 'active', 'inactive', 'deceased', 'retired'
  verified boolean default false,
  claimed_by_user_id uuid references users(id),
  completeness_score integer default 0,
  visibility text default 'public',         -- 'draft', 'review', 'public'
  spotify_id text,
  apple_music_id text,
  genius_id text,
  musicbrainz_id text,
  youtube_channel_id text,
  instagram_handle text,
  twitter_handle text,
  tiktok_handle text,
  website_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);
create index on people (slug) where deleted_at is null;
create index on people (stage_name) where deleted_at is null;
create index on people using gin (aliases);
create index on people (origin_city_id);

create table people_roles (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id) on delete cascade,
  role_type text not null,                  -- 'artist', 'producer', 'dj', 'manager', 'journalist', 'videographer', 'songwriter'
  is_primary boolean default false,
  unique (person_id, role_type)
);
create index on people_roles (role_type);
```

### 3. Crews, labels

```sql
create table crews (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  type text default 'crew',                 -- 'crew', 'duo', 'group', 'collective'
  origin_city_id uuid references cities(id),
  founded_date date,
  dissolved_date date,
  description_es text,
  logo_url text,
  completeness_score integer default 0,
  visibility text default 'public',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table crew_memberships (
  id uuid primary key default gen_random_uuid(),
  crew_id uuid not null references crews(id) on delete cascade,
  person_id uuid not null references people(id) on delete cascade,
  role text,                                -- 'founder', 'member', 'affiliate'
  from_date date,
  to_date date,
  status text default 'active',             -- 'active', 'past', 'disputed'
  notes text,
  source_ids uuid[] default '{}'
);
create index on crew_memberships (crew_id);
create index on crew_memberships (person_id);

create table labels (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  country_id uuid references countries(id),
  city_id uuid references cities(id),
  founded_date date,
  dissolved_date date,
  type text default 'independent',          -- 'major', 'indie', 'independent', 'distro'
  parent_label_id uuid references labels(id),
  description_es text,
  logo_url text,
  website_url text,
  completeness_score integer default 0,
  visibility text default 'public',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);

create table label_eras (
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id) on delete cascade,
  label_id uuid not null references labels(id) on delete cascade,
  from_date date,
  to_date date,
  deal_type text,                           -- 'signed', 'licensing', 'distribution', 'independent', 'unknown'
  departure_type text,                      -- 'current', 'amicable', 'dispute', 'expired', 'unknown'
  notes text,
  source_ids uuid[] default '{}'
);
create index on label_eras (person_id);
create index on label_eras (label_id);
```

### 4. Releases and tracks

```sql
create table releases (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  primary_artist_id uuid not null references people(id),
  release_type text not null,               -- 'album', 'ep', 'single', 'mixtape', 'compilation'
  released_date date,
  released_date_precision text,             -- 'year', 'month', 'day'
  label_id uuid references labels(id),
  total_tracks integer,
  duration_seconds integer,
  cover_url text,
  spotify_id text,
  apple_music_id text,
  musicbrainz_id text,
  discogs_id text,
  youtube_url text,
  description_es text,
  completeness_score integer default 0,
  visibility text default 'public',
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);
create index on releases (primary_artist_id);
create index on releases (label_id);
create index on releases (released_date);

create table tracks (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  release_id uuid references releases(id),
  track_number integer,
  duration_seconds integer,
  isrc text,
  spotify_id text,
  apple_music_id text,
  genius_id text,
  youtube_url text,
  has_lyrics_external_link text,            -- never host lyrics
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted_at timestamptz
);
create index on tracks (release_id);

create table collaborations (
  id uuid primary key default gen_random_uuid(),
  track_id uuid references tracks(id) on delete cascade,
  release_id uuid references releases(id) on delete cascade,
  person_id uuid not null references people(id),
  role text not null,                       -- 'primary', 'feature', 'vocal', 'hook'
  billing_order integer,
  notes text,
  source_ids uuid[] default '{}',
  check (track_id is not null or release_id is not null)
);
create index on collaborations (person_id);
create index on collaborations (track_id);
create index on collaborations (release_id);

create table production_credits (
  id uuid primary key default gen_random_uuid(),
  track_id uuid references tracks(id) on delete cascade,
  release_id uuid references releases(id) on delete cascade,
  person_id uuid not null references people(id),
  role text not null,                       -- 'producer', 'co-producer', 'beat', 'mix', 'master', 'engineer'
  notes text,
  source_ids uuid[] default '{}',
  check (track_id is not null or release_id is not null)
);
create index on production_credits (person_id);

create table writing_credits (
  id uuid primary key default gen_random_uuid(),
  track_id uuid not null references tracks(id) on delete cascade,
  person_id uuid not null references people(id),
  role text default 'writer',               -- 'writer', 'co-writer', 'lyricist', 'composer'
  split_percentage numeric(5,2),
  source_ids uuid[] default '{}'
);
```

### 5. Genre associations

```sql
create table people_genres (
  person_id uuid not null references people(id) on delete cascade,
  genre_id uuid not null references genres(id) on delete cascade,
  is_primary boolean default false,
  primary key (person_id, genre_id)
);

create table release_genres (
  release_id uuid not null references releases(id) on delete cascade,
  genre_id uuid not null references genres(id) on delete cascade,
  primary key (release_id, genre_id)
);
```

### 6. Events, career timeline

```sql
create table events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description_es text,
  event_date date,
  event_date_precision text,
  event_type text not null,                 -- 'concert', 'battle', 'release', 'award', 'controversy', 'beef', 'historic'
  city_id uuid references cities(id),
  venue_id uuid,                            -- fk added in Phase 2
  source_ids uuid[] default '{}',
  visibility text default 'public',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table event_participants (
  event_id uuid not null references events(id) on delete cascade,
  person_id uuid references people(id),
  crew_id uuid references crews(id),
  role text,                                -- 'performer', 'subject', 'opponent', 'host'
  primary key (event_id, coalesce(person_id, crew_id))
);

create table career_events (
  -- lightweight events tied to a specific person (e.g., "signed to X", "first TV appearance")
  -- heavier historical events use events table
  id uuid primary key default gen_random_uuid(),
  person_id uuid not null references people(id) on delete cascade,
  event_date date,
  event_date_precision text,
  title text not null,
  description_es text,
  category text,                            -- 'milestone', 'signing', 'release', 'personal', 'legal', 'beef'
  source_ids uuid[] default '{}'
);
create index on career_events (person_id);
```

### 7. Press and sources

```sql
create table media_outlets (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  type text,                                -- 'magazine', 'blog', 'podcast', 'newspaper', 'youtube-channel'
  country_id uuid references countries(id),
  website_url text,
  description_es text,
  logo_url text,
  credibility_tier integer default 3        -- 1 = tier1 (Rolling Stone, Billboard), 5 = unknown blog
);

create table articles (
  id uuid primary key default gen_random_uuid(),
  url text not null unique,
  title text,
  outlet_id uuid references media_outlets(id),
  author_id uuid references people(id),     -- if journalist is in our people table
  author_name text,                         -- free-text fallback if not tracked
  published_date date,
  language text default 'es',
  excerpt text,
  retrieved_at timestamptz default now()
);
create index on articles (outlet_id);
create index on articles (published_date);

create table press_mentions (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references articles(id) on delete cascade,
  subject_type text not null,               -- 'person', 'release', 'crew', 'label', 'event'
  subject_id uuid not null,
  prominence text default 'mentioned',      -- 'main', 'mentioned', 'quoted'
  quote_es text,                            -- short cited excerpt
  tags text[] default '{}'
);
create index on press_mentions (subject_type, subject_id);
create index on press_mentions (article_id);

create table sources (
  -- canonical store of any citable reference: articles, videos, podcasts, interviews, social posts, books
  id uuid primary key default gen_random_uuid(),
  url text unique,
  source_type text not null,                -- 'article', 'video', 'podcast', 'interview', 'post', 'book', 'academic'
  title text,
  outlet_id uuid references media_outlets(id),
  author_name text,
  published_date date,
  retrieved_at timestamptz default now(),
  archive_url text,                         -- Wayback Machine archive
  credibility_tier integer default 3,
  notes text
);
create index on sources (source_type);
```

### 8. Relationships (influences, rivalries, mentorship)

```sql
create table relationships (
  id uuid primary key default gen_random_uuid(),
  person_a_id uuid not null references people(id) on delete cascade,
  person_b_id uuid not null references people(id) on delete cascade,
  relationship_type text not null,          -- 'collaborator', 'mentor', 'influenced_by', 'rival', 'family'
  bidirectional boolean default true,
  from_date date,
  to_date date,
  status text default 'active',             -- 'active', 'past', 'ended', 'reconciled'
  description_es text,
  source_ids uuid[] default '{}',
  check (person_a_id != person_b_id)
);
create index on relationships (person_a_id);
create index on relationships (person_b_id);
create index on relationships (relationship_type);
```

### 9. Users, favorites, lists

```sql
-- users table is managed by Supabase Auth (auth.users).
-- we extend it with a profile table:

create table user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  bio text,
  is_editor boolean default false,
  is_admin boolean default false,
  claimed_person_id uuid references people(id),
  created_at timestamptz default now()
);

create table user_favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  entity_type text not null,                -- 'person', 'release', 'crew', 'label'
  entity_id uuid not null,
  created_at timestamptz default now(),
  primary key (user_id, entity_type, entity_id)
);

create table user_lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  slug text not null,
  title text not null,
  description text,
  is_public boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (user_id, slug)
);

create table user_list_items (
  list_id uuid not null references user_lists(id) on delete cascade,
  entity_type text not null,
  entity_id uuid not null,
  position integer,
  notes text,
  added_at timestamptz default now(),
  primary key (list_id, entity_type, entity_id)
);
```

### 10. Corrections and edit history

```sql
create table corrections_queue (
  id uuid primary key default gen_random_uuid(),
  submitted_by_user_id uuid references auth.users(id),
  entity_type text not null,
  entity_id uuid not null,
  field_name text not null,
  current_value text,
  suggested_value text,
  reason text,
  source_url text,
  status text default 'pending',            -- 'pending', 'approved', 'rejected', 'duplicate'
  reviewer_user_id uuid references auth.users(id),
  reviewed_at timestamptz,
  reviewer_notes text,
  created_at timestamptz default now()
);
create index on corrections_queue (status);
create index on corrections_queue (entity_type, entity_id);

create table edit_history (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  field_name text not null,
  previous_value text,
  new_value text,
  edited_by_user_id uuid references auth.users(id),
  edit_reason text,
  source_ids uuid[] default '{}',
  edited_at timestamptz default now()
);
create index on edit_history (entity_type, entity_id);
```

### 11. Slug history (for URL stability)

```sql
create table slug_history (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  old_slug text not null,
  new_slug text not null,
  changed_at timestamptz default now()
);
create index on slug_history (old_slug);
-- middleware looks up old_slug and issues 301 redirects
```

---

## Completeness score formula

Implemented as a Postgres function and recomputed on data change (via trigger or on-demand).

**For a person with role = artist:**

| Field | Points |
|---|---|
| Identity: slug + stage_name + origin_city | 10 |
| Photo of acceptable quality | 5 |
| Bio short (≥ 50 words) | 5 |
| Bio long (≥ 300 words) | 10 |
| Discography: ≥ 3 releases | 10 |
| Discography: ≥ 10 releases OR all releases if fewer exist | 5 |
| Collaborations: ≥ 5 distinct collaborators | 10 |
| Label eras: ≥ 1 documented | 5 |
| Career events: ≥ 5 | 10 |
| Career events: ≥ 15 | 5 |
| Press mentions: ≥ 3 from ≥ 2 outlets | 10 |
| Press mentions: ≥ 10 | 5 |
| Streaming links verified: Spotify + Apple | 5 |
| Social handles verified: ≥ 2 | 5 |

Max: 100. MVP launch target: average ≥60 across pillar artists.

Different formulas for other entity types (producer, label, release). Specified in `completeness-rubric.md` (to be created).

---

## Indexes and performance

Critical indexes mentioned inline above. Additional indexes to add post-launch based on slow query logs:

- GIN index on `people.aliases` for alias search.
- Trigram indexes on `people.stage_name`, `releases.title` for fuzzy search.
- pgvector index on embedding column once semantic search ships.

---

## Row-Level Security policies (summary)

- `people`, `releases`, `tracks`, etc.: public read where `visibility = 'public' and deleted_at is null`. Write only by editors/admins.
- `user_favorites`, `user_lists` (private): read/write only by owning user.
- `user_lists` (public): read by anyone, write only by owner.
- `corrections_queue`: insert by any authenticated user, read/update only by editors/admins.
- `edit_history`: read by editors/admins, insert by system only.
- `sources`, `articles`: public read, write by editors/admins.

Detailed RLS in `rls-policies.sql` (generated from this doc when migration is written).

---

## Migrations and versioning

- Schema versioned via Supabase CLI migrations: `supabase/migrations/YYYYMMDDHHMMSS_description.sql`.
- This document reflects the current live schema. Changes require:
  1. Update this document.
  2. Write migration.
  3. Apply to dev, test.
  4. Apply to production via deploy pipeline.
- Breaking changes (column removes, type changes) require explicit deprecation plan.

---

## Future additions (Phase 2+)

- `venues`, `studios`, `videos`, `awards`, `brands`, `samples`, `scenes` — tables to add when prioritized.
- `embeddings` table for semantic search (using pgvector).
- `artist_metrics_monthly` — time-series of streaming stats, follower counts, press mentions.
- `sample_usage` — many-to-many between tracks and sampled tracks.
- `translations` — for when English edition arrives.

---

*See also: [`architecture.md`](./architecture.md), [`api-strategy.md`](./api-strategy.md), [`05-Data/source-catalog.md`](../05-Data/source-catalog.md)*
