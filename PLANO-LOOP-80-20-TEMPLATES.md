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

### 2026-07-21 — Storybook instalado e piloto aprovado; Git inicializado; Button: elevation + API icon/label

- Rafael instalou o Storybook 10.5.3 ele mesmo pelo terminal
  (`@storybook/nextjs-vite`, addons a11y/docs/vitest/mcp/chromatic).
  Troubleshooting feito só por diagnóstico (sem eu tocar em
  package.json): install de dependências falhou na primeira tentativa
  (transiente — `npm install` manual resolveu, "added 222 packages"),
  binário do `storybook` não existia até o install completar, Playwright
  Chromium instalado com sucesso pro `addon-vitest`.
- Piloto de 4 stories criado pra validar o modelo híbrido antes de
  converter os 58+15 componentes: `button.stories.tsx` (Atoms/Button),
  `alert.stories.tsx` (Molecules/Alert), `accordion.stories.tsx`
  (Organisms/Accordion), `empty-state.stories.tsx` (Patterns/Empty
  State) — títulos já seguindo a hierarquia confirmada.
- Bug encontrado no piloto: Storybook renderizava os componentes sem
  nenhum estilo (sem Tailwind, sem tokens). Causa: `.storybook/
  preview.tsx` nunca importava `src/app/globals.css`. Corrigido com o
  import + um decorator `antialiased font-sans`. Gap conhecido e não
  bloqueante: as fontes do Google via `next/font/google` são mecanismo
  específico do Next.js e não carregam no Storybook — tipografia cai no
  fallback do sistema até resolver isso separadamente.
- Removido o scaffold padrão do Storybook (`src/stories/`) após
  confirmação explícita do Rafael ("Sim, apague") — precisou de
  `mcp__cowork__allow_cowork_file_delete` porque a pasta do projeto é
  protegida contra `rm` direto.
- Git inicializado: `git init`, `.gitignore` ajustado (test-results,
  playwright-report, blob-report, playwright/.cache — resto já
  cobria node_modules/.next/storybook-static), primeiro commit feito
  ("Setup inicial: design system + Storybook"). Erro no meio do caminho:
  "Author identity unknown" — faltava `git config --global user.email`
  e `user.name`, configurado e o commit já staged foi concluído.
- Button, dois pedidos juntos:
  1. Elevation tátil no variant `default`: sombra base (`shadow-sm`)
     que diminui (`shadow-xs`) e desloca 1px pra baixo
     (`translate-y-px`) no hover, simulando uma "descida" física; no
     disabled, sombra removida e posição volta ao neutro. Só o variant
     `default` — os outros (secondary/outline/ghost/destructive/link)
     não tinham sombra de base pra começar, então não se aplica.
  2. API redesenhada pra nunca permitir um Button sem ícone E sem
     label ao mesmo tempo (opção que Rafael escolheu explicitamente:
     "Redesenhar a API"). Union discriminada em `button.tsx`:
     `children` (livre, cobre asChild/ButtonGroup/Spinner+texto
     condicional — tudo que já existia) OU `icon`/`label` (exige pelo
     menos um dos dois). Decisão de design que tomei sem confirmação
     explícita do Rafael: mantive `children` funcionando 100% como
     antes (aditivo, não removi nada) em vez de forçar todo o código
     existente a migrar pra `icon`/`label` — evita quebrar as
     centenas de usos já espalhados (Patterns, Template, os 208
     exemplos oficiais, Playground, `AttachmentAction` etc.). Verificado
     com `tsc --noEmit` na base inteira, zero erros, antes e depois da
     doc.
  3. `component-docs.ts` (entry `button`): `anatomy` atualizado
     (Ícone/Label agora citam a exclusividade) e três novas linhas na
     tabela `props` (`icon`, `label`, `children`).
  4. `button.stories.tsx` atualizado com stories novas: `IconAndLabel`,
     `LabelOnly`, `IconOnly` (demonstrando a API nova) e
     `ElevationFeedback` (documentando o comportamento de hover/
     disabled). `tsc --noEmit` limpo depois dessa edição também.
- Pendente, meu (ainda não resolvido): a primeira metade do pedido
  original do Rafael — "Senti falta no botão de ter os acionamentos de
  Cores, raio de borda, espessura de linha" — não foi implementada.
  Falta decidir com ele: (a) é um controle global no Storybook/
  Foundations que afeta todos os componentes, ou específico da story do
  Button; (b) border-width não é um token hoje (só existe `--radius` e
  cores) — precisa criar `--border-width` em `globals.css` ou não.

### 2026-07-21 — Tokens de Shape completos + painel único no Storybook (resolve o pedido pendente acima)

- Rafael confirmou: quer um acionamento único que replica pra todos os
  componentes, e mostrou a estrutura da Nimbus (categoria "Shape" com
  escala nomeada de radius: 0-5, 1 a 6, half, full, base) como
  referência de tokens necessários antes de construir o painel.
- Perguntei e ele escolheu: (1) migrar o radius pra escala nomeada
  estilo Nimbus (em vez de manter só sm/md/lg/xl) e (2) criar
  `--border-width` como token novo, um valor por preset (mesmo modelo
  do `--radius` atual).
- Implementado em `globals.css`, de forma **aditiva** (não troquei nada
  que já existia, só adicionei):
  - Escala nomeada de radius (`--radius-0-5`, `--radius-1` a
    `--radius-6`, `--radius-half`, `--radius-full`, `--radius-base`),
    cada passo um múltiplo de `--radius` — mantém o comportamento de
    "1 token muda a marca inteira" que os presets já tinham, mas agora
    com passos nomeados que um componente pode escolher individualmente,
    igual à Nimbus. Os valores absolutos da Nimbus (0.125rem, 0.25rem...)
    não foram copiados 1:1 de propósito — lá a escala é fixa, aqui ela
    escala com o preset ativo. `--radius-sm/md/lg/xl` (usados pelos 58
    componentes via `rounded-sm/md/lg/xl`) continuam intactos — zero
    risco de quebrar algo existente.
  - `--border-width` (não existia — borda era 1px fixo do Tailwind em
    todo canto): 1px em `:root` (mesmo valor de antes, baseline não
    muda pra quem não tem preset ativo) e 2px no preset `tech`
    (reforça a identidade "quinas retas, sombra dura" que já estava
    documentada no código). Plugado via `--default-border-width` no
    `@theme inline` — essa é a variável de tema que o Tailwind v4 usa
    pro utilitário `border` sem sufixo, então muda em TODO o projeto
    sem precisar editar nenhum componente.
  - Descrição do preset `tech` em `styles-registry.ts` atualizada pra
    mencionar a borda 2px.
- Painel único no Storybook (`.storybook/preview.tsx`): toolbar global
  "Estilo" que reaproveita os mesmos 5 presets do `StyleSwitcher` do
  app (não inventei nada novo — mesma lista, `stylesList`). Um
  decorator aplica `data-style` num `<div>` wrapper em volta de toda
  story; como as regras CSS são seletores de atributo (não escopadas
  só ao `<html>`), isso replica a troca de cor + radius + border-width
  + sombra + fonte em qualquer componente/story ao mesmo tempo — é o
  "acionamento único" que ele pediu.
- Verificação: só CSS + 1 arquivo de config do Storybook mudaram (nenhum
  `.tsx`/`.ts` de componente) — `tsc --noEmit` limpo antes e depois em
  toda a base. Não foi possível rodar `next build`/Tailwind CLI dentro
  do sandbox Linux pra ver o CSS compilado de verdade: o `node_modules`
  foi instalado no Windows do Rafael e trouxe binários nativos
  (lightningcss/oxide) daquela plataforma, que não rodam aqui — então a
  confirmação visual (radius, espessura de borda, troca de preset no
  toolbar do Storybook) depende de ele conferir no `npm run dev` /
  `npm run storybook` dele.
- Gap conhecido, não resolvido ainda: dark mode não tem toggle
  equivalente no Storybook (só o preset de estilo) — os blocos
  `.dark[data-style="..."]` do `globals.css` não são exercitados pelo
  painel novo. Fica pra outra rodada se ele quiser testar dark mode no
  catálogo.

### 2026-07-21 — Migração completa pro Storybook: 55 componentes + 14 patterns restantes

- Rafael aprovou o piloto (Button/Alert/Accordion/Empty State) e pediu
  pra seguir com a migração de tudo. Feito: os 58 componentes (Atoms/
  Molecules/Organisms) e os 15 Patterns agora têm `.stories.tsx` —
  catálogo completo no Storybook.
- Estratégia pra não inventar conteúdo em massa: reaproveitei fontes já
  verificadas neste projeto em vez de escrever exemplo novo por
  componente:
  - **44 componentes "simples"** (sem variant/size real — maioria:
    Input, Checkbox, Card, Dialog, Table, Tabs, Sidebar etc.): a story
    só renderiza o `*-demo` já existente em `src/components/examples/`
    (os 208 exemplos oficiais do shadcn/ui já traduzidos e verificados
    nesta base). Categoria/título vem de `atomic-registry.ts`; nome de
    export confirmado por grep no source de cada componente (não
    assumi PascalCase por convenção — alguns exports reais diferem do
    esperado, ex: `input-otp` exporta `InputOTP`, não `InputOtp`).
  - **11 componentes com variant/size reais** (avatar, badge, switch,
    toggle, native-select, select, item, marker, toggle-group,
    attachment, bubble): reaproveitei os configs já validados em
    `generic-playground.tsx` (mesmos nomes de prop, mesmas opções) pra
    montar `argTypes`/`args` de verdade — controles ao vivo no
    Storybook, igual ao Button/Alert do piloto — mais uma story
    "Examples" com o demo real, pra manter os dois formatos.
  - **14 Patterns**: mesmo template minimalista do piloto Empty State
    (patterns não têm props, só existem pra estar navegáveis no
    catálogo com auditoria de a11y na composição completa).
- Geração feita via script Node local (não um por um manual) pra reduzir
  risco de erro de digitação em nomes de import — mas cada nome de
  export/categoria/demo usado no script foi extraído por grep do código
  real antes de gerar, não inventado.
- Verificação: `tsc --noEmit` limpo em toda a base depois de gerar os
  69 arquivos novos (55 componentes + 14 patterns). Não foi possível
  abrir o Storybook aqui pra ver renderização/controles de verdade
  (mesma limitação de sempre: binários nativos do node_modules são do
  Windows) — confirmação visual real (a11y, controles, layout) depende
  do `npm run storybook` do Rafael.
- Pendente/decisão não tomada por mim: não criei stories extras pras
  variações já existentes como `badge-secondary`/`badge-destructive`/
  `toggle-outline`/`spinner-size` etc. (dezenas de demos "-variant" que
  já existem em `examples/`) — cada componente rico ganhou só 1 story
  "Examples" com o demo principal. Se Rafael quiser o catálogo mais
  granular (uma story por demo existente), é outra rodada.

### 2026-07-21 — Auditoria contra a Nimbus + Sonner reclassificado como Molecule

- Rafael pediu pra usar a base de átomos da Nimbus (link do Storybook
  público deles, página do componente Box) como referência pra garantir
  que a nossa base está boa. Naveguei até lá (via Claude in Chrome, já
  que é uma doc do Storybook renderizada em JS) e mapeei a lista
  completa de Atomic e Composite deles.
- Resultado: os 8 componentes que já estavam em `inProgressEntries`
  (Chip, Tag, FileUploader, IconButton, Link, List, Text, Box) batem
  exatamente com o que a Nimbus tem — confirma que aquela lista foi bem
  derivada. Achei mais 8 que ainda não estavam registrados em lugar
  nenhum: **Icon, MultiSelect, Thumbnail, Title** (Atomic) e
  **SegmentedControl, SplitButton, Stepper, TimePicker** (Composite).
  Rafael pediu pra adicionar ao `inProgressEntries`: os 4 "Atomic" da
  Nimbus (Icon, MultiSelect, Thumbnail, Title) entraram como `atom`; os
  4 "Composite" (SegmentedControl, SplitButton, Stepper, TimePicker)
  entraram como `molecule`/`organism` por analogia com o parente mais
  próximo já existente no nosso registro (SegmentedControl≈ToggleGroup,
  SplitButton≈ButtonGroup → molecule; Stepper≈Accordion,
  TimePicker≈Calendar → organism, pela complexidade de estado). Aparecem
  como card desabilitado "Em construção" nos índices `/atoms`,
  `/molecules` e `/organisms`. `tsc --noEmit` limpo.
- No meio da comparação, Rafael notou (olhando a doc oficial do
  shadcn/ui) que o Sonner "desapareceu" — na verdade ele sempre existeu
  no projeto (`ui/sonner.tsx` + demos `sonner-demo`/`sonner-types`), só
  estava categorizado como **utilitário** (`utilitySlugs`, junto com
  Direction) desde a Fase 0, então não aparecia no catálogo Atoms/
  Molecules/Organisms nem entrou na migração pro Storybook.
- Rafael corrigiu: Sonner substituiu o Toast antigo do shadcn/ui e
  renderiza UI real pro usuário (ícone + texto + ação, mesma
  complexidade do Alert) — não devia estar junto com Direction (que não
  renderiza nada, só contexto de RTL/LTR). Pediu pra encaixar na lógica
  já existente, sem criar categoria nova de "utilitário" no Storybook.
- Feito: `sonner` saiu de `utilitySlugs` e entrou em `atomicRegistry`
  como `molecule` (mesmo raciocínio de complexidade do Alert). Isso já
  basta pra ele aparecer sozinho na nav lateral, na página `/molecules`
  e em qualquer lugar que filtra por `atomicRegistry` — confirmei que
  não existe nenhuma lista hardcoded duplicada, tudo deriva desse
  registro único. Direction continua utilitário (não renderiza nada).
  Criado `sonner.stories.tsx` (Molecules/Sonner) montando `<Toaster />`
  junto com o botão de exemplo, já que o Toaster normalmente é montado
  uma vez só no `app-shell.tsx` (portal) e aqui o Storybook não tem esse
  wrapper.
- Gap que não resolvi agora: Sonner é o único molecule sem entrada rica
  em `component-docs.ts` (todos os outros 12 já têm, das Fases 12-14) —
  a página dele em `/components/sonner` cai no formato antigo
  (Composição + Exemplos) em vez do template padrão. Fica pendente.

### 2026-07-21 — Variações extras nas stories (131 stories novas em 33 arquivos)

- Rafael pediu pra revisitar e ter as variações dos componentes — isso
  batia direto com o gap que eu tinha deixado marcado na migração pro
  Storybook (dezenas de demos "-variant" que já existem em `examples/`
  e não tinham story própria, só o "Examples" com o demo principal).
- Fiz um levantamento de todos os demos de `exampleRegistry` por
  componente e adicionei uma story por demo extra, com uma regra clara
  pra não duplicar conteúdo: **pulei qualquer demo cujo nome batesse
  exatamente com um export que já existia no arquivo** (ex:
  `badge-destructive`/`badge-outline`/`badge-secondary` não entraram
  porque já existem `Destructive`/`Outline`/`Secondary` via `argTypes`
  no `badge.stories.tsx` — mesmo conteúdo, só um `<Badge variant=.../>`
  de uma linha). Essa regra também tirou `toggle-disabled`/`outline`,
  `toggle-group-disabled`/`outline`, `native-select-disabled` e todos
  os `button-secondary`/`outline`/`ghost`/`destructive`/`link` (já
  cobertos pelos controles). Verifiquei manualmente os casos ambíguos
  (`item-size`, `item-variant`, `spinner-size`) e confirmei que são
  composições reais com múltiplos elementos juntos, não duplicata —
  mantive.
- Resultado: 131 stories novas em 33 arquivos (accordion, alert,
  breadcrumb, button, button-group, card, carousel, chart, checkbox,
  combobox, command, dialog, drawer, dropdown-menu, empty, field, form,
  input, input-group, input-otp, item, kbd, native-select, resizable,
  scroll-area, select, sheet, skeleton, sonner, spinner, textarea,
  toggle, toggle-group). Cada story só renderiza o demo real
  correspondente (`render: () => <XxxDemo />`) — nenhum conteúdo novo
  inventado, tudo já existia em `src/components/examples/`.
- Feito via script Node (mesmo padrão da migração original): lê cada
  `.stories.tsx` já existente, checa os exports atuais pra não colidir,
  insere os imports novos e acrescenta as stories no final do arquivo.
  `tsc --noEmit` limpo em toda a base depois.
- Não incluí: os componentes que já tinham cobertura completa das
  variações via `argTypes` sem demo extra sobrando (avatar, aspect-ratio,
  attachment, bubble, switch — nenhum demo "-variant" além do principal),
  e os utilitários fora do catálogo (direction) — sem story.

### 2026-07-21 — Description/whenToUse reais preenchidos em component-docs.ts

- Regra explícita do Rafael: não inventar texto narrativo, mas dados
  vindos de repositórios válidos (shadcn/ui, Nimbus) podem ser usados,
  desde que localizados em português.
- Busquei a descrição real de cada um dos 58 componentes na doc oficial
  do shadcn/ui (`ui.shadcn.com/docs/components/{slug}`, campo
  `meta-description`), traduzi pro PT-BR e substituí os placeholders
  `"[a preencher]"` de `description` em `component-docs.ts`. O campo
  `whenToUse` foi escrito como uma paráfrase direta e restrita da mesma
  descrição sourced (sem adicionar casos de uso não mencionados na
  fonte).
- Também criei a entrada completa do `sonner` em `component-docs.ts`
  (gap identificado na entrada de log anterior — era o único dos 13
  Molecules sem doc no formato padrão). Anatomia, variantes e código
  vieram do uso real (`Toaster` + `toast()`) já presente no projeto
  (`sonner.stories.tsx`, `sonner-demo.tsx`, `sonner-types.tsx`).
- `doGuidelines`/`dontGuidelines` permanecem `"[a preencher]"` em todos
  os 59 componentes — a doc oficial do shadcn/ui não publica orientação
  explícita de "faça/não faça" por componente, e inventar esse conteúdo
  violaria a regra do Rafael. Pendente até surgir uma fonte válida.
- Substituição feita via script Python (regex por slug único, já que o
  placeholder é idêntico nos 58 componentes) para evitar erro manual em
  volume alto. `tsc --noEmit` limpo depois da mudança.
- Gaps identificados mas fora do escopo desta tarefa (não confirmados
  com o Rafael): shadcn/ui lista hoje componentes ausentes deste projeto
  (`Data Table`, `Date Picker`, `Message Scroller`, `Toast` como
  componente legado separado do Sonner) — não tracked em nenhum lugar
  ainda, diferente do que foi feito pros 8 gaps do Nimbus.

### 2026-07-21 — Button: variantes ai-primary/ai-secondary + fullWidth + Button.Skeleton (paridade com Nimbus)

- Pedido do Rafael: o Button deste projeto ganhar as características do
  Button da Nimbus Design System (Tiendanube/Nuvemshop), a partir do
  link do Storybook Nimbus que ele mandou.
- Storybook da Nimbus só expôs 2 props via Controls (`appearance`,
  `children`) — insuficiente pra ver a API completa. Fonte real usada:
  os pacotes publicados no npm via unpkg.com
  (`@nimbus-ds/button@2.11.1/dist/index.d.ts` e `dist/index.js`) pra
  props/defaults, e a documentação oficial
  (`nimbus.nuvemshop.com.br/documentation/ai-experiences/referencia-tecnica`,
  verificada com `@nimbus-ds/tokens@9.6.0` e `@nimbus-ds/styles@9.65.0`)
  pros valores exatos de cor/gradiente das variantes de IA — nenhuma cor
  foi inventada.
- Antes de codar, perguntei ao Rafael (AskUserQuestion) como reconciliar
  a nomenclatura diferente entre os dois sistemas (Nimbus usa
  `appearance`, nós usamos `variant`; nomes de valores também diferem) e
  se ele queria o `Button.Skeleton`. Decisão dele: manter nossos nomes
  atuais, só adicionar aditivamente o que falta (variantes de IA +
  `fullWidth`), e sim criar o `Button.Skeleton`.
- Mudanças em `src/components/ui/button.tsx`:
  - Duas novas entradas em `variant`: `ai-primary` (gradiente de 3 cores
    azul/violeta/rosa, texto branco) e `ai-secondary` (fundo/borda em
    tom violeta claro, texto escuro) — equivalentes a
    `appearance="ai-primary"/"ai-secondary"` da Nimbus, mas com nosso
    nome de prop (`variant`) preservado.
  - Prop nova `fullWidth` (boolean, default `false`, mesmo nome/default
    da Nimbus) — aplica `w-full`.
  - `Button.Skeleton` (via `Object.assign`, já que `function Button` não
    tem esse membro no tipo inferido): placeholder de loading do mesmo
    formato do botão real. Decisão deliberada: ao contrário da Nimbus
    (que usa um tamanho fixo, `width: 4.75rem`/`height: 2rem`, porque o
    Button dela não tem escala própria), o nosso é *size-aware* — reusa
    nossa escala `xs/sm/default/lg/icon*` já existente, mais coerente
    com o resto do projeto. As larguras do skeleton por size são uma
    estimativa nossa (não um token Nimbus), ajustável via `className`.
  - Decisão deliberada de *não* replicar o 3º gradiente da Nimbus
    (específico pra estado disabled, com tons mais claros): mantive o
    `disabled:opacity-50` global que já existe pra todas as variantes
    deste Button, pra não criar um comportamento de disabled diferente
    só pra uma variante.
- Tokens novos em `src/app/globals.css` (`:root`, sem bloco `.dark` —
  a própria doc da Nimbus afirma que os valores de IA são idênticos em
  light/dark): `--ai-surface`, `--ai-surface-highlight`,
  `--ai-interactive`, `--ai-interactive-hover`, `--ai-interactive-pressed`,
  `--ai-text-low`, `--ai-text-high` (mapeados em `--color-ai-*` no
  `@theme inline`, pra virar utilitário Tailwind tipo `bg-ai-surface`) e
  `--ai-gradient-rest`/`--ai-gradient-hover` (background-image direto,
  fora do `@theme` porque não é um token de cor simples). Valores
  mantidos em hex (não convertidos pra OKLCH) porque não são tokens
  nossos — converter introduziria arredondamento em cima de um valor que
  não criamos. Hoje só o Button consome; ficam disponíveis pra
  Input/Select/Chip/Tag quando os padrões de IA equivalentes da Nimbus
  forem adicionados a outros componentes deste projeto.
- `component-docs.ts`: entrada `button` atualizada com as 2 variantes
  novas, a prop `fullWidth`, uma nota de anatomy sobre o
  `Button.Skeleton`, e um exemplo de código extra.
- `tsc --noEmit` limpo depois de cada etapa (tokens, componente, docs).
- Pendente/fora do escopo desta tarefa: os outros padrões de IA da
  Nimbus que usam os mesmos tokens em outros componentes (`Input`,
  `Textarea`, `Select`, `Chip`, `Checkbox`, `ProgressBar`, `IconButton`,
  `Tag`, `Icon`, `Text` com `aiGenerated`/`color="ai-generative"`) — não
  pedido pelo Rafael nesta conversa, não tracked como gap ainda.

### 2026-07-22 — Loop: overlays (Tooltip e família) não herdavam tokens de marca por preset

- Gatilho: Rafael reportou "o Tooltip está ruim, elementos que abrem
  depois de uma ação primária não herdam os tokens de estilo" e pediu
  pra rodar em "modo autônomo" (referência ao protocolo já documentado
  neste arquivo — não existe skill formal chamado `/loop-goal`, é este
  mesmo processo). Antes de tocar em código, investiguei a causa raiz e
  levei 2 decisões pra ele (ainda disponível na hora) via pergunta de
  múltipla escolha, em vez de presumir:
  1. Estratégia: expandir os tokens de cada preset (escolhido) vs.
     reatribuir os componentes pra tokens que já variam.
  2. Escopo: só Tooltip vs. todos os overlays (escolhido: todos).
- **Causa raiz real**: cada componente overlay (Popover, DropdownMenu,
  HoverCard, Menubar, Select, Combobox, Command, Calendar, Card, etc.)
  já usava a classe de token certa (`bg-popover`, `bg-card`, `bg-accent`
  etc. — não era bug de componente). O gap era que nenhum dos 4 presets
  (`editorial`, `tech`, `soft`, `midnight`) sobrescrevia
  `--popover`/`--card`/`--muted`/`--accent` — só
  `--primary`/`--secondary`/`--border`/`--ring`/`--chart-*`/
  `--sidebar-primary` mudavam por preset. Resultado: essas superfícies
  ficavam sempre cinza puro (o valor de `:root`), em qualquer preset.
  Único caso que era mesmo bug de componente: `Tooltip` usava
  `bg-foreground`/`text-background` (monocromático invertido, convenção
  padrão do shadcn/ui) em vez de `bg-popover`/`text-popover-foreground`
  como o resto da família — por isso nunca mudava de cor nem depois do
  fix de token.
- **Fix em `globals.css`**: adicionei `--card`/`--card-foreground`/
  `--popover`/`--popover-foreground`/`--muted`/`--muted-foreground`/
  `--accent`/`--accent-foreground` em `[data-style="editorial"]`,
  `[data-style="tech"]` e `[data-style="soft"]` (light e dark de cada
  um), com tons derivados do mesmo hue que cada preset já usa em
  primary/secondary — nada inventado sem critério, segui a lógica que o
  próprio arquivo já estabelece (tom + croma baixo pro hue do preset).
  `midnight` já cobria os 4 desde que foi criado; só faltava
  `--destructive`/`--destructive-foreground` (herdava o vermelho de
  `:root`, calibrado pra fundo claro — pouco legível no navy-violeta
  escuro do preset), adicionei reusando o tom que `.dark` (base) já usa.
  Decisão provisória: mantive `--destructive` SEM variação de hue nos
  outros 3 presets (fica vermelho universal) — vermelho de perigo/erro é
  convenção reconhecida independente de marca; se Rafael preferir
  destructive tingido por preset, é uma linha por preset pra adicionar.
- **Fix em `tooltip.tsx`** (PROVISÓRIO — comentário no código também):
  troquei `bg-foreground`/`text-background` por
  `bg-popover`/`text-popover-foreground`/`border`, mesma linguagem visual
  de Popover/DropdownMenu/HoverCard/Menubar. Isso muda a aparência de
  "chip sólido escuro" pra "superfície clara com borda" — é a mudança
  visual mais perceptível deste loop. Se Rafael preferir manter o chip
  sólido mas ainda tingido por marca, a alternativa seria
  `bg-primary`/`text-primary-foreground` (mantém o "chip" mas fica mais
  chamativo, com a cor de ação principal em todo tooltip do app) — não
  escolhi essa por ficar visualmente mais pesado num elemento que deveria
  ser discreto.
- **Auditoria completa** (pedido do Rafael: "revisar e atualizar TODOS os
  componentes... mantendo nossa estrutura de tokens"): rodei grep em
  todo `src/components/ui/*.tsx` (58 arquivos) e `src/components/
  patterns/*.tsx` (15 arquivos) procurando cor Tailwind hardcoded
  (`bg-red-500`, `text-blue-600` etc.) ou hex/rgb/hsl inline fora de
  token. **Resultado: zero ocorrências nos dois diretórios** — a camada
  de componentes reais do design system já era 100% token-compliant,
  fora do gap de preset que acabei de corrigir. As únicas ocorrências de
  cor fixa do projeto inteiro estão em `src/components/examples/*.tsx`
  (demos que existem justamente pra ilustrar customização pontual: medidor
  de força de senha vermelho/amarelo/verde, spinner com 5 cores pra
  mostrar que dá pra sobrescrever, botão "favorito" azul) e em
  `src/components/portfolio/hero.tsx` (página fixa fora do sistema de
  presets, de propósito — não é peça do design system). Não toquei em
  nenhum dos dois: são conteúdo demonstrativo, não os componentes em si,
  e "corrigir" tiraria o propósito do próprio demo.
- Gap identificado mas **não implementado** (fora do escopo confirmado
  desta vez): a Nimbus tem um padrão inteiro de IA além do Button
  (`aiGenerated`/`appearance="ai-generative"` em Input, Textarea, Select,
  Chip, Checkbox, ProgressBar, IconButton, Tag) que usa os mesmos tokens
  `--ai-*` já criados em `globals.css` — daria pra estender pra esses
  componentes reaproveitando o que já existe. Não fiz agora porque seria
  abrir uma frente nova (decisão de escopo, não técnica); fica registrado
  aqui como próximo passo natural, não como pendência silenciosa.
- `tsc --noEmit` limpo depois de cada bloco de mudança (tokens, depois
  Tooltip). Verificação visual (screenshot nos 4 presets × claro/escuro)
  **não foi possível no sandbox** — não tenho o dev server/Storybook do
  Rafael rodando aqui (roda local, no Windows dele). Fica pendente ele
  conferir visualmente ao abrir `npm run storybook` ou `/estilo`.

##### 2026-07-22 — Camada de primitivos de cor: extração, conversão pra hex, modo nativo claro/escuro e escalas de status/categóricas

Continuação do mesmo dia, depois da conversa sobre arquitetura de tokens
(primitivos → semânticos → component tokens) baseada numa pesquisa que o
Rafael tinha feito com Claude no celular. Ele confirmou: "marca de
cliente" pra teste de usabilidade é o MESMO conceito que "preset" (não um
eixo novo) — cada cliente futuro vira um preset completo, igual
editorial/tech/soft/midnight já são.

**1. Extração de primitivos (evidência real, não hipotética).** Rodei
grep em `globals.css` e achei duplicação literal do mesmo valor OKLCH em
2 a 5 papéis semânticos dentro do MESMO bloco, em TODOS os 9 blocos
existentes na hora (inclusive no `:root`/`.dark` base, que eu nem tinha
tocado antes) — ex: editorial tinha o mesmo valor em `--primary`,
`--chart-5` e `--sidebar-primary` ao mesmo tempo. Extraí um padrão de 4
slots por bloco (`surface`/`surface-foreground`/`action`/
`action-foreground`), só onde a duplicação já existia de fato — não criei
escala nova sem necessidade comprovada. Verifiquei com script Python que
resolve as cadeias de `var()` e compara contra os valores originais
(hardcoded a partir da leitura completa do arquivo antes da mudança):
achei e corrigi 2 erros meus de transcrição nesse processo (um `--accent`
e um `--secondary-foreground` apontando pro primitivo errado) — a
verificação programática é o que pegou os dois, não revisão visual.

**2. Conversão OKLCH → hex.** Rafael pediu explicitamente: cores
primitivas em hex (não OKLCH), porque (a) ele vai espelhar como variável
no Figma pra documentação, e (b) ferramenta de contraste (a nossa própria
auditoria de acessibilidade de hoje, e provavelmente plugins de Figma
depois) funciona direto com hex/sRGB sem precisar de conversão manual.
Escrevi um conversor OKLCH→OKLab→sRGB linear→sRGB gamma (fórmulas
publicadas de Björn Ottosson, as mesmas usadas por navegadores e por
`culori`/`colorjs.io`), validado contra os casos triviais (branco/preto
puro) antes de rodar em produção. Converti os 34 primitivos extraídos no
passo 1 pra hex, e verifiquei com o mesmo método (resolver `var()` e
comparar contra o hex esperado calculado a partir do OKLCH original) —
zero desvio de cor. Tokens que NÃO são primitivos extraídos (ex:
`--secondary`, `--muted`, `--border`, `--ring` — continuam literais, sem
duplicação comprovada) permanecem em OKLCH, sem mudança.

**3. Modo nativo claro/escuro (resolvendo a divergência que o Rafael
apontou).** Antes de hoje, midnight era o único preset que ficava escuro
sem depender da classe `.dark` — os outros 3 (editorial/tech/soft) só
mostravam a versão escura COM `.dark`. Isso mascarava informação: a
própria auditoria de acessibilidade de hoje rotulou o par
primary/primary-foreground do midnight como "light" (porque tecnicamente
é `[data-style="midnight"]` sem `.dark`), quando na prática é visualmente
escuro — foi exatamente o tipo de divergência que o Rafael descreveu.
Fix:
- `src/lib/styles-registry.ts`: campo novo `nativeMode: "light" | "dark"`
  em cada `StyleEntry` — midnight é `"dark"`, os outros 4 são `"light"`.
- `globals.css`: o que era `[data-style="midnight"]` (só escuro) virou
  `.dark[data-style="midnight"]`, e criei um `[data-style="midnight"]`
  novo (claro) — agora os 5 estilos têm bloco claro E escuro completos,
  simétrico com editorial/tech/soft.
- **PROVISÓRIO**: os valores do midnight claro (hex: `#6D37D2` ação,
  `#FCFBFF` superfície, etc.) foram derivados mecanicamente — mesmo hue
  292.5°, invertendo os passos de luminosidade na mesma proporção que
  tech já usa entre seu próprio claro/escuro (não veio de fonte externa).
  Marcado no código pra revisão visual do Rafael antes de considerar
  definitivo.
- `layout.tsx` (script inline, antes da hidratação) e `style-switcher.tsx`
  (troca em runtime) agora sincronizam a classe `.dark` com o
  `nativeMode` do estilo escolhido. Isso era necessário: como NENHUM
  toggle de tema manual existe hoje no app, sem essa sincronização
  midnight teria passado a renderizar sempre CLARO depois da minha
  mudança (regressão real que eu mesmo ia introduzir, pega antes de virar
  bug — o app nunca tinha um jeito de setar `.dark` antes de hoje).
- Verificação: escrevi um checker específico que confirma os 27 tokens do
  novo `.dark[data-style="midnight"]` resolvem exatamente aos mesmos
  valores que o bloco único original tinha. Na primeira tentativa faltou
  `--sidebar-primary`/`--sidebar-primary-foreground` (esqueci de mover) e
  `--chart-2` ia herdar a cor de ação do bloco CLARO em vez do escuro
  (porque, como editorial/tech/soft, o bloco escuro não redeclarava
  chart) — os dois foram pegos pela verificação programática e corrigidos
  antes de eu reportar como pronto.

**4. Escalas primitivas de status (info/success/warning/danger, 10
passos, 100–1000, hex) e 10 categóricas × 3 luminosidades — tudo global
em `:root`, não duplicado por preset.** Metodologia: curva de L/C fixa
por 10 passos (100=mais claro, 1000=mais escuro), aplicada a um hue por
escala, convertida pra hex só no final. Hues NÃO são arbitrários — reusei
hues já reais do projeto onde existiam (`danger` = hue do `--destructive`
já existente, 27.325°; `info` = hue do `--tech-action`, 264.376°;
`warning` = hue do `--chart-4` de `:root`, 84.429°). `success` não tinha
verde estabelecido no projeto — usei a convenção padrão de mercado
(verde = sucesso), confirmada nos próprios Material/Polaris/Carbon/Nimbus
que pesquisamos no comparativo.md de hoje, não inventei um hue à toa. As
10 categóricas usam hues distribuídos uniformemente a cada 36° (técnica
padrão de paleta categórica, mesmo princípio do `d3.schemeCategory10`) —
um conjunto neutro/global, separado dos `--chart-1..5` por preset (que
continuam existindo, sem mudança).

**5. Decisão que NÃO implementei**: ligar `--destructive` de cada preset
à escala `danger` nova. Os 2 valores atuais de destructive no projeto
(claro e escuro-amigável) não caem exatamente em nenhum passo da escala
(hue 22.216°/27.325° vs o hue fixo 27.325° da escala) — forçar a troca
mudaria a cor renderizada sem o Rafael ter pedido isso especificamente
nesta conversa. Fica registrado como decisão em aberto, não como
pendência silenciosa.

**Pendente pro Rafael revisar/decidir**: valores do midnight claro
(provisórios), se quer criar um toggle manual de tema de verdade (hoje só
existe o sync automático por nativeMode), e se quer ligar `--destructive`
à escala danger aceitando o pequeno desvio de cor.

## Ideias de telas pra testar os componentes (pedido do Rafael pra amanhã)

Rafael pediu telas de dashboard e fluxos de login pra exemplificar/testar
os componentes, e disse aceitar mais ideias. Toda ideia abaixo já tem
componente ou pattern existente no catálogo (nenhuma pressupõe construir
algo novo antes de montar a tela) — contexto usado: mercado segurador,
já estabelecido como domínio real do Rafael.

**Login / autenticação**
- Login simples — `input` + `label` + `button` + `checkbox` ("lembrar-me")
  + link "esqueci senha".
- Login com erro de validação — `field` em estado de erro, mensagem
  inline (testa o padrão de erro do Field/Input).
- Recuperação de senha — `input` + `button` + feedback via `sonner`.
- Seleção de corretora/perfil antes de entrar — `select` ou `combobox`.
- Onboarding em etapas — reaproveita o pattern `multi-step-form` que já
  existe (não precisa criar nada).

**Dashboard / operação de seguros**
- Painel de apólices ativas — `card`/`table` + `badge` de status +
  pattern `filters` (já existe) pra filtrar por tipo/status.
- Novo sinistro — pattern `multi-step-form` + pattern `upload` (envio de
  documentos) + pattern `confirmation-dialog` no final.
- Painel do corretor (lista de clientes) — pattern `search-experience` +
  pattern `pagination` (ambos já existem).
- Cancelar apólice — pattern `delete-flow` (já existe, pensado
  exatamente pra ação destrutiva com confirmação).
- Confirmação de ação (ex: sinistro enviado, apólice renovada) — pattern
  `success-feedback` (já existe).
- Estado vazio (corretor sem clientes ainda, sem apólices) — pattern
  `empty-state` (já existe).
- Estado de erro (falha ao carregar dados da apólice) — pattern
  `error-state` (já existe).
- Central de notificações — pattern `toast-strategy` (já existe).
- Ação assistida por IA — usar o `Button` `variant="ai-primary"` recém
  criado pra algo como "Gerar resumo do sinistro com IA" ou "Sugerir
  cobertura com IA" — só componente já existe, mas o CASO DE USO ainda
  não foi validado com Rafael (é uma ideia, não uma decisão tomada).
- Lista longa de sinistros/histórico — pattern `infinite-scroll` (já
  existe).
- Fluxo de CRUD completo (cadastro de beneficiário, por exemplo) —
  pattern `crud` (já existe, cobre criar/editar/listar/excluir de uma
  vez).

### 2026-07-22 — Correção de contraste AA no accent do preset Suave

O diagnóstico de acessibilidade de hoje (`.review/acessibilidade.md`) já
tinha flagrado `primary`/`primary-foreground` do preset Suave (claro)
como reprovado em AA texto normal. Ao revisar o mesmo problema no
projeto irmão (portfólio, `DESIGN.md`, direção "suave" — cópia direta
desse preset), o Rafael pediu pra corrigir também aqui no shadcn-local.

- `--soft-action` (globals.css, bloco `[data-style="soft"]`): de
  `#EB5169` para `#E31A39`. Mesmo H/S (351°/79%), só L 62%→50% — cor
  mais escura, mesma família de matiz (salmão → vermelho/carmim mais
  carregado).
- Motivo: `--primary` (`--soft-action`) contra `--primary-foreground`
  (`#FFF9FA`) media 3.41:1 — reprova AA texto normal (4.5:1). O novo
  valor mede 4.52:1 — passa. `--soft-dark-action` (bloco escuro) já
  passava (6.81:1) e não foi alterado.
- Efeitos colaterais automáticos (via `var(--soft-action)`):
  `--chart-3` e `--sidebar-primary` também mudaram de cor — esperado,
  são o mesmo token.
- `swatch` do preset "Suave" em `styles-registry.ts` também atualizado
  (de `oklch(0.65 0.19 15)` pra `#E31A39`), pra bolinha do seletor
  continuar refletindo a cor real do preset.
- Não alterado: `--ring`, `--shadow-*` do preset Suave (usam
  `oklch(0.6/0.65 0.2 15 / alpha)` literal, não a variável
  `--soft-action`) — são decorativos, sem requisito de contraste de
  texto, e trocar mudaria a sombra/anel visualmente sem necessidade.
  Se o Rafael quiser esses também mais escuros por consistência visual
  (não por acessibilidade), é decisão separada.
- Verificado computacionalmente (contraste WCAG) antes e depois da
  troca; nenhum outro arquivo do projeto referenciava `#EB5169` como
  valor "vivo" (só a correção acima em comentário histórico).
