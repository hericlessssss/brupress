import { z } from 'zod';
import type { PressureInput } from '../types/pressure';

const symptomSchema = z.enum([
  'strong_headache',
  'blurred_vision',
  'bright_spots',
  'upper_abdominal_pain',
  'important_nausea_or_vomiting',
  'face_swelling',
  'hand_swelling',
  'feet_swelling',
  'shortness_of_breath',
  'chest_pain',
  'reduced_baby_movements',
  'dizziness',
  'none',
]);

export const pressureInputSchema = z
  .object({
    period: z.enum(['morning', 'afternoon', 'evening'], {
      required_error: 'Informe o periodo da medicao.',
    }),
    systolic: z
      .number({
        required_error: 'Informe a pressao sistolica.',
        invalid_type_error: 'Informe a pressao sistolica.',
      })
      .int('A pressao sistolica deve ser um numero inteiro.')
      .min(60, 'A pressao sistolica deve ser no minimo 60.')
      .max(250, 'A pressao sistolica deve ser no maximo 250.'),
    diastolic: z
      .number({
        required_error: 'Informe a pressao diastolica.',
        invalid_type_error: 'Informe a pressao diastolica.',
      })
      .int('A pressao diastolica deve ser um numero inteiro.')
      .min(30, 'A pressao diastolica deve ser no minimo 30.')
      .max(160, 'A pressao diastolica deve ser no maximo 160.'),
    heartRate: z
      .number({
        invalid_type_error: 'Informe os batimentos como numero.',
      })
      .int('Os batimentos devem ser um numero inteiro.')
      .min(30, 'Os batimentos devem ser no minimo 30.')
      .max(220, 'Os batimentos devem ser no maximo 220.')
      .nullable()
      .optional(),
    symptoms: z.array(symptomSchema).default([]),
    notes: z.string().trim().nullable().optional(),
  })
  .superRefine((value, context) => {
    if (value.systolic <= value.diastolic) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'A sistolica deve ser maior que a diastolica.',
        path: ['systolic'],
      });
    }

    if (value.symptoms.includes('none') && value.symptoms.length > 1) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Nenhum sintoma nao pode ser combinado com outros sintomas.',
        path: ['symptoms'],
      });
    }
  });

export function validatePressure(input: unknown): PressureInput {
  return pressureInputSchema.parse(input);
}
