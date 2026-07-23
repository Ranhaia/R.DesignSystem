# Especificação de tela — Apólices ativas

- **Slug:** `apolices-ativas` (`src/lib/templates-registry.ts`, hoje em `inProgressTemplates`; mover para `templatesList` só depois de construída)
- **Rota:** `src/app/templates/apolices-ativas/page.tsx`
- **Fluxo:** Fase 5B — telas de seguros (`PLANO-LOOP-80-20-TEMPLATES.md`, seção "Fase 5 — Jornadas de telas (login + seguros) rumo ao Case público")
- **Posição no fluxo:** **1ª das 3 telas de 5B**. Ordem da Fase 5B: `apolices-ativas → novo-sinistro → painel-corretor`. Escolhida para vir primeiro porque cobre **listagem/filtro** — o par "novo-sinistro" cobre fluxo multi-etapa com upload+confirmação, "painel-corretor" cobre busca/paginação (divisão explícita já registrada no plano, linha "escolhidas por cobrirem listagem/filtro, fluxo-multi-etapa-com-upload-e-confirmação, e busca/paginação sem inflar o escopo").
- **Referência de estilo/estrutura:** duas referências combinadas, sem conflito entre elas:
  - `src/app/templates/dashboard-financeiro/page.tsx` — mais próxima do domínio desta tela (dado tabular/cards, não formulário linear): título "Template — …" + parágrafo de contexto, container `w-full rounded-lg border`, **Sidebar mockada** (`SidebarProvider` escopado, `collapsible="none"`, mesmo padrão de `examples/sidebar-demo.tsx`) representando a navegação do portal — não é a `AppSidebar` real do projeto.
  - `src/app/templates/onboarding/page.tsx` / `selecao-perfil-corretora/page.tsx` — convenção do `Select` "Cenário (demonstração)" **fora** do container principal, mesma posição (entre o parágrafo de contexto do `<h1>` e o container bordered).
- **Reaproveita o MECANISMO de 5 Patterns já catalogados** (não cópia, mesmo princípio já usado em `onboarding` com `multi-step-form`): `empty-state.tsx`, `error-state.tsx`, `skeleton.tsx`, `filters.tsx` e `search-experience.tsx`. Os 3 últimos já usam o domínio "apólices" nos próprios componentes do catálogo (`filters.tsx` e `search-experience.tsx` já têm mock de apólices/titulares; `empty-state.tsx` já usa "Nenhuma apólice encontrada" / "Nova apólice" como exemplo real) — não é coincidência, é o motivo desta tela ter sido escolhida para "listagem/filtro". Esta spec reaplica os mesmos mecanismos com conteúdo mais completo (tabela em vez de lista simples, mais colunas), sem inventar peça nova.
- **Não recebe dado de nenhuma tela anterior.** Ver "Onde esta tela se encaixa" e "Lacunas" item 1.

## Onde esta tela se encaixa

Primeira tela de 5B. Diferente das 5 telas de 5A (que formam uma corrente linear com `router.push` encadeado), esta tela **não tem uma tela anterior cabeada** dentro do escopo já construído — é a primeira das 3 telas de seguros a ser especificada. Entrada tratada como direta: usuário navegando para `/templates/apolices-ativas` pela URL, ou (conceitualmente, dentro do domínio) vindo do "Painel do corretor" — que ainda não existe (`painel-corretor` está em `inProgressTemplates`, é a 3ª tela de 5B). Ver "Lacunas" item 1 para a decisão de persistência.

Depois desta tela: a ação de linha "Abrir sinistro" aponta para `/templates/novo-sinistro` (2ª tela de 5B, ainda não construída) — mesma situação de "link correto e intencional, mas morto até a tela existir" já usada em todo o fluxo 5A (`onboarding` → `painel-corretor`, `selecao-perfil-corretora` → `onboarding`). O item de navegação "Painel" da sidebar mockada aponta para `/templates/painel-corretor` (3ª tela de 5B, ainda não construída) — mesma situação.

## Objetivo da tela

Um corretor (ou gestor) revisa a carteira de apólices ativas dos seus clientes, filtra por categoria de seguro para localizar um subconjunto relevante, e a partir de uma apólice específica pode iniciar o registro de um sinistro relacionado.

## Estados que esta tela precisa cobrir

Lista fechada nos estados que fazem sentido para uma tela de listagem/filtro — não replica todos os 15 Patterns do catálogo, só os que esta composição específica usa:

1. **Carregando** — no primeiro carregamento da tela e sempre que o botão "Atualizar" é acionado; mecanismo do Pattern `skeleton.tsx` (placeholder de layout + `aria-busy` + `aria-live`), aplicado à forma de uma tabela em vez de um card de perfil.
2. **Sucesso, com resultados, sem filtro** — tabela completa carregada (volume sugerido: 10-12 apólices, o suficiente para o filtro fazer sentido sem precisar de paginação — paginação é escopo de `painel-corretor`, ver "Composição").
3. **Filtro aplicado, com resultados** — 1+ categorias selecionadas no Popover de filtro; Badges removíveis mostrando o que está ativo; contagem de resultados atualizada.
4. **Filtro aplicado, sem resultados** — combinação de categoria(s) selecionada(s) não bate com nenhuma apólice do mock (ver "Composição — dados fictícios": pelo menos 1 categoria deliberadamente sem apólice ativa, para este estado ser alcançável organicamente, sem precisar do `Select` de cenário).
5. **Vazio real (zero apólices cadastradas)** — não é o mesmo que o estado 4: aqui não existe nenhuma apólice na carteira, mesmo sem filtro nenhum aplicado. Não é alcançável organicamente (o mock sempre tem itens) — depende do `Select` "Cenário de carregamento (demonstração)", ver "Composição".
6. **Erro ao carregar** — a busca da lista (inicial ou via "Atualizar") falha; também depende do `Select` de cenário.
7. **Ação de linha — abrir sinistro relacionado** — clique em "Abrir sinistro" numa apólice navega para fora desta rota (`/templates/novo-sinistro`). Não é um estado visual desta tela, é uma transição de navegação; listado aqui porque é a única ação que sai da tela.

Fora de escopo, registrado como responsabilidade de fora desta tela:
- Tela de detalhe de uma apólice específica (clicar no número da apólice não navega para lugar nenhum — não existe rota de detalhe nas 3 telas de 5B). Ver "Lacunas".
- Fluxo de contratar uma nova apólice (CTA do estado 5 não tem tela própria — ver "Composição, estado 5" e "Lacunas").
- Busca textual e paginação — deliberadamente fora desta tela (ver "Composição"), reservadas para `painel-corretor`.

## Composição — só peças reais do catálogo

Nenhum componente novo. Tudo abaixo já existe em `src/components/ui/` (Atoms/Molecules/Organisms confirmados em `src/lib/atomic-registry.ts`) ou é o mecanismo de um Pattern já catalogado (`src/lib/patterns-registry.ts`) reaplicado com conteúdo desta tela.

### Layout da página (moldura, mesmo padrão das telas irmãs)

- `<h1>` "Template — Apólices ativas" + parágrafo `text-muted-foreground` de contexto (mesmo padrão de todas as telas de 5A/dashboard-financeiro).
- `Select` "Cenário de carregamento (demonstração)" **fora** do container principal (mesma posição de `onboarding`/`selecao-perfil-corretora`: entre o parágrafo de contexto e o container `w-full rounded-lg border`) — ver "Gatilho de demonstração" abaixo.
- Container `w-full rounded-lg border` envolvendo a Sidebar mockada + área de conteúdo (mesmo padrão de `dashboard-financeiro`, **não** o padrão `bg-muted/30 min-h-[640px]` de Card centralizado das telas de login — esta tela é um portal de dados, não um formulário de autenticação).

### Gatilho de demonstração — `Select` "Cenário de carregamento (demonstração)"

Convenção já ratificada (não reaberta aqui — só o "como" desta tela específica, conforme `.build/telas/PENDENCIAS.md` item 2 e diagnóstico de `onboarding`). Controla o resultado do carregamento **inicial** e de toda futura ação **"Atualizar"**:

```
<Label htmlFor="cenario-carregamento">Cenário de carregamento (demonstração)</Label>
<Select value={cenario} onValueChange={setCenario}>
  <SelectTrigger id="cenario-carregamento" size="sm" className="w-64"><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="sucesso">Sucesso — apólices carregadas</SelectItem>
    <SelectItem value="vazio">Vazio — nenhuma apólice cadastrada</SelectItem>
    <SelectItem value="erro">Erro ao carregar</SelectItem>
  </SelectContent>
</Select>
```

Só controla os estados 1/2/5/6 (carregando → sucesso-com-dados / vazio-real / erro). Os estados 3/4 (filtro aplicado, com ou sem resultado) são alcançados organicamente pela interação do próprio usuário com o Popover de filtro — **não** passam pelo `Select` de cenário, mesmo princípio já usado em `filters.tsx`/`search-experience.tsx` (o pattern real do catálogo também não precisa de gatilho de demonstração para seu próprio filtro/busca).

### Sidebar mockada — Organism `sidebar.tsx` (mesmo padrão de `dashboard-financeiro`)

- `SidebarProvider` (escopado) + `Sidebar collapsible="none"` + `SidebarHeader` + `SidebarContent` + `SidebarGroup`/`SidebarGroupLabel` + `SidebarMenu`/`SidebarMenuItem`/`SidebarMenuButton`.
- 1 grupo "Portal do corretor" com 3 itens, dando a conexão visual com as outras 2 telas de 5B:
  - "Painel" (ícone `LayoutDashboardIcon`, já confirmado em uso em `dashboard-financeiro`) → `/templates/painel-corretor`.
  - "Apólices" (ícone sugerido `ShieldCheckIcon`, já confirmado em uso em `dashboard-financeiro`) → item ativo (esta própria tela). **Precisa de `aria-current="page"` explícito**, ver "Requisitos de acessibilidade" item 2 — `isActive` do `SidebarMenuButton` só estiliza, não seta esse atributo sozinho (confirmado no código-fonte de `sidebar.tsx`).
  - "Sinistros" (ícone sugerido `ClipboardListIcon`, já confirmado em uso em `dashboard-financeiro`) → `/templates/novo-sinistro`.

### Área de conteúdo — Organism `card.tsx` envolvendo tudo

- `Card` único (mesmo espírito dos cards de `dashboard-financeiro`, mas aqui 1 card grande em vez de vários pequenos, porque o conteúdo é uma única lista):
  - `CardHeader` (`flex flex-row items-center justify-between`): `CardTitle` "Apólices ativas" + `CardDescription` (contagem de resultados, ver acessibilidade) de um lado; `Badge variant="outline"` "Ambiente de demonstração" + `Button variant="outline" size="sm"` "Atualizar" (com `RefreshCwIcon`, já confirmado em uso em `error-state.tsx`) do outro.
  - `CardContent`: filtro (Popover) + corpo condicional pelos 6 estados de carregamento/dados.

### Filtro — mecanismo do Pattern `filters.tsx`

- Atom `popover.tsx` (`Popover`, `PopoverTrigger asChild`, `PopoverContent`) com `Button variant="outline" size="sm"` + `SlidersHorizontalIcon` "Filtros" como trigger.
- Dentro do `PopoverContent`: Atom `checkbox.tsx` (`Checkbox`) + Atom `label.tsx` (`Label htmlFor`) por categoria — mesma composição do pattern real.
- Categorias sugeridas (mesmo vocabulário já usado em `filters.tsx`/`search-experience.tsx`, mais 1 nova deliberadamente sem apólice ativa para o estado 4 ser alcançável): **Auto, Residencial, Vida, Saúde, Empresarial** (Empresarial sem nenhuma apólice no mock).
- Badges removíveis (Atom `badge.tsx variant="secondary"` + botão `XIcon` com `aria-label` descritivo) — mesma composição do pattern real.
- Região `aria-live="polite"` com a contagem de resultados — reaproveitada também pela `CardDescription` do header (não duplicar o texto, só uma fonte visível + 1 região viva).

### Tabela de apólices — Organism `table.tsx`

- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead` (`scope="col"` explícito — não é automático no componente, ver acessibilidade), `TableCell`.
- Colunas sugeridas: Número da apólice · Titular · Categoria · Vigência até · Status (Atom `badge.tsx`: `variant="default"` "Ativa" / `variant="outline"` "Renovação em breve" — os dois valores continuam sendo apólices ativas, só uma nuance visual sem contradizer o título da tela) · Ações.
- Coluna Ações: Atom `button.tsx` (`Button variant="outline" size="sm"`) "Abrir sinistro" com rótulo de texto visível (não ícone-only, mesmo princípio já usado nas 5 telas de 5A — "botão nunca fica sem rótulo visível") + `ArrowRightIcon` (já confirmado em uso em `onboarding`), renderizado como `<a href>` real via `Button asChild` + `Link href="/templates/novo-sinistro"` (mesmo padrão do CTA final de `onboarding`).
- **Sem paginação** — decisão de escopo desta spec, não lacuna: volume do mock (10-12 itens) não justifica, e paginação já é o foco de `painel-corretor` (evita demonstrar o mesmo Pattern duas vezes em telas vizinhas, mesmo princípio já usado no projeto para não duplicar `bubble`/`message` ou `success-feedback`/`toast-strategy`).
- **Sem campo de busca textual** — mesma decisão de escopo, reservado para `painel-corretor` ("busca/paginação" na divisão do plano). Só o filtro por categoria (Popover) representa "listagem/filtro" nesta tela.

### Estado 1 — Carregando (mecanismo do Pattern `skeleton.tsx`)

- Contêiner com `aria-busy={carregando}` no lugar da `Table`: várias linhas de Atom `skeleton.tsx` (`Skeleton`) com larguras aproximando as colunas reais (não é a `Table` real ainda, é só a forma).
- Região `aria-live="polite"` `sr-only` anunciando "Carregando apólices" / "Apólices carregadas" — mesmo mecanismo do pattern.
- `Button` "Atualizar" fica `disabled` durante o carregamento (mesmo mecanismo do Pattern `loading.tsx`, evita disparo duplicado).

### Estado 5 — Vazio real (mecanismo do Pattern `empty-state.tsx`)

Reaproveita a composição **exata** já existente no catálogo (`src/components/patterns/empty-state.tsx`), que já usa este domínio:

```
<Empty className="border">
  <EmptyHeader>
    <EmptyMedia variant="icon"><InboxIcon /></EmptyMedia>
    <EmptyTitle>Nenhuma apólice encontrada</EmptyTitle>
    <EmptyDescription>Ainda não existem apólices cadastradas para este cliente. Crie a primeira apólice para começar.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button onClick={() => toast("Abrir formulário de nova apólice")}>Nova apólice</Button>
  </EmptyContent>
</Empty>
```

O botão "Nova apólice" não navega — mesmo comportamento já implementado no componente real do catálogo (`toast()` como placeholder), porque não existe tela de "contratar nova apólice" no escopo das 3 telas de 5B. Ver "Lacunas".

### Estado 4 — Filtro aplicado, sem resultados (variante compacta do Pattern `search-experience.tsx`)

Reaproveita a variante **compacta** de `Empty` já usada em `search-experience.tsx` (sem borda, sem ícone, `py-8`, sem `EmptyContent`/CTA — diferente do estado 5, que é "sem dado nenhum"; aqui é "há dado, mas o filtro não bate"):

```
<Empty className="py-8">
  <EmptyTitle>Nenhuma apólice para os filtros selecionados</EmptyTitle>
  <EmptyDescription>Tente remover algum filtro para ver mais resultados.</EmptyDescription>
</Empty>
```

Sem CTA de negócio (não faz sentido "criar apólice" aqui) — em vez disso, os próprios Badges removíveis (já visíveis acima da tabela) servem de saída, sem duplicar um botão "Limpar filtros" a mais.

### Estado 6 — Erro ao carregar (mecanismo do Pattern `error-state.tsx`)

Reaproveita a composição já existente no catálogo (`src/components/patterns/error-state.tsx`), adaptada ao verbo desta tela:

```
<Alert variant="destructive">
  <ServerCrashIcon />
  <AlertTitle ref={erroRef} tabIndex={-1}>Não foi possível carregar as apólices</AlertTitle>
  <AlertDescription>
    <p>Verifique sua conexão e tente novamente.</p>
    <Button size="sm" variant="outline" onClick={handleRetry}><RefreshCwIcon />Tentar novamente</Button>
  </AlertDescription>
</Alert>
```

Substitui a `Table`/filtro inteiros dentro do `CardContent` enquanto o erro estiver ativo (mesmo princípio do estado 8 de `onboarding`: durante erro, reduzir a superfície de interação em vez de manter controles que não fazem sentido). Foco programático no `AlertTitle` ao entrar neste estado.

## Navegação

| Ação/link | Destino | Observação |
|---|---|---|
| Chegada nesta tela | — | Sem tela anterior cabeada dentro do escopo já construído — entrada direta (URL ou, conceitualmente, vindo do Painel do corretor, ainda não existente). Ver "Lacunas" item 1. |
| Item "Painel" (sidebar mockada) | `/templates/painel-corretor` | Rota ainda não construída (3ª tela de 5B, `inProgressTemplates`) — link correto e intencional, mesma situação que `onboarding`→`painel-corretor` já vive. |
| Item "Apólices" (sidebar mockada) | Permanece em `/templates/apolices-ativas` | Item ativo (a própria tela) — não navega, precisa de `aria-current="page"`. |
| Item "Sinistros" (sidebar mockada) | `/templates/novo-sinistro` | Rota ainda não construída (2ª tela de 5B) — mesmo tipo de link intencional. |
| Botão "Atualizar" | Permanece na rota | Refaz o carregamento a partir do cenário selecionado no `Select` de demonstração. |
| Popover "Filtros" + Checkboxes | Permanece na rota | Filtra a tabela client-side, sem navegação. |
| Badge removível ("Remover filtro X") | Permanece na rota | Desmarca a categoria, sem navegação. |
| Botão "Nova apólice" (estado vazio real) | Permanece na rota | Sem tela dedicada no escopo de 5B — mesmo placeholder (`toast()`) já usado no componente real do catálogo. Ver "Lacunas". |
| Botão "Tentar novamente" (erro ao carregar) | Permanece na rota | Reenvia o carregamento (volta ao estado 1). |
| Botão "Abrir sinistro" (linha da tabela) | `/templates/novo-sinistro` | 2ª tela de 5B, ainda não construída. Nenhum dado da apólice é passado adiante (decisão de persistência, ver "Lacunas" item 1) — `novo-sinistro` recebe entrada direta, sem pré-preenchimento. |
| Clique no número da apólice (célula da tabela) | — | **Sem destino** — não existe tela de detalhe de apólice no escopo de 5B. Não implementar como link/botão falso; manter como texto simples. Ver "Lacunas". |

## Requisitos de acessibilidade específicos desta tela

1. **Região `aria-live="polite"` com a contagem de resultados** (com ou sem filtro aplicado) — mesmo mecanismo já usado em `filters.tsx`/`search-experience.tsx`, indispensável porque a lista muda de conteúdo sem navegação de página.
2. **Item "Apólices" da sidebar mockada precisa de `aria-current="page"` explícito** — confirmado no código-fonte de `sidebar.tsx`: a prop `isActive` do `SidebarMenuButton` só aplica estilo (`data-active`), não seta `aria-current` sozinha. Sem esse atributo, quem usa leitor de tela não tem como saber, pela própria navegação, em qual página está.
3. **Cada `TableHead` precisa de `scope="col"` explícito** — o componente `table.tsx` não aplica isso automaticamente (é um `<th>` puro estilizado); sem o atributo, a associação de cabeçalho/célula fica mais fraca para leitores de tela em modo de navegação por tabela.
4. **Estado de carregamento (skeleton)**: contêiner com `aria-busy` + região `aria-live="polite"` `sr-only` anunciando a transição carregando → carregado — mesmo mecanismo do Pattern `skeleton.tsx`. O `Skeleton` em si não tem papel ARIA próprio.
5. **Botão "Atualizar" fica `disabled` durante o carregamento** — evita disparo duplicado, mesmo mecanismo do Pattern `loading.tsx`.
6. **Erro ao carregar**: `Alert variant="destructive"` já expõe `role="alert"` nativo (anúncio automático ao entrar no DOM) + foco programático no `AlertTitle` (`ref` + `tabIndex={-1}` + `.focus()`) — mesmo mecanismo já auditado em `login-erro-validacao`/`recuperacao-senha`/`selecao-perfil-corretora`/`onboarding`. Sem isso, o foco ficaria "perdido" no botão que disparou a falha (Atualizar ou o carregamento inicial).
7. **Cada Badge de filtro removível precisa de botão com `aria-label` descritivo** (ex: "Remover filtro Auto"), não só um ícone `X` mudo — mesmo padrão já implementado em `filters.tsx`.
8. **Checkbox + Label do Popover de filtro associados via `htmlFor`/`id`** — texto da categoria não pode ficar solto ao lado do controle.
9. **Botão "Abrir sinistro" de cada linha**: mantém rótulo de texto visível (não ícone-only, mesmo princípio das 5 telas de 5A). Se a densidade da tabela algum dia forçar um ícone-only por linha, precisa de `aria-label` específico incluindo o identificador da apólice (ex: "Abrir sinistro da apólice AP-1042") — mesma exigência já documentada no Pattern `crud.tsx` ("Cada botão de ação na linha da tabela tem aria-label específico").
10. **`Select` "Cenário de carregamento (demonstração)"**: `Label htmlFor` associado, entra corretamente na ordem de tab, fora do container principal — mesma exigência já auditada nos `Select`s de cenário de `selecao-perfil-corretora`/`onboarding`.
11. **Clique no número da apólice não deve virar um link/botão sem destino** — se implementado como texto simples (não interativo), não há problema de acessibilidade; se algum dia virar link para uma tela de detalhe inexistente, isso quebraria a expectativa de navegação por teclado/leitor de tela (ver "Lacunas" item 2 — não implementar como link falso agora).
12. **Gap conhecido do catálogo, não introduzido por esta tela**: `EmptyTitle`/`EmptyDescription` (`empty.tsx`) renderizam `<div>`, não heading semântico — mesmo gap sistêmico já registrado em todas as telas de 5A. Nos estados 4/5 desta tela, o `<h1>` da página e o `CardTitle` "Apólices ativas" (também `<div>`, mesmo gap) são as âncoras de heading disponíveis; não há heading real dentro do próprio `Empty`.
13. **Ordem de tab**: filtro (Popover) → Badges removíveis (se houver) → botão "Atualizar" → linhas da tabela (ação "Abrir sinistro" de cada uma) — a Sidebar mockada não deve interceptar essa ordem (mesmo padrão já usado em `dashboard-financeiro`, onde a sidebar mockada tem seus próprios itens de tab antes do conteúdo, sem embaralhar a ordem lógica do conteúdo principal).

## Lacunas para o Rafael decidir

Duas decisões PROVISÓRIAS pedidas explicitamente para esta spec (ver instrução do orquestrador desta tarefa, baseada em `.build/telas/diagnostico-onboarding.md` seção 4), decididas em Modo autônomo (`PLANO-LOOP-80-20-TEMPLATES.md`, linhas ~54-70) por serem a opção mais barata de reverter e mais consistente com o que já existe:

1. **PROVISÓRIO — Persistência de dados entre telas**: decidido **não** introduzir nenhum mecanismo novo (nem query param, nem Context, nem sessão) para esta tela. Ela não recebe nada de nenhuma tela anterior — é tratada como entrada direta. Efeito prático: a ação "Abrir sinistro" de uma linha navega para `/templates/novo-sinistro` **sem carregar nenhum dado da apólice de origem** — `novo-sinistro` vai precisar (quando especificada) assumir que o usuário escolhe a apólice de novo dentro do próprio formulário de sinistro, ou que esse vínculo não é relevante para a demonstração. **Por que decidi assim**: é a mesma decisão já tomada (e documentada como provisória) na fronteira `selecao-perfil-corretora` → `onboarding`; mudar a arquitetura de dados do projeto inteiro não é decisão de quem só planeja composição de tela. **Como reverter, se o Rafael quiser dado real fluindo**: a forma mais barata é `apolices-ativas` passar o número da apólice via query string (`?apolice=AP-1042`) no link para `novo-sinistro`, e a spec de `novo-sinistro` já prever a leitura via `useSearchParams` — mudança isolada nas 2 telas, sem propagar.
2. **PROVISÓRIO (já ratificado, só o "como" foi decidido aqui) — Convenção do `Select` "Cenário de carregamento (demonstração)"**: aplicada conforme a convenção já aceita (ver `.build/telas/PENDENCIAS.md` item 2) — fora do container principal, mesma posição das telas irmãs. Diferença desta tela em relação a `onboarding`/`selecao-perfil-corretora`: aqui o `Select` tem **3 opções** (não 2), porque uma tela de listagem tem mais desfechos de backend fictício sem gatilho natural (carregando com sucesso / vazio real / erro) do que um formulário de submissão única (sucesso / falha). Os estados que **têm** gatilho natural (filtro sem resultado) deliberadamente **não** passam pelo `Select` — mesmo princípio já usado nos patterns reais do catálogo.
3. **Sem tela de detalhe de apólice**: clicar no número da apólice não navega para lugar nenhum nesta spec — as 3 telas de 5B não incluem uma tela de detalhe. Se o produto real precisar disso, é uma 4ª tela fora do escopo atual, não um ajuste nesta.
4. **CTA "Nova apólice" (estado vazio real) sem tela de destino**: mesma lacuna do componente real do catálogo (`empty-state.tsx` já usa `toast()` como placeholder) — não existe fluxo de "contratar nova apólice" no escopo de 5B. Se o Rafael quiser esse fluxo completo, é uma tela nova, fora das 3 já decididas.
5. **Sem busca textual nem paginação nesta tela** — decisão de escopo desta spec (não lacuna de esquecimento): reservadas deliberadamente para `painel-corretor`, conforme a própria divisão do plano ("busca/paginação" é o rótulo daquela tela, "listagem/filtro" é o desta). Se o Rafael achar que uma tela de listagem de apólices realmente precisa de busca própria independente do painel do corretor, é uma revisão de escopo desta tela, a ser pedida explicitamente.
6. **Erro ao carregar modelado só no carregamento inicial/"Atualizar"** — mesma lacuna sistêmica já registrada nas 5 telas de 5A (nenhuma tela do projeto modela falha de rede genérica fora do ponto de submissão/carregamento principal). Aqui não há um "ponto de submissão" separado (é só leitura), então o único ponto de falha modelado é este mesmo.
