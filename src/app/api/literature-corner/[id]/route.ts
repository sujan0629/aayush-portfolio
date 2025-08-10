import { NextResponse } from 'next/server';
import { literatures } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const item = literatures.find((p) => p.id === id);

  if (item) {
    return NextResponse.json(item);
  } else {
    return NextResponse.json({ message: 'Item not found' }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const updatedData = await request.json();
    const index = literatures.findIndex((p) => p.id === id);

    if (index === -1) {
        return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }
    
    console.log(`Updating literature item ${id} with:`, updatedData);
    const updatedItem = { ...literatures[index], ...updatedData };
    return NextResponse.json(updatedItem);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const index = literatures.findIndex((p) => p.id === id);

    if (index === -1) {
        return NextResponse.json({ message: 'Item not found' }, { status: 404 });
    }

    console.log(`Deleting literature item ${id}`);
    return NextResponse.json({ message: 'Item deleted successfully' });
}
