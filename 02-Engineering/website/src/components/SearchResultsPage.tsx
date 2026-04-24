'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import type { SearchResult } from '@/lib/queries/search';

interface SearchResultsPageProps {
  query?: string;
  results?: SearchResult[];
}

type TabKey = 'all' | 'artists' | 'releases' | 'articles' | 'events';

function viewToHref(view: string, slug: string): string {
  if (view.startsWith('artist:')) return `/artists/${slug}`;
  if (view.startsWith('release:')) return `/releases/${slug}`;
  if (view.startsWith('article:')) return `/articles/${slug}`;
  if (view.startsWith('city:')) return `/cities/${slug}`;
  return `/${slug}`;
}

export default function SearchResultsPage({ query = '', results = [] }: SearchResultsPageProps) {
  const router = useRouter();
  const [q, setQ] = useState(query);
  const [tab, setTab] = useState<TabKey>('all');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = q.trim();
    if (trimmed.length >= 2) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  const artists = results.filter((r) => r.kind === 'ARTIST' || r.kind === 'PRODUCER');
  const releases = results.filter((r) => r.kind === 'RELEASE');
  const total = results.length;

  return (
    <main className="dm-search">
      <section className="dm-search-head">
        <div className="dm-search-eyebrow">BÚSQUEDA</div>
        <form className="dm-search-bar-big" onSubmit={onSubmit}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Busca artistas, lanzamientos, eventos, ciudades…"
            autoFocus
          />
          <span className="dm-search-count">{total} resultados</span>
        </form>

        <div className="dm-search-tabs">
          {([
            ['all', `TODO · ${total}`],
            ['artists', `ARTISTAS · ${artists.length}`],
            ['releases', `LANZAMIENTOS · ${releases.length}`],
          ] as Array<[TabKey, string]>).map(([k, l]) => (
            <button
              key={k}
              className={`dm-search-tab${tab === k ? ' active' : ''}`}
              onClick={() => setTab(k)}
            >
              {l}
            </button>
          ))}
        </div>
      </section>

      <section className="dm-search-body">
        {(tab === 'all' || tab === 'artists') && artists.length > 0 && (
          <div className="dm-search-group">
            <div className="dm-section-eyebrow">ARTISTAS</div>
            <div className="dm-search-grid">
              {artists.map((a, i) => (
                <Link
                  key={i}
                  href={viewToHref(a.view, a.slug)}
                  className="dm-search-card"
                >
                  <div
                    className="dm-search-cover"
                    style={{ background: 'linear-gradient(135deg,#3a1f5c,#8a2c4d)' }}
                  >
                    {a.name[0]}
                  </div>
                  <div>
                    <div className="dm-search-title">{a.name}</div>
                    <div className="dm-search-meta">{a.kind} · {a.subtitle}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {(tab === 'all' || tab === 'releases') && releases.length > 0 && (
          <div className="dm-search-group">
            <div className="dm-section-eyebrow">LANZAMIENTOS</div>
            <div className="dm-search-grid">
              {releases.map((r, i) => (
                <Link
                  key={i}
                  href={viewToHref(r.view, r.slug)}
                  className="dm-search-card"
                >
                  <div
                    className="dm-search-cover"
                    style={{ background: 'linear-gradient(135deg,#1a1a2e,#4a0e2e)' }}
                  >
                    ♪
                  </div>
                  <div>
                    <div className="dm-search-title">{r.name}</div>
                    <div className="dm-search-meta">{r.subtitle}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {total === 0 && query && (
          <div className="dm-empty">
            <div className="dm-empty-big">Sin resultados</div>
            <p>
              No encontramos nada para &ldquo;<b>{query}</b>&rdquo;. ¿Quieres{' '}
              <Link href="/auth">aportar al archivo</Link>?
            </p>
          </div>
        )}

        {!query && (
          <div className="dm-empty">
            <div className="dm-empty-big">Escribe para buscar</div>
            <p>Ingresa un término en la barra de búsqueda.</p>
          </div>
        )}
      </section>
    </main>
  );
}
