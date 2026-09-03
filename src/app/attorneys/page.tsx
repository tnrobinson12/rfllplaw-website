import type { Metadata } from 'next';

import { sortedAttorneys, legalProfessionals, staff } from '@/content/attorneys';
import { practices } from '@/content/practices';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, attorneyDirectorySchema, type Crumb } from '@/lib/schema';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { AttorneyDirectory } from '@/components/AttorneyDirectory';
import { CtaBand } from '@/components/CtaBand';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Attorneys', href: '/attorneys' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Attorneys',
  description:
    'The attorneys, legal professionals and staff of Robinson Franzman LLP, a business law firm in Atlanta, Georgia.',
  path: '/attorneys',
});

export default function AttorneysPage() {
  const list = sortedAttorneys();

  return (
    <>
      {/* Structured data covers the firm's attorneys only — real names, titles
          and profile URLs. No credentials or practice claims are asserted. */}
      <JsonLd data={[breadcrumbSchema(crumbs), attorneyDirectorySchema(list)]} />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs crumbs={crumbs} className="page-hero__crumbs" />
          <span className="eyebrow page-hero__eyebrow">Attorneys</span>
          <h1 className="page-hero__title">The attorneys of Robinson Franzman.</h1>
          <p className="page-hero__lede">
            A partner is involved in every matter. The attorney who negotiates a document is the
            attorney who drafted it.
          </p>
        </div>
      </section>

      <section className="section" aria-label="Firm directory">
        <div className="container">
          <AttorneyDirectory
            attorneys={list}
            legalProfessionals={legalProfessionals}
            staff={staff}
            practices={practices}
          />
        </div>
      </section>

      <CtaBand
        title="Looking for the right attorney for a specific matter?"
        text="Tell us about the transaction or dispute in general terms and we will direct your inquiry to the attorney who handles that work."
        secondary={{ label: 'Browse Practices', href: '/practices' }}
      />
    </>
  );
}
