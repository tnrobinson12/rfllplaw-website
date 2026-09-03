/* --------------------------------------------------------------------------
   Selected Experience

   NOTHING IN THIS FILE IS INVENTED.

   Every headline, description, dollar amount, unit count and location below is
   taken from the firm's own prior marketing materials and is reproduced as
   supplied. Amounts, qualifiers ("approximately", "more than"), asset types and
   jurisdictions are preserved exactly; nothing has been combined, rounded,
   escalated or embellished.

   Deliberate omissions:

     clients    No matter identifies a client. Descriptions are anonymized to
                the counterparty role ("the lead lender", "a family office").
     attorneys  `attorneys` is empty on every matter. The firm has not verified
                individual attribution, so none is asserted and no matter
                surfaces on an attorney profile.
     dates      `year` is unset on every matter. No date was supplied and none
                has been invented.
     roles      `role` is empty. The supplied descriptions already open with the
                role ("Represented the lead lender in..."), so a separate role
                line would restate it.

   These are historical matters, not current engagements, and the page says so.

   Structure: each matter carries `practices` (many), so it surfaces
   automatically on the relevant practice pages and on /experience. The FIRST
   practice is the primary one — it supplies the display grouping on /experience
   and the leading tag — so its order within each entry is meaningful.

   `featured` marks the matters shown on the main /experience page. Everything
   else still reaches the site through its practice pages.
   -------------------------------------------------------------------------- */

export type Matter = {
  id: string;
  /** Short descriptive headline. */
  title: string;
  /** The matter description. One or two sentences. */
  description: string;
  /** Role played, e.g. "Lender's counsel". Empty when the description states it. */
  role: string;
  /** Practice slugs. The first is the primary one — it groups and labels. */
  practices: string[];
  /** Attorney slugs who worked the matter. Empty until the firm verifies attribution. */
  attorneys: string[];
  /** Optional year for sorting/display. Unset unless supplied by the firm. */
  year?: string;
  /** Shown on the main /experience page. */
  featured: boolean;
  isPlaceholder: boolean;
};

/** Every matter is confirmed, undated and unattributed. */
const BASE = { role: '', attorneys: [] as string[], isPlaceholder: false };

export const matters: Matter[] = [
  /* ---- Lending & Finance ------------------------------------------------- */
  {
    ...BASE,
    id: 'multifamily-construction-chicago',
    title: '$110 Million Multifamily Construction Financing',
    description:
      'Represented the lead lender in a $110 million financing package, including PACE financing, for the construction of a 300-unit multifamily development in Chicago, Illinois.',
    practices: ['lending-finance', 'commercial-real-estate'],
    featured: true,
  },
  {
    ...BASE,
    id: 'residential-development-loan-kissimmee',
    title: '$54 Million Residential Development Construction Loan',
    description:
      'Represented a private commercial construction lender in a $54 million construction loan for the development of a 478-unit residential subdivision in Kissimmee, Florida.',
    practices: ['lending-finance', 'commercial-real-estate'],
    featured: true,
  },
  {
    ...BASE,
    id: 'automotive-portfolio-refinancing',
    title: '$30 Million Portfolio Refinancing',
    description:
      'Represented a national financial institution in a $30 million refinancing secured by a portfolio of 15 automotive service properties in metropolitan Atlanta.',
    practices: ['lending-finance'],
    featured: true,
  },
  {
    ...BASE,
    id: 'senior-living-financing-pennsylvania',
    title: '$27 Million Senior Living Financing',
    description:
      'Represented the lead lender in a $27 million financing secured by five senior living facilities in Pennsylvania.',
    practices: ['lending-finance', 'commercial-real-estate'],
    featured: true,
  },
  {
    ...BASE,
    id: 'healthcare-real-estate-financing',
    title: '$25 Million Healthcare Real Estate Financing',
    description:
      'Represented an institutional investment bank as commercial real estate lender in a $25 million financing involving six healthcare real estate sites in Pennsylvania.',
    practices: ['lending-finance', 'commercial-real-estate'],
    featured: true,
  },
  {
    ...BASE,
    id: 'debt-fund-acquisition-financing-chattanooga',
    title: 'Multifamily Acquisition Financing — Five-Property Portfolio',
    description:
      'Represented a real estate debt fund as lender in financing the acquisition of five multifamily properties in Chattanooga, Tennessee.',
    practices: ['lending-finance', 'commercial-real-estate'],
    featured: false,
  },
  {
    ...BASE,
    id: 'multifamily-refinancing-atlanta',
    title: '$7 Million Multifamily Refinancing',
    description:
      'Represented a financial institution in the refinancing of a $7 million loan secured by multifamily property in Atlanta, Georgia.',
    practices: ['lending-finance', 'commercial-real-estate'],
    featured: false,
  },
  {
    ...BASE,
    id: 'national-private-lending',
    title: 'National Private Lending and Construction Finance',
    description:
      'Represented a private lender in structuring and closing numerous hard-money and construction loans across the United States involving self-storage, multifamily, retail, and quick-service restaurant properties.',
    practices: ['lending-finance', 'commercial-real-estate'],
    featured: false,
  },
  {
    ...BASE,
    id: 'government-guaranteed-lending',
    title: 'Government-Guaranteed Lending',
    description:
      'Represented community, regional, and national financial institutions throughout the United States in documenting and closing SBA 7(a) and 504 loans.',
    practices: ['lending-finance'],
    featured: true,
  },
  {
    ...BASE,
    id: 'certified-development-company',
    title: 'Certified Development Company Representation',
    description:
      'Represented a Certified Development Company in connection with loans originated through the SBA 504 loan program.',
    practices: ['lending-finance'],
    featured: false,
  },
  {
    ...BASE,
    id: 'georgia-local-counsel-opinions',
    title: 'Georgia Local Counsel and Opinion Practice',
    description:
      'Served as Georgia local counsel to out-of-state financial institutions and private lenders, advising on Georgia lending practices and preparing Georgia authority opinions in connection with financing transactions.',
    practices: ['lending-finance'],
    featured: false,
  },
  {
    ...BASE,
    id: 'structured-corporate-credit-facilities',
    title: 'Structured Corporate Credit Facilities',
    description:
      'Represented corporate borrowers in structuring, negotiating, and closing credit facilities and other structured financing arrangements supporting operational and strategic business objectives.',
    practices: ['lending-finance', 'corporate-business'],
    featured: false,
  },

  /* ---- Commercial Real Estate -------------------------------------------- */
  {
    ...BASE,
    id: 'southeast-multifamily-program',
    title: '$200 Million Southeast Multifamily Acquisition Program',
    description:
      'Represented a multifamily investment group in acquisitions throughout the Southeast totaling approximately $200 million over a four-year period, including structuring acquisition vehicles utilizing syndicated equity.',
    practices: ['commercial-real-estate', 'securities-private-capital'],
    featured: true,
  },
  {
    ...BASE,
    id: 'multifamily-syndication-program',
    title: '$175 Million Multifamily Acquisition and Syndication Program',
    description:
      'Represented a multifamily investment firm as syndication and borrower counsel in Southeast multifamily acquisitions totaling approximately $175 million.',
    practices: ['commercial-real-estate', 'securities-private-capital', 'lending-finance'],
    featured: false,
  },
  {
    ...BASE,
    id: 'texas-multifamily-portfolio',
    title: '$150+ Million Texas Multifamily Portfolio Acquisition',
    description:
      'Represented an investment firm in the acquisition of a three-property, approximately 1,000-unit multifamily portfolio in Texas valued at more than $150 million, including significant deal structuring and preferred-equity negotiations.',
    practices: ['commercial-real-estate', 'securities-private-capital'],
    featured: true,
  },
  {
    ...BASE,
    id: 'multi-state-multifamily-acquisitions',
    title: '$150 Million Multi-State Multifamily Acquisitions',
    description:
      'Represented a multifamily operator in the acquisition of three multifamily properties in Texas, Florida, and Georgia with an aggregate value of approximately $150 million.',
    practices: ['commercial-real-estate'],
    featured: false,
  },
  {
    ...BASE,
    id: 'michigan-multifamily-portfolio',
    title: '$100+ Million Multifamily Portfolio',
    description:
      'Managed the acquisition and financing of a Central Michigan multifamily portfolio valued at more than $100 million.',
    practices: ['commercial-real-estate', 'lending-finance'],
    featured: true,
  },
  {
    ...BASE,
    id: 'florida-multifamily-portfolio',
    title: '$70 Million Florida Multifamily Portfolio',
    description:
      'Represented a real estate investment firm in the acquisition, financing, and disposition of a multi-asset apartment portfolio in Central Florida valued at approximately $70 million.',
    practices: ['commercial-real-estate', 'lending-finance'],
    featured: true,
  },
  {
    ...BASE,
    id: 'texas-multifamily-acquisition',
    title: '$60 Million Texas Multifamily Acquisition',
    description:
      'Represented a real estate investment firm in the acquisition of a Texas multifamily property valued at approximately $60 million.',
    practices: ['commercial-real-estate'],
    featured: false,
  },
  {
    ...BASE,
    id: 'arkansas-multifamily-syndication',
    title: '$45.2 Million, 376-Unit Multifamily Acquisition and Syndication',
    description:
      'Represented the borrower in the $45.2 million acquisition and syndication of a 376-unit multifamily community in Arkansas.',
    practices: ['commercial-real-estate', 'securities-private-capital', 'lending-finance'],
    featured: true,
  },
  {
    ...BASE,
    id: 'houston-multifamily-joint-venture',
    title: '$35+ Million Houston Multifamily Joint Venture',
    description:
      'Represented a joint venture partnership in the acquisition of a Houston, Texas multifamily asset valued at more than $35 million.',
    practices: ['commercial-real-estate', 'securities-private-capital'],
    featured: false,
  },
  {
    ...BASE,
    id: 'atlanta-multifamily-portfolio',
    title: '$30+ Million Atlanta Multifamily Portfolio',
    description:
      'Represented a multifamily investment firm in the acquisition and financing of a portfolio of Atlanta multifamily properties valued at more than $30 million.',
    practices: ['commercial-real-estate', 'lending-finance'],
    featured: false,
  },
  {
    ...BASE,
    id: 'multifamily-acquisition-129-unit',
    title: '$25 Million, 129-Unit Multifamily Acquisition',
    description:
      'Represented the borrower in structuring and closing the acquisition of a 129-unit multifamily property valued at approximately $25 million.',
    practices: ['commercial-real-estate', 'lending-finance'],
    featured: false,
  },
  {
    ...BASE,
    id: 'adaptive-reuse-acquisition-atlanta',
    title: '$24 Million Adaptive-Reuse Acquisition',
    description:
      'Represented a real estate investment and development firm in the acquisition of a $24 million Atlanta property planned for conversion to multifamily use.',
    practices: ['commercial-real-estate'],
    featured: false,
  },
  {
    ...BASE,
    id: 'national-multifamily-acquisition-counsel',
    title: 'National Multifamily Acquisition Counsel',
    description:
      'Served as real estate counsel in connection with multifamily acquisitions throughout the United States for a national multifamily owner and operator.',
    practices: ['commercial-real-estate'],
    featured: false,
  },

  /* ---- Development & Hospitality ----------------------------------------- */
  {
    ...BASE,
    id: 'covington-master-development',
    title: '250-Acre Mixed-Use Master Development',
    description:
      'Served as U.S. counsel to an international investment group in the acquisition, structuring, and development of approximately 250 acres in Covington, Georgia for a mixed-use master development contemplated to include single-family homes, approximately 700 multifamily units, and commercial and retail space.',
    practices: ['commercial-real-estate', 'securities-private-capital'],
    featured: true,
  },
  {
    ...BASE,
    id: 'hotel-development-jacksonville',
    title: '$16+ Million Marriott-Branded Hotel Development',
    description:
      'Represented a hospitality development group in the acquisition and development of a Marriott-branded hotel in Jacksonville, Florida valued at more than $16 million.',
    practices: ['commercial-real-estate'],
    featured: true,
  },
  {
    ...BASE,
    id: 'hotel-development-princeton',
    title: '$12+ Million Marriott-Branded Hotel Development',
    description:
      'Represented a family office in the acquisition and development of a Marriott-branded hotel in Princeton, New Jersey valued at more than $12 million, including an equity buyout and restructuring of entities and investors.',
    practices: ['commercial-real-estate', 'corporate-business'],
    featured: false,
  },
  {
    ...BASE,
    id: 'resort-golf-course-acquisitions',
    title: 'Resort and Golf Course Acquisitions',
    description:
      'Represented a resort developer/operator in acquisitions involving multiple golf courses, resorts, and spas in Georgia and Florida.',
    practices: ['commercial-real-estate'],
    featured: false,
  },
  {
    ...BASE,
    id: 'atlanta-beltline-development',
    title: 'Atlanta Beltline Development',
    description:
      'Advised a local developer working with institutional equity partners in the acquisition and development of properties along the Atlanta Beltline.',
    practices: ['commercial-real-estate', 'securities-private-capital'],
    featured: false,
  },
  {
    ...BASE,
    id: 'self-storage-development-program',
    title: 'Southeast Self-Storage Development Program',
    description:
      'Advised a private investment fund manager in connection with development of a self-storage portfolio throughout the Southeast.',
    practices: ['commercial-real-estate', 'securities-private-capital'],
    featured: false,
  },

  /* ---- Securities & Private Capital -------------------------------------- */
  {
    ...BASE,
    id: 'regulation-d-offerings',
    title: 'Regulation D Real Estate Offerings',
    description:
      'Represented real estate sponsors and investment groups in private securities offerings under Rules 506(b) and 506(c) of Regulation D, including multifamily and hospitality offerings.',
    practices: ['securities-private-capital'],
    featured: true,
  },
  {
    ...BASE,
    id: 'programmatic-senior-living-jv',
    title: 'Programmatic Senior Living Joint Venture',
    description:
      'Advised a family office in structuring a programmatic joint venture with operating partners enabling the family office to co-invest as a limited partner in senior living acquisitions while retaining a general partner interest.',
    practices: ['securities-private-capital', 'commercial-real-estate'],
    featured: true,
  },
  {
    ...BASE,
    id: 'institutional-real-estate-joint-ventures',
    title: 'Institutional Real Estate Joint Ventures',
    description:
      'Represented real estate owners and operators in structuring joint venture investment vehicles with institutional private-equity sources, including partnership structures tailored to underlying debt arrangements.',
    practices: ['securities-private-capital', 'commercial-real-estate'],
    featured: true,
  },
  {
    ...BASE,
    id: 'acquisition-vehicles-syndicated-equity',
    title: 'Real Estate Acquisition Vehicles and Syndicated Equity',
    description:
      'Represented sponsors and real estate investors in structuring acquisition vehicles, syndicated equity, joint ventures, waterfalls, private investment structures, and related securities documentation for commercial real estate transactions.',
    practices: ['securities-private-capital', 'commercial-real-estate'],
    featured: false,
  },
  {
    ...BASE,
    id: 'private-investment-fund',
    title: 'Private Investment Fund Representation',
    description:
      'Represented an Atlanta-based traditional hedge fund with more than $25 million in assets under management.',
    practices: ['securities-private-capital'],
    featured: false,
  },

  /* ---- Corporate & Business ---------------------------------------------- */
  {
    ...BASE,
    id: 'middle-market-ma',
    title: 'Middle-Market M&A and Growth Transactions',
    description:
      'Represented middle-market businesses in merger and acquisition transactions and strategic growth matters, including related securities-law considerations.',
    practices: ['corporate-business'],
    featured: true,
  },
  {
    ...BASE,
    id: 'asset-stock-membership-transactions',
    title: 'Asset, Stock and Membership Interest Transactions',
    description:
      'Represented businesses and investors in negotiating and documenting asset purchases, stock purchases, membership-interest purchases, and related transactional documents.',
    practices: ['corporate-business'],
    featured: true,
  },
  {
    ...BASE,
    id: 'outside-general-counsel',
    title: 'Outside General Counsel',
    description:
      'Served as outside general counsel to privately held businesses on commercial leases, entity formation, operating agreements, employment matters, contracts, and general corporate and strategic matters.',
    practices: ['corporate-business'],
    featured: true,
  },

  /* ---- Commercial Litigation & Creditors' Rights ------------------------- */
  {
    ...BASE,
    id: 'loan-workouts-collections',
    title: 'Loan Workouts and Commercial Collections',
    description:
      'Represented financial institutions and investment managers in loan workouts and commercial collection matters, including replevin, repossession of collateral, fraudulent-transfer litigation, and post-judgment collection proceedings.',
    practices: ['creditors-rights', 'commercial-litigation'],
    featured: true,
  },
  {
    ...BASE,
    id: 'commercial-foreclosures',
    title: 'Commercial Foreclosures',
    description:
      'Served as foreclosure counsel to lenders and investors in connection with commercial real estate collateral.',
    practices: ['creditors-rights', 'commercial-real-estate'],
    featured: true,
  },
  {
    ...BASE,
    id: 'distressed-loan-portfolio-transactions',
    title: 'Distressed Loan Portfolio Transactions',
    description: 'Represented investors in structuring and acquiring distressed loan portfolios.',
    practices: ['creditors-rights', 'lending-finance'],
    featured: true,
  },
  {
    ...BASE,
    id: 'distressed-asset-recovery',
    title: 'Distressed Asset and Loan Portfolio Recovery',
    description:
      'Represented a creditor in connection with sales of loan portfolios and collection and recovery involving distressed assets.',
    practices: ['creditors-rights', 'lending-finance'],
    featured: false,
  },
  {
    ...BASE,
    id: 'fiduciary-duty-ownership-dispute',
    title: 'Fiduciary Duty and Ownership Dispute',
    description:
      'Represented a closely held real estate company in litigation involving claims of breach of fiduciary duty, fraud, breach of contract, and dilution of ownership interests.',
    practices: ['commercial-litigation'],
    featured: true,
  },
  {
    ...BASE,
    id: 'reit-leasing-disputes',
    title: 'REIT Leasing and Landlord-Tenant Disputes',
    description:
      'Represented a shopping-center REIT in landlord-tenant and commercial leasing disputes.',
    practices: ['commercial-litigation', 'commercial-real-estate'],
    featured: true,
  },
];

/* ---- Lookups ------------------------------------------------------------- */

/** The curated set shown on the main /experience page. */
export function featuredMatters(): Matter[] {
  return matters.filter((m) => m.featured);
}

/**
 * Featured matters grouped under their PRIMARY practice, so a matter that spans
 * several practices is listed once rather than repeated under each. Groups are
 * returned in the order the practice slugs are passed in.
 */
export function featuredMattersByPrimaryPractice(
  practiceSlugs: readonly string[]
): { slug: string; items: Matter[] }[] {
  return practiceSlugs
    .map((slug) => ({
      slug,
      items: matters.filter((m) => m.featured && m.practices[0] === slug),
    }))
    .filter((group) => group.items.length > 0);
}

/**
 * The matters each practice page leads with, in display order.
 *
 * Curated rather than derived. The `matters` array above follows the order of
 * the firm's source document, which is not the order in which the firm wants
 * each practice represented — slicing it by practice would, for example, open
 * the Commercial Real Estate page with six financings. These lists are the
 * firm's own priorities. A practice missing here falls back to source order.
 */
const PRACTICE_FEATURE: Record<string, string[]> = {
  'commercial-real-estate': [
    'southeast-multifamily-program',
    'texas-multifamily-portfolio',
    'michigan-multifamily-portfolio',
    'florida-multifamily-portfolio',
    'arkansas-multifamily-syndication',
    'covington-master-development',
    'hotel-development-jacksonville',
  ],
  'lending-finance': [
    'multifamily-construction-chicago',
    'residential-development-loan-kissimmee',
    'automotive-portfolio-refinancing',
    'senior-living-financing-pennsylvania',
    'healthcare-real-estate-financing',
    'debt-fund-acquisition-financing-chattanooga',
    'government-guaranteed-lending',
  ],
  'securities-private-capital': [
    'southeast-multifamily-program',
    'multifamily-syndication-program',
    'texas-multifamily-portfolio',
    'arkansas-multifamily-syndication',
    'regulation-d-offerings',
    'programmatic-senior-living-jv',
    'institutional-real-estate-joint-ventures',
  ],
  'corporate-business': [
    'middle-market-ma',
    'asset-stock-membership-transactions',
    'outside-general-counsel',
    'structured-corporate-credit-facilities',
    'hotel-development-princeton',
  ],
  /* Only three matters touch litigation; all three are listed. */
  'commercial-litigation': [
    'fiduciary-duty-ownership-dispute',
    'reit-leasing-disputes',
    'loan-workouts-collections',
  ],
  'creditors-rights': [
    'commercial-foreclosures',
    'loan-workouts-collections',
    'distressed-loan-portfolio-transactions',
    'distressed-asset-recovery',
  ],
};

/** Matters for a practice page: the curated list, or source order as fallback. */
export function practiceFeatureMatters(practiceSlug: string, limit = 7): Matter[] {
  const curated = PRACTICE_FEATURE[practiceSlug];
  if (curated) return getMatters(curated).slice(0, limit);
  return mattersByPractice(practiceSlug, limit);
}

export function mattersByPractice(practiceSlug: string, limit?: number): Matter[] {
  const list = matters.filter((m) => m.practices.includes(practiceSlug));
  return typeof limit === 'number' ? list.slice(0, limit) : list;
}

export function mattersByAttorney(attorneySlug: string, limit?: number): Matter[] {
  const list = matters.filter((m) => m.attorneys.includes(attorneySlug));
  return typeof limit === 'number' ? list.slice(0, limit) : list;
}

export function getMatters(ids: readonly string[]): Matter[] {
  return ids
    .map((id) => matters.find((m) => m.id === id))
    .filter((m): m is Matter => Boolean(m));
}
