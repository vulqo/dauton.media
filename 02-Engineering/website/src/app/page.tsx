'use client';
import { useState, useEffect, useCallback } from 'react';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CommandPalette from '@/components/CommandPalette';
import HomePage from '@/components/HomePage';
import ArtistPage from '@/components/ArtistPage';
import ReleasePage from '@/components/ReleasePage';
import ArticlePage from '@/components/ArticlePage';
import CityPage from '@/components/CityPage';
import EventPage from '@/components/EventPage';
import VenuePage from '@/components/VenuePage';
import VenuesListing from '@/components/VenuesListing';
import EraPage from '@/components/EraPage';
import ProfilePage from '@/components/ProfilePage';
import OnboardingPage from '@/components/OnboardingPage';

const STORAGE_KEY = 'dm-view';

export default function DautonMedia() {
  const [view, setViewRaw] = useState<string>('home');
  const [cmd, setCmd] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setViewRaw(saved);
    } catch {}
  }, []);

  const setView = useCallback((v: string) => {
    setViewRaw(v);
    try { localStorage.setItem(STORAGE_KEY, v); } catch {}
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmd(c => !c);
      }
      if (e.key === 'Escape') setCmd(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const go = (v: string) => setView(v);

  const [viewName, viewSlug] = view.split(':');

  const page = (() => {
    switch (viewName) {
      case 'home':      return <HomePage go={go} />;
      case 'artist':    return <ArtistPage go={go} slug={viewSlug} />;
      case 'release':   return <ReleasePage go={go} />;
      case 'article':   return <ArticlePage go={go} />;
      case 'city':      return <CityPage go={go} slug={viewSlug} />;
      case 'event':     return <EventPage go={go} />;
      case 'venue':     return <VenuePage go={go} />;
      case 'venues':    return <VenuesListing go={go} />;
      case 'era':       return <EraPage go={go} />;
      case 'profile':   return <ProfilePage go={go} />;
      case 'join':      return <OnboardingPage go={go} />;
      default:          return <HomePage go={go} />;
    }
  })();

  return (
    <>
      <Nav view={view} setView={setView} onSearch={() => setCmd(true)} />
      {page}
      <Footer />
      <CommandPalette open={cmd} onClose={() => setCmd(false)} go={go} />
    </>
  );
}
