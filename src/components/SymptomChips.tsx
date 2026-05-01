import { normalizeSymptoms } from '../features/pressure/utils/normalizeSymptoms';
import { symptomOptions } from '../features/pressure/utils/symptomLabels';
import type { Symptom } from '../features/pressure/types/pressure';
import { classNames } from '../lib/classNames';

interface SymptomChipsProps {
  selected: Symptom[];
  onChange: (symptoms: Symptom[]) => void;
}

export function SymptomChips({ onChange, selected }: SymptomChipsProps) {
  function toggleSymptom(symptom: Symptom) {
    const nextSymptoms = selected.includes(symptom)
      ? selected.filter((value) => value !== symptom)
      : [...selected, symptom];

    onChange(normalizeSymptoms(nextSymptoms));
  }

  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold text-primary">
        Algum sintoma agora?
      </legend>
      <div className="flex flex-wrap gap-2">
        {symptomOptions.map((symptom) => {
          const isSelected = selected.includes(symptom.value);

          return (
            <button
              aria-pressed={isSelected}
              className={classNames(
                'min-h-10 rounded-full border px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface',
                isSelected
                  ? 'border-accent bg-accent text-white'
                  : 'border-line bg-surface text-primary hover:border-accent',
              )}
              key={symptom.value}
              onClick={() => toggleSymptom(symptom.value)}
              type="button"
            >
              {symptom.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

