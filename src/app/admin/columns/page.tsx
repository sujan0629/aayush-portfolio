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
import { Column } from '@/lib/data';
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


export default function ManageColumnsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = React.useState<Column[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.replace('/login');
      return;
    }

    async function fetchItems() {
      try {
        const response = await fetch('/api/columns');
        if (!response.ok) throw new Error('Failed to fetch columns');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not fetch columns.',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchItems();
  }, [router, toast]);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/columns/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete column');
      }

      setItems(items.filter((p) => p.id !== id));
      toast({
        title: 'Column Deleted',
        description: 'The column has been removed successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while deleting the column.',
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
            <h1 className="text-4xl font-bold tracking-tight">Manage Columns</h1>
            <Button asChild>
              <Link href="/admin/columns/new">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add New Column
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Existing Columns</CardTitle>
              <CardDescription>View, edit, or delete your existing columns.</CardDescription>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <p>No columns found.</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.outlet} - {item.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                         <Button variant="outline" size="sm" asChild>
                           <a href={item.link} target="_blank">
                            <ExternalLink className="mr-2" /> View
                           </a>
                         </Button>
                         <Button variant="outline" size="icon" asChild>
                           <Link href={`/admin/columns/edit/${item.id}`}>
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
                                This action cannot be undone. This will permanently delete this column.
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
