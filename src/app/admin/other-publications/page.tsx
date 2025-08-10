'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Trash2, Pencil, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { OtherPublication } from '@/lib/data';
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


export default function ManageOtherPublicationsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = React.useState<OtherPublication[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchItems = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/other-publications');
      if (!response.ok) throw new Error('Failed to fetch publications');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch publications.',
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
    fetchItems();
  }, [router, fetchItems]);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/other-publications/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete publication');
      }

      setItems(prev => prev.filter((p) => p._id !== id));
      toast({
        title: 'Publication Deleted',
        description: 'The publication has been removed successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while deleting the publication.',
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
            <h1 className="text-4xl font-bold tracking-tight">Manage Other Publications</h1>
            <Button asChild>
              <Link href="/admin/other-publications/new">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add New Publication
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Existing Publications</CardTitle>
              <CardDescription>View, edit, or delete your existing publications.</CardDescription>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <p>No publications found. Add one to get started.</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.publication} - {item.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                         <Button variant="outline" size="sm" asChild>
                           <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2" /> View
                           </a>
                         </Button>
                         <Button variant="outline" size="icon" asChild>
                           <Link href={`/admin/other-publications/edit/${item._id}`}>
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
                                This action cannot be undone. This will permanently delete this publication.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(item._id)}>
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
