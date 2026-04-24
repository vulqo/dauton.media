import Link from 'next/link';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Track = any;

interface TrackPageProps {
  track?: Track | null;
}

export default function TrackPage({ track = null }: TrackPageProps) {
  if (!track) {
    return (
      <main className="dm-entity">
        <div className="dm-section-eyebrow">TRACK</div>
        <h1 className="dm-entity-title">Pista</h1>
        <div className="dm-empty-state">
          <div className="dm-empty-glyph">∅</div>
          <div className="dm-empty-title">PRÓXIMAMENTE</div>
          <p>Esta pista aún no está disponible en el archivo.</p>
          <Link href="/" className="dm-btn dm-btn-ghost">VOLVER AL INICIO</Link>
        </div>
      </main>
    );
  }

  const title: string = track.title ?? 'Pista';
  const artist: string = track.artist ?? '—';
  const album: string = track.album ?? '—';
  const albumSlug: string | null = track.album_slug ?? null;
  const trackNo: string = track.track_no ?? '—';
  const length: string = track.length ?? '—';

  return (
    <main className="dm-entity">
      <header className="dm-entity-hero">
        {albumSlug && (
          <Link className="dm-breadcrumb" href={`/releases/${albumSlug}`}>
            <span className="dm-mono-label">{album.toUpperCase()}</span>
            <span>← volver al release</span>
          </Link>
        )}
        <div className="dm-section-eyebrow" style={{ marginTop: 12 }}>
          TRACK · {trackNo} · {length}
        </div>
        <h1 className="dm-entity-title">{title}</h1>
        {track.dek && <p className="dm-entity-dek">{track.dek}</p>}

        <div className="dm-entity-meta">
          <div><span className="dm-mono-label">ARTIST</span><span>{artist}</span></div>
          <div><span className="dm-mono-label">ALBUM</span><span>{album}</span></div>
          <div><span className="dm-mono-label">LENGTH</span><span>{length}</span></div>
          {track.bpm && <div><span className="dm-mono-label">BPM</span><span>{track.bpm}</span></div>}
          {track.date && <div><span className="dm-mono-label">FECHA</span><span>{track.date}</span></div>}
        </div>
      </header>

      <div className="dm-entity-split">
        <section className="dm-entity-section">
          <div className="dm-section-eyebrow">CRÉDITOS</div>
          <div className="dm-empty-state">
            <span className="dm-section-eyebrow">NO DATA · COMING SOON</span>
          </div>
        </section>

        <aside className="dm-entity-aside">
          <div className="dm-section-eyebrow">ESCUCHAR</div>
          <div className="dm-empty-state">
            <span className="dm-section-eyebrow">NO DATA · COMING SOON</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
