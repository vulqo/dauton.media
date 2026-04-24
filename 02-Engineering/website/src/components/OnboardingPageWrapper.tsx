'use client';

import { useRouter } from 'next/navigation';
import OnboardingPage from '@/components/OnboardingPage';

export default function OnboardingPageWrapper() {
  const router = useRouter();

  const go = (view: string) => {
    if (view === 'home') {
      router.push('/');
    } else {
      router.push('/' + view);
    }
  };

  return <OnboardingPage go={go} />;
}
