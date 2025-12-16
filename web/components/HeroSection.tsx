'use client';

import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-20 md:py-0">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl animate-fade-in-up font-display tracking-tight leading-tight">
            {t('hero_title_1')} <span className="text-amber-500">{t('hero_title_2')}</span> {t('hero_title_3')}
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-10 max-w-3xl mx-auto drop-shadow-md animate-fade-in-up delay-200 font-light leading-relaxed">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
            <Link href="/ventas" className="bg-amber-500 text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-400 transition-all hover:scale-105 shadow-xl hover:shadow-amber-500/20 flex items-center justify-center gap-2 group">
              {t('btn_properties')}
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-slate-900 transition-all hover:scale-105 shadow-xl flex items-center justify-center">
              {t('btn_contact')}
            </Link>
          </div>
        </div>
      </div>
  );
}
