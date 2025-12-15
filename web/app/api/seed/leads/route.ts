import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Lead from '@/models/Lead';
import Property from '@/models/Property';
import Agent from '@/models/Agent';

export async function GET() {
  await dbConnect();
  try {
    // Check if leads exist
    const count = await Lead.countDocuments();
    if (count > 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'Ya existen leads en la base de datos.', 
        count 
      });
    }

    // Find a property and an agent
    const property = await Property.findOne();
    const agent = await Agent.findOne({ email: 'agente.prueba@soconusco.com' });

    if (!property) {
      return NextResponse.json({ 
        success: false, 
        message: 'No se encontraron propiedades. Ejecuta primero el seed de propiedades.' 
      }, { status: 404 });
    }

    const leads = [
      {
        name: 'Juan Perez',
        email: 'juan@example.com',
        phone: '9621112233',
        message: 'Me interesa la casa en el centro.',
        source: 'web',
        status: 'nuevo',
        property: property._id,
        assignedAgent: agent ? agent._id : undefined
      },
      {
        name: 'Maria Lopez',
        email: 'maria@example.com',
        phone: '9624445566',
        message: 'Quiero ver el departamento.',
        source: 'whatsapp',
        status: 'en_proceso',
        property: property._id,
        assignedAgent: agent ? agent._id : undefined
      },
      {
        name: 'Pedro Ramirez',
        email: 'pedro@example.com',
        phone: '9627778899',
        message: 'Información del terreno.',
        source: 'manual',
        status: 'nuevo',
        property: property._id
        // No agent assigned
      }
    ];

    await Lead.insertMany(leads);

    return NextResponse.json({ 
      success: true, 
      message: '¡Leads de prueba creados exitosamente!', 
      count: leads.length 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
