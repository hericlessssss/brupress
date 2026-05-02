create table if not exists public.blood_pressure_records (
  id uuid primary key default gen_random_uuid(),

  measured_at timestamptz not null default now(),
  period text not null check (period in ('morning', 'afternoon', 'evening')),

  systolic integer not null check (systolic between 60 and 250),
  diastolic integer not null check (diastolic between 30 and 160),
  heart_rate integer check (heart_rate between 30 and 220),

  symptoms text[] not null default '{}',
  notes text,

  created_at timestamptz not null default now(),

  constraint blood_pressure_systolic_gt_diastolic check (systolic > diastolic)
);

create index if not exists blood_pressure_records_measured_at_idx
  on public.blood_pressure_records (measured_at desc);

create index if not exists blood_pressure_records_period_measured_at_idx
  on public.blood_pressure_records (period, measured_at desc);

alter table public.blood_pressure_records enable row level security;

create policy "Allow anonymous reads for Brupress records"
  on public.blood_pressure_records
  for select
  to anon
  using (true);

create policy "Allow anonymous inserts for Brupress records"
  on public.blood_pressure_records
  for insert
  to anon
  with check (true);
