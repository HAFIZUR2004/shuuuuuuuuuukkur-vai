import mongoose, { Schema, models } from 'mongoose';

const TestimonialSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  company: { type: String, required: true },
  icon: { type: String, default: '👨‍💼' },
  image: { type: String, default: '' }, 
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

export const Testimonial = models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);