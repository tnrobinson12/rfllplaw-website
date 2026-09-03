import Link from 'next/link';
import { ArrowRight } from '@/components/Icons';
import { Reveal } from '@/components/Reveal';

type Props = {
  title: string;
  text: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CtaBand({
  title,
  text,
  primary = { label: 'Contact the Firm', href: '/contact' },
  secondary,
}: Props) {
  return (
    <section className="cta-band on-dark" aria-labelledby="cta-band-title">
      <div className="container">
        <Reveal className="cta-band__grid">
          <div>
            <h2 className="cta-band__title" id="cta-band-title">
              {title}
            </h2>
          </div>
          <div>
            <p className="cta-band__text">{text}</p>
            <div className="cta-band__actions">
              <Link href={primary.href} className="btn btn--light">
                {primary.label}
                <ArrowRight />
              </Link>
              {secondary ? (
                <Link href={secondary.href} className="link">
                  <span>{secondary.label}</span>
                  <ArrowRight className="link__arrow" />
                </Link>
              ) : null}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
