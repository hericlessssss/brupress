import { StatusBadge } from '../../../components/StatusBadge';
import type { TodayPeriodStatus } from '../utils/pressureStats';

const periodLabels = {
  morning: 'Manha',
  evening: 'Noite',
};

interface TodayStatusProps {
  statuses: TodayPeriodStatus[];
}

export function TodayStatus({ statuses }: TodayStatusProps) {
  return (
    <section className="border-y border-line py-4" aria-labelledby="today-title">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
            Hoje
          </p>
          <h2 className="mt-1 text-2xl font-semibold" id="today-title">
            Status do dia
          </h2>
        </div>
      </div>

      <div className="grid gap-3">
        {statuses.map((status) => (
          <div
            className="flex flex-wrap items-center gap-2"
            key={status.period}
          >
            <span className="text-base font-semibold">
              {periodLabels[status.period]}
            </span>
            <StatusBadge tone={status.done ? 'done' : 'pending'}>
              {status.done ? 'Registrado' : 'Pendente'}
            </StatusBadge>
          </div>
        ))}
      </div>
    </section>
  );
}
