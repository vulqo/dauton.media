import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Crew = any;

interface CrewProfileProps {
  crew?: Crew | null;
}

export default function CrewProfile({ crew = null }: CrewProfileProps) {
  if (!crew) {
    return (
      <main className="dm-entity">
        <div className="dm-section-eyebrow">CREW</div>
        <h1 className="dm-entity-title">Crew</h1>
        <div className="dm-empty-state">
          <div className="dm-empty-glyph">∅</div>
          <div className="dm-empty-title">PRÓXIMAMENTE</div>
          <p>El perfil de este crew aún no está disponible en el archivo.</p>
          <Link href="/" className="dm-btn dm-btn-ghost">VOLVER AL INICIO</Link>
        </div>
      </main>
    );
  }

  const name: string = crew.name ?? 'Crew';
  const city: string = crew.city ?? '—';
  const period: string = crew.period ?? '—';
  const members: Array<[string, string]> = crew.members ?? [];
  const releases: Array<[string, string, string, string]> = crew.releases ?? [];
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
          style={{ background: 'linear-gradient(135deg,#304c7b,#0f1a2e)' }}
        >
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 110, color: '#fff', letterSpacing: '-.04em' }}>
            {monogram}
          </span>
        </div>
        <div className="dm-entity-body">
          <div className="dm-section-eyebrow">
            CREW · {city.toUpperCase()} · {period}
          </div>
          <h1 className="dm-entity-title">{name}</h1>
          {crew.dek && <p className="dm-entity-dek">{crew.dek}</p>}

          <div className="dm-entity-meta">
            <div><span className="dm-mono-label">MIEMBROS</span><span>{members.length || '—'}</span></div>
            <div><span className="dm-mono-label">CIUDAD</span><span>{city}</span></div>
            <div><span className="dm-mono-label">PERÍODO</span><span>{period}</span></div>
            <div><span className="dm-mono-label">SESIONES</span><span>{crew.sessions ?? '—'}</span></div>
          </div>
        </div>
      </header>

      <section className="dm-entity-section">
        <div className="dm-section-eyebrow">MIEMBROS · {members.length}</div>
        {members.length === 0 ? (
          <div className="dm-empty-state">
            <span className="dm-section-eyebrow">NO DATA · COMING SOON</span>
          </div>
        ) : (
          <div className="dm-mvpdir-grid">
            {members.map((m, i) => (
              <Link
                key={i}
                href={`/artists/${m[0].toLowerCase().replace(/\s+/g, '-')}`}
                className="dm-mvpdir-card"
              >
                <div
                  className="dm-mvpdir-cover"
                  style={{ background: `linear-gradient(135deg,hsl(${(i * 30) % 360} 40% 22%),hsl(${(i * 30) % 360} 25% 10%))` }}
                >
                  <span>
                    {m[0].split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div className="dm-mvpdir-meta-row">
                  <span className="dm-mono-label">{m[1]}</span>
                  <span className="dm-mono-label">{city.toUpperCase()}</span>
                </div>
                <div className="dm-mvpdir-name">{m[0]}</div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="dm-entity-section">
        <div className="dm-section-eyebrow">LANZAMIENTOS COMPARTIDOS · {releases.length}</div>
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
