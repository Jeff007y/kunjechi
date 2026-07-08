import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, HeartHandshake, X, Headphones } from 'lucide-react';

const talents = [
  {
    id: 'singing',
    title: 'Singing',
    icon: Headphones,
    color: 'from-rose-100 to-rose-50',
    blobColor: 'bg-rose-200',
    description: 'Finding rhythm in every moment and expressing emotions through melodies.',
    particleType: 'wave'
  },
  {
    id: 'listening',
    title: 'Listening',
    icon: HeartHandshake,
    color: 'from-blue-100 to-blue-50',
    blobColor: 'bg-blue-200',
    description: 'Always here to listen to people, understand their problems, and offer a comforting presence.',
    particleType: 'particle'
  }
];

export function Talents() {
  const [activeTalent, setActiveTalent] = useState<string | null>(null);

  return (
    <section className="relative w-full flex flex-col items-center justify-center py-24 bg-pearl overflow-hidden">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-serif text-slate-800 mb-16 text-center relative z-20"
      >
        My Talents
      </motion.h2>

      <div className="relative w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16 md:gap-32 h-[400px]">
        {talents.map((talent, i) => {
          const isActive = activeTalent === talent.id;
          const isFaded = activeTalent && !isActive;

          return (
            <motion.div
              key={talent.id}
              layoutId={`talent-container-${talent.id}`}
              className={`relative cursor-pointer transition-all duration-500 ${isFaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
              onClick={() => !activeTalent && setActiveTalent(talent.id)}
            >
              {!isActive && (
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, i % 2 === 0 ? 5 : -5, 0]
                  }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                  className="relative group"
                >
                  <div className={`w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-tr ${talent.color} shadow-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 relative overflow-hidden`}>
                    {talent.src ? (
                      <img src={talent.src} alt={talent.title} className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-overlay" referrerPolicy="no-referrer" />
                    ) : null}
                    {talent.src ? (
                       <img src={talent.src} alt={talent.title} className="absolute inset-0 w-full h-full object-cover z-10" referrerPolicy="no-referrer" />
                    ) : (
                      <talent.icon className="w-12 h-12 text-slate-700/50 z-10" />
                    )}
                    <div className="absolute inset-0 rounded-full border-4 border-white/60 shadow-[inset_0_0_20px_rgba(255,255,255,0.8)] pointer-events-none z-20" />
                  </div>
                  <h3 className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-sans font-medium text-lg text-slate-600 tracking-wide">
                    {talent.title}
                  </h3>
                </motion.div>
              )}
            </motion.div>
          );
        })}

        {/* Expanded View */}
        <AnimatePresence>
          {activeTalent && (
            <motion.div 
              className="absolute inset-0 z-50 flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div 
                className="absolute inset-0 bg-pearl/60 backdrop-blur-sm cursor-pointer"
                onClick={() => setActiveTalent(null)}
              />
              
              {talents.map((talent) => talent.id === activeTalent && (
                <motion.div
                  layoutId={`talent-container-${talent.id}`}
                  key={`expanded-${talent.id}`}
                  className={`relative w-full max-w-2xl bg-gradient-to-br ${talent.color} rounded-[3rem] p-12 shadow-2xl overflow-hidden`}
                >
                  <button 
                    onClick={() => setActiveTalent(null)}
                    className="absolute top-8 right-8 p-3 bg-white/30 hover:bg-white/50 rounded-full backdrop-blur-md transition-colors"
                  >
                    <X className="w-6 h-6 text-slate-700" />
                  </button>

                  {/* Decorative background animation */}
                  {talent.particleType === 'wave' ? (
                    <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center gap-2">
                      {[1,2,3,4,5,6,7].map(j => (
                        <motion.div 
                          key={j}
                          animate={{ height: ['20%', '80%', '20%'] }}
                          transition={{ duration: 1 + (j * 0.2), repeat: Infinity, ease: "easeInOut" }}
                          className={`w-4 bg-rose-400 rounded-full`}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="absolute inset-0 opacity-30 pointer-events-none">
                       {[...Array(15)].map((_, j) => (
                        <motion.div 
                          key={j}
                          animate={{ 
                            y: ['100%', '-10%'],
                            x: [Math.random() * 50, Math.random() * -50]
                          }}
                          transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, ease: "linear" }}
                          className="absolute bottom-0 w-3 h-3 rounded-full bg-blue-400 blur-sm"
                          style={{ left: `${Math.random() * 100}%` }}
                        />
                      ))}
                    </div>
                  )}

                  <div className="relative z-10 flex flex-col items-center text-center">
                    {talent.src ? (
                      <div className="w-32 h-32 md:w-48 md:h-48 mb-6 relative">
                        <img src={talent.src} alt={talent.title} className="w-full h-full object-cover rounded-full shadow-lg border-4 border-white/50" referrerPolicy="no-referrer" />
                        <div className="absolute -bottom-2 -right-2 p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-md">
                           <talent.icon className="w-6 h-6 text-slate-700" />
                        </div>
                      </div>
                    ) : (
                      <talent.icon className="w-16 h-16 text-slate-700 mb-6" />
                    )}
                    <h3 className="text-4xl font-serif text-slate-800 mb-4">{talent.title}</h3>
                    <p className="text-lg text-slate-600 font-sans leading-relaxed max-w-md">
                      {talent.description}
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
