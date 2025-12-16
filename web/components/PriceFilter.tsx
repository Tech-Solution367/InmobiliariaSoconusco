'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaFilter, FaChevronDown } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';
import { formatPrice, convertToMXN, convertFromMXN } from '@/lib/currency';

export default function PriceFilter() {
  const { t, language } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const min = searchParams.get('minPrice');
    const max = searchParams.get('maxPrice');
    if (min) setMinPrice(Math.round(convertFromMXN(Number(min), language)).toString());
    else setMinPrice('');
    
    if (max) setMaxPrice(Math.round(convertFromMXN(Number(max), language)).toString());
    else setMaxPrice('');
  }, [searchParams, language]);

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (minPrice) {
      const minMXN = Math.round(convertToMXN(Number(minPrice), language));
      params.set('minPrice', minMXN.toString());
    } else {
      params.delete('minPrice');
    }

    if (maxPrice) {
      const maxMXN = Math.round(convertToMXN(Number(maxPrice), language));
      params.set('maxPrice', maxMXN.toString());
    } else {
      params.delete('maxPrice');
    }

    router.push(`?${params.toString()}`);
  };

  const handleClear = () => {
    setMinPrice('');
    setMaxPrice('');
    router.push('?');
  };

  // Calculate placeholders based on language
  const minPlaceholder = formatPrice(1000000, language);
  const maxPlaceholder = formatPrice(5000000, language);

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden mb-12">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-white hover:bg-slate-50 transition-colors text-left md:cursor-default"
      >
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 p-2 rounded-lg text-white shadow-md">
            <FaFilter />
          </div>
          <div>
             <h2 className="text-xl font-bold text-slate-800 font-display">{t('filter_title')}</h2>
             <p className="text-sm text-slate-500 md:hidden">
               {isOpen ? t('filter_hide') : t('filter_show')}
             </p>
          </div>
        </div>
        <div className={`transform transition-transform duration-300 md:hidden ${isOpen ? 'rotate-180' : ''}`}>
          <FaChevronDown className="text-slate-400" />
        </div>
      </button>

      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} md:max-h-[500px] md:opacity-100`}>
        <div className="p-6 pt-0 md:p-8 md:pt-0 border-t border-slate-100 md:border-none mt-2 md:mt-0">
          <h3 className="text-lg font-semibold mb-4 text-slate-800 hidden md:block">{t('filter_by_price')}</h3>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('filter_min')}</label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder={minPlaceholder}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-900 transition-all"
              />
            </div>
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('filter_max')}</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder={maxPlaceholder}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent text-slate-900 transition-all"
              />
            </div>
            <div className="flex gap-3 w-full md:w-1/3">
              <button
                onClick={handleFilter}
                className="flex-1 bg-slate-900 text-white py-3 px-4 rounded-xl font-bold hover:bg-amber-500 hover:text-slate-900 transition-all shadow-md"
              >
                {t('filter_btn')}
              </button>
              <button
                onClick={handleClear}
                className="px-6 py-3 border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
              >
                {t('filter_clear')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
