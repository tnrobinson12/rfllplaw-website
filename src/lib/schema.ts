/* --------------------------------------------------------------------------
   JSON-LD structured data builders.

   Kept in one place so the shape of every entity stays consistent and so
   placeholder values (bracketed) never leak into schema output — see
   `stripPlaceholder`, which omits any field still awaiting confirmation.
   -------------------------------------------------------------------------- */

import { site, office, social, logo } from '@/content/site';
import { absoluteUrl } from '@/lib/seo';
import type { Attorney } from '@/content/attorneys';
import type { Practice } from '@/content/practices';
import type { Insight } from '@/content/insights';

/** Returns undefined for values that are still placeholders, so they are omitted. */
function real(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (trimmed.startsWith('[') || trimmed.includes('[')) return undefined;
  return trimmed;
}

const postalAddress = () => {
  const address: Record<string, string> = {
    '@type': 'PostalAddress',
    addressLocality: office.city,
    addressRegion: office.region,
    addressCountry: office.country,
  };
  const street = real(office.streetAddress);
  const zip = real(office.postalCode);
  if (street) address.streetAddress = street;
  if (zip) address.postalCode = zip;
  return address;
};

export function organizationSchema() {
  const phone = real(office.phone);
  const email = real(office.email);

  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'Organization'],
    '@id': `${site.url}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    description: site.description,
    /* The positive lockup — knowledge panels and rich results render on white. */
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(logo.positive),
      contentUrl: absoluteUrl(logo.positive),
      width: logo.width,
      height: logo.height,
      caption: site.name,
    },
    image: absoluteUrl(logo.positive),
    areaServed: [
      { '@type': 'State', name: 'Georgia' },
      { '@type': 'City', name: 'Atlanta' },
    ],
    address: postalAddress(),
    ...(phone ? { telephone: phone } : {}),
    ...(email ? { email } : {}),
    ...(social.linkedin.isPlaceholder ? {} : { sameAs: [social.linkedin.url] }),
    knowsAbout: [
      'Commercial real estate law',
      'Commercial real estate finance',
      'Construction lending',
      'Securities and private placements',
      'Real estate syndication',
      'Corporate and business transactions',
      'Commercial litigation',
      "Creditors' rights and foreclosure",
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { '@id': `${site.url}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export type Crumb = { name: string; href: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.href),
    })),
  };
}

export function practiceSchema(practice: Practice) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    '@id': absoluteUrl(`/practices/${practice.slug}`) + '#service',
    name: `${practice.name} — ${site.name}`,
    serviceType: practice.name,
    description: practice.summary,
    url: absoluteUrl(`/practices/${practice.slug}`),
    provider: { '@id': `${site.url}/#organization` },
    areaServed: [
      { '@type': 'State', name: 'Georgia' },
      { '@type': 'City', name: 'Atlanta' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${practice.name} capabilities`,
      itemListElement: practice.capabilities.map((group) => ({
        '@type': 'OfferCatalog',
        name: group.title,
        itemListElement: group.items.map((item) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: item },
        })),
      })),
    },
  };
}

/**
 * An attorney. Only facts the firm has supplied are emitted — name, title,
 * contact details and portrait. No practice areas, credentials, admissions or
 * recognition are asserted, because none have been supplied.
 */
export function attorneySchema(attorney: Attorney) {
  const name = real(attorney.name);
  const email = real(attorney.email);
  const phone = attorney.phone ? real(attorney.phone) : undefined;
  const title = real(attorney.title);

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': absoluteUrl(`/attorneys/${attorney.slug}`) + '#person',
    ...(name ? { name } : {}),
    url: absoluteUrl(`/attorneys/${attorney.slug}`),
    ...(title ? { jobTitle: title } : {}),
    ...(email ? { email } : {}),
    ...(phone ? { telephone: phone } : {}),
    ...(attorney.portrait ? { image: absoluteUrl(attorney.portrait) } : {}),
    worksFor: { '@id': `${site.url}/#organization` },
    address: postalAddress(),
  };
}

/** The attorney directory as an ordered list of the firm's actual attorneys. */
export function attorneyDirectorySchema(list: Attorney[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': absoluteUrl('/attorneys') + '#directory',
    name: `Attorneys — ${site.name}`,
    numberOfItems: list.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: list.map((attorney, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        '@id': absoluteUrl(`/attorneys/${attorney.slug}`) + '#person',
        name: attorney.name,
        jobTitle: attorney.title,
        url: absoluteUrl(`/attorneys/${attorney.slug}`),
      },
    })),
  };
}

export function articleSchema(insight: Insight, authorNames: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': absoluteUrl(`/insights/${insight.slug}`) + '#article',
    headline: insight.title,
    description: insight.excerpt,
    datePublished: insight.date,
    dateModified: insight.date,
    url: absoluteUrl(`/insights/${insight.slug}`),
    inLanguage: 'en-US',
    author:
      authorNames.length > 0
        ? authorNames.map((n) => ({ '@type': 'Person', name: n }))
        : [{ '@type': 'Organization', name: site.name }],
    publisher: { '@id': `${site.url}/#organization` },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': absoluteUrl(`/insights/${insight.slug}`),
    },
  };
}
