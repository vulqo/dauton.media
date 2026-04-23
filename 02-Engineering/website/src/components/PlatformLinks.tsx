const PLATFORMS = [
  { k: 'spotify', name: 'Spotify',      ic: '▶', color: '#1ed760' },
  { k: 'apple',   name: 'Apple Music',  ic: '♫', color: '#fa57c1' },
  { k: 'yt',      name: 'YouTube',      ic: '▶', color: '#ff4444' },
  { k: 'sc',      name: 'SoundCloud',   ic: '☁', color: '#ff7700' },
  { k: 'bc',      name: 'Bandcamp',     ic: '◉', color: '#629aa9' },
];

export default function PlatformLinks({ compact }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="dm-plat-inline">
        {PLATFORMS.map(i => (
          <a key={i.k} className="dm-plat-chip">
            <span className="dm-plat-ic" style={{ color: i.color }}>{i.ic}</span>{i.name}
          </a>
        ))}
      </div>
    );
  }
  return (
    <div className="dm-plat-block">
      <div className="dm-section-eyebrow">ESCUCHAR EN · 5 PLATAFORMAS</div>
      <div className="dm-plat-rows">
        {PLATFORMS.map(i => (
          <a key={i.k} className="dm-plat-row">
            <span className="dm-plat-ic" style={{ color: i.color }}>{i.ic}</span>
            <span className="dm-plat-name">{i.name}</span>
            <span className="dm-plat-arr">↗</span>
          </a>
        ))}
      </div>
      <div className="dm-plat-note">Dauton Media no aloja música — enlazamos a las plataformas oficiales.</div>
    </div>
  );
}
