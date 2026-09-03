import type { Metadata } from 'next';
import { Suspense } from 'react';

import { pageMetadata } from '@/lib/seo';
import { SearchResults } from '@/components/SearchResults';

export const metadata: Metadata = pageMetadata({
  title: 'Search',
  description: 'Search the attorneys, practices and insights of Robinson Franzman LLP.',
  path: '/search',
  noIndex: true,
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow page-hero__eyebrow">Search</span>
          <h1 className="page-hero__title">Search the firm</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Suspense fallback={null}>
            <SearchResults initialQuery={q ?? ''} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
