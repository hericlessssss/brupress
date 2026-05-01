# Brupress - Documentacao Viva

## Objetivo do Projeto

Brupress e um app web pessoal, mobile-first, para registrar a pressao arterial da Bruna durante a gestacao. O objetivo e permitir registros rapidos de manha e noite, com uma experiencia simples, bonita, confiavel e sem cara de sistema hospitalar.

## Escopo Atual

Etapa atual: **Etapa 5 - Tela inicial concluida**.

O foco inicial e preparar a base tecnica do projeto:

- React + Vite + TypeScript.
- Tailwind CSS.
- Vitest e React Testing Library.
- Estrutura inicial de pastas.
- `.env.example` com variaveis do Supabase.
- Design tokens CSS inspirados na referencia visual.
- Teste inicial passando.

Etapa 2 concluiu as regras puras de dominio:

- Tipos de pressao, periodo, sintomas e registro.
- Classificacao visual da pressao.
- Validacao dos campos obrigatorios e intervalos.
- Sugestao automatica de periodo.
- Normalizacao de sintomas.

Etapa 3 concluiu a base de persistencia:

- Migration SQL para `blood_pressure_records`.
- Client Supabase em `src/lib/supabase.ts`.
- `pressureService` isolado da UI e testado com client mockado.
- `.env.example` atualizado com URL, publishable key e anon key.

Etapa 4 concluiu a base visual:

- `AppShell` mobile-first com largura controlada.
- Componentes base: `Button`, `Input`, `StatusBadge`, `PressureCard` e `SymptomChips`.
- Labels dos sintomas em `symptomLabels`.
- Tela temporaria do `App` usando os componentes para validar linguagem visual.

Etapa 5 concluiu a tela inicial:

- Home real com nome Brupress, saudacao do dia e status manha/noite.
- Estado vazio para ausencia de registros.
- Ultimo registro quando houver dados.
- Resumo simples dos ultimos 7 dias.
- Botoes principais para registrar pressao e ver historico.

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
- As regras de dominio ficam em funcoes puras dentro de `src/features/pressure/utils`, sem acoplamento com UI ou Supabase.
- A validacao usa Zod para compartilhar a mesma regra entre formulario futuro e testes.
- O `pressureService` recebe um client Supabase por injecao, permitindo testes sem rede e mantendo componentes desacoplados do banco.
- A chave preferencial no frontend passa a ser `VITE_SUPABASE_PUBLISHABLE_KEY`; `VITE_SUPABASE_ANON_KEY` permanece como fallback por compatibilidade.
- Os componentes base sao controlados por props simples e nao acessam Supabase diretamente.
- A UI base prioriza composicao mobile de uma coluna; grades em duas colunas ficam reservadas para telas maiores.
- `SymptomChips` usa `normalizeSymptoms` para manter a regra de "Nenhum sintoma" consistente tambem na interacao visual.
- A home recebe registros por props e ainda nao busca Supabase diretamente. Isso evita acoplamento prematuro enquanto a migration remota nao foi aplicada.
- O `App` renderiza a home em estado vazio, sem dados ficticios de pressao.

## Estrutura do Projeto

Estrutura alvo inicial:

```text
src/
  app/
    App.tsx
  components/
    AppShell.tsx
    Button.tsx
    Input.tsx
    PressureCard.tsx
    StatusBadge.tsx
    SymptomChips.tsx
  features/
    pressure/
      components/
        HomePage.tsx
        PressureSummary.tsx
        TodayStatus.tsx
      services/
        pressureService.ts
      tests/
      types/
        pressure.ts
      utils/
        classifyPressure.ts
        getSuggestedPeriod.ts
        normalizeSymptoms.ts
        symptomLabels.ts
        pressureStats.ts
        validatePressure.ts
  lib/
    supabase.ts
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

Arquivo versionado: `supabase/migrations/20260501134000_create_blood_pressure_records.sql`.

A migration tambem cria indices por `measured_at` e por `period, measured_at`, habilita RLS e adiciona policies anonimas de leitura e insercao para o fluxo sem login.

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
- As chaves reais foram colocadas apenas em `.env.local`, que esta ignorado pelo Git.
- A migration atual permite leitura e insercao anonimas. Isso atende ao escopo sem login, mas nao impede que alguem com a chave publica tente escrever dados se conhecer a estrutura.

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
- 2026-05-01: Criadas regras de dominio como funcoes puras para facilitar testes e evitar acoplamento prematuro com UI ou Supabase.
- 2026-05-01: Decidido usar Zod para validacao dos dados de registro de pressao.
- 2026-05-01: Criada migration Supabase com RLS e policies anonimas simples para manter o escopo sem login.
- 2026-05-01: Criado `pressureService` com injecao de client para facilitar testes e evitar Supabase direto nos componentes.
- 2026-05-01: Adicionado suporte a `VITE_SUPABASE_PUBLISHABLE_KEY`, mantendo `VITE_SUPABASE_ANON_KEY` como fallback.
- 2026-05-01: Criada UI base com componentes pequenos, sem biblioteca visual adicional.
- 2026-05-01: Ajustado layout mobile para evitar overflow horizontal em badges e inputs.
- 2026-05-01: Criada tela inicial como componente puro que recebe registros por props.
- 2026-05-01: Decidido manter o `App` em estado vazio ate implementar carregamento real do Supabase, para nao exibir dados ficticios.

## Pendencias

- Implementar UI real das telas nas Etapas 6 e 7.
- Aplicar a migration no projeto Supabase quando houver decisao operacional de executar o SQL remoto.
- Conectar a home ao `pressureService` quando a leitura remota for ativada.

## Proximos Passos

- Iniciar Etapa 6 com tela de registro.
- Criar formulario com validacao, sintomas e feedback de sucesso/erro.
- Conectar fluxo de salvar ao `pressureService`, mantendo testes com mock.

## Problemas Encontrados e Solucoes Aplicadas

- `rg --files` falhou com acesso negado no ambiente Windows. Solucao: usar `Get-ChildItem` do PowerShell para inspecao inicial.
- `vite.config.ts` falhou no typecheck porque `defineConfig` foi importado de `vite`, que nao reconhece a chave `test`. Solucao: importar `defineConfig` de `vitest/config`.

## Validacao da Etapa 1

- `npm install`: concluido sem vulnerabilidades reportadas.
- `npm run test`: passou com 1 arquivo e 1 teste.
- `npm run typecheck`: passou.
- `npm run build`: passou.

Etapa 1 concluida em 2026-05-01. A proxima etapa so deve comecar mantendo esta base verde.

## Validacao da Etapa 2

- `npm run test`: passou com 5 arquivos e 19 testes.
- `npm run typecheck`: passou.
- `npm run build`: passou.

Etapa 2 concluida em 2026-05-01. A proxima etapa e Supabase, mantendo a UI ainda desacoplada do banco.

## Validacao da Etapa 3

- `npm run test`: passou com 6 arquivos e 24 testes.
- `npm run typecheck`: passou.
- `npm run build`: passou.

Etapa 3 concluida em 2026-05-01. A migration foi criada, mas nao foi aplicada remotamente nesta etapa porque o projeto ainda nao recebeu uma rotina operacional de deploy do banco.

## Validacao da Etapa 4

- `npm run test`: passou com 11 arquivos e 32 testes.
- `npm run typecheck`: passou.
- `npm run build`: passou.
- UI validada em captura mobile headless de 430px usando Chrome local em `http://127.0.0.1:5174`.

Etapa 4 concluida em 2026-05-01. A tela atual ainda e uma composicao temporaria para validar os componentes base; a tela inicial real sera criada na Etapa 5.

## Validacao da Etapa 5

- `npm run test`: passou com 13 arquivos e 38 testes.
- `npm run typecheck`: passou.
- `npm run build`: passou.
- UI validada em captura mobile headless de 430px usando Chrome local em `http://127.0.0.1:5174`.

Etapa 5 concluida em 2026-05-01. A home esta pronta como tela inicial visual e funcional por props; a persistencia real entra no fluxo de registro e carregamento posterior.
