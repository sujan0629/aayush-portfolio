'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FileText, Newspaper, BookOpen, Camera, PenSquare, Tv } from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.replace('/login');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/login');
  };

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline">Logout</Button>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText /> Manage Projects</CardTitle>
                <CardDescription>Create, edit, and delete projects.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/admin/projects">Go to Project Management</Link>
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Newspaper /> Manage Blog</CardTitle>
                <CardDescription>Create, edit, and delete blog posts.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/admin/blog">Go to Blog Management</Link>
                </Button>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen /> Manage Publications</CardTitle>
                <CardDescription>Manage Other Publications and Columns.</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                 <Button asChild>
                  <Link href="/admin/other-publications">Other Publications</Link>
                </Button>
                <Button asChild>
                  <Link href="/admin/columns">Columns</Link>
                </Button>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Camera /> Manage Camera Roll</CardTitle>
                <CardDescription>Add or remove images from the gallery.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/admin/camera-roll">Go to Gallery Management</Link>
                </Button>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><PenSquare /> Manage Literature</CardTitle>
                <CardDescription>Update the literature corner section.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/admin/literature-corner">Go to Literature Management</Link>
                </Button>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Tv /> Manage Media Coverage</CardTitle>
                <CardDescription>Add or remove media mentions.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/admin/media-coverage">Go to Media Management</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
