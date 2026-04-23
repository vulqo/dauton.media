'use client';

import { useState } from 'react';

interface Props {
  go: (view: string) => void;
}

type CategoryTab = 'DROPS ACTIVOS' | 'MERCH' | 'DIGITAL' | 'TICKETS';

const CATEGORY_TABS: { label: CategoryTab; count: number }[] = [
  { label: 'DROPS ACTIVOS', count: 4 },
  { label: 'MERCH', count: 12 },
  { label: 'DIGITAL', count: 8 },
  { label: 'TICKETS', count: 6 },
];

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  coverColor: string;
  badge?: string;
  category: CategoryTab;
}

const PRODUCTS: Product[] = [
  // Drops activos
  {
    id: 'apoc-14-tee',
    name: 'Apocalipsis 14 Años — Tee Edición Limitada',
    type: 'Camiseta',
    price: 42,
    coverColor: '#1a1a1a',
    badge: 'AGOTÁNDOSE',
    category: 'DROPS ACTIVOS',
  },
  {
    id: 'guerrilla-hoodie',
    name: 'Studio Guerrilla — Hoodie',
    type: 'Hoodie',
    price: 78,
    coverColor: '#2d2d2d',
    badge: 'NUEVO',
    category: 'DROPS ACTIVOS',
  },
  {
    id: 'plaza-brion-tee',
    name: 'Plaza Brión — Tee',
    type: 'Camiseta',
    price: 32,
    coverColor: '#3a2500',
    category: 'DROPS ACTIVOS',
  },
  {
    id: 'vinyl-apoc',
    name: 'Apocalipsis — Vinilo Original',
    type: 'Vinilo',
    price: 45,
    coverColor: '#111',
    badge: 'LIMITADO',
    category: 'DROPS ACTIVOS',
  },
  // Merch
  {
    id: 'era-dorada-tee',
    name: 'La Era Dorada — Tee',
    type: 'Camiseta',
    price: 35,
    coverColor: '#1c2a1c',
    category: 'MERCH',
  },
  {
    id: 'dauton-hoodie',
    name: 'Dauton Media — Hoodie Clásico',
    type: 'Hoodie',
    price: 68,
    coverColor: '#1a1a2e',
    category: 'MERCH',
  },
  // Digital
  {
    id: 'beat-pack-guerrilla',
    name: 'Guerrilla Beat Pack Vol. 3',
    type: 'Beat Pack',
    price: 99,
    coverColor: '#2a0a0a',
    badge: 'EXCLUSIVO',
    category: 'DIGITAL',
  },
  // Libros
  {
    id: 'libro-era-dorada',
    name: 'La Era Dorada — Libro de Fotografía',
    type: 'Libro',
    price: 28,
    coverColor: '#0a1a2a',
    category: 'MERCH',
  },
];

export default function ShopPage({ go }: Props) {
  const [activeCategory, setActiveCategory] = useState<CategoryTab>('DROPS ACTIVOS');

  const filteredProducts = PRODUCTS.filter((p) => p.category === activeCategory);

  return (
    <div className="dm-shop">
      {/* Breadcrumb */}
      <nav className="dm-crumb">
        <button onClick={() => go('home')}>DAUTON</button>
        <span>/</span>
        <span>TIENDA</span>
      </nav>

      {/* Hero drop */}
      <div className="dm-shop-hero">
        <div className="dm-shop-hero-cover" style={{ background: '#1a1a1a' }}>
          <span className="dm-shop-hero-badge">EDICIÓN LIMITADA</span>
          <span className="dm-shop-hero-mono">001 / 100</span>
          <div className="dm-shop-hero-cover-foot">
            <span className="dm-shop-hero-eye">👁 47 personas viendo</span>
          </div>
        </div>

        <div className="dm-shop-hero-body">
          <h1 className="dm-shop-hero-title">APOCALIPSIS 14 AÑOS</h1>
          <p className="dm-shop-hero-dek">
            Camiseta conmemorativa en honor al álbum que marcó una generación. Serigrafía a mano
            sobre algodón 200g. Solo 100 unidades disponibles.
          </p>

          <div className="dm-shop-hero-price">
            <span className="dm-shop-hero-price-val">
              <span className="dm-shop-currency">$</span>42
            </span>
            <span className="dm-shop-hero-price-sub">USD · Envío internacional disponible</span>
          </div>

          <div className="dm-shop-hero-meta">
            <span>Serigrafía a mano</span>
            <span>·</span>
            <span>Algodón 200g</span>
            <span>·</span>
            <span>Edición #001</span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <button
              className="dm-btn dm-btn-primary dm-btn-lg"
              onClick={() => go('checkout-apoc-14-tee')}
            >
              Comprar ahora
            </button>
            <button
              className="dm-btn dm-btn-secondary dm-btn-lg"
              onClick={() => go('product-apoc-14-tee')}
            >
              Ver detalles
            </button>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div className="dm-shop-cats">
        {CATEGORY_TABS.map(({ label, count }) => (
          <button
            key={label}
            className={`dm-shop-cat${activeCategory === label ? ' is-active' : ''}`}
            onClick={() => setActiveCategory(label)}
          >
            <span className="dm-shop-cat-label">{label}</span>
            <span className="dm-shop-cat-sub">{count}</span>
          </button>
        ))}
      </div>

      {/* Product grid */}
      <section className="dm-section">
        <div className="dm-section-head">
          <span className="dm-section-eyebrow">TIENDA</span>
          <h2 className="dm-section-title">{activeCategory}</h2>
          <button className="dm-section-more" onClick={() => go('seller')}>
            VENDEDOR →
          </button>
        </div>

        <div className="dm-grid-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="dm-drop"
              onClick={() => go(`product-${product.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div
                className="dm-drop-cover"
                style={{ background: product.coverColor, position: 'relative' }}
              >
                {product.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '0.5rem',
                      left: '0.5rem',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      background: 'rgba(255,255,255,0.15)',
                      color: '#fff',
                      padding: '2px 6px',
                      borderRadius: '2px',
                    }}
                  >
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="dm-drop-title">{product.name}</div>
              <div className="dm-drop-meta">{product.type}</div>
              <div className="dm-drop-price">
                <span className="dm-shop-currency">$</span>
                {product.price}
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <p style={{ textAlign: 'center', padding: '3rem 0', opacity: 0.5 }}>
            No hay productos en esta categoría por ahora.
          </p>
        )}
      </section>

      {/* All products fallback grid when browsing MERCH/DIGITAL/TICKETS that have more */}
      {(activeCategory === 'MERCH' || activeCategory === 'DIGITAL') && (
        <section className="dm-section">
          <div className="dm-section-head">
            <h2 className="dm-section-title">Más productos</h2>
            <button
              className="dm-section-more dm-btn dm-btn-secondary"
              onClick={() => go('tienda-todos')}
            >
              Ver catálogo completo →
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
