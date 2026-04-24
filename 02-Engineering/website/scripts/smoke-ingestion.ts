import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { createClient } from '@supabase/supabase-js';

const supa = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  const { data: item, error: ie } = await supa
    .from('ingestion_queue')
    .insert({
      entity_type: 'person',
      entity_ref: 'smoke-test',
      source: 'spotify',
      operation: 'fetch_artist',
      priority: 10,
      payload: { stage_name: 'Smoke Test' },
    })
    .select()
    .single();
  if (ie) throw new Error(`Insert failed: ${ie.message}`);
  console.log('✓ inserted queue item', item.id);

  const { data: read } = await supa
    .from('ingestion_queue')
    .select('*')
    .eq('id', item.id)
    .single();
  console.log('✓ read back:', read?.status, read?.source);

  await supa.from('ingestion_queue').delete().eq('id', item.id);
  console.log('✓ cleanup');

  const { count } = await supa
    .from('ingestion_rate_limits')
    .select('source', { count: 'exact' });
  console.log(`✓ rate_limits seeded: ${count} rows`);

  console.log('\nSmoke test passed.');
}

main().catch((e) => { console.error(e); process.exit(1); });
