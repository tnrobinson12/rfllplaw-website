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
    <article className={cardClass}>
      <div className="attorney-card__media">
        <Figure
          src={person.portrait}
          alt={person.portraitAlt}
          ratio="4-5"
          sizes="(max-width: 40rem) 50vw, (max-width: 64rem) 33vw, 25vw"
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
