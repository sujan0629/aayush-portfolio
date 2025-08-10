import dbConnect from '@/lib/db';
import TimelineEvent from '@/models/TimelineEvent';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    const items = await TimelineEvent.find({}).sort({ date: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching timeline events', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newItem = new TimelineEvent(body);
    await newItem.save();
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Error creating timeline event:', error);
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error creating timeline event', error }, { status: 500 });
  }
}
