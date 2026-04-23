-- =============================================================================
-- Dauton Media · Seed Pillar Roles · Sprint 0
-- Applied: 2026-04-23
-- Adds people_roles rows for all 15 pillar artists.
-- Safe to re-run: uses ON CONFLICT DO NOTHING.
-- =============================================================================

insert into people_roles (person_id, role_type, is_primary)
select p.id, 'artist', true
from people p where p.slug = 'canserbero'
on conflict (person_id, role_type) do nothing;

insert into people_roles (person_id, role_type, is_primary)
select p.id, 'artist', true
from people p where p.slug = 'apache'
on conflict (person_id, role_type) do nothing;

-- Akapellah: artist + producer (artist is primary)
insert into people_roles (person_id, role_type, is_primary)
select p.id, 'artist', true
from people p where p.slug = 'akapellah'
on conflict (person_id, role_type) do nothing;

insert into people_roles (person_id, role_type, is_primary)
select p.id, 'producer', false
from people p where p.slug = 'akapellah'
on conflict (person_id, role_type) do nothing;

insert into people_roles (person_id, role_type, is_primary)
select p.id, 'artist', true
from people p where p.slug = 'gabylonia'
on conflict (person_id, role_type) do nothing;

insert into people_roles (person_id, role_type, is_primary)
select p.id, 'artist', true
from people p where p.slug = 'mcklopedia'
on conflict (person_id, role_type) do nothing;

insert into people_roles (person_id, role_type, is_primary)
select p.id, 'artist', true
from people p where p.slug = 'lil-supa'
on conflict (person_id, role_type) do nothing;

insert into people_roles (person_id, role_type, is_primary)
select p.id, 'artist', true
from people p where p.slug = 'nerza'
on conflict (person_id, role_type) do nothing;

insert into people_roles (person_id, role_type, is_primary)
select p.id, 'artist', true
from people p where p.slug = 'cayro'
on conflict (person_id, role_type) do nothing;

-- Oldtape: producer is primary, also artist
insert into people_roles (person_id, role_type, is_primary)
select p.id, 'producer', true
from people p where p.slug = 'oldtape'
on conflict (person_id, role_type) do nothing;

insert into people_roles (person_id, role_type, is_primary)
select p.id, 'artist', false
from people p where p.slug = 'oldtape'
on conflict (person_id, role_type) do nothing;

insert into people_roles (person_id, role_type, is_primary)
select p.id, 'artist', true
from people p where p.slug = 'micro-tdh'
on conflict (person_id, role_type) do nothing;

insert into people_roles (person_id, role_type, is_primary)
select p.id, 'artist', true
from people p where p.slug = 'lil-goofy'
on conflict (person_id, role_type) do nothing;

insert into people_roles (person_id, role_type, is_primary)
select p.id, 'artist', true
from people p where p.slug = 'rxnde-akozta'
on conflict (person_id, role_type) do nothing;

insert into people_roles (person_id, role_type, is_primary)
select p.id, 'artist', true
from people p where p.slug = 'neutro-shorty'
on conflict (person_id, role_type) do nothing;

insert into people_roles (person_id, role_type, is_primary)
select p.id, 'artist', true
from people p where p.slug = 'jeiby'
on conflict (person_id, role_type) do nothing;

insert into people_roles (person_id, role_type, is_primary)
select p.id, 'artist', true
from people p where p.slug = 'trainer'
on conflict (person_id, role_type) do nothing;
