import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PressureCard } from './PressureCard';
import type { BloodPressureRecordWithClassification } from '../features/pressure/types/pressure';

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

describe('PressureCard', () => {
  it('renders pressure value and classification', () => {
    render(<PressureCard record={record} />);

    expect(screen.getByText('118/76')).toBeInTheDocument();
    expect(screen.getByText('Normal')).toBeInTheDocument();
    expect(screen.getByText('82 bpm')).toBeInTheDocument();
  });
});

