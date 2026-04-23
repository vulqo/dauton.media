'use client';

export default function EventPage({ go }: { go: (view: string) => void }) {
  const lineup = [
    { name: 'Apache', role: 'HEADLINER', time: '22:00' },
    { name: 'Lil Supa', role: 'ARTISTA', time: '21:00' },
    { name: 'Ahiezer', role: 'DJ SET', time: '20:30' },
  ];

  const tiers = [
    { label: 'GENERAL', price: '$15', note: 'Acceso general · piso' },
    { label: 'VIP', price: '$35', note: 'Zona VIP · barra exclusiva' },
  ];

  const goers = ['A', 'L', 'M', 'S', 'R', 'C', 'P', 'D'];

  const credits = [
    { group: 'ORGANIZACIÓN', people: [{ name: 'Ahiezer Music', sub: 'Producción general', verified: true }] },
    { group: 'SONIDO', people: [{ name: 'Luis Noguera', sub: 'Ingeniero de sonido', verified: false }] },
    { group: 'FOTO / VIDEO', people: [{ name: 'Roberto Mata', sub: 'Fotografía oficial', verified: false }] },
  ];

  return (
    <main style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px 120px' }}>
      <div className="dm-crumb">
        <a onClick={() => go('home')}>ARCHIVO</a><span>/</span>
        <a>EVENTOS</a><span>/</span>
        <a onClick={() => go('city')}>CARACAS</a><span>/</span>
        <span className="dm-crumb-cur">10 AÑOS NOCHE CERRADA</span>
      </div>

      {/* HERO */}
      <header className="dm-evdetail-hero">
        <div className="dm-evdetail-date">
          <div className="dm-evdetail-date-d">23</div>
          <div className="dm-evdetail-date-m">NOV</div>
          <div className="dm-evdetail-date-y">2026</div>
          <div className="dm-evdetail-date-t">SAT · 20:00</div>
        </div>
        <div>
          <div className="dm-entity-kind">EVENTO · CARACAS · TRIBUTO</div>
          <h1 className="dm-evdetail-title">10 Años · Noche Cerrada</h1>
          <p className="dm-evdetail-dek">A tribute to Canserbero 10 years after Apocalipsis. One night, one stage, the full scene gathered.</p>
          <div className="dm-evdetail-facts">
            <span>Teatro Teresa Carreño · Caracas</span>
            <span>·</span>
            <span>Doors 20:00</span>
            <span>·</span>
            <span>Cap. 1,500</span>
          </div>
          <div className="dm-evdetail-actions">
            <button className="dm-btn dm-btn-primary">GET TICKETS</button>
            <button className="dm-btn dm-btn-secondary">RSVP FREE</button>
            <button className="dm-btn dm-btn-secondary">SHARE</button>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="dm-entity-grid">
        <div className="dm-entity-main">

          {/* LINEUP */}
          <section className="dm-section">
            <div className="dm-section-eyebrow">LINEUP</div>
            <div className="dm-lineup">
              {lineup.map((a, i) => (
                <div key={i} className="dm-lineup-row">
                  <div
                    className="dm-lineup-avatar"
                    style={{ background: `hsl(${a.name.charCodeAt(0) * 23 % 360},40%,22%)` }}
                  >
                    {a.name[0]}
                  </div>
                  <div>
                    <div className="dm-lineup-name" onClick={() => go('artist')} style={{ cursor: 'pointer' }}>{a.name}</div>
                    <div className="dm-lineup-role">{a.role}</div>
                  </div>
                  <div className="dm-lineup-time">{a.time}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CREDITS */}
          <section className="dm-section">
            <div className="dm-section-eyebrow">CREDITS</div>
            <div className="dm-cred-panel">
              <div className="dm-cred-head">Production · Technical · Media</div>
              <div className="dm-cred-grid">
                {credits.map((g, i) => (
                  <div key={i} className="dm-cred-group">
                    <div className="dm-cred-group-head">
                      <span className="dm-cred-group-label">{g.group}</span>
                      <span className="dm-cred-group-count">{g.people.length}</span>
                    </div>
                    {g.people.map((p, j) => (
                      <div key={j} className="dm-cred-person">
                        <div
                          className="dm-cred-avatar"
                          style={{ background: `hsl(${p.name.charCodeAt(0) * 19 % 360},35%,22%)` }}
                        >
                          {p.name[0]}
                        </div>
                        <div>
                          <div className="dm-cred-name">
                            {p.name}
                            {p.verified && <span className="dm-cred-ver"> ✓</span>}
                          </div>
                          <div className="dm-cred-sub">{p.sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>

        <aside className="dm-entity-side">

          {/* TICKETS */}
          <div className="dm-side-block">
            <div className="dm-section-eyebrow" style={{ marginBottom: 12 }}>TICKETS</div>
            {tiers.map((t, i) => (
              <div key={i} className="dm-ticket-tier">
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: '.06em' }}>{t.label}</div>
                  <div style={{ fontSize: 11, opacity: .6, marginTop: 2 }}>{t.note}</div>
                </div>
                <div className="dm-ticket-price">{t.price}</div>
              </div>
            ))}
            <button className="dm-btn dm-btn-primary" style={{ width: '100%', marginTop: 12 }}>BUY TICKETS</button>
          </div>

          {/* VENUE */}
          <div className="dm-side-block">
            <div className="dm-section-eyebrow" style={{ marginBottom: 12 }}>VENUE</div>
            <div
              className="dm-map-placeholder"
              style={{ cursor: 'pointer' }}
              onClick={() => go('venue')}
            >
              <div className="dm-map-pin">📍</div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Teatro Teresa Carreño</div>
              <div style={{ fontSize: 11, opacity: .6, marginTop: 4 }}>Parque Central, Caracas</div>
            </div>
          </div>

          {/* GOING */}
          <div className="dm-side-block">
            <div className="dm-section-eyebrow" style={{ marginBottom: 12 }}>GOING (284)</div>
            <div className="dm-goers">
              {goers.map((g, i) => (
                <div
                  key={i}
                  className="dm-goer"
                  style={{ background: `hsl(${g.charCodeAt(0) * 31 % 360},40%,24%)` }}
                >
                  {g}
                </div>
              ))}
              <div className="dm-goer" style={{ background: 'var(--fg-1)', color: 'var(--bg-0)', fontSize: 10 }}>+276</div>
            </div>
            <button className="dm-btn dm-btn-secondary" style={{ width: '100%', marginTop: 12 }}>RSVP — IT'S FREE</button>
          </div>

        </aside>
      </div>
    </main>
  );
}
