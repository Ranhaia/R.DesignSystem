# Log resumido — Loop 80/20 Templates

> Condensado de `PLANO-LOOP-80-20-TEMPLATES.md` em 2026-07-30. Histórico
> completo (narração dia-a-dia) descartado deste repositório — recuperável
> via `git log -p` se necessário. Plano ativo: `plans/current/loop-80-20-templates.md`.

### 2026-07-20 — Fase 0 e Fase 1 concluídas

- Categorização dos 60 componentes aprovada por Rafael sem ajustes;
  `src/lib/atomic-registry.ts` criado (slug → categoria + lista "em
  construção"), validado 1:1 contra `components-registry.ts`.
- Navegação (`nav-components.tsx`) reagrupada por Atoms/Molecules/
  Organisms, com páginas-índice novas (`/atoms`, `/molecules`,
  `/organisms`).

### 2026-07-20 — Fases 2, 3 e 4 concluídas (modo autônomo)

- Atoms/Molecules/Organisms do Template de dashboard confirmados via
  grep de export (sem criar componente novo). Template completo montado
  direto em `/templates/dashboard-financeiro` (não em `/teste-padrao`,
  que já tinha outro conteúdo do Rafael — decisão provisória registrada).
- Verificação só estrutural nesta rodada (sem dev server disponível);
  visual ficou pendente pro Rafael conferir depois.

### 2026-07-20 — Ajuste de UX na navegação (Fase 1)

- Grupos da nav (Atoms/Molecules/Organisms/Outros) viraram accordion
  (`Collapsible`) sem competir com o clique no nome do grupo (que
  continua linkando pra página-índice).

### 2026-07-20 — Ícone por categoria na navegação

- Ícone só por categoria (não por item individual, como Rafael corrigiu
  no meio do pedido) — `categoryIcons` em `nav-components.tsx`.

### 2026-07-20 — Ícone + tooltip no modo recolhido (ícone-only)

- Corrigido: ícone de categoria sumia junto com o label no modo
  recolhido da sidebar. Agora mostra só o ícone com `Tooltip`. De
  brinde: breadcrumb do topo passou a nomear as páginas novas em vez de
  mostrar o path bruto.

### 2026-07-20 — Template de documentação do Button replicado pros 58 componentes

- `component-docs.ts` ganhou entrada completa pros 58 componentes
  (Atoms/Molecules/Organisms) — `description`/`whenToUse`/
  `doGuidelines`/`dontGuidelines` como placeholder `"[a preencher]"`
  (regra fixa: conteúdo narrativo é do Rafael, não da IA); `anatomy`/
  `variants`/`states`/`sizes`/`props` reais, derivados do código-fonte.
- Achado e corrigido: página de componente sempre renderizava um
  `<Button>` genérico nas seções Variantes/Tamanhos — criado
  `variant-preview.tsx` (registro por slug do componente real).

### 2026-07-20 — Playground genericizado (12 componentes)

- Playground genérico criado pra 12 componentes com variant/size reais
  na raiz (`generic-playground.tsx`) — critério programático (script
  Node), não escolha arbitrária. Button manteve Playground dedicado
  (tem controle "Loading" específico).

### 2026-07-21 — Fase 5 antecipada: os 15 Patterns construídos do zero

- Os 15 Patterns do mapa original (Empty State, Loading, Error State,
  CRUD, Multi-step Form, Upload, etc.) implementados como componentes
  funcionais reais em `src/components/patterns/`, com foco/`aria-live`
  de verdade nos que têm transição de estado — não só documentação.
  `patterns-registry.ts`, `pattern-docs.ts`, `/patterns` e
  `/patterns/[slug]` criados no mesmo padrão de `/components/[slug]`.
- Verificação de tipos não rodou nesta sessão (sandbox indisponível) —
  ficou pendente, fechada na entrada seguinte.

### 2026-07-21 — Hierarquia final: Patterns fica entre Organisms e Templates

- Ordem final confirmada com Rafael: Foundations → Atoms → Molecules →
  Organisms → Patterns → Templates. Nav reordenada; 3 rótulos de
  composição errados em `pattern-docs.ts` corrigidos (Alert é Molecule,
  Popover é Atom). `tsc --noEmit` limpo.

### 2026-07-21 — Taxonomia por função (proposta) + decisão de arquitetura: Storybook híbrido

- **Decisão de arquitetura confirmada:** Storybook pra Atoms/Molecules/
  Organisms/Patterns (controles automáticos, auditoria de acessibilidade
  via axe-core); Next.js só pra Templates/Jornadas (precisa de
  navegação real pra teste de usabilidade). Rafael instalou o Storybook
  ele mesmo.
- Taxonomia por função (8 categorias) proposta e documentada em
  `docs/active/especificacoes/taxonomia-componentes.md` — **ainda não
  aplicada** em nenhum registro de dados, Rafael decidiu ajustar depois.

### 2026-07-21 — Storybook instalado e piloto aprovado; Git inicializado; Button: elevation + API icon/label

- Piloto de 4 stories (Button/Alert/Accordion/Empty State) aprovado.
  Bug de estilo ausente no Storybook corrigido (faltava import de
  `globals.css`). Git inicializado, primeiro commit feito.
- Button: elevação tátil no hover/disabled (variant `default`) e API
  redesenhada pra nunca aceitar Button sem ícone E sem label ao mesmo
  tempo — aditivo, `children` continua funcionando como antes.
- Pendente (não implementado ainda): acionamento global de cor/radius/
  border-width — resolvido na entrada seguinte.

### 2026-07-21 — Tokens de Shape completos + painel único no Storybook

- Criada escala nomeada de radius (`--radius-0-5` a `--radius-6`, etc.)
  e token novo `--border-width` (1px padrão, 2px no preset `tech`) —
  aditivo, nada existente quebrado. Painel único no Storybook
  (toolbar "Estilo") replica a troca de preset em qualquer story.
- Gap conhecido: dark mode não tem toggle equivalente no Storybook.

### 2026-07-21 — Migração completa pro Storybook: 55 componentes + 14 patterns restantes

- Todos os 58 componentes + 15 Patterns ganharam `.stories.tsx`. Os 44
  "simples" reaproveitam o demo já existente em `examples/`; os 11 com
  variant/size real ganharam `argTypes`/controles reais; os Patterns
  usam o template minimalista do piloto. `tsc --noEmit` limpo.

### 2026-07-21 — Auditoria contra a Nimbus + Sonner reclassificado como Molecule

- Comparação contra o catálogo público da Nimbus confirmou os 8
  componentes já em `inProgressEntries` e achou mais 8 não registrados
  (Icon, MultiSelect, Thumbnail, Title, SegmentedControl, SplitButton,
  Stepper, TimePicker) — adicionados como "em construção".
- Sonner (existia, mas categorizado como utilitário) reclassificado
  como Molecule por decisão do Rafael — passou a aparecer no catálogo.

### 2026-07-21 — Variações extras nas stories (131 stories novas em 33 arquivos)

- Todos os demos "-variant" de `examples/` que ainda não tinham story
  própria ganharam uma (131 novas em 33 arquivos), pulando qualquer
  demo cujo conteúdo já era coberto por `argTypes` existentes.

### 2026-07-21 — Description/whenToUse reais preenchidos em component-docs.ts

- Placeholders `"[a preencher]"` de `description`/`whenToUse` nos 58
  componentes substituídos por texto real sourced da doc oficial do
  shadcn/ui, traduzido pro PT-BR. `doGuidelines`/`dontGuidelines`
  continuam placeholder (sem fonte oficial de "faça/não faça").

### 2026-07-21 — Button: variantes ai-primary/ai-secondary + fullWidth + Button.Skeleton (paridade com Nimbus)

- Button ganhou variantes `ai-primary`/`ai-secondary` (cores sourced do
  pacote publicado `@nimbus-ds/button`, não inventadas), prop
  `fullWidth` e `Button.Skeleton` — todos aditivos. Tokens `--ai-*`
  novos em `globals.css`, disponíveis pra outros componentes no futuro.

### 2026-07-22 — Loop: overlays (Tooltip e família) não herdavam tokens de marca por preset

- **Causa raiz:** os 4 presets não sobrescreviam `--popover`/`--card`/
  `--muted`/`--accent` — só cores de ação mudavam por preset. Corrigido
  em `globals.css` pros 3 presets que faltavam. `Tooltip` também tinha
  bug de componente (usava `bg-foreground` fixo) — alinhado ao resto da
  família (`bg-popover`).
- Auditoria completa (grep) confirmou zero cor hardcoded fora de token
  em `src/components/ui/*` e `patterns/*` — as únicas cores fixas do
  projeto são propositais (demos ilustrativos, página de portfólio).
- Continuação do mesmo dia: extração de primitivos de cor (evidência
  real de duplicação, não hipotética), conversão OKLCH→hex pedida pelo
  Rafael (documentação Figma + ferramentas de contraste), modo nativo
  claro/escuro por preset (`nativeMode` em `styles-registry.ts` —
  resolve midnight ser o único preset "sempre escuro" antes disso), e
  escalas primitivas de status/categóricas (10 passos, hues reaproveitados
  do que já existia no projeto, não arbitrários). Decisão em aberto,
  não implementada: ligar `--destructive` de cada preset à escala
  `danger` nova (mudaria a cor renderizada sem pedido explícito).

### 2026-07-22 — Pipeline `/construir-telas` (agentes autônomos via terminal)

- Deploy no ar (Vercel). Criados 4 subagentes (`telas-planejador` →
  `telas-construtor` → `telas-acessibilidade` → `telas-revisor`) e o
  comando `/construir-telas <slug>`, no mesmo modelo do `/revisar-ds`
  já existente — pipeline para no diagnóstico, não commita nem avança
  sozinho.

### 2026-07-23 — Fase 5A construída (pipeline autônomo) + fechamento de pendências

- As 5 telas do fluxo de login + `apolices-ativas` construídas via
  `/construir-telas`. 3 decisões do Rafael aplicadas: persistência
  entre telas via Context React (`fluxo-login-context.tsx`), convenção
  do `Select` "Cenário (demonstração)" ratificada como padrão oficial
  pra telas com estado fictício, e `recuperacao-senha` mantém sucesso
  genérico ao e-mail não encontrado (proteção contra enumeração).
- Passe sistêmico de acessibilidade: `CardTitle`/`EmptyTitle` ganharam
  `asChild` (heading semântico real via `h2`/`h3`); botões usam
  `aria-disabled` em vez de `disabled` durante loading síncrono (não
  perdem foco). 2 itens de baixo risco deixados pendentes de propósito
  (ícones decorativos sem `aria-hidden`, `role="group"` implícito).

### 2026-07-22 — Correção de contraste AA no accent do preset Suave

- `--soft-action` corrigido (`#EB5169`→`#E31A39`, mesma família de
  matiz) — reprovava AA (3.41:1), passou a 4.52:1.

### 2026-07-22 — R.ds logo no menu, nav Templates reorganizada, elevação do Button, bg do modal

- Logo "R.ds" substituindo o texto "Estilo padrão"; nav "Outros"
  removida (só tinha o utilitário `direction`); Templates reorganizado
  com página-índice própria (mesmo padrão de Atoms/Molecules/Patterns).
- Elevação do Button estendida pras variantes que faltavam (`secondary`,
  `destructive`, `outline`, `ai-secondary`, `ai-primary`).
- Bug de fundo: Dialog/AlertDialog/Sheet/Drawer/Chart usavam
  `bg-background` em vez de `bg-popover` — só ficou visível depois do
  fix de contraste anterior (antes os dois tokens pareciam iguais).
  Corrigido nos 5 arquivos.
- Breadcrumb corrigido: crumb de seção sempre apontava pra `/` em vez
  da página-índice real de cada categoria.

### 2026-07-23 — Ajustes de sidebar/header (compactação + fixação)

- Categorias da nav fecham por padrão; botões de item menores (`size="sm"`);
  mobile encolhe 1 passo além do `sm` (só na navegação, não no resto do
  site); header virou sticky; header mobile ganhou hambúrguer à direita.

### 2026-07-23 — Novo Pattern "Filter Panel" (ícone por campo de filtro)

- Pattern novo (16º) pra painel de filtros multi-campo com ícone por
  campo de origem (não por valor) — referência de outra seguradora onde
  o Rafael trabalhou. 4 tipos de campo demonstrados (multi-select,
  busca, select, date range), acessibilidade real (`aria-label`
  específico por chip, `aria-live` na contagem).

### 2026-07-23 — 4 ajustes no header (app-shell.tsx)

- Respiro de 24px entre header e conteúdo; fundo do header igualado ao
  da sidebar (com tokens corrigidos pra manter contraste); Sheet mobile
  explicitado como abrindo da esquerda (corrigido na entrada seguinte);
  breadcrumb visível no mobile.

### 2026-07-23 — Correção: Sheet mobile abre da direita, não da esquerda

- Rafael corrigiu a decisão da entrada anterior: o Sheet mobile deve
  abrir do MESMO lado do botão de hambúrguer (direita). `side`
  calculado via `useIsMobile()` — esquerda no desktop, direita no
  mobile.

### 2026-07-23 — Datas em pt-BR com dia da semana + timestamp em America/Sao_Paulo

- `Calendar` ganhou locale `ptBR` por default; `date-formatters.ts`
  novo centraliza formatos de data em texto; timestamp "agora" fixado
  em `America/Sao_Paulo`. Confirmado que não existe nenhum script de
  tracking (GTM/GA) no projeto.

### 2026-07-23 — Menu mobile fecha só quando a página termina de carregar

- `CloseMobileSidebarOnNavigate` fecha o Sheet mobile quando
  `usePathname()` muda de fato (proxy de "navegação concluída" no App
  Router, sem precisar de estado de loading manual).
- `next build` não roda no sandbox Linux (binário SWC é só Windows,
  registry npm inacessível) — recomendado rodar local ou deixar a
  Vercel buildar no deploy.

### 2026-07-23 — Referência de paleta ATLAS pra revisão futura dos tokens primitivos

- Registro de referência (paleta de outro design system, ATLAS) pra
  quando o Rafael quiser revisar os tokens primitivos de cor — gama
  maior por preset, desacoplar primária de accent, múltiplas cores de
  suporte. Nenhuma decisão tomada ainda, só nota pra retomar.

### 2026-07-23 — Vercel Web Analytics

- `@vercel/analytics` adicionado ao `package.json` e `<Analytics />`
  no `layout.tsx` — não instalado no sandbox (falha de rede), instala
  no primeiro `npm install` local do Rafael ou no build da Vercel.

### 2026-07-28 — Bug real de overflow mobile encontrado e corrigido; 5º estágio no pipeline `/construir-telas`

- **Causa raiz confirmada (medida, não suposta):** nenhum dos 4 agentes
  do pipeline roda a aplicação de verdade — todos auditam código
  estático. `<Sidebar collapsible="none">` sem `hidden md:flex` forçava
  overflow horizontal em toda tela abaixo de ~640px. Corrigido nos 2
  arquivos afetados (`dashboard-financeiro`, `apolices-ativas`).
  Resposta à dúvida do Rafael sobre migrar pra micro-frontends: não
  era o problema certo pra essa ferramenta (era CSS responsivo, não
  isolamento entre apps).
- **Pipeline ganhou um 5º estágio:** `telas-mobile` — roda a app de
  verdade + Chrome, mede overflow em 390px, screenshot. Roda em
  paralelo ao `telas-acessibilidade`.

### 2026-07-28 — Reconciliação: `novo-sinistro` existia, só nunca foi commitada

- Investigação (`git log`/`git status`) confirmou que a tela nunca foi
  apagada — só nunca entrou no git (ficou `??` desde que foi construída).
  Comitada agora junto com seus 4 docs de apoio e `CLAUDE.md` da raiz
  (também nunca commitado antes). Fase 5B reconciliada: 2 das 3 telas
  de seguros prontas, falta só `painel-corretor`.
- Vários outros arquivos soltos (não commitados, achados na
  investigação) ficaram de fora deste lote de propósito, aguardando
  decisão do Rafael — resolvidos na entrada seguinte.

### 2026-07-28 — Resolução dos 3 itens sem contexto

- `REFERENCIA-PRISMSYSTEM.md`/`avaliacao-prismsystem.md` (notas de
  referência formato Obsidian) movidos pro vault, removidos do repo.
- `card-video-poc/` (PoC sem relação com o design system, aninhada por
  acidente) adicionada ao `.gitignore` — mover pra pasta própria
  continua pendente com o Rafael.
- `docs/superpowers/plans/...icon-system...md`: identificado como plano
  executável (não nota de referência) — não movido pro vault de
  imediato. Investigação revelou que a migração de ícones (15 commits)
  existia só numa branch isolada, nunca mesclada no `main`. Rafael
  confirmou o merge: `git merge` sem conflitos (145 arquivos), 1 tela
  (`novo-sinistro`, commitada depois que a branch de migração já
  existia) migrada manualmente (11 usos de ícone), conflito real só em
  `package.json`/`package-lock.json` (versão do `next`) resolvido
  mantendo o patch de segurança `^16.2.11`. Resumo completo arquivado
  no Diário de Bordo do vault.

### 2026-07-30 — Recuperação depois de queda de energia; Chip (1/15 da Fase 6.1) concluído; Icon (6.0) corrigido

- Diagnóstico confirmou que nada estava corrompido (a diferença de
  ~4600 linhas era só mudança de CRLF/LF, não perda de conteúdo).
  Trabalho do Chip (1º dos 15 componentes da Fase 6.1) estava íntegro,
  só faltava a story e a verificação final — completados nesta sessão.
  Fase 6.0 (Icon) corrigida de brinde (movido de "em construção" pra
  registrado de verdade).

### 2026-07-30 — Fase 6.1 fechada: os 14 componentes restantes construídos em paralelo

- Os 14 componentes restantes (Tag, File Uploader, Icon Button, Link,
  List, Text, Box, MultiSelect, Thumbnail, Title, SegmentedControl,
  SplitButton, Stepper, TimePicker) implementados em paralelo (1 agente
  por componente, proibidos de editar os 6 arquivos compartilhados ao
  mesmo tempo — cada um só devolveu as linhas de registro, aplicadas
  manualmente depois). `tsc --noEmit` limpo em todas as verificações.
- Pendente ao final desta entrada: verificação visual dos 15 componentes
  novos (nenhum dev server rodou nesta sessão) e Fase 6.2 (contraste AA)
  — ambas fechadas depois, ver `plans/current/loop-80-20-templates.md`
  (Fase 6, seção 6.2) para o resultado final já registrado como
  concluído.
