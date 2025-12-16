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
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-amber-500 hover:text-amber-400 transition-colors">
          <FaHome className="text-amber-500" />
          <span className="tracking-tight">Inmobiliaria Soconusco</span>
        </Link>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <button 
            className="text-white hover:text-amber-500 transition-colors focus:outline-none"
            onClick={toggleMenu}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop & Mobile Menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto mt-4 md:mt-0 transition-all duration-300 ease-in-out`}>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 font-medium text-lg items-center bg-slate-800 md:bg-transparent p-4 md:p-0 rounded-xl md:rounded-none border border-slate-700 md:border-none">
            <Link href="/" className="hover:text-amber-400 transition-colors relative group w-full md:w-auto text-center py-2 md:py-0 border-b border-slate-700 md:border-none" onClick={() => setIsOpen(false)}>
              {t('nav_home')}
              <span className="hidden md:block absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/ventas" className="hover:text-amber-400 transition-colors relative group w-full md:w-auto text-center py-2 md:py-0 border-b border-slate-700 md:border-none" onClick={() => setIsOpen(false)}>
              {t('nav_sales')}
              <span className="hidden md:block absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/rentas" className="hover:text-amber-400 transition-colors relative group w-full md:w-auto text-center py-2 md:py-0 border-b border-slate-700 md:border-none" onClick={() => setIsOpen(false)}>
              {t('nav_rentals')}
              <span className="hidden md:block absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="hover:text-amber-400 transition-colors relative group w-full md:w-auto text-center py-2 md:py-0 border-b border-slate-700 md:border-none" onClick={() => setIsOpen(false)}>
              {t('nav_about')}
              <span className="hidden md:block absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors relative group w-full md:w-auto text-center py-2 md:py-0" onClick={() => setIsOpen(false)}>
              {t('nav_contact')}
              <span className="hidden md:block absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            
            <div className="hidden md:block ml-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
