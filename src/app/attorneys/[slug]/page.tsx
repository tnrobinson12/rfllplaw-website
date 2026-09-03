import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  attorneys,
  getAttorney,
  practicePageForArea,
  type CredentialItem,
} from '@/content/attorneys';
import { getMatters, mattersByAttorney } from '@/content/matters';
import { insightsByAuthor } from '@/content/insights';
import { office } from '@/content/site';

import { pageMetadata } from '@/lib/seo';
import { attorneySchema, breadcrumbSchema, type Crumb } from '@/lib/schema';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { Figure } from '@/components/Figure';
import { Reveal } from '@/components/Reveal';
import { MatterList } from '@/components/MatterList';
import { InsightCard } from '@/components/InsightCard';
import { CtaBand } from '@/components/CtaBand';
import { ArrowRight, LinkedInIcon } from '@/components/Icons';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return attorneys.map((attorney) => ({ slug: attorney.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const attorney = getAttorney(slug);

  if (!attorney) {
    return pageMetadata({
      title: 'Attorney Not Found',
      description: 'The requested attorney profile could not be found.',
      path: `/attorneys/${slug}`,
      noIndex: true,
    });
  }

  // Built only from what the firm supplied: the title, and the practice areas
  // as they were stated. Nothing is characterised or added.
  const areas = attorney.practiceAreas.slice(0, 3).join(', ');
  const description = areas
    ? `${attorney.name}, ${attorney.title} at Robinson Franzman LLP in Atlanta, Georgia. Practice areas include ${areas}.`
    : `${attorney.name}, ${attorney.title} at Robinson Franzman LLP in Atlanta, Georgia.`;

  return pageMetadata({
    title: attorney.name,
    description,
    path: `/attorneys/${attorney.slug}`,
  });
}

function CredentialBlock({ title, items }: { title: string; items: CredentialItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="credential-block">
      <h2 className="credential-block__title">{title}</h2>
      <ul className="credential-block__list">
        {items.map((item, index) => (
          <li key={`${item.primary}-${index}`}>
            <strong>{item.primary}</strong>
            {item.secondary ? <span>{item.secondary}</span> : null}
            {item.details && item.details.length > 0 ? (
              <ul className="credential-block__details">
                {item.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The firm's practice groups. Every entry names a practice page and is linked
 * to it; anything that did not would be showing a practice the site does not
 * have, so narrower descriptions live in `focusAreas` instead.
 */
function PracticeAreaBlock({ areas }: { areas: string[] }) {
  if (areas.length === 0) return null;

  return (
    <div className="credential-block">
      <h2 className="credential-block__title">Practice Areas</h2>
      <ul className="credential-block__list">
        {areas.map((area) => {
          const slug = practicePageForArea(area);
          return (
            <li key={area}>
              <strong>
                {slug ? (
                  <Link href={`/practices/${slug}`} className="practice-area-link">
                    {area}
                  </Link>
                ) : (
                  area
                )}
              </strong>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Narrower descriptions of the work. Never linked — these are not pages. */
function FocusAreaBlock({ areas }: { areas: string[] }) {
  if (areas.length === 0) return null;

  return (
    <div className="credential-block">
      <h2 className="credential-block__title">Focus Areas</h2>
      <ul className="credential-block__list">
        {areas.map((area) => (
          <li key={area}>
            <strong>{area}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function AttorneyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const attorney = getAttorney(slug);

  if (!attorney) notFound();

  const listedMatters = getMatters(attorney.matters);
  const derivedMatters = mattersByAttorney(attorney.slug);
  const matterSet = listedMatters.length > 0 ? listedMatters : derivedMatters;
  const authored = insightsByAuthor(attorney.slug, 3);

  const hasExperience = attorney.experience.length > 0 || matterSet.length > 0;

  /* Every section below renders only when the firm has supplied it. The body as
     a whole is omitted if none of them have been. */
  const hasProfileContent =
    attorney.overview.length > 0 ||
    hasExperience ||
    attorney.priorExperience.length > 0 ||
    attorney.practiceAreas.length > 0 ||
    attorney.focusAreas.length > 0 ||
    attorney.admissions.length > 0 ||
    attorney.education.length > 0 ||
    attorney.recognition.length > 0 ||
    attorney.professionalActivities.length > 0 ||
    attorney.publications.length > 0 ||
    attorney.speaking.length > 0;

  const crumbs: Crumb[] = [
    { name: 'Home', href: '/' },
    { name: 'Attorneys', href: '/attorneys' },
    { name: attorney.name, href: `/attorneys/${attorney.slug}` },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(crumbs), attorneySchema(attorney)]} />

      <div className="container" style={{ paddingTop: 'var(--s-6)' }}>
        <Breadcrumbs crumbs={crumbs} />
      </div>

      {/* ------------------------------------------------------ Profile hero */}
      <section className="container profile-hero" aria-labelledby="attorney-name">
        <Reveal>
          {/* Without a photograph this renders the non-representational portrait
              artwork under a "Photo forthcoming" tag, rather than a stand-in
              image of someone who has not been photographed. */}
          <Figure
            src={attorney.portrait}
            alt={attorney.portraitAlt}
            ratio="4-5"
            sizes="(max-width: 60rem) 100vw, 40vw"
            priority
            artwork="portrait-a"
            artworkTag={attorney.portrait ? undefined : 'Photo forthcoming'}
            className="profile-hero__portrait"
          />
        </Reveal>

        <Reveal delay={100}>
          <h1 className="profile-hero__name" id="attorney-name">
            {attorney.name}
          </h1>
          <p className="profile-hero__title">
            {attorney.title}
            {attorney.titleNote ? (
              <span className="title-mark" aria-hidden="true">
                *
              </span>
            ) : null}
          </p>
          {attorney.titleNote ? (
            <p className="title-note">
              <span aria-hidden="true">*</span>
              {attorney.titleNote}
            </p>
          ) : null}

          <dl className="profile-contact">
            {attorney.email && attorney.emailHref ? (
              <div className="profile-contact__item">
                <dt>Email</dt>
                <dd>
                  <a href={attorney.emailHref}>{attorney.email}</a>
                </dd>
              </div>
            ) : null}
            {attorney.phone && attorney.phoneHref ? (
              <div className="profile-contact__item">
                <dt>Phone</dt>
                <dd>
                  <a href={attorney.phoneHref}>{attorney.phone}</a>
                </dd>
              </div>
            ) : null}
            <div className="profile-contact__item">
              <dt>Office</dt>
              <dd>
                {office.city}, {office.region}
              </dd>
            </div>
            {attorney.linkedin ? (
              <div className="profile-contact__item">
                <dt>Profile</dt>
                <dd>
                  <a
                    href={attorney.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    style={{ color: 'inherit' }}
                  >
                    <LinkedInIcon />
                    <span>LinkedIn</span>
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>

          <div style={{ marginTop: 'var(--s-7)' }}>
            <Link href="/contact" className="btn btn--outline">
              Contact {attorney.name.split(' ')[0]}
              <ArrowRight />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------------------------------------- Body */}
      {hasProfileContent ? (
        <section className="section section--rule" aria-label="Background and credentials">
          <div className="container">
            <div className="profile-body">
              <div>
                {attorney.overview.length > 0 ? (
                  <>
                    <h2 className="h2" id="overview-title">
                      Overview
                    </h2>
                    <div className="prose prose--wide" style={{ marginTop: 'var(--s-5)' }}>
                      {attorney.overview.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </>
                ) : null}

                {hasExperience ? (
                  <div style={{ marginTop: attorney.overview.length > 0 ? 'var(--s-9)' : 0 }}>
                    <h2 className="h2">Representative Experience</h2>
                    {attorney.experience.length > 0 ? (
                      <ul className="experience-list">
                        {attorney.experience.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                    {matterSet.length > 0 ? (
                      <div style={{ marginTop: 'var(--s-5)' }}>
                        <MatterList matters={matterSet} />
                      </div>
                    ) : null}
                  </div>
                ) : null}

                {/* Prior positions held. Deliberately a separate heading — this
                    is employment history, not representative client matters. */}
                {attorney.priorExperience.length > 0 ? (
                  <div
                    style={{
                      marginTop:
                        attorney.overview.length > 0 || hasExperience ? 'var(--s-9)' : 0,
                    }}
                  >
                    <h2 className="h2">Prior Experience</h2>
                    <ul className="experience-list">
                      {attorney.priorExperience.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              <aside aria-label="Credentials">
                <PracticeAreaBlock areas={attorney.practiceAreas} />
                <FocusAreaBlock areas={attorney.focusAreas} />
                <CredentialBlock title="Education" items={attorney.education} />
                <CredentialBlock title="Admissions & Memberships" items={attorney.admissions} />
                <CredentialBlock title="Recognition" items={attorney.recognition} />
                <CredentialBlock
                  title="Professional Activities"
                  items={attorney.professionalActivities}
                />
                <CredentialBlock title="Publications" items={attorney.publications} />
                <CredentialBlock title="Speaking Engagements" items={attorney.speaking} />
              </aside>
            </div>
          </div>
        </section>
      ) : attorney.profileNote ? (
        /* Nothing has been supplied beyond name, title and portrait. The firm's
           own short note stands in for the body rather than an empty page. */
        <section className="section section--rule" aria-label="Profile">
          <div className="container">
            <div className="prose prose--wide">
              <p>{attorney.profileNote}</p>
            </div>
          </div>
        </section>
      ) : null}

      {/* --------------------------------------------------------- Insights */}
      {authored.length > 0 ? (
        <section className="section section--alt" aria-labelledby="authored-title">
          <div className="container">
            <h2 className="h2" id="authored-title">
              Insights
            </h2>
            <ul className="card-grid card-grid--3">
              {authored.map((insight) => (
                <li key={insight.slug}>
                  <InsightCard insight={insight} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand
        title="Start a conversation."
        text="Please describe your matter in general terms. Do not send confidential information until an attorney-client relationship has been established in writing."
        secondary={{ label: 'All Attorneys', href: '/attorneys' }}
      />
    </>
  );
}
