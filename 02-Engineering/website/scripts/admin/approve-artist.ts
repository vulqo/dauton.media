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
  const arg = process.argv[2];
  const makePublic = process.argv.includes('--public');

  if (!arg) {
    console.error('Usage: npx tsx scripts/admin/approve-artist.ts <slug-or-stage-name> [--public]');
    process.exit(1);
  }

  // Try slug first, then stage_name
  const { data: person } = await supa
    .from('people')
    .select('id, slug, stage_name, visibility')
    .or(`slug.eq.${arg},stage_name.ilike.${arg}`)
    .single();

  if (!person) {
    console.error(`Person not found: "${arg}"`);
    process.exit(1);
  }

  console.log(`Found: ${person.stage_name} (${person.slug}) — current visibility: ${person.visibility}`);

  if (makePublic) {
    await supa.from('people').update({ visibility: 'public', updated_at: new Date().toISOString() }).eq('id', person.id);
    await supa.from('edit_history').insert({
      entity_type: 'person',
      entity_id: person.id,
      field_name: 'visibility',
      previous_value: person.visibility,
      new_value: 'public',
      edit_reason: 'admin approval via CLI',
    });
    console.log(`${person.stage_name} visibility set to 'public'`);
  } else {
    console.log('Pass --public to update visibility. No changes made.');
  }
}

main().catch(e => { console.error(e); process.exit(1); });
