/* --------------------------------------------------------------------------
   The people of Robinson Franzman LLP.

   NOTHING IN THIS FILE IS INVENTED.

   Every name, title, email address, telephone number, portrait, biography,
   practice area, credential and professional activity below was supplied by the
   firm. Where the firm has not supplied something it is left empty, and every
   section that consumes it renders nothing at all rather than a placeholder.
   Notably absent on purpose: education and admissions for Adrienne Washington
   and Zach Cohen, any bar admission for Taylor Evers, and everything beyond
   name, title and portrait for Arslan Munaf.

   Three groups, deliberately kept distinct so that no one is presented as
   something they are not:

     attorneys           the firm's attorneys; each has a profile page
     legalProfessionals  legal staff who are not attorneys — currently empty
     staff               administrative and professional staff

   Portraits live in /public/images/team/ and are referenced by file name.
   -------------------------------------------------------------------------- */

export type CredentialItem = {
  primary: string;
  secondary?: string;
  /** Sub-entries, e.g. journal roles beneath a law degree. */
  details?: string[];
};

export type PersonGroup = 'attorney' | 'legal-professional' | 'staff';

/** Everything the firm has actually supplied about a person. */
export type Person = {
  slug: string;
  name: string;
  /** Sort key — last name first. */
  sortName: string;
  title: string;
  /**
   * A qualification shown as a footnote directly beneath the title. The title
   * itself is stored clean — the asterisk that links the two is rendered by the
   * card and the profile — so structured data, page metadata and the search
   * index carry the job title without stray punctuation.
   */
  titleNote?: string;
  group: PersonGroup;
  /** Omitted entirely when the firm has not supplied an address. */
  email?: string;
  emailHref?: string;
  /** Omitted entirely when the firm has not supplied a direct number. */
  phone?: string;
  phoneHref?: string;
  /**
   * Path under /public. Omitted entirely when the firm has not supplied a
   * photograph — the card and profile then render the site's generated artwork
   * rather than a stand-in portrait of someone who has not been photographed.
   */
  portrait?: string;
  /** Alt text for the portrait, written for screen readers. */
  portraitAlt?: string;
};

/**
 * An attorney. Every credential array renders as its own profile section when
 * it has entries and is omitted entirely when it does not.
 */
export type Attorney = Person & {
  group: 'attorney';
  /** Drives directory order; the firm's own hierarchy. */
  rank: 'managing-partner' | 'partner' | 'of-counsel' | 'associate' | 'title-agency';
  /**
   * Shown on the profile page in place of the credential body when the firm has
   * not yet supplied any of it. Written for the public — never a developer note.
   */
  profileNote?: string;
  /**
   * The firm's own practice groups this attorney belongs to. Every entry must
   * name one of the six practice pages — this list drives both the Practice
   * Areas section and the practice-page team rosters, so an entry that maps to
   * nothing would render as a practice the site does not have.
   */
  practiceAreas: string[];
  /**
   * Narrower descriptions of the attorney's work — asset types, transaction
   * types, lending programs. Displayed as plain text under their own heading
   * and deliberately never linked: they describe experience, not practice
   * groups, and the site has no page for them.
   */
  focusAreas: string[];
  /**
   * Slugs of this site's practice pages, derived from `practiceAreas`.
   */
  practices: string[];
  /** Biography paragraphs. */
  overview: string[];
  /** Representative experience — matters and matter types, as supplied. */
  experience: string[];
  /**
   * Prior positions held. Kept separate from `experience` so employment
   * history is never presented under a representative-matters heading.
   */
  priorExperience: string[];
  admissions: CredentialItem[];
  education: CredentialItem[];
  recognition: CredentialItem[];
  professionalActivities: CredentialItem[];
  publications: CredentialItem[];
  speaking: CredentialItem[];
  /** Matter ids from content/matters.ts. Empty until supplied. */
  matters: string[];
  /** Professional profile URL. Empty string hides the link. */
  linkedin: string;
};

/** `470-990-9055` -> `tel:+14709909055`. */
function tel(phone: string): string {
  return `tel:+1${phone.replace(/\D/g, '')}`;
}

function portrait(file: string, name: string) {
  return {
    portrait: `/images/team/${file}`,
    portraitAlt: `Portrait of ${name}`,
  };
}

/** Sections nobody has supplied yet; overridden per person below. */
const DEFAULTS = {
  practiceAreas: [] as string[],
  focusAreas: [] as string[],
  overview: [] as string[],
  experience: [] as string[],
  priorExperience: [] as string[],
  admissions: [] as CredentialItem[],
  education: [] as CredentialItem[],
  recognition: [] as CredentialItem[],
  professionalActivities: [] as CredentialItem[],
  publications: [] as CredentialItem[],
  speaking: [] as CredentialItem[],
  matters: [] as string[],
  linkedin: '',
};

/**
 * The only practice areas that correspond to a practice page on this site. An
 * area not listed here is still displayed — it simply is not linked, because no
 * such page exists and one must not be implied.
 */
const PRACTICE_PAGE_BY_AREA: Record<string, string> = {
  'Commercial Real Estate': 'commercial-real-estate',
  'Lending & Finance': 'lending-finance',
  'Securities & Private Capital': 'securities-private-capital',
  'Corporate & Business': 'corporate-business',
  'Commercial Litigation': 'commercial-litigation',
  'Creditors’ Rights': 'creditors-rights',
};

/* ---- Attorneys ----------------------------------------------------------- */

type AttorneyEntry = Omit<Attorney, 'practices'>;

const attorneyEntries: AttorneyEntry[] = [
  {
    slug: 'todd-robinson',
    name: 'Todd Robinson',
    sortName: 'Robinson, Todd',
    title: 'Managing Partner',
    group: 'attorney',
    rank: 'managing-partner',
    email: 'todd@rfllplaw.com',
    emailHref: 'mailto:todd@rfllplaw.com',
    phone: '470-990-9055',
    phoneHref: tel('470-990-9055'),
    ...portrait('todd-robinson.jpg', 'Todd Robinson'),
    ...DEFAULTS,
    overview: [
      'Todd Robinson is a founding partner and Managing Partner of Robinson Franzman LLP. His practice focuses on commercial real estate, real estate finance, private equity, securities, financial services, corporate transactions, and complex commercial litigation.',
      'Todd represents clients in multifamily acquisitions and development, commercial real estate finance, private equity investments, commercial real estate development and investment, and general corporate and business matters. His practice allows him to advise clients across multiple sides of a transaction, including acquisitions, dispositions, financing, investment structuring, and capital formation.',
      'Todd also advises sponsors and investors in structuring and negotiating private equity real estate investments, including joint ventures, investment syndications, waterfalls, preferred returns, private placements, and securities compliance.',
      'His clients have included multifamily investment firms, family offices, commercial real estate developers, community and regional banks, institutional non-bank lenders, investment and asset managers, REITs, commercial real estate investors, and business owners.',
      'In addition to his transactional practice, Todd has represented clients in federal and state court in complex commercial disputes involving investment disputes, landlord-tenant matters, alleged breaches of fiduciary duties, fraud claims, and lender liability.',
      'Before founding Robinson Franzman LLP, Todd practiced commercial real estate and commercial litigation at major Atlanta law firms.',
    ],
    practiceAreas: [
      'Commercial Real Estate',
      'Lending & Finance',
      'Securities & Private Capital',
      'Corporate & Business',
      'Commercial Litigation',
      'Creditors’ Rights',
    ],
    focusAreas: [
      'Multifamily Acquisitions and Development',
      'Commercial Real Estate Finance',
      'Private Equity',
      'Investment Syndications',
    ],
    experience: [
      'Investment disputes',
      'Landlord-tenant disputes',
      'Breach of fiduciary duty matters',
      'Fraud-related disputes',
      'Lender liability matters',
      'Multifamily acquisitions and development',
      'Real estate syndications and private investment structures',
      'Commercial lending and financing transactions',
    ],
    education: [
      {
        primary: 'Emory University School of Law',
        secondary: 'J.D., Top 20%, Moot Court Society',
      },
      { primary: 'University of Georgia', secondary: 'Bachelor of Social Work' },
    ],
    admissions: [{ primary: 'State Bar of Georgia' }],
  },
  {
    slug: 'carl-franzman',
    name: 'Carl Franzman',
    sortName: 'Franzman, Carl',
    title: 'Partner',
    group: 'attorney',
    rank: 'partner',
    email: 'carl@rfllplaw.com',
    emailHref: 'mailto:carl@rfllplaw.com',
    phone: '470-990-9052',
    phoneHref: tel('470-990-9052'),
    ...portrait('carl-franzman.jpg', 'Carl Franzman'),
    ...DEFAULTS,
    overview: [
      'Carl Franzman is a native of Atlanta and practices primarily in commercial real estate and commercial lending. He has particular experience assisting businesses and lenders in connection with U.S. Small Business Administration 504 and 7(a) loans.',
      'Carl is an approved attorney with several national title insurance underwriters, enabling him to provide clients with a broad range of commercial real estate title and closing services.',
      'Carl has practiced law in Georgia since 1994 and previously operated Carl J. Franzman, P.C.',
    ],
    practiceAreas: ['Commercial Real Estate', 'Lending & Finance'],
    focusAreas: [
      'SBA 504 Loans',
      'SBA 7(a) Loans',
      'Real Estate Title and Closing Services',
    ],
    education: [
      { primary: 'Georgia State University College of Law', secondary: 'J.D., 1994' },
      { primary: 'University of Georgia', secondary: 'A.B.J., Journalism, 1987' },
    ],
    admissions: [
      { primary: 'State Bar of Georgia' },
      { primary: 'Real Property Section, State Bar of Georgia' },
      { primary: 'International Council of Shopping Centers' },
    ],
    professionalActivities: [
      { primary: 'Capital Partners Certified Development Company', secondary: 'Board Member' },
      { primary: 'Epic Community Impact Fund', secondary: 'Advisory Board Member' },
    ],
  },
  {
    slug: 'nicholas-moore',
    name: 'Nicholas Moore',
    sortName: 'Moore, Nicholas',
    title: 'Partner',
    group: 'attorney',
    rank: 'partner',
    email: 'nick@rfllplaw.com',
    emailHref: 'mailto:nick@rfllplaw.com',
    phone: '470-990-9053',
    phoneHref: tel('470-990-9053'),
    ...portrait('nicholas-moore.jpg', 'Nicholas Moore'),
    ...DEFAULTS,
    overview: [
      'Nicholas “Nick” Moore is a partner whose practice focuses on commercial real estate, private equity, corporate transactions, and securities matters involving income-producing real estate.',
      'Nick represents developers, owners, syndicators, general partners, limited partners, and investors in acquisitions, dispositions, development, leasing, financing, joint ventures, investment syndications, and private investment structures.',
      'He regularly advises clients regarding real estate private equity funds, private placements, investment companies, securities matters, and sophisticated commercial transactions.',
    ],
    practiceAreas: [
      'Commercial Real Estate',
      'Securities & Private Capital',
      'Corporate & Business',
    ],
    /* "Complex Litigation" was removed at the firm's direction: it mapped to no
       practice page and his biography describes no litigation practice. */
    focusAreas: [
      'Private Equity',
      'Investment Syndications',
      'Mergers & Acquisitions',
      'Joint Ventures',
      'Commercial Transactions',
    ],
    education: [
      {
        primary: 'Georgia State University College of Law',
        secondary: 'J.D., Top 20%, Moot Court Society',
      },
      {
        primary: 'Kennesaw State University',
        secondary: 'B.S., Political Science and Economics',
      },
    ],
    admissions: [{ primary: 'State Bar of Georgia' }],
    recognition: [
      {
        primary: 'Georgia Super Lawyers Rising Stars',
        secondary: 'Business/Corporate, beginning in 2021',
      },
    ],
  },
  {
    slug: 'matt-smith',
    name: 'Matt Smith',
    sortName: 'Smith, Matt',
    title: 'Partner',
    group: 'attorney',
    rank: 'partner',
    email: 'matt@rfllplaw.com',
    emailHref: 'mailto:matt@rfllplaw.com',
    phone: '470-828-4360',
    phoneHref: tel('470-828-4360'),
    ...portrait('matt-smith.jpg', 'Matt Smith'),
    ...DEFAULTS,
    overview: [
      'Matt Smith is a partner whose practice focuses on commercial real estate, real estate finance, secured lending, and government-guaranteed lending.',
      'Matt has significant experience representing banks, lending institutions, businesses, and real estate clients in commercial real estate transactions and secured loan transactions. His experience includes acquisitions, financing, and dispositions of commercial and residential real estate as well as SBA and other government-guaranteed lending matters.',
      'Matt joined Robinson Franzman LLP as a partner to expand the firm’s real estate finance and government-guaranteed lending practice.',
    ],
    practiceAreas: ['Lending & Finance', 'Commercial Real Estate', 'Corporate & Business'],
    focusAreas: [
      'Real Estate Finance',
      'Secured Lending',
      'SBA and Government-Guaranteed Lending',
    ],
    education: [
      {
        primary: 'University of Georgia School of Law',
        secondary: 'J.D., cum laude, 2002',
        details: [
          'Editorial Board, Georgia Journal of International and Comparative Law',
          'Notes Editor',
        ],
      },
      {
        primary: 'University of Georgia Terry College of Business',
        secondary:
          'B.B.A., International Business, concentration in Finance, cum laude, 1997',
      },
    ],
    admissions: [
      { primary: 'State Bar of Georgia', secondary: 'Admitted 2002' },
      { primary: 'Real Property Law Section, State Bar of Georgia' },
      { primary: 'Georgia Quality Lenders Circle' },
    ],
  },
  {
    slug: 'christopher-berney',
    name: 'Christopher Berney',
    sortName: 'Berney, Christopher',
    title: 'Partner',
    group: 'attorney',
    rank: 'partner',
    email: 'cberney@rfllplaw.com',
    emailHref: 'mailto:cberney@rfllplaw.com',
    phone: '404-881-6010',
    phoneHref: tel('404-881-6010'),
    ...portrait('christopher-berney.jpg', 'Christopher Berney'),
    ...DEFAULTS,
    overview: [
      'Christopher Berney has represented businesses, entrepreneurs, and creative professionals for more than 25 years. His practice focuses on business law, contracts, commercial matters, and litigation.',
      'Chris brings an entrepreneurial perspective to his legal practice, having experience operating his own businesses as well as representing business owners. He advises clients regarding legal structures, contracts, disputes, and other issues arising in the operation and growth of privately held businesses.',
    ],
    practiceAreas: [
      'Corporate & Business',
      'Commercial Litigation',
      'Creditors’ Rights',
    ],
    focusAreas: ['Business Contracts and Agreements', 'General Business Counsel'],
    /* Prior positions, not client matters — kept out of `experience` so they are
       never rendered under a representative-matters heading. */
    priorExperience: [
      'Managing Attorney, Christopher P. Berney, P.C.',
      'Attorney, Smith, White, Sharma & Halpern',
    ],
    education: [
      { primary: 'Drake University Law School', secondary: 'J.D., 1995' },
      { primary: 'Drake University', secondary: 'M.B.A., 1992' },
      {
        primary: 'Drake University',
        secondary: 'B.A., Advertising & Public Relations, 1990',
      },
    ],
    admissions: [
      { primary: 'State Bar of Georgia' },
      { primary: 'Atlanta Bar Association, Business Law Section' },
      { primary: 'Atlanta Bar Association, Solo & Small Firm Section' },
      { primary: 'American Bar Association' },
    ],
  },
  {
    slug: 'raymond-kearns',
    name: 'Raymond Kearns',
    sortName: 'Kearns, Raymond',
    title: 'Partner',
    group: 'attorney',
    rank: 'partner',
    email: 'raymond@rfllplaw.com',
    emailHref: 'mailto:raymond@rfllplaw.com',
    phone: '404-996-6723',
    phoneHref: tel('404-996-6723'),
    ...portrait('raymond-kearns.jpg', 'Raymond Kearns'),
    ...DEFAULTS,
    /* Rewritten to the facts the project verifies — his practice areas and his
       1980 Georgia admission. The prior text asserted "decades of experience"
       and "significant institutional knowledge", neither of which is supported
       by any source material in the project. */
    overview: [
      'Raymond Kearns is a partner whose practice focuses on commercial real estate and commercial transactions. He has practiced in Georgia since 1980 and advises clients in connection with real estate transactions and related commercial matters.',
    ],
    practiceAreas: ['Commercial Real Estate'],
    focusAreas: ['Real Estate Transactions', 'Commercial Law'],
    education: [
      { primary: 'University of Georgia', secondary: 'J.D., 1980' },
      { primary: 'University of Georgia', secondary: 'B.A., 1977' },
    ],
    admissions: [{ primary: 'State Bar of Georgia', secondary: 'Admitted 1980' }],
  },
  {
    /* Name, title and portrait are all the firm has supplied. No email, phone,
       biography, practice area or credential is asserted — the profile renders
       the note below instead, and every empty section omits itself. */
    slug: 'arslan-munaf',
    name: 'Arslan Munaf',
    sortName: 'Munaf, Arslan',
    title: 'Of Counsel',
    group: 'attorney',
    rank: 'of-counsel',
    /* The portrait file the firm supplied is named for the given name only. */
    ...portrait('arslan.jpg', 'Arslan Munaf'),
    ...DEFAULTS,
    profileNote: 'Additional profile information coming soon.',
  },
  {
    slug: 'tyler-lavender',
    name: 'Tyler Lavender',
    sortName: 'Lavender, Tyler',
    title: 'Associate Attorney',
    group: 'attorney',
    rank: 'associate',
    email: 'tyler@rfllplaw.com',
    emailHref: 'mailto:tyler@rfllplaw.com',
    phone: '470-990-9043',
    phoneHref: tel('470-990-9043'),
    ...portrait('tyler-lavender.jpg', 'Tyler Lavender'),
    ...DEFAULTS,
    overview: [
      'Tyler Lavender is an associate attorney at Robinson Franzman LLP whose practice focuses on commercial real estate and corporate matters.',
    ],
    practiceAreas: ['Commercial Real Estate', 'Corporate & Business'],
    education: [{ primary: 'Emory University School of Law' }],
    admissions: [{ primary: 'State Bar of Georgia' }],
  },
  {
    slug: 'adrienne-washington',
    name: 'Adrienne Washington',
    sortName: 'Washington, Adrienne',
    title: 'Associate Attorney',
    group: 'attorney',
    rank: 'associate',
    email: 'adrienne@rfllplaw.com',
    emailHref: 'mailto:adrienne@rfllplaw.com',
    phone: '470-922-5707',
    phoneHref: tel('470-922-5707'),
    ...portrait('adrienne-washington.jpg', 'Adrienne Washington'),
    ...DEFAULTS,
    overview: [
      'Adrienne Washington is an associate attorney in Robinson Franzman’s commercial real estate and corporate practice groups. She advises clients in connection with commercial real estate and business transactions.',
      'Prior to joining Robinson Franzman, Adrienne worked for the federal government.',
    ],
    practiceAreas: ['Commercial Real Estate', 'Corporate & Business'],
    /* Education and admissions withheld pending confirmation by the firm. */
  },
  {
    slug: 'zach-cohen',
    name: 'Zach Cohen',
    sortName: 'Cohen, Zach',
    title: 'Associate Attorney',
    group: 'attorney',
    rank: 'associate',
    email: 'zach@rfllplaw.com',
    emailHref: 'mailto:zach@rfllplaw.com',
    phone: '470-828-4389',
    phoneHref: tel('470-828-4389'),
    ...portrait('zach-cohen.jpg', 'Zach Cohen'),
    ...DEFAULTS,
    overview: [
      'Zach Cohen is an associate attorney whose practice focuses on commercial transactions, corporate matters, commercial real estate finance, investments, and related disputes.',
      'Prior to joining Robinson Franzman, Zach practiced at DLA Piper, where he gained corporate and mergers and acquisitions experience.',
    ],
    practiceAreas: [
      'Corporate & Business',
      'Commercial Real Estate',
      'Lending & Finance',
      'Commercial Litigation',
    ],
    focusAreas: [
      'Commercial Transactions',
      'Mergers & Acquisitions',
      'Commercial Real Estate Finance',
    ],
    /* Education and admissions withheld pending confirmation by the firm. */
  },
  {
    slug: 'taylor-evers',
    name: 'Taylor Evers',
    sortName: 'Evers, Taylor',
    title: 'Associate Attorney',
    titleNote: 'Pending bar completion',
    group: 'attorney',
    rank: 'associate',
    email: 'taylore@rfllplaw.com',
    emailHref: 'mailto:taylore@rfllplaw.com',
    phone: '770-799-8399',
    phoneHref: tel('770-799-8399'),
    ...portrait('taylor-evers.jpg', 'Taylor Evers'),
    ...DEFAULTS,
    overview: [
      'Taylor Evers focuses her work on commercial lending, corporate finance, commercial real estate, investments, and transactional matters.',
    ],
    practiceAreas: ['Lending & Finance', 'Commercial Real Estate', 'Corporate & Business'],
    focusAreas: ['Commercial Lending', 'Corporate Finance', 'Investments'],
    education: [
      { primary: 'Atlanta’s John Marshall Law School', secondary: 'J.D., 2026' },
    ],
    /* No bar admission: Taylor's admission is pending. */
  },
  {
    /* Title and practice areas supplied by the firm. Nothing else has been:
       no portrait, email, telephone, biography, education or admission. Each
       omitted field renders nothing, and the portrait falls back to the site's
       generated artwork rather than a stand-in photograph. */
    slug: 'chelsea-rierson',
    name: 'Chelsea Rierson',
    sortName: 'Rierson, Chelsea',
    title: 'Associate Attorney',
    group: 'attorney',
    rank: 'associate',
    ...DEFAULTS,
    practiceAreas: ['Creditors’ Rights', 'Commercial Litigation'],
    profileNote: 'Additional profile information coming soon.',
  },
  {
    slug: 'makishia-anderson',
    name: 'Ma’Kishia Anderson',
    sortName: 'Anderson, Ma’Kishia',
    title: 'Title Agency Manager & Attorney',
    group: 'attorney',
    rank: 'title-agency',
    email: 'makishia@cltitlecompany.com',
    emailHref: 'mailto:makishia@cltitlecompany.com',
    phone: '470-990-9049',
    phoneHref: tel('470-990-9049'),
    ...portrait('makishia-anderson.jpg', 'Ma’Kishia Anderson'),
    ...DEFAULTS,
    overview: [
      'Ma’Kishia Anderson is an Atlanta native whose practice and professional experience focus on commercial real estate title matters.',
      'She has practiced in Georgia since 2006 and has extensive experience reviewing title examinations, surveys, title commitments, and complex title issues affecting commercial real estate transactions.',
      'Ma’Kishia has worked with national title insurance underwriters and has substantial experience identifying and curing title defects, including issues arising in multi-state transactions. In her title agency role, she oversees the title process from examination through issuance of title policies.',
    ],
    practiceAreas: ['Commercial Real Estate'],
    focusAreas: [
      'Real Estate Title & Escrow Services',
      'Title Examination and Curative Matters',
    ],
    education: [
      {
        primary: 'Texas Southern University, Thurgood Marshall School of Law',
        secondary: 'J.D., 2006',
      },
      {
        primary: 'Georgia State University',
        secondary: 'Bachelor’s Degree, Business Administration',
      },
    ],
    admissions: [{ primary: 'State Bar of Georgia' }],
  },
];

/** The practice page a stated practice area links to, if any. */
export function practicePageForArea(area: string): string | undefined {
  return PRACTICE_PAGE_BY_AREA[area];
}

export const attorneys: Attorney[] = attorneyEntries.map((entry) => ({
  ...entry,
  practices: entry.practiceAreas
    .map((area) => PRACTICE_PAGE_BY_AREA[area])
    .filter((slug): slug is string => Boolean(slug)),
}));

/* ---- Other legal professionals ------------------------------------------
   Legal staff who are not attorneys. Empty at present; the directory omits the
   section entirely while it is, and restores it as soon as anyone is added. */

export const legalProfessionals: Person[] = [];

/* ---- Administrative & professional staff --------------------------------- */

export const staff: Person[] = [
  {
    slug: 'chris-echols',
    name: 'Chris Echols',
    sortName: 'Echols, Chris',
    title: 'Chief Operating Officer',
    group: 'staff',
    email: 'chris@rfllplaw.com',
    emailHref: 'mailto:chris@rfllplaw.com',
    phone: '470-990-9047',
    phoneHref: tel('470-990-9047'),
    ...portrait('chris-echols.jpg', 'Chris Echols'),
  },
  {
    slug: 'courtany-brown',
    name: 'Courtany Brown',
    sortName: 'Brown, Courtany',
    title: 'Sr. Paralegal',
    group: 'staff',
    email: 'courtany@rfllplaw.com',
    emailHref: 'mailto:courtany@rfllplaw.com',
    phone: '470-990-9050',
    phoneHref: tel('470-990-9050'),
    ...portrait('courtany-brown.jpg', 'Courtany Brown'),
  },
  {
    slug: 'mary-durniat',
    name: 'Mary Durniat',
    sortName: 'Durniat, Mary',
    title: 'Controller',
    group: 'staff',
    email: 'mary@rfllplaw.com',
    emailHref: 'mailto:mary@rfllplaw.com',
    phone: '470-828-4385',
    phoneHref: tel('470-828-4385'),
    ...portrait('mary-durniat.jpg', 'Mary Durniat'),
  },
  {
    slug: 'jan-suils',
    name: 'Jan Suils',
    sortName: 'Suils, Jan',
    title: 'Title Coordinator',
    group: 'staff',
    email: 'jan@cltitlecompany.com',
    emailHref: 'mailto:jan@cltitlecompany.com',
    phone: '470-990-9057',
    phoneHref: tel('470-990-9057'),
    ...portrait('jan-suils.jpg', 'Jan Suils'),
  },
  {
    slug: 'katie-richardson',
    name: 'Katie Richardson',
    sortName: 'Richardson, Katie',
    title: 'Paralegal',
    group: 'staff',
    email: 'katie@rfllplaw.com',
    emailHref: 'mailto:katie@rfllplaw.com',
    phone: '470-990-9042',
    phoneHref: tel('470-990-9042'),
    ...portrait('katie-richardson.jpg', 'Katie Richardson'),
  },
  {
    slug: 'jennifer-lammie',
    name: 'Jennifer Lammie',
    sortName: 'Lammie, Jennifer',
    title: 'Paralegal',
    group: 'staff',
    email: 'jennifer@rfllplaw.com',
    emailHref: 'mailto:jennifer@rfllplaw.com',
    phone: '470-828-4366',
    phoneHref: tel('470-828-4366'),
    ...portrait('jennifer-lammie.jpg', 'Jennifer Lammie'),
  },
  {
    slug: 'kimberly-calhoun',
    name: 'Kimberly Calhoun',
    sortName: 'Calhoun, Kimberly',
    title: 'Paralegal',
    group: 'staff',
    email: 'Kimberly@rfllplaw.com',
    emailHref: 'mailto:Kimberly@rfllplaw.com',
    phone: '470-990-9042',
    phoneHref: tel('470-990-9042'),
    ...portrait('kimberly-calhoun.jpg', 'Kimberly Calhoun'),
  },
  {
    slug: 'jadi-phillips',
    name: 'Jadi Phillips',
    sortName: 'Phillips, Jadi',
    title: 'Legal Assistant',
    group: 'staff',
    email: 'Jadi@rfllplaw.com',
    emailHref: 'mailto:Jadi@rfllplaw.com',
    phone: '470-990-9463',
    phoneHref: tel('470-990-9463'),
    ...portrait('jadi-phillips.jpg', 'Jadi Phillips'),
  },
  {
    slug: 'kayla-samuel',
    name: 'Kayla Samuel',
    sortName: 'Samuel, Kayla',
    title: 'Paralegal',
    group: 'staff',
    email: 'kay@rfllplaw.com',
    emailHref: 'mailto:kay@rfllplaw.com',
    phone: '470-990-9051',
    phoneHref: tel('470-990-9051'),
    ...portrait('kayla-samuel.jpg', 'Kayla Samuel'),
  },
  {
    slug: 'dora-jean-baptiste',
    name: 'Dora M. Jean Baptiste',
    sortName: 'Jean Baptiste, Dora M.',
    title: 'Office Services Coordinator',
    group: 'staff',
    email: 'dora@rfllplaw.com',
    emailHref: 'mailto:dora@rfllplaw.com',
    phone: '404-255-2503',
    phoneHref: tel('404-255-2503'),
    ...portrait('dora-jean-baptiste.jpg', 'Dora M. Jean Baptiste'),
  },
];

/** Everyone, in the order the firm lists them. */
export const team: Person[] = [...attorneys, ...legalProfessionals, ...staff];

/* ---- Lookups ------------------------------------------------------------- */

export const attorneySlugs = attorneys.map((a) => a.slug);

export function getAttorney(slug: string): Attorney | undefined {
  return attorneys.find((a) => a.slug === slug);
}

export function attorneysByPractice(practiceSlug: string): Attorney[] {
  return attorneys.filter((a) => a.practices.includes(practiceSlug));
}

const RANK_ORDER: Record<Attorney['rank'], number> = {
  'managing-partner': 0,
  partner: 1,
  'of-counsel': 2,
  associate: 3,
  'title-agency': 4,
};

/**
 * Directory order: the firm's hierarchy first, then alphabetical within a rank
 * so no one's position inside a tier is an editorial statement.
 */
export function sortedAttorneys(): Attorney[] {
  return [...attorneys].sort(
    (a, b) => RANK_ORDER[a.rank] - RANK_ORDER[b.rank] || a.sortName.localeCompare(b.sortName)
  );
}
