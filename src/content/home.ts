/* --------------------------------------------------------------------------
   Homepage copy
   -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: 'Atlanta, Georgia',
  title: 'Counsel for complex transactions, investments and disputes.',
  sub: 'Robinson Franzman LLP advises the owners, sponsors, funds, lenders and operators who acquire, capitalize and manage commercial real estate and closely held enterprise.',
  primaryCta: { label: 'Our Capabilities', href: '/practices' },
  secondaryCta: { label: 'Explore the Firm', href: '/about' },
  markers: ['Real Estate', 'Capital', 'Finance', 'Enterprise', 'Disputes'],
  /**
   * The atrium of the firm's Atlanta office building. Served from
   * `/images/hero/` — the trimmed derivative produced by
   * scripts/prepare-hero-image.mjs, not the original in `/images/`.
   */
  image: '/images/hero/lobby-atrium.jpg',
  imageAlt:
    'The skylit atrium of the firm’s Atlanta office building — a glazed roof framing the tower above, with brass chandeliers suspended over limestone arches',
};

export const statement = {
  eyebrow: 'The Firm',
  /** `em` segments render in a lighter tone for editorial contrast. */
  lead: 'We represent the people who put capital to work',
  leadMuted: '— investors, developers, sponsors, lenders, borrowers and business owners — in the transactions and disputes that define their positions.',
  body: [
    'Robinson Franzman LLP is a business law firm in Atlanta. Our practice is built around commercial real estate and the capital that moves it: acquisitions and developments, the debt and equity that finance them, the entities and offerings that hold them, and the enforcement and litigation that follow when something does not go as underwritten.',
    'Our clients are decision-makers. They are generally not looking for an exhaustive memorandum; they are looking for a clear read on the risk, a recommendation, and documents that hold up. We work that way.',
  ],
  cta: { label: 'About the Firm', href: '/about' },
  stats: [
    {
      label: 'Focus',
      value: 'Commercial real estate, finance, private capital and the disputes arising from them.',
    },
    {
      label: 'Position',
      value: 'Both sides of the table — lender and borrower, sponsor and investor, buyer and seller.',
    },
    {
      label: 'Approach',
      value: 'Commercial judgment first, documentation second. The paper follows the deal.',
    },
    {
      label: 'Market',
      value: 'Based in Atlanta, working on matters throughout Georgia and the Southeast.',
    },
  ],
};

export const lifecycle = {
  eyebrow: 'Full Lifecycle',
  title: 'One firm across the life of an asset or enterprise.',
  intro:
    'Most transactions do not fail at a single point; they fail where two disciplines meet. We keep the entity, the financing, the offering and the enforcement strategy in the same set of hands.',
  steps: [
    {
      name: 'Formation',
      desc: 'Entity structuring, operating and partnership agreements, governance.',
      href: '/practices/corporate-business',
    },
    {
      name: 'Capitalization',
      desc: 'Private offerings, syndications, fund formation, sponsor structuring.',
      href: '/practices/securities-private-capital',
    },
    {
      name: 'Acquisition',
      desc: 'Purchase agreements, diligence, title and survey, closing.',
      href: '/practices/commercial-real-estate',
    },
    {
      name: 'Financing',
      desc: 'Senior debt, construction, bridge, agency, CMBS, mezzanine, preferred equity.',
      href: '/practices/lending-finance',
    },
    {
      name: 'Operation',
      desc: 'Leasing, management agreements, joint venture administration, consents.',
      href: '/practices/commercial-real-estate',
    },
    {
      name: 'Disposition',
      desc: 'Sales, refinancings, assumptions, 1031 exchanges, recapitalizations.',
      href: '/practices/commercial-real-estate',
    },
    {
      name: 'Special Situations',
      desc: 'Workouts, foreclosure, receivership, restructuring and litigation.',
      href: '/practices/creditors-rights',
    },
  ],
};

export const practicesSection = {
  eyebrow: 'Practices',
  title: 'Six practices, built around how our clients actually transact.',
  intro:
    'Each group stands on its own. Together they cover the full arc of a commercial matter — from the entity that holds an asset to the enforcement of the loan secured by it.',
  cta: { label: 'All Practices', href: '/practices' },
};

export const experienceSection = {
  eyebrow: 'Selected Experience',
  title: 'A record built on transactions, not adjectives.',
  intro:
    'Selected prior matters, organized by practice. Descriptions are given in general terms and do not identify clients.',
  cta: { label: 'All Selected Experience', href: '/experience' },
};

export const insightsSection = {
  eyebrow: 'Insights',
  title: 'Commentary on the structures we work in.',
  intro:
    'Practical writing on financing structures, offering documents, ownership agreements and enforcement — intended for clients who negotiate these terms.',
  cta: { label: 'All Insights', href: '/insights' },
};

export const contactSection = {
  title: 'Tell us about the transaction or the dispute.',
  text: 'We respond quickly, and we are direct about whether we are the right firm for a matter. Please do not include confidential details in a first message.',
  primaryCta: { label: 'Contact the Firm', href: '/contact' },
  secondaryCta: { label: 'Meet the Attorneys', href: '/attorneys' },
};
