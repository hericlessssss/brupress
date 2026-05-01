import { classNames } from '../lib/classNames';
import type { PressureClassification } from '../features/pressure/types/pressure';

type StatusBadgeTone = PressureClassification | 'pending' | 'done';

interface StatusBadgeProps {
  tone: StatusBadgeTone;
  children: string;
}

const toneClasses: Record<StatusBadgeTone, string> = {
  normal: 'border-primary/30 bg-surface text-primary',
  attention: 'border-accent/40 bg-accent-soft text-accent',
  severe: 'border-accent bg-accent text-white',
  pending: 'border-line bg-background text-secondary',
  done: 'border-primary bg-primary text-surface',
};

export function StatusBadge({ children, tone }: StatusBadgeProps) {
  return (
    <span
      className={classNames(
        'inline-flex min-h-8 shrink-0 items-center whitespace-nowrap rounded-full border px-3 text-sm font-semibold',
        toneClasses[tone],
      )}
    >
      {children}
    </span>
  );
}
