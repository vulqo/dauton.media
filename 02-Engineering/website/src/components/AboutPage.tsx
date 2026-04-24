import Link from 'next/link';

export default function AboutPage() {
  const stats: Array<[string, string]> = [
    ['14', 'CIUDADES'],
    ['2.1K', 'ARTISTAS'],
    ['8.4K', 'LANZAMIENTOS'],
    ['340', 'ARTÍCULOS'],
    ['18K', 'MIEMBROS'],
  ];

  const manifesto: Array<[string, string]> = [
    ['El archivo como derecho.', 'La historia del rap en nuestra lengua está dispersa entre blogs muertos, carpetas de Drive y memorias frágiles. Documentamos antes de que se pierda.'],
    ['Crédito donde corresponde.', 'Detrás de cada canción hay productores, ingenieros, diseñadores, fotógrafos. El crédito es público, verificable, y portátil como CV profesional.'],
    ['Escena por escena.', 'Caracas no es Bogotá. Madrid no es Buenos Aires. Construimos desde la ciudad: venues, eventos, eras, colaboraciones locales.'],
    ['Sin algoritmo de engagement.', 'No optimizamos para tiempo en pantalla. Optimizamos para archivo útil, editorial honesto y conexiones reales entre profesionales.'],
  ];

  const team: Array<[string, string]> = [
    ['Editorial', 'Escribe, edita y mantiene la política de archivo.'],
    ['Archivo', 'Verifica créditos, fuentes y consolida datos por ciudad.'],
    ['Producto', 'Mantiene la plataforma, tienda y herramientas de comunidad.'],
    ['Comunidad', 'Cura eventos, coordina contribuciones y modera.'],
  ];

  return (
    <main className="dm-about">
      <section className="dm-about-hero">
        <div className="dm-section-eyebrow">SOBRE DAUTON MEDIA</div>
        <h1 className="dm-about-h1">Un archivo para el rap que escuchamos<br />y la gente que lo hizo posible.</h1>
        <p className="dm-about-lede">
          Dauton Media es una plataforma independiente dedicada al rap hispanohablante. Documentamos ciudades,
          escenas, eras, lanzamientos y las personas detrás del sonido — con rigor de archivo y criterio editorial.
        </p>
      </section>

      <section className="dm-about-stats">
        {stats.map(([n, l]) => (
          <div key={l} className="dm-about-stat">
            <div className="dm-about-stat-n">{n}</div>
            <div className="dm-about-stat-l">{l}</div>
          </div>
        ))}
      </section>

      <section className="dm-about-manifesto">
        <div className="dm-section-eyebrow">MANIFIESTO</div>
        <div className="dm-about-columns">
          {manifesto.map(([t, d]) => (
            <div key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dm-about-team">
        <div className="dm-section-eyebrow">EQUIPO</div>
        <div className="dm-about-team-grid">
          {team.map(([t, d]) => (
            <div key={t} className="dm-about-team-card">
              <h4>{t}</h4>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="dm-about-cta">
        <div>
          <h2>¿Construimos juntos?</h2>
          <p>Aporta al archivo, reclama tu perfil profesional, publica tu merch o conviértete en miembro PRO.</p>
        </div>
        <div className="dm-about-cta-actions">
          <Link href="/auth" className="dm-btn dm-btn-primary">HAZTE MIEMBRO</Link>
          <Link href="/methodology" className="dm-btn dm-btn-ghost">VER METODOLOGÍA</Link>
        </div>
      </section>
    </main>
  );
}
