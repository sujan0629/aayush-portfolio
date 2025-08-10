import { NextResponse } from 'next/server';
import { otherPublications } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const publication = otherPublications.find((p) => p.id === id);

  if (publication) {
    return NextResponse.json(publication);
  } else {
    return NextResponse.json({ message: 'Publication not found' }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const updatedData = await request.json();
    const index = otherPublications.findIndex((p) => p.id === id);

    if (index === -1) {
        return NextResponse.json({ message: 'Publication not found' }, { status: 404 });
    }
    
    console.log(`Updating publication ${id} with:`, updatedData);
    const updatedPub = { ...otherPublications[index], ...updatedData };
    return NextResponse.json(updatedPub);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const index = otherPublications.findIndex((p) => p.id === id);

    if (index === -1) {
        return NextResponse.json({ message: 'Publication not found' }, { status: 404 });
    }

    console.log(`Deleting publication ${id}`);
    return NextResponse.json({ message: 'Publication deleted successfully' });
}
