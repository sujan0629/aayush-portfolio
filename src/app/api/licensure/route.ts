import dbConnect from '@/lib/db';
import Licensure from '@/models/Licensure';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    const item = await Licensure.findOne();
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching licensure', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const result = await Licensure.updateOne({}, { $set: body }, { upsert: true });
    const updatedItem = await Licensure.findOne();
    return NextResponse.json(updatedItem, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error updating licensure', error }, { status: 500 });
  }
}
