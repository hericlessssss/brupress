import type { BloodPressureRecordWithClassification } from '../types/pressure';
import { formatBrazilDayLabel, getBrazilDateKey } from './brazilDate';

export interface PressureHistoryDay {
  dateKey: string;
  label: string;
  records: BloodPressureRecordWithClassification[];
}

export function groupHistoryByDay(
  records: BloodPressureRecordWithClassification[],
): PressureHistoryDay[] {
  const sortedRecords = [...records].sort(
    (first, second) =>
      new Date(second.measured_at).getTime() -
      new Date(first.measured_at).getTime(),
  );

  return sortedRecords.reduce<PressureHistoryDay[]>((groups, record) => {
    const measuredAt = new Date(record.measured_at);
    const dateKey = getBrazilDateKey(measuredAt);
    const currentGroup = groups.find((group) => group.dateKey === dateKey);

    if (currentGroup) {
      currentGroup.records.push(record);
      return groups;
    }

    groups.push({
      dateKey,
      label: formatBrazilDayLabel(measuredAt),
      records: [record],
    });

    return groups;
  }, []);
}
