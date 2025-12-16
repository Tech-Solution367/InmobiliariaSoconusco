import dbConnect from '@/lib/mongodb';
import Property, { IProperty } from '@/models/Property';
import PropertiesView from '@/components/PropertiesView';

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

  return <PropertiesView properties={properties} />;
}
