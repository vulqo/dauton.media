import type { Worker, QueueItem, WorkerResult } from '../_types';
export const musicbrainzWorker: Worker = {
  source: 'musicbrainz',
  async execute(_item: QueueItem): Promise<WorkerResult> {
    return { ok: false, error: 'musicbrainz worker not implemented (Sprint 4)', retryable: false };
  },
};
