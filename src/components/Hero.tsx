import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../LanguageContext';

export function Hero() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50"
    >
      {/* Background Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, -60, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 -right-32 w-[30rem] h-[30rem] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
      />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative mb-8"
        >
          {/* Glowing ring around portrait */}
          <div className="absolute inset-0 -m-4 rounded-full border border-indigo-200/50 shadow-[0_0_40px_rgba(167,139,250,0.3)] animate-[spin_10s_linear_infinite] border-t-indigo-400" />
          <div className="absolute inset-0 -m-8 rounded-full border border-purple-200/30 shadow-[0_0_60px_rgba(167,139,250,0.1)] animate-[spin_15s_linear_infinite_reverse] border-b-purple-400" />
          
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 p-1">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              <img src="https://lh3.googleusercontent.com/d/1vLPQkRIq6pMurd_KiKATDvXIsm-ryp1u" alt="Keerthana Sunil" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl font-medium tracking-wide text-slate-500 mb-2"
        >
          {language === 'en' ? "Hello, I'm" : "നമസ്കാരം, ഞാൻ"}
        </motion.p>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-slate-800 tracking-tight mb-6"
        >
          {language === 'en' ? "Keerthana Sunil" : "കീർത്തന സുനിൽ"}
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-4 text-sm md:text-base text-slate-600 font-sans tracking-widest uppercase"
        >
          <span>{language === 'en' ? "Singer" : "ഗായിക"}</span>
          <span className="text-indigo-300">•</span>
          <span>{language === 'en' ? "Learner" : "വിദ്യാർത്ഥി"}</span>
          <span className="text-indigo-300">•</span>
          <span>{language === 'en' ? "Teacher" : "അദ്ധ്യാപിക"}</span>
          <span className="text-indigo-300">•</span>
          <span>{language === 'en' ? "Future Researcher" : "ഭാവി ഗവേഷക"}</span>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
      >
        <span className="text-xs tracking-widest uppercase">{language === 'en' ? "Scroll to Discover" : "താഴേക്ക് സ്ക്രോൾ ചെയ്യുക"}</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-slate-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
