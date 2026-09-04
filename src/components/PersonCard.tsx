import Link from 'next/link';
import type { Person } from '@/content/attorneys';
import { Figure } from '@/components/Figure';
import { ArrowRight } from '@/components/Icons';

/**
 * One person in a directory grid — attorney, legal professional or staff.
 *
 * The portrait frame is a fixed 4:5 regardless of the source file, so the grid
 * stays even across headshots that were supplied at different resolutions.
 *
 * `href` is what separates an attorney from everyone else here: only people
 * with a profile page get a link. Nobody is styled as an attorney by default.
 */
export function PersonCard({
  person,
  href,
  showContact = false,
}: {
  person: Person;
  href?: string;
  showContact?: boolean;
}) {
  const cardClass = ['attorney-card', href ? 'attorney-card--linked' : null]
    .filter(Boolean)
    .join(' ');

  // A person the firm has given neither address nor number for gets no contact
  // list at all, rather than an empty one holding open the space.
  const hasContact = Boolean(
    (person.email && person.emailHref) || (person.phone && person.phoneHref)
  );

  return (
    /* `data-person` is the hook for the few portraits that need their own crop
       treatment — see the per-person rules in components.css. It carries no
       styling of its own. */
    <article className={cardClass} data-person={person.slug}>
      <div className="attorney-card__media">
        {/* `sizes` must describe the real card slot, not an approximation: the
            browser picks a srcset candidate from it before layout, so a value
            that is too small under-fetches and a value that is too large makes
            the browser downscale a lossy image again in software.

            Measured against .card-grid--4 and its breakpoints, with the
            container capped at 84rem and a 3rem column gap:
              >= 84rem   4 cols, container capped ..... 264px
              64–84rem   4 cols, fluid ................. ~21vw
              52–64rem   3 cols ........................ ~29vw
              34–52rem   2 cols ........................ ~45vw
              <  34rem   1 col ......................... ~92vw */}
        <Figure
          src={person.portrait}
          alt={person.portraitAlt}
          ratio="4-5"
          sizes="(min-width: 84rem) 264px, (min-width: 64rem) 21vw, (min-width: 52rem) 29vw, (min-width: 34rem) 45vw, 92vw"
          quality={90}
          artwork="portrait-a"
          artworkTag={person.portrait ? undefined : 'Photo forthcoming'}
        />
      </div>

      <div className="attorney-card__body">
        <h3 className="attorney-card__name">
          {href ? (
            <Link href={href} className="person-card__link">
              {person.name}
            </Link>
          ) : (
            person.name
          )}
        </h3>
        <p className="attorney-card__title">
          {person.title}
          {person.titleNote ? (
            <span className="title-mark" aria-hidden="true">
              *
            </span>
          ) : null}
        </p>
        {person.titleNote ? (
          <p className="title-note">
            <span aria-hidden="true">*</span>
            {person.titleNote}
          </p>
        ) : null}

        {showContact && hasContact ? (
          /* Sits above the stretched card link so these stay clickable. */
          <ul className="person-contact">
            {person.email && person.emailHref ? (
              <li>
                <a href={person.emailHref}>{person.email}</a>
              </li>
            ) : null}
            {person.phone && person.phoneHref ? (
              <li>
                <a href={person.phoneHref}>{person.phone}</a>
              </li>
            ) : null}
          </ul>
        ) : null}

        {/* The whole card is already the link; this is the visible cue for it.
            Not a second anchor — that would duplicate the destination for
            keyboard and screen-reader users. */}
        {href && showContact ? (
          <p className="person-card__more" aria-hidden="true">
            View Profile
            <ArrowRight size={14} />
          </p>
        ) : null}
      </div>
    </article>
  );
}
