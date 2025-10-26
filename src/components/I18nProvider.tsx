'use client';

import { useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { I18nContext, Locale } from '@/lib/i18n';

interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export default function I18nProvider({ children, initialLocale = 'fr' }: I18nProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const [translations, setTranslations] = useState<Record<string, any>>({});

  // Extract locale from pathname
  useEffect(() => {
    const pathLocale = pathname.split('/')[1] as Locale;
    if (pathLocale === 'fr' || pathLocale === 'en') {
      setLocale(pathLocale);
    }
  }, [pathname]);

  useEffect(() => {
    loadTranslations(locale);
  }, [locale]);

  const loadTranslations = async (newLocale: Locale) => {
    try {
      const translationModule = await import(`@/locales/${newLocale}/common.json`);
      setTranslations(translationModule.default);
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  const changeLocale = (newLocale: Locale) => {
    // Get current path without locale
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    
    router.push(newPath);
    
    // Store locale preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }
  };

  return (
    <I18nContext.Provider value={{ locale, t, changeLocale }}>
      {children}
    </I18nContext.Provider>
  );
}
