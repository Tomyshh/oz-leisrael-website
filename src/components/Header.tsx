'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { useI18n } from '@/lib/i18n';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, locale, changeLocale } = useI18n();
  const pathname = usePathname();
  
  // Vérifier si on est sur la page d'accueil
  const isHomePage = pathname === `/${locale}` || pathname === '/fr' || pathname === '/en';

  useEffect(() => {
    const handleScroll = () => {
      // Sur la page d'accueil, on devient opaque après avoir scrollé
      // Sur les autres pages, on est toujours blanc
      if (isHomePage) {
        setIsScrolled(window.scrollY > 100);
      } else {
        setIsScrolled(true);
      }
    };

    // Initialiser l'état au chargement
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navigation = [
    { name: t('nav.home'), href: `/${locale}` },
    { name: t('nav.program'), href: `/${locale}/program` },
    { name: t('nav.approach'), href: `/${locale}/approach` },
    { name: t('nav.about'), href: `/${locale}/about` },
    { name: t('nav.contact'), href: `/${locale}/contact` },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white shadow-lg' 
          : isHomePage 
            ? 'bg-transparent' 
            : 'bg-white shadow-lg'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Oz LeIsrael"
              width={50}
              height={50}
              className="mr-3"
            />
            <span className={`font-display text-2xl font-bold transition-colors duration-500 ${
              isScrolled || !isHomePage ? 'text-primary-900' : 'text-white drop-shadow-lg'
            }`}>
              Oz LeIsrael
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition-colors duration-500 font-medium ${
                  isScrolled || !isHomePage 
                    ? 'text-gray-700 hover:text-primary-600' 
                    : 'text-white hover:text-gray-200 drop-shadow-lg'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => changeLocale('fr')}
                className={`px-2 py-1 rounded transition-all duration-500 ${
                  locale === 'fr'
                    ? 'bg-primary-600 text-white'
                    : isScrolled || !isHomePage
                      ? 'bg-gray-200 text-gray-700'
                      : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => changeLocale('en')}
                className={`px-2 py-1 rounded transition-all duration-500 ${
                  locale === 'en'
                    ? 'bg-primary-600 text-white'
                    : isScrolled || !isHomePage
                      ? 'bg-gray-200 text-gray-700'
                      : 'bg-white/20 text-white backdrop-blur-sm hover:bg-white/30'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden transition-colors duration-500 ${
              isScrolled || !isHomePage 
                ? 'text-gray-700 hover:text-primary-600' 
                : 'text-white hover:text-gray-200'
            }`}
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0 }}
          className={`lg:hidden overflow-hidden transition-colors duration-500 ${
            isScrolled || !isHomePage ? 'bg-white' : 'bg-black/80 backdrop-blur-md'
          }`}
        >
          <div className="pt-4 pb-3 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
                  isScrolled || !isHomePage
                    ? 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    : 'text-white hover:text-gray-200 hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Language Switcher */}
            <div className={`flex items-center space-x-2 px-3 pt-3 border-t ${
              isScrolled || !isHomePage ? 'border-gray-200' : 'border-white/20'
            }`}>
              <button
                onClick={() => {
                  changeLocale('fr');
                  setIsMenuOpen(false);
                }}
                className={`px-3 py-1 rounded transition-all duration-500 ${
                  locale === 'fr'
                    ? 'bg-primary-600 text-white'
                    : isScrolled || !isHomePage
                      ? 'bg-gray-200 text-gray-700'
                      : 'bg-white/20 text-white backdrop-blur-sm'
                }`}
              >
                Français
              </button>
              <button
                onClick={() => {
                  changeLocale('en');
                  setIsMenuOpen(false);
                }}
                className={`px-3 py-1 rounded transition-all duration-500 ${
                  locale === 'en'
                    ? 'bg-primary-600 text-white'
                    : isScrolled || !isHomePage
                      ? 'bg-gray-200 text-gray-700'
                      : 'bg-white/20 text-white backdrop-blur-sm'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </motion.div>
      </nav>
    </header>
  );
}
