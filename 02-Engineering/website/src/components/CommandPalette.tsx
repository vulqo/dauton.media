'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { globalSearch } from '@/lib/queries/search';
import type { SearchResult } from '@/lib/queries/search';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const STATIC_RESULTS: (SearchResult & { v?: boolean })[] = [
  { kind: 'ARTIST',   name: 'Canserbero', subtitle: 'Maracay · VE',      slug: 'canserbero', view: 'artist:canserbero',  v: true  },
  { kind: 'RELEASE',  name: 'Apocalipsis', subtitle: '2012 · Canserbero', slug: 'apocalipsis', view: 'release:apocalipsis', v: false },
  { kind: 'ARTIST',   name: 'Apache',      subtitle: 'Maracay · VE',      slug: 'apache',      view: 'artist:apache',      v: true  },
  { kind: 'ARTIST',   name: 'Lil Supa',   subtitle: 'Caracas · VE',       slug: 'lil-supa',    view: 'artist:lil-supa',    v: false },
  { kind: 'PRODUCER', name: 'Oldtape',    subtitle: 'Caracas · VE',       slug: 'oldtape',     view: 'artist:oldtape',     v: false },
];

function viewToHref(view: string, slug: string): string {
  if (view.startsWith('artist:'))  return `/artists/${slug}`;
  if (view.startsWith('release:')) return `/releases/${slug}`;
  if (view.startsWith('article:')) return `/articles/${slug}`;
  if (view.startsWith('city:'))    return `/cities/${slug}`;
  return `/${slug}`;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [liveResults, setLiveResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) {
      setQ('');
      setLiveResults([]);
      setLoading(false);
    }
  }, [open]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.length < 2) {
      setLiveResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const results = await globalSearch(q);
      setLiveResults(results);
      setLoading(false);
    }, 250);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [q]);

  const handleResultClick = (r: SearchResult) => {
    router.push(viewToHref(r.view, r.slug));
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) {
      router.push(`/search?q=${encodeURIComponent(q.trim())}`);
      onClose();
    }
  };

  if (!open) return null;

  const useStatic = q.length < 2;
  const displayResults = useStatic ? STATIC_RESULTS : liveResults;

  return (
    <div className="dm-cmd-overlay" onClick={onClose}>
      <div className="dm-cmd" onClick={(e) => e.stopPropagation()}>
        <form className="dm-cmd-input-row" onSubmit={handleSubmit}>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search artist, release, producer, city…"
          />
          <span className="dm-kbd">ESC</span>
        </form>
        <div className="dm-cmd-results">
          {loading && <div className="dm-cmd-empty">Searching…</div>}
          {!loading && displayResults.length === 0 && q.length >= 2 && (
            <div className="dm-cmd-empty">No results for &ldquo;{q}&rdquo;</div>
          )}
          {!loading && displayResults.map((r, i) => {
            const v = (r as SearchResult & { v?: boolean }).v;
            return (
              <a key={i} className="dm-cmd-row" onClick={() => handleResultClick(r)}>
                <span className="dm-tag-teal">{r.kind}</span>
                <span className="dm-cmd-name">
                  {r.name}{v && <span className="dm-verified"> ✓</span>}
                </span>
                <span className="dm-cmd-city">{r.subtitle}</span>
                <span className="dm-cmd-arrow">→</span>
              </a>
            );
          })}
        </div>
        <div className="dm-cmd-foot">
          <span><span className="dm-kbd">↑↓</span> navigate</span>
          <span><span className="dm-kbd">↵</span> open</span>
          <span><span className="dm-kbd">ESC</span> close</span>
        </div>
      </div>
    </div>
  );
}
