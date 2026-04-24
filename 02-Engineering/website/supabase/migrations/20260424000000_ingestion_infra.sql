-- =============================================================================
-- 0005 · Ingestion infrastructure (Sprint 3)
-- =============================================================================

create table if not exists ingestion_queue (
  id              uuid primary key default gen_random_uuid(),
  entity_type     text not null,
  entity_ref      text not null,
  source          text not null,
  operation       text not null,
  priority        integer default 5,
  payload         jsonb default '{}'::jsonb,
  attempts        integer default 0,
  max_attempts    integer default 5,
  next_attempt_at timestamptz default now(),
  last_attempt_at timestamptz,
  status          text default 'queued',
  error_log       text,
  created_at      timestamptz default now(),
  updated_at      timestamptz default now()
);
create index if not exists iq_status_next_idx on ingestion_queue (status, next_attempt_at)
  where status in ('queued', 'in_flight');
create index if not exists iq_source_status_idx on ingestion_queue (source, status);
create index if not exists iq_entity_idx on ingestion_queue (entity_type, entity_ref);

create table if not exists ingestion_rate_limits (
  source                    text primary key,
  requests_per_minute       integer,
  requests_per_day          integer,
  requests_used_current_min integer default 0,
  requests_used_today       integer default 0,
  window_minute_start       timestamptz default now(),
  window_day_start          timestamptz default now(),
  circuit_state             text default 'closed',
  circuit_opened_at         timestamptz,
  consecutive_failures      integer default 0,
  updated_at                timestamptz default now()
);

create table if not exists raw_responses (
  id            uuid primary key default gen_random_uuid(),
  source        text not null,
  url           text,
  method        text default 'GET',
  status_code   integer,
  body          jsonb,
  headers       jsonb,
  fetched_at    timestamptz default now(),
  queue_item_id uuid references ingestion_queue(id) on delete set null
);
create index if not exists rr_source_fetched_idx on raw_responses (source, fetched_at desc);
create index if not exists rr_queue_item_idx on raw_responses (queue_item_id);

create table if not exists pipeline_runs (
  id                  uuid primary key default gen_random_uuid(),
  pipeline_id         text not null,
  trigger_source      text,
  started_at          timestamptz default now(),
  ended_at            timestamptz,
  status              text default 'running',
  entities_created    integer default 0,
  entities_updated    integer default 0,
  entities_skipped    integer default 0,
  external_api_calls  jsonb default '{}'::jsonb,
  claude_tokens_in    integer default 0,
  claude_tokens_out   integer default 0,
  estimated_cost_usd  numeric(10, 4) default 0,
  error_summary       text
);
create index if not exists pr_pipeline_started_idx on pipeline_runs (pipeline_id, started_at desc);

create table if not exists videos (
  id                  uuid primary key default gen_random_uuid(),
  youtube_id          text unique not null,
  channel_youtube_id  text,
  channel_title       text,
  title               text not null,
  description         text,
  published_at        timestamptz,
  duration_seconds    integer,
  view_count          bigint,
  processed_at        timestamptz,
  transcript_source   text,
  transcript_language text,
  status              text default 'discovered',
  error_log           text,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);
create index if not exists videos_channel_idx on videos (channel_youtube_id);
create index if not exists videos_status_idx on videos (status);
create index if not exists videos_published_idx on videos (published_at desc);

create table if not exists entity_stats (
  id            uuid primary key default gen_random_uuid(),
  entity_type   text not null,
  entity_id     uuid not null,
  source        text not null,
  metric        text not null,
  value         bigint not null,
  captured_at   timestamptz default now()
);
create index if not exists es_entity_idx on entity_stats (entity_type, entity_id, metric, captured_at desc);
create index if not exists es_source_idx on entity_stats (source, captured_at desc);

alter table tracks add column if not exists explicit boolean default false;
alter table people add column if not exists gender text;
alter table people add column if not exists spotify_followers   bigint;
alter table people add column if not exists spotify_popularity  integer;
alter table people add column if not exists youtube_subscribers bigint;
alter table people add column if not exists last_stats_sync_at  timestamptz;

alter table videos        enable row level security;
alter table entity_stats  enable row level security;

create policy "public read videos"       on videos       for select using (status = 'processed');
create policy "public read entity_stats" on entity_stats for select using (true);

insert into ingestion_rate_limits (source, requests_per_minute, requests_per_day) values
  ('spotify',      180,  null),
  ('musicbrainz',  60,   null),
  ('youtube',      null, 10000),
  ('genius',       300,  null),
  ('brave_free',   60,   66),
  ('firecrawl',    30,   null),
  ('whisper',      30,   null),
  ('wikipedia',    null, null),
  ('claude',       null, null)
on conflict (source) do nothing;

alter table ingestion_queue       enable row level security;
alter table ingestion_rate_limits enable row level security;
alter table raw_responses         enable row level security;
alter table pipeline_runs         enable row level security;
