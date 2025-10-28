'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useI18n } from '@/lib/i18n';
import Image from 'next/image';
import { FaHeart, FaHandshake, FaStar, FaUsers } from 'react-icons/fa';

const values = [
  {
    icon: FaHeart,
    title: 'Amour de la Torah',
    description: 'Au cœur de notre programme, l\'étude et la pratique de la Torah guident chaque aspect de notre formation.',
  },
  {
    icon: FaHandshake,
    title: 'Fraternité',
    description: 'Nous créons des liens indéfectibles entre les participants, formant une véritable famille.',
  },
  {
    icon: FaStar,
    title: 'Excellence',
    description: 'Nous visons l\'excellence dans tous les domaines, spirituel, physique et mental.',
  },
  {
    icon: FaUsers,
    title: 'Engagement',
    description: 'Un engagement total envers le peuple juif et l\'État d\'Israël anime notre mission.',
  },
];

const testimonialQuotes = [
  {
    quote: 'Oz LeIsrael transforme des jeunes en leaders, prêts à servir avec excellence.',
    author: 'Rav Avraham Journo',
    role: 'Directeur spirituel',
  },
  {
    quote: 'L\'alliance entre force physique et spirituelle crée des soldats d\'élite complets.',
    author: 'Colonel (rés.) David Levy',
    role: 'Conseiller militaire',
  },
  {
    quote: 'Nos élèves intègrent les meilleures unités car ils sont préparés dans toutes les dimensions.',
    author: 'Lior Azoulay',
    role: 'Instructeur en chef',
  },
];

export default function AboutPage() {
  const { t } = useI18n();
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [partnerRef, partnerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [testimonialsRef, testimonialsInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-primary-50 to-primary-100 text-gray-900">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="/images/beit-midrash.jpg"
            alt="Beit Midrash"
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="heading-1 mb-4">{t('about.title')}</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Former les futurs défenseurs d&apos;Israël avec les valeurs de la Torah
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={missionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="heading-2 mb-6">{t('about.mission.title')}</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {t('about.mission.description')}
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Notre vision est claire : créer une génération de soldats d&apos;élite qui portent 
              en eux la force de la Torah et l&apos;engagement absolu envers leur peuple et leur terre. 
              Nous croyons qu&apos;un soldat fort spirituellement est invincible sur le terrain.
            </p>
          </motion.div>

          {/* Values Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={missionInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={missionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Partner Section */}
      <section ref={partnerRef} className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={partnerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="heading-2 mb-6">{t('about.partner.title')}</h2>
              <p className="text-lg text-gray-700 mb-6">
                {t('about.partner.description')}
              </p>
              <p className="text-gray-700 mb-4">
                La mekhina Oz LeIsrael est reconnue pour son excellence dans l&apos;enseignement de la Torah 
                et son approche moderne de la formation spirituelle. Située dans un cadre inspirant, 
                elle offre un environnement idéal pour l&apos;étude approfondie et le développement personnel.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Rabbins de renommée internationale</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Programme d&apos;étude structuré et intensif</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Infrastructure moderne et accueillante</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 mr-2">✓</span>
                  <span>Communauté chaleureuse et soutenante</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={partnerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/yeshiva-or-vishua.jpg"
                  alt="La mekhina Oz LeIsrael"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <p className="font-display text-2xl font-bold text-primary-600">La mekhina</p>
                  <p className="font-display text-2xl font-bold text-primary-600">Oz LeIsrael</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="section-padding">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-2">{t('about.testimonials.title')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonialQuotes.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <svg
                  className="w-10 h-10 text-primary-500 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-gray-700 italic mb-6">&quot;{testimonial.quote}&quot;</p>
                <div className="border-t pt-4">
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
