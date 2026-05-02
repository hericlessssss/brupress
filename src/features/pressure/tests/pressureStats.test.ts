import { describe, expect, it } from 'vitest';
import type { BloodPressureRecordWithClassification } from '../types/pressure';
import {
  getLastRecord,
  getSevenDaySummary,
  getTodayPeriodStatus,
} from '../utils/pressureStats';

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

describe('pressureStats', () => {
  it('marks morning, afternoon and evening status for the selected day', () => {
    const statuses = getTodayPeriodStatus(
      [
        record({ id: 'morning', period: 'morning' }),
        record({
          id: 'afternoon',
          period: 'afternoon',
          measured_at: '2026-05-01T18:00:00.000Z',
        }),
        record({
          id: 'yesterday-evening',
          period: 'evening',
          measured_at: '2026-04-30T23:00:00.000Z',
        }),
      ],
      new Date('2026-05-01T15:00:00.000Z'),
    );

    expect(statuses).toEqual([
      expect.objectContaining({ period: 'morning', done: true }),
      expect.objectContaining({ period: 'afternoon', done: true }),
      expect.objectContaining({ period: 'evening', done: false }),
    ]);
  });

  it('returns the latest record', () => {
    expect(
      getLastRecord([
        record({ id: 'older', measured_at: '2026-05-01T08:00:00.000Z' }),
        record({ id: 'newer', measured_at: '2026-05-01T20:00:00.000Z' }),
      ])?.id,
    ).toBe('newer');
  });

  it('summarizes records from the last seven days', () => {
    const summary = getSevenDaySummary(
      [
        record({ systolic: 118, diastolic: 76 }),
        record({
          systolic: 130,
          diastolic: 84,
          measured_at: '2026-04-27T12:00:00.000Z',
        }),
        record({
          systolic: 150,
          diastolic: 92,
          measured_at: '2026-04-20T12:00:00.000Z',
        }),
      ],
      new Date('2026-05-01T15:00:00.000Z'),
    );

    expect(summary).toEqual({
      averageSystolic: 124,
      averageDiastolic: 80,
      highestSystolic: 130,
      highestDiastolic: 84,
      recordCount: 2,
    });
  });
});
