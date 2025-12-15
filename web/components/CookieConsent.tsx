'use client';

import { useState, useEffect } from 'react';
import { FaCookieBite } from 'react-icons/fa';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-fade-in-up">
      <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-slate-700 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="bg-amber-500 p-3 rounded-full shrink-0">
            <FaCookieBite className="text-slate-900 text-xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-1">Usamos Cookies</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Utilizamos cookies para mejorar tu experiencia de navegación y ofrecerte contenido personalizado. 
              Al continuar navegando, aceptas nuestra política de privacidad.
            </p>
          </div>
        </div>
        <div className="flex gap-3 shrink-0 w-full md:w-auto">
          <button 
            onClick={() => setShowConsent(false)}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors font-medium text-sm"
          >
            Rechazar
          </button>
          <button 
            onClick={acceptCookies}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-amber-500 text-slate-900 hover:bg-amber-400 transition-colors font-bold text-sm shadow-lg hover:shadow-amber-500/20"
          >
            Aceptar Todo
          </button>
        </div>
      </div>
    </div>
  );
}
