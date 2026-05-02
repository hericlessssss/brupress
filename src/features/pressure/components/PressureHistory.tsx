import { useState } from 'react';
import { AppShell } from '../../../components/AppShell';
import { Button } from '../../../components/Button';
import { StatusBadge } from '../../../components/StatusBadge';
import type { BloodPressureRecordWithClassification } from '../types/pressure';
import { formatBrazilShortDate, formatBrazilTime } from '../utils/brazilDate';
import { classificationLabels } from '../utils/classificationMessages';
import { groupHistoryByDay } from '../utils/groupHistoryByDay';
import { symptomLabels } from '../utils/symptomLabels';

interface PressureHistoryProps {
  records: BloodPressureRecordWithClassification[];
  onBack?: () => void;
}

type HistoryView = 'detailed' | 'summary';

const periodLabels = {
  morning: 'Manha',
  afternoon: 'Tarde',
  evening: 'Noite',
};

function formatTime(value: string) {
  return formatBrazilTime(value);
}

function formatSymptoms(record: BloodPressureRecordWithClassification) {
  if (record.symptoms.length === 0 || record.symptoms.includes('none')) {
    return 'Nenhum sintoma informado.';
  }

  return record.symptoms.map((symptom) => symptomLabels[symptom]).join(', ');
}

export function PressureHistory({ onBack, records }: PressureHistoryProps) {
  const [view, setView] = useState<HistoryView>('detailed');
  const groups = groupHistoryByDay(records);
  const sortedRecords = [...records].sort(
    (first, second) =>
      new Date(second.measured_at).getTime() -
      new Date(first.measured_at).getTime(),
  );

  return (
    <AppShell>
      <div className="flex min-h-[calc(100vh-5.5rem)] flex-col gap-7">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
            Brupress
          </p>
          <h1 className="mt-3 text-5xl font-semibold leading-none tracking-normal">
            Historico
          </h1>
          <p className="mt-4 text-base leading-7 text-secondary">
            Registros recentes para acompanhar e mostrar na consulta.
          </p>
        </header>

        <div
          aria-label="Tipo de historico"
          className="grid grid-cols-2 rounded-md border border-line bg-background p-1"
          role="tablist"
        >
          <button
            aria-selected={view === 'detailed'}
            className={
              view === 'detailed'
                ? 'min-h-11 rounded bg-primary px-3 text-sm font-semibold text-surface'
                : 'min-h-11 rounded px-3 text-sm font-semibold text-secondary'
            }
            onClick={() => setView('detailed')}
            role="tab"
            type="button"
          >
            Historico detalhado
          </button>
          <button
            aria-selected={view === 'summary'}
            className={
              view === 'summary'
                ? 'min-h-11 rounded bg-primary px-3 text-sm font-semibold text-surface'
                : 'min-h-11 rounded px-3 text-sm font-semibold text-secondary'
            }
            onClick={() => setView('summary')}
            role="tab"
            type="button"
          >
            Historico resumido
          </button>
        </div>

        {groups.length === 0 ? (
          <section className="rounded-md border border-line bg-surface p-4">
            <p className="text-xl font-semibold leading-tight">
              Nenhum registro no historico.
            </p>
            <p className="mt-2 text-base leading-7 text-secondary">
              As medicoes salvas vao aparecer aqui.
            </p>
          </section>
        ) : view === 'detailed' ? (
          <div className="grid gap-7">
            {groups.map((group) => (
              <section aria-labelledby={`history-${group.dateKey}`} key={group.dateKey}>
                <h2
                  className="border-b border-line pb-3 text-2xl font-semibold"
                  id={`history-${group.dateKey}`}
                >
                  {group.label}
                </h2>
                <div className="divide-y divide-line">
                  {group.records.map((record) => (
                    <article className="py-4" key={record.id}>
                      <div className="flex flex-wrap items-center gap-2">
                        <time
                          className="text-sm font-semibold text-secondary"
                          dateTime={record.measured_at}
                        >
                          {formatTime(record.measured_at)}
                        </time>
                        <StatusBadge tone={record.classification}>
                          {classificationLabels[record.classification]}
                        </StatusBadge>
                      </div>

                      <p className="mt-2 text-3xl font-semibold">
                        {record.systolic}/{record.diastolic}
                        <span className="ml-2 text-base font-medium text-secondary">
                          mmHg
                        </span>
                      </p>

                      <dl className="mt-3 grid gap-2 text-sm">
                        <div>
                          <dt className="text-secondary">Batimentos</dt>
                          <dd className="mt-1 font-semibold">
                            {record.heart_rate
                              ? `${record.heart_rate} bpm`
                              : 'Nao informado'}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-secondary">Sintomas</dt>
                          <dd className="mt-1 font-semibold">
                            {formatSymptoms(record)}
                          </dd>
                        </div>
                      </dl>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <section aria-labelledby="summary-history-title">
            <h2 className="sr-only" id="summary-history-title">
              Historico resumido
            </h2>
            <div className="overflow-hidden rounded-md border border-line">
              <div className="grid grid-cols-[4.5rem_1fr_4.5rem] border-b border-line bg-background px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
                <span>Data</span>
                <span>Medicao</span>
                <span>Periodo</span>
              </div>
              <div className="divide-y divide-line">
                {sortedRecords.map((record) => (
                  <article
                    className="grid grid-cols-[4.5rem_1fr_4.5rem] items-center gap-2 px-3 py-3"
                    key={record.id}
                  >
                    <time
                      className="text-sm font-semibold text-secondary"
                      dateTime={record.measured_at}
                    >
                      {formatBrazilShortDate(record.measured_at)}
                    </time>
                    <div>
                      <p className="text-2xl font-semibold leading-none text-primary">
                        {record.systolic}/{record.diastolic}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-secondary">
                        {formatTime(record.measured_at)}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      {periodLabels[record.period]}
                    </span>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {onBack ? (
          <div className="mt-auto">
            <Button fullWidth onClick={onBack} variant="secondary">
              Voltar
            </Button>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
