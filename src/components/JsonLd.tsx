import { SITE_URL, getJsonLdWebSite, JSON_LD_ORGANIZATION } from '@/lib/seo';
import type { Locale } from '@/lib/seo';

export function JsonLd({ locale }: { locale: Locale }) {
  const website = getJsonLdWebSite(locale);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...JSON_LD_ORGANIZATION,
            url: `${SITE_URL}/${locale}`,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
