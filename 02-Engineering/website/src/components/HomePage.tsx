'use client';
import React, { useState, useEffect } from 'react';
import EntityCard from '@/components/EntityCard';
import { getPeople } from '@/lib/queries/people';
import type { Person } from '@/lib/database.types';

interface DirectoryEntry {
  k: string;
  head: string;
  num: string;
  lbl: string;
  sub: string;
  tint: string;
  go: string;
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

interface ArtistEntry {
  n: string;
  c: string;
  a: number;
  v: boolean;
}

interface CityEntry {
  n: string;
  sub: string;
  a: number;
  r: number;
  e: number;
}

export default function HomePage({ go }: { go: (view: string) => void }) {
  const [people, setPeople] = useState<Person[]>([]);
  const [peopleLoading, setPeopleLoading] = useState(true);

  useEffect(() => {
    getPeople({ limit: 15 }).then((data) => {
      setPeople(data);
      setPeopleLoading(false);
    });
  }, []);

  const DIRECTORY: DirectoryEntry[] = [
    { k: 'artist',    head: 'ARTISTAS',     num: '342',  lbl: 'Directorio',        sub: 'MCs, DJs, productores, fotografos, venues, prensa.',        tint: '#D93D4A', go: 'artist' },
    { k: 'release',   head: 'LANZAMIENTOS', num: '1.2K', lbl: 'Archivo musical',   sub: 'Albums, EPs, singles, mixtapes. 2003-hoy.',                  tint: '#04756F', go: 'release' },
    { k: 'event',     head: 'EVENTOS',      num: '84',   lbl: 'Agenda & archivo',  sub: 'Proximos shows + registro historico con creditos.',           tint: '#ffce37', go: 'event' },
    { k: 'ciudades',  head: 'CIUDADES',     num: '12',   lbl: 'Escenas locales',   sub: 'Caracas, Maracay, Valencia, Merida y mas.',                   tint: '#244C5A', go: 'ciudades' },
    { k: 'editorial', head: 'EDITORIAL',    num: '47',   lbl: 'Resenas & ensayos', sub: 'Longform, reviews, entrevistas, features.',                   tint: '#0093C6', go: 'editorial' },
    { k: 'profile',   head: 'DIRECTORIO',   num: '187',  lbl: 'Perfiles pro',      sub: 'Productores, DJs, disenadores, ingenieros, fotografos.',      tint: '#7a2a2a', go: 'profile' },
  ];

  const events: EventEntry[] = [
    { d: '23', m: 'NOV', title: '10 Anos · Noche Cerrada', venue: 'Teatro Teresa Carreno', city: 'Caracas', color: '#ffce37', ink: true },
    { d: '29', m: 'NOV', title: 'Apache · Indigo Live',     venue: 'La Poltrona',           city: 'Caracas', color: '#04756F' },
    { d: '06', m: 'DIC', title: 'Cypher Sessions Vol. 12',  venue: 'Centro Cultural BOD',   city: 'Caracas', color: '#D93D4A' },
    { d: '13', m: 'DIC', title: 'Maracay Underground Fest', venue: 'Plaza Bolivar',         city: 'Maracay', color: '#244C5A' },
  ];

  const articles: ArticleEntry[] = [
    { tag: 'FEATURE · ESCENA', title: 'Caracas 2008-2015: los anos dorados del rap venezolano', author: 'L. FIGUERA', min: '12', date: '14 ABR 2026', cover: { bg: 'linear-gradient(135deg,#244C5A 0%,#3a1318 100%)', mono: 'CCS', ink: false } },
    { tag: 'REVIEW · 8.4',     title: 'Apache revisita su discografia con Indigo',               author: 'M. SILVA',    min: '6',  date: '09 ABR 2026', cover: { bg: '#D93D4A',                                              mono: 'APC', ink: false } },
    { tag: 'INTERVIEW',         title: 'Lil Supa: "Cristal es el disco que no me dejaron hacer en 2015"', author: 'C. HERNANDEZ', min: '18', date: '02 ABR 2026', cover: { bg: '#ffce37', mono: 'SUPA', ink: true } },
    { tag: 'OPINION',           title: 'Por que el beat boom-bap sigue siendo la columna vertebral del hip-hop latino', author: 'J.C. BALLESTA', min: '9', date: '28 MAR 2026', cover: { bg: '#04756F', mono: 'BBP', ink: false } },
  ];

  // Fallback used when Supabase returns empty or while loading
  const FALLBACK_ARTISTS: ArtistEntry[] = [
    { n: 'Canserbero',    c: 'CARACAS · VE', a: 87, v: true },
    { n: 'Apache',        c: 'MARACAY · VE', a: 64, v: true },
    { n: 'Lil Supa',      c: 'CARACAS · VE', a: 71, v: false },
    { n: 'McKlopedia',    c: 'CARACAS · VE', a: 58, v: true },
    { n: 'Guerrilla Seed', c: 'CARACAS · VE', a: 34, v: false },
  ];

  const liveFeaturedArtists: ArtistEntry[] = people.length > 0
    ? people.slice(0, 5).map((p) => {
        const cityData = p.cities as { name: string; slug: string } | null;
        const cityLabel = cityData ? `${cityData.name.toUpperCase()} · VE` : 'VENEZUELA';
        return {
          n: p.stage_name,
          c: cityLabel,
          a: p.completeness_score ?? 0,
          v: p.verified ?? false,
        };
      })
    : FALLBACK_ARTISTS;

  const featuredArtists = liveFeaturedArtists;

  const cities: CityEntry[] = [
    { n: 'Caracas',  sub: 'Venezuela', a: 187, r: 612, e: 48 },
    { n: 'Maracay',  sub: 'Venezuela', a: 42,  r: 124, e: 12 },
    { n: 'Valencia', sub: 'Venezuela', a: 38,  r: 98,  e: 9 },
    { n: 'Merida',   sub: 'Venezuela', a: 22,  r: 47,  e: 6 },
  ];

  return (
    <main className="dm-home">
      <section className="dm-hero">
        <div className="dm-hero-eyebrow">FEATURE · CARACAS · 14 ABR 2026</div>
        <h1 className="dm-hero-title">
          El archivo<br />
          no recuerda<br />
          solo.
        </h1>
        <div className="dm-hero-meta">
          <span>14 ANOS DESPUES DE APOCALIPSIS — UN MAPA DE LA ESCENA QUE LO PRODUJO.</span>
          <a className="dm-hero-cta" onClick={() => go('article')}>LEER ARTICULO →</a>
        </div>
      </section>

      <section className="dm-dir-section">
        <div className="dm-section-head">
          <div>
            <div className="dm-section-eyebrow">EXPLORAR</div>
            <h2 className="dm-section-title">Todo el archivo</h2>
          </div>
          <a className="dm-section-more" onClick={() => go('ciudades')}>VER MAPA →</a>
        </div>
        <div className="dm-dir-tiles">
          {DIRECTORY.map((t) => (
            <a
              key={t.k}
              className="dm-dir-tile"
              style={{ '--dm-tile-tint': t.tint } as React.CSSProperties}
              onClick={() => go(t.go)}
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
            </a>
          ))}
        </div>
      </section>

      <section className="dm-section">
        <div className="dm-section-head">
          <div>
            <div className="dm-section-eyebrow">AGENDA</div>
            <h2 className="dm-section-title">Proximos eventos</h2>
          </div>
          <a className="dm-section-more" onClick={() => go('event')}>VER TODOS (23) →</a>
        </div>
        <div className="dm-home-events">
          {events.map((e, i) => (
            <a key={i} className="dm-home-ev" onClick={() => go('event')}>
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
            <div className="dm-section-eyebrow">ARTISTAS DEL ARCHIVO</div>
            <h2 className="dm-section-title">Pilares · esta escena</h2>
          </div>
          <a className="dm-section-more" onClick={() => go('artist')}>VER TODOS →</a>
        </div>
        <div className="dm-grid-4" style={{ opacity: peopleLoading ? 0.4 : 1, transition: 'opacity .2s' }}>
          {(people.length > 0 ? people.slice(0, 4) : [
            { slug: 'canserbero', stage_name: 'Canserbero', status: 'deceased', completeness_score: 87, verified: true, cities: { name: 'Maracay', slug: 'maracay' } },
            { slug: 'apache',     stage_name: 'Apache',     status: 'active',   completeness_score: 64, verified: true, cities: { name: 'Maracay', slug: 'maracay' } },
            { slug: 'lil-supa',   stage_name: 'Lil Supa',   status: 'active',   completeness_score: 71, verified: false, cities: { name: 'Caracas', slug: 'caracas' } },
            { slug: 'mcklopedia', stage_name: 'McKlopedia', status: 'active',   completeness_score: 58, verified: true, cities: { name: 'Caracas', slug: 'caracas' } },
          ] as Partial<Person>[]).map((p) => {
            const cityData = p.cities as { name: string; slug: string } | null;
            const subtitle = cityData ? `${cityData.name.toUpperCase()} · VE` : 'VENEZUELA';
            return (
              <EntityCard
                key={p.slug}
                kind="ARTIST"
                year={p.status === 'deceased' ? 'IN MEMORIAM' : 'ACTIVO'}
                title={p.stage_name ?? ''}
                subtitle={subtitle}
                cover={p.slug ?? ''}
                meta={p.completeness_score ?? 0}
                onClick={() => go(`artist:${p.slug}`)}
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
              <h2 className="dm-section-title">Ultimos articulos</h2>
            </div>
            <a className="dm-section-more" onClick={() => go('editorial')}>VER TODOS (47) →</a>
          </div>
          <div className="dm-articles dm-articles-grid">
            {articles.map((a, i) => (
              <a key={i} className="dm-article-row" onClick={() => go('article')}>
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
              <div className="dm-section-eyebrow">ARTISTAS DESTACADOS</div>
              <h2 className="dm-section-title">Esta semana</h2>
            </div>
            <a className="dm-section-more" onClick={() => go('artist')}>TODOS (342) →</a>
          </div>
          <div className="dm-artist-list" style={{ opacity: peopleLoading ? 0.4 : 1, transition: 'opacity .2s' }}>
            {featuredArtists.map((a, i) => {
              const person = people.find((p) => p.stage_name === a.n);
              const slug = person ? person.slug : a.n.toLowerCase().replace(/\s+/g, '-');
              return (
                <a key={i} className="dm-artist-row" onClick={() => go(`artist:${slug}`)}>
                  <span className="dm-artist-idx">0{i + 1}</span>
                  <span className="dm-artist-name">
                    {a.n}
                    {a.v && <span className="dm-verified" title="Verified"> ✓</span>}
                  </span>
                  <span className="dm-artist-city">{a.c}</span>
                  <span
                    className="dm-artist-pct"
                    style={{ color: a.a >= 80 ? '#ffce37' : a.a >= 50 ? 'var(--fg-0)' : '#D93D4A' }}
                  >
                    {a.a}%
                  </span>
                </a>
              );
            })}
          </div>
        </aside>
      </section>

      <section className="dm-section">
        <div className="dm-section-head">
          <div>
            <div className="dm-section-eyebrow">CIUDADES</div>
            <h2 className="dm-section-title">Escenas locales</h2>
          </div>
          <a className="dm-section-more" onClick={() => go('ciudades')}>VER TODAS (12) →</a>
        </div>
        <div className="dm-home-cities">
          {cities.map((c, i) => (
            <a key={i} className="dm-home-city" onClick={() => go('ciudades')}>
              <div className="dm-home-city-name">{c.n}</div>
              <div className="dm-home-city-sub">{c.sub}</div>
              <div className="dm-home-city-stats">
                <span><b>{c.a}</b> artistas</span>
                <span><b>{c.r}</b> releases</span>
                <span><b>{c.e}</b> eventos</span>
              </div>
            </a>
          ))}
        </div>
      </section>

    </main>
  );
}
