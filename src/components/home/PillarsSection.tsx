'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';

const pillars = [
  {
    key: 'spiritual',
    image: '/images/spiritual-preparation.jpg',
    href: '/approach#spiritual',
  },
  {
    key: 'physical',
    image: '/images/physical-preparation.jpg',
    href: '/approach#physical',
  },
  {
    key: 'zionism',
    image: '/images/zionism-community.jpg',
    href: '/approach#zionism',
  },
];

export default function PillarsSection() {
  const { t } = useI18n();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section ref={ref} className="section-padding bg-gray-50">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.key}
              variants={itemVariants}
              className="group"
            >
              <Link href={pillar.href} className="block relative overflow-hidden rounded-lg shadow-lg">
                <div className="aspect-w-16 aspect-h-9 relative h-64">
                  <Image
                    src={pillar.image}
                    alt={t(`pillars.${pillar.key}.title`)}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="heading-3 mb-2">
                      {t(`pillars.${pillar.key}.title`)}
                    </h3>
                    <p className="text-sm opacity-90">
                      {t(`pillars.${pillar.key}.description`)}
                    </p>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
