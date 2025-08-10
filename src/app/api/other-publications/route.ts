import { NextResponse } from 'next/server';
import { otherPublications } from '@/lib/data';

export async function GET(request: Request) {
  return NextResponse.json(otherPublications);
}

export async function POST(request: Request) {
  const newPub = await request.json();
  
  if (!newPub.title || !newPub.publication) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }
  
  newPub.id = otherPublications.length + 1;
  console.log('Received new publication:', newPub);
  
  return NextResponse.json(newPub, { status: 201 });
}
