import dbConnect from '@/lib/db';
import BlogPost from '@/models/BlogPost';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    const posts = await BlogPost.find({}).sort({ date: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching blog posts', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const newPost = new BlogPost(body);
    await newPost.save();
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error creating blog post', error }, { status: 500 });
  }
}
