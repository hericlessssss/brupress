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
    <section className="border-y border-line py-5" aria-labelledby="today-title">
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
          Hoje
        </p>
        <h2 className="mt-1 text-2xl font-semibold" id="today-title">
          Status do dia
        </h2>
      </div>

      <div className="grid gap-2">
        {statuses.map((status) => (
          <div
            className="grid grid-cols-[4.5rem_6rem] items-center gap-2"
            key={status.period}
          >
            <span className="text-base font-semibold">
              {periodLabels[status.period]}
            </span>
            <span
              className={
                status.done
                  ? 'inline-flex min-h-10 w-24 items-center justify-center rounded-md border border-accent bg-accent px-2 text-xs font-semibold text-white'
                  : 'inline-flex min-h-10 w-24 items-center justify-center rounded-md border border-primary bg-transparent px-2 text-xs font-semibold text-primary'
              }
            >
              {status.done ? 'Registrado' : 'Pendente'}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
