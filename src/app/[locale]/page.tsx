'use client';

import { useState, lazy, Suspense } from 'react';
import dynamic from 'next/dynamic';
import VideoIntro from '@/components/VideoIntro';
import HeroSection from '@/components/home/HeroSection';

// Lazy loading des sections non critiques
const PillarsSection = dynamic(() => import('@/components/home/PillarsSection'), {
  loading: () => <div className="h-screen flex items-center justify-center">Chargement...</div>,
  ssr: true,
});

const MissionSection = dynamic(() => import('@/components/home/MissionSection'), {
  loading: () => <div className="h-screen flex items-center justify-center">Chargement...</div>,
  ssr: true,
});

const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'), {
  loading: () => <div className="h-screen flex items-center justify-center">Chargement...</div>,
  ssr: true,
});

const CTASection = dynamic(() => import('@/components/home/CTASection'), {
  loading: () => <div className="h-screen flex items-center justify-center">Chargement...</div>,
  ssr: true,
});

export default function HomePage() {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      {!showContent && <VideoIntro onComplete={() => setShowContent(true)} />}
      <div style={{ display: showContent ? 'block' : 'none' }}>
        <HeroSection />
        <PillarsSection />
        <MissionSection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </>
  );
}
