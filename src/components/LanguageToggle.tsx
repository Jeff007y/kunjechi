import React from 'react';
import { useLanguage } from '../LanguageContext';
import { Languages } from 'lucide-react';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-[200] glass-panel px-3 py-2 rounded-full flex items-center gap-2 shadow-lg bg-white/50 hover:bg-white/80 transition-colors border border-white/20 backdrop-blur-md"
      aria-label="Toggle language"
    >
      <Languages size={18} className="text-slate-600" />
      <span className="text-sm font-medium text-slate-700 uppercase">
        {language === 'en' ? 'EN' : 'ML'}
      </span>
    </button>
  );
}
