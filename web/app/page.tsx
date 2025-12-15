import dbConnect from '@/lib/mongodb';
import Property, { IProperty } from '@/models/Property';
import PropertyCard from '@/components/PropertyCard';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

async function getProperties() {
  await dbConnect();
  const properties = await Property.find({}).sort({ createdAt: -1 }).limit(6).lean();
  // Convert _id and dates to string to avoid serialization issues
  return properties.map((p: any) => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt.toISOString(),
  })) as IProperty[];
}

export default async function Home() {
  const properties = await getProperties();

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[500px] bg-slate-900 flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-6 drop-shadow-lg animate-fade-in-up">
            Inmobiliaria Soconusco
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-md animate-fade-in-up delay-200">
            Encuentra tu hogar ideal o la mejor inversión en el corazón del Soconusco.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in-up delay-500">
            <Link href="/ventas" className="bg-yellow-500 text-slate-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-400 transition-colors shadow-lg">
              Ver Propiedades en Venta
            </Link>
            <Link href="/rentas" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-slate-900 transition-colors shadow-lg">
              Ver Propiedades en Renta
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 py-16">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Propiedades Destacadas</h2>
            <div className="h-1 w-20 bg-yellow-500"></div>
          </div>
          <Link href="/ventas" className="text-blue-600 font-semibold hover:text-blue-800 hidden md:block">
            Ver todas las propiedades &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={(property._id as unknown) as string} property={property} />
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center text-gray-500 mt-12 p-12 bg-white rounded-lg shadow-sm border border-gray-100">
            <p className="text-xl">No hay propiedades disponibles en este momento.</p>
            <p className="mt-2">¡Sé el primero en publicar!</p>
            <Link href="/contact" className="inline-block mt-4 text-blue-600 font-bold hover:underline">Contáctanos para publicar</Link>
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Link href="/ventas" className="text-blue-600 font-bold hover:text-blue-800">
            Ver todas las propiedades &rarr;
          </Link>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Quieres vender o rentar tu propiedad?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a nuestra red y llega a miles de clientes potenciales. Nosotros nos encargamos de mostrar tu inmueble de la mejor manera.
          </p>
          <Link href="/contact" className="inline-block bg-green-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-600 transition-colors shadow-lg">
            Contactar Ahora
          </Link>
        </div>
      </div>
    </main>
  );
}
