# Brupress - Documentacao Viva

## Objetivo do Projeto

Brupress e um app web pessoal, mobile-first, para registrar a pressao arterial da Bruna durante a gestacao. O objetivo e permitir registros rapidos de manha e noite, com uma experiencia simples, bonita, confiavel e sem cara de sistema hospitalar.

## Escopo Atual

Etapa atual: **Alinhamento do header restaurado**.

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

- Home real com nome Brupress, saudacao pessoal, data do Brasil e status manha/tarde/noite.
- Bloco de status do dia com linhas compactas e indicadores em formato de checkbox visual.
- Estado vazio para ausencia de registros.
- Ultimo registro quando houver dados.
- Resumo com visao semanal e total do app.
- Botoes principais para registrar pressao e ver historico.

Etapa 6 concluiu a tela de registro:

- Formulario mobile-first com periodo, sistolica, diastolica, batimentos, sintomas e observacao.
- Validacao usando o schema Zod existente.
- Normalizacao de observacao vazia para `null`.
- Feedback de sucesso com valor registrado e mensagem por classificacao.
- Feedback de erro quando o Supabase nao salva.
- Navegacao simples entre home e registro sem adicionar roteador.
- Apos salvamento com sucesso, o app volta para a home e mostra feedback de sucesso com o valor salvo, evitando duplo clique no mesmo formulario.

Etapa 7 concluiu o historico:

- Lista de registros agrupada por dia.
- Estado vazio para ausencia de registros.
- Exibicao de horario, valor, batimentos, sintomas e classificacao visual.
- Navegacao simples entre home e historico.
- Abas para alternar entre historico detalhado e historico resumido.
- Historico detalhado exibe no maximo 10 medicoes inicialmente, com acao discreta "Ver mais" para carregar mais 10.
- Historico resumido em formato compacto, uma medicao por linha, com data, hora, valor destacado e periodo.

Etapa 8 concluiu o polimento inicial:

- Carregamento remoto de registros no `App` via `pressureService.listRecords`.
- Estados de sincronizacao e erro recuperavel na home.
- Timeout de leitura e salvamento para evitar loading indefinido.
- Ajuste responsivo do `AppShell` em viewport mobile estreito.
- `AppShell` voltou a usar largura fluida em celulares reais, com padding externo pequeno e `max-width` apenas como limite.
- Teste de navegacao entre telas principais.
- Reset de scroll para o topo sempre que a tela ativa muda.

Ajuste pre-migration concluiu:

- Inclusao do periodo `afternoon` para status e registro da tarde.
- Sugestao automatica de periodo baseada no horario de `America/Sao_Paulo`.
- Data de hoje exibida na home usando horario do Brasil.
- Historico e ultimo registro formatam horario em `America/Sao_Paulo`.
- Migration SQL atualizada antes de aplicacao remota para aceitar `morning`, `afternoon` e `evening`.

Correcao de fluxo pos-salvamento concluiu:

- O formulario nao permanece na tela depois de salvar com sucesso.
- A home exibe "Registro salvo com sucesso", valor registrado e confirmacao curta.
- O feedback de sucesso e limpo ao abrir novo registro ou historico.

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
- A home recebe registros por props e nao acessa Supabase diretamente. O `App` centraliza o carregamento remoto e injeta os dados nos componentes.
- O `App` renderiza a home em estado vazio, sem dados ficticios de pressao.
- O topo da home inicia com "Ola Bruna!", com "Ola" em sans bold e "Bruna" em serifada italica vermelha para dar acento pessoal sem adicionar fonte externa.
- O bloco de status do dia usa colunas fixas para periodo e checkbox visual, mantendo todos os indicadores com o mesmo tamanho e proximos do texto.
- Titulos e valores de destaque usam `font-display`, peso bold e `text-heading`; subtitulos continuam em `text-secondary`.
- `--text-primary` foi suavizado e `--text-heading` foi criado para evitar preto absoluto nos titulos sem aproximar demais dos subtitulos.
- O formulario recebe `onSave` por prop para manter testes sem rede.
- A navegacao apos salvar deve voltar para a home, nao permanecer no formulario, para impedir envio duplicado por novo clique no botao de salvar.
- A navegacao entre telas deve sempre resetar o scroll para o topo, evitando que historico, home ou formulario reabram na posicao anterior.
- O `App` carrega o client Supabase apenas no momento do salvamento, evitando erro de ambiente nos testes.
- Existem deep-links simples `?view=register` e `?view=history` para abrir telas sem roteador, usados tambem na validacao visual.
- O historico tambem e componente puro por props; ainda nao busca Supabase diretamente.
- O historico possui duas visualizacoes na mesma tela: detalhada para contexto clinico do registro e resumida para leitura rapida em consulta.
- A visualizacao resumida prioriza a medicao no centro da linha e mantem data, hora e periodo como colunas fixas.
- A visualizacao detalhada limita a quantidade inicial de medicoes para preservar leveza e leitura; a visualizacao resumida permanece completa para consulta medica.
- As abas do historico usam o mesmo componente `Button` da tela inicial para manter consistencia visual.
- O `App` so importa Supabase dinamicamente quando as variaveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` ou `VITE_SUPABASE_ANON_KEY` existem.
- Em `MODE=test`, o `App` nao inicia chamadas Supabase automaticamente, evitando rede e pendencias assincronas nos testes de componente.
- Leitura remota tem timeout de 8 segundos e salvamento tem timeout de 10 segundos, evitando estado de carregamento indefinido.
- O `AppShell` usa `w-full min-w-0`, centralizado, com limite inline `min(430px, calc(100vw - 1.5rem))`; o objetivo e preencher melhor smartphones estreitos sem passar do limite visual em telas maiores.
- O topo das telas principais usa `BrandHeader` reutilizavel. Quando chamado sem props, exibe apenas logo, icone e divisoria para historico e registro. Quando recebe `greeting`, `name`, `subtitle` e `date`, transforma-se em hero section completa na home, com saudacao pessoal em italico (tanto "Ola" quanto o nome), texto auxiliar e data alinhados verticalmente no mesmo bloco.
- A divisoria do `BrandHeader` ocupa a largura completa do bloco, alinhada ao logo; a linha superior limita logo e icone para manter o icone visivel no mobile.
- O resumo da home exibe duas caixas lado a lado: `Semanal` para ultimos 7 dias e `Total` para todos os registros carregados no app.
- O historico detalhado exibe batimentos, sintomas e observacao; sintomas nulos ou ausentes sao tratados como "Nenhum sintoma informado.".

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
        PressureHistory.tsx
        PressureForm.tsx
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
        classificationMessages.ts
        groupHistoryByDay.ts
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
  period text not null check (period in ('morning', 'afternoon', 'evening')),
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

- A pressao deve ser registrada tres vezes ao dia: manha, tarde e noite.
- Antes de 12h no horario de Sao Paulo, o periodo sugerido sera manha.
- De 12h ate antes de 18h no horario de Sao Paulo, o periodo sugerido sera tarde.
- A partir de 18h no horario de Sao Paulo, o periodo sugerido sera noite.
- A usuaria podera alterar manualmente o periodo.
- Sistólica, diastólica e periodo sao obrigatorios.
- Batimentos, sintomas e observacao sao opcionais.
- Sistólica deve estar entre 60 e 250.
- Diastólica deve estar entre 30 e 160.
- Batimentos, quando informado, deve estar entre 30 e 220.
- Sistólica deve ser maior que diastólica.
- "Nenhum sintoma" nao pode coexistir com outros sintomas.
- O app nao deve emitir diagnostico medico.
- `measured_at` grava o timestamp exato da medicao; a UI formata data e hora no fuso `America/Sao_Paulo` para status e historico.

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
- 2026-05-01: Criada tela de registro com `react-hook-form` e validacao manual via Zod, sem adicionar `@hookform/resolvers`.
- 2026-05-01: Decidido nao simular sucesso local quando o Supabase falha; o app mostra erro claro e so adiciona registro na home quando o Supabase retorna sucesso.
- 2026-05-01: Ajustado `AppShell` para largura mobile mais conservadora e padding direito maior, evitando corte em capturas de 390px.
- 2026-05-01: Criado historico como componente puro com agrupamento por dia em utilitario separado.
- 2026-05-01: Mantida navegacao simples por estado local em vez de introduzir roteador.
- 2026-05-02: Adicionado reset de scroll em toda troca de tela principal.
- 2026-05-01: Conectado carregamento remoto de registros no `App`, mantendo Supabase fora dos componentes.
- 2026-05-01: Adicionados estados de sincronizacao e erro recuperavel na home.
- 2026-05-01: Adicionados timeouts de leitura e salvamento para evitar loading indefinido quando a tabela remota ainda nao estiver pronta.
- 2026-05-01: Ajustado `AppShell` para evitar crop lateral em captura mobile de 390px.
- 2026-05-01: Desabilitadas chamadas Supabase automaticas em `MODE=test` para manter testes deterministas e sem rede.
- 2026-05-01: Adicionado periodo `afternoon` antes da migration remota ser aplicada.
- 2026-05-01: Decidido usar `America/Sao_Paulo` como fuso de exibicao e sugestao de periodo, mantendo `measured_at` como `timestamptz`.
- 2026-05-01: Corrigido fluxo pos-salvamento para redirecionar para a home com feedback, evitando registro duplicado por segundo clique no formulario.
- 2026-05-01: Adicionada aba de historico resumido em formato de lista tabular para facilitar avaliacao medica.
- 2026-05-01: Refinado historico resumido com coluna propria de hora, linhas mais compactas e botoes iguais aos da home.
- 2026-05-02: Limitado historico detalhado a 10 medicoes por vez com "Ver mais"; historico resumido continua exibindo todas as medicoes.
- 2026-05-01: Removido o titulo "Hoje" do topo da home e substituido por saudacao pessoal com destaque tipografico em "Bruna".
- 2026-05-02: Redesenhado o bloco de status do dia com indicadores retangulares, compactos e alinhados ao estilo dos botoes.
- 2026-05-02: Substituidos indicadores textuais do status do dia por checkboxes visuais compactos e automaticos.
- 2026-05-02: Criado `BrandHeader` para padronizar a marca Brupress no topo com titulo maior, divisoria discreta e icone vermelho.
- 2026-05-02: Refinada tipografia dos titulos com fonte display, peso bold e tom de heading mais suave que preto absoluto.
- 2026-05-02: Removida largura calculada do `AppShell`; adotada largura fluida para se adaptar melhor a diferentes smartphones reais.
- 2026-05-02: Reestruturado header da home como hero minimalista com logo, icone, divisoria e saudacao no mesmo bloco vertical.
- 2026-05-02: Refatorado `BrandHeader` para aceitar props opcionais, permitindo dois modos: simples (logo e icone) nas paginas de historico e registrar; completo (com saudacao) na home.
- 2026-05-02: Removido hardcoded "!" do nome na saudacao; "Ola" agora em italico sem negrito, igual a "Bruna!".
- 2026-05-16: Dividido resumo da home em caixas `Semanal` e `Total`, com medias, maior valor e contagem de registros.
- 2026-05-16: Historico detalhado passou a exibir observacao e a tratar sintomas de forma robusta quando ausentes.
- 2026-05-16: Ajustado `BrandHeader` para manter icone visivel e divisoria alinhada a direita em viewport mobile.
- 2026-05-16: Restaurado alinhamento da divisoria do header para iniciar junto ao logo, mantendo o icone visivel a direita.

## Pendencias

- Aplicar a migration no projeto Supabase quando houver decisao operacional de executar o SQL remoto.
- Testar salvamento real no Supabase depois que a migration remota for aplicada.
- Validar leitura real de registros no Supabase depois que a migration remota for aplicada.

## Proximos Passos

- Aplicar ou validar a migration remota antes do uso real.
- Fazer um teste manual de ponta a ponta com a tabela remota criada.
- Revisar se o deployment escolhido deve usar `VITE_SUPABASE_PUBLISHABLE_KEY` ou manter `VITE_SUPABASE_ANON_KEY` como fallback.

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

## Validacao da Etapa 6

- `npm run test`: passou com 14 arquivos e 44 testes.
- `npm run typecheck`: passou.
- `npm run build`: passou.
- UI de registro validada em captura mobile headless de 390px usando Chrome local em `http://127.0.0.1:5174/?view=register`.

Etapa 6 concluida em 2026-05-01. O formulario esta pronto e conectado ao `pressureService`; o salvamento real depende da tabela existir no Supabase remoto.

## Validacao da Etapa 7

- `npm run test`: passou com 16 arquivos e 48 testes.
- `npm run typecheck`: passou.
- `npm run build`: passou.
- UI de historico validada em captura mobile headless de 390px usando Chrome local em `http://127.0.0.1:5174/?view=history`.

Etapa 7 concluida em 2026-05-01. A tela de historico esta pronta para registros em memoria; falta conectar carregamento remoto e polir estados finais na Etapa 8.

## Validacao da Etapa 8

- `npm run test`: passou com 16 arquivos e 51 testes.
- `npm run typecheck`: passou.
- `npm run build`: passou.
- UI da home com estado de erro remoto validada em captura mobile headless de 390px usando Chrome local em `http://127.0.0.1:5175`.

Etapa 8 concluida em 2026-05-01. O app esta pronto para uso inicial do ponto de vista do frontend; o uso real com Supabase depende da migration remota estar aplicada.

## Validacao do Detalhe Final da Marca

- `npm run test`: passou com 17 arquivos e 59 testes.
- `npm run typecheck`: passou.
- `npm run build`: passou.
- UI da home validada em captura mobile headless de 390px usando Chrome local em `http://127.0.0.1:5175`.

Detalhe final concluido em 2026-05-02. O header de marca esta padronizado nas telas principais sem alterar o fluxo de uso.

## Validacao do Header Hero

- `npm run test`: passou com 17 arquivos e 59 testes.
- `npm run typecheck`: passou.
- `npm run build`: passou.
- UI da home validada em captura mobile headless de 390px usando Chrome local em `http://127.0.0.1:5175`.

Header hero concluido em 2026-05-02. O topo da home agora cresce naturalmente com logo, icone, divisoria, saudacao, texto auxiliar e data no mesmo bloco visual.

## Validacao da Restruturação do BrandHeader

- `npm run test`: passou com 17 arquivos e 59 testes.
- `npm run typecheck`: passou.
- `npm run build`: passou.
- UI da home validada com saudacao em italico (sem negrito no "Ola") em captura mobile headless de 390px.
- UI de historico validada com BrandHeader sem props (apenas logo, icone e divisoria) em captura mobile headless de 390px.
- UI de registro validada com BrandHeader sem props em captura mobile headless de 390px.

Restruturação concluida em 2026-05-02. O `BrandHeader` agora e modular: funciona como header simples nas paginas secundarias (historico e registro) e como hero section completa na home, removendo duplicacao de componentes e deixando ambas as visualizacoes coerentes.

## Validacao do Resumo Total e Historico Detalhado

- `npm run test`: passou com 17 arquivos e 60 testes.
- `npm run typecheck`: passou.
- `npm run build`: passou.
- UI da home validada em captura mobile headless de 390px e 1200px de altura usando Chrome local em `http://127.0.0.1:5175`.

Ajuste concluido em 2026-05-16. A home agora separa resumo semanal e total lado a lado, e o historico detalhado mostra observacoes e sintomas com fallback claro.

## Validacao do Alinhamento do Header

- `npm run test`: passou com 17 arquivos e 60 testes.
- `npm run typecheck`: passou.
- `npm run build`: passou.
- UI da home validada em captura mobile headless de 390px usando Chrome local em `http://127.0.0.1:5175`.

Alinhamento do header restaurado em 2026-05-16. A divisoria volta a comecar alinhada ao logo, e o icone permanece visivel no lado direito.
