import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('renders status text', () => {
    render(<StatusBadge tone="attention">Atencao</StatusBadge>);

    expect(screen.getByText('Atencao')).toBeInTheDocument();
  });
});

