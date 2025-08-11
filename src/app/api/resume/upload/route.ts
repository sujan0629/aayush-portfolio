import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Resume from '@/models/Resume';
import cloudinary from '@/lib/cloudinary';
import streamifier from 'streamifier';

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded.' }, { status: 400 });
    }
    
    if (file.type !== 'application/pdf') {
      return NextResponse.json({ message: 'Only PDF files are allowed.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          folder: 'resumes',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(buffer).pipe(uploadStream);
    });

    const newResume = new Resume({
      cloudinaryUrl: (result as any).secure_url,
      cloudinaryPublicId: (result as any).public_id,
      originalFilename: file.name,
      published: false,
    });

    await newResume.save();

    return NextResponse.json(newResume, { status: 201 });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ message: 'Error uploading resume', error }, { status: 500 });
  }
}
