'use client';

import Navbar from '@/components/Navbar';
import PriceFilter from '@/components/PriceFilter';
import HeroVideo from '@/components/HeroVideo';
import PropertyCard from '@/components/PropertyCard';
import { IProperty } from '@/models/Property';
import { useLanguage } from '@/context/LanguageContext';

interface RentasViewProps {
  properties: IProperty[];
}

export default function RentasView({ properties }: RentasViewProps) {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="relative">
        <HeroVideo 
          src="/videos/CasaDeRenta.mp4"
          title={t('rentals_title')}
          subtitle={t('rentals_subtitle')}
          muted={true}
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-12 -mt-20 relative z-10">
        <PriceFilter />

        {properties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-slate-400">{t('no_properties_found')}</h3>
            <p className="text-slate-400 mt-2">{t('try_adjusting_filters')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
