'use client';

import Comments from '@/components/Comments';

interface ArticlePageProps {
  go: (view: string) => void;
}

export default function ArticlePage({ go }: ArticlePageProps) {
  return (
    <main className="dm-article">
      <div className="dm-crumb">
        <a onClick={() => go('home')}>ARCHIVO</a>
        <span>/</span>
        <a>EDITORIAL</a>
        <span>/</span>
        <span className="dm-crumb-cur">CARACAS 2008–2015</span>
      </div>

      <header className="dm-article-head">
        <div className="dm-article-eyebrow">FEATURE · CARACAS SCENE · 12 MIN READ</div>
        <h1 className="dm-article-title">
          Caracas 2008–2015:
          <br />
          the golden years
          <br />
          of Venezuelan rap.
        </h1>
        <div className="dm-article-byline">
          <span>
            BY <a className="dm-inline">LUIS FIGUERA</a>
          </span>
          <span>·</span>
          <span>14 APR 2026</span>
          <span>·</span>
          <span>9 LINKED ENTITIES · 14 SOURCES</span>
        </div>
      </header>

      <div className="dm-article-grid">
        <section className="dm-article-body">
          <p className="dm-article-lead">
            On November 20, 2012,{' '}
            <a className="dm-inline" onClick={() => go('artist')}>
              Canserbero
            </a>{' '}
            released{' '}
            <a className="dm-inline" onClick={() => go('release')}>
              Apocalipsis
            </a>
            . It was not a debut, it was not a finale — it was a declaration that rap made in{' '}
            <a className="dm-inline">Caracas</a> had a scene, a history, and an archive worth
            writing.
          </p>
          <p>
            Fourteen years later, that archive is still scattered. Interviews buried in forgotten
            PDFs. Credits on dead blogs. Masters on broken hard drives. This article reconstructs,
            fact by fact, what happened in the city between 2008 and 2015{' '}
            <a className="dm-cite">[1]</a>.
          </p>

          <h2 className="dm-article-h2">The first wave</h2>
          <p>
            The Caracas independent circuit took shape around three spaces: the cypher at{' '}
            <a className="dm-inline">Plaza Bron</a>, the live shows at{' '}
            <a className="dm-inline">El Mani Es Asi</a>, and the home studios of{' '}
            <a className="dm-inline">Ahiezer</a> in La Vega. Between 2008 and 2010, more than 40
            artists passed through those three points <a className="dm-cite">[2]</a>.
          </p>
          <p>
            <a className="dm-inline" onClick={() => go('artist')}>
              Apache
            </a>
            , then 22, recorded his first official mixtape in those sessions.{' '}
            <a className="dm-inline">Lil Supa</a>, who came from Maracay, signed his first feature
            with Canserbero on <a className="dm-inline">&ldquo;Maquiavelico&rdquo;</a> (Muerte,
            2010).
          </p>

          <blockquote className="dm-article-pull">
            &ldquo;It was not a movement. It was a building full of people waiting for someone to
            hand them the keys.&rdquo;
            <footer>
              — <a className="dm-inline">AHIEZER</a>, PRODUCER · 2019
            </footer>
          </blockquote>

          <h2 className="dm-article-h2">The archive as politics</h2>
          <p>
            Documenting a scene is a political act. What gets recorded, persists. What gets
            forgotten, disappears. Dauton Media was born out of that question.{' '}
            <a className="dm-inline">View editorial methodology →</a>
          </p>
        </section>

        <aside className="dm-article-side">
          <div className="dm-side-block">
            <div className="dm-section-eyebrow">MENTIONED ENTITIES · 9</div>
            <ul className="dm-entities-list">
              <li>
                <a onClick={() => go('artist')}>
                  <span className="dm-tag-teal">ARTIST</span> Canserbero
                </a>
              </li>
              <li>
                <a>
                  <span className="dm-tag-teal">ARTIST</span> Apache
                </a>
              </li>
              <li>
                <a>
                  <span className="dm-tag-teal">ARTIST</span> Lil Supa
                </a>
              </li>
              <li>
                <a>
                  <span className="dm-tag-teal">PRODUCER</span> Ahiezer
                </a>
              </li>
              <li>
                <a onClick={() => go('release')}>
                  <span className="dm-tag-teal">RELEASE</span> Apocalipsis
                </a>
              </li>
              <li>
                <a>
                  <span className="dm-tag-teal">CITY</span> Caracas
                </a>
              </li>
            </ul>
          </div>

          <div className="dm-side-block">
            <div className="dm-section-eyebrow">SOURCES · 14</div>
            <ol className="dm-sources">
              <li>
                <a className="dm-cite">[1]</a> Dauton Media Archive · Cross-ref 04/2026
              </li>
              <li>
                <a className="dm-cite">[2]</a> Caracas Hip Hop Scene · Documentary, 2019
              </li>
              <li>
                <a className="dm-cite">[3]</a> Red Bull Panamerika · 2012
              </li>
              <li>
                <a className="dm-cite">[4]</a> Interview Ahiezer · El Nacional, 2019
              </li>
            </ol>
          </div>

          <div className="dm-side-block">
            <a
              className="dm-btn dm-btn-primary"
              style={{ width: '100%', textAlign: 'center', display: 'block' }}
            >
              BECOME A MEMBER
            </a>
            <div className="dm-small-note">
              Support the archive. $5/month · Extended editorial access + drops.
            </div>
          </div>
        </aside>
      </div>

      <Comments context="Caracas 2008–2015" />
    </main>
  );
}
