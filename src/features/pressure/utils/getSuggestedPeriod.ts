import type { PressurePeriod } from '../types/pressure';
import { getBrazilHour } from './brazilDate';

export function getSuggestedPeriod(date = new Date()): PressurePeriod {
  const brazilHour = getBrazilHour(date);

  if (brazilHour < 12) {
    return 'morning';
  }

  if (brazilHour < 18) {
    return 'afternoon';
  }

  return 'evening';
}
