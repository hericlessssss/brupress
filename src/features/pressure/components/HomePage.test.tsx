import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { HomePage } from './HomePage';
import type { BloodPressureRecordWithClassification } from '../types/pressure';

const record: BloodPressureRecordWithClassification = {
  id: 'record-id',
  measured_at: '2026-05-01T11:30:00.000Z',
  period: 'morning',
  systolic: 118,
  diastolic: 76,
  heart_rate: 82,
  symptoms: [],
  notes: null,
  created_at: '2026-05-01T11:31:00.000Z',
  classification: 'normal',
};

describe('HomePage', () => {
  it('renders day status and last pressure record', () => {
    render(
      <HomePage records={[record]} today={new Date('2026-05-01T15:00:00')} />,
    );

    expect(screen.getByText('Brupress')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Hoje' })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Status do dia' }),
    ).toBeInTheDocument();
    expect(screen.getAllByText('118/76')).toHaveLength(3);
    expect(screen.getByText('Registrado')).toBeInTheDocument();
    expect(screen.getByText('Pendente')).toBeInTheDocument();
  });

  it('renders empty state when there are no records', () => {
    render(<HomePage records={[]} today={new Date('2026-05-01T15:00:00')} />);

    expect(
      screen.getByText('Nenhuma medicao registrada ainda.'),
    ).toBeInTheDocument();
    expect(screen.getByText('O primeiro registro vai aparecer aqui.')).toBeInTheDocument();
  });

  it('calls home actions', async () => {
    const onRegister = vi.fn();
    const onOpenHistory = vi.fn();
    const user = userEvent.setup();

    render(
      <HomePage
        onOpenHistory={onOpenHistory}
        onRegister={onRegister}
        records={[]}
        today={new Date('2026-05-01T15:00:00')}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Registrar pressao' }));
    await user.click(screen.getByRole('button', { name: 'Ver historico' }));

    expect(onRegister).toHaveBeenCalledTimes(1);
    expect(onOpenHistory).toHaveBeenCalledTimes(1);
  });
});
