import Link from 'next/link';
import type { Practice } from '@/content/practices';
import { ArrowRight } from '@/components/Icons';
import { pad } from '@/lib/format';

export function PracticeCard({
  practice,
  index,
  showTags = true,
}: {
  practice: Practice;
  index: number;
  showTags?: boolean;
}) {
  return (
    <article className="practice-card">
      <span className="practice-card__index" aria-hidden="true">
        {pad(index + 1)}
      </span>

      <h3 className="practice-card__title">
        <Link href={`/practices/${practice.slug}`} className="card-link">
          {practice.name}
        </Link>
      </h3>

      <p className="practice-card__desc">{practice.summary}</p>

      {showTags ? (
        <ul className="practice-card__tags" aria-label={`${practice.name} focus areas`}>
          {practice.highlights.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      ) : null}

      <div className="practice-card__foot">
        <span className="practice-card__arrow" aria-hidden="true">
          Explore
          <ArrowRight />
        </span>
      </div>
    </article>
  );
}
