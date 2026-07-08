import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { GraduationCap } from 'lucide-react';

export function Dream() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showName, setShowName] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'center center']
  });

  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      if (v > 0.8 && !showName) setShowName(true);
      if (v < 0.6 && showName) setShowName(false);
    });
  }, [scrollYProgress, showName]);

  return (
    <section ref={containerRef} className="relative min-h-[150vh] bg-dark-bg text-white overflow-hidden flex flex-col items-center justify-center">
      
      {/* Starry Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: [0.1, 0.8, 0.1],
              scale: [1, Math.random() * 2, 1]
            }}
            transition={{ duration: 3 + Math.random() * 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 10px rgba(255,255,255,0.8)'
            }}
          />
        ))}
      </div>

      {/* Light Rays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[80vh] bg-[conic-gradient(from_180deg_at_50%_0%,transparent_0deg,rgba(255,255,255,0.05)_180deg,transparent_360deg)] pointer-events-none blur-3xl opacity-50" />

      <div className="sticky top-0 h-screen flex flex-col items-center justify-center w-full">
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-white/30"
        >
          <GraduationCap className="w-16 h-16" />
        </motion.div>

        <div className="h-40 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!showName ? (
              <motion.h2
                key="dream"
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
                transition={{ duration: 1 }}
                className="text-6xl md:text-8xl lg:text-9xl font-serif text-white/50 tracking-tight"
              >
                My Dream
              </motion.h2>
            ) : (
              <motion.div
                key="name"
                initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.9 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative"
              >
                <div className="absolute inset-0 bg-white/20 blur-[100px] pointer-events-none rounded-full" />
                <h2 className="relative text-5xl md:text-7xl lg:text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-white font-medium tracking-tight px-4 text-center">
                  Dr. Keerthana Sunil
                </h2>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
