# Brupress

App pessoal, simples e mobile-first para registrar a pressao arterial durante a gestacao.

## Setup

```bash
npm install
npm run dev
```

Crie um `.env` local com base em `.env.example`:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_ANON_KEY=
```

Use `VITE_SUPABASE_PUBLISHABLE_KEY` quando disponivel. `VITE_SUPABASE_ANON_KEY` fica como compatibilidade com a nomenclatura anterior do Supabase.

Antes do uso real, aplique no Supabase o SQL versionado em `supabase/migrations/20260501134000_create_blood_pressure_records.sql`.

O app exibe datas e horarios em `America/Sao_Paulo`; o banco grava `measured_at` como `timestamptz` para preservar o momento exato da medicao.

## Scripts

- `npm run dev`: inicia o Vite.
- `npm run test`: executa os testes.
- `npm run typecheck`: valida TypeScript.
- `npm run build`: gera build de producao.

## Documentacao viva

As decisoes, regras de negocio, pendencias e Definition of Done ficam em `CODEX.md`.
