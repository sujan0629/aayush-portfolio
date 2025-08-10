import dbConnect from '@/lib/db';
import GalleryImage from '@/models/GalleryImage';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    const items = await GalleryImage.find({}).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching gallery images', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newItem = new GalleryImage(body);
    await newItem.save();
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error creating gallery image:', error);
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error creating gallery image', error }, { status: 500 });
  }
}
