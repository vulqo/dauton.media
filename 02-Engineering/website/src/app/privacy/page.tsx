import * as fs from 'fs';
import * as path from 'path';
import StaticPage from '@/components/StaticPage';

export const metadata = {
  title: 'Privacidad — Dauton Media',
  description: 'Política de privacidad de Dauton Media.',
};

function readPrivacy(): string {
  try {
    const p = path.join(process.cwd(), '..', '..', '08-Legal-Compliance', 'privacy-policy-draft.md');
    return fs.readFileSync(p, 'utf-8');
  } catch {
    return 'Política de privacidad en preparación.';
  }
}

export default function PrivacyRoute() {
  const content = readPrivacy();
  return <StaticPage title="Privacidad" kicker="PRIVACIDAD" content={content} />;
}
