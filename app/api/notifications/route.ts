// app/api/notifications/route.ts
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';

let notifications: any[] = [
  {
    id: '1',
    title: 'স্বাগতম!',
    message: 'ড্যাশবোর্ডে আপনাকে স্বাগতম',
    type: 'system',
    read: false,
    createdAt: new Date().toISOString(),
    link: '/admin/dashboard'
  }
];

export async function GET() {
  return NextResponse.json(notifications);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newNotification = {
      id: Date.now().toString(),
      ...body,
      read: false,
      createdAt: new Date().toISOString()
    };
    
    notifications.unshift(newNotification);
    notifications = notifications.slice(0, 50);
    
    return NextResponse.json(newNotification, { status: 201 });
  } catch (error) {
    console.error('Create notification error:', error);
    return NextResponse.json(
      { error: 'Failed to create notification' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { notificationId, read } = await request.json();
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = read;
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update notification error:', error);
    return NextResponse.json(
      { error: 'Failed to update notification' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { markAllRead } = await request.json();
    if (markAllRead) {
      notifications = notifications.map(n => ({ ...n, read: true }));
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Mark all read error:', error);
    return NextResponse.json(
      { error: 'Failed to mark all as read' },
      { status: 500 }
    );
  }
}