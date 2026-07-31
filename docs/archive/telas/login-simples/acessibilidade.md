# Auditoria de acessibilidade — `login-simples`

- **Escopo auditado:** `src/app/templates/login-simples/page.tsx` (código estático, sem execução da app).
- **Confrontado com:** seção "Requisitos de acessibilidade específicos desta tela" de `.build/telas/login-simples.md` (itens 1–8) + dependências (`card.tsx`, `field.tsx`, `input-group.tsx`, `button.tsx`, `spinner.tsx`, `label.tsx`, `checkbox.tsx`).
- **Não editado:** nenhum arquivo em `src/` foi alterado por esta auditoria.

## Resumo

| # | Item | Resultado |
|---|---|---|
| 1 | Botão mostrar/ocultar senha (foco, aria-label, aria-pressed) | **Passa** |
| 2 | `aria-live` de carregamento sem duplicidade com Spinner | **Passa** |
| 3 | `autoComplete` correto nos campos de credenciais | **Passa** |
| 4 | Checkbox "Manter-me conectado" com label associado | **Passa** |
| 5 | "Esqueci minha senha" como `<a href>` real | **Passa** |
| 6 | Ordem de tab (e-mail → senha → olho → checkbox → link → Entrar) | **Passa** |
| 7 | `CardTitle` não é heading semântico | **Observação registrada, não corrigida aqui (gap sistêmico, conforme instrução)** |
| 8 | Nome acessível da página (`<h1>` único) | **Passa** |
| — | `autoFocus` no campo de e-mail pula o `<h1>`/parágrafo da página de documentação | **Observação (não bloqueante)** |
| — | Ícone decorativo `ShieldCheckIcon` no `CardHeader` sem `aria-hidden` explícito | **Observação (não bloqueante)** |
| — | `role="group"` do `Field`/`InputGroup` ao redor de cada campo | **Observação (padrão herdado do catálogo, não bloqueante)** |

Nenhuma falha real (bloqueante) encontrada nesta tela. Os requisitos específicos do item de acessibilidade do plano foram implementados corretamente. Há três observações de baixo risco, todas de escopo sistêmico do catálogo (não introduzidas por esta tela).

---

## 1. Botão mostrar/ocultar senha — PASSA

```tsx
<InputGroupButton
  type="button"
  size="icon-xs"
  aria-label={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
  aria-pressed={senhaVisivel}
  disabled={carregando}
  onClick={() => setSenhaVisivel((visivel) => !visivel)}
>
  {senhaVisivel ? <EyeOffIcon /> : <EyeIcon />}
</InputGroupButton>
```
(`src/app/templates/login-simples/page.tsx:114-123`)

- `InputGroupButton` renderiza um `<button>` real via `Button` (`input-group.tsx:100-126` → `button.tsx:117-130`), então é alcançável por Tab e ativável por Enter/Espaço nativamente — não é uma `div`/`span` com `onClick`.
- `aria-label` alterna corretamente entre "Mostrar senha"/"Ocultar senha" conforme o estado.
- `aria-pressed={senhaVisivel}` está presente e reflete o estado — torna este um "toggle button" ARIA válido, anunciado como pressionado/não pressionado por leitores de tela.
- **Foco não é perdido ao clicar no botão de olho.** Verifiquei `InputGroupAddon` (`input-group.tsx:60-80`):
  ```tsx
  onClick={(e) => {
    if ((e.target as HTMLElement).closest("button")) {
      return
    }
    e.currentTarget.parentElement?.querySelector("input")?.focus()
  }}
  ```
  Esse handler só força foco no `<input>` quando o clique **não** aconteceu num `<button>` descendente. Como o alvo do clique no botão de olho é o próprio `<button>` (ou um filho dele, capturado por `closest("button")`), o handler retorna cedo e não interfere — o foco de teclado nativo do próprio `<button>` (Tab) ou o foco resultante do clique do mouse no botão permanece no botão de olho, não é redirecionado para o input nem some. O valor do campo de senha não é tocado por esse fluxo (só o `type` do input muda via `senhaVisivel`).

## 2. Estado de carregamento — `aria-live` sem duplicidade — PASSA

```tsx
<Button type="submit" fullWidth disabled={carregando}>
  {carregando ? (
    <>
      <Spinner aria-hidden="true" />
      Entrando...
    </>
  ) : (
    <>
      <LogInIcon />
      Entrar
    </>
  )}
</Button>

<p aria-live="polite" className="sr-only">
  {carregando ? "Entrando..." : ""}
</p>
```
(`src/app/templates/login-simples/page.tsx:148-164`)

- O `Spinner` (`spinner.tsx:5-14`) por padrão carrega `role="status" aria-label="Loading"` no próprio SVG:
  ```tsx
  function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
    return (
      <Loader2Icon
        role="status"
        aria-label="Loading"
        className={cn("size-4 animate-spin", className)}
        {...props}
      />
    )
  }
  ```
- Nesta tela, o `Spinner` recebe explicitamente `aria-hidden="true"` (linha 151). `aria-hidden="true"` remove o elemento inteiro (e o `role`/`aria-label` que ele carrega) da árvore de acessibilidade — ou seja, o Spinner deixa de ser anunciado pelo leitor de tela quando usado aqui, apesar de manter `role="status" aria-label="Loading"` no DOM. Isso neutraliza corretamente o risco de anúncio duplicado apontado na spec (item 2).
- A única fonte de anúncio da transição para "carregando" passa a ser a região `<p aria-live="polite" className="sr-only">`, que existe desde o primeiro render (com texto vazio) e muda de conteúdo para "Entrando..." quando `carregando` vira `true` — padrão correto para região `aria-live`: o elemento já existir no DOM antes da mudança evita casos em que alguns leitores de tela não anunciam regiões injetadas dinamicamente depois da montagem.
- O texto visível "Entrando..." dentro do próprio `Button` também é lido normalmente como parte do nome acessível do botão (não é `aria-hidden`), então não há conflito — é redundante com a região `sr-only`, mas ambos dizem a mesma coisa e o padrão replica o já usado em `src/components/patterns/loading.tsx`, como a spec pedia.

## 3. `autoComplete` correto — PASSA

```tsx
<Input id="email" type="email" ... autoComplete="username" ... />
...
<InputGroupInput id="senha" ... autoComplete="current-password" ... />
```
(linhas 91-99 e 105-112)

- `autoComplete="username"` no e-mail e `autoComplete="current-password"` na senha, exatamente como especificado — atende gerenciadores de senha e preenchimento assistido.

## 4. Checkbox "Manter-me conectado" — PASSA

```tsx
<Checkbox id="manter-conectado" checked={manterConectado} ... />
<Label htmlFor="manter-conectado">Manter-me conectado</Label>
```
(linhas 130-138)

- `Label` (`label.tsx`) usa `LabelPrimitive.Root` do Radix, que renderiza um `<label>` HTML real com `htmlFor` propagado — associação nativa `for`/`id`, não é texto solto ao lado do controle.
- `Checkbox` (`checkbox.tsx`) usa `CheckboxPrimitive.Root` do Radix, que expõe `role="checkbox"` com estado `aria-checked` sincronizado ao `data-state`/`checked` — nome acessível resultante é "Manter-me conectado" corretamente.

## 5. Link "Esqueci minha senha" — PASSA

```tsx
<Button variant="link" size="sm" className="h-auto px-0" asChild>
  <Link href="/templates/recuperacao-senha">
    Esqueci minha senha
  </Link>
</Button>
```
(linhas 141-145)

- `Button asChild` usa `Slot.Root` (Radix) para repassar as props/estilo do Button ao filho em vez de renderizar seu próprio `<button>` (`button.tsx:109`, `const Comp = asChild ? Slot.Root : "button"`). O elemento final no DOM é o `<a href="/templates/recuperacao-senha">` do `next/link`, não um `<button onClick={router.push(...)}>`. Isso preserva os atalhos nativos de navegador/leitor de tela (abrir em nova aba, listar links da página, Ctrl+clique, rotor de links do NVDA/VoiceOver etc.), como pedia o requisito 5.

## 6. Ordem de foco (tab order) — PASSA

Ordem no DOM (`page.tsx:88-160`), sem nenhum `tabIndex` manual/positivo:

1. `Input#email` (linha 91)
2. `InputGroupInput#senha` (linha 105)
3. `InputGroupButton` de olho — vem depois do input no JSX, dentro do mesmo `InputGroup`, então é o próximo elemento focável na ordem do DOM (linha 114)
4. `Checkbox#manter-conectado` (linha 130)
5. Link "Esqueci minha senha" (linha 142)
6. `Button type="submit"` "Entrar" (linha 148)

- Corresponde exatamente à ordem pedida no requisito 6 (e-mail → senha → botão de olho → "Manter-me conectado" → "Esqueci minha senha" → "Entrar"). Nenhum `tabIndex` explícito no arquivo — a ordem de tab segue puramente a ordem do DOM, que já é a ordem visual.
- Verifiquei também que o botão de olho embutido no `InputGroup` não introduz um "salto" de foco: ele é um `<button>` filho comum dentro do `InputGroupAddon`, sem `tabIndex` alterado em nenhuma camada (`input-group.tsx`, `button.tsx`), então entra na sequência natural entre o input de senha e o próximo elemento focável (checkbox).

## 7. `CardTitle` não é heading semântico — Observação (conforme instrução, não corrigido aqui)

```tsx
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-heading leading-none font-semibold", className)}
      {...props}
    />
  )
}
```
(`src/components/ui/card.tsx:31-39`)

- `CardTitle` usado como `<CardTitle>Entrar</CardTitle>` (`page.tsx:81`) renderiza uma `<div>` estilizada, não um `<h1>`–`<h6>`. Um leitor de tela navegando por headings (tecla `H` no NVDA/JAWS, rotor de headings no VoiceOver) não encontrará "Entrar" como título de seção — o único heading real da rota é o `<h1>` de documentação "Template — Login simples" no topo da página, fora do card.
- Como orientado no enunciado desta auditoria e já registrado na spec (item 7): isso é um comportamento sistêmico de **todo** uso de `Card` no projeto (inclusive `dashboard-financeiro`), não algo introduzido por esta tela. Registro aqui só como observação — não é escopo desta auditoria corrigir isoladamente em `login-simples` sem alinhar a mudança com o restante do catálogo (todas as demais telas que usam `Card`/`CardTitle` seriam afetadas da mesma forma).

## 8. Nome acessível da página / heading único — PASSA

```tsx
<h1 className="font-heading text-2xl font-semibold tracking-tight">
  Template — Login simples
</h1>
```
(`page.tsx:60-62`)

- Único `<h1>` da rota. Sem conflito de nível de heading. (A limitação de `<title>` fixo em `layout.tsx` já estava registrada na spec como melhoria futura de escopo maior que esta tela, não bloqueante aqui.)

---

## Observações adicionais (não bloqueantes, fora dos 8 itens da spec)

### a. `autoFocus` no campo de e-mail pula o cabeçalho da página de documentação

```tsx
<Input
  id="email"
  type="email"
  ...
  autoFocus
  ...
/>
```
(`page.tsx:91-99`)

- A spec pede foco inicial no e-mail para simular o comportamento real da tela de login (item 1 dos "Estados"). Isso é esperado e correto para a tela de login "de verdade".
- Mas nesta rota o `Input` está embutido numa página de **documentação/catálogo** (`/templates/login-simples`), que tem seu próprio `<h1>` "Template — Login simples" e um parágrafo de contexto **antes** do card simulado (linhas 60-68). Como `autoFocus` dispara imediatamente no mount, um usuário de leitor de tela ou teclado que abre a rota tem o foco levado direto para o campo de e-mail, sem passar pelo `<h1>`/parágrafo de documentação que o precede visualmente — ele só vai "ouvir" esse conteúdo se navegar para trás manualmente.
- Isso não viola um critério WCAG específico (não há troca de contexto disparada, só posicionamento de foco) e replica fielmente o comportamento real da tela de produção que está sendo demonstrada — mas vale registrar como tensão entre "fidelidade ao comportamento real da tela" x "leiturabilidade da página de documentação/catálogo em si". Não é uma falha de acessibilidade da tela de login simulada, é uma característica de como o padrão "Template — …" do catálogo (mesmo em `dashboard-financeiro`) expõe comportamento interativo real dentro de uma página de docs.

### b. Ícone decorativo `ShieldCheckIcon` sem `aria-hidden` explícito

```tsx
<div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
  <ShieldCheckIcon className="size-5" />
</div>
```
(`page.tsx:78-80`)

- Ícone puramente decorativo (não carrega informação que não esteja já no `CardTitle`/`CardDescription` ao lado). Não tem `aria-hidden="true"` nem `role="presentation"`. Ícones `lucide-react` renderizam `<svg>` sem `role`/`title` por padrão, então a maioria dos leitores de tela modernos (NVDA/Chrome, VoiceOver/Safari) já ignora esse tipo de SVG na árvore de acessibilidade — mas o comportamento não é 100% garantido entre combinações de navegador/AT, e a boa prática é marcar explicitamente ícones decorativos como `aria-hidden="true"`.
- Mesmo padrão observado em outros templates do catálogo (ex.: `dashboard-financeiro`) — não é uma regressão desta tela, é uma lacuna de convenção do catálogo. Reporto como observação, não como falha bloqueante desta tela isolada.

### c. `role="group"` em cada `Field`/`InputGroup`

```tsx
function Field({ ... }) {
  return <div role="group" data-slot="field" ... />
}
```
(`src/components/ui/field.tsx:81-95`; mesmo padrão em `InputGroup`, `input-group.tsx:11-37`)

- Cada campo (`Field` de e-mail, `Field` de senha) e o próprio `InputGroup` da senha são envolvidos por `role="group"`. Dependendo do leitor de tela/verbosidade configurada, isso pode gerar anúncios extras tipo "grupo" ao entrar em cada campo — não impede o uso, mas é uma verbosidade a mais que não existe em campos simples fora de `Field`. Como não é um `role="group"` com `aria-label` (não nomeado), o impacto prático costuma ser baixo (a maioria dos leitores de tela não verbaliza grupos sem nome em todos os modos), mas registro como observação porque é um padrão herdado do próprio `field.tsx`/`input-group.tsx` do catálogo, replicado fielmente aqui — não uma escolha desta tela.

---

## Conclusão

`login-simples` implementa corretamente todos os 8 requisitos de acessibilidade específicos listados na spec, incluindo os dois pontos mais delicados apontados de antemão: o botão de mostrar/ocultar senha não rouba foco do campo (`InputGroupAddon` só refoca o input quando o clique não é num `<button>`), e o `Spinner` embutido no botão de envio recebe `aria-hidden="true"` explícito, eliminando o risco de anúncio duplicado com a região `aria-live="polite"` dedicada. O único item classificado como "gap" (título do `Card` não semântico) é sistêmico do catálogo e foi apenas registrado, conforme instrução — não corrigido nesta auditoria nem nesta tela isoladamente. As três observações adicionais (autoFocus x página de documentação, ícone decorativo sem `aria-hidden`, `role="group"` implícito) são de baixo risco e também refletem convenções herdadas de componentes de catálogo já usados em outras telas, não bugs introduzidos por `login-simples`.
