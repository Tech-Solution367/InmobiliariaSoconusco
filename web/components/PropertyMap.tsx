'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { INearbyPlace } from '@/models/Property';
import { FaSchool, FaUniversity, FaStore, FaConciergeBell, FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';
import { useLanguage } from '@/context/LanguageContext';

interface PropertyMapProps {
  latitude: number;
  longitude: number;
  nearbyPlaces?: INearbyPlace[];
}

const PropertyMap = ({ latitude, longitude, nearbyPlaces = [] }: PropertyMapProps) => {
  const { t } = useLanguage();

  useEffect(() => {
    // Fix Leaflet icon issue in Next.js
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  // Group places by category
  const groupedPlaces = nearbyPlaces.reduce((acc, place) => {
    if (!acc[place.category]) {
      acc[place.category] = [];
    }
    acc[place.category].push(place);
    return acc;
  }, {} as Record<string, INearbyPlace[]>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'escuela': return <FaSchool className="text-blue-500" />;
      case 'banco': return <FaUniversity className="text-green-600" />;
      case 'plaza': return <FaStore className="text-purple-500" />;
      case 'servicio': return <FaConciergeBell className="text-orange-500" />;
      case 'negocio': return <FaBriefcase className="text-gray-600" />;
      default: return <FaMapMarkerAlt className="text-red-500" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Places List */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 h-[400px] overflow-y-auto custom-scrollbar">
        <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">{t('prop_nearby')}</h3>
        
        {Object.keys(groupedPlaces).length === 0 ? (
          <p className="text-gray-500 italic">{t('map_no_places')}</p>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedPlaces).map(([category, places]) => (
              <div key={category}>
                <h4 className="flex items-center gap-2 font-bold text-slate-700 mb-2">
                  {getCategoryIcon(category)}
                  {getCategoryLabel(category)}
                </h4>
                <ul className="space-y-2 pl-6 border-l-2 border-gray-100 ml-2">
                  {places.map((place, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      <span className="font-medium text-slate-800">{place.name}</span>
                      <div className="flex gap-3 text-xs text-gray-500 mt-0.5">
                        {place.distanceMeters && <span>{place.distanceMeters} {t('map_meters')}</span>}
                        {place.walkingMinutes && <span>~{place.walkingMinutes} min {t('map_walking')}</span>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="lg:col-span-2 h-[400px] rounded-lg overflow-hidden shadow-lg border border-gray-200 z-0 relative">
        <MapContainer 
          center={[latitude, longitude]} 
          zoom={15} 
          scrollWheelZoom={false} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              {t('prop_location')}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default PropertyMap;
