import Link from 'next/link';
import { globalSearch } from '@/lib/queries/search';

export const metadata = {
  title: 'Search — Dauton Media',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';
  const results = query.length >= 2 ? await globalSearch(query) : [];

  const viewToHref = (view: string, slug: string) => {
    if (view.startsWith('artist:')) return `/artists/${slug}`;
    if (view.startsWith('release:')) return `/releases/${slug}`;
    if (view.startsWith('article:')) return `/articles/${slug}`;
    if (view.startsWith('city:')) return `/cities/${slug}`;
    return `/${slug}`;
  };

  return (
    <main className="dm-home">
      <section className="dm-section" style={{ paddingTop: 48 }}>
        <div className="dm-section-head">
          <div>
            <div className="dm-section-eyebrow">SEARCH RESULTS</div>
            <h1 className="dm-section-title">
              {query ? `"${query}"` : 'Search'}
            </h1>
          </div>
        </div>

        {!query && (
          <p style={{ color: 'var(--fg-3)' }}>Enter a search term in the search bar above.</p>
        )}

        {query && results.length === 0 && (
          <p style={{ color: 'var(--fg-3)' }}>No results for &ldquo;{query}&rdquo;.</p>
        )}

        {results.length > 0 && (
          <div className="dm-artist-list">
            {results.map((r, i) => (
              <Link
                key={i}
                href={viewToHref(r.view, r.slug)}
                className="dm-artist-row"
              >
                <span className="dm-tag-teal">{r.kind}</span>
                <span className="dm-artist-name">{r.name}</span>
                <span className="dm-artist-city">{r.subtitle}</span>
                <span className="dm-cmd-arrow">→</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
