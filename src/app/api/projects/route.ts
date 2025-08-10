import { NextResponse } from 'next/server';
import { projects } from '@/lib/data'; // Using static data for now

// In a real application, you would fetch this data from a database.
// For example, using a library like Prisma or directly from a database driver.

export async function GET(request: Request) {
  // For now, we're just returning the static data.
  // The user will integrate their own database logic here.
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  // NOTE: This is a mock implementation.
  // The user is expected to replace this with their actual database logic.
  const newProject = await request.json();
  
  // Basic validation
  if (!newProject.title || !newProject.slug) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  // In a real app, you would save this to the database.
  // For this mock, we'll just log it.
  console.log('Received new project:', newProject);

  // We can't actually add to the in-memory 'projects' array in a stateless
  // serverless environment, so we'll just pretend it was successful.
  
  return NextResponse.json(newProject, { status: 201 });
}
