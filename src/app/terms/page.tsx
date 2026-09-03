import type { Metadata } from 'next';
import Link from 'next/link';

import { site } from '@/content/site';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, type Crumb } from '@/lib/schema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { PlaceholderNote } from '@/components/Placeholder';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Terms of Use', href: '/terms' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Use',
  description: `Terms governing use of ${site.domain}, the website of ${site.name}.`,
  path: '/terms',
});

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs crumbs={crumbs} className="page-hero__crumbs" />
          <span className="eyebrow page-hero__eyebrow">Legal</span>
          <h1 className="page-hero__title">Terms of Use</h1>
          <p className="page-hero__lede">
            The terms that govern your use of {site.domain}.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 'var(--s-8)', maxWidth: 'var(--measure-wide)' }}>
            <PlaceholderNote label="Review required">
              These terms are a starting draft and must be reviewed and approved by the firm before
              launch.
            </PlaceholderNote>
          </div>

          <div className="legal-body">
            <h2>Acceptance</h2>
            <p>
              By accessing {site.domain} you agree to these terms. If you do not agree, please do
              not use the site.
            </p>

            <h2>Informational purpose</h2>
            <p>
              The content of this website is provided for general informational purposes only and is
              not legal advice. See the <Link href="/disclaimer">disclaimer</Link>.
            </p>

            <h2>Intellectual property</h2>
            <p>
              The text, design, graphics and other content of this website are the property of{' '}
              {site.name} or its licensors and are protected by applicable intellectual property
              laws. You may view and print pages for your own personal, non-commercial use. Any
              other reproduction, distribution or modification requires the firm&rsquo;s prior
              written consent.
            </p>

            <h2>Acceptable use</h2>
            <ul>
              <li>Do not use the site in any way that violates applicable law.</li>
              <li>
                Do not attempt to gain unauthorized access to the site, its servers or related
                systems.
              </li>
              <li>
                Do not use automated means to scrape, harvest or overload the site or to collect
                information about its users.
              </li>
            </ul>

            <h2>No warranties</h2>
            <p>
              This website is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
              basis. The firm makes no warranties, express or implied, regarding the accuracy,
              completeness, reliability or availability of the site or its content.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the fullest extent permitted by law, {site.name} will not be liable for any
              indirect, incidental, consequential or punitive damages arising from your use of, or
              inability to use, this website.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of the State of Georgia, without regard to its
              conflict of laws principles.
            </p>

            <h2>Changes</h2>
            <p>
              The firm may revise these terms at any time. Continued use of the site after a change
              constitutes acceptance of the revised terms.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
