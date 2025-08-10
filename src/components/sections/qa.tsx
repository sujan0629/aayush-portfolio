'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { answerQuestions } from '@/ai/flows/answer-questions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Loader2, Sparkles, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const formSchema = z.object({
  question: z.string().min(10, 'Please ask a more detailed question.'),
});

export function QA() {
  const [answer, setAnswer] = React.useState('');
  const [lastQuestion, setLastQuestion] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { question: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAnswer('');
    setLastQuestion(values.question);
    try {
      const result = await answerQuestions(values);
      setAnswer(result.answer);
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: "Sorry, I couldn't find an answer. Please try again later.",
      });
      setAnswer('');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="qa" className="">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold tracking-tight inline-flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            AI-Powered Q&amp;A
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            Ask anything about my background, experience, or projects.
          </p>
        </div>
        <Card className="max-w-3xl mx-auto">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="e.g., What was your role in the SUDS project?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Asking...
                    </>
                  ) : (
                    'Ask Question'
                  )}
                </Button>
              </form>
            </Form>

            {(isLoading || answer) && (
              <div className="mt-6 space-y-4">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg bg-muted p-3">
                    <p className="font-semibold">You</p>
                    <p className="text-muted-foreground">{lastQuestion}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Avatar>
                    <AvatarFallback><Sparkles /></AvatarFallback>
                  </Avatar>
                  <div className="rounded-lg bg-primary/10 p-3 w-full">
                    <p className="font-semibold text-primary">AI Assistant</p>
                    {isLoading ? (
                      <div className="flex items-center text-muted-foreground">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Thinking...
                      </div>
                    ) : (
                      <p className="text-primary/90 whitespace-pre-wrap">{answer}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
