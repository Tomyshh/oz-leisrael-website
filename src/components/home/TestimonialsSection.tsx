'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useI18n } from '@/lib/i18n';
import { FaPlay, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: 'David Cohen',
    unit: 'Sayeret Matkal',
    videoUrl: '/videos/testimonial-1.mp4',
    thumbnail: '/images/testimonial-1-thumb.jpg',
    quote: 'Oz LeIsrael m\'a préparé physiquement et spirituellement pour réussir les tests les plus difficiles.',
  },
  {
    id: 2,
    name: 'Yossi Levi',
    unit: 'Shayetet 13',
    videoUrl: '/videos/testimonial-2.mp4',
    thumbnail: '/images/testimonial-2-thumb.jpg',
    quote: 'L\'équilibre entre Torah et entraînement physique est parfait. J\'ai trouvé ma voie.',
  },
  {
    id: 3,
    name: 'Michael Azoulay',
    unit: 'Duvdevan',
    videoUrl: '/videos/testimonial-3.mp4',
    thumbnail: '/images/testimonial-3-thumb.jpg',
    quote: 'La fraternité et le soutien de la communauté m\'ont donné la force de réussir.',
  },
];

export default function TestimonialsSection() {
  const { t } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section ref={ref} className="section-padding bg-gray-50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="heading-2 mb-4">{t('testimonials.title')}</h2>
          <p className="text-xl text-gray-600">{t('testimonials.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="relative aspect-w-16 aspect-h-9">
              <AnimatePresence mode="wait">
                {!isPlaying ? (
                  <motion.div
                    key="thumbnail"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative h-96"
                  >
                    <Image
                      src={currentTestimonial.thumbnail}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="absolute inset-0 flex items-center justify-center group"
                    >
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <FaPlay className="w-8 h-8 text-primary-600 ml-1" />
                      </div>
                    </button>
                  </motion.div>
                ) : (
                  <motion.video
                    key="video"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    src={currentTestimonial.videoUrl}
                    controls
                    autoPlay
                    className="w-full h-96"
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="p-6">
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "{currentTestimonial.quote}"
              </blockquote>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{currentTestimonial.name}</p>
                  <p className="text-sm text-gray-600">{currentTestimonial.unit}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  >
                    <FaChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  >
                    <FaChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-primary-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
