export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  followers: { total: number };
  images: SpotifyImage[];
  external_urls: { spotify: string };
  uri: string;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  album_type: 'album' | 'single' | 'compilation';
  album_group?: 'album' | 'single' | 'compilation' | 'appears_on';
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  total_tracks: number;
  images: SpotifyImage[];
  artists: Array<{ id: string; name: string }>;
  external_urls: { spotify: string };
  label?: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  duration_ms: number;
  explicit: boolean;
  track_number: number;
  disc_number: number;
  isrc?: string;
  artists: Array<{ id: string; name: string }>;
  album?: SpotifyAlbum;
  external_urls: { spotify: string };
  uri: string;
}

export interface SpotifyPaginated<T> {
  items: T[];
  next: string | null;
  previous: string | null;
  total: number;
  limit: number;
  offset: number;
}

export interface SpotifyPlaylistTrack {
  track: SpotifyTrack | null;
  added_at: string | null;
}
