import { describe, expect, it, vi } from 'vitest';
import type { BloodPressureRecordWithClassification } from '../types/pressure';
import { groupHistoryByDay } from '../utils/groupHistoryByDay';

function record(
  overrides: Partial<BloodPressureRecordWithClassification>,
): BloodPressureRecordWithClassification {
  return {
    id: overrides.id ?? 'record-id',
    measured_at: overrides.measured_at ?? '2026-05-01T11:00:00.000Z',
    period: overrides.period ?? 'morning',
    systolic: overrides.systolic ?? 118,
    diastolic: overrides.diastolic ?? 76,
    heart_rate: overrides.heart_rate ?? null,
    symptoms: overrides.symptoms ?? [],
    notes: overrides.notes ?? null,
    created_at: overrides.created_at ?? '2026-05-01T11:01:00.000Z',
    classification: overrides.classification ?? 'normal',
  };
}

describe('groupHistoryByDay', () => {
  it('groups and sorts records by day', () => {
    vi.setSystemTime(new Date('2026-05-01T15:00:00.000Z'));

    const groups = groupHistoryByDay([
      record({ id: 'older', measured_at: '2026-04-30T20:00:00.000Z' }),
      record({ id: 'newer', measured_at: '2026-05-01T20:00:00.000Z' }),
      record({ id: 'morning', measured_at: '2026-05-01T08:00:00.000Z' }),
    ]);

    expect(groups).toHaveLength(2);
    expect(groups[0]?.label).toBe('Hoje');
    expect(groups[0]?.records.map((item) => item.id)).toEqual([
      'newer',
      'morning',
    ]);
    expect(groups[1]?.label).toBe('Ontem');

    vi.useRealTimers();
  });
});

