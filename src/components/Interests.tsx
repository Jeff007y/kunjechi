import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'motion/react';
import { Headphones, Disc3 } from 'lucide-react';

export function Interests() {
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

  return (
    <section ref={containerRef} className="relative w-full flex flex-col items-center justify-center py-24 bg-slate-900 overflow-hidden text-white">
      
      {/* Dynamic Background based on cursor */}
      <motion.div 
        animate={{ 
          background: `radial-gradient(600px circle at ${mousePos.x + window.innerWidth/2}px ${mousePos.y + window.innerHeight/2}px, rgba(139, 92, 246, 0.15), transparent 80%)`
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Floating Vinyls */}
      <motion.div 
        animate={{ 
          rotate: 360,
          y: [0, -20, 0],
          x: mousePos.x * 0.05
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          x: { type: "spring", stiffness: 50, damping: 20 }
        }}
        className="absolute top-1/4 left-1/4 opacity-20 pointer-events-none"
      >
        <Disc3 className="w-64 h-64 text-indigo-300" />
      </motion.div>

      <motion.div 
        animate={{ 
          rotate: -360,
          y: [0, 30, 0],
          x: mousePos.x * -0.05
        }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          x: { type: "spring", stiffness: 50, damping: 20 }
        }}
        className="absolute bottom-1/4 right-1/4 opacity-10 pointer-events-none"
      >
        <Disc3 className="w-96 h-96 text-purple-300" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="w-24 h-24 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.3)]">
            <Headphones className="w-10 h-10 text-indigo-300" />
          </div>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif mb-12 tracking-tight"
        >
          I Love Listening Music
        </motion.h2>

        {/* Audio Wave Visualizer Simulation */}
        <div className="flex items-center justify-center gap-1.5 h-16 w-full max-w-md mt-10">
          {[...Array(40)].map((_, i) => (
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
              className="w-1 md:w-1.5 bg-gradient-to-t from-indigo-500 to-purple-400 rounded-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
