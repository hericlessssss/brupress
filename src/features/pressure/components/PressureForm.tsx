import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ZodError } from 'zod';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { StatusBadge } from '../../../components/StatusBadge';
import { SymptomChips } from '../../../components/SymptomChips';
import type {
  BloodPressureRecordWithClassification,
  PressureInput,
  PressurePeriod,
  Symptom,
} from '../types/pressure';
import { classificationSuccessMessages } from '../utils/classificationMessages';
import { getSuggestedPeriod } from '../utils/getSuggestedPeriod';
import { pressureInputSchema } from '../utils/validatePressure';

interface PressureFormProps {
  defaultPeriod?: PressurePeriod;
  onCancel?: () => void;
  onSave: (
    input: PressureInput,
  ) => Promise<BloodPressureRecordWithClassification>;
}

interface PressureFormValues {
  period: PressurePeriod;
  systolic?: number;
  diastolic?: number;
  heartRate?: number | null;
  symptoms: Symptom[];
  notes?: string;
}

const periodLabels: Record<PressurePeriod, string> = {
  morning: 'Manha',
  evening: 'Noite',
};

function parseOptionalNumber(value: unknown) {
  if (value === '' || value === null || value === undefined) {
    return null;
  }

  const parsedValue = Number(value);
  return Number.isNaN(parsedValue) ? value : parsedValue;
}

function parseRequiredNumber(value: unknown) {
  if (value === '' || value === null || value === undefined) {
    return undefined;
  }

  const parsedValue = Number(value);
  return Number.isNaN(parsedValue) ? value : parsedValue;
}

function mapZodErrors(error: ZodError) {
  return error.issues.reduce<Record<string, string>>((errors, issue) => {
    const path = issue.path[0];

    if (typeof path === 'string' && !errors[path]) {
      errors[path] = issue.message;
    }

    return errors;
  }, {});
}

export function PressureForm({
  defaultPeriod = getSuggestedPeriod(),
  onCancel,
  onSave,
}: PressureFormProps) {
  const [formError, setFormError] = useState<string | null>(null);
  const [savedRecord, setSavedRecord] =
    useState<BloodPressureRecordWithClassification | null>(null);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    setValue,
    watch,
  } = useForm<PressureFormValues>({
    defaultValues: {
      period: defaultPeriod,
      symptoms: [],
    },
  });

  const selectedPeriod = watch('period');
  const selectedSymptoms = watch('symptoms') ?? [];

  async function submit(values: PressureFormValues) {
    setFormError(null);
    setSavedRecord(null);

    const parsed = pressureInputSchema.safeParse({
      ...values,
      heartRate: values.heartRate ?? null,
      symptoms: values.symptoms ?? [],
      notes: values.notes?.trim() || null,
    });

    if (!parsed.success) {
      setValidationErrors(mapZodErrors(parsed.error));
      return;
    }

    setValidationErrors({});

    try {
      const record = await onSave(parsed.data);
      setSavedRecord(record);
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : 'Nao foi possivel salvar o registro agora.',
      );
    }
  }

  return (
    <form
      className="grid min-w-0 max-w-full gap-7"
      onSubmit={handleSubmit(submit)}
      noValidate
    >
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">
          Brupress
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-none tracking-normal">
          Registrar pressao
        </h1>
        <p className="mt-4 text-base leading-7 text-secondary">
          Como esta a pressao agora?
        </p>
      </header>

      <section aria-labelledby="period-title">
        <h2 className="mb-3 text-sm font-semibold text-primary" id="period-title">
          Periodo
        </h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {(['morning', 'evening'] as const).map((period) => (
            <button
              aria-pressed={selectedPeriod === period}
              className={
                selectedPeriod === period
                  ? 'min-h-12 min-w-0 rounded-md border border-accent bg-accent text-base font-semibold text-white'
                  : 'min-h-12 min-w-0 rounded-md border border-line bg-surface text-base font-semibold text-primary'
              }
              key={period}
              onClick={() => setValue('period', period)}
              type="button"
            >
              {periodLabels[period]}
            </button>
          ))}
        </div>
        <input type="hidden" {...register('period')} />
      </section>

      <section aria-labelledby="pressure-title">
        <h2 className="mb-3 text-sm font-semibold text-primary" id="pressure-title">
          Pressao arterial
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Input
            error={validationErrors.systolic}
            inputMode="numeric"
            label="Sistolica"
            placeholder="118"
            unit="mmHg"
            {...register('systolic', { setValueAs: parseRequiredNumber })}
          />
          <Input
            error={validationErrors.diastolic}
            inputMode="numeric"
            label="Diastolica"
            placeholder="76"
            unit="mmHg"
            {...register('diastolic', { setValueAs: parseRequiredNumber })}
          />
        </div>
      </section>

      <Input
        error={validationErrors.heartRate}
        helperText="Opcional"
        inputMode="numeric"
        label="Batimentos"
        placeholder="82"
        unit="bpm"
        {...register('heartRate', { setValueAs: parseOptionalNumber })}
      />

      <div>
        <SymptomChips
          onChange={(symptoms) => setValue('symptoms', symptoms)}
          selected={selectedSymptoms}
        />
        {validationErrors.symptoms ? (
          <p className="mt-2 text-sm font-medium text-accent">
            {validationErrors.symptoms}
          </p>
        ) : null}
      </div>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-primary">
          Observacao
        </span>
        <textarea
          className="min-h-28 w-full min-w-0 resize-none rounded-md border border-line bg-surface px-4 py-3 text-base leading-7 text-primary outline-none transition-colors placeholder:text-secondary/70 focus:border-accent focus:ring-2 focus:ring-accent/30"
          placeholder="Opcional"
          {...register('notes')}
        />
      </label>

      {savedRecord ? (
        <section
          className="rounded-md border border-line bg-surface p-4"
          role="status"
        >
          <div className="mb-3">
            <StatusBadge tone={savedRecord.classification}>
              Tudo salvo por aqui.
            </StatusBadge>
          </div>
          <p className="text-3xl font-semibold">
            {savedRecord.systolic}/{savedRecord.diastolic}
            <span className="ml-2 text-base font-medium text-secondary">
              mmHg
            </span>
          </p>
          <p className="mt-3 text-base leading-7 text-secondary">
            {classificationSuccessMessages[savedRecord.classification]}
          </p>
        </section>
      ) : null}

      {formError ? (
        <p className="rounded-md border border-accent bg-accent-soft p-4 text-sm font-semibold text-accent">
          {formError}
        </p>
      ) : null}

      <div className="grid gap-3">
        <Button disabled={isSubmitting} fullWidth type="submit">
          {isSubmitting ? 'Salvando...' : 'Salvar registro'}
        </Button>
        {onCancel ? (
          <Button fullWidth onClick={onCancel} variant="secondary">
            Voltar
          </Button>
        ) : null}
      </div>
    </form>
  );
}
