import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Agent from '@/models/Agent';

export async function GET() {
  await dbConnect();
  try {
    // Check if agent exists to avoid duplicates
    const existingAgent = await Agent.findOne({ email: 'agente.prueba@soconusco.com' });

    if (existingAgent) {
      return NextResponse.json({ 
        success: true, 
        message: 'El agente de prueba ya existe en la base de datos.', 
        data: existingAgent 
      });
    }

    // Create new test agent
    const newAgent = await Agent.create({
      name: 'Carlos Agente',
      email: 'agente.prueba@soconusco.com',
      phone: '9621234567',
      role: 'agent',
      photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80'
    });

    return NextResponse.json({ 
      success: true, 
      message: '¡Agente de prueba creado exitosamente!', 
      data: newAgent 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
