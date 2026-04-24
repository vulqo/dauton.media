'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import EntityCard from '@/components/EntityCard';
import PlatformLinks from '@/components/PlatformLinks';
import Comments from '@/components/Comments';

interface PersonWithCity {
  id: string;
  slug: string;
  stage_name: string;
  bio_short: string | null;
  bio_long: string | null;
  status: string;
  verified: boolean;
  is_venezuelan: boolean;
  active_since: string | null;
  origin_city_id: string | null;
  cities: { name: string; slug: string } | null;
}

interface GalleryItem {
  id: string;
  bg: string;
  mono: string;
  title: string;
  year: string;
  credit: string;
  wide?: boolean;
  tall?: boolean;
  border?: boolean;
  inkDark?: boolean;
}

export default function ArtistPage({ person }: { person: PersonWithCity }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const gallery: GalleryItem[] = [
    { id: 'g1', bg: 'linear-gradient(135deg,#244C5A 0%,#0a0a0a 100%)', mono: 'CNS', title: 'Live · Teatro Teresa Carreno', year: '2013', credit: 'Photo: Jesus Castillo', wide: true, tall: true },
    { id: 'g2', bg: 'linear-gradient(135deg,#D93D4A 0%,#3a1318 100%)', mono: '01', title: 'Sesion Apocalipsis', year: '2012', credit: 'Photo: Roberto Mata' },
    { id: 'g3', bg: 'var(--bg-1)', mono: '02', title: 'Estudio Ahiezer', year: '2011', credit: 'Photo: Ahiezer', border: true },
    { id: 'g4', bg: 'linear-gradient(135deg,#04756F 0%,#06251f 100%)', mono: '03', title: 'Backstage La Vega', year: '2010', credit: 'Photo: Luis Noguera' },
    { id: 'g5', bg: 'linear-gradient(135deg,#ffce37 0%,#7a5d00 100%)', mono: '04', title: 'Portrait', year: '2012', credit: 'Photo: Roberto Mata', inkDark: true },
    { id: 'g6', bg: 'linear-gradient(135deg,#0093C6 0%,#062430 100%)', mono: '05', title: 'Red Bull Panamerika', year: '2012', credit: 'Courtesy Red Bull' },
    { id: 'g7', bg: 'var(--bg-1)', mono: '06', title: 'Grabacion Muerte', year: '2010', credit: 'Photo: Ahiezer', border: true },
  ];

  const gIdx = gallery.findIndex((g) => g.id === lightbox);
  const gItem = gallery[gIdx] ?? null;

  useEffect(() => {
    if (!lightbox) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox(gallery[(gIdx + 1) % gallery.length].id);
      if (e.key === 'ArrowLeft') setLightbox(gallery[(gIdx - 1 + gallery.length) % gallery.length].id);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [lightbox, gIdx]);

  const cityName   = person.cities?.name?.toUpperCase() ?? (person.is_venezuelan ? 'VENEZUELA' : 'VENEZUELA');
  const isDeceased = person.status === 'deceased';
  const isVerified = person.verified;
  const activeRange = person.active_since
    ? person.active_since.slice(0, 4)
    : 'ACTIVE';

  const collaborators = [
    { name: 'Ahiezer',              kind: 'PRODUCER',  count: '34 tracks · 3 albums' },
    { name: 'Lil Supa',             kind: 'ARTIST',    count: '12 tracks · 2 tours' },
    { name: 'Apache',               kind: 'ARTIST',    count: '7 tracks · 1 EP' },
    { name: 'McKlopedia',           kind: 'ARTIST',    count: '5 tracks' },
    { name: 'Juan Carlos Ballesta', kind: 'ENGINEER',  count: '3 albums · mix' },
    { name: 'LaMaquinita',          kind: 'DESIGN',    count: '3 covers · 2 videos' },
    { name: 'Roberto Mata',         kind: 'PHOTO',     count: 'Sessions 2010-2013' },
  ];

  const tracks: string[][] = [
    ['01', 'Jeremias 17:5',      'Apocalipsis',   'Ahiezer', '—',                 '04:12'],
    ['02', 'Maquiavelico',       'Muerte',        'Ahiezer', 'Lil Supa',          '03:48'],
    ['03', 'Es Epico',           'Muerte',        'Ahiezer', '—',                 '05:02'],
    ['04', 'Pensando en Ti',     'Apocalipsis',   'Ahiezer', '—',                 '03:27'],
    ['05', "C'est La Mort",      'Muerte',        'Ahiezer', 'Apache, McKlopedia', '04:54'],
    ['06', 'Un Dia en el Barrio','Noche Cerrada', 'Ahiezer', 'Lil Supa',          '04:08'],
  ];

  const pastEvents: string[][] = [
    ['14·DIC·2014', 'Lo Esencial · Ultimas Tres Fechas',  'Teatro Municipal, Caracas',  'con Lil Supa, Apache · org. Ahiezer Music'],
    ['28·JUN·2014', 'Festival Nuevas Bandas',              'Plaza Altamira, Caracas',    'Lineup: 12 acts · curation: Red Bull'],
    ['03·OCT·2013', 'Lanzamiento "Indignacion"',           'Teatro Teresa Carreno',      'con McKlopedia, Gema · backdrop: Roberto Mata'],
    ['22·MAR·2013', 'Caracas Underground Session',         'La Quinta Bar',              'Sound: Luis Noguera · Photo: Jesus Castillo'],
    ['18·AGO·2012', 'Red Bull Panamerika',                 'Estudio 1, Caracas',         'Audiovisual recording · dir. Roberto Mata'],
    ['11·NOV·2011', 'Muerte · Gira Final',                 'Poliedro de Caracas',        'Support: Apache, Lil Supa · prod. Ahiezer'],
  ];

  return (
    <main className="dm-entity">
      <div className="dm-crumb">
        <Link href="/">DAUTON</Link><span>/</span>
        <Link href={person.cities ? `/cities/${person.cities.slug}` : '/cities'}>{cityName}</Link><span>/</span>
        <Link href="/artists">ARTISTS</Link><span>/</span>
        <span className="dm-crumb-cur">{person.stage_name.toUpperCase()}</span>
      </div>

      <header className="dm-art-hero">
        <div
          className="dm-art-portrait"
          style={{ background: 'linear-gradient(135deg,#244C5A 0%,#0a0a0a 55%,#3a1318 100%)' }}
        >
          <div className="dm-art-portrait-mono">{person.stage_name.charAt(0).toUpperCase()}</div>
          <div className="dm-art-portrait-foot">
            <span>{cityName} · VE</span>
            {isDeceased && <span style={{ color: '#D93D4A', fontWeight: 700 }}>IN MEMORIAM</span>}
          </div>
        </div>
        <div className="dm-art-head">
          <div className="dm-art-kind">ARTIST · MC · PRODUCER</div>
          <h1 className="dm-art-name">
            {person.stage_name}
            {isVerified && <span className="dm-verified-lg">✓ VERIFIED</span>}
          </h1>
          <div className="dm-art-loc">
            <b>{cityName}</b><em>·</em><span>VE</span><em>·</em><span>{activeRange}</span>
          </div>
          <div className="dm-art-actions">
            <button className="dm-btn dm-btn-primary">FOLLOW · 12.4K</button>
            <button className="dm-btn dm-btn-secondary">SHARE</button>
            <PlatformLinks compact={true} />
          </div>
        </div>
      </header>

      <div className="dm-entity-stats">
        <div className="dm-empty-state">
          <span className="dm-section-eyebrow">NO DATA · COMING SOON</span>
        </div>
      </div>

      <div className="dm-entity-grid">
        <section className="dm-entity-main">
          <div className="dm-section-eyebrow">BIO</div>
          <p className="dm-bio">
            {person.bio_short ?? (
              <span style={{ color: 'var(--fg-3)' }}>No biography available yet.</span>
            )}
          </p>

          <div className="dm-section-head" style={{ marginTop: 36 }}>
            <div>
              <div className="dm-section-eyebrow">DISCOGRAPHY</div>
            </div>
          </div>
          <div className="dm-empty-state">
            <span className="dm-section-eyebrow">NO DATA · COMING SOON</span>
          </div>

          <div className="dm-section-head" style={{ marginTop: 36 }}>
            <div>
              <div className="dm-section-eyebrow">GALLERY</div>
              <div className="dm-art-alt">{gallery.length} images</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button className="dm-btn dm-btn-secondary" onClick={() => setUploadOpen(true)}>+ UPLOAD PHOTO</button>
              <a className="dm-section-more">VIEW ALL →</a>
            </div>
          </div>
          <div className="dm-gallery">
            {gallery.map((g) => (
              <div
                key={g.id}
                className={`dm-gallery-item${g.wide ? ' is-wide' : ''}${g.tall ? ' is-tall' : ''}`}
                style={{ background: g.bg, border: g.border ? '1px solid var(--border-1)' : 'none' }}
                onClick={() => setLightbox(g.id)}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 14,
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: g.wide || g.tall ? 48 : 28,
                    lineHeight: 0.9,
                    letterSpacing: '-.03em',
                    color: g.inkDark ? 'rgba(0,0,0,.4)' : 'rgba(255,255,255,.3)',
                  }}
                >
                  {g.mono}
                </div>
                <div className="dm-gallery-cap">
                  <b>{g.title}</b>
                  <em>{g.year} · {g.credit}</em>
                </div>
              </div>
            ))}
          </div>

          <div className="dm-section-eyebrow" style={{ marginTop: 40 }}>FEATURED TRACKS</div>
          <div className="dm-empty-state">
            <span className="dm-section-eyebrow">NO DATA · COMING SOON</span>
          </div>

          <div className="dm-section-head" style={{ marginTop: 40 }}>
            <div>
              <div className="dm-section-eyebrow">EVENT HISTORY</div>
            </div>
          </div>
          <div className="dm-empty-state">
            <span className="dm-section-eyebrow">NO DATA · COMING SOON</span>
          </div>
        </section>

        <aside className="dm-entity-side">
          <div className="dm-side-block">
            <div className="dm-section-eyebrow">FREQUENT COLLABORATORS</div>
            <div className="dm-empty-state">
              <span className="dm-section-eyebrow">NO DATA · COMING SOON</span>
            </div>
          </div>

          <div className="dm-side-block">
            <div className="dm-section-eyebrow">SCENE</div>
            <div className="dm-tags">
              <span className="dm-pill">{cityName}</span>
              <span className="dm-pill">VENEZUELA</span>
              {person.active_since && (
                <span className="dm-pill">{person.active_since.slice(0, 4)}</span>
              )}
            </div>
          </div>

          <div className="dm-side-block">
            <div className="dm-section-eyebrow">EDITORIAL COVERAGE</div>
            <div className="dm-empty-state">
              <span className="dm-section-eyebrow">NO DATA · COMING SOON</span>
            </div>
          </div>
        </aside>
      </div>

      <Comments context={person.stage_name} />

      <details className="dm-admin-drawer">
        <summary>· moderation</summary>
        <div className="dm-admin-panel">
          <p>Restricted actions. Require authentication and editorial review before being applied.</p>
          <button>Suggest correction</button>
          <button>Claim this profile</button>
          <button>Report an issue</button>
          <button>View edit history</button>
        </div>
      </details>

      {lightbox && gItem && (
        <div className="dm-lightbox" onClick={() => setLightbox(null)}>
          <button
            className="dm-lightbox-close"
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
          >
            ESC · CLOSE
          </button>
          <button
            className="dm-lightbox-nav is-prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(gallery[(gIdx - 1 + gallery.length) % gallery.length].id);
            }}
          >
            ←
          </button>
          <button
            className="dm-lightbox-nav is-next"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox(gallery[(gIdx + 1) % gallery.length].id);
            }}
          >
            →
          </button>
          <div
            className="dm-lightbox-inner"
            style={{
              background: gItem.bg,
              border: gItem.border ? '1px solid var(--border-1)' : 'none',
              color: gItem.inkDark ? 'var(--bg-0)' : 'var(--fg-0)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dm-lightbox-mono">{gItem.mono}</div>
            <div className="dm-lightbox-cap">
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 22,
                    letterSpacing: '-.01em',
                    marginBottom: 6,
                    fontWeight: 700,
                  }}
                >
                  {gItem.title}
                </div>
                <div style={{ opacity: 0.75 }}>{gItem.year} · {gItem.credit}</div>
              </div>
              <div style={{ opacity: 0.75, textAlign: 'right' }}>
                <div>{person.stage_name.toUpperCase()}</div>
                <div>{gIdx + 1} / {gallery.length}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
