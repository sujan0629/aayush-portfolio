import dbConnect from '@/lib/db';
import Resume from '@/models/Resume';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    const resume = await Resume.findOne({}).sort({ uploadedAt: -1 });
    return NextResponse.json(resume);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching resume', error }, { status: 500 });
  }
}
