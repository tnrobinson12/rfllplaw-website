import type { Metadata } from 'next';

import { featuredMatters, featuredMattersByPrimaryPractice } from '@/content/matters';
import { practices, practiceName } from '@/content/practices';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, type Crumb } from '@/lib/schema';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { MatterList } from '@/components/MatterList';
import { CtaBand } from '@/components/CtaBand';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Selected Experience', href: '/experience' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Selected Experience',
  description:
    'Selected transactions, financings, investments and disputes handled by Robinson Franzman LLP, organized by practice.',
  path: '/experience',
});

export default function ExperiencePage() {
  /* Grouped by each matter's primary practice, so a matter that spans several
     practices is listed once rather than repeated under each heading. */
  const grouped = featuredMattersByPrimaryPractice(practices.map((p) => p.slug));
  const total = featuredMatters().length;

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs crumbs={crumbs} className="page-hero__crumbs" />
          <span className="eyebrow page-hero__eyebrow">Experience</span>
          <h1 className="page-hero__title">Selected experience.</h1>
          <p className="page-hero__lede">
            A selection of prior transactions, financings, investments and disputes, organized by
            practice. Matters are described in general terms and do not identify clients.
          </p>
        </div>
      </section>

      <section className="section" aria-label="Selected experience by practice">
        <div className="container">
          {grouped.map((group, index) => (
            <Reveal key={group.slug} delay={index === 0 ? 0 : 60}>
              <section
                aria-labelledby={`matters-${group.slug}`}
                style={{ marginTop: index === 0 ? 0 : 'var(--s-10)' }}
              >
                <div className="section-head" style={{ paddingBottom: 'var(--s-5)' }}>
                  <div className="section-head__aside">
                    <span className="eyebrow">Practice</span>
                  </div>
                  <div>
                    <h2 className="section-head__title" id={`matters-${group.slug}`}>
                      {practiceName(group.slug)}
                    </h2>
                  </div>
                </div>
                <div style={{ marginTop: 'var(--s-5)' }}>
                  <MatterList matters={group.items} />
                </div>
              </section>
            </Reveal>
          ))}

          <p className="muted" style={{ marginTop: 'var(--s-9)', fontSize: 'var(--t-small)' }}>
            {total} selected matters listed. These are prior matters and are not a complete list of
            the firm&rsquo;s engagements. Prior results do not guarantee a similar outcome.
          </p>
        </div>
      </section>

      <CtaBand
        title="Have a matter like one of these?"
        text="Describe it in general terms and we will tell you promptly whether the firm is the right fit."
        secondary={{ label: 'Browse Practices', href: '/practices' }}
      />
    </>
  );
}
