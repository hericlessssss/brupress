import type { PressurePeriod } from '../types/pressure';

export function getSuggestedPeriod(date = new Date()): PressurePeriod {
  return date.getHours() < 12 ? 'morning' : 'evening';
}

