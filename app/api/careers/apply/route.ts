import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const DB_NAME = 'growbusinessDB';

export async function POST(request: Request) {
  try {
    let fullName, email, phone, experience, currentCompany, portfolio, linkedin, github, coverLetter, vacancyId, vacancyTitle;
    let resumeFile = null;
    
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      fullName = formData.get('fullName') as string;
      email = formData.get('email') as string;
      phone = formData.get('phone') as string;
      experience = formData.get('experience') as string;
      currentCompany = formData.get('currentCompany') as string;
      portfolio = formData.get('portfolio') as string;
      linkedin = formData.get('linkedin') as string;
      github = formData.get('github') as string;
      coverLetter = formData.get('coverLetter') as string;
      vacancyId = formData.get('vacancyId') as string;
      vacancyTitle = formData.get('vacancyTitle') as string;
      resumeFile = formData.get('resume') as File;
    } else {
      const body = await request.json();
      fullName = body.fullName;
      email = body.email;
      phone = body.phone;
      experience = body.experience;
      currentCompany = body.currentCompany;
      portfolio = body.portfolio;
      linkedin = body.linkedin;
      github = body.github;
      coverLetter = body.coverLetter;
      vacancyId = body.vacancyId;
      vacancyTitle = body.vacancyTitle;
    }

    if (!fullName || !email) {
      return NextResponse.json({ error: 'নাম এবং ইমেইল প্রয়োজন' }, { status: 400 });
    }

    let resumePath = '';
    
    if (resumeFile) {
      const bytes = await resumeFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'resumes');
      await mkdir(uploadDir, { recursive: true });
      
      const fileName = `${Date.now()}_${resumeFile.name.replace(/\s/g, '_')}`;
      resumePath = `/uploads/resumes/${fileName}`;
      
      await writeFile(path.join(uploadDir, fileName), buffer);
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const application = {
      fullName,
      email,
      phone: phone || '',
      experience: experience || '',
      currentCompany: currentCompany || '',
      portfolio: portfolio || '',
      linkedin: linkedin || '',
      github: github || '',
      coverLetter: coverLetter || '',
      vacancyId: vacancyId || '',
      vacancyTitle: vacancyTitle || 'Unknown Position',
      resumePath,
      status: 'pending',
      appliedAt: new Date(),
      read: false,
    };
    
    const result = await db.collection('applications').insertOne(application);
    
    return NextResponse.json({ 
      success: true, 
      message: 'আবেদন সফলভাবে জমা হয়েছে',
      id: result.insertedId 
    });
    
  } catch (error) {
    console.error('Application submit error:', error);
    return NextResponse.json({ error: 'আবেদন জমা দিতে ব্যর্থ হয়েছে: ' + (error as Error).message }, { status: 500 });
  }
}