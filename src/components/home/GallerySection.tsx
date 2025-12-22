'use client';

import { useState, useCallback, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

// Images de la galerie avec layout bento
const galleryImages = [
  { src: '/images/gallery2/IMG_9211.jpg', span: 'col-span-2 row-span-2' },
  { src: '/images/gallery2/IMG_0407.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/gallery2/IMG_0454.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/gallery2/IMG_0496.jpg', span: 'col-span-1 row-span-2' },
  { src: '/images/gallery2/IMG_0768.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/gallery2/IMG_0779.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/gallery2/IMG_0876.jpg', span: 'col-span-2 row-span-1' },
  { src: '/images/gallery2/IMG_0900.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/gallery2/IMG_0918.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/gallery2/IMG_0936.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/gallery2/IMG_0117.jpg', span: 'col-span-1 row-span-1' },
  { src: '/images/gallery2/IMG_9532.jpg', span: 'col-span-2 row-span-1' },
];

function GallerySection() {
  const { t } = useI18n();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
      prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : null
    );
  }, []);

  const goToNext = useCallback(() => {
    setSelectedIndex((prev) => 
      prev !== null ? (prev + 1) % galleryImages.length : null
    );
  }, []);

  // Gestion clavier
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  }, [closeLightbox, goToPrevious, goToNext]);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }), []);

  return (
    <>
      <section ref={ref} className="section-padding bg-white overflow-hidden">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-2 mb-4">{t('gallery.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('gallery.subtitle')}
            </p>
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[180px]"
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.src}
                variants={itemVariants}
                className={`${image.span} relative group cursor-pointer overflow-hidden rounded-xl`}
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
                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icône zoom */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
            {/* Bouton fermer */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
              aria-label="Fermer"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation précédent */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
              aria-label="Photo précédente"
            >
              <ChevronLeft className="w-8 h-8 text-white" />
            </button>

            {/* Navigation suivant */}
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200"
              aria-label="Photo suivante"
            >
              <ChevronRight className="w-8 h-8 text-white" />
            </button>

            {/* Image principale */}
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
                src={galleryImages[selectedIndex].src}
                alt={`Oz LeIsrael - Photo ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
                quality={90}
              />
            </motion.div>

            {/* Indicateur de position */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(index); }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === selectedIndex 
                      ? 'bg-white w-6' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Aller à la photo ${index + 1}`}
                />
              ))}
            </div>

            {/* Compteur */}
            <div className="absolute top-4 left-4 text-white/80 text-sm font-medium">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default memo(GallerySection);
