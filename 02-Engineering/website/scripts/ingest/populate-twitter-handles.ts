#!/usr/bin/env -S npx tsx
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { populateTwitterHandles } from '../../src/lib/ingest/workers/populate-twitter-handles';

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const personId = process.argv.find(a => a.startsWith('--person-id='))?.split('=')[1];
  const limitArg = process.argv.find(a => a.startsWith('--limit='))?.split('=')[1];
  const limit = limitArg ? Number(limitArg) : undefined;

  console.log(`\n=== populate-twitter-handles (dryRun=${dryRun}, personId=${personId ?? 'all'}, limit=${limit ?? 'all'}) ===\n`);

  const r = await populateTwitterHandles({ dryRun, personId, limit });

  console.log('\n=== Result ===');
  console.log(`Scanned:               ${r.scanned}`);
  console.log(`Tier 1 hits (Wikidata): ${r.tier1Hits}`);
  console.log(`Tier 2 hits (MB):       ${r.tier2Hits}`);
  console.log(`Updated:               ${r.updated}`);
}

main().catch(e => { console.error(e); process.exit(1); });
