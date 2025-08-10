import mongoose, { Schema, Document } from 'mongoose';

export interface ICertification extends Document {
  icon: string;
  title: string;
  category: string;
  date: string;
}

const CertificationSchema: Schema = new Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Certification || mongoose.model<ICertification>('Certification', CertificationSchema);
