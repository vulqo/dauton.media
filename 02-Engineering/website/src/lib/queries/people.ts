import { supabase } from '@/lib/supabase';
import type { Person } from '@/lib/database.types';

export interface GetPeopleOptions {
  limit?: number;
  city_slug?: string;
  role?: string;
}

/**
 * Get all public people (for listings, homepage).
 * Joins cities(name, slug) via origin_city_id.
 */
export async function getPeople(options: GetPeopleOptions = {}): Promise<Person[]> {
  const { limit = 50, city_slug, role } = options;

  try {
    let query = supabase
      .from('people')
      .select('*, cities:origin_city_id(name, slug)')
      .eq('visibility', 'public')
      .is('deleted_at', null)
      .order('stage_name', { ascending: true })
      .limit(limit);

    if (city_slug) {
      // Filter by city requires a sub-select approach — filter on joined city slug
      const { data: cityData } = await supabase
        .from('cities')
        .select('id')
        .eq('slug', city_slug)
        .single();
      if (cityData) {
        query = query.eq('origin_city_id', cityData.id);
      }
    }

    if (role) {
      const { data: rolePersonIds } = await supabase
        .from('people_roles')
        .select('person_id')
        .eq('role_type', role);
      if (rolePersonIds && rolePersonIds.length > 0) {
        query = query.in('id', rolePersonIds.map((r) => r.person_id));
      } else {
        return [];
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error('[getPeople] Supabase error:', error.message);
      return [];
    }

    return (data ?? []) as Person[];
  } catch (err) {
    console.error('[getPeople] Unexpected error:', err);
    return [];
  }
}

/**
 * Get a single person by slug, joined with cities(name, slug).
 */
export async function getPersonBySlug(slug: string): Promise<Person | null> {
  try {
    const { data, error } = await supabase
      .from('people')
      .select('*, cities:origin_city_id(name, slug)')
      .eq('slug', slug)
      .eq('visibility', 'public')
      .is('deleted_at', null)
      .single();

    if (error) {
      console.error('[getPersonBySlug] Supabase error:', error.message);
      return null;
    }

    return data as Person | null;
  } catch (err) {
    console.error('[getPersonBySlug] Unexpected error:', err);
    return null;
  }
}

/**
 * Search people by name using ilike.
 */
export async function searchPeople(q: string, limit = 10): Promise<Person[]> {
  try {
    const { data, error } = await supabase
      .from('people')
      .select('*, cities:origin_city_id(name, slug)')
      .ilike('stage_name', `%${q}%`)
      .eq('visibility', 'public')
      .is('deleted_at', null)
      .order('stage_name', { ascending: true })
      .limit(limit);

    if (error) {
      console.error('[searchPeople] Supabase error:', error.message);
      return [];
    }

    return (data ?? []) as Person[];
  } catch (err) {
    console.error('[searchPeople] Unexpected error:', err);
    return [];
  }
}
