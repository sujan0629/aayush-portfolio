import dbConnect from '@/lib/db';
import Biography from '@/models/Biography';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    const item = await Biography.findOne();
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching biography', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    // Use updateOne with upsert to create or update the single biography document
    const result = await Biography.updateOne({}, { $set: body }, { upsert: true });
    const updatedBio = await Biography.findOne();
    return NextResponse.json(updatedBio, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error updating biography', error }, { status: 500 });
  }
}
