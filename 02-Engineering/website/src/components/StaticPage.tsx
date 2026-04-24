import type { ReactNode } from 'react';

interface StaticPageProps {
  title: string;
  content: string | ReactNode;
  kicker?: string;
  dek?: string;
}

export default function StaticPage({ title, content, kicker, dek }: StaticPageProps) {
  const isString = typeof content === 'string';
  // Split plain string content into paragraphs on double newline.
  const paragraphs = isString ? (content as string).split(/\n{2,}/).map((p) => p.trim()).filter(Boolean) : null;

  return (
    <main className="dm-static">
      <article className="dm-article dm-static-article">
        <header>
          {kicker && <div className="dm-section-eyebrow">{kicker}</div>}
          <h1 className="dm-static-h1">{title}</h1>
          {dek && <p className="dm-static-dek">{dek}</p>}
          <div className="dm-static-meta">
            <span className="dm-mono-label">ÚLTIMA ACTUALIZACIÓN · 2026-04-18</span>
          </div>
        </header>

        <div className="dm-static-body">
          {paragraphs ? (
            paragraphs.map((p, i) => <p key={i}>{p}</p>)
          ) : (
            content
          )}
        </div>
      </article>
    </main>
  );
}
