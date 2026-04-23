import { supabase } from '@/lib/supabase';

export interface SearchResult {
  kind: 'ARTIST' | 'PRODUCER' | 'RELEASE';
  name: string;
  subtitle: string;
  slug: string;
  view: string;
}

/**
 * Search people + releases by name/title (ilike).
 * Returns unified SearchResult array for the CommandPalette.
 */
export async function globalSearch(q: string): Promise<SearchResult[]> {
  try {
    const [peopleRes, releasesRes] = await Promise.all([
      supabase
        .from('people')
        .select('slug, stage_name, status, cities:origin_city_id(name, slug), people_roles(role_type, is_primary)')
        .ilike('stage_name', `%${q}%`)
        .eq('visibility', 'public')
        .is('deleted_at', null)
        .limit(8),
      supabase
        .from('releases')
        .select('slug, title, release_type, released_date, people:primary_artist_id(stage_name, slug)')
        .ilike('title', `%${q}%`)
        .eq('visibility', 'public')
        .is('deleted_at', null)
        .limit(5),
    ]);

    const results: SearchResult[] = [];

    if (!peopleRes.error && peopleRes.data) {
      for (const p of peopleRes.data) {
        const roles = (p.people_roles as { role_type: string; is_primary: boolean }[] | null) ?? [];
        const primaryRole = roles.find((r) => r.is_primary);
        const kind: 'ARTIST' | 'PRODUCER' =
          primaryRole?.role_type === 'producer' ? 'PRODUCER' : 'ARTIST';

        const cityData = p.cities as unknown as { name: string; slug: string } | null;
        const subtitle = cityData ? `${cityData.name.toUpperCase()} · VE` : 'VENEZUELA';

        results.push({
          kind,
          name: p.stage_name,
          subtitle,
          slug: p.slug,
          view: `artist:${p.slug}`,
        });
      }
    } else if (peopleRes.error) {
      console.error('[globalSearch] people error:', peopleRes.error.message);
    }

    if (!releasesRes.error && releasesRes.data) {
      for (const r of releasesRes.data) {
        const artistData = r.people as unknown as { stage_name: string; slug: string } | null;
        const year = r.released_date ? r.released_date.slice(0, 4) : '';
        const subtitle = [year, artistData?.stage_name].filter(Boolean).join(' · ');

        results.push({
          kind: 'RELEASE',
          name: r.title,
          subtitle: subtitle || r.release_type.toUpperCase(),
          slug: r.slug,
          view: `release:${r.slug}`,
        });
      }
    } else if (releasesRes.error) {
      console.error('[globalSearch] releases error:', releasesRes.error.message);
    }

    return results;
  } catch (err) {
    console.error('[globalSearch] Unexpected error:', err);
    return [];
  }
}
