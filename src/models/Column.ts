import mongoose, { Schema, Document } from 'mongoose';

export interface IColumn extends Document {
  title: string;
  outlet: string;
  date: string;
  link: string;
  summary: string;
}

const ColumnSchema: Schema = new Schema({
  title: { type: String, required: true },
  outlet: { type: String, required: true },
  date: { type: String, required: true },
  link: { type: String, required: true },
  summary: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Column || mongoose.model<IColumn>('Column', ColumnSchema);
