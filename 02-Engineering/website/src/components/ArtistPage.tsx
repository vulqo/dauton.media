'use client';
import React, { useState, useEffect } from 'react';
import EntityCard from '@/components/EntityCard';
import PlatformLinks from '@/components/PlatformLinks';
import Comments from '@/components/Comments';

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

interface CollaboratorEntry {
  name: string;
  kind: string;
  count: string;
}

export default function ArtistPage({ go }: { go: (view: string) => void }) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const gallery: GalleryItem[] = [
    { id: 'g1', bg: 'linear-gradient(135deg,#244C5A 0%,#0a0a0a 100%)', mono: 'CNS', title: 'Live · Teatro Teresa Carreno', year: '2013', credit: 'Foto: Jesus Castillo', wide: true, tall: true },
    { id: 'g2', bg: 'linear-gradient(135deg,#D93D4A 0%,#3a1318 100%)', mono: '01', title: 'Sesion Apocalipsis', year: '2012', credit: 'Foto: Roberto Mata' },
    { id: 'g3', bg: 'var(--bg-1)', mono: '02', title: 'Estudio Ahiezer', year: '2011', credit: 'Foto: Ahiezer', border: true },
    { id: 'g4', bg: 'linear-gradient(135deg,#04756F 0%,#06251f 100%)', mono: '03', title: 'Backstage La Vega', year: '2010', credit: 'Foto: Luis Noguera' },
    { id: 'g5', bg: 'linear-gradient(135deg,#ffce37 0%,#7a5d00 100%)', mono: '04', title: 'Portrait', year: '2012', credit: 'Foto: Roberto Mata', inkDark: true },
    { id: 'g6', bg: 'linear-gradient(135deg,#0093C6 0%,#062430 100%)', mono: '05', title: 'Red Bull Panamerika', year: '2012', credit: 'Cortesia Red Bull' },
    { id: 'g7', bg: 'var(--bg-1)', mono: '06', title: 'Grabacion Muerte', year: '2010', credit: 'Foto: Ahiezer', border: true },
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

  const collaborators: CollaboratorEntry[] = [
    { name: 'Ahiezer',            kind: 'PRODUCER',  count: '34 tracks · 3 albums' },
    { name: 'Lil Supa',           kind: 'ARTIST',    count: '12 tracks · 2 giras' },
    { name: 'Apache',             kind: 'ARTIST',    count: '7 tracks · 1 EP' },
    { name: 'McKlopedia',         kind: 'ARTIST',    count: '5 tracks' },
    { name: 'Juan Carlos Ballesta', kind: 'ENGINEER', count: '3 albums · mezcla' },
    { name: 'LaMaquinita',        kind: 'DESIGN',    count: '3 portadas · 2 videos' },
    { name: 'Roberto Mata',       kind: 'PHOTO',     count: 'Sesiones 2010-2013' },
  ];

  const tracks: string[][] = [
    ['01', 'Jeremias 17:5',   'Apocalipsis', 'Ahiezer', '—',                    '04:12'],
    ['02', 'Maquiavelico',    'Muerte',      'Ahiezer', 'Lil Supa',             '03:48'],
    ['03', 'Es Epico',        'Muerte',      'Ahiezer', '—',                    '05:02'],
    ['04', 'Pensando en Ti',  'Apocalipsis', 'Ahiezer', '—',                    '03:27'],
    ['05', "C'est La Mort",   'Muerte',      'Ahiezer', 'Apache, McKlopedia',   '04:54'],
    ['06', 'Un Dia en el Barrio', 'Noche Cerrada', 'Ahiezer', 'Lil Supa',      '04:08'],
  ];

  const pastEvents: string[][] = [
    ['14·DIC·2014', 'Lo Esencial · Ultimas Tres Fechas',   'Teatro Municipal, Caracas', 'con Lil Supa, Apache · org. Ahiezer Music'],
    ['28·JUN·2014', 'Festival Nuevas Bandas',               'Plaza Altamira, Caracas',   'Lineup: 12 actos · curaduria: Red Bull'],
    ['03·OCT·2013', 'Lanzamiento "Indignacion"',            'Teatro Teresa Carreno',     'con McKlopedia, Gema · backdrop: Roberto Mata'],
    ['22·MAR·2013', 'Caracas Underground Session',          'La Quinta Bar',             'Sonido: Luis Noguera · Foto: Jesus Castillo'],
    ['18·AGO·2012', 'Red Bull Panamerika',                  'Estudio 1, Caracas',        'Grabacion audiovisual · dir. Roberto Mata'],
    ['11·NOV·2011', 'Muerte · Gira Final',                  'Poliedro de Caracas',       'Soporte: Apache, Lil Supa · prod. Ahiezer'],
  ];

  return (
    <main className="dm-entity">
      <div className="dm-crumb">
        <a onClick={() => go('home')}>DAUTON</a><span>/</span>
        <a onClick={() => go('ciudades')}>CARACAS</a><span>/</span>
        <a>ARTISTAS</a><span>/</span>
        <span className="dm-crumb-cur">CANSERBERO</span>
      </div>

      <header className="dm-art-hero">
        <div
          className="dm-art-portrait"
          style={{ background: 'linear-gradient(135deg,#244C5A 0%,#0a0a0a 55%,#3a1318 100%)' }}
        >
          <div className="dm-art-portrait-mono">C</div>
          <div className="dm-art-portrait-foot">
            <span>CARACAS · VE</span>
            <span>EST. 2003</span>
          </div>
        </div>
        <div className="dm-art-head">
          <div className="dm-art-kind">ARTIST · MC · PRODUCTOR</div>
          <h1 className="dm-art-name">
            Canserbero
            <span className="dm-verified-lg">✓ VERIFIED</span>
          </h1>
          <div className="dm-art-alt">Tirone Jose Gonzalez Orama · alias "Pregonero"</div>
          <div className="dm-art-loc">
            <b>CARACAS</b><em>·</em><span>VE</span><em>·</em><span>ACTIVO 2003-2015</span>
          </div>
          <div className="dm-art-actions">
            <button className="dm-btn dm-btn-primary">SEGUIR · 12.4K</button>
            <button className="dm-btn dm-btn-secondary">COMPARTIR</button>
            <PlatformLinks compact={true} />
          </div>
        </div>
      </header>

      <a className="dm-art-nextup" onClick={() => go('event')}>
        <div className="dm-art-nextup-date">
          <div className="dm-art-nextup-date-d">23</div>
          <div className="dm-art-nextup-date-m">NOV · SAB</div>
        </div>
        <div className="dm-art-nextup-body">
          <div className="dm-art-nextup-eyebrow">◉ PROXIMO EVENTO · TRIBUTO</div>
          <div className="dm-art-nextup-title">10 Anos · Noche Cerrada</div>
          <div className="dm-art-nextup-meta">Teatro Teresa Carreno · Caracas · 20:00 · con Lil Supa, Apache, Ahiezer (dj set)</div>
        </div>
        <button className="dm-btn dm-btn-primary">RSVP →</button>
      </a>

      <div className="dm-entity-stats">
        <div className="dm-stat"><div className="dm-stat-label">RELEASES</div><div className="dm-stat-val">12</div></div>
        <div className="dm-stat"><div className="dm-stat-label">TRACKS</div><div className="dm-stat-val">147</div></div>
        <div className="dm-stat"><div className="dm-stat-label">COLABORADORES</div><div className="dm-stat-val">34</div></div>
        <div className="dm-stat"><div className="dm-stat-label">EVENTOS</div><div className="dm-stat-val">84</div></div>
        <div className="dm-stat"><div className="dm-stat-label">FUENTES</div><div className="dm-stat-val">28</div></div>
        <div className="dm-stat"><div className="dm-stat-label">ARTICULOS</div><div className="dm-stat-val">9</div></div>
      </div>

      <div className="dm-entity-grid">
        <section className="dm-entity-main">
          <div className="dm-section-eyebrow">BIO</div>
          <p className="dm-bio">
            Rapero venezolano nacido en <a className="dm-inline">Caracas</a> en 1988. Considerado una de las figuras
            mas influyentes del rap hispanohablante, especialmente por la densidad lirica y el uso de referencias
            religiosas y filosoficas. Colaborador frecuente de <a className="dm-inline">Lil Supa</a>,{' '}
            <a className="dm-inline">Apache</a> y <a className="dm-inline">McKlopedia</a>. Produccion casi en
            exclusiva de <a className="dm-inline">Ahiezer</a>. Fallecido en enero de 2015{' '}
            <a className="dm-cite">[1]</a>.
          </p>

          <div className="dm-section-eyebrow" style={{ marginTop: 36 }}>ULTIMO LANZAMIENTO</div>
          <article className="dm-art-spot" onClick={() => go('release')}>
            <div
              className="dm-art-spot-cover"
              style={{ background: 'linear-gradient(135deg,#244C5A 0%,#0a0a0a 100%)' }}
            >
              <div className="dm-art-spot-cover-title" style={{ whiteSpace: 'pre-line' }}>{'APOCA\nLIPSIS'}</div>
              <div className="dm-art-spot-cover-year">2012</div>
            </div>
            <div className="dm-art-spot-body">
              <div className="dm-art-spot-eye">ALBUM · 16 TRACKS · 58:42</div>
              <div className="dm-art-spot-title">Apocalipsis</div>
              <div className="dm-art-spot-meta">
                Prod. <b style={{ color: 'var(--fg-0)' }}>Ahiezer</b> · Mezcla{' '}
                <b style={{ color: 'var(--fg-0)' }}>Juan Carlos Ballesta</b> · Master{' '}
                <b style={{ color: 'var(--fg-0)' }}>Simon Heyworth</b> · Arte{' '}
                <b style={{ color: 'var(--fg-0)' }}>LaMaquinita</b>
              </div>
              <div className="dm-art-spot-meta">Feat. Lil Supa · Rapsusklei · Nach · Gema</div>
              <div className="dm-art-spot-score">9.2<small>· 4 resenas</small></div>
            </div>
          </article>

          <div className="dm-section-head" style={{ marginTop: 36 }}>
            <div>
              <div className="dm-section-eyebrow">DISCOGRAFIA</div>
              <div className="dm-art-alt">12 RELEASES · 2003-2015</div>
            </div>
            <a className="dm-section-more">VER TODOS →</a>
          </div>
          <div className="dm-grid-3">
            <div>
              <EntityCard kind="ALBUM" year="2012" title="Apocalipsis" subtitle="16 TRACKS · 58:42" cover="apocalipsis" onClick={() => go('release')} />
              <div className="dm-card-meta" style={{ marginTop: 8, fontSize: 11, lineHeight: 1.5 }}>Prod. Ahiezer · Feat. Lil Supa, Rapsusklei, Nach</div>
            </div>
            <div>
              <EntityCard kind="ALBUM" year="2010" title="Muerte" subtitle="14 TRACKS · 48:20" cover="muerte" />
              <div className="dm-card-meta" style={{ marginTop: 8, fontSize: 11, lineHeight: 1.5 }}>Prod. Ahiezer · Feat. Lil Supa, Apache, McKlopedia</div>
            </div>
            <div>
              <EntityCard kind="EP" year="2009" title="Noche Cerrada" subtitle="7 TRACKS · 24:18" cover="noche" />
              <div className="dm-card-meta" style={{ marginTop: 8, fontSize: 11, lineHeight: 1.5 }}>Prod. Ahiezer · Feat. Lil Supa · Arte: Raul Cabrera</div>
            </div>
          </div>

          <div className="dm-section-head" style={{ marginTop: 40 }}>
            <div>
              <div className="dm-section-eyebrow">GALERIA</div>
              <div className="dm-art-alt">{gallery.length} imagenes · fotos cortesia de 4 fotografos</div>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button className="dm-btn dm-btn-secondary" onClick={() => setUploadOpen(true)}>+ SUBIR FOTO</button>
              <a className="dm-section-more">VER TODAS →</a>
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

          <div className="dm-section-eyebrow" style={{ marginTop: 40 }}>TRACKS DESTACADOS</div>
          <table className="dm-tracks">
            <thead>
              <tr>
                <th>#</th>
                <th>TRACK</th>
                <th>RELEASE</th>
                <th>PRODUCCION</th>
                <th>FEAT.</th>
                <th>DUR</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((r) => (
                <tr key={r[0]} onClick={() => go('release')}>
                  <td className="dm-tracks-n">{r[0]}</td>
                  <td className="dm-tracks-t">{r[1]}</td>
                  <td className="dm-tracks-r"><a className="dm-inline">{r[2]}</a></td>
                  <td className="dm-tracks-c">PROD. {r[3]}</td>
                  <td className="dm-tracks-c">
                    {r[4] === '—' ? <span style={{ color: 'var(--fg-4)' }}>—</span> : `FEAT. ${r[4]}`}
                  </td>
                  <td className="dm-tracks-d">{r[5]}</td>
                  <td className="dm-tracks-play">↗</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="dm-section-head" style={{ marginTop: 40 }}>
            <div>
              <div className="dm-section-eyebrow">HISTORIAL DE EVENTOS</div>
              <div className="dm-art-alt">84 apariciones documentadas · 2005-2014</div>
            </div>
            <a className="dm-section-more">VER TODOS →</a>
          </div>
          <div className="dm-past-ev">
            {pastEvents.map((e, i) => (
              <a key={i} className="dm-past-ev-row" onClick={() => go('event')}>
                <div className="dm-past-ev-date">{e[0]}</div>
                <div>
                  <div className="dm-past-ev-name">{e[1]}</div>
                  <div className="dm-past-ev-venue">
                    {e[2]} · <span style={{ color: 'var(--fg-2)' }}>{e[3]}</span>
                  </div>
                </div>
                <div className="dm-past-ev-arr">→</div>
              </a>
            ))}
          </div>
        </section>

        <aside className="dm-entity-side">
          <div className="dm-side-block">
            <div className="dm-section-eyebrow">COLABORADORES FRECUENTES</div>
            {collaborators.map((c, i) => (
              <a key={i} className="dm-collab-row" onClick={() => go('artist')}>
                <span className="dm-collab-name">{c.name}</span>
                <span className="dm-collab-kind">{c.kind}</span>
                <span className="dm-collab-ct">{c.count}</span>
              </a>
            ))}
          </div>

          <div className="dm-side-block">
            <div className="dm-section-eyebrow">ESCENA</div>
            <div className="dm-tags">
              <span className="dm-pill">CARACAS</span>
              <span className="dm-pill">VENEZUELA</span>
              <span className="dm-pill">2003-2015</span>
              <span className="dm-pill">BOOM-BAP</span>
              <span className="dm-pill">HARDCORE</span>
              <span className="dm-pill">CONCIENCIA</span>
            </div>
          </div>

          <div className="dm-side-block">
            <div className="dm-section-eyebrow">COBERTURA EDITORIAL</div>
            <a
              className="dm-collab-row"
              onClick={() => go('article')}
              style={{ gridTemplateColumns: '1fr auto' }}
            >
              <div>
                <div className="dm-collab-name">Canserbero: el peso de un idolo</div>
                <div className="dm-collab-kind" style={{ marginTop: 2, color: 'var(--fg-3)' }}>
                  ENSAYO · 2024 · POR ANA SALVATIERRA
                </div>
              </div>
              <span className="dm-collab-ct">12 MIN</span>
            </a>
            <a
              className="dm-collab-row"
              onClick={() => go('article')}
              style={{ gridTemplateColumns: '1fr auto' }}
            >
              <div>
                <div className="dm-collab-name">Resena: Apocalipsis a 12 anos</div>
                <div className="dm-collab-kind" style={{ marginTop: 2, color: 'var(--fg-3)' }}>
                  RESENA · 2024 · POR JUAN SALAZAR
                </div>
              </div>
              <span className="dm-collab-ct">7 MIN</span>
            </a>
          </div>

          <div className="dm-side-block">
            <div className="dm-section-eyebrow">FUENTES · 28</div>
            <ol className="dm-sources">
              <li><a className="dm-cite">[1]</a> Entrevista en El Nacional · 2014</li>
              <li><a className="dm-cite">[2]</a> Red Bull Panamerika · 2012</li>
              <li><a className="dm-cite">[3]</a> Caracas Hip Hop Archive · 2019</li>
              <li><a className="dm-cite">[4]</a> Archivo Ahiezer Music · 2003-2015</li>
            </ol>
            <div className="dm-small-note">
              Perfil curado por el equipo editorial de Dauton. Creado en 2023 · ultima edicion hace 3 dias.
            </div>
          </div>
        </aside>
      </div>

      <Comments context="Canserbero" />

      <details className="dm-admin-drawer">
        <summary>· moderacion</summary>
        <div className="dm-admin-panel">
          <p>Acciones restringidas. Requieren autenticacion y son revisadas por el equipo editorial antes de aplicarse.</p>
          <button>Sugerir correccion</button>
          <button>Reclamar este perfil</button>
          <button>Reportar problema</button>
          <button>Ver historial de ediciones</button>
        </div>
      </details>

      {lightbox && gItem && (
        <div className="dm-lightbox" onClick={() => setLightbox(null)}>
          <button
            className="dm-lightbox-close"
            onClick={(e) => { e.stopPropagation(); setLightbox(null); }}
          >
            ESC · CERRAR
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
                <div>CANSERBERO</div>
                <div>{gIdx + 1} / {gallery.length}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
