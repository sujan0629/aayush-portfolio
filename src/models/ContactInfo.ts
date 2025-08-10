import mongoose, { Schema, Document } from 'mongoose';

export interface IContactInfo extends Document {
  location: string;
  email: string;
  linkedin: string;
}

const ContactInfoSchema: Schema = new Schema({
  location: { type: String, required: true },
  email: { type: String, required: true },
  linkedin: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.ContactInfo || mongoose.model<IContactInfo>('ContactInfo', ContactInfoSchema);
