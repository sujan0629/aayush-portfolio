import dbConnect from '@/lib/db';
import Literature from '@/models/Literature';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    const items = await Literature.find({}).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching literature items', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newItem = new Literature(body);
    await newItem.save();
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error creating literature item:', error);
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error creating literature item', error }, { status: 500 });
  }
}
