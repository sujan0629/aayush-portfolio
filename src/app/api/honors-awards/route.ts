import dbConnect from '@/lib/db';
import HonorAward from '@/models/HonorAward';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    const items = await HonorAward.find({}).sort({ year: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching honors and awards', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newItem = new HonorAward(body);
    await newItem.save();
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error creating honor/award:', error);
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error creating honor/award', error }, { status: 500 });
  }
}
