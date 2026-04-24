import CrewProfile from '@/components/CrewProfile';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: `${slug} — Dauton Media`, description: 'Dauton Media archive entry.' };
}

export default async function CrewRoute({ params }: { params: Promise<{ slug: string }> }) {
  await params;
  return <CrewProfile crew={null} />;
}
