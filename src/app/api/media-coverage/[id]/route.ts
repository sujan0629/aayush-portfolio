import dbConnect from '@/lib/db';
import MediaCoverage from '@/models/MediaCoverage';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const item = await MediaCoverage.findById(params.id);
    if (!item) {
      return NextResponse.json({ message: 'Media coverage not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching media coverage', error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const body = await request.json();
    const updatedItem = await MediaCoverage.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) {
      return NextResponse.json({ message: 'Media coverage not found' }, { status: 404 });
    }
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating media coverage:', error);
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error updating media coverage', error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const deletedItem = await MediaCoverage.findByIdAndDelete(params.id);
    if (!deletedItem) {
      return NextResponse.json({ message: 'Media coverage not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Media coverage deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting media coverage', error }, { status: 500 });
  }
}
