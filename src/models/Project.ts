import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  hint: string;
  tags: string[];
  links: {
    github?: string;
    report?: string;
  };
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  image: { type: String, required: true },
  hint: { type: String, required: true },
  tags: { type: [String], required: true },
  links: {
    github: { type: String },
    report: { type: String },
  },
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
