import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-4 py-5 text-primary sm:px-6">
      <section
        className="ml-0 mr-auto box-border min-h-[calc(100vh-2.5rem)] border-x border-line/60 bg-surface px-4 py-6 shadow-sm sm:mx-auto sm:px-5"
        style={{ maxWidth: '430px', width: 'calc(100vw - 5rem)' }}
      >
        {children}
      </section>
    </main>
  );
}
