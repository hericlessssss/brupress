import {
  endOfDay,
  isWithinInterval,
  startOfDay,
  subDays,
} from 'date-fns';
import type {
  BloodPressureRecordWithClassification,
  PressurePeriod,
} from '../types/pressure';

export interface TodayPeriodStatus {
  period: PressurePeriod;
  done: boolean;
  record?: BloodPressureRecordWithClassification;
}

export interface SevenDaySummary {
  averageSystolic: number | null;
  averageDiastolic: number | null;
  highestSystolic: number | null;
  highestDiastolic: number | null;
  recordCount: number;
}

export function getTodayPeriodStatus(
  records: BloodPressureRecordWithClassification[],
  date = new Date(),
): TodayPeriodStatus[] {
  const dayStart = startOfDay(date);
  const dayEnd = endOfDay(date);
  const todayRecords = records.filter((record) =>
    isWithinInterval(new Date(record.measured_at), {
      start: dayStart,
      end: dayEnd,
    }),
  );

  return (['morning', 'evening'] as const).map((period) => {
    const record = todayRecords.find((item) => item.period === period);

    return {
      period,
      done: Boolean(record),
      record,
    };
  });
}

export function getLastRecord(
  records: BloodPressureRecordWithClassification[],
) {
  return [...records].sort(
    (first, second) =>
      new Date(second.measured_at).getTime() -
      new Date(first.measured_at).getTime(),
  )[0];
}

export function getSevenDaySummary(
  records: BloodPressureRecordWithClassification[],
  date = new Date(),
): SevenDaySummary {
  const interval = {
    start: startOfDay(subDays(date, 6)),
    end: endOfDay(date),
  };
  const recentRecords = records.filter((record) =>
    isWithinInterval(new Date(record.measured_at), interval),
  );

  if (recentRecords.length === 0) {
    return {
      averageSystolic: null,
      averageDiastolic: null,
      highestSystolic: null,
      highestDiastolic: null,
      recordCount: 0,
    };
  }

  const totals = recentRecords.reduce(
    (accumulator, record) => ({
      systolic: accumulator.systolic + record.systolic,
      diastolic: accumulator.diastolic + record.diastolic,
    }),
    { systolic: 0, diastolic: 0 },
  );

  return {
    averageSystolic: Math.round(totals.systolic / recentRecords.length),
    averageDiastolic: Math.round(totals.diastolic / recentRecords.length),
    highestSystolic: Math.max(
      ...recentRecords.map((record) => record.systolic),
    ),
    highestDiastolic: Math.max(
      ...recentRecords.map((record) => record.diastolic),
    ),
    recordCount: recentRecords.length,
  };
}

