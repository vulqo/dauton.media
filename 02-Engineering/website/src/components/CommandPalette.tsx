'use client';
import { useState } from 'react';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  go: (view: string) => void;
}

const ALL_RESULTS = [
  { kind: 'ARTIST',   name: 'Canserbero',      city: 'Caracas · VE',          v: true,  view: 'artist'   },
  { kind: 'RELEASE',  name: 'Apocalipsis',      city: '2012 · Canserbero',     v: false, view: 'release'  },
  { kind: 'ARTIST',   name: 'Apache',           city: 'Maracay · VE',          v: true,  view: 'artist'   },
  { kind: 'ARTICLE',  name: 'Caracas 2008–2015',city: 'Feature · Luis Figuera',v: false, view: 'article'  },
  { kind: 'PRODUCER', name: 'Ahiezer',          city: '34 producciones',       v: false, view: 'artist'   },
];

export default function CommandPalette({ open, onClose, go }: CommandPaletteProps) {
  const [q, setQ] = useState('');
  if (!open) return null;
  const results = ALL_RESULTS.filter(r => !q || r.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="dm-cmd-overlay" onClick={onClose}>
      <div className="dm-cmd" onClick={e => e.stopPropagation()}>
        <div className="dm-cmd-input-row">
          <input
            autoFocus
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Buscar artista, release, productor, ciudad…"
          />
          <span className="dm-kbd">ESC</span>
        </div>
        <div className="dm-cmd-results">
          {results.length === 0 && <div className="dm-cmd-empty">Sin resultados para &ldquo;{q}&rdquo;</div>}
          {results.map((r, i) => (
            <a key={i} className="dm-cmd-row" onClick={() => { go(r.view); onClose(); }}>
              <span className="dm-tag-teal">{r.kind}</span>
              <span className="dm-cmd-name">
                {r.name}{r.v && <span className="dm-verified"> ✓</span>}
              </span>
              <span className="dm-cmd-city">{r.city}</span>
              <span className="dm-cmd-arrow">→</span>
            </a>
          ))}
        </div>
        <div className="dm-cmd-foot">
          <span><span className="dm-kbd">↑↓</span> navegar</span>
          <span><span className="dm-kbd">↵</span> abrir</span>
          <span><span className="dm-kbd">ESC</span> cerrar</span>
        </div>
      </div>
    </div>
  );
}
