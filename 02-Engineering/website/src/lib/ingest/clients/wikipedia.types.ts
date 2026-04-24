export type WikiSummary = {
  title: string;
  extract: string;
  thumbnail_url?: string;
  page_url: string;
  language: 'es' | 'en';
};

export type WikiCrossPlatformIds = {
  spotify_id?: string;
  musicbrainz_id?: string;
  apple_music_id?: string;
  youtube_channel_id?: string;
  discogs_id?: string;
};

export type SparqlBinding = Record<string, { type: string; value: string }>;
