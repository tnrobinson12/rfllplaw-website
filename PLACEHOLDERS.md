# Placeholder checklist

Everything on this list is unconfirmed information rendered with a visible highlight on the site.
Nothing here was invented — where a fact was unknown, a marked placeholder was created instead.

Work top to bottom. When a section is done, the highlight disappears on its own.

---

## 1. Firm & office — `src/content/site.ts`

**Done:** the office block and the LinkedIn URL are confirmed firm information and carry no
brackets — 191 Peachtree Street, NE, 26th Floor, Atlanta, GA 30303; 404-255-2503;
info@rfllplaw.com. They render in the footer, the mobile menu, `/contact`, `/privacy` and
`/attorney-advertising`, and now feed the Organization schema (postal address, telephone, email
and `sameAs`).

- [x] ~~`office.streetAddress`, `office.suite`, `office.postalCode`~~
- [x] ~~`office.phone` **and** `office.phoneHref`~~
- [x] ~~`office.email` **and** `office.emailHref`~~
- [x] ~~`social.linkedin.url`~~ — `isPlaceholder` is now `false`
- [x] ~~`office.mapLinkUrl`~~ — a Google Maps search link built from the confirmed address
- [ ] `office.fax` — set to `''`; the firm supplied no fax, so the row omits itself on `/contact`.
      Set a number to bring the row back
- [x] ~~`office.hours`~~ — the unverified hours were removed and the field is now empty, so the
      Hours row omits itself on `/contact`. Set a confirmed value to publish hours again
- [ ] `office.mapEmbedUrl` — optional. Empty, so `/contact` shows the "Get directions" link with no
      embedded map. Paste a Google Maps embed URL to activate the map frame
- [ ] `foundedYear` — currently `null`; set a number only if the firm wants it published

## 2. The team — `src/content/attorneys.ts`

**Done:** all 22 people are real. Names, titles, email addresses, telephone numbers and portraits
were supplied by the firm and are live. Three groups are kept distinct in the data and on the page —
`attorneys` (the only group with profile pages), `legalProfessionals` (currently empty) and `staff`.

**Also done:** biographies (`overview`), `practiceAreas`, `education`, `admissions`,
`recognition`, `professionalActivities` and `experience` are populated from the firm's copy. Profile
pages are live. `practices` — the slugs that link an attorney to a practice page — is derived
automatically from `practiceAreas`: an area that names one of the six practice pages becomes a link,
and everything else displays as plain text. That also re-enabled the practice filter on the
directory and the attorney lists on practice pages.

**Still outstanding.** Each of these renders itself as soon as it is supplied; none is faked in the
meantime.

- [ ] **Chelsea Rierson** — now live with only what the firm supplied: name, title (Associate
      Attorney) and two practice areas (Creditors' Rights, Commercial Litigation). Still missing:
      **portrait** (her card and profile show generated artwork, not a photograph — she is the only
      person on the site without one), email, telephone, biography, education and admissions. Drop
      a file at `/public/images/team/chelsea-rierson.jpg` and add `...portrait('chelsea-rierson.jpg',
      'Chelsea Rierson')` to her entry; every other field renders itself as soon as it is supplied
- [ ] **Arslan Munaf** — everything except name, title and portrait: email, phone, biography, practice
      areas, education and admissions. His profile currently shows only the note "Additional profile
      information coming soon."; supply any field and it renders itself and the note steps aside
- [ ] **Adrienne Washington** — education and bar admissions, withheld pending your confirmation
- [ ] **Zach Cohen** — education and bar admissions, withheld pending your confirmation
- [ ] **Taylor Evers** — bar admission, pending completion; her title carries the footnote
- [ ] **Tyler Lavender** — only the institution was supplied for Emory; no degree or year
- [ ] **Nicholas Moore** — the Super Lawyers entry reads "beginning in 2021" with no end year, per
      your instruction not to state one until verified
- [ ] `experience` — representative experience, currently supplied only for Todd Robinson and
      Christopher Berney
- [ ] `matters` — matter ids from `matters.ts` (see §3). Still empty on every attorney: the firm
      has not verified who worked which matter, so none is attributed
- [ ] `linkedin` — leave `''` to hide the link
- [ ] Nobody has `publications` or `speaking` entries; both sections exist and are ready

**Portrait resolution.** The supplied headshots range from 108 × 152 to 267 × 382. They are framed
consistently, but the smaller files are below what the directory cards and profile pages can render
sharply on high-density screens. Higher-resolution originals would be a straight upgrade — drop them
into `/public/images/team/` under the same file names and nothing else needs to change.

Add or remove people by adding/removing objects in the arrays. Everything else updates itself.

## 3. Selected experience — `src/content/matters.ts`

**Done:** the twelve structural placeholders are gone. 45 matters taken from the firm's prior
marketing materials are live, reproduced as supplied — amounts, unit counts, qualifiers
("approximately", "more than"), asset types and locations unchanged. `isPlaceholder` is `false`
on every one.

24 of them are marked `featured` and make up the `/experience` page, grouped by primary practice.
`PRACTICE_FEATURE` lists which matters lead each practice page. The rest reach the site through
their practice pages.

**Still outstanding.**

- [ ] `attorneys` — empty on all 45. No matter is attributed to an individual, so none appears on
      an attorney profile. Populate only where the firm can verify who worked the matter
- [ ] `year` — unset on all 45. None was supplied and none was invented
- [ ] `role` — empty on all 45; the supplied descriptions already open with the role
      ("Represented the lead lender in..."), so a separate role line would restate it
- [ ] Only three matters carry `commercial-litigation`, so that practice page shows three rather
      than the 4–7 the other pages show. More litigation matters would even it out

Before publishing, confirm with the firm:

- [ ] That the anonymized descriptions cannot be traced to a specific client engagement
- [ ] That the disclosed deal values and loan amounts may be published
- [ ] That no description could be read as a promise of results under the Georgia Rules of
      Professional Conduct
- [ ] The loan-origination figure on the Lending & Finance page ($5 billion / ~225 transactions /
      45 states). Stated as **"In 2026 alone"**; the firm has confirmed these figures for 2026.
      The year must remain stated — this is a single-year figure, not a standing or annual claim.
      Note that 2026 is still in progress, so the sentence reads as a completed full-year total for
      a year that has not ended

## 4. Insights — `src/content/insights.ts`

**Done:** the four sample articles and two placeholder announcements are gone, and so is the
`isSample` flag and every on-page notice that described articles as samples. Three substantive
articles are published, all dated 2026-09-02, all attributed to the firm. They contain general
commentary only — no client information, no matters, no outcomes, no statistics, no citations.

Every article now renders the firm's standing informational notice (`legal.attorneyAdvertising`)
beneath the body, so the language matches the footer and `/attorney-advertising`.

**Still outstanding.**

- [ ] **Attorney review of all three articles before launch.** They state general legal principles
      and should be read by a Georgia-admitted attorney against current authority
- [ ] The Rule 506 article describes the accredited-investor tests qualitatively and does not state
      dollar thresholds. Adding the current figures is a small edit once verified
- [ ] `authors` is empty on all three, which renders "Robinson Franzman LLP". Add attorney slugs
      once the firm confirms authorship
- [ ] Categories `firm-news`, `deal-announcements`, `speaking-engagements`, `publications` and
      `podcasts` exist but have no entries; they simply do not appear in the filter until used

## 5. Legal pages — review required before launch

Drafts are in place and each carries a visible "Review required" notice.

- [ ] `/privacy` — confirm analytics, hosting and form processors; confirm which state privacy laws
      apply
- [ ] `/disclaimer` — confirm against the Georgia Rules of Professional Conduct
- [ ] `/attorney-advertising` — name the attorney responsible for site content, and confirm the
      required disclosures for every jurisdiction in which the firm's attorneys are admitted
- [ ] `/terms` — confirm governing law and limitation of liability language

## 6. Photography — `public/images/`

Currently rendering original generated SVG artwork. Nothing is broken without photography; it is an
upgrade, not a dependency.

- [ ] Homepage hero — `home.ts` → `hero.image` and `hero.imageAlt` (≥ 2400 px wide, landscape)
- [ ] Attorney portraits — `/images/attorneys/<slug>.jpg` (1200 × 1500)
- [ ] Optional practice page imagery

Avoid: gavels, scales of justice, courthouses, handshakes, stock "attorneys reviewing documents".
Use: contemporary Atlanta architecture, structural detail, urban development, abstract facades.

## 7. Deployment

- [ ] Confirm `site.url` in `site.ts` matches the production host (drives canonical URLs, Open
      Graph, sitemap, schema)
- [ ] Connect the repository to Netlify and add the `rfllplaw.com` domain
- [ ] Set a form notification email under Netlify → Forms
- [ ] Submit `https://www.rfllplaw.com/sitemap.xml` to Google Search Console

---

## How to find every remaining placeholder

Placeholders are bracketed strings inside `src/content/`. Search the project for `[` within that
folder, or simply browse the site — every one of them is highlighted on the page.
