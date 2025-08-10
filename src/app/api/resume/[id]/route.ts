import dbConnect from '@/lib/db';
import Resume from '@/models/Resume';
import cloudinary from '@/lib/cloudinary';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  try {
    const resume = await Resume.findById(params.id);
    if (!resume) {
      return NextResponse.json({ message: 'Resume not found' }, { status: 404 });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(resume.cloudinaryPublicId, { resource_type: 'raw' });

    // Delete from DB
    await Resume.findByIdAndDelete(params.id);

    return NextResponse.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting resume', error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
    await dbConnect();
    try {
        const body = await request.json();
        const { published } = body;
        
        // Unpublish all other resumes
        if (published) {
            await Resume.updateMany({ _id: { $ne: params.id } }, { $set: { published: false } });
        }

        const updatedResume = await Resume.findByIdAndUpdate(params.id, { published }, { new: true });

        if (!updatedResume) {
            return NextResponse.json({ message: 'Resume not found' }, { status: 404 });
        }
        return NextResponse.json(updatedResume);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating resume status', error }, { status: 500 });
    }
}
