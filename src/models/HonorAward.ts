import mongoose, { Schema, Document } from 'mongoose';

export interface IHonorAward extends Document {
  icon: string;
  title: string;
  issuer: string;
  year: string;
}

const HonorAwardSchema: Schema = new Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  year: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.HonorAward || mongoose.model<IHonorAward>('HonorAward', HonorAwardSchema);
