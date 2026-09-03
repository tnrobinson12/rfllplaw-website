import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  insights,
  getInsight,
  categoryLabel,
  sortedInsights,
  type Block,
} from '@/content/insights';
import { getAttorney } from '@/content/attorneys';
import { getPractices } from '@/content/practices';
import { legal } from '@/content/site';

import { formatDate } from '@/lib/format';
import { pageMetadata, clampDescription } from '@/lib/seo';
import { articleSchema, breadcrumbSchema, type Crumb } from '@/lib/schema';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { InsightCard } from '@/components/InsightCard';
import { CtaBand } from '@/components/CtaBand';
import { PlaceholderText } from '@/components/Placeholder';
import { ArrowRight } from '@/components/Icons';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);

  if (!insight) {
    return pageMetadata({
      title: 'Insight Not Found',
      description: 'The requested article could not be found.',
      path: `/insights/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: insight.title.replace(/\[|\]/g, ''),
    description: clampDescription(insight.excerpt.replace(/\[|\]/g, ''), 250),
    path: `/insights/${insight.slug}`,
    type: 'article',
    publishedTime: insight.date,
  });
}

function RenderBlock({ block }: { block: Block }) {
  if (block.type === 'h2') return <h2>{block.text}</h2>;
  if (block.type === 'ul') {
    return (
      <ul>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  return (
    <p>
      <PlaceholderText text={block.text} />
    </p>
  );
}

export default async function InsightPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const insight = getInsight(slug);

  if (!insight) notFound();

  const authorNames = insight.authors
    .map((s) => getAttorney(s)?.name)
    .filter((n): n is string => Boolean(n));

  const relatedPractices = getPractices(insight.practices);

  const more = sortedInsights()
    .filter((item) => item.slug !== insight.slug)
    .slice(0, 3);

  const cleanTitle = insight.title.replace(/\[|\]/g, '');

  const crumbs: Crumb[] = [
    { name: 'Home', href: '/' },
    { name: 'Insights', href: '/insights' },
    { name: cleanTitle, href: `/insights/${insight.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          articleSchema(insight, authorNames.map((n) => n.replace(/\[|\]/g, ''))),
        ]}
      />

      <div className="container" style={{ paddingTop: 'var(--s-6)' }}>
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <article>
        <header className="section section--tight section--flush-bottom">
          <div className="container">
            <div className="article-head">
              <div className="article-meta">
                <span className="is-accent">{categoryLabel(insight.category)}</span>
                <time dateTime={insight.date}>{formatDate(insight.date)}</time>
                {insight.readingMinutes > 0 ? <span>{insight.readingMinutes} min read</span> : null}
              </div>

              <h1 className="h1">
                <PlaceholderText text={insight.title} />
              </h1>

              <p className="lede" style={{ marginTop: 'var(--s-6)' }}>
                <PlaceholderText text={insight.excerpt} />
              </p>

              <p className="muted" style={{ marginTop: 'var(--s-5)', fontSize: 'var(--t-small)' }}>
                {authorNames.length > 0 ? (
                  <>
                    By{' '}
                    {authorNames.map((name, index) => (
                      <span key={name}>
                        {index > 0 ? ', ' : ''}
                        <PlaceholderText text={name} />
                      </span>
                    ))}
                  </>
                ) : (
                  'Robinson Franzman LLP'
                )}
              </p>
            </div>
          </div>
        </header>

        <div className="section section--tight">
          <div className="container">
            <div className="article-body">
              {insight.body.map((block, index) => (
                <RenderBlock block={block} key={index} />
              ))}
            </div>

            {/* The firm's standing informational notice, drawn from the same
                constant used on /attorney-advertising and in the footer so the
                language stays consistent wherever it appears. */}
            <p
              className="muted"
              style={{
                marginTop: 'var(--s-8)',
                paddingTop: 'var(--s-5)',
                borderTop: '1px solid var(--rule)',
                maxWidth: 'var(--measure)',
                fontSize: 'var(--t-micro)',
                lineHeight: 1.6,
              }}
            >
              {legal.attorneyAdvertising}
            </p>

            {relatedPractices.length > 0 ? (
              <div style={{ marginTop: 'var(--s-9)', maxWidth: 'var(--measure)' }}>
                <p className="eyebrow" style={{ marginBottom: 'var(--s-4)' }}>
                  Related Practices
                </p>
                <ul className="filters">
                  {relatedPractices.map((practice) => (
                    <li key={practice.slug}>
                      <Link href={`/practices/${practice.slug}`} className="filter-chip">
                        {practice.shortName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <p style={{ marginTop: 'var(--s-8)' }}>
              <Link href="/insights" className="link">
                <span>All Insights</span>
                <ArrowRight className="link__arrow" />
              </Link>
            </p>
          </div>
        </div>
      </article>

      {more.length > 0 ? (
        <section className="section section--alt section--rule" aria-labelledby="more-title">
          <div className="container">
            <h2 className="h2" id="more-title">
              More from the firm
            </h2>
            <ul className="card-grid card-grid--3">
              {more.map((item) => (
                <li key={item.slug}>
                  <InsightCard insight={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand
        title="Discuss how this applies to your matter."
        text="General commentary is not legal advice. Contact the firm to discuss a specific transaction or dispute."
        secondary={{ label: 'All Insights', href: '/insights' }}
      />
    </>
  );
}
