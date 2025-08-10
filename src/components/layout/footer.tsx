import * as React from 'react';

export function Footer() {
  return (
    <footer className="bg-background shadow-inner">
      <div className="container mx-auto py-4 px-4 flex justify-between items-center text-muted-foreground">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Aayush Bhatta. All Rights Reserved.
        </p>
        <p className="text-sm">
          Developed by{' '}
          <a
            href="https://codelitsstudio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline-offset-2 hover:underline"
          >
            Codelits Studio
          </a>
          <span>&reg;</span>
        </p>
      </div>
    </footer>
  );
}
