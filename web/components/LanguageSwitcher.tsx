'use client';

import { useLanguage, Language } from '@/context/LanguageContext';
import { useState, useRef, useEffect } from 'react';
import { FaGlobe } from 'react-icons/fa';

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'inline';
}

export default function LanguageSwitcher({ variant = 'dropdown' }: LanguageSwitcherProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'es', label: 'Español', flag: '🇲🇽' },
    { code: 'en', label: 'English (US)', flag: '🇺🇸' },
    { code: 'en-GB', label: 'English (UK)', flag: '🇬🇧' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (variant === 'inline') {
    return (
      <div className="flex flex-wrap justify-center gap-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`flex items-center gap-2 px-3 py-2 rounded-full border transition-all ${
              language === lang.code
                ? 'bg-amber-500 text-white border-amber-500 shadow-md'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="text-sm font-medium uppercase">{lang.code}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1 md:px-3 md:py-2 rounded-lg hover:bg-slate-800 transition-colors text-white border border-slate-700"
        aria-label="Select Language"
      >
        <FaGlobe className="text-amber-500 text-lg" />
        <span className="uppercase font-bold text-xs md:text-sm">{language}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fade-in-up">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left ${
                language === lang.code ? 'text-amber-600 font-bold bg-amber-50' : 'text-slate-600'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
