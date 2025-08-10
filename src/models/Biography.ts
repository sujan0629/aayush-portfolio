import mongoose, { Schema, Document } from 'mongoose';

export interface IBiography extends Document {
  content: string;
}

const BiographySchema: Schema = new Schema({
  content: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Biography || mongoose.model<IBiography>('Biography', BiographySchema);
