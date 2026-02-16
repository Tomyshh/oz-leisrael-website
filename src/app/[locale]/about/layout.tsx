import type { Metadata } from 'next';
import {
  SEO_BASE_URL,
  PAGE_META,
  canonicalUrl,
  LOCALES,
  type Locale,
} from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale || 'fr') as Locale;
  const meta = PAGE_META.about[locale];
  const path = '/about';
  const canonical = canonicalUrl(path, locale);
  const languages: Record<string, string> = {};
  LOCALES.forEach((l) => {
    languages[l] = canonicalUrl(path, l);
  });

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical, languages },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
      images: [{ url: meta.ogImage || `${SEO_BASE_URL}/images/cover.png`, width: 1200, height: 630, alt: 'Oz LeIsrael' }],
    },
    twitter: { title: meta.title, description: meta.description },
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
