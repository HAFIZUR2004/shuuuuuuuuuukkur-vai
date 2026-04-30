import mongoose, { Schema, models } from 'mongoose';

const TeamMemberSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  image: { type: String, required: true },
  order: { type: Number, default: 0 },
  social: {
    twitter: { type: String, default: '' },
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    instagram: { type: String, default: '' }
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export const TeamMember = models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);