'use client';
import { useState } from 'react';

interface CommentData {
  id: number;
  user: string;
  badge: string | null;
  t: string;
  score: number;
  body: string;
  replies: CommentData[];
}

const SEED: CommentData[] = [
  {
    id: 1, user: 'mariana_rap', badge: 'Contributor', t: 'hace 3h', score: 47,
    body: 'El dato de Plaza Brión está incompleto — había cyphers los miércoles y los sábados, no solo los sábados. Puedo aportar fuentes si me dan acceso.',
    replies: [
      { id: 11, user: 'luis_figuera', badge: 'Editor', t: 'hace 2h', score: 12, body: 'Gracias Mariana. Te mando invitación a contribuir. Si tienes flyers de la época, mejor todavía.', replies: [] },
      { id: 12, user: 'apache_crew', badge: 'Member', t: 'hace 1h', score: 6, body: 'También había sesiones los jueves en 2011–2012. Yo fui a tres.', replies: [] },
    ],
  },
  { id: 2, user: 'vega_archivista', badge: 'Founder', t: 'hace 6h', score: 28, body: '¿Van a incluir La Quinta Tribu en la era 2008–2015? Fueron centrales en la primera ola y casi nunca se mencionan.', replies: [] },
  { id: 3, user: 'santiago_mc', badge: null, t: 'hace 1d', score: 14, body: 'Como miembro desde hace poco: el archivo se está poniendo serio. Sigan así.', replies: [] },
];

function CommentNode({ c, depth = 0 }: { c: CommentData; depth?: number }) {
  const [vote, setVote] = useState(0);
  const [open, setOpen] = useState(true);
  const cast = (dir: number) => setVote(v => v === dir ? 0 : dir);
  const score = c.score + vote;
  const badgeClass = c.badge ? `bg-${c.badge.toLowerCase()}` : '';
  return (
    <div className="dm-cmt" style={{ marginLeft: depth * 28 }}>
      <div className="dm-cmt-left">
        <button className={`dm-cmt-vote ${vote === 1 ? 'is-up' : ''}`} onClick={() => cast(1)}>▲</button>
        <div className="dm-cmt-score">{score}</div>
        <button className={`dm-cmt-vote ${vote === -1 ? 'is-down' : ''}`} onClick={() => cast(-1)}>▼</button>
        {c.replies.length > 0 && <div className="dm-cmt-rail" onClick={() => setOpen(!open)}></div>}
      </div>
      <div className="dm-cmt-body">
        <div className="dm-cmt-head">
          <span className="dm-cmt-avatar" style={{ background: `hsl(${c.user.charCodeAt(0) * 7},60%,35%)` }}>{c.user[0].toUpperCase()}</span>
          <a className="dm-cmt-user">@{c.user}</a>
          {c.badge && <span className={`dm-cmt-badge ${badgeClass}`}>{c.badge}</span>}
          <span className="dm-cmt-time">· {c.t}</span>
        </div>
        <div className="dm-cmt-text">{c.body}</div>
        <div className="dm-cmt-actions">
          <button className="dm-cmt-act">Responder</button>
          <button className="dm-cmt-act">Compartir</button>
          <button className="dm-cmt-act">Reportar</button>
        </div>
        {open && c.replies.map(r => <CommentNode key={r.id} c={r} depth={depth + 1} />)}
      </div>
    </div>
  );
}

export default function Comments({ context = '' }: { context?: string }) {
  const [sort, setSort] = useState('best');
  return (
    <section className="dm-comments">
      <div className="dm-comments-head">
        <div>
          <div className="dm-section-eyebrow">DISCUSIÓN · 24 COMENTARIOS</div>
          <h2 className="dm-section-title">
            Comentarios{context && <span style={{ color: 'var(--fg-3)', fontSize: 18, fontWeight: 400 }}> · {context}</span>}
          </h2>
        </div>
        <div className="dm-cmt-sort">
          {['best', 'recientes', 'más votados'].map(s => (
            <button key={s} className={`dm-cmt-sort-btn ${sort === s ? 'is-on' : ''}`} onClick={() => setSort(s)}>{s}</button>
          ))}
        </div>
      </div>
      <div className="dm-cmt-compose">
        <div className="dm-cmt-avatar dm-cmt-avatar-me">T</div>
        <textarea placeholder="¿Qué piensas? Sé constructivo." rows={2}></textarea>
        <button className="dm-btn dm-btn-primary">Publicar</button>
      </div>
      <div className="dm-cmt-list">
        {SEED.map(c => <CommentNode key={c.id} c={c} />)}
      </div>
    </section>
  );
}
