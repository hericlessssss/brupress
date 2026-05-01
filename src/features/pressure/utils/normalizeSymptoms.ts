import type { Symptom } from '../types/pressure';

export function normalizeSymptoms(symptoms: Symptom[]): Symptom[] {
  const uniqueSymptoms = [...new Set(symptoms)];

  if (uniqueSymptoms.includes('none')) {
    return ['none'];
  }

  return uniqueSymptoms;
}

