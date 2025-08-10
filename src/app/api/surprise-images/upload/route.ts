
import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import dbConnect from '@/lib/db';
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
    
    // Temporarily save file to disk to upload to cloudinary
    const tempFilePath = path.join(uploadDir, file.name);
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(tempFilePath, fileBuffer);
    
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: 'surprise-images',
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    });

    await fs.unlink(tempFilePath);

    return NextResponse.json({ secure_url: result.secure_url }, { status: 201 });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ message: 'Error uploading image', error }, { status: 500 });
  }
}

