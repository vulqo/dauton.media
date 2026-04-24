import type { Worker, QueueItem, WorkerResult } from '../_types';
export const youtubeWorker: Worker = {
  source: 'youtube',
  async execute(_item: QueueItem): Promise<WorkerResult> {
    return { ok: false, error: 'youtube worker not implemented (Sprint 4)', retryable: false };
  },
};
