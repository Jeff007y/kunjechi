import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Headphones, Film, FlaskConical } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export function Interests() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Calculate relative to the center of the container
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      setMousePos({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const interests = [
    {
      id: 'movies',
      title: language === 'en' ? 'Movies' : 'സിനിമകൾ',
      icon: Film,
      color: 'from-blue-500 to-cyan-400',
      shadow: 'rgba(56,189,248,0.3)',
      desc: language === 'en' ? 'Exploring stories and visual arts.' : 'കഥകളും ദൃശ്യകലകളും ആസ്വദിക്കുന്നു.'
    },
    {
      id: 'research',
      title: language === 'en' ? 'Research' : 'ഗവേഷണം',
      icon: FlaskConical,
      color: 'from-emerald-500 to-teal-400',
      shadow: 'rgba(52,211,153,0.3)',
      desc: language === 'en' ? 'Discovering new knowledge and solving problems.' : 'പുതിയ അറിവുകൾ തേടുകയും പ്രശ്നങ്ങൾക്ക് പരിഹാരം കാണുകയും ചെയ്യുന്നു.'
    },
    {
      id: 'music',
      title: language === 'en' ? 'Listening Music' : 'സംഗീതം കേൾക്കൽ',
      icon: Headphones,
      color: 'from-indigo-500 to-purple-400',
      shadow: 'rgba(139,92,246,0.3)',
      desc: language === 'en' ? 'Finding rhythm in every moment.' : 'എല്ലാ നിമിഷങ്ങളിലും താളം കണ്ടെത്തുന്നു.'
    }
  ];

  return (
    <section ref={containerRef} className="relative w-full flex flex-col items-center justify-center py-24 bg-slate-900 overflow-hidden text-white">
      
      {/* Dynamic Background based on cursor */}
      <motion.div 
        animate={{ 
          background: `radial-gradient(600px circle at ${mousePos.x + window.innerWidth/2}px ${mousePos.y + window.innerHeight/2}px, rgba(139, 92, 246, 0.1), transparent 80%)`
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        className="absolute inset-0 pointer-events-none"
      />

      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-serif mb-16 tracking-tight relative z-20 text-center"
      >
        {language === 'en' ? "My Interests" : "എന്റെ താല്പര്യങ്ങൾ"}
      </motion.h2>

      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-wrap justify-center gap-8 px-6">
        {interests.map((interest, i) => (
          <motion.div
            key={interest.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            whileHover={{ y: -10 }}
            className="flex flex-col items-center flex-1 min-w-[250px] max-w-[300px]"
          >
            <div 
              className={`w-32 h-32 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 relative overflow-hidden group`}
              style={{ boxShadow: `0 0 30px ${interest.shadow}` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${interest.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
              <interest.icon className="w-12 h-12 text-white/90 group-hover:scale-110 transition-transform duration-500" />
            </div>
            <h3 className="text-2xl font-serif mb-3 text-center">{interest.title}</h3>
            <p className="text-white/60 text-center font-sans">
              {interest.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Audio Wave Visualizer Simulation (keep a small subtle one at the bottom) */}
      <div className="flex items-center justify-center gap-1.5 h-10 w-full max-w-xs mt-20 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: "4px" }}
            whileInView={{ 
              height: [`${10 + Math.random() * 40}%`, `${30 + Math.random() * 70}%`, `${10 + Math.random() * 40}%`]
            }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ 
              duration: 0.8 + Math.random() * 0.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: Math.random() * 0.5
            }}
            className="w-1 bg-white rounded-full"
          />
        ))}
      </div>
    </section>
  );
}
