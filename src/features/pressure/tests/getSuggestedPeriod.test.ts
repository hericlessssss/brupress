import { describe, expect, it } from 'vitest';
import { getSuggestedPeriod } from '../utils/getSuggestedPeriod';

describe('getSuggestedPeriod', () => {
  it('suggests morning before 12h', () => {
    expect(getSuggestedPeriod(new Date('2026-05-01T08:30:00'))).toBe(
      'morning',
    );
  });

  it('suggests evening after 12h', () => {
    expect(getSuggestedPeriod(new Date('2026-05-01T12:00:00'))).toBe(
      'evening',
    );
  });
});

