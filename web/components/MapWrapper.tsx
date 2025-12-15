'use client';

import dynamic from 'next/dynamic';
import { INearbyPlace } from '@/models/Property';

const PropertyMap = dynamic(() => import('./PropertyMap'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Cargando mapa...</div>
});

interface MapWrapperProps {
  latitude?: number;
  longitude?: number;
  nearbyPlaces?: INearbyPlace[];
}

export default function MapWrapper({ 
  latitude = 14.9056, 
  longitude = -92.2633, 
  nearbyPlaces = [] 
}: MapWrapperProps) {
  return <PropertyMap latitude={latitude} longitude={longitude} nearbyPlaces={nearbyPlaces} />;
}
