interface EntityCardProps {
  kind?: string;
  year?: string;
  title: string;
  subtitle?: string;
  cover?: string;
  meta?: number;
  onClick?: () => void;
}

const COVERS: Record<string, { bg: string; text: string; inkDark?: boolean; border?: boolean }> = {
  apocalipsis: { bg: 'linear-gradient(135deg,#244C5A 0%,#0a0a0a 100%)', text: 'APOCA\nLIPSIS' },
  muerte:      { bg: 'linear-gradient(135deg,#D93D4A 0%,#3a1318 100%)', text: 'MUER\nTE' },
  indigo:      { bg: 'linear-gradient(135deg,#04756F 0%,#06251f 100%)', text: 'ÍNDIGO' },
  cristal:     { bg: 'linear-gradient(135deg,#ffce37 0%,#7a5d00 100%)', text: 'CRISTAL', inkDark: true },
  siete:       { bg: 'linear-gradient(135deg,#0093C6 0%,#062430 100%)', text: '7MO\nARTE' },
  noche:       { bg: '#141414', text: 'NOCHE\nCERRADA', border: true },
};

export default function EntityCard({ kind = 'RELEASE', year, title, subtitle, cover, onClick, meta }: EntityCardProps) {
  const c = COVERS[cover ?? ''] ?? COVERS.noche;
  return (
    <article className="dm-card" onClick={onClick}>
      <div className="dm-card-cover" style={{
        background: c.bg,
        border: c.border ? '1px solid var(--border-1)' : 'none',
        color: c.inkDark ? 'var(--bg-0)' : 'var(--fg-0)',
      }}>
        <div className="dm-card-cover-title" style={{ whiteSpace: 'pre-line' }}>{c.text}</div>
        <div className="dm-card-cover-year">{year}</div>
      </div>
      <div className="dm-card-body">
        <div className="dm-card-tag">{kind} · {year}</div>
        <div className="dm-card-title">{title}</div>
        <div className="dm-card-meta">{subtitle}</div>
        {meta && (
          <div className="dm-card-complete">
            <div className="dm-card-complete-bar"><div style={{ width: `${meta}%` }}></div></div>
            <span>{meta}%</span>
          </div>
        )}
      </div>
    </article>
  );
}
