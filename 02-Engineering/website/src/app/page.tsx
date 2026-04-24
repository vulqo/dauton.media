import { getPeople } from '@/lib/queries/people';
import HomePage from '@/components/HomePage';

export default async function Home() {
  const people = await getPeople({ limit: 15 });
  return <HomePage people={people} />;
}
