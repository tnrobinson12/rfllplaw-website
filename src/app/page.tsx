import Link from 'next/link';
import type { Metadata } from 'next';
import type { CSSProperties } from 'react';

import { practices } from '@/content/practices';
import { sortedAttorneys } from '@/content/attorneys';
import { featuredMattersByPrimaryPractice } from '@/content/matters';
import { recentInsights } from '@/content/insights';
import {
  hero,
  statement,
  lifecycle,
  practicesSection,
  experienceSection,
  insightsSection,
  contactSection,
} from '@/content/home';
import { site } from '@/content/site';

import { Figure } from '@/components/Figure';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { PracticeCard } from '@/components/PracticeCard';
import { InsightCard } from '@/components/InsightCard';
import { MatterList } from '@/components/MatterList';
import { PersonCard } from '@/components/PersonCard';
import { CtaBand } from '@/components/CtaBand';
import { ArrowRight } from '@/components/Icons';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Atlanta Business, Real Estate & Finance Counsel',
  description:
    'Robinson Franzman LLP represents investors, developers, sponsors, funds, lenders and business owners in commercial real estate, lending and finance, private capital, corporate transactions, litigation and creditors’ rights matters from Atlanta, Georgia.',
  path: '/',
});

export default function HomePage() {
  /* The lead matter from each practice rather than the first five in the file,
     so the homepage shows the range of the practice instead of five financings. */
  const featuredMatters = featuredMattersByPrimaryPractice(practices.map((p) => p.slug))
    .map((group) => group.items[0])
    .slice(0, 5);
  const featuredInsights = recentInsights(3);
  const featuredAttorneys = sortedAttorneys().slice(0, 4);

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__media">
          <Figure
            src={hero.image || undefined}
            alt={hero.image ? hero.imageAlt : undefined}
            artwork="hero"
            ratio="16-9"
            /* Right-hand panel on desktop, full-width band above the copy below it. */
            sizes="(min-width: 62rem) 52vw, 100vw"
            priority
            className="figure--ratio-16-9"
          />
        </div>
        <div className="hero__scrim" aria-hidden="true" />

        <div className="hero__inner">
          <div className="container">
            {/* Column one on desktop: the copy keeps its own clean paper ground,
                so the headline never has to fight the photograph behind it. */}
            <div className="hero__copy">
              <p className="hero__eyebrow">{hero.eyebrow}</p>
              <h1 className="hero__title" id="hero-title">
                {hero.title}
              </h1>
              <p className="hero__sub">{hero.sub}</p>

              <div className="hero__actions">
                <Link href={hero.primaryCta.href} className="btn">
                  {hero.primaryCta.label}
                  <ArrowRight />
                </Link>
                <Link href={hero.secondaryCta.href} className="btn btn--outline">
                  {hero.secondaryCta.label}
                  <ArrowRight />
                </Link>
              </div>

              <ul className="hero__foot">
                {hero.markers.map((marker) => (
                  <li key={marker}>{marker}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Firm positioning */}
      <section className="statement" aria-labelledby="statement-title">
        <div className="container">
          <div className="statement__grid">
            <Reveal>
              <span className="eyebrow">{statement.eyebrow}</span>
              <h2 className="statement__text" id="statement-title" style={{ marginTop: '2rem' }}>
                {statement.lead} <em>{statement.leadMuted}</em>
              </h2>
            </Reveal>

            <Reveal className="statement__aside" delay={120}>
              <div className="prose">
                {statement.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p style={{ marginTop: '2rem' }}>
                <Link href={statement.cta.href} className="link">
                  <span>{statement.cta.label}</span>
                  <ArrowRight className="link__arrow" />
                </Link>
              </p>
            </Reveal>
          </div>

          <Reveal as="dl" className="stat-row" delay={60}>
            {statement.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="stat__label">{stat.label}</dt>
                <dd className="stat__value">{stat.value}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ------------------------------------------------------- Practices */}
      <section className="section section--rule" aria-labelledby="practices-title">
        <div className="container">
          <SectionHeading
            eyebrow={practicesSection.eyebrow}
            title={practicesSection.title}
            intro={practicesSection.intro}
            cta={practicesSection.cta}
            id="practices-title"
          />

          <div className="practice-grid" style={{ marginTop: 'var(--s-6)' }}>
            {practices.map((practice, index) => (
              <Reveal key={practice.slug} delay={(index % 3) * 90}>
                <PracticeCard practice={practice} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Lifecycle */}
      <section className="section section--dark" aria-labelledby="lifecycle-title">
        <div className="container">
          <SectionHeading
            eyebrow={lifecycle.eyebrow}
            title={lifecycle.title}
            intro={lifecycle.intro}
            id="lifecycle-title"
          />

          <Reveal as="ol" className="lifecycle" variant="fade">
            {lifecycle.steps.map((step, index) => (
              <li
                className="lifecycle__step"
                key={step.name}
                style={{ '--i': index } as CSSProperties}
              >
                <span className="lifecycle__num">0{index + 1}</span>
                <h3 className="lifecycle__name">
                  <Link href={step.href} className="link-underline">
                    {step.name}
                  </Link>
                </h3>
                <p className="lifecycle__desc">{step.desc}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------- Representative matters */}
      <section className="section" aria-labelledby="experience-title">
        <div className="container">
          <SectionHeading
            eyebrow={experienceSection.eyebrow}
            title={experienceSection.title}
            intro={experienceSection.intro}
            cta={experienceSection.cta}
            id="experience-title"
          />

          <Reveal delay={80}>
            <div style={{ marginTop: 'var(--s-7)' }}>
              <MatterList matters={featuredMatters} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* -------------------------------------------------------- Attorneys */}
      <section className="section section--alt" aria-labelledby="attorneys-title">
        <div className="container">
          <SectionHeading
            eyebrow="Attorneys"
            title="Principals doing the work."
            intro="Every matter is staffed with a partner. The attorney who negotiates a document is the attorney who drafted it."
            cta={{ label: 'All Attorneys', href: '/attorneys' }}
            id="attorneys-title"
          />

          <ul className="card-grid card-grid--4">
            {featuredAttorneys.map((attorney, index) => (
              <li key={attorney.slug}>
                <Reveal delay={(index % 4) * 80}>
                  <PersonCard person={attorney} href={`/attorneys/${attorney.slug}`} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------- Insights */}
      <section className="section" aria-labelledby="insights-title">
        <div className="container">
          <SectionHeading
            eyebrow={insightsSection.eyebrow}
            title={insightsSection.title}
            intro={insightsSection.intro}
            cta={insightsSection.cta}
            id="insights-title"
          />

          <ul className="card-grid card-grid--3">
            {featuredInsights.map((insight, index) => (
              <li key={insight.slug}>
                <Reveal delay={(index % 3) * 90}>
                  <InsightCard insight={insight} />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={contactSection.title}
        text={contactSection.text}
        primary={contactSection.primaryCta}
        secondary={contactSection.secondaryCta}
      />

      <p className="sr-only">{site.tagline}</p>
    </>
  );
}
