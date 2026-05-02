import { AppShell } from '../../../components/AppShell';
import { Button } from '../../../components/Button';
import { PressureCard } from '../../../components/PressureCard';
import type { BloodPressureRecordWithClassification } from '../types/pressure';
import {
  getLastRecord,
  getSevenDaySummary,
  getTodayPeriodStatus,
} from '../utils/pressureStats';
import { PressureSummary } from './PressureSummary';
import { TodayStatus } from './TodayStatus';

interface HomePageProps {
  records: BloodPressureRecordWithClassification[];
  isLoading?: boolean;
  loadError?: string | null;
  today?: Date;
  onRegister?: () => void;
  onOpenHistory?: () => void;
  onRetry?: () => void;
}

export function HomePage({
  isLoading = false,
  loadError = null,
  onOpenHistory,
  onRegister,
  onRetry,
  records,
  today = new Date(),
}: HomePageProps) {
  const statuses = getTodayPeriodStatus(records, today);
  const lastRecord = getLastRecord(records);
  const summary = getSevenDaySummary(records, today);

  return (
    <AppShell>
      <div className="flex min-h-[calc(100vh-5.5rem)] flex-col gap-7">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Brupress
          </p>
          <h1 className="mt-3 text-5xl font-semibold leading-none tracking-normal">
            Hoje
          </h1>
          <p className="mt-4 text-base leading-7 text-secondary">
            Olá Bruna. Vamos ver como está a sua pressão?
          </p>
        </header>

        <TodayStatus statuses={statuses} />

        {isLoading ? (
          <section className="rounded-md border border-line bg-surface p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
              Sincronizando
            </p>
            <p className="mt-3 text-xl font-semibold">
              Buscando os registros salvos...
            </p>
          </section>
        ) : null}

        {loadError ? (
          <section className="rounded-md border border-accent bg-accent-soft p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              Atencao
            </p>
            <p className="mt-3 text-base leading-7 text-primary">
              {loadError}
            </p>
            <div className="mt-4">
              <Button onClick={onRetry} variant="secondary">
                Tentar de novo
              </Button>
            </div>
          </section>
        ) : null}

        {lastRecord ? (
          <PressureCard record={lastRecord} />
        ) : (
          <section className="rounded-md border border-line bg-surface p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
              Ultimo registro
            </p>
            <p className="mt-3 text-2xl font-semibold">
              Nenhuma medicao registrada ainda.
            </p>
            <p className="mt-2 text-base leading-7 text-secondary">
              O primeiro registro vai aparecer aqui.
            </p>
          </section>
        )}

        <PressureSummary summary={summary} />

        <div className="mt-auto grid gap-3">
          <Button fullWidth onClick={onRegister}>
            Registrar pressao
          </Button>
          <Button fullWidth onClick={onOpenHistory} variant="secondary">
            Ver historico
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
