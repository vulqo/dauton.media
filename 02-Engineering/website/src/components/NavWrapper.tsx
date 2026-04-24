'use client';

import { useState, useEffect } from 'react';
import Nav from '@/components/Nav';
import CommandPalette from '@/components/CommandPalette';

export default function NavWrapper() {
  const [cmd, setCmd] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmd((c) => !c);
      }
      if (e.key === 'Escape') setCmd(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <Nav onSearch={() => setCmd(true)} />
      <CommandPalette open={cmd} onClose={() => setCmd(false)} />
    </>
  );
}
