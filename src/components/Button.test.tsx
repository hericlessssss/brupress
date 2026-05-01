import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders a primary button by default', () => {
    render(<Button>Registrar pressao</Button>);

    expect(
      screen.getByRole('button', { name: 'Registrar pressao' }),
    ).toBeInTheDocument();
  });

  it('uses button type by default', () => {
    render(<Button>Salvar</Button>);

    expect(screen.getByRole('button', { name: 'Salvar' })).toHaveAttribute(
      'type',
      'button',
    );
  });
});

