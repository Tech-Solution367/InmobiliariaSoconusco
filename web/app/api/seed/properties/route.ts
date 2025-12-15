import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';

export async function GET() {
  await dbConnect();
  try {
    // Check if properties exist
    const count = await Property.countDocuments();
    if (count > 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'Ya existen propiedades en la base de datos.', 
        count 
      });
    }

    const dummyImages = Array(15).fill('https://placehold.co/600x400');

    const properties = [
      {
        title: 'Casa Moderna en el Centro',
        description: 'Hermosa casa con acabados de lujo, cerca de todo.',
        price: 2500000,
        location: 'Centro, Tapachula',
        latitude: 14.9044,
        longitude: -92.2609,
        images: dummyImages,
        type: 'sale',
        whatsappNumber: '9621234567',
        nearbyPlaces: [
          { category: 'escuela', name: 'Escuela Primaria Benito Juarez', distanceMeters: 500, walkingMinutes: 5 },
          { category: 'banco', name: 'Banamex', distanceMeters: 200, walkingMinutes: 2 }
        ]
      },
      {
        title: 'Departamento en Renta',
        description: 'Cómodo departamento ideal para estudiantes o parejas.',
        price: 5000,
        location: 'Zona Norte, Tapachula',
        latitude: 14.9200,
        longitude: -92.2500,
        images: dummyImages,
        type: 'rent',
        whatsappNumber: '9621234567',
        nearbyPlaces: [
          { category: 'plaza', name: 'Plaza Crystal', distanceMeters: 1000, walkingMinutes: 15 }
        ]
      },
      {
        title: 'Terreno Comercial',
        description: 'Excelente oportunidad de inversión en zona de alto flujo.',
        price: 1500000,
        location: 'Libramiento Sur, Tapachula',
        latitude: 14.8900,
        longitude: -92.2700,
        images: dummyImages,
        type: 'sale',
        whatsappNumber: '9621234567',
        nearbyPlaces: []
      }
    ];

    await Property.insertMany(properties);

    return NextResponse.json({ 
      success: true, 
      message: '¡Propiedades de prueba creadas exitosamente!', 
      count: properties.length 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ success: false, error: error }, { status: 500 });
  }
}
