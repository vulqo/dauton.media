import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type List = any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Item = any;

interface UserListPageProps {
  list?: List | null;
  items?: Item[];
}

function itemHref(type: string, slug: string): string {
  const t = type.toLowerCase();
  if (t === 'artist' || t === 'producer') return `/artists/${slug}`;
  if (t === 'release') return `/releases/${slug}`;
  if (t === 'label') return `/labels/${slug}`;
  if (t === 'crew') return `/crews/${slug}`;
  if (t === 'event') return `/events/${slug}`;
  if (t === 'track') return `/tracks/${slug}`;
  return '#';
}

export default function UserListPage({ list = null, items = [] }: UserListPageProps) {
  if (!list) {
    return (
      <main className="dm-userlist">
        <div className="dm-section-eyebrow">LISTA PÚBLICA</div>
        <h1 className="dm-userlist-h1">Lista</h1>
        <div className="dm-empty-state">
          <div className="dm-empty-glyph">∅</div>
          <div className="dm-empty-title">PRÓXIMAMENTE</div>
          <p>Esta lista aún no está disponible.</p>
          <Link href="/" className="dm-btn dm-btn-ghost">VOLVER AL INICIO</Link>
        </div>
      </main>
    );
  }

  const author: string = list.author ?? 'anónimo';
  const title: string = list.title ?? 'Lista sin título';
  const dek: string = list.dek ?? '';
  const count: number = items.length;

  return (
    <main className="dm-userlist">
      <div className="dm-userlist-head">
        <div className="dm-section-eyebrow">LISTA PÚBLICA · POR @{author}</div>
        <h1 className="dm-userlist-h1">{title}</h1>
        {dek && <p className="dm-userlist-dek">{dek}</p>}
        <div className="dm-userlist-meta">
          <span className="dm-mono-label">{count} entidades</span>
          <div className="dm-userlist-actions">
            <button className="dm-btn dm-btn-ghost">GUARDAR</button>
            <button className="dm-btn dm-btn-ghost">COMPARTIR</button>
            <button className="dm-btn dm-btn-ghost">DUPLICAR</button>
          </div>
        </div>
      </div>

      {count === 0 ? (
        <div className="dm-empty-state">
          <span className="dm-section-eyebrow">LISTA VACÍA</span>
        </div>
      ) : (
        <ol className="dm-userlist-items">
          {items.map((it, i) => {
            const name: string = it.name ?? '—';
            const type: string = it.type ?? 'ENTITY';
            const meta: string = it.meta ?? '';
            const slug: string = it.slug ?? '';
            return (
              <li key={i} className="dm-userlist-row">
                <span className="dm-userlist-idx">{String(i + 1).padStart(2, '0')}</span>
                <div
                  className="dm-userlist-cov"
                  style={{ background: `linear-gradient(135deg,hsl(${(i * 70) % 360} 40% 22%),hsl(${(i * 70) % 360} 25% 10%))` }}
                >
                  {name[0]}
                </div>
                <div className="dm-userlist-body">
                  <div className="dm-userlist-row-top">
                    <span className="dm-mono-label">{type}</span>
                    {meta && <span className="dm-mono-label">{meta}</span>}
                  </div>
                  <Link href={itemHref(type, slug)} className="dm-userlist-name">
                    {name}
                  </Link>
                </div>
                <span className="dm-mono-label dm-userlist-cta">VER →</span>
              </li>
            );
          })}
        </ol>
      )}
    </main>
  );
}
