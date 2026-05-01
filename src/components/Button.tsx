import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { classNames } from '../lib/classNames';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'border-accent bg-accent text-white hover:bg-primary hover:border-primary',
  secondary:
    'border-primary bg-transparent text-primary hover:bg-primary hover:text-surface',
  ghost:
    'border-transparent bg-transparent text-secondary hover:text-primary hover:bg-background/60',
};

export function Button({
  children,
  className,
  fullWidth,
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        'inline-flex min-h-12 items-center justify-center rounded-md border px-5 py-3 text-base font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        fullWidth && 'w-full',
        className,
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

