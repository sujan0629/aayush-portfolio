import dbConnect from '@/lib/db';
import Research from '@/models/Research';
import { NextResponse } from 'next/server';

// GET
export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ await params
  await dbConnect();
  try {
    const item = await Research.findById(id);
    if (!item) {
      return NextResponse.json({ message: 'Research item not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching research item', error }, { status: 500 });
  }
}

// PUT
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ await params
  await dbConnect();
  try {
    const body = await request.json();
    const updatedItem = await Research.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) {
      return NextResponse.json({ message: 'Research item not found' }, { status: 404 });
    }
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating research item:', error);
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error updating research item', error }, { status: 500 });
  }
}

// DELETE
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ await params
  await dbConnect();
  try {
    const deletedItem = await Research.findByIdAndDelete(id);
    if (!deletedItem) {
      return NextResponse.json({ message: 'Research item not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Research item deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting research item', error }, { status: 500 });
  }
}
