/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import Lenis from 'lenis';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { Family } from './components/Family';
import { Talents } from './components/Talents';
import { Education } from './components/Education';
import { Achievements } from './components/Achievements';
import { Dream } from './components/Dream';
import { Interests } from './components/Interests';
import { Strengths } from './components/Strengths';
import { Footer } from './components/Footer';
import { ParticleBackground } from './components/ParticleBackground';

import { LanguageProvider } from './LanguageContext';
import { LanguageToggle } from './components/LanguageToggle';

function FadeInSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    // Initialize Lenis for smooth scroll
    const lenis = new Lenis({
      duration: 2.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <LanguageProvider>
      <div className="bg-pearl font-sans text-slate-900 selection:bg-indigo-200 selection:text-indigo-900 overflow-clip relative">
        <LanguageToggle />
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 origin-left z-[100]"
          style={{ scaleX: scrollYProgress }}
        />
      <ParticleBackground />
      <main className="flex flex-col relative z-10">
        <Hero />
        <FadeInSection>
          <AboutMe />
        </FadeInSection>
        <FadeInSection>
          <Family />
        </FadeInSection>
        <FadeInSection>
          <Education />
        </FadeInSection>
        <FadeInSection>
          <Talents />
        </FadeInSection>
        <FadeInSection>
          <Achievements />
        </FadeInSection>
        <FadeInSection>
          <Dream />
        </FadeInSection>
        <FadeInSection>
          <Interests />
        </FadeInSection>
        <FadeInSection>
          <Strengths />
        </FadeInSection>
        <FadeInSection>
          <Footer />
        </FadeInSection>
      </main>
    </div>
    </LanguageProvider>
  );
}

