import React from 'react';
import { motion } from 'motion/react';
import { ImagePlaceholder } from './ImagePlaceholder';
import { GraduationCap } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export function Education() {
  const { language } = useLanguage();

  const education = [
    { level: language === 'en' ? '10th' : 'പത്താം ക്ലാസ്', institution: 'St. Thomas AUP School, Mullenkolly', src: 'https://lh3.googleusercontent.com/d/1pI-EFKAmNraGPjZeVBINJV7rb7r1xOo8' },
    { level: language === 'en' ? 'Plus Two' : 'പ്ലസ് ടു', institution: "St. Mary's Higher Secondary School, Mullankolly", src: 'https://lh3.googleusercontent.com/d/1vEPE5qNTsOP8Ew1KLYrL2wK7gP5WE6UI' },
    { level: language === 'en' ? 'UG' : 'ബിരുദം (UG)', institution: 'St. Thomas College, Ranny', src: 'https://lh3.googleusercontent.com/d/1slJzbD9hRdTD481PX_2mI1oHsWQVolPw' },
    { level: language === 'en' ? 'PG' : 'ബിരുദാനന്തര ബിരുദം (PG)', institution: 'St. Thomas College, Kozhencherry', src: 'https://lh3.googleusercontent.com/d/1AYZFVtmwfSNc74-HbeJhChZaj_6Uyaiw' },
    { level: language === 'en' ? 'NET Coaching' : 'നെറ്റ് കോച്ചിംഗ്', institution: 'Life Science Academy, Thiruvalla', src: 'https://lh3.googleusercontent.com/d/1Dayhjnxzguj12RRShKzcbdpI06MUbVQt' }
  ];

  return (
    <section className="relative w-full py-32 bg-slate-50 overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
        <div className="absolute top-1/2 -right-24 w-[40rem] h-[40rem] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-indigo-50 text-indigo-500 rounded-2xl shadow-sm border border-indigo-100">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-800">
            {language === 'en' ? "Educational Journey" : "വിദ്യാഭ്യാസ യാത്ര"}
          </h2>
        </motion.div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-indigo-200/50 -translate-x-1/2" />

          <div className="flex flex-col gap-16 md:gap-24">
            {education.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.level} className="relative flex flex-col md:flex-row items-center w-full">
                  
                  {/* Timeline Dot */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                    className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white shadow-md -translate-x-1/2 z-20"
                  />

                  {/* Content Card (Desktop: alternating left/right, Mobile: right) */}
                  <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-16 md:text-right flex md:justify-end' : 'md:pl-16 md:ml-auto flex md:justify-start'}`}>
                    <motion.div 
                      initial={{ opacity: 0, x: isEven ? -30 : 30, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="group w-full max-w-[400px]"
                    >
                      <div className="bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-1">
                        <div className="overflow-hidden rounded-2xl mb-6">
                          <ImagePlaceholder 
                            src={item.src}
                            label={`Photo — ${item.level}`} 
                            className="w-full aspect-video md:aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <h3 className="text-2xl font-serif text-slate-800 mb-2">{item.level}</h3>
                        <p className="text-slate-500 font-sans leading-relaxed">{item.institution}</p>
                      </div>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
