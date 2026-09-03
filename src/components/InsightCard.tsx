import Link from 'next/link';
import type { Insight } from '@/content/insights';
import { categoryLabel } from '@/content/insights';
import { formatDateShort } from '@/lib/format';
import { PlaceholderText } from '@/components/Placeholder';

export function InsightCard({ insight }: { insight: Insight }) {
  return (
    <article className="insight-card">
      <div className="insight-card__meta">
        <span className="insight-card__category">{categoryLabel(insight.category)}</span>
        <time className="insight-card__date" dateTime={insight.date}>
          {formatDateShort(insight.date)}
        </time>
      </div>

      <h3 className="insight-card__title">
        <Link href={`/insights/${insight.slug}`} className="card-link">
          <PlaceholderText text={insight.title} />
        </Link>
      </h3>

      <p className="insight-card__excerpt">
        <PlaceholderText text={insight.excerpt} />
      </p>

      {insight.readingMinutes > 0 ? (
        <p className="insight-card__foot">{insight.readingMinutes} min read</p>
      ) : null}
    </article>
  );
}

/** Wide index row used on /insights and the homepage list variant. */
export function InsightRow({ insight }: { insight: Insight }) {
  return (
    <li className="row-item">
      <Link href={`/insights/${insight.slug}`} className="row-item__link">
        <div className="row-item__meta">
          <span className="is-accent">{categoryLabel(insight.category)}</span>
          <time dateTime={insight.date}>{formatDateShort(insight.date)}</time>
        </div>
        <div>
          <h3 className="row-item__title">
            <PlaceholderText text={insight.title} />
          </h3>
          <p className="row-item__excerpt">
            <PlaceholderText text={insight.excerpt} />
          </p>
        </div>
        <span className="row-item__arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25">
            <path d="M1.5 8h12" />
            <path d="M9 3.5 13.5 8 9 12.5" />
          </svg>
        </span>
      </Link>
    </li>
  );
}
