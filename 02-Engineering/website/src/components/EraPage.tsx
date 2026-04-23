'use client';

import { useState } from 'react';
import EntityCard from '@/components/EntityCard';

interface Props {
  go: (view: string) => void;
}

const TIMELINE_EVENTS = [
  { year: '2008', event: 'Primeros cyphers en Plaza Brión — el punto de origen del movimiento.' },
  { year: '2009', event: 'Ahiezer funda Studio Guerrilla, primer estudio dedicado al rap en Caracas.' },
  { year: '2010', event: 'Canserbero y Lil Supa lanzan Muerte, álbum que redefine el estándar lírico.' },
  { year: '2011', event: 'Apache debuta en solitario con Desde las Trincheras.' },
  { year: '2012', event: 'Apocalipsis de Canserbero — el punto de inflexión de la era.' },
  { year: '2013', event: 'Red Bull Panamérika llega a Venezuela; visibilidad internacional.' },
  { year: '2014', event: 'El movimiento se expande a Maracay y Valencia.' },
  { year: '2015', event: 'Fallecimiento de Canserbero. Fin de la era dorada.' },
];

const KEY_RELEASES = [
  { id: 'muerte', title: 'Muerte', artist: 'Canserbero & Lil Supa', year: '2010' },
  { id: 'apocalipsis', title: 'Apocalipsis', artist: 'Canserbero', year: '2012' },
  { id: 'trincheras', title: 'Desde las Trincheras', artist: 'Apache', year: '2011' },
  { id: 'tiempo', title: 'Tiempo al Tiempo', artist: 'Canserbero', year: '2014' },
];

const TOP_ARTISTS = [
  { name: 'Canserbero', role: 'MC / Compositor', slug: 'canserbero' },
  { name: 'Ahiezer', role: 'Productor / Beatmaker', slug: 'ahiezer' },
  { name: 'Lil Supa', role: 'MC', slug: 'lil-supa' },
  { name: 'Apache', role: 'MC / Compositor', slug: 'apache' },
  { name: 'Neutro Shorty', role: 'MC', slug: 'neutro-shorty' },
  { name: 'Gabylonia', role: 'MC / Compositora', slug: 'gabylonia' },
];

const KEY_FIGURES = [
  { name: 'Canserbero', role: 'Figura central' },
  { name: 'Ahiezer', role: 'Arquitecto sonoro' },
  { name: 'Lil Supa', role: 'Colaborador clave' },
];

const RELATED_ERAS = [
  { label: '2003–2007', title: 'Los Orígenes', slug: 'era-origenes' },
  { label: '2016–2020', title: 'La Diáspora', slug: 'era-diaspora' },
];

const ARTICLES = [
  {
    tag: 'ANÁLISIS',
    title: 'Cómo Apocalipsis cambió el rap venezolano para siempre',
    meta: 'Dauton Media · 12 Mar 2024',
    slug: 'articulo-apocalipsis',
  },
  {
    tag: 'DOCUMENTAL',
    title: 'Plaza Brión: el origen del movimiento — historia oral',
    meta: 'Dauton Media · 5 Ene 2024',
    slug: 'articulo-plaza-brion',
  },
  {
    tag: 'ENTREVISTA',
    title: 'Ahiezer recuerda los primeros años en Studio Guerrilla',
    meta: 'Dauton Media · 20 Nov 2023',
    slug: 'articulo-ahiezer',
  },
];

const SECTION_TABS = ['LANZAMIENTOS', 'ARTISTAS', 'EVENTOS'] as const;
type SectionTab = (typeof SECTION_TABS)[number];

export default function EraPage({ go }: Props) {
  const [activeTab, setActiveTab] = useState<SectionTab>('LANZAMIENTOS');

  return (
    <div className="dm-entity">
      {/* Breadcrumb */}
      <nav className="dm-crumb">
        <button onClick={() => go('archive')}>ARCHIVO</button>
        <span>/</span>
        <button onClick={() => go('eras')}>ERAS</button>
        <span>/</span>
        <span>2008–2015</span>
      </nav>

      {/* Hero */}
      <header className="dm-era-hero">
        <h1 className="dm-era-hero-title">
          <span>2008–2015</span> La Era Dorada
        </h1>
        <p className="dm-era-hero-dek">
          Siete años que definieron el rap venezolano contemporáneo. Desde los primeros cyphers de
          Plaza Brión hasta Apocalipsis.
        </p>
        <div className="dm-era-hero-stats">
          <div>
            <span className="dm-stat-val">342</span>
            <span className="dm-stat-label">ARTISTAS ACTIVOS</span>
          </div>
          <div>
            <span className="dm-stat-val">1.2K</span>
            <span className="dm-stat-label">RELEASES</span>
          </div>
          <div>
            <span className="dm-stat-val">47</span>
            <span className="dm-stat-label">CIUDADES</span>
          </div>
          <div>
            <span className="dm-stat-val">84</span>
            <span className="dm-stat-label">EVENTOS DOCUMENTADOS</span>
          </div>
        </div>
      </header>

      {/* Timeline */}
      <section className="dm-section dm-tl-section">
        <div className="dm-section-head">
          <span className="dm-section-eyebrow">CRONOLOGÍA</span>
          <h2 className="dm-section-title">Momentos clave</h2>
        </div>
        <div className="dm-timeline">
          <div className="dm-tl-axis" />
          {TIMELINE_EVENTS.map(({ year, event }) => (
            <div key={year} className="dm-tl-node">
              <div className="dm-tl-year">{year}</div>
              <div className="dm-tl-dot" />
              <div className="dm-tl-event">{event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Entity grid */}
      <div className="dm-entity-grid">
        <main className="dm-entity-main">
          {/* Section nav tabs */}
          <nav className="dm-section-head" style={{ marginBottom: '1rem' }}>
            {SECTION_TABS.map((tab) => (
              <button
                key={tab}
                className={`dm-section-eyebrow${activeTab === tab ? ' is-active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </nav>

          {activeTab === 'LANZAMIENTOS' && (
            <>
              <div className="dm-section-head">
                <h2 className="dm-section-title">Lanzamientos esenciales</h2>
                <button className="dm-section-more" onClick={() => go('releases')}>
                  Ver todos →
                </button>
              </div>
              <div className="dm-grid-4">
                {KEY_RELEASES.map((rel) => (
                  <EntityCard
                    key={rel.id}
                    title={rel.title}
                    subtitle={rel.artist}
                    year={rel.year}
                    onClick={() => go(`release-${rel.id}`)}
                  />
                ))}
              </div>

              <div className="dm-section-head" style={{ marginTop: '2rem' }}>
                <h2 className="dm-section-title">Artistas destacados</h2>
              </div>
              <div className="dm-grid-3">
                {TOP_ARTISTS.map((a) => (
                  <EntityCard
                    key={a.slug}
                    title={a.name}
                    subtitle={a.role}
                    onClick={() => go(`profile-${a.slug}`)}
                  />
                ))}
              </div>
            </>
          )}

          {activeTab === 'ARTISTAS' && (
            <div className="dm-grid-3">
              {TOP_ARTISTS.map((a) => (
                <EntityCard
                  key={a.slug}
                  title={a.name}
                  subtitle={a.role}
                  onClick={() => go(`profile-${a.slug}`)}
                />
              ))}
            </div>
          )}

          {activeTab === 'EVENTOS' && (
            <div className="dm-past-ev">
              {[
                { date: 'Nov 2012', name: 'Concierto Apocalipsis', venue: 'Teatro Teresa Carreño, Caracas' },
                { date: 'Mar 2013', name: 'Red Bull Panamérika Venezuela', venue: 'Centro Cultural Chacao' },
                { date: 'Ago 2011', name: 'Cypher de los 100', venue: 'Plaza Brión, Chacaíto' },
                { date: 'Dic 2010', name: 'Lanzamiento Muerte', venue: 'Studio Guerrilla, Caracas' },
                { date: 'Jun 2008', name: 'Primer Cypher Oficial', venue: 'Plaza Brión, Chacaíto' },
              ].map((ev, i) => (
                <div key={i} className="dm-past-ev-row">
                  <span className="dm-past-ev-date">{ev.date}</span>
                  <span className="dm-past-ev-name">{ev.name}</span>
                  <span className="dm-past-ev-venue">{ev.venue}</span>
                  <span className="dm-past-ev-arr">→</span>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Sidebar */}
        <aside className="dm-entity-side">
          <div className="dm-side-block">
            <h3 className="dm-section-eyebrow">FIGURAS CLAVE</h3>
            {KEY_FIGURES.map((fig) => (
              <div key={fig.name} className="dm-collab-row">
                <span className="dm-collab-name">{fig.name}</span>
                <span className="dm-collab-kind">{fig.role}</span>
              </div>
            ))}
          </div>

          <div className="dm-side-block">
            <h3 className="dm-section-eyebrow">ERAS RELACIONADAS</h3>
            {RELATED_ERAS.map((era) => (
              <div
                key={era.slug}
                className="dm-collab-row"
                style={{ cursor: 'pointer' }}
                onClick={() => go(era.slug)}
              >
                <span className="dm-collab-name">{era.title}</span>
                <span className="dm-collab-ct">{era.label}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Related articles */}
      <section className="dm-section">
        <div className="dm-section-head">
          <span className="dm-section-eyebrow">COBERTURA</span>
          <h2 className="dm-section-title">Artículos relacionados</h2>
          <button className="dm-section-more" onClick={() => go('archivo')}>
            Ver archivo →
          </button>
        </div>
        <div className="dm-articles">
          {ARTICLES.map((art) => (
            <div
              key={art.slug}
              className="dm-article-row"
              onClick={() => go(art.slug)}
              style={{ cursor: 'pointer' }}
            >
              <span className="dm-article-tag">{art.tag}</span>
              <span className="dm-article-title">{art.title}</span>
              <span className="dm-article-meta">{art.meta}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
