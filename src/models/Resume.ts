import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  cloudinaryUrl: string;
  cloudinaryPublicId: string;
  originalFilename: string;
  published: boolean;
  uploadedAt: Date;
}

const ResumeSchema: Schema = new Schema({
  cloudinaryUrl: { type: String, required: true },
  cloudinaryPublicId: { type: String, required: true },
  originalFilename: { type: String, required: true },
  published: { type: Boolean, default: false },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema);
