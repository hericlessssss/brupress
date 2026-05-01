import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SymptomChips } from './SymptomChips';

describe('SymptomChips', () => {
  it('renders symptom options', () => {
    render(<SymptomChips onChange={() => undefined} selected={[]} />);

    expect(
      screen.getByRole('button', { name: 'Dor de cabeca forte' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Nenhum sintoma' }),
    ).toBeInTheDocument();
  });

  it('normalizes none as the only selected symptom', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<SymptomChips onChange={onChange} selected={['dizziness']} />);

    await user.click(screen.getByRole('button', { name: 'Nenhum sintoma' }));

    expect(onChange).toHaveBeenCalledWith(['none']);
  });
});

