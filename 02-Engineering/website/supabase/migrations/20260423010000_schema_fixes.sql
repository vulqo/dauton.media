-- =============================================================================
-- Dauton Media · 0002 Schema Fixes · Post Sprint 0 Audit
-- Generated: 2026-04-23 (Cowork)
--
-- Addresses findings from the post-Sprint-0 audit:
--   (a) corrections_queue: add UPDATE/DELETE policies for editors/admins so
--       they can actually resolve the queue (0001 only had INSERT + SELECT).
--   (b) edit_history: document that writes come from server-side triggers
--       running as service_role (which bypasses RLS). No client INSERT
--       policy is provided on purpose.
--   (c) user_profiles: tighten privacy. 0001 exposed every profile via
--       `USING (true)`. This migration adds `is_public boolean default false`
--       and rewrites the SELECT policy to respect it. UI should only render
--       public fields (display_name, avatar_url) when showing attribution
--       on public lists or contributions.
--   (d) Add indexes on FKs that will appear in MVP queries (genre tree,
--       label journey, source linking, polymorphic entity lookups).
--
-- Safe to re-run: every statement uses IF NOT EXISTS / DROP IF EXISTS.
-- =============================================================================

-- ---------------------------------------------------------------------------
-- (a) corrections_queue: editors/admins can resolve
-- ---------------------------------------------------------------------------
drop policy if exists "editors can update corrections" on corrections_queue;
create policy "editors can update corrections" on corrections_queue
  for update
  using (
    exists (select 1 from user_profiles
            where id = auth.uid() and (is_editor or is_admin))
  )
  with check (
    exists (select 1 from user_profiles
            where id = auth.uid() and (is_editor or is_admin))
  );

drop policy if exists "admins can delete corrections" on corrections_queue;
create policy "admins can delete corrections" on corrections_queue
  for delete
  using (
    exists (select 1 from user_profiles
            where id = auth.uid() and is_admin)
  );

-- ---------------------------------------------------------------------------
-- (b) edit_history: no client INSERT policy on purpose.
--     Server-side triggers run as service_role and bypass RLS.
--     Reading is already gated by "editors read edit history" in 0001.
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- (c) user_profiles: privacy-by-default
-- ---------------------------------------------------------------------------
alter table user_profiles
  add column if not exists is_public boolean default false not null;

-- replace the 0001 policy that exposed every profile
drop policy if exists "public profiles readable" on user_profiles;
create policy "public profiles readable" on user_profiles
  for select
  using (is_public = true);

-- ---------------------------------------------------------------------------
-- (d) indexes on FKs the MVP actually touches
-- ---------------------------------------------------------------------------
create index if not exists genres_parent_id_idx             on genres            (parent_genre_id);
create index if not exists crews_origin_city_idx            on crews             (origin_city_id);
create index if not exists labels_country_idx               on labels            (country_id);
create index if not exists labels_city_idx                  on labels            (city_id);
create index if not exists labels_parent_idx                on labels            (parent_label_id);
create index if not exists media_outlets_country_idx        on media_outlets     (country_id);
create index if not exists sources_outlet_idx               on sources           (outlet_id);
create index if not exists articles_author_idx              on articles          (author_id);
create index if not exists user_profiles_claimed_person_idx on user_profiles     (claimed_person_id);
create index if not exists production_credits_track_idx    on production_credits (track_id);
create index if not exists production_credits_release_idx  on production_credits (release_id);

-- polymorphic lookups used by favorites, lists, press mentions, slug redirects
create index if not exists user_favorites_entity_idx    on user_favorites    (entity_type, entity_id);
create index if not exists user_list_items_entity_idx   on user_list_items   (entity_type, entity_id);
create index if not exists press_mentions_subject_pair  on press_mentions    (subject_type, subject_id);
create index if not exists slug_history_entity_pair     on slug_history      (entity_type, entity_id);
