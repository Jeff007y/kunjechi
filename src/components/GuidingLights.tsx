import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImagePlaceholder } from './ImagePlaceholder';
import { useLanguage } from '../LanguageContext';

export function GuidingLights() {
  const { language } = useLanguage();
  
  const lights = [
    { 
      id: 1,
      name: language === 'en' ? 'Sujatha Teacher' : 'സുജാത ടീച്ചർ',
      src: 'https://lh3.googleusercontent.com/d/1u9Smif5sc_EtMvtoF-wwh-no6vkKQZCD'
    },
    { 
      id: 2,
      name: language === 'en' ? 'Anju Miss' : 'അഞ്ജു മിസ്സ്',
      src: 'https://lh3.googleusercontent.com/d/14Gq42_-e62Ya5aXRrnKLZTIJY7QpBnXS'
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[80dvh] w-full flex flex-col items-center justify-center py-24 overflow-hidden bg-slate-900 text-white"
    >
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0%,transparent_60%)]"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-serif mb-16"
        >
          {language === 'en' ? "Guiding Lights" : "മാർഗ്ഗദർശികൾ"}
        </motion.h2>

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-16 md:gap-12 lg:gap-24">
          {/* Glowing connecting line - desktop */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            className="hidden md:block absolute top-1/2 left-32 right-32 h-[1px] bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_15px_rgba(129,140,248,0.8)] origin-left -translate-y-1/2"
          />
          {/* Glowing connecting line - mobile */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            className="md:hidden absolute top-24 bottom-24 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-indigo-400 to-transparent shadow-[0_0_15px_rgba(129,140,248,0.8)] origin-top -translate-x-1/2"
          />

          {lights.map((light, i) => (
            <motion.div
              key={light.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.2 }}
              className="relative group z-10"
            >
              <div className="relative p-2 transition-transform duration-500 group-hover:scale-105 flex flex-col items-center">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-indigo-500/0 rounded-2xl blur-xl transition-colors duration-500 group-hover:bg-indigo-500/30" />
                
                <ImagePlaceholder 
                  src={light.src}
                  label={light.name} 
                  className="w-56 md:w-64 lg:w-72 shadow-[0_0_30px_rgba(0,0,0,0.5)] border-white/10 transition-all duration-500 group-hover:border-indigo-400/50" 
                />

                <h3 className="mt-6 text-2xl font-serif text-white/90 drop-shadow-md">{light.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
