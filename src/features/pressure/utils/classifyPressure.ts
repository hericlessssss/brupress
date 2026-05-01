import type { PressureClassification } from '../types/pressure';

interface PressureValues {
  systolic: number;
  diastolic: number;
}

export function classifyPressure({
  systolic,
  diastolic,
}: PressureValues): PressureClassification {
  if (systolic >= 160 || diastolic >= 110) {
    return 'severe';
  }

  if (systolic >= 140 || diastolic >= 90) {
    return 'attention';
  }

  return 'normal';
}

