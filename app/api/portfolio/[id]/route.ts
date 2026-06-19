import { NextRequest, NextResponse } from 'next/server';
import Portfolio from '@/app/models/Portfolio';
import { dbConnect } from '@/lib/dbConnect';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    
    let portfolio;
    if (mongoose.Types.ObjectId.isValid(id)) {
      portfolio = await Portfolio.findById(id).lean();
    }
    if (!portfolio) {
      portfolio = await Portfolio.findOne({ id: id }).lean();
    }
    
    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(portfolio, { status: 200 });
  } catch (error: any) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch portfolio', details: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    
    const { id: _, ...updateData } = body;
    
    let updatedPortfolio;
    
    if (mongoose.Types.ObjectId.isValid(id)) {
      updatedPortfolio = await Portfolio.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).lean();
    }
    
    if (!updatedPortfolio) {
      updatedPortfolio = await Portfolio.findOneAndUpdate(
        { id: id },
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).lean();
    }
    
    if (!updatedPortfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedPortfolio, { status: 200 });
  } catch (error: any) {
    console.error('PUT Error:', error);
    return NextResponse.json(
      { error: 'Failed to update portfolio', details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    
    let deletedPortfolio;
    
    if (mongoose.Types.ObjectId.isValid(id)) {
      deletedPortfolio = await Portfolio.findByIdAndDelete(id).lean();
    }
    
    if (!deletedPortfolio) {
      deletedPortfolio = await Portfolio.findOneAndDelete({ id: id }).lean();
    }
    
    if (!deletedPortfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Portfolio deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('DELETE Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete portfolio', details: error.message },
      { status: 500 }
    );
  }
}