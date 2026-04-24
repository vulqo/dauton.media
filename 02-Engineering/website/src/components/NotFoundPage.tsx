import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="dm-404">
      <div className="dm-404-inner">
        <div className="dm-404-glyph">404</div>
        <div className="dm-section-eyebrow">PÁGINA NO ENCONTRADA</div>
        <h1 className="dm-404-h1">Esta página no existe<br />o fue archivada.</h1>
        <p className="dm-404-lede">
          Puede que la URL esté mal escrita, o que el contenido haya sido movido mientras organizábamos el archivo.
          Si crees que esto es un error, avísanos y lo arreglamos.
        </p>
        <div className="dm-404-actions">
          <Link href="/" className="dm-btn dm-btn-primary">VOLVER AL HOME</Link>
          <Link href="/cities" className="dm-btn dm-btn-ghost">EXPLORAR CIUDADES</Link>
          <Link href="/artists" className="dm-btn dm-btn-ghost">VER ARTISTAS</Link>
        </div>
        <div className="dm-404-suggest">
          <div className="dm-section-eyebrow">SUGERENCIAS</div>
          <ul>
            <li><Link href="/artists">Directorio de artistas</Link></li>
            <li><Link href="/cities">Ciudades activas</Link></li>
            <li><Link href="/methodology">Metodología del archivo</Link></li>
            <li><Link href="/about">Sobre Dauton Media</Link></li>
          </ul>
        </div>
      </div>
    </main>
  );
}
