#!/usr/bin/env -S npx tsx
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { createClient } from '@supabase/supabase-js';

const supa = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  const source = process.argv[2];
  if (!source) {
    console.error('Usage: npx tsx scripts/admin/retry-dead-letter.ts <source>');
    console.error('Example: npx tsx scripts/admin/retry-dead-letter.ts spotify');
    process.exit(1);
  }

  const { data: items, error: fetchErr } = await supa
    .from('ingestion_queue')
    .select('id, operation, error_log')
    .eq('status', 'dead_letter')
    .eq('source', source);

  if (fetchErr) {
    console.error('Error fetching dead_letter items:', fetchErr.message);
    process.exit(1);
  }

  if (!items || items.length === 0) {
    console.log(`No dead_letter items found for source=${source}`);
    return;
  }

  console.log(`Found ${items.length} dead_letter items for ${source}:`);
  const byError: Record<string, number> = {};
  for (const item of items) {
    const key = item.error_log?.slice(0, 80) ?? 'unknown';
    byError[key] = (byError[key] ?? 0) + 1;
  }
  for (const [err, count] of Object.entries(byError)) {
    console.log(`  ${count}× ${err}`);
  }

  const { error: updateErr } = await supa
    .from('ingestion_queue')
    .update({
      status: 'queued',
      attempts: 0,
      next_attempt_at: new Date().toISOString(),
      error_log: null,
      updated_at: new Date().toISOString(),
    })
    .eq('status', 'dead_letter')
    .eq('source', source);

  if (updateErr) {
    console.error('Error resetting items:', updateErr.message);
    process.exit(1);
  }

  console.log(`\nReset ${items.length} items to queued status.`);
  console.log(`Run dispatcher to re-process: npx tsx scripts/ingest/dispatch.ts`);
}

main().catch(e => { console.error(e); process.exit(1); });
