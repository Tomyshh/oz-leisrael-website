'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import Link from 'next/link';

interface TimeSlot {
  start: string;
  end?: string;
  activity: string;
  activityEn: string;
  color?: string;
}

interface DaySchedule {
  day: string;
  dayEn: string;
  slots: TimeSlot[];
}

const weeklySchedule: DaySchedule[] = [
  {
    day: 'Dimanche',
    dayEn: 'Sunday',
    slots: [
      { start: '07:30', activity: 'Tefila', activityEn: 'Tefila' },
      { start: '08:30', end: '09:15', activity: 'Pakal Koakh + Petit Dej', activityEn: 'Pakal Koakh + Breakfast' },
      { start: '09:15', end: '10:15', activity: 'Moussar et Halakha', activityEn: 'Moussar and Halakha' },
      { start: '10:30', end: '11:15', activity: 'HAVROUTOT GUEMARA', activityEn: 'HAVROUTOT GUEMARA' },
      { start: '12:00', end: '12:45', activity: 'Cours Guemara et Tanakh', activityEn: 'Gemara and Tanakh Class' },
      { start: '13:00', activity: 'Minha', activityEn: 'Mincha' },
      { start: '13:15', end: '15:30', activity: 'Pause dejeuner', activityEn: 'Lunch break' },
      { start: '15:30', end: '18:30', activity: 'KOCHER KRAVI A LA PLAGE', activityEn: 'KOCHER KRAVI AT THE BEACH' },
      { start: '19:15', end: '20:30', activity: 'Repas', activityEn: 'Meal' },
      { start: '20:30', end: '21:30', activity: 'SEDER EREV RABBI ETHAN', activityEn: 'SEDER EREV RABBI ETHAN' },
      { start: '21:30', activity: 'LIBRE', activityEn: 'FREE' },
      { start: '00:00', activity: 'Extinction des feux', activityEn: 'Lights out' },
    ],
  },
  {
    day: 'Lundi',
    dayEn: 'Monday',
    slots: [
      { start: '07:30', activity: 'Tefila', activityEn: 'Tefila' },
      { start: '08:30', end: '09:15', activity: 'Pakal Koakh + Petit Dej', activityEn: 'Pakal Koakh + Breakfast' },
      { start: '09:15', end: '10:15', activity: 'Moussar et Halakha', activityEn: 'Moussar and Halakha' },
      { start: '10:30', end: '12:45', activity: 'OULPAN SIKHOT AVEC RAV AVRAHAM', activityEn: 'OULPAN SIKHOT WITH RAV AVRAHAM' },
      { start: '13:00', activity: 'Minha', activityEn: 'Mincha' },
      { start: '13:15', end: '15:30', activity: 'Pause dejeuner', activityEn: 'Lunch break' },
      { start: '15:30', end: '18:30', activity: 'Psychos + שיחות אישיות ליאור', activityEn: 'Psychos + Personal conversations with Lior' },
      { start: '19:15', end: '20:30', activity: 'Repas', activityEn: 'Meal' },
      { start: '20:30', end: '21:30', activity: 'SEDER EREV RABBI ETHAN', activityEn: 'SEDER EREV RABBI ETHAN' },
      { start: '21:30', activity: 'LIBRE', activityEn: 'FREE' },
      { start: '00:00', activity: 'Extinction des feux', activityEn: 'Lights out' },
    ],
  },
  {
    day: 'Mardi',
    dayEn: 'Tuesday',
    slots: [
      { start: '07:30', activity: 'Tefila', activityEn: 'Tefila' },
      { start: '08:30', end: '09:15', activity: 'Pakal Koakh + Petit Dej', activityEn: 'Pakal Koakh + Breakfast' },
      { start: '09:15', end: '10:15', activity: 'KOUZARI RAV AVNER', activityEn: 'KOUZARI RAV AVNER' },
      { start: '10:30', end: '11:15', activity: 'HAVROUTOT GUEMARA', activityEn: 'HAVROUTOT GUEMARA' },
      { start: '12:00', end: '12:45', activity: 'Cours Guemara et Tanakh', activityEn: 'Gemara and Tanakh Class' },
      { start: '13:00', activity: 'Minha', activityEn: 'Mincha' },
      { start: '13:15', end: '15:30', activity: 'Pause dejeuner', activityEn: 'Lunch break' },
      { start: '15:30', end: '17:00', activity: 'KOCHER KRAVI MEKHINA', activityEn: 'KOCHER KRAVI MEKHINA' },
      { start: '17:00', end: '18:30', activity: 'SEDER EREV RABBI ETHAN A HALISSA', activityEn: 'SEDER EREV RABBI ETHAN AT HALISSA' },
      { start: '19:15', end: '20:30', activity: 'Repas a Halissa', activityEn: 'Meal at Halissa' },
      { start: '20:30', end: '21:30', activity: 'Table ronde a Halissa', activityEn: 'Round table at Halissa' },
      { start: '21:30', activity: 'LIBRE', activityEn: 'FREE' },
      { start: '00:00', activity: 'Extinction des feux', activityEn: 'Lights out' },
    ],
  },
  {
    day: 'Mercredi',
    dayEn: 'Wednesday',
    slots: [
      { start: '07:30', activity: 'Tefila', activityEn: 'Tefila' },
      { start: '08:30', end: '09:15', activity: 'Pakal Koakh + Petit Dej', activityEn: 'Pakal Koakh + Breakfast' },
      { start: '09:15', end: '10:15', activity: 'Moussar et Halakha', activityEn: 'Moussar and Halakha' },
      { start: '10:30', end: '11:15', activity: 'HAVROUTOT GUEMARA', activityEn: 'HAVROUTOT GUEMARA' },
      { start: '12:00', end: '12:45', activity: 'Cours Guemara et Tanakh', activityEn: 'Gemara and Tanakh Class' },
      { start: '13:00', activity: 'Minha', activityEn: 'Mincha' },
      { start: '13:15', end: '15:30', activity: 'Pause dejeuner', activityEn: 'Lunch break' },
      { start: '15:30', end: '17:00', activity: 'OULPAN + SIKHOT avec R\' Shmouel', activityEn: 'OULPAN + SIKHOT with R\' Shmouel' },
      { start: '17:00', end: '18:30', activity: '1/3 Cours du Roch Yechiva la place de jeudi', activityEn: '1/3 Class of the Rosh Yeshiva (Thursday\'s place)' },
      { start: '19:15', end: '21:30', activity: 'Cours du Rav Avraham Pizza (20h00)', activityEn: 'Class of Rav Avraham Pizza (8:00 PM)' },
      { start: '21:30', activity: 'LIBRE', activityEn: 'FREE' },
      { start: '00:00', activity: 'Extinction des feux', activityEn: 'Lights out' },
    ],
  },
  {
    day: 'Jeudi',
    dayEn: 'Thursday',
    slots: [
      { start: '07:30', activity: 'Tefila', activityEn: 'Tefila' },
      { start: '08:30', end: '09:15', activity: 'Pakal Koakh + Petit Dej', activityEn: 'Pakal Koakh + Breakfast' },
      { start: '09:15', end: '10:15', activity: 'Tefila / EMOUNA (R\' Shmouel)', activityEn: 'Tefila / EMOUNA (R\' Shmouel)' },
      { start: '10:30', end: '11:15', activity: 'HAVROUTOT GUEMARA', activityEn: 'HAVROUTOT GUEMARA' },
      { start: '12:00', end: '12:45', activity: 'Cours Guemara et Tanakh', activityEn: 'Gemara and Tanakh Class' },
      { start: '13:00', activity: 'Minha', activityEn: 'Mincha' },
      { start: '13:15', end: '15:30', activity: 'Pause dejeuner', activityEn: 'Lunch break' },
      { start: '15:30', end: '18:30', activity: 'VOLONTARIAT', activityEn: 'VOLUNTEERING' },
      { start: '19:15', end: '21:30', activity: 'COURS ROCH HAYECHIVA RAV ZINI', activityEn: 'CLASS ROSH HAYESHIVA RAV ZINI' },
      { start: '21:30', activity: 'LIBRE', activityEn: 'FREE' },
      { start: '00:00', activity: 'Extinction des feux', activityEn: 'Lights out' },
    ],
  },
  {
    day: 'Vendredi',
    dayEn: 'Friday',
    slots: [
      { start: '07:30', activity: 'Tefila', activityEn: 'Tefila' },
      { start: '08:30', end: '09:15', activity: 'Pakal Koakh + Petit Dej', activityEn: 'Pakal Koakh + Breakfast' },
      { start: '09:15', end: '10:15', activity: 'COURS SUR LA PARACHA', activityEn: 'PARASHA CLASS' },
      { start: '10:30', end: '12:45', activity: 'Psychos Autonome', activityEn: 'Autonomous Psychos' },
      { start: '13:00', activity: 'Minha', activityEn: 'Mincha' },
      { start: '13:15', end: '15:30', activity: 'Pause dejeuner', activityEn: 'Lunch break' },
      { start: '19:15', end: '21:30', activity: 'LIBRE', activityEn: 'FREE' },
      { start: '00:00', activity: 'Extinction des feux', activityEn: 'Lights out' },
    ],
  },
];

export default function DaySchedule() {
  const { t, locale } = useI18n();

  const getTimeDisplay = (slot: TimeSlot) => {
    if (slot.end) {
      return `${slot.start} - ${slot.end}`;
    }
    return slot.start;
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
          {locale === 'fr'
            ? 'Emploi du temps hebdomadaire Oz LeIsrael'
            : 'Oz LeIsrael Weekly Schedule'}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="overflow-x-auto"
      >
        <div className="min-w-full inline-block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {weeklySchedule.map((daySchedule, dayIndex) => (
              <motion.div
                key={daySchedule.day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: dayIndex * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="bg-primary-600 text-white p-4 text-center">
                  <h3 className="text-lg font-bold">
                    {locale === 'fr' ? daySchedule.day : daySchedule.dayEn}
                  </h3>
                </div>
                <div className="p-4 space-y-3 max-h-[800px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {daySchedule.slots.map((slot, slotIndex) => (
                    <div
                      key={slotIndex}
                      className="border-l-4 border-primary-500 pl-3 py-2 hover:border-primary-700 transition-colors duration-200 bg-gray-50 rounded"
                    >
                      <p className="text-xs font-semibold text-primary-600 mb-1">
                        {getTimeDisplay(slot)}
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {locale === 'fr' ? slot.activity : slot.activityEn}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-12 text-center"
      >
        <Link href="/contact" className="btn-primary">
          {t('program.cta')}
        </Link>
      </motion.div>
    </div>
  );
}
