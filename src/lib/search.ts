/* --------------------------------------------------------------------------
   Search index

   Built at module load from the content data files — no external dependency,
   no API route, no runtime fetch. The index is small enough (well under 40 KB)
   to ship to the client with the search overlay.
   -------------------------------------------------------------------------- */

import { practices } from '@/content/practices';
import { attorneys } from '@/content/attorneys';
import { insights, categoryLabel } from '@/content/insights';

export type SearchDoc = {
  kind: 'Practice' | 'Attorney' | 'Insight' | 'Page';
  title: string;
  description: string;
  href: string;
  /** Lower-cased haystack used for matching. Never displayed. */
  keywords: string;
};

const staticPages: SearchDoc[] = [
  {
    kind: 'Page',
    title: 'About the Firm',
    description:
      'Robinson Franzman LLP is an Atlanta business law firm focused on commercial real estate, finance, private capital and the disputes arising from them.',
    href: '/about',
    keywords: 'about firm atlanta georgia business law approach principles',
  },
  {
    kind: 'Page',
    title: 'Attorneys',
    description: 'The attorneys of Robinson Franzman LLP.',
    href: '/attorneys',
    keywords: 'attorneys lawyers team people directory',
  },
  {
    kind: 'Page',
    title: 'Practices',
    description: 'Six practice groups covering the full lifecycle of a commercial matter.',
    href: '/practices',
    keywords: 'practices practice areas capabilities services',
  },
  {
    kind: 'Page',
    title: 'Selected Experience',
    description: 'Selected transactions, financings, investments and disputes.',
    href: '/experience',
    keywords:
      'experience selected experience representative matters deals transactions financings cases',
  },
  {
    kind: 'Page',
    title: 'Insights',
    description: 'Legal updates, articles, firm news and deal announcements.',
    href: '/insights',
    keywords: 'insights news articles updates publications podcasts speaking',
  },
  {
    kind: 'Page',
    title: 'Contact',
    description: 'Contact the firm’s Atlanta office.',
    href: '/contact',
    keywords: 'contact office atlanta address phone email map directions',
  },
];

function buildIndex(): SearchDoc[] {
  const practiceDocs: SearchDoc[] = practices.map((p) => ({
    kind: 'Practice',
    title: p.name,
    description: p.summary,
    href: `/practices/${p.slug}`,
    keywords: [
      p.name,
      p.shortName,
      p.summary,
      p.lede,
      ...p.highlights,
      ...p.capabilities.flatMap((g) => [g.title, ...g.items]),
    ]
      .join(' ')
      .toLowerCase(),
  }));

  const attorneyDocs: SearchDoc[] = attorneys.map((a) => ({
    kind: 'Attorney',
    title: a.name,
    description: a.title,
    href: `/attorneys/${a.slug}`,
    keywords: [a.name, a.title, a.email ?? '', ...a.practiceAreas, ...a.practices]
      .join(' ')
      .toLowerCase(),
  }));

  const insightDocs: SearchDoc[] = insights.map((i) => ({
    kind: 'Insight',
    title: i.title,
    description: i.excerpt,
    href: `/insights/${i.slug}`,
    keywords: [i.title, i.excerpt, categoryLabel(i.category), ...i.practices]
      .join(' ')
      .toLowerCase(),
  }));

  return [
    ...practiceDocs,
    ...attorneyDocs,
    ...insightDocs,
    ...staticPages.map((p) => ({ ...p, keywords: p.keywords.toLowerCase() })),
  ];
}

export const searchIndex: SearchDoc[] = buildIndex();

const KIND_WEIGHT: Record<SearchDoc['kind'], number> = {
  Practice: 3,
  Attorney: 2,
  Page: 2,
  Insight: 1,
};

/** Simple weighted substring scoring. Deterministic and fast for ~30 docs. */
export function searchDocs(query: string, limit = 8): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  const terms = q.split(/\s+/).filter(Boolean);

  const scored = searchIndex
    .map((doc) => {
      const title = doc.title.toLowerCase();
      let score = 0;

      for (const term of terms) {
        if (title.startsWith(term)) score += 14;
        else if (title.includes(term)) score += 9;
        if (doc.description.toLowerCase().includes(term)) score += 4;
        if (doc.keywords.includes(term)) score += 2;
      }

      // Every term must appear somewhere for the document to qualify.
      const matchesAll = terms.every(
        (term) =>
          title.includes(term) ||
          doc.description.toLowerCase().includes(term) ||
          doc.keywords.includes(term)
      );

      return { doc, score: matchesAll ? score + KIND_WEIGHT[doc.kind] : 0 };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((entry) => entry.doc);
}

export const searchSuggestions = [
  'Construction loans',
  'Syndication',
  'Foreclosure',
  'Joint ventures',
  'Preferred equity',
  'Operating agreements',
];
