import { NextResponse } from 'next/server';
import { galleryImages } from '@/lib/data';

export async function GET(request: Request) {
  return NextResponse.json(galleryImages);
}

export async function POST(request: Request) {
  const newImage = await request.json();
  
  if (!newImage.src || !newImage.alt) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }
  
  newImage.id = galleryImages.length + 1;

  console.log('Received new image:', newImage);
  
  return NextResponse.json(newImage, { status: 201 });
}
