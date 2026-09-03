'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from 'react';
import { primaryNav, site, office } from '@/content/site';
import { searchDocs, searchSuggestions, type SearchDoc } from '@/lib/search';
import { ArrowRight, CloseIcon, SearchIcon } from '@/components/Icons';
import { PlaceholderText } from '@/components/Placeholder';
import { logo } from '@/content/site';

/**
 * The firm lockup. Both weights are rendered and cross-faded in CSS rather than
 * swapped in state: the header itself is transparent over the homepage hero and
 * opaque everywhere else, and it already animates that change on scroll and on
 * menu open. Keeping the swap in CSS lets the logo ride the same transition
 * instead of popping a beat behind it, and avoids a hydration-time flash.
 */
function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" className="wordmark" aria-label={`${site.name} — home`} onClick={onClick}>
      <Image
        className="wordmark__img wordmark__img--positive"
        src={logo.positive}
        alt={site.name}
        width={logo.width}
        height={logo.height}
        priority
      />
      <Image
        className="wordmark__img wordmark__img--reversed"
        src={logo.reversed}
        alt=""
        aria-hidden="true"
        width={logo.width}
        height={logo.height}
        priority
      />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */

function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  const results = useMemo<SearchDoc[]>(() => searchDocs(query, 8), [query]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 60);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (results.length > 0) {
      router.push(results[0].href);
      onClose();
    }
  };

  return (
    <div
      className={`search-overlay${open ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Search this site"
      aria-hidden={!open}
    >
      <div className="container">
        <div className="search-overlay__top">
          <span className="eyebrow">Search</span>
          <button type="button" className="icon-btn" onClick={onClose}>
            <span>Close</span>
            <CloseIcon />
          </button>
        </div>
      </div>

      <div className="search-overlay__body">
        <div className="container">
          <form onSubmit={submit} role="search">
            <label htmlFor="site-search-input" className="sr-only">
              Search attorneys, practices and insights
            </label>
            <div className="search-field">
              <SearchIcon size={22} />
              <input
                id="site-search-input"
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search the firm"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </form>

          <p className="search-hint">
            Attorneys · Practices · Insights — press Escape to close
          </p>

          <div aria-live="polite" role="status" className="sr-only">
            {query.length > 1 ? `${results.length} results for ${query}` : ''}
          </div>

          {query.length > 1 && results.length > 0 ? (
            <ul className="search-results">
              {results.map((doc) => (
                <li className="search-result" key={doc.href}>
                  <Link href={doc.href} onClick={onClose}>
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
          ) : null}

          {query.length > 1 && results.length === 0 ? (
            <div className="search-empty">
              <p>
                No results for &ldquo;{query}&rdquo;. Try a practice area, an attorney name, or a
                transaction type.
              </p>
            </div>
          ) : null}

          {query.length <= 1 ? (
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
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function MobileMenu({
  open,
  onClose,
  pathname,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <div
      id="mobile-menu"
      className={`mobile-menu${open ? ' is-open' : ''}`}
      aria-hidden={!open}
    >
      <div className="container mobile-menu__inner">
        <nav aria-label="Mobile" className="mobile-menu__nav">
          <ul>
            {primaryNav.map((item, index) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li
                  className="mobile-menu__item"
                  key={item.href}
                  style={{ '--i': `${140 + index * 70}ms` } as CSSProperties}
                >
                  <Link
                    href={item.href}
                    className="mobile-menu__link"
                    onClick={onClose}
                    aria-current={active ? 'page' : undefined}
                  >
                    <span className="mobile-menu__index" aria-hidden="true">
                      0{index + 1}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                  {item.children ? (
                    <div className="mobile-menu__sub">
                      {item.children.map((child) => (
                        <Link key={child.href} href={child.href} onClick={onClose}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mobile-menu__foot">
          <div className="mobile-menu__contact">
            <strong>{office.label} Office</strong>
            <span>
              <PlaceholderText text={office.streetAddress} />
              {', '}
              <PlaceholderText text={office.suite} />
            </span>
            <span>
              {office.city}, {office.region} <PlaceholderText text={office.postalCode} />
            </span>
            <a href={office.phoneHref}>
              <PlaceholderText text={office.phone} />
            </a>
          </div>
          <Link href="/contact" className="btn btn--light" onClick={onClose}>
            Contact the Firm
            <ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export function SiteHeader() {
  const pathname = usePathname() || '/';
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isHome = pathname === '/';

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, []);

  // Close everything on navigation.
  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const locked = menuOpen || searchOpen;
    document.body.classList.toggle('is-locked', locked);
    return () => document.body.classList.remove('is-locked');
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeAll();
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setMenuOpen(false);
        setSearchOpen((value) => !value);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeAll]);

  const headerClasses = [
    'site-header',
    isHome ? 'site-header--overlay' : '',
    scrolled ? 'is-scrolled' : '',
    menuOpen ? 'site-header--menu-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header className={headerClasses}>
        <div className="container site-header__inner">
          <Wordmark onClick={closeAll} />

          <nav className="nav nav--desktop" aria-label="Primary">
            {primaryNav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav__link"
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="header-actions">
            <span className="header-actions__divider" aria-hidden="true" />
            <button
              type="button"
              className="icon-btn"
              onClick={() => {
                setMenuOpen(false);
                setSearchOpen(true);
              }}
              aria-label="Open search"
            >
              <SearchIcon />
              <span className="hide-sm">Search</span>
            </button>

            <button
              type="button"
              className="menu-toggle"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => {
                setSearchOpen(false);
                setMenuOpen((value) => !value);
              }}
            >
              <span className="menu-toggle__bars" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
              <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden="true" className="hide-sm">
                {menuOpen ? 'Close' : 'Menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeAll} pathname={pathname} />
      <SearchOverlay open={searchOpen} onClose={closeAll} />
    </>
  );
}
