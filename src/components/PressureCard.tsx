import { StatusBadge } from './StatusBadge';
import type {
  BloodPressureRecordWithClassification,
  PressureClassification,
} from '../features/pressure/types/pressure';

const classificationLabels: Record<PressureClassification, string> = {
  normal: 'Normal',
  attention: 'Atencao',
  severe: 'Muito alto',
};

interface PressureCardProps {
  record: BloodPressureRecordWithClassification;
  title?: string;
}

export function PressureCard({ record, title = 'Ultimo registro' }: PressureCardProps) {
  const measuredAt = new Date(record.measured_at);
  const timeLabel = measuredAt.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <article className="rounded-md border border-line bg-surface p-4">
      <div className="grid gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
            {title}
          </p>
          <p className="mt-2 text-4xl font-semibold leading-none">
            {record.systolic}/{record.diastolic}
            <span className="ml-2 text-base font-medium text-secondary">
              mmHg
            </span>
          </p>
        </div>
        <div>
          <StatusBadge tone={record.classification}>
            {classificationLabels[record.classification]}
          </StatusBadge>
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
        <div>
          <dt className="text-secondary">Horario</dt>
          <dd className="mt-1 font-semibold">{timeLabel}</dd>
        </div>
        <div>
          <dt className="text-secondary">Batimentos</dt>
          <dd className="mt-1 font-semibold">
            {record.heart_rate ? `${record.heart_rate} bpm` : 'Nao informado'}
          </dd>
        </div>
      </dl>
    </article>
  );
}
