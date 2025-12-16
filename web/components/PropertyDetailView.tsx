'use client';

import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { FaWhatsapp, FaMapMarkerAlt, FaTag, FaArrowLeft, FaVideo, FaStreetView } from 'react-icons/fa';
import MapWrapper from '@/components/MapWrapper';
import ContactForm from '@/components/ContactForm';
import { IProperty } from '@/models/Property';
import { useLanguage } from '@/context/LanguageContext';
import { formatPrice, CURRENCY_RATES } from '@/lib/currency';

interface PropertyDetailViewProps {
  property: IProperty;
}

export default function PropertyDetailView({ property }: PropertyDetailViewProps) {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4 py-8">
        <Link href="/" className="inline-flex items-center text-slate-600 mb-6 hover:text-slate-900 transition-colors font-medium">
          <FaArrowLeft className="mr-2" /> {t('prop_back_home')}
        </Link>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Gallery Section */}
            <div className="p-4 bg-gray-100">
              <div className="h-[400px] md:h-[500px] bg-gray-200 rounded-lg overflow-hidden mb-4 shadow-inner">
                {property.images && property.images.length > 0 ? (
                  <img 
                    src={property.images[0]} 
                    alt={property.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">{t('card_no_image')}</div>
                )}
              </div>
              <div className="grid grid-cols-4 md:grid-cols-5 gap-2 overflow-y-auto max-h-60 pr-2 custom-scrollbar">
                {property.images.slice(1).map((img, index) => (
                  <div key={index} className="h-20 bg-gray-200 rounded overflow-hidden cursor-pointer hover:opacity-80 transition-opacity border border-gray-300">
                    <img src={img} alt={`View ${index + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8 lg:p-12 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">{property.title}</h1>
                <span className={`px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide ${property.type === 'sale' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}>
                  {property.type === 'sale' ? t('card_sale') : t('card_rent')}
                </span>
              </div>

              <div className="flex items-center text-gray-600 mb-6 text-lg">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                {property.location}
              </div>

              <div className="flex items-center text-slate-900 font-bold text-4xl mb-8">
                <FaTag className="mr-3 text-yellow-500" />
                {formatPrice(property.price, language)} <span className="text-lg text-gray-500 font-normal ml-2">{CURRENCY_RATES[language as keyof typeof CURRENCY_RATES]?.code}</span>
              </div>

              <div className="prose max-w-none mb-8 text-gray-700 flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">{t('prop_description')}</h3>
                <p className="whitespace-pre-line leading-relaxed">{property.description}</p>
              </div>

              <div className="space-y-4 mt-auto">
                <a 
                  href={`https://wa.me/${property.whatsappNumber}?text=Hola, me interesa la propiedad: ${property.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-green-500 text-white py-4 rounded-xl text-xl font-bold hover:bg-green-600 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-green-500/30"
                >
                  <FaWhatsapp className="mr-3 text-3xl" />
                  {t('prop_contact_owner')}
                </a>
                
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <ContactForm propertyId={(property._id as unknown) as string} />
                </div>
              </div>
            </div>
          </div>

          {/* Location Map Section */}
          {(property.latitude && property.longitude) && (
            <section className="mt-0 bg-white border-t border-gray-200 py-12 px-4 md:px-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
                {t('prop_location_nearby')}
              </h2>
              <MapWrapper
                latitude={property.latitude}
                longitude={property.longitude}
                nearbyPlaces={property.nearbyPlaces}
              />
            </section>
          )}

          {/* Multimedia Section (Video & 360) */}
          {(property.video || property.view360) && (
            <div className="p-8 bg-slate-50 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">{t('prop_virtual_tour')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {property.video && (
                  <div>
                    <h3 className="flex items-center text-xl font-semibold mb-4 text-slate-700">
                      <FaVideo className="mr-2" /> {t('prop_video_title')}
                    </h3>
                    <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
                      {/* Simple check for YouTube embed or direct video */}
                      {property.video.includes('youtube') || property.video.includes('youtu.be') ? (
                         <iframe 
                           width="100%" 
                           height="100%" 
                           src={property.video.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')} 
                           title="YouTube video player" 
                           frameBorder="0" 
                           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                           allowFullScreen
                         ></iframe>
                      ) : (
                        <video controls className="w-full h-full">
                          <source src={property.video} type="video/mp4" />
                          Tu navegador no soporta el elemento de video.
                        </video>
                      )}
                    </div>
                  </div>
                )}

                {property.view360 && (
                  <div>
                    <h3 className="flex items-center text-xl font-semibold mb-4 text-slate-700">
                      <FaStreetView className="mr-2" /> {t('prop_360_title')}
                    </h3>
                    <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden shadow-lg border border-gray-300">
                       <iframe 
                          src={property.view360} 
                          width="100%" 
                          height="100%" 
                          className="w-full h-full"
                          title="360 View"
                       ></iframe>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
