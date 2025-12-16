'use client';

import { FaHome, FaSmile, FaHandshake, FaAward } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export default function StatsSection() {
  const { t } = useLanguage();

  const stats = [
    {
      id: 1,
      label: t('stats_sold'),
      value: '+500',
      icon: FaHome,
      color: 'text-amber-500',
    },
    {
      id: 2,
      label: t('stats_clients'),
      value: '+500',
      icon: FaSmile,
      color: 'text-amber-500',
    },
    {
      id: 3,
      label: t('stats_years'),
      value: '6',
      icon: FaAward,
      color: 'text-amber-500',
    },
    {
      id: 4,
      label: t('stats_deals'),
      value: '98%',
      icon: FaHandshake,
      color: 'text-amber-500',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-slate-900 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group border border-slate-800"
            >
              <div className={`text-5xl mb-6 ${stat.color} transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg`}>
                <stat.icon />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-3 font-display tracking-tight">
                {stat.value}
              </div>
              <div className="text-slate-300 font-medium uppercase tracking-wider text-xs md:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
