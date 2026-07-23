# Auditoria de acessibilidade — `recuperacao-senha`

- **Escopo auditado:** `src/app/templates/recuperacao-senha/page.tsx` (código estático, sem execução da app).
- **Confrontado com:** seção "Requisitos de acessibilidade específicos desta tela" de `.build/telas/recuperacao-senha.md` (itens 1–7) + dependências (`card.tsx`, `field.tsx`, `alert.tsx`, `button.tsx`, `spinner.tsx`, `input.tsx`).
- **Não editado:** nenhum arquivo em `src/` foi alterado por esta auditoria.

## Resumo

| # | Item | Resultado |
|---|---|---|
| 1 | Erro de validação do e-mail (`aria-invalid` + `aria-describedby` + `role="alert"` + foco) | **Passa** |
| 2 | Transição para confirmação — foco programático no `AlertTitle`, sem `aria-live` duplicado | **Passa** |
| 3 | Cooldown do "Reenviar e-mail" — texto no nome acessível do botão + anúncio da reativação | **Passa** |
| 4 | `autoComplete="email"` (não `"username"`) | **Passa** |
| 5 | Link "Voltar para login" como `<a href>` real, presente e na mesma posição nos dois estados | **Passa** |
| 6 | E-mail interpolado real na confirmação (não placeholder fixo) | **Passa** |
| 7 | `CardTitle` não é heading semântico (gap sistêmico, agravado aqui por título dinâmico) | **Observação registrada, não corrigida aqui (conforme instrução, mitigada pelo item 2)** |
| — | Ordem de tab (e-mail → Enviar → Voltar / Reenviar → Voltar) | **Passa** |
| — | Nome acessível único de página (`<h1>`) | **Passa** |
| — | Contraste/cores — só tokens do design system, nenhuma cor arbitrária | **Passa** |
| — | `autoFocus` no campo de e-mail pula o `<h1>`/parágrafo da página de documentação | **Observação (não bloqueante, mesma herdada de `login-simples`)** |
| — | Ícones decorativos (`KeyRoundIcon`, `MailCheckIcon`, `CheckCircle2Icon`, `RotateCcwIcon`) sem `aria-hidden` explícito | **Observação (não bloqueante, mesma herdada de `login-simples`)** |
| — | `role="group"` do `Field` do campo de e-mail | **Observação (padrão herdado do catálogo, não bloqueante)** |
| — | Botão "Reenviar e-mail" perde `focus` ao ser desabilitado durante o reenvio | **Observação nova (baixo risco, ver item extra abaixo)** |

Nenhuma falha real (bloqueante) encontrada. Os 6 requisitos de acessibilidade acionáveis da spec (itens 1–6) foram implementados corretamente; o item 7 é um gap sistêmico do catálogo já registrado como tal na própria spec, com a mitigação (foco programático) corretamente presente. Há observações de baixo risco, majoritariamente herdadas do mesmo padrão já visto em `login-simples`/`login-erro-validacao`, mais uma nova relacionada ao botão de reenvio.

---

## 1. Erro de validação do e-mail (estado 3) — PASSA

```tsx
<Field data-invalid={!!erroEmail}>
  <FieldLabel htmlFor="email">E-mail corporativo</FieldLabel>
  <Input
    id="email"
    ref={emailRef}
    type="email"
    ...
    aria-invalid={!!erroEmail}
    aria-describedby={erroEmail ? "email-erro" : undefined}
  />
  {erroEmail && <FieldError id="email-erro">{erroEmail}</FieldError>}
</Field>
```
(`src/app/templates/recuperacao-senha/page.tsx:234-253`)

- `FieldLabel htmlFor="email"` + `Input id="email"` — label associado nativamente via `for`/`id` (não é placeholder fazendo vez de label; `placeholder="nome@corretora.com.br"` é só exemplo de preenchimento, coexiste com o `FieldLabel` real).
- `aria-invalid={!!erroEmail}` reflete o estado corretamente.
- `aria-describedby="email-erro"` só é aplicado quando existe erro (`undefined` caso contrário) — aponta para o `id` do `FieldError` renderizado condicionalmente logo abaixo.
- `FieldError` (`field.tsx:225-234`) tem `role="alert"` embutido no componente:
  ```tsx
  <div role="alert" data-slot="field-error" ...>{content}</div>
  ```
  A mensagem de erro é anunciada automaticamente ao entrar no DOM (não depende só da cor vermelha do `text-destructive`).
- Foco programático: `React.useEffect(() => { if (erroEmail) emailRef.current?.focus() }, [erroEmail])` (linhas 54-58) — dispara toda vez que `erroEmail` passa a existir (submit com campo vazio/inválido), levando o foco de volta ao campo com o erro. Não dispara ao limpar o erro (`handleEmailChange` limpa `erroEmail` sem re-focar), o que é o comportamento correto (evitar roubar foco do usuário enquanto ele já está digitando no próprio campo).

## 2. Transição para o estado de confirmação (estado 5) — PASSA

```tsx
<Alert>
  <CheckCircle2Icon />
  <AlertTitle ref={confirmacaoRef} tabIndex={-1}>
    Link enviado
  </AlertTitle>
  <AlertDescription>
    Não recebeu? Verifique a caixa de spam antes de reenviar.
  </AlertDescription>
</Alert>
```
```tsx
React.useEffect(() => {
  if (enviado) {
    confirmacaoRef.current?.focus()
  }
}, [enviado])
```
(`page.tsx:63-67` e `176-185`)

- `Alert` (`alert.tsx:22-35`) já carrega `role="alert"` nativo no `<div data-slot="alert">` — confirmado no código-fonte do componente, sem necessidade de `aria-live` adicional ao redor, exatamente como a spec pede ("não duplicar com `aria-live` adicional ao redor dele").
- Além do `role="alert"` nativo (que já anuncia a região ao entrar no DOM), o `AlertTitle` recebe `ref={confirmacaoRef}` + `tabIndex={-1}`, e o `useEffect` move o foco para ele assim que `enviado` vira `true`. Isso é o requisito central do item 2: como `CardTitle`/`CardDescription`/ícone trocam de conteúdo sem navegação de rota (e `CardTitle` não é heading — ver item 7), o foco programático é o mecanismo que efetivamente comunica a mudança de tela para quem usa leitor de tela — sem ele, o foco continuaria no botão "Enviar" já removido do DOM (React desmonta o formulário inteiro ao trocar `enviado`).
- `AlertTitle` é uma `<div>` (`alert.tsx:37-48`, `React.ComponentProps<"div">`), compatível com `React.useRef<HTMLDivElement>(null)` usado em `confirmacaoRef` (linha 50) — sem erro de tipagem, sem `any`.

## 3. Cooldown do botão "Reenviar e-mail" (estado 6) — PASSA

```tsx
<Button
  type="button"
  variant="outline"
  fullWidth
  disabled={cooldown > 0 || carregando}
  onClick={handleReenviar}
>
  {carregando ? (
    <><Spinner aria-hidden="true" />Reenviando...</>
  ) : cooldown > 0 ? (
    <><RotateCcwIcon />Reenviar em {cooldownFormatado}</>
  ) : (
    <><RotateCcwIcon />Reenviar e-mail</>
  )}
</Button>

<p aria-live="polite" className="sr-only">
  {carregando
    ? "Reenviando..."
    : cooldown === 0
      ? "Você já pode reenviar o e-mail."
      : ""}
</p>
```
(`page.tsx:187-218`)

- A spec permite duas soluções equivalentes: `aria-describedby` explicando o motivo do `disabled`, **ou** o texto embutido no próprio nome acessível do botão. A implementação usa a segunda: durante o cooldown, o conteúdo visível do botão é literalmente "Reenviar em 00:30" — como não há `aria-label` sobrescrevendo, o nome acessível computado do botão (Accessible Name, spec ARIA) é derivado do conteúdo de texto, então um leitor de tela ao focar o botão desabilitado anuncia algo como "Reenviar em 00:30, desabilitado" — a razão do desabilitado está no próprio nome, não é só uma pista visual/de cor.
- `RotateCcwIcon` (sem `title`/texto) não interfere no cálculo do nome acessível — `lucide-react` renderiza `<svg>` puro sem conteúdo textual.
- Reativação anunciada: a região `<p aria-live="polite" className="sr-only">` existe desde a montagem do bloco `enviado` (mesmo padrão já validado em `login-simples`/`login-erro-validacao` — elemento presente no DOM antes da mudança, não injetado depois) e muda para "Você já pode reenviar o e-mail." exatamente quando `cooldown` chega a `0` — cobre o requisito de anunciar a mudança de disponibilidade sem depender só da troca visual do texto/estado do botão.
- Verificado que ao entrar no estado `enviado` pela primeira vez, `cooldown` já começa em `COOLDOWN_SEGUNDOS` (30, linha 109), então a condição `cooldown === 0` é falsa nesse instante — a região não anuncia "você já pode reenviar" prematuramente antes da contagem regressiva começar.

## 4. `autoComplete="email"` no campo de e-mail — PASSA

```tsx
<Input id="email" ref={emailRef} type="email" ... autoComplete="email" ... />
```
(`page.tsx:236-241`)

- Exatamente o valor pedido pela spec (não `"username"`, que só faz sentido quando há também um campo de senha na mesma tela — não é o caso aqui).

## 5. Link "Voltar para login" — PASSA

```tsx
<Button variant="link" size="sm" className="h-auto self-start px-0" asChild>
  <Link href="/templates/login-simples">
    <ArrowLeftIcon />
    Voltar para login
  </Link>
</Button>
```
Presente duas vezes: dentro do bloco `enviado` (`page.tsx:220-230`) e dentro do bloco de formulário (`page.tsx:273-283`).

- `Button asChild` repassa via `Slot.Root` (`button.tsx:109`, `const Comp = asChild ? Slot.Root : "button"`) para o `<Link>` do `next/link` — o elemento final no DOM é um `<a href="/templates/login-simples">` real, não um `<button onClick={...}>`. Preserva Ctrl+clique, abrir em nova aba, rotor de links de leitor de tela etc.
- Posição relativa consistente nos dois estados: em ambos os blocos, o link aparece **depois** do botão de ação primário (Enviar/Reenviar) e da região `aria-live` `sr-only`, como último elemento focável do bloco — não muda de lugar entre os estados 1-4 e 5-6, atendendo ao requisito de não quebrar a expectativa de quem já tabulou até ele.
- Nome acessível "Voltar para login" (texto visível, não ícone sozinho) — `ArrowLeftIcon` é complemento visual, não substitui o texto.

## 6. E-mail interpolado na confirmação — PASSA

```tsx
<CardDescription>
  Enviamos um link de redefinição para {email}
</CardDescription>
```
(`page.tsx:154-157`)

- `{email}` lê o valor real do estado React (o mesmo `email` controlado pelo `Input` do formulário), não um placeholder fixo do tipo "seu e-mail" — quem usa leitor de tela ouve o endereço real que foi enviado, sem precisar voltar ao campo (que já não está mais no DOM nesse estado, já que o `CardContent` inteiro troca de conteúdo).

## 7. `CardTitle` não é heading semântico — Observação (conforme instrução, não corrigida aqui)

```tsx
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-title" className={cn("font-heading leading-none font-semibold", className)} {...props} />
  )
}
```
(`src/components/ui/card.tsx:31-39`)

- Mesmo gap sistêmico já registrado em `login-simples`/`login-erro-validacao`: `CardTitle` renderiza `<div>`, não `<h1>`–`<h6>`. Nesta tela o `CardTitle` troca de "Esqueceu sua senha?" (linha 164) para "Verifique seu e-mail" (linha 154) sem ser um heading real — quem navega por headings (tecla `H`) não percebe essa troca de título de seção.
- Como a própria spec já antecipa (item 7, `.build/telas/recuperacao-senha.md:110`), o impacto é maior aqui do que nas telas irmãs porque o conteúdo do título é dinâmico. Mas a mitigação pedida (item 2 — foco programático no `AlertTitle`) está corretamente implementada e é, de fato, a única fonte confiável de anúncio da mudança de estado, dado que não se pode contar com anúncio automático de heading. Não é escopo desta auditoria corrigir isoladamente `CardTitle` nesta tela sem alinhar com o restante do catálogo (afetaria todas as telas que usam `Card`).

---

## Verificações adicionais (fora dos 7 itens numerados da spec, mesmo padrão de rigor da auditoria de `login-simples`)

### a. Ordem de tab — PASSA

Sem nenhum `tabIndex` positivo no arquivo (o único `tabIndex` presente é `-1` no `AlertTitle`, usado só como alvo de foco programático, não como parada de tab). Ordem no DOM:

**Estado formulário (1-4):** `Input#email` (autoFocus) → `Button type="submit"` "Enviar link de redefinição" → `Link` "Voltar para login".

**Estado confirmação (5-6):** `Button` "Reenviar e-mail" → `Link` "Voltar para login" (`AlertTitle` fica fora da sequência de tab por causa do `tabIndex={-1}`, que é o comportamento correto — ele é alvo de foco programático, não uma parada de tab a mais).

Ambas as sequências seguem a ordem visual/lógica de cima para baixo, sem saltos artificiais.

### b. Nome acessível único de página (`<h1>`) — PASSA

```tsx
<h1 className="font-heading text-2xl font-semibold tracking-tight">
  Template — Recuperação de senha
</h1>
```
(`page.tsx:128-130`)

- Único `<h1>` da rota, sem conflito de nível de heading com o `CardTitle` (que, como já registrado no item 7, não é heading semântico de qualquer forma).

### c. Contraste/cores — só tokens do design system — PASSA

- Busquei por cores arbitrárias (`#`, `rgb(`, `text-[`, `bg-[`) no arquivo: nenhuma ocorrência. Todas as classes de cor usadas (`text-primary`, `bg-primary/10`, `text-muted-foreground`, `text-destructive` via `FieldError`/`Field[data-invalid]`) são tokens do design system já validados em outras telas — nenhum texto novo usa cor fora de token.

### d. `autoFocus` no campo de e-mail pula o `<h1>`/parágrafo de documentação — Observação (não bloqueante, herdada de `login-simples`)

```tsx
<Input id="email" ref={emailRef} type="email" ... autoFocus ... />
```
(`page.tsx:236-243`)

- Mesma tensão já registrada na auditoria de `login-simples`: a spec pede foco inicial no e-mail para fidelidade ao comportamento real da tela (item "Vazio/inicial" dos "Estados"), mas a rota também é uma página de documentação/catálogo com `<h1>`/parágrafo de contexto antes do card simulado (linhas 127-139). Quem abre a rota com leitor de tela/teclado tem o foco levado direto ao campo de e-mail, sem passar pelo cabeçalho de documentação. Não é uma falha de acessibilidade da tela de recuperação simulada em si — é característica do padrão "Template — …" do catálogo, replicada fielmente aqui.

### e. Ícones decorativos sem `aria-hidden` explícito — Observação (não bloqueante, herdada de `login-simples`)

```tsx
<div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full">
  <MailCheckIcon className="size-5" />
</div>
...
<KeyRoundIcon className="size-5" />
...
<CheckCircle2Icon />  {/* dentro do Alert */}
...
<RotateCcwIcon />     {/* dentro do botão Reenviar */}
```
- Nenhum desses ícones tem `aria-hidden="true"` explícito. São todos puramente decorativos (não carregam informação que não esteja já no texto adjacente: `CardTitle`/`CardDescription`, `AlertTitle`, ou o próprio texto do botão). `lucide-react` renderiza `<svg>` sem `role`/`title` por padrão, então a maioria dos leitores de tela modernos já ignora esses SVGs na árvore de acessibilidade — mas, como já registrado na auditoria de `login-simples`, o comportamento não é 100% garantido entre combinações de navegador/AT, e a convenção recomendada é marcar explicitamente. Mesma lacuna de convenção do catálogo, não introduzida por esta tela.

### f. `role="group"` no `Field` do campo de e-mail — Observação (padrão herdado do catálogo, não bloqueante)

```tsx
function Field({ ... }) {
  return <div role="group" data-slot="field" ... />
}
```
(`field.tsx:81-95`)

- Mesma observação já feita em `login-simples`: o único `Field` desta tela (e-mail) é envolvido por `role="group"` sem `aria-label`, o que pode gerar verbosidade extra ("grupo") dependendo do leitor de tela/configuração. Não impede o uso; padrão herdado do componente `field.tsx`, replicado fielmente, não uma escolha desta tela.

### g. Novo: botão "Reenviar e-mail" perde o foco quando é desabilitado durante o próprio clique — Observação (baixo risco)

```tsx
<Button
  type="button"
  variant="outline"
  fullWidth
  disabled={cooldown > 0 || carregando}
  onClick={handleReenviar}
>
```
(`page.tsx:187-193`)

- Ao clicar em "Reenviar e-mail" (fora do cooldown), `handleReenviar` chama `setCarregando(true)` de forma síncrona, o que faz `disabled` passar a `true` no próximo render. Um elemento HTML que perde o atributo `disabled=false → true` enquanto está focado normalmente tem o foco do navegador movido para `<body>` (comportamento nativo do HTML, não específico deste código) — ou seja, o usuário de teclado que clicou/ativou o botão via Enter/Espaço pode perder a posição de foco durante o `setTimeout` de 1200ms de "Reenviando...".
- Isso replica exatamente o mesmo padrão já usado no botão "Entrar" de `login-simples`/"Enviar" desta própria tela (`disabled={carregando}` no submit), que não foi sinalizado como falha na auditoria anterior — não é uma regressão introduzida aqui, é um comportamento sistêmico de todo botão com `disabled` ligado a um estado de carregamento síncrono no clique, presente em várias telas do catálogo. Registro como observação de baixo risco (a região `aria-live` "Reenviando..." ainda anuncia a mudança de estado independentemente de onde o foco esteja, então a informação chega ao usuário — só a posição do foco do teclado é que pode ficar em `<body>` até a conclusão do reenvio), não como bloqueio desta auditoria.

---

## Conclusão

`recuperacao-senha` implementa corretamente os 6 requisitos de acessibilidade acionáveis da spec (erro de validação associado e anunciado, foco programático na transição de confirmação sem duplicar `aria-live`, cooldown com motivo no nome acessível do botão e anúncio de reativação, `autoComplete="email"` correto, link "Voltar para login" como `<a href>` real e estável entre estados, e-mail real interpolado na confirmação). O item 7 (título dinâmico do `Card` não sendo heading semântico) é o mesmo gap sistêmico do catálogo já presente em `login-simples`/`login-erro-validacao`, aqui com impacto reconhecidamente maior pela troca de conteúdo, mas devidamente mitigado pelo foco programático do item 2 — não corrigido isoladamente, conforme instrução. As observações adicionais (autoFocus x página de documentação, ícones decorativos sem `aria-hidden`, `role="group"` implícito, perda de foco ao desabilitar o botão "Reenviar" durante o clique) são de baixo risco e, com exceção da última, herdadas de padrões já registrados e aceitos nas telas irmãs — nenhuma delas bloqueia o uso da tela por teclado ou leitor de tela.
