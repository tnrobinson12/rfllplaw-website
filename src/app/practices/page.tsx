import type { Metadata } from 'next';
import Link from 'next/link';

import { practices } from '@/content/practices';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, type Crumb } from '@/lib/schema';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { PracticeCard } from '@/components/PracticeCard';
import { CtaBand } from '@/components/CtaBand';
import { ArrowRight } from '@/components/Icons';
import { pad } from '@/lib/format';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Practices', href: '/practices' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Practices',
  description:
    'Six practice groups covering commercial real estate, lending and finance, securities and private capital, corporate and business transactions, commercial litigation, and creditors’ rights and special situations.',
  path: '/practices',
});

export default function PracticesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs crumbs={crumbs} className="page-hero__crumbs" />
          <span className="eyebrow page-hero__eyebrow">Practices</span>
          <h1 className="page-hero__title">
            Six practices, organized around how our clients transact.
          </h1>
          <p className="page-hero__lede">
            Each group stands on its own. Together they cover the arc of a commercial matter — the
            entity that holds an asset, the capital that funds it, the transaction that transfers
            it, and the enforcement or litigation that follows if something goes wrong.
          </p>
        </div>
      </section>

      <section className="section" aria-label="Practice groups">
        <div className="container">
          <div className="practice-grid">
            {practices.map((practice, index) => (
              <Reveal key={practice.slug} delay={(index % 3) * 90}>
                <PracticeCard practice={practice} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt section--rule" aria-labelledby="index-title">
        <div className="container">
          <h2 className="h2" id="index-title" style={{ maxWidth: '20ch' }}>
            A full index of capabilities.
          </h2>
          <p className="lede" style={{ marginTop: '1.25rem', maxWidth: '52ch' }}>
            Every capability the firm handles, grouped by practice. Select a practice for the full
            treatment.
          </p>

          <ul className="rule-list" style={{ marginTop: 'var(--s-8)' }}>
            {practices.map((practice, index) => (
              <li className="row-item" key={practice.slug}>
                <Link href={`/practices/${practice.slug}`} className="row-item__link">
                  <div className="row-item__meta">
                    <span className="is-accent">{pad(index + 1)}</span>
                  </div>
                  <div>
                    <h3 className="row-item__title">{practice.name}</h3>
                    <p className="row-item__excerpt">
                      {practice.capabilities.map((group) => group.title).join(' · ')}
                    </p>
                  </div>
                  <span className="row-item__arrow" aria-hidden="true">
                    <ArrowRight size={18} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title="Not sure which practice fits your matter?"
        text="Most of our engagements touch more than one. Describe the situation in general terms and we will tell you whether the firm is the right fit."
        secondary={{ label: 'Meet the Attorneys', href: '/attorneys' }}
      />
    </>
  );
}
