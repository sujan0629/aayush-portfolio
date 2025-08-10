'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Trash2, Pencil } from 'lucide-react';
import Link from 'next/link';
import { GalleryImage } from '@/lib/data';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


export default function ManageCameraRollPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [images, setImages] = React.useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchImages = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/camera-roll');
      if (!response.ok) throw new Error('Failed to fetch images');
      const data = await response.json();
      setImages(data);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch images.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.replace('/login');
      return;
    }
    fetchImages();
  }, [router, fetchImages]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/camera-roll/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      setImages(prev => prev.filter((p) => p._id !== id));
      toast({
        title: 'Image Deleted',
        description: 'The image has been removed successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while deleting the image.',
      });
    }
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
            <h1 className="text-4xl font-bold tracking-tight">Manage Gallery</h1>
            <Button asChild>
              <Link href="/admin/camera-roll/new">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add New Image
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Existing Images</CardTitle>
              <CardDescription>View, edit, or delete your gallery images.</CardDescription>
            </CardHeader>
            <CardContent>
              {images.length === 0 ? (
                <p>No images found. Add one to get started.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {images.map((image) => (
                    <div key={image._id} className="border rounded-lg p-4">
                        <Image src={image.src} alt={image.alt} width={300} height={200} className="rounded-md object-cover w-full aspect-video" />
                        <h3 className="font-semibold mt-2">{image.caption}</h3>
                        <p className="text-sm text-muted-foreground">{image.alt}</p>
                      <div className="flex items-center gap-2 mt-4">
                         <Button variant="outline" size="icon" asChild>
                           <Link href={`/admin/camera-roll/edit/${image._id}`}>
                            <Pencil className="h-4 w-4" />
                           </Link>
                         </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this image.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(image._id)}>
                                Continue
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
