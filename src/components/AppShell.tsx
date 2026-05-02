import type { ReactNode } from 'react';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background px-3 py-4 text-primary sm:px-6">
      <section className="mx-auto box-border min-h-[calc(100vh-2rem)] w-full max-w-[430px] border-x border-line/60 bg-surface px-4 py-6 shadow-sm sm:px-5">
        {children}
      </section>
    </main>
  );
}
