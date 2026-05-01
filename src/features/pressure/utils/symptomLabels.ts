import type { Symptom } from '../types/pressure';

export const symptomLabels: Record<Symptom, string> = {
  strong_headache: 'Dor de cabeca forte',
  blurred_vision: 'Visao embacada',
  bright_spots: 'Pontos brilhantes na visao',
  upper_abdominal_pain: 'Dor na parte alta da barriga',
  important_nausea_or_vomiting: 'Nauseas ou vomitos importantes',
  face_swelling: 'Inchaco repentino no rosto',
  hand_swelling: 'Inchaco repentino nas maos',
  feet_swelling: 'Inchaco repentino nos pes',
  shortness_of_breath: 'Falta de ar',
  chest_pain: 'Dor no peito',
  reduced_baby_movements: 'Reducao importante dos movimentos do bebe',
  dizziness: 'Tontura',
  none: 'Nenhum sintoma',
};

export const symptomOptions = Object.entries(symptomLabels).map(
  ([value, label]) => ({
    value: value as Symptom,
    label,
  }),
);

