import { NextResponse } from 'next/server';
import { mediaCoverages } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const item = mediaCoverages.find((p) => p.id === id);

  if (item) {
    return NextResponse.json(item);
  } else {
    return NextResponse.json({ message: 'Media coverage not found' }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const updatedData = await request.json();
    const index = mediaCoverages.findIndex((p) => p.id === id);

    if (index === -1) {
        return NextResponse.json({ message: 'Media coverage not found' }, { status: 404 });
    }
    
    console.log(`Updating media coverage ${id} with:`, updatedData);
    const updatedItem = { ...mediaCoverages[index], ...updatedData };
    return NextResponse.json(updatedItem);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const index = mediaCoverages.findIndex((p) => p.id === id);

    if (index === -1) {
        return NextResponse.json({ message: 'Media coverage not found' }, { status: 404 });
    }

    console.log(`Deleting media coverage ${id}`);
    return NextResponse.json({ message: 'Media coverage deleted successfully' });
}
