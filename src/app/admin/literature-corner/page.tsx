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
import { Literature } from '@/lib/data';
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


export default function ManageLiteraturePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = React.useState<Literature[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.replace('/login');
      return;
    }

    async function fetchItems() {
      try {
        const response = await fetch('/api/literature-corner');
        if (!response.ok) throw new Error('Failed to fetch items');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not fetch literature items.',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchItems();
  }, [router, toast]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/literature-corner/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }

      setItems(items.filter((p) => p.id !== id));
      toast({
        title: 'Item Deleted',
        description: 'The literature item has been removed successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while deleting the item.',
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
            <h1 className="text-4xl font-bold tracking-tight">Manage Literature Corner</h1>
            <Button asChild>
              <Link href="/admin/literature-corner/new">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add New Item
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Existing Items</CardTitle>
              <CardDescription>View, edit, or delete your literature corner items.</CardDescription>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <p>No literature items found.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item) => (
                     <div key={item.id} className="border rounded-lg p-4">
                        <Image src={item.image} alt={item.title} width={300} height={200} className="rounded-md object-cover w-full aspect-video" />
                        <h3 className="font-semibold mt-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.author}</p>
                      <div className="flex items-center gap-2 mt-4">
                         <Button variant="outline" size="icon" asChild>
                           <Link href={`/admin/literature-corner/edit/${item.id}`}>
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
                                This action cannot be undone. This will permanently delete this item.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(item.id)}>
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
