import dbConnect from '@/lib/db';
import SurpriseImage from '@/models/SurpriseImage';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    const items = await SurpriseImage.find({}).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching surprise images', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newItem = new SurpriseImage(body);
    await newItem.save();
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error creating surprise image:', error);
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error creating surprise image', error }, { status: 500 });
  }
}
