import { isToday, isYesterday } from 'date-fns';
import type { BloodPressureRecordWithClassification } from '../types/pressure';

export interface PressureHistoryDay {
  dateKey: string;
  label: string;
  records: BloodPressureRecordWithClassification[];
}

function formatDayLabel(date: Date) {
  if (isToday(date)) {
    return 'Hoje';
  }

  if (isYesterday(date)) {
    return 'Ontem';
  }

  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
  });
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
    const dateKey = measuredAt.toISOString().slice(0, 10);
    const currentGroup = groups.find((group) => group.dateKey === dateKey);

    if (currentGroup) {
      currentGroup.records.push(record);
      return groups;
    }

    groups.push({
      dateKey,
      label: formatDayLabel(measuredAt),
      records: [record],
    });

    return groups;
  }, []);
}

