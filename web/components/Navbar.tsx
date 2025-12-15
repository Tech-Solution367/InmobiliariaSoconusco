'use client';

import Link from 'next/link';
import { FaHome, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <button 
          className="md:hidden text-white hover:text-amber-500 transition-colors focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Desktop & Mobile Menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto mt-4 md:mt-0`}>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 font-medium text-lg items-center">
            <Link href="/" className="hover:text-amber-400 transition-colors relative group">
              Inicio
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/ventas" className="hover:text-amber-400 transition-colors relative group">
              Ventas
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/rentas" className="hover:text-amber-400 transition-colors relative group">
              Rentas
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/about" className="hover:text-amber-400 transition-colors relative group">
              Quiénes Somos
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors relative group">
              Contactos
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
