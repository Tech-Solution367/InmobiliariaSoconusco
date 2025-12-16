import dbConnect from '@/lib/mongodb';
import Property, { IProperty } from '@/models/Property';
import { notFound } from 'next/navigation';
import PropertyDetailView from '@/components/PropertyDetailView';

async function getProperty(id: string) {
  await dbConnect();
  try {
    const property = await Property.findById(id).lean();
    if (!property) return null;
    return {
      ...property,
      _id: property._id.toString(),
      createdAt: property.createdAt.toISOString(),
      nearbyPlaces: property.nearbyPlaces ? JSON.parse(JSON.stringify(property.nearbyPlaces)) : [],
    } as IProperty;
  } catch (error) {
    return null;
  }
}

export default async function PropertyDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    notFound();
  }

  return <PropertyDetailView property={property} />;
}
