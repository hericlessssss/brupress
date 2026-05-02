import type { TodayPeriodStatus } from '../utils/pressureStats';

const periodLabels = {
  morning: 'Manha',
  afternoon: 'Tarde',
  evening: 'Noite',
};

interface TodayStatusProps {
  statuses: TodayPeriodStatus[];
}

export function TodayStatus({ statuses }: TodayStatusProps) {
  return (
    <section className="border-y border-line py-4" aria-labelledby="today-title">
      <div className="mb-3">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
          Hoje
        </p>
        <h2 className="mt-1 text-2xl font-semibold" id="today-title">
          Status do dia
        </h2>
      </div>

      <div className="grid gap-1.5">
        {statuses.map((status) => (
          <div
            className="grid grid-cols-[5.25rem_1.75rem] items-center gap-2"
            key={status.period}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.12em] text-secondary">
              {periodLabels[status.period]}
            </span>
            <span
              aria-label={`${periodLabels[status.period]} ${
                status.done ? 'registrado' : 'pendente'
              }`}
              className={
                status.done
                  ? 'inline-flex size-7 items-center justify-center rounded-md border border-accent bg-accent text-sm font-semibold text-white'
                  : 'inline-flex size-7 items-center justify-center rounded-md border border-primary bg-transparent'
              }
            >
              {status.done ? '✓' : null}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
