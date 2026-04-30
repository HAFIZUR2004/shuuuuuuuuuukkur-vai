import { ObjectId } from 'mongodb';

export interface IVacancy {
  _id?: ObjectId;
  id: string;
  tags: string[];
  title: string;
  desc: string;
  stack: string[];
  salary?: string;
  featured: boolean;
  color: string;
  department: string;
  createdAt: Date;
  updatedAt: Date;
}

// ভ্যালিডেশন ফাংশন
export const validateVacancy = (data: any) => {
  const errors: string[] = [];
  
  if (!data.title) errors.push('টাইটেল প্রয়োজন');
  if (!data.desc) errors.push('বর্ণনা প্রয়োজন');
  if (!data.tags || data.tags.length === 0) errors.push('ট্যাগ প্রয়োজন');
  if (!data.stack || data.stack.length === 0) errors.push('টেক স্ট্যাক প্রয়োজন');
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// ডিফল্ট ভ্যালু
export const defaultVacancy = {
  tags: [],
  title: '',
  desc: '',
  stack: [],
  salary: '',
  featured: false,
  color: '#6c5ce7',
  department: 'Engineering',
  createdAt: new Date(),
  updatedAt: new Date(),
};