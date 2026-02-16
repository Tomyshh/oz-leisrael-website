import { Montserrat, Oswald } from 'next/font/google';
import type { Metadata } from 'next';
import ClientLocaleLayout from '@/components/ClientLocaleLayout';
import { JsonLd } from '@/components/JsonLd';
import {
  SEO_BASE_URL,
  PAGE_META,
  canonicalUrl,
  LOCALES,
  type Locale,
} from '@/lib/seo';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = (params.locale || 'fr') as Locale;
  const meta = PAGE_META.home[locale];

  const canonical = canonicalUrl('', locale);
  const languages: Record<string, string> = {};
  LOCALES.forEach((l) => {
    languages[l] = canonicalUrl('', l);
  });

  return {
    metadataBase: new URL(SEO_BASE_URL),
    title: {
      default: meta.title,
      template: '%s | Oz LeIsrael',
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: 'Oz LeIsrael', url: SEO_BASE_URL }],
    creator: 'Oz LeIsrael',
    publisher: 'Oz LeIsrael',
    formatDetection: { email: false, address: false, telephone: false },
    alternates: {
      canonical,
      languages: languages,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      url: canonical,
      siteName: 'Oz LeIsrael',
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: meta.ogImage || `${SEO_BASE_URL}/images/cover.png`,
          width: 1200,
          height: 630,
          alt: 'Oz LeIsrael',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [meta.ogImage || `${SEO_BASE_URL}/images/cover.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    viewport: { width: 'device-width', initialScale: 1, viewportFit: 'cover' },
    themeColor: '#000000',
    verification: {
      // À remplir si vous utilisez Google Search Console ou Bing
      // google: 'xxx',
      // yandex: 'xxx',
    },
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = (params.locale || 'fr') as Locale;

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} ${oswald.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="font-sans">
        <JsonLd locale={locale} />
        <ClientLocaleLayout locale={locale}>{children}</ClientLocaleLayout>
      </body>
    </html>
  );
}
