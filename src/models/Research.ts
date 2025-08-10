import mongoose, { Schema, Document } from 'mongoose';

export interface IResearch extends Document {
  title: string;
  authors: string;
  status: 'Published' | 'Under Review' | 'In Progress';
  journal: string;
  abstract: string;
  link?: string;
}

const ResearchSchema: Schema = new Schema({
  title: { type: String, required: true },
  authors: { type: String, required: true },
  status: { type: String, required: true, enum: ['Published', 'Under Review', 'In Progress'] },
  journal: { type: String, required: true },
  abstract: { type: String, required: true },
  link: { type: String, required: false },
}, { timestamps: true });

export default mongoose.models.Research || mongoose.model<IResearch>('Research', ResearchSchema);
