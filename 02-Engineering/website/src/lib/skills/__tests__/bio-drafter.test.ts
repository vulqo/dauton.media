import { describe, it, expect } from 'vitest';
import { draftBio } from '../bio-drafter';
import { MockCaller } from '../_shared';

describe('bio-drafter', () => {
  it('returns valid BioDrafterOutput from mock caller', async () => {
    const mockResponse = JSON.stringify({
      bio_short: 'MC venezolano de Maracay. Figura central del rap de los 2000s.',
      claims_used: ['Maracay origin', 'active 2000s'],
      confidence: 0.9,
    });
    const result = await draftBio(
      {
        stage_name: 'Canserbero',
        wikipedia_summary: 'Tyrone José González Oramas, conocido artísticamente como Canserbero...',
        spotify_genres: ['rap venezolano', 'boom bap'],
        active_since: '2006',
        active_until: '2015',
        top_collaborators: ['Akapellah', 'Apache'],
      },
      new MockCaller(mockResponse)
    );
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.bio_short.length).toBeGreaterThan(10);
      expect(result.data.confidence).toBeGreaterThan(0);
    }
  });

  it('returns failure when JSON is invalid', async () => {
    const result = await draftBio(
      { stage_name: 'Test', wikipedia_summary: null, spotify_genres: [], active_since: null, active_until: null, top_collaborators: [] },
      new MockCaller('not valid json at all')
    );
    expect(result.success).toBe(false);
  });
});
