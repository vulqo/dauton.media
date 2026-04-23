'use client';
import { useState } from 'react';

const TABS = ['RESUMEN', 'ÓRDENES', 'CATÁLOGO', 'ANALYTICS', 'PAGOS', 'AJUSTES'] as const;
type Tab = typeof TABS[number];

const KPIS = [
  { label: 'Ingresos · 30 días', value: '$1,240', delta: '+18%', up: true },
  { label: 'Licencias vendidas', value: '34', delta: '+7', up: true },
  { label: 'Tasa conversión', value: '4.2%', delta: '-0.3%', up: false },
  { label: 'Seguidores', value: '1,847', delta: '+112', up: true },
];

const ORDERS = [
  { id: 'ORD-0041', buyer: 'j_reyes_mc',    product: 'Boom-Bap Pack',   license: 'WAV Lease',  amount: '$40',  date: '22·ABR·2026', status: 'Completada' },
  { id: 'ORD-0040', buyer: 'prod_maluma2',   product: 'Boom-Bap Pack',   license: 'STEMS',      amount: '$120', date: '21·ABR·2026', status: 'Completada' },
  { id: 'ORD-0039', buyer: 'voz_de_calle',   product: 'Cerro Ávila · Single', license: 'MP3',   amount: '$15',  date: '20·ABR·2026', status: 'Completada' },
  { id: 'ORD-0038', buyer: 'kairo_oficial',  product: 'Boom-Bap Pack',   license: 'EXCLUSIVE',  amount: '$800', date: '18·ABR·2026', status: 'Completada' },
  { id: 'ORD-0037', buyer: 'mc_tereza',      product: 'Petare Soul · Loop Kit', license: 'WAV', amount: '$40',  date: '17·ABR·2026', status: 'Reembolsada' },
  { id: 'ORD-0036', buyer: 'rimer_beats',    product: 'Boom-Bap Pack',   license: 'MP3 Lease',  amount: '$15',  date: '16·ABR·2026', status: 'Completada' },
];

const LISTINGS = [
  { title: 'Boom-Bap Pack · 5 beats', sales: 127, revenue: '$3,840', cover: '#244C5A', active: true },
  { title: 'Cerro Ávila · Single',    sales: 34,  revenue: '$510',   cover: '#04756F', active: true },
  { title: 'Petare Soul · Loop Kit',  sales: 19,  revenue: '$760',   cover: '#D93D4A', active: false },
  { title: 'Caracas Noche · WAV',     sales: 8,   revenue: '$320',   cover: '#0093C6', active: true },
];

const PAYOUTS = [
  { date: '01·ABR·2026', gross: '$620', fee: '$186', net: '$434', status: 'Pagado' },
  { date: '01·MAR·2026', gross: '$910', fee: '$273', net: '$637', status: 'Pagado' },
  { date: '01·FEB·2026', gross: '$440', fee: '$132', net: '$308', status: 'Pagado' },
];

const CHART_BARS = [12, 28, 18, 45, 33, 60, 38, 72, 55, 80, 64, 90, 48, 55, 70, 88, 62, 74, 95, 81, 68, 77, 84, 91, 73, 66, 89, 100, 78, 85];

export default function SellerDashboard({ go }: { go: (view: string) => void }) {
  const [tab, setTab] = useState<Tab>('RESUMEN');
  const [listingFilter, setListingFilter] = useState('TODOS');

  return (
    <main style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px 120px' }}>
      <div className="dm-crumb">
        <a onClick={() => go('home')}>DAUTON</a><span>/</span>
        <a onClick={() => go('profile')}>AHIEZER</a><span>/</span>
        <span className="dm-crumb-cur">PANEL DE VENDEDOR</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <div className="dm-section-eyebrow">PANEL DE VENDEDOR</div>
          <h1 style={{ fontSize: 'clamp(28px,4vw,48px)', fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1, marginTop: 8 }}>
            Ahiezer <span style={{ color: 'var(--fg-3)', fontWeight: 400 }}>· Productor</span>
          </h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="dm-btn dm-btn-secondary" onClick={() => go('shop')}>↗ VER TIENDA</button>
          <button className="dm-btn dm-btn-primary">+ NUEVO PRODUCTO</button>
        </div>
      </div>

      <div className="dm-tab-row" style={{ marginBottom: 32 }}>
        {TABS.map(t => (
          <button key={t} className={`dm-tab${tab === t ? ' is-on' : ''}`} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {tab === 'RESUMEN' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 40 }}>
            {KPIS.map(k => (
              <div key={k.label} style={{ background: 'var(--bg-1)', border: '1px solid var(--border-1)', padding: '20px 24px' }}>
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--fg-3)', marginBottom: 8, letterSpacing: '0.08em' }}>{k.label}</div>
                <div style={{ fontSize: 32, fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--fg-0)', lineHeight: 1 }}>{k.value}</div>
                <div style={{ marginTop: 8, fontSize: 12, fontFamily: 'var(--font-mono)', color: k.up ? 'var(--accent-teal)' : 'var(--accent-red)' }}>
                  {k.delta} vs mes anterior
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24, marginBottom: 40 }}>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border-1)', padding: '24px 24px 16px' }}>
              <div className="dm-section-eyebrow" style={{ marginBottom: 16 }}>INGRESOS · ÚLTIMOS 30 DÍAS</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 120 }}>
                {CHART_BARS.map((h, i) => (
                  <div key={i} style={{
                    flex: 1,
                    height: `${h}%`,
                    background: i === CHART_BARS.length - 1 ? 'var(--accent-yellow)' : 'var(--fg-2)',
                    opacity: i === CHART_BARS.length - 1 ? 1 : 0.3 + (i / CHART_BARS.length) * 0.5,
                  }} />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--fg-3)' }}>
                <span>24·MAR</span><span>01·ABR</span><span>08·ABR</span><span>15·ABR</span><span>22·ABR</span>
              </div>
            </div>

            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border-1)', padding: '24px' }}>
              <div className="dm-section-eyebrow" style={{ marginBottom: 16 }}>TOP PRODUCTOS</div>
              {LISTINGS.slice(0, 4).map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-1)' }}>
                  <div style={{ width: 32, height: 32, background: l.cover, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--fg-0)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.title}</div>
                    <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--fg-3)' }}>{l.sales} ventas</div>
                  </div>
                  <div style={{ fontSize: 13, fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--fg-0)' }}>{l.revenue}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border-1)' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="dm-section-eyebrow">ÓRDENES RECIENTES</div>
              <button className="dm-btn dm-btn-secondary dm-btn-sm" onClick={() => setTab('ÓRDENES')}>VER TODAS</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-1)' }}>
                  {['ID', 'COMPRADOR', 'PRODUCTO', 'LICENCIA', 'MONTO', 'FECHA', 'ESTADO'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--fg-3)', letterSpacing: '0.08em', fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ORDERS.slice(0, 4).map(o => (
                  <tr key={o.id} style={{ borderBottom: '1px solid var(--border-1)' }}>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent-cyan)' }}>{o.id}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--fg-1)' }}>@{o.buyer}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--fg-0)', fontWeight: 600 }}>{o.product}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--fg-2)', fontSize: 12 }}>{o.license}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--fg-0)' }}>{o.amount}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>{o.date}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', background: o.status === 'Reembolsada' ? 'rgba(217,61,74,0.15)' : 'rgba(4,117,111,0.15)', color: o.status === 'Reembolsada' ? 'var(--accent-red)' : 'var(--accent-teal)', letterSpacing: '0.06em' }}>
                        {o.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'ÓRDENES' && (
        <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border-1)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="dm-section-eyebrow">TODAS LAS ÓRDENES · {ORDERS.length}</div>
            <input placeholder="Buscar por ID o comprador…" style={{ background: 'var(--bg-0)', border: '1px solid var(--border-1)', color: 'var(--fg-0)', padding: '6px 12px', fontSize: 13, width: 240, outline: 'none' }} />
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-1)' }}>
                {['ID', 'COMPRADOR', 'PRODUCTO', 'LICENCIA', 'MONTO', 'FECHA', 'ESTADO', ''].map((h, i) => (
                  <th key={i} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--fg-3)', letterSpacing: '0.08em', fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ORDERS.map(o => (
                <tr key={o.id} style={{ borderBottom: '1px solid var(--border-1)' }}>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent-cyan)' }}>{o.id}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--fg-1)' }}>@{o.buyer}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--fg-0)', fontWeight: 600 }}>{o.product}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--fg-2)', fontSize: 12 }}>{o.license}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--fg-0)' }}>{o.amount}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>{o.date}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', background: o.status === 'Reembolsada' ? 'rgba(217,61,74,0.15)' : 'rgba(4,117,111,0.15)', color: o.status === 'Reembolsada' ? 'var(--accent-red)' : 'var(--accent-teal)', letterSpacing: '0.06em' }}>
                      {o.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <button className="dm-btn dm-btn-secondary dm-btn-sm">VER</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'CATÁLOGO' && (
        <>
          <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
            {['TODOS', 'ACTIVOS', 'PAUSADOS'].map(f => (
              <button key={f} className={`dm-chip${listingFilter === f ? ' is-on' : ''}`} onClick={() => setListingFilter(f)}>{f}</button>
            ))}
            <div style={{ flex: 1 }} />
            <button className="dm-btn dm-btn-primary">+ NUEVO PRODUCTO</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 16 }}>
            {LISTINGS.filter(l => listingFilter === 'TODOS' || (listingFilter === 'ACTIVOS' ? l.active : !l.active)).map((l, i) => (
              <div key={i} style={{ background: 'var(--bg-1)', border: '1px solid var(--border-1)' }}>
                <div style={{ height: 120, background: l.cover, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 28, color: 'var(--fg-0)', opacity: 0.4 }}>BP</span>
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontWeight: 600, color: 'var(--fg-0)', marginBottom: 4 }}>{l.title}</div>
                  <div style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--fg-3)', marginBottom: 12 }}>{l.sales} ventas · {l.revenue} total</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', background: l.active ? 'rgba(4,117,111,0.15)' : 'rgba(255,255,255,0.05)', color: l.active ? 'var(--accent-teal)' : 'var(--fg-3)' }}>
                      {l.active ? 'ACTIVO' : 'PAUSADO'}
                    </span>
                    <div style={{ flex: 1 }} />
                    <button className="dm-btn dm-btn-secondary dm-btn-sm">EDITAR</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {tab === 'ANALYTICS' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {[
            { label: 'Vistas de perfil · 30 días', val: '4,218', bars: [40,55,38,62,70,48,80,65,72,55,88,74,60,90,68,76,84,92,70,88,95,80,74,88,92,76,84,96,88,100] },
            { label: 'Clicks a productos · 30 días', val: '1,047', bars: [20,35,28,42,50,38,60,45,52,38,68,54,40,70,58,56,64,72,50,68,75,60,54,68,72,56,64,76,68,80] },
          ].map(chart => (
            <div key={chart.label} style={{ background: 'var(--bg-1)', border: '1px solid var(--border-1)', padding: '24px 24px 16px' }}>
              <div className="dm-section-eyebrow" style={{ marginBottom: 4 }}>{chart.label}</div>
              <div style={{ fontSize: 32, fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--fg-0)', marginBottom: 16 }}>{chart.val}</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 80 }}>
                {chart.bars.map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: 'var(--fg-2)', opacity: 0.2 + (i / chart.bars.length) * 0.8 }} />
                ))}
              </div>
            </div>
          ))}
          <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border-1)', padding: '24px' }}>
            <div className="dm-section-eyebrow" style={{ marginBottom: 16 }}>DISTRIBUCIÓN POR LICENCIA</div>
            {[
              { label: 'MP3 Lease', pct: 38, color: 'var(--fg-2)' },
              { label: 'WAV Lease', pct: 42, color: 'var(--accent-cyan)' },
              { label: 'STEMS Trackout', pct: 14, color: 'var(--accent-yellow)' },
              { label: 'EXCLUSIVE', pct: 6, color: 'var(--accent-red)' },
            ].map(row => (
              <div key={row.label} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12, color: 'var(--fg-1)' }}>
                  <span>{row.label}</span><span style={{ fontFamily: 'var(--font-mono)' }}>{row.pct}%</span>
                </div>
                <div style={{ height: 4, background: 'var(--bg-0)' }}>
                  <div style={{ height: '100%', width: `${row.pct}%`, background: row.color }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border-1)', padding: '24px' }}>
            <div className="dm-section-eyebrow" style={{ marginBottom: 16 }}>ORIGEN DEL TRÁFICO</div>
            {[
              { label: 'Búsqueda interna', pct: 44 },
              { label: 'Perfil de artista', pct: 28 },
              { label: 'Tienda principal', pct: 18 },
              { label: 'Externo', pct: 10 },
            ].map(row => (
              <div key={row.label} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 12, color: 'var(--fg-1)' }}>
                  <span>{row.label}</span><span style={{ fontFamily: 'var(--font-mono)' }}>{row.pct}%</span>
                </div>
                <div style={{ height: 4, background: 'var(--bg-0)' }}>
                  <div style={{ height: '100%', width: `${row.pct}%`, background: 'var(--accent-teal)' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'PAGOS' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
            {[
              { label: 'Saldo disponible', value: '$434', sub: 'Próximo pago · 01·MAY·2026' },
              { label: 'Ingresos brutos · total', value: '$5,840', sub: 'Desde el inicio' },
              { label: 'Comisión Dauton (30%)', value: '$1,752', sub: 'Total retenido' },
            ].map(k => (
              <div key={k.label} style={{ background: 'var(--bg-1)', border: '1px solid var(--border-1)', padding: '20px 24px' }}>
                <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--fg-3)', marginBottom: 8 }}>{k.label}</div>
                <div style={{ fontSize: 28, fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--fg-0)', lineHeight: 1 }}>{k.value}</div>
                <div style={{ marginTop: 8, fontSize: 11, color: 'var(--fg-3)' }}>{k.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border-1)' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-1)' }}>
              <div className="dm-section-eyebrow">HISTORIAL DE PAGOS</div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-1)' }}>
                  {['FECHA', 'BRUTO', 'COMISIÓN (30%)', 'NETO', 'ESTADO'].map(h => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--fg-3)', letterSpacing: '0.08em', fontWeight: 400 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PAYOUTS.map((p, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-1)' }}>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', color: 'var(--fg-2)' }}>{p.date}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', color: 'var(--fg-1)' }}>{p.gross}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', color: 'var(--accent-red)' }}>{p.fee}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--fg-0)' }}>{p.net}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', background: 'rgba(4,117,111,0.15)', color: 'var(--accent-teal)' }}>PAGADO</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === 'AJUSTES' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border-1)', padding: '24px' }}>
            <div className="dm-section-eyebrow" style={{ marginBottom: 20 }}>PERFIL DE VENDEDOR</div>
            {[
              { label: 'Nombre artístico', val: 'Ahiezer' },
              { label: 'Rol', val: 'Productor' },
              { label: 'Ciudad', val: 'Caracas, VE' },
              { label: 'Bio corta', val: 'Productor independiente. Boom-bap, samples venezolanos.' },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--fg-3)', letterSpacing: '0.08em', marginBottom: 6 }}>{f.label}</label>
                <input defaultValue={f.val} style={{ width: '100%', background: 'var(--bg-0)', border: '1px solid var(--border-1)', color: 'var(--fg-0)', padding: '8px 12px', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
              </div>
            ))}
            <button className="dm-btn dm-btn-primary" style={{ marginTop: 8 }}>GUARDAR CAMBIOS</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border-1)', padding: '24px' }}>
              <div className="dm-section-eyebrow" style={{ marginBottom: 16 }}>NOTIFICACIONES</div>
              {[
                { label: 'Nueva venta', on: true },
                { label: 'Reembolso solicitado', on: true },
                { label: 'Nuevo seguidor', on: false },
                { label: 'Resumen semanal', on: true },
              ].map((n, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border-1)' }}>
                  <span style={{ fontSize: 13, color: 'var(--fg-1)' }}>{n.label}</span>
                  <div style={{ width: 36, height: 20, background: n.on ? 'var(--accent-teal)' : 'var(--bg-0)', border: '1px solid var(--border-1)', borderRadius: 10, cursor: 'pointer', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 2, left: n.on ? 16 : 2, width: 14, height: 14, background: n.on ? 'var(--fg-0)' : 'var(--fg-3)', borderRadius: '50%', transition: 'left 0.15s' }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--bg-1)', border: '1px solid var(--border-1)', padding: '24px' }}>
              <div className="dm-section-eyebrow" style={{ marginBottom: 16 }}>PAGO · MÉTODO</div>
              <div style={{ fontSize: 13, color: 'var(--fg-2)', marginBottom: 12 }}>Cuenta bancaria terminada en ···· 8821</div>
              <button className="dm-btn dm-btn-secondary">CAMBIAR MÉTODO</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
