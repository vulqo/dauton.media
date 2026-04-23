'use client';
import { useState } from 'react';

export default function CityPage({ go }: { go: (view: string) => void }) {
  const [tab, setTab] = useState('overview');
  const [roleFilter, setRoleFilter] = useState('all');
  const [feedTab, setFeedTab] = useState('todo');

  const roles = [
    { k: 'all', label: 'TODOS', n: 312 },
    { k: 'artista', label: 'ARTISTAS', n: 103 },
    { k: 'productor', label: 'PRODUCTORES', n: 48 },
    { k: 'dj', label: 'DJS', n: 27 },
    { k: 'disenador', label: 'DISEÑADORES', n: 19 },
    { k: 'foto', label: 'FOTO/VIDEO', n: 24 },
    { k: 'ingeniero', label: 'INGENIEROS', n: 11 },
    { k: 'sello', label: 'SELLOS/CREWS', n: 14 },
    { k: 'venue', label: 'VENUES', n: 9 },
    { k: 'promotor', label: 'PROMOTORES', n: 7 },
    { k: 'manager', label: 'MANAGERS', n: 6 },
    { k: 'prensa', label: 'PRENSA', n: 5 },
  ];

  const events = [
    { d: 'VIE 31 OCT', t: '22:00', title: 'Canserbero Tribute Night', venue: 'La Poltrona · Chacao', lineup: 'Apache · Lil Supa · DJ Trece', rsvp: 284, cap: 500, tickets: true, price: '$15', color: '#D93D4A', tag: 'TRIBUTE' },
    { d: 'SÁB 08 NOV', t: '21:30', title: 'Los Cypher Sessions · Vol 12', venue: 'Centro Cultural Chacao', lineup: '8 MCs · host: McKlopedia', rsvp: 142, cap: 200, tickets: false, price: 'FREE', color: '#04756F', tag: 'CYPHER' },
    { d: 'DOM 16 NOV', t: '15:00', title: 'Drop en vivo · Nueva Guardia', venue: 'Skate Park El Rosal', lineup: 'Akapellah · Budú · DJ Ozzie', rsvp: 89, cap: 300, tickets: true, price: '$8', color: '#ffce37', tag: 'SHOWCASE' },
  ];

  const directory = [
    { n: 'Canserbero', r: 'artista', rl: 'ARTISTA', sub: 'MC · Caracas · Legacy', verified: true, act: 87, foll: '412K' },
    { n: 'Ahiezer', r: 'productor', rl: 'PRODUCTOR', sub: 'Beatmaker · Studio Guerrilla', verified: true, act: 92, foll: '38K' },
    { n: 'DJ Trece', r: 'dj', rl: 'DJ', sub: 'Radio · club residente La Poltrona', verified: false, act: 78, foll: '12K' },
    { n: 'Alejandra Ríos', r: 'disenador', rl: 'DISEÑADORA', sub: 'Arte para Apache, Budú, Akapellah', verified: false, act: 64, foll: '8K' },
    { n: 'Carlos Medina', r: 'foto', rl: 'FOTO/VIDEO', sub: 'Documental · video-clips', verified: false, act: 71, foll: '22K' },
    { n: 'Estudio Vega', r: 'ingeniero', rl: 'MIX/MASTER', sub: 'Mezcla y master · La Vega', verified: true, act: 88, foll: '6K' },
    { n: 'Guerrilla Seed', r: 'sello', rl: 'SELLO/CREW', sub: 'Colectivo · 14 miembros activos', verified: true, act: 81, foll: '54K' },
    { n: 'La Poltrona', r: 'venue', rl: 'VENUE', sub: 'Club · cap. 500 · Chacao', verified: true, act: 95, foll: '19K' },
    { n: 'Ozzie Prod.', r: 'promotor', rl: 'PROMOTORA', sub: 'Booking nacional', verified: false, act: 58, foll: '4K' },
    { n: 'Ricardo Paredes', r: 'manager', rl: 'MANAGER', sub: 'Representa a 6 artistas', verified: false, act: 42, foll: '2K' },
    { n: 'Fabiola Arias', r: 'prensa', rl: 'PERIODISTA', sub: 'Editorial · freelance', verified: false, act: 53, foll: '7K' },
    { n: 'N-Wise Allah', r: 'artista', rl: 'ARTISTA', sub: 'MC · lírica técnica', verified: false, act: 42, foll: '31K' },
  ];

  const filtered = roleFilter === 'all' ? directory : directory.filter(p => p.r === roleFilter);

  const places = [
    { n: 'La Poltrona', t: 'CLUB · VENUE', sub: 'Chacao · cap. 500', act: 'ACTIVO' },
    { n: 'Estudio Vega', t: 'ESTUDIO', sub: 'La Vega · fundado 2006', act: 'ACTIVO' },
    { n: 'Plaza Brión', t: 'LUGAR HISTÓRICO', sub: 'Chacaíto · cyphers 2003+', act: 'ACTIVO' },
    { n: 'Centro Cultural Chacao', t: 'VENUE', sub: 'Eventos · cap. 200', act: 'ACTIVO' },
    { n: 'Ahiezer Studio', t: 'ESTUDIO', sub: 'La Vega · cerrado 2020', act: 'CERRADO' },
  ];

  return (
    <main style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px 120px' }}>
      <div className="dm-crumb">
        <a onClick={() => go('home')}>ARCHIVO</a><span>/</span>
        <a>CIUDADES</a><span>/</span>
        <span className="dm-crumb-cur">CARACAS</span>
      </div>

      {/* HERO */}
      <header className="dm-city2-hero">
        <div>
          <div className="dm-entity-kind">CIUDAD · VENEZUELA · 312 MIEMBROS</div>
          <h1 className="dm-city2-name">Caracas</h1>
          <p className="dm-city2-lead">Archivo vivo + hub de la escena caraqueña. Sigue lo que pasa esta semana, conecta con gente de la industria y contribuye al archivo.</p>
          <div className="dm-city2-cta">
            <button className="dm-btn dm-btn-primary">UNIRME A LA CIUDAD</button>
            <button className="dm-btn dm-btn-secondary">COMPARTIR</button>
          </div>
        </div>
        <div>
          <div className="dm-city2-livebox">
            <div className="dm-city2-live"><div className="dm-city2-dot"></div>ACTIVIDAD ESTA SEMANA</div>
            <div className="dm-city2-livegrid">
              <div><b>312</b><span>MIEMBROS</span><em>+14 esta semana</em></div>
              <div><b>103</b><span>ARTISTAS</span><em>activos</em></div>
              <div><b>18</b><span>EVENTOS</span><em>este mes</em></div>
              <div><b>3</b><span>VENUES</span><em>activos hoy</em></div>
            </div>
          </div>
        </div>
      </header>

      {/* TABS */}
      <div className="dm-city2-tabs">
        {[
          { k: 'overview', l: 'OVERVIEW' },
          { k: 'eventos', l: 'EVENTOS (18)' },
          { k: 'directorio', l: 'DIRECTORIO (312)' },
          { k: 'feed', l: 'FEED' },
          { k: 'lugares', l: 'LUGARES (5)' },
        ].map(t => (
          <button key={t.k} className={`dm-city2-tab ${tab === t.k ? 'is-on' : ''}`} onClick={() => setTab(t.k)}>{t.l}</button>
        ))}
      </div>

      {/* OVERVIEW */}
      {tab === 'overview' && (
        <div>
          <section className="dm-section">
            <div className="dm-section-head">
              <div>
                <div className="dm-section-eyebrow">PRÓXIMOS EVENTOS</div>
                <h2 className="dm-section-title">Esta semana en Caracas</h2>
              </div>
              <a className="dm-section-more" onClick={() => setTab('eventos')}>VER TODOS (18) →</a>
            </div>
            <div className="dm-ev-grid">
              {events.map((e, i) => (
                <a key={i} className="dm-ev-card" onClick={() => go('event')}>
                  <div className="dm-ev-date" style={{ background: e.color, color: e.color === '#ffce37' ? 'var(--bg-0)' : 'var(--fg-0)' }}>
                    <div className="dm-ev-date-d">{e.t}</div>
                    <div className="dm-ev-date-t">{e.d.split(' ')[1]}</div>
                    <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '.1em', opacity: .8 }}>{e.d.split(' ')[0]}</div>
                  </div>
                  <div className="dm-ev-body">
                    <div className="dm-ev-tag">{e.tag}</div>
                    <div className="dm-ev-title">{e.title}</div>
                    <div className="dm-ev-venue">{e.venue}</div>
                    <div className="dm-ev-lineup">{e.lineup}</div>
                    <div className="dm-ev-foot">
                      <div className="dm-ev-rsvp">
                        <div className="dm-ev-bar"><div style={{ width: `${(e.rsvp / e.cap) * 100}%`, height: '100%', background: '#ffce37' }}></div></div>
                        <span><b>{e.rsvp}</b> / {e.cap} confirmados</span>
                      </div>
                      <span className={`dm-ev-price ${e.tickets ? 'is-paid' : 'is-free'}`}>{e.price}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section className="dm-section">
            <div className="dm-section-head">
              <div>
                <div className="dm-section-eyebrow">DIRECTORIO</div>
                <h2 className="dm-section-title">Gente de la escena</h2>
              </div>
              <a className="dm-section-more" onClick={() => setTab('directorio')}>VER TODOS (312) →</a>
            </div>
            <div className="dm-dir-grid">
              {directory.slice(0, 6).map((p, i) => (
                <a key={i} className="dm-dir-card" onClick={() => go('artist')}>
                  <div className="dm-dir-avatar" style={{ background: `hsl(${p.n.charCodeAt(0) * 17 % 360},40%,25%)` }}>{p.n[0]}</div>
                  <div>
                    <div className="dm-dir-role">{p.rl}</div>
                    <div className="dm-dir-name">{p.n}{p.verified && <span className="dm-verified"> ✓</span>}</div>
                    <div className="dm-dir-sub">{p.sub}</div>
                  </div>
                  <div className="dm-dir-stats">
                    <div className="dm-dir-foll">{p.foll}</div>
                    <div className="dm-dir-foll-lbl">SEGUIDORES</div>
                  </div>
                  <button className="dm-dir-follow">SEGUIR</button>
                </a>
              ))}
            </div>
          </section>

          <section className="dm-section">
            <div className="dm-section-head">
              <div>
                <div className="dm-section-eyebrow">LUGARES</div>
                <h2 className="dm-section-title">Espacios de la escena</h2>
              </div>
              <a className="dm-section-more" onClick={() => setTab('lugares')}>VER TODOS →</a>
            </div>
            <div className="dm-places-grid">
              {places.map((p, i) => (
                <a key={i} className="dm-place-card" onClick={() => go('venue')}>
                  <div className="dm-place-meta">
                    <span className="dm-place-type">{p.t}</span>
                    <span className={`dm-place-status ${p.act === 'ACTIVO' ? 'is-on' : 'is-off'}`}>{p.act}</span>
                  </div>
                  <div className="dm-place-name">{p.n}</div>
                  <div className="dm-place-sub">{p.sub}</div>
                </a>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* EVENTS TAB */}
      {tab === 'eventos' && (
        <section className="dm-section" style={{ borderTop: 'none' }}>
          <div className="dm-ev-grid">
            {events.map((e, i) => (
              <a key={i} className="dm-ev-card" onClick={() => go('event')}>
                <div className="dm-ev-date" style={{ background: e.color, color: e.color === '#ffce37' ? 'var(--bg-0)' : 'var(--fg-0)' }}>
                  <div className="dm-ev-date-d">{e.t}</div>
                  <div className="dm-ev-date-t">{e.d.split(' ')[1]}</div>
                </div>
                <div className="dm-ev-body">
                  <div className="dm-ev-tag">{e.tag}</div>
                  <div className="dm-ev-title">{e.title}</div>
                  <div className="dm-ev-venue">{e.venue}</div>
                  <div className="dm-ev-lineup">{e.lineup}</div>
                  <div className="dm-ev-foot">
                    <div className="dm-ev-rsvp">
                      <div className="dm-ev-bar"><div style={{ width: `${(e.rsvp / e.cap) * 100}%`, height: '100%', background: '#ffce37' }}></div></div>
                      <span><b>{e.rsvp}</b> confirmados</span>
                    </div>
                    <span className={`dm-ev-price ${e.tickets ? 'is-paid' : 'is-free'}`}>{e.price}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* DIRECTORY TAB */}
      {tab === 'directorio' && (
        <section style={{ paddingTop: 24 }}>
          <div className="dm-dir-filters">
            {roles.map(r => (
              <button key={r.k} className={`dm-dir-chip ${roleFilter === r.k ? 'is-on' : ''}`} onClick={() => setRoleFilter(r.k)}>
                {r.label} <em>{r.n}</em>
              </button>
            ))}
          </div>
          <div className="dm-dir-grid">
            {filtered.map((p, i) => (
              <a key={i} className="dm-dir-card" onClick={() => go('artist')}>
                <div className="dm-dir-avatar" style={{ background: `hsl(${p.n.charCodeAt(0) * 17 % 360},40%,25%)` }}>{p.n[0]}</div>
                <div>
                  <div className="dm-dir-role">{p.rl}</div>
                  <div className="dm-dir-name">{p.n}{p.verified && <span className="dm-verified"> ✓</span>}</div>
                  <div className="dm-dir-sub">{p.sub}</div>
                </div>
                <div className="dm-dir-stats">
                  <div className="dm-dir-foll">{p.foll}</div>
                  <div className="dm-dir-foll-lbl">SEGUIDORES</div>
                </div>
                <button className="dm-dir-follow">SEGUIR</button>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* FEED TAB */}
      {tab === 'feed' && (
        <section style={{ paddingTop: 24 }}>
          <div className="dm-feed-switch" style={{ marginBottom: 16 }}>
            {['todo', 'posts', 'eventos', 'archivo'].map(f => (
              <button key={f} className={feedTab === f ? 'is-on' : ''} onClick={() => setFeedTab(f)}>{f.toUpperCase()}</button>
            ))}
          </div>
          <div className="dm-feed">
            <div className="dm-feed-post">
              <div className="dm-feed-vote">
                <button>▲</button>
                <span>47</span>
                <button>▼</button>
              </div>
              <div>
                <div className="dm-feed-head">
                  <div className="dm-cmt-avatar" style={{ background: '#04756F', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white' }}>M</div>
                  <span style={{ fontWeight: 700, fontSize: 13 }}>McKlopedia</span>
                  <span className="dm-cmt-badge bg-editor">Editor</span>
                  <span className="dm-cmt-time">· 2h</span>
                </div>
                <div className="dm-feed-title">What was the exact moment the sound of Caracas changed?</div>
                <div className="dm-feed-text">I think it was between 2010 and 2012 when Ahiezer started mixing with drier kicks. You can hear it on Apocalipsis and from there on.</div>
                <div className="dm-feed-actions">
                  <button>23 Replies</button>
                  <button>Share</button>
                </div>
              </div>
            </div>
            <div className="dm-feed-activity">
              <div className="dm-feed-act-dot" style={{ background: '#5ab8b0' }}></div>
              <span><b>La Poltrona</b> posted a new event: Canserbero Tribute Night</span>
              <em>5h</em>
            </div>
            <div className="dm-feed-activity">
              <div className="dm-feed-act-dot" style={{ background: '#ffce37' }}></div>
              <span><b>Sergio Blanco</b> joined the scene as Producer</span>
              <em>4h</em>
            </div>
            <div className="dm-feed-post">
              <div className="dm-feed-vote">
                <button>▲</button>
                <span>31</span>
                <button>▼</button>
              </div>
              <div>
                <div className="dm-feed-head">
                  <div className="dm-cmt-avatar" style={{ background: '#244C5A', width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'white' }}>C</div>
                  <span style={{ fontWeight: 700, fontSize: 13 }}>Carlos Medina</span>
                  <span className="dm-cmt-badge bg-contributor">Contributor</span>
                  <span className="dm-cmt-time">· 8h</span>
                </div>
                <div className="dm-feed-title">Photo archive 2008–2012 · looking for collaborators</div>
                <div className="dm-feed-text">I have around 400 undigitized negatives from the golden era. If anyone has a professional scanner and wants to collaborate, reach out.</div>
                <div className="dm-feed-actions">
                  <button>12 Replies</button>
                  <button>Share</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* PLACES TAB */}
      {tab === 'lugares' && (
        <section style={{ paddingTop: 24 }}>
          <div className="dm-places-grid">
            {places.map((p, i) => (
              <a key={i} className="dm-place-card" onClick={() => go('venue')}>
                <div className="dm-place-meta">
                  <span className="dm-place-type">{p.t}</span>
                  <span className={`dm-place-status ${p.act === 'ACTIVO' ? 'is-on' : 'is-off'}`}>{p.act}</span>
                </div>
                <div className="dm-place-name">{p.n}</div>
                <div className="dm-place-sub">{p.sub}</div>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
