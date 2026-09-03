'use client';

import { useMemo, useState } from 'react';
import type { Category, Insight } from '@/content/insights';
import { InsightRow } from '@/components/InsightCard';
import { SearchIcon } from '@/components/Icons';

export function InsightsIndex({
  insights,
  categories,
  initialCategory = 'all',
}: {
  insights: Insight[];
  categories: Category[];
  initialCategory?: string;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState('');

  // Only offer categories that actually have content.
  const activeCategories = useMemo(
    () => categories.filter((c) => insights.some((i) => i.category === c.slug)),
    [categories, insights]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return insights.filter((insight) => {
      if (category !== 'all' && insight.category !== category) return false;
      if (!q) return true;
      return `${insight.title} ${insight.excerpt}`.toLowerCase().includes(q);
    });
  }, [insights, category, query]);

  const current = activeCategories.find((c) => c.slug === category);

  return (
    <>
      <div
        className="filters"
        style={{ justifyContent: 'space-between', gap: '2rem', alignItems: 'flex-end' }}
      >
        <div className="filters" role="group" aria-label="Filter insights by category">
          <span className="filters__label">Category</span>
          <button
            type="button"
            className="filter-chip"
            aria-pressed={category === 'all'}
            onClick={() => setCategory('all')}
          >
            All
          </button>
          {activeCategories.map((item) => (
            <button
              key={item.slug}
              type="button"
              className="filter-chip"
              aria-pressed={category === item.slug}
              onClick={() => setCategory(item.slug)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="search-input">
          <SearchIcon />
          <label htmlFor="insight-search" className="sr-only">
            Search insights
          </label>
          <input
            id="insight-search"
            type="search"
            value={query}
            placeholder="Search insights"
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      {current ? (
        <p className="lede" style={{ marginTop: 'var(--s-6)', maxWidth: '52ch' }}>
          {current.description}
        </p>
      ) : null}

      <p aria-live="polite" role="status" className="sr-only">
        {filtered.length} {filtered.length === 1 ? 'item' : 'items'} shown
      </p>

      {filtered.length > 0 ? (
        <ul className="rule-list" style={{ marginTop: 'var(--s-8)' }}>
          {filtered.map((insight) => (
            <InsightRow insight={insight} key={insight.slug} />
          ))}
        </ul>
      ) : (
        <p className="search-empty">
          Nothing published in this category yet. Select another category or clear the search.
        </p>
      )}
    </>
  );
}
