import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ImagePlaceholder } from './ImagePlaceholder';

const education = [
  { level: '10th', institution: 'St. Thomas AUP School, Mullenkolly', src: 'https://drive.google.com/uc?export=view&id=1pI-EFKAmNraGPjZeVBINJV7rb7r1xOo8' },
  { level: 'Plus Two', institution: "St. Mary's Higher Secondary School, Mullankolly", src: 'https://drive.google.com/uc?export=view&id=1vEPE5qNTsOP8Ew1KLYrL2wK7gP5WE6UI' },
  { level: 'UG', institution: 'St. Thomas College, Ranny', src: 'https://drive.google.com/uc?export=view&id=1slJzbD9hRdTD481PX_2mI1oHsWQVolPw' },
  { level: 'PG', institution: 'St. Thomas College, Kozhencherry', src: 'https://drive.google.com/uc?export=view&id=1AYZFVtmwfSNc74-HbeJhChZaj_6Uyaiw' },
  { level: 'NET Coaching', institution: 'Life Science Academy, Thiruvalla', src: 'https://drive.google.com/uc?export=view&id=1pHjuv4WNbkgaofKdsh1L41KDLbd_PJKm' }
];

export function Education() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', 'calc(-100% + 100vw)']);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[400vh] bg-gradient-to-br from-indigo-50/50 to-purple-50/50"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        <div className="absolute top-24 left-12 md:left-24 z-20">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-slate-800"
          >
            Educational Journey
          </motion.h2>
        </div>

        {/* The horizontal scrolling track */}
        <motion.div style={{ x }} className="flex w-max relative pl-[10vw] md:pl-[20vw] pr-[10vw] md:pr-[20vw] pt-20" ref={scrollContainerRef}>
          
          {/* Continuous Glowing Path */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-300 to-indigo-100 shadow-[0_0_20px_rgba(167,139,250,0.6)] -translate-y-1/2" />
          
          <motion.div 
            style={{ 
              scaleX: scrollYProgress, 
              originX: 0 
            }}
            className="absolute top-1/2 left-0 w-full h-[4px] bg-gradient-to-r from-indigo-400 to-purple-400 shadow-[0_0_30px_rgba(167,139,250,0.8)] -translate-y-1/2 z-10"
          />

          {education.map((item, i) => (
            <div key={item.level} className="relative flex-shrink-0 w-[80vw] md:w-[40vw] flex flex-col items-center justify-center">
              
              {/* Milestone Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-4 border-indigo-400 shadow-[0_0_15px_rgba(167,139,250,0.5)] z-20" />

              <div className={`w-full max-w-[280px] md:max-w-[320px] transition-all duration-700 hover:-translate-y-2 ${i % 2 === 0 ? 'mb-64 md:mb-80' : 'mt-64 md:mt-80'}`}>
                <div className="glass-panel p-4 rounded-3xl group">
                  <ImagePlaceholder 
                    src={item.src}
                    label={`Photo — ${item.level}`} 
                    className="w-full h-40 md:h-48 mb-4 rounded-xl group-hover:shadow-lg transition-shadow duration-300"
                  />
                  <div className="text-center px-2 pb-2">
                    <h3 className="text-xl font-serif text-indigo-900 mb-1">{item.level}</h3>
                    <p className="text-sm font-sans text-slate-600 line-clamp-2">{item.institution}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
