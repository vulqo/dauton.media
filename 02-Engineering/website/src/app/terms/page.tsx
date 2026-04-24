import * as fs from 'fs';
import * as path from 'path';
import StaticPage from '@/components/StaticPage';

export const metadata = {
  title: 'Términos — Dauton Media',
  description: 'Términos de uso de Dauton Media.',
};

function readTerms(): string {
  try {
    const p = path.join(process.cwd(), '..', '..', '08-Legal-Compliance', 'terms-draft.md');
    return fs.readFileSync(p, 'utf-8');
  } catch {
    return 'Términos de uso en preparación.';
  }
}

export default function TermsRoute() {
  const content = readTerms();
  return <StaticPage title="Términos" kicker="TÉRMINOS" content={content} />;
}
