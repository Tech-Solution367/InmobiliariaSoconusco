import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  const { id } = await params;

  try {
    const property = await Property.findById(id);
    if (!property) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 400 });
  }
}
