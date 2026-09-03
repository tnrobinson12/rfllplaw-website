import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowRight } from '@/components/Icons';
import { Reveal } from '@/components/Reveal';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  cta?: { label: string; href: string };
  /** Heading level — keeps the document outline correct on every page. */
  as?: 'h2' | 'h3';
  id?: string;
};

/**
 * The site's standard section header: a narrow label column beside a wide
 * title column, closed with a hairline rule.
 */
export function SectionHeading({ eyebrow, title, intro, cta, as: Tag = 'h2', id }: Props) {
  return (
    <Reveal className="section-head">
      <div className="section-head__aside">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      </div>
      <div>
        <Tag className="section-head__title" id={id}>
          {title}
        </Tag>
        {intro ? <p className="section-head__intro">{intro}</p> : null}
        {cta ? (
          <p className="section-head__action">
            <Link href={cta.href} className="link">
              <span>{cta.label}</span>
              <ArrowRight className="link__arrow" />
            </Link>
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
