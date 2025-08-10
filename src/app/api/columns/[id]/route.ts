import { NextResponse } from 'next/server';
import { columns } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  const column = columns.find((p) => p.id === id);

  if (column) {
    return NextResponse.json(column);
  } else {
    return NextResponse.json({ message: 'Column not found' }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const updatedData = await request.json();
    const index = columns.findIndex((p) => p.id === id);

    if (index === -1) {
        return NextResponse.json({ message: 'Column not found' }, { status: 404 });
    }
    
    console.log(`Updating column ${id} with:`, updatedData);
    const updatedColumn = { ...columns[index], ...updatedData };
    return NextResponse.json(updatedColumn);
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
    const id = parseInt(params.id);
    const index = columns.findIndex((p) => p.id === id);

    if (index === -1) {
        return NextResponse.json({ message: 'Column not found' }, { status: 404 });
    }

    console.log(`Deleting column ${id}`);
    return NextResponse.json({ message: 'Column deleted successfully' });
}
