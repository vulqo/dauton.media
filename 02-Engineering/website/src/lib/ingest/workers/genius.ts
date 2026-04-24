import type { Worker, QueueItem, WorkerResult } from '../_types';
export const geniusWorker: Worker = {
  source: 'genius',
  async execute(_item: QueueItem): Promise<WorkerResult> {
    return { ok: false, error: 'genius worker not implemented (Sprint 4)', retryable: false };
  },
};
