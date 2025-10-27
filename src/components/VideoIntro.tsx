'use client';

import { useState, useRef, useEffect, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';

interface VideoIntroProps {
  onComplete: () => void;
}

function VideoIntro({ onComplete }: VideoIntroProps) {
  const [showVideo, setShowVideo] = useState(true);
  const [needsClick, setNeedsClick] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Vérifier si la vidéo a déjà été vue dans cette session
    const hasSeenVideo = sessionStorage.getItem('hasSeenIntroVideo');
    if (hasSeenVideo) {
      setShowVideo(false);
      onComplete();
      return;
    }

    // Essayer de lancer automatiquement
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play();
          setNeedsClick(false);
        } catch (error) {
          // Si bloqué, attendre un clic utilisateur
          setNeedsClick(true);
        }
      }
    };

    const timer = setTimeout(playVideo, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    sessionStorage.setItem('hasSeenIntroVideo', 'true');
    setShowVideo(false);
    onComplete();
  }, [onComplete]);

  const handleVideoEnd = useCallback(() => {
    sessionStorage.setItem('hasSeenIntroVideo', 'true');
    setShowVideo(false);
    onComplete();
  }, [onComplete]);

  const handlePlayClick = useCallback(async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setNeedsClick(false);
      } catch (error) {
        console.error("Erreur lecture vidéo:", error);
      }
    }
  }, []);

  if (!showVideo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black"
      >
        {/* Vidéo en plein écran */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          onEnded={handleVideoEnd}
        >
          <source src="/videos/first-presentation.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>

        {/* Logo en haut à gauche */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-8 left-8 z-50"
        >
          <Image
            src="/images/logo.png"
            alt="Oz LeIsrael Logo"
            width={80}
            height={80}
            className="drop-shadow-2xl"
            priority
          />
        </motion.div>

        {/* Bouton Skip */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          onClick={handleSkip}
          className="absolute top-8 right-8 z-50 bg-white text-gray-900 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 flex items-center gap-3 shadow-2xl uppercase tracking-wider text-sm"
          aria-label="Accéder au site"
        >
          <span>Accéder au site</span>
          <FaTimes size={18} aria-hidden="true" />
        </motion.button>

        {/* Indicateur de clic si autoplay bloqué */}
        {needsClick && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center z-40 cursor-pointer"
            onClick={handlePlayClick}
          >
            <div className="bg-black/70 backdrop-blur-sm text-white px-12 py-8 rounded-2xl text-center">
              <p className="text-2xl font-bold mb-3">Cliquez pour lancer la vidéo</p>
              <p className="text-lg opacity-80">avec le son</p>
            </div>
          </motion.div>
        )}

        {/* Logo en bas à gauche */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-8 text-white z-30"
        >
          <h2 className="text-3xl font-bold font-display">OZ LEISRAEL</h2>
          <p className="text-sm opacity-70 mt-1">Vidéo de présentation</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default memo(VideoIntro);
