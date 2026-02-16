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
        "Programme unique combinant préparation spirituelle et physique pour intégrer l'élite de Tsahal. Mekhina / année préparatoire Torah et sport avant armée.",
      keywords:
        'Tsahal, IDF, Torah, Mekhina, préparation militaire, Israël, élite, sayerot, année préparatoire, yeshiva',
      ogImage: defaultOgImage,
    },
    en: {
      title: 'Oz LeIsrael - The Strength of Torah, The Elite of Tsahal',
      description:
        "Unique program combining spiritual and physical preparation to join Tsahal's elite. Mekhina / preparatory year of Torah and sport before the army.",
      keywords:
        'IDF, Tsahal, Torah, Mekhina, military preparation, Israel, elite, sayerot, preparatory year, yeshiva',
      ogImage: defaultOgImage,
    },
  },
  program: {
    fr: {
      title: 'Le Programme | Oz LeIsrael',
      description:
        "Découvrez le programme Oz LeIsrael : journée type, entraînement, étude de la Torah, témoignages et médias. Préparation à l'élite de Tsahal.",
      keywords: 'programme Oz LeIsrael, journée type, entraînement, Torah, témoignages, Tsahal',
      ogImage: defaultOgImage,
    },
    en: {
      title: 'The Program | Oz LeIsrael',
      description:
        "Discover the Oz LeIsrael program: typical day, training, Torah study, testimonials and media. Preparation for Tsahal's elite.",
      keywords: 'Oz LeIsrael program, schedule, training, Torah, testimonials, IDF',
      ogImage: defaultOgImage,
    },
  },
  approach: {
    fr: {
      title: 'Notre Approche | Oz LeIsrael',
      description:
        "Notre approche : Torah, fraternité, excellence. Une formation unique qui forge l'élite de demain pour Israël.",
      keywords: 'approche Oz LeIsrael, Torah, fraternité, excellence, formation',
      ogImage: defaultOgImage,
    },
    en: {
      title: 'Our Approach | Oz LeIsrael',
      description:
        'Our approach: Torah, brotherhood, excellence. A unique training that forges tomorrow\'s elite for Israel.',
      keywords: 'Oz LeIsrael approach, Torah, brotherhood, excellence, training',
      ogImage: defaultOgImage,
    },
  },
  about: {
    fr: {
      title: 'La Mekhina | Oz LeIsrael',
      description:
        "Présentation de la Mekhina Oz LeIsrael : valeurs, équipe, cadre. La préparation spirituelle et physique pour les unités d'élite.",
      keywords: 'Mekhina Oz LeIsrael, valeurs, yeshiva, unités élite',
      ogImage: defaultOgImage,
    },
    en: {
      title: 'The Mekhina | Oz LeIsrael',
      description:
        "Discover the Oz LeIsrael Mekhina: values, team, framework. Spiritual and physical preparation for elite units.",
      keywords: 'Oz LeIsrael Mekhina, values, yeshiva, elite units',
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
  name: 'Oz LeIsrael',
  url: SITE_URL,
  description:
    "Programme unique combinant préparation spirituelle et physique pour intégrer l'élite de Tsahal.",
  sameAs: [] as string[],
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
