import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  await dbConnect();
  try {
    const project = await Project.findOne({ slug: params.slug });
    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching project', error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  await dbConnect();
  try {
    const body = await request.json();
    const updatedProject = await Project.findOneAndUpdate({ slug: params.slug }, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedProject) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
     if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error updating project', error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  await dbConnect();
  try {
    const deletedProject = await Project.findOneAndDelete({ slug: params.slug });
    if (!deletedProject) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting project', error }, { status: 500 });
  }
}
