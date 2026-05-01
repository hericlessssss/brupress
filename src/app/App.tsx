import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { HomePage } from '../features/pressure/components/HomePage';
import { PressureHistory } from '../features/pressure/components/PressureHistory';
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

type AppView = 'home' | 'register' | 'history';

function getInitialView(): AppView {
  if (typeof window !== 'undefined') {
    const view = new URLSearchParams(window.location.search).get('view');

    if (view === 'register' || view === 'history') {
      return view;
    }
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

  if (view === 'history') {
    return (
      <PressureHistory records={records} onBack={() => setView('home')} />
    );
  }

  return (
    <HomePage
      onOpenHistory={() => setView('history')}
      onRegister={() => setView('register')}
      records={records}
    />
  );
}
