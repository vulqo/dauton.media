#!/usr/bin/env -S npx tsx
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { geniusSearch, geniusGetSong, geniusGetArtist } from '../../src/lib/ingest/clients/genius';

async function main() {
  const query = process.argv.slice(2).join(' ') || 'Canserbero Es Épico';
  console.log(`\n=== Genius smoke: ${query} ===\n`);

  const results = await geniusSearch(query, 5);
  console.log(`Top ${results.length} results:`);
  results.forEach((r, i) => console.log(`  ${i + 1}. ${r.primary_artist.name} — ${r.title} (id=${r.id})`));

  if (results[0]) {
    console.log('\n--- Song detail ---');
    const song = await geniusGetSong(results[0].id);
    if (song) {
      console.log('Title:', song.title);
      console.log('URL:', song.url);
      console.log('Release date:', song.release_date_for_display);
      console.log('Producers:', song.producer_artists?.map(p => p.name).join(', ') || '(none)');
      console.log('Writers:', song.writer_artists?.map(w => w.name).join(', ') || '(none)');
      console.log('Featured:', song.featured_artists?.map(f => f.name).join(', ') || '(none)');
      console.log('Samples (relationships):',
        song.song_relationships?.filter(r => ['samples', 'interpolates', 'cover_of'].includes(r.relationship_type))
          .map(r => `${r.relationship_type}: ${r.songs.length}`).join(', ') || '(none)');
    }

    console.log('\n--- Artist detail ---');
    const artist = await geniusGetArtist(results[0].primary_artist.id);
    if (artist) {
      console.log('Name:', artist.name);
      console.log('Alternate names:', artist.alternate_names?.slice(0, 5).join(', '));
      console.log('Instagram:', artist.instagram_name);
      console.log('Twitter:', artist.twitter_name);
    }
  }
}
main().catch(e => { console.error(e); process.exit(1); });
