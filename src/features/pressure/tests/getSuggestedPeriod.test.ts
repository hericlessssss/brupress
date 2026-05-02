import { describe, expect, it } from 'vitest';
import { getSuggestedPeriod } from '../utils/getSuggestedPeriod';

describe('getSuggestedPeriod', () => {
  it('suggests morning before 12h in Brazil time', () => {
    expect(getSuggestedPeriod(new Date('2026-05-01T14:59:00.000Z'))).toBe(
      'morning',
    );
  });

  it('suggests afternoon from 12h to before 18h in Brazil time', () => {
    expect(getSuggestedPeriod(new Date('2026-05-01T15:00:00.000Z'))).toBe(
      'afternoon',
    );
    expect(getSuggestedPeriod(new Date('2026-05-01T20:59:00.000Z'))).toBe(
      'afternoon',
    );
  });

  it('suggests evening from 18h in Brazil time', () => {
    expect(getSuggestedPeriod(new Date('2026-05-01T21:00:00.000Z'))).toBe(
      'evening',
    );
  });
});
