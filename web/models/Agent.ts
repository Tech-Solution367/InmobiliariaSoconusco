import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAgent extends Document {
  name: string;
  email: string;
  phone?: string;
  photoUrl?: string;
  role: 'admin' | 'agent';
  createdAt: Date;
}

const AgentSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  photoUrl: { type: String },
  role: { type: String, enum: ['admin', 'agent'], default: 'agent' },
  createdAt: { type: Date, default: Date.now },
});

const Agent: Model<IAgent> = mongoose.models.Agent || mongoose.model<IAgent>('Agent', AgentSchema);
export default Agent;
