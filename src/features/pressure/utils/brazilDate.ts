export const BRAZIL_TIME_ZONE = 'America/Sao_Paulo';

const brazilDateFormatter = new Intl.DateTimeFormat('en-CA', {
  day: '2-digit',
  month: '2-digit',
  timeZone: BRAZIL_TIME_ZONE,
  year: 'numeric',
});

const brazilHourFormatter = new Intl.DateTimeFormat('en-US', {
  hour: '2-digit',
  hour12: false,
  timeZone: BRAZIL_TIME_ZONE,
});

export function getBrazilDateKey(date = new Date()) {
  return brazilDateFormatter.format(date);
}

export function getBrazilHour(date = new Date()) {
  return Number(brazilHourFormatter.format(date));
}

export function formatBrazilFullDate(date = new Date()) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    timeZone: BRAZIL_TIME_ZONE,
    weekday: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatBrazilTime(date: Date | string) {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: BRAZIL_TIME_ZONE,
  }).format(new Date(date));
}

export function formatBrazilDayLabel(date: Date, referenceDate = new Date()) {
  const dateKey = getBrazilDateKey(date);
  const todayKey = getBrazilDateKey(referenceDate);
  const yesterdayKey = getBrazilDateKey(
    new Date(referenceDate.getTime() - 24 * 60 * 60 * 1000),
  );

  if (dateKey === todayKey) {
    return 'Hoje';
  }

  if (dateKey === yesterdayKey) {
    return 'Ontem';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    timeZone: BRAZIL_TIME_ZONE,
  }).format(date);
}
