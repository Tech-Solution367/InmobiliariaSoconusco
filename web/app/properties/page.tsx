import dbConnect from '@/lib/mongodb';
import Property, { IProperty } from '@/models/Property';
import PropertyCard from '@/components/PropertyCard';
import Navbar from '@/components/Navbar';

export const dynamic = 'force-dynamic';

async function getProperties() {
  await dbConnect();
  const properties = await Property.find({}).sort({ createdAt: -1 }).lean();
  
  return properties.map((p: any) => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt.toISOString(),
  })) as IProperty[];
}

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Todas las Propiedades
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Explora nuestro catálogo completo de propiedades disponibles.
          </p>
        </div>

        {properties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay propiedades disponibles en este momento.</p>
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
