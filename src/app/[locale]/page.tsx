'use client';

import { useState } from 'react';
import VideoIntro from '@/components/VideoIntro';
import HeroSection from '@/components/home/HeroSection';
import PillarsSection from '@/components/home/PillarsSection';
import MissionSection from '@/components/home/MissionSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

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
