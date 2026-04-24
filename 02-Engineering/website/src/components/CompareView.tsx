import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Entity = any;

interface CompareViewProps {
  entities?: Entity[];
}

export default function CompareView({ entities = [] }: CompareViewProps) {
  if (!entities || entities.length === 0) {
    return (
      <main className="dm-compare">
        <div className="dm-section-eyebrow">COMPARE</div>
        <h1 className="dm-compare-h1">Compara entidades</h1>
        <p className="dm-compare-dek">Añade 2 a 4 entidades para ver sus datos lado a lado.</p>
        <div className="dm-empty-state">
          <div className="dm-empty-glyph">∅</div>
          <div className="dm-empty-title">NADA PARA COMPARAR</div>
          <p>Elige entidades desde el directorio o la búsqueda para empezar.</p>
          <Link href="/directory/artist" className="dm-btn dm-btn-ghost">EXPLORAR ARTISTAS</Link>
        </div>
      </main>
    );
  }

  const rows: Array<[string, (e: Entity) => string | number]> = [
    ['ROL', (e) => e.role ?? '—'],
    ['CIUDAD', (e) => e.city ?? '—'],
    ['AÑOS ACTIVOS', (e) => e.years ?? '—'],
    ['RELEASES', (e) => e.releases ?? 0],
    ['TRACKS', (e) => e.tracks ?? 0],
    ['COLABORACIONES', (e) => e.collabs ?? 0],
    ['PRODUCTORES PRINCIPALES', (e) => Array.isArray(e.producers) ? e.producers.join(', ') : '—'],
    ['COMPLETITUD', (e) => (e.completeness != null ? `${e.completeness}%` : '—')],
    ['VERIFICADO', (e) => (e.verified ? 'sí' : 'no')],
  ];

  return (
    <main className="dm-compare">
      <div className="dm-section-eyebrow">COMPARE · {entities.length} ENTIDADES</div>
      <h1 className="dm-compare-h1">Comparación lado a lado</h1>
      <p className="dm-compare-dek">
        Los datos provienen del archivo Dauton Media y son editables por la comunidad.
      </p>

      <div className="dm-compare-actions">
        <button className="dm-btn dm-btn-ghost">+ AÑADIR ENTIDAD</button>
        <button className="dm-btn dm-btn-ghost">EXPORTAR CSV</button>
        <button className="dm-btn dm-btn-ghost">COMPARTIR</button>
      </div>

      <div className="dm-compare-table">
        <div className="dm-compare-header">
          <div />
          {entities.map((e, i) => (
            <div key={i} className="dm-compare-col-head">
              <div
                className="dm-compare-cov"
                style={{ background: `linear-gradient(135deg,hsl(${(i * 80) % 360} 40% 22%),hsl(${(i * 80) % 360} 25% 10%))` }}
              >
                <span>
                  {(e.name ?? '??').split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                </span>
              </div>
              <Link href={e.slug ? `/artists/${e.slug}` : '#'} className="dm-compare-name">
                {e.name ?? '—'}
              </Link>
              <button className="dm-compare-remove">× quitar</button>
            </div>
          ))}
        </div>

        {rows.map(([label, fn]) => (
          <div key={label} className="dm-compare-row">
            <div className="dm-compare-row-label">{label}</div>
            {entities.map((e, i) => (
              <div key={i} className="dm-compare-cell">{fn(e)}</div>
            ))}
          </div>
        ))}
      </div>

      <div className="dm-compare-foot">
        <span className="dm-mono-label">Fuentes · metodología · </span>
        <Link href="/methodology">Cómo construimos este archivo</Link>
      </div>
    </main>
  );
}
