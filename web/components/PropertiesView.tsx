'use client';

import Navbar from '@/components/Navbar';
import PropertyCard from '@/components/PropertyCard';
import { IProperty } from '@/models/Property';
import { useLanguage } from '@/context/LanguageContext';

interface PropertiesViewProps {
  properties: IProperty[];
}

export default function PropertiesView({ properties }: PropertiesViewProps) {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('all_properties_title')}
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            {t('all_properties_subtitle')}
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('no_properties_found')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property._id as unknown as string} property={property} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
