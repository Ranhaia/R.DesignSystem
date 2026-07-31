# Especificação de tela — Painel do corretor

- **Slug:** `painel-corretor` (`src/lib/templates-registry.ts`, hoje o único item restante em `inProgressTemplates`; mover para `templatesList` só depois de construída)
- **Rota:** `src/app/templates/painel-corretor/page.tsx`
- **Fluxo:** Fase 5B — telas de seguros (`PLANO-LOOP-80-20-TEMPLATES.md`, seção "Fase 5 — Jornadas de telas (login + seguros) rumo ao Case público")
- **Posição no fluxo:** **3ª e última das 3 telas de 5B**. Ordem: `apolices-ativas → novo-sinistro → painel-corretor`. Escolhida para cobrir **busca/paginação** (rótulo explícito do plano) — `apolices-ativas` já cobre listagem/filtro, `novo-sinistro` cobre fluxo multi-etapa com upload+confirmação.
- **Papel diferente das outras 2 telas de 5B: esta é o HUB do portal, não só mais uma etapa linear.** O item "Painel" já existe, idêntico, no topo da sidebar mockada das outras 2 telas construídas (`apolices-ativas`, `novo-sinistro`) — sempre o 1º dos 3 itens, sempre apontando pra cá. Ou seja, mesmo sendo a 3ª a ser especificada/construída (ordem de escopo do plano), esta tela é navegacionalmente o ponto de entrada/retorno do portal, não o fim de uma corrente.
- **Referências de estilo/estrutura combinadas, sem conflito entre elas:**
  - `src/app/templates/apolices-ativas/page.tsx` e `src/app/templates/novo-sinistro/page.tsx` — moldura de **portal** idêntica (título "Template — …" + parágrafo de contexto, `Select` "Cenário (demonstração)" fora do container, container `w-full rounded-lg border`, Sidebar mockada `SidebarProvider` escopado/`collapsible="none"`/`hidden h-full md:flex`, header da sidebar lendo `selecao?.corretora` do `FluxoLoginContext` com fallback "Portal do corretor"). Esta tela reaproveita a **mesma sidebar, os mesmos 3 itens, os mesmos ícones e os mesmos destinos** já cabeados nas 2 telas irmãs — só o item ativo muda (aqui é "Painel").
  - `src/app/templates/dashboard-financeiro/page.tsx` — MECANISMO do card de estatística simples ("Claimable Balance": `CardDescription` + ícone no header, número grande no `CardContent`, texto de apoio, `Button` opcional) — reaplicado aqui em 3 cards de KPI do portal de seguros, sem gráfico (o `Chart`/`BarChart` já foi demonstrado lá; não duplicar o mesmo Organism aqui sem motivo novo).
  - `src/components/patterns/pagination.tsx` — MECANISMO da lista paginada (`Pagination`/`PaginationContent`/`PaginationItem`/`PaginationLink`/`PaginationPrevious`/`PaginationNext` sobre uma fatia (`slice`) de um array, `Table` acima). Mesmo volume de dados do Pattern real (23 itens, `pageSize` 5, 5 páginas) — reaproveitado de propósito, não reinventado.
  - `src/components/patterns/search-experience.tsx` — MECANISMO da busca em tempo real (`InputGroup`/`InputGroupAddon`/`InputGroupInput` com `aria-label` explícito, contagem em `aria-live="polite"`, `Empty` compacto para "sem resultados"). **Adaptado** ao domínio tabular desta tela: o Pattern original filtra uma lista de `Item`s; aqui filtra as linhas de uma `Table` (mesmo tipo de adaptação de mecanismo-sobre-domínio-diferente já usado em `novo-sinistro` com o Pattern `upload.tsx`).
- **Não recebe dado de nenhuma tela anterior.** Mesma decisão provisória já tomada nas 2 fronteiras anteriores de 5B (`apolices-ativas` → `novo-sinistro`). Ver "Lacunas" item 1.

## Onde esta tela se encaixa

3ª e última tela de 5B — fecha o conjunto de telas de seguros. **Múltiplas entradas já cabeadas, nenhuma alteração necessária em nenhuma delas:**
- Item "Painel" da sidebar mockada de `apolices-ativas` (`/templates/painel-corretor`).
- Item "Painel" da sidebar mockada de `novo-sinistro` (`/templates/painel-corretor`).
- CTA primário "Ir para o Painel do corretor" na tela de sucesso de `novo-sinistro` (`/templates/painel-corretor`).
- CTA final "Ir para o Painel do corretor" da tela de boas-vindas de `onboarding` (fim da Fase 5A) — primeira menção deste destino em todo o fluxo, ainda em `inProgressTemplates` até esta spec ser construída.

Depois desta tela: os próprios itens "Apólices" e "Sinistros" da sua sidebar mockada levam de volta para as 2 telas irmãs (já construídas e funcionais) — não há uma "4ª tela" depois desta. O corretor pode também sair diretamente para `novo-sinistro` a partir do CTA "Abrir novo sinistro" do card de lista, ou para `apolices-ativas` a partir do CTA "Ver apólices" do card de KPI — ambos dentro da área de conteúdo, não só na sidebar.

## Objetivo da tela

Um corretor chega ao hub do portal, vê um resumo rápido da carteira (apólices ativas, sinistros em aberto, sinistros aprovados no mês) e busca/percorre a lista paginada de sinistros para acompanhar o andamento de cada um — a partir daqui pode abrir um novo sinistro ou ir para a lista completa de apólices.

## Estados que esta tela precisa cobrir

Lista fechada nos estados que fazem sentido para um hub com KPIs + busca/paginação — não replica todos os 16 Patterns do catálogo, só os que esta composição específica usa. **Decisão de escopo desta spec**: os 3 cards de KPI são estáticos (mesmo princípio já usado no card "Saldo disponível" de `dashboard-financeiro`, que também não modela carregando/erro) — só a lista de sinistros (busca + tabela + paginação) passa pelo ciclo carregando/sucesso/vazio/erro, controlado pelo `Select` de cenário. Ver "Composição" para o raciocínio completo.

1. **Carregando (lista de sinistros)** — no carregamento inicial da tela e sempre que o botão "Atualizar" é acionado; mecanismo do Pattern `skeleton.tsx` (placeholder de tabela + `aria-busy` + `aria-live`), mesmo formato já usado no estado 1 de `apolices-ativas`. Os 3 cards de KPI **não** entram em skeleton — permanecem visíveis o tempo todo (decisão de escopo acima).
2. **Sucesso, com resultados, sem busca, página 1** — tabela completa carregada (23 sinistros fictícios), 5 por página, 5 páginas.
3. **Busca aplicada, com resultados** — usuário digita no campo de busca (filtra por protocolo, apólice relacionada ou titular); lista filtrada volta para a página 1 automaticamente; contagem de resultados atualizada.
4. **Busca aplicada, sem resultados** — nenhum sinistro bate com o termo digitado; variante compacta do `Empty` (mesmo padrão do estado 4 de `apolices-ativas`/mecanismo nativo de `search-experience.tsx`).
5. **Vazio real (nenhum sinistro cadastrado)** — não é o mesmo que o estado 4: aqui não existe nenhum sinistro na carteira, mesmo sem busca nenhuma. Não é alcançável organicamente (o mock sempre tem itens) — depende do `Select` "Cenário de carregamento (demonstração)".
6. **Erro ao carregar** — a busca da lista (inicial ou via "Atualizar") falha; também depende do `Select` de cenário.
7. **Troca de página (Pagination)** — client-side, sem gatilho de demonstração; reseta ao trocar a busca (estado 3/4), preservada ao só trocar de página.
8. **Ação de linha — ver apólice relacionada** — clique em "Ver apólice" numa linha navega para fora desta rota (`/templates/apolices-ativas`). Não é um estado visual desta tela, é uma transição de navegação.
9. **Ações de hub — atalhos de saída** — "Ver apólices" (card de KPI "Apólices ativas") e "Abrir novo sinistro" (cabeçalho do card de lista) navegam para fora desta rota. Mesma natureza do item 8: transição, não estado visual.

Fora de escopo, registrado como responsabilidade de fora desta tela:
- Tela de detalhe de um sinistro específico (clicar no protocolo não navega para lugar nenhum — não existe rota de detalhe nas 3 telas de 5B, mesma lacuna já registrada em `apolices-ativas.md`).
- Edição/atualização de status de um sinistro já aberto (esta tela só lista e busca, não altera dado).
- Gráfico/analytics da carteira — já demonstrado em `dashboard-financeiro` (`BarChart`); duplicar aqui sem motivo novo contraria o princípio já usado no projeto para não repetir o mesmo Organism em telas vizinhas sem necessidade (mesmo critério de `bubble`/`message`, `filters`/`filter-panel`).
- Notificações em tempo real / atualização automática da lista (o botão "Atualizar" é a única forma de re-buscar).

## Composição — só peças reais do catálogo

Nenhum componente novo. Tudo abaixo já existe em `src/components/ui/` (Atoms/Molecules/Organisms confirmados em `src/lib/atomic-registry.ts`) ou é o mecanismo de um Pattern já catalogado (`src/lib/patterns-registry.ts`) reaplicado com conteúdo desta tela.

### Layout da página (moldura de portal, idêntica às 2 telas irmãs)

- `<h1>` "Template — Painel do corretor" + parágrafo `text-muted-foreground` de contexto.
- `Select` "Cenário de carregamento (demonstração)" **fora** do container principal (mesma posição de `apolices-ativas`/`novo-sinistro`) — ver "Gatilho de demonstração" abaixo.
- Container `w-full rounded-lg border` envolvendo a Sidebar mockada + área de conteúdo (mesmo padrão das 2 telas irmãs).

### Gatilho de demonstração — `Select` "Cenário de carregamento (demonstração)"

Convenção já ratificada (`.build/telas/PENDENCIAS.md` item 2 — "válido pras 2 telas restantes de 5B"), não reaberta aqui. **Escopo desta tela**: controla só o card de lista de sinistros (busca/tabela/paginação) — os 3 cards de KPI ficam fora, mesma decisão já registrada em "Estados":

```
<Label htmlFor="cenario-carregamento">Cenário de carregamento (demonstração)</Label>
<Select value={cenario} onValueChange={setCenario}>
  <SelectTrigger id="cenario-carregamento" size="sm" className="w-64"><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="sucesso">Sucesso — sinistros carregados</SelectItem>
    <SelectItem value="vazio">Vazio — nenhum sinistro cadastrado</SelectItem>
    <SelectItem value="erro">Erro ao carregar</SelectItem>
  </SelectContent>
</Select>
```

Os estados 3/4 (busca com/sem resultado) e 7 (troca de página) são alcançados organicamente pela interação do próprio usuário — **não** passam pelo `Select` de cenário, mesmo princípio já usado em `apolices-ativas` para o filtro por categoria.

### Sidebar mockada — Organism `sidebar.tsx` (mesma composição das 2 telas irmãs, item ativo diferente)

- `SidebarProvider` (escopado) + `Sidebar collapsible="none"` + `SidebarHeader` (`{selecao?.corretora ?? "Portal do corretor"}`, via `useFluxoLogin()`) + `SidebarContent` + `SidebarGroup`/`SidebarGroupLabel` ("Portal do corretor") + `SidebarMenu`/`SidebarMenuItem`/`SidebarMenuButton`.
- **Mesmos 3 itens, mesmos ícones, mesmos destinos já cabeados em `apolices-ativas`/`novo-sinistro` — não reinterpretar nenhum deles nesta tela:**
  - "Painel" (`Icon name="dashboard"`) → item ativo (esta própria tela). **Precisa de `aria-current="page"` explícito** (mesmo gap já documentado em `apolices-ativas.md`/`novo-sinistro.md` — `isActive` do `SidebarMenuButton` só estiliza, não seta o atributo sozinho).
  - "Apólices" (`Icon name="verified_user"`) → `/templates/apolices-ativas`.
  - "Sinistros" (`Icon name="checklist"`) → `/templates/novo-sinistro`. **Não** aponta para a lista de sinistros desta própria tela — mantém o significado já estabelecido nas 2 telas irmãs ("Sinistros" = ação de abrir/registrar um sinistro novo, não uma listagem).
- **Regra fixa do catálogo, não repetir o bug já corrigido em produção** (`.build/telas/RETROATIVO-MOBILE.md`): `<Sidebar collapsible="none" className="hidden h-full md:flex">` desde a primeira versão do código — nunca só `className="h-full"`. Ver "Requisitos de responsividade".

### Área de conteúdo — KPIs (Organism `card.tsx`, mecanismo de `dashboard-financeiro`) + Card de lista

Diferente de `apolices-ativas`/`novo-sinistro` (1 `Card` grande só), esta tela tem **4 cards**: 3 de KPI em `grid grid-cols-1 sm:grid-cols-3 gap-4` + 1 `Card` de lista abaixo, `gap-4` entre a grade e o card de lista.

**3 cards de KPI (mesmo mecanismo do card "Saldo disponível" de `dashboard-financeiro`: `CardDescription` + ícone no `CardHeader`, número grande no `CardContent`, texto de apoio, `Button` opcional)**:

1. **Apólices ativas** — `CardDescription` "Apólices ativas" + `Icon name="verified_user"`; `CardContent`: `<div className="text-2xl font-bold">128</div>` + `<p className="text-muted-foreground text-xs">Distribuídas entre 5 categorias</p>` + `Button variant="outline" size="sm" asChild` (`Link href="/templates/apolices-ativas"`) "Ver apólices".
2. **Sinistros em aberto** — `CardDescription` "Sinistros em aberto" + `Icon name="checklist"`; `CardContent`: número "14" + texto de apoio "5 aguardando documentação". Sem `Button` aqui — o CTA de abrir novo sinistro fica só no cabeçalho do card de lista (evita duplicar a mesma ação em 2 lugares da mesma tela).
3. **Sinistros aprovados no mês** — `CardDescription` "Sinistros aprovados no mês" + `Icon name="bar_chart"`; `CardContent`: número "9" + texto de apoio "82% de aprovação". Informativo, sem `Button`.

Números fictícios, coerentes entre si mas não persistidos nem calculados a partir do mock da tabela (ver "Lacunas" item 3). Ícones reaproveitados de nomes **já confirmados em uso** no catálogo (`dashboard`, `verified_user`, `checklist`, `bar_chart` — todos já usados em `dashboard-financeiro`/`apolices-ativas`/`novo-sinistro`); se o `telas-construtor` preferir outro ícone, confirmar o nome contra a lib `material-symbols` antes de usar, mesmo princípio já seguido em toda tela anterior.

**Card de lista — Organism `card.tsx` envolvendo busca + tabela + paginação**:

- `CardHeader` (`flex flex-row flex-wrap items-center justify-between gap-3 space-y-0`, mesmo padrão responsivo já usado no header de `novo-sinistro`): `CardTitle` "Sinistros" (`asChild`, `<h2>`) + `CardDescription aria-live="polite"` (contagem de resultados) de um lado; `Badge variant="outline"` "Ambiente de demonstração" + `Button variant="outline" size="sm"` "Atualizar" (`Icon name="refresh"`) + `Button size="sm" asChild` (`Link href="/templates/novo-sinistro"`) "Abrir novo sinistro" (`Icon name="add"`) do outro.
- `CardContent`: campo de busca (mecanismo do Pattern `search-experience.tsx`) + corpo condicional pelos estados de carregamento/dados + `Pagination` no rodapé (só quando há resultados).

### Busca — mecanismo do Pattern `search-experience.tsx`, adaptado à `Table`

```
<InputGroup>
  <InputGroupAddon><Icon name="search" /></InputGroupAddon>
  <InputGroupInput
    placeholder="Buscar por protocolo, apólice ou titular..."
    value={busca}
    onChange={(e) => { setBusca(e.target.value); setPagina(1) }}
    aria-label="Buscar sinistro"
  />
</InputGroup>
```

Reset de página para 1 a cada mudança no termo de busca (evita o usuário "cair" numa página vazia depois de filtrar) — comportamento funcional, não requisito de acessibilidade isolado, mas listado aqui porque é uma decisão desta composição específica (a combinação busca+paginação não existe em nenhum Pattern isolado do catálogo).

### Tabela de sinistros — Organism `table.tsx` (mesma composição de `apolices-ativas`, domínio "sinistros")

- `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead` (`scope="col"` explícito), `TableCell`.
- Colunas: Protocolo (`SIN-2026-xxxx`) · Apólice relacionada (`AP-xxxx`, mesma convenção de rótulo de `apolices-ativas`, sem ser o mesmo array — telas não compartilham estado) · Titular · Tipo (mesmas 5 opções de `novo-sinistro`: Colisão/acidente, Roubo ou furto, Incêndio, Danos a terceiros, Outro) · Data de abertura · Status (`Badge`: `variant="secondary"` "Em análise" / `variant="default"` "Aprovado" / `variant="destructive"` "Negado") · Ações.
- Coluna Ações: `Button variant="outline" size="sm" asChild` (`Link href="/templates/apolices-ativas"`) "Ver apólice" + `Icon name="arrow_forward"` — rótulo de texto visível, não ícone-only (mesmo princípio já usado em todo o fluxo de 5A/5B).
- **Volume do mock**: 23 sinistros fictícios, `pageSize` 5 (5 páginas) — mesmo volume já validado no Pattern `pagination.tsx` real, reaproveitado de propósito.

### Paginação — mecanismo do Pattern `pagination.tsx`

```
<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious
        aria-label="Página anterior"
        onClick={() => setPagina((p) => Math.max(1, p - 1))}
      />
    </PaginationItem>
    {paginas.map((p) => (
      <PaginationItem key={p}>
        <PaginationLink isActive={p === pagina} onClick={() => setPagina(p)}>{p}</PaginationLink>
      </PaginationItem>
    ))}
    <PaginationItem>
      <PaginationNext
        aria-label="Próxima página"
        onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
      />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

**Achado importante para esta spec** (`src/components/ui/pagination.tsx`, lido antes de especificar): `PaginationPrevious`/`PaginationNext` têm `aria-label` **padrão em inglês** ("Go to previous page"/"Go to next page") embutido no próprio componente — o resto do projeto é 100% PT-BR. Este é o primeiro Template a de fato renderizar `Pagination` numa tela (o Pattern isolado já existia, mas nunca tinha sido usado dentro de uma jornada). **Obrigatório**: sobrescrever via prop `aria-label="Página anterior"`/`aria-label="Próxima página"` no site de uso (como no trecho acima) — a prop passada pelo consumidor sobrescreve o default porque `{...props}` é espalhado depois do `aria-label` fixo dentro do componente (confirmado lendo o código-fonte). Não editar `ui/pagination.tsx` para isso — ver "Lacunas" item 5 sobre corrigir o default na origem depois, com aprovação do Rafael.

### Estado 1 — Carregando (mecanismo do Pattern `skeleton.tsx`, mesmo formato do estado 1 de `apolices-ativas`)

- Contêiner com `aria-busy="true"` no lugar da busca+`Table`+`Pagination`: `Skeleton` (busca) + várias linhas de `Skeleton` aproximando as colunas reais.
- Região `aria-live="polite"` `sr-only` anunciando "Carregando sinistros" — mesmo mecanismo do Pattern.
- `Button` "Atualizar" fica `aria-disabled`/`aria-busy` durante o carregamento (mesmo mecanismo já corrigido sistemicamente em 2026-07-23 — evita disparo duplicado sem tirar o botão da árvore de foco).

### Estado 5 — Vazio real (mecanismo do Pattern `empty-state.tsx`, domínio "sinistros")

```
<Empty className="border">
  <EmptyHeader>
    <EmptyMedia variant="icon"><Icon name="inbox" /></EmptyMedia>
    <EmptyTitle asChild><h3>Nenhum sinistro cadastrado</h3></EmptyTitle>
    <EmptyDescription>
      Ainda não existem sinistros registrados para esta carteira. Abra o primeiro sinistro para começar.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button asChild><Link href="/templates/novo-sinistro">Abrir novo sinistro</Link></Button>
  </EmptyContent>
</Empty>
```

**Diferença deliberada em relação ao estado 5 de `apolices-ativas`**: lá o CTA "Nova apólice" usa `toast()` como placeholder porque não existe tela de "contratar apólice" no escopo de 5B. Aqui o CTA "Abrir novo sinistro" é **navegação real** para `/templates/novo-sinistro` — a tela de destino já existe e está construída, então não há motivo para usar placeholder.

### Estado 4 — Busca aplicada, sem resultados (variante compacta do `Empty`, mesmo padrão do estado 4 de `apolices-ativas`)

```
<Empty className="py-8">
  <EmptyTitle asChild><h3>Nenhum sinistro para esta busca</h3></EmptyTitle>
  <EmptyDescription>Tente buscar por outro protocolo, apólice ou nome de titular.</EmptyDescription>
</Empty>
```

Sem CTA de negócio — o próprio campo de busca (já visível acima) é a saída, sem duplicar um botão "Limpar busca" a mais (mesmo princípio já usado no estado 4 de `apolices-ativas` para os Badges de filtro).

### Estado 6 — Erro ao carregar (mecanismo do Pattern `error-state.tsx`, mesma composição de `apolices-ativas`)

```
<Alert variant="destructive">
  <Icon name="cloud_off" />
  <AlertTitle ref={erroRef} tabIndex={-1}>Não foi possível carregar os sinistros</AlertTitle>
  <AlertDescription>
    <p>Verifique sua conexão e tente novamente.</p>
    <Button size="sm" variant="outline" onClick={() => carregar(cenario)}>
      <Icon name="refresh" />Tentar novamente
    </Button>
  </AlertDescription>
</Alert>
```

Substitui busca+`Table`+`Pagination` dentro do `CardContent` enquanto o erro estiver ativo (mesmo princípio do estado 6 de `apolices-ativas`: durante erro, reduzir a superfície de interação). Foco programático no `AlertTitle` ao entrar neste estado.

## Navegação

| Ação/link | Destino | Observação |
|---|---|---|
| Chegada nesta tela (via item "Painel" de `apolices-ativas`/`novo-sinistro`, CTA de sucesso de `novo-sinistro`, ou CTA final de `onboarding`) | — | Já cabeado nas 3 telas de origem — nada a alterar nelas. Sem dado pré-carregado (ver "Lacunas" item 1). |
| Item "Painel" (sidebar mockada) | Permanece em `/templates/painel-corretor` | Item ativo (a própria tela) — não navega, precisa de `aria-current="page"`. |
| Item "Apólices" (sidebar mockada) | `/templates/apolices-ativas` | Rota já construída e funcional. |
| Item "Sinistros" (sidebar mockada) | `/templates/novo-sinistro` | Rota já construída e funcional. Mantém o significado já estabelecido (abrir sinistro novo, não listar). |
| Botão "Ver apólices" (card de KPI "Apólices ativas") | `/templates/apolices-ativas` | Rota já construída e funcional. |
| Botão "Abrir novo sinistro" (cabeçalho do card de lista) | `/templates/novo-sinistro` | Rota já construída e funcional. |
| Botão "Atualizar" | Permanece na rota | Refaz o carregamento da lista a partir do cenário selecionado no `Select` de demonstração. |
| Campo de busca | Permanece na rota | Filtra a tabela client-side, sem navegação; reseta a página para 1. |
| Paginação (Anterior/números/Próxima) | Permanece na rota | Troca a página exibida, sem navegação de URL. |
| Botão "Ver apólice" (linha da tabela) | `/templates/apolices-ativas` | Rota já construída e funcional. Nenhum dado do sinistro é passado adiante (mesma decisão de persistência, ver "Lacunas" item 1). |
| Botão "Tentar novamente" (erro ao carregar) | Permanece na rota | Reenvia o carregamento (volta ao estado 1). |
| Botão "Abrir novo sinistro" (dentro do `Empty`, estado vazio real) | `/templates/novo-sinistro` | Rota já construída e funcional — navegação real, diferente do placeholder `toast()` usado no CTA equivalente de `apolices-ativas`. |
| Clique no protocolo (célula da tabela) | — | **Sem destino** — não existe tela de detalhe de sinistro no escopo de 5B. Não implementar como link/botão falso; manter como texto simples. Mesma decisão já registrada em `apolices-ativas.md` para o número da apólice. |

## Requisitos de acessibilidade específicos desta tela

1. **Item "Painel" da sidebar mockada precisa de `aria-current="page"` explícito** — mesmo gap já documentado em `apolices-ativas.md`/`novo-sinistro.md` (`isActive` do `SidebarMenuButton` só estiliza).
2. **Campo de busca com `aria-label` explícito** ("Buscar sinistro") — não há `<label>` visível associado, mesmo padrão já usado no Pattern `search-experience.tsx` real.
3. **Contagem de resultados em `aria-live="polite"`** (reaproveitada pela própria `CardDescription` do header, não duplicar texto) — atualiza tanto ao buscar quanto ao trocar de página, indispensável porque a tabela muda de conteúdo sem navegação de página. Diferente do Pattern `pagination.tsx` isolado (que não precisa disso, porque lá não há busca concorrente) — esta combinação é específica desta tela.
4. **`PaginationPrevious`/`PaginationNext` com `aria-label` sobrescrito em PT-BR** ("Página anterior"/"Próxima página") — os defaults do componente (`ui/pagination.tsx`) estão em inglês; ver "Composição — Paginação" para o achado completo. Sem essa sobrescrita, o restante da experiência sai do idioma consistente que todo o resto do projeto mantém.
5. **`Pagination` já expõe `nav role="navigation" aria-label="pagination"`** (esse label específico do `<nav>`, não dos botões individuais, também está em inglês por padrão — mesmo achado do item 4, mesma decisão: sobrescrever via prop `aria-label` no elemento `<Pagination>` desta tela, ex. `aria-label="Paginação de sinistros"`) e `aria-current="page"` automático no link da página ativa (via prop `isActive`) — isso já vem certo, não precisa de ajuste.
6. **Cada `TableHead` precisa de `scope="col"` explícito** — mesmo gap sistêmico já documentado em `apolices-ativas.md` (`table.tsx` não aplica isso automaticamente).
7. **Estado de carregamento (skeleton)**: contêiner com `aria-busy="true"` + região `aria-live="polite"` `sr-only` anunciando a transição carregando → carregado — mesmo mecanismo do Pattern `skeleton.tsx`.
8. **Botão "Atualizar" com `aria-disabled`/`aria-busy` durante o carregamento** (não `disabled` nativo, mesmo motivo já documentado em `button.tsx` — evita o salto de foco pro `<body>`), com guarda `if (carregando) return` no handler correspondente — mesmo padrão já aplicado em `apolices-ativas`.
9. **Erro ao carregar**: `Alert variant="destructive"` já expõe `role="alert"` nativo + foco programático no `AlertTitle` (`ref`/`tabIndex={-1}`/`.focus()`) — mesmo mecanismo já auditado em `apolices-ativas`/`novo-sinistro`.
10. **Botão "Ver apólice" de cada linha**: mantém rótulo de texto visível (não ícone-only, mesmo princípio de todo o fluxo de 5A/5B).
11. **`Select` "Cenário de carregamento (demonstração)"**: `Label htmlFor` associado, entra corretamente na ordem de tab, fora do container principal — mesma exigência já auditada nos `Select`s de cenário anteriores.
12. **Cada ícone decorativo desta tela recebe `aria-hidden="true"` automaticamente** — achado positivo, não um requisito extra a implementar: o Atom `icon.tsx` (Material Symbols, migrado de `lucide-react`) já aplica `aria-hidden="true"` sozinho sempre que nenhuma prop de acessibilidade (`aria-label`/`aria-labelledby`/`role`) é passada (confirmado lendo o código-fonte). Isso resolve, para esta tela, o item de pendência sistêmica aberto em `PENDENCIAS.md` #4 ("ícones decorativos sem `aria-hidden` explícito") — não precisa de tratamento manual em nenhum `Icon` desta spec.
13. **Clique no protocolo não deve virar link/botão sem destino** — mesma exigência já registrada em `apolices-ativas.md` para o número da apólice.
14. **Gap conhecido do catálogo, não introduzido por esta tela**: `CardTitle`/`EmptyTitle` renderizam `<div>` por padrão — mitigado nesta tela via `asChild` (`<h2>` no card de lista, `<h3>` no `Empty` dos estados 4/5), mesmo padrão já aplicado nas 8 telas de Template anteriores.
15. **Ordem de tab**: Select de cenário → sidebar (itens próprios) → cards de KPI (botão "Ver apólices") → botão Atualizar → botão Abrir novo sinistro → campo de busca → linhas da tabela (botão "Ver apólice" de cada uma) → paginação — segue a ordem visual real (`CardHeader` com os botões de ação antes do `CardContent` com a busca), sem `tabIndex` artificial; a Sidebar mockada não deve interceptar essa ordem (mesmo padrão já usado em `apolices-ativas`/`dashboard-financeiro`). Corrigido em 2026-07-29 (diagnóstico `painel-corretor`, seção 2.2) — a versão anterior descrevia "busca antes dos botões", que não é compatível com a composição visual desta mesma spec (botões no `CardHeader`, busca no `CardContent`).
16. **Reset de página ao buscar (estado 3/4)** não precisa de anúncio adicional além da contagem já viva (item 3) — evitar duplicar região `aria-live` para o mesmo evento.

## Requisitos de responsividade específicos desta tela

Breakpoint de referência do projeto: `md` = 768px (mesmo usado em todo o catálogo/Tailwind). Nenhuma parte desta tela pode causar overflow horizontal da PÁGINA inteira em qualquer largura, inclusive 390px (viewport de referência do estágio `telas-mobile`).

1. **Sidebar mockada — regra fixa, não repetir o bug já corrigido em produção**: `<Sidebar collapsible="none" className="hidden h-full md:flex">` desde a primeira versão do código desta tela (nunca só `className="h-full"`, causa raiz documentada em `.build/telas/RETROATIVO-MOBILE.md`, já corrigida em `dashboard-financeiro`/`apolices-ativas`/`novo-sinistro`). Abaixo de `md`, a sidebar mockada some inteiramente — a navegação real do mobile já é o hambúrguer da `AppShell`. A área de conteúdo (`min-w-0 flex-1`) ocupa 100% da largura quando a sidebar está escondida.
2. **Grade de 3 cards de KPI**: `grid grid-cols-1 sm:grid-cols-3 gap-4` — empilha em coluna única abaixo de `sm` (640px), 3 colunas a partir daí. Diferente do `md:grid-cols-2 lg:grid-cols-3` de `dashboard-financeiro` (que tem 7 cards de tamanhos variados) — aqui são só 3 cards do mesmo tamanho, então o corte único em `sm` é suficiente e mais direto.
3. **`CardHeader` do card de lista** (título+contagem de um lado, badge+2 botões do outro): `flex flex-row flex-wrap items-center justify-between gap-3` (mesmo padrão já usado em `novo-sinistro`) — os 2 botões ("Atualizar", "Abrir novo sinistro") quebram para a linha de baixo em telas estreitas em vez de espremer horizontalmente ou vazar.
4. **Campo de busca (`InputGroup`)**: já é `w-full` nativo do componente — sem risco de overflow, mas confirmar que nenhum `className` extra force uma largura fixa em `px`.
5. **Tabela de 7 colunas (Protocolo/Apólice/Titular/Tipo/Data/Status/Ações)**: mesmo achado secundário já registrado em `RETROATIVO-MOBILE.md` para a tabela de `apolices-ativas` (6 colunas) — aciona o scroll horizontal *contido* do próprio componente `Table` (`overflow-x-auto` já embutido em `ui/table.tsx`), não vaza pra página inteira. Aceito como padrão do catálogo, não é bug desta tela; se o Rafael quiser um layout alternativo em cards empilhados no mobile, é uma decisão de design nova.
6. **`Pagination`**: `PaginationContent` já é `flex flex-row items-center gap-1` com `PaginationLink` em `size="icon"` (compacto) — em 390px, 5 números de página + Anterior/Próxima cabem numa linha sem quebra, mas se o Rafael pedir mais páginas no futuro (o pattern real já usa `PaginationEllipsis` pra listas maiores, não usado nesta spec porque 5 páginas cabe inteiro), reavaliar a necessidade de reticências.
7. **`Empty` dos estados 4/5**: já é compacto/centralizado por padrão do componente, sem largura fixa — sem risco de overflow em 390px.
8. **Nenhum valor numérico dos KPIs (128/14/9) ou texto de apoio força quebra de layout** — são strings curtas, cabem em qualquer largura sem `white-space: nowrap` necessário.
9. **Verificação obrigatória do estágio `telas-mobile`**: medir `document.documentElement.scrollWidth > window.innerWidth` em 390×844 nos 4 estados visualmente distintos mais prováveis de quebrar — sucesso com tabela completa (página 1), busca aplicada sem resultados, vazio real (estado 5), erro ao carregar (estado 6).

## Lacunas para o Rafael decidir

Decisões PROVISÓRIAS tomadas em Modo autônomo (`PLANO-LOOP-80-20-TEMPLATES.md`, linhas ~54-70), pela opção mais barata de reverter e mais consistente com o que já existe no catálogo:

1. **PROVISÓRIO — Persistência de dados entre telas**: mesma decisão já tomada e documentada em `apolices-ativas.md`/`novo-sinistro.md` (Lacunas item 1) — nenhum mecanismo novo introduzido. O botão "Ver apólice" de cada linha desta tela navega para `/templates/apolices-ativas` sem passar o número da apólice adiante. **Como reverter**: mesma forma já registrada nas specs irmãs (query string `?apolice=AP-1042` + `useSearchParams` na tela de destino) — mudança isolada, sem propagar.
2. **PROVISÓRIO — Cards de KPI sem ciclo de carregando/vazio/erro próprio**: decisão desta spec (não lacuna de esquecimento) — os 3 cards de topo são estáticos, só o card de lista de sinistros passa pelo `Select` de cenário. Motivo: mesmo precedente de `dashboard-financeiro` (o card "Saldo disponível" também não modela esses estados) e simplicidade — modelar 4 fontes de dado independentes (3 KPIs + 1 lista) todas com seu próprio carregando/vazio/erro infla a spec sem pedido explícito do plano (que só menciona "busca/paginação" como foco desta tela). **Se o Rafael quiser os KPIs dinâmicos**: é uma extensão pontual — dar a cada KPI seu próprio estado, ou (mais barato) calculá-los a partir do próprio mock de sinistros desta tela em vez de números fixos separados (ver item 3 abaixo).
3. **Números dos KPIs fictícios, não calculados a partir do mock da tabela**: "Apólices ativas" (128), "Sinistros em aberto" (14) e "Sinistros aprovados no mês" (9) são valores fixos, coerentes entre si mas não derivados matematicamente dos 23 sinistros do mock da tabela (que tem sua própria distribuição de status). Mesmo princípio de dado fictício já usado em todo o catálogo (ex: saldo do `dashboard-financeiro`) — não há backend real. **Se o Rafael quiser consistência matemática exata**: é um ajuste pontual no `telas-construtor` (derivar "Sinistros em aberto" via `filter(status === "Em análise").length` sobre o mesmo array da tabela, por exemplo) — troca de fonte de dado, não de composição visual.
4. **Sem tela de detalhe de sinistro**: clicar no protocolo não navega para lugar nenhum nesta spec — mesma lacuna já registrada em `apolices-ativas.md` (sem tela de detalhe de apólice) e `novo-sinistro.md` (sem tela de acompanhamento pós-protocolo). Se o produto real precisar disso, é uma 4ª tela fora do escopo atual das 3 já decididas para 5B.
5. **`aria-label` em inglês dos defaults de `PaginationPrevious`/`PaginationNext`/`Pagination` (`ui/pagination.tsx`) sobrescrito só no site de uso desta tela, não corrigido na origem**: decisão desta spec — a spec exige a sobrescrita local (ver "Requisitos de acessibilidade" itens 4/5), mas não instrui o `telas-construtor` a editar o Molecule `pagination.tsx` em si. **Motivo**: esta é a primeira tela do projeto a de fato renderizar esse componente numa jornada (o Pattern isolado nunca tinha sido usado dentro de um Template) — mudar o default do catálogo é uma decisão que afeta qualquer uso futuro do componente, mesmo critério já usado no projeto para não alterar Atom/Molecule sem necessidade clara confirmada (ver regra 3 do `PLANO-LOOP-80-20-TEMPLATES.md`). **Se o Rafael preferir corrigir na origem**: trocar os 3 `aria-label` fixos de `ui/pagination.tsx` para PT-BR é uma edição isolada de 1 arquivo, sem propagar — e aí a sobrescrita local desta tela (e de qualquer tela futura) deixa de ser necessária.
6. **Erro ao carregar modelado só no carregamento inicial/"Atualizar"** — mesma lacuna sistêmica já registrada em todas as telas de 5A/5B (nenhuma tela do projeto modela falha de rede genérica fora do ponto de submissão/carregamento principal).
7. **Tipo "Tipo de sinistro" na tabela usa as mesmas 5 opções de `novo-sinistro`, sem filtro/relação real com a apólice** — mesma lacuna de simplificação já registrada em `novo-sinistro.md` (Lacunas item 2), reaplicada aqui só como coluna de exibição, não como campo de formulário.
