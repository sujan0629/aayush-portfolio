import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  hint: string;
  date: string;
  tags: string[];
}

const BlogPostSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String, required: true },
  hint: { type: String, required: true },
  date: { type: String, required: true },
  tags: { type: [String], required: true },
}, { timestamps: true });

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
