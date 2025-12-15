import Link from 'next/link';
import { IProperty } from '@/models/Property';
import { FaMapMarkerAlt, FaTag, FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';

interface PropertyCardProps {
  property: IProperty;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="group border border-slate-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white hover:-translate-y-2 flex flex-col h-full">
      <div className="h-64 bg-gray-200 relative overflow-hidden">
        {property.images && property.images.length > 0 ? (
          <img 
            src={property.images[0]} 
            alt={property.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 bg-slate-100">
            <span className="text-sm font-medium">Sin Imagen</span>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase shadow-sm backdrop-blur-md ${
            property.type === 'sale' 
              ? 'bg-blue-600/90 text-white' 
              : 'bg-amber-500/90 text-slate-900'
          }`}>
            {property.type === 'sale' ? 'Venta' : 'Renta'}
          </div>
        </div>
        
        {/* Sold/Rented Overlay */}
        {(property.status === 'sold' || property.status === 'rented') && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="bg-red-600 text-white px-8 py-3 rounded-full text-xl font-bold transform -rotate-12 border-4 border-white shadow-2xl">
              {property.status === 'sold' ? 'VENDIDA' : 'RENTADA'}
            </div>
          </div>
        )}

        {/* Price Tag Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
          <div className="text-white font-bold text-2xl font-display">
            ${property.price.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 text-slate-800 line-clamp-1 group-hover:text-amber-600 transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center text-slate-500 mb-4 text-sm">
          <FaMapMarkerAlt className="mr-1.5 text-amber-500 shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-3 gap-2 mb-6 py-4 border-t border-b border-slate-100">
          <div className="flex flex-col items-center justify-center text-center">
            <FaBed className="text-slate-400 mb-1" />
            <span className="text-xs font-semibold text-slate-600">{property.bedrooms || 3} Hab</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center border-l border-r border-slate-100">
            <FaBath className="text-slate-400 mb-1" />
            <span className="text-xs font-semibold text-slate-600">{property.bathrooms || 2} Baños</span>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <FaRulerCombined className="text-slate-400 mb-1" />
            <span className="text-xs font-semibold text-slate-600">{property.constructionSize || 120} m²</span>
          </div>
        </div>

        <div className="mt-auto">
          <Link 
            href={`/properties/${property._id}`} 
            className="block w-full text-center bg-slate-900 text-white py-3 rounded-xl font-semibold hover:bg-amber-500 hover:text-slate-900 transition-all shadow-md hover:shadow-lg group-hover:translate-y-0"
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
