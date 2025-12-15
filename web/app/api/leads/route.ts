import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';
import Property from '@/models/Property'; // Ensure Property model is registered
import Agent from '@/models/Agent'; // Ensure Agent model is registered

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const { name, propertyId } = body;

    if (!name || !propertyId) {
      return NextResponse.json({ success: false, error: 'Name and Property ID are required' }, { status: 400 });
    }

    const lead = await Lead.create({
      ...body,
      property: propertyId,
    });

    return NextResponse.json({ success: true, data: lead }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 400 });
  }
}

export async function GET() {
    await dbConnect();
    try {
        // Ensure models are compiled
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _p = Property;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _a = Agent;

        const leads = await Lead.find({})
            .populate('property', 'title')
            .populate('assignedAgent', 'name')
            .sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: leads });
    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
}
