'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useI18n } from '@/lib/i18n';

export default function Footer() {
  const { t } = useI18n();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.program'), href: '/program' },
    { name: t('nav.approach'), href: '/approach' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebook, href: '#' },
    { name: 'Instagram', icon: FaInstagram, href: '#' },
    { name: 'YouTube', icon: FaYoutube, href: '#' },
  ];

  return (
    <footer className="bg-gray-100 text-gray-900 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/images/logo.png"
                alt="Oz LeIsrael"
                width={40}
                height={40}
                className="mr-3"
              />
              <span className="font-display text-xl font-bold">Oz LeIsrael</span>
            </div>
            <p className="text-gray-600 mb-4">
              {t('hero.subtitle')}
            </p>
            
            {/* Partner Logo */}
            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">En partenariat avec</p>
              <div className="bg-primary-50 border border-primary-200 p-3 rounded inline-block">
                <span className="text-primary-900 font-bold">Yeshiva Or Vishua</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Oz LeIsrael. {t('footer.rights')}.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-primary-600 text-sm transition-colors duration-200"
              >
                {t('footer.privacy')}
              </Link>
              <Link
                href="/terms"
                className="text-gray-600 hover:text-primary-600 text-sm transition-colors duration-200"
              >
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
