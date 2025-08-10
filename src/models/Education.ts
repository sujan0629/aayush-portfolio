import mongoose, { Schema, Document } from 'mongoose';

export interface IEducation extends Document {
  degree: string;
  institution: string;
  dateRange: string;
  affiliation: string;
}

const EducationSchema: Schema = new Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  dateRange: { type: String, required: true },
  affiliation: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Education || mongoose.model<IEducation>('Education', EducationSchema);
