import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const DB_NAME = 'growbusinessDB';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    // প্রথমে পুরাতন ডাটা ডিলিট করুন
    await db.collection('applications').deleteMany({});
    
    // নতুন ডাটা যোগ করুন
    const sampleApplications = [
     
      {
        _id: new ObjectId(),
        fullName: "করিম আহমেদ",
        email: "karim@example.com",
        phone: "+880 1812345678",
        experience: "3-5 বছর",
        currentCompany: "Tech Hub",
        portfolio: "https://karim.com",
        linkedin: "https://linkedin.com/in/karim",
        github: "https://github.com/karim",
        coverLetter: "আমি UI/UX ডিজাইনে বিশেষজ্ঞ। আমি ফিগমা এবং অ্যাডোব এক্সডি ব্যবহার করি।",
        vacancyId: "vac_002",
        vacancyTitle: "UI/UX ডিজাইনার",
        resumePath: "",
        status: "reviewed",
        appliedAt: new Date(),
        read: false
      },
      {
        _id: new ObjectId(),
        fullName: "ফাতেমা খাতুন",
        email: "fatema@example.com",
        phone: "+880 1912345678",
        experience: "1-3 বছর",
        currentCompany: "Startup Inc",
        portfolio: "https://fatema.com",
        linkedin: "https://linkedin.com/in/fatema",
        github: "https://github.com/fatema",
        coverLetter: "আমি নতুন ডেভেলপার কিন্তু শেখার আগ্রহ অনেক। আমি দ্রুত শিখতে পারি।",
        vacancyId: "vac_001",
        vacancyTitle: "জুনিয়র ডেভেলপার",
        resumePath: "",
        status: "pending",
        appliedAt: new Date(),
        read: false
      }
    ];
    
    const result = await db.collection('applications').insertMany(sampleApplications);
    
    return NextResponse.json({ 
      success: true, 
      message: `${result.insertedCount} টি স্যাম্পল অ্যাপ্লিকেশন যোগ হয়েছে`,
      applications: sampleApplications.map(app => ({
        _id: app._id.toString(),
        name: app.fullName,
        vacancy: app.vacancyTitle
      }))
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Failed to seed applications' }, { status: 500 });
  }
}