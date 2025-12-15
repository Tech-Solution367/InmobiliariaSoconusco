import dbConnect from '@/lib/mongodb';
import Property, { IProperty } from '@/models/Property';
import PropertyCard from '@/components/PropertyCard';
import Navbar from '@/components/Navbar';
import PriceFilter from '@/components/PriceFilter';
import HeroVideo from '@/components/HeroVideo';

async function getProperties(searchParams: { [key: string]: string | string[] | undefined }) {
  await dbConnect();
  
  const query: any = { type: 'sale' };
  
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

export default async function VentasPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const properties = await getProperties(resolvedSearchParams);

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <HeroVideo 
        src="/videos/CasaDeVenta.mp4"
        title="Propiedades en Venta"
        subtitle="Explora nuestra selección exclusiva de propiedades disponibles para la venta en la región del Soconusco."
        muted={true}
      />

      <div className="container mx-auto p-4 mt-8">
        <PriceFilter />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={(property._id as unknown) as string} property={property} />
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center text-gray-500 mt-12 p-8 bg-white rounded-lg shadow">
            <p className="text-xl">No hay propiedades en venta disponibles con estos criterios.</p>
          </div>
        )}
      </div>
    </main>
  );
}
