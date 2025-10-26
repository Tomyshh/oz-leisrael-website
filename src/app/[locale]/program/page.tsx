'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n';
import MediaGallery from '@/components/program/MediaGallery';
import DaySchedule from '@/components/program/DaySchedule';
import TestimonialsGrid from '@/components/program/TestimonialsGrid';

type FilterType = 'videos' | 'photos' | 'schedule' | 'testimonials';

export default function ProgramPage() {
  const { t } = useI18n();
  const [activeFilter, setActiveFilter] = useState<FilterType>('videos');

  const filters: { value: FilterType; label: string }[] = [
    { value: 'videos', label: t('program.filters.videos') },
    { value: 'photos', label: t('program.filters.photos') },
    { value: 'schedule', label: t('program.filters.schedule') },
    { value: 'testimonials', label: t('program.filters.testimonials') },
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
            <h1 className="heading-1 mb-4">{t('program.title')}</h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Découvre notre programme unique qui combine excellence spirituelle et physique
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-gray-100 py-6 sticky top-20 z-30">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeFilter === filter.value
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeFilter === 'videos' && <MediaGallery type="video" />}
            {activeFilter === 'photos' && <MediaGallery type="photo" />}
            {activeFilter === 'schedule' && <DaySchedule />}
            {activeFilter === 'testimonials' && <TestimonialsGrid />}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
