// app/api/applications/route.ts
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

const DB_NAME = 'growbusinessDB';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const applications = await db
      .collection('applications')
      .find({})
      .sort({ appliedAt: -1 })
      .toArray();
    
    console.log(`Total applications found: ${applications.length}`);
    
    return NextResponse.json(applications);
  } catch (error) {
    console.error('GET Applications Error:', error);
    return NextResponse.json(
      { error: 'অ্যাপ্লিকেশন লোড করতে ব্যর্থ হয়েছে' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    
    const result = await db.collection('applications').insertOne({
      ...body,
      appliedAt: new Date(),
      status: 'pending'
    });
    
    const newApplication = { ...body, _id: result.insertedId };
    
    // Notification (non-blocking)
    fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'নতুন জব অ্যাপ্লিকেশন',
        message: `${body.fullName} ${body.vacancyTitle} পজিশনের জন্য আবেদন করেছেন`,
        type: 'application',
        link: `/admin/applications/${result.insertedId}`
      })
    }).catch(err => console.error('Notification error:', err));
    
    return NextResponse.json(newApplication, { status: 201 });
  } catch (error) {
    console.error('POST Application Error:', error);
    return NextResponse.json(
      { error: 'আবেদন জমা দিতে ব্যর্থ হয়েছে' },
      { status: 500 }
    );
  }
}