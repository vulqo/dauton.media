import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Label = any;

interface LabelProfileProps {
  label?: Label | null;
}

export default function LabelProfile({ label = null }: LabelProfileProps) {
  if (!label) {
    return (
      <main className="dm-entity">
        <div className="dm-section-eyebrow">LABEL</div>
        <h1 className="dm-entity-title">Sello</h1>
        <div className="dm-empty-state">
          <div className="dm-empty-glyph">∅</div>
          <div className="dm-empty-title">PRÓXIMAMENTE</div>
          <p>El perfil de este sello aún no está disponible en el archivo.</p>
          <Link href="/directory/label" className="dm-btn dm-btn-ghost">VER TODOS LOS SELLOS</Link>
        </div>
      </main>
    );
  }

  const name: string = label.name ?? 'Sello';
  const city: string = label.city ?? '—';
  const founded: string = label.founded ?? '—';
  const roster: Array<[string, string, string, boolean]> = label.roster ?? [];
  const releases: Array<[string, string, string, string]> = label.releases ?? [];
  const monogram = name
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="dm-entity">
      <header className="dm-entity-hero">
        <div
          className="dm-entity-cov"
          style={{ background: 'linear-gradient(135deg,#7a3e1c,#2a1208)' }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 120, color: '#fff', letterSpacing: '-.04em' }}>
            {monogram}
          </span>
        </div>
        <div className="dm-entity-body">
          <div className="dm-section-eyebrow">
            LABEL · {city.toUpperCase()} · FUNDADO {founded}
          </div>
          <h1 className="dm-entity-title">{name}</h1>
          {label.dek && <p className="dm-entity-dek">{label.dek}</p>}

          <div className="dm-entity-meta">
            <div><span className="dm-mono-label">FUNDADOR</span><span>{label.founder ?? '—'}</span></div>
            <div><span className="dm-mono-label">SEDE</span><span>{label.hq ?? city}</span></div>
            <div><span className="dm-mono-label">ROSTER</span><span>{roster.length || '—'} artistas</span></div>
            <div><span className="dm-mono-label">RELEASES</span><span>{releases.length || '—'}</span></div>
          </div>
        </div>
      </header>

      <section className="dm-entity-section">
        <div className="dm-section-eyebrow">ARTISTAS EN EL ROSTER · {roster.length}</div>
        {roster.length === 0 ? (
          <div className="dm-empty-state">
            <span className="dm-section-eyebrow">NO DATA · COMING SOON</span>
          </div>
        ) : (
          <div className="dm-mvpdir-grid">
            {roster.map((a, i) => (
              <Link
                key={i}
                href={`/artists/${a[0].toLowerCase().replace(/\s+/g, '-')}`}
                className="dm-mvpdir-card"
              >
                <div
                  className="dm-mvpdir-cover"
                  style={{ background: `linear-gradient(135deg,hsl(${(i * 60) % 360} 40% 22%),hsl(${(i * 60) % 360} 25% 10%))` }}
                >
                  <span>{a[0].split(' ').map((w: string) => w[0]).join('').slice(0, 2)}</span>
                  {a[3] && <span className="dm-mvpdir-verified">✓</span>}
                </div>
                <div className="dm-mvpdir-meta-row">
                  <span className="dm-mono-label">ARTIST</span>
                  <span className="dm-mono-label">{a[2].toUpperCase()}</span>
                </div>
                <div className="dm-mvpdir-name">{a[0]}</div>
                <div className="dm-mvpdir-sub">{a[1]}</div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="dm-entity-section">
        <div className="dm-section-eyebrow">RELEASES · {releases.length}</div>
        {releases.length === 0 ? (
          <div className="dm-empty-state">
            <span className="dm-section-eyebrow">NO DATA · COMING SOON</span>
          </div>
        ) : (
          <div className="dm-entity-releases">
            {releases.map((r, i) => (
              <Link
                key={i}
                href={`/releases/${r[0].toLowerCase().replace(/\s+/g, '-')}`}
                className="dm-entity-release-row"
              >
                <div
                  className="dm-rel-cov"
                  style={{ background: `linear-gradient(135deg,hsl(${(i * 83) % 360} 45% 20%),hsl(${(i * 83) % 360} 30% 8%))` }}
                >
                  {r[0][0]}
                </div>
                <div className="dm-rel-body">
                  <div className="dm-rel-t">{r[0]}</div>
                  <div className="dm-rel-m">{r[3]} · {r[2]} · {r[1]}</div>
                </div>
                <span className="dm-mono-label">VER →</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
