'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import I18nProvider from '@/components/I18nProvider';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ClientLocaleLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const pathname = usePathname();
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    const hasSeenVideo = sessionStorage.getItem('hasSeenIntroVideo');
    if (hasSeenVideo || pathname !== '/fr') {
      setShowUI(true);
    }

    const handleStorage = () => {
      const hasSeenVideo = sessionStorage.getItem('hasSeenIntroVideo');
      if (hasSeenVideo) setShowUI(true);
    };

    window.addEventListener('storage', handleStorage);
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
    <I18nProvider initialLocale={locale as 'fr' | 'en'}>
      {(showUI || pathname !== '/fr') && <Header />}
      <main className="min-h-screen">{children}</main>
      {(showUI || pathname !== '/fr') && (
        <>
          <Footer />
          <WhatsAppButton />
        </>
      )}
    </I18nProvider>
  );
}
