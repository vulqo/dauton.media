interface FaqItem {
  q: string;
  a: string;
}

interface FaqProps {
  items: FaqItem[];
  title?: string;
  eyebrow?: string;
  columns?: 1 | 2;
  density?: 'compact' | 'regular' | 'comfy';
  align?: 'left' | 'center';
  defaultOpen?: number;
}

export default function Faq({
  items,
  title = 'Preguntas frecuentes',
  eyebrow = 'FAQ',
  columns = 2,
  density = 'regular',
  align = 'left',
  defaultOpen = 0,
}: FaqProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className={`dm-faq dm-faq-${density} dm-faq-align-${align}`}>
      <div className="dm-faq-head">
        <div className="dm-section-eyebrow">{eyebrow}</div>
        <h2 className="dm-faq-title">{title}</h2>
      </div>
      <div className={`dm-faq-grid ${columns === 1 ? 'is-single' : 'is-double'}`}>
        {items.map((it, i) => (
          <details key={i} className="dm-faq-item" open={i === defaultOpen}>
            <summary>{it.q}</summary>
            <div>{it.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
