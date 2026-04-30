import { NextRequest, NextResponse } from 'next/server';
import { TeamMember } from '@/app/models/TeamMember';
import { dbConnect } from '@/lib/dbConnect';

// GET all team members
export async function GET() {
  try {
    await dbConnect();
    const members = await TeamMember.find({ isActive: true }).sort({ order: 1 });
    return NextResponse.json({ success: true, data: members });
  } catch (error) {
    console.error('Error fetching team:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch team' }, { status: 500 });
  }
}

// POST new team member
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const member = await TeamMember.create(body);
    return NextResponse.json({ success: true, data: member }, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json({ success: false, error: 'Failed to create team member' }, { status: 500 });
  }
}

// PUT update team member
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { id, ...data } = await req.json();
    const updated = await TeamMember.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json({ success: false, error: 'Failed to update team member' }, { status: 500 });
  }
}

// DELETE team member
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    }
    
    await TeamMember.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete team member' }, { status: 500 });
  }
}