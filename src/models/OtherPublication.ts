import mongoose, { Schema, Document } from 'mongoose';

export interface IOtherPublication extends Document {
  title: string;
  publication: string;
  date: string;
  link: string;
  description: string;
}

const OtherPublicationSchema: Schema = new Schema({
  title: { type: String, required: true },
  publication: { type: String, required: true },
  date: { type: String, required: true },
  link: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.OtherPublication || mongoose.model<IOtherPublication>('OtherPublication', OtherPublicationSchema);
