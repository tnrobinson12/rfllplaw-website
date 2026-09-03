'use client';

import { useState } from 'react';
import type { Attorney, Person } from '@/content/attorneys';
import type { Practice } from '@/content/practices';
import { PersonCard } from '@/components/PersonCard';
import { SearchIcon } from '@/components/Icons';

/**
 * Client-side directory filtering. The full team is server-rendered into this
 * component, so the page is fully indexable and the filter is instantaneous
 * with no network round trip.
 *
 * Attorneys lead and are the only group with profile links. Legal
 * professionals and administrative staff are rendered in their own labelled
 * sections so no one is presented as an attorney.
 */
export function AttorneyDirectory({
  attorneys,
  legalProfessionals,
  staff,
  practices,
}: {
  attorneys: Attorney[];
  legalProfessionals: Person[];
  staff: Person[];
  practices: Practice[];
}) {
  const [query, setQuery] = useState('');
  const [practice, setPractice] = useState<string>('all');

  /* The practice filter is only meaningful once the firm has confirmed which
     attorneys sit in which practice. Until then it would filter every card
     away, so it is not rendered at all. */
  const showPracticeFilter = attorneys.some((a) => a.practices.length > 0);

  const q = query.trim().toLowerCase();
  const matches = (person: Person) =>
    !q || `${person.name} ${person.title}`.toLowerCase().includes(q);

  // Only attorneys carry practice associations, so a practice selection hides
  // the non-attorney groups rather than showing them unfiltered.
  const practiceSelected = showPracticeFilter && practice !== 'all';

  const filteredAttorneys = attorneys.filter(
    (attorney) =>
      (!practiceSelected || attorney.practices.includes(practice)) && matches(attorney)
  );
  const filteredLegal = practiceSelected ? [] : legalProfessionals.filter(matches);
  const filteredStaff = practiceSelected ? [] : staff.filter(matches);

  const total = filteredAttorneys.length + filteredLegal.length + filteredStaff.length;

  return (
    <>
      <div
        className="filters"
        style={{ justifyContent: 'space-between', gap: '2rem', alignItems: 'flex-end' }}
      >
        {showPracticeFilter ? (
          <div className="filters" role="group" aria-label="Filter attorneys by practice">
            <span className="filters__label">Practice</span>
            <button
              type="button"
              className="filter-chip"
              aria-pressed={practice === 'all'}
              onClick={() => setPractice('all')}
            >
              All
            </button>
            {practices.map((item) => (
              <button
                key={item.slug}
                type="button"
                className="filter-chip"
                aria-pressed={practice === item.slug}
                onClick={() => setPractice(item.slug)}
              >
                {item.shortName}
              </button>
            ))}
          </div>
        ) : (
          <span />
        )}

        <div className="search-input">
          <SearchIcon />
          <label htmlFor="attorney-search" className="sr-only">
            Search the firm by name or title
          </label>
          <input
            id="attorney-search"
            type="search"
            value={query}
            placeholder="Search by name"
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      <p aria-live="polite" role="status" className="sr-only">
        {total} {total === 1 ? 'person' : 'people'} shown
      </p>

      {total === 0 ? (
        <p className="search-empty">
          No one matches that filter. Clear the search or select a different practice.
        </p>
      ) : null}

      {filteredAttorneys.length > 0 ? (
        <section aria-labelledby="directory-attorneys">
          <h2 className="directory-heading" id="directory-attorneys">
            Attorneys
          </h2>
          <ul className="card-grid card-grid--4">
            {filteredAttorneys.map((attorney) => (
              <li key={attorney.slug}>
                <PersonCard
                  person={attorney}
                  href={`/attorneys/${attorney.slug}`}
                  showContact
                />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {filteredLegal.length > 0 ? (
        <section aria-labelledby="directory-legal">
          <h2 className="directory-heading" id="directory-legal">
            Other Legal Professionals
          </h2>
          <ul className="card-grid card-grid--4">
            {filteredLegal.map((person) => (
              <li key={person.slug}>
                <PersonCard person={person} showContact />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {filteredStaff.length > 0 ? (
        <section aria-labelledby="directory-staff">
          <h2 className="directory-heading" id="directory-staff">
            Administrative &amp; Professional Staff
          </h2>
          <ul className="card-grid card-grid--4">
            {filteredStaff.map((person) => (
              <li key={person.slug}>
                <PersonCard person={person} showContact />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}
