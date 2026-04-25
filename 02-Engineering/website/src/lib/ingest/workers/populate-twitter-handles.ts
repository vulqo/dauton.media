/**
 * Populate twitter_handle for people that have it NULL.
 *
 * Tier 1 — Wikidata SPARQL (P2002 Twitter username): rich source when the
 *   artist already has a Wikidata QID stored in `people.wikidata_id`.
 * Tier 2 — MusicBrainz URL relations: filters `social network` / `official
 *   homepage` rels for twitter.com / x.com hostnames.
 * Tier 3 — skipped (Spotify bio scraping needs user-OAuth, deferred).
 *
 * Rate limits:
 *   - Wikidata SPARQL: respects WikipediaClient spacing (500 ms).
 *   - MusicBrainz:    1 req/s (1100 ms spacing in MB client).
 */

import { createClient } from '@supabase/supabase-js';
import { wikiSparql } from '../clients/wikipedia';
import { mbGetArtist, MBRateLimitError } from '../clients/musicbrainz';

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const RESERVED_HANDLES = new Set([
  'home', 'i', 'login', 'signup', 'search', 'explore',
  'notifications', 'messages', 'compose', 'settings', 'about', 'tos',
]);

/** Extract a Twitter handle from a URL like twitter.com/<handle> or x.com/<handle>. */
export function extractTwitterHandle(url: string): string | null {
  const match = url.match(/(?:twitter\.com|x\.com)\/([a-zA-Z0-9_]+)/);
  if (!match) return null;
  const handle = match[1];
  if (RESERVED_HANDLES.has(handle.toLowerCase())) return null;
  return handle;
}

interface PersonRow {
  id: string;
  slug: string;
  stage_name: string;
  wikidata_id: string | null;
  musicbrainz_id: string | null;
  is_pillar: boolean | null;
}

export async function populateTwitterHandles(opts: {
  personId?: string;
  limit?: number;
  dryRun?: boolean;
} = {}): Promise<{ scanned: number; tier1Hits: number; tier2Hits: number; updated: number }> {
  const supa = getServiceClient();

  let query = supa
    .from('people')
    .select('id, slug, stage_name, wikidata_id, musicbrainz_id, is_pillar')
    .is('twitter_handle', null)
    .order('is_pillar', { ascending: false })
    .order('stage_name', { ascending: true });

  if (opts.personId) query = query.eq('id', opts.personId);
  if (opts.limit) query = query.limit(opts.limit);

  const { data: peopleRaw, error } = await query;
  if (error) throw new Error(`Fetch people: ${error.message}`);
  const people = (peopleRaw ?? []) as PersonRow[];

  let tier1Hits = 0;
  let tier2Hits = 0;
  let updated = 0;

  for (const p of people) {
    let handle: string | null = null;
    let tier: 'wikidata' | 'mb' | null = null;

    // Tier 1: Wikidata
    if (p.wikidata_id) {
      try {
        const bindings = await wikiSparql(
          `SELECT ?twitter WHERE { wd:${p.wikidata_id} wdt:P2002 ?twitter . } LIMIT 1`
        );
        const raw = bindings[0]?.twitter?.value;
        if (raw) {
          handle = raw.replace(/^@/, '').trim();
          tier = 'wikidata';
          tier1Hits++;
        }
      } catch (e) {
        console.warn(`[twitter-handle] Wikidata SPARQL failed for ${p.stage_name}: ${(e as Error).message}`);
      }
    }

    // Tier 2: MusicBrainz URL relations
    if (!handle && p.musicbrainz_id) {
      try {
        const artist = await mbGetArtist(p.musicbrainz_id, ['url-rels']);
        for (const rel of artist.relations ?? []) {
          if (rel.type !== 'social network' && rel.type !== 'official homepage') continue;
          const url = rel.url?.resource;
          if (!url) continue;
          const h = extractTwitterHandle(url);
          if (h) {
            handle = h;
            tier = 'mb';
            tier2Hits++;
            break;
          }
        }
      } catch (e) {
        if (e instanceof MBRateLimitError) {
          console.error(`[twitter-handle] MB rate limit — stopping run. Retry after ${e.retryAfterSeconds}s`);
          break;
        }
        console.warn(`[twitter-handle] MB lookup failed for ${p.stage_name}: ${(e as Error).message}`);
      }
    }

    if (handle) {
      console.log(`✓ ${p.stage_name} → @${handle} (${tier})`);
      if (!opts.dryRun) {
        const { error: upErr } = await supa.from('people').update({
          twitter_handle: handle,
          updated_at: new Date().toISOString(),
        }).eq('id', p.id);
        if (upErr) {
          console.warn(`  update failed: ${upErr.message}`);
        } else {
          updated++;
        }
      }
    } else {
      const reason = !p.wikidata_id && !p.musicbrainz_id ? 'no IDs'
        : !p.wikidata_id ? 'no wikidata_id'
        : 'no source found';
      console.log(`✗ ${p.stage_name} (${reason})`);
    }
  }

  return {
    scanned: people.length,
    tier1Hits,
    tier2Hits,
    updated,
  };
}
