'use client';
import React from 'react';
import Link from 'next/link';
import EntityCard from '@/components/EntityCard';
import type { Person } from '@/lib/database.types';

interface DirectoryEntry {
  k: string;
  head: string;
  num: string;
  lbl: string;
  sub: string;
  tint: string;
  href: string;
}

interface EventEntry {
  d: string;
  m: string;
  title: string;
  venue: string;
  city: string;
  color: string;
  ink?: boolean;
}

interface ArticleEntry {
  tag: string;
  title: string;
  author: string;
  min: string;
  date: string;
  cover: {
    bg: string;
    mono: string;
    ink: boolean;
  };
}

interface CityEntry {
  n: string;
  sub: string;
  a: number;
  r: number;
  e: number;
}

export default function HomePage({ people }: { people: Person[] }) {
  const DIRECTORY: DirectoryEntry[] = [
    { k: 'artist',    head: 'ARTISTS',       num: '342',  lbl: 'Directory',         sub: 'MCs, DJs, producers, photographers, venues, press.',         tint: '#D93D4A', href: '/artists' },
    { k: 'release',   head: 'RELEASES',      num: '1.2K', lbl: 'Musical archive',   sub: 'Albums, EPs, singles, mixtapes. 2003-today.',                tint: '#04756F', href: '#' },
    { k: 'event',     head: 'EVENTS',        num: '84',   lbl: 'Schedule & archive',sub: 'Upcoming shows + historical record with credits.',            tint: '#ffce37', href: '#' },
    { k: 'ciudades',  head: 'CITIES',        num: '12',   lbl: 'Local scenes',      sub: 'Caracas, Maracay, Valencia, Merida and more.',               tint: '#244C5A', href: '/cities' },
    { k: 'editorial', head: 'EDITORIAL',     num: '47',   lbl: 'Reviews & essays',  sub: 'Longform, reviews, interviews, features.',                    tint: '#0093C6', href: '#' },
    { k: 'profile',   head: 'DIRECTORY',     num: '187',  lbl: 'Pro profiles',      sub: 'Producers, DJs, designers, engineers, photographers.',        tint: '#7a2a2a', href: '#' },
  ];

  const events: EventEntry[] = [
    { d: '23', m: 'NOV', title: '10 Anos · Noche Cerrada', venue: 'Teatro Teresa Carreno', city: 'Caracas', color: '#ffce37', ink: true },
    { d: '29', m: 'NOV', title: 'Apache · Indigo Live',     venue: 'La Poltrona',           city: 'Caracas', color: '#04756F' },
    { d: '06', m: 'DIC', title: 'Cypher Sessions Vol. 12',  venue: 'Centro Cultural BOD',   city: 'Caracas', color: '#D93D4A' },
    { d: '13', m: 'DIC', title: 'Maracay Underground Fest', venue: 'Plaza Bolivar',         city: 'Maracay', color: '#244C5A' },
  ];

  const articles: ArticleEntry[] = [
    { tag: 'FEATURE · SCENE', title: 'Caracas 2008-2015: the golden years of Venezuelan rap', author: 'L. FIGUERA', min: '12', date: '14 APR 2026', cover: { bg: 'linear-gradient(135deg,#244C5A 0%,#3a1318 100%)', mono: 'CCS', ink: false } },
    { tag: 'REVIEW · 8.4',    title: 'Apache revisits his discography with Indigo',            author: 'M. SILVA',    min: '6',  date: '09 APR 2026', cover: { bg: '#D93D4A',                                              mono: 'APC', ink: false } },
    { tag: 'INTERVIEW',        title: 'Lil Supa: "Cristal is the album they would not let me make in 2015"', author: 'C. HERNANDEZ', min: '18', date: '02 APR 2026', cover: { bg: '#ffce37', mono: 'SUPA', ink: true } },
    { tag: 'OPINION',          title: 'Why the boom-bap beat remains the backbone of Latin hip-hop', author: 'J.C. BALLESTA', min: '9', date: '28 MAR 2026', cover: { bg: '#04756F', mono: 'BBP', ink: false } },
  ];

  const cities: CityEntry[] = [
    { n: 'Caracas',  sub: 'Venezuela', a: 187, r: 612, e: 48 },
    { n: 'Maracay',  sub: 'Venezuela', a: 42,  r: 124, e: 12 },
    { n: 'Valencia', sub: 'Venezuela', a: 38,  r: 98,  e: 9 },
    { n: 'Merida',   sub: 'Venezuela', a: 22,  r: 47,  e: 6 },
  ];

  const FALLBACK_PEOPLE = [
    { slug: 'canserbero', stage_name: 'Canserbero', status: 'deceased', completeness_score: 87, verified: true,  cities: { name: 'Maracay', slug: 'maracay' } },
    { slug: 'apache',     stage_name: 'Apache',     status: 'active',   completeness_score: 64, verified: true,  cities: { name: 'Maracay', slug: 'maracay' } },
    { slug: 'lil-supa',   stage_name: 'Lil Supa',   status: 'active',   completeness_score: 71, verified: false, cities: { name: 'Caracas', slug: 'caracas' } },
    { slug: 'mcklopedia', stage_name: 'McKlopedia', status: 'active',   completeness_score: 58, verified: true,  cities: { name: 'Caracas', slug: 'caracas' } },
  ] as Partial<Person>[];

  const displayPeople = people.length > 0 ? people : FALLBACK_PEOPLE as Person[];

  return (
    <main className="dm-home">
      <section className="dm-hero">
        <div className="dm-hero-eyebrow">FEATURE · CARACAS · 14 APR 2026</div>
        <h1 className="dm-hero-title">
          The archive<br />
          does not remember<br />
          alone.
        </h1>
        <div className="dm-hero-meta">
          <span>14 YEARS AFTER APOCALIPSIS — A MAP OF THE SCENE THAT PRODUCED IT.</span>
          <a className="dm-hero-cta" href="#">READ ARTICLE →</a>
        </div>
      </section>

      <section className="dm-dir-section">
        <div className="dm-section-head">
          <div>
            <div className="dm-section-eyebrow">EXPLORE</div>
            <h2 className="dm-section-title">The full archive</h2>
          </div>
          <Link href="/cities" className="dm-section-more">VIEW MAP →</Link>
        </div>
        <div className="dm-dir-tiles">
          {DIRECTORY.map((t) => (
            <Link
              key={t.k}
              href={t.href}
              className="dm-dir-tile"
              style={{ '--dm-tile-tint': t.tint } as React.CSSProperties}
            >
              <div className="dm-dir-tile-arr">↗</div>
              <div>
                <div className="dm-dir-tile-head">{t.head}</div>
                <div className="dm-dir-tile-num">{t.num}</div>
              </div>
              <div>
                <div className="dm-dir-tile-lbl">{t.lbl}</div>
                <div className="dm-dir-tile-sub">{t.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="dm-section">
        <div className="dm-section-head">
          <div>
            <div className="dm-section-eyebrow">SCHEDULE</div>
            <h2 className="dm-section-title">Upcoming events</h2>
          </div>
          <a href="#" className="dm-section-more">VIEW ALL (23) →</a>
        </div>
        <div className="dm-home-events">
          {events.map((e, i) => (
            <a key={i} className="dm-home-ev" href="#">
              <div
                className="dm-home-ev-date"
                style={{ background: e.color, color: e.ink ? 'var(--bg-0)' : 'var(--fg-0)' }}
              >
                <div className="dm-home-ev-d">{e.d}</div>
                <div className="dm-home-ev-m">{e.m}</div>
              </div>
              <div className="dm-home-ev-body">
                <div className="dm-home-ev-title">{e.title}</div>
                <div className="dm-home-ev-venue">{e.venue}</div>
                <div className="dm-home-ev-city">◉ {e.city}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="dm-section">
        <div className="dm-section-head">
          <div>
            <div className="dm-section-eyebrow">ARCHIVE ARTISTS</div>
            <h2 className="dm-section-title">Pillars · this scene</h2>
          </div>
          <Link href="/artists" className="dm-section-more">VIEW ALL →</Link>
        </div>
        <div className="dm-grid-4">
          {displayPeople.slice(0, 4).map((p) => {
            const cityData = p.cities as { name: string; slug: string } | null;
            const subtitle = cityData ? `${cityData.name.toUpperCase()} · VE` : 'VENEZUELA';
            return (
              <EntityCard
                key={p.slug}
                kind="ARTIST"
                year={p.status === 'deceased' ? 'IN MEMORIAM' : 'ACTIVE'}
                title={p.stage_name ?? ''}
                subtitle={subtitle}
                cover={p.slug ?? ''}
                meta={p.completeness_score ?? 0}
                onClick={() => { window.location.href = `/artists/${p.slug}`; }}
              />
            );
          })}
        </div>
      </section>

      <section className="dm-split">
        <div className="dm-split-left">
          <div className="dm-section-head">
            <div>
              <div className="dm-section-eyebrow">EDITORIAL</div>
              <h2 className="dm-section-title">Latest articles</h2>
            </div>
            <a href="#" className="dm-section-more">VIEW ALL (47) →</a>
          </div>
          <div className="dm-articles dm-articles-grid">
            {articles.map((a, i) => (
              <a key={i} className="dm-article-row" href="#">
                <div className="dm-article-cover" style={{ background: a.cover.bg }}>
                  <span style={{ color: a.cover.ink ? 'rgba(0,0,0,.35)' : 'rgba(255,255,255,.35)' }}>
                    {a.cover.mono}
                  </span>
                </div>
                <div className="dm-article-tag">{a.tag}</div>
                <div className="dm-article-title">{a.title}</div>
                <div className="dm-article-meta">{a.author} · {a.min} MIN · {a.date}</div>
              </a>
            ))}
          </div>
        </div>
        <aside className="dm-split-right">
          <div className="dm-section-head">
            <div>
              <div className="dm-section-eyebrow">FEATURED ARTISTS</div>
              <h2 className="dm-section-title">This week</h2>
            </div>
            <Link href="/artists" className="dm-section-more">ALL (342) →</Link>
          </div>
          <div className="dm-artist-list">
            {displayPeople.slice(0, 5).map((p, i) => {
              const cityData = p.cities as { name: string; slug: string } | null;
              const cityLabel = cityData ? `${cityData.name.toUpperCase()} · VE` : 'VENEZUELA';
              return (
                <Link key={i} href={`/artists/${p.slug}`} className="dm-artist-row">
                  <span className="dm-artist-idx">0{i + 1}</span>
                  <span className="dm-artist-name">
                    {p.stage_name}
                    {p.verified && <span className="dm-verified" title="Verified"> ✓</span>}
                  </span>
                  <span className="dm-artist-city">{cityLabel}</span>
                  <span
                    className="dm-artist-pct"
                    style={{
                      color: (p.completeness_score ?? 0) >= 80
                        ? '#ffce37'
                        : (p.completeness_score ?? 0) >= 50
                        ? 'var(--fg-0)'
                        : '#D93D4A',
                    }}
                  >
                    {p.completeness_score ?? 0}%
                  </span>
                </Link>
              );
            })}
          </div>
        </aside>
      </section>

      <section className="dm-section">
        <div className="dm-section-head">
          <div>
            <div className="dm-section-eyebrow">CITIES</div>
            <h2 className="dm-section-title">Local scenes</h2>
          </div>
          <Link href="/cities" className="dm-section-more">VIEW ALL (12) →</Link>
        </div>
        <div className="dm-home-cities">
          {cities.map((c, i) => (
            <Link key={i} href="/cities" className="dm-home-city">
              <div className="dm-home-city-name">{c.n}</div>
              <div className="dm-home-city-sub">{c.sub}</div>
              <div className="dm-home-city-stats">
                <span><b>{c.a}</b> artists</span>
                <span><b>{c.r}</b> releases</span>
                <span><b>{c.e}</b> events</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
