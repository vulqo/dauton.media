import type { WikiSummary, WikiCrossPlatformIds, SparqlBinding } from './wikipedia.types';
import { persistRawResponse } from '../_persist';

let lastCallAt = 0;
const MIN_SPACING_MS = 500;

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

function getUserAgent(): string {
  return process.env.MUSICBRAINZ_USER_AGENT ?? 'DautonMedia/0.1 (luis@shocompanies.com)';
}

async function wikiFetch<T>(url: string): Promise<T | null> {
  await respectSpacing();

  const res = await withTimeout(
    fetch(url, { headers: { 'User-Agent': getUserAgent(), 'Accept': 'application/json' } }),
    10_000,
    `wiki fetch ${url}`
  );

  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Wikipedia error: ${res.status} ${body.slice(0, 200)}`);
  }

  return withTimeout(res.json() as Promise<T>, 10_000, 'wiki res.json');
}

type WikiPageSummaryResponse = {
  title: string;
  extract: string;
  thumbnail?: { source: string };
  content_urls?: { desktop?: { page: string } };
};

export async function wikiGetSummary(
  title: string,
  lang: 'es' | 'en' = 'es'
): Promise<WikiSummary | null> {
  const encoded = encodeURIComponent(title.replace(/ /g, '_'));
  const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encoded}`;

  let data: WikiPageSummaryResponse | null;
  try {
    data = await wikiFetch<WikiPageSummaryResponse>(url);
  } catch (e) {
    if (lang === 'es') {
      // Fallback to English
      return wikiGetSummary(title, 'en');
    }
    throw e;
  }

  if (!data) {
    if (lang === 'es') return wikiGetSummary(title, 'en');
    return null;
  }

  await persistRawResponse({
    source: 'wikipedia',
    url,
    body: data as unknown,
    status_code: 200,
  });

  return {
    title: data.title,
    extract: data.extract,
    thumbnail_url: data.thumbnail?.source,
    page_url: data.content_urls?.desktop?.page ?? `https://${lang}.wikipedia.org/wiki/${encoded}`,
    language: lang,
  };
}

export async function wikiSparql(query: string): Promise<SparqlBinding[]> {
  await respectSpacing();

  const encoded = encodeURIComponent(query);
  const url = `https://query.wikidata.org/sparql?query=${encoded}&format=json`;

  const res = await withTimeout(
    fetch(url, { headers: { 'User-Agent': getUserAgent(), 'Accept': 'application/sparql-results+json' } }),
    15_000,
    'sparql fetch'
  );

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Wikidata SPARQL error: ${res.status} ${body.slice(0, 200)}`);
  }

  const data = await withTimeout(res.json() as Promise<{ results: { bindings: SparqlBinding[] } }>, 10_000, 'sparql json');

  await persistRawResponse({
    source: 'wikipedia',
    url: `sparql:${query.slice(0, 120)}`,
    body: data as unknown,
    status_code: 200,
  });

  return data.results.bindings;
}

export async function wikiGetCrossPlatformIds(wikidataQid: string): Promise<WikiCrossPlatformIds> {
  // Wikidata property IDs:
  //   P1902 Spotify artist ID
  //   P434  MusicBrainz artist ID
  //   P2850 Apple Music artist ID
  //   P2397 YouTube channel ID
  //   P1953 Discogs artist ID
  const query = `
    SELECT ?spotify ?mb ?apple ?yt ?discogs WHERE {
      OPTIONAL { wd:${wikidataQid} wdt:P1902 ?spotify . }
      OPTIONAL { wd:${wikidataQid} wdt:P434  ?mb . }
      OPTIONAL { wd:${wikidataQid} wdt:P2850 ?apple . }
      OPTIONAL { wd:${wikidataQid} wdt:P2397 ?yt . }
      OPTIONAL { wd:${wikidataQid} wdt:P1953 ?discogs . }
    } LIMIT 1
  `.trim();

  const bindings = await wikiSparql(query);
  const b = bindings[0] ?? {};

  return {
    spotify_id: b.spotify?.value,
    musicbrainz_id: b.mb?.value,
    apple_music_id: b.apple?.value,
    youtube_channel_id: b.yt?.value,
    discogs_id: b.discogs?.value,
  };
}

export const wikipediaClient = {
  getSummary: wikiGetSummary,
  sparql: wikiSparql,
  getCrossPlatformIds: wikiGetCrossPlatformIds,
};
