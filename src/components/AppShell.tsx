import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-4 py-5 text-primary sm:px-6">
      <section
        className="mx-auto min-h-[calc(100vh-2.5rem)] border-x border-line/60 bg-surface py-6 pl-4 pr-8 shadow-sm sm:px-5"
        style={{ maxWidth: '430px', width: 'calc(100vw - 4rem)' }}
      >
        {children}
      </section>
    </main>
  );
}
