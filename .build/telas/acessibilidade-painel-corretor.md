# Auditoria de acessibilidade — `painel-corretor`

- **Escopo auditado:** `src/app/templates/painel-corretor/page.tsx` (código estático, sem execução da app).
- **Confrontado com:** seção "Requisitos de acessibilidade específicos desta tela" de `.build/telas/painel-corretor.md` (itens 1–16) + dependências lidas no código-fonte (`sidebar.tsx`, `table.tsx`, `pagination.tsx`, `icon.tsx`, `button.tsx`, `card.tsx`, `empty.tsx`, `input-group.tsx`, `src/components/patterns/pagination.tsx`).
- **Atenção especial pedida pelo agente que despachou esta auditoria:** (1) `aria-label` de `PaginationPrevious`/`PaginationNext`/`Pagination` sobrescritos localmente para PT-BR; (2) cobertura dos 9 estados/transições do spec; (3) item de sidebar "Painel" com `aria-current="page"` explícito.
- **Não editado:** nenhum arquivo em `src/` foi alterado por esta auditoria.

## Resumo

| # | Item | Resultado |
|---|---|---|
| 1 | Item "Painel" da sidebar mockada — `aria-current="page"` explícito | **Passa** |
| 2 | Campo de busca com `aria-label="Buscar sinistro"` | **Passa** |
| 3 | Contagem de resultados em `aria-live="polite"` via `CardDescription` | **Passa para busca/paginação (caso principal pedido); mesma duplicação de anúncio já documentada em `apolices-ativas` reaparece aqui em "carregando" e "erro" — ver seção 3** |
| 4 | `PaginationPrevious`/`PaginationNext` com `aria-label` sobrescrito em PT-BR | **Passa, confirmado por leitura do código-fonte de `ui/pagination.tsx`** |
| 5 | `Pagination` com `aria-label="Paginação de sinistros"` sobrescrito + `aria-current="page"` automático no link ativo | **Passa** |
| 6 | Cada `TableHead` com `scope="col"` explícito | **Passa** |
| 7 | Estado de carregamento — `aria-busy="true"` + região `aria-live="polite"` `sr-only` | **Mecanismo presente, mas com a mesma falha estrutural já documentada em `apolices-ativas` — ver seção 3** |
| 8 | Botão "Atualizar" com `aria-disabled`/`aria-busy` (não `disabled` nativo) + guarda `if (carregando) return` | **Passa — e corrige a regressão de foco já registrada como observação em `apolices-ativas`, ver seção 8** |
| 9 | Erro ao carregar — `role="alert"` nativo + foco programático no `AlertTitle` | **Passa o mecanismo; mesma duplicação de texto com `CardDescription` já documentada em `apolices-ativas` — ver seção 3** |
| 10 | Botão "Ver apólice" com rótulo de texto visível (não ícone-only) | **Passa, com a mesma observação de baixo risco (texto repetido entre linhas) já registrada em `apolices-ativas`** |
| 11 | `Select` "Cenário de carregamento" — `Label htmlFor` + ordem de tab | **Passa** |
| 12 | Ícones decorativos com `aria-hidden="true"` automático | **Passa (confirmado no código-fonte de `icon.tsx`)** |
| 13 | Clique no protocolo não vira link/botão sem destino | **Passa** |
| 14 | `CardTitle`/`EmptyTitle` com `asChild` (`<h2>`/`<h3>`) | **Passa** |
| 15 | Ordem de tab: Select → sidebar → KPIs → busca → Atualizar → Abrir novo sinistro → tabela → paginação | **Diverge do texto literal do item, pela mesma tensão estrutural já documentada em `apolices-ativas` (item 13) — ver seção 15** |
| 16 | Reset de página ao buscar sem anúncio `aria-live` adicional | **Passa** |
| — | Nome acessível único de página (`<h1>`) | **Passa** |
| — | Contraste/cores — só tokens do design system | **Passa** |
| — | Nenhum `tabIndex` positivo artificial | **Passa** |
| — | Sidebar mockada com título potencialmente duplicado ("Portal do corretor") | **Observação (baixo risco, condicional)** |
| — | `PaginationPrevious`/`PaginationNext` nunca ficam `aria-disabled` nos limites (página 1/última página) | **Observação (herdada fielmente do Pattern `pagination.tsx`, não introduzida por esta tela)** |

Nenhuma falha bloqueante de teclado/foco/rótulo. O achado mais relevante é a mesma duplicação de anúncio já identificada na auditoria de `apolices-ativas` (seção 4 daquele relatório): o mecanismo de `aria-live` `sr-only` herdado do `skeleton.tsx` e o `role="alert"` nativo do `Alert` de erro coexistem com a `CardDescription` também com `aria-live="polite"` — a mesma composição estrutural foi reaplicada nesta tela item por item, então o mesmo problema se repete de forma praticamente idêntica. Em contrapartida, esta tela **corrige** a regressão de foco do botão "Atualizar" que a auditoria de `apolices-ativas` havia registrado como observação (usa `aria-disabled` em vez de `disabled` nativo, exatamente como o item 8 da própria spec exige).

---

## 1. Item "Painel" da sidebar mockada — `aria-current="page"` explícito — PASSA

```tsx
<SidebarMenuItem>
  <SidebarMenuButton isActive aria-current="page">
    <Icon name="dashboard" />
    <span>Painel</span>
  </SidebarMenuButton>
</SidebarMenuItem>
```
(`page.tsx:278-283`)

- Mesmo mecanismo já confirmado em `apolices-ativas`/`novo-sinistro`: `isActive` só seta `data-active` (estilo, via `sidebar.tsx:504-529`), e `aria-current="page"` é passado como prop solta que cai em `{...props}` do `<button>` real (o `SidebarMenuButton` não usa `asChild` aqui, então `Comp` resolve para `"button"` nativo). Confirmado, não é atributo perdido por spread incompleto.
- Os itens "Apólices" e "Sinistros" são `<a href>` reais via `asChild`+`Link` (`page.tsx:285-299`), coerente com o padrão das duas telas irmãs.

## 2. Campo de busca com `aria-label="Buscar sinistro"` — PASSA

```tsx
<InputGroupInput
  placeholder="Buscar por protocolo, apólice ou titular..."
  value={busca}
  onChange={(e) => {
    setBusca(e.target.value)
    setPagina(1)
  }}
  aria-label="Buscar sinistro"
/>
```
(`page.tsx:466-474`)

- `InputGroupInput` repassa `{...props}` direto para o Atom `Input` (`input-group.tsx:140-154`), que renderiza um `<input>` nativo — o `aria-label` chega intacto ao elemento real. Como não há `<label>` visível associado (só o `placeholder`, que **não** conta como rótulo acessível), o `aria-label` explícito é obrigatório aqui, e está presente. Atende o item 2.

## 3. Contagem de resultados em `aria-live="polite"` — PASSA para o caso pedido, mesma duplicação de `apolices-ativas` reaparece em "carregando" e "erro"

### O que a spec pede (item 3)

> "Contagem de resultados em `aria-live="polite"` (reaproveitada pela própria `CardDescription` do header, não duplicar texto) — atualiza tanto ao buscar quanto ao trocar de página."

### Implementação

```tsx
<CardDescription aria-live="polite">
  {descricaoStatus}
</CardDescription>
```
(`page.tsx:371-373`)

```tsx
let descricaoStatus: string
if (carregando) {
  descricaoStatus = "Carregando sinistros..."
} else if (resultado === "erro") {
  descricaoStatus = "Não foi possível carregar os sinistros"
} else if (resultado === "vazio") {
  descricaoStatus = "Nenhum sinistro cadastrado"
} else if (resultado === "sucesso") {
  descricaoStatus = `${sinistrosFiltrados.length} sinistro${...} encontrado${...}`
} else {
  descricaoStatus = ""
}
```
(`page.tsx:210-223`)

`CardDescription` (`card.tsx:55-63`) é um `<div>` persistente, sempre montado — condição correta para um `aria-live` funcionar de forma confiável (mudança de texto num nó já existente).

### Onde funciona bem (exatamente o que o item 3 pede)

- **Busca aplicada/removida e troca de página**: só `descricaoStatus` muda (`X sinistro(s) encontrado(s)`), única região viva envolvida. **Passa, sem duplicação** — atende ao item 16 também (nenhuma região extra precisa ser adicionada para o reset de página).
- **Transição carregando → sucesso** (carga inicial): o bloco de `Skeleton` é desmontado inteiro; um nó removido não anuncia nada ao sumir, então só o `CardDescription` efetivamente comunica a mudança. **Passa.**

### Onde repete a mesma falha já documentada em `apolices-ativas` (seção 4 daquele relatório)

```tsx
{carregando ? (
  <div aria-busy="true" className="space-y-3">
    <Skeleton className="h-9 w-full sm:w-80" />
    ...
    <p aria-live="polite" className="sr-only">
      Carregando sinistros
    </p>
  </div>
) : ...}
```
(`page.tsx:401-419`)

Esse `<p aria-live="polite">` só existe no DOM enquanto `carregando === true` — nasce do zero a cada clique em "Atualizar" e é destruído por completo assim que os dados chegam. Ao clicar "Atualizar", **dois** mecanismos disparam quase simultaneamente com texto quase idêntico:

1. `CardDescription` (já montado) muda de texto para `"Carregando sinistros..."`.
2. Um **novo** nó `<p aria-live="polite">Carregando sinistros</p>` é inserido no bloco de skeleton — a maioria das combinações NVDA/JAWS + Chrome/Firefox trata a inserção de um nó que já nasce com `aria-live` como conteúdo relevante e também anuncia.

Esse segundo parágrafo também nunca chega a anunciar "sinistros carregados" — é destruído assim que `carregando` vira `false`, antes de qualquer atualização de texto ser possível (mesma limitação da versão original em `apolices-ativas`, comparado ao mecanismo persistente do Pattern `skeleton.tsx` real, que alterna o texto num único nó fixo).

E no estado de erro:

```tsx
<Alert variant="destructive">
  <Icon name="cloud_off" />
  <AlertTitle ref={erroRef} tabIndex={-1}>
    Não foi possível carregar os sinistros
  </AlertTitle>
  ...
```
(`page.tsx:421-425`)

O texto do `AlertTitle` é idêntico, palavra por palavra, ao que `descricaoStatus` assume no mesmo momento (`page.tsx:214`). Ao entrar no estado de erro: `CardDescription` muda de texto, `Alert variant="destructive"` já carrega `role="alert"` nativo (anúncio automático de todo o conteúdo textual assim que entra no DOM) e o foco programático (`erroRef.current?.focus()`, `page.tsx:183-187`) move o foco para o próprio `AlertTitle`, que ao receber foco é lido de novo — três mecanismos, mesma frase, quase ao mesmo tempo.

**Avaliação:** exatamente o mesmo padrão de composição (mesmos arquivos-fonte reaplicados: `skeleton.tsx`, `error-state.tsx`, `CardDescription` como região viva) foi reproduzido tela por tela a partir de `apolices-ativas`, então a mesma consequência aparece de novo aqui. Não é um erro novo introduzido por esta tela — é a mesma decisão de composição da spec (reaproveitar `CardDescription` como região viva única) que não previu, nas duas telas, os estados "carregando" e "erro" como fontes concorrentes de anúncio. Não quebra a operação por teclado nem esconde informação — é redundância/verbosidade, não perda de conteúdo.

## 4. `PaginationPrevious`/`PaginationNext` com `aria-label` PT-BR sobrescrito — PASSA (confirmado no código-fonte)

```tsx
<PaginationPrevious
  href="#"
  aria-label="Página anterior"
  onClick={(event) => {
    event.preventDefault()
    setPagina((p) => Math.max(1, p - 1))
  }}
/>
...
<PaginationNext
  href="#"
  aria-label="Próxima página"
  onClick={(event) => {
    event.preventDefault()
    setPagina((p) => Math.min(totalPaginas, p + 1))
  }}
/>
```
(`page.tsx:543-577`)

Confirmado em `src/components/ui/pagination.tsx:64-96`:

```tsx
function PaginationPrevious({ className, ...props }: ...) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      ...
```

O `aria-label` fixo em inglês é declarado **antes** de `{...props}` no JSX — como JSX resolve atributos duplicados usando o último valor (spread por último vence), o `aria-label="Página anterior"`/`"Próxima página"` passado pelo template sobrescreve corretamente o default em inglês. Mesmo mecanismo para `PaginationNext`. Atende o item 4 da spec de forma funcional, não só por convenção de nomeação.

## 5. `Pagination` com `aria-label` PT-BR + `aria-current="page"` automático — PASSA

```tsx
<Pagination aria-label="Paginação de sinistros">
```
(`page.tsx:540`)

Confirmado em `pagination.tsx:7-17`: `<nav role="navigation" aria-label="pagination" ... {...props} />` — mesmo padrão de spread, o `aria-label="Paginação de sinistros"` do template sobrescreve o default `"pagination"` em inglês.

```tsx
function PaginationLink({ className, isActive, size = "icon", ...props }) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      ...
```
(`pagination.tsx:41-49`)

- `aria-current="page"` já é automático no link ativo via prop `isActive={p === paginaAtual}` (`page.tsx:556`) — não precisa de ajuste manual, exatamente como o item 5 da spec antecipa. Atende integralmente.

## 6. `scope="col"` em cada `TableHead` — PASSA

```tsx
<TableHead scope="col">Protocolo</TableHead>
<TableHead scope="col">Apólice relacionada</TableHead>
<TableHead scope="col">Titular</TableHead>
<TableHead scope="col">Tipo</TableHead>
<TableHead scope="col">Data de abertura</TableHead>
<TableHead scope="col">Status</TableHead>
<TableHead scope="col">Ações</TableHead>
```
(`page.tsx:492-502`)

Confirmado no código-fonte de `table.tsx:68-78`: `TableHead` renderiza um `<th>` puro, sem `scope` embutido — mesmo gap sistêmico já documentado em `apolices-ativas`. Todas as 7 colunas desta tabela têm `scope="col"` explícito, sem exceção. Atende o item 6.

## 7. Estado de carregamento — `aria-busy` + região viva — mecanismo presente, falha já detalhada na seção 3

```tsx
<div aria-busy="true" className="space-y-3">
```
(`page.tsx:402`)

- O contêiner tem `aria-busy="true"` corretamente durante o carregamento, atendendo à metade estrutural do item 7. A região `aria-live="polite" sr-only` também está presente (`page.tsx:416-418`), mas com a mesma limitação já detalhada na seção 3 (nó efêmero, duplica com `CardDescription`, nunca anuncia a transição para "carregado"). Não repito o trecho aqui — ver seção 3 para o detalhamento completo.

## 8. Botão "Atualizar" — `aria-disabled`/`aria-busy` + guarda — PASSA, e corrige uma regressão registrada em `apolices-ativas`

```tsx
{/* aria-disabled em vez de disabled nativo — evita o salto de foco pro
    <body> (ver button.tsx). */}
<Button
  variant="outline"
  size="sm"
  aria-disabled={carregando}
  aria-busy={carregando}
  onClick={() => {
    if (!carregando) carregar(cenario)
  }}
>
  <Icon name="refresh" />
  Atualizar
</Button>
```
(`page.tsx:379-390`)

Confirmado em `button.tsx:20-30` (comentário de 2026-07-23 no próprio arquivo): `aria-disabled:pointer-events-none aria-disabled:opacity-50` foi adicionado à `buttonVariants` justamente para telas com loading síncrono, "porque `disabled` nativo tira o elemento focado da árvore de acessibilidade e joga o foco pro `<body>`". Diferença em relação a `apolices-ativas` (que usa `disabled={carregando}` nativo no mesmo botão e onde a auditoria daquela tela registrou, como observação de baixo risco, a perda de foco para `<body>` durante o clique):

- Aqui o botão permanece focável durante o carregamento — `aria-disabled` não remove da árvore de acessibilidade nem do fluxo de Tab.
- Mouse: `aria-disabled:pointer-events-none` bloqueia novos cliques via CSS enquanto `carregando === true`.
- Teclado: `pointer-events: none` não afeta ativação via Enter/Espaço em elementos focados — a guarda explícita `if (!carregando) carregar(cenario)` no handler é quem garante que um segundo disparo por teclado não recarregue de novo.
- `aria-busy={carregando}` comunica o estado de ocupado a quem usa leitor de tela, sem remover o botão do fluxo de navegação.

Atende integralmente o item 8, e é uma implementação estritamente melhor que a de `apolices-ativas` no mesmo ponto.

## 9. Erro ao carregar — `role="alert"` nativo + foco programático — PASSA o mecanismo, duplicação já detalhada na seção 3

```tsx
React.useEffect(() => {
  if (resultado === "erro") {
    erroRef.current?.focus()
  }
}, [resultado])
```
(`page.tsx:183-187`)

```tsx
<AlertTitle ref={erroRef} tabIndex={-1}>
  Não foi possível carregar os sinistros
</AlertTitle>
```
(`page.tsx:423-425`)

- `Alert variant="destructive"` expõe `role="alert"` nativo, e `ref`+`tabIndex={-1}`+`.focus()` é o mesmo mecanismo já auditado em `apolices-ativas`/`novo-sinistro`/`login-erro-validacao`. O mecanismo em si é correto e necessário (evita foco perdido no botão "Atualizar"). A ressalva é a mesma da seção 3: sobreposição com `CardDescription` anunciando a mesma frase.

## 10. Botão "Ver apólice" com rótulo de texto visível — PASSA, mesma observação de baixo risco de `apolices-ativas`

```tsx
<Button variant="outline" size="sm" asChild>
  <Link href="/templates/apolices-ativas">
    Ver apólice
    <Icon name="arrow_forward" />
  </Link>
</Button>
```
(`page.tsx:523-528`)

- Texto visível "Ver apólice" presente em todas as linhas da página atual da tabela, `Icon name="arrow_forward"` é complementar (e decorativo — sem `aria-label`, então `aria-hidden="true"` automático via `icon.tsx`, ver item 12). Atende o item 10.
- **Observação de baixo risco, mesma natureza da já registrada em `apolices-ativas` para "Abrir sinistro":** como o texto "Ver apólice" se repete idêntico em até 5 linhas por página, um usuário de leitor de tela navegando pela lista de links da página (ex. NVDA "Elements List" filtrado por links) veria vários links com o mesmo nome, sem diferenciação de qual sinistro/apólice cada um abre — a distinção só existe pelo contexto da linha (protocolo/titular ao lado), perceptível em navegação linear/por tabela, não isolada por lista de links. A própria spec já trata isso como aceitável para este volume (item 10, "mantém rótulo de texto visível... mesmo princípio de todo o fluxo"). Registrado como observação, não como falha.

## 11. `Select` "Cenário de carregamento" — PASSA

```tsx
<Label htmlFor="cenario-carregamento" className="text-sm">
  Cenário de carregamento (demonstração)
</Label>
<Select value={cenario} onValueChange={(valor) => setCenario(valor as Cenario)}>
  <SelectTrigger id="cenario-carregamento" size="sm" className="w-64">
    <SelectValue />
  </SelectTrigger>
  ...
```
(`page.tsx:249-264`)

- `Label htmlFor` associado ao `id` do `SelectTrigger` — mesma exigência já auditada em todas as telas de 5A/5B. Fica fora do container `w-full rounded-lg border`, antes de qualquer elemento da moldura principal — entra corretamente na ordem de tab, primeira parada da página. Atende o item 11.

## 12. Ícones decorativos com `aria-hidden="true"` automático — PASSA

Confirmado em `src/components/ui/icon.tsx:38-48`:

```tsx
// Só força aria-hidden quando o chamador não passou nenhuma prop de
// acessibilidade — caso contrário o svg ficaria fora da árvore de
// acessibilidade mesmo com role/aria-label explícitos (ex.: Spinner).
const hasA11yProp =
  "aria-label" in props || "aria-labelledby" in props || "role" in props

return (
  <svg
    ...
    aria-hidden={hasA11yProp ? undefined : "true"}
    ...
```

- Todos os `Icon` desta tela (`dashboard`, `verified_user`, `checklist`, `bar_chart`, `refresh`, `add`, `search`, `cloud_off`, `inbox`, `arrow_forward`) são chamados sem `aria-label`/`aria-labelledby`/`role` — nenhum grep encontrou essas props em nenhuma chamada de `Icon` no arquivo — então todos recebem `aria-hidden="true"` automaticamente. Diferente das telas irmãs mais antigas (`apolices-ativas`/`novo-sinistro`, ainda em `lucide-react`, onde essa é uma observação de baixo risco não resolvida), aqui o item 12 da spec é atendido de forma ativa pelo Atom migrado, sem tratamento manual necessário.

## 13. Clique no protocolo não vira link/botão sem destino — PASSA

```tsx
<TableCell>{sinistro.protocolo}</TableCell>
```
(`page.tsx:508`)

- Renderizado como texto simples, sem `<a>`/`<button>`/`onClick`. Atende o item 13, mesma exigência já registrada em `apolices-ativas.md` para o número da apólice.

## 14. `CardTitle`/`EmptyTitle` com `asChild` (`<h2>`/`<h3>`) — PASSA

```tsx
<CardTitle asChild>
  <h2>Sinistros</h2>
</CardTitle>
```
(`page.tsx:368-370`)

```tsx
<EmptyTitle asChild>
  <h3>Nenhum sinistro cadastrado</h3>
</EmptyTitle>
```
(`page.tsx:444-446`, estado 5 — vazio real)

```tsx
<EmptyTitle asChild>
  <h3>Nenhum sinistro para esta busca</h3>
</EmptyTitle>
```
(`page.tsx:479-481`, estado 4 — busca sem resultado)

Confirmado em `card.tsx:40-53`/`empty.tsx:65-78`: `CardTitle`/`EmptyTitle` renderizam `<div>` por padrão, mas aceitam `asChild` desde 2026-07-23 (comentário no próprio arquivo, adicionado como resposta à auditoria de acessibilidade da Fase 5). Os três usos desta tela usam `asChild` com heading real — diferente de `apolices-ativas` (que ainda usa `<CardTitle>` sem `asChild`, registrado como gap sistêmico não corrigido naquela auditoria), esta tela já resolve o gap ativamente. Atende o item 14 de forma mais completa que as telas irmãs mais antigas.

- Único ponto de atenção: a página tem agora `<h1>` → `<h2>` ("Sinistros") → `<h3>` ("Nenhum sinistro cadastrado"/"Nenhum sinistro para esta busca") — hierarquia de nível sequencial, sem saltos. Correto.

## 15. Ordem de tab — diverge do texto literal do item 15, mesma tensão estrutural já documentada em `apolices-ativas`

### O que o item 15 pede, literalmente

> "Select de cenário → sidebar (itens próprios) → cards de KPI (botões, quando existirem) → campo de busca → botão Atualizar → botão Abrir novo sinistro → linhas da tabela (...) → paginação"

### O que a composição visual/DOM real produz

```tsx
<Card>
  <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0">
    <div>
      <CardTitle asChild><h2>Sinistros</h2></CardTitle>
      <CardDescription aria-live="polite">{descricaoStatus}</CardDescription>
    </div>
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="outline">Ambiente de demonstração</Badge>
      <Button ... >Atualizar</Button>
      <Button size="sm" asChild><Link href="/templates/novo-sinistro">Abrir novo sinistro</Link></Button>
    </div>
  </CardHeader>

  <CardContent className="flex flex-col gap-4">
    ...
    <InputGroupInput aria-label="Buscar sinistro" .../>
    ...
```
(`page.tsx:365-475`)

O `CardHeader` (com os botões "Atualizar" e "Abrir novo sinistro") é renderizado — no DOM e visualmente — **antes** do `CardContent` (onde fica o campo de busca). Sem nenhum `tabIndex` positivo no arquivo (confirmado por grep — o único `tabIndex` explícito é `-1`, usado só como alvo de foco programático no `AlertTitle`), a ordem de tab segue exatamente a ordem visual/DOM real: **"Atualizar" e "Abrir novo sinistro" são alcançados pelo Tab antes do campo de busca**, o oposto da ordem literal descrita no item 15 ("campo de busca → botão Atualizar → botão Abrir novo sinistro").

### Por que isso é a mesma tensão já registrada em `apolices-ativas` (seção 13 daquele relatório), não um erro isolado desta tela

A mesma composição — botão de ação secundária no `CardHeader` (acima) vs. controle de filtro/busca no `CardContent` (abaixo) — já havia sido descrita como tensão estrutural entre "composição visual da spec" e "texto literal do requisito de ordem de tab" na auditoria de `apolices-ativas`. Esta tela reproduz exatamente o mesmo padrão de layout (herdado do mesmo precedente, `novo-sinistro`, cujo `CardHeader` responsivo é citado explicitamente na própria spec desta tela como referência — `painel-corretor.md`, linha 100), então a mesma tensão se repete: a única forma de fazer o campo de busca vir antes de "Atualizar"/"Abrir novo sinistro" na ordem de tab seria reposicionar visualmente os botões para dentro do `CardContent`, abaixo da busca (contrariando a composição visual "botões no header, ao lado do badge de ambiente" descrita na spec), ou usar `tabIndex` positivo (não recomendado, e evitado corretamente neste arquivo).

**Veredito:** não é uma falha de ordem ilógica ou confusa — a ordem real (Select cenário → sidebar → KPI "Ver apólices" → Atualizar → Abrir novo sinistro → busca → linhas da tabela → paginação) é coerente com o que aparece na tela, de cima para baixo/esquerda para direita, sem saltos nem truques. Mas diverge do texto literal do item 15, exatamente como a mesma tensão já identificada em `apolices-ativas`. Vale confirmar com o Rafael se a intenção era mesmo priorizar "busca antes dos botões de ação" na navegação por teclado — nesse caso seria necessária uma mudança de layout, não de código de acessibilidade isolado.

## 16. Reset de página ao buscar (estado 3/4) sem anúncio adicional — PASSA

```tsx
onChange={(e) => {
  setBusca(e.target.value)
  setPagina(1)
}}
```
(`page.tsx:469-472`)

- Nenhuma região `aria-live` extra foi adicionada para comunicar o reset de página — a única fonte viva é a `CardDescription` já contabilizada no item 3, que naturalmente reflete a nova contagem de resultados filtrados na página 1. Atende o item 16, sem duplicação.

---

## Verificações adicionais (fora dos 16 itens numerados da spec, mesmo padrão de rigor das auditorias irmãs)

### a. Nome acessível único de página (`<h1>`) — PASSA

```tsx
<h1 className="font-heading text-2xl font-semibold tracking-tight">
  Template — Painel do corretor
</h1>
```
(`page.tsx:236-238`)

- Único `<h1>` da rota. Diferente de `apolices-ativas` (que não tem nenhum heading intermediário porque `CardTitle`/`EmptyTitle` ainda são `<div>`s lá), esta tela tem uma hierarquia real: `<h1>` → `<h2>` ("Sinistros") → `<h3>` (títulos dos estados `Empty`), sem saltos de nível — ver item 14.

### b. Contraste/cores — só tokens do design system — PASSA

- Busca por cores arbitrárias (`#`, `rgb(`, `text-[`, `bg-[`) no arquivo: nenhuma ocorrência. Todas as classes de cor usadas (`text-muted-foreground`, `text-2xl font-bold`, `bg-card`/`text-card-foreground` via `Card`, `variant="destructive"` do `Alert`/`Badge`) são tokens do design system já validados nas telas irmãs — nenhum texto novo introduz cor fora de token.

### c. Sidebar mockada com texto potencialmente duplicado — Observação (baixo risco, condicional)

```tsx
<SidebarHeader className="p-3 text-sm font-medium">
  {selecao?.corretora ?? "Portal do corretor"}
</SidebarHeader>
<SidebarContent>
  <SidebarGroup>
    <SidebarGroupLabel>Portal do corretor</SidebarGroupLabel>
    ...
```
(`page.tsx:271-276`)

- Quando `selecao?.corretora` está indefinido (ex. ao acessar esta rota diretamente, sem passar pelo `FluxoLoginContext` de uma tela de login anterior — cenário plausível, já que esta tela "não recebe dado de nenhuma tela anterior" por decisão provisória da própria spec, item 1 das Lacunas), o texto "Portal do corretor" aparece duas vezes seguidas: uma no `SidebarHeader`, outra no `SidebarGroupLabel` logo abaixo. Ambos `<div>`s puros (`sidebar.tsx`), sem `aria-labelledby` conectando um ao outro — não há duplicação de anúncio via mecanismo ARIA, só redundância de conteúdo lido em sequência normal. Mesma observação já registrada em `apolices-ativas` (que tem exatamente a mesma estrutura), reproduzida aqui porque a composição da sidebar é idêntica entre as três telas de 5B, por design.

### d. `PaginationPrevious`/`PaginationNext` nunca ficam `aria-disabled` nos limites — Observação (herdada fielmente do Pattern catalogado)

```tsx
<PaginationPrevious
  href="#"
  aria-label="Página anterior"
  onClick={(event) => {
    event.preventDefault()
    setPagina((p) => Math.max(1, p - 1))
  }}
/>
```
(`page.tsx:543-550`)

- Na página 1, clicar em "Página anterior" é um no-op silencioso (`Math.max(1, p - 1)` mantém `p = 1`) — o link continua focável, clicável e sem nenhum `aria-disabled`/`aria-current` indicando que já é o limite. Mesmo comportamento em "Próxima página" na última página. Não é uma falha introduzida por esta tela: o Pattern catalogado `src/components/patterns/pagination.tsx:57-92` (citado explicitamente na spec como o mecanismo a ser reaplicado sem alterar) tem exatamente a mesma ausência de tratamento de limite — reaproveitado fielmente, sem regressão nem melhoria. Um usuário de leitor de tela no primeiro/último item de página não recebe indicação de que a ação não terá efeito, mas também não é enganado sobre navegação (o clique simplesmente não muda nada visível, sem erro nem travamento). Registrado como observação de baixo risco, consistente com o padrão já aceito no catálogo.

### e. Nenhum `tabIndex` positivo artificial — PASSA

- Único `tabIndex` explícito no arquivo é `tabIndex={-1}` no `AlertTitle` do estado de erro (`page.tsx:423`), usado exclusivamente como alvo de foco programático — mesmo padrão correto já auditado em todas as telas de 5A/5B.

---

## Conclusão

`painel-corretor` reaplica com fidelidade os mecanismos já validados (e as tensões já identificadas) nas duas telas irmãs de 5B, e acerta integralmente os três pontos de atenção especial desta auditoria:

1. **`aria-current="page"` explícito** no item "Painel" da sidebar — confirmado funcional via leitura de `sidebar.tsx` (mesmo mecanismo de `apolices-ativas`/`novo-sinistro`).
2. **Cobertura completa dos 9 estados/transições do spec** — carregando (item 7), sucesso com paginação (itens 4/5/6), busca com/sem resultado (itens 2/3), vazio real com CTA de navegação real (item 14), erro com foco programático (item 9), troca de página (item 5), e as duas transições de navegação para fora da rota (KPI "Ver apólices", "Abrir novo sinistro", "Ver apólice" de linha) — todos implementados e auditados individualmente acima.
3. **`aria-label` de `PaginationPrevious`/`PaginationNext`/`Pagination` sobrescritos em PT-BR** — confirmado não apenas pela presença da prop no template, mas pela leitura do código-fonte de `ui/pagination.tsx`, que demonstra que o spread `{...props}` após o `aria-label` fixo garante a sobrescrita funcionar de fato, não só por convenção.

Esta tela também **corrige ativamente** dois gaps que as auditorias das telas irmãs mais antigas haviam registrado como observação, sem exigência explícita de correção: usa `asChild` em `CardTitle`/`EmptyTitle` (heading real, item 14) e usa `aria-disabled`/`aria-busy` no botão "Atualizar" em vez de `disabled` nativo (evita a perda de foco para `<body>` registrada como observação em `apolices-ativas`, item 8) — ambos resultado direto de comentários de correção já aplicados nos próprios Atoms (`card.tsx`, `empty.tsx`, `button.tsx`) em 2026-07-23, antes desta tela ser construída.

Por outro lado, dois achados estruturais **se repetem, quase palavra por palavra**, em relação à auditoria de `apolices-ativas`, porque a composição que os origina foi reaplicada da mesma forma:

- **Duplicação de anúncio nos estados "carregando" e "erro"** (seção 3): o `<p aria-live>` efêmero do bloco de skeleton e o `role="alert"` nativo do `Alert` de erro coexistem com a `CardDescription` (também `aria-live="polite"`), gerando anúncios redundantes — não perda de informação, mas verbosidade repetida a cada transição.
- **Tensão entre a ordem de tab literal do item 15 e a composição visual real** (seção 15): os botões "Atualizar"/"Abrir novo sinistro" ficam no `CardHeader` (acima), o campo de busca no `CardContent` (abaixo) — sem `tabIndex` artificial, a ordem de tab segue a ordem visual real (botões antes da busca), divergindo do texto literal "busca → Atualizar → Abrir novo sinistro" do requisito.

Nenhum dos dois achados bloqueia o uso da tela por teclado ou leitor de tela. Ambos são recomendados como itens de backlog transversal (não só desta tela) — o padrão de `CardDescription` + regiões vivas concorrentes e a composição `CardHeader`-acima-de-`CardContent` já se repetiram em duas telas consecutivas de 5B, então uma correção na origem (ex.: um mecanismo padronizado de "região de status única" no catálogo) beneficiaria as três telas de uma vez, em vez de ser corrigida tela por tela.
