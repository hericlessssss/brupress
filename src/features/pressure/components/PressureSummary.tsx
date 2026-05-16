import type { SevenDaySummary } from '../utils/pressureStats';

interface PressureSummaryProps {
  overallSummary: SevenDaySummary;
  weeklySummary: SevenDaySummary;
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

interface SummaryBoxProps {
  label: string;
  recordLabel: string;
  summary: SevenDaySummary;
}

function SummaryBox({ label, recordLabel, summary }: SummaryBoxProps) {
  return (
    <div className="rounded-md border border-line bg-surface p-3">
      <h3 className="font-display text-lg font-bold text-heading">{label}</h3>
      <dl className="mt-3 grid gap-3">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-secondary">
            Media
          </dt>
          <dd className="mt-1 font-display text-2xl font-bold text-heading">
            {formatPressureValue(summary.averageSystolic, summary.averageDiastolic)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-secondary">
            Maior
          </dt>
          <dd className="mt-1 font-display text-xl font-bold text-heading">
            {formatPressureValue(summary.highestSystolic, summary.highestDiastolic)}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-secondary">
            {recordLabel}
          </dt>
          <dd className="mt-1 font-display text-xl font-bold text-heading">
            {summary.recordCount}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function PressureSummary({
  overallSummary,
  weeklySummary,
}: PressureSummaryProps) {
  return (
    <section aria-labelledby="summary-title">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
        Resumo
      </p>
      <h2 className="mt-1 font-display text-2xl font-bold text-heading" id="summary-title">
        Acompanhamento
      </h2>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <SummaryBox
          label="Semanal"
          recordLabel="Registros"
          summary={weeklySummary}
        />
        <SummaryBox
          label="Total"
          recordLabel="Registros"
          summary={overallSummary}
        />
      </div>
    </section>
  );
}
