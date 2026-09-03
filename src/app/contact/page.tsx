import type { Metadata } from 'next';
import Link from 'next/link';

import { office, legal, social } from '@/content/site';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, type Crumb } from '@/lib/schema';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { ContactForm } from '@/components/ContactForm';
import { PlaceholderText, PlaceholderNote } from '@/components/Placeholder';
import { LinkedInIcon } from '@/components/Icons';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'Contact', href: '/contact' },
];

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Contact Robinson Franzman LLP in Atlanta, Georgia. Send a general inquiry about a commercial real estate, finance, private capital, corporate or litigation matter.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      {/* The Organization / LegalService node is emitted once in the root layout. */}
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs crumbs={crumbs} className="page-hero__crumbs" />
          <span className="eyebrow page-hero__eyebrow">Contact</span>
          <h1 className="page-hero__title">Start a conversation.</h1>
          <p className="page-hero__lede">
            Tell us about the transaction or the dispute in general terms. We respond quickly, and
            we are direct about whether the firm is the right fit for a matter.
          </p>
        </div>
      </section>

      <section className="section" aria-label="Contact the firm">
        <div className="container">
          <div className="contact-grid">
            {/* --------------------------------------------- Office details */}
            <Reveal>
              <h2 className="h2" style={{ maxWidth: '14ch' }}>
                {office.label} Office
              </h2>

              <dl className="office-detail" style={{ marginTop: 'var(--s-6)' }}>
                <div className="office-detail__row">
                  <dt>Address</dt>
                  <dd>
                    <address style={{ fontStyle: 'normal' }}>
                      <PlaceholderText text={office.streetAddress} />
                      <br />
                      <PlaceholderText text={office.suite} />
                      <br />
                      {office.city}, {office.region} <PlaceholderText text={office.postalCode} />
                    </address>
                  </dd>
                </div>

                <div className="office-detail__row">
                  <dt>Phone</dt>
                  <dd>
                    <a href={office.phoneHref} className="link-underline">
                      <PlaceholderText text={office.phone} />
                    </a>
                  </dd>
                </div>

                {office.fax ? (
                  <div className="office-detail__row">
                    <dt>Fax</dt>
                    <dd>
                      <PlaceholderText text={office.fax} />
                    </dd>
                  </div>
                ) : null}

                <div className="office-detail__row">
                  <dt>Email</dt>
                  <dd>
                    <a href={office.emailHref} className="link-underline">
                      <PlaceholderText text={office.email} />
                    </a>
                  </dd>
                </div>

                {office.hours ? (
                  <div className="office-detail__row">
                    <dt>Hours</dt>
                    <dd>{office.hours}</dd>
                  </div>
                ) : null}

                <div className="office-detail__row">
                  <dt>Follow</dt>
                  <dd>
                    <a
                      href={social.linkedin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                      style={{ color: 'var(--ink)' }}
                    >
                      <LinkedInIcon />
                      <span>LinkedIn</span>
                    </a>
                    {social.linkedin.isPlaceholder ? (
                      <>
                        {' '}
                        <span className="placeholder">Add firm LinkedIn URL</span>
                      </>
                    ) : null}
                  </dd>
                </div>
              </dl>

              {/* ------------------------------------------------------ Map
                  Rendered only when the firm has supplied an embed URL. Without
                  one the "Get directions" link below stands on its own rather
                  than an empty frame. */}
              {office.mapEmbedUrl ? (
                <div className="map-frame" style={{ marginTop: 'var(--s-7)' }}>
                  <iframe
                    src={office.mapEmbedUrl}
                    title={`Map showing the ${office.label} office of Robinson Franzman LLP`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              ) : null}

              {office.mapLinkUrl ? (
                /* Tucked under the map when there is one, otherwise spaced off
                   the detail list the way the map frame was. */
                <p style={{ marginTop: office.mapEmbedUrl ? 'var(--s-4)' : 'var(--s-6)' }}>
                  <a
                    href={office.mapLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                    style={{ fontSize: 'var(--t-small)' }}
                  >
                    Get directions
                  </a>
                </p>
              ) : null}
            </Reveal>

            {/* ------------------------------------------------------- Form */}
            <Reveal delay={120}>
              <h2 className="h2" style={{ maxWidth: '16ch' }}>
                Send a general inquiry
              </h2>
              <p className="lede" style={{ marginTop: 'var(--s-5)', maxWidth: '44ch' }}>
                Fields marked with an asterisk are required.
              </p>

              <div style={{ marginTop: 'var(--s-7)' }}>
                <ContactForm />
              </div>

              <div style={{ marginTop: 'var(--s-8)' }}>
                <PlaceholderNote label="Important notice">
                  {legal.noRelationship} See the firm&rsquo;s{' '}
                  <Link href="/disclaimer" className="link-underline">
                    disclaimer
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="link-underline">
                    privacy policy
                  </Link>
                  .
                </PlaceholderNote>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
