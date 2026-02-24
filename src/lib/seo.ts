/**
 * Configuration SEO centralisée - Oz LeIsrael
 * Base URL, métadonnées par page, schémas JSON-LD
 */

/**
 * URL canonique du site.
 * Best practice: le sitemap/robots/canonicals DOIVENT utiliser le même host
 * que celui déclaré dans Google Search Console.
 *
 * À configurer en prod via `SITE_URL` (ou `NEXT_PUBLIC_SITE_URL`).
 * Ex: https://oz-leisrael.com
 */
function normalizeSiteUrl(input: string): string {
  return input.replace(/\/+$/, '');
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    // défaut sécurisé (à ajuster si votre domaine canonique est différent)
    'https://oz-leisrael.com'
);

export type Locale = 'fr' | 'en';

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}

const defaultOgImage = `${SITE_URL}/images/cover.png`;

/** Métadonnées par page et par locale */
export const PAGE_META: Record<string, Record<Locale, PageMeta>> = {
  home: {
    fr: {
      title: "Oz LeIsrael - La Force de la Torah, l'Elite de Tsahal",
      description:
        "Yeshiva / Mekhina à Haïfa : étude de la Torah et préparation physique & mentale pour intégrer l'armée (Tsahal) et viser les unités d'élite.",
      keywords:
        "préparation armée, Tsahal, IDF, yeshiva, étude de la Torah, Mekhina, Haïfa, préparation physique, préparation mentale, unités d'élite, sayerot, année préparatoire, Rav Zini",
      ogImage: defaultOgImage,
    },
    en: {
      title: 'Oz LeIsrael - The Strength of Torah, The Elite of Tsahal',
      description:
        "Yeshiva / Mekhina in Haifa: Torah study with physical & mental preparation to join the army (IDF) and aim for elite units.",
      keywords:
        'army preparation, IDF, Tsahal, yeshiva, Torah study, Mekhina, Haifa, physical preparation, mental preparation, elite units, sayerot, preparatory year, Rav Zini',
      ogImage: defaultOgImage,
    },
  },
  program: {
    fr: {
      title: 'Le Programme | Oz LeIsrael',
      description:
        "Programme Oz LeIsrael à Haïfa : journée type, entraînement, étude de la Torah, préparation physique & mentale, témoignages et médias. Préparation à l'armée (Tsahal).",
      keywords:
        "programme Oz LeIsrael, Haïfa, préparation armée, Tsahal, yeshiva, étude de la Torah, journée type, entraînement, préparation physique, préparation mentale, unités d'élite",
      ogImage: defaultOgImage,
    },
    en: {
      title: 'The Program | Oz LeIsrael',
      description:
        'Oz LeIsrael program in Haifa: daily schedule, training, Torah study, physical & mental preparation, testimonials and media. Army (IDF) preparation.',
      keywords:
        'Oz LeIsrael program, Haifa, army preparation, IDF, yeshiva, Torah study, daily schedule, training, physical preparation, mental preparation, elite units',
      ogImage: defaultOgImage,
    },
  },
  approach: {
    fr: {
      title: 'Notre Approche | Oz LeIsrael',
      description:
        "Notre approche : Torah, yeshiva, fraternité et excellence. Une formation à Haïfa qui forge une préparation spirituelle, physique et mentale avant l'armée.",
      keywords:
        "approche Oz LeIsrael, yeshiva, étude de la Torah, Haïfa, fraternité, excellence, préparation armée, préparation physique, préparation mentale",
      ogImage: defaultOgImage,
    },
    en: {
      title: 'Our Approach | Oz LeIsrael',
      description:
        "Our approach: Torah, yeshiva, brotherhood, excellence. A Haifa-based framework for spiritual, physical and mental preparation before the army.",
      keywords:
        'Oz LeIsrael approach, yeshiva, Torah study, Haifa, brotherhood, excellence, army preparation, physical preparation, mental preparation',
      ogImage: defaultOgImage,
    },
  },
  about: {
    fr: {
      title: 'La Mekhina | Oz LeIsrael',
      description:
        "Présentation de la Mekhina / yeshiva Oz LeIsrael à Haïfa : valeurs, cadre et accompagnement. Étude de la Torah et préparation physique & mentale avant l'armée.",
      keywords:
        "Mekhina Oz LeIsrael, yeshiva, Haïfa, étude de la Torah, préparation armée, préparation physique, préparation mentale, unités d'élite, Rav Zini",
      ogImage: defaultOgImage,
    },
    en: {
      title: 'The Mekhina | Oz LeIsrael',
      description:
        'Discover the Oz LeIsrael Mekhina / yeshiva in Haifa: values, framework and support. Torah study with physical & mental preparation before the army.',
      keywords:
        'Oz LeIsrael Mekhina, yeshiva, Haifa, Torah study, army preparation, physical preparation, mental preparation, elite units, Rav Zini',
      ogImage: defaultOgImage,
    },
  },
  gallery: {
    fr: {
      title: 'Galerie | Oz LeIsrael',
      description:
        'Galerie photos Oz LeIsrael : Torah, entraînement, communauté. Découvrez notre quotidien en images.',
      keywords: 'galerie Oz LeIsrael, photos, Torah, entraînement',
      ogImage: defaultOgImage,
    },
    en: {
      title: 'Gallery | Oz LeIsrael',
      description:
        'Oz LeIsrael photo gallery: Torah, training, community. Discover our daily life in pictures.',
      keywords: 'Oz LeIsrael gallery, photos, Torah, training',
      ogImage: defaultOgImage,
    },
  },
  contact: {
    fr: {
      title: 'Contact | Oz LeIsrael',
      description:
        "Contactez Oz LeIsrael pour rejoindre le programme. Candidature, renseignements et entretien. Rejoins l'élite.",
      keywords: 'contact Oz LeIsrael, candidature, programme, recrutement',
      ogImage: defaultOgImage,
    },
    en: {
      title: 'Contact | Oz LeIsrael',
      description:
        'Contact Oz LeIsrael to join the program. Application, information and interview. Join the elite.',
      keywords: 'Oz LeIsrael contact, application, program, recruitment',
      ogImage: defaultOgImage,
    },
  },
  privacy: {
    fr: {
      title: 'Politique de confidentialité | Oz LeIsrael',
      description: 'Politique de confidentialité et protection des données personnelles - Oz LeIsrael.',
      ogImage: defaultOgImage,
    },
    en: {
      title: 'Privacy Policy | Oz LeIsrael',
      description: 'Privacy policy and personal data protection - Oz LeIsrael.',
      ogImage: defaultOgImage,
    },
  },
  terms: {
    fr: {
      title: 'Mentions légales | Oz LeIsrael',
      description: 'Mentions légales et conditions d\'utilisation du site Oz LeIsrael.',
      ogImage: defaultOgImage,
    },
    en: {
      title: 'Terms of Use | Oz LeIsrael',
      description: 'Legal notice and terms of use of the Oz LeIsrael website.',
      ogImage: defaultOgImage,
    },
  },
};

/** Chemins des pages (sans locale) pour le sitemap et les alternates */
export const PAGE_PATHS = [
  '',
  '/program',
  '/approach',
  '/about',
  '/gallery',
  '/contact',
  '/privacy',
  '/terms',
] as const;

export const LOCALES: Locale[] = ['fr', 'en'];

/** Construire l’URL canonique pour une locale et un path */
export function canonicalUrl(path: string, locale: Locale): string {
  const base = path === '' ? '' : path;
  return `${SITE_URL}/${locale}${base}`;
}

/** Données pour le schéma JSON-LD Organization / WebSite */
export const JSON_LD_ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}#organization`,
  name: 'Oz LeIsrael',
  url: SITE_URL,
  description:
    "Programme unique combinant préparation spirituelle et physique pour intégrer l'élite de Tsahal.",
  keywords:
    "préparation armée, yeshiva, étude de la Torah, préparation physique, préparation mentale, Haïfa, Tsahal, unités d'élite",
  knowsAbout: [
    'Torah study',
    'Yeshiva',
    'Army preparation',
    'Physical preparation',
    'Mental preparation',
    'IDF / Tsahal',
    'Haifa',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Haifa',
    addressCountry: 'IL',
  },
  areaServed: [{ '@type': 'City', name: 'Haifa' }, { '@type': 'Country', name: 'Israel' }],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'informations',
      telephone: '+972585767105',
      availableLanguage: ['fr', 'en'],
      url: 'https://wa.me/972585767105',
    },
  ],
  sameAs: ['https://www.instagram.com/oz_leisrael/'] as string[],
  member: [{ '@type': 'Person', name: 'Rav Zini', jobTitle: 'Rav' }],
};

export function getJsonLdWebSite(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Oz LeIsrael',
    url: `${SITE_URL}/${locale}`,
    description:
      locale === 'fr'
        ? "Programme unique combinant préparation spirituelle et physique pour intégrer l'élite de Tsahal."
        : "Unique program combining spiritual and physical preparation to join Tsahal's elite.",
    inLanguage: locale === 'fr' ? 'fr-FR' : 'en-US',
    publisher: { '@id': `${SITE_URL}#organization` },
    potentialAction: {
      '@type': 'ContactAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://wa.me/972585767105',
        actionPlatform: ['https://schema.org/WhatsApp'],
      },
    },
  };
}
