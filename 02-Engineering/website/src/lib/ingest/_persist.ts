import { createClient } from '@supabase/supabase-js';

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function persistRawResponse(opts: {
  source: string;
  url?: string;
  body: unknown;
  status_code?: number;
  queue_item_id?: string;
}): Promise<void> {
  try {
    const supa = getServiceClient();
    await supa.from('raw_responses').insert({
      source: opts.source,
      url: opts.url,
      body: opts.body as any,
      status_code: opts.status_code ?? 200,
      queue_item_id: opts.queue_item_id ?? null,
    });
  } catch {
    // Persistence failure must never crash the main flow
  }
}
