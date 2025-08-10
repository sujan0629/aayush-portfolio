import { NextResponse } from 'next/server';
import { mediaCoverages } from '@/lib/data';

export async function GET(request: Request) {
  return NextResponse.json(mediaCoverages);
}

export async function POST(request: Request) {
  const newItem = await request.json();
  
  if (!newItem.title || !newItem.outlet) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }
  
  newItem.id = mediaCoverages.length + 1;
  console.log('Received new media coverage:', newItem);
  
  return NextResponse.json(newItem, { status: 201 });
}
