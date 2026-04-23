'use client';

import PlatformLinks from '@/components/PlatformLinks';
import Comments from '@/components/Comments';

interface ReleasePageProps {
  go: (view: string) => void;
}

const tracks: [string, string, string, string, string][] = [
  ['01', 'Intro: La Ira', '01:42', 'AHIEZER', ''],
  ['02', 'Jeremias 17:5', '04:12', 'AHIEZER', ''],
  ['03', 'Pensando en Ti', '03:27', 'AHIEZER', ''],
  ['04', 'Miedo a la Libertad', '05:03', 'AHIEZER', 'FEAT. LIL SUPA'],
  ['05', 'La Muerte', '04:38', 'AHIEZER', ''],
  ['06', 'Apocalipsis', '06:24', 'AHIEZER', ''],
  ['07', 'Ven Conmigo', '03:52', 'AHIEZER', 'FEAT. MCKLOPEDIA'],
  ['08', 'Maldita la Hora', '04:01', 'AHIEZER', ''],
];

export default function ReleasePage({ go }: ReleasePageProps) {
  return (
    <main className="dm-entity">
      <div className="dm-crumb">
        <a onClick={() => go('home')}>ARCHIVO</a>
        <span>/</span>
        <a onClick={() => go('artist')}>CANSERBERO</a>
        <span>/</span>
        <span className="dm-crumb-cur">APOCALIPSIS</span>
      </div>

      <div className="dm-release-hero">
        <div
          className="dm-release-cover"
          style={{ background: 'linear-gradient(135deg,#244C5A 0%,#0a0a0a 100%)' }}
        >
          <div className="dm-release-cover-title">
            APOCA
            <br />
            LIPSIS
          </div>
          <div className="dm-release-cover-year">2012</div>
        </div>

        <div className="dm-release-meta">
          <div className="dm-entity-kind">RELEASE · ALBUM · 16 TRACKS · 38:07</div>
          <h1 className="dm-entity-name">Apocalipsis</h1>
          <div className="dm-release-artist">
            by{' '}
            <a className="dm-inline" onClick={() => go('artist')}>
              Canserbero
            </a>
          </div>

          <div className="dm-release-facts">
            <div>
              <span className="dm-fact-k">LABEL</span>
              <span className="dm-fact-v">Hip Hop Group · VE</span>
            </div>
            <div>
              <span className="dm-fact-k">RELEASED</span>
              <span className="dm-fact-v">20 NOV 2012</span>
            </div>
            <div>
              <span className="dm-fact-k">RECORDED</span>
              <span className="dm-fact-v">2011–2012 · Caracas</span>
            </div>
            <div>
              <span className="dm-fact-k">PRODUCER</span>
              <span className="dm-fact-v">
                <a className="dm-inline">Ahiezer</a>
              </span>
            </div>
            <div>
              <span className="dm-fact-k">COMPLETENESS</span>
              <span className="dm-fact-v" style={{ color: '#ffce37' }}>
                87%
              </span>
            </div>
            <div>
              <span className="dm-fact-k">SCORE</span>
              <span className="dm-fact-v dm-score">8.9</span>
            </div>
          </div>

          <div style={{ marginTop: 'auto' }}>
            <PlatformLinks compact={true} />
            <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
              <button className="dm-btn dm-btn-ghost">SUGGEST CORRECTION</button>
            </div>
          </div>
        </div>
      </div>

      <div className="dm-entity-grid">
        <section className="dm-entity-main">
          <div className="dm-section-eyebrow">TRACKLIST · 16 TRACKS · 38:07</div>
          <table className="dm-tracks">
            <thead>
              <tr>
                <th>#</th>
                <th>TITLE</th>
                <th>DUR</th>
                <th>PROD.</th>
                <th>FEAT.</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((r) => (
                <tr key={r[0]}>
                  <td className="dm-tracks-n">{r[0]}</td>
                  <td className="dm-tracks-t">{r[1]}</td>
                  <td className="dm-tracks-d">{r[2]}</td>
                  <td className="dm-tracks-c">{r[3]}</td>
                  <td className="dm-tracks-c">{r[4]}</td>
                  <td className="dm-tracks-play">↗</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <aside className="dm-entity-side">
          <div
            className="dm-side-block"
            style={{ padding: 0, background: 'transparent', border: 'none' }}
          >
            <PlatformLinks />
          </div>

          <div className="dm-side-block">
            <div className="dm-section-eyebrow">CREDITS</div>
            <ul className="dm-credits">
              <li>
                <b>PRODUCER</b> <a className="dm-inline">Ahiezer</a>
              </li>
              <li>
                <b>MIX</b> <a className="dm-inline">J. Ramos</a>
              </li>
              <li>
                <b>MASTER</b> <a className="dm-inline">Estudio La Voz</a>
              </li>
              <li>
                <b>ARTWORK</b> <a className="dm-inline">D. Perez</a>
              </li>
              <li>
                <b>FEAT.</b> <a className="dm-inline">Lil Supa</a>,{' '}
                <a className="dm-inline">McKlopedia</a>
              </li>
            </ul>
          </div>

          <div className="dm-side-block">
            <div className="dm-section-eyebrow">REVIEWS · 3</div>
            <div className="dm-review-row">
              <div className="dm-score-sm">8.9</div>
              <div>
                <div className="dm-review-pub">DAUTON MEDIA</div>
                <div className="dm-review-txt">
                  &ldquo;Turning point in Venezuelan rap.&rdquo;
                </div>
              </div>
            </div>
            <div className="dm-review-row">
              <div
                className="dm-score-sm"
                style={{ borderColor: 'var(--fg-3)', color: 'var(--fg-3)' }}
              >
                8.5
              </div>
              <div>
                <div className="dm-review-pub">RED BULL PANAMERIKA</div>
                <div className="dm-review-txt">
                  &ldquo;Lyrical density rarely seen.&rdquo;
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <Comments context="Apocalipsis · Canserbero" />
    </main>
  );
}
