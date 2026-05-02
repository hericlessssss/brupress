import { AppShell } from '../../../components/AppShell';
import { Button } from '../../../components/Button';
import { StatusBadge } from '../../../components/StatusBadge';
import type { BloodPressureRecordWithClassification } from '../types/pressure';
import { formatBrazilTime } from '../utils/brazilDate';
import { classificationLabels } from '../utils/classificationMessages';
import { groupHistoryByDay } from '../utils/groupHistoryByDay';
import { symptomLabels } from '../utils/symptomLabels';

interface PressureHistoryProps {
  records: BloodPressureRecordWithClassification[];
  onBack?: () => void;
}

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
  const groups = groupHistoryByDay(records);

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
            Registros recentes, agrupados por dia.
          </p>
        </header>

        {groups.length === 0 ? (
          <section className="rounded-md border border-line bg-surface p-4">
            <p className="text-xl font-semibold leading-tight">
              Nenhum registro no historico.
            </p>
            <p className="mt-2 text-base leading-7 text-secondary">
              As medicoes salvas vao aparecer aqui.
            </p>
          </section>
        ) : (
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
