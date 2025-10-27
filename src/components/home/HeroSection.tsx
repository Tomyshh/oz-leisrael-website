'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { useState, useEffect, memo, useMemo } from 'react';

function HeroSection() {
  const { t } = useI18n();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const titleVariants = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay: 0.2 }
  }), []);

  const subtitleVariants = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay: 0.5 }
  }), []);

  const buttonVariants = useMemo(() => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, delay: 0.8 }
  }), []);

  const scrollIndicatorVariants = useMemo(() => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1, delay: 1 }
  }), []);

  const scrollAnimation = useMemo(() => ({
    animate: { y: [0, 10, 0] },
    transition: { duration: 1.5, repeat: Infinity }
  }), []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cover.jpg"
          alt="Oz LeIsrael"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        
        {/* Overlay sombre pour lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center text-white">
        <div className="text-center px-6 max-w-6xl">
          <motion.h1
            {...titleVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-display mb-8 tracking-tight text-white"
            style={{ 
              textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)',
              letterSpacing: '-0.02em'
            }}
          >
            OZ LEISRAEL
          </motion.h1>
          
          <motion.p
            {...subtitleVariants}
            className="text-2xl md:text-4xl lg:text-5xl mb-12 font-light max-w-4xl mx-auto leading-tight text-white"
            style={{ 
              textShadow: '0 2px 15px rgba(0,0,0,0.9)',
              fontWeight: '300'
            }}
          >
            Forge ton corps. Élève ton âme.<br />
            <span className="font-semibold">Deviens un soldat d&apos;élite.</span>
          </motion.p>

          <motion.div {...buttonVariants}>
            <Link 
              href="/contact" 
              className="inline-block bg-white text-gray-900 px-10 py-5 text-xl font-semibold tracking-wide uppercase hover:bg-gray-100 transition-all duration-300 shadow-2xl"
              style={{ letterSpacing: '0.1em' }}
            >
              Rejoins le programme
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        {...scrollIndicatorVariants}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <motion.div
          {...scrollAnimation}
          className="flex flex-col items-center"
        >
          <span className="text-sm mb-2">Scroll</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default memo(HeroSection);
