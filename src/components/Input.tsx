import { forwardRef, type InputHTMLAttributes } from 'react';
import { classNames } from '../lib/classNames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  unit?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, helperText, id, label, unit, ...props }, ref) => {
    const inputId = id ?? props.name ?? label;
    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;

    return (
      <div className="block">
        <label
          className="mb-2 block text-sm font-semibold text-primary"
          htmlFor={inputId}
        >
          {label}
        </label>
        <span className="relative block">
          <input
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            aria-invalid={Boolean(error)}
            className={classNames(
              'min-h-14 w-full rounded-md border bg-surface px-4 py-3 text-2xl font-semibold text-primary outline-none transition-colors placeholder:text-secondary/70 focus:border-accent focus:ring-2 focus:ring-accent/30',
              error ? 'border-accent' : 'border-line',
              unit && 'pr-24',
              className,
            )}
            id={inputId}
            ref={ref}
            {...props}
          />
          {unit ? (
            <span className="pointer-events-none absolute inset-y-0 right-8 flex items-center text-sm font-semibold text-secondary">
              {unit}
            </span>
          ) : null}
        </span>
        {error ? (
          <span className="mt-2 block text-sm font-medium text-accent" id={errorId}>
            {error}
          </span>
        ) : helperText ? (
          <span className="mt-2 block text-sm text-secondary" id={helperId}>
            {helperText}
          </span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
