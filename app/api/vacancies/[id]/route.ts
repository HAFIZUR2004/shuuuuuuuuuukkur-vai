// app/api/vacancies/[id]/route.ts
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import clientPromise from '@/lib/mongodb';

const DB_NAME = 'growbusinessDB';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { id } = await context.params;
    
    let vacancy = null;
    
    if (ObjectId.isValid(id)) {
      vacancy = await db.collection('vacancies').findOne({ _id: new ObjectId(id) });
    }
    
    if (!vacancy) {
      vacancy = await db.collection('vacancies').findOne({ id: id });
    }
    
    if (!vacancy) {
      return NextResponse.json(
        { error: 'Vacancy not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(vacancy);
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vacancy' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { id } = await context.params;
    const body = await request.json();
    
    const updateData = {
      title: body.title,
      desc: body.desc,
      tags: body.tags,
      stack: body.stack,
      salary: body.salary,
      featured: body.featured,
      color: body.color,
      department: body.department,
      updatedAt: new Date(),
    };
    
    let result;
    if (ObjectId.isValid(id)) {
      result = await db.collection('vacancies').updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
    } else {
      result = await db.collection('vacancies').updateOne(
        { id: id },
        { $set: updateData }
      );
    }
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Vacancy not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json(
      { error: 'Failed to update vacancy' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const { id } = await context.params;
    
    let result;
    if (ObjectId.isValid(id)) {
      result = await db.collection('vacancies').deleteOne({ _id: new ObjectId(id) });
    } else {
      result = await db.collection('vacancies').deleteOne({ id: id });
    }
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Vacancy not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete vacancy' },
      { status: 500 }
    );
  }
}