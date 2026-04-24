import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

interface PlaylistEntry {
  id: string;
  name: string;
  mvp_priority: 'critical' | 'high' | 'medium' | 'low' | 'out-of-scope';
  estimated_artists?: number;
}

interface PlaylistsFile {
  playlists?: PlaylistEntry[];
  // Also support root array format
  [key: string]: unknown;
}

function loadPlaylists(): PlaylistEntry[] {
  // Candidate paths relative to cwd (run from website/ dir)
  const candidates = [
    path.join(process.cwd(), '..', '..', '05-Data', 'seed', 'spotify-playlists.json'),
    path.join(process.cwd(), '..', '..', '..', '05-Data', 'seed', 'spotify-playlists.json'),
    path.join(process.cwd(), '05-Data', 'seed', 'spotify-playlists.json'),
  ];

  for (const p of candidates) {
    if (fs.existsSync(p)) {
      const raw = JSON.parse(fs.readFileSync(p, 'utf-8')) as PlaylistsFile | PlaylistEntry[];
      console.log(`Loaded playlists from ${p}`);
      // Support both root-array and { playlists: [] } formats
      if (Array.isArray(raw)) return raw as PlaylistEntry[];
      if (raw.playlists && Array.isArray(raw.playlists)) return raw.playlists as PlaylistEntry[];
    }
  }

  throw new Error('Could not find spotify-playlists.json. Check 05-Data/seed/');
}

export async function runStage1Bootstrap(opts: {
  dryRun?: boolean;
  includeRelated?: boolean;
} = {}): Promise<{
  playlistsScanned: number;
  candidatesQueued: number;
  existingPillarsResolved: number;
}> {
  const { dryRun = false, includeRelated = true } = opts;
  const supa = getServiceClient();

  const playlists = loadPlaylists();
  const priorityPlaylists = playlists.filter(p =>
    ['critical', 'high'].includes(p.mvp_priority)
  );

  console.log(`Found ${priorityPlaylists.length} critical/high priority playlists out of ${playlists.length} total`);

  if (dryRun) {
    console.log('[DRY RUN] Would queue these playlists:');
    priorityPlaylists.forEach(p => console.log(`  - ${p.name} (${p.id})`));
    return { playlistsScanned: 0, candidatesQueued: 0, existingPillarsResolved: 0 };
  }

  // Log pipeline run start
  const { data: run } = await supa.from('pipeline_runs').insert({
    pipeline_id: 'P1-stage1-bootstrap',
    trigger_source: 'manual',
  }).select().single();

  let candidatesQueued = 0;

  // Queue fetch_playlist_artists for each priority playlist
  for (const playlist of priorityPlaylists) {
    const { error } = await supa.from('ingestion_queue').insert({
      entity_type: 'person',
      entity_ref: playlist.id,
      source: 'spotify',
      operation: 'fetch_playlist_artists',
      priority: playlist.mvp_priority === 'critical' ? 9 : 7,
      payload: { playlist_id: playlist.id, playlist_name: playlist.name },
    });

    if (!error) {
      candidatesQueued++;
      console.log(`Queued playlist: ${playlist.name} (${playlist.id})`);
    } else {
      console.error(`Failed to queue playlist ${playlist.name}:`, error.message);
    }
  }

  // Check pillars resolution
  const { count: unresolvedPillars } = await supa
    .from('people')
    .select('*', { count: 'exact', head: true })
    .is('spotify_id', null)
    .eq('visibility', 'public');

  const { count: totalPillars } = await supa
    .from('people')
    .select('*', { count: 'exact', head: true })
    .eq('visibility', 'public');

  const resolvedPillars = (totalPillars ?? 0) - (unresolvedPillars ?? 0);

  // If includeRelated, queue related_artists for pillars that already have spotify_id
  if (includeRelated) {
    const { data: pillarsWithSpotify } = await supa
      .from('people')
      .select('id, stage_name, spotify_id')
      .eq('visibility', 'public')
      .not('spotify_id', 'is', null);

    for (const pillar of pillarsWithSpotify ?? []) {
      await supa.from('ingestion_queue').insert({
        entity_type: 'person',
        entity_ref: pillar.id,
        source: 'spotify',
        operation: 'fetch_related_artists',
        priority: 5,
        payload: { spotify_id: pillar.spotify_id },
      });
    }
    console.log(`Queued ${pillarsWithSpotify?.length ?? 0} related-artist expansions for existing pillars`);
  }

  // Update pipeline run
  if (run?.id) {
    await supa.from('pipeline_runs').update({
      status: 'success',
      ended_at: new Date().toISOString(),
      entities_created: candidatesQueued,
    }).eq('id', run.id);
  }

  return {
    playlistsScanned: priorityPlaylists.length,
    candidatesQueued,
    existingPillarsResolved: resolvedPillars,
  };
}
