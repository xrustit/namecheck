import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/lib/i18n';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getCISCountries = () => [
  'RU', 'BY', 'KZ', 'KG', 'TJ', 'UZ', 'AM', 'AZ', 'MD'
];

const getDefaultLanguage = (): Language => {
  try {
    const userRegion = new Intl.DateTimeFormat().resolvedOptions().locale.split('-')[1];
    return getCISCountries().includes(userRegion) ? 'ru' : 'en';
  } catch (error) {
    console.log('Error detecting region:', error);
    return 'en';
  }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(getDefaultLanguage());

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};