import { NextResponse } from 'next/server';
import { projects } from '@/lib/data'; // Using static data for now

// In a real application, you would fetch this data from a database.

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const project = projects.find((p) => p.slug === slug);

  if (project) {
    return NextResponse.json(project);
  } else {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
    // NOTE: This is a mock implementation.
    // The user is expected to replace this with their actual database logic.
    const slug = params.slug;
    const updatedProjectData = await request.json();

    // Find the project to update. In a real app, this would be a database query.
    const projectIndex = projects.findIndex((p) => p.slug === slug);

    if (projectIndex === -1) {
        return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    // In a real app, you would update the record in the database.
    console.log(`Updating project ${slug} with:`, updatedProjectData);
    
    // We can't actually update the in-memory 'projects' array, so we'll just
    // pretend it was successful and return the merged data.
    const updatedProject = { ...projects[projectIndex], ...updatedProjectData };

    return NextResponse.json(updatedProject);
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
    // NOTE: This is a mock implementation.
    // The user is expected to replace this with their actual database logic.
    const slug = params.slug;

    // Find the project to delete. In a real app, this would be a database query.
    const projectIndex = projects.findIndex((p) => p.slug === slug);

    if (projectIndex === -1) {
        return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    // In a real app, you would delete the record from the database.
    console.log(`Deleting project ${slug}`);

    // We can't actually delete from the in-memory 'projects' array.
    // We'll just return a success message.
    return NextResponse.json({ message: 'Project deleted successfully' });
}
