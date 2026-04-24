import UserListPage from '@/components/UserListPage';

export async function generateMetadata({ params }: { params: Promise<{ user: string; list: string }> }) {
  const { user, list } = await params;
  return {
    title: `${list} — @${user} — Dauton Media`,
    description: 'Lista pública en Dauton Media.',
  };
}

export default async function UserListRoute({
  params,
}: {
  params: Promise<{ user: string; list: string }>;
}) {
  await params;
  return <UserListPage list={null} items={[]} />;
}
