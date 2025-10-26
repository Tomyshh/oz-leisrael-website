'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import Link from 'next/link';

export default function TermsPage() {
  const { t, locale } = useI18n();

  const sections = [
    'section1',
    'section2',
    'section3',
    'section4',
    'section5',
    'section6'
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-4xl font-bold text-primary-900 mb-4">
              {t('terms.title')}
            </h1>
            <p className="text-gray-600">{t('terms.intro')}</p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  {t(`terms.${section}.title`)}
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {t(`terms.${section}.content`)}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

