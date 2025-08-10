import dbConnect from '@/lib/db';
import TimelineEvent from '@/models/TimelineEvent';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const item = await TimelineEvent.findById(params.id);
    if (!item) {
      return NextResponse.json({ message: 'Timeline event not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching timeline event', error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const body = await request.json();
    const updatedItem = await TimelineEvent.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedItem) {
      return NextResponse.json({ message: 'Timeline event not found' }, { status: 404 });
    }
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Error updating timeline event:', error);
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error updating timeline event', error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const deletedItem = await TimelineEvent.findByIdAndDelete(params.id);
    if (!deletedItem) {
      return NextResponse.json({ message: 'Timeline event not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Timeline event deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting timeline event', error }, { status: 500 });
  }
}
