import mongoose, { Schema, Document } from 'mongoose';

export interface ILicensure extends Document {
  title: string;
  category: string;
  idNumber: string;
  description: string;
}

const LicensureSchema: Schema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    idNumber: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Licensure || mongoose.model<ILicensure>('Licensure', LicensureSchema);
