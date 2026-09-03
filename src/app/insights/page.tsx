import type { Metadata } from 'next';
import { Suspense } from 'react';

import { sortedInsights, categories } from '@/content/insights';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, type Crumb } from '@/lib/schema';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { InsightsIndex } from '@/components/InsightsIndex';
import { CtaBand } from '@/components/CtaBand';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Insights', href: '/insights' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Insights',
  description:
    'Legal updates, articles, firm news, deal announcements and speaking engagements from Robinson Franzman LLP on commercial real estate, finance, private capital and commercial disputes.',
  path: '/insights',
});

export default async function InsightsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const items = sortedInsights();
  const initialCategory =
    category && categories.some((c) => c.slug === category) ? category : 'all';

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs crumbs={crumbs} className="page-hero__crumbs" />
          <span className="eyebrow page-hero__eyebrow">Insights</span>
          <h1 className="page-hero__title">Commentary on the structures we work in.</h1>
          <p className="page-hero__lede">
            Practical writing on financing structures, offering documents, ownership agreements and
            enforcement — written for the people who negotiate these terms rather than for other
            lawyers.
          </p>
        </div>
      </section>

      <section className="section" aria-label="Insights index">
        <div className="container">
          <Suspense fallback={null}>
            <InsightsIndex
              insights={items}
              categories={categories}
              initialCategory={initialCategory}
            />
          </Suspense>
        </div>
      </section>

      <CtaBand
        title="Questions about how a structure applies to your transaction?"
        text="General commentary is no substitute for advice on a specific matter. Contact the firm to discuss yours."
        secondary={{ label: 'Browse Practices', href: '/practices' }}
      />
    </>
  );
}
