export default function Footer() {
  return (
    <footer className="dm-footer">
      <div className="dm-footer-top">
        <div className="dm-footer-brand">
          <div className="dm-brand">DAUTON<span style={{ color: '#ffce37', margin: '0 2px' }}>/</span>MEDIA</div>
          <div className="dm-footer-tag">Archivo, discovery y editorial.<br />Rap hispanohablante. Enfoque venezolano.</div>
        </div>
        <div className="dm-footer-cols">
          <div>
            <div className="dm-section-eyebrow">ARCHIVO</div>
            <a>Artistas</a><a>Releases</a><a>Productores</a><a>Ciudades</a><a>Búsqueda</a>
          </div>
          <div>
            <div className="dm-section-eyebrow">EDITORIAL</div>
            <a>Features</a><a>Reviews</a><a>Interviews</a><a>Metodología</a>
          </div>
          <div>
            <div className="dm-section-eyebrow">PRODUCTO</div>
            <a>Drops</a><a>Membresía</a><a>Reclamar perfil</a><a>Contribuir</a>
          </div>
          <div>
            <div className="dm-section-eyebrow">CASA</div>
            <a>Quiénes somos</a><a>Contacto</a><a>Privacidad</a><a>Términos</a>
          </div>
        </div>
      </div>
      <div className="dm-footer-bot">
        <span>© 2026 DAUTON MEDIA · VULQO LLC · EVOLUCIÓN DE DAUTON STORE (MÉRIDA 2020)</span>
        <span>MADE FOR EL RAP QUE NO SE OLVIDA.</span>
      </div>
    </footer>
  );
}
