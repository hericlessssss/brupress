export function App() {
  return (
    <main className="min-h-screen bg-background px-5 py-6 text-primary">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-shell flex-col justify-between border-x border-line/60 bg-surface px-5 py-6 shadow-sm">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Brupress
          </p>
          <h1 className="text-5xl font-semibold leading-none tracking-normal">
            Cuidado diario, sem pressa.
          </h1>
        </div>

        <div className="border-t border-line pt-6">
          <p className="text-lg font-medium">Hoje</p>
          <p className="mt-2 text-base leading-7 text-secondary">
            Acompanhe as medicoes da manha e da noite em um espaco simples,
            calmo e feito para o celular.
          </p>
        </div>
      </section>
    </main>
  );
}
