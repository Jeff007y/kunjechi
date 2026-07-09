import React from 'react';
import { motion } from 'motion/react';
import { ImagePlaceholder } from './ImagePlaceholder';
import { useLanguage } from '../LanguageContext';

export function Footer() {
  const { language } = useLanguage();
  return (
    <section className="relative min-h-[70vh] w-full flex flex-col items-center justify-center py-24 bg-dark-bg text-white overflow-hidden">
      
      {/* Soft spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        <div className="mb-12 relative group cursor-pointer">
          <div className="absolute inset-0 rounded-full bg-white/20 blur-2xl group-hover:bg-white/30 transition-colors duration-700" />
          <ImagePlaceholder 
            src="https://lh3.googleusercontent.com/d/1vLPQkRIq6pMurd_KiKATDvXIsm-ryp1u"
            label="Keerthana Sunil" 
            circular 
            className="w-32 h-32 md:w-40 md:h-40 border-white/10 relative z-10" 
          />
        </div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl md:text-5xl font-serif text-white mb-6"
        >
          {language === 'en' ? "Thank You" : "നന്ദി"}
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-lg md:text-xl text-white/50 font-sans tracking-wide mb-16 max-w-md"
        >
          This is only the beginning of my journey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.5 }}
          className="relative"
        >
          {/* Animated signature simulation */}
          <svg className="absolute -top-4 -left-4 w-10 h-10 text-white/10" viewBox="0 0 100 100">
             <motion.path
               d="M10,90 Q40,10 90,90"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               initial={{ pathLength: 0 }}
               whileInView={{ pathLength: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1.5, delay: 1.5 }}
             />
          </svg>
          <span className="font-serif italic text-2xl md:text-3xl text-white/80">
            — Keerthana Sunil
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
