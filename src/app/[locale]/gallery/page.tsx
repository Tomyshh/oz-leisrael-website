'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

// Toutes les images organisées par catégorie (images réelles uniquement)
const allImages = [
  // Gallery2 - Photos récentes (12 images)
  { src: '/images/gallery2/IMG_9211.jpg', category: 'recent' },
  { src: '/images/gallery2/IMG_0407.jpg', category: 'recent' },
  { src: '/images/gallery2/IMG_0454.jpg', category: 'recent' },
  { src: '/images/gallery2/IMG_0496.jpg', category: 'recent' },
  { src: '/images/gallery2/IMG_0768.jpg', category: 'recent' },
  { src: '/images/gallery2/IMG_0779.jpg', category: 'recent' },
  { src: '/images/gallery2/IMG_0876.jpg', category: 'recent' },
  { src: '/images/gallery2/IMG_0900.jpg', category: 'recent' },
  { src: '/images/gallery2/IMG_0918.jpg', category: 'recent' },
  { src: '/images/gallery2/IMG_0936.jpg', category: 'recent' },
  { src: '/images/gallery2/IMG_0117.jpg', category: 'recent' },
  { src: '/images/gallery2/IMG_9532.jpg', category: 'recent' },
  
  // Torah & Étude
  { src: '/images/beit-amidrash.jpg', category: 'torah' },
  { src: '/images/etude-groupe.jpg', category: 'torah' },
  { src: '/images/kodesh-study.jpg', category: 'torah' },
  { src: '/images/spiritual-preparation.jpg', category: 'torah' },
  
  // Entraînement physique
  { src: '/images/train-kravi.jpg', category: 'training' },
  { src: '/images/physical-preparation.jpg', category: 'training' },
  { src: '/images/hol-training.jpg', category: 'training' },
  
  // Communauté & Vie quotidienne
  { src: '/images/zionism-community.jpg', category: 'community' },
  { src: '/images/yeshiva-or-vishua.jpg', category: 'community' },
  { src: '/images/cover.jpg', category: 'community' },
];

const categories = [
  { id: 'all', labelKey: 'gallery.filters.all' },
  { id: 'recent', labelKey: 'gallery.filters.recent' },
  { id: 'torah', labelKey: 'gallery.filters.torah' },
  { id: 'training', labelKey: 'gallery.filters.training' },
  { id: 'community', labelKey: 'gallery.filters.community' },
];

export default function GalleryPage() {
  const { t } = useI18n();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredImages = useMemo(() => {
    if (activeCategory === 'all') return allImages;
    return allImages.filter(img => img.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = 'unset';
  }, []);

  const goToPrevious = useCallback(() => {
    setSelectedIndex((prev) => 
      prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null
    );
  }, [filteredImages.length]);

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => 
      prev !== null ? (prev + 1) % filteredImages.length : null
    );
  }, [filteredImages.length]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  }, [closeLightbox, goToPrevious, goToNext]);

  // Pattern de tailles pour le masonry
  const getMasonryClass = (index: number) => {
    const patterns = [
      'col-span-1 row-span-1',
      'col-span-1 row-span-1',
      'col-span-1 row-span-2',
      'col-span-1 row-span-1',
      'col-span-2 row-span-1',
      'col-span-1 row-span-1',
      'col-span-1 row-span-1',
      'col-span-1 row-span-1',
      'col-span-1 row-span-2',
      'col-span-2 row-span-1',
      'col-span-1 row-span-1',
      'col-span-1 row-span-1',
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="heading-1 mb-4">{t('gallery.pageTitle')}</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {t('gallery.pageSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filtres et contrôles */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Filtres par catégorie */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {t(cat.labelKey)}
                </button>
              ))}
            </div>

            {/* Compteur de photos */}
            <div className="flex items-center">
              <span className="text-sm text-gray-500">
                {filteredImages.length} {t('gallery.photos')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section className="section-padding">
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className={`${getMasonryClass(index)} relative group cursor-pointer overflow-hidden rounded-xl bg-gray-200`}
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={image.src}
                    alt={`Oz LeIsrael - Photo ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                  
                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Zoom icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
            aria-label="Galerie photo"
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
              aria-label="Fermer"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Previous */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
              aria-label="Photo précédente"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
              aria-label="Photo suivante"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Main image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-[90vw] max-h-[85vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={filteredImages[selectedIndex].src}
                alt={`Oz LeIsrael - Photo ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
                quality={90}
              />
            </motion.div>


            {/* Counter */}
            <div className="absolute top-4 left-4 text-white/80 text-sm font-medium bg-black/30 px-3 py-1 rounded-full">
              {selectedIndex + 1} / {filteredImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
