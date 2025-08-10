import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching projects', error }, { status: 500 });
  }
}


export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newProject = new Project(body);
    await newProject.save();
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    // Provide more specific error messages if possible
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error creating project', error }, { status: 500 });
  }
}
