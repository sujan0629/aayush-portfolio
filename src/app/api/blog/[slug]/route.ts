import dbConnect from '@/lib/db';
import BlogPost from '@/models/BlogPost';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  await dbConnect();
  try {
    const post = await BlogPost.findOne({ slug: params.slug });
    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching post', error }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  await dbConnect();
  try {
    const body = await request.json();
    const updatedPost = await BlogPost.findOneAndUpdate({ slug: params.slug }, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPost) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ message: 'Validation Error', errors: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ message: 'Error updating post', error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  await dbConnect();
  try {
    const deletedPost = await BlogPost.findOneAndDelete({ slug: params.slug });
    if (!deletedPost) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting post', error }, { status: 500 });
  }
}
