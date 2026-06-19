import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDatabase } from '@/lib/mongodb';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const db = await getDatabase();
    const { id } = await context.params;

    let application = null;

    if (ObjectId.isValid(id)) {
      application = await db.collection('applications').findOne({
        _id: new ObjectId(id)
      });
    }

    if (!application) {
      application = await db.collection('applications').findOne({
        id: id
      });
    }

    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error('GET Application Error:', error);
    return NextResponse.json(
      { error: 'Failed to load application' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const db = await getDatabase();
    const { id } = await context.params;
    const { status } = await request.json();

    let result = null;

    if (ObjectId.isValid(id)) {
      result = await db.collection('applications').updateOne(
        { _id: new ObjectId(id) },
        { $set: { status, updatedAt: new Date() } }
      );
    } else {
      result = await db.collection('applications').updateOne(
        { id: id },
        { $set: { status, updatedAt: new Date() } }
      );
    }

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error('PUT Application Error:', error);
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    );
  }
}
