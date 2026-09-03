import type { Matter } from '@/content/matters';
import { practiceName } from '@/content/practices';
import { PlaceholderText } from '@/components/Placeholder';

/**
 * Representative matters, rendered as a transaction list rather than as
 * testimonials. Each row carries the practice tags in the left column and the
 * headline, description and role in the right.
 *
 * The tags are the matter's own `practices`, primary first, so a matter that
 * spans practices reads as cross-practice wherever it appears.
 */
export function MatterList({ matters }: { matters: Matter[] }) {
  if (matters.length === 0) {
    return null;
  }

  return (
    <ul className="matter-list">
      {matters.map((matter) => (
        <li className="matter" key={matter.id}>
          <div className="matter__tags">
            {matter.practices.length > 0 ? (
              matter.practices.map((slug) => (
                <p className="matter__practice" key={slug}>
                  {practiceName(slug)}
                </p>
              ))
            ) : (
              <p className="matter__practice">Representative Matter</p>
            )}
          </div>
          <div>
            {matter.title ? (
              <h3 className="matter__title">
                <PlaceholderText text={matter.title} />
              </h3>
            ) : null}
            <p className="matter__text">
              <PlaceholderText text={matter.description} />
            </p>
            {matter.role ? (
              <p className="matter__role">
                <PlaceholderText text={matter.role} />
                {matter.year ? ` · ${matter.year}` : ''}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
