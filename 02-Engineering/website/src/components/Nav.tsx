'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavProps {
  onSearch: () => void;
}

const TABS = [
  { href: '/',        label: 'ARCHIVO'   },
  { href: '/artists', label: 'ARTISTAS'  },
  { href: '/cities',  label: 'CIUDADES'  },
  { href: '#',        label: 'VENUES'    }, // TODO: not in MVP scope
  { href: '#',        label: 'EDITORIAL' }, // TODO: not in MVP scope
];

export default function Nav({ onSearch }: NavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="dm-nav">
      <div className="dm-nav-inner">
        <Link href="/" className="dm-brand">
          DAUTON<span>/</span>MEDIA
        </Link>
        <nav className="dm-tabs">
          {TABS.map((t) => (
            <Link
              key={t.label}
              href={t.href}
              className={'dm-tab ' + (isActive(t.href) ? 'is-active' : '')}
            >
              {t.label}
            </Link>
          ))}
        </nav>
        <button className="dm-search-trigger" onClick={onSearch}>
          <span className="dm-search-label">Search artist, release, producer, city…</span>
          <span className="dm-kbd">⌘K</span>
        </button>
        <div className="dm-nav-end">
          <Link href="/join" className="dm-chip">JOIN</Link>
        </div>
      </div>
    </header>
  );
}
