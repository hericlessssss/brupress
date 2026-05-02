import { useCallback, useEffect, useRef, useState } from 'react';
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
type RecordsStatus = 'idle' | 'loading' | 'ready' | 'error';

function getInitialView(): AppView {
  if (typeof window !== 'undefined') {
    const view = new URLSearchParams(window.location.search).get('view');

    if (view === 'register' || view === 'history') {
      return view;
    }
  }

  return 'home';
}

function hasSupabaseConfig() {
  if (import.meta.env.MODE === 'test') {
    return false;
  }

  return Boolean(
    import.meta.env.VITE_SUPABASE_URL &&
      (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
        import.meta.env.VITE_SUPABASE_ANON_KEY),
  );
}

async function getPressureService() {
  const { supabase } = await import('../lib/supabase');

  return createPressureService(
    supabase as unknown as PressureSupabaseClient<BloodPressureRecord>,
  );
}

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  message: string,
): Promise<T> {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  const timeout = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error(message)), timeoutMs);
  });

  try {
    return await Promise.race([promise, timeout]);
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

export function App() {
  const [records, setRecords] = useState<
    BloodPressureRecordWithClassification[]
  >([]);
  const [view, setView] = useState<AppView>(getInitialView);
  const [recordsStatus, setRecordsStatus] = useState<RecordsStatus>(
    hasSupabaseConfig() ? 'loading' : 'ready',
  );
  const [recordsError, setRecordsError] = useState<string | null>(null);
  const [saveFeedback, setSaveFeedback] =
    useState<BloodPressureRecordWithClassification | null>(null);
  const isMountedRef = useRef(false);

  const loadRecords = useCallback(async () => {
    if (!hasSupabaseConfig()) {
      if (!isMountedRef.current) {
        return;
      }

      setRecordsStatus('ready');
      setRecordsError(null);
      return;
    }

    if (!isMountedRef.current) {
      return;
    }

    setRecordsStatus('loading');
    setRecordsError(null);

    try {
      const pressureService = await getPressureService();
      const loadedRecords = await withTimeout(
        pressureService.listRecords(),
        8000,
        'Supabase loading timed out.',
      );

      if (!isMountedRef.current) {
        return;
      }

      setRecords(loadedRecords);
      setRecordsStatus('ready');
    } catch {
      if (!isMountedRef.current) {
        return;
      }

      setRecordsStatus('error');
      setRecordsError(
        'Nao foi possivel carregar os registros. Confira se a tabela do Supabase ja foi criada.',
      );
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    void loadRecords();

    return () => {
      isMountedRef.current = false;
    };
  }, [loadRecords]);

  async function saveRecord(input: PressureInput) {
    try {
      const pressureService = await getPressureService();
      const savedRecord = await withTimeout(
        pressureService.createRecord(input),
        10000,
        'Supabase save timed out.',
      );

      setRecords((currentRecords) => [savedRecord, ...currentRecords]);
      setRecordsStatus('ready');
      setRecordsError(null);
      return savedRecord;
    } catch {
      throw new Error(
        'Nao foi possivel salvar o registro agora. Confira a conexao e se o banco esta preparado.',
      );
    }
  }

  if (view === 'register') {
    return (
      <AppShell>
        <PressureForm
          onCancel={() => setView('home')}
          onSave={async (input) => {
            const savedRecord = await saveRecord(input);
            setSaveFeedback(savedRecord);
            setView('home');
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
      onOpenHistory={() => {
        setSaveFeedback(null);
        setView('history');
      }}
      onRegister={() => {
        setSaveFeedback(null);
        setView('register');
      }}
      isLoading={recordsStatus === 'loading'}
      loadError={recordsError}
      onRetry={loadRecords}
      records={records}
      saveFeedback={saveFeedback}
    />
  );
}
