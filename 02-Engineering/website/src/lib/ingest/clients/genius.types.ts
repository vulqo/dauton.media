export type GeniusArtistRef = {
  id: number;
  name: string;
};

export type GeniusSearchHit = {
  id: number;
  title: string;
  full_title: string;
  url: string;
  primary_artist: GeniusArtistRef;
};

export type GeniusSongRelationship = {
  relationship_type: string;
  songs: Array<{ id: number; title: string; primary_artist: GeniusArtistRef }>;
};

export type GeniusSong = {
  id: number;
  title: string;
  url: string;
  release_date_for_display?: string;
  primary_artist: GeniusArtistRef;
  producer_artists: GeniusArtistRef[];
  writer_artists: GeniusArtistRef[];
  featured_artists: GeniusArtistRef[];
  song_relationships: GeniusSongRelationship[];
};

export type GeniusArtist = {
  id: number;
  name: string;
  alternate_names: string[];
  instagram_name?: string;
  twitter_name?: string;
  facebook_name?: string;
  url: string;
};
