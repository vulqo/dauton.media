export function exponentialBackoff(attempts: number, baseMs = 1000, maxMs = 300_000): number {
  const delay = Math.min(baseMs * Math.pow(2, attempts), maxMs);
  const jitter = Math.random() * delay * 0.1;
  return Math.floor(delay + jitter);
}

export function nextAttemptAt(attempts: number): Date {
  const delayMs = exponentialBackoff(attempts);
  return new Date(Date.now() + delayMs);
}
