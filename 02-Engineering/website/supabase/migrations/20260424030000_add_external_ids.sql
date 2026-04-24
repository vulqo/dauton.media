alter table people add column if not exists wikidata_id text;
alter table people add column if not exists discogs_id text;
alter table tracks add column if not exists musicbrainz_id text;
