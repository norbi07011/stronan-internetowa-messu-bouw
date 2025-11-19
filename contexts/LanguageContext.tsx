import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';
import { translations } from '../services/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(Language.NL);

  useEffect(() => {
    const savedLang = localStorage.getItem('messu-lang') as Language;
    if (savedLang && Object.values(Language).includes(savedLang)) {
      setLanguageState(savedLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('messu-lang', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to NL if key missing
        let fallback: any = translations[Language.NL];
        for (const fk of keys) {
            if(fallback && fallback[fk]) fallback = fallback[fk];
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }
    return typeof value === 'string' ? value : key;
  };

  const dir = language === Language.AR ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [dir, language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
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