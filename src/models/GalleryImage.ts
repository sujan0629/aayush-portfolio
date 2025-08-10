import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryImage extends Document {
  src: string;
  alt: string;
  hint: string;
  caption: string;
}

const GalleryImageSchema: Schema = new Schema({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  hint: { type: String, required: true },
  caption: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.GalleryImage || mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);
