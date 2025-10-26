'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaPlay } from 'react-icons/fa';

interface Testimonial {
  id: number;
  name: string;
  unit: string;
  year: string;
  quote: string;
  image: string;
  videoUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'David Cohen',
    unit: 'Sayeret Matkal',
    year: '2022',
    quote: 'Oz LeIsrael m\'a donné les outils spirituels et physiques pour réussir les tests les plus difficiles. La combinaison Torah et entraînement est parfaite.',
    image: '/images/testimonials/david-cohen.jpg',
    videoUrl: '/videos/testimonial-david.mp4',
  },
  {
    id: 2,
    name: 'Yossi Levi',
    unit: 'Shayetet 13',
    year: '2021',
    quote: 'L\'équilibre entre l\'étude et l\'entraînement m\'a préparé mentalement et physiquement. Les instructeurs sont exceptionnels.',
    image: '/images/testimonials/yossi-levi.jpg',
  },
  {
    id: 3,
    name: 'Michael Azoulay',
    unit: 'Duvdevan',
    year: '2023',
    quote: 'La fraternité créée ici est unique. On se soutient mutuellement dans tous les défis, spirituels comme physiques.',
    image: '/images/testimonials/michael-azoulay.jpg',
    videoUrl: '/videos/testimonial-michael.mp4',
  },
  {
    id: 4,
    name: 'Eli Friedman',
    unit: 'Golani Reconnaissance',
    year: '2022',
    quote: 'Les cours du Rav m\'ont donné une force intérieure incroyable. J\'ai appris que la vraie force vient de l\'âme.',
    image: '/images/testimonials/eli-friedman.jpg',
  },
  {
    id: 5,
    name: 'Nathan Bensimon',
    unit: 'Paratroopers',
    year: '2021',
    quote: 'Le programme m\'a transformé. Je suis arrivé garçon, je suis parti homme, prêt à servir mon peuple.',
    image: '/images/testimonials/nathan-bensimon.jpg',
  },
  {
    id: 6,
    name: 'Avi Goldstein',
    unit: 'Egoz',
    year: '2023',
    quote: 'L\'entraînement intensif combiné à l\'étude m\'a préparé pour l\'excellence dans toutes les dimensions de ma vie.',
    image: '/images/testimonials/avi-goldstein.jpg',
    videoUrl: '/videos/testimonial-avi.mp4',
  },
];

export default function TestimonialsGrid() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            variants={itemVariants}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="relative h-48">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
              {testimonial.videoUrl && (
                <button
                  onClick={() => setSelectedVideo(testimonial.videoUrl!)}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <FaPlay className="w-5 h-5 text-primary-600 ml-1" />
                  </div>
                </button>
              )}
            </div>

            <div className="p-6">
              <FaQuoteLeft className="text-primary-500 mb-3" size={24} />
              <p className="text-gray-700 italic mb-4">{testimonial.quote}</p>
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.unit}</p>
                <p className="text-xs text-gray-500 mt-1">Promotion {testimonial.year}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full rounded-lg"
            />
            <button
              className="mt-4 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedVideo(null)}
            >
              Fermer
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
