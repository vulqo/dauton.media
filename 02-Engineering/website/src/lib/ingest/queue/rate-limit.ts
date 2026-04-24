import { createClient } from '@supabase/supabase-js';

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function checkBudgetOrBlock(source: string): Promise<{ ok: boolean; reason?: string }> {
  try {
    const supa = getServiceClient();
    const { data } = await supa
      .from('ingestion_rate_limits')
      .select('*')
      .eq('source', source)
      .single();

    if (!data) return { ok: true }; // unknown source, allow

    if (data.circuit_state === 'open') {
      const openedAt = new Date(data.circuit_opened_at).getTime();
      const cooldownMs = 5 * 60 * 1000; // 5 min cooldown
      if (Date.now() - openedAt < cooldownMs) {
        return { ok: false, reason: `circuit open for ${source}` };
      }
      // Half-open: allow one through
      await supa.from('ingestion_rate_limits').update({ circuit_state: 'half_open' }).eq('source', source);
    }

    // Per-minute check
    if (data.requests_per_minute) {
      const windowStart = new Date(data.window_minute_start).getTime();
      const now = Date.now();
      if (now - windowStart > 60_000) {
        // Reset window
        await supa.from('ingestion_rate_limits').update({
          requests_used_current_min: 0,
          window_minute_start: new Date().toISOString(),
        }).eq('source', source);
      } else if (data.requests_used_current_min >= data.requests_per_minute) {
        return { ok: false, reason: `per-minute limit reached for ${source}` };
      }
    }

    // Per-day check
    if (data.requests_per_day) {
      const dayStart = new Date(data.window_day_start).getTime();
      const now = Date.now();
      if (now - dayStart > 86_400_000) {
        await supa.from('ingestion_rate_limits').update({
          requests_used_today: 0,
          window_day_start: new Date().toISOString(),
        }).eq('source', source);
      } else if (data.requests_used_today >= data.requests_per_day) {
        return { ok: false, reason: `per-day limit reached for ${source}` };
      }
    }

    return { ok: true };
  } catch {
    return { ok: true }; // fail open on DB error
  }
}

export async function consumeBudget(source: string): Promise<void> {
  try {
    const supa = getServiceClient();
    await supa.rpc('increment_rate_limit_counters', { p_source: source });
  } catch {
    // Non-fatal
  }
}

export async function recordFailure(source: string): Promise<void> {
  try {
    const supa = getServiceClient();
    const { data } = await supa
      .from('ingestion_rate_limits')
      .select('consecutive_failures, circuit_state')
      .eq('source', source)
      .single();

    if (!data) return;

    const newFailures = (data.consecutive_failures ?? 0) + 1;
    const shouldOpen = newFailures >= 5;

    await supa.from('ingestion_rate_limits').update({
      consecutive_failures: newFailures,
      circuit_state: shouldOpen ? 'open' : data.circuit_state,
      circuit_opened_at: shouldOpen ? new Date().toISOString() : undefined,
      updated_at: new Date().toISOString(),
    }).eq('source', source);
  } catch {
    // Non-fatal
  }
}

export async function recordSuccess(source: string): Promise<void> {
  try {
    const supa = getServiceClient();
    await supa.from('ingestion_rate_limits').update({
      consecutive_failures: 0,
      circuit_state: 'closed',
      updated_at: new Date().toISOString(),
    }).eq('source', source);
  } catch {
    // Non-fatal
  }
}
