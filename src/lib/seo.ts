import type { Metadata } from 'next';
import { site } from '@/content/site';

type SeoInput = {
  title: string;
  description: string;
  /** Site-relative path beginning with "/" — e.g. "/practices/lending-finance". */
  path: string;
  /** Absolute or site-relative OG image path. */
  image?: string;
  /** Articles get an article card with a published date; everything else is a website. */
  type?: 'website' | 'article';
  publishedTime?: string;
  noIndex?: boolean;
};

/**
 * Builds page metadata with canonical URL, Open Graph and Twitter cards.
 * Every route calls this, so nothing ships without a canonical.
 */
export function pageMetadata(input: SeoInput): Metadata {
  const url = absoluteUrl(input.path);
  const image = absoluteUrl(input.image ?? '/opengraph-image');
  const ogTitle = `${input.title} | ${site.name}`;
  const images = [{ url: image, width: 1200, height: 630, alt: site.name }];

  const openGraph: Metadata['openGraph'] =
    input.type === 'article'
      ? {
          type: 'article',
          title: ogTitle,
          description: input.description,
          url,
          siteName: site.name,
          locale: site.locale,
          images,
          publishedTime: input.publishedTime,
        }
      : {
          type: 'website',
          title: ogTitle,
          description: input.description,
          url,
          siteName: site.name,
          locale: site.locale,
          images,
        };

  const metadata: Metadata = {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: input.description,
      images: [image],
    },
  };

  if (input.noIndex) {
    metadata.robots = { index: false, follow: true };
  }

  return metadata;
}

export function absoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${site.url}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Truncates a description to a length search engines will actually display. */
export function clampDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${lastSpace > 0 ? cut.slice(0, lastSpace) : cut}…`;
}
