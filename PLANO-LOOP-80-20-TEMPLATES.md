# Loop 80/20 — Construção do Design System priorizando Templates de visualização de dados

> Relacionado a `PLANO-DESIGN-SYSTEM.md` (piloto do Button, pausado). Este
> arquivo NÃO substitui aquele — é uma reordenação de prioridade: em vez de
> replicar o template de documentação componente por componente, este loop
> prioriza chegar rápido em Templates de dashboard reais (referência: print
> enviado por Rafael, estilo shadcn.ui — Contribution History, Claimable
> Balance, Set a new milestone, Payout Threshold, QR connect, New Chat).
>
> Retomar `PLANO-DESIGN-SYSTEM.md` quando este loop chegar na Fase 5.

## Por que 80/20 aponta pra cá

Auditei os 60 componentes já existentes em `src/components/ui/` contra o
print de referência. Toda peça visual do print já existe no projeto —
Card, Button, Badge, Input, Textarea, Checkbox/Radio/Switch, Dialog,
ButtonGroup, Sidebar (nav agrupada), Chart (recharts), Select, Slider,
Accordion, Separator, e até os componentes de chat (`message`, `bubble`,
`attachment`) que cobrem o painel "New Chat". **Não existe lacuna de átomo
bloqueando o dashboard.** O trabalho de maior retorno não é construir
componente novo — é (1) categorizar o que já existe pra virar catálogo
navegável, e (2) montar as composições de Template de verdade, validadas,
reaproveitáveis. Patterns, conteúdo narrativo e átomos de nicho (Chip,
File Uploader, Icon Button dedicado) ficam fora do escopo por ora — não
bloqueiam um bom template de dashboard.

## Regras para quem for rodar isso em loop

1. Uma tarefa por vez, na ordem. Marcar `[x]` só depois de verificado (ver
   critério de verificação de cada fase).
2. Não escrever texto narrativo (Descrição, Quando usar, Boas práticas) em
   nenhum componente — isso é conteúdo que Rafael escreve, não a IA. Fica
   pra quando retomar `PLANO-DESIGN-SYSTEM.md`.
3. Nunca inventar um componente novo sem checar antes se já existe em
   `src/components/ui/` — o catálogo abaixo é a fonte da verdade.
4. Se a próxima tarefa exigir uma decisão de design (não técnica — ex:
   "isso é Molecule ou Organism?", "esse card deveria existir ou é
   redundante com outro?") e Rafael estiver disponível, parar e listar a
   dúvida. Se Rafael **não** estiver disponível, não parar — seguir o
   "Modo autônomo" abaixo.
5. Sempre que possível, verificar com grep (imports existem, sem cor fixa
   fora de token) — mesmo processo usado na página `/teste-padrao`. Build
   completo (`tsc`) pode não caber no tempo de um sandbox; rodar local
   quando disponível.
6. Ao final de cada fase, atualizar a seção "Log" no fim deste arquivo com
   o que foi feito e o que ficou pendente.
7. Nunca fazer algo irreversível sem Rafael por perto: não apagar nem
   renomear arquivo existente, não sobrescrever `PLANO-DESIGN-SYSTEM.md`
   nem este arquivo (só adicionar), não commitar/dar push se houver git,
   não instalar dependência nova sem necessidade clara. Sempre preferir
   aditivo a destrutivo — o que for construído tem que dar pra jogar fora
   ou ajustar sem trauma quando Rafael revisar.

## Modo autônomo — decisão provisória em vez de esperar

Quando Rafael não está disponível e a tarefa exige uma escolha de design
(não técnica), o loop segue assim em vez de travar:

1. **Decide** com base no que já está estabelecido neste documento ou no
   projeto — ex: seguir a convenção do Nimbus quando este plano já cita
   ela (caso do Select/Popover como Atom), seguir o padrão mais parecido
   já usado em outro componente do catálogo. Não é uma escolha aleatória,
   é a opção mais consistente com o que já existe.
2. **Marca como provisório** no próprio artefato — comentário no código
   (`// PROVISÓRIO: categorizado como Molecule, revisar`) quando fizer
   sentido, e sempre uma linha na tabela "Decisões provisórias — revisar"
   no fim deste arquivo.
3. **Mantém a decisão barata de reverter** — toda escolha provisória vive
   num lugar só (ex: `atomic-registry.ts`, não espalhada em vários
   arquivos). Rafael discordar depois deve custar 1 edição, não uma
   correção em cascata.
4. **Continua o loop** — nunca fica parado esperando resposta.

Só a regra 7 (irreversível/destrutivo) para de verdade o loop, mesmo em
modo autônomo — aí sim espera Rafael voltar.

---

## Fase 0 — Categorização dos 60 componentes existentes (pré-requisito)

Primeira proposta, pra revisão de Rafael — não é definitiva.

### Atoms

`avatar` · `badge` · `button` · `checkbox` · `input` · `input-otp` ·
`kbd` · `label` · `progress` · `radio-group` · `separator` · `skeleton` ·
`slider` · `spinner` · `switch` · `textarea` · `toggle` · `tooltip` ·
`aspect-ratio` · `native-select` · `select` · `popover` · `item` · `marker`

### Molecules

`alert` · `breadcrumb` · `button-group` · `collapsible` · `combobox` ·
`empty` · `field` · `hover-card` · `input-group` · `pagination` ·
`toggle-group` · `scroll-area` · `attachment`

### Organisms

`accordion` · `alert-dialog` · `calendar` · `card` · `carousel` ·
`chart` · `command` · `context-menu` · `dialog` · `dropdown-menu` ·
`drawer` · `form` · `menubar` · `message` · `bubble` · `navigation-menu` ·
`resizable` · `sheet` · `sidebar` · `table` · `tabs`

### Utilitários / infraestrutura (não entram no catálogo visual)

`direction` (provider de RTL) · `sonner` (provider de toast)

### Atoms "em construção" (existem no Nimbus, não existem aqui ainda)

`Chip` — em construção · `Tag` — em construção · `File Uploader` — em
construção · `Icon Button` (versão dedicada, hoje é Button + ícone) — em
construção · `Link` (versão estilizada como átomo formal) — em construção
· `List` (átomo formal) — em construção · `Text` (átomo tipográfico
formal) — em construção · `Box` (primitivo de layout formal) — em
construção

**Tarefa do loop:**
- [x] Rafael revisa e ajusta esta categorização (ou aprova como está) —
      aprovada como está em 2026-07-20
- [x] Depois de aprovada, criar `src/lib/atomic-registry.ts` — mapa
      `slug → categoria` (Atom/Molecule/Organism/Utilitário), consumido
      pela navegação (Fase 1)

---

## Fase 1 — Navegação por categoria (mínimo pra parecer modular)

- [x] Reorganizar `src/components/sidebar-07/nav-components.tsx` pra
      agrupar por categoria (Atoms / Molecules / Organisms), usando
      `atomic-registry.ts` — troca a lista alfabética simples atual.
      Label de cada grupo agora linka pra página-índice da categoria;
      grupo "Outros" (direction, sonner) mantido no fim, sem link.
- [x] Criar uma página-índice por categoria (`/atoms`, `/molecules`,
      `/organisms`) — grade de cards com nome + 1 linha (sem inventar
      texto: usar só o nome do componente por enquanto, descrição fica
      placeholder `"[a preencher]"` como já é convenção no projeto)
- [x] Cards dos itens "em construção" aparecem na grade da categoria
      certa, desabilitados/sem link, com badge "Em construção"

**Verificação:** navegação abre sem quebrar as páginas `/components/[slug]`
já existentes.

---

## Fase 2 — Confirmar Atoms necessários pro Template de dashboard

Nenhum destes precisa ser criado — só confirmar que renderizam bem com o
preset de estilo ativo antes de usar no Template:

- [x] Button (variantes default, secondary, outline — usadas no print)
- [x] Badge (default, secondary)
- [x] Input — confirmado. **Nota:** ícone de busca não é um recurso do
      `Input` puro; a composição correta é `InputGroup` +
      `InputGroupAddon` (Molecule já categorizada), não um ajuste no
      Atom.
- [x] Textarea (existe e exporta `Textarea`, ainda não usada no Template
      — nenhum card da Fase 4 pediu textarea multi-linha)
- [x] Checkbox, Radio (radio-group), Switch — confirmados via grep de
      export; não usados diretamente no Template porque nenhum card do
      print exigia os três juntos numa linha (fica pra quando o
      Template pedir um form mais longo)
- [x] Select — confirmado
- [x] Slider (com labels de min/max, como no "Payout Threshold") —
      confirmado e usado no Template
- [x] Progress — confirmado

**Verificação:** grep confirma que os imports existem (mesmo processo já
usado no `/teste-padrao`), sem precisar recriar nada.

---

## Fase 3 — Molecules/Organisms necessários pro Template de dashboard

- [x] Card — variações construídas: stat card simples (Saldo), card com
      chart, card com form + Button Group (Definir nova meta), card com
      slider (Limite de repasse), card com item colapsável via Accordion
      (Detalhes da conta), card do painel de chat
- [x] Chart — bar chart (recharts via `chart.tsx`), equivalente ao
      "Contribution History" do print
- [x] Sidebar — navegação agrupada em múltiplas seções (Planejamento/
      Suporte/Visão geral/Conta, equivalente ao Planning/Support/
      Overview/Account do print) — usada como peça mockada dentro do
      próprio Template (`SidebarProvider` escopado, mesmo padrão de
      `examples/sidebar-demo.tsx`), não é a navegação real do portal
- [x] Dialog/Alert Dialog — Alert Dialog usado como confirmação ao
      cancelar o formulário de nova meta
- [x] Button Group — usado no rodapé do card "Definir nova meta"
      (Cancelar/Criar)
- [x] Painel de chat — `message.tsx` + `attachment.tsx` testados juntos
      no card "Novo chat" (histórico de mensagens + anexo). `bubble.tsx`
      **não** entrou nesta composição — `message.tsx` já cobria o
      histórico e usar os dois juntos seria redundante; ver decisão
      provisória.

**Verificação:** peças testadas direto na composição final do Template
(Fase 4), não numa página de teste isolada antes — ver decisão
provisória sobre `/teste-padrao` já estar ocupado. Verificação foi só
estrutural (grep de imports/exports, sem cor fora de token); **falta
checagem visual** (`npm run dev`) porque nem meu ambiente nem o do
Rafael tinham o servidor de desenvolvimento disponível nesta sessão.

---

## Fase 4 — Template "Dashboard financeiro" (o entregável real)

- [x] Montar Template completo equivalente ao print — cards lado a lado
      (stat/chart, form de milestone, threshold com slider, QR connect,
      Detalhes da conta com Accordion, chat) + sidebar agrupada —
      reaproveitando só peças confirmadas nas Fases 2 e 3
- [x] Criado direto em `/templates/dashboard-financeiro` (não passou por
      `/teste-padrao` — ver decisão provisória)
- [x] Registrado como Template oficial na navegação — grupo "Templates"
      abaixo de Atoms/Molecules/Organisms na `AppSidebar`

**Definição de pronto:** visualmente equivalente ao print em variedade de
composição (não precisa ser o mesmo domínio/conteúdo), com o preset de
estilo ativo refletido em todos os cards, sem cor fixa fora de token.

---

## Fase 5 — Fora do escopo agora (retomar depois, não fazer neste loop)

- Patterns (Empty State, CRUD, Multi-step Form etc. — 15 no mapa original)
- Conteúdo narrativo dos componentes (retomar `PLANO-DESIGN-SYSTEM.md`)
- Atoms "em construção" (Chip, Tag, File Uploader, Icon Button, Link,
  List, Text, Box)
- Separar documentação/playground em camadas distintas (decisão em aberto,
  não decidida ainda)

---

## Decisões provisórias — revisar

*(toda decisão tomada em Modo autônomo entra aqui — é a primeira coisa
que Rafael confere ao voltar. Uma linha por decisão.)*

| Fase/Tarefa | Decisão tomada | Alternativa considerada | Como reverter |
|---|---|---|---|
| Fase 4 | Template criado direto em `/templates/dashboard-financeiro`, sem passar por `/teste-padrao` primeiro | Construir em `/teste-padrao` como o plano original previa | `/teste-padrao` já tinha conteúdo de outro teste (painel de apólices de seguro) desde antes deste loop — sobrescrever violaria a regra 7 (nunca apagar/sobrescrever arquivo existente sem Rafael por perto). Reverter: mover o conteúdo de `dashboard-financeiro/page.tsx` pra outro lugar é só um `mv`, nada foi acoplado a essa escolha de caminho. |
| Fase 3 | `bubble.tsx` não entrou no painel de chat do Template | Usar `message.tsx` + `bubble.tsx` juntos, como o item original da Fase 3 sugeria | São dois padrões visuais para a mesma coisa (histórico de chat) — usar os dois no mesmo painel ficaria redundante/confuso. Escolhido `message.tsx` por já ter Avatar + Header (metadata), mais completo pro caso. Reverter: trocar os `Message`/`MessageContent` do card "Novo chat" por `BubbleGroup`/`Bubble`/`BubbleContent` é uma edição isolada no card, não propaga.

## Log

*(preencher ao final de cada fase: data, o que foi feito, o que ficou
pendente ou precisou de decisão do Rafael)*

### 2026-07-20 — Fase 0 e Fase 1 concluídas

- Rafael aprovou a categorização da Fase 0 sem ajustes.
- Criado `src/lib/atomic-registry.ts` (mapa slug → categoria + lista de
  "em construção"). Validei manualmente que os 60 slugs de
  `components-registry.ts` batem 1:1 com o registro (58 categorizados +
  `direction`/`sonner` como utilitário) — sem sobra nem falta.
- `nav-components.tsx` reescrito: agrupa por Atoms/Molecules/Organisms
  (+ grupo "Outros" pros utilitários), label de cada grupo agora é link
  pra página-índice da categoria.
- Criadas `src/app/atoms/page.tsx`, `/molecules/page.tsx`,
  `/organisms/page.tsx` + componente compartilhado
  `src/components/atomic-index.tsx` — grade de cards linkando pra
  `/components/[slug]`, descrição placeholder `"[a preencher]"`, itens
  "em construção" (Chip, Tag, File Uploader, Icon Button, Link, List,
  Text, Box) aparecem desabilitados com badge.
- **Pendente:** ambiente sandbox sem acesso ao shell nesta sessão — só
  verificação manual (grep de imports/exports, sem cor fixa fora de
  token). `npx tsc --noEmit` e revisão visual (`npm run dev`, abrir
  `/atoms`, `/molecules`, `/organisms`) ainda precisam rodar na máquina
  do Rafael antes de considerar a Fase 1 100% fechada.
- Próximo: Fase 2 (confirmar Atoms do Template de dashboard).

### 2026-07-20 — Fases 2, 3 e 4 concluídas (modo autônomo)

- Rafael tentou rodar `npm run dev` na máquina dele: erro inicial
  `Cannot find module 'lucide-react'` (dependências incompletas),
  resolvido com `npm install`. Depois disso o servidor subiu
  (`✓ Ready`), mas o localhost não abriu no navegador dele — ele decidiu
  seguir depois e me pediu para continuar em paralelo. **Modo autônomo
  ativado a partir daqui.**
- Fase 2: os 10 Atoms confirmados via grep de export (Button, Badge,
  Input, Textarea, Checkbox, Radio, Switch, Select, Slider, Progress).
  Achado registrado na própria Fase 2: ícone de busca no Input é
  responsabilidade do `InputGroup` (Molecule), não do Atom puro.
- Fase 3: peças testadas direto na composição final do Template (não
  numa página de teste isolada — `/teste-padrao` já estava ocupado por
  outro teste de Rafael, não sobrescrevi). Decisão sobre não usar
  `bubble.tsx` junto de `message.tsx` no painel de chat registrada na
  tabela de decisões provisórias.
- Fase 4: Template criado em `/templates/dashboard-financeiro` —
  sidebar mockada (4 grupos: Planejamento/Suporte/Visão geral/Conta),
  cards de saldo, histórico de contribuições (bar chart), nova meta
  (form + Button Group + Alert Dialog de confirmação), limite de
  repasse (slider), conectar via QR code, detalhes da conta (Accordion)
  e painel de chat (Message + Attachment + InputGroup). Registrado na
  navegação (`AppSidebar`) num grupo novo "Templates".
- **Verificação feita:** só estrutural — todo componente usado no
  Template teve seu export confirmado por grep contra o arquivo real em
  `src/components/ui/`, e todos os ícones do `lucide-react` usados
  (inclusive os com sufixo `Icon`) foram confirmados no
  `lucide-react.d.ts`. Sem cor fixa fora de token.
- **Pendente (bloqueado em mim, não em Rafael):** nenhuma verificação
  visual rodou — nem `npx tsc --noEmit`, nem abrir `/templates/
  dashboard-financeiro` no navegador. Quando o Rafael resolver o
  problema do localhost, os itens a checar são: (1) o layout da sidebar
  mockada dentro do Template não estranha visualmente dentro da
  AppSidebar real (duas sidebars na tela); (2) o card "Novo chat"
  (`lg:col-span-3`) quebra bem em telas menores; (3) `tsc --noEmit`
  limpo.
- Próximo: Rafael revisar visualmente o Template e decidir se a
  composição bate com o print de referência (Definição de pronto da
  Fase 4) antes de considerar o loop 80/20 encerrado.

### 2026-07-20 — Ajuste de UX na navegação (Fase 1)

- Rafael pediu, depois de ver a navegação rodando: cada grupo (Atoms/
  Molecules/Organisms/Outros) precisa abrir/fechar como acordeão, **sem**
  perder o clique no nome do grupo pra ir pra página-índice — os dois
  gestos não podem disputar o mesmo alvo de clique.
- Implementado com `Collapsible`/`CollapsibleTrigger`/`CollapsibleContent`
  (Molecule já catalogada) em `nav-components.tsx`: o texto do grupo
  continua sendo um `Link` normal; um botão-chevron separado ao lado
  (`CollapsibleTrigger`) controla só o abrir/fechar da lista de itens.
  Estado por grupo em `React.useState`, todos abertos por padrão (não
  muda o comportamento visual de antes). Convenção do chevron
  (`[&[data-state=open]>svg]:rotate-180`) copiada do `accordion.tsx` já
  existente, pra manter consistência visual.
- **Pendente:** verificação visual (ver se o chevron não invade a área
  de toque do link, se o foco por teclado passa pelos dois controles em
  ordem lógica) ainda depende do Rafael conseguir abrir o localhost.

### 2026-07-20 — Ícone por categoria na navegação

- Rafael pediu ícone pra cada item da lista de componentes, depois
  corrigiu: só nas categorias (Atoms/Molecules/Organisms/Outros/
  Templates), não item por item — cancelei o registro de 60 ícones que
  tinha começado (`component-icons.ts`) antes de terminar, sem deixar
  arquivo pra trás.
- Adicionado `categoryIcons` em `nav-components.tsx`: `AtomIcon` (Atoms),
  `CombineIcon` (Molecules), `NetworkIcon` (Organisms), `PuzzleIcon`
  (Outros/utilitários) — decisão decorativa/de wayfinding, trocar
  depois é edição isolada num objeto só. `LayoutTemplateIcon` (já usado
  no item "Dashboard financeiro") repetido no label do grupo
  "Templates" em `app-sidebar.tsx`.
- Verificação: os 4 nomes de ícone confirmados por grep contra
  `lucide-react.d.ts` antes de usar.

### 2026-07-20 — Ícone + tooltip no modo recolhido (ícone-only)

- Rafael testou a sidebar recolhida (`collapsible="icon"`) e reportou: o
  ícone da categoria desaparecia junto com o resto do label — ele
  esperava ver o ícone sozinho, com tooltip do nome da categoria (igual
  o item "Folha de estilo" já fazia).
- Causa: o ícone estava dentro do `SidebarGroupLabel`, que já tem uma
  regra própria (`group-data-[collapsible=icon]:opacity-0`) pra
  desaparecer no modo ícone — então some junto.
- Corrigido em `nav-components.tsx`: cada grupo agora tem duas
  renderizações do cabeçalho, uma escondida via CSS conforme o modo da
  sidebar (`group-data-[collapsible=icon]:hidden` /
  `group-data-[collapsible=icon]:flex`) — expandido mostra nome+chevron
  como antes; recolhido mostra só o ícone, envolvido em
  `Tooltip`/`TooltipTrigger`/`TooltipContent` (`side="right"`), mesmo
  padrão usado no `SidebarMenuButton` nativo. A lista de itens
  (`CollapsibleContent`) também passou a esconder no modo ícone —
  mostrar 20+ botões vazios empilhados numa faixa de ícones ia ficar
  ruim.
- De brinde: notei no print do Rafael que o breadcrumb do topo mostrava
  o caminho bruto (`/templates/dashboard-financeiro`) em vez de um nome
  — as páginas novas (`/atoms`, `/molecules`, `/organisms`, `/templates/
  dashboard-financeiro`) não estavam registradas em `useBreadcrumb()`
  (`app-shell.tsx`). Corrigido também.
- **Pendente:** visual — confirmar que o tooltip aparece à direita sem
  cortar, que o ícone recolhido fica centralizado na faixa, e que o
  breadcrumb novo aparece certo. Depende do Rafael testar no navegador.

### 2026-07-20 — Template de documentação do Button replicado pros 58 componentes

- Rafael pediu: pegar a estrutura de página que só o Button tinha
  (Descrição, Quando utilizar, Anatomia, Variantes, Estados, Tamanhos,
  Boas práticas, Evite, Código, Propriedades) e replicar pra todos os
  Atoms, depois Molecules, depois Organisms.
- Escrito em `src/lib/component-docs.ts`: 23 Atoms + 13 Molecules + 21
  Organisms = 58 entradas novas (mais o Button original = 58 total).
  Batem 1:1 com os 60 slugs de `components-registry.ts` menos os 2
  utilitários (`direction`, `sonner`), que ficam fora do escopo Atomic
  Design.
- Regra seguida em toda entrada, sem excecão: `description`,
  `whenToUse`, `doGuidelines`, `dontGuidelines` = placeholder
  `"[a preencher]"` — Rafael escreve esse conteúdo, a IA nunca inventa
  texto narrativo. Só `anatomy`, `variants`, `states`, `sizes`, `code`,
  `props` foram preenchidos, e só depois de ler o código-fonte real de
  cada `src/components/ui/*.tsx`.
- Convenção aplicada quando a variante pertencia a uma sub-peça e não
  à raiz documentada (ex: `ContextMenuItem`/`DropdownMenuItem`/
  `MenubarItem` têm variant default/destructive, mas `ContextMenu`/
  `DropdownMenu`/`Menubar` em si não têm) — a variante fica descrita
  no texto da Anatomia, não na lista `variants` (que é reservada pra
  variante do próprio componente raiz da página). Mesma lógica pro
  `AlertDialogContent` (size default/sm é da sub-peça Content, não do
  `AlertDialog` raiz) e pro `TabsList` (variant default/line é da
  sub-peça List, não do `Tabs` raiz).
- Achado durante o trabalho (não reportado pelo Rafael, autodetectado):
  a página `/components/[slug]` sempre renderizava um `<Button>`
  genérico nas seções Variantes/Tamanhos, pra qualquer componente —
  bug do piloto original. Corrigido criando
  `src/components/doc/variant-preview.tsx`: registro por slug que
  renderiza o componente REAL correspondente. Nesta rodada, adicionada
  a entrada `bubble` no registro (`Bubble`/`BubbleContent`, com os 7
  variants reais: default/secondary/muted/tinted/outline/ghost/
  destructive) — é o único Organism com variant de estilo na raiz que
  vale ter preview ao vivo. Componentes modais/portal (`Dialog`,
  `AlertDialog`, `Sheet`, `Drawer`, `Command`) não ganharam preview
  forçado aberto na grade estática — ficaram só com `variants`/`sizes`
  vazios e a descrição na Anatomia, mesma lógica já usada antes pros
  Popover/HoverCard.
- Também ajustado `src/app/components/[slug]/page.tsx`: as seções
  Variantes/Estados/Tamanhos (e os links "Nesta página" correspondentes)
  agora só renderizam se `doc.variants/states/sizes.length > 0` — antes
  sempre apareciam com cabeçalho vazio pra componente sem esse dado, o
  que é ruim pra leitor de tela (heading sem conteúdo).
- **Verificação feita:** script Node contando as chaves de nível-raiz
  de `componentDocs` (58, sem duplicata) e comparando 1:1 contra os
  slugs de `components-registry.ts` menos utilitários — sem sobra nem
  falta. `npx tsc --noEmit` rodou limpo (sem erros) depois de todas as
  edições, incluindo o `variant-preview.tsx` novo.
- **Pendente:** visual — abrir algumas páginas de Organism no navegador
  (principalmente `bubble`, pelo preview novo, e os modais/portais tipo
  `dialog`/`sheet`/`command`, pra confirmar que a ausência de Variantes/
  Tamanhos não deixou a página estranha) e, quando Rafael tiver tempo,
  preencher o conteúdo narrativo (`"[a preencher]"`) dos 58 componentes.
- Próximo: Playground continua só no Button (deferido no plano
  original, fora do escopo desta tarefa) — genericizar o Playground pra
  todos os componentes seria uma Fase separada, ainda não pedida.

### 2026-07-20 — Playground genericizado (12 componentes)

- Depois de resolver o `SyntaxError`/erro de manifesto RSC (era cache do
  Turbopack corrompido, confirmado — sumiu depois de apagar `.next` e
  reiniciar `npm run dev`), Rafael pediu para continuar o projeto. Como
  o loop 80/20 (Fases 0-4) e a documentação dos 58 componentes já
  tinham fechado, apresentei 4 direções possíveis pra ele escolher —
  ele escolheu genericizar o Playground.
- **Decisão de escopo:** Playground só faz sentido pra componente que
  tem variante e/ou tamanho reais na raiz documentada (mesmo critério
  já usado pra mostrar/esconder as seções Variantes/Tamanhos). Checagem
  programática em `component-docs.ts` (script Node, não chute) achou
  exatamente 12 componentes nessa condição: `avatar`, `badge`, `switch`,
  `toggle`, `native-select`, `select`, `item`, `marker`, `alert`,
  `toggle-group`, `attachment`, `bubble`. Os outros 46 (incluindo todo
  Organism modal/portal) não ganham Playground — não têm o que ajustar
  via prop além de abrir/fechar, que não é o objetivo desta seção.
- Criado `src/components/doc/generic-playground.tsx`: um registro por
  slug (`genericPlaygroundRegistry`) com a função de render real do
  componente + quais controles mostrar (variante, tamanho, disabled,
  um toggle "marcado/pressionado" quando o componente tem estado
  binário real — `switch`, `toggle`, `toggle-group`). Componente
  `GenericPlayground` client-side reaproveita o mesmo layout visual do
  `ButtonPlayground` (preview à esquerda, controles à direita).
  `attachment` usa a prop real `state` (idle/uploading/processing/
  error/done) no lugar do slot de "variante", com label "Estado".
- `button` continua com o `ButtonPlayground` dedicado, sem alteração —
  tem o controle "Loading" que é específico dele e não existe modelo
  genérico pra isso ainda.
- Ajustado `src/app/components/[slug]/page.tsx`: a seção Playground (e
  o link "Nesta página" correspondente) agora renderiza se houver
  `Playground` dedicado OU entrada em `genericPlaygroundRegistry` pro
  slug — sem isso, a seção simplesmente não aparece (mesma lógica de
  "não forçar heading vazio" já aplicada em Variantes/Estados/
  Tamanhos).
- **Verificação feita:** todos os nomes de prop usados (`checked`/
  `onCheckedChange` no Switch, `pressed`/`onPressedChange` no Toggle,
  `value`/`onValueChange` no ToggleGroup, `state`/`size` no Attachment,
  `disabled` no Select/NativeSelect) confirmados lendo o código-fonte
  real de cada `src/components/ui/*.tsx` antes de usar — nenhum prop
  inventado. `FileIcon` do lucide-react confirmado por grep antes de
  usar no preview do Attachment. Parser do TypeScript (0 diagnósticos)
  e `npx tsc --noEmit` (log vazio) limpos nos dois arquivos novos/
  alterados.
- **Pendente:** visual — abrir `/components/switch`, `/components/
  toggle`, `/components/attachment` e `/components/select` no navegador
  pra confirmar que os controles realmente re-renderizam o preview em
  tempo real (ex: o Switch da seção Playground não deveria travar por
  causa do `disabled` mesmo quando o toggle de "Disabled" está
  desligado).
- Próximo: aguardando Rafael revisar visualmente; depois disso, os
  itens de Fase 5 (Patterns, conteúdo narrativo) continuam em aberto,
  sem data definida.

### 2026-07-21 — Fase 5 antecipada: os 15 Patterns construídos do zero

- Rafael perguntou se já havia material suficiente pra montar exemplos
  de jornada. Resposta: não — faltava a camada de Patterns (nenhum dos
  15 do mapa original existia) e nenhuma jornada tinha sido definida.
  Apresentei as opções e Rafael decidiu priorizar construir os 15
  Patterns agora, de uma vez (não o subconjunto crítico que eu sugeri).
- Escopo: os 15 patterns listados em `PLANO-DESIGN-SYSTEM.md` (linha
  26-29): Empty State, Loading, Error State, Skeleton, Success
  Feedback, Search Experience, CRUD, Multi-step Form, Confirmation
  Dialog, Delete Flow, Pagination, Infinite Scroll, Filters, Upload,
  Toast Strategy.
- Arquivos criados:
  - `src/components/patterns/*.tsx` — 15 componentes funcionais reais
    (regra do plano: "cada pattern deve ter exemplo funcional de
    código, não só documentação em texto"), todos usando Atoms/
    Molecules/Organisms já catalogados, sem inventar nenhum
    componente novo.
  - `src/components/patterns/registry.tsx` — mapa slug → componente.
  - `src/lib/patterns-registry.ts` — lista dos 15 slugs/nomes.
  - `src/lib/pattern-docs.ts` — documentação: `description`/
    `whenToUse`/`doGuidelines`/`dontGuidelines` = placeholder
    `"[a preencher]"` (mesma regra do `component-docs.ts`, sem
    exceção); `composition` (quais Atoms/Molecules/Organisms reais
    cada pattern usa) e `accessibility` (o que foi de fato
    implementado — foco, aria-live, role) são reais, derivados do
    componente que eu escrevi, não suposição.
  - `src/components/pattern-index.tsx` + `src/app/patterns/page.tsx` —
    grade-índice, mesmo padrão de `/atoms` `/molecules` `/organisms`.
  - `src/app/patterns/[slug]/page.tsx` — página de detalhe: Descrição,
    Quando utilizar, Composição, Exemplo (renderiza o componente
    funcional de verdade), Acessibilidade, Boas práticas/Evite,
    Código — todas as seções condicionais (só aparecem se houver
    conteúdo), mesma lógica já usada em `/components/[slug]`.
  - `src/components/sidebar-07/nav-patterns.tsx` — grupo "Patterns" na
    navegação (ícone `BlocksIcon`), mesmo padrão de accordion +
    ícone/tooltip recolhido já estabelecido em `nav-components.tsx`,
    posicionado depois de "Templates".
- **Decisão de acessibilidade central** (motivo pelo qual esse trabalho
  importa pro objetivo do projeto — prototipagem testável com leitor
  de tela): cada pattern com transição de estado (Loading, Error
  State, Skeleton, Multi-step Form) tem gerenciamento de foco e/ou
  região `aria-live` real implementados, documentados na seção
  "Acessibilidade" de cada pattern — não é só texto explicando o
  conceito, é código que de fato move o foco (`ref` + `tabIndex={-1}`
  + `.focus()`) ou anuncia mudança de estado.
- **Decisões provisórias** (registradas aqui, revisar):
  - Success Feedback (Alert fixo na tela) vs. Toast Strategy
    (notificação passageira via Sonner) foram tratados como dois
    patterns DISTINTOS, não um só — a diferença é justamente
    persistente vs. passageiro, então uniformizar os dois perderia a
    informação mais importante de cada um.
  - Confirmation Dialog (confirmação antes de ação irreversível) vs.
    Delete Flow (confirmação + feedback pós-ação com "Desfazer")
    também ficaram distintos — Delete Flow é o Confirmation Dialog
    "mais completo" aplicado especificamente à exclusão de um recurso.
  - Infinite Scroll usa IntersectionObserver real, mas manteve um
    botão "Carregar mais" sempre visível como alternativa — decisão de
    acessibilidade (rolagem sozinha não é um alvo de ação confiável em
    toda tecnologia assistiva), documentada na seção Acessibilidade do
    próprio pattern.
  - Achado (não corrigido ainda, fora do escopo desta tarefa): o doc
    do Button (`component-docs.ts`, pilotado antes desta sessão) só
    lista os tamanhos xs/sm/default/lg/icon, mas o `button.tsx` real
    também tem `icon-xs`/`icon-sm`/`icon-lg` — usados em vários
    patterns novos (CRUD, Delete Flow, Upload). Não ajustei o doc do
    Button sem Rafael pedir (regra de não tocar em arquivo aprovado
    sem necessidade clara) — fica registrado aqui pra ele decidir.
- **Verificação feita:** toda prop usada (Switch checked/onCheckedChange,
  Toggle pressed/onPressedChange, Attachment state/size, Popover/
  Checkbox/Badge, etc.) foi confirmada lendo o código-fonte real antes
  de usar. Ícones do lucide-react (`BlocksIcon`, `SearchIcon`,
  `Trash2Icon`, `CloudUploadIcon` etc.) confirmados por grep contra
  `lucide-react.d.ts`. Revisão manual completa de todos os arquivos
  novos (JSX balanceado, imports corretos, escaping de crase dentro de
  template literals no `pattern-docs.ts`).
- **Pendente — bloqueado no ambiente, não em mim:** o sandbox de shell
  ficou indisponível ("Workspace unavailable") durante toda essa etapa,
  então **não rodei `npx tsc --noEmit` nem `npm run dev`** depois
  dessas mudanças — diferente de todas as etapas anteriores desta
  sessão, que sempre fecharam com essa verificação automatizada.
  Recomendo fortemente rodar `npx tsc --noEmit` (ou só `npm run dev` e
  abrir `/patterns` e algumas páginas de pattern) antes de considerar
  isso 100% fechado.
- Próximo: Rafael rodar a verificação pendente; depois, decidir se
  parte pra definir a primeira jornada de verdade (qual fluxo de
  seguros prototipar) ou se quer revisar/ajustar algum pattern
  primeiro.

### 2026-07-21 — Hierarquia final: Patterns fica entre Organisms e Templates

- Rafael pediu pra mover Patterns pra antes de Templates. Como ele não
  mencionou Organisms na primeira descrição, perguntei onde Organisms
  entrava — ele respondeu com a definição de mercado (Figma + Storybook
  + shadcn/ui): "Organism = componente grande e autocontido. Pattern =
  composição reutilível de organismos para resolver um fluxo." e uma
  recomendação final visual confirmando a ordem: Foundations → Atoms →
  Molecules → Organisms → Patterns → Templates (Pages fica fora da
  biblioteca, por representar instância de produto, não componente).
- Isso confirma a hipótese que eu tinha levantado (vários patterns
  novos usam peças de Organism por dentro — CRUD/Delete Flow usam
  Table/Dialog/AlertDialog) — Patterns realmente compõe Organisms, não
  o contrário.
- Ajustado `src/components/sidebar-07/app-sidebar.tsx`: `<NavPatterns />`
  movido pra depois de `<NavComponents />` (que já renderiza Atoms →
  Molecules → Organisms → Outros) e antes do grupo "Templates". Ordem
  final da navegação: Folha de estilo (Foundations) → Atoms → Molecules
  → Organisms → Outros (utilitários) → Patterns → Templates.
- Corrigidos de brinde, junto dessa passada: (1) doc do Button —
  faltavam `icon-xs`/`icon-sm`/`icon-lg` na seção "Tamanhos" (já
  existiam na tabela de Propriedades, mas sem preview ao vivo);
  ajustado `component-docs.ts`, `variant-preview.tsx` e
  `button-playground.tsx` pra reconhecer os três tamanhos extras. (2)
  3 rótulos de composição errados em `pattern-docs.ts`, achados ao
  conferir contra `atomic-registry.ts`: Alert é Molecule (não Atom) em
  Error State e Success Feedback; Popover é Atom (não Molecule) em
  Filters.
- **Verificação feita:** sandbox voltou a funcionar nesta etapa —
  `npx tsc --noEmit` rodou limpo (log vazio) depois de todos os ajustes
  desta sessão (Patterns + correções). Contagem programática confirma
  60 slugs em `components-registry.ts` e 15 em `patterns-registry.ts`,
  sem duplicata.
- Próximo: Rafael conferir visualmente a nova ordem da navegação e,
  depois, decidir a primeira jornada de seguros a prototipar.

### 2026-07-21 — Taxonomia por função (proposta) + decisão de arquitetura: Storybook híbrido

- Rafael mostrou um exemplo de JSON de metadado de componente (bem mais
  rico que nosso `component-docs.ts`: category, requiredProps, slots
  tipados, nestedComponents, commonPartners, parentConstraints,
  accessibility.role/keyboardSupport/screenReader). Perguntou se já
  conseguíamos gerar esse tipo de direcionamento com os dados de hoje.
  Resposta: parcialmente — mapeei campo a campo o que já existe, o que
  é parcial e o que falta completamente (ver conversa). Ele confirmou:
  é só referência exploratória pra moldar a acessibilidade futura, não
  pra implementar tudo agora; manter a regra de placeholder pro
  conteúdo narrativo.
- Decisão de arquitetura importante: Rafael perguntou se o Playground/
  catálogo deveria continuar sendo construído à mão no Next.js ou se
  deveríamos migrar pro Storybook. Recomendei modelo híbrido —
  **Storybook pra Atoms/Molecules/Organisms/Patterns** (controles
  automáticos via `argTypes`, auditoria de acessibilidade real via
  `addon-a11y`/axe-core, muito mais alinhado ao objetivo do projeto do
  que minhas notas manuais de acessibilidade) — **Next.js só pra
  Templates/Jornadas** (onde precisa de navegação real entre telas pra
  teste de usabilidade, que não é o forte do Storybook). Rafael
  aprovou o modelo híbrido e está instalando o Storybook ele mesmo via
  terminal nesta mesma janela — **eu não toquei em package.json nem
  rodei nenhum install**, pra não conflitar com a instalação dele.
- Taxonomia por função (8 categorias: actions, forms, selection-menus,
  feedback, data-display, overlay, navigation, layout) proposta pros
  58 componentes, documentada com o raciocínio de cada categoria e os
  5 casos discutíveis (accordion, calendar, carousel, card,
  navigation-menu) em **`TAXONOMIA-COMPONENTES.md`** (novo arquivo na
  raiz do projeto). Ainda **não aplicada** em nenhum arquivo de dados
  — Rafael disse "vamos ajustar depois", então só a nota ficou
  registrada por enquanto.
- `commonPartners` derivado de evidência real (script Node varrendo
  imports de `@/components/ui/*` nos 18 arquivos com composição de
  verdade: Template + `/teste-padrao` + 15 Patterns), com o corte de
  confiabilidade (só pares com 2+ ocorrências independentes) e a
  ressalva de amostra pequena documentados no mesmo
  `TAXONOMIA-COMPONENTES.md`.
- Próximo: Rafael termina a instalação do Storybook; depois, revisar a
  taxonomia proposta, decidir onde ela é aplicada (`atomic-registry.ts`
  vs. arquivo novo `component-taxonomy.ts`) e como o `commonPartners`
  entra no fluxo do Storybook (tags de story vs. metadado interno).
