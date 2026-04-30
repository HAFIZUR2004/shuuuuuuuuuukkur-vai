import { NextRequest, NextResponse } from 'next/server';
import { Testimonial } from '@/app/models/Testimonial';
import { dbConnect } from '@/lib/dbConnect';

// GET all testimonials (সব দেখাবে - ম্যানেজমেন্ট প্যানেলের জন্য)
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    
    // URL থেকে isAdmin প্যারামিটার চেক করুন
    const { searchParams } = new URL(req.url);
    const isAdmin = searchParams.get('admin') === 'true';
    
    let testimonials;
    if (isAdmin) {
      // ম্যানেজমেন্ট প্যানেলের জন্য সব দেখাবে
      testimonials = await Testimonial.find({}).sort({ order: 1, createdAt: -1 });
    } else {
      // ফ্রন্টএন্ডের জন্য শুধু active দেখাবে
      testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1 });
    }
    
    console.log(`📦 Found ${testimonials.length} testimonials`); // ডিবাগ
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

// POST new testimonial (ইমেজ সহ)
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    
    console.log('📥 Received POST data:', {
      name: body.name,
      hasImage: !!body.image,
      imageLength: body.image?.length || 0
    }); // ডিবাগ
    
    // ইমেজ ভ্যালিডেশন (অপশনাল)
    if (body.image && body.image.length > 10 * 1024 * 1024) {
      return NextResponse.json({ 
        success: false, 
        error: 'Image too large (max 10MB)' 
      }, { status: 400 });
    }
    
    const testimonial = await Testimonial.create({
      name: body.name,
      role: body.role,
      comment: body.comment,
      rating: body.rating || 5,
      company: body.company,
      icon: body.icon || '👨‍💼',
      image: body.image || '', // ইমেজ সেভ হচ্ছে
      order: body.order || 0,
      isActive: body.isActive !== undefined ? body.isActive : true
    });
    
    console.log('✅ Created testimonial with ID:', testimonial._id, 'Has image:', !!testimonial.image);
    return NextResponse.json({ success: true, data: testimonial }, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ success: false, error: 'Failed to create testimonial' }, { status: 500 });
  }
}

// PUT update testimonial
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    const { id, ...data } = await req.json();
    
    console.log('📝 Updating testimonial:', id, 'Has image:', !!data.image);
    
    const updated = await Testimonial.findByIdAndUpdate(
      id, 
      {
        name: data.name,
        role: data.role,
        comment: data.comment,
        rating: data.rating,
        company: data.company,
        icon: data.icon,
        image: data.image || '', // ইমেজ আপডেট হচ্ছে
        order: data.order,
        isActive: data.isActive
      }, 
      { new: true }
    );
    
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ success: false, error: 'Failed to update testimonial' }, { status: 500 });
  }
}

// DELETE testimonial
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 });
    }
    
    await Testimonial.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete testimonial' }, { status: 500 });
  }
}