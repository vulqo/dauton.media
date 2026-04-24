import type { Worker, QueueItem, WorkerResult } from '../_types';
export const firecrawlWorker: Worker = {
  source: 'firecrawl',
  async execute(_item: QueueItem): Promise<WorkerResult> {
    return { ok: false, error: 'firecrawl worker not implemented (Sprint 4)', retryable: false };
  },
};
