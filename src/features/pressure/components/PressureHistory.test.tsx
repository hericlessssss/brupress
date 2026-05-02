import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PressureHistory } from './PressureHistory';
import type { BloodPressureRecordWithClassification } from '../types/pressure';

const record: BloodPressureRecordWithClassification = {
  id: 'record-id',
  measured_at: '2026-05-01T11:30:00.000Z',
  period: 'morning',
  systolic: 118,
  diastolic: 76,
  heart_rate: 82,
  symptoms: ['dizziness'],
  notes: null,
  created_at: '2026-05-01T11:31:00.000Z',
  classification: 'normal',
};

const eveningRecord: BloodPressureRecordWithClassification = {
  ...record,
  id: 'evening-record',
  measured_at: '2026-05-01T23:30:00.000Z',
  period: 'evening',
  systolic: 124,
  diastolic: 80,
};

describe('PressureHistory', () => {
  it('renders empty state when there are no records', () => {
    render(<PressureHistory records={[]} />);

    expect(screen.getByText('Nenhum registro no historico.')).toBeInTheDocument();
    expect(
      screen.getByText('As medicoes salvas vao aparecer aqui.'),
    ).toBeInTheDocument();
  });

  it('renders a list of records grouped by day', () => {
    vi.setSystemTime(new Date('2026-05-01T15:00:00.000Z'));

    render(<PressureHistory records={[record]} />);

    expect(screen.getByRole('heading', { name: 'Historico' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Historico detalhado' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Historico resumido' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Hoje' })).toBeInTheDocument();
    expect(screen.getByText('118/76')).toBeInTheDocument();
    expect(screen.getByText('82 bpm')).toBeInTheDocument();
    expect(screen.getByText('Tontura')).toBeInTheDocument();
    expect(screen.getByText('Normal')).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('renders a compact summary table in the summary tab', async () => {
    const user = userEvent.setup();

    render(<PressureHistory records={[record, eveningRecord]} />);

    await user.click(screen.getByRole('tab', { name: 'Historico resumido' }));

    expect(screen.getByText('Data')).toBeInTheDocument();
    expect(screen.getByText('Hora')).toBeInTheDocument();
    expect(screen.getByText('Medicao')).toBeInTheDocument();
    expect(screen.getByText('Periodo')).toBeInTheDocument();
    expect(screen.getByText('118/76')).toBeInTheDocument();
    expect(screen.getByText('124/80')).toBeInTheDocument();
    expect(screen.getByText('08:30')).toBeInTheDocument();
    expect(screen.getByText('20:30')).toBeInTheDocument();
    expect(screen.getByText('Manha')).toBeInTheDocument();
    expect(screen.getByText('Noite')).toBeInTheDocument();
    expect(screen.getAllByText('01/05')).toHaveLength(2);
  });

  it('calls back action', async () => {
    const onBack = vi.fn();
    const user = userEvent.setup();

    render(<PressureHistory onBack={onBack} records={[]} />);

    await user.click(screen.getByRole('button', { name: 'Voltar' }));

    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
