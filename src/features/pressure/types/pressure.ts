export type PressurePeriod = 'morning' | 'evening';

export type PressureClassification = 'normal' | 'attention' | 'severe';

export type Symptom =
  | 'strong_headache'
  | 'blurred_vision'
  | 'bright_spots'
  | 'upper_abdominal_pain'
  | 'important_nausea_or_vomiting'
  | 'face_swelling'
  | 'hand_swelling'
  | 'feet_swelling'
  | 'shortness_of_breath'
  | 'chest_pain'
  | 'reduced_baby_movements'
  | 'dizziness'
  | 'none';

export interface BloodPressureRecord {
  id: string;
  measured_at: string;
  period: PressurePeriod;
  systolic: number;
  diastolic: number;
  heart_rate?: number | null;
  symptoms: Symptom[];
  notes?: string | null;
  created_at: string;
}

export interface BloodPressureRecordWithClassification
  extends BloodPressureRecord {
  classification: PressureClassification;
}

export interface PressureInput {
  period: PressurePeriod;
  systolic: number;
  diastolic: number;
  heartRate?: number | null;
  symptoms: Symptom[];
  notes?: string | null;
}

