import { NextResponse } from 'next/server';
import { blogPosts } from '@/lib/data'; // Using static data for now

export async function GET(request: Request) {
  return NextResponse.json(blogPosts);
}

export async function POST(request: Request) {
  // NOTE: This is a mock implementation.
  const newPost = await request.json();
  
  if (!newPost.title || !newPost.slug) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  console.log('Received new blog post:', newPost);
  
  return NextResponse.json(newPost, { status: 201 });
}
