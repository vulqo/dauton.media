'use client';
import { useState } from 'react';

interface License { k: string; label: string; price: number; usage: string; file: string; }
interface Track { n: string; title: string; bpm: number; key: string; dur: string; }

const PRODUCT = {
  title: 'Boom-Bap Pack · 5 beats',
  tag: 'DIGITAL · BEAT PACK',
  seller: 'Ahiezer',
  sellerRole: 'PRODUCTOR · ✓ VERIFIED',
  sellerRating: 4.9,
  sellerSales: 412,
  city: 'Caracas',
  description: '5 instrumentales originales en estilo boom-bap · 88-96 BPM · Escalas menores. Todas con drum kits grabados de piezas acústicas, samples cortados a mano de vinilos venezolanos de los 70s (Lya Imber, Los Terrícolas, El Pavo Frank). Incluye stems individuales de cada beat para tus propias mezclas.',
  tracks: [
    { n: '01', title: 'Cerro Ávila',   bpm: 92, key: 'C min', dur: '3:42' },
    { n: '02', title: 'La Vega',       bpm: 88, key: 'F min', dur: '4:18' },
    { n: '03', title: 'Petare Soul',   bpm: 94, key: 'Gm',    dur: '3:02' },
    { n: '04', title: 'Caracas Noche', bpm: 90, key: 'Am',    dur: '3:55' },
    { n: '05', title: 'Esquina Sur',   bpm: 96, key: 'Dm',    dur: '4:24' },
  ] as Track[],
  licenses: [
    { k: 'mp3',   label: 'MP3 · Lease',      price: 15,  usage: 'Streaming ilimitado · hasta 100K plays · atribución requerida',          file: '5× MP3 320kbps' },
    { k: 'wav',   label: 'WAV · Lease',      price: 40,  usage: 'Streaming + venta digital · hasta 500K plays · atribución requerida',     file: '5× WAV 24-bit' },
    { k: 'stems', label: 'STEMS · Trackout', price: 120, usage: 'Control total sobre la mezcla · sync comercial · atribución requerida',  file: '5× WAV + stems individuales' },
    { k: 'excl',  label: 'EXCLUSIVE',        price: 800, usage: 'Derechos exclusivos · el beat se retira del catálogo · sin atribución',  file: 'Todo lo anterior + contrato + transferencia' },
  ] as License[],
  coverBg: 'linear-gradient(135deg,#244C5A 0%,#04756F 100%)',
};

export default function ProductPage({ go }: { go: (view: string) => void }) {
  const [license, setLicense] = useState('wav');
  const currentLicense = PRODUCT.licenses.find(l => l.k === license)!;

  return (
    <main style={{ maxWidth: 1440, margin: '0 auto', padding: '0 24px 120px' }}>
      <div className="dm-crumb">
        <a onClick={() => go('home')}>DAUTON</a><span>/</span>
        <a onClick={() => go('shop')}>TIENDA</a><span>/</span>
        <a onClick={() => go('shop')}>DIGITAL</a><span>/</span>
        <span className="dm-crumb-cur">{PRODUCT.title}</span>
      </div>

      <section className="dm-prod-main">
        <div>
          <div className="dm-prod-cover" style={{ background: PRODUCT.coverBg }}>
            <div className="dm-prod-cover-badge">DIGITAL · DESCARGA INSTANTÁNEA</div>
            <div className="dm-prod-cover-mono">BP</div>
            <div className="dm-prod-cover-foot">
              <span>5 TRACKS</span><span>18 MIN · 24-BIT WAV</span>
            </div>
          </div>
          <div className="dm-prod-thumbs">
            {['BP','01','02','03','04'].map((t, i) => (
              <div key={i} className={`dm-prod-thumb${i === 0 ? ' is-on' : ''}`} style={{ background: i === 0 ? PRODUCT.coverBg : 'var(--bg-1)', border: i === 0 ? 'none' : '1px solid var(--border-1)' }}>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dm-prod-info">
          <div className="dm-prod-tag">{PRODUCT.tag}</div>
          <h1 className="dm-prod-title">{PRODUCT.title}</h1>
          <a className="dm-prod-seller" onClick={() => go('profile')}>
            <div className="dm-prod-seller-avatar" style={{ background: '#244C5A' }}>A</div>
            <div>
              <div className="dm-prod-seller-name">{PRODUCT.seller}</div>
              <div className="dm-prod-seller-meta">{PRODUCT.sellerRole} · {PRODUCT.city}</div>
            </div>
            <div className="dm-prod-seller-rating">
              <b>★ {PRODUCT.sellerRating}</b>
              <span>{PRODUCT.sellerSales} ventas</span>
            </div>
          </a>

          <p className="dm-prod-desc">{PRODUCT.description}</p>

          <div className="dm-prod-section-eye">SELECCIONA LICENCIA</div>
          <div className="dm-prod-licenses">
            {PRODUCT.licenses.map(l => (
              <label key={l.k} className={`dm-prod-license${license === l.k ? ' is-on' : ''}`}>
                <input type="radio" name="lic" checked={license === l.k} onChange={() => setLicense(l.k)} />
                <div className="dm-prod-license-body">
                  <div className="dm-prod-license-head">
                    <span className="dm-prod-license-label">{l.label}</span>
                    <span className="dm-prod-license-price">${l.price}</span>
                  </div>
                  <div className="dm-prod-license-usage">{l.usage}</div>
                  <div className="dm-prod-license-file">↓ {l.file}</div>
                </div>
              </label>
            ))}
          </div>

          <div className="dm-prod-buy">
            <div className="dm-prod-buy-total">
              <div className="dm-prod-buy-total-lbl">TOTAL</div>
              <div className="dm-prod-buy-total-val">${currentLicense.price}<small>USD</small></div>
            </div>
            <div className="dm-prod-buy-actions">
              <button className="dm-btn dm-btn-primary dm-btn-lg" style={{ flex: 1 }}>COMPRAR AHORA →</button>
              <button className="dm-btn dm-btn-secondary dm-btn-lg">♡</button>
              <button className="dm-btn dm-btn-secondary dm-btn-lg">+ CARRITO</button>
            </div>
            <div className="dm-prod-buy-foot">
              <span>✓ Descarga inmediata tras pago</span>
              <span>✓ Licencia registrada con timestamp</span>
              <span>✓ 70% va a Ahiezer</span>
            </div>
          </div>
        </div>
      </section>

      <section className="dm-prod-preview">
        <div className="dm-section-eyebrow">ESCUCHA LOS BEATS</div>
        <div className="dm-prod-player">
          {PRODUCT.tracks.map((t, i) => (
            <div key={i} className={`dm-prod-track${i === 0 ? ' is-playing' : ''}`}>
              <div className="dm-prod-track-n">{t.n}</div>
              <button className="dm-prod-track-play">{i === 0 ? '⏸' : '▶'}</button>
              <div className="dm-prod-track-title">{t.title}</div>
              <div className="dm-prod-track-meta">{t.bpm} BPM · {t.key}</div>
              <div className="dm-prod-track-wave">
                {Array.from({ length: 60 }, (_, j) => (
                  <div key={j} className={`dm-prod-track-bar${i === 0 && j < 22 ? ' is-played' : ''}`}
                    style={{ height: `${8 + Math.abs(Math.sin(j * 0.35 + i)) * 22}px`, opacity: i === 0 ? 1 : 0.4 }} />
                ))}
              </div>
              <div className="dm-prod-track-dur">{t.dur}</div>
            </div>
          ))}
        </div>
        <div className="dm-prod-preview-note">Preview con marca de agua · 30s cada uno. Después de comprar recibes archivos limpios sin tag.</div>
      </section>

      <section className="dm-prod-split">
        <div>
          <div className="dm-section-eyebrow">DETALLES</div>
          <dl className="dm-prod-specs">
            {[
              ['Formato',             'WAV 24-bit / 48kHz + stems'],
              ['Duración total',      '18:21'],
              ['BPM',                 '88–96'],
              ['Género',              'Boom-Bap · Hip-Hop · Lo-Fi'],
              ['Samples usados',      'Vinilos 70s Venezuela · declarados'],
              ['Grabado en',          'Estudio Ahiezer · Caracas'],
              ['Fecha',               '15·OCT·2026'],
              ['Catálogo',            'AHZ-BP-001'],
              ['Licencia base',       'Non-exclusive lease (actualizable)'],
              ['Ventas',              '127 licencias vendidas'],
            ].map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
        <div>
          <div className="dm-section-eyebrow">POLÍTICAS</div>
          <div className="dm-prod-policies">
            <details open>
              <summary>Qué puedes hacer con este pack</summary>
              <ul>
                <li>Usar en tus tracks no-exclusivos según la licencia que compres</li>
                <li>Subir a DSPs con atribución a Ahiezer</li>
                <li>Remezclar, filtrar y modificar libremente</li>
                <li>Usar en producciones comerciales (requiere WAV o superior)</li>
              </ul>
            </details>
            <details>
              <summary>Qué NO puedes hacer</summary>
              <ul>
                <li>Revender el beat como tuyo (incluso modificado)</li>
                <li>Registrar las composiciones a tu nombre sin acuerdo previo</li>
                <li>Usar en publicidad / sync sin licencia STEMS o EXCLUSIVE</li>
              </ul>
            </details>
            <details>
              <summary>Protección de compra</summary>
              <p>Si el archivo no corresponde a la descripción o no se descarga, tienes 30 días para reclamar. Dauton Media interviene entre comprador y vendedor.</p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
