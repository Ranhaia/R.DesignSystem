# Auditoria de acessibilidade — `selecao-perfil-corretora`

- **Escopo auditado:** `src/app/templates/selecao-perfil-corretora/page.tsx` (código estático, sem execução da app).
- **Confrontado com:** seção "Requisitos de acessibilidade específicos desta tela" de `.build/telas/selecao-perfil-corretora.md` (itens 1–10) + dependências (`field.tsx`, `radio-group.tsx`, `label.tsx`, `avatar.tsx`, `badge.tsx`, `alert.tsx`, `empty.tsx`, `skeleton.tsx`, `button.tsx`, `card.tsx`).
- **Não editado:** nenhum arquivo em `src/` foi alterado por esta auditoria.

## Resumo

| # | Item | Resultado |
|---|---|---|
| 1 | Agrupamento semântico real (`FieldSet`/`<fieldset>` + `FieldLegend`/`<legend>`) | **Passa** |
| 2 | Alvo de clique do card inteiro (`FieldLabel` envolve o `Field` inteiro) | **Passa** |
| 3 | Nome da corretora também no texto corrido de `FieldDescription`, não só no `Badge` | **Passa** |
| 4 | Estado selecionado via `aria-checked`/`data-state`, sem `className` sobrescrevendo o destaque | **Passa** |
| 5 | Erro de validação — `FieldError` com `role="alert"` + foco no 1º `RadioGroupItem` (não na mensagem) | **Passa, com uma ressalva de baixo risco (ver item 5)** |
| 6 | Carregamento — `aria-live="polite"` `sr-only` acompanhando o `Skeleton` | **Passa** |
| 7 | Erro ao carregar a lista — foco programático no `AlertTitle` | **Passa** |
| 8 | `EmptyTitle` não é heading semântico | **Observação registrada, não corrigida aqui (gap sistêmico, conforme instrução)** |
| 9 | Botão "Continuar" nunca `disabled` sem explicação (sempre clicável, valida no clique) | **Passa** |
| 10 | Link "Usar outra conta" como `<a href>` real | **Passa** |
| — | Ordem de tab (seletor de cenário → radios → erro → Continuar → Usar outra conta) | **Passa** |
| — | Nome acessível único de página (`<h1>`) | **Passa** |
| — | Contraste/cores — só tokens do design system | **Passa** |
| — | `CardTitle` não é heading semântico | **Observação (gap sistêmico, herdado das telas irmãs)** |
| — | Ícones decorativos sem `aria-hidden` explícito | **Observação (não bloqueante, herdada das telas irmãs)** |
| — | `AvatarFallback` (iniciais "CA"/"CB") entra no nome acessível do rádio via `FieldLabel` | **Observação nova (baixo risco)** |
| — | Botão "Continuar" perde foco ao ser desabilitado durante o próprio clique (`confirmando`) | **Observação (mesmo padrão já registrado em `recuperacao-senha`)** |

Nenhuma falha real (bloqueante) encontrada. Os 10 requisitos específicos da spec foram implementados corretamente. Há uma ressalva de baixo risco no item 5 (posição do `aria-describedby`) e observações adicionais de baixo risco, a maioria herdada de padrões já registrados nas telas irmãs.

---

## 1. Agrupamento semântico (`FieldSet`/`FieldLegend`) — PASSA

```tsx
<FieldSet>
  <FieldLegend variant="label">Perfil e corretora</FieldLegend>
  <RadioGroup value={selecionado} onValueChange={...}>
    ...
```
(`src/app/templates/selecao-perfil-corretora/page.tsx:293-296`)

- `FieldSet` renderiza um `<fieldset>` real (`field.tsx:10-22`) e `FieldLegend` um `<legend>` real (`field.tsx:24-42`) — confirmado no código-fonte, não são `<div>`s estilizadas fingindo semântica. Um leitor de tela que entra no grupo anuncia "grupo Perfil e corretora" ao focar o primeiro rádio, exatamente como a spec exige.
- O `RadioGroup` (Radix) fica dentro do `<fieldset>`, então tanto a semântica de `fieldset`/`legend` quanto o `role="radiogroup"` nativo do Radix coexistem sem conflito — dupla camada de contexto, não redundância problemática.

## 2. Alvo de clique do card inteiro — PASSA

```tsx
<FieldLabel htmlFor={opcao.id} key={opcao.id}>
  <Field orientation="horizontal">
    <Avatar>...</Avatar>
    <FieldContent>...</FieldContent>
    <RadioGroupItem value={opcao.valor} id={opcao.id} ... />
  </Field>
</FieldLabel>
```
(`page.tsx:308-335`)

- `FieldLabel` usa `Label` (`field.tsx:110-126` → `label.tsx:8-22`), que renderiza `<LabelPrimitive.Root>` do Radix — um `<label>` HTML real, não uma `div` com `onClick`.
- `htmlFor={opcao.id}` aponta exatamente para o `id` do `RadioGroupItem` correspondente, e esse é o único elemento focável/interativo dentro do `<label>` (Avatar e Badge não são interativos). Clicar em qualquer ponto do card — avatar, título, badge, descrição — ativa o rádio associado, cobrindo o requisito de alvo de clique ampliado (útil para baixa precisão motora, não só mouse).
- Confirma também o próprio texto da spec: essa composição já é o padrão validado em `src/components/examples/field-choice-card.tsx`, não uma solução nova arriscada.

## 3. Nome da corretora fora do `Badge` também — PASSA

```tsx
descricao:
  "Acesso completo às apólices e sinistros da Corretora Alfa Seguros",
...
descricao:
  "Gestão de equipe e relatórios da Corretora Beta Corretagem",
...
descricao:
  "Consulta de apólices e sinistros da Corretora Alfa Seguros",
```
(`page.tsx:90-91, 99-100, 108-109`)

- As 3 opções repetem o nome completo da corretora no texto corrido de `FieldDescription`, além do `Badge` (`page.tsx:318-320`). O `Badge` não é a única fonte da informação que diferencia as opções — atende WCAG 1.4.1 ("não usar só cor/estilo visual") como a spec exigia.

## 4. Estado selecionado — PASSA

```tsx
<FieldLabel htmlFor={opcao.id} key={opcao.id}>
```

- Nenhum `className` é passado ao `FieldLabel` neste template — a classe `has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 ...` embutida em `field.tsx:120` não é sobrescrita. O destaque visual do card selecionado permanece redundante (não substituto) do estado real `aria-checked`/`data-state="checked"` nativo do `RadioGroupItem` do Radix (`radio-group.tsx:22-43`). Confirmado sem trabalho extra necessário, como a própria spec já previa.

## 5. Erro de validação — PASSA, com uma ressalva de baixo risco

```tsx
<RadioGroup
  value={selecionado}
  onValueChange={(valor) => {
    setSelecionado(valor)
    if (erroSelecao) setErroSelecao(false)
  }}
  aria-describedby={erroSelecao ? "selecao-erro" : undefined}
>
  {OPCOES.map((opcao, indice) => (
    <FieldLabel htmlFor={opcao.id} key={opcao.id}>
      <Field orientation="horizontal">
        ...
        <RadioGroupItem
          value={opcao.valor}
          id={opcao.id}
          disabled={confirmando}
          ref={indice === 0 ? primeiroRadioRef : undefined}
        />
      </Field>
    </FieldLabel>
  ))}
</RadioGroup>
{erroSelecao && (
  <FieldError id="selecao-erro">
    Selecione um perfil para continuar.
  </FieldError>
)}
```
```tsx
React.useEffect(() => {
  if (erroSelecao) {
    primeiroRadioRef.current?.focus()
  }
}, [erroSelecao])
```
(`page.tsx:127-128, 150-154, 297-343`)

- `FieldError` já carrega `role="alert"` embutido (`field.tsx:225-234`) — a mensagem "Selecione um perfil para continuar." é anunciada automaticamente ao entrar no DOM, sem necessidade de `aria-live` adicional, exatamente como o requisito 5 pede.
- O foco programático vai para o **primeiro `RadioGroupItem`** (`primeiroRadioRef`, tipado `React.useRef<HTMLButtonElement>`), não para a mensagem de erro — atende à decisão de design explícita da spec ("o controle que precisa ser corrigido é a própria seleção"). `RadioGroupPrimitive.Item` do Radix renderiza um `<button role="radio">`, compatível com o tipo do ref.
- **Ressalva (baixo risco, não bloqueante):** o `aria-describedby="selecao-erro"` foi adicionado no elemento raiz do `RadioGroup` (que carrega `role="radiogroup"`), não em cada `RadioGroupItem` individual. Como o foco programático pousa num `role="radio"` filho (o próprio `RadioGroupItem`), e `aria-describedby` não é herdado de ancestrais pela árvore de acessibilidade, a maioria dos leitores de tela não vai anunciar essa descrição ao focar o rádio — só anunciariam se o próprio item focado tivesse o `aria-describedby`, ou se o usuário navegasse explicitamente até o container do grupo em modo de navegação por virtual cursor. Na prática isso não compromete o requisito central (a mensagem já é anunciada de forma confiável pelo `role="alert"` do `FieldError`, independente de onde o foco esteja), então é uma adição bem-intencionada porém com efeito prático limitado — não uma falha do requisito 5 em si.

## 6. Carregamento (`Skeleton` + `aria-live`) — PASSA

```tsx
<div className="flex flex-col gap-3">
  <Skeleton className="h-[76px] w-full rounded-md" />
  <Skeleton className="h-[76px] w-full rounded-md" />
  <Skeleton className="h-[76px] w-full rounded-md" />
</div>
<p aria-live="polite" className="sr-only">
  Carregando perfis disponíveis...
</p>
```
(`page.tsx:237-244`)

- `Skeleton` (`skeleton.tsx`) é confirmadamente um `<div>` puro, sem `aria-busy`/`role="status"` (nenhum `aria-*` embutido) — exatamente o gap que a spec antecipava. A região `<p aria-live="polite" className="sr-only">` cobre isso, anunciando "Carregando perfis disponíveis..." de forma confiável.
- Não há duplicidade de anúncio: como o `Skeleton` não carrega nenhuma semântica própria (diferente do `Spinner`, que tem `role="status"`), não há risco de "carregando" ser anunciado duas vezes.

## 7. Erro ao carregar a lista — foco no `AlertTitle` — PASSA

```tsx
<Alert variant="destructive">
  <CircleAlertIcon />
  <AlertTitle ref={erroRef} tabIndex={-1}>
    Não foi possível carregar seus perfis
  </AlertTitle>
  <AlertDescription>
    Verifique sua conexão e tente novamente.
  </AlertDescription>
</Alert>
```
```tsx
React.useEffect(() => {
  if (statusBusca === "erro") {
    erroRef.current?.focus()
  }
}, [statusBusca])
```
(`page.tsx:127, 159-163, 250-258`)

- Mesmo mecanismo já auditado em `login-erro-validacao`/`recuperacao-senha`: `ref` + `tabIndex={-1}` + `.focus()` no `AlertTitle`. `AlertTitle` é `React.ComponentProps<"div">` (`alert.tsx:37-48`), compatível com `erroRef` tipado `React.useRef<HTMLDivElement>`.
- `Alert` também carrega `role="alert"` nativo (`alert.tsx:22-35`) — reforça o anúncio, sem duplicidade problemática (mesmo padrão validado nas telas irmãs).
- O botão "Tentar novamente" (`RotateCcwIcon` + texto visível) chama `buscarVinculos(cenario)`, que volta ao estado de carregamento — nome acessível real, não ícone sozinho.

## 8. `EmptyTitle` não é heading semântico — Observação (conforme instrução, não corrigida aqui)

```tsx
function EmptyTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-title"
      className={cn("text-lg font-medium tracking-tight", className)}
      {...props}
    />
  )
}
```
(`src/components/ui/empty.tsx:61-69`)

- Confirmado no código-fonte: `EmptyTitle` renderiza uma `<div>`, não um heading (`<h1>`–`<h6>`). O estado 6 ("Nenhum acesso liberado") fica sem heading real de seção — quem navega por headings (tecla `H`) não encontra esse título.
- Exatamente o mesmo gap sistêmico já registrado em `CardTitle` (`login-simples`/`recuperacao-senha`) — qualquer template que usa `Empty` herda esse gap. Registrado aqui como a spec já antecipava (item 8), não corrigido isoladamente.

## 9. Botão "Continuar" nunca `disabled` sem explicação — PASSA

```tsx
<Button type="submit" fullWidth disabled={confirmando}>
```
(`page.tsx:347`)

- `disabled` só é `true` durante `confirmando` (envio em andamento, com `Spinner` + "Continuando..." explicando o motivo). Quando nada está selecionado, o botão permanece clicável e a validação acontece no `handleContinuar` (`onSubmit` do `<form>`), disparando o erro inline em vez de silenciosamente recusar o clique — atende exatamente à decisão de acessibilidade documentada na spec (evitar "botão que não funciona" sem explicação para quem usa leitor de tela).

## 10. Link "Usar outra conta" — PASSA

```tsx
<Button
  variant="link"
  size="sm"
  className="h-auto self-start px-0"
  asChild
>
  <Link href="/templates/login-simples">
    <ArrowLeftIcon />
    Usar outra conta
  </Link>
</Button>
```
(`page.tsx:365-375`)

- `Button asChild` repassa via `Slot.Root` (`button.tsx`) para o `<Link>` do `next/link` — o elemento final no DOM é um `<a href="/templates/login-simples">` real, não um `<button onClick={router.push(...)}>`. Preserva Ctrl+clique, abrir em nova aba, rotor de links de leitor de tela — mesma exigência já auditada em "Esqueci minha senha"/"Voltar para login" nas telas irmãs.
- Nome acessível "Usar outra conta" vem de texto visível, `ArrowLeftIcon` é complemento, não substitui o texto.

---

## Verificações adicionais (fora dos 10 itens numerados da spec, mesmo padrão de rigor das auditorias irmãs)

### a. Ordem de tab — PASSA

Sem nenhum `tabIndex` positivo no arquivo (o único `tabIndex` explícito é `-1` no `AlertTitle`, usado só como alvo de foco programático). Ordem no DOM por estado:

- **Barra de demonstração (sempre presente, fora do `Card`):** `Select` "Cenário da busca" (`id="cenario-busca"`, `page.tsx:206`).
- **Estado carregando:** nenhum elemento focável dentro do `Card` (`Skeleton` é `<div>` decorativo).
- **Estado erro:** `Button` "Tentar novamente" (`AlertTitle` fica fora da sequência de tab por causa do `tabIndex={-1}`, comportamento correto).
- **Estado vazio:** nenhum elemento focável dentro do `Card` (`Empty` sem `EmptyContent`/CTA, como a spec definia).
- **Estado sucesso (2-4, 7):** `RadioGroupItem` 1 → 2 → 3 (roving tabindex nativo do Radix — Tab entra/sai do grupo uma vez, setas movem entre os itens) → `Button type="submit"` "Continuar" → `Link` "Usar outra conta".

Todas as sequências seguem a ordem visual/lógica de cima para baixo, sem saltos artificiais.

### b. Nome acessível único de página (`<h1>`) — PASSA

```tsx
<h1 className="font-heading text-2xl font-semibold tracking-tight">
  Template — Seleção de perfil/corretora
</h1>
```
(`page.tsx:186-188`)

- Único `<h1>` da rota, sem conflito de nível de heading (`CardTitle` "Escolha como continuar" e `EmptyTitle` "Nenhum acesso liberado" não são headings, conforme itens 8 e a observação abaixo).

### c. Contraste/cores — só tokens do design system — PASSA

- Busquei por cores arbitrárias (`#`, `rgb(`, `text-[`, `bg-[`) no arquivo: nenhuma ocorrência. Todas as classes de cor (`text-primary`, `bg-primary/10`, `text-muted-foreground` via `CardDescription`/`FieldDescription`, `text-destructive` via `FieldError`/`Alert variant="destructive"`) são tokens do design system já validados nas telas irmãs.

### d. `CardTitle` não é heading semântico — Observação (herdada, não corrigida aqui)

```tsx
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-title" className={cn("font-heading leading-none font-semibold", className)} {...props} />
  )
}
```
(`src/components/ui/card.tsx:31-39`)

- `<CardTitle>Escolha como continuar</CardTitle>` (`page.tsx:228`) renderiza uma `<div>`, não heading real — mesmo gap sistêmico já registrado em `login-simples`/`login-erro-validacao`/`recuperacao-senha`. Não introduzido por esta tela; registrado, não corrigido isoladamente aqui.

### e. Ícones decorativos sem `aria-hidden` explícito — Observação (não bloqueante, herdada)

```tsx
<UserCogIcon className="size-5" />      {/* círculo do CardHeader */}
<CircleAlertIcon />                     {/* dentro do Alert de erro */}
<UserXIcon />                           {/* dentro do EmptyMedia */}
<RotateCcwIcon />                       {/* botão "Tentar novamente" */}
<ArrowRightIcon /> / <ArrowLeftIcon />  {/* botões de ação */}
```

- Nenhum tem `aria-hidden="true"` explícito. São todos decorativos (não carregam informação além do texto adjacente). `lucide-react` renderiza `<svg>` sem `role`/`title` por padrão, então a maioria dos leitores de tela já ignora — mas o comportamento não é 100% garantido entre combinações de navegador/AT. Mesma lacuna de convenção já registrada em `login-simples`/`recuperacao-senha`, não introduzida por esta tela.
- Exceção correta: `Spinner` no botão "Continuar" recebe `aria-hidden="true"` explícito (`page.tsx:350`), replicando o padrão já validado nas telas irmãs para evitar anúncio duplicado com a região `aria-live` "Continuando...".

### f. `AvatarFallback` entra no nome acessível do rádio via `FieldLabel` — Observação nova (baixo risco)

```tsx
<FieldLabel htmlFor={opcao.id} key={opcao.id}>
  <Field orientation="horizontal">
    <Avatar>
      <AvatarFallback>{opcao.iniciais}</AvatarFallback>
    </Avatar>
    <FieldContent>...</FieldContent>
    <RadioGroupItem value={opcao.valor} id={opcao.id} ... />
  </Field>
</FieldLabel>
```
(`page.tsx:308-335`)

- Como o `<label>` (`FieldLabel`) envolve todo o card, todo o texto descendente entra no cálculo do nome acessível do `RadioGroupItem` associado — incluindo as iniciais "CA"/"CB" do `AvatarFallback` (`avatar.tsx:41-55`, um `<span>`/`<Fallback>` de texto puro, sem `aria-hidden`). Resultado: o nome acessível de cada rádio fica algo como "CA Corretor Corretora Alfa Seguros Acesso completo às apólices e sinistros da Corretora Alfa Seguros" — as iniciais são lidas antes do conteúdo relevante.
- Impacto é baixo (não impede o entendimento, as iniciais são só um prefixo redundante de duas letras) e é uma consequência direta e esperada do próprio padrão "label envolve o card inteiro" que a spec pediu no item 2 (é o mesmo padrão de `field-choice-card.tsx`, não uma escolha isolada desta tela) — mas vale registrar como algo a considerar se o catálogo quiser refinar esse padrão de composição no futuro (ex.: `aria-hidden="true"` no `Avatar` quando usado dentro de um choice card, já que a identidade "quem" já está no texto do título).

### g. Botão "Continuar" perde o foco ao ser desabilitado durante o próprio clique — Observação (mesmo padrão já registrado em `recuperacao-senha`)

```tsx
<Button type="submit" fullWidth disabled={confirmando}>
```
(`page.tsx:347`)

- Ao submeter o formulário com uma opção válida, `handleContinuar` chama `setConfirmando(true)` de forma síncrona, fazendo `disabled` passar a `true` no próximo render enquanto o botão ainda está focado (foi ele quem recebeu o clique/Enter que disparou o submit). Um elemento que perde `disabled=false → true` estando focado tem o foco nativamente movido para `<body>` pelo navegador. A região `<p aria-live="polite" className="sr-only">` ainda anuncia "Continuando..." independentemente de onde o foco esteja, então a informação chega — só a posição do foco do teclado é que pode ficar em `<body>` durante os 1200ms de navegação.
- Mesmo comportamento sistêmico já registrado como observação de baixo risco em `recuperacao-senha` (botão "Reenviar e-mail") e presente também no botão "Entrar" de `login-simples` — não é uma regressão desta tela, é um padrão recorrente de todo botão de submit com `disabled` ligado a um estado de carregamento síncrono no clique.

---

## Conclusão

`selecao-perfil-corretora` implementa corretamente os 10 requisitos de acessibilidade específicos da spec: agrupamento semântico real via `FieldSet`/`FieldLegend`, alvo de clique ampliado do card inteiro via `FieldLabel`, nome da corretora fora do `Badge` também no texto corrido, estado selecionado que não depende só de destaque visual, erro de validação com `role="alert"` e foco correto no primeiro rádio do grupo, região `aria-live` cobrindo o `Skeleton` sem semântica própria, foco programático no `AlertTitle` ao falhar o carregamento, botão "Continuar" nunca desabilitado sem explicação e link "Usar outra conta" como `<a href>` real. O item 8 (`EmptyTitle` sem heading semântico) é o mesmo gap sistêmico do catálogo já registrado em `CardTitle` nas telas irmãs, apenas anotado, não corrigido isoladamente aqui, conforme instrução.

A única ressalva dentro dos itens numerados é de baixo risco (item 5: `aria-describedby` do erro de validação está no `RadioGroup` raiz, não no `RadioGroupItem` que recebe o foco programático — o `role="alert"` do `FieldError` já garante o anúncio de qualquer forma). As observações adicionais (ícones decorativos sem `aria-hidden`, `AvatarFallback` entrando no nome acessível do rádio, perda de foco do botão "Continuar" ao ser desabilitado durante o próprio clique) são de baixo risco, majoritariamente herdadas de padrões já aceitos nas telas irmãs — nenhuma delas bloqueia o uso da tela por teclado ou leitor de tela.
