import dbConnect from '@/lib/db';
import OtherPublication from '@/models/OtherPublication';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const item = await OtherPublication.findById(params.id);
    if (!item) {
      return NextResponse.json({ message: 'Publication not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching publication', error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const body = await request.json();
    const updatedItem = await OtherPublication.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) {
      return NextResponse.json({ message: 'Publication not found' }, { status: 404 });
    }
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating publication:', error);
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error updating publication', error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const deletedItem = await OtherPublication.findByIdAndDelete(params.id);
    if (!deletedItem) {
      return NextResponse.json({ message: 'Publication not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Publication deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting publication', error }, { status: 500 });
  }
}
