#!/usr/bin/env -S npx tsx
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env.local') });

import { runDispatcher } from '../../src/lib/ingest/queue/dispatcher';

const maxItems = Number(process.env.MAX_ITEMS ?? 20);
const sources = process.env.SOURCES?.split(',').filter(Boolean);

console.log(`[dispatch] maxItems=${maxItems} sources=${sources?.join(',') ?? 'all'}`);

runDispatcher({ maxItems, sources })
  .then((r) => { console.log('[dispatch] done:', JSON.stringify(r, null, 2)); })
  .catch((e) => { console.error('[dispatch] error:', e); process.exit(1); });
