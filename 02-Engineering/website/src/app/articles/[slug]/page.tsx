export default function ArticleSlugPage({ params }: { params: { slug: string } }) {
  return (
    <main className="dm-home">
      <section className="dm-section" style={{ paddingTop: 80, textAlign: 'center' }}>
        <div className="dm-section-eyebrow">PROXIMOS · STAY TUNED</div>
        <h1 className="dm-section-title" style={{ marginTop: 12 }}>{params.slug.toUpperCase()}</h1>
        <p style={{ color: 'var(--fg-3)', marginTop: 16 }}>Article coming soon.</p>
      </section>
    </main>
  );
}
