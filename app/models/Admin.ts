import mongoose, { Schema, model, models } from 'mongoose';

const AdminSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    default: 'hafiz_admin' // আপনার ডিফল্ট ইউজারনেম
  },
  password: {
    type: String,
    required: true,
  }
}, { timestamps: true });

// যদি মডেলটি আগে থেকে তৈরি করা থাকে তবে সেটি ব্যবহার করবে, নয়তো নতুন তৈরি করবে
const Admin = models.Admin || model('Admin', AdminSchema);

export default Admin;