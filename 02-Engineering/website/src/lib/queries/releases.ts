import { supabase } from '@/lib/supabase';
import type { Release } from '@/lib/database.types';

/**
 * Get all releases for a given person (by person UUID).
 * Joins people(stage_name, slug) via primary_artist_id.
 */
export async function getReleasesByPerson(personId: string): Promise<Release[]> {
  try {
    const { data, error } = await supabase
      .from('releases')
      .select('*, people:primary_artist_id(stage_name, slug)')
      .eq('primary_artist_id', personId)
      .eq('visibility', 'public')
      .is('deleted_at', null)
      .order('released_date', { ascending: false });

    if (error) {
      console.error('[getReleasesByPerson] Supabase error:', error.message);
      return [];
    }

    return (data ?? []) as Release[];
  } catch (err) {
    console.error('[getReleasesByPerson] Unexpected error:', err);
    return [];
  }
}
