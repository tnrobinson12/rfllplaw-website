import type { Metadata } from 'next';
import Link from 'next/link';

import { site, legal } from '@/content/site';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, type Crumb } from '@/lib/schema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { PlaceholderNote } from '@/components/Placeholder';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Disclaimer', href: '/disclaimer' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Disclaimer',
  description: `Legal notices and disclaimers for ${site.domain}, the website of ${site.name}.`,
  path: '/disclaimer',
});

export default function DisclaimerPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs crumbs={crumbs} className="page-hero__crumbs" />
          <span className="eyebrow page-hero__eyebrow">Legal</span>
          <h1 className="page-hero__title">Disclaimer</h1>
          <p className="page-hero__lede">
            Please read the following notices before using this website or contacting the firm.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 'var(--s-8)', maxWidth: 'var(--measure-wide)' }}>
            <PlaceholderNote label="Review required">
              These notices are a starting draft and must be reviewed and approved by the firm
              against the Georgia Rules of Professional Conduct and the rules of every other
              jurisdiction in which the firm&rsquo;s attorneys are admitted.
            </PlaceholderNote>
          </div>

          <div className="legal-body">
            <h2>No legal advice</h2>
            <p>
              The information on this website is provided for general informational purposes only.
              It is not legal advice, is not a substitute for legal advice from a qualified
              attorney, and should not be relied upon in connection with any particular
              circumstance. Law and market practice change; material on this site may not reflect
              current developments.
            </p>

            <h2>No attorney-client relationship</h2>
            <p>
              Visiting this website, reading its contents, submitting the contact form, or sending
              email to the firm or any of its attorneys does not create an attorney-client
              relationship. An attorney-client relationship with {site.name} is established only
              through a written engagement agreement signed by the firm.
            </p>

            <h2>Do not send confidential information</h2>
            <p>
              Because no attorney-client relationship exists until it has been established in
              writing, information you send through this website is not privileged or confidential,
              and the firm may already represent another party with interests adverse to yours.
              Please do not send confidential, sensitive or time-sensitive information through this
              website. See the <Link href="/privacy">privacy policy</Link>.
            </p>

            <h2>Prior results</h2>
            <p>
              Prior results do not guarantee or predict a similar outcome in any future matter. Every
              matter is different and depends on its own facts, applicable law and other
              circumstances.
            </p>

            <h2>Representative matters</h2>
            <p>
              Descriptions of representative matters are provided for informational purposes and are
              published only where the firm is permitted to describe them. They do not constitute a
              guarantee, warranty or prediction regarding the outcome of any matter.
            </p>

            <h2>Jurisdiction and admissions</h2>
            <p>
              The firm&rsquo;s attorneys are admitted to practice only in the jurisdictions
              identified on their individual profiles. Nothing on this website is an offer to
              represent you in a jurisdiction in which the responsible attorney is not admitted or
              otherwise authorized to practice.
            </p>

            <h2>Third-party content</h2>
            <p>
              Links to third-party websites are provided for convenience. The firm does not endorse
              and is not responsible for their content, accuracy or practices.
            </p>

            <h2>Attorney advertising</h2>
            <p>
              {legal.attorneyAdvertising} See the{' '}
              <Link href="/attorney-advertising">attorney advertising notice</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
