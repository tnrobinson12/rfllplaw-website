/* --------------------------------------------------------------------------
   Practice areas — the substantive core of the site.

   Each entry drives: the /practices index, the practice detail page, homepage
   cards, navigation, search index, sitemap and JSON-LD. To add a seventh
   practice, add an object here; every surface picks it up automatically.
   -------------------------------------------------------------------------- */

export type CapabilityGroup = {
  title: string;
  items: string[];
};

export type Practice = {
  slug: string;
  /** Full name used as the H1 and in navigation. */
  name: string;
  /** Compact name for tight spaces (cards, breadcrumbs, tags). */
  shortName: string;
  /** One sentence. Used on cards and as the meta description seed. */
  summary: string;
  /** Hero lede — two sentences maximum. */
  lede: string;
  /** Body copy for the practice page overview. */
  overview: string[];
  /** Grouped capability lists. */
  capabilities: CapabilityGroup[];
  /** Short list shown on homepage/practice cards. */
  highlights: string[];
  /** Emphasis statement rendered as a panel. */
  panel: string;
  /** Slugs of related practices, ordered by relevance. */
  related: string[];
  /**
   * An optional sentence above the selected-matter list. Reserved for a
   * historical, explicitly year-stated figure supplied by the firm — never a
   * standing or current claim. Omitted where the firm has supplied none.
   */
  experienceNote?: string;
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  /** Artwork seed — selects one of the generated architectural compositions. */
  artwork: 'facade' | 'tower' | 'grid' | 'aperture' | 'strata' | 'lattice';
};

export const practices: Practice[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: 'commercial-real-estate',
    name: 'Commercial Real Estate',
    shortName: 'Commercial Real Estate',
    summary:
      'Acquisitions, dispositions, development, joint ventures and leasing across multifamily, hospitality, retail and mixed-use assets.',
    lede: 'We represent investors, developers, owners and operators in the acquisition, development, financing, leasing and sale of commercial real estate. Our work spans the full ownership cycle and the structures that sit above it.',
    overview: [
      'We represent investors, developers, owners and operators across the ownership cycle — acquisition and disposition, ground-up development, joint venture formation, leasing, recapitalization and portfolio transactions. The practice is weighted toward multifamily and extends to hospitality, retail, self-storage, mixed-use, land and adaptive-reuse projects.',
      'Multi-property and portfolio work is a regular part of the practice, including acquisitions spanning several states. We handle simultaneous and staged closings, allocate purchase price and diligence risk among assets, and coordinate the lender, title, survey, insurance and zoning workstreams that determine whether a multi-asset closing holds its schedule.',
      'Development matters run from single-asset ground-up projects through master-planned developments combining single-family, multifamily, commercial and retail components. We structure the ownership and development entities, negotiate construction and design professional agreements, and coordinate entitlement, platting and land use work with local counsel and consultants where a project requires it.',
      'Because the firm also handles the financing, entity and securities work surrounding a real estate transaction, the acquisition, capital and closing documents are drafted against one set of business assumptions rather than three. The firm also provides commercial title and closing services — title examination, curative work and coordination through policy issuance — and includes an attorney approved by several national title insurance underwriters.',
    ],
    capabilities: [
      {
        title: 'Acquisitions & Dispositions',
        items: [
          'Purchase and sale agreements',
          'Portfolio and single-asset transactions',
          'Letters of intent and term sheets',
          'Due diligence review and coordination',
          'Title and survey review and objections',
          'Closing, escrow and post-closing matters',
          'Section 1031 like-kind exchanges',
          'Tenant-in-common (TIC) structures',
        ],
      },
      {
        title: 'Asset Classes',
        items: [
          'Multifamily and build-to-rent',
          'Hospitality and hotel assets',
          'Shopping centers and retail',
          'Office and flex',
          'Industrial and logistics',
          'Mixed-use and land',
          'Self-storage and specialty assets',
        ],
      },
      {
        title: 'Development',
        items: [
          'Ground-up development structuring',
          'Development and construction agreements',
          'Architect and design professional agreements',
          'Entitlement and land use coordination',
          'Ground leases and air rights',
          'Easements, CC&Rs and reciprocal easement agreements',
          'Condominium and subdivision regimes',
        ],
      },
      {
        title: 'Ownership & Joint Ventures',
        items: [
          'Joint venture agreements',
          'Promote and waterfall structures',
          'Capital contribution and dilution mechanics',
          'Major decision and control provisions',
          'Buy-sell, forced sale and exit rights',
          'Co-investment arrangements',
          'Property management and asset management agreements',
        ],
      },
      {
        title: 'Leasing',
        items: [
          'Anchor, in-line and pad site retail leases',
          'Office and industrial leases',
          'Ground leases',
          'Subleases, assignments and consents',
          'Estoppels and subordination agreements (SNDAs)',
          'Lease amendments, renewals and terminations',
          'Landlord and tenant workout negotiations',
        ],
      },
      {
        title: 'Investment Structures',
        items: [
          'Fund and syndicate acquisition vehicles',
          'Programmatic and multi-asset acquisition vehicles',
          'Preferred equity and structured investments',
          'Institutional capital partner joint ventures',
          'Recapitalizations and partner buyouts',
          'Cross-collateralized portfolio structures',
        ],
      },
      {
        title: 'Title & Closing Services',
        items: [
          'Title examination and commitment review',
          'Curative title work and resolution of title defects',
          'Survey review and exception analysis',
          'Title insurance coordination through policy issuance',
          'Multi-state and portfolio title coordination',
          'Escrow and closing administration',
          'Owner and lender policy endorsements',
        ],
      },
    ],
    highlights: [
      'Acquisitions & dispositions',
      'Multifamily & portfolios',
      'Development',
      'Joint ventures',
      'Title & closing',
    ],
    panel:
      'A real estate transaction is a financing, an entity, a tax structure and an operating agreement wearing one set of closing documents. We treat it that way from the first draft.',
    related: ['lending-finance', 'securities-private-capital', 'corporate-business'],
    metaTitle: 'Commercial Real Estate Attorneys | Atlanta',
    metaDescription:
      'Atlanta commercial real estate attorneys handling acquisitions, dispositions, development, joint ventures, leasing, 1031 and TIC transactions for investors, developers, owners and operators.',
    artwork: 'facade',
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'lending-finance',
    name: 'Lending & Finance',
    shortName: 'Lending & Finance',
    summary:
      'Lender-side and borrower-side representation in commercial real estate finance, construction, bridge, agency, CMBS, mezzanine and preferred equity transactions.',
    lede: 'We represent lenders, borrowers, sponsors, investors and other capital providers in commercial financing transactions — from originations and acquisitions through modifications, assumptions, restructurings and payoffs.',
    overview: [
      'Financing is where a real estate or business transaction is either made durable or quietly compromised. Our attorneys work on both sides of the table: originating and documenting loans for lenders and credit funds, and negotiating and closing them for borrowers and sponsors. Seeing both sides regularly is what makes the negotiation efficient — we know which points are genuinely at risk and which are noise.',
      'We handle the full capital stack. Senior mortgage debt, construction and development facilities, bridge and transitional loans, permanent and agency financing, CMBS originations and servicing matters, mezzanine loans, preferred equity investments, and the intercreditor and recognition agreements that govern how those layers interact when a deal is performing and when it is not.',
      'Just as important, we read the deal economics. Cash management and lockbox mechanics, reserve and escrow structures, recourse carve-outs and the guaranties behind them, financial covenants, transfer and change-of-control provisions, extension and exit tests — these are business terms that happen to be written in legal language. We negotiate them as business terms.',
      'The firm also delivers the closing deliverables the transaction depends on, including entity authority review, organizational document analysis and legal opinions, and we coordinate the diligence, title, survey, insurance and zoning work that determines whether a closing happens on schedule.',
    ],
    capabilities: [
      {
        title: 'Real Estate Finance',
        items: [
          'Commercial real estate mortgage financing',
          'Acquisition financing',
          'Construction and development loans',
          'Bridge and transitional financing',
          'Permanent financing',
          'Multifamily financing',
          'Agency financing (Fannie Mae, Freddie Mac, HUD programs)',
          'CMBS originations and securitized loan matters',
          'Portfolio and cross-collateralized facilities',
        ],
      },
      {
        title: 'Structured & Subordinate Capital',
        items: [
          'Mezzanine loans',
          'Preferred equity investments',
          'A/B note structures and participations',
          'Intercreditor agreements',
          'Subordination and standstill arrangements',
          'Co-lender and agency arrangements',
          'Loan participations and syndications',
          'Recognition and pledge agreements',
        ],
      },
      {
        title: 'Loan Documentation',
        items: [
          'Term sheets and commitment letters',
          'Loan and credit agreements',
          'Promissory notes, mortgages and deeds to secure debt',
          'Security agreements and UCC filings',
          'Assignments of leases and rents',
          'Guaranties and recourse carve-out agreements',
          'Environmental indemnities',
          'Cash management, lockbox and reserve agreements',
          'Closing checklists and closing management',
        ],
      },
      {
        title: 'Loan Servicing & Modification',
        items: [
          'Loan assumptions and transfers',
          'Refinancings and payoffs',
          'Loan modifications and extensions',
          'Consents, releases and partial releases',
          'Collateral substitutions',
          'Forbearance agreements',
          'Defeasance and prepayment matters',
          'Servicer and special servicer negotiations',
        ],
      },
      {
        title: 'Secured Lending',
        items: [
          'Asset-based and secured commercial lending',
          'Equipment and receivables financing',
          'Pledges of equity interests',
          'Perfection and priority analysis',
          'Lien searches and collateral review',
          'Deposit account control agreements',
          'Subordinated and seller financing',
        ],
      },
      {
        title: 'Opinions & Closing Deliverables',
        items: [
          'Enforceability opinions',
          'Due authorization and organizational opinions',
          'Non-consolidation considerations and SPE structuring',
          'Entity formation for borrowing structures',
          'Organizational document review and amendment',
          'Estoppels, SNDAs and tenant deliverables',
          'Title, survey and insurance coordination',
        ],
      },
    ],
    highlights: [
      'Lender representation',
      'Borrower representation',
      'Construction & bridge',
      'Agency & CMBS',
      'Mezzanine & preferred equity',
    ],
    panel:
      'We represent both lenders and borrowers. That is deliberate — knowing how the other side underwrites, prices and services a loan is what makes a negotiation efficient rather than adversarial.',
    related: ['creditors-rights', 'commercial-real-estate', 'securities-private-capital'],
    /* Year-bound volume figure. The firm has confirmed these figures for 2026.
       The year is stated and must remain stated — this is a single-year figure,
       not a standing or annual claim. Do not restate it as "annually" or drop
       the year without confirming what the revised wording would assert. */
    experienceNote:
      'In 2026 alone, the firm’s real estate finance practice advised lenders and borrowers on more than $5 billion in loan originations across approximately 225 transactions spanning 45 states.',
    metaTitle: 'Commercial Real Estate Finance & Lending Attorneys | Atlanta',
    metaDescription:
      'Lender\'s counsel and borrower\'s counsel for commercial real estate finance: construction loans, bridge, permanent, agency and CMBS financing, mezzanine debt, preferred equity, intercreditor agreements, assumptions and loan modifications.',
    artwork: 'strata',
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'securities-private-capital',
    name: 'Securities & Private Capital',
    shortName: 'Securities & Private Capital',
    summary:
      'Private offerings, real estate syndications, fund formation and sponsor structuring under Regulation D and related exemptions.',
    lede: 'We advise sponsors, fund managers and issuers raising private capital — structuring the vehicle, preparing the offering documents and keeping the raise inside the exemption it relies on.',
    overview: [
      'We advise sponsors, syndicators, fund managers, family offices and investors raising and deploying private capital. The work covers deal-by-deal equity for single-asset acquisitions, programmatic vehicles that acquire on a continuing basis, and the joint ventures through which institutional and family-office capital invests alongside operating partners.',
      'Offerings are conducted under Regulation D, principally Rules 506(b) and 506(c). We structure the issuer and management entities, prepare private placement memoranda and offering materials, draft the operating and limited partnership agreements that govern control and economics, prepare subscription documents and investor questionnaires, and handle Form D and Blue Sky notice filings.',
      'Economics and control are negotiated in the same documents. Promote and waterfall structures, preferred returns, capital call and dilution mechanics, major decision rights, transfer restrictions and exit provisions are drafted so that the sponsor and investor positions remain workable if an asset underperforms its projections rather than only if it meets them.',
      'Sponsors whose programs grow encounter a further set of questions: whether a vehicle is excluded from the Investment Company Act, whether the sponsor’s activities implicate investment adviser status, how separate offerings are integrated, and where the line falls between a permissible raise and unregistered broker activity. We advise on those questions as a program develops rather than in response to them.',
    ],
    capabilities: [
      {
        title: 'Private Offerings',
        items: [
          'Regulation D offerings',
          'Rule 506(b) offerings',
          'Rule 506(c) offerings and accredited investor verification',
          'Regulation S considerations',
          'Form D and Blue Sky notice filings',
          'General solicitation and advertising review',
          'Investor suitability and disclosure practices',
        ],
      },
      {
        title: 'Real Estate Syndication',
        items: [
          'Single-asset syndication structures',
          'Multi-asset and programmatic vehicles',
          'Sponsor promote and waterfall design',
          'Capital call and default mechanics',
          'Co-sponsor and joint sponsor arrangements',
          'Programmatic joint ventures with operating partners',
          'Family office co-investment and retained GP structures',
          'Institutional private-equity joint venture vehicles',
          'Investor reporting and distribution frameworks',
        ],
      },
      {
        title: 'Fund Formation',
        items: [
          'Private investment fund formation',
          'Debt funds and credit vehicles',
          'Real estate equity funds',
          'Feeder and parallel fund structures',
          'General partner and management company structuring',
          'Carried interest and incentive arrangements',
          'Side letters and most-favored-nation provisions',
        ],
      },
      {
        title: 'Offering Documents',
        items: [
          'Private placement memoranda',
          'Operating agreements and LP agreements',
          'Subscription agreements and investor questionnaires',
          'Risk factor drafting',
          'Investor presentations and marketing material review',
          'Management and administrative services agreements',
          'Amendments, consents and restructurings',
        ],
      },
      {
        title: 'Securities Compliance',
        items: [
          'Exemption analysis and preservation',
          'Investment Company Act exclusions',
          'Investment adviser status considerations',
          'Broker-dealer and finder issues',
          'Integration and aggregation analysis',
          'Ongoing disclosure and reporting obligations',
          'Remediation of offering defects',
        ],
      },
      {
        title: 'Private Capital Transactions',
        items: [
          'Preferred equity investments',
          'Convertible and structured instruments',
          'Secondary transfers of investor interests',
          'Recapitalizations and continuation vehicles',
          'Investor redemptions and withdrawals',
          'Sponsor transitions and removals',
        ],
      },
    ],
    highlights: [
      'Regulation D',
      'Syndications',
      'Fund formation',
      'Sponsor structuring',
      'Offering documents',
    ],
    panel:
      'An offering document is a governance instrument first and a marketing instrument second. We draft it so that it still works three years in, when the numbers look different than the projections.',
    related: ['commercial-real-estate', 'corporate-business', 'lending-finance'],
    metaTitle: 'Securities & Private Capital Attorneys | Syndication & Fund Formation',
    metaDescription:
      'Counsel for private securities offerings, real estate syndications, Regulation D Rule 506(b) and 506(c) raises, fund formation, sponsor structuring, private placement memoranda and investor documentation.',
    artwork: 'grid',
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'corporate-business',
    name: 'Corporate & Business Transactions',
    shortName: 'Corporate & Business',
    summary:
      'Entity formation and governance, LLC and partnership agreements, joint ventures, M&A and the commercial agreements that run a business.',
    lede: 'We serve as transactional counsel to closely held companies, sponsors and entrepreneurs — forming the entity, papering the relationships among owners, and executing the transactions that change them.',
    overview: [
      'We act as transactional counsel to privately held companies, sponsors, investors and entrepreneurs — forming the entity, documenting the relationships among its owners, and executing the transactions that change them.',
      'Transactional work includes asset purchases, stock purchases and membership-interest purchases, mergers and reorganizations, and the diligence, disclosure schedules, indemnification provisions and post-closing adjustments that accompany them. We represent middle-market businesses in acquisitions and in strategic growth transactions, including those carrying securities-law considerations, and handle equity buyouts and the restructuring of entities and investor positions that follow them.',
      'Entity and governance work covers formation and selection in Georgia and Delaware, holding company and subsidiary structures, LLC operating agreements, partnership and shareholder agreements, buy-sell provisions, and the admission, transfer, redemption and separation events that follow. Where a client operates several ventures, the structures are built so that assets, liabilities and tax attributes stay where they were intended.',
      'For clients without in-house counsel, the firm serves as outside general counsel on the matters that recur between transactions — commercial leases, operating agreements, contracts, employment documentation, entity maintenance and general corporate questions. The firm also documents credit facilities and structured financing arrangements for corporate borrowers.',
    ],
    capabilities: [
      {
        title: 'Formation & Structuring',
        items: [
          'Limited liability company formation',
          'Limited partnership and corporation formation',
          'Georgia and Delaware entity selection',
          'Holding company and subsidiary structures',
          'Special purpose entities',
          'Series and segregated structures',
          'Entity conversions, mergers and domestications',
          'Foreign qualification and maintenance',
        ],
      },
      {
        title: 'Owner Agreements',
        items: [
          'LLC operating agreements',
          'Partnership agreements',
          'Shareholder agreements',
          'Buy-sell agreements',
          'Voting agreements and proxies',
          'Deadlock and dispute resolution mechanics',
          'Admission, transfer and redemption provisions',
          'Non-competition and restrictive covenants',
        ],
      },
      {
        title: 'Mergers & Acquisitions',
        items: [
          'Asset purchase agreements',
          'Stock and membership-interest purchase agreements',
          'Mergers and reorganizations',
          'Letters of intent and term sheets',
          'Legal due diligence and disclosure schedules',
          'Representations, warranties and indemnification',
          'Earnouts and post-closing adjustments',
          'Escrow and holdback arrangements',
          'Equity buyouts and investor restructuring',
          'Rollover equity and management incentives',
        ],
      },
      {
        title: 'Joint Ventures',
        items: [
          'Joint venture formation and documentation',
          'Capital and contribution structures',
          'Governance, control and major decisions',
          'Distribution waterfalls and promote structures',
          'Exit rights, buy-sell and forced sale mechanics',
          'Strategic alliances and co-development arrangements',
        ],
      },
      {
        title: 'Governance',
        items: [
          'Board and manager governance frameworks',
          'Officer authority and delegation',
          'Consents, resolutions and minute books',
          'Fiduciary duty structuring and waivers',
          'Conflict of interest and related-party procedures',
          'Entity clean-up and remediation',
        ],
      },
      {
        title: 'Commercial Agreements',
        items: [
          'Master services and supply agreements',
          'Commercial leases',
          'Distribution and reseller agreements',
          'Licensing and technology agreements',
          'Management and consulting agreements',
          'Employment, offer letter and separation agreements',
          'Confidentiality and non-disclosure agreements',
          'Guaranties, indemnities and settlement agreements',
        ],
      },
      {
        title: 'Outside General Counsel',
        items: [
          'Ongoing general corporate counsel',
          'Contract review and negotiation programs',
          'Entity maintenance and annual filings',
          'Employment and personnel documentation',
          'Commercial lease review for operating businesses',
          'Corporate credit facility and structured financing documentation',
          'Strategic and transactional planning support',
        ],
      },
    ],
    highlights: [
      'Entity formation',
      'Operating agreements',
      'M&A',
      'Joint ventures',
      'Outside general counsel',
    ],
    panel:
      'The operating agreement is the constitution of a closely held business. We negotiate it against the events that test it — deadlock, a failed capital call, an owner’s exit.',
    related: ['securities-private-capital', 'commercial-litigation', 'commercial-real-estate'],
    metaTitle: 'Corporate & Business Transaction Attorneys | Atlanta',
    metaDescription:
      'Atlanta corporate counsel for entity formation and structuring, LLC and partnership agreements, joint ventures, mergers and acquisitions, governance and commercial contracts.',
    artwork: 'lattice',
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'commercial-litigation',
    name: 'Commercial Litigation',
    shortName: 'Commercial Litigation',
    summary:
      'Business, real estate, partnership and investor disputes — including emergency relief and matters that require immediate action.',
    lede: 'We represent businesses, owners, investors and sponsors in commercial disputes, including matters requiring emergency relief. Our litigators come to a case with the transactional context that produced it.',
    overview: [
      'We represent businesses, owners, investors and sponsors in commercial disputes, including many that arise from the transactions the firm’s other practices document. Understanding how a deal was structured is what makes a litigation strategy proportionate to the business problem underneath it.',
      'Matters have included claims of breach of fiduciary duty, fraud, breach of contract and dilution of ownership interests involving closely held real estate companies, and landlord-tenant and commercial leasing disputes on behalf of retail ownership. The firm also handles commercial collection litigation for financial institutions and investment managers, including replevin, repossession of collateral, fraudulent-transfer claims and post-judgment collection proceedings.',
      'We assess a dispute commercially before assessing it procedurally: what the client needs, the realistic range of outcomes, what the matter will cost to pursue, and whether the objective is better reached through injunctive relief, negotiated resolution or judgment. That assessment is given at the outset and revisited as a case develops.',
      'Where a matter requires immediate action, we pursue temporary restraining orders, interlocutory injunctions, the appointment of receivers and other prejudgment remedies, and we coordinate that relief with the underlying transactional file rather than separately from it.',
    ],
    capabilities: [
      {
        title: 'Business Disputes',
        items: [
          'Breach of contract claims and defense',
          'Business torts and unfair competition',
          'Fraud and misrepresentation claims',
          'Restrictive covenant and trade secret disputes',
          'Indemnification and guaranty enforcement',
          'Post-closing and earnout disputes',
          'Commercial collection litigation',
          'Replevin and repossession of collateral',
          'Fraudulent-transfer claims',
        ],
      },
      {
        title: 'Real Estate Disputes',
        items: [
          'Purchase and sale agreement disputes',
          'Specific performance actions',
          'Earnest money and escrow disputes',
          'Title, boundary and easement disputes',
          'Construction and development disputes',
          'Landlord-tenant and lease disputes',
          'Property management disputes',
        ],
      },
      {
        title: 'Ownership & Partnership',
        items: [
          'Partnership and member disputes',
          'Shareholder and LLC deadlock',
          'Fiduciary duty claims',
          'Books and records demands',
          'Judicial dissolution and separation',
          'Buy-sell and valuation disputes',
          'Manager and sponsor removal disputes',
        ],
      },
      {
        title: 'Investor Disputes',
        items: [
          'Investor claims against sponsors',
          'Sponsor defense',
          'Distribution and waterfall disputes',
          'Capital call and dilution disputes',
          'Offering document and disclosure disputes',
          'Redemption and withdrawal disputes',
        ],
      },
      {
        title: 'Emergency Relief',
        items: [
          'Temporary restraining orders',
          'Preliminary and interlocutory injunctions',
          'Receivership applications',
          'Asset freezes and prejudgment remedies',
          'Lis pendens and notice filings',
          'Expedited discovery',
          'Emergency closing and escrow relief',
        ],
      },
      {
        title: 'Resolution',
        items: [
          'Pre-suit demand and negotiation',
          'Mediation and settlement conferences',
          'Arbitration and alternative dispute resolution',
          'Bench and jury trials',
          'Post-judgment enforcement and collection',
          'Appeals coordination',
        ],
      },
    ],
    highlights: [
      'Business disputes',
      'Real estate litigation',
      'Partnership disputes',
      'Investor disputes',
      'Emergency relief',
    ],
    panel:
      'We evaluate a dispute the way our clients do — against the cost, the timeline and the commercial objective, not simply against the pleading standard.',
    related: ['creditors-rights', 'corporate-business', 'commercial-real-estate'],
    metaTitle: 'Commercial Litigation Attorneys | Business & Real Estate Disputes',
    metaDescription:
      'Atlanta commercial litigation counsel for business disputes, real estate litigation, partnership and member disputes, investor disputes, contract claims and emergency injunctive relief.',
    artwork: 'aperture',
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'creditors-rights',
    name: "Creditors' Rights & Special Situations",
    shortName: "Creditors' Rights",
    summary:
      'Loan enforcement, foreclosure, receiverships, workouts, restructurings and distressed real estate.',
    lede: 'We represent lenders, servicers, investors and owners in defaulted and distressed situations — enforcing secured obligations, negotiating workouts, and acquiring or repositioning troubled assets.',
    overview: [
      'We represent lenders, servicers, credit funds, note purchasers and investors in defaulted and distressed situations — evaluating collateral position, confirming enforceability, preserving remedies, and choosing among forbearance, modification, foreclosure, receivership and negotiated transfer. When a loan stops performing the range of outcomes narrows quickly, and the sequence in which those decisions are taken determines what remains available.',
      'The firm serves as foreclosure counsel to lenders and investors on commercial real estate collateral, and handles loan workouts and commercial collection matters for financial institutions and investment managers, including replevin, repossession of collateral, fraudulent-transfer litigation and post-judgment collection proceedings.',
      'On the investment side, we represent purchasers structuring and acquiring distressed loan portfolios, and creditors pursuing collection and recovery against distressed assets, including sales of loan portfolios. We also represent borrowers, sponsors and guarantors in the same situations.',
      'Because the firm also originates and documents commercial loans, a distressed file is read the way it was written — against recourse carve-out triggers, cash management provisions, transfer covenants, perfection, and the intercreditor terms that govern what a subordinate lender or preferred equity investor may actually do.',
    ],
    capabilities: [
      {
        title: 'Enforcement',
        items: [
          'Commercial foreclosure (non-judicial and judicial)',
          'Enforcement of secured obligations',
          'Guaranty and recourse carve-out enforcement',
          'UCC Article 9 sales of equity collateral',
          'Confirmation proceedings and deficiency claims',
          'Assignment of rents enforcement',
          'Default notices and remedy preservation',
        ],
      },
      {
        title: 'Receiverships',
        items: [
          'Receivership applications and orders',
          'Receiver selection and coordination',
          'Operating and rent collection authority',
          'Receiver sales of real property',
          'Turnover and accounting disputes',
          'Discharge and termination',
        ],
      },
      {
        title: 'Workouts & Restructuring',
        items: [
          'Pre-negotiation agreements',
          'Forbearance agreements',
          'Loan modifications and extensions',
          'Discounted payoffs',
          'Deed in lieu of foreclosure',
          'Consensual transfers of collateral',
          'Recapitalizations and rescue capital',
          'Capital stack restructurings',
        ],
      },
      {
        title: 'Distressed Investment',
        items: [
          'Note and loan portfolio purchases',
          'Loan portfolio sales and dispositions',
          'Distressed asset acquisitions',
          'Loan-to-own strategies',
          'Foreclosure bidding and credit bids',
          'REO acquisition and disposition',
          'Post-acquisition repositioning and financing',
        ],
      },
      {
        title: 'Bankruptcy-Related Matters',
        items: [
          'Secured creditor representation',
          'Relief from stay motions',
          'Cash collateral and adequate protection',
          'Proofs of claim and claim objections',
          'Single asset real estate cases',
          'Plan treatment of secured claims',
          'Section 363 sales',
        ],
      },
      {
        title: 'Diligence & Position Review',
        items: [
          'Loan file and collateral audits',
          'Perfection and priority review',
          'Enforceability and defect analysis',
          'Intercreditor and subordination analysis',
          'Title and lien position review',
          'Remedy sequencing and strategy memoranda',
        ],
      },
    ],
    highlights: [
      'Foreclosure',
      'Receiverships',
      'Workouts',
      'Distressed real estate',
      'Loan enforcement',
    ],
    panel:
      'Distressed matters are decided in the loan file. The first thing we do is confirm that the documents support the remedy the client intends to pursue.',
    related: ['lending-finance', 'commercial-litigation', 'commercial-real-estate'],
    metaTitle: "Creditors' Rights, Foreclosure & Special Situations Attorneys",
    metaDescription:
      'Counsel for commercial foreclosure, loan enforcement, receiverships, workouts, restructurings, distressed real estate, deeds in lieu and enforcement of secured obligations in Atlanta and Georgia.',
    artwork: 'tower',
  },
];

/* ---- Lookups ------------------------------------------------------------- */

export const practiceSlugs = practices.map((p) => p.slug);

export function getPractice(slug: string): Practice | undefined {
  return practices.find((p) => p.slug === slug);
}

export function getPractices(slugs: readonly string[]): Practice[] {
  return slugs
    .map((slug) => practices.find((p) => p.slug === slug))
    .filter((p): p is Practice => Boolean(p));
}

export function practiceName(slug: string): string {
  return getPractice(slug)?.name ?? slug;
}
