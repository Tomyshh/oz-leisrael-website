'use client';

import { useState, useEffect, memo, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { useI18n } from '@/lib/i18n';
import { usePathname } from 'next/navigation';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useI18n();
  const pathname = usePathname();
  
  // Vérifier si on est sur la page d'accueil
  const isHomePage = useMemo(() => pathname === '/fr' || pathname === '/fr/', [pathname]);

  // Fonction pour vérifier si le lien est actif
  const isActive = useCallback((href: string) => {
    if (href === '/fr') {
      return pathname === '/fr' || pathname === '/fr/';
    }
    return pathname.startsWith(href);
  }, [pathname]);

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const navigation = useMemo(() => [
    { name: t('nav.home'), href: '/fr' },
    { name: t('nav.program'), href: '/fr/program' },
    { name: t('nav.approach'), href: '/fr/approach' },
    { name: t('nav.about'), href: '/fr/about' },
    { name: t('nav.contact'), href: '/fr/contact' },
  ], [t]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

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
          <Link href="/fr" className="flex items-center">
            <Image
              src="/images/logo.png?v=2"
              alt="Oz LeIsrael"
              width={50}
              height={50}
              className="mr-3"
              priority
              unoptimized
            />
            <span className={`font-display text-2xl font-bold transition-colors duration-500 ${
              isScrolled || !isHomePage ? 'text-primary-900' : 'text-white drop-shadow-lg'
            }`}>
              Oz LeIsrael
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative group"
                >
                  <span className={`transition-colors duration-500 font-medium ${
                    isScrolled || !isHomePage 
                      ? active 
                        ? 'text-primary-600' 
                        : 'text-gray-700 hover:text-primary-600'
                      : 'text-white hover:text-gray-200 drop-shadow-lg'
                  }`}>
                    {item.name}
                  </span>
                  {/* Indicateur moderne pour l'onglet actif */}
                  {active && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                        isScrolled || !isHomePage ? 'bg-primary-600' : 'bg-white'
                      }`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`lg:hidden transition-colors duration-500 ${
              isScrolled || !isHomePage 
                ? 'text-gray-700 hover:text-primary-600' 
                : 'text-white hover:text-gray-200'
            }`}
            aria-label="Menu"
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
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md transition-colors duration-200 relative ${
                    isScrolled || !isHomePage
                      ? active
                        ? 'text-primary-600 bg-primary-50 font-semibold'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      : active
                        ? 'text-white bg-white/20 font-semibold'
                        : 'text-white hover:text-gray-200 hover:bg-white/10'
                  }`}
                  onClick={closeMenu}
                >
                  {item.name}
                  {/* Indicateur visuel pour mobile */}
                  {active && (
                    <span className={`absolute left-0 top-0 bottom-0 w-1 rounded-r-full ${
                      isScrolled || !isHomePage ? 'bg-primary-600' : 'bg-white'
                    }`} />
                  )}
                </Link>
              );
            })}
          </div>
        </motion.div>
      </nav>
    </header>
  );
}

export default memo(Header);
