import { MetadataRoute } from 'next';
import { SEO_BASE_URL, PAGE_PATHS, LOCALES } from '@/lib/seo';

/** Fréquence de mise à jour par type de page */
const changeFreq = (
  path: string
): 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' => {
  if (path === '' || path === '/program') return 'weekly';
  if (path === '/contact') return 'monthly';
  if (path === '/privacy' || path === '/terms') return 'yearly';
  return 'weekly';
};

/** Priorité SEO (0–1) */
const priority = (path: string): number => {
  if (path === '') return 1;
  if (path === '/program' || path === '/contact') return 0.9;
  if (path === '/about' || path === '/approach' || path === '/gallery') return 0.8;
  return 0.5;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of PAGE_PATHS) {
    const pathSegment = path === '' ? '' : path;
    for (const locale of LOCALES) {
      entries.push({
        url: `${SEO_BASE_URL}/${locale}${pathSegment}`,
        lastModified,
        changeFrequency: changeFreq(path),
        priority: priority(path),
      });
    }
  }

  return entries;
}
