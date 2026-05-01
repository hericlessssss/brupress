import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-4 py-5 text-primary sm:px-6">
      <section className="mx-auto min-h-[calc(100vh-2.5rem)] w-full max-w-[calc(100vw-2rem)] border-x border-line/60 bg-surface px-4 py-6 shadow-sm sm:max-w-shell sm:px-5">
        {children}
      </section>
    </main>
  );
}
