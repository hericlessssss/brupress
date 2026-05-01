import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders an accessible input with label', () => {
    render(<Input label="Sistolica" name="systolic" />);

    expect(screen.getByLabelText('Sistolica')).toBeInTheDocument();
  });

  it('marks input as invalid when error is present', () => {
    render(
      <Input
        error="A sistolica deve ser maior que a diastolica."
        label="Sistolica"
        name="systolic"
      />,
    );

    expect(screen.getByLabelText('Sistolica')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
    expect(
      screen.getByText('A sistolica deve ser maior que a diastolica.'),
    ).toBeInTheDocument();
  });
});

