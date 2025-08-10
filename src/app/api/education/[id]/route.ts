import dbConnect from '@/lib/db';
import Education from '@/models/Education';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const item = await Education.findById(params.id);
    if (!item) {
      return NextResponse.json({ message: 'Education detail not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching education detail', error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const body = await request.json();
    const updatedItem = await Education.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) {
      return NextResponse.json({ message: 'Education detail not found' }, { status: 404 });
    }
    return NextResponse.json(updatedItem);
  } catch (error) {
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error updating education detail', error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const deletedItem = await Education.findByIdAndDelete(params.id);
    if (!deletedItem) {
      return NextResponse.json({ message: 'Education detail not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Education detail deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting education detail', error }, { status: 500 });
  }
}
