import { createContext, useContext } from 'react';

export type Locale = 'fr' | 'en';

interface I18nContextType {
  locale: Locale;
  t: (key: string) => string;
  changeLocale: (locale: Locale) => void;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export const translations = {
  fr: () => import('@/locales/fr/common.json'),
  en: () => import('@/locales/en/common.json'),
};
