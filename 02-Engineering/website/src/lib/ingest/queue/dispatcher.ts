import { createClient } from '@supabase/supabase-js';
import type { QueueItem } from '../_types';
import { getWorker } from '../workers';
import { checkBudgetOrBlock } from './rate-limit';
import { nextAttemptAt } from './backoff';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function runDispatcher(opts: { maxItems?: number; sources?: string[] } = {}) {
  const supa = getSupabase();
  const startedAt = Date.now();

  let query = supa
    .from('ingestion_queue')
    .select('*')
    .in('status', ['queued'])
    .lte('next_attempt_at', new Date().toISOString())
    .order('priority', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(opts.maxItems ?? 20);

  if (opts.sources?.length) {
    query = query.in('source', opts.sources);
  }

  const { data: items, error } = await query;
  if (error) throw new Error(`Queue fetch failed: ${error.message}`);

  const results = { processed: 0, succeeded: 0, failed: 0, skipped_rate_limit: 0 };

  for (const item of items ?? []) {
    const budget = await checkBudgetOrBlock(item.source);
    if (!budget.ok) { results.skipped_rate_limit++; continue; }

    await supa.from('ingestion_queue')
      .update({ status: 'in_flight', last_attempt_at: new Date().toISOString(), attempts: item.attempts + 1 })
      .eq('id', item.id);

    const worker = getWorker(item.source);
    try {
      const result = await worker.execute(item as QueueItem);
      if (result.ok) {
        await supa.from('ingestion_queue').update({ status: 'done', updated_at: new Date().toISOString() }).eq('id', item.id);
        results.succeeded++;
      } else {
        const willRetry = result.retryable && item.attempts < item.max_attempts;
        await supa.from('ingestion_queue').update({
          status: willRetry ? 'queued' : 'dead_letter',
          error_log: result.error,
          next_attempt_at: willRetry ? nextAttemptAt(item.attempts + 1).toISOString() : undefined,
          updated_at: new Date().toISOString(),
        }).eq('id', item.id);
        results.failed++;
      }
    } catch (e: any) {
      await supa.from('ingestion_queue').update({
        status: item.attempts >= item.max_attempts ? 'dead_letter' : 'queued',
        error_log: e.message,
        next_attempt_at: nextAttemptAt(item.attempts + 1).toISOString(),
        updated_at: new Date().toISOString(),
      }).eq('id', item.id);
      results.failed++;
    }
    results.processed++;
  }

  return { ...results, duration_ms: Date.now() - startedAt };
}
