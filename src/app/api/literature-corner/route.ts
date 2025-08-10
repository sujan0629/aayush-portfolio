import { NextResponse } from 'next/server';
import { literatures } from '@/lib/data';

export async function GET(request: Request) {
  return NextResponse.json(literatures);
}

export async function POST(request: Request) {
  const newItem = await request.json();
  
  if (!newItem.title || !newItem.author) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }
  
  newItem.id = literatures.length + 1;
  console.log('Received new literature item:', newItem);
  
  return NextResponse.json(newItem, { status: 201 });
}
