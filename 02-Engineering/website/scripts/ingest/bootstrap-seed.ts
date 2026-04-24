#!/usr/bin/env -S npx tsx
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { createClient } from '@supabase/supabase-js';
import { runStage1Bootstrap } from '../../src/lib/ingest/pipelines/stage-1-seed';
import { runDispatcher } from '../../src/lib/ingest/queue/dispatcher';

const supa = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function countPeople(): Promise<number> {
  const { count } = await supa.from('people').select('*', { count: 'exact', head: true });
  return count ?? 0;
}

async function countPillarsWithSpotify(): Promise<number> {
  const { count } = await supa.from('people')
    .select('*', { count: 'exact', head: true })
    .not('spotify_id', 'is', null);
  return count ?? 0;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run');
  const includeRelated = !process.argv.includes('--no-related');

  console.log(`\n=== Stage 1 Bootstrap (dryRun=${dryRun}, includeRelated=${includeRelated}) ===\n`);

  const startCount = await countPeople();
  const startWithSpotify = await countPillarsWithSpotify();
  console.log(`People before: ${startCount} (${startWithSpotify} with spotify_id)\n`);

  const result = await runStage1Bootstrap({ dryRun, includeRelated });
  console.log('\nBootstrap enqueued:', result);

  if (!dryRun) {
    console.log('\nDraining Spotify queue...');
    let iterations = 0;
    while (iterations++ < 200) {
      const r = await runDispatcher({ maxItems: 50, sources: ['spotify'] });
      if (r.processed > 0 || r.skipped_rate_limit > 0) {
        console.log(`  iter ${iterations}: processed=${r.processed} succeeded=${r.succeeded} failed=${r.failed} skipped_rl=${r.skipped_rate_limit} (${r.duration_ms}ms)`);
      }
      if (r.processed === 0 && r.skipped_rate_limit === 0) {
        console.log('  Queue empty — done.');
        break;
      }
      if (r.skipped_rate_limit > 0 && r.processed === 0) {
        console.log('  Rate limited — waiting 5s...');
        await new Promise(res => setTimeout(res, 5000));
      } else {
        await new Promise(res => setTimeout(res, 500));
      }
    }
  }

  const endCount = await countPeople();
  const endWithSpotify = await countPillarsWithSpotify();
  console.log(`\n=== Results ===`);
  console.log(`People: ${startCount} → ${endCount} (delta: +${endCount - startCount})`);
  console.log(`With spotify_id: ${startWithSpotify} → ${endWithSpotify}`);
  console.log(`Pillars with spotify_id: ${endWithSpotify}/15`);
}

main().catch(e => { console.error(e); process.exit(1); });
