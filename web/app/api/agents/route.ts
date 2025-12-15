import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Agent from '@/models/Agent';

export async function GET() {
  await dbConnect();
  try {
    const agents = await Agent.find({}).sort({ name: 1 });
    return NextResponse.json({ success: true, data: agents });
  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
