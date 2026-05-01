import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { HomePage } from '../features/pressure/components/HomePage';
import { PressureForm } from '../features/pressure/components/PressureForm';
import {
  createPressureService,
  type PressureSupabaseClient,
} from '../features/pressure/services/pressureService';
import type {
  BloodPressureRecord,
  BloodPressureRecordWithClassification,
  PressureInput,
} from '../features/pressure/types/pressure';

type AppView = 'home' | 'register';

function getInitialView(): AppView {
  if (
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('view') === 'register'
  ) {
    return 'register';
  }

  return 'home';
}

export function App() {
  const [records, setRecords] = useState<
    BloodPressureRecordWithClassification[]
  >([]);
  const [view, setView] = useState<AppView>(getInitialView);

  async function saveRecord(input: PressureInput) {
    const { supabase } = await import('../lib/supabase');
    const pressureService = createPressureService(
      supabase as unknown as PressureSupabaseClient<BloodPressureRecord>,
    );
    const savedRecord = await pressureService.createRecord(input);

    setRecords((currentRecords) => [savedRecord, ...currentRecords]);
    return savedRecord;
  }

  if (view === 'register') {
    return (
      <AppShell>
        <PressureForm
          onCancel={() => setView('home')}
          onSave={async (input) => {
            const savedRecord = await saveRecord(input);
            return savedRecord;
          }}
        />
      </AppShell>
    );
  }

  return (
    <HomePage
      onOpenHistory={() => undefined}
      onRegister={() => setView('register')}
      records={records}
    />
  );
}
