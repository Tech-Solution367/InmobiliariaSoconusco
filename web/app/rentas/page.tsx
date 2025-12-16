import dbConnect from '@/lib/mongodb';
import Property, { IProperty } from '@/models/Property';
import PropertyCard from '@/components/PropertyCard';
import Navbar from '@/components/Navbar';
import PriceFilter from '@/components/PriceFilter';
import HeroVideo from '@/components/HeroVideo';

async function getProperties(searchParams: { [key: string]: string | string[] | undefined }) {
  await dbConnect();
  
  const query: any = { type: 'rent' };
  
  if (searchParams.minPrice) {
    query.price = { ...query.price, $gte: Number(searchParams.minPrice) };
  }
  
  if (searchParams.maxPrice) {
    query.price = { ...query.price, $lte: Number(searchParams.maxPrice) };
  }

  const properties = await Property.find(query).sort({ createdAt: -1 }).lean();
  return properties.map((p: any) => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt.toISOString(),
  })) as IProperty[];
}

export default async function RentasPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const properties = await getProperties(resolvedSearchParams);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="relative">
        <HeroVideo 
          src="/videos/CasaEnRenta.mp4"
          title="Propiedades en Renta"
          subtitle="Encuentra el lugar perfecto para vivir o establecer tu negocio con nuestras opciones de renta."
          muted={true}
        />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10 mb-20">
        <PriceFilter />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={(property._id as unknown) as string} property={property} />
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center text-slate-500 mt-12 p-16 bg-white rounded-2xl shadow-sm border border-slate-100">
            <div className="text-6xl mb-4">🔑</div>
            <p className="text-2xl font-light mb-2">No encontramos propiedades en renta con esos criterios.</p>
            <p className="text-slate-400">Intenta ajustar los filtros de búsqueda.</p>
          </div>
        )}
      </div>
    </main>
  );
}
