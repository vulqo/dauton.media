#!/usr/bin/env -S npx tsx
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { wikiGetSummary, wikiSparql, wikiGetCrossPlatformIds } from '../../src/lib/ingest/clients/wikipedia';

async function main() {
  const slug = process.argv[2] ?? 'canserbero';
  const stageName = slug === 'canserbero' ? 'Canserbero' : slug;

  console.log(`\n=== Wiki smoke: ${stageName} ===\n`);

  const summary = await wikiGetSummary(stageName, 'es');
  console.log('Summary language:', summary?.language);
  console.log('Title:', summary?.title);
  console.log('Extract (first 300 chars):', summary?.extract?.slice(0, 300), '...');
  console.log('Thumbnail:', summary?.thumbnail_url);
  console.log('Page URL:', summary?.page_url);

  console.log('\n--- SPARQL: resolve QID by MBID ---');
  const bindings = await wikiSparql(`
    SELECT ?item WHERE { ?item wdt:P434 "70a3344d-3f48-4843-ac93-e9e031d86b01" . } LIMIT 1
  `);
  const qidRaw = bindings[0]?.item?.value;
  const qid = qidRaw?.match(/Q\d+$/)?.[0];
  console.log('Wikidata QID:', qid);

  if (qid) {
    console.log('\n--- Cross-platform IDs ---');
    const ids = await wikiGetCrossPlatformIds(qid);
    console.log(JSON.stringify(ids, null, 2));
  }
}
main().catch(e => { console.error(e); process.exit(1); });
