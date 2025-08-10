import dbConnect from '@/lib/db';
import Certification from '@/models/Certification';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    const items = await Certification.find({}).sort({ date: -1 });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching certifications', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newItem = new Certification(body);
    await newItem.save();
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error creating certification', error }, { status: 500 });
  }
}
