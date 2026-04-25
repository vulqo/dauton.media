/**
 * Populate birth_date / death_date for people that have them NULL.
 *
 * Tier 2 only for now — Wikidata SPARQL (P569 birth, P570 death). Tier 1
 * (MusicBrainz `life-span`) requires people to have musicbrainz_id, which only
 * 2 of 81 do today; once MB IDs are populated more broadly, a Tier 1 fallback
 * via `mbGetArtist` can be added before the Wikidata call.
 *
 * Rate limits: Wikidata SPARQL with WikipediaClient spacing (500 ms).
 */

import { createClient } from '@supabase/supabase-js';
import { wikiSparql } from '../clients/wikipedia';

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

/** Parse a Wikidata literal like '+1988-08-11T00:00:00Z' or '+1988-00-00T00:00:00Z'. */
export function parseWikidataDate(raw: string): { date: string; precision: 'year' | 'month' | 'day' } | null {
  const match = raw.match(/^[+-]?(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  const [, year, month, day] = match;
  if (month === '00') return { date: `${year}-01-01`, precision: 'year' };
  if (day === '00')   return { date: `${year}-${month}-01`, precision: 'month' };
  return { date: `${year}-${month}-${day}`, precision: 'day' };
}

interface PersonRow {
  id: string;
  slug: string;
  stage_name: string;
  wikidata_id: string | null;
  is_pillar: boolean | null;
}

export async function populateBirthDates(opts: {
  limit?: number;
  dryRun?: boolean;
} = {}): Promise<{ scanned: number; tier2Hits: number; updated: number }> {
  const supa = getServiceClient();

  let query = supa
    .from('people')
    .select('id, slug, stage_name, wikidata_id, is_pillar')
    .is('birth_date', null)
    .order('is_pillar', { ascending: false });

  if (opts.limit) query = query.limit(opts.limit);

  const { data: peopleRaw, error } = await query;
  if (error) throw new Error(`Fetch people: ${error.message}`);
  const people = (peopleRaw ?? []) as PersonRow[];

  let tier2Hits = 0;
  let updated = 0;

  for (const p of people) {
    if (!p.wikidata_id) {
      console.log(`✗ ${p.stage_name} (no wikidata_id)`);
      continue;
    }

    try {
      const bindings = await wikiSparql(
        `SELECT ?birth ?death WHERE {
           OPTIONAL { wd:${p.wikidata_id} wdt:P569 ?birth . }
           OPTIONAL { wd:${p.wikidata_id} wdt:P570 ?death . }
         } LIMIT 1`
      );
      const b = bindings[0] ?? {};
      const birthRaw = b.birth?.value;
      const deathRaw = b.death?.value;
      if (!birthRaw && !deathRaw) {
        console.log(`✗ ${p.stage_name} (no birth/death in Wikidata)`);
        continue;
      }

      const updates: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (birthRaw) {
        const parsed = parseWikidataDate(birthRaw);
        if (parsed) {
          updates.birth_date = parsed.date;
          updates.birth_date_precision = parsed.precision;
          tier2Hits++;
        }
      }
      if (deathRaw) {
        const parsed = parseWikidataDate(deathRaw);
        if (parsed) {
          updates.death_date = parsed.date;
          updates.status = 'deceased';
        }
      }

      console.log(`✓ ${p.stage_name} → birth=${updates.birth_date ?? 'n/a'} death=${updates.death_date ?? 'n/a'}`);

      if (!opts.dryRun && Object.keys(updates).length > 1) {
        const { error: upErr } = await supa.from('people').update(updates).eq('id', p.id);
        if (upErr) {
          console.warn(`  update failed: ${upErr.message}`);
        } else {
          updated++;
        }
      }
    } catch (e) {
      console.warn(`[birth-date] error for ${p.stage_name}: ${(e as Error).message}`);
    }
  }

  return { scanned: people.length, tier2Hits, updated };
}
