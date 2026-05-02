import type { SevenDaySummary } from '../utils/pressureStats';

interface PressureSummaryProps {
  summary: SevenDaySummary;
}

function formatPressureValue(
  systolic: number | null,
  diastolic: number | null,
) {
  if (systolic === null || diastolic === null) {
    return '--';
  }

  return `${systolic}/${diastolic}`;
}

export function PressureSummary({ summary }: PressureSummaryProps) {
  return (
    <section aria-labelledby="summary-title">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
        Ultimos 7 dias
      </p>
      <h2 className="mt-1 font-display text-2xl font-bold text-heading" id="summary-title">
        Resumo simples
      </h2>

      <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line">
        <div className="bg-surface p-4">
          <dt className="text-sm text-secondary">Media</dt>
          <dd className="mt-2 font-display text-2xl font-bold text-heading">
            {formatPressureValue(
              summary.averageSystolic,
              summary.averageDiastolic,
            )}
          </dd>
        </div>
        <div className="bg-surface p-4">
          <dt className="text-sm text-secondary">Maior valor</dt>
          <dd className="mt-2 font-display text-2xl font-bold text-heading">
            {formatPressureValue(
              summary.highestSystolic,
              summary.highestDiastolic,
            )}
          </dd>
        </div>
        <div className="col-span-2 bg-surface p-4">
          <dt className="text-sm text-secondary">Registros na semana</dt>
          <dd className="mt-2 font-display text-2xl font-bold text-heading">
            {summary.recordCount}
          </dd>
        </div>
      </dl>
    </section>
  );
}
