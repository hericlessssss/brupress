import { describe, expect, it } from 'vitest';
import {
  formatBrazilDayLabel,
  formatBrazilFullDate,
  formatBrazilTime,
  getBrazilDateKey,
  getBrazilHour,
} from '../utils/brazilDate';

describe('brazilDate', () => {
  it('formats date keys and hours using Brazil time', () => {
    const date = new Date('2026-05-02T02:30:00.000Z');

    expect(getBrazilDateKey(date)).toBe('2026-05-01');
    expect(getBrazilHour(date)).toBe(23);
    expect(formatBrazilTime(date)).toBe('23:30');
  });

  it('formats the full date for the home header', () => {
    expect(formatBrazilFullDate(new Date('2026-05-01T15:00:00.000Z'))).toBe(
      'sexta-feira, 01 de maio de 2026',
    );
  });

  it('labels today and yesterday using Brazil date keys', () => {
    const reference = new Date('2026-05-02T02:30:00.000Z');

    expect(
      formatBrazilDayLabel(new Date('2026-05-02T01:00:00.000Z'), reference),
    ).toBe('Hoje');
    expect(
      formatBrazilDayLabel(new Date('2026-04-30T18:00:00.000Z'), reference),
    ).toBe('Ontem');
  });
});
