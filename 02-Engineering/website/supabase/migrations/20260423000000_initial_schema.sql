-- =============================================================================
-- Dauton Media · Initial Schema · Sprint 0
-- Applied: 2026-04-23
-- Spec: 02-Engineering/data-model.md v1
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. Reference tables
-- ---------------------------------------------------------------------------

create table if not exists countries (
  id            uuid primary key default gen_random_uuid(),
  code_iso_2    text unique not null,
  code_iso_3    text unique not null,
  name_es       text not null,
  name_en       text not null
);

create table if not exists cities (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  name           text not null,
  country_id     uuid not null references countries(id),
  region         text,
  lat            double precision,
  lng            double precision,
  population     integer,
  description_es text,
  created_at     timestamptz default now(),
  updated_at     timestamptz default now()
);
create index if not exists cities_country_id_idx on cities (country_id);

create table if not exists genres (
  id             uuid primary key default gen_random_uuid(),
  slug           text unique not null,
  name           text not null,
  parent_genre_id uuid references genres(id),
  description_es text
);

-- ---------------------------------------------------------------------------
-- 2. People and roles
-- ---------------------------------------------------------------------------

create table if not exists people (
  id                    uuid primary key default gen_random_uuid(),
  slug                  text unique not null,
  stage_name            text not null,
  legal_name            text,
  aliases               text[] default '{}',
  birth_date            date,
  birth_date_precision  text,                    -- 'year' | 'month' | 'day'
  death_date            date,
  origin_city_id        uuid references cities(id),
  current_city_id       uuid references cities(id),
  bio_short             text,
  bio_long              text,
  photo_url             text,
  photo_credit          text,
  is_venezuelan         boolean default false,   -- updated via trigger
  is_peripheral         boolean default false,
  active_since          date,
  active_until          date,
  status                text default 'active',   -- 'active' | 'inactive' | 'deceased' | 'retired'
  verified              boolean default false,
  claimed_by_user_id    uuid,                    -- fk to auth.users added below
  completeness_score    integer default 0,
  visibility            text default 'public',   -- 'draft' | 'review' | 'public'
  spotify_id            text,
  apple_music_id        text,
  genius_id             text,
  musicbrainz_id        text,
  youtube_channel_id    text,
  instagram_handle      text,
  twitter_handle        text,
  tiktok_handle         text,
  website_url           text,
  created_at            timestamptz default now(),
  updated_at            timestamptz default now(),
  deleted_at            timestamptz
);
create index if not exists people_slug_idx on people (slug) where deleted_at is null;
create index if not exists people_stage_name_idx on people (stage_name) where deleted_at is null;
create index if not exists people_aliases_idx on people using gin (aliases);
create index if not exists people_origin_city_idx on people (origin_city_id);

-- trigram index for fuzzy name search
create extension if not exists pg_trgm;
create index if not exists people_stage_name_trgm_idx on people using gin (stage_name gin_trgm_ops);

create table if not exists people_roles (
  id          uuid primary key default gen_random_uuid(),
  person_id   uuid not null references people(id) on delete cascade,
  role_type   text not null,   -- 'artist' | 'producer' | 'dj' | 'manager' | 'journalist' | 'videographer' | 'songwriter'
  is_primary  boolean default false,
  unique (person_id, role_type)
);
create index if not exists people_roles_role_type_idx on people_roles (role_type);

-- ---------------------------------------------------------------------------
-- 3. Crews and labels
-- ---------------------------------------------------------------------------

create table if not exists crews (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,
  name              text not null,
  type              text default 'crew',   -- 'crew' | 'duo' | 'group' | 'collective'
  origin_city_id    uuid references cities(id),
  founded_date      date,
  dissolved_date    date,
  description_es    text,
  logo_url          text,
  completeness_score integer default 0,
  visibility        text default 'public',
  created_at        timestamptz default now(),
  updated_at        timestamptz default now(),
  deleted_at        timestamptz
);

create table if not exists crew_memberships (
  id          uuid primary key default gen_random_uuid(),
  crew_id     uuid not null references crews(id) on delete cascade,
  person_id   uuid not null references people(id) on delete cascade,
  role        text,                        -- 'founder' | 'member' | 'affiliate'
  from_date   date,
  to_date     date,
  status      text default 'active',       -- 'active' | 'past' | 'disputed'
  notes       text,
  source_ids  uuid[] default '{}'
);
create index if not exists crew_memberships_crew_id_idx on crew_memberships (crew_id);
create index if not exists crew_memberships_person_id_idx on crew_memberships (person_id);

create table if not exists labels (
  id                uuid primary key default gen_random_uuid(),
  slug              text unique not null,
  name              text not null,
  country_id        uuid references countries(id),
  city_id           uuid references cities(id),
  founded_date      date,
  dissolved_date    date,
  type              text default 'independent',   -- 'major' | 'indie' | 'independent' | 'distro'
  parent_label_id   uuid references labels(id),
  description_es    text,
  logo_url          text,
  website_url       text,
  completeness_score integer default 0,
  visibility        text default 'public',
  created_at        timestamptz default now(),
  updated_at        timestamptz default now(),
  deleted_at        timestamptz
);

create table if not exists label_eras (
  id              uuid primary key default gen_random_uuid(),
  person_id       uuid not null references people(id) on delete cascade,
  label_id        uuid not null references labels(id) on delete cascade,
  from_date       date,
  to_date         date,
  deal_type       text,    -- 'signed' | 'licensing' | 'distribution' | 'independent' | 'unknown'
  departure_type  text,    -- 'current' | 'amicable' | 'dispute' | 'expired' | 'unknown'
  notes           text,
  source_ids      uuid[] default '{}'
);
create index if not exists label_eras_person_id_idx on label_eras (person_id);
create index if not exists label_eras_label_id_idx on label_eras (label_id);

-- ---------------------------------------------------------------------------
-- 4. Releases and tracks
-- ---------------------------------------------------------------------------

create table if not exists releases (
  id                      uuid primary key default gen_random_uuid(),
  slug                    text unique not null,
  title                   text not null,
  primary_artist_id       uuid not null references people(id),
  release_type            text not null,   -- 'album' | 'ep' | 'single' | 'mixtape' | 'compilation'
  released_date           date,
  released_date_precision text,            -- 'year' | 'month' | 'day'
  label_id                uuid references labels(id),
  total_tracks            integer,
  duration_seconds        integer,
  cover_url               text,
  spotify_id              text,
  apple_music_id          text,
  musicbrainz_id          text,
  discogs_id              text,
  youtube_url             text,
  description_es          text,
  completeness_score      integer default 0,
  visibility              text default 'public',
  created_at              timestamptz default now(),
  updated_at              timestamptz default now(),
  deleted_at              timestamptz
);
create index if not exists releases_primary_artist_id_idx on releases (primary_artist_id);
create index if not exists releases_label_id_idx on releases (label_id);
create index if not exists releases_released_date_idx on releases (released_date);
create index if not exists releases_title_trgm_idx on releases using gin (title gin_trgm_ops);

create table if not exists tracks (
  id                       uuid primary key default gen_random_uuid(),
  slug                     text unique not null,
  title                    text not null,
  release_id               uuid references releases(id),
  track_number             integer,
  duration_seconds         integer,
  isrc                     text,
  spotify_id               text,
  apple_music_id           text,
  genius_id                text,
  youtube_url              text,
  has_lyrics_external_link text,
  created_at               timestamptz default now(),
  updated_at               timestamptz default now(),
  deleted_at               timestamptz
);
create index if not exists tracks_release_id_idx on tracks (release_id);

create table if not exists collaborations (
  id             uuid primary key default gen_random_uuid(),
  track_id       uuid references tracks(id) on delete cascade,
  release_id     uuid references releases(id) on delete cascade,
  person_id      uuid not null references people(id),
  role           text not null,   -- 'primary' | 'feature' | 'vocal' | 'hook'
  billing_order  integer,
  notes          text,
  source_ids     uuid[] default '{}',
  constraint collab_has_target check (track_id is not null or release_id is not null)
);
create index if not exists collaborations_person_id_idx on collaborations (person_id);
create index if not exists collaborations_track_id_idx on collaborations (track_id);
create index if not exists collaborations_release_id_idx on collaborations (release_id);

create table if not exists production_credits (
  id          uuid primary key default gen_random_uuid(),
  track_id    uuid references tracks(id) on delete cascade,
  release_id  uuid references releases(id) on delete cascade,
  person_id   uuid not null references people(id),
  role        text not null,   -- 'producer' | 'co-producer' | 'beat' | 'mix' | 'master' | 'engineer'
  notes       text,
  source_ids  uuid[] default '{}',
  constraint prod_has_target check (track_id is not null or release_id is not null)
);
create index if not exists production_credits_person_id_idx on production_credits (person_id);

create table if not exists writing_credits (
  id                uuid primary key default gen_random_uuid(),
  track_id          uuid not null references tracks(id) on delete cascade,
  person_id         uuid not null references people(id),
  role              text default 'writer',   -- 'writer' | 'co-writer' | 'lyricist' | 'composer'
  split_percentage  numeric(5,2),
  source_ids        uuid[] default '{}'
);
create index if not exists writing_credits_track_id_idx on writing_credits (track_id);
create index if not exists writing_credits_person_id_idx on writing_credits (person_id);

-- ---------------------------------------------------------------------------
-- 5. Genre associations
-- ---------------------------------------------------------------------------

create table if not exists people_genres (
  person_id   uuid not null references people(id) on delete cascade,
  genre_id    uuid not null references genres(id) on delete cascade,
  is_primary  boolean default false,
  primary key (person_id, genre_id)
);

create table if not exists release_genres (
  release_id  uuid not null references releases(id) on delete cascade,
  genre_id    uuid not null references genres(id) on delete cascade,
  primary key (release_id, genre_id)
);

-- ---------------------------------------------------------------------------
-- 6. Events and career timeline
-- ---------------------------------------------------------------------------

create table if not exists events (
  id                   uuid primary key default gen_random_uuid(),
  slug                 text unique not null,
  title                text not null,
  description_es       text,
  event_date           date,
  event_date_precision text,
  event_type           text not null,   -- 'concert' | 'battle' | 'release' | 'award' | 'controversy' | 'beef' | 'historic'
  city_id              uuid references cities(id),
  venue_id             uuid,            -- fk to venues added in Phase 2
  source_ids           uuid[] default '{}',
  visibility           text default 'public',
  created_at           timestamptz default now(),
  updated_at           timestamptz default now()
);
create index if not exists events_city_id_idx on events (city_id);
create index if not exists events_event_date_idx on events (event_date);

create table if not exists event_participants (
  id          uuid primary key default gen_random_uuid(),
  event_id    uuid not null references events(id) on delete cascade,
  person_id   uuid references people(id),
  crew_id     uuid references crews(id),
  role        text,   -- 'performer' | 'subject' | 'opponent' | 'host'
  constraint participant_has_subject check (person_id is not null or crew_id is not null)
);
create index if not exists event_participants_event_id_idx on event_participants (event_id);
create index if not exists event_participants_person_id_idx on event_participants (person_id);

create table if not exists career_events (
  id                   uuid primary key default gen_random_uuid(),
  person_id            uuid not null references people(id) on delete cascade,
  event_date           date,
  event_date_precision text,
  title                text not null,
  description_es       text,
  category             text,   -- 'milestone' | 'signing' | 'release' | 'personal' | 'legal' | 'beef'
  source_ids           uuid[] default '{}'
);
create index if not exists career_events_person_id_idx on career_events (person_id);

-- ---------------------------------------------------------------------------
-- 7. Press, media and sources
-- ---------------------------------------------------------------------------

create table if not exists media_outlets (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  name             text not null,
  type             text,   -- 'magazine' | 'blog' | 'podcast' | 'newspaper' | 'youtube-channel'
  country_id       uuid references countries(id),
  website_url      text,
  description_es   text,
  logo_url         text,
  credibility_tier integer default 3   -- 1 = tier1 (Rolling Stone), 5 = unknown blog
);

create table if not exists articles (
  id             uuid primary key default gen_random_uuid(),
  url            text not null unique,
  title          text,
  outlet_id      uuid references media_outlets(id),
  author_id      uuid references people(id),
  author_name    text,
  published_date date,
  language       text default 'es',
  excerpt        text,
  retrieved_at   timestamptz default now()
);
create index if not exists articles_outlet_id_idx on articles (outlet_id);
create index if not exists articles_published_date_idx on articles (published_date);

create table if not exists press_mentions (
  id            uuid primary key default gen_random_uuid(),
  article_id    uuid not null references articles(id) on delete cascade,
  subject_type  text not null,           -- 'person' | 'release' | 'crew' | 'label' | 'event'
  subject_id    uuid not null,
  prominence    text default 'mentioned', -- 'main' | 'mentioned' | 'quoted'
  quote_es      text,
  tags          text[] default '{}'
);
create index if not exists press_mentions_subject_idx on press_mentions (subject_type, subject_id);
create index if not exists press_mentions_article_id_idx on press_mentions (article_id);

create table if not exists sources (
  id               uuid primary key default gen_random_uuid(),
  url              text unique,
  source_type      text not null,   -- 'article' | 'video' | 'podcast' | 'interview' | 'post' | 'book' | 'academic'
  title            text,
  outlet_id        uuid references media_outlets(id),
  author_name      text,
  published_date   date,
  retrieved_at     timestamptz default now(),
  archive_url      text,
  credibility_tier integer default 3,
  notes            text
);
create index if not exists sources_source_type_idx on sources (source_type);

-- ---------------------------------------------------------------------------
-- 8. Relationships
-- ---------------------------------------------------------------------------

create table if not exists relationships (
  id                uuid primary key default gen_random_uuid(),
  person_a_id       uuid not null references people(id) on delete cascade,
  person_b_id       uuid not null references people(id) on delete cascade,
  relationship_type text not null,   -- 'collaborator' | 'mentor' | 'influenced_by' | 'rival' | 'family'
  bidirectional     boolean default true,
  from_date         date,
  to_date           date,
  status            text default 'active',   -- 'active' | 'past' | 'ended' | 'reconciled'
  description_es    text,
  source_ids        uuid[] default '{}',
  constraint relationships_not_self check (person_a_id != person_b_id)
);
create index if not exists relationships_person_a_idx on relationships (person_a_id);
create index if not exists relationships_person_b_idx on relationships (person_b_id);
create index if not exists relationships_type_idx on relationships (relationship_type);

-- ---------------------------------------------------------------------------
-- 9. Users, favorites, lists (extends Supabase Auth)
-- ---------------------------------------------------------------------------

create table if not exists user_profiles (
  id                uuid primary key references auth.users(id) on delete cascade,
  display_name      text,
  avatar_url        text,
  bio               text,
  is_editor         boolean default false,
  is_admin          boolean default false,
  claimed_person_id uuid references people(id),
  created_at        timestamptz default now()
);

-- now add the deferred fk on people.claimed_by_user_id
alter table people
  add constraint people_claimed_by_user_id_fk
  foreign key (claimed_by_user_id) references auth.users(id);

create table if not exists user_favorites (
  user_id      uuid not null references auth.users(id) on delete cascade,
  entity_type  text not null,   -- 'person' | 'release' | 'crew' | 'label'
  entity_id    uuid not null,
  created_at   timestamptz default now(),
  primary key (user_id, entity_type, entity_id)
);

create table if not exists user_lists (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  slug        text not null,
  title       text not null,
  description text,
  is_public   boolean default false,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now(),
  unique (user_id, slug)
);

create table if not exists user_list_items (
  list_id     uuid not null references user_lists(id) on delete cascade,
  entity_type text not null,
  entity_id   uuid not null,
  position    integer,
  notes       text,
  added_at    timestamptz default now(),
  primary key (list_id, entity_type, entity_id)
);

-- ---------------------------------------------------------------------------
-- 10. Editorial queue, corrections, edit history
-- ---------------------------------------------------------------------------

create table if not exists corrections_queue (
  id                  uuid primary key default gen_random_uuid(),
  submitted_by_user_id uuid references auth.users(id),
  entity_type         text not null,
  entity_id           uuid not null,
  field_name          text not null,
  current_value       text,
  suggested_value     text,
  reason              text,
  source_url          text,
  status              text default 'pending',   -- 'pending' | 'approved' | 'rejected' | 'duplicate'
  reviewer_user_id    uuid references auth.users(id),
  reviewed_at         timestamptz,
  reviewer_notes      text,
  created_at          timestamptz default now()
);
create index if not exists corrections_queue_status_idx on corrections_queue (status);
create index if not exists corrections_queue_entity_idx on corrections_queue (entity_type, entity_id);

create table if not exists edit_history (
  id                uuid primary key default gen_random_uuid(),
  entity_type       text not null,
  entity_id         uuid not null,
  field_name        text not null,
  previous_value    text,
  new_value         text,
  edited_by_user_id uuid references auth.users(id),
  edit_reason       text,
  source_ids        uuid[] default '{}',
  edited_at         timestamptz default now()
);
create index if not exists edit_history_entity_idx on edit_history (entity_type, entity_id);

-- ---------------------------------------------------------------------------
-- 11. Slug history (301 redirect support)
-- ---------------------------------------------------------------------------

create table if not exists slug_history (
  id          uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id   uuid not null,
  old_slug    text not null,
  new_slug    text not null,
  changed_at  timestamptz default now()
);
create index if not exists slug_history_old_slug_idx on slug_history (old_slug);

-- ---------------------------------------------------------------------------
-- 12. updated_at triggers (auto-stamp on every write)
-- ---------------------------------------------------------------------------

create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$ begin
  perform 1;
  -- cities
  if not exists (select 1 from pg_trigger where tgname = 'cities_updated_at') then
    create trigger cities_updated_at before update on cities for each row execute function set_updated_at();
  end if;
  -- people
  if not exists (select 1 from pg_trigger where tgname = 'people_updated_at') then
    create trigger people_updated_at before update on people for each row execute function set_updated_at();
  end if;
  -- crews
  if not exists (select 1 from pg_trigger where tgname = 'crews_updated_at') then
    create trigger crews_updated_at before update on crews for each row execute function set_updated_at();
  end if;
  -- labels
  if not exists (select 1 from pg_trigger where tgname = 'labels_updated_at') then
    create trigger labels_updated_at before update on labels for each row execute function set_updated_at();
  end if;
  -- releases
  if not exists (select 1 from pg_trigger where tgname = 'releases_updated_at') then
    create trigger releases_updated_at before update on releases for each row execute function set_updated_at();
  end if;
  -- tracks
  if not exists (select 1 from pg_trigger where tgname = 'tracks_updated_at') then
    create trigger tracks_updated_at before update on tracks for each row execute function set_updated_at();
  end if;
  -- events
  if not exists (select 1 from pg_trigger where tgname = 'events_updated_at') then
    create trigger events_updated_at before update on events for each row execute function set_updated_at();
  end if;
end $$;

-- ---------------------------------------------------------------------------
-- 13. Row-Level Security
-- ---------------------------------------------------------------------------

-- Enable RLS on all public-facing tables
alter table countries           enable row level security;
alter table cities              enable row level security;
alter table genres              enable row level security;
alter table people              enable row level security;
alter table people_roles        enable row level security;
alter table crews               enable row level security;
alter table crew_memberships    enable row level security;
alter table labels              enable row level security;
alter table label_eras          enable row level security;
alter table releases            enable row level security;
alter table tracks              enable row level security;
alter table collaborations      enable row level security;
alter table production_credits  enable row level security;
alter table writing_credits     enable row level security;
alter table people_genres       enable row level security;
alter table release_genres      enable row level security;
alter table events              enable row level security;
alter table event_participants  enable row level security;
alter table career_events       enable row level security;
alter table media_outlets       enable row level security;
alter table articles            enable row level security;
alter table press_mentions      enable row level security;
alter table sources             enable row level security;
alter table relationships       enable row level security;
alter table user_profiles       enable row level security;
alter table user_favorites      enable row level security;
alter table user_lists          enable row level security;
alter table user_list_items     enable row level security;
alter table corrections_queue   enable row level security;
alter table edit_history        enable row level security;
alter table slug_history        enable row level security;

-- Public read: reference tables
create policy "public read countries"  on countries  for select using (true);
create policy "public read cities"     on cities     for select using (true);
create policy "public read genres"     on genres     for select using (true);
create policy "public read outlets"    on media_outlets for select using (true);
create policy "public read sources"    on sources    for select using (true);
create policy "public read articles"   on articles   for select using (true);
create policy "public read press"      on press_mentions for select using (true);
create policy "public read slug_hist"  on slug_history for select using (true);

-- Public read: archive entities (only visible + not deleted)
create policy "public read people"    on people    for select using (visibility = 'public' and deleted_at is null);
create policy "public read crews"     on crews     for select using (visibility = 'public' and deleted_at is null);
create policy "public read labels"    on labels    for select using (visibility = 'public' and deleted_at is null);
create policy "public read releases"  on releases  for select using (visibility = 'public' and deleted_at is null);
create policy "public read tracks"    on tracks    for select using (deleted_at is null);
create policy "public read events"    on events    for select using (visibility = 'public');

-- Public read: join tables
create policy "public read people_roles"       on people_roles        for select using (true);
create policy "public read crew_memberships"   on crew_memberships    for select using (true);
create policy "public read label_eras"         on label_eras          for select using (true);
create policy "public read collaborations"     on collaborations      for select using (true);
create policy "public read production_credits" on production_credits  for select using (true);
create policy "public read writing_credits"    on writing_credits     for select using (true);
create policy "public read people_genres"      on people_genres       for select using (true);
create policy "public read release_genres"     on release_genres      for select using (true);
create policy "public read event_participants" on event_participants   for select using (true);
create policy "public read career_events"      on career_events       for select using (true);
create policy "public read relationships"      on relationships        for select using (true);

-- User-scoped: favorites and lists
create policy "user owns favorites" on user_favorites
  for all using (auth.uid() = user_id);

create policy "user owns lists" on user_lists
  for all using (auth.uid() = user_id);

create policy "public lists are readable" on user_lists
  for select using (is_public = true);

create policy "user owns list items" on user_list_items
  for all using (
    exists (select 1 from user_lists l where l.id = list_id and l.user_id = auth.uid())
  );

create policy "public list items readable" on user_list_items
  for select using (
    exists (select 1 from user_lists l where l.id = list_id and l.is_public = true)
  );

create policy "user owns profile" on user_profiles
  for all using (auth.uid() = id);

create policy "public profiles readable" on user_profiles
  for select using (true);

-- Corrections: any authed user can submit
create policy "authenticated can submit corrections" on corrections_queue
  for insert with check (auth.uid() is not null);

create policy "editors read corrections" on corrections_queue
  for select using (
    exists (select 1 from user_profiles where id = auth.uid() and (is_editor or is_admin))
  );

-- Edit history: editors/admins only
create policy "editors read edit history" on edit_history
  for select using (
    exists (select 1 from user_profiles where id = auth.uid() and (is_editor or is_admin))
  );

-- ---------------------------------------------------------------------------
-- 14. Seed: reference data (countries + cities MVP)
-- ---------------------------------------------------------------------------

insert into countries (code_iso_2, code_iso_3, name_es, name_en) values
  ('VE', 'VEN', 'Venezuela',  'Venezuela'),
  ('CO', 'COL', 'Colombia',   'Colombia'),
  ('MX', 'MEX', 'México',     'Mexico'),
  ('US', 'USA', 'Estados Unidos', 'United States'),
  ('ES', 'ESP', 'España',     'Spain'),
  ('AR', 'ARG', 'Argentina',  'Argentina'),
  ('PR', 'PRI', 'Puerto Rico','Puerto Rico'),
  ('CL', 'CHL', 'Chile',      'Chile'),
  ('PE', 'PER', 'Perú',       'Peru'),
  ('DO', 'DOM', 'Rep. Dominicana', 'Dominican Republic')
on conflict do nothing;

insert into cities (slug, name, country_id, region, description_es) values
  ('caracas',       'Caracas',       (select id from countries where code_iso_2='VE'), 'Distrito Capital', 'Capital de Venezuela y epicentro del hip-hop venezolano.'),
  ('maracay',       'Maracay',       (select id from countries where code_iso_2='VE'), 'Aragua',            'Ciudad cuna de figuras clave del rap venezolano de los 2000s.'),
  ('valencia',      'Valencia',      (select id from countries where code_iso_2='VE'), 'Carabobo',          null),
  ('merida',        'Mérida',        (select id from countries where code_iso_2='VE'), 'Mérida',            null),
  ('maracaibo',     'Maracaibo',     (select id from countries where code_iso_2='VE'), 'Zulia',             null),
  ('bogota',        'Bogotá',        (select id from countries where code_iso_2='CO'), 'Cundinamarca',      null),
  ('medellin',      'Medellín',      (select id from countries where code_iso_2='CO'), 'Antioquia',         null),
  ('ciudad-mexico', 'Ciudad de México',(select id from countries where code_iso_2='MX'),'CDMX',             null),
  ('miami',         'Miami',         (select id from countries where code_iso_2='US'), 'Florida',           null),
  ('madrid',        'Madrid',        (select id from countries where code_iso_2='ES'), 'Comunidad de Madrid',null)
on conflict do nothing;

insert into genres (slug, name, parent_genre_id, description_es) values
  ('hip-hop',      'Hip-Hop',         null,                                  'Género madre.'),
  ('rap',          'Rap',             (select id from genres where slug='hip-hop'), null),
  ('boom-bap',     'Boom-Bap',        (select id from genres where slug='rap'), 'Estilo clásico de los 90s.'),
  ('trap-lat',     'Trap Latino',     (select id from genres where slug='hip-hop'), null),
  ('lo-fi-hip-hop','Lo-Fi Hip-Hop',   (select id from genres where slug='hip-hop'), null),
  ('conscious-rap','Rap Consciente',  (select id from genres where slug='rap'), null),
  ('freestyle',    'Freestyle',       (select id from genres where slug='rap'), null),
  ('reggaeton',    'Reggaetón',       null,                                   null),
  ('trap',         'Trap',            null,                                   null),
  ('r-and-b',      'R&B',             null,                                   null)
on conflict do nothing;
