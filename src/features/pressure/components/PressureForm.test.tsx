import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { PressureForm } from './PressureForm';
import type {
  BloodPressureRecordWithClassification,
  PressureInput,
} from '../types/pressure';

const savedRecord: BloodPressureRecordWithClassification = {
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

async function fillRequiredFields(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Sistolica'), '118');
  await user.type(screen.getByLabelText('Diastolica'), '76');
  await user.type(screen.getByLabelText('Batimentos'), '82');
}

describe('PressureForm', () => {
  it('renders the main fields', () => {
    render(<PressureForm onSave={vi.fn()} />);

    expect(screen.getByRole('heading', { name: 'Registrar pressao' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Manha' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Noite' })).toBeInTheDocument();
    expect(screen.getByLabelText('Sistolica')).toBeInTheDocument();
    expect(screen.getByLabelText('Diastolica')).toBeInTheDocument();
    expect(screen.getByLabelText('Batimentos')).toBeInTheDocument();
    expect(screen.getByText('Algum sintoma agora?')).toBeInTheDocument();
  });

  it('shows validation error when pressure is invalid', async () => {
    const user = userEvent.setup();
    render(<PressureForm onSave={vi.fn()} />);

    await user.type(screen.getByLabelText('Sistolica'), '76');
    await user.type(screen.getByLabelText('Diastolica'), '118');
    await user.click(screen.getByRole('button', { name: 'Salvar registro' }));

    expect(
      await screen.findByText('A sistolica deve ser maior que a diastolica.'),
    ).toBeInTheDocument();
  });

  it('calls save when values are valid', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn(
      async (input: PressureInput): Promise<BloodPressureRecordWithClassification> => ({
        ...savedRecord,
        period: input.period,
        systolic: input.systolic,
        diastolic: input.diastolic,
        heart_rate: input.heartRate,
        symptoms: input.symptoms,
        notes: input.notes,
      }),
    );
    render(<PressureForm defaultPeriod="morning" onSave={onSave} />);
    await fillRequiredFields(user);

    await user.click(screen.getByRole('button', { name: 'Salvar registro' }));

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledWith({
        period: 'morning',
        systolic: 118,
        diastolic: 76,
        heartRate: 82,
        symptoms: [],
        notes: null,
      });
    });
  });

  it('normalizes none symptom when selected after another symptom', async () => {
    const user = userEvent.setup();
    render(<PressureForm onSave={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: 'Tontura' }));
    await user.click(screen.getByRole('button', { name: 'Nenhum sintoma' }));

    expect(screen.getByRole('button', { name: 'Nenhum sintoma' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: 'Tontura' })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });

  it('shows success feedback after saving', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn(async () => savedRecord);
    render(<PressureForm onSave={onSave} />);

    await user.type(screen.getByLabelText('Sistolica'), '118');
    await user.type(screen.getByLabelText('Diastolica'), '76');
    await user.click(screen.getByRole('button', { name: 'Salvar registro' }));

    expect(await screen.findByText('Tudo salvo por aqui.')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Registro salvo. Pressao dentro da faixa esperada definida inicialmente.',
      ),
    ).toBeInTheDocument();
  });

  it('shows save errors', async () => {
    const user = userEvent.setup();
    render(<PressureForm onSave={vi.fn(async () => Promise.reject(new Error('Falha ao salvar.')))} />);

    await user.type(screen.getByLabelText('Sistolica'), '118');
    await user.type(screen.getByLabelText('Diastolica'), '76');
    await user.click(screen.getByRole('button', { name: 'Salvar registro' }));

    expect(await screen.findByText('Falha ao salvar.')).toBeInTheDocument();
  });
});
