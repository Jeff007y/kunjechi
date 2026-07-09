import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImagePlaceholder } from './ImagePlaceholder';
import { useLanguage } from '../LanguageContext';

export function Family() {
  const { language } = useLanguage();
  
  const family = [
    { 
      name: language === 'en' ? 'Acha & Amma' : 'അച്ഛൻ & അമ്മ', 
      role: language === 'en' ? 'Parents' : 'മാതാപിതാക്കൾ', 
      src: 'https://lh3.googleusercontent.com/d/1YN4p3Vbzu_eAboAXCf90HlgQBPKKNUau' 
    },
    { 
      name: language === 'en' ? 'Nandhu' : 'നന്ദു', 
      role: language === 'en' ? 'Sister' : 'സഹോദരി', 
      src: 'https://lh3.googleusercontent.com/d/1yKMe2nWJWWYy4WYmjDJmNo5e3H4CEyPa' 
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
      className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center py-24 overflow-hidden bg-gradient-to-b from-pearl via-amber-50/50 to-orange-50/30"
    >
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(253,230,138,0.2)_0%,transparent_60%)]"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-serif text-slate-800 mb-16"
        >
          {language === 'en' ? "The People Behind My Journey" : "എന്റെ യാത്രക്ക് പിന്നിലെ വ്യക്തികൾ"}
        </motion.h2>

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-16 md:gap-8 lg:gap-24">
          {/* Glowing connecting line - desktop */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            className="hidden md:block absolute top-1/2 left-24 right-24 h-[1px] bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_15px_rgba(253,230,138,0.8)] origin-left -translate-y-1/2"
          />
          {/* Glowing connecting line - mobile */}
          <motion.div 
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            className="md:hidden absolute top-24 bottom-24 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-amber-300 to-transparent shadow-[0_0_15px_rgba(253,230,138,0.8)] origin-top -translate-x-1/2"
          />

          {family.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.2 }}
              className="relative group z-10"
            >
              <div className="relative p-2 transition-transform duration-500 group-hover:scale-105">
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-amber-200/0 rounded-2xl blur-xl transition-colors duration-500 group-hover:bg-amber-300/40" />
                
                <ImagePlaceholder 
                  src={member.src}
                  label={`Photo — ${member.name}`} 
                  className="w-48 md:w-56 lg:w-64 shadow-xl border-white/60 transition-all duration-500 group-hover:border-amber-200/80" 
                />
              </div>
              
              <div className="mt-6 text-center">
                <h3 className="text-xl font-serif text-slate-800">{member.name}</h3>
                <p className="text-sm font-sans text-slate-500 tracking-widest uppercase mt-1">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
