'use client';

import dynamic from 'next/dynamic';
import { INearbyPlace } from '@/models/Property';

const PropertyMap = dynamic(() => import('./PropertyMap'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg flex items-center justify-center text-gray-400">Cargando mapa...</div>
});

interface MapWrapperProps {
  latitude: number;
  longitude: number;
  nearbyPlaces?: INearbyPlace[];
}

export default function MapWrapper(props: MapWrapperProps) {
  return <PropertyMap {...props} />;
}
