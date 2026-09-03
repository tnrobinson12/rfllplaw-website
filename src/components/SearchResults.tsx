'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { searchDocs, searchSuggestions } from '@/lib/search';
import { SearchIcon } from '@/components/Icons';
import { PlaceholderText } from '@/components/Placeholder';

/**
 * Standalone results page. Also the target of the SearchAction declared in the
 * WebSite schema, so /search?q=… resolves to real results.
 */
export function SearchResults({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(() => searchDocs(query, 20), [query]);

  return (
    <>
      <form role="search" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="page-search" className="sr-only">
          Search attorneys, practices and insights
        </label>
        <div className="search-field">
          <SearchIcon size={22} />
          <input
            id="page-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the firm"
            autoComplete="off"
          />
        </div>
      </form>

      <p aria-live="polite" role="status" className="search-hint">
        {query.trim().length > 1
          ? `${results.length} ${results.length === 1 ? 'result' : 'results'}`
          : 'Enter at least two characters'}
      </p>

      {results.length > 0 ? (
        <ul className="search-results">
          {results.map((doc) => (
            <li className="search-result" key={doc.href}>
              <Link href={doc.href}>
                <span className="search-result__kind">{doc.kind}</span>
                <span className="search-result__title">
                  <PlaceholderText text={doc.title} />
                </span>
                <span className="search-result__desc">
                  <PlaceholderText text={doc.description} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="search-empty">
          <p>Frequently searched</p>
          <div className="search-suggestions">
            {searchSuggestions.map((term) => (
              <button key={term} type="button" onClick={() => setQuery(term)}>
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
