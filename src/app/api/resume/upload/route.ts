import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import dbConnect from '@/lib/db';
import Resume from '@/models/Resume';
import cloudinary from '@/lib/cloudinary';

const uploadDir = path.join(process.cwd(), '/uploads');

async function ensureUploadDirExists() {
  try {
    await fs.access(uploadDir);
  } catch {
    await fs.mkdir(uploadDir, { recursive: true });
  }
}

export async function POST(request: NextRequest) {
  await ensureUploadDirExists();
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

    // Temporarily save file to disk to upload to cloudinary
    const tempFilePath = path.join(uploadDir, file.name);
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(tempFilePath, fileBuffer);
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      resource_type: 'raw',
      folder: 'resumes',
    });

    // Clean up temp file
    await fs.unlink(tempFilePath);
    
    const newResume = new Resume({
        cloudinaryUrl: result.secure_url,
        cloudinaryPublicId: result.public_id,
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
