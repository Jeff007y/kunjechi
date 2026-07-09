import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Calendar } from 'lucide-react';
import { ImagePlaceholder } from './ImagePlaceholder';
import { useLanguage } from '../LanguageContext';

gsap.registerPlugin(ScrollTrigger);

const keywords = [
  "Singer",
  "Listener",
  "Teacher",
  "Research Enthusiast",
  "Dreamer",
  "Music Lover"
];

export function AboutMe() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  const keywordsEn = [
    "Singer",
    "Listener",
    "Teacher",
    "Research Enthusiast",
    "Dreamer",
    "Music Lover"
  ];

  const keywordsMl = [
    "ഗായിക",
    "ശ്രോതാവ്",
    "അദ്ധ്യാപിക",
    "ഗവേഷണ തൽപര",
    "സ്വപ്നാടക",
    "സംഗീത പ്രേമി"
  ];

  const activeKeywords = language === 'en' ? keywordsEn : keywordsMl;

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;
    
    gsap.fromTo(
      textRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative w-full flex flex-col items-center justify-center py-12 md:py-16 bg-pearl overflow-hidden">
      <h2 ref={textRef} className="text-4xl md:text-6xl font-serif font-medium text-slate-800 mb-4 md:mb-8 z-10">
        {language === 'en' ? "Who am I?" : "ഞാൻ ആരാണ്?"}
      </h2>

      <div className="relative w-full max-w-[24rem] sm:max-w-md md:max-w-xl aspect-square flex items-center justify-center my-4 md:-my-8">
        {/* Center Portrait */}
        <motion.div 
          className="relative z-20 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <ImagePlaceholder src="https://lh3.googleusercontent.com/d/1UeaGB69EEQGnfkWtyPpxY9jXCwWJhHuw" label="Keerthana Sunil" circular className="w-full h-full shadow-2xl" />
        </motion.div>

        {/* Orbiting Keywords */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-10 hidden sm:block"
        >
          {activeKeywords.map((word, i) => {
            const angle = (i * 360) / activeKeywords.length;
            const radius = '45%'; // Responsive radius
            return (
              <div
                key={word}
                className="absolute top-1/2 left-1/2 flex items-center justify-center"
                style={{
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius})`,
                  width: '100%',
                  height: '100%'
                }}
              >
                {/* Counter-rotate to keep text upright */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 -translate-y-1/2 flex items-center justify-center"
                >
                  <div className="glass-panel px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg">
                    <span className="text-xs md:text-base font-sans font-medium tracking-wide text-slate-700 whitespace-nowrap">
                      {word}
                    </span>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
      
      {/* Mobile Keywords List */}
      <div className="sm:hidden flex flex-wrap justify-center gap-2 mt-4 px-4 relative z-20">
        {activeKeywords.map(word => (
          <div key={word} className="glass-panel px-4 py-2 rounded-full shadow-sm bg-white/50 border border-white/20">
            <span className="text-sm font-sans font-medium text-slate-700">{word}</span>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-8 md:mt-4 flex flex-col md:flex-row items-center gap-6 md:gap-12 text-slate-600 font-sans tracking-wide relative z-20"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50/80 backdrop-blur-sm rounded-full text-indigo-500 shadow-sm border border-indigo-100">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="font-medium text-slate-700">Pulpally, Wayanad</span>
        </div>
        
        <div className="hidden md:block w-px h-8 bg-slate-300" />
        
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50/80 backdrop-blur-sm rounded-full text-purple-500 shadow-sm border border-purple-100">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="font-medium text-slate-700">Born Dec 31, 2001</span>
        </div>
      </motion.div>
    </section>
  );
}
