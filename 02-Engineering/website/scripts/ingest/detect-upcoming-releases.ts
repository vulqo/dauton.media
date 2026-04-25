#!/usr/bin/env -S npx tsx
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import {
  detectUpcomingReleases,
  reconcileUpcomingToReleased,
} from '../../src/lib/ingest/workers/detect-upcoming-releases';

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const maxArg = process.argv.find(a => a.startsWith('--max-artists='))?.split('=')[1];
  const maxArtists = maxArg ? Number(maxArg) : 100;

  console.log(`\n=== detect-upcoming-releases (maxArtists=${maxArtists}, dryRun=${dryRun}) ===\n`);

  const detect = await detectUpcomingReleases({ maxArtists, dryRun });
  console.log('\nDetection result:', detect);

  if (!dryRun && !detect.rateLimitHit) {
    console.log('\n=== reconcile upcoming → released ===');
    const rec = await reconcileUpcomingToReleased();
    console.log('Reconciled:', rec.reconciled);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
