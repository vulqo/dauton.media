#!/usr/bin/env -S npx tsx
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { populateBirthDates } from '../../src/lib/ingest/workers/populate-birth-dates';

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const limitArg = process.argv.find(a => a.startsWith('--limit='))?.split('=')[1];
  const limit = limitArg ? Number(limitArg) : undefined;

  console.log(`\n=== populate-birth-dates (dryRun=${dryRun}, limit=${limit ?? 'all'}) ===\n`);

  const r = await populateBirthDates({ dryRun, limit });

  console.log('\n=== Result ===');
  console.log(`Scanned:                ${r.scanned}`);
  console.log(`Tier 2 hits (Wikidata): ${r.tier2Hits}`);
  console.log(`Updated:                ${r.updated}`);
}

main().catch(e => { console.error(e); process.exit(1); });
