import { AppShell } from '../../../components/AppShell';
import { BrandHeader } from '../../../components/BrandHeader';
import { Button } from '../../../components/Button';
import { PressureCard } from '../../../components/PressureCard';
import type { BloodPressureRecordWithClassification } from '../types/pressure';
import { formatBrazilFullDate } from '../utils/brazilDate';
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
  saveFeedback?: BloodPressureRecordWithClassification | null;
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
  saveFeedback = null,
  today = new Date(),
}: HomePageProps) {
  const statuses = getTodayPeriodStatus(records, today);
  const lastRecord = getLastRecord(records);
  const summary = getSevenDaySummary(records, today);
  const todayLabel = formatBrazilFullDate(today);

  return (
    <AppShell>
      <div className="flex min-h-[calc(100vh-5.5rem)] flex-col gap-7">
        <header>
          <BrandHeader />
          <h1 className="mt-4 font-display text-4xl font-bold leading-none tracking-normal text-heading">
            Olá{' '}
            <span
              className="font-normal italic text-accent"
              style={{ fontFamily: 'Georgia, Cambria, Times New Roman, serif' }}
            >
              Bruna!
            </span>
          </h1>
          <p className="mt-3 text-base leading-7 text-secondary">
            Vamos ver como esta a sua pressao hoje?
          </p>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-secondary">
            {todayLabel}
          </p>
        </header>

        <TodayStatus statuses={statuses} />

        {saveFeedback ? (
          <section
            className="rounded-md border border-line bg-surface p-4"
            role="status"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">
              Registro salvo com sucesso
            </p>
            <p className="mt-3 font-display text-3xl font-bold text-heading">
              {saveFeedback.systolic}/{saveFeedback.diastolic}
              <span className="ml-2 text-base font-medium text-secondary">
                mmHg
              </span>
            </p>
            <p className="mt-2 text-base leading-7 text-secondary">
              Tudo salvo por aqui.
            </p>
          </section>
        ) : null}

        {isLoading ? (
          <section className="rounded-md border border-line bg-surface p-4">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
              Sincronizando
            </p>
            <p className="mt-3 font-display text-xl font-bold text-heading">
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
            <p className="mt-3 font-display text-2xl font-bold text-heading">
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
