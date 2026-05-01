import { describe, expect, it } from 'vitest';
import { classifyPressure } from '../utils/classifyPressure';

describe('classifyPressure', () => {
  it('classifies normal pressure', () => {
    expect(classifyPressure({ systolic: 118, diastolic: 76 })).toBe('normal');
  });

  it('classifies attention pressure by systolic value', () => {
    expect(classifyPressure({ systolic: 140, diastolic: 80 })).toBe(
      'attention',
    );
  });

  it('classifies attention pressure by diastolic value', () => {
    expect(classifyPressure({ systolic: 130, diastolic: 90 })).toBe(
      'attention',
    );
  });

  it('classifies severe pressure by systolic value', () => {
    expect(classifyPressure({ systolic: 160, diastolic: 88 })).toBe('severe');
  });

  it('classifies severe pressure by diastolic value', () => {
    expect(classifyPressure({ systolic: 138, diastolic: 110 })).toBe('severe');
  });
});

