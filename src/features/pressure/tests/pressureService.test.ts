import { describe, expect, it } from 'vitest';
import {
  createPressureService,
  type PressureSupabaseClient,
} from '../services/pressureService';
import type { BloodPressureRecord } from '../types/pressure';

const baseRecord: BloodPressureRecord = {
  id: '7bf52e3c-7d8a-4d54-a142-87091f4182b1',
  measured_at: '2026-05-01T11:30:00.000Z',
  period: 'morning',
  systolic: 118,
  diastolic: 76,
  heart_rate: 82,
  symptoms: [],
  notes: null,
  created_at: '2026-05-01T11:31:00.000Z',
};

function createMockClient(data: BloodPressureRecord | BloodPressureRecord[]) {
  const calls: Array<{ method: string; args: unknown[] }> = [];

  const response = {
    data,
    error: null,
  };

  const builder = {
    insert(...args: unknown[]) {
      calls.push({ method: 'insert', args });
      return builder;
    },
    select(...args: unknown[]) {
      calls.push({ method: 'select', args });
      return builder;
    },
    single() {
      calls.push({ method: 'single', args: [] });
      return Promise.resolve(response);
    },
    order(...args: unknown[]) {
      calls.push({ method: 'order', args });
      return builder;
    },
    limit(...args: unknown[]) {
      calls.push({ method: 'limit', args });
      return builder;
    },
    gte(...args: unknown[]) {
      calls.push({ method: 'gte', args });
      return builder;
    },
    lte(...args: unknown[]) {
      calls.push({ method: 'lte', args });
      return builder;
    },
    then(
      onfulfilled: (value: typeof response) => unknown,
      onrejected?: (reason: unknown) => unknown,
    ) {
      return Promise.resolve(response).then(onfulfilled, onrejected);
    },
  };

  return {
    calls,
    client: {
      from(table: 'blood_pressure_records') {
        calls.push({ method: 'from', args: [table] });
        return builder;
      },
    } as PressureSupabaseClient<BloodPressureRecord>,
  };
}

describe('pressureService', () => {
  it('creates a record using Supabase payload shape', async () => {
    const { client, calls } = createMockClient(baseRecord);
    const service = createPressureService(client);

    const record = await service.createRecord({
      period: 'morning',
      systolic: 118,
      diastolic: 76,
      heartRate: 82,
      symptoms: [],
      notes: '  tudo bem  ',
      measuredAt: new Date('2026-05-01T11:30:00.000Z'),
    });

    expect(record.classification).toBe('normal');
    expect(calls).toContainEqual({
      method: 'from',
      args: ['blood_pressure_records'],
    });
    expect(calls).toContainEqual({
      method: 'insert',
      args: [
        {
          measured_at: '2026-05-01T11:30:00.000Z',
          period: 'morning',
          systolic: 118,
          diastolic: 76,
          heart_rate: 82,
          symptoms: [],
          notes: 'tudo bem',
        },
      ],
    });
  });

  it('lists records ordered by measured_at desc', async () => {
    const { client, calls } = createMockClient([baseRecord]);
    const service = createPressureService(client);

    const records = await service.listRecords();

    expect(records).toHaveLength(1);
    expect(records[0]?.classification).toBe('normal');
    expect(calls).toContainEqual({
      method: 'order',
      args: ['measured_at', { ascending: false }],
    });
  });

  it('lists today records within the selected day', async () => {
    const { client, calls } = createMockClient([baseRecord]);
    const service = createPressureService(client);

    await service.listTodayRecords(new Date('2026-05-01T15:00:00.000Z'));

    expect(calls).toContainEqual({
      method: 'gte',
      args: ['measured_at', '2026-05-01T03:00:00.000Z'],
    });
    expect(calls).toContainEqual({
      method: 'lte',
      args: ['measured_at', '2026-05-02T02:59:59.999Z'],
    });
  });

  it('limits recent records', async () => {
    const { client, calls } = createMockClient([baseRecord]);
    const service = createPressureService(client);

    await service.getRecentRecords(3);

    expect(calls).toContainEqual({ method: 'limit', args: [3] });
  });

  it('throws Supabase errors', async () => {
    const calls: Array<{ method: string; args: unknown[] }> = [];
    const builder = {
      insert: () => builder,
      select: () => builder,
      single: () =>
        Promise.resolve({ data: null, error: { message: 'insert failed' } }),
    };
    const client = {
      from(table: 'blood_pressure_records') {
        calls.push({ method: 'from', args: [table] });
        return builder;
      },
    } as unknown as PressureSupabaseClient<BloodPressureRecord>;
    const service = createPressureService(client);

    await expect(
      service.createRecord({
        period: 'morning',
        systolic: 118,
        diastolic: 76,
        symptoms: [],
      }),
    ).rejects.toThrow('insert failed');
  });
});
