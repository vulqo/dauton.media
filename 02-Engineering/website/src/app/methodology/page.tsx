import StaticPage from '@/components/StaticPage';

export const metadata = {
  title: 'Metodología — Dauton Media',
  description: 'Cómo construimos el archivo Dauton Media.',
};

const CONTENT =
  'Documentamos el rap hispanohablante con enfoque venezolano. Cada dato proviene de fuentes verificables. El archivo es editable por la comunidad con moderación editorial.';

export default function MethodologyRoute() {
  return <StaticPage title="Metodología" content={CONTENT} />;
}
