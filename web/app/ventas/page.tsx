import dbConnect from '@/lib/mongodb';
import Property, { IProperty } from '@/models/Property';
import VentasView from '@/components/VentasView';

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

  return <VentasView properties={properties} />;
}
