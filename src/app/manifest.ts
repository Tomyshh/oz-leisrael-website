import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Oz LeIsrael - La Force de la Torah, l\'Elite de Tsahal',
    short_name: 'Oz LeIsrael',
    description:
      "Programme unique combinant préparation spirituelle et physique pour intégrer l'élite de Tsahal.",
    // Si vous avez une redirection canonical (www/non-www), elle doit correspondre à SITE_URL
    start_url: '/fr',
    scope: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    lang: 'fr',
    categories: ['education', 'lifestyle'],
    icons: [
      {
        src: '/images/cover.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
