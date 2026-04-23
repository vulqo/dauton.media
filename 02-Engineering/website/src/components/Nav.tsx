'use client';

type View = string;
interface NavProps { view: View; setView: (v: View) => void; onSearch: () => void; }

const TABS = [
  { k: 'home',      label: 'ARCHIVO'   },
  { k: 'editorial', label: 'EDITORIAL' },
  { k: 'ciudades',  label: 'CIUDADES'  },
  { k: 'venues',    label: 'VENUES'    },
  { k: 'shop',      label: 'TIENDA'    },
];

export default function Nav({ view, setView, onSearch }: NavProps) {
  return (
    <header className="dm-nav">
      <div className="dm-nav-inner">
        <a className="dm-brand" onClick={() => setView('home')}>
          DAUTON<span>/</span>MEDIA
        </a>
        <nav className="dm-tabs">
          {TABS.map(t => (
            <a
              key={t.k}
              className={'dm-tab ' + (view === t.k ? 'is-active' : '')}
              onClick={() => setView(t.k)}
            >{t.label}</a>
          ))}
        </nav>
        <button className="dm-search-trigger" onClick={onSearch}>
          <span className="dm-search-label">Buscar artista, release, productor, ciudad…</span>
          <span className="dm-kbd">⌘K</span>
        </button>
        <div className="dm-nav-end">
          <a className="dm-chip" onClick={() => setView('onboarding')}>HAZTE MIEMBRO</a>
        </div>
      </div>
    </header>
  );
}
