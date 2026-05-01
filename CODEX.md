# Brupress - Documentacao Viva

## Objetivo do Projeto

Brupress e um app web pessoal, mobile-first, para registrar a pressao arterial da Bruna durante a gestacao. O objetivo e permitir registros rapidos de manha e noite, com uma experiencia simples, bonita, confiavel e sem cara de sistema hospitalar.

## Escopo Atual

Etapa atual: **Etapa 1 - Setup concluida**.

O foco inicial e preparar a base tecnica do projeto:

- React + Vite + TypeScript.
- Tailwind CSS.
- Vitest e React Testing Library.
- Estrutura inicial de pastas.
- `.env.example` com variaveis do Supabase.
- Design tokens CSS inspirados na referencia visual.
- Teste inicial passando.

## Plano de Execucao

1. Criar e manter este `CODEX.md` antes de implementar funcionalidades.
2. Concluir a Etapa 1 com setup minimo, teste inicial, typecheck e build.
3. Atualizar este arquivo ao final da etapa com decisoes, problemas e proximos passos.
4. Avancar para a Etapa 2 apenas com testes passando.

## Decisoes Tecnicas

- Stack inicial: React, Vite, TypeScript, Tailwind CSS, Vitest, React Testing Library.
- O app sera SPA simples, sem backend proprio e sem autenticacao.
- Supabase sera acessado pelo frontend usando `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
- A classificacao da pressao sera calculada no frontend, evitando duplicacao no banco neste momento.
- A interface sera mobile-first, com largura maxima aproximada de 430px.
- A documentacao viva sera atualizada a cada decisao relevante ou conclusao de etapa.

## Estrutura do Projeto

Estrutura alvo inicial:

```text
src/
  app/
    App.tsx
  components/
  features/
    pressure/
      components/
      services/
      tests/
      types/
      utils/
  lib/
  styles/
    globals.css
```

## Modelo de Dados

Modelo alvo para Supabase, a ser criado na Etapa 3:

```sql
create table blood_pressure_records (
  id uuid primary key default gen_random_uuid(),
  measured_at timestamptz not null default now(),
  period text not null check (period in ('morning', 'evening')),
  systolic integer not null check (systolic between 60 and 250),
  diastolic integer not null check (diastolic between 30 and 160),
  heart_rate integer check (heart_rate between 30 and 220),
  symptoms text[] not null default '{}',
  notes text,
  created_at timestamptz not null default now()
);
```

## Regras de Negocio

- A pressao deve ser registrada duas vezes ao dia: manha e noite.
- Antes de 12h, o periodo sugerido sera manha.
- A partir de 12h, o periodo sugerido sera noite.
- A usuaria podera alterar manualmente o periodo.
- Sistólica, diastólica e periodo sao obrigatorios.
- Batimentos, sintomas e observacao sao opcionais.
- Sistólica deve estar entre 60 e 250.
- Diastólica deve estar entre 30 e 160.
- Batimentos, quando informado, deve estar entre 30 e 220.
- Sistólica deve ser maior que diastólica.
- "Nenhum sintoma" nao pode coexistir com outros sintomas.
- O app nao deve emitir diagnostico medico.

## Classificacao Visual

Regras iniciais:

```ts
if (systolic >= 160 || diastolic >= 110) {
  classification = "severe";
} else if (systolic >= 140 || diastolic >= 90) {
  classification = "attention";
} else {
  classification = "normal";
}
```

Limites sao referencias iniciais e devem ser ajustaveis futuramente conforme orientacao medica.

## Supabase e Seguranca

Como nao havera login, o frontend usara a anon key do Supabase. Isso simplifica o uso familiar e reduz complexidade, mas exige politicas de seguranca cuidadosas no banco.

Trade-offs documentados:

- Qualquer regra de escrita precisa ser protegida no Supabase, nao no frontend.
- Sem autenticacao, nao ha separacao real por usuario.
- A chave anon nao deve ter permissao ampla alem do necessario.

Melhoria futura possivel: substituir escrita direta pelo frontend por uma Supabase Edge Function com token privado e validacoes server-side.

## Criterios de Aceite

Etapa 1 sera aceita quando:

- O app rodar localmente com Vite.
- Um teste inicial passar.
- TypeScript estiver sem erros.
- Build de producao passar.
- Tailwind estiver configurado.
- Tokens visuais estiverem definidos em CSS.
- `.env.example` existir com variaveis do Supabase.
- `README.md` mencionar Brupress e setup basico.
- Este `CODEX.md` estiver atualizado.

## Definition of Done

Uma etapa so pode ser considerada concluida quando:

- Codigo implementado.
- Testes adicionados ou atualizados.
- Testes passando.
- TypeScript sem erros.
- Lint sem erros, se configurado.
- UI validada em viewport mobile quando houver UI relevante.
- `CODEX.md` atualizado.
- `.env.example` atualizado, se necessario.
- Nenhuma complexidade desnecessaria adicionada.
- Fluxo principal da etapa funcionando de ponta a ponta.

## Historico de Decisoes

- 2026-05-01: Inicio do projeto com metodologia por etapas e documentacao viva.
- 2026-05-01: Decidido iniciar por setup manual do Vite/React para manter controle sobre arquivos e dependencias.
- 2026-05-01: Configurado React 19, Vite 6, TypeScript, Tailwind CSS 3, Vitest e React Testing Library.
- 2026-05-01: Definidos tokens visuais iniciais em `src/styles/globals.css` seguindo fundo off-white, contraste forte e vermelho pontual.
- 2026-05-01: Criado teste inicial de renderizacao do shell Brupress.

## Pendencias

- Iniciar Etapa 2 com tipos e regras de dominio testadas.
- Criar migration SQL na Etapa 3.
- Implementar UI real das telas nas Etapas 4 a 7.

## Proximos Passos

- Iniciar Etapa 2 com tipos e regras de dominio testadas.
- Criar os tipos `PressurePeriod`, `PressureClassification`, `Symptom` e `BloodPressureRecord`.
- Implementar e testar classificacao, validacao, periodo sugerido e normalizacao de sintomas.

## Problemas Encontrados e Solucoes Aplicadas

- `rg --files` falhou com acesso negado no ambiente Windows. Solucao: usar `Get-ChildItem` do PowerShell para inspecao inicial.
- `vite.config.ts` falhou no typecheck porque `defineConfig` foi importado de `vite`, que nao reconhece a chave `test`. Solucao: importar `defineConfig` de `vitest/config`.

## Validacao da Etapa 1

- `npm install`: concluido sem vulnerabilidades reportadas.
- `npm run test`: passou com 1 arquivo e 1 teste.
- `npm run typecheck`: passou.
- `npm run build`: passou.

Etapa 1 concluida em 2026-05-01. A proxima etapa so deve comecar mantendo esta base verde.
