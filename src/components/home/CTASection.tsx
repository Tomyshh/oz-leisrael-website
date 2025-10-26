'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';
import { FaWhatsapp } from 'react-icons/fa';

export default function CTASection() {
  const { t } = useI18n();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const whatsappNumber = '972537081718';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <section ref={ref} className="section-padding bg-primary-50 border-t border-primary-100">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-gray-900 max-w-3xl mx-auto"
        >
          <h2 className="heading-2 mb-4">{t('cta.ready')}</h2>
          <p className="text-xl mb-8 opacity-90">{t('cta.talk')}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors duration-200 inline-flex items-center justify-center"
            >
              {t('contact.submit')}
            </Link>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200 inline-flex items-center justify-center"
            >
              <FaWhatsapp className="mr-2" size={20} />
              {t('contact.whatsapp')}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
