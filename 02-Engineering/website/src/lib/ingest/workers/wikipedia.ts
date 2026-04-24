import type { Worker, QueueItem, WorkerResult } from '../_types';
export const wikipediaWorker: Worker = {
  source: 'wikipedia',
  async execute(_item: QueueItem): Promise<WorkerResult> {
    return { ok: false, error: 'wikipedia worker not implemented (Sprint 4)', retryable: false };
  },
};
