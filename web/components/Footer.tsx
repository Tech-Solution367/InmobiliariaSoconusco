'use client';

import Link from 'next/link';
import { FaFacebook, FaWhatsapp, FaInstagram, FaHome, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white pt-12 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold mb-4 text-amber-500">
              <FaHome />
              <span>Inmobiliaria Soconusco</span>
            </div>
            <p className="text-slate-300 mb-4 leading-relaxed">
              {t('footer_desc')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-500">{t('footer_links')}</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-slate-300 hover:text-amber-400 transition-colors">{t('nav_home')}</Link></li>
              <li><Link href="/ventas" className="text-slate-300 hover:text-amber-400 transition-colors">{t('nav_sales')}</Link></li>
              <li><Link href="/rentas" className="text-slate-300 hover:text-amber-400 transition-colors">{t('nav_rentals')}</Link></li>
              <li><Link href="/contact" className="text-slate-300 hover:text-amber-400 transition-colors">{t('nav_contact')}</Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-amber-500">{t('footer_contact')}</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-slate-300">
                <FaPhone className="text-amber-500" />
                <span>+52 123 456 7890</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <FaEnvelope className="text-amber-500" />
                <span>contacto@inmobiliariasoconusco.com</span>
              </li>
            </ul>
            
            <h4 className="text-lg font-semibold mb-3 text-white">{t('footer_follow')}</h4>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors transform hover:scale-110 shadow-lg">
                <FaFacebook className="text-white text-xl" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-pink-600 p-2 rounded-full hover:bg-pink-700 transition-colors transform hover:scale-110 shadow-lg">
                <FaInstagram className="text-white text-xl" />
              </a>
              <a href="https://wa.me/521234567890" target="_blank" rel="noopener noreferrer" className="bg-green-500 p-2 rounded-full hover:bg-green-600 transition-colors transform hover:scale-110 shadow-lg">
                <FaWhatsapp className="text-white text-xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Inmobiliaria Soconusco. {t('footer_rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
