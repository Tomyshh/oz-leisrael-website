'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import { FaSun, FaCloudSun, FaMoon } from 'react-icons/fa';
import Link from 'next/link';

interface ScheduleItem {
  time: string;
  activity: string;
  activityEn: string;
  description: string;
  descriptionEn: string;
}

const morningSchedule: ScheduleItem[] = [
  {
    time: '05:30',
    activity: 'Réveil et préparation',
    activityEn: 'Wake up and preparation',
    description: 'Début de la journée avec énergie',
    descriptionEn: 'Start the day with energy',
  },
  {
    time: '06:00',
    activity: 'Prière du matin (Shaharit)',
    activityEn: 'Morning prayer (Shacharit)',
    description: 'Connection spirituelle pour commencer la journée',
    descriptionEn: 'Spiritual connection to start the day',
  },
  {
    time: '07:00',
    activity: 'Petit-déjeuner',
    activityEn: 'Breakfast',
    description: 'Repas nutritif et équilibré',
    descriptionEn: 'Nutritious and balanced meal',
  },
  {
    time: '08:00 - 12:00',
    activity: 'Étude intensive',
    activityEn: 'Intensive study',
    description: 'Gemara, Halakha, pensée juive avec les meilleurs enseignants',
    descriptionEn: 'Gemara, Halacha, Jewish thought with the best teachers',
  },
];

const afternoonSchedule: ScheduleItem[] = [
  {
    time: '12:00',
    activity: 'Déjeuner',
    activityEn: 'Lunch',
    description: 'Pause repas et repos',
    descriptionEn: 'Meal break and rest',
  },
  {
    time: '14:00 - 17:00',
    activity: 'Entraînement physique',
    activityEn: 'Physical training',
    description: 'Préparation physique intensive, Krav Maga, course, musculation',
    descriptionEn: 'Intensive physical preparation, Krav Maga, running, strength training',
  },
  {
    time: '17:00',
    activity: 'Douche et repos',
    activityEn: 'Shower and rest',
    description: 'Récupération et préparation pour la soirée',
    descriptionEn: 'Recovery and preparation for the evening',
  },
];

const eveningSchedule: ScheduleItem[] = [
  {
    time: '18:00',
    activity: 'Prière de Minha',
    activityEn: 'Mincha prayer',
    description: 'Prière de l\'après-midi',
    descriptionEn: 'Afternoon prayer',
  },
  {
    time: '18:30',
    activity: 'Cours de préparation mentale',
    activityEn: 'Mental preparation class',
    description: 'Développement du leadership et de la résilience',
    descriptionEn: 'Leadership and resilience development',
  },
  {
    time: '19:30',
    activity: 'Dîner',
    activityEn: 'Dinner',
    description: 'Repas communautaire',
    descriptionEn: 'Community meal',
  },
  {
    time: '20:30',
    activity: 'Étude du soir / Activités',
    activityEn: 'Evening study / Activities',
    description: 'Étude personnelle ou activités de groupe',
    descriptionEn: 'Personal study or group activities',
  },
  {
    time: '22:00',
    activity: 'Prière de Maariv et repos',
    activityEn: 'Maariv prayer and rest',
    description: 'Fin de la journée',
    descriptionEn: 'End of the day',
  },
];

export default function DaySchedule() {
  const { t, locale } = useI18n();

  const scheduleData = [
    {
      title: t('program.schedule.morning'),
      icon: FaSun,
      schedule: morningSchedule,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      title: t('program.schedule.afternoon'),
      icon: FaCloudSun,
      schedule: afternoonSchedule,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      title: t('program.schedule.evening'),
      icon: FaMoon,
      schedule: eveningSchedule,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
  ];

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="heading-2 mb-4">{t('program.schedule.title')}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Une journée équilibrée entre étude approfondie de la Torah et préparation physique intensive
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {scheduleData.map((period, index) => (
          <motion.div
            key={period.title}
            variants={itemVariants}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className={`p-6 ${period.bgColor}`}>
              <div className="flex items-center justify-center mb-4">
                <period.icon className={`w-12 h-12 ${period.color}`} />
              </div>
              <h3 className="heading-3 text-center text-gray-900">{period.title}</h3>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {period.schedule.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="border-l-4 border-gray-200 pl-4 py-2 hover:border-primary-500 transition-colors duration-200"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-primary-600">{item.time}</p>
                        <h4 className="font-medium text-gray-900">
                          {locale === 'fr' ? item.activity : item.activityEn}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {locale === 'fr' ? item.description : item.descriptionEn}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12 text-center"
      >
        <Link href="/contact" className="btn-primary">
          {t('program.cta')}
        </Link>
      </motion.div>
    </div>
  );
}
