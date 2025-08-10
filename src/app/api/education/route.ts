import dbConnect from '@/lib/db';
import Education from '@/models/Education';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    const items = await Education.find({}).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching education details', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newItem = new Education(body);
    await newItem.save();
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error creating education detail', error }, { status: 500 });
  }
}
