import LabelProfile from '@/components/LabelProfile';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: `${slug} — Dauton Media`, description: 'Dauton Media archive entry.' };
}

export default async function LabelRoute({ params }: { params: Promise<{ slug: string }> }) {
  await params;
  return <LabelProfile label={null} />;
}
