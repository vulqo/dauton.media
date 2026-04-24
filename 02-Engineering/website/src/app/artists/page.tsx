import Link from 'next/link';
import { getPeople } from '@/lib/queries/people';
import type { Person } from '@/lib/database.types';

export const metadata = {
  title: 'Artists — Dauton Media',
  description: 'Directory of Venezuelan rap artists, MCs, DJs, and producers.',
};

export default async function ArtistsPage() {
  const people = await getPeople();

  return (
    <main className="dm-home">
      <section className="dm-section" style={{ paddingTop: 48 }}>
        <div className="dm-section-head">
          <div>
            <div className="dm-section-eyebrow">DIRECTORIO</div>
            <h1 className="dm-section-title">Artists</h1>
          </div>
        </div>
        <div className="dm-grid-4">
          {people.map((p: Person) => {
            const cityData = p.cities as { name: string; slug: string } | null;
            const subtitle = cityData ? `${cityData.name.toUpperCase()} · VE` : 'VENEZUELA';
            return (
              <Link
                key={p.slug}
                href={`/artists/${p.slug}`}
                className="dm-dir-tile"
                style={{ '--dm-tile-tint': '#D93D4A' } as React.CSSProperties}
              >
                <div className="dm-dir-tile-arr">↗</div>
                <div>
                  <div className="dm-dir-tile-head">{p.stage_name}</div>
                  {p.status === 'deceased' && (
                    <div className="dm-dir-tile-num" style={{ color: '#D93D4A', fontSize: 11 }}>IN MEMORIAM</div>
                  )}
                </div>
                <div>
                  <div className="dm-dir-tile-lbl">{subtitle}</div>
                  <div className="dm-dir-tile-sub">
                    {p.verified ? 'VERIFIED · ' : ''}{p.active_since?.slice(0, 4) ?? ''}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
