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

> **Atualização 2026-07-29:** os 2 primeiros itens abaixo já foram feitos
> (ver Log) — ficam registrados aqui só como histórico do escopo original.
> Os itens 3 e 4 continuam abertos; item 3 (Atoms "em construção") virou a
> Fase 6, abaixo.

- ~~Patterns (Empty State, CRUD, Multi-step Form etc. — 15 no mapa
  original)~~ — feito em 2026-07-21 (ver Log).
- ~~Conteúdo narrativo dos componentes (retomar `PLANO-DESIGN-SYSTEM.md`)~~
  — continua sendo trabalho do Rafael, não da IA (regra da Fase 0); não é
  uma tarefa a "concluir" por um agente.
- Atoms "em construção" — **ver Fase 6**, abaixo (escopo revisado: 15
  componentes, não 8).
- Separar documentação/playground em camadas distintas (decisão em aberto,
  não decidida ainda)

---

## Fase 6 — Componentes previstos ainda não construídos + correções de acessibilidade AA

> **Execução autônoma e direta, sem parar para checkpoint do Rafael.** Vale
> integralmente o "Modo autônomo" já descrito acima neste arquivo: decide
> com base no que já está estabelecido, marca decisão como provisória na
> tabela "Decisões provisórias", mantém a decisão barata de reverter,
> continua o loop sem esperar resposta. Só a regra 7 (irreversível/
> destrutivo) para de verdade — fora isso, nenhum agente deve travar
> esperando aprovação item a item. Cada componente abaixo é independente
> dos outros — pode rodar em paralelo (1 agente por componente) sem
> conflito de arquivo, exceto nos 3 arquivos compartilhados que todos
> tocam (`atomic-registry.ts`, `components-registry.ts`,
> `component-docs.ts`) — nesses, cada agente edita só a própria entrada
> (append), nunca reescreve o arquivo inteiro, pra evitar um agente
> sobrescrever a edição do outro.

### 6.0 — Corrigir inconsistência do Icon (achado durante o levantamento, não pedido por Rafael)

`Icon` já foi construído e registrado em `components-registry.ts`
(commit `0b2b1f6`) e já tem entrada em `component-docs.ts` — mas
`atomic-registry.ts` ainda lista `Icon` dentro de `inProgressEntries`,
então ele aparece como card desabilitado "Em construção" em `/atoms`
mesmo já existindo e funcionando.

- [x] Mover a entrada `{ name: "Icon", category: "atom" }` de
      `inProgressEntries` para `atomicRegistry` (`icon: "atom"`) em
      `src/lib/atomic-registry.ts`. Feito em 2026-07-30 (ver Log).

**Verificação:** `/atoms` mostra o card do Icon ativo (linkando pra
`/components/icon`), não mais desabilitado.

### 6.1 — Os 15 componentes "em construção" pendentes de verdade

Categoria já definida em `atomic-registry.ts` (`inProgressEntries`):

| Componente | Categoria | Parente mais próximo já no catálogo (referência de padrão) | Status |
|---|---|---|---|
| Chip | Atom | Badge (visual) + Button (ação de remover) | ✅ Concluído 2026-07-30 |
| Tag | Atom | Badge | ✅ Concluído 2026-07-30 |
| File Uploader | Atom | Input + o Pattern "Upload" já existente (`src/components/patterns/`) | ✅ Concluído 2026-07-30 |
| Icon Button | Atom | Button (já suporta ícone-only via prop `icon` sem `label`, mas exige `aria-label` — Icon Button é essa variante formalizada como componente próprio) | ✅ Concluído 2026-07-30 |
| Link | Atom | Button variant `link` (mesma aparência, elemento semântico `<a>`) | ✅ Concluído 2026-07-30 |
| List | Atom | Item (composição de linha) | ✅ Concluído 2026-07-30 |
| Text | Atom | Label (mais próximo em simplicidade) | ✅ Concluído 2026-07-30 |
| Box | Atom | Separator/AspectRatio (primitivo de layout, sem estado) | ✅ Concluído 2026-07-30 |
| MultiSelect | Atom | Select/Combobox | ✅ Concluído 2026-07-30 |
| Thumbnail | Atom | Avatar/AspectRatio | ✅ Concluído 2026-07-30 |
| Title | Atom | Label/Text | ✅ Concluído 2026-07-30 |
| SegmentedControl | Molecule | ToggleGroup | ✅ Concluído 2026-07-30 |
| SplitButton | Molecule | ButtonGroup | ✅ Concluído 2026-07-30 |
| Stepper | Organism | Accordion (estado sequencial complexo) | ✅ Concluído 2026-07-30 |
| TimePicker | Organism | Calendar (Popover + composição com estado) | ✅ Concluído 2026-07-30 |

**Checklist por componente (repetir pra cada um dos 15, 1 agente por
item):**

1. Implementar em `src/components/ui/<slug>.tsx` — seguir a convenção já
   estabelecida no catálogo: `data-slot`, variantes via `cva` quando
   aplicável, só tokens semânticos (nunca cor fixa fora de token). Usar
   o "parente mais próximo" da tabela acima como referência de padrão de
   código, não copiar 1:1 — cada um tem responsabilidade própria.
2. Registrar: `atomic-registry.ts` (mover de `inProgressEntries` pra
   `atomicRegistry`, categoria já definida acima) + `components-registry.ts`
   (`{ slug, name }`).
3. `component-docs.ts`: entrada nova — `anatomy`/`variants`/`states`/
   `sizes`/`props` reais (derivados do código escrito no passo 1).
   `doGuidelines`/`dontGuidelines` continuam placeholder `"[a
   preencher]"` sempre — Rafael escreve esse conteúdo, a IA nunca
   inventa boas práticas. **`description`/`whenToUse` — correção
   2026-07-30:** o texto acima (redigido antes do cabeçalho de
   `component-docs.ts` existir) ficou desatualizado; a convenção real já
   em uso desde 2026-07-21 nos outros 58 componentes é `description`/
   `whenToUse` **reais**, sourced de uma fonte pública citável (ver
   cabeçalho do próprio `component-docs.ts`). Pro Chip (1º dos 15),
   sourced do README público do `@nimbus-ds/chip` — decisão registrada
   na tabela "Decisões provisórias" abaixo, com as fontes citadas em
   `docs/archive/componentes/chip/spec.md`. Repetir esse padrão pros outros 14: se
   houver fonte pública citável (Nimbus ou equivalente), usar texto real
   sourced e citado; se não houver fonte nenhuma, aí sim placeholder — não
   inventar.
4. Storybook: `<slug>.stories.tsx`, mesmo padrão dos outros 59 (título
   por categoria via `atomic-registry`, `argTypes` reais se houver
   variant/size).
5. Se o componente tiver variant/size reais na raiz (mesmo critério já
   usado pros outros 12 — ver entrada de 2026-07-20 "Playground
   genericizado"): adicionar em `generic-playground.tsx`.
6. Verificação: `tsc --noEmit` limpo; grep confirma import/export
   corretos; grep confirma zero cor hardcoded fora de token; todo ícone
   (lucide/material-symbols) usado confirmado por grep antes de
   importar.
7. Acessibilidade mínima: nome acessível garantido pelo próprio tipo
   (ex: Icon Button não pode existir sem `aria-label`, mesmo padrão já
   aplicado no `button.tsx`), foco visível, navegação por teclado nos
   que têm interação (Chip removível, Stepper, TimePicker, SplitButton).

**Nota importante:** este projeto não tem acesso direto à documentação
do Nimbus (produto separado do Rafael, só citado de memória nas sessões
anteriores) — nenhum agente deve inventar comportamento incompatível
por suposição. Na ausência de referência de comportamento, seguir o
padrão mais consistente já usado no catálogo (mesma regra do "Modo
autônomo") e registrar a escolha como decisão provisória na tabela
abaixo.

### 6.2 — Correções de acessibilidade AA (achados de `docs/active/revisao-ds/diagnostico.md`) — ✅ concluído 2026-07-30

> **Correção de rótulo, achada ao recalcular antes de ajustar:** os itens
> A1 e A2 abaixo diziam "midnight/light" — na verdade os pares que
> reprovavam são de **midnight/dark** (`.dark[data-style="midnight"]`).
> `midnight/light` já passava (6.31:1 no primary, herda o destructive de
> `:root` a 4.57:1). O comentário já existente em `globals.css` linha
> ~884 (junto de `--midnight-dark-action`) já tinha a rotulagem certa —
> só o texto deste plano estava desatualizado. Confirmado recalculando
> os 81 pares antes de tocar em qualquer valor, não só confiando no texto
> do plano.
>
> **M1 também estava obsoleto:** `--primary`/`--primary-foreground` de
> `soft/light` já tinha sido corrigido em 2026-07-22 (`#EB5169`→`#E31A39`,
> ver comentário em `globals.css` linha ~722) — recalculado agora em
> 4.51:1, já passa. Não precisou de novo ajuste. Sobraram 3 pares reais
> a corrigir (A1, A2, M2), não 4 — o plano contava M1 que já não existia
> mais como problema.

- [x] **A1 (ALTA):** `--destructive`/`--destructive-foreground` em
      `.dark` (base) — 2.77:1. Corrigido só via luminosidade OKLCH
      (`#FF6467`→`#D23943`, L 0.702→0.578, mesmo H=22.2°/C=0.189
      preservados) → **4.57:1**. Propaga por cascata pra `editorial/dark`,
      `tech/dark` e `soft/dark` (nenhum dos 3 sobrescreve
      `--destructive`, herdam de `.dark` base) — resolve os 4 casos
      citados no plano original de uma vez. `.dark[data-style="midnight"]`
      redefine o mesmo par explicitamente (não herda) — ajustado em
      paralelo com o mesmo valor, por consistência.
- [x] **A2 (ALTA):** `--midnight-dark-action`/`-foreground` em
      `.dark[data-style="midnight"]` — 2.55:1 (a pior razão das 81
      combinações). Corrigido só via luminosidade OKLCH
      (`#AA89FF`→`#7F5CCE`, L 0.711→0.567, mesmo H=294.6°/C=0.169
      preservados) → **4.56:1**. Propaga automaticamente pros 3 papéis
      que referenciam essa variável (`primary`, `chart-2`,
      `sidebar-primary`), sem precisar editar os 3.
- [x] **M2 (MÉDIA):** `--muted-foreground`/`--muted` em `:root` (default/
      light) — 4.35:1. Corrigido só via luminosidade OKLCH
      (`#737373`→`#6F6F6F`, L 0.556→0.543 — cinza puro, C=0 antes e
      depois, sem hue) → **4.61:1**.
- [x] ~~M1 (MÉDIA): `--primary`/`--primary-foreground` em `soft/light`~~
      — já corrigido em 2026-07-22, confirmado ainda válido (4.51:1),
      nenhuma ação necessária.

**Verificação:** contraste recalculado programaticamente (luminância
relativa WCAG, mesmo método de `docs/active/revisao-ds/acessibilidade.md`) pros 3 pares
corrigidos — todos ≥4.5:1 AA texto normal. Mudança isolada em
`globals.css` (7 linhas de valor, só cor — nenhum `.ts`/`.tsx` tocado,
`tsc` não é afetado). **Pendente:** verificação visual real dos 3 tons
novos nos respectivos presets (mesma limitação de sandbox sem dev
server já registrada na Fase 6.1).

### Fora de escopo desta fase — não tocar sem Rafael decidir primeiro

- Conteúdo narrativo (`description`/`whenToUse`/`doGuidelines`/
  `dontGuidelines`) dos componentes novos e dos já existentes — é
  trabalho do Rafael, regra fixa desde a Fase 0.
- Revisão da paleta ATLAS (tokens primitivos de cor) — Rafael já disse
  "não agora" (registrado 2026-07-23).
- Aplicar a taxonomia por função de `docs/active/especificacoes/taxonomia-componentes.md` — Rafael
  disse "vamos ajustar depois", decisão em aberto, não confirmada.
- B1/B2 de `docs/active/revisao-ds/diagnostico.md` (tokens de escala tipográfica/
  espaçamento) — classificados como decisão de escopo, não bug.
- Mover `card-video-poc/` pra fora do repo — ação manual do Rafael, sem
  relação com o design system.
- `npm install` de sincronização final do lockfile — ação local do
  Rafael, já registrada como pendência dele.

**Definição de pronto da Fase 6:**
- [x] Os 15 componentes da 6.1 implementados, registrados (`atomic-registry.ts`,
      `components-registry.ts`, `composition-registry.ts`,
      `examples-mapping.ts`, `examples/registry.tsx`, `component-docs.ts`),
      com story no Storybook e `tsc --noEmit` limpo — concluído 2026-07-30
      (ver Log). **Pendente ainda:** verificação visual real (`npm run dev`,
      abrir `/atoms` `/molecules` `/organisms` e cada `/components/<slug>`)
      — não rodou nesta sessão (sem servidor de desenvolvimento ativo);
      recomendado antes de considerar 100% fechado.
- [x] Icon com card ativo em `/atoms` (6.0 corrigido) — 2026-07-30.
- [x] Os pares de cor da 6.2 com contraste ≥4.5:1 confirmado — 3 pares
      reais corrigidos (A1/A2/M2), M1 já estava resolvido desde
      2026-07-22 — concluído 2026-07-30 (ver Log).
- [x] `inProgressEntries` (em `atomic-registry.ts`) vazio — confirmado
      2026-07-30 (array tipado mantido, só sem entradas).

---

> **Status 2026-07-30:** Fase 5A (fluxo de login, 5 telas) e Fase 5B (3 telas de
> seguros) estão concluídas — ver `docs/archive/telas/`. Fase 5C e 5D abaixo
> continuam em aberto, nenhuma ação ainda.

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

## Fase 5 — Jornadas de telas (login + seguros) rumo ao Case público

Rafael quer transformar o racional deste projeto (Atomic Design + tokens
globais + acessibilidade real com leitor de tela) num Case público,
publicado a partir do portfólio (já deployado no Vercel como
`anhaia-portfolio`, stack HTML/CSS/JS estático — **incompatível** com os
componentes React do shadcn-local, então o portfólio não vai "importar"
componente nenhum, só contar a história e linkar pro shadcn-local
deployado como prova viva).

**Decisões tomadas com o Rafael (2026-07-22):**
- Deploy do shadcn-local: repositório novo no GitHub + import no Vercel
  (projeto separado do `anhaia-portfolio`). Repo git local já existe
  (`209ceee` era o único commit; todo o trabalho desta sessão foi
  consolidado num commit novo). **Falta**: eu não tenho `gh` CLI
  autenticado neste ambiente — o Rafael precisa criar o repo no GitHub e
  dar push ele mesmo (ou autorizar acesso), e depois importar no Vercel.
- Escopo da v1 (além do fluxo de login completo): 3 telas do domínio de
  seguros — **Apólices ativas**, **Novo sinistro**, **Painel do
  corretor** — escolhidas por cobrirem listagem/filtro,
  fluxo-multi-etapa-com-upload-e-confirmação, e busca/paginação sem
  inflar o escopo.
- Arquitetura de rotas: continua tudo em `src/app/templates/` (mesmo
  padrão do `dashboard-financeiro` já existente), Next.js como já
  decidido em 2026-07-21 (Storybook = Atoms/Molecules/Organisms/
  Patterns; Next.js = Templates/Jornadas com navegação real, necessária
  pro teste de leitor de tela ponta a ponta).

**Plano de fases:**
1. **5 (feito):** commit consolidando toda a sessão de hoje.
2. **5A — Fluxo de login** (5 rotas novas): login simples → erro de
   validação → recuperação de senha → seleção de perfil/corretora →
   onboarding (reaproveita `multi-step-form`). Nenhum componente novo.
3. **5B — 3 telas de seguros**: Apólices ativas, Novo sinistro, Painel
   do corretor — com os estados de sistema (empty/error/success/toast)
   aplicados DENTRO delas, não como telas isoladas extras.
4. **5C — Storybook público**: rodar `build-storybook` (nunca rodado
   ainda) e decidir onde publicar (subpath do mesmo domínio Vercel vs.
   domínio separado) — decisão pendente, não é bloqueante pra 5A/5B.
5. **5D — Portfólio linka pro case**: só depois do shadcn-local estar
   no ar, adicionar seção/link no `anhaia-portfolio` contando o
   racional e apontando pro app + Storybook publicados.

**Riscos anotados:**
- Repo sem remoto e sem CI até o Rafael criar o GitHub/Vercel — depende
  dele, não é algo que eu resolvo sozinho neste ambiente.
- Dados de exemplo nas telas de seguros precisam ser fictícios antes de
  publicar (nada de dado real de cliente/apólice).


---

## Decisões provisórias — revisar

Ver `docs/active/decisoes/decisoes-provisorias-loop-80-20.md`.

## Log

Resumo condensado em `plans/done/loop-80-20-log-resumo.md`. Histórico
completo dia-a-dia (se precisar do texto original de novo) está em
`git log -p -- PLANO-LOOP-80-20-TEMPLATES.md` antes do commit desta
reorganização.
