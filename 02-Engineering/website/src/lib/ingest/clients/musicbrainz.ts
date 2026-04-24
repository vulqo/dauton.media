import type {
  MBArtist, MBArtistFull, MBRecording, MBReleaseGroup, MBSearchArtistResult
} from './musicbrainz.types';

export class MBRateLimitError extends Error {
  constructor(public retryAfterSeconds: number) {
    super(`MusicBrainz rate limited. Retry after ${retryAfterSeconds}s`);
    this.name = 'MBRateLimitError';
  }
}

let lastCallAt = 0;
const MIN_SPACING_MS = 1100; // hard 1 req/s + margin

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms: ${label}`)), ms)
    ),
  ]);
}

async function respectSpacing(): Promise<void> {
  const elapsed = Date.now() - lastCallAt;
  if (elapsed < MIN_SPACING_MS) {
    await new Promise(r => setTimeout(r, MIN_SPACING_MS - elapsed));
  }
  lastCallAt = Date.now();
}

async function mbFetch<T>(path: string, maxRetries = 3): Promise<T> {
  const userAgent = process.env.MUSICBRAINZ_USER_AGENT ?? 'DautonMedia/0.1 (unknown)';
  const baseUrl = 'https://musicbrainz.org/ws/2';
  const hasFmt = /[?&]fmt=/.test(path);
  const url = path.startsWith('http')
    ? path
    : `${baseUrl}${path}${hasFmt ? '' : (path.includes('?') ? '&' : '?') + 'fmt=json'}`;

  let attempt = 0;
  while (attempt < maxRetries) {
    await respectSpacing();

    let res: Response;
    try {
      res = await withTimeout(
        fetch(url, { headers: { 'User-Agent': userAgent } }),
        10_000,
        `MB fetch ${path}`
      );
    } catch (e: any) {
      if (String(e.message).startsWith('Timeout')) {
        if (attempt >= maxRetries - 1) throw e;
        attempt++;
        continue;
      }
      throw e;
    }

    if (res.status === 503) {
      const retryAfter = parseInt(res.headers.get('Retry-After') ?? '5', 10);
      if (attempt >= 2) throw new MBRateLimitError(retryAfter);
      await new Promise(r => setTimeout(r, Math.min(retryAfter, 30) * 1000));
      attempt++;
      continue;
    }

    if (res.status === 429) {
      const retryAfter = parseInt(res.headers.get('Retry-After') ?? '10', 10);
      if (attempt >= 2) throw new MBRateLimitError(retryAfter);
      await new Promise(r => setTimeout(r, Math.min(retryAfter, 30) * 1000));
      attempt++;
      continue;
    }

    if (res.status === 404) {
      throw new Error(`MB 404: ${path}`);
    }

    if (!res.ok) {
      const body = await withTimeout(res.text(), 5_000, 'res.text on error').catch(() => '');
      throw new Error(`MB error: ${res.status} ${body}`);
    }

    return withTimeout(res.json() as Promise<T>, 10_000, 'res.json');
  }
  throw new Error('MB max retries exceeded');
}

export async function mbGetArtist(mbid: string, inc: string[] = []): Promise<MBArtistFull> {
  const incParam = inc.length > 0 ? `&inc=${inc.join('+')}` : '';
  return mbFetch<MBArtistFull>(`/artist/${mbid}?fmt=json${incParam}`);
}

export async function mbSearchArtist(
  name: string,
  opts: { country?: string; limit?: number } = {}
): Promise<MBSearchArtistResult[]> {
  const queryParts: string[] = [`artist:"${name}"`];
  if (opts.country) queryParts.push(`country:${opts.country}`);
  const query = encodeURIComponent(queryParts.join(' AND '));
  const limit = opts.limit ?? 10;
  const response = await mbFetch<{ artists?: MBSearchArtistResult[] }>(
    `/artist/?query=${query}&limit=${limit}`
  );
  return response.artists ?? [];
}

export async function mbResolveArtistByUrl(
  externalUrl: string
): Promise<{ mbid: string | null; artist?: MBArtist }> {
  const encoded = encodeURIComponent(externalUrl);
  try {
    const data = await mbFetch<{ relations?: Array<{ artist?: { id: string; name: string } }> }>(
      `/url/?resource=${encoded}&inc=artist-rels&fmt=json`
    );
    const rel = (data.relations ?? []).find(r => r.artist?.id);
    if (rel?.artist) {
      return { mbid: rel.artist.id, artist: { id: rel.artist.id, name: rel.artist.name } };
    }
  } catch (e: any) {
    if (String(e.message).includes('404')) return { mbid: null };
    throw e;
  }
  return { mbid: null };
}

export async function mbResolveReleaseGroupByUrl(
  externalUrl: string
): Promise<string | null> {
  const encoded = encodeURIComponent(externalUrl);
  try {
    const data = await mbFetch<{ relations?: Array<{ 'release-group'?: { id: string } }> }>(
      `/url/?resource=${encoded}&inc=release-group-rels&fmt=json`
    );
    const rel = (data.relations ?? []).find(r => r['release-group']?.id);
    return rel?.['release-group']?.id ?? null;
  } catch (e: any) {
    if (String(e.message).includes('404')) return null;
    throw e;
  }
}

export async function mbGetReleaseGroup(mbid: string, inc: string[] = []): Promise<MBReleaseGroup> {
  const incParam = inc.length > 0 ? `&inc=${inc.join('+')}` : '';
  return mbFetch<MBReleaseGroup>(`/release-group/${mbid}?fmt=json${incParam}`);
}

export async function mbGetRecording(mbid: string, inc: string[] = []): Promise<MBRecording> {
  const incParam = inc.length > 0 ? `&inc=${inc.join('+')}` : '';
  return mbFetch<MBRecording>(`/recording/${mbid}?fmt=json${incParam}`);
}

export const mbClient = {
  getArtist: mbGetArtist,
  searchArtist: mbSearchArtist,
  resolveArtistByUrl: mbResolveArtistByUrl,
  resolveReleaseGroupByUrl: mbResolveReleaseGroupByUrl,
  getReleaseGroup: mbGetReleaseGroup,
  getRecording: mbGetRecording,
};

export const RELATION_MAP: Record<string, { target: 'production_credits' | 'writing_credits' | 'collaborations' | 'skip'; role: string }> = {
  'producer':          { target: 'production_credits', role: 'producer' },
  'co-producer':       { target: 'production_credits', role: 'co-producer' },
  'recording engineer':{ target: 'production_credits', role: 'engineer' },
  'engineer':          { target: 'production_credits', role: 'engineer' },
  'mix':               { target: 'production_credits', role: 'mix' },
  'master':            { target: 'production_credits', role: 'master' },
  'mastering':         { target: 'production_credits', role: 'master' },
  'lyricist':          { target: 'writing_credits',    role: 'lyricist' },
  'composer':          { target: 'writing_credits',    role: 'composer' },
  'writer':            { target: 'writing_credits',    role: 'writer' },
  'vocal':             { target: 'collaborations',     role: 'feature' },
  'lead vocals':       { target: 'collaborations',     role: 'feature' },
  'featured artist':   { target: 'collaborations',     role: 'feature' },
  'member of band':    { target: 'skip',               role: 'band_member' },
};
