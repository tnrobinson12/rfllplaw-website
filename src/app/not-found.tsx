import Link from 'next/link';
import type { Metadata } from 'next';

import { practices } from '@/content/practices';
import { ArrowRight } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you requested could not be found.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="notfound">
      <div className="container">
        <span className="eyebrow">Error 404</span>
        <h1 className="display-3" style={{ marginTop: 'var(--s-5)', maxWidth: '16ch' }}>
          That page could not be found.
        </h1>
        <p className="lede" style={{ marginTop: 'var(--s-5)', maxWidth: '46ch' }}>
          The address may have changed, or the page may no longer exist. These are the places people
          usually want.
        </p>

        <div style={{ marginTop: 'var(--s-7)', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href="/" className="btn">
            Return Home
            <ArrowRight />
          </Link>
          <Link href="/contact" className="btn btn--outline">
            Contact the Firm
            <ArrowRight />
          </Link>
        </div>

        <div style={{ marginTop: 'var(--s-9)' }}>
          <p className="eyebrow" style={{ marginBottom: 'var(--s-4)' }}>
            Practices
          </p>
          <ul className="filters">
            {practices.map((practice) => (
              <li key={practice.slug}>
                <Link href={`/practices/${practice.slug}`} className="filter-chip">
                  {practice.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
