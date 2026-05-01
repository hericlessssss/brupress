import { endOfDay, startOfDay } from 'date-fns';
import { classifyPressure } from '../utils/classifyPressure';
import type {
  BloodPressureRecord,
  BloodPressureRecordWithClassification,
  PressureInput,
} from '../types/pressure';

const TABLE_NAME = 'blood_pressure_records';

interface SupabaseResponse<T> {
  data: T | null;
  error: { message: string } | null;
}

interface SupabaseQueryBuilder<TRecord> {
  insert(value: unknown): SupabaseQueryBuilder<TRecord>;
  select(columns?: string): SupabaseQueryBuilder<TRecord>;
  single(): Promise<SupabaseResponse<TRecord>>;
  order(
    column: string,
    options?: { ascending?: boolean },
  ): SupabaseQueryBuilder<TRecord>;
  limit(count: number): SupabaseQueryBuilder<TRecord>;
  gte(column: string, value: string): SupabaseQueryBuilder<TRecord>;
  lte(column: string, value: string): SupabaseQueryBuilder<TRecord>;
  then<TResult1 = SupabaseResponse<TRecord[]>, TResult2 = never>(
    onfulfilled?:
      | ((value: SupabaseResponse<TRecord[]>) => TResult1 | PromiseLike<TResult1>)
      | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): PromiseLike<TResult1 | TResult2>;
}

export interface PressureSupabaseClient<TRecord> {
  from(table: typeof TABLE_NAME): SupabaseQueryBuilder<TRecord>;
}

type CreateRecordInput = PressureInput & {
  measuredAt?: Date;
};

type DatabaseBloodPressureRecord = BloodPressureRecord;

function withClassification(
  record: DatabaseBloodPressureRecord,
): BloodPressureRecordWithClassification {
  return {
    ...record,
    classification: classifyPressure({
      systolic: record.systolic,
      diastolic: record.diastolic,
    }),
  };
}

function toInsertPayload(input: CreateRecordInput) {
  return {
    measured_at: (input.measuredAt ?? new Date()).toISOString(),
    period: input.period,
    systolic: input.systolic,
    diastolic: input.diastolic,
    heart_rate: input.heartRate ?? null,
    symptoms: input.symptoms,
    notes: input.notes?.trim() || null,
  };
}

function assertNoSupabaseError<T>(
  response: SupabaseResponse<T>,
  fallbackMessage: string,
): T {
  if (response.error) {
    throw new Error(response.error.message);
  }

  if (!response.data) {
    throw new Error(fallbackMessage);
  }

  return response.data;
}

export function createPressureService(
  client: PressureSupabaseClient<DatabaseBloodPressureRecord>,
) {
  return {
    async createRecord(
      input: CreateRecordInput,
    ): Promise<BloodPressureRecordWithClassification> {
      const response = await client
        .from(TABLE_NAME)
        .insert(toInsertPayload(input))
        .select('*')
        .single();

      const record = assertNoSupabaseError(
        response,
        'Supabase did not return the created pressure record.',
      );

      return withClassification(record);
    },

    async listRecords(): Promise<BloodPressureRecordWithClassification[]> {
      const response = await client
        .from(TABLE_NAME)
        .select('*')
        .order('measured_at', { ascending: false });

      const records = assertNoSupabaseError(
        response,
        'Supabase did not return pressure records.',
      );

      return records.map(withClassification);
    },

    async listTodayRecords(
      date = new Date(),
    ): Promise<BloodPressureRecordWithClassification[]> {
      const response = await client
        .from(TABLE_NAME)
        .select('*')
        .gte('measured_at', startOfDay(date).toISOString())
        .lte('measured_at', endOfDay(date).toISOString())
        .order('measured_at', { ascending: false });

      const records = assertNoSupabaseError(
        response,
        'Supabase did not return today pressure records.',
      );

      return records.map(withClassification);
    },

    async getRecentRecords(
      limit = 10,
    ): Promise<BloodPressureRecordWithClassification[]> {
      const response = await client
        .from(TABLE_NAME)
        .select('*')
        .order('measured_at', { ascending: false })
        .limit(limit);

      const records = assertNoSupabaseError(
        response,
        'Supabase did not return recent pressure records.',
      );

      return records.map(withClassification);
    },
  };
}

