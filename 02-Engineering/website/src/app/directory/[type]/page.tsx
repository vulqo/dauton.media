import DirectoryPage from '@/components/DirectoryPage';

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  return { title: `Directorio · ${type} — Dauton Media`, description: 'Dauton Media directory.' };
}

export default async function DirRoute({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  return <DirectoryPage entities={[]} entityType={type} />;
}
