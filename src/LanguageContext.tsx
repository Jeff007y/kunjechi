import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ml';

export const LanguageContext = createContext<{
  language: Language;
  toggleLanguage: () => void;
}>({
  language: 'en',
  toggleLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage: () => setLanguage(l => l === 'en' ? 'ml' : 'en') }}>
      {children}
    </LanguageContext.Provider>
  );
};
