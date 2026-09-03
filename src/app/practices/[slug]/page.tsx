import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { practices, getPractice, getPractices } from '@/content/practices';
import { attorneysByPractice } from '@/content/attorneys';
import { practiceFeatureMatters } from '@/content/matters';
import { insightsByPractice } from '@/content/insights';

import { pageMetadata, clampDescription } from '@/lib/seo';
import { breadcrumbSchema, practiceSchema, type Crumb } from '@/lib/schema';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { Figure } from '@/components/Figure';
import { SectionHeading } from '@/components/SectionHeading';
import { MatterList } from '@/components/MatterList';
import { PersonCard } from '@/components/PersonCard';
import { InsightCard } from '@/components/InsightCard';
import { CtaBand } from '@/components/CtaBand';
import { ArrowRight } from '@/components/Icons';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return practices.map((practice) => ({ slug: practice.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const practice = getPractice(slug);

  if (!practice) {
    return pageMetadata({
      title: 'Practice Not Found',
      description: 'The requested practice page could not be found.',
      path: `/practices/${slug}`,
      noIndex: true,
    });
  }

  return pageMetadata({
    title: practice.metaTitle,
    description: clampDescription(practice.metaDescription, 250),
    path: `/practices/${practice.slug}`,
  });
}

export default async function PracticePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const practice = getPractice(slug);

  if (!practice) notFound();

  const related = getPractices(practice.related);
  const team = attorneysByPractice(practice.slug);
  const relatedMatters = practiceFeatureMatters(practice.slug);
  const relatedInsights = insightsByPractice(practice.slug, 3);

  const crumbs: Crumb[] = [
    { name: 'Home', href: '/' },
    { name: 'Practices', href: '/practices' },
    { name: practice.name, href: `/practices/${practice.slug}` },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), practiceSchema(practice)]} />

      {/* ------------------------------------------------------------- Hero */}
      <section className="page-hero page-hero--dark on-dark">
        <div className="page-hero__media" aria-hidden="true">
          <Figure artwork={practice.artwork} ratio="21-9" className="figure--ratio-21-9" />
        </div>
        <div className="container">
          <Breadcrumbs crumbs={crumbs} className="page-hero__crumbs" />
          <span className="eyebrow page-hero__eyebrow">Practice</span>
          <h1 className="page-hero__title">{practice.name}</h1>
          <p className="page-hero__lede">{practice.lede}</p>
        </div>
      </section>

      {/* --------------------------------------------------------- Overview */}
      <section className="section" aria-labelledby="overview-title">
        <div className="container">
          <div className="practice-overview">
            <Reveal>
              <h2 className="h2" id="overview-title" style={{ maxWidth: '20ch' }}>
                Overview
              </h2>
              <div className="prose prose--wide" style={{ marginTop: 'var(--s-6)' }}>
                {practice.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="panel" style={{ marginTop: 'var(--s-8)' }}>
                <p className="panel__text">{practice.panel}</p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="sidebar-card">
                <h3>Related Practices</h3>
                <ul>
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/practices/${item.slug}`}>
                        {item.name}
                        <span aria-hidden="true">
                          <ArrowRight size={14} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {team.length > 0 ? (
                <div className="sidebar-card" style={{ marginTop: 'var(--s-8)' }}>
                  <h3>Attorneys in this Practice</h3>
                  <ul>
                    {team.map((attorney) => (
                      <li key={attorney.slug}>
                        <Link href={`/attorneys/${attorney.slug}`}>
                          {attorney.name}
                          <span aria-hidden="true">
                            <ArrowRight size={14} />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="sidebar-card" style={{ marginTop: 'var(--s-8)' }}>
                <h3>Start a Conversation</h3>
                <p
                  className="prose"
                  style={{ marginTop: 'var(--s-4)', fontSize: 'var(--t-small)' }}
                >
                  Describe the matter in general terms and we will tell you promptly whether the
                  firm is the right fit.
                </p>
                <p style={{ marginTop: 'var(--s-5)' }}>
                  <Link href="/contact" className="btn btn--outline">
                    Contact the Firm
                    <ArrowRight />
                  </Link>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- Capabilities */}
      <section className="section section--alt section--rule" aria-labelledby="capabilities-title">
        <div className="container">
          <SectionHeading
            eyebrow="Capabilities"
            title={`What we handle in ${practice.shortName}`}
            intro="Grouped by workstream. Most engagements draw on several of these at once."
            id="capabilities-title"
          />

          <div className="capability-groups" style={{ marginTop: 'var(--s-8)' }}>
            {practice.capabilities.map((group, index) => (
              <Reveal key={group.title} delay={(index % 3) * 80}>
                <div className="capability-group">
                  <h3 className="capability-group__title">{group.title}</h3>
                  <ul className="capability-group__list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------ Representative matters */}
      {relatedMatters.length > 0 ? (
        <section className="section" aria-labelledby="matters-title">
          <div className="container">
            <SectionHeading
              eyebrow="Selected Experience"
              title={`Selected ${practice.shortName} matters`}
              intro="Prior matters, described in general terms and without identifying clients."
              cta={{ label: 'All Selected Experience', href: '/experience' }}
              id="matters-title"
            />

            {/* A historical, year-stated volume figure. Rendered only for the
                practice the firm supplied one for. */}
            {practice.experienceNote ? (
              <p
                className="lede"
                style={{ marginTop: 'var(--s-6)', maxWidth: '62ch' }}
              >
                {practice.experienceNote}
              </p>
            ) : null}

            <div style={{ marginTop: 'var(--s-7)' }}>
              <MatterList matters={relatedMatters} />
            </div>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------------------ Team */}
      {team.length > 0 ? (
        <section className="section section--alt" aria-labelledby="team-title">
          <div className="container">
            <SectionHeading
              eyebrow="Attorneys"
              title={`${practice.shortName} team`}
              cta={{ label: 'All Attorneys', href: '/attorneys' }}
              id="team-title"
            />
            <ul className="card-grid card-grid--4">
              {team.map((attorney, index) => (
                <li key={attorney.slug}>
                  <Reveal delay={(index % 4) * 80}>
                    <PersonCard person={attorney} href={`/attorneys/${attorney.slug}`} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* -------------------------------------------------------- Insights */}
      {relatedInsights.length > 0 ? (
        <section className="section" aria-labelledby="practice-insights-title">
          <div className="container">
            <SectionHeading
              eyebrow="Insights"
              title={`Writing on ${practice.shortName}`}
              cta={{ label: 'All Insights', href: '/insights' }}
              id="practice-insights-title"
            />
            <ul className="card-grid card-grid--3">
              {relatedInsights.map((insight, index) => (
                <li key={insight.slug}>
                  <Reveal delay={(index % 3) * 80}>
                    <InsightCard insight={insight} />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ------------------------------------------------ Related practices */}
      <section className="section section--dark" aria-labelledby="related-title">
        <div className="container">
          <SectionHeading
            eyebrow="Related"
            title="Practices that usually travel with this one"
            intro="Matters rarely stay inside a single practice. These are the groups most often engaged alongside it."
            id="related-title"
          />

          <div className="related-grid" style={{ marginTop: 'var(--s-7)' }}>
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 80}>
                <article className="related-item">
                  <h3 className="related-item__title">
                    <Link href={`/practices/${item.slug}`} className="card-link">
                      {item.name}
                    </Link>
                  </h3>
                  <p className="related-item__desc">{item.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`Discuss a ${practice.shortName.toLowerCase()} matter.`}
        text="Please describe the matter in general terms only. Do not send confidential information until an attorney-client relationship has been established in writing."
        secondary={{ label: 'All Practices', href: '/practices' }}
      />
    </>
  );
}
