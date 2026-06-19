// api/portfolio/route.ts
import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import Portfolio from '@/app/models/Portfolio';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    console.log('1. Starting GET request');
    await dbConnect();
    console.log('2. Database connected');
    
    const portfolios = await Portfolio.find({})
      .sort({ createdAt: -1 })
      .lean()
      .maxTimeMS(10000);
    
    console.log(`3. Found ${portfolios.length} portfolios`);
    return NextResponse.json(portfolios, { status: 200 });
  } catch (error: any) {
    console.error('❌ GET Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch portfolios',
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    console.log('1. Starting POST request');
    const body = await request.json();
    console.log('2. Body:', body);
    
    if (!body.title || !body.category || !body.description || !body.image) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    await dbConnect();
    console.log('3. Database connected');
    
    const count = await Portfolio.countDocuments();
    const newId = String(count + 1).padStart(2, '0');
    
    const portfolioData = {
      id: newId,
      title: body.title,
      category: body.category,
      description: body.description,
      tech: Array.isArray(body.tech) ? body.tech : 
            (body.tech ? body.tech.split(',').map((t: string) => t.trim()) : []),
      icon: body.icon || 'faLayerGroup',
      colorKey: body.colorKey || 'purple',
      stats: body.stats || '',
      image: body.image.trim(),
      imageAlt: body.imageAlt || body.title,
      github: body.github || '',
      liveUrl: body.liveUrl || '',
    };
    
    const portfolio = await Portfolio.create(portfolioData);
    console.log('4. Portfolio created:', portfolio.id);
    
    return NextResponse.json(portfolio, { status: 201 });
  } catch (error: any) {
    console.error('❌ POST Error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create portfolio', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}