/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
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

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
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
    <div className="bg-pearl font-sans text-slate-900 selection:bg-indigo-200 selection:text-indigo-900 overflow-hidden relative">
      <ParticleBackground />
      <main className="flex flex-col relative z-10">
        <Hero />
        <AboutMe />
        <Family />
        <Talents />
        <Education />
        <Achievements />
        <Dream />
        <Interests />
        <Strengths />
        <Footer />
      </main>
    </div>
  );
}

