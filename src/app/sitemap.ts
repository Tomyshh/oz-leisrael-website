import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ozleisrael.org';

  const routes = [
    '',
    '/program',
    '/approach',
    '/about',
    '/contact',
  ];

  const sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Add language variants
  const languages = ['fr', 'en'];
  const fullSitemap: MetadataRoute.Sitemap = [];

  sitemap.forEach((entry) => {
    languages.forEach((lang) => {
      fullSitemap.push({
        ...entry,
        url: `${entry.url}${lang === 'fr' ? '' : `?lang=${lang}`}`,
      });
    });
  });

  return fullSitemap;
}
