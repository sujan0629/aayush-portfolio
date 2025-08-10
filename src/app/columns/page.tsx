'use client';

import * as React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Columns } from '@/components/sections/columns';
import { Column } from '@/lib/data';

export default function ColumnsPage() {
    const [columns, setColumns] = React.useState<Column[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    
    React.useEffect(() => {
        setIsLoading(true);
        fetch('/api/columns')
        .then(res => res.json())
        .then(data => {
            setColumns(data);
            setIsLoading(false);
        });
    }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <Columns columns={columns} isLoading={isLoading} />
      </main>
      <Footer />
    </div>
  );
}
