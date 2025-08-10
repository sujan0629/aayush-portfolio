
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useRouter } from 'next/navigation';
import { imageUrls } from '@/lib/images';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';

const imageSchema = z.object({
  src: z.string().url('Must be a valid URL'),
  alt: z.string().min(1, 'Alt text is required'),
  hint: z.string().min(1, 'Hint is required'),
  caption: z.string().min(1, 'Caption is required'),
});

type ImageFormValues = z.infer<typeof imageSchema>;

export default function NewSurpriseImagePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(true);
  const [uploadMethod, setUploadMethod] = React.useState<'url' | 'upload'>('url');
  const [isUploading, setIsUploading] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.replace('/login');
    } else {
        setIsLoading(false);
    }
  }, [router]);

  const form = useForm<ImageFormValues>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      src: imageUrls.galleryDefault,
      alt: '',
      hint: '',
      caption: '',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({ variant: 'destructive', title: 'No File Selected' });
      return null;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/surprise-images/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }
      const result = await response.json();
      return result.secure_url;
    } catch (error) {
       toast({ variant: 'destructive', title: 'Upload Error', description: 'Failed to upload the image.' });
       return null;
    } finally {
        setIsUploading(false);
    }
  };

  const onSubmit = async (data: ImageFormValues) => {
    let imageUrl = data.src;

    if (uploadMethod === 'upload') {
        const uploadedUrl = await handleUpload();
        if (!uploadedUrl) return; // Stop submission if upload failed
        imageUrl = uploadedUrl;
    }
    
    try {
      const payload = { ...data, src: imageUrl };
      const response = await fetch('/api/surprise-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to add image');
      }

      toast({
        title: 'Image Added!',
        description: 'The new surprise image has been added.',
      });
      router.push('/admin/surprise-images');
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong while adding the image.',
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
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Add New Surprise Image</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="src"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image Source</FormLabel>
                            <RadioGroup
                                onValueChange={(value: 'url' | 'upload') => setUploadMethod(value)}
                                defaultValue={uploadMethod}
                                className="grid grid-cols-2 gap-4"
                            >
                                <div>
                                    <RadioGroupItem value="url" id="url" className="peer sr-only" />
                                    <Label htmlFor="url" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                        Use a URL
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="upload" id="upload" className="peer sr-only" />
                                    <Label htmlFor="upload" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                                        Upload a File
                                    </Label>
                                </div>
                            </RadioGroup>
                        </FormItem>
                    )}
                />
                 {uploadMethod === 'url' ? (
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
                 ) : (
                    <div className="space-y-2">
                        <Label>Upload Image File</Label>
                        <Input 
                            type="file" 
                            accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/heic"
                            onChange={handleFileChange} 
                        />
                        <FormDescription>Select a file from your device. This will be uploaded when you click "Add Image".</FormDescription>
                         {isUploading && <div className="flex items-center text-muted-foreground"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</div>}
                    </div>
                 )}
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
                  <Button type="submit" disabled={isUploading || (uploadMethod === 'upload' && !file)}>
                    {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                    Add Image
                  </Button>
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
