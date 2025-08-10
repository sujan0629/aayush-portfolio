import { NextResponse } from 'next/server';
import { blogPosts } from '@/lib/data'; // Using static data for now

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const post = blogPosts.find((p) => p.slug === slug);

  if (post) {
    return NextResponse.json(post);
  } else {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
    const slug = params.slug;
    const updatedPostData = await request.json();

    const postIndex = blogPosts.findIndex((p) => p.slug === slug);

    if (postIndex === -1) {
        return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    
    console.log(`Updating blog post ${slug} with:`, updatedPostData);
    
    const updatedPost = { ...blogPosts[postIndex], ...updatedPostData };

    return NextResponse.json(updatedPost);
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
    const slug = params.slug;
    const postIndex = blogPosts.findIndex((p) => p.slug === slug);

    if (postIndex === -1) {
        return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    console.log(`Deleting blog post ${slug}`);

    return NextResponse.json({ message: 'Blog post deleted successfully' });
}
