export type QueueSource =
  | 'spotify' | 'musicbrainz' | 'youtube' | 'genius'
  | 'brave' | 'firecrawl' | 'wikipedia' | 'whisper';

export type QueueItem = {
  id: string;
  entity_type: 'person' | 'release' | 'track' | 'article' | 'video';
  entity_ref: string;
  source: QueueSource;
  operation: string;
  priority: number;
  payload: Record<string, unknown>;
  attempts: number;
  max_attempts: number;
};

export type WorkerResult =
  | { ok: true; created: number; updated: number; next_items?: Partial<QueueItem>[] }
  | { ok: false; error: string; retryable: boolean };

export interface Worker {
  source: QueueSource;
  execute(item: QueueItem): Promise<WorkerResult>;
}

export type RateLimitState = {
  source: QueueSource;
  requests_per_minute: number | null;
  requests_per_day: number | null;
  requests_used_current_min: number;
  requests_used_today: number;
  circuit_state: 'closed' | 'half_open' | 'open';
};
