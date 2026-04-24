import type { GeniusSearchHit, GeniusSong, GeniusArtist } from './genius.types';
import { persistRawResponse } from '../_persist';

let lastCallAt = 0;
const MIN_SPACING_MS = 200;

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${ms}ms: ${label}`)), ms)
    ),
  ]);
}

async function respectSpacing() {
  const elapsed = Date.now() - lastCallAt;
  if (elapsed < MIN_SPACING_MS) {
    await new Promise(r => setTimeout(r, MIN_SPACING_MS - elapsed));
  }
  lastCallAt = Date.now();
}

async function geniusFetch<T>(path: string): Promise<T | null> {
  await respectSpacing();

  const token = process.env.GENIUS_CLIENT_ACCESS_TOKEN;
  if (!token) throw new Error('Missing GENIUS_CLIENT_ACCESS_TOKEN');

  const url = path.startsWith('http') ? path : `https://api.genius.com${path}`;

  const res = await withTimeout(
    fetch(url, { headers: { 'Authorization': `Bearer ${token}` } }),
    10_000,
    `genius fetch ${path}`
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Genius error: ${res.status} ${body.slice(0, 200)}`);
  }

  const data = await withTimeout(res.json() as Promise<{ response: T }>, 10_000, 'genius json');

  await persistRawResponse({
    source: 'genius',
    url: path,
    body: data as unknown,
    status_code: 200,
  });

  return data.response;
}

export async function geniusSearch(query: string, perPage = 10): Promise<GeniusSearchHit[]> {
  const encoded = encodeURIComponent(query);
  const data = await geniusFetch<{ hits: Array<{ result: GeniusSearchHit }> }>(
    `/search?q=${encoded}&per_page=${perPage}`
  );
  return (data?.hits ?? []).map(h => h.result);
}

export async function geniusGetSong(id: number): Promise<GeniusSong | null> {
  const data = await geniusFetch<{ song: GeniusSong }>(`/songs/${id}`);
  return data?.song ?? null;
}

export async function geniusGetArtist(id: number): Promise<GeniusArtist | null> {
  const data = await geniusFetch<{ artist: GeniusArtist }>(`/artists/${id}`);
  return data?.artist ?? null;
}

export async function geniusGetArtistSongs(
  artistId: number,
  opts: { page?: number; perPage?: number; sort?: 'popularity' | 'title' } = {}
): Promise<{ songs: Array<{ id: number; title: string }>; next_page: number | null }> {
  const params = new URLSearchParams({
    page: String(opts.page ?? 1),
    per_page: String(opts.perPage ?? 20),
    sort: opts.sort ?? 'popularity',
  });
  const data = await geniusFetch<{ songs: Array<{ id: number; title: string }>; next_page: number | null }>(
    `/artists/${artistId}/songs?${params}`
  );
  return {
    songs: data?.songs ?? [],
    next_page: data?.next_page ?? null,
  };
}

export const geniusClient = {
  search: geniusSearch,
  getSong: geniusGetSong,
  getArtist: geniusGetArtist,
  getArtistSongs: geniusGetArtistSongs,
};
