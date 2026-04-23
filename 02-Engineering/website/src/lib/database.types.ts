export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      countries: {
        Row: {
          id: string
          code_iso_2: string
          code_iso_3: string
          name_es: string
          name_en: string
        }
        Insert: {
          id?: string
          code_iso_2: string
          code_iso_3: string
          name_es: string
          name_en: string
        }
        Update: {
          id?: string
          code_iso_2?: string
          code_iso_3?: string
          name_es?: string
          name_en?: string
        }
      }
      cities: {
        Row: {
          id: string
          slug: string
          name: string
          country_id: string
          region: string | null
          lat: number | null
          lng: number | null
          population: number | null
          description_es: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          country_id: string
          region?: string | null
          lat?: number | null
          lng?: number | null
          population?: number | null
          description_es?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          country_id?: string
          region?: string | null
          lat?: number | null
          lng?: number | null
          population?: number | null
          description_es?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      genres: {
        Row: {
          id: string
          slug: string
          name: string
          parent_genre_id: string | null
          description_es: string | null
        }
        Insert: {
          id?: string
          slug: string
          name: string
          parent_genre_id?: string | null
          description_es?: string | null
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          parent_genre_id?: string | null
          description_es?: string | null
        }
      }
      people: {
        Row: {
          id: string
          slug: string
          stage_name: string
          legal_name: string | null
          aliases: string[]
          birth_date: string | null
          birth_date_precision: string | null
          death_date: string | null
          origin_city_id: string | null
          current_city_id: string | null
          bio_short: string | null
          bio_long: string | null
          photo_url: string | null
          photo_credit: string | null
          is_venezuelan: boolean
          is_peripheral: boolean
          active_since: string | null
          active_until: string | null
          status: string
          verified: boolean
          claimed_by_user_id: string | null
          completeness_score: number
          visibility: string
          spotify_id: string | null
          apple_music_id: string | null
          genius_id: string | null
          musicbrainz_id: string | null
          youtube_channel_id: string | null
          instagram_handle: string | null
          twitter_handle: string | null
          tiktok_handle: string | null
          website_url: string | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          slug: string
          stage_name: string
          legal_name?: string | null
          aliases?: string[]
          birth_date?: string | null
          birth_date_precision?: string | null
          death_date?: string | null
          origin_city_id?: string | null
          current_city_id?: string | null
          bio_short?: string | null
          bio_long?: string | null
          photo_url?: string | null
          photo_credit?: string | null
          is_venezuelan?: boolean
          is_peripheral?: boolean
          active_since?: string | null
          active_until?: string | null
          status?: string
          verified?: boolean
          claimed_by_user_id?: string | null
          completeness_score?: number
          visibility?: string
          spotify_id?: string | null
          apple_music_id?: string | null
          genius_id?: string | null
          musicbrainz_id?: string | null
          youtube_channel_id?: string | null
          instagram_handle?: string | null
          twitter_handle?: string | null
          tiktok_handle?: string | null
          website_url?: string | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          slug?: string
          stage_name?: string
          legal_name?: string | null
          aliases?: string[]
          birth_date?: string | null
          birth_date_precision?: string | null
          death_date?: string | null
          origin_city_id?: string | null
          current_city_id?: string | null
          bio_short?: string | null
          bio_long?: string | null
          photo_url?: string | null
          photo_credit?: string | null
          is_venezuelan?: boolean
          is_peripheral?: boolean
          active_since?: string | null
          active_until?: string | null
          status?: string
          verified?: boolean
          claimed_by_user_id?: string | null
          completeness_score?: number
          visibility?: string
          spotify_id?: string | null
          apple_music_id?: string | null
          genius_id?: string | null
          musicbrainz_id?: string | null
          youtube_channel_id?: string | null
          instagram_handle?: string | null
          twitter_handle?: string | null
          tiktok_handle?: string | null
          website_url?: string | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      people_roles: {
        Row: {
          id: string
          person_id: string
          role_type: string
          is_primary: boolean
        }
        Insert: {
          id?: string
          person_id: string
          role_type: string
          is_primary?: boolean
        }
        Update: {
          id?: string
          person_id?: string
          role_type?: string
          is_primary?: boolean
        }
      }
      releases: {
        Row: {
          id: string
          slug: string
          title: string
          primary_artist_id: string
          release_type: string
          released_date: string | null
          released_date_precision: string | null
          label_id: string | null
          total_tracks: number | null
          duration_seconds: number | null
          cover_url: string | null
          spotify_id: string | null
          apple_music_id: string | null
          musicbrainz_id: string | null
          discogs_id: string | null
          youtube_url: string | null
          description_es: string | null
          completeness_score: number
          visibility: string
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          slug: string
          title: string
          primary_artist_id: string
          release_type: string
          released_date?: string | null
          released_date_precision?: string | null
          label_id?: string | null
          total_tracks?: number | null
          duration_seconds?: number | null
          cover_url?: string | null
          spotify_id?: string | null
          apple_music_id?: string | null
          musicbrainz_id?: string | null
          discogs_id?: string | null
          youtube_url?: string | null
          description_es?: string | null
          completeness_score?: number
          visibility?: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          primary_artist_id?: string
          release_type?: string
          released_date?: string | null
          released_date_precision?: string | null
          label_id?: string | null
          total_tracks?: number | null
          duration_seconds?: number | null
          cover_url?: string | null
          spotify_id?: string | null
          apple_music_id?: string | null
          musicbrainz_id?: string | null
          discogs_id?: string | null
          youtube_url?: string | null
          description_es?: string | null
          completeness_score?: number
          visibility?: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      tracks: {
        Row: {
          id: string
          slug: string
          title: string
          release_id: string | null
          track_number: number | null
          duration_seconds: number | null
          isrc: string | null
          spotify_id: string | null
          apple_music_id: string | null
          genius_id: string | null
          youtube_url: string | null
          has_lyrics_external_link: string | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          slug: string
          title: string
          release_id?: string | null
          track_number?: number | null
          duration_seconds?: number | null
          isrc?: string | null
          spotify_id?: string | null
          apple_music_id?: string | null
          genius_id?: string | null
          youtube_url?: string | null
          has_lyrics_external_link?: string | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          release_id?: string | null
          track_number?: number | null
          duration_seconds?: number | null
          isrc?: string | null
          spotify_id?: string | null
          apple_music_id?: string | null
          genius_id?: string | null
          youtube_url?: string | null
          has_lyrics_external_link?: string | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      crews: {
        Row: {
          id: string
          slug: string
          name: string
          type: string
          origin_city_id: string | null
          founded_date: string | null
          dissolved_date: string | null
          description_es: string | null
          logo_url: string | null
          completeness_score: number
          visibility: string
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          slug: string
          name: string
          type?: string
          origin_city_id?: string | null
          founded_date?: string | null
          dissolved_date?: string | null
          description_es?: string | null
          logo_url?: string | null
          completeness_score?: number
          visibility?: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          type?: string
          origin_city_id?: string | null
          founded_date?: string | null
          dissolved_date?: string | null
          description_es?: string | null
          logo_url?: string | null
          completeness_score?: number
          visibility?: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      labels: {
        Row: {
          id: string
          slug: string
          name: string
          country_id: string | null
          city_id: string | null
          founded_date: string | null
          dissolved_date: string | null
          type: string
          parent_label_id: string | null
          description_es: string | null
          logo_url: string | null
          website_url: string | null
          completeness_score: number
          visibility: string
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          slug: string
          name: string
          country_id?: string | null
          city_id?: string | null
          founded_date?: string | null
          dissolved_date?: string | null
          type?: string
          parent_label_id?: string | null
          description_es?: string | null
          logo_url?: string | null
          website_url?: string | null
          completeness_score?: number
          visibility?: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          country_id?: string | null
          city_id?: string | null
          founded_date?: string | null
          dissolved_date?: string | null
          type?: string
          parent_label_id?: string | null
          description_es?: string | null
          logo_url?: string | null
          website_url?: string | null
          completeness_score?: number
          visibility?: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      events: {
        Row: {
          id: string
          slug: string
          title: string
          description_es: string | null
          event_date: string | null
          event_date_precision: string | null
          event_type: string
          city_id: string | null
          venue_id: string | null
          source_ids: string[]
          visibility: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          description_es?: string | null
          event_date?: string | null
          event_date_precision?: string | null
          event_type: string
          city_id?: string | null
          venue_id?: string | null
          source_ids?: string[]
          visibility?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          description_es?: string | null
          event_date?: string | null
          event_date_precision?: string | null
          event_type?: string
          city_id?: string | null
          venue_id?: string | null
          source_ids?: string[]
          visibility?: string
          created_at?: string
          updated_at?: string
        }
      }
      collaborations: {
        Row: {
          id: string
          track_id: string | null
          release_id: string | null
          person_id: string
          role: string
          billing_order: number | null
          notes: string | null
          source_ids: string[]
        }
        Insert: {
          id?: string
          track_id?: string | null
          release_id?: string | null
          person_id: string
          role: string
          billing_order?: number | null
          notes?: string | null
          source_ids?: string[]
        }
        Update: {
          id?: string
          track_id?: string | null
          release_id?: string | null
          person_id?: string
          role?: string
          billing_order?: number | null
          notes?: string | null
          source_ids?: string[]
        }
      }
      production_credits: {
        Row: {
          id: string
          track_id: string | null
          release_id: string | null
          person_id: string
          role: string
          notes: string | null
          source_ids: string[]
        }
        Insert: {
          id?: string
          track_id?: string | null
          release_id?: string | null
          person_id: string
          role: string
          notes?: string | null
          source_ids?: string[]
        }
        Update: {
          id?: string
          track_id?: string | null
          release_id?: string | null
          person_id?: string
          role?: string
          notes?: string | null
          source_ids?: string[]
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Convenience row types
export type Country = Database['public']['Tables']['countries']['Row']
export type City = Database['public']['Tables']['cities']['Row']
export type Genre = Database['public']['Tables']['genres']['Row']
export type PersonRow = Database['public']['Tables']['people']['Row']
export type Person = PersonRow & {
  cities?: { name: string; slug: string } | null
}
export type PersonRole = Database['public']['Tables']['people_roles']['Row']
export type ReleaseRow = Database['public']['Tables']['releases']['Row']
export type Release = ReleaseRow & {
  people?: { stage_name: string; slug: string } | null
}
export type Track = Database['public']['Tables']['tracks']['Row']
export type Crew = Database['public']['Tables']['crews']['Row']
export type Label = Database['public']['Tables']['labels']['Row']
export type Event = Database['public']['Tables']['events']['Row']
export type Collaboration = Database['public']['Tables']['collaborations']['Row']
export type ProductionCredit = Database['public']['Tables']['production_credits']['Row']
