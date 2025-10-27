'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useI18n } from '@/lib/i18n';
import { FaGraduationCap, FaHandshake, FaMedal, FaStar } from 'react-icons/fa';
import { memo, useMemo } from 'react';

const missionItems = [
  {
    key: 'elite',
    icon: FaMedal,
  },
  {
    key: 'unity',
    icon: FaHandshake,
  },
  {
    key: 'integrate',
    icon: FaStar,
  },
  {
    key: 'framework',
    icon: FaGraduationCap,
  },
];

function MissionSection() {
  const { t } = useI18n();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
      },
    },
  }), []);

  return (
    <section ref={ref} className="section-padding">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="heading-2 text-center mb-12"
        >
          {t('mission.title')}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {missionItems.map((item) => (
            <motion.div
              key={item.key}
              variants={itemVariants}
              className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary-600" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  {t(`mission.${item.key}`)}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(MissionSection);
