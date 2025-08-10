import mongoose, { Schema, Document } from 'mongoose';

export interface ITimelineEvent extends Document {
  icon: 'Briefcase' | 'GraduationCap';
  date: string;
  title: string;
  description: string;
  side: 'left' | 'right';
}

const TimelineEventSchema: Schema = new Schema({
  icon: { type: String, required: true, enum: ['Briefcase', 'GraduationCap'] },
  date: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  side: { type: String, required: true, enum: ['left', 'right'] },
}, { timestamps: true });

export default mongoose.models.TimelineEvent || mongoose.model<ITimelineEvent>('TimelineEvent', TimelineEventSchema);
