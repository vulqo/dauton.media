import CompareView from '@/components/CompareView';

export const metadata = {
  title: 'Compare — Dauton Media',
  description: 'Compara entidades del archivo Dauton Media.',
};

export default function CompareRoute() {
  return <CompareView entities={[]} />;
}
