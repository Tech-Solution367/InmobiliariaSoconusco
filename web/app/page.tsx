import dbConnect from '@/lib/mongodb';
import Property, { IProperty } from '@/models/Property';
import PropertyCard from '@/components/PropertyCard';
import Navbar from '@/components/Navbar';
import StatsSection from '@/components/StatsSection';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

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
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Section with Parallax Effect */}
      <div className="relative min-h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/50 to-slate-50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto py-20 md:py-0">
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl animate-fade-in-up font-display tracking-tight leading-tight">
            Encuentra tu <span className="text-amber-500">Hogar Ideal</span> en el Soconusco
          </h1>
          <p className="text-lg md:text-2xl text-slate-200 mb-10 max-w-3xl mx-auto drop-shadow-md animate-fade-in-up delay-200 font-light leading-relaxed">
            Descubre las mejores propiedades en venta y renta. Tu próxima inversión comienza aquí.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-500">
            <Link href="/ventas" className="bg-amber-500 text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-400 transition-all hover:scale-105 shadow-xl hover:shadow-amber-500/20 flex items-center justify-center gap-2 group">
              Ver Propiedades
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-slate-900 transition-all hover:scale-105 shadow-xl flex items-center justify-center">
              Contáctanos
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <StatsSection />

      {/* Featured Properties */}
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-amber-600 font-bold tracking-wider uppercase text-sm mb-2 block">Oportunidades Exclusivas</span>
            <h2 className="text-4xl font-bold text-slate-900 mb-4 font-display">Propiedades Destacadas</h2>
            <div className="h-1.5 w-24 bg-amber-500 rounded-full"></div>
          </div>
          <Link href="/ventas" className="text-slate-600 font-semibold hover:text-amber-600 transition-colors flex items-center gap-2 group">
            Ver todas las propiedades 
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={(property._id as unknown) as string} property={property} />
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center text-slate-500 mt-12 p-16 bg-white rounded-2xl shadow-sm border border-slate-100">
            <p className="text-2xl font-light mb-4">No hay propiedades destacadas en este momento.</p>
            <Link href="/contact" className="inline-block mt-4 text-amber-600 font-bold hover:text-amber-700 underline decoration-2 underline-offset-4">
              ¡Contáctanos para publicar la tuya!
            </Link>
          </div>
        )}

        <div className="mt-16 text-center md:hidden">
          <Link href="/ventas" className="inline-block bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
            Ver Catálogo Completo
          </Link>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">¿Listo para vender o rentar?</h2>
          <p className="text-slate-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            Únete a nuestra red exclusiva y llega a miles de clientes potenciales. Nosotros nos encargamos de mostrar tu inmueble con la calidad que merece.
          </p>
          <Link href="/contact" className="inline-block bg-green-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-all hover:scale-105 shadow-lg hover:shadow-green-500/20">
            Publicar mi Propiedad
          </Link>
        </div>
      </div>
    </main>
  );
}
