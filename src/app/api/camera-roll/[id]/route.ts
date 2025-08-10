import { NextResponse } from 'next/server';
import { galleryImages } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const image = galleryImages.find((p) => p.id === id);

  if (image) {
    return NextResponse.json(image);
  } else {
    return NextResponse.json({ message: 'Image not found' }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const updatedImageData = await request.json();

    const imageIndex = galleryImages.findIndex((p) => p.id === id);

    if (imageIndex === -1) {
        return NextResponse.json({ message: 'Image not found' }, { status: 404 });
    }
    
    console.log(`Updating image ${id} with:`, updatedImageData);
    
    const updatedImage = { ...galleryImages[imageIndex], ...updatedImageData };

    return NextResponse.json(updatedImage);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const imageIndex = galleryImages.findIndex((p) => p.id === id);

    if (imageIndex === -1) {
        return NextResponse.json({ message: 'Image not found' }, { status: 404 });
    }

    console.log(`Deleting image ${id}`);

    return NextResponse.json({ message: 'Image deleted successfully' });
}
