'use client';

import { Montserrat, Oswald } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import I18nProvider from '@/components/I18nProvider';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

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

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const pathname = usePathname();
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    // Vérifier si la vidéo intro a été vue
    const hasSeenVideo = sessionStorage.getItem('hasSeenIntroVideo');
    if (hasSeenVideo || pathname !== '/fr') {
      setShowUI(true);
    }

    // Écouter les changements de sessionStorage
    const handleStorage = () => {
      const hasSeenVideo = sessionStorage.getItem('hasSeenIntroVideo');
      if (hasSeenVideo) {
        setShowUI(true);
      }
    };

    window.addEventListener('storage', handleStorage);
    
    // Vérifier périodiquement sur la page d'accueil
    const interval = setInterval(() => {
      const hasSeenVideo = sessionStorage.getItem('hasSeenIntroVideo');
      if (hasSeenVideo) {
        setShowUI(true);
        clearInterval(interval);
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, [pathname]);

  return (
    <html lang={params.locale} className={`${montserrat.variable} ${oswald.variable}`}>
      <head>
        <title>Oz LeIsrael - La Force de la Torah, l&apos;Elite de Tsahal</title>
        <meta name="description" content="Programme unique combinant préparation spirituelle et physique pour intégrer l'élite de Tsahal" />
        <meta name="keywords" content="Tsahal, IDF, Torah, Mekhina, préparation militaire, Israël, élite, sayerot" />
        
        {/* Viewport et responsive */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        {/* Performance hints */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#000000" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Oz LeIsrael - La Force de la Torah, l'Elite de Tsahal" />
        <meta property="og:description" content="Programme unique combinant préparation spirituelle et physique pour intégrer l'élite de Tsahal" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/cover.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Oz LeIsrael - La Force de la Torah, l'Elite de Tsahal" />
        <meta name="twitter:description" content="Programme unique combinant préparation spirituelle et physique pour intégrer l'élite de Tsahal" />
        <meta name="twitter:image" content="/images/cover.png" />
      </head>
      <body className="font-sans">
        <I18nProvider initialLocale={params.locale as 'fr' | 'en'}>
          {(showUI || pathname !== '/fr') && <Header />}
          <main className="min-h-screen">
            {children}
          </main>
          {(showUI || pathname !== '/fr') && (
            <>
              <Footer />
              <WhatsAppButton />
            </>
          )}
        </I18nProvider>
      </body>
    </html>
  );
}
