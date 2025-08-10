import mongoose, { Schema, Document } from 'mongoose';

export interface IVisitor extends Document {
  country: string;
  count: number;
}

const VisitorSchema: Schema = new Schema({
  country: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
}, { timestamps: true });


export default mongoose.models.Visitor || mongoose.model<IVisitor>('Visitor', VisitorSchema);