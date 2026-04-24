import type { Worker, QueueItem, WorkerResult } from '../_types';
export const braveWorker: Worker = {
  source: 'brave',
  async execute(_item: QueueItem): Promise<WorkerResult> {
    return { ok: false, error: 'brave worker not implemented (Sprint 4)', retryable: false };
  },
};
