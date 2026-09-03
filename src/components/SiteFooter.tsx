import Image from 'next/image';
import Link from 'next/link';
import { footerNav, legal, logo, office, site, social } from '@/content/site';
import { ArrowRight, LinkedInIcon } from '@/components/Icons';
import { PlaceholderText } from '@/components/Placeholder';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          <div>
            {/* Knockout lockup — the footer sits on --surface-dark. */}
            <Link href="/" className="footer-logo" aria-label={`${site.name} — home`}>
              <Image
                src={logo.reversed}
                alt={site.name}
                width={logo.width}
                height={logo.height}
              />
            </Link>
            <p className="footer-statement">
              Counsel for complex transactions, investments and disputes.
            </p>
            <div className="footer-cta">
              <Link href="/contact" className="btn btn--light">
                Contact the Firm
                <ArrowRight />
              </Link>
            </div>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            {footerNav.map((group) => (
              <div key={group.heading}>
                <h2 className="footer-nav__heading">{group.heading}</h2>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer-office">
          <div className="footer-office__block">
            <h3>{office.label} Office</h3>
            <address style={{ fontStyle: 'normal' }}>
              <PlaceholderText text={office.streetAddress} />
              <br />
              <PlaceholderText text={office.suite} />
              <br />
              {office.city}, {office.region} <PlaceholderText text={office.postalCode} />
            </address>
          </div>

          <div className="footer-office__block">
            <h3>Contact</h3>
            <p>
              <a href={office.phoneHref}>
                <PlaceholderText text={office.phone} />
              </a>
              <br />
              <a href={office.emailHref}>
                <PlaceholderText text={office.email} />
              </a>
            </p>
          </div>

          <div className="footer-office__block">
            <h3>Follow</h3>
            <p>
              <a
                className="social-link"
                href={social.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
                <span>LinkedIn</span>
              </a>
              {social.linkedin.isPlaceholder ? (
                <>
                  <br />
                  <span className="placeholder">Add firm LinkedIn URL</span>
                </>
              ) : null}
            </p>
          </div>
        </div>

        <p className="footer-disclaimer">{legal.footerDisclaimer}</p>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {year} {legal.copyrightHolder}. All rights reserved.
          </p>
          <nav className="footer-legal-nav" aria-label="Legal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
            <Link href="/attorney-advertising">Attorney Advertising</Link>
            <Link href="/terms">Terms of Use</Link>
            {/* Generated route — plain anchor so the browser fetches the XML directly. */}
            <a href="/sitemap.xml">Sitemap</a>
          </nav>
        </div>

        <p className="footer-copyright" style={{ paddingTop: '1rem', opacity: 0.62 }}>
          {site.domain}
        </p>
      </div>
    </footer>
  );
}
