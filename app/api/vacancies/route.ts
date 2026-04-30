// app/api/vacancies/route.ts
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { IVacancy, validateVacancy, defaultVacancy } from '@/app/models/Vacancy';

// GET - সব ভ্যাকেন্সি
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio');
    const vacancies = await db.collection('vacancies').find({}).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json(vacancies);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'ভ্যাকেন্সি লোড করতে ব্যর্থ হয়েছে' }, 
      { status: 500 }
    );
  }
}

// POST - নতুন ভ্যাকেন্সি
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // ভ্যালিডেশন চেক
    const { isValid, errors } = validateVacancy(body);
    if (!isValid) {
      return NextResponse.json(
        { error: errors.join(', ') }, 
        { status: 400 }
      );
    }
    
    const client = await clientPromise;
    const db = client.db('portfolio');
    
    const newVacancy = {
      ...defaultVacancy,
      ...body,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const result = await db.collection('vacancies').insertOne(newVacancy);
    
    return NextResponse.json(
      { ...newVacancy, _id: result.insertedId }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: 'ভ্যাকেন্সি তৈরি করতে ব্যর্থ হয়েছে' }, 
      { status: 500 }
    );
  }
}