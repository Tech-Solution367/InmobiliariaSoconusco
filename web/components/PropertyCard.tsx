import Link from 'next/link';
import { IProperty } from '@/models/Property';
import { FaMapMarkerAlt, FaTag } from 'react-icons/fa';

interface PropertyCardProps {
  property: IProperty;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-white">
      <div className="h-48 bg-gray-200 relative">
        {property.images && property.images.length > 0 ? (
          <img 
            src={property.images[0]} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">No Image</div>
        )}
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-sm font-bold uppercase">
          {property.type === 'sale' ? 'Venta' : 'Renta'}
        </div>
        
        {/* Sold/Rented Overlay */}
        {(property.status === 'sold' || property.status === 'rented') && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10">
            <div className="bg-red-600 text-white px-6 py-2 rounded-full text-xl font-bold transform -rotate-12 border-4 border-white shadow-lg">
              {property.status === 'sold' ? 'VENDIDA' : 'RENTADA'}
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 truncate">{property.title}</h3>
        <div className="flex items-center text-gray-600 mb-2">
          <FaMapMarkerAlt className="mr-1" />
          <span className="truncate">{property.location}</span>
        </div>
        <div className="flex items-center text-green-600 font-bold text-lg mb-4">
          <FaTag className="mr-1" />
          <span>${property.price.toLocaleString()}</span>
        </div>
        <Link 
          href={`/properties/${property._id}`} 
          className="block w-full text-center bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition-colors"
        >
          Ver Detalles
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
