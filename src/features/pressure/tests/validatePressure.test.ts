import { describe, expect, it } from 'vitest';
import { validatePressure } from '../utils/validatePressure';

const validInput = {
  period: 'morning',
  systolic: 118,
  diastolic: 76,
  heartRate: 82,
  symptoms: [],
};

describe('validatePressure', () => {
  it('accepts valid pressure input', () => {
    expect(validatePressure(validInput)).toEqual(validInput);
  });

  it('requires systolic pressure', () => {
    expect(() =>
      validatePressure({ ...validInput, systolic: undefined }),
    ).toThrow(/sistolica/i);
  });

  it('requires diastolic pressure', () => {
    expect(() =>
      validatePressure({ ...validInput, diastolic: undefined }),
    ).toThrow(/diastolica/i);
  });

  it('requires systolic pressure to be greater than diastolic', () => {
    expect(() =>
      validatePressure({ ...validInput, systolic: 76, diastolic: 118 }),
    ).toThrow(/maior que a diastolica/i);
  });

  it('rejects heart rate below range', () => {
    expect(() => validatePressure({ ...validInput, heartRate: 29 })).toThrow(
      /batimentos/i,
    );
  });

  it('rejects heart rate above range', () => {
    expect(() => validatePressure({ ...validInput, heartRate: 221 })).toThrow(
      /batimentos/i,
    );
  });

  it('rejects systolic values outside range', () => {
    expect(() => validatePressure({ ...validInput, systolic: 59 })).toThrow(
      /sistolica/i,
    );
    expect(() => validatePressure({ ...validInput, systolic: 251 })).toThrow(
      /sistolica/i,
    );
  });

  it('rejects diastolic values outside range', () => {
    expect(() => validatePressure({ ...validInput, diastolic: 29 })).toThrow(
      /diastolica/i,
    );
    expect(() => validatePressure({ ...validInput, diastolic: 161 })).toThrow(
      /diastolica/i,
    );
  });

  it('rejects none symptom combined with other symptoms', () => {
    expect(() =>
      validatePressure({
        ...validInput,
        symptoms: ['none', 'dizziness'],
      }),
    ).toThrow(/Nenhum sintoma/i);
  });
});

