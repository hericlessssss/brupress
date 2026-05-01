import { AppShell } from '../components/AppShell';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { PressureCard } from '../components/PressureCard';
import { StatusBadge } from '../components/StatusBadge';
import { SymptomChips } from '../components/SymptomChips';
import type { BloodPressureRecordWithClassification } from '../features/pressure/types/pressure';

const sampleRecord: BloodPressureRecordWithClassification = {
  id: 'sample',
  measured_at: '2026-05-01T11:30:00.000Z',
  period: 'morning',
  systolic: 118,
  diastolic: 76,
  heart_rate: 82,
  symptoms: [],
  notes: null,
  created_at: '2026-05-01T11:31:00.000Z',
  classification: 'normal',
};

export function App() {
  return (
    <AppShell>
      <div className="flex min-h-[calc(100vh-5.5rem)] flex-col gap-8">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Brupress
          </p>
          <h1 className="mt-3 text-5xl font-semibold leading-none tracking-normal">
            Cuidado diario, simples e claro.
          </h1>
          <p className="mt-4 text-base leading-7 text-secondary">
            Uma base visual calma para registrar a pressao pelo celular.
          </p>
        </header>

        <section className="grid gap-3 border-y border-line py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="min-w-0 text-base font-semibold">Manha</span>
            <StatusBadge tone="done">Registrado</StatusBadge>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="min-w-0 text-base font-semibold">Noite</span>
            <StatusBadge tone="pending">Pendente</StatusBadge>
          </div>
        </section>

        <PressureCard record={sampleRecord} />

        <section className="grid gap-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              inputMode="numeric"
              label="Sistolica"
              placeholder="118"
              unit="mmHg"
            />
            <Input
              inputMode="numeric"
              label="Diastolica"
              placeholder="76"
              unit="mmHg"
            />
          </div>
          <SymptomChips onChange={() => undefined} selected={['none']} />
        </section>

        <div className="mt-auto grid gap-3">
          <Button fullWidth>Registrar pressao</Button>
          <Button fullWidth variant="secondary">
            Ver historico
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
