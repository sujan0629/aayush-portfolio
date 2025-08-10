import mongoose, { Schema, Document } from 'mongoose';

export interface ISurpriseImage extends Document {
  src: string;
  alt: string;
  hint: string;
  caption: string;
}

const SurpriseImageSchema: Schema = new Schema({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  hint: { type: String, required: true },
  caption: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.SurpriseImage || mongoose.model<ISurpriseImage>('SurpriseImage', SurpriseImageSchema);
