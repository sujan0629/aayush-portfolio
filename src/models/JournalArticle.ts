import mongoose, { Schema, Document } from 'mongoose';

export interface IJournalArticle extends Document {
  title: string;
  journal: string;
  date: string;
  link: string;
  summary: string;
  image: string;
  hint: string;
}

const JournalArticleSchema: Schema = new Schema({
  title: { type: String, required: true },
  journal: { type: String, required: true },
  date: { type: String, required: true },
  link: { type: String, required: true },
  summary: { type: String, required: true },
  image: { type: String, required: true },
  hint: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.JournalArticle || mongoose.model<IJournalArticle>('JournalArticle', JournalArticleSchema);
