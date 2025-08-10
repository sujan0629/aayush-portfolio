import mongoose, { Schema, Document } from 'mongoose';

export interface ILiterature extends Document {
  title: string;
  author: string;
  description: string;
  image: string;
  hint: string;
}

const LiteratureSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  hint: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Literature || mongoose.model<ILiterature>('Literature', LiteratureSchema);
