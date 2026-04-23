'use client';

export default function VenuePage({ go }: { go: (view: string) => void }) {
  const scoreBreakdown = [
    { label: 'SOUND', val: 9.2 },
    { label: 'LOCATION', val: 8.5 },
    { label: 'ATMOSPHERE', val: 8.9 },
    { label: 'SECURITY', val: 8.0 },
    { label: 'EXPERIENCE', val: 8.7 },
  ];

  const events = [
    { d: 'VIE 31 OCT', t: '22:00', title: 'Canserbero Tribute Night', lineup: 'Apache · Lil Supa · DJ Trece', rsvp: 284, cap: 500, price: '$15', color: '#D93D4A', tag: 'TRIBUTE' },
    { d: 'SÁB 15 NOV', t: '22:00', title: 'Guerrilla Sessions · Vol 4', lineup: 'Ahiezer · N-Wise Allah · DJ Ozzie', rsvp: 178, cap: 500, price: '$10', color: '#04756F', tag: 'SESSIONS' },
    { d: 'VIE 28 NOV', t: '23:00', title: 'New Year Run-Up · Open Format', lineup: 'DJ Trece b2b DJ Ozzie', rsvp: 95, cap: 500, price: '$12', color: '#244C5A', tag: 'CLUB NIGHT' },
  ];

  const reviews = [
    {
      author: 'McKlopedia',
      initial: 'M',
      color: '#04756F',
      date: 'OCT 2026',
      score: 9,
      body: 'Best sound system in Caracas, period. The PA setup they installed in 2022 completely changed the experience. Every frequency hits exactly where it should.',
    },
    {
      author: 'Carlos Medina',
      initial: 'C',
      color: '#244C5A',
      date: 'SEP 2026',
      score: 8,
      body: 'Great venue for documenting events. The lighting rig is excellent for photo and video. Security is solid and the crowd always knows the music.',
    },
    {
      author: 'Alejandra Ríos',
      initial: 'A',
      color: '#7B3F8C',
      date: 'AUG 2026',
      score: 9,
      body: 'The atmosphere here is unlike anything else in the city. You feel the history of the scene every time you walk in. Chacao knows how to hold it down.',
    },
  ];

  return (
    <main style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px 120px' }}>
      <div className="dm-crumb">
        <a onClick={() => go('home')}>ARCHIVO</a><span>/</span>
        <a onClick={() => go('venues')}>VENUES</a><span>/</span>
        <a onClick={() => go('city')}>CARACAS</a><span>/</span>
        <span className="dm-crumb-cur">LA POLTRONA</span>
      </div>

      {/* HERO */}
      <header className="dm-venue-hero">
        <div className="dm-venue-hero-visual">
          <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1b3d 50%, #0d2436 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, opacity: .4 }}>LP</div>
        </div>
        <div className="dm-venue-hero-main">
          <div className="dm-venue-hero-kind">CLUB · VENUE · CARACAS</div>
          <h1 className="dm-venue-hero-name">La Poltrona</h1>
          <p className="dm-venue-hero-sub">The premier underground club in Chacao. Home of the city&apos;s most consistent hip-hop programming since 2014.</p>
          <div className="dm-venue-facts">
            <span>Chacao, Caracas</span>
            <span>·</span>
            <span>Cap. 500</span>
            <span>·</span>
            <span>Founded 2014</span>
            <span>·</span>
            <span>ACTIVE</span>
          </div>
          <div className="dm-venue-hero-actions">
            <button className="dm-btn dm-btn-primary">FOLLOW VENUE</button>
            <button className="dm-btn dm-btn-secondary">SHARE</button>
            <button className="dm-btn dm-btn-secondary">WRITE REVIEW</button>
          </div>
        </div>
        <div className="dm-venue-hero-score">
          <div className="dm-venue-hero-score-val">8.7</div>
          <div className="dm-venue-hero-score-lbl">OVERALL SCORE</div>
          <div className="dm-score-break">
            {scoreBreakdown.map((s, i) => (
              <div key={i} className="dm-score-row">
                <span className="dm-score-row-label">{s.label}</span>
                <div className="dm-score-bar">
                  <div className="dm-score-bar-fill" style={{ width: `${(s.val / 10) * 100}%` }}></div>
                </div>
                <span className="dm-score-row-val">{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="dm-entity-grid">
        <div className="dm-entity-main">

          {/* UPCOMING EVENTS */}
          <section className="dm-section">
            <div className="dm-section-eyebrow">UPCOMING EVENTS</div>
            <div className="dm-ev-grid">
              {events.map((e, i) => (
                <a key={i} className="dm-ev-card" onClick={() => go('event')}>
                  <div
                    className="dm-ev-date"
                    style={{ background: e.color, color: 'var(--fg-0)' }}
                  >
                    <div className="dm-ev-date-d">{e.t}</div>
                    <div className="dm-ev-date-t">{e.d.split(' ')[1]}</div>
                    <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', letterSpacing: '.1em', opacity: .8 }}>{e.d.split(' ')[0]}</div>
                  </div>
                  <div className="dm-ev-body">
                    <div className="dm-ev-tag">{e.tag}</div>
                    <div className="dm-ev-title">{e.title}</div>
                    <div className="dm-ev-venue">La Poltrona · Chacao</div>
                    <div className="dm-ev-lineup">{e.lineup}</div>
                    <div className="dm-ev-foot">
                      <div className="dm-ev-rsvp">
                        <div className="dm-ev-bar">
                          <div style={{ width: `${(e.rsvp / e.cap) * 100}%`, height: '100%', background: '#ffce37' }}></div>
                        </div>
                        <span><b>{e.rsvp}</b> / {e.cap} confirmed</span>
                      </div>
                      <span className="dm-ev-price is-paid">{e.price}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* REVIEWS */}
          <section className="dm-section">
            <div className="dm-section-eyebrow">REVIEWS ({reviews.length})</div>
            <div className="dm-rev-list">
              {reviews.map((r, i) => (
                <div key={i} className="dm-rev">
                  <div className="dm-rev-head">
                    <div className="dm-rev-author">
                      <div className="dm-rev-ava" style={{ background: r.color }}>{r.initial}</div>
                      <div>
                        <div className="dm-rev-name">{r.author}</div>
                        <div className="dm-rev-date">{r.date}</div>
                      </div>
                    </div>
                    <div className="dm-rev-score">{r.score}/10</div>
                  </div>
                  <div className="dm-rev-body">{r.body}</div>
                </div>
              ))}
            </div>
          </section>

        </div>

        <aside className="dm-entity-side">

          {/* QUICK INFO */}
          <div className="dm-side-block">
            <div className="dm-section-eyebrow" style={{ marginBottom: 12 }}>INFO</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'TYPE', val: 'Club · Venue' },
                { label: 'LOCATION', val: 'Chacao, Caracas' },
                { label: 'CAPACITY', val: '500' },
                { label: 'FOUNDED', val: '2014' },
                { label: 'STATUS', val: 'ACTIVE' },
                { label: 'PROGRAMMING', val: 'Hip-hop · Rap · Trap' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span style={{ opacity: .5, fontFamily: 'var(--font-mono)', letterSpacing: '.06em' }}>{item.label}</span>
                  <span style={{ fontWeight: 600 }}>{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MAP */}
          <div className="dm-side-block">
            <div className="dm-section-eyebrow" style={{ marginBottom: 12 }}>LOCATION</div>
            <div className="dm-map-placeholder">
              <div className="dm-map-pin">📍</div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>La Poltrona</div>
              <div style={{ fontSize: 11, opacity: .6, marginTop: 4 }}>Chacao, Caracas, Venezuela</div>
            </div>
          </div>

          {/* SCORE SUMMARY */}
          <div className="dm-side-block">
            <div className="dm-section-eyebrow" style={{ marginBottom: 12 }}>SCORE BREAKDOWN</div>
            <div className="dm-score-break">
              {scoreBreakdown.map((s, i) => (
                <div key={i} className="dm-score-row">
                  <span className="dm-score-row-label">{s.label}</span>
                  <div className="dm-score-bar">
                    <div className="dm-score-bar-fill" style={{ width: `${(s.val / 10) * 100}%` }}></div>
                  </div>
                  <span className="dm-score-row-val">{s.val}</span>
                </div>
              ))}
            </div>
          </div>

        </aside>
      </div>
    </main>
  );
}
