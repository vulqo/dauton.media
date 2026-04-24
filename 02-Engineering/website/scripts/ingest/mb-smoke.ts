#!/usr/bin/env -S npx tsx
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { createClient } from '@supabase/supabase-js';
import { mbResolveArtistByUrl, mbGetArtist, mbSearchArtist } from '../../src/lib/ingest/clients/musicbrainz';

const supa = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  const slug = process.argv[2] ?? 'canserbero';
  console.log(`\n=== MB smoke test: ${slug} ===\n`);

  const { data: person, error } = await supa
    .from('people')
    .select('id, slug, stage_name, spotify_id, musicbrainz_id, gender, birth_date, death_date, status')
    .eq('slug', slug)
    .single();

  if (error || !person) {
    console.error('Person not found:', error?.message);
    process.exit(1);
  }

  console.log('Before:', JSON.stringify(person, null, 2));

  let mbid: string | null = person.musicbrainz_id;

  if (!mbid && person.spotify_id) {
    const spotifyUrl = `https://open.spotify.com/artist/${person.spotify_id}`;
    console.log(`\nResolving MBID via: ${spotifyUrl}`);
    const resolved = await mbResolveArtistByUrl(spotifyUrl);
    mbid = resolved.mbid;
    console.log(`MBID: ${mbid ?? 'not found'}`);
  }

  if (!mbid) {
    console.log(`\nFallback: search by name "${person.stage_name}" (country=VE)`);
    const results = await mbSearchArtist(person.stage_name, { country: 'VE', limit: 5 });
    console.log(`Search results (${results.length}):`);
    results.forEach(r => console.log(`  - ${r.name} (${r.country ?? '?'}) score=${r.score} id=${r.id}`));
    const best = results.find(r =>
      r.score >= 85 && (r.country === 'VE' || r.name.toLowerCase() === person.stage_name.toLowerCase())
    );
    if (best) {
      mbid = best.id;
      console.log(`Picked: ${best.name} (score=${best.score})`);
    }
  }

  if (!mbid) {
    console.log('\nNo MBID found. Exiting.');
    return;
  }

  console.log(`\nFetching artist rels for MBID ${mbid}...`);
  const artist = await mbGetArtist(mbid, ['url-rels', 'artist-rels', 'release-groups']);

  const updates: Record<string, any> = { musicbrainz_id: mbid };
  if (artist.gender) updates.gender = artist.gender;
  const lifeSpan = artist['life-span'];
  if (lifeSpan?.begin) {
    updates.birth_date = lifeSpan.begin.length === 4 ? `${lifeSpan.begin}-01-01` : lifeSpan.begin;
  }
  if (lifeSpan?.end) {
    updates.death_date = lifeSpan.end.length === 4 ? `${lifeSpan.end}-01-01` : lifeSpan.end;
  }
  if (lifeSpan?.ended === true) {
    updates.status = 'deceased';
  }

  for (const rel of artist.relations ?? []) {
    if (rel.type === 'discogs' && rel.url?.resource) {
      const m = rel.url.resource.match(/discogs\.com\/artist\/(\d+)/);
      if (m) updates.discogs_id = m[1];
    } else if (rel.type === 'wikidata' && rel.url?.resource) {
      const m = rel.url.resource.match(/wikidata\.org\/(?:wiki\/|entity\/)(Q\d+)/);
      if (m) updates.wikidata_id = m[1];
    } else if (rel.type === 'youtube' && rel.url?.resource) {
      const m = rel.url.resource.match(/youtube\.com\/(?:channel\/|c\/|@)([^/?]+)/);
      if (m) updates.youtube_channel_id = m[1];
    }
  }

  await supa.from('people').update(updates).eq('id', person.id);

  const relationSummary: Record<string, number> = {};
  for (const rel of artist.relations ?? []) {
    relationSummary[rel.type] = (relationSummary[rel.type] ?? 0) + 1;
  }
  const releaseGroupCount = (artist['release-groups'] ?? []).length;

  console.log('\n=== Result ===');
  console.log('Updates applied:', updates);
  console.log('Total relations:', (artist.relations ?? []).length);
  console.log('Relation types:', relationSummary);
  console.log('Release-groups:', releaseGroupCount);

  const { data: after } = await supa
    .from('people')
    .select('stage_name, musicbrainz_id, gender, birth_date, death_date, status, discogs_id, wikidata_id, youtube_channel_id')
    .eq('id', person.id)
    .single();
  console.log('\nAfter:', JSON.stringify(after, null, 2));
}

main().catch(e => { console.error(e); process.exit(1); });
