export type MBArtist = {
  id: string;                    // MBID (UUID)
  name: string;
  country?: string;
  gender?: 'male' | 'female' | 'other' | 'not applicable';
  'life-span'?: {
    begin?: string;
    end?: string;
    ended?: boolean;
  };
  aliases?: Array<{ name: string; locale?: string; primary?: boolean }>;
};

export type MBRelation = {
  type: string;
  direction: 'backward' | 'forward';
  artist?: { id: string; name: string };
  url?: { resource: string };
  work?: { id: string; title: string };
  attributes?: string[];
};

export type MBArtistFull = MBArtist & {
  relations?: MBRelation[];
  'release-groups'?: Array<{
    id: string;
    title: string;
    'first-release-date'?: string;
    'primary-type'?: string;
  }>;
};

export type MBRecording = {
  id: string;
  title: string;
  length?: number;
  isrcs?: string[];
  relations?: MBRelation[];
};

export type MBReleaseGroupTrack = {
  id: string;
  number: string;
  title: string;
  length?: number;
  recording: { id: string; title: string; length?: number };
};

export type MBReleaseGroup = {
  id: string;
  title: string;
  'first-release-date'?: string;
  'primary-type'?: string;
  releases?: Array<{
    id: string;
    title: string;
    media?: Array<{
      'track-count': number;
      tracks?: MBReleaseGroupTrack[];
    }>;
  }>;
};

export type MBSearchArtistResult = {
  id: string;
  name: string;
  score: number;
  country?: string;
};

export type MBUrlResolveResponse = {
  relations?: Array<{
    type: string;
    'target-type'?: string;
    artist?: { id: string; name: string };
    'release-group'?: { id: string; title: string };
  }>;
};
