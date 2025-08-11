import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
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

    const buffer = Buffer.from(await file.arrayBuffer());

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'surprise-images',
          use_filename: true,
          unique_filename: true,
          overwrite: false,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(buffer).pipe(uploadStream);
    });

    return NextResponse.json({ secure_url: (result as any).secure_url }, { status: 201 });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ message: 'Error uploading image', error }, { status: 500 });
  }
}
