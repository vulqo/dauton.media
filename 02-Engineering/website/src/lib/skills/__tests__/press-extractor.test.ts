import { describe, it, expect } from 'vitest';
import { extractPress } from '../press-extractor';
import { MockCaller } from '../_shared';

describe('press-extractor', () => {
  it('placeholder test — implementation pending', async () => {
    const result = await extractPress(
      { url: 'https://example.com/article', raw_html: '<p>content</p>', subject_stage_name: 'Canserbero' },
      new MockCaller(JSON.stringify({ title: 'Test', author_name: null, published_date: null, excerpt: null, prominence: 'mentioned', quote_es: null, confidence: 0.5 }))
    );
    expect(result.success).toBe(true);
  });
});
