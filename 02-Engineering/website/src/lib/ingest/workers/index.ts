import type { Worker, QueueSource } from '../_types';
import { spotifyWorker } from './spotify';
import { musicbrainzWorker } from './musicbrainz';
import { youtubeWorker } from './youtube';
import { geniusWorker } from './genius';
import { braveWorker } from './brave';
import { firecrawlWorker } from './firecrawl';
import { wikipediaWorker } from './wikipedia';

const WORKERS: Record<QueueSource, Worker> = {
  spotify:      spotifyWorker,
  musicbrainz:  musicbrainzWorker,
  youtube:      youtubeWorker,
  genius:       geniusWorker,
  brave:        braveWorker,
  firecrawl:    firecrawlWorker,
  wikipedia:    wikipediaWorker,
  whisper:      { source: 'whisper', async execute() { return { ok: false, error: 'not implemented', retryable: false }; } },
};

export function getWorker(source: string): Worker {
  const worker = WORKERS[source as QueueSource];
  if (!worker) throw new Error(`No worker registered for source: ${source}`);
  return worker;
}
