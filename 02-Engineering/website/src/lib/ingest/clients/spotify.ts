import type {
  SpotifyArtist, SpotifyAlbum, SpotifyTrack,
  SpotifyPaginated, SpotifyPlaylistTrack
} from './spotify.types';

export class RateLimitError extends Error {
  constructor(public retryAfterSeconds: number) {
    super(`Spotify rate limited. Retry after ${retryAfterSeconds}s`);
    this.name = 'RateLimitError';
  }
}

interface TokenCache {
  token: string;
  expiresAt: number; // ms timestamp
}

let tokenCache: TokenCache | null = null;

async function getSpotifyToken(): Promise<string> {
  const now = Date.now();
  // Refresh 5 minutes before expiry
  if (tokenCache && tokenCache.expiresAt - now > 5 * 60 * 1000) {
    return tokenCache.token;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error('Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET');

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) throw new Error(`Spotify auth failed: ${res.status} ${await res.text()}`);

  const data = await res.json() as { access_token: string; expires_in: number };
  tokenCache = {
    token: data.access_token,
    expiresAt: now + data.expires_in * 1000,
  };
  return tokenCache.token;
}

/** Hard timeout via Promise.race — works regardless of fetch implementation bugs. */
function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms: ${label}`)), ms)
    ),
  ]);
}

async function spotifyFetch<T>(url: string, maxRetries = 3): Promise<T> {
  let attempt = 0;
  const fullUrl = url.startsWith('http') ? url : `https://api.spotify.com/v1${url}`;

  while (attempt < maxRetries) {
    const token = await withTimeout(getSpotifyToken(), 10_000, 'getSpotifyToken');

    let res: Response;
    try {
      res = await withTimeout(
        fetch(fullUrl, { headers: { 'Authorization': `Bearer ${token}` } }),
        12_000,
        `fetch ${url}`
      );
    } catch (e: any) {
      if (String(e.message).startsWith('Timeout')) {
        if (attempt >= maxRetries - 1) throw e;
        attempt++;
        continue;
      }
      throw e;
    }

    if (res.status === 429) {
      const retryAfter = parseInt(res.headers.get('Retry-After') ?? '5', 10);
      if (attempt >= 2) throw new RateLimitError(retryAfter);
      await new Promise(r => setTimeout(r, Math.min(retryAfter, 30) * 1000));
      attempt++;
      continue;
    }

    if (res.status >= 500) {
      if (attempt >= 2) throw new Error(`Spotify 5xx: ${res.status}`);
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
      attempt++;
      continue;
    }

    if (!res.ok) {
      const body = await withTimeout(res.text(), 5_000, 'res.text on error').catch(() => '');
      throw new Error(`Spotify error: ${res.status} ${body}`);
    }

    return withTimeout(res.json() as Promise<T>, 10_000, 'res.json');
  }
  throw new Error('Max retries exceeded');
}

export async function getSpotifyArtist(spotifyId: string): Promise<SpotifyArtist> {
  return spotifyFetch<SpotifyArtist>(`/artists/${spotifyId}`);
}

export async function searchSpotifyArtist(q: string, limit = 10): Promise<SpotifyArtist[]> {
  const params = new URLSearchParams({ q, type: 'artist', limit: String(limit) });
  const res = await spotifyFetch<{ artists: SpotifyPaginated<SpotifyArtist> }>(`/search?${params}`);
  return res.artists.items;
}

export async function getArtistAlbums(
  spotifyId: string,
  opts: { include_groups?: string[]; limit?: number; offset?: number; market?: string } = {}
): Promise<SpotifyPaginated<SpotifyAlbum>> {
  const params = new URLSearchParams({
    include_groups: (opts.include_groups ?? ['album', 'single']).join(','),
    limit: String(opts.limit ?? 50),
    offset: String(opts.offset ?? 0),
    market: opts.market ?? 'ES',
  });
  return spotifyFetch<SpotifyPaginated<SpotifyAlbum>>(`/artists/${spotifyId}/albums?${params}`);
}

export async function* getAllArtistAlbums(spotifyId: string): AsyncGenerator<SpotifyAlbum> {
  let offset = 0;
  while (true) {
    const page = await getArtistAlbums(spotifyId, { limit: 50, offset });
    for (const album of page.items) yield album;
    if (!page.next) break;
    offset += 50;
  }
}

export async function getAlbumTracks(
  albumId: string,
  opts: { limit?: number; offset?: number } = {}
): Promise<SpotifyPaginated<SpotifyTrack>> {
  const params = new URLSearchParams({
    limit: String(opts.limit ?? 50),
    offset: String(opts.offset ?? 0),
  });
  return spotifyFetch<SpotifyPaginated<SpotifyTrack>>(`/albums/${albumId}/tracks?${params}`);
}

export async function getSpotifyTrack(trackId: string): Promise<SpotifyTrack> {
  return spotifyFetch<SpotifyTrack>(`/tracks/${trackId}`);
}

export async function getRelatedArtists(spotifyId: string): Promise<SpotifyArtist[]> {
  const res = await spotifyFetch<{ artists: SpotifyArtist[] }>(`/artists/${spotifyId}/related-artists`);
  return res.artists;
}

export async function getPlaylistTracks(
  playlistId: string,
  opts: { limit?: number; offset?: number } = {}
): Promise<SpotifyPaginated<SpotifyPlaylistTrack>> {
  const params = new URLSearchParams({
    fields: 'items(track(id,name,artists,duration_ms,explicit)),next,total,limit,offset',
    limit: String(opts.limit ?? 100),
    offset: String(opts.offset ?? 0),
  });
  return spotifyFetch<SpotifyPaginated<SpotifyPlaylistTrack>>(`/playlists/${playlistId}/tracks?${params}`);
}

export async function* getAllPlaylistTracks(playlistId: string): AsyncGenerator<SpotifyTrack> {
  let offset = 0;
  while (true) {
    const page = await getPlaylistTracks(playlistId, { limit: 100, offset });
    for (const item of page.items) {
      if (item.track) yield item.track;
    }
    if (!page.next) break;
    offset += 100;
  }
}

// Named export for the whole client as an object (for compatibility)
export const spotifyClient = {
  getArtist: getSpotifyArtist,
  searchArtist: searchSpotifyArtist,
  getArtistAlbums,
  getAllArtistAlbums,
  getAlbumTracks,
  getTrack: getSpotifyTrack,
  getRelatedArtists,
  getPlaylistTracks,
  getAllPlaylistTracks,
};
