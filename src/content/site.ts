/* --------------------------------------------------------------------------
   Site-wide configuration, firm identity and office information.

   PLACEHOLDER POLICY
   ------------------
   Any value that has not been confirmed by the firm is wrapped in [square
   brackets] and rendered with a visible highlight. Search the project for
   "[" to find every outstanding item, or run through PLACEHOLDERS.md.

   The office block and the LinkedIn URL below are confirmed firm information
   and carry no brackets. The only office field still unset is `mapEmbedUrl`,
   which is optional: without it /contact shows a "Get directions" link built
   from the confirmed address instead of an embedded map.
   -------------------------------------------------------------------------- */

export const site = {
  name: 'Robinson Franzman LLP',
  shortName: 'Robinson Franzman',
  initials: 'RF',
  domain: 'rfllplaw.com',
  url: 'https://www.rfllplaw.com',
  locale: 'en_US',
  tagline: 'Real estate. Capital. Enterprise.',
  description:
    'Robinson Franzman LLP is an Atlanta business law firm representing owners, developers, sponsors, funds, lenders and borrowers in commercial real estate, finance, private capital, corporate and litigation matters.',
} as const;

/* --------------------------------------------------------------------------
   Firm logo.

   `master` is the artwork the firm supplied — a CMYK JPEG built for print. It
   is kept untouched for reference and reprints, and is deliberately not what
   the site serves: CMYK JPEGs render inconsistently in browsers and cannot
   carry transparency, so the lockup would sit on a white rectangle over both
   --paper and --surface-dark.

   `positive` and `reversed` are the sRGB display lockups derived from that
   master by scripts/generate-logo-assets.mjs — same artwork, same proportions,
   white stock converted to transparency and the empty margin trimmed. Use
   `positive` on light surfaces and `reversed` on dark ones.

   `width` / `height` are the true pixel dimensions of the trimmed artwork.
   Always size the logo on one axis and let the other resolve from this ratio.
   -------------------------------------------------------------------------- */
export const logo = {
  master:
    '/images/Robinson-Franzman-Logo-Black-Green-500px-wide-135-tall-150dpi.jpg',
  positive: '/images/logo/rf-logo.png',
  reversed: '/images/logo/rf-logo-reversed.png',
  width: 491,
  height: 125,
  alt: 'Robinson Franzman LLP',
} as const;

export type Office = {
  label: string;
  streetAddress: string;
  suite: string;
  city: string;
  region: string;
  regionName: string;
  postalCode: string;
  country: string;
  phone: string;
  phoneHref: string;
  /** Omitted entirely when the firm does not publish a fax number. */
  fax?: string;
  email: string;
  emailHref: string;
  mapEmbedUrl: string;
  mapLinkUrl: string;
  /** Omitted entirely until the firm confirms its published hours. */
  hours?: string;
};

/** Atlanta office. Confirmed by the firm. */
export const office: Office = {
  label: 'Atlanta',
  streetAddress: '191 Peachtree Street, NE',
  suite: '26th Floor',
  city: 'Atlanta',
  region: 'GA',
  regionName: 'Georgia',
  postalCode: '30303',
  country: 'US',
  phone: '404-255-2503',
  phoneHref: 'tel:+14042552503',
  /* The firm does not publish a fax number; the row omits itself. */
  fax: '',
  email: 'info@rfllplaw.com',
  emailHref: 'mailto:info@rfllplaw.com',
  /** Paste a Google Maps embed URL here to activate the map on /contact. */
  mapEmbedUrl: '',
  mapLinkUrl:
    'https://www.google.com/maps/search/?api=1&query=191+Peachtree+Street+NE%2C+Atlanta%2C+GA+30303',
  /* Hours were never confirmed by the firm, so none are published. The Hours
     row on /contact omits itself while this is empty; set a confirmed value to
     bring it back. */
  hours: '',
};

export const social: {
  linkedin: { label: string; url: string; isPlaceholder: boolean };
} = {
  linkedin: {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/company/robinson-franzman-llp/',
    isPlaceholder: false,
  },
};

export type NavItem = {
  label: string;
  href: string;
  /** Rendered beneath the item in the full-screen mobile menu. */
  children?: { label: string; href: string }[];
};

export const primaryNav: NavItem[] = [
  {
    label: 'Attorneys',
    href: '/attorneys',
  },
  {
    label: 'Practices',
    href: '/practices',
    children: [
      { label: 'Commercial Real Estate', href: '/practices/commercial-real-estate' },
      { label: 'Lending & Finance', href: '/practices/lending-finance' },
      { label: 'Securities & Private Capital', href: '/practices/securities-private-capital' },
      { label: 'Corporate & Business Transactions', href: '/practices/corporate-business' },
      { label: 'Commercial Litigation', href: '/practices/commercial-litigation' },
      { label: "Creditors' Rights & Special Situations", href: '/practices/creditors-rights' },
    ],
  },
  {
    label: 'Insights',
    href: '/insights',
  },
  {
    label: 'About',
    href: '/about',
    children: [{ label: 'Selected Experience', href: '/experience' }],
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export const footerNav: {
  heading: string;
  links: { label: string; href: string }[];
}[] = [
  {
    heading: 'Firm',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Attorneys', href: '/attorneys' },
      { label: 'Selected Experience', href: '/experience' },
      { label: 'Insights', href: '/insights' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Practices',
    links: [
      { label: 'Commercial Real Estate', href: '/practices/commercial-real-estate' },
      { label: 'Lending & Finance', href: '/practices/lending-finance' },
      { label: 'Securities & Private Capital', href: '/practices/securities-private-capital' },
      { label: 'Corporate & Business', href: '/practices/corporate-business' },
      { label: 'Commercial Litigation', href: '/practices/commercial-litigation' },
      { label: "Creditors' Rights", href: '/practices/creditors-rights' },
    ],
  },
  {
    heading: 'Insights',
    /* Category links are listed only while that category has published pieces.
       Legal Updates, Firm News and Deal Announcements were removed because they
       currently have none and the links landed on an empty result set. Restore a
       link when its first article is published. */
    links: [
      { label: 'All Insights', href: '/insights' },
      { label: 'Articles', href: '/insights?category=articles' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Disclaimer', href: '/disclaimer' },
      { label: 'Attorney Advertising', href: '/attorney-advertising' },
      { label: 'Terms of Use', href: '/terms' },
    ],
  },
];

/* ---- Standing legal language -------------------------------------------- */

export const legal = {
  /** Shown beneath the contact form and on /disclaimer. */
  noRelationship:
    'Submitting this form does not create an attorney-client relationship. Please do not send confidential or time-sensitive information through this form or by email until an attorney-client relationship has been established in writing.',
  attorneyAdvertising:
    'This website is attorney advertising. Prior results do not guarantee a similar outcome. The information on this site is provided for general informational purposes only and is not legal advice.',
  footerDisclaimer:
    'The material on this website is for general informational purposes only and does not constitute legal advice. No attorney-client relationship is created by visiting this website, by submitting the contact form, or by sending email to the firm or any of its attorneys. Do not send confidential information until an attorney-client relationship has been established in writing. Prior results do not guarantee a similar outcome.',
  copyrightHolder: 'Robinson Franzman LLP',
};

/**
 * Year the firm was formed. Left null deliberately — nothing is asserted about
 * the firm's history until the date is confirmed. Set a number to surface it in
 * the Organization schema and on /about.
 */
export const foundedYear: number | null = null;
