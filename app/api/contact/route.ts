import { NextRequest, NextResponse } from 'next/server';
import { Contact } from '@/app/models/Contact';
import { dbConnect } from '@/lib/dbConnect';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { name, email, message } = await req.json();
    
    const newContact = await Contact.create({
      name,
      email,
      message,
      status: 'unread'
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully',
      data: newContact 
    }, { status: 201 });
    
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to send message' 
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch messages' 
    }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { id, status } = await req.json();
    
    const updated = await Contact.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );
    
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update status' 
    }, { status: 500 });
  }
}