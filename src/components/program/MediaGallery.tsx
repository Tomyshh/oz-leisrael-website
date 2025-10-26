'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaPlay, FaTimes } from 'react-icons/fa';
import { useI18n } from '@/lib/i18n';

interface MediaItem {
  id: number;
  title: string;
  titleEn: string;
  thumbnail: string;
  url: string;
  type: 'video' | 'photo';
}

const mediaItems: MediaItem[] = [
  {
    id: 1,
    title: 'Entraînement Kravi',
    titleEn: 'Krav Maga Training',
    thumbnail: '/images/gallery/kravi-thumb.jpg',
    url: '/videos/kravi-training.mp4',
    type: 'video',
  },
  {
    id: 2,
    title: 'Cours du Rav',
    titleEn: 'Rabbi\'s Class',
    thumbnail: '/images/gallery/torah-class-thumb.jpg',
    url: '/videos/torah-class.mp4',
    type: 'video',
  },
  {
    id: 3,
    title: 'Sortie de groupe',
    titleEn: 'Group Activity',
    thumbnail: '/images/gallery/group-activity.jpg',
    url: '/images/gallery/group-activity-full.jpg',
    type: 'photo',
  },
  {
    id: 4,
    title: 'Entraînement physique',
    titleEn: 'Physical Training',
    thumbnail: '/images/gallery/physical-training.jpg',
    url: '/images/gallery/physical-training-full.jpg',
    type: 'photo',
  },
  {
    id: 5,
    title: 'Étude en Havruta',
    titleEn: 'Havruta Study',
    thumbnail: '/images/gallery/havruta-study.jpg',
    url: '/images/gallery/havruta-study-full.jpg',
    type: 'photo',
  },
  {
    id: 6,
    title: 'Préparation mentale',
    titleEn: 'Mental Preparation',
    thumbnail: '/images/gallery/mental-prep-thumb.jpg',
    url: '/videos/mental-preparation.mp4',
    type: 'video',
  },
];

interface MediaGalleryProps {
  type: 'video' | 'photo';
}

export default function MediaGallery({ type }: MediaGalleryProps) {
  const { locale } = useI18n();
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  
  const filteredItems = mediaItems.filter(item => item.type === type);

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
        duration: 0.4,
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
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="group cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <div className="relative h-64">
                <Image
                  src={item.thumbnail}
                  alt={locale === 'fr' ? item.title : item.titleEn}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                      <FaPlay className="w-6 h-6 text-primary-600 ml-1" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-lg">
                  {locale === 'fr' ? item.title : item.titleEn}
                </h3>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedItem(null)}
          >
            <FaTimes size={24} />
          </button>

          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            {selectedItem.type === 'video' ? (
              <video
                src={selectedItem.url}
                controls
                autoPlay
                className="w-full rounded-lg"
              />
            ) : (
              <Image
                src={selectedItem.url}
                alt={locale === 'fr' ? selectedItem.title : selectedItem.titleEn}
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg"
              />
            )}
            <h3 className="text-white text-xl font-semibold mt-4 text-center">
              {locale === 'fr' ? selectedItem.title : selectedItem.titleEn}
            </h3>
          </div>
        </motion.div>
      )}
    </>
  );
}
