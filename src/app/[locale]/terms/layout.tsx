import type { Metadata } from 'next';
import {
  SITE_URL,
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
  const meta = PAGE_META.terms[locale];
  const path = '/terms';
  const canonical = canonicalUrl(path, locale);
  const languages: Record<string, string> = {};
  LOCALES.forEach((l) => {
    languages[l] = canonicalUrl(path, l);
  });

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical, languages },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonical,
    },
    robots: { index: true, follow: true },
  };
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
