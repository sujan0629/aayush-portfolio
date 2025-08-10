
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useRouter, useParams } from 'next/navigation';
import { GalleryImage } from '@/lib/data';

const imageSchema = z.object({
  src: z.string().url('Must be a valid URL'),
  alt: z.string().min(1, 'Alt text is required'),
  hint: z.string().min(1, 'Hint is required'),
  caption: z.string().min(1, 'Caption is required'),
});

type ImageFormValues = z.infer<typeof imageSchema>;

export default function EditSurpriseImagePage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isLoading, setIsLoading] = React.useState(true);

  const form = useForm<ImageFormValues>({
    resolver: zodResolver(imageSchema),
  });
  
  React.useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.replace('/login');
      return;
    }
    
    if (id) {
      setIsLoading(true);
      fetch(`/api/surprise-images/${id}`)
        .then(res => res.json())
        .then((data: GalleryImage) => {
          form.reset(data);
          setIsLoading(false);
        }).catch(() => {
            toast({ variant: 'destructive', title: 'Error', description: 'Failed to load image data.' });
            router.push('/admin/surprise-images');
        });
    }
  }, [id, router, form, toast]);

  const onSubmit = async (data: ImageFormValues) => {
    try {
      const response = await fetch(`/api/surprise-images/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update image');
      }

      toast({
        title: 'Image Updated!',
        description: 'The image has been updated successfully.',
      });
      router.push('/admin/surprise-images');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while updating the image.',
      });
    }
  };

  if (isLoading) {
    return <div className="flex min-h-screen flex-col items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Edit Surprise Image</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="src"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://placehold.co/800x600" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="alt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alt Text</FormLabel>
                        <FormControl>
                          <Input placeholder="A descriptive alt text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="hint"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>AI Hint</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. construction site" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Caption</FormLabel>
                        <FormControl>
                          <Input placeholder="A fun caption for the image" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Update Image</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
