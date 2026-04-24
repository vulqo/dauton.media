'use client';

import Link from 'next/link';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Entity = any;

interface DirectoryPageProps {
  entities?: Entity[];
  entityType: string;
}

const CFG: Record<string, { title: string; h1: string; eyebrow: string; entity: string; hrefPrefix: string }> = {
  artist: {
    title: 'ARTISTAS',
    h1: 'Todos los artistas',
    eyebrow: 'DIRECTORIO · ARTISTAS',
    entity: 'ARTIST',
    hrefPrefix: '/artists',
  },
  producer: {
    title: 'PRODUCTORES',
    h1: 'Todos los productores',
    eyebrow: 'DIRECTORIO · PRODUCTORES',
    entity: 'PRODUCER',
    hrefPrefix: '/artists',
  },
  label: {
    title: 'SELLOS',
    h1: 'Sellos y colectivos',
    eyebrow: 'DIRECTORIO · SELLOS',
    entity: 'LABEL',
    hrefPrefix: '/labels',
  },
};

export default function DirectoryPage({ entities = [], entityType }: DirectoryPageProps) {
  const cfg = CFG[entityType] ?? {
    title: entityType.toUpperCase(),
    h1: `Directorio · ${entityType}`,
    eyebrow: `DIRECTORIO · ${entityType.toUpperCase()}`,
    entity: entityType.toUpperCase(),
    hrefPrefix: `/${entityType}`,
  };

  const [city, setCity] = useState('TODAS');
  const [sort, setSort] = useState('NUEVOS');

  const isEmpty = !entities || entities.length === 0;

  return (
    <main>
      <div className="dm-mvpdir-head">
        <div className="dm-section-eyebrow">{cfg.eyebrow}</div>
        <h1 className="dm-mvpdir-h1">{cfg.h1}</h1>
        <p className="dm-mvpdir-meta">
          {entities.length} perfiles archivados
        </p>
      </div>

      <div className="dm-mvpdir-toolbar">
        <div className="dm-mvpdir-filters">
          <div className="dm-mvpdir-filter">
            <label>CIUDAD</label>
            <div className="dm-mvpdir-chips">
              {['TODAS', 'CARACAS', 'MARACAIBO', 'MARACAY', 'VALENCIA', 'MÉRIDA', 'OTRAS'].map((c) => (
                <button
                  key={c}
                  className={`dm-shop-chip${city === c ? ' is-active' : ''}`}
                  onClick={() => setCity(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="dm-mvpdir-filter">
            <label>ORDENAR</label>
            <div className="dm-mvpdir-chips">
              {['NUEVOS', 'A–Z', 'MÁS RELEASES', 'COMPLETITUD'].map((s) => (
                <button
                  key={s}
                  className={`dm-shop-chip${sort === s ? ' is-active' : ''}`}
                  onClick={() => setSort(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isEmpty ? (
        <div className="dm-empty-state">
          <div className="dm-empty-glyph">∅</div>
          <div className="dm-empty-title">SIN RESULTADOS</div>
          <p>No hay {cfg.title.toLowerCase()} que coincidan con los filtros aplicados.</p>
          <button
            className="dm-btn dm-btn-ghost"
            onClick={() => {
              setCity('TODAS');
              setSort('NUEVOS');
            }}
          >
            LIMPIAR FILTROS
          </button>
        </div>
      ) : (
        <div className="dm-mvpdir-grid">
          {entities.map((e, i) => {
            const name: string = e.name ?? e.stage_name ?? '—';
            const slug: string = e.slug ?? '';
            const cityName: string = e.city ?? e.city_name ?? '';
            const sub: string = e.sub ?? e.years ?? '';
            const verified: boolean = Boolean(e.verified);
            return (
              <Link
                key={slug || i}
                href={slug ? `${cfg.hrefPrefix}/${slug}` : '#'}
                className="dm-mvpdir-card"
              >
                <div
                  className="dm-mvpdir-cover"
                  style={{ background: `linear-gradient(135deg,hsl(${(i * 47) % 360} 40% 22%),hsl(${(i * 47) % 360} 30% 12%))` }}
                >
                  <span>{name.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}</span>
                  {verified && <span className="dm-mvpdir-verified">✓</span>}
                </div>
                <div className="dm-mvpdir-meta-row">
                  <span className="dm-mono-label">{cfg.entity}</span>
                  {cityName && <span className="dm-mono-label">{cityName.toUpperCase()}</span>}
                </div>
                <div className="dm-mvpdir-name">{name}</div>
                {sub && <div className="dm-mvpdir-sub">{sub}</div>}
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
