import type { Metadata } from 'next';
import Link from 'next/link';

import { office, site } from '@/content/site';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, type Crumb } from '@/lib/schema';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { PlaceholderNote, PlaceholderText } from '@/components/Placeholder';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Privacy Policy', href: '/privacy' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description: `How ${site.name} collects, uses and protects information submitted through ${site.domain}.`,
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs crumbs={crumbs} className="page-hero__crumbs" />
          <span className="eyebrow page-hero__eyebrow">Legal</span>
          <h1 className="page-hero__title">Privacy Policy</h1>
          <p className="page-hero__lede">
            How the firm handles information submitted through {site.domain}.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div style={{ marginBottom: 'var(--s-8)', maxWidth: 'var(--measure-wide)' }}>
            <PlaceholderNote label="Review required">
              This policy is a starting draft. It must be reviewed and approved by the firm before
              launch, and updated to reflect the analytics, hosting, email and form-handling
              services actually in use, and any state privacy law obligations that apply.
            </PlaceholderNote>
          </div>

          <div className="legal-body">
            <h2>Scope</h2>
            <p>
              This policy describes how {site.name} (&ldquo;the firm&rdquo;) collects and uses
              information in connection with {site.domain}. It does not apply to information the
              firm receives in the course of representing a client, which is governed by the
              applicable rules of professional conduct and the firm&rsquo;s engagement terms.
            </p>

            <h2>Information we collect</h2>
            <ul>
              <li>
                <strong>Information you provide.</strong> Name, email address, telephone number,
                organization and message content submitted through the contact form or sent by
                email.
              </li>
              <li>
                <strong>Technical information.</strong> Standard server and analytics data such as
                IP address, browser type, referring page, pages viewed and time of access.
              </li>
              <li>
                <strong>Cookies.</strong> Cookies and similar technologies used to operate the site
                and, if enabled, to measure aggregate usage. You can disable cookies in your browser
                settings; parts of the site may not function as intended.
              </li>
            </ul>

            <h2>How we use information</h2>
            <ul>
              <li>To respond to inquiries and evaluate potential engagements.</li>
              <li>To operate, secure and improve the website.</li>
              <li>To send communications you have requested.</li>
              <li>To comply with legal and professional obligations.</li>
            </ul>

            <h2>Disclosure</h2>
            <p>
              The firm does not sell personal information. Information may be shared with service
              providers that host the website, deliver email or process form submissions on the
              firm&rsquo;s behalf, and may be disclosed where required by law or to protect the
              firm&rsquo;s rights.
            </p>

            <h2>No attorney-client relationship</h2>
            <p>
              Submitting information through this website does not create an attorney-client
              relationship and does not make the information confidential or privileged. Please do
              not send confidential or sensitive information until an attorney-client relationship
              has been established in writing. See the{' '}
              <Link href="/disclaimer">disclaimer</Link>.
            </p>

            <h2>Retention and security</h2>
            <p>
              The firm retains inquiry information for as long as reasonably necessary for the
              purposes described above and applies reasonable administrative and technical
              safeguards. No method of transmission or storage is completely secure.
            </p>

            <h2>Your choices</h2>
            <p>
              You may request access to, correction of, or deletion of information you have
              submitted, subject to the firm&rsquo;s legal and professional obligations. Depending on
              your state of residence, additional rights may apply.{' '}
              <span className="placeholder">
                Confirm which state privacy laws apply to the firm and expand this section
                accordingly.
              </span>
            </p>

            <h2>Third-party links</h2>
            <p>
              This site may link to third-party websites. The firm is not responsible for the
              privacy practices or content of those sites.
            </p>

            <h2>Changes</h2>
            <p>
              This policy may be updated from time to time. The effective date will be revised when
              changes are made.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy may be directed to{' '}
              <a href={office.emailHref}>
                <PlaceholderText text={office.email} />
              </a>{' '}
              or to the firm&rsquo;s {office.label} office.
            </p>

            <p className="muted" style={{ marginTop: 'var(--s-7)', fontSize: 'var(--t-micro)' }}>
              Effective date: <span className="placeholder">To be set at launch</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
