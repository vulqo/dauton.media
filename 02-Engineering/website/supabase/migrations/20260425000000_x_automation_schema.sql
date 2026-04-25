-- =============================================================================
-- 0009 · X (Twitter) automation schema (Sprint 7)
-- Adds: relevance_score / release_status on releases, is_pillar on people,
-- and two new tables: upcoming_releases + x_publication_queue.
-- =============================================================================

-- Releases: relevance score + release status
alter table releases
  add column if not exists relevance_score integer default 5;
comment on column releases.relevance_score is '1-10 scale. Used by X automation to filter feed. >= 5 default threshold.';

alter table releases
  add column if not exists release_status text default 'released';
comment on column releases.release_status is 'announced | pre_save_active | released | cancelled';

-- People: is_pillar flag (used in X heuristic)
alter table people
  add column if not exists is_pillar boolean default false;

update people set is_pillar = true
  where visibility = 'public' and is_venezuelan = true;

-- Upcoming releases (announced but not yet released)
create table if not exists upcoming_releases (
  id                      uuid primary key default gen_random_uuid(),
  person_id               uuid not null references people(id),
  title                   text not null,
  scheduled_release_date  date not null,
  release_type            text,
  spotify_id              text unique,
  pre_save_url            text,
  source                  text not null,
  source_detail           text,
  detected_at             timestamptz default now(),
  fulfilled_release_id    uuid references releases(id),
  status                  text default 'pending',
  notes                   text,
  unique (person_id, title, scheduled_release_date)
);
create index if not exists upcoming_releases_scheduled_idx on upcoming_releases(scheduled_release_date);
create index if not exists upcoming_releases_status_idx on upcoming_releases(status);
create index if not exists upcoming_releases_person_idx on upcoming_releases(person_id);

-- X publication queue (drafted tweets per template, dedup-by-year)
create table if not exists x_publication_queue (
  id                    uuid primary key default gen_random_uuid(),
  template_key          text not null,
  entity_type           text not null,
  entity_id             uuid not null,
  mentioned_person_id   uuid not null references people(id),
  mentioned_handle      text not null,
  tweet_text            text not null,
  scheduled_for         timestamptz,
  status                text default 'queued',
  posted_manually       boolean default false,
  posted_at             timestamptz,
  posted_tweet_id       text,
  posted_tweet_url      text,
  impressions           integer,
  likes                 integer,
  retweets              integer,
  replies               integer,
  metrics_updated_at    timestamptz,
  failure_reason        text,
  created_at            timestamptz default now(),
  updated_at            timestamptz default now(),
  -- Materialized year for yearly-dedup (extract on timestamptz is not
  -- IMMUTABLE, so we keep a regular column maintained by trigger below).
  created_year          integer
);
create index if not exists x_queue_status_scheduled_idx on x_publication_queue(status, scheduled_for);
create index if not exists x_queue_entity_idx on x_publication_queue(entity_type, entity_id);
create index if not exists x_queue_mentioned_idx on x_publication_queue(mentioned_person_id);
create index if not exists x_queue_template_idx on x_publication_queue(template_key);

create or replace function x_queue_set_created_year()
returns trigger as $$
begin
  new.created_year := extract(year from coalesce(new.created_at, now()))::int;
  return new;
end;
$$ language plpgsql;

drop trigger if exists x_queue_created_year_trg on x_publication_queue;
create trigger x_queue_created_year_trg
  before insert or update of created_at on x_publication_queue
  for each row execute function x_queue_set_created_year();

create unique index if not exists x_queue_dedup_yearly_idx
  on x_publication_queue(template_key, entity_type, entity_id, created_year);

-- RLS
alter table upcoming_releases    enable row level security;
alter table x_publication_queue  enable row level security;

create policy "service writes upcoming"
  on upcoming_releases
  for all using (auth.role() = 'service_role');
create policy "public reads upcoming"
  on upcoming_releases
  for select using (true);

create policy "service writes x_queue"
  on x_publication_queue
  for all using (auth.role() = 'service_role');

-- Backfill relevance_score for any existing releases
update releases r
set relevance_score = case
  when p.is_pillar = true and r.release_type = 'album'                      then 10
  when p.is_pillar = true and r.release_type in ('ep', 'mixtape')           then 8
  when p.is_pillar = true and r.release_type = 'single'                     then 6
  when r.release_type = 'album'                                             then 7
  when r.release_type in ('ep', 'mixtape')                                  then 5
  when r.release_type = 'single'                                            then 3
  else 5
end
from people p
where r.primary_artist_id = p.id;
