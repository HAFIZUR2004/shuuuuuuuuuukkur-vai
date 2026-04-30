import { NextResponse } from 'next/server';
import Portfolio from '@/app/models/Portfolio';
import { dbConnect } from '@/lib/dbConnect';

// ✅ GET: সব পোর্টফোলিও ডাটা fetch করা
export async function GET() {
  try {
    await dbConnect();
    const portfolios = await Portfolio.find({}).sort({ createdAt: -1 });
    return NextResponse.json(portfolios, { status: 200 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolios' },
      { status: 500 }
    );
  }
}

// ✅ POST: নতুন পোর্টফোলিও তৈরি করা
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // ইমেজ URL ট্রিম করুন
    const trimmedImage = body.image?.trim() || '';
    
    // অটোমেটিক ID জেনারেট করুন
    const count = await Portfolio.countDocuments();
    const newId = String(count + 1).padStart(2, '0');
    
    const portfolioData = {
      id: newId,
      title: body.title,
      category: body.category,
      description: body.description,
      tech: body.tech || [],
      icon: body.icon || 'faLayerGroup',
      colorKey: body.colorKey || 'purple',
      stats: body.stats,
      image: trimmedImage,
      imageAlt: body.imageAlt,
      github: body.github || '',
      liveUrl: body.liveUrl || '',
    };
    
    const portfolio = await Portfolio.create(portfolioData);
    
    console.log('✅ Created new portfolio:', portfolio.id);
    return NextResponse.json(portfolio, { status: 201 });
    
  } catch (error: any) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to create portfolio', details: error.message },
      { status: 500 }
    );
  }
}