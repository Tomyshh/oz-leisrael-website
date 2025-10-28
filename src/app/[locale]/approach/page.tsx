'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useI18n } from '@/lib/i18n';
import Image from 'next/image';
import Link from 'next/link';
import { FaBook, FaDumbbell, FaArrowRight } from 'react-icons/fa';

export default function ApproachPage() {
  const { t } = useI18n();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const processSteps = [
    {
      number: '01',
      key: 'step1',
      icon: '📞',
    },
    {
      number: '02',
      key: 'step2',
      icon: '🤝',
    },
    {
      number: '03',
      key: 'step3',
      icon: '✅',
    },
    {
      number: '04',
      key: 'step4',
      icon: '📚',
    },
    {
      number: '05',
      key: 'step5',
      icon: '🎯',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 text-gray-900 py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="heading-1 mb-4">{t('approach.title')}</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t('approach.intro')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Les Deux Piliers */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Kodesh */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-xl overflow-hidden"
              id="spiritual"
            >
              <div className="relative h-64">
                <Image
                  src="/images/kodesh-study.jpeg"
                  alt="Étude de la Torah"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <FaBook size={40} />
                </div>
              </div>
              <div className="p-8">
                <h2 className="heading-3 mb-4">{t('approach.kodesh.title')}</h2>
                <p className="text-gray-700 mb-6">
                  {t('approach.kodesh.description')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Étude approfondie du Talmud et de la Halakha</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Cours de pensée juive et philosophie</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Développement spirituel personnel</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Accompagnement par des rabbins expérimentés</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Hol */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-lg shadow-xl overflow-hidden"
              id="physical"
            >
              <div className="relative h-64">
                <Image
                  src="/images/hol-training.jpeg"
                  alt="Entraînement physique"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <FaDumbbell size={40} />
                </div>
              </div>
              <div className="p-8">
                <h2 className="heading-3 mb-4">{t('approach.hol.title')}</h2>
                <p className="text-gray-700 mb-6">
                  {t('approach.hol.description')}
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Entraînement physique intensif quotidien</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Krav Maga et techniques de combat</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Préparation mentale et leadership</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>Simulation des tests d&apos;unités d&apos;élite</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={ref} className="section-padding bg-gray-50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4">{t('approach.process.title')}</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Connecting Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 hidden md:block" />

              {/* Steps */}
              <div className="space-y-8">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.key}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-6"
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl relative z-10">
                      {step.icon}
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="text-xl font-semibold mb-2">
                        {t(`approach.process.${step.key}`)}
                      </h3>
                      <p className="text-gray-600">
                        {t(`approach.process.${step.key}Desc`)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <p className="text-xl font-semibold mb-6">{t('approach.start')}</p>
            <Link href="/contact" className="btn-primary">
              {t('contact.submit')} <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
