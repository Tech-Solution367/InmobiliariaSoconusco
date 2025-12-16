'use client';

import Link from 'next/link';
import { FaHome, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-slate-900 text-white p-4 shadow-lg sticky top-0 z-50 border-b border-amber-500/30">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-lg md:text-2xl font-bold text-amber-500 hover:text-amber-400 transition-colors">
          <FaHome className="text-amber-500" />
          <span className="tracking-tight truncate max-w-[200px] md:max-w-none">Inmobiliaria Soconusco</span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            className="text-white hover:text-amber-500 transition-colors focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          <div className="flex items-center gap-8 font-medium text-lg">
            <Link href="/" className="hover:text-amber-400 transition-colors relative group">
              {t('nav_home')}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/ventas" className="hover:text-amber-400 transition-colors relative group">
              {t('nav_sales')}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/rentas" className="hover:text-amber-400 transition-colors relative group">
              {t('nav_rentals')}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="hover:text-amber-400 transition-colors relative group">
              {t('nav_about')}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors relative group">
              {t('nav_contact')}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <div className="ml-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-slate-900 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100 border-b border-slate-700' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col p-4 space-y-2">
            <Link href="/" className="block py-3 px-4 rounded-lg hover:bg-slate-800 text-center font-medium text-lg" onClick={() => setIsOpen(false)}>
              {t('nav_home')}
            </Link>
            <Link href="/ventas" className="block py-3 px-4 rounded-lg hover:bg-slate-800 text-center font-medium text-lg" onClick={() => setIsOpen(false)}>
              {t('nav_sales')}
            </Link>
            <Link href="/rentas" className="block py-3 px-4 rounded-lg hover:bg-slate-800 text-center font-medium text-lg" onClick={() => setIsOpen(false)}>
              {t('nav_rentals')}
            </Link>
            <Link href="/about" className="block py-3 px-4 rounded-lg hover:bg-slate-800 text-center font-medium text-lg" onClick={() => setIsOpen(false)}>
              {t('nav_about')}
            </Link>
            <Link href="/contact" className="block py-3 px-4 rounded-lg hover:bg-slate-800 text-center font-medium text-lg" onClick={() => setIsOpen(false)}>
              {t('nav_contact')}
            </Link>
            
            <div className="pt-4 mt-2 border-t border-slate-700">
              <p className="text-center text-slate-400 text-sm mb-3 uppercase tracking-wider font-semibold">Idioma / Language</p>
              <LanguageSwitcher variant="inline" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
