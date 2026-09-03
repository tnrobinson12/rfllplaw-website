import type { Metadata } from 'next';
import Link from 'next/link';

import { site, office } from '@/content/site';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, type Crumb } from '@/lib/schema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { PlaceholderText } from '@/components/Placeholder';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Attorney Advertising', href: '/attorney-advertising' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Attorney Advertising',
  description: `Attorney advertising notice for ${site.name}, ${office.city}, ${office.regionName}.`,
  path: '/attorney-advertising',
});

export default function AttorneyAdvertisingPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs crumbs={crumbs} className="page-hero__crumbs" />
          <span className="eyebrow page-hero__eyebrow">Legal</span>
          <h1 className="page-hero__title">Attorney Advertising</h1>
          <p className="page-hero__lede">
            This website may be considered attorney advertising in some jurisdictions.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="legal-body">
            <h2>Notice</h2>
            <p>
              This website is maintained by {site.name}. In some jurisdictions the contents of this
              website may be considered attorney advertising. The information presented here should
              not be construed to be formal legal advice, nor the formation of a lawyer-client
              relationship.
            </p>

            <h2>Prior results</h2>
            <p>
              Prior results described on this website do not guarantee a similar outcome. The
              outcome of any matter depends on its specific facts, the applicable law and other
              circumstances that vary from matter to matter.
            </p>

            <h2>Responsible attorney</h2>
            <p>
              Todd Robinson
              <br />
              Managing Partner
              <br />
              {site.name}
              <br />
              <PlaceholderText text={office.streetAddress} />
              <br />
              <PlaceholderText text={office.suite} />
              <br />
              {office.city}, {office.region} <PlaceholderText text={office.postalCode} />
            </p>

            <h2>No guarantee</h2>
            <p>
              Nothing on this website constitutes a guarantee, warranty or prediction regarding the
              result of any legal matter.
            </p>

            <h2>Related notices</h2>
            <p>
              See also the firm&rsquo;s <Link href="/disclaimer">disclaimer</Link>,{' '}
              <Link href="/privacy">privacy policy</Link> and{' '}
              <Link href="/terms">terms of use</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
