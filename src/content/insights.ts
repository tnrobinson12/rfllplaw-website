/* --------------------------------------------------------------------------
   Insights — editorial architecture

   The entries below are the firm's published commentary. They are general
   discussions of structure and documentation. They contain no client
   information, no matter descriptions, no outcomes, no rankings, no statistics
   and no citations to authority.

   Nothing here should be read as legal advice, and the article template renders
   the firm's standing informational notice beneath every piece.

   To add a piece:
     1. Add an entry to `insights` (newest first — the list is sorted by date).
     2. Write the body as blocks: { type: 'p' | 'h2' | 'ul', ... }.
     3. Associate `practices` so it surfaces on the relevant practice pages.
     4. Leave `authors` empty to attribute the piece to the firm, or add
        attorney slugs once the firm confirms authorship.
   -------------------------------------------------------------------------- */

export type Category = {
  slug: string;
  label: string;
  description: string;
};

export const categories: Category[] = [
  {
    slug: 'legal-updates',
    label: 'Legal Updates',
    description: 'Developments in law, regulation and market practice that affect our clients.',
  },
  {
    slug: 'articles',
    label: 'Articles',
    description: 'Longer-form commentary on structuring, documentation and negotiation.',
  },
  {
    slug: 'firm-news',
    label: 'Firm News',
    description: 'Announcements about the firm and its attorneys.',
  },
  {
    slug: 'deal-announcements',
    label: 'Deal Announcements',
    description: 'Selected transactions the firm has advised on.',
  },
  {
    slug: 'speaking-engagements',
    label: 'Speaking Engagements',
    description: 'Panels, presentations and conference appearances.',
  },
  {
    slug: 'publications',
    label: 'Publications',
    description: 'Articles and materials published by the firm’s attorneys.',
  },
  {
    slug: 'podcasts',
    label: 'Podcasts',
    description: 'Audio conversations on real estate, capital and enterprise.',
  },
];

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] };

export type Insight = {
  slug: string;
  title: string;
  /** Category slug. */
  category: string;
  /** ISO date — used for sorting, <time> and schema. */
  date: string;
  /** Card and meta-description text. One or two sentences. */
  excerpt: string;
  /** Reading time in minutes, or 0 to hide. */
  readingMinutes: number;
  /** Attorney slugs. Empty array renders "Robinson Franzman LLP". */
  authors: string[];
  /** Practice slugs this piece belongs to. */
  practices: string[];
  body: Block[];
};

export const insights: Insight[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: 'rule-506b-and-rule-506c-in-private-real-estate-offerings',
    title: 'Understanding Rule 506(b) and Rule 506(c) in Private Real Estate Offerings',
    category: 'articles',
    date: '2026-09-02',
    excerpt:
      'The choice between Rule 506(b) and Rule 506(c) governs how a sponsor may market an offering and who may invest in it. It is made early, and it is difficult to reverse once marketing has begun.',
    readingMinutes: 7,
    authors: [],
    practices: ['securities-private-capital', 'commercial-real-estate'],
    body: [
      {
        type: 'p',
        text: 'Most private real estate equity is raised without registering the offering with the Securities and Exchange Commission. That is possible because the offering is conducted under an exemption from registration, and in the great majority of real estate syndications, joint ventures and funds, that exemption is Rule 506 of Regulation D. Rule 506 offers two paths. The path a sponsor takes determines how the offering may be marketed, who may purchase, and what the sponsor must do to confirm that its investors qualify.',
      },
      { type: 'h2', text: 'What an exemption is, and what it is not' },
      {
        type: 'p',
        text: 'An interest in a limited liability company or limited partnership formed to acquire real estate is generally a security. Its offer and sale must be registered under the Securities Act of 1933 unless an exemption applies. Regulation D provides a set of safe harbors, and Rule 506 is the one most commonly used because it has no cap on the amount raised and because securities sold under it are treated as covered securities, which preempts state registration and merit review.',
      },
      {
        type: 'p',
        text: 'One framing point is worth stating plainly, because it is a common misunderstanding. An exemption is a set of conditions, not a filing. It is available only if the conditions are satisfied in connection with the offering itself. Filing a Form D does not create the exemption, and a sponsor that has conducted an offering in a way that fails the conditions cannot cure the problem by filing a form afterward.',
      },
      { type: 'h2', text: 'Rule 506(b): no general solicitation' },
      {
        type: 'p',
        text: 'Rule 506(b) permits a sponsor to raise capital from an unlimited number of accredited investors and, in addition, from a limited number of non-accredited purchasers who are sophisticated. In practice most sponsors accept only accredited investors, because admitting non-accredited purchasers triggers substantial affirmative disclosure obligations that begin to resemble those of a registered offering.',
      },
      {
        type: 'p',
        text: 'The defining constraint of Rule 506(b) is that the offering may not be conducted by general solicitation or general advertising. Publicly posting a deal on a website, promoting it on social media, presenting it at an event open to the public, or emailing people with whom the sponsor has no relationship are the kinds of activity that raise the question.',
      },
      { type: 'h2', text: 'Pre-existing substantive relationships' },
      {
        type: 'p',
        text: 'If a sponsor may not solicit generally, how does it find investors? The answer, in a Rule 506(b) offering, is the pre-existing substantive relationship. Both words carry weight. The relationship should pre-date the commencement of the offering, and it should be substantive — meaning the sponsor knows enough about the prospective investor’s financial circumstances and sophistication to evaluate whether the investment is suitable. An exchange of contact details at a conference is generally not a substantive relationship.',
      },
      {
        type: 'p',
        text: 'The practical consequence is one of sequencing. Relationships must be built and documented before a specific deal is launched, not after. Sponsors who maintain investor questionnaires, keep records of when and how each relationship was established, and impose some discipline on their contact management are in a materially better position than sponsors who assemble a list once a property is under contract. A sponsor that identifies a deal first and looks for investors second has the sequence backwards.',
      },
      {
        type: 'p',
        text: 'Rule 506(b) also permits the sponsor to rely on a reasonable belief that a purchaser is accredited. That belief is ordinarily supported by a completed investor questionnaire and the investor’s written representations, absent facts that call them into question.',
      },
      { type: 'h2', text: 'Rule 506(c): solicitation permitted, verification required' },
      {
        type: 'p',
        text: 'Rule 506(c) permits general solicitation and general advertising. A sponsor relying on it may describe the offering publicly — on its website, at conferences, in newsletters and through social channels — and may approach prospective investors it has never met.',
      },
      {
        type: 'p',
        text: 'The trade-off is twofold. Every purchaser must in fact be an accredited investor, and the issuer must take reasonable steps to verify that status. Verification is a higher standard than the reasonable belief that supports a Rule 506(b) offering. An investor’s own check-the-box certification, standing alone, is generally not sufficient.',
      },
      {
        type: 'p',
        text: 'The rule contemplates several methods of verification, and the reasonableness of the steps taken is evaluated in light of the facts. Approaches commonly used include:',
      },
      {
        type: 'ul',
        items: [
          'Reviewing income documentation for the relevant periods, together with a written representation about the investor’s expectations for the current year.',
          'Reviewing recent documentation of both assets and liabilities to establish net worth. The liability side matters as much as the asset side, and is ordinarily confirmed by reference to a consumer credit report. Net worth is calculated excluding the value of the investor’s primary residence.',
          'Obtaining written confirmation from a registered broker-dealer, an investment adviser registered with the Commission, a licensed attorney or a certified public accountant that the person has taken reasonable steps to verify the investor’s status.',
          'Relying, in defined circumstances, on a written certification from an investor the issuer previously verified.',
        ],
      },
      {
        type: 'p',
        text: 'Many sponsors engage a third-party verification service. The practical attraction is not only efficiency but also that the sponsor avoids collecting and retaining sensitive personal financial records.',
      },
      { type: 'h2', text: 'Accredited investor status' },
      {
        type: 'p',
        text: 'The definition of accredited investor is set by rule. It covers natural persons who satisfy an income test or a net worth test, various entities that meet asset or ownership tests, and — following amendments adopted in recent years — persons holding certain professional certifications and designations, and knowledgeable employees of private funds. Both the categories and the thresholds have been amended over time. The current definition should be confirmed at the outset of each offering rather than assumed from a prior deal’s questionnaire.',
      },
      { type: 'h2', text: 'Form D and state notice filings' },
      {
        type: 'p',
        text: 'An issuer relying on Rule 506 files a Form D with the Commission. Form D is a notice filing, and it generally must be filed within fifteen calendar days after the first sale of securities in the offering. It is not an application, it is not reviewed or approved, and — as noted above — it does not itself establish the exemption. Failure to file the Form D on time does not, by itself, eliminate the availability of the Rule 506 exemption, although noncompliance can carry other consequences, including at the state level.',
      },
      {
        type: 'p',
        text: 'Although states may not require registration of a Rule 506 offering, applicable states may require a notice filing and a fee in connection with offers and sales made in those jurisdictions. These filings typically mirror the Form D, but deadlines, fee amounts and mechanics vary among states. Amendments may also be required — annually while an offering continues, and upon certain changes to the information previously reported. Missed state notice filings are among the more common and more easily avoided administrative problems in a private raise.',
      },
      { type: 'h2', text: 'Practical considerations for sponsors' },
      {
        type: 'ul',
        items: [
          'Decide between Rule 506(b) and Rule 506(c) before any marketing begins. General solicitation can materially affect the availability of Rule 506(b) for an offering, and whether the issuer may then rely on another exemption or proceed under a different offering structure depends on the facts and on the applicable integration rules.',
          'Consider whether the program is deal-by-deal or continuous. Repeated raises raise integration questions, and a program that grows may implicate Investment Company Act exclusions and investment adviser status.',
          'If relying on Rule 506(b), build and document the investor relationships before the transaction, and keep records showing when each relationship began.',
          'If relying on Rule 506(c), treat verification as a gating item in the closing timeline rather than an administrative step at the end.',
          'Keep marketing materials and the offering documents consistent. Projections or descriptions that appear in a deck but not in the offering memorandum create avoidable disclosure exposure.',
          'Complete bad-actor diligence on the covered persons associated with the offering before the raise, not after a subscription is received.',
          'Track state notice filing obligations for the jurisdictions in which offers and sales are made, and calendar the amendment deadlines.',
        ],
      },
      { type: 'h2', text: 'A practical takeaway' },
      {
        type: 'p',
        text: 'The choice between Rule 506(b) and Rule 506(c) is a business decision with legal consequences that are difficult to reverse. A sponsor with a deep and well-documented investor base often finds Rule 506(b) simpler and less administratively burdensome. A sponsor building a platform, or raising from people it has not previously met, may conclude that the ability to solicit publicly is worth the verification obligation that comes with it. What does not work well is making the decision after marketing has already begun.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'preferred-equity-vs-mezzanine-debt-in-commercial-real-estate',
    title: 'Preferred Equity vs. Mezzanine Debt in Commercial Real Estate',
    category: 'articles',
    date: '2026-09-02',
    excerpt:
      'Both sit between senior debt and common equity, and both are often described in similar economic terms. The differences that matter appear in the collateral, the remedies and the senior lender’s requirements.',
    readingMinutes: 7,
    authors: [],
    practices: ['lending-finance', 'securities-private-capital', 'commercial-real-estate'],
    body: [
      {
        type: 'p',
        text: 'When a capitalization requires more proceeds than a senior lender will advance and a sponsor would prefer not to sell additional common equity, the gap is often filled with mezzanine debt or preferred equity. The two are frequently discussed as interchangeable, and in economic summary they can look similar: a fixed or accruing return, a position senior to common equity, and limited participation in residual upside. The distinctions that matter in a workout, however, are structural, and they are decided when the documents are drafted.',
      },
      {
        type: 'p',
        text: 'What follows describes structures as they are commonly encountered. Terms vary substantially among transactions, lenders and capital providers. The characterization of any particular investment — together with its priority, the remedies available to each party, and how it is treated in a workout or an insolvency proceeding — depends on the transaction structure, the governing documents and applicable law. It is not determined by the label the parties put on it.',
      },
      { type: 'h2', text: 'Position in the capital stack' },
      {
        type: 'p',
        text: 'Both instruments occupy the space between the senior mortgage loan and the sponsor’s common equity. A mezzanine loan is typically made to the entity that owns the property-owning borrower — the mezzanine borrower is the parent, not the property owner. Preferred equity is typically an equity investment made into the property owner or into a holding company above it, admitting the capital provider as a member or partner with a preferred return and priority distribution rights.',
      },
      {
        type: 'p',
        text: 'That difference — lending to the owner of the borrower versus investing into the ownership structure — drives most of what follows.',
      },
      { type: 'h2', text: 'Debt and equity characteristics' },
      {
        type: 'p',
        text: 'Mezzanine debt is generally documented as a loan: a note, a loan agreement, a pledge, and the covenants and events of default that accompany secured lending. It carries a stated interest rate, a maturity date, and an unconditional obligation to repay. Preferred equity is generally documented in the operating or partnership agreement, or in an amendment to it, and takes the form of a priority return and a priority right to distributions rather than an unconditional promise of repayment.',
      },
      {
        type: 'p',
        text: 'The distinction is not always clean. Preferred equity can be structured with mandatory redemption dates, accruing returns and remedies that make it function much like debt, and some instruments described as preferred equity are close to debt in substance. Whether a given instrument is treated as debt or equity for tax, bankruptcy, accounting or regulatory purposes is a fact-specific question that should be analyzed on its own terms rather than assumed from the label.',
      },
      { type: 'h2', text: 'Collateral and structural differences' },
      {
        type: 'p',
        text: 'A mezzanine lender is typically secured by a pledge of the equity interests in the property-owning borrower. It does not hold a mortgage on the real property, and it does not have a lien on the asset itself. Its collateral is the ownership interest one level up.',
      },
      {
        type: 'p',
        text: 'A preferred equity investor generally holds no lien at all. Its protection comes from the governance and economic provisions of the operating agreement — priority distributions, consent rights over major decisions, and rights that expand upon defined trigger events. In some transactions a preferred investor also holds a pledge of the common member’s interests, which moves the structure closer to mezzanine debt in practical effect.',
      },
      { type: 'h2', text: 'Remedies and control rights' },
      {
        type: 'p',
        text: 'The remedy sets differ meaningfully, and this is often the reason a senior lender prefers one structure over the other.',
      },
      {
        type: 'ul',
        items: [
          'A mezzanine lender’s principal remedy is typically a foreclosure on the pledged equity under Article 9 of the Uniform Commercial Code. A UCC sale can generally be conducted on a considerably shorter timeline than a mortgage foreclosure, and the purchaser takes the equity subject to the existing senior mortgage debt.',
          'A preferred equity investor’s remedies are ordinarily contractual and governance-based. On a triggering event these commonly include removal of the common member as managing member, assumption of control over major decisions, forced sale or refinancing rights, and an increase in the accrual rate.',
          'Both structures frequently include guaranties from the sponsor covering defined conduct, and those guaranties often mirror the recourse carve-outs found in the senior loan.',
          'In each case, the practical value of a remedy depends on how quickly it can be exercised and what consents are required to exercise it.',
        ],
      },
      { type: 'h2', text: 'Intercreditor and recognition issues' },
      {
        type: 'p',
        text: 'Neither structure operates in isolation from the senior lender. Where mezzanine debt is used, the relationship is ordinarily governed by an intercreditor agreement between the senior lender and the mezzanine lender. Where preferred equity is used, the senior lender’s requirements typically appear in a recognition agreement, or in the senior loan documents themselves.',
      },
      {
        type: 'p',
        text: 'These agreements address a recurring set of questions: whether and when the subordinate party may exercise remedies; what notice and cure rights it has with respect to senior loan defaults; whether it may purchase the senior loan and on what terms; who is an acceptable transferee following a change of control; whether replacement guarantors must be delivered and who qualifies; and how the senior lender’s transfer covenants and single-purpose entity requirements apply to a change at the subordinate level. Negotiating these points late in a transaction is a common source of delay, because the senior lender’s approval is required and its credit and legal review runs on its own timeline.',
      },
      { type: 'h2', text: 'Return structures' },
      {
        type: 'p',
        text: 'Mezzanine debt commonly carries a stated rate, sometimes with a portion paid currently and a portion accruing, and may include exit fees, minimum multiple provisions or prepayment protection. Preferred equity commonly carries a preferred return that may be paid currently to the extent of available cash flow and otherwise accrue and compound, together with a redemption obligation and, in some structures, limited participation in residual proceeds.',
      },
      {
        type: 'p',
        text: 'Because a preferred return is generally payable from available cash flow rather than as an unconditional obligation, the accrual and compounding mechanics, and the consequences of failing to redeem by a target date, warrant close attention. Two instruments quoted at similar rates can produce very different outcomes depending on how unpaid amounts accrue and what happens when a redemption date passes.',
      },
      { type: 'h2', text: 'Senior lender considerations' },
      {
        type: 'p',
        text: 'Senior lenders are not indifferent to what sits above them in the ownership structure. Their concerns commonly include the identity and qualifications of any party that could take control of the borrower, the continuity of the single-purpose entity and separateness covenants, the effect of a change of control on existing guaranties, and whether the subordinate party’s remedies could disrupt the operation of the property or the servicing of the senior loan. Some senior lenders and securitization programs will accommodate one structure more readily than the other, and some will require that any subordinate capital be documented in a specified form. These constraints are worth identifying before the subordinate capital is priced.',
      },
      { type: 'h2', text: 'When each structure may be considered' },
      {
        type: 'p',
        text: 'The selection is usually driven by a combination of senior lender requirements, the capital provider’s own mandate and preferences, tax and accounting considerations for both sides, and the speed and certainty of the remedies each party expects to need. Some capital providers are organized to hold debt and not equity, or the reverse. Some senior loan documents permit one and prohibit the other. In transactions where the senior lender will not permit a pledge of the borrower’s equity, preferred equity may be the only structure available; where a capital provider requires the speed of a UCC remedy, mezzanine debt may be preferred.',
      },
      { type: 'h2', text: 'A practical takeaway' },
      {
        type: 'p',
        text: 'Preferred equity and mezzanine debt are best evaluated on their documents rather than on their labels. The economic summary in a term sheet rarely reveals the differences that determine what happens if the asset underperforms. The provisions worth reading closely are the collateral, the trigger events, the remedy timeline, the treatment of accrued and unpaid amounts, and the senior lender’s intercreditor or recognition requirements — because those, rather than the stated rate, describe what each party actually holds.',
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: 'what-borrowers-should-consider-before-signing-a-commercial-loan-guaranty',
    title: 'What Borrowers Should Consider Before Signing a Commercial Loan Guaranty',
    category: 'articles',
    date: '2026-09-02',
    excerpt:
      'A guaranty is frequently the last document reviewed and the one with the longest reach. The obligations it creates often outlast the transaction that produced it.',
    readingMinutes: 8,
    authors: [],
    practices: ['lending-finance', 'creditors-rights', 'commercial-real-estate'],
    body: [
      {
        type: 'p',
        text: 'In a commercial real estate financing, attention naturally concentrates on the loan agreement and the economic terms. The guaranty is often reviewed late, and sometimes treated as a form document. It is worth more attention than it typically receives. A guaranty is the instrument through which liability moves from a single-purpose entity to a person or an operating company with other assets, and its obligations frequently survive events the guarantor assumes will end them.',
      },
      {
        type: 'p',
        text: 'The discussion below describes provisions commonly encountered in commercial loan guaranties. Forms and market practice vary among lenders, programs and transactions, and the effect of any particular provision depends on the document in which it appears and on applicable law.',
      },
      { type: 'h2', text: 'Identify which guaranty you are signing' },
      {
        type: 'p',
        text: 'The single most useful first step is to determine what kind of guaranty is in front of you. Documents with similar titles can create dramatically different exposure.',
      },
      {
        type: 'ul',
        items: [
          'A payment guaranty — sometimes full, sometimes partial — creates liability for repayment of the loan or a defined portion of it. It is the broadest form of exposure and is not conditioned on misconduct.',
          'A completion guaranty obligates the guarantor to complete construction in accordance with the plans and budget, generally regardless of whether the loan is in default and often regardless of whether loan proceeds remain available.',
          'A carry guaranty, sometimes called an interest and carry guaranty, covers debt service, taxes, insurance and operating shortfalls during a defined period, frequently until stabilization or a debt service coverage test is satisfied.',
          'An environmental indemnity covers environmental liabilities and related costs. It is ordinarily separate from the guaranty, is commonly excluded from non-recourse protection, and frequently survives repayment of the loan and even foreclosure.',
          'A recourse carve-out guaranty — often called a non-recourse carve-out or bad-boy guaranty — is the form most common in otherwise non-recourse financing. It creates liability only upon defined conduct or circumstances.',
        ],
      },
      { type: 'h2', text: 'Loss carve-outs and springing recourse' },
      {
        type: 'p',
        text: 'Within a recourse carve-out guaranty, the most consequential distinction is between provisions that create liability for losses and provisions that create liability for the entire loan.',
      },
      {
        type: 'p',
        text: 'Loss carve-outs make the guarantor responsible for damages actually caused by the triggering conduct. Misapplication of rents or insurance proceeds, failure to pay taxes, waste, and fraud commonly appear here. The exposure is real but bounded by the loss.',
      },
      {
        type: 'p',
        text: 'Springing or full-recourse provisions convert the entire loan into a recourse obligation upon a triggering event. These historically covered voluntary bankruptcy filings and transfers made in violation of the loan documents. Because the consequence is the whole debt rather than a measured loss, the precise scope of each trigger deserves close reading — particularly triggers that can be activated by conduct the guarantor may not regard as a default, or by the actions of parties the guarantor does not control.',
      },
      { type: 'h2', text: 'Financial covenants: net worth and liquidity' },
      {
        type: 'p',
        text: 'Many guaranties impose continuing financial covenants on the guarantor — commonly a minimum net worth and a minimum liquidity requirement, tested periodically and evidenced by financial statements delivered to the lender.',
      },
      {
        type: 'p',
        text: 'These covenants deserve attention for a reason that is easy to miss: they create a default risk that is independent of the property. A guarantor may be in compliance with every property-level covenant while a decline in unrelated assets causes a failure under the guaranty. Points commonly negotiated include how net worth and liquidity are defined and what is excluded, whether the tests are measured for the guarantor individually or on a consolidated basis, the frequency and form of reporting, whether there is a cure period and how a shortfall may be cured, and whether a failure is a default under the loan itself or only under the guaranty.',
      },
      { type: 'h2', text: 'Burn-off and release provisions' },
      {
        type: 'p',
        text: 'Guaranties of the completion and carry variety, and partial payment guaranties, are frequently negotiated to reduce or terminate upon defined milestones. Common formulations tie a reduction to completion of construction, to achievement of a debt service coverage ratio or a debt yield maintained over a stated period, to a loan-to-value test supported by a new appraisal, or to a paydown of principal.',
      },
      {
        type: 'p',
        text: 'The provisions worth confirming are mechanical. Is the reduction automatic upon satisfaction of the test, or does it require the lender’s written confirmation? Who bears the cost of any appraisal or third-party report, and who selects the provider? Must the loan be free of defaults at the time of the test, and does a cured default disqualify the reduction? Is the test measured once, or must the condition be maintained? A burn-off that is economically agreed but procedurally difficult to invoke may not deliver the relief the guarantor expected.',
      },
      { type: 'h2', text: 'Multiple guarantors' },
      {
        type: 'p',
        text: 'Where several principals guarantee the same loan, the default position in most forms is joint and several liability. Each guarantor is liable for the entire obligation, and the loan documents commonly permit the lender to proceed against any one of them without first pursuing the others or the collateral. What a lender may actually do in a given enforcement depends on applicable law, on the guaranty and loan documents, and on the circumstances.',
      },
      {
        type: 'p',
        text: 'This matters most where the guarantors hold unequal economic interests, or where one has substantially greater outside assets. Approaches sometimes negotiated include several liability limited to a stated percentage, caps on individual exposure, and — separately from the loan documents — a contribution agreement among the guarantors allocating responsibility among themselves. A contribution agreement does not bind the lender, but it establishes rights among the guarantors that would otherwise be uncertain.',
      },
      { type: 'h2', text: 'Waivers, and why the guaranty is usually independent' },
      {
        type: 'p',
        text: 'Most commercial guaranties contain extensive waivers. The guarantor commonly waives suretyship defenses, waives the requirement that the lender first proceed against the borrower or the collateral, waives notice of default and of modifications, and consents in advance to amendments of the loan documents. The guaranty is also typically drafted as an independent obligation, enforceable without regard to the enforceability of the underlying loan against the borrower.',
      },
      {
        type: 'p',
        text: 'The effect these provisions are drafted to achieve is that a lender may pursue the guarantor directly upon a default, without exhausting other remedies first. Whether that path is available in a particular enforcement depends on applicable law, on the specific language used and on the circumstances. The scope and enforceability of particular waivers varies by jurisdiction.',
      },
      { type: 'h2', text: 'A Georgia note on deficiency claims' },
      {
        type: 'p',
        text: 'Georgia law may impose confirmation requirements following certain non-judicial foreclosure sales before a creditor may pursue a deficiency. Whether and how those requirements apply to a guarantor, and how they interact with particular guaranty provisions, can depend on the documents and on the circumstances of the enforcement. For a transaction secured by Georgia real property, it is a question worth identifying early rather than after a default.',
      },
      { type: 'h2', text: 'Amendments and modifications' },
      {
        type: 'p',
        text: 'Because most guaranties include an advance consent to modification of the loan documents, a guarantor may remain bound following an amendment, an extension, an increase in the loan amount, a change in the interest rate, a release of collateral, or a change in the borrower’s ownership — often without separate notice.',
      },
      {
        type: 'p',
        text: 'Guarantors who are not also the controlling principals of the borrower have a particular interest here, since the borrower may agree to modifications that expand the guaranteed obligation. Where that concern is material, it is generally addressed by negotiating notice rights, by carving specified categories of modification out of the advance consent, or by capping the guaranteed amount so that later increases do not enlarge the exposure.',
      },
      { type: 'h2', text: 'Practical negotiation considerations' },
      {
        type: 'ul',
        items: [
          'Read the guaranty against the loan agreement. Defined terms carry across the documents, and a change to a definition in the loan agreement can quietly expand the guaranty.',
          'Ask what happens on repayment. Confirm which obligations — commonly the environmental indemnity and certain indemnities — survive payoff, release of the lien, or foreclosure.',
          'Confirm the guarantor entity. A guaranty signed by an individual reaches different assets than one signed by an operating company, and estate planning and marital property considerations may be relevant.',
          'Test the springing recourse triggers against realistic scenarios, including actions by co-investors, lenders at other levels, or third-party creditors that the guarantor does not control.',
          'Negotiate financial covenant definitions and cure mechanics with the same care as the economic terms; these are frequently accepted without discussion and are frequently negotiable.',
          'Where subordinate capital sits above the borrower, confirm how a change of control at that level affects the guaranty and whether a replacement guarantor is contemplated.',
          'Raise guaranty issues during term sheet negotiation. Once a commitment has been issued and a closing date set, the leverage to change the form is considerably reduced.',
        ],
      },
      { type: 'h2', text: 'A practical takeaway' },
      {
        type: 'p',
        text: 'A guaranty is not an administrative closing document. It is the instrument that determines what a sponsor personally stands behind, for how long, and under what circumstances. The most useful time to read it is at the term sheet stage, when the form, the financial covenants and the burn-off conditions are still open. The least useful time is at closing, when the terms are settled and the pressure is to sign.',
      },
    ],
  },
];

/* ---- Lookups ------------------------------------------------------------- */

export function sortedInsights(): Insight[] {
  return [...insights].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function recentInsights(count = 4): Insight[] {
  return sortedInsights().slice(0, count);
}

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export function insightsByPractice(practiceSlug: string, limit?: number): Insight[] {
  const list = sortedInsights().filter((i) => i.practices.includes(practiceSlug));
  return typeof limit === 'number' ? list.slice(0, limit) : list;
}

export function insightsByAuthor(attorneySlug: string, limit?: number): Insight[] {
  const list = sortedInsights().filter((i) => i.authors.includes(attorneySlug));
  return typeof limit === 'number' ? list.slice(0, limit) : list;
}

export function categoryLabel(slug: string): string {
  return categories.find((c) => c.slug === slug)?.label ?? slug;
}

export const insightSlugs = insights.map((i) => i.slug);
