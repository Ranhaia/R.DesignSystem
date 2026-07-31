# Auditoria de acessibilidade — `apolices-ativas`

- **Escopo auditado:** `src/app/templates/apolices-ativas/page.tsx` (código estático, sem execução da app).
- **Confrontado com:** seção "Requisitos de acessibilidade específicos desta tela" de `.build/telas/apolices-ativas.md` (itens 1–13) + dependências (`sidebar.tsx`, `table.tsx`, `popover.tsx`, `checkbox.tsx`, `badge.tsx`, `card.tsx`, `alert.tsx`, `empty.tsx`, `skeleton.tsx`, `select.tsx`, `label.tsx`, `button.tsx`) + comparação com o mecanismo original em `src/components/patterns/skeleton.tsx`.
- **Atenção especial pedida:** (1) `SidebarMenuButton isActive` + `aria-current="page"` explícito; (2) `scope="col"` em cada `TableHead`; (3) filtro via Popover+Checkbox com Badges removíveis; (4) a região `aria-live` reaproveitada como `CardDescription` (duplicação de anúncio) — investigado em profundidade na seção 4 abaixo, junto com uma segunda ocorrência do mesmo problema no estado de erro que a spec não previu explicitamente.
- **Não editado:** nenhum arquivo em `src/` foi alterado por esta auditoria.

## Resumo

| # | Item | Resultado |
|---|---|---|
| 1 | Item "Apólices" da sidebar mockada — `isActive` + `aria-current="page"` explícito | **Passa** |
| 2 | Cada `TableHead` com `scope="col"` explícito | **Passa** |
| 3 | Filtro Popover+Checkbox — `Checkbox`/`Label` associados via `htmlFor`, Badges removíveis com `aria-label` descritivo | **Passa** |
| 4 | Região `aria-live="polite"` reaproveitada pela `CardDescription` (contagem de resultados) sem duplicar anúncio | **Passa para o caso pedido pela spec (contagem/filtro); falha pontual em dois outros estados não cobertos literalmente pelo item 1 — ver seção 4** |
| 5 | Botão "Atualizar" `disabled` durante o carregamento | **Passa** |
| 6 | Erro ao carregar — `Alert variant="destructive"` (`role="alert"` nativo) + foco programático no `AlertTitle` | **Passa o mecanismo de foco; mesma duplicação de texto documentada na seção 4** |
| 7 | Badge de filtro removível — botão com `aria-label` descritivo | **Passa** |
| 8 | `Checkbox` + `Label` do Popover associados via `htmlFor`/`id` | **Passa** |
| 9 | Botão "Abrir sinistro" com rótulo de texto visível (não ícone-only) | **Passa, com observação de baixo risco (texto repetido entre linhas, ver seção 9)** |
| 10 | `Select` "Cenário de carregamento" — `Label htmlFor` + ordem de tab | **Passa** |
| 11 | Número da apólice não é link/botão sem destino | **Passa** |
| 12 | Gap sistêmico `EmptyTitle`/`CardTitle` sem heading semântico | **Observação registrada, não corrigida aqui (conforme instrução)** |
| 13 | Ordem de tab: filtro → badges → Atualizar → linhas da tabela | **Diverge do texto literal do item, mas segue corretamente a ordem visual real da tela — ver seção 13** |
| — | Nome acessível único de página (`<h1>`) | **Passa** |
| — | Contraste/cores — só tokens do design system | **Passa** |
| — | Nenhum `tabIndex` positivo artificial | **Passa** |
| — | Sidebar mockada com título duplicado ("Portal do corretor" no header e no group label) | **Observação nova (baixo risco)** |
| — | Botão "Atualizar" perde foco ao ficar `disabled` durante o próprio clique | **Observação (mesmo padrão já registrado em `selecao-perfil-corretora`/`recuperacao-senha`)** |
| — | Ícones decorativos sem `aria-hidden` explícito | **Observação (não bloqueante, herdada das telas irmãs)** |

Nenhuma falha bloqueante de teclado/foco/rótulo. O ponto mais importante encontrado é a duplicação de anúncio (seção 4): o mecanismo de `aria-live` sr-only do estado de carregamento (herdado do `skeleton.tsx`) não foi adaptado ao fato de a tela já ter uma segunda região viva (`CardDescription`) cobrindo a mesma transição — e o mesmo problema se repete, de forma mais severa, no estado de erro, onde três mecanismos (`CardDescription`, `role="alert"` nativo do `Alert`, e o foco programático no próprio `AlertTitle`) anunciam o texto idêntico "Não foi possível carregar as apólices" quase simultaneamente.

---

## 1. `SidebarMenuButton isActive` + `aria-current="page"` explícito — PASSA

```tsx
<SidebarMenuItem>
  <SidebarMenuButton isActive aria-current="page">
    <ShieldCheckIcon />
    <span>Apólices</span>
  </SidebarMenuButton>
</SidebarMenuItem>
```
(`page.tsx:226-231`)

Confirmado no código-fonte de `sidebar.tsx`:

```tsx
function SidebarMenuButton({
  asChild = false,
  isActive = false,
  ...
  className,
  ...props
}: ...) {
  const Comp = asChild ? Slot.Root : "button"
  ...
  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )
```
(`src/components/ui/sidebar.tsx:504-529`)

- `isActive` só seta `data-active` (estilo) — exatamente como a spec (item 2) já antecipava, e como o próprio comentário no código do template confirma (`page.tsx:73` da spec). O `aria-current="page"` foi passado como prop solta na chamada do componente e, como o item não usa `asChild`, o `Comp` resolvido é `"button"` nativo — o `aria-current` cai dentro de `...props` e é aplicado diretamente no `<button>` real do DOM. Confirmado, não é um atributo "perdido" por spread incompleto.
- Comparado com o precedente `dashboard-financeiro` (`src/app/templates/dashboard-financeiro/page.tsx:171-177`), que usa só `<SidebarMenuButton isActive={item.active}>` sem `aria-current` e sem nenhum item virar link real — esta tela melhora os dois pontos: os itens "Painel"/"Sinistros" são `<a href>` reais via `asChild`+`Link`, e o item ativo tem `aria-current="page"` explícito, exatamente o que o item 2 da spec exige.
- Observação de baixo risco (não bloqueante): o item "Apólices" continua sendo um `<button>` focável sem `onClick`, i.e., recebe foco no Tab mas Enter/Espaço não fazem nada — correto (é a página atual, não deve navegar), mas alguns leitores de tela vão anunciar "Apólices, botão, página atual" em vez de um tratamento mais silencioso (ex.: `<span>` não interativo ou link para si mesmo). É uma escolha aceitável e não é uma falha de acessibilidade — apenas uma nuance de UX de foco a considerar se o catálogo quiser padronizar o "item ativo" de sidebar no futuro.

## 2. `scope="col"` em cada `TableHead` — PASSA

```tsx
<TableHeader>
  <TableRow>
    <TableHead scope="col">Número da apólice</TableHead>
    <TableHead scope="col">Titular</TableHead>
    <TableHead scope="col">Categoria</TableHead>
    <TableHead scope="col">Vigência até</TableHead>
    <TableHead scope="col">Status</TableHead>
    <TableHead scope="col">Ações</TableHead>
  </TableRow>
</TableHeader>
```
(`page.tsx:393-402`)

Confirmado no código-fonte de `table.tsx`:

```tsx
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn("h-10 px-2 text-left align-middle font-medium ...", className)}
      {...props}
    />
  )
}
```
(`src/components/ui/table.tsx:68-79`)

- `TableHead` renderiza um `<th>` puro sem `scope` embutido — exatamente o gap que a spec antecipava (item 3). Todas as 6 colunas do template têm `scope="col"` explícito, sem exceção. Associação cabeçalho/célula fica reforçada para leitores de tela em modo de navegação por tabela (JAWS/NVDA "modo tabela").

## 3. Filtro Popover + Checkbox + Badges removíveis — PASSA

```tsx
<Checkbox
  id={`filtro-${categoria}`}
  checked={categoriasSelecionadas.includes(categoria)}
  onCheckedChange={() => toggleCategoria(categoria)}
/>
<Label htmlFor={`filtro-${categoria}`}>{categoria}</Label>
```
(`page.tsx:346-357`)

```tsx
<Badge key={categoria} variant="secondary" className="gap-1">
  {categoria}
  <button
    type="button"
    aria-label={`Remover filtro ${categoria}`}
    onClick={() => toggleCategoria(categoria)}
    className="rounded-full hover:bg-secondary-foreground/10"
  >
    <XIcon className="size-3" />
  </button>
</Badge>
```
(`page.tsx:363-379`)

- Cada `Checkbox` tem `id` próprio e cada `Label` correspondente usa `htmlFor` apontando para o mesmo `id` — o texto da categoria não fica solto ao lado do controle, atende o item 8 da spec.
- Cada badge removível expõe um `<button type="button">` real com `aria-label` descritivo incluindo o nome da categoria (ex.: "Remover filtro Auto") — não é um `XIcon` mudo. Atende o item 7 da spec, mesma composição já validada em `filters.tsx`.
- `PopoverTrigger asChild` envolve o `Button` "Filtros" (`SlidersHorizontalIcon` + texto visível) — `PopoverPrimitive.Trigger` do Radix já gerencia `aria-expanded`/`aria-haspopup` automaticamente, sem trabalho manual necessário (`src/components/ui/popover.tsx:14-18`).
- `CheckboxPrimitive.Root` (Radix) renderiza um elemento com `role="checkbox"`/`aria-checked` sincronizado ao estado — compatível com o `onCheckedChange` controlado (`categoriasSelecionadas`).
- Observação de baixo risco, não bloqueante: os `id`s gerados (`filtro-Saúde`, `filtro-Empresarial`) incluem acento (`ú`). HTML5 aceita qualquer caractere não-espaço em `id`, então funciona normalmente em todos os navegadores/leitores de tela testáveis estaticamente — só uma prática menos convencional que caracteres ASCII puro, sem efeito prático conhecido.

## 4. Região `aria-live` reaproveitada como `CardDescription` — PASSA para o caso pedido, FALHA PONTUAL em dois estados não cobertos pelo texto literal da spec

### O que a spec pede

> "Região `aria-live="polite"` com a contagem de resultados — reaproveitada também pela `CardDescription` do header (não duplicar o texto, só uma fonte visível + 1 região viva)." (spec, linha 88, ver também item 1 dos Requisitos de acessibilidade)

### Implementação

```tsx
<CardDescription aria-live="polite">
  {descricaoStatus}
</CardDescription>
```
(`page.tsx:250-252`)

```tsx
let descricaoStatus: string
if (carregando) {
  descricaoStatus = "Carregando apólices..."
} else if (resultado === "sucesso") {
  descricaoStatus = `${apolicesFiltradas.length} apólice${...} encontrada${...}`
} else if (resultado === "vazio") {
  descricaoStatus = "Nenhuma apólice cadastrada"
} else {
  descricaoStatus = "Não foi possível carregar as apólices"
}
```
(`page.tsx:160-171`)

`CardDescription` (`card.tsx:41-49`) é um `<div>` persistente, sempre montado — exatamente a condição necessária para um `aria-live` funcionar de forma confiável (mudança de **texto** dentro de um nó já existente, não inserção de nó novo).

### Onde isso funciona bem (cobre exatamente o que o item 1/linha 88 pedem)

- **Contagem de resultados com filtro aplicado/removido**: ao marcar/desmarcar uma categoria, só `descricaoStatus` muda (`X apólice(s) encontrada(s)`), e é a única região viva envolvida — sem duplicação. **Passa.**
- **Transição carregando → sucesso** (carga inicial ou "Atualizar" bem-sucedido): o bloco de `Skeleton` (com sua própria `<p aria-live>` interna, ver abaixo) é desmontado inteiro; como um nó removido não anuncia nada ao desaparecer, só o `CardDescription` efetivamente anuncia a mudança ("Carregando apólices..." → "N apólices encontradas"). **Passa, sem duplicação.**

### Onde isso falha: início do carregamento (clique em "Atualizar")

```tsx
{carregando ? (
  <div aria-busy="true" className="space-y-3">
    ...
    <p aria-live="polite" className="sr-only">
      Carregando apólices
    </p>
  </div>
) : ...}
```
(`page.tsx:269-288`)

Esse `<p aria-live="polite">` está **dentro** do branch condicional `carregando`, ou seja, só existe no DOM enquanto `carregando === true` — é criado do zero a cada vez que o usuário clica "Atualizar" e destruído por completo assim que os dados chegam. Isso diverge do mecanismo original do Pattern reaproveitado:

```tsx
// src/components/patterns/skeleton.tsx:47-49 — elemento PERSISTENTE,
// só o texto muda entre os dois estados:
<p aria-live="polite" className="sr-only">
  {loaded ? "Conteúdo carregado" : "Carregando conteúdo"}
</p>
```

Consequência prática ao clicar "Atualizar" (transição sucesso/vazio/erro → carregando): no mesmo ciclo de render, **dois** mecanismos de anúncio disparam quase simultaneamente com texto equivalente:

1. `CardDescription` (já montado, `aria-live="polite"`) muda de texto para `"Carregando apólices..."` — anúncio via mudança de conteúdo em região já registrada (mecanismo mais confiável).
2. Um **novo** nó `<p aria-live="polite">Carregando apólices</p>` é inserido no DOM dentro do bloco de skeleton — inserção de um nó novo que já nasce com `aria-live` e conteúdo. A maioria das combinações navegador/leitor de tela atuais (NVDA+Firefox/Chrome, JAWS+Chrome) trata isso como "adição relevante a uma live region" e também anuncia — mesmo texto, quase ao mesmo tempo.

Resultado esperado na prática: "Carregando apólices..." anunciado duas vezes em sequência muito próxima ao clicar "Atualizar". Além disso, esse segundo parágrafo **nunca chega a anunciar "apólices carregadas"** como o mecanismo original do Pattern faz — ele é destruído assim que `carregando` vira `false`, antes de qualquer atualização de texto ser possível. Ou seja: além de duplicar o anúncio de início, ele não cumpre a segunda metade do que o item 4 da spec pede ("região `aria-live` `sr-only` anunciando a transição carregando → **carregado**").

### Onde isso falha de forma mais severa: estado de erro

```tsx
<Alert variant="destructive">
  <ServerCrashIcon />
  <AlertTitle ref={erroRef} tabIndex={-1}>
    Não foi possível carregar as apólices
  </AlertTitle>
  ...
</Alert>
```
(`page.tsx:290-306`)

```tsx
React.useEffect(() => {
  if (resultado === "erro") {
    erroRef.current?.focus()
  }
}, [resultado])
```
(`page.tsx:139-143`)

O texto do `AlertTitle` é **idêntico, palavra por palavra**, ao texto que `descricaoStatus` assume no mesmo momento (`"Não foi possível carregar as apólices"`, `page.tsx:170`). Ao entrar no estado de erro, três mecanismos independentes disparam quase ao mesmo tempo, todos comunicando a mesma frase:

1. `CardDescription` (`aria-live="polite"`) muda de texto para "Não foi possível carregar as apólices".
2. `Alert variant="destructive"` carrega `role="alert"` nativo (`alert.tsx:22-35`) — leitores de tela anunciam automaticamente todo o conteúdo textual do alerta assim que ele entra no DOM, incluindo o `AlertTitle` com o mesmo texto.
3. O foco programático (`erroRef.current?.focus()`) move o foco para o próprio `AlertTitle`, que ao receber foco é lido novamente pelo leitor de tela (o mecanismo de foco é necessário e correto — evita que o foco "se perca" no botão que disparou a falha — mas empilha uma terceira leitura do mesmo texto sobre as duas anteriores).

Isso não é uma falha de teclado/operabilidade (o usuário ainda chega ao "Tentar novamente" normalmente, e o conteúdo é comunicado, só que de forma redundante) — mas é exatamente o tipo de duplicação de anúncio que a spec pede para evitar ao reaproveitar `CardDescription` como região viva (linha 88), só que essa consequência específica não foi antecipada no texto da spec (que fala só da contagem de filtro) e por isso passou despercebida na composição do estado de erro.

### Como isso poderia ser corrigido (registrado, não implementado — fora do escopo desta auditoria)

- Não reaproveitar `CardDescription` para os estados "carregando" e "erro" (só para "sucesso"/"vazio", que não têm outra fonte viva concorrente) — ou:
- Tornar o `<p aria-live>` do skeleton persistente (fora do `carregando ? ... : ...`, alternando texto como no Pattern original) e remover a duplicação com `CardDescription` nesse trecho — ou:
- No estado de erro, não replicar o mesmo texto em `descricaoStatus`; usar algo genérico ali (ex. "Falha ao carregar") e deixar o `Alert`/`AlertTitle` ser a única fonte da frase completa.

## 5. Botão "Atualizar" `disabled` durante o carregamento — PASSA

```tsx
<Button
  variant="outline"
  size="sm"
  disabled={carregando}
  onClick={() => carregar(cenario)}
>
  <RefreshCwIcon />
  Atualizar
</Button>
```
(`page.tsx:256-264`)

- Mesmo mecanismo do Pattern `loading.tsx`, evita disparo duplicado de `carregar()`. Atende o item 5.

## 6. Erro ao carregar — foco programático no `AlertTitle` — PASSA (mecanismo), duplicação de texto já documentada na seção 4

- `Alert variant="destructive"` já expõe `role="alert"` nativo, e o `ref`+`tabIndex={-1}`+`.focus()` no `AlertTitle` é o mesmo mecanismo já auditado em `login-erro-validacao`/`recuperacao-senha`/`selecao-perfil-corretora`/`onboarding`. O mecanismo em si está correto e necessário (evita foco perdido no botão "Atualizar"/carregamento inicial). A ressalva não é sobre o mecanismo, é sobre a sobreposição com `CardDescription` — ver seção 4.

## 7. Badge de filtro removível com `aria-label` — PASSA

Ver seção 3 (mesmo trecho de código). `aria-label={\`Remover filtro ${categoria}\`}` presente em todas as badges renderizadas dinamicamente a partir de `categoriasSelecionadas`.

## 8. `Checkbox` + `Label` associados via `htmlFor`/`id` — PASSA

Ver seção 3.

## 9. Botão "Abrir sinistro" com rótulo de texto visível — PASSA, com observação de baixo risco

```tsx
<Button variant="outline" size="sm" asChild>
  <Link href="/templates/novo-sinistro">
    Abrir sinistro
    <ArrowRightIcon />
  </Link>
</Button>
```
(`page.tsx:421-427`)

- Texto visível "Abrir sinistro" presente em todas as linhas, `ArrowRightIcon` é complementar — atende ao item 9, e ao princípio geral já usado nas 5 telas de 5A ("botão nunca fica sem rótulo visível").
- `Button asChild` + `Link` renderiza um `<a href="/templates/novo-sinistro">` real (mesmo padrão já auditado em `onboarding`/`selecao-perfil-corretora`), preservando Ctrl+clique/abrir em nova aba/rotor de links.
- **Observação de baixo risco (não exigida pela spec, que já antecipa e aceita este trade-off no item 9):** como o texto "Abrir sinistro" se repete idêntico em todas as 6-12 linhas da tabela, um usuário de leitor de tela navegando pela lista de links da página (ex. NVDA Insert+F7 "Elements List" filtrado por links) veria vários links com o mesmo nome, sem diferenciação de qual apólice cada um abre — a distinção só existe pelo contexto da linha (número/titular ao lado), perceptível em navegação linear/por tabela, mas não na navegação por lista de links isolada. A própria spec já reconhece essa situação como aceitável para o volume atual e só exige `aria-label` com identificador da apólice "se a densidade da tabela algum dia forçar um ícone-only" — o que não é o caso aqui. Registrado como observação, não como falha.

## 10. `Select` "Cenário de carregamento (demonstração)" — PASSA

```tsx
<Label htmlFor="cenario-carregamento" className="text-sm">
  Cenário de carregamento (demonstração)
</Label>
<Select value={cenario} onValueChange={(valor) => setCenario(valor as Cenario)}>
  <SelectTrigger id="cenario-carregamento" size="sm" className="w-64">
    <SelectValue />
  </SelectTrigger>
  ...
</Select>
```
(`page.tsx:189-204`)

- `Label htmlFor` associado ao `id` do `SelectTrigger` — mesma exigência já auditada nos `Select`s de cenário de `onboarding`/`selecao-perfil-corretora`.
- Fica fora do container `w-full rounded-lg border` (fora da Sidebar/Card), entra na ordem de tab antes de qualquer elemento da moldura principal — posição correta e consistente com a convenção já ratificada (spec, "Lacunas" item 2).

## 11. Número da apólice não é link/botão sem destino — PASSA

```tsx
<TableCell>{apolice.numero}</TableCell>
```
(`page.tsx:406`)

- Renderizado como texto simples dentro da célula, sem `<a>`/`<button>`/`onClick` — não cria uma falsa expectativa de navegação para quem usa teclado ou leitor de tela. Atende o item 11.

## 12. Gap sistêmico `EmptyTitle`/`CardTitle` sem heading semântico — Observação (conforme instrução, não corrigida aqui)

```tsx
function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) { return <div ... /> }
function CardTitle({ className, ...props }: React.ComponentProps<"div">) { return <div ... /> }
```
(`src/components/ui/empty.tsx:61-69`, `src/components/ui/card.tsx:31-39`)

- `<CardTitle>Apólices ativas</CardTitle>` (`page.tsx:249`), `<EmptyTitle>Nenhuma apólice encontrada</EmptyTitle>` (estado 5, `page.tsx:313`) e `<EmptyTitle>Nenhuma apólice para os filtros selecionados</EmptyTitle>` (estado 4, `page.tsx:384-386`) renderizam `<div>`s, não headings reais — mesmo gap sistêmico já registrado em todas as telas de 5A e em `selecao-perfil-corretora`. O `<h1>` da página é a única âncora de heading real disponível na rota inteira; a spec já antecipa isso explicitamente no item 12. Registrado, não corrigido isoladamente aqui.

## 13. Ordem de tab — diverge do texto literal do item 13, mas segue corretamente a ordem visual real da tela

### O que o item 13 pede, literalmente

> "filtro (Popover) → Badges removíveis (se houver) → botão 'Atualizar' → linhas da tabela"

### O que a própria spec descreve como composição visual (seção "Área de conteúdo")

> `CardHeader` (...): `CardTitle` + `CardDescription` de um lado; `Badge` "Ambiente de demonstração" + `Button` "Atualizar" do outro. `CardContent`: filtro (Popover) + corpo condicional.

Ou seja, a própria spec descreve o `Button` "Atualizar" dentro do `CardHeader` (topo do card) e o Popover "Filtros" dentro do `CardContent` (abaixo do header) — mesma ordem usada no código construído:

```tsx
<CardHeader className="flex flex-row items-center justify-between space-y-0">
  ...
  <Button variant="outline" size="sm" disabled={carregando} onClick={...}>
    <RefreshCwIcon />
    Atualizar
  </Button>
</CardHeader>
<CardContent className="flex flex-col gap-4">
  ...
  <Popover>
    <PopoverTrigger asChild>
      <Button variant="outline" size="sm"><SlidersHorizontalIcon />Filtros</Button>
    </PopoverTrigger>
    ...
  </Popover>
  {categoriasSelecionadas.map((categoria) => (<Badge key={categoria} ...>...</Badge>))}
  ...
</CardContent>
```
(`page.tsx:246-380`)

### Por que isso é uma tensão da própria spec, não um erro isolado do construtor

O `CardHeader` (com "Atualizar") é renderizado **antes** do `CardContent` (com "Filtros"/Badges) tanto no DOM quanto visualmente (linha de cima do card, acima da linha de filtro). Sem nenhum `tabIndex` positivo artificial no arquivo inteiro (confirmado — os únicos `tabIndex` explícitos são `-1`, usados só como alvo de foco programático no `AlertTitle`), a ordem de tab segue exatamente a ordem visual/DOM: **"Atualizar" é alcançado pelo Tab antes de "Filtros"**, porque ele está posicionado visualmente acima na tela — o oposto do que o texto do item 13 pede.

Isso é análogo à tensão já documentada na auditoria de `onboarding` entre `autoFocus` e o foco no heading: a spec descreve, em duas seções diferentes, uma composição visual (`CardHeader` acima de `CardContent`) e um requisito de ordem de tab (`filtro → ... → Atualizar`) que **não podem ser simultaneamente verdadeiros** sem introduzir um `tabIndex` positivo artificial (que a própria instrução geral desta auditoria pede para evitar) ou reposicionar visualmente o botão "Atualizar" para dentro do `CardContent`, abaixo do filtro (o que contrariaria a composição visual "botão de atualizar no header, ao lado do badge de ambiente" já descrita na spec e coerente com o padrão do `dashboard-financeiro`).

**Veredito:** o construtor resolveu a tensão priorizando a ordem visual real da tela (sem truques de `tabIndex`) em vez do texto literal do item 13 — escolha defensável e consistente com a instrução geral de acessibilidade ("ordem de tab lógica, segue a ordem visual"), mas resulta numa ordem de tab **diferente** da descrita explicitamente no requisito 13 da spec. Não é um "erro" de implementação no sentido de ordem ilógica ou confusa (a ordem real — Select cenário → sidebar → Atualizar → Filtros → Badges → linhas da tabela — é coerente com o que aparece na tela, de cima para baixo, esquerda para direita), mas é uma divergência que vale a pena o Rafael confirmar: se a intenção era mesmo "filtro antes de Atualizar" na navegação por teclado, isso exigiria mover o botão "Atualizar" para dentro do `CardContent` (abaixo do filtro) ou usar `tabIndex` positivo (não recomendado).

---

## Verificações adicionais (fora dos 13 itens numerados da spec, mesmo padrão de rigor das auditorias irmãs)

### a. Nome acessível único de página (`<h1>`) — PASSA

```tsx
<h1 className="font-heading text-2xl font-semibold tracking-tight">
  Template — Apólices ativas
</h1>
```
(`page.tsx:176-178`)

- Único `<h1>` da rota, sem heading intermediário (nenhum `<h2>`/`<h3>` no arquivo) — diferente de `onboarding`, aqui não há sequer um salto de nível porque não existem outros headings reais na página (todos os candidatos — `CardTitle`, `EmptyTitle`, `SidebarHeader`, `SidebarGroupLabel` — são `<div>`s, ver item 12).

### b. Contraste/cores — só tokens do design system — PASSA

- Busca por cores arbitrárias (`#`, `rgb(`, `text-[`, `bg-[`) no arquivo: nenhuma ocorrência. Todas as classes de cor usadas (`text-muted-foreground`, `text-destructive` via `Alert variant="destructive"`, `bg-secondary-foreground/10` no hover do botão de remover badge) são tokens do design system já validados nas telas irmãs.

### c. Sidebar mockada com texto duplicado — Observação nova (baixo risco)

```tsx
<SidebarHeader className="p-3 text-sm font-medium">
  Portal do corretor
</SidebarHeader>
<SidebarContent>
  <SidebarGroup>
    <SidebarGroupLabel>Portal do corretor</SidebarGroupLabel>
    ...
```
(`page.tsx:211-216`)

- O texto "Portal do corretor" aparece duas vezes seguidas (uma no `SidebarHeader`, outra no `SidebarGroupLabel` logo abaixo) — ambos `<div>`s puros, sem `role="group"`/`aria-labelledby` conectando um ao outro (`sidebar.tsx:341-350`, `402-420`), então não há duplicação de anúncio via mecanismo ARIA, só redundância de conteúdo visível/lido em sequência normal de leitura. Baixo risco (não confunde navegação nem duplica um anúncio dinâmico), mas é uma repetição de texto que poderia ser evitada (ex.: `SidebarGroupLabel` com um rótulo mais específico como "Navegação" ou omitido, já que o `SidebarHeader` já apresenta o contexto).

### d. Botão "Atualizar" perde foco ao ficar `disabled` durante o próprio clique — Observação (mesmo padrão já registrado em `selecao-perfil-corretora`/`recuperacao-senha`)

```tsx
<Button variant="outline" size="sm" disabled={carregando} onClick={() => carregar(cenario)}>
```
(`page.tsx:256-264`)

- Ao clicar, `carregar()` chama `setCarregando(true)` de forma síncrona, fazendo `disabled` passar a `true` no próximo render enquanto o botão ainda está focado (foi ele quem recebeu o clique). Um elemento que perde `disabled=false → true` estando focado tem o foco nativamente movido para `<body>` pelo navegador. A região `CardDescription` ainda anuncia "Carregando apólices..." independentemente de onde o foco esteja, então a informação chega — só a posição do foco do teclado é que pode ficar em `<body>` durante os ~900ms de carregamento. Mesmo comportamento sistêmico já registrado como observação de baixo risco em `selecao-perfil-corretora` (botão "Continuar") e `recuperacao-senha` (botão "Reenviar e-mail") — não é uma regressão desta tela.

### e. Ícones decorativos sem `aria-hidden` explícito — Observação (não bloqueante, herdada)

```tsx
<ShieldCheckIcon />       {/* item ativo da sidebar */}
<LayoutDashboardIcon />   {/* item "Painel" */}
<ClipboardListIcon />     {/* item "Sinistros" */}
<RefreshCwIcon />         {/* botão "Atualizar"/"Tentar novamente" */}
<SlidersHorizontalIcon /> {/* trigger "Filtros" */}
<XIcon className="size-3" /> {/* dentro do botão de remover badge, que já tem aria-label */}
<ServerCrashIcon />       {/* dentro do Alert de erro */}
<InboxIcon />             {/* dentro do EmptyMedia, estado vazio real */}
<ArrowRightIcon />        {/* botão "Abrir sinistro" */}
```

- Nenhum tem `aria-hidden="true"` explícito. Mesma lacuna de convenção já registrada em todas as telas irmãs (`onboarding`, `selecao-perfil-corretora`, `login-simples`, `recuperacao-senha`) — `lucide-react` renderiza `<svg>` sem `role`/`title` por padrão, então a maioria dos leitores de tela já ignora, mas o comportamento não é 100% garantido entre combinações de navegador/AT. Não introduzida por esta tela.

---

## Conclusão

`apolices-ativas` implementa corretamente a maior parte dos 13 requisitos específicos da spec, incluindo os quatro pontos de atenção especial pedidos: `aria-current="page"` explícito no item ativo da sidebar (confirmado funcional via `Comp="button"` + spread de props), `scope="col"` em todas as colunas da tabela, e a composição completa de Popover+Checkbox+Badges com rótulos e `aria-label`s corretos.

O quarto ponto de atenção (região `aria-live` reaproveitada pela `CardDescription`) é onde a auditoria encontrou o problema mais relevante: o reaproveitamento funciona bem exatamente para o caso que a spec descreve textualmente (contagem de resultados do filtro, e a transição carregando→sucesso), mas cria duplicação de anúncio em dois estados que a spec não cobriu explicitamente nesse ponto — o início do carregamento (clique em "Atualizar", onde um `<p aria-live>` novo é montado dentro do bloco de skeleton com texto quase idêntico ao que `CardDescription` já está anunciando) e, de forma mais severa, o estado de erro (onde `CardDescription`, o `role="alert"` nativo do `Alert` e o foco programático no `AlertTitle` comunicam a mesma frase — "Não foi possível carregar as apólices" — por três mecanismos diferentes quase ao mesmo tempo). Nenhum desses dois casos quebra a operação por teclado ou deixa informação sem ser comunicada — é redundância/verbosidade, não perda de conteúdo — mas é o tipo de duplicação que a própria spec pede para evitar (linha 88), só que sem prever esses dois estados específicos.

Também foi identificada uma tensão entre o texto literal do item 13 (ordem de tab "filtro → badges → Atualizar → tabela") e a composição visual que a própria spec descreve (botão "Atualizar" no `CardHeader`, acima do filtro no `CardContent`) — o código construído resolveu isso priorizando a ordem visual real (sem `tabIndex` artificial), o que é defensável, mas produz uma ordem de tab diferente da literalmente pedida no requisito.

As demais observações (texto "Portal do corretor" duplicado na sidebar, perda de foco do botão "Atualizar" ao desabilitar durante o próprio clique, ícones decorativos sem `aria-hidden`, texto repetido "Abrir sinistro" entre linhas da tabela, gap sistêmico de `CardTitle`/`EmptyTitle` sem heading semântico) são de baixo risco, a maioria herdada de padrões já registrados e aceitos nas telas irmãs — nenhuma delas bloqueia o uso da tela por teclado ou leitor de tela.
