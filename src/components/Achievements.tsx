import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, X, Sparkles, BookOpen } from 'lucide-react';
import { ImagePlaceholder } from './ImagePlaceholder';
import { useLanguage } from '../LanguageContext';

export function Achievements() {
  const { language } = useLanguage();
  const [activeId, setActiveId] = useState<string | null>(null);

  const achievements = [
    {
      id: 'aspire',
      title: 'Aspire Research Award',
      description: language === 'en' ? 'Recognized for outstanding potential and dedication to advancing research in the field.' : 'ഗവേഷണ മേഖലയിലെ മികച്ച സംഭാവനകൾക്കുള്ള അംഗീകാരം.',
      icon: Award,
      color: 'from-amber-200 to-yellow-500',
      src: 'https://lh3.googleusercontent.com/d/1GeAq0p4MtNsH8gN6PGY2hFAAySaZ7hQh'
    },
    {
      id: 'icar',
      title: 'ICAR JRF - AIR 26',
      description: language === 'en' ? 'Achieved All India Rank 26 in the highly competitive ICAR Junior Research Fellowship examination.' : 'ICAR JRF പരീക്ഷയിൽ അഖിലേന്ത്യാ തലത്തിൽ 26-ാം റാങ്ക്.',
      icon: Sparkles,
      color: 'from-slate-300 to-slate-100',
      src: 'https://lh3.googleusercontent.com/d/1FQLtG-n-mT5rKn86ooBpXIhfaW1m_m_C'
    },
    {
      id: 'paper',
      title: language === 'en' ? 'Paper Presentation' : 'പ്രബന്ധാവതരണം',
      description: language === 'en' ? 'Presented a research paper highlighting key findings and insights.' : 'പ്രധാന കണ്ടെത്തലുകൾ ഉൾപ്പെടുത്തി ഗവേഷണ പ്രബന്ധം അവതരിപ്പിച്ചു.',
      icon: BookOpen,
      color: 'from-blue-200 to-indigo-500',
      src: 'https://lh3.googleusercontent.com/d/1ijiAhnVPzjpY6jXxMkWxnvA-xSLS_gua',
      src2: 'https://lh3.googleusercontent.com/d/1AyI7ZqK5R_pi3w0OGrVZhC6WC3KZo-JB'
    }
  ];

  return (
    <section className="relative w-full flex flex-col items-center justify-center py-24 bg-dark-bg text-white overflow-hidden perspective-1000">
      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-40 mix-blend-screen pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_70%)]" />
      </div>

      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-serif mb-16 z-20 text-center"
      >
        {language === 'en' ? "Achievements & Awards" : "നേട്ടങ്ങളും അംഗീകാരങ്ങളും"}
      </motion.h2>

      <div className="relative w-full max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-12 md:gap-16 min-h-[400px] z-10 px-4 md:px-0">
        {achievements.map((item, i) => {
          const isActive = activeId === item.id;
          const isFaded = activeId && !isActive;

          return (
            <motion.div
              key={item.id}
              layoutId={`award-${item.id}`}
              className={`relative cursor-pointer transition-opacity duration-500 ${isFaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              onClick={() => !activeId && setActiveId(item.id)}
            >
              {!isActive && (
                <div className="flex flex-col items-center group">
                  <motion.div 
                    animate={{ rotateY: [-5, 5, -5], y: [0, -10, 0] }}
                    transition={{ 
                      rotateY: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
                    }}
                    className="relative w-64 md:w-72 transform-style-3d group-hover:scale-105 transition-transform duration-500"
                  >
                    {/* Floating Glass Plaque */}
                    <div className="relative bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col justify-end aspect-square md:aspect-[4/5]">
                       <img src={item.src} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-all duration-700 block" referrerPolicy="no-referrer" />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent pointer-events-none" />
                       <div className="absolute bottom-4 left-0 right-0 z-10 flex flex-col items-center px-4">
                         <item.icon className={`w-8 h-8 mb-2 bg-gradient-to-br ${item.color} bg-clip-text text-transparent drop-shadow-lg`} />
                         <div className="text-center font-serif text-lg leading-tight text-white drop-shadow-md">{item.title}</div>
                       </div>
                    </div>
                  </motion.div>
                  
                  {/* Base Podium Glow */}
                  <div className="mt-8 w-32 h-2 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm rounded-[100%]" />
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Detailed Panel */}
        <AnimatePresence>
          {activeId && (
            <motion.div 
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div 
                className="absolute inset-0 bg-dark-bg/80 backdrop-blur-md cursor-pointer"
                onClick={() => setActiveId(null)}
              />
              
              {achievements.map((item) => item.id === activeId && (
                <motion.div
                  layoutId={`award-${item.id}`}
                  key={`detail-${item.id}`}
                  className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 md:p-12 shadow-[0_0_60px_rgba(255,255,255,0.1)] flex flex-col md:flex-row gap-8 items-center md:items-start"
                >
                  <button 
                    onClick={() => setActiveId(null)}
                    className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-20"
                  >
                    <X className="w-5 h-5 text-white/80" />
                  </button>

                  <div className="w-full md:w-3/5 flex-shrink-0 flex flex-col gap-4">
                    <ImagePlaceholder src={item.src} label={`Photo — ${item.title}`} className="w-full" />
                    {item.src2 && <ImagePlaceholder src={item.src2} label={`Photo 2 — ${item.title}`} className="w-full" />}
                  </div>

                  <div className="w-full md:w-2/5 flex flex-col sticky top-0">
                    <item.icon className="w-10 h-10 text-white/50 mb-6" />
                    <h3 className="text-3xl md:text-4xl font-serif mb-4 leading-tight">{item.title}</h3>
                    <p className="text-white/60 font-sans leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
