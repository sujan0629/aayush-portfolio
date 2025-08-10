import dbConnect from '@/lib/db';
import ContactInfo from '@/models/ContactInfo';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    const item = await ContactInfo.findOne();
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching contact info', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    await ContactInfo.updateOne({}, { $set: body }, { upsert: true });
    const updatedInfo = await ContactInfo.findOne();
    return NextResponse.json(updatedInfo, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error updating contact info', error }, { status: 500 });
  }
}
