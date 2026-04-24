import { notFound } from 'next/navigation';
import { getPersonBySlug } from '@/lib/queries/people';
import ArtistPage from '@/components/ArtistPage';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = await getPersonBySlug(slug);
  if (!person) return {};
  return {
    title: `${person.stage_name} — Dauton Media`,
    description: person.bio_short ?? undefined,
  };
}

export default async function ArtistRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const person = await getPersonBySlug(slug);
  if (!person) notFound();
  const cityData = Array.isArray(person.cities) ? person.cities[0] : person.cities;
  return (
    <ArtistPage
      person={{
        id: person.id,
        slug: person.slug,
        stage_name: person.stage_name,
        bio_short: person.bio_short,
        bio_long: person.bio_long,
        status: person.status,
        verified: person.verified,
        is_venezuelan: person.is_venezuelan,
        active_since: person.active_since,
        origin_city_id: person.origin_city_id,
        cities: cityData ?? null,
      }}
    />
  );
}
