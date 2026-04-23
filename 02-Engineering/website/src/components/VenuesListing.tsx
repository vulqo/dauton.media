'use client';
import { useState } from 'react';

type Venue = {
  rank: number;
  name: string;
  type: string;
  location: string;
  score: number;
  delta: number | null;
  tags: string[];
  events: number;
  followers: string;
  filterKey: string;
};

const venues: Venue[] = [
  {
    rank: 1,
    name: 'La Poltrona',
    type: 'CLUB · VENUE',
    location: 'Chacao, Caracas',
    score: 8.7,
    delta: 2,
    tags: ['HIP-HOP', 'RAP', 'CLUB NIGHT'],
    events: 18,
    followers: '19K',
    filterKey: 'club',
  },
  {
    rank: 2,
    name: 'Teatro Teresa Carreño',
    type: 'VENUE CULTURAL',
    location: 'Parque Central, Caracas',
    score: 9.1,
    delta: null,
    tags: ['TEATRO', 'CONCIERTOS', 'SHOWCASES'],
    events: 6,
    followers: '42K',
    filterKey: 'cultural',
  },
  {
    rank: 3,
    name: 'Estudio Guerrilla',
    type: 'ESTUDIO',
    location: 'La Vega, Caracas',
    score: 8.5,
    delta: 1,
    tags: ['GRABACIÓN', 'MIX', 'MASTER'],
    events: 0,
    followers: '8K',
    filterKey: 'estudio',
  },
  {
    rank: 4,
    name: 'Plaza Brión',
    type: 'VENUE CULTURAL',
    location: 'Chacaíto, Caracas',
    score: 7.9,
    delta: null,
    tags: ['CYPHERS', 'FREE', 'HISTÓRICO'],
    events: 12,
    followers: '5K',
    filterKey: 'cultural',
  },
  {
    rank: 5,
    name: 'Bar El Maní',
    type: 'BAR',
    location: 'Las Mercedes, Caracas',
    score: 7.4,
    delta: -1,
    tags: ['BAR', 'OPEN MIC', 'JAZZ/HIP-HOP'],
    events: 8,
    followers: '3K',
    filterKey: 'bar',
  },
  {
    rank: 6,
    name: 'Festival Hip-Hop Vzla',
    type: 'FESTIVAL',
    location: 'Poliedro de Caracas',
    score: 8.2,
    delta: null,
    tags: ['FESTIVAL', 'ANUAL', 'OUTDOOR'],
    events: 1,
    followers: '27K',
    filterKey: 'festival',
  },
  {
    rank: 7,
    name: 'Centro Cultural Chacao',
    type: 'VENUE CULTURAL',
    location: 'Chacao, Caracas',
    score: 7.8,
    delta: null,
    tags: ['CULTURAL', 'EVENTOS', 'TEATRO'],
    events: 4,
    followers: '11K',
    filterKey: 'cultural',
  },
  {
    rank: 8,
    name: 'Estudio Vega',
    type: 'ESTUDIO',
    location: 'La Vega, Caracas',
    score: 8.1,
    delta: null,
    tags: ['MIX/MASTER', 'PRODUCCIÓN'],
    events: 0,
    followers: '6K',
    filterKey: 'estudio',
  },
];

const filters = [
  { k: 'todos', label: 'TODOS' },
  { k: 'club', label: 'CLUB' },
  { k: 'estudio', label: 'ESTUDIO' },
  { k: 'cultural', label: 'VENUE CULTURAL' },
  { k: 'festival', label: 'FESTIVAL' },
  { k: 'bar', label: 'BAR' },
];

export default function VenuesListing({ go }: { go: (view: string) => void }) {
  const [activeFilter, setActiveFilter] = useState('todos');

  const filtered = activeFilter === 'todos' ? venues : venues.filter(v => v.filterKey === activeFilter);

  return (
    <main style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px 120px' }}>
      <div className="dm-crumb">
        <a onClick={() => go('home')}>ARCHIVO</a><span>/</span>
        <span className="dm-crumb-cur">VENUES</span>
      </div>

      <div style={{ marginBottom: 32 }}>
        <div className="dm-entity-kind">VENUES · RANKING</div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-.02em', margin: '8px 0 4px' }}>
          Venues Ranking
        </h1>
        <p style={{ opacity: .6, fontSize: 14, maxWidth: 540 }}>
          Ranked by community score. Updated monthly based on reviews, activity, and programming quality.
        </p>
      </div>

      {/* FILTERS */}
      <div className="dm-venues-filters">
        {filters.map(f => (
          <button
            key={f.k}
            className={`dm-dir-chip ${activeFilter === f.k ? 'is-on' : ''}`}
            onClick={() => setActiveFilter(f.k)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="dm-venues-list">
        {filtered.map((v, i) => (
          <a key={v.rank} className="dm-venue-row" onClick={() => go('venue')} style={{ cursor: 'pointer' }}>

            {/* RANK */}
            <div className={`dm-venue-rank ${v.rank <= 3 ? 'is-top' : ''}`}>
              <span>{v.rank}</span>
              {v.delta !== null && (
                <div
                  className="dm-venue-rank-delta"
                  style={{ color: v.delta > 0 ? '#4caf50' : v.delta < 0 ? '#f44336' : 'var(--fg-2)' }}
                >
                  {v.delta > 0 ? `+${v.delta}` : v.delta < 0 ? `${v.delta}` : '—'}
                </div>
              )}
              {v.delta === null && <div className="dm-venue-rank-delta" style={{ color: 'var(--fg-2)' }}>—</div>}
            </div>

            {/* THUMBNAIL */}
            <div
              className="dm-venue-thumb"
              style={{ background: `hsl(${v.name.charCodeAt(0) * 23 % 360},30%,18%)` }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: .5, fontWeight: 700 }}>
                {v.name.split(' ').map(w => w[0]).join('').slice(0, 3)}
              </span>
            </div>

            {/* MAIN INFO */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="dm-venue-row-name">{v.name}</div>
              <div className="dm-venue-row-meta">
                <span>{v.type}</span>
                <span>·</span>
                <span>{v.location}</span>
                {v.events > 0 && (
                  <>
                    <span>·</span>
                    <span>{v.events} events this month</span>
                  </>
                )}
              </div>
              <div className="dm-venue-row-tags">
                {v.tags.map((t, j) => (
                  <span key={j} className="dm-venue-row-tag">{t}</span>
                ))}
              </div>
            </div>

            {/* STATS */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
              <div className="dm-venue-row-score">{v.score}</div>
              <div className="dm-venue-row-stat">
                <span style={{ opacity: .5, fontSize: 10, fontFamily: 'var(--font-mono)' }}>FOLLOWERS</span>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{v.followers}</span>
              </div>
            </div>

          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: '48px 0', textAlign: 'center', opacity: .4, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.1em' }}>
          NO VENUES IN THIS CATEGORY YET
        </div>
      )}
    </main>
  );
}
