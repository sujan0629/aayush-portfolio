import * as React from 'react';

export function Footer() {
  return (
    <footer className="bg-background shadow-inner">
      <div className="container mx-auto py-4 px-4 text-center text-muted-foreground">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Aayush Bhatta. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
