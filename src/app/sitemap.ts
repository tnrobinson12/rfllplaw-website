import type { MetadataRoute } from 'next';

import { site } from '@/content/site';
import { practices } from '@/content/practices';
import { attorneys } from '@/content/attorneys';
import { insights } from '@/content/insights';

/**
 * Generated at build time from the content data files, so a new practice,
 * attorney or article is added to the sitemap automatically.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // `satisfies` keeps each changeFrequency narrowed to its literal type; without
  // it the map() below widens them to string and the entries stop type-checking.
  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${site.url}/`, changeFrequency: 'monthly', priority: 1 },
      { url: `${site.url}/about`, changeFrequency: 'yearly', priority: 0.8 },
      { url: `${site.url}/practices`, changeFrequency: 'monthly', priority: 0.9 },
      { url: `${site.url}/attorneys`, changeFrequency: 'monthly', priority: 0.9 },
      { url: `${site.url}/experience`, changeFrequency: 'monthly', priority: 0.7 },
      { url: `${site.url}/insights`, changeFrequency: 'weekly', priority: 0.8 },
      { url: `${site.url}/contact`, changeFrequency: 'yearly', priority: 0.7 },
      { url: `${site.url}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
      { url: `${site.url}/disclaimer`, changeFrequency: 'yearly', priority: 0.2 },
      { url: `${site.url}/attorney-advertising`, changeFrequency: 'yearly', priority: 0.2 },
      { url: `${site.url}/terms`, changeFrequency: 'yearly', priority: 0.2 },
    ] satisfies MetadataRoute.Sitemap
  ).map((entry) => ({ ...entry, lastModified: now }));

  const practiceRoutes: MetadataRoute.Sitemap = practices.map((practice) => ({
    url: `${site.url}/practices/${practice.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // Every attorney is a real member of the firm, so every profile is listed.
  const attorneyRoutes: MetadataRoute.Sitemap = attorneys.map((attorney) => ({
    url: `${site.url}/attorneys/${attorney.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const insightRoutes: MetadataRoute.Sitemap = insights.map((insight) => ({
    url: `${site.url}/insights/${insight.slug}`,
    lastModified: new Date(insight.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...practiceRoutes, ...attorneyRoutes, ...insightRoutes];
}
