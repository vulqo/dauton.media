import TrackPage from '@/components/TrackPage';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: `${slug} — Dauton Media`, description: 'Dauton Media archive entry.' };
}

export default async function TrackRoute({ params }: { params: Promise<{ slug: string }> }) {
  await params;
  return <TrackPage track={null} />;
}
