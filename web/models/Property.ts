import mongoose from 'mongoose';

export interface INearbyPlace {
  category: 'escuela' | 'banco' | 'plaza' | 'servicio' | 'negocio' | 'otro';
  name: string;
  distanceMeters?: number;
  walkingMinutes?: number;
}

export interface IProperty extends mongoose.Document {
  title: string;
  description: string;
  price: number;
  location: string;
  latitude: number;
  longitude: number;
  bedrooms?: number;
  bathrooms?: number;
  constructionSize?: number;
  lotSize?: number;
  images: string[];
  video?: string;
  view360?: string;
  type: 'sale' | 'rent';
  status: 'available' | 'sold' | 'rented';
  whatsappNumber: string;
  nearbyPlaces?: INearbyPlace[];
  createdAt: Date;
}

const NearbyPlaceSchema = new mongoose.Schema<INearbyPlace>({
  category: {
    type: String,
    enum: ['escuela', 'banco', 'plaza', 'servicio', 'negocio', 'otro'],
    required: true,
  },
  name: { type: String, required: true },
  distanceMeters: { type: Number },
  walkingMinutes: { type: Number },
}, { _id: false });

const PropertySchema = new mongoose.Schema<IProperty>({
  title: {
    type: String,
    required: [true, 'Please provide a title for this property.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this property.'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price for this property.'],
  },
  location: {
    type: String,
    required: [true, 'Please provide a location for this property.'],
  },
  latitude: {
    type: Number,
    required: [true, 'Please provide latitude.'],
  },
  longitude: {
    type: Number,
    required: [true, 'Please provide longitude.'],
  },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  constructionSize: { type: Number },
  lotSize: { type: Number },
  images: {
    type: [String],
    validate: [arrayLimit, '{PATH} debe tener entre 15 y 20 imágenes.'],
  },
  video: {
    type: String,
    required: false,
  },
  view360: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    enum: ['sale', 'rent'],
    required: [true, 'Please specify if for sale or rent.'],
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'rented'],
    default: 'available',
  },
  whatsappNumber: {
    type: String,
    default: '521234567890', // Default placeholder
  },
  nearbyPlaces: {
    type: [NearbyPlaceSchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

function arrayLimit(val: string[]) {
  return val.length >= 15 && val.length <= 20;
}

export default mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);
