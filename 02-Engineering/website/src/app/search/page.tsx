import SearchResultsPage from '@/components/SearchResultsPage';
import { globalSearch } from '@/lib/queries/search';

export const metadata = {
  title: 'Search — Dauton Media',
};

export default async function SearchRoute({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';
  const results = query.length >= 2 ? await globalSearch(query) : [];
  return <SearchResultsPage query={query} results={results} />;
}
