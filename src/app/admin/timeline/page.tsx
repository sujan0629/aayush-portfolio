'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Trash2, Pencil, Briefcase, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { TimelineEvent } from '@/lib/data';
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

const iconMap: { [key: string]: React.ReactNode } = {
    Briefcase: <Briefcase className="h-5 w-5 text-primary" />,
    GraduationCap: <GraduationCap className="h-5 w-5 text-primary" />,
};

export default function ManageTimelinePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [items, setItems] = React.useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchItems = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/timeline');
      if (!response.ok) throw new Error('Failed to fetch timeline events');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch timeline events.',
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
      const response = await fetch(`/api/timeline/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      setItems(prev => prev.filter((p) => p._id !== id));
      toast({
        title: 'Event Deleted',
        description: 'The timeline event has been removed successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while deleting the event.',
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
            <h1 className="text-4xl font-bold tracking-tight">Manage Timeline</h1>
            <Button asChild>
              <Link href="/admin/timeline/new">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add New Event
              </Link>
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Existing Events</CardTitle>
              <CardDescription>View, edit, or delete your existing timeline events.</CardDescription>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <p>No events found. Add one to get started.</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item._id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {iconMap[item.icon]}
                        <div>
                          <h3 className="font-semibold">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                         <Button variant="outline" size="icon" asChild>
                           <Link href={`/admin/timeline/edit/${item._id}`}>
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
                                This action cannot be undone. This will permanently delete this timeline event.
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
