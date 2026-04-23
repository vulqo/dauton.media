'use client';

import { useState } from 'react';

interface Props {
  go: (view: string) => void;
}

type DemoMode = 'MIEMBRO' | 'DUEÑO DEL PERFIL' | 'EDITOR';
type SectionTab = 'PORTFOLIO' | 'SERVICIOS' | 'EVENTOS' | 'CRÉDITOS';

const DEMO_MODES: DemoMode[] = ['MIEMBRO', 'DUEÑO DEL PERFIL', 'EDITOR'];
const SECTION_TABS: SectionTab[] = ['PORTFOLIO', 'SERVICIOS', 'EVENTOS', 'CRÉDITOS'];

const PORTFOLIO_SETS = [
  { type: 'ÁLBUM COMPLETO', name: 'Apocalipsis — Producción completa', meta: 'Canserbero · 2012 · 18 temas', platform: 'Spotify / Apple Music' },
  { type: 'ÁLBUM COMPLETO', name: 'Muerte — Coproducción', meta: 'Canserbero & Lil Supa · 2010 · 14 temas', platform: 'Spotify / YouTube' },
  { type: 'EP', name: 'Desde las Trincheras — Beats', meta: 'Apache · 2011 · 6 temas', platform: 'SoundCloud' },
  { type: 'BEAT PACK', name: 'Guerrilla Vol. 1 — Pack instrumental', meta: 'Ahiezer · 2013 · 20 beats', platform: 'BeatStars' },
  { type: 'SINGLE', name: 'Tú y Yo — Producción', meta: 'Gabylonia · 2014', platform: 'Spotify' },
  { type: 'BEAT PACK', name: 'Guerrilla Vol. 2 — Pack instrumental', meta: 'Ahiezer · 2015 · 25 beats', platform: 'BeatStars' },
];

const SERVICES = [
  {
    name: 'Producción desde cero',
    desc: 'Beat personalizado, grabación, dirección artística y mezcla incluida.',
    price: '$300+',
  },
  {
    name: 'Mix & Master',
    desc: 'Mezcla y masterización profesional para proyectos ya grabados.',
    price: '$150+',
  },
  {
    name: 'Licencia de beat',
    desc: 'Acceso a catálogo de beats exclusivos con licencia para uso comercial.',
    price: 'Desde $50',
  },
];

const PAST_EVENTS = [
  { date: 'Nov 2012', name: 'Concierto Apocalipsis', venue: 'Teatro Teresa Carreño', role: 'PRODUCTOR' },
  { date: 'Mar 2013', name: 'Red Bull Panamérika', venue: 'Centro Cultural Chacao', role: 'DJ SET' },
  { date: 'Ago 2011', name: 'Cypher de los 100', venue: 'Plaza Brión, Chacaíto', role: 'CREW' },
  { date: 'Dic 2010', name: 'Lanzamiento Muerte', venue: 'Studio Guerrilla', role: 'PRODUCTOR' },
  { date: 'Jun 2014', name: 'Venezuela en el Mapa', venue: 'Auditorio IESA, Caracas', role: 'DJ SET' },
];

const KEY_COLLABS = [
  { name: 'Canserbero', kind: 'Artista', ct: '12 proyectos' },
  { name: 'Lil Supa', kind: 'Artista', ct: '7 proyectos' },
  { name: 'Apache', kind: 'Artista', ct: '5 proyectos' },
  { name: 'Gabylonia', kind: 'Artista', ct: '4 proyectos' },
];

const ACHIEVEMENTS = [
  'Fundador de Studio Guerrilla (2009)',
  'Productor en más de 400 canciones',
  '28 álbumes como productor principal',
  'Mentor de la siguiente generación (2015–presente)',
];

export default function ProfilePage({ go }: Props) {
  const [demoMode, setDemoMode] = useState<DemoMode>('MIEMBRO');
  const [activeTab, setActiveTab] = useState<SectionTab>('PORTFOLIO');

  const isOwner = demoMode === 'DUEÑO DEL PERFIL';
  const isEditor = demoMode === 'EDITOR';

  return (
    <div className="dm-entity">
      {/* Breadcrumb */}
      <nav className="dm-crumb">
        <button onClick={() => go('home')}>DAUTON</button>
        <span>/</span>
        <button onClick={() => go('perfiles')}>PERFILES</button>
        <span>/</span>
        <span>Ahiezer</span>
      </nav>

      {/* Demo mode switcher */}
      <div className="dm-prof-demo-sw">
        {DEMO_MODES.map((mode) => (
          <button
            key={mode}
            className={demoMode === mode ? 'is-active' : ''}
            onClick={() => setDemoMode(mode)}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Hero */}
      <header className="dm-prof-hero">
        <div className="dm-prof-avatar" aria-label="Avatar de Ahiezer" />

        <div className="dm-prof-head-main">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 className="dm-prof-name">Ahiezer</h1>
            <span className="dm-verified-lg" title="Perfil verificado">✓</span>
          </div>
          <p className="dm-prof-dek">
            PRODUCER / BEATMAKER / ENGINEER · Caracas · Activo desde 2003
          </p>
          <div className="dm-prof-actions">
            <button className="dm-btn dm-btn-primary" onClick={() => go('contact-ahiezer')}>
              Contactar
            </button>
            {(isOwner || isEditor) && (
              <button className="dm-btn dm-btn-secondary" onClick={() => go('edit-profile')}>
                Editar perfil
              </button>
            )}
          </div>
        </div>

        <div className="dm-prof-stats">
          <div>
            <span className="dm-prof-stat-val">412</span>
            <span className="dm-prof-stat-lbl">PRODUCCIONES</span>
          </div>
          <div>
            <span className="dm-prof-stat-val">84</span>
            <span className="dm-prof-stat-lbl">ARTISTAS</span>
          </div>
          <div>
            <span className="dm-prof-stat-val">28</span>
            <span className="dm-prof-stat-lbl">ÁLBUMES</span>
          </div>
          <div>
            <span className="dm-prof-stat-val">47K</span>
            <span className="dm-prof-stat-lbl">SEGUIDORES</span>
          </div>
        </div>
      </header>

      {/* Section nav */}
      <nav className="dm-prof-sectnav">
        {SECTION_TABS.map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? 'is-active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="dm-prof-grid">
        <main className="dm-entity-main">
          {activeTab === 'PORTFOLIO' && (
            <>
              <div className="dm-section-head">
                <span className="dm-section-eyebrow">PORTFOLIO</span>
                <h2 className="dm-section-title" style={{ fontSize: '1rem' }}>
                  Proyectos y sets
                </h2>
              </div>
              <div className="dm-sets-list">
                {PORTFOLIO_SETS.map((set, i) => (
                  <div key={i} className="dm-set-row">
                    <span className="dm-set-type">{set.type}</span>
                    <span className="dm-set-name">{set.name}</span>
                    <span className="dm-set-meta">{set.meta}</span>
                    <span className="dm-set-platform">{set.platform}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'SERVICIOS' && (
            <>
              <div className="dm-section-head">
                <span className="dm-section-eyebrow">SERVICIOS</span>
              </div>
              <div className="dm-services">
                {SERVICES.map((svc, i) => (
                  <div key={i} style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <strong>{svc.name}</strong>
                      <span>{svc.price}</span>
                    </div>
                    <p>{svc.desc}</p>
                    <button
                      className="dm-btn dm-btn-secondary"
                      onClick={() => go(`contratar-ahiezer-${i}`)}
                    >
                      Solicitar
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'EVENTOS' && (
            <>
              <div className="dm-section-head">
                <span className="dm-section-eyebrow">HISTORIAL DE EVENTOS</span>
              </div>
              <div className="dm-prof-events-tabs">
                <div className="dm-pev-list">
                  {PAST_EVENTS.map((ev, i) => (
                    <div key={i} className="dm-pev-row">
                      <span className="dm-pev-date">{ev.date}</span>
                      <span className="dm-pev-name">{ev.name}</span>
                      <span className="dm-pev-venue">{ev.venue}</span>
                      <span className="dm-pev-role">{ev.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'CRÉDITOS' && (
            <>
              <div className="dm-section-head">
                <span className="dm-section-eyebrow">CRÉDITOS Y LOGROS</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {ACHIEVEMENTS.map((a, i) => (
                  <li key={i} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--dm-border, #eee)' }}>
                    {a}
                  </li>
                ))}
              </ul>
            </>
          )}
        </main>

        {/* Sidebar */}
        <aside className="dm-entity-side">
          <div className="dm-side-block">
            <h3 className="dm-section-eyebrow">COLABORADORES CLAVE</h3>
            {KEY_COLLABS.map((c) => (
              <div key={c.name} className="dm-collab-row">
                <span className="dm-collab-name">{c.name}</span>
                <span className="dm-collab-kind">{c.kind}</span>
                <span className="dm-collab-ct">{c.ct}</span>
              </div>
            ))}
          </div>

          <div className="dm-side-block">
            <h3 className="dm-section-eyebrow">ERA</h3>
            <div
              className="dm-collab-row"
              style={{ cursor: 'pointer' }}
              onClick={() => go('era-dorada')}
            >
              <span className="dm-collab-name">La Era Dorada</span>
              <span className="dm-collab-ct">2008–2015</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
