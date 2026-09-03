import Link from 'next/link';
import type { Crumb } from '@/lib/schema';

/**
 * Visible breadcrumb trail. Always pair with breadcrumbSchema() from
 * lib/schema so the visible trail and the structured data agree.
 */
export function Breadcrumbs({ crumbs, className }: { crumbs: Crumb[]; className?: string }) {
  return (
    <nav
      className={['breadcrumbs', className].filter(Boolean).join(' ')}
      aria-label="Breadcrumb"
    >
      <ol>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={crumb.href}>
              {isLast ? (
                <span aria-current="page">{crumb.name}</span>
              ) : (
                <Link href={crumb.href}>{crumb.name}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
