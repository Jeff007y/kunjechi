import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Mic2 } from 'lucide-react';
import { ImagePlaceholder } from './ImagePlaceholder';

const strengths = [
  {
    title: 'Teaching',
    icon: BookOpen,
    description: 'Guiding minds, sharing knowledge and illuminating paths to discovery.',
    bg: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    accent: 'from-blue-400 to-indigo-500',
    shadow: 'shadow-blue-900/10',
    images: [
      'https://lh3.googleusercontent.com/d/1YKM67DttR-Lstqkx7DghIU9mi2Q7B7dk',
      'https://lh3.googleusercontent.com/d/1-d9fXDgz9rTEprnYr6RzotZn1JsjTxtM',
      'https://lh3.googleusercontent.com/d/1DaIOEgSwlKIIS-AyzK9dgTvb2aTUGOHh',
      'https://lh3.googleusercontent.com/d/1cvVivHxYXKlG5w3rpyr8-6KT-GtFiuQ-',
      'https://lh3.googleusercontent.com/d/1PIySDw_kTpp3w-sH1PdTi0Vx11zj3M88',
      'https://lh3.googleusercontent.com/d/1nJ4nIxc8j_Bxxk_-qyHIlkhw26l1f-0N',
      'https://lh3.googleusercontent.com/d/1ZxmKywxi2YzryyR5qPN6FiSqJ3rPYOzU'
    ]
  },
  {
    title: 'Singing',
    icon: Mic2,
    description: 'Expressing the soul, connecting through melody and creating resonance.',
    bg: 'bg-gradient-to-br from-rose-50 to-orange-50',
    accent: 'from-rose-400 to-orange-400',
    shadow: 'shadow-rose-900/10',
    images: [
      'https://lh3.googleusercontent.com/d/1-zk40z0muXsP4hzutBbgFtumkQZ_mwRe'
    ]
  }
];

export function Strengths() {
  const [activeImageIndex, setActiveImageIndex] = useState<{ [key: string]: number }>({ Teaching: 0, Singing: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex(prev => {
        const next = { ...prev };
        strengths.forEach(strength => {
          if (strength.images && strength.images.length > 0) {
            next[strength.title] = (prev[strength.title] + 1) % strength.images.length;
          }
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full flex flex-col items-center justify-center py-24 bg-pearl overflow-hidden perspective-1000">
      
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-serif text-slate-800 mb-16 text-center"
      >
        What I'm Good At
      </motion.h2>

      <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {strengths.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            whileHover={{ y: -10, rotateX: 5, rotateY: i === 0 ? 5 : -5 }}
            className={`relative group rounded-[2.5rem] p-10 md:p-14 ${item.bg} border border-white shadow-xl hover:${item.shadow} hover:shadow-2xl transition-all duration-500 transform-style-3d cursor-pointer overflow-hidden`}
          >
            {/* Ambient background glow on hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${item.accent} mix-blend-overlay rounded-[2.5rem] blur-xl`} />

            {/* Fading Image Background for categories with images */}
            {item.images && item.images.length > 0 && (
              <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                 <AnimatePresence mode="wait">
                   <motion.img 
                     key={activeImageIndex[item.title]}
                     src={item.images[activeImageIndex[item.title]]}
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 1 }}
                     className="w-full h-full object-contain rounded-[2.5rem]"
                     referrerPolicy="no-referrer"
                   />
                 </AnimatePresence>
                 <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
              </div>
            )}

            <div className="relative z-10 flex flex-col items-start h-full">
              <div className="flex w-full items-start justify-between mb-8">
                <div className="p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-10 h-10 text-slate-700" />
                </div>
                
                {/* Image Preview */}
                {item.images && item.images.length > 0 && (
                  <div className="relative w-48 md:w-64 lg:w-80 shrink-0 ml-4 perspective-1000">
                    <AnimatePresence mode="wait">
                       <motion.img 
                         key={activeImageIndex[item.title]}
                         src={item.images[activeImageIndex[item.title]]}
                         initial={{ opacity: 0, rotateY: 10, scale: 0.95 }}
                         animate={{ opacity: 1, rotateY: 0, scale: 1 }}
                         exit={{ opacity: 0, rotateY: -10, scale: 0.95 }}
                         transition={{ duration: 0.8 }}
                         className="w-full h-auto object-contain drop-shadow-2xl rounded-xl block"
                         referrerPolicy="no-referrer"
                       />
                     </AnimatePresence>
                  </div>
                )}
              </div>

              <h3 className="text-3xl font-serif text-slate-800 mb-4">{item.title}</h3>
              <p className="text-slate-600 font-sans leading-relaxed flex-grow">
                {item.description}
              </p>

              {/* Animated decorative line */}
              <div className="mt-8 w-12 h-1 rounded-full bg-slate-200 overflow-hidden">
                <motion.div 
                  className={`h-full w-full bg-gradient-to-r ${item.accent}`}
                  initial={{ x: "-100%" }}
                  whileInView={{ x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
