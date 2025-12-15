import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  source: 'web' | 'whatsapp' | 'manual';
  status: 'nuevo' | 'en_proceso' | 'cerrado_ganado' | 'cerrado_perdido';
  property?: mongoose.Types.ObjectId;
  assignedAgent?: mongoose.Types.ObjectId;
  nextFollowUp?: Date;
  createdAt: Date;
}

const LeadSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  message: { type: String },
  source: { type: String, enum: ['web', 'whatsapp', 'manual'], default: 'web' },
  status: { type: String, enum: ['nuevo', 'en_proceso', 'cerrado_ganado', 'cerrado_perdido'], default: 'nuevo' },
  property: { type: Schema.Types.ObjectId, ref: 'Property' },
  assignedAgent: { type: Schema.Types.ObjectId, ref: 'Agent' },
  nextFollowUp: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);
export default Lead;
