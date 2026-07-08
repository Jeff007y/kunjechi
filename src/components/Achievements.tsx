import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, X, Sparkles } from 'lucide-react';
import { ImagePlaceholder } from './ImagePlaceholder';

const achievements = [
  {
    id: 'aspire',
    title: 'Aspire Research Award',
    description: 'Recognized for outstanding potential and dedication to advancing research in the field.',
    icon: Award,
    color: 'from-amber-200 to-yellow-500',
    src: 'https://drive.google.com/uc?export=view&id=1AYZFVtmwfSNc74-HbeJhChZaj_6Uyaiw'
  },
  {
    id: 'icar',
    title: 'ICAR JRF - AIR 26',
    description: 'Achieved All India Rank 26 in the highly competitive ICAR Junior Research Fellowship examination.',
    icon: Sparkles,
    color: 'from-slate-300 to-slate-100',
    src: 'https://drive.google.com/uc?export=view&id=1FQLtG-n-mT5rKn86ooBpXIhfaW1m_m_C'
  }
];

export function Achievements() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center py-32 bg-dark-bg text-white overflow-hidden perspective-1000">
      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-40 mix-blend-screen pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_70%)]" />
      </div>

      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-serif mb-24 z-20 text-center"
      >
        Achievements
      </motion.h2>

      <div className="relative w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 h-full z-10">
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
                    animate={{ rotateY: 360, y: [0, -10, 0] }}
                    transition={{ 
                      rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
                      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
                    }}
                    className="relative w-48 h-64 md:w-56 md:h-72 transform-style-3d group-hover:scale-105 transition-transform duration-500"
                  >
                    {/* Floating Glass Plaque */}
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.05)] flex flex-col items-center justify-center p-4">
                       <item.icon className={`w-12 h-12 mb-4 bg-gradient-to-br ${item.color} bg-clip-text text-transparent`} />
                       <div className="text-center font-serif text-lg leading-tight px-2">{item.title}</div>
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
              className="absolute inset-0 z-50 flex items-center justify-center p-6"
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
                  className="relative w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 md:p-12 shadow-[0_0_60px_rgba(255,255,255,0.1)] flex flex-col md:flex-row gap-8 items-center"
                >
                  <button 
                    onClick={() => setActiveId(null)}
                    className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-white/80" />
                  </button>

                  <div className="w-full md:w-1/2 flex-shrink-0">
                    <ImagePlaceholder src={item.src} label={`Photo — ${item.title}`} className="w-full aspect-[4/5]" />
                  </div>

                  <div className="w-full md:w-1/2 flex flex-col">
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
