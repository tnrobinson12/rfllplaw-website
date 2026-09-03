import type { Metadata } from 'next';
import Link from 'next/link';

import { about } from '@/content/about';
import { practices } from '@/content/practices';
import { lifecycle } from '@/content/home';
import { pageMetadata } from '@/lib/seo';
import { breadcrumbSchema, type Crumb } from '@/lib/schema';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { CtaBand } from '@/components/CtaBand';
import { ArrowRight } from '@/components/Icons';
import { pad } from '@/lib/format';

const crumbs: Crumb[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
];

export const metadata: Metadata = pageMetadata({
  title: 'About the Firm',
  description:
    'Robinson Franzman LLP is an Atlanta business law firm representing investors, developers, owners, sponsors, funds, lenders and borrowers in commercial real estate, finance, private capital and the disputes arising from them.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <section className="page-hero">
        <div className="container">
          <Breadcrumbs crumbs={crumbs} className="page-hero__crumbs" />
          <span className="eyebrow page-hero__eyebrow">{about.eyebrow}</span>
          <h1 className="page-hero__title">{about.title}</h1>
          <p className="page-hero__lede">{about.lede}</p>
        </div>
      </section>

      {/* ------------------------------------------------------- Intro copy */}
      <section className="section" aria-labelledby="firm-intro">
        <div className="container">
          <div className="split">
            <Reveal>
              <h2 className="eyebrow" id="firm-intro">
                The Practice
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <div className="prose prose--wide" style={{ fontSize: 'var(--t-lede)', lineHeight: 1.6 }}>
                {about.intro.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Principles */}
      <section className="section section--rule" aria-labelledby="principles-title">
        <div className="container">
          <SectionHeading
            eyebrow="What We Bring"
            title="Six things clients are actually buying."
            intro="Sophistication without judgment is expensive. Judgment without sophistication is dangerous. The work requires both."
            id="principles-title"
          />

          <ul className="capability-groups" style={{ marginTop: 'var(--s-8)' }}>
            {about.principles.map((principle, index) => (
              <li key={principle.title}>
                <Reveal delay={(index % 3) * 80}>
                  <p className="practice-card__index" style={{ marginBottom: 'var(--s-4)' }}>
                    {pad(index + 1)}
                  </p>
                  <h3 className="capability-group__title">{principle.title}</h3>
                  <p
                    style={{
                      marginTop: 'var(--s-4)',
                      color: 'var(--ink-70)',
                      fontSize: 'var(--t-small)',
                      lineHeight: 1.7,
                    }}
                  >
                    {principle.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --------------------------------------------------------- Approach */}
      <section className="section section--dark" aria-labelledby="approach-title">
        <div className="container">
          <SectionHeading
            eyebrow={about.approach.eyebrow}
            title={about.approach.title}
            id="approach-title"
          />
          <div className="split" style={{ marginTop: 'var(--s-8)' }}>
            <div />
            <Reveal>
              <div className="prose prose--wide">
                {about.approach.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Lifecycle */}
      <section className="section" aria-labelledby="coverage-title">
        <div className="container">
          <SectionHeading
            eyebrow="Coverage"
            title="One firm across the life of an asset or enterprise."
            intro="Most transactions do not fail at a single point; they fail where two disciplines meet."
            id="coverage-title"
          />

          <ul className="rule-list" style={{ marginTop: 'var(--s-8)' }}>
            {lifecycle.steps.map((step, index) => (
              <li className="row-item" key={step.name}>
                <Link href={step.href} className="row-item__link">
                  <div className="row-item__meta">
                    <span className="is-accent">{pad(index + 1)}</span>
                  </div>
                  <div>
                    <h3 className="row-item__title">{step.name}</h3>
                    <p className="row-item__excerpt">{step.desc}</p>
                  </div>
                  <span className="row-item__arrow" aria-hidden="true">
                    <ArrowRight size={18} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ----------------------------------------------------------- Market */}
      <section className="section section--alt section--rule" aria-labelledby="market-title">
        <div className="container">
          <div className="split">
            <Reveal>
              <span className="eyebrow">{about.market.eyebrow}</span>
              <h2 className="h2" id="market-title" style={{ marginTop: 'var(--s-5)', maxWidth: '14ch' }}>
                {about.market.title}
              </h2>
            </Reveal>
            <Reveal delay={90}>
              <div className="prose prose--wide">
                {about.market.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <p style={{ marginTop: 'var(--s-6)' }}>
                <Link href="/contact" className="link">
                  <span>Visit the Atlanta Office</span>
                  <ArrowRight className="link__arrow" />
                </Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- Practices */}
      <section className="section" aria-labelledby="about-practices-title">
        <div className="container">
          <SectionHeading
            eyebrow="Practices"
            title="Where the work sits."
            cta={{ label: 'All Practices', href: '/practices' }}
            id="about-practices-title"
          />
          <div className="related-grid" style={{ marginTop: 'var(--s-7)' }}>
            {practices.map((practice, index) => (
              <Reveal key={practice.slug} delay={(index % 3) * 70}>
                <article className="related-item">
                  <h3 className="related-item__title">
                    <Link href={`/practices/${practice.slug}`} className="card-link">
                      {practice.name}
                    </Link>
                  </h3>
                  <p className="related-item__desc">{practice.summary}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Tell us about the transaction or the dispute."
        text="We respond quickly and we are direct about whether we are the right firm for a matter."
        secondary={{ label: 'Meet the Attorneys', href: '/attorneys' }}
      />
    </>
  );
}
