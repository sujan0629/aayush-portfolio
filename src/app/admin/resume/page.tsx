'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Upload, ExternalLink, Power, PowerOff, Loader2 } from 'lucide-react';
import { Resume } from '@/lib/data';
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
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function ManageResumePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [resume, setResume] = React.useState<Resume | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isUploading, setIsUploading] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);

  const fetchResume = React.useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/resume');
      if (response.ok) {
        const data = await response.json();
        setResume(data);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch resume details.',
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
    fetchResume();
  }, [router, fetchResume]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (files[0].type !== 'application/pdf') {
        toast({ variant: 'destructive', title: 'Invalid File Type', description: 'Please upload a PDF file.' });
        return;
      }
      setFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({ variant: 'destructive', title: 'No File Selected', description: 'Please choose a file to upload.' });
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      toast({ title: 'Success', description: 'Resume uploaded successfully.' });
      setFile(null); // Clear file input
      fetchResume(); // Refresh the resume data
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Upload Error',
        description: 'Something went wrong during the upload.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/resume/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');
      setResume(null);
      toast({ title: 'Success', description: 'Resume deleted successfully.' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete the resume.',
      });
    }
  };

  const handleTogglePublish = async (id: string, currentlyPublished: boolean) => {
    try {
      const response = await fetch(`/api/resume/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentlyPublished }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      fetchResume(); // Refresh
      toast({ title: 'Success', description: `Resume has been ${!currentlyPublished ? 'published' : 'unpublished'}.` });
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update publication status.',
      });
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Manage Resume</h1>
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Resume</CardTitle>
                <CardDescription>Upload a new PDF file. This will replace the existing resume upon publishing.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="resume-file">Select PDF</Label>
                  <Input id="resume-file" type="file" accept=".pdf" onChange={handleFileChange} />
                </div>
                <Button onClick={handleUpload} disabled={isUploading || !file}>
                  {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                  Upload File
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Resume</CardTitle>
                <CardDescription>The currently active resume for the download link.</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? <p>Loading...</p> : resume ? (
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{resume.originalFilename}</h3>
                      <p className="text-sm text-muted-foreground">
                        Uploaded on: {format(new Date(resume.uploadedAt), "PPP")}
                      </p>
                       <Badge variant={resume.published ? "default" : "secondary"}>
                        {resume.published ? "Published" : "Not Published"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                       <Button variant="outline" size="sm" asChild>
                         <a href={resume.cloudinaryUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2" /> View
                         </a>
                       </Button>
                       <Button variant="outline" size="icon" onClick={() => handleTogglePublish(resume._id, resume.published)}>
                        {resume.published ? <PowerOff className="h-4 w-4" /> : <Power className="h-4 w-4" />}
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
                                This will permanently delete the resume from the server. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(resume._id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                    </div>
                  </div>
                ) : (
                  <p>No resume uploaded yet.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
