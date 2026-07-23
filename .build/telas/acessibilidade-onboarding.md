# Auditoria de acessibilidade — `onboarding`

- **Escopo auditado:** `src/app/templates/onboarding/page.tsx` (código estático, sem execução da app).
- **Confrontado com:** seção "Requisitos de acessibilidade específicos desta tela" de `.build/telas/onboarding.md` (itens 1–12) + dependências (`card.tsx`, `field.tsx`, `input.tsx`, `select.tsx`, `switch.tsx`, `checkbox.tsx`, `progress.tsx`, `alert.tsx`, `button.tsx`, `spinner.tsx`, `label.tsx`) + comparação direta com o mecanismo original em `src/components/patterns/multi-step-form.tsx`.
- **Atenção especial pedida:** o conflito documentado entre `autoFocus` no primeiro campo da Etapa 1 e o foco programático no heading de cada etapa — investigado em profundidade na seção 1 abaixo, incluindo a ordem real de execução do React (commit síncrono vs. `useEffect` assíncrono).
- **Não editado:** nenhum arquivo em `src/` foi alterado por esta auditoria.

## Resumo

| # | Item | Resultado |
|---|---|---|
| 1 | Foco programático no heading de cada etapa **vs.** `autoFocus` no campo "Nome de exibição" | **Passa, com ressalva documentada (trade-off temporal correto, ver seção 1)** |
| 2 | Região `aria-live="polite"` "Etapa X de 3: {nome}" | **Passa** |
| 3 | Erro de validação — Etapa 1 (`FieldError`, `aria-invalid`/`aria-describedby`, foco no 1º campo inválido) | **Passa** |
| 4 | `Switch` da Etapa 2 com `Label` associado via `htmlFor`/`id` | **Passa** |
| 5 | Resumo da Etapa 3 não depende só de ícone ("Ativado"/"Desativado" por extenso) | **Passa** |
| 6 | `Checkbox` de termos — `Label` associado, erro com `role="alert"`, foco no próprio `Checkbox` | **Passa** |
| 7 | Erro de sistema (estado 8) — foco programático no `AlertTitle` | **Passa** |
| 8 | Tela de boas-vindas (estado 9) — foco programático no `CardTitle` "Tudo pronto!" | **Passa** |
| 9 | `Select` "Cenário de conclusão (demonstração)" — `Label htmlFor` + ordem de tab | **Passa** |
| 10 | Ordem de tab dentro de cada etapa (campos → Voltar → Avançar/Concluir) | **Passa** |
| 11 | `CardTitle` (`card.tsx`) não é heading semântico | **Observação registrada, não corrigida aqui (gap sistêmico, conforme instrução)** |
| 12 | Botões nunca ficam sem rótulo de texto visível (nenhum ícone-only) | **Passa** |
| — | Salto de nível de heading `<h1>` → `<h3>` (sem `<h2>` intermediário) | **Observação nova (baixo risco)** |
| — | Ícones decorativos sem `aria-hidden` explícito | **Observação (não bloqueante, herdada das telas irmãs)** |
| — | Nome acessível único de página (`<h1>`) | **Passa** |
| — | Contraste/cores — só tokens do design system | **Passa** |
| — | `CardFooter` (Voltar/Avançar) some corretamente durante o estado de erro de sistema | **Passa** |

Nenhuma falha bloqueante encontrada. Os 12 requisitos específicos da spec foram implementados corretamente. O ponto mais delicado da tela — a tensão entre `autoFocus` e foco no heading — foi resolvido com um trade-off temporal deliberado e tecnicamente correto (autoFocus vence só na primeira carga da rota; o heading vence em toda transição real de etapa), documentado tanto no código quanto nesta auditoria. Há observações adicionais de baixo risco, majoritariamente herdadas de gaps sistêmicos já registrados nas telas irmãs.

---

## 1. Conflito `autoFocus` × foco no heading — PASSA, com ressalva documentada

### O que a spec pede (e por que já nasce em tensão)

Dois trechos da spec pedem coisas que não podem vencer ao mesmo tempo no primeiro carregamento da rota:

- **Estados, item 1:** "foco movido para o heading da etapa ao entrar (mesmo mecanismo do `multi-step-form.tsx`)" — aplicado à própria Etapa 1, inicial.
- **Composição, Etapa 1:** "'Nome de exibição' (obrigatório, `autoFocus` na entrada da etapa 1)".

Só um elemento pode ter o foco do teclado num dado instante — a spec documenta essa tensão como um problema em aberto para o construtor resolver (é exatamente o "conflito documentado" mencionado na tarefa).

### O mecanismo original (`multi-step-form.tsx`), sem esse conflito

```tsx
const headingRef = React.useRef<HTMLHeadingElement>(null)

React.useEffect(() => {
  headingRef.current?.focus()
}, [step])
```
(`src/components/patterns/multi-step-form.tsx:34-38`)

- O Pattern original **não tem `autoFocus` em nenhum campo** — por isso o `useEffect` roda sem guarda, inclusive no mount inicial, sem disputa.

### O que o construtor fez em `onboarding` — guarda de primeira renderização

```tsx
const primeiraRenderizacao = React.useRef(true)
React.useEffect(() => {
  if (primeiraRenderizacao.current) {
    primeiraRenderizacao.current = false
    return
  }
  headingRef.current?.focus()
}, [step])
```
(`src/app/templates/onboarding/page.tsx:123-130`)

```tsx
<Input
  id="nome-exibicao"
  ref={nomeRef}
  autoFocus
  required
  ...
/>
```
(`page.tsx:345-349`)

### Por que isso funciona sem quebrar nenhum dos dois comportamentos (análise de ordem de execução)

O React separa a montagem/atualização do DOM em duas fases com timing bem diferentes:

1. **Fase de commit (síncrona, antes do paint):** ao inserir um novo elemento host com a prop `autoFocus` (como o `<input>` da Etapa 1), o próprio React chama `.focus()` nesse elemento como parte do `commitMount` — isso é o que faz `autoFocus` funcionar mesmo em remontagens condicionais (não é só o atributo HTML nativo, que só dispara de forma confiável durante o parsing inicial do documento).
2. **Efeitos passivos (`useEffect`), assíncronos, depois do paint:** o `headingRef.current?.focus()` só roda depois que o navegador já pintou a tela e depois que o `autoFocus` já rodou.

Consequência prática, passo a passo:

| Momento | O que acontece | Quem fica com o foco |
|---|---|---|
| **Carregamento inicial da rota** (`step` nasce em `0`, `primeiraRenderizacao.current` começa `true`) | `autoFocus` do `Input#nome-exibicao` dispara no commit; o `useEffect` do heading roda, vê a guarda `true`, vira `false` e **retorna sem focar** | `Input` "Nome de exibição" |
| **Avançar (`0 → 1`, `1 → 2`)** | Nenhum campo da Etapa 2/3 tem `autoFocus`; o `useEffect` do heading já não está mais guardado (`primeiraRenderizacao.current` é `false`) e foca o `h3` | `h3` (heading da nova etapa) |
| **Voltar (`1 → 0`)** | O bloco `{step === 0 && (...)}` remonta do zero (React desmonta/remonta a subárvore condicional), então o `Input#nome-exibicao` **é recriado** e `autoFocus` dispara de novo no commit — **mas** o `useEffect` do heading roda logo em seguida (já sem guarda) e sobrescreve o foco para o `h3` | `h3` "Dados profissionais" (o `autoFocus` chega a focar o input por uma fração de segundo, mas perde para o efeito do heading, que roda depois) |

Ou seja: o `autoFocus` só "vence de verdade" uma única vez — na primeira carga da página, quando `onboarding` é alcançada via navegação de rota real (`router.push` a partir de `selecao-perfil-corretora`, confirmado na spec, seção "Onde esta tela se encaixa"). Em **toda transição de etapa que não envolve navegação de URL** (o caso crítico de acessibilidade que a spec quer resolver — "sem foco no heading, quem usa leitor de tela permanece com foco no botão Avançar sem perceber que o conteúdo mudou"), o heading é quem efetivamente recebe e mantém o foco, inclusive ao voltar para a Etapa 1.

Isso é uma leitura defensável da tensão criada pela própria spec: no carregamento inicial da rota já existe uma pista de mudança de contexto que os 4 templates irmãos também usam (nova navegação, `autoFocus` no primeiro campo — mesmo padrão de `login-simples`/`login-erro-validacao`/`recuperacao-senha`/`selecao-perfil-corretora`); o mecanismo do heading existe especificamente para cobrir o caso que a navegação de rota **não** cobre (troca de etapa via estado local, sem URL nova). O construtor documentou essa decisão em comentário no próprio código (`page.tsx:113-122`), o que facilita a auditoria e uma eventual reversão pelo Rafael.

### Ressalva de baixo risco

Ao clicar "Voltar" da Etapa 2 para a Etapa 1, o `Input` chega a ser focado (via `autoFocus`) por um instante antes do foco ser redirecionado para o `h3` no mesmo ciclo de eventos (antes de qualquer interação do usuário ser possível nesse intervalo). Dependendo do leitor de tela, isso pode gerar dois anúncios em sequência muito rápida ("Nome de exibição, caixa de edição" seguido de "Dados profissionais") em vez de um só. Não impede o uso por teclado nem deixa o foco "perdido" (o destino final é sempre o heading, coerente com o requisito 1) — é uma verbosidade potencial, não uma falha funcional.

**Veredito:** o requisito 1 (foco no heading a cada mudança de step) e o requisito de `autoFocus` na Etapa 1 (Composição) **coexistem sem quebra real** — a única situação em que um deles não se aplica literalmente é a primeira renderização da rota, que é exatamente onde a spec cria a tensão insolúvel (não dá pra focar heading e input ao mesmo tempo). A escolha de priorizar `autoFocus` só ali, e o heading em todo o resto, é consistente com o próprio racional de acessibilidade que a spec usa para justificar o mecanismo do heading.

---

## 2. Região `aria-live="polite"` "Etapa X de 3" — PASSA

```tsx
<p aria-live="polite" className="text-muted-foreground text-xs">
  Etapa {step + 1} de 3: {NOMES_ETAPAS[step]}
</p>
```
(`page.tsx:323-328`)

- Elemento já existe no DOM em todo render (não é injetado dinamicamente), então leitores de tela que só anunciam regiões `aria-live` já presentes no DOM antes da mudança também captam a primeira transição — mesmo padrão validado nas telas irmãs.
- Texto atualizado corretamente a cada troca de `step`, com o nome da etapa vindo de `NOMES_ETAPAS` (`page.tsx:62-66`, "Dados profissionais" / "Preferências de notificação" / "Revisão e confirmação").

## 3. Erro de validação — Etapa 1 — PASSA

```tsx
<Field data-invalid={!!erroNome}>
  <FieldLabel htmlFor="nome-exibicao">Nome de exibição</FieldLabel>
  <Input
    id="nome-exibicao"
    ref={nomeRef}
    autoFocus
    ...
    aria-invalid={!!erroNome}
    aria-describedby={erroNome ? "nome-exibicao-erro" : undefined}
  />
  {erroNome && <FieldError id="nome-exibicao-erro">{erroNome}</FieldError>}
</Field>
```
(`page.tsx:341-366`, telefone análogo em `386-409`)

```tsx
React.useEffect(() => {
  if (erroNome) {
    nomeRef.current?.focus()
  } else if (erroTelefone) {
    telefoneRef.current?.focus()
  }
}, [erroNome, erroTelefone])
```
(`page.tsx:134-140`)

- `FieldError` carrega `role="alert"` embutido (`field.tsx:225-234`), então a mensagem é anunciada automaticamente ao entrar no DOM.
- `aria-invalid`/`aria-describedby` presentes e corretamente condicionais (só existem quando há erro, evitando `aria-describedby` apontando para um `id` inexistente quando o campo está válido).
- Foco vai para o primeiro campo inválido na ordem visual (nome antes de telefone) — a lógica em `handleSubmit` (`page.tsx:194-212`) só marca `erroTelefone` quando o nome já está válido ou quando ambos falham simultaneamente (nesse caso o efeito acima prioriza `erroNome`, focando o nome primeiro), consistente com "nome antes de telefone".
- "Cargo/função" corretamente sem validação (campo opcional, sem `data-invalid`/`aria-invalid`), como a spec pede.

## 4. `Switch` da Etapa 2 com `Label` associado — PASSA

```tsx
<Field orientation="horizontal">
  <FieldContent>
    <FieldLabel htmlFor="notif-email">Notificações por e-mail</FieldLabel>
    <FieldDescription>...</FieldDescription>
  </FieldContent>
  <Switch id="notif-email" checked={notifEmail} onCheckedChange={setNotifEmail} disabled={enviando} />
</Field>
```
(`page.tsx:415-431`, push/SMS análogos em `433-467`)

- `FieldLabel` usa `Label` (Radix `LabelPrimitive.Root`), que renderiza um `<label>` real com `htmlFor` propagado — associação nativa `for`/`id`, não texto solto.
- `Switch` (`switch.tsx:16-31`) usa `SwitchPrimitive.Root` do Radix, que expõe `role="switch"` com `aria-checked` sincronizado ao `data-state`; o `id` passado via `{...props}` casa exatamente com o `htmlFor` do `FieldLabel` correspondente para os três canais (`notif-email`, `notif-push`, `notif-sms`).
- Composição idêntica à validada em `src/components/examples/field-switch.tsx`, como a spec exigia — não uma solução nova arriscada.

## 5. Resumo da Etapa 3 — texto "Ativado"/"Desativado" — PASSA

```tsx
<dt className="text-muted-foreground">Notificações por e-mail</dt>
<dd>{notifEmail ? "Ativado" : "Desativado"}</dd>
<dt className="text-muted-foreground">Notificações push</dt>
<dd>{notifPush ? "Ativado" : "Desativado"}</dd>
<dt className="text-muted-foreground">Alertas por SMS</dt>
<dd>{notifSms ? "Ativado" : "Desativado"}</dd>
```
(`page.tsx:507-519`)

- Cada preferência tem o texto por extenso, não só um ícone/cor — atende WCAG 1.4.1, mesmo princípio já validado para o nome da corretora em `selecao-perfil-corretora`.

## 6. `Checkbox` de termos — PASSA

```tsx
<Checkbox
  id="termos"
  ref={termosRef}
  checked={termosAceitos}
  disabled={enviando}
  onCheckedChange={(checked) => {
    setTermosAceitos(checked === true)
    if (erroTermos) setErroTermos(false)
  }}
  aria-invalid={erroTermos}
  aria-describedby={erroTermos ? "termos-erro" : undefined}
/>
<Label htmlFor="termos">Li e aceito os Termos de Uso e a Política de Privacidade</Label>
...
{erroTermos && <FieldError id="termos-erro">Você precisa aceitar os termos para continuar.</FieldError>}
```
(`page.tsx:521-547`)

```tsx
React.useEffect(() => {
  if (erroTermos) {
    termosRef.current?.focus()
  }
}, [erroTermos])
```
(`page.tsx:145-149`)

- `Label htmlFor="termos"` associado ao `id="termos"` do `Checkbox` — mesma exigência já auditada no "Manter-me conectado" de `login-simples`.
- `CheckboxPrimitive.Root` (Radix) renderiza um `<button role="checkbox">` por padrão, compatível com `termosRef` tipado `React.useRef<HTMLButtonElement>` (`page.tsx:109`) — mesmo padrão de tipagem já validado para `RadioGroupItem` em `selecao-perfil-corretora`.
- Erro via `FieldError` (`role="alert"` embutido) com foco programático no próprio `Checkbox`, não na mensagem — "o controle que precisa ser corrigido é a marcação em si", exatamente como a spec pede.

## 7. Erro de sistema (estado 8) — foco no `AlertTitle` — PASSA

```tsx
<Alert variant="destructive">
  <CircleAlertIcon />
  <AlertTitle ref={erroRef} tabIndex={-1}>
    Não foi possível concluir sua configuração
  </AlertTitle>
  <AlertDescription>Verifique sua conexão e tente novamente.</AlertDescription>
</Alert>
<Button type="button" variant="outline" fullWidth onClick={enviar}>
  <RotateCcwIcon />
  Tentar novamente
</Button>
```
(`page.tsx:474-492`)

```tsx
React.useEffect(() => {
  if (erroSistema) {
    erroRef.current?.focus()
  }
}, [erroSistema])
```
(`page.tsx:154-158`)

- Mesmo mecanismo já auditado em `login-erro-validacao`/`recuperacao-senha`/`selecao-perfil-corretora`: `ref` + `tabIndex={-1}` + `.focus()` no `AlertTitle`, que também carrega `role="alert"` nativo via `Alert variant="destructive"` — reforça o anúncio sem duplicidade problemática.
- Botão "Tentar novamente" tem texto visível + ícone complementar, não ícone sozinho.
- **Verificação extra:** durante `erroSistema === true`, o `CardFooter` com "Voltar"/"Concluir" é condicionalmente removido (`{!erroSistema && (<CardFooter>...</CardFooter>)}`, `page.tsx:552-581`), evitando dois caminhos concorrentes de ação (o usuário só vê "Tentar novamente") — reduz ambiguidade na ordem de tab durante esse estado.

## 8. Tela de boas-vindas (estado 9) — foco no `CardTitle` — PASSA

```tsx
<CardTitle ref={tituloSucessoRef} tabIndex={-1}>
  Tudo pronto!
</CardTitle>
```
(`page.tsx:282-284`)

```tsx
React.useEffect(() => {
  if (concluido) {
    tituloSucessoRef.current?.focus()
  }
}, [concluido])
```
(`page.tsx:163-167`)

- Mesmo mecanismo já auditado no `confirmacaoRef` de `recuperacao-senha` — necessário porque a troca para a tela de boas-vindas não navega de URL.
- `tituloSucessoRef` tipado `React.useRef<HTMLDivElement>` (`page.tsx:111`), compatível com `CardTitle` (`React.ComponentProps<"div">`, `card.tsx:31-39`).

## 9. `Select` "Cenário de conclusão (demonstração)" — PASSA

```tsx
<Label htmlFor="cenario-conclusao" className="text-sm">
  Cenário de conclusão (demonstração)
</Label>
<Select value={cenario} onValueChange={(valor) => setCenario(valor as CenarioConclusao)}>
  <SelectTrigger id="cenario-conclusao" size="sm" className="w-56">
    <SelectValue />
  </SelectTrigger>
  ...
</Select>
```
(`page.tsx:250-266`)

- `Label htmlFor` associado ao `id` do `SelectTrigger` — mesma exigência já auditada no `Select` "Cenário da busca" de `selecao-perfil-corretora`.
- Fica fora do `Card`, antes da moldura da tela simulada, então entra na ordem de tab antes de qualquer elemento do `Card` — comportamento coerente e já ratificado como convenção aceita (spec, "Lacunas" item 2).

## 10. Ordem de tab dentro de cada etapa — PASSA

Sem nenhum `tabIndex` positivo no arquivo (os únicos `tabIndex` explícitos são `-1`, usados só como alvo de foco programático nos headings/`AlertTitle`/`CardTitle`). Ordem por etapa, seguindo puramente a posição no DOM:

- **Sempre presente (fora do `Card`):** `Select` "Cenário de conclusão".
- **Etapa 1:** `Input` Nome de exibição → `Select` Cargo/função → `Input` Telefone → `Button` "Voltar" (desabilitado) → `Button` "Avançar".
- **Etapa 2:** `Switch` e-mail → `Switch` push → `Switch` SMS → "Voltar" → "Avançar".
- **Etapa 3 (sem erro de sistema):** `Checkbox` termos → "Voltar" → "Concluir".
- **Etapa 3 (erro de sistema):** só `Button` "Tentar novamente" (`CardFooter` ocultado, ver item 7).
- **Estado de sucesso:** só `Button` "Ir para o Painel do corretor".

Todas as sequências seguem a ordem visual de cima para baixo (campos → Voltar → Avançar/Concluir), exatamente como o requisito 10 exige.

## 11. `CardTitle` não é heading semântico — Observação (conforme instrução, não corrigida aqui)

```tsx
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-title" className={cn("font-heading leading-none font-semibold", className)} {...props} />
  )
}
```
(`src/components/ui/card.tsx:31-39`)

- `<CardTitle>Vamos configurar sua conta</CardTitle>` (`page.tsx:294`) e `<CardTitle ref={tituloSucessoRef} tabIndex={-1}>Tudo pronto!</CardTitle>` (`page.tsx:282-284`) renderizam `<div>`s, não headings reais — mesmo gap sistêmico já registrado em `login-simples`/`login-erro-validacao`/`recuperacao-senha`/`selecao-perfil-corretora`. Aqui, o `h3` de cada etapa e o próprio foco programático no `CardTitle` "Tudo pronto!" mitigam parcialmente (o conteúdo ainda recebe foco e é anunciado, só não aparece na navegação por headings), exatamente como a spec já antecipava no item 11. Registrado, não corrigido isoladamente aqui.

## 12. Botões nunca ficam sem rótulo de texto visível — PASSA

- "Voltar" (`page.tsx:561`), "Avançar"/"Concluir"/"Concluindo..." (`563-574`), "Tentar novamente" (`491`), "Ir para o Painel do corretor" (`312`) — todos com texto visível; ícones (`RotateCcwIcon`, `ArrowRightIcon`) são complementares, nunca substituem o texto.
- `Spinner` no botão "Concluindo..." recebe `aria-hidden="true"` explícito (`page.tsx:566`), replicando o padrão já validado nas telas irmãs para evitar anúncio duplicado com a região `aria-live` `sr-only` dedicada (`page.tsx:577-579`, mesmo padrão de `login-simples`/`recuperacao-senha`/`selecao-perfil-corretora`).

---

## Verificações adicionais (fora dos 12 itens numerados da spec, mesmo padrão de rigor das auditorias irmãs)

### a. Salto de nível de heading — Observação nova (baixo risco)

```tsx
<h1 className="font-heading text-2xl font-semibold tracking-tight">
  Template — Onboarding
</h1>
...
<h3 ref={headingRef} tabIndex={-1} ...>
  {NOMES_ETAPAS[step]}
</h3>
```
(`page.tsx:238-240` e `331-337`)

- A página pula do `<h1>` direto para `<h3>` (nenhum `<h2>` na rota), o que replica fielmente o `h3` já usado no Pattern original `multi-step-form.tsx` — mas ali o Pattern é exibido isolado numa galeria, sem um `<h1>` de página o precedendo. Ao embutir o mesmo `h3` dentro da moldura "Template — …" (que sempre tem seu próprio `<h1>`), o salto de nível se torna visível pela primeira vez nesta tela entre as 5 do fluxo 5A (as telas anteriores não tinham headings de seção dentro do `Card`). Não impede a navegação por headings (o `h3` ainda é encontrado e lido corretamente), mas quem navega estritamente por níveis sequenciais (`H` no NVDA/JAWS não exige sequência, mas alguns usuários avançados checam a hierarquia) notará o salto. Baixo risco, herdado do próprio Pattern reaproveitado — não uma escolha isolada desta tela.

### b. Ícones decorativos sem `aria-hidden` explícito — Observação (não bloqueante, herdada)

```tsx
<RocketIcon className="size-5" />       {/* círculo do CardHeader, estado inicial */}
<PartyPopperIcon className="size-5" />  {/* círculo do CardHeader, sucesso */}
<CircleAlertIcon />                     {/* dentro do Alert de erro */}
<RotateCcwIcon />                       {/* botão "Tentar novamente" */}
<ArrowRightIcon />                      {/* botão "Ir para o Painel do corretor" */}
```

- Nenhum tem `aria-hidden="true"` explícito. Mesma lacuna de convenção já registrada em `login-simples`/`recuperacao-senha`/`selecao-perfil-corretora`, não introduzida por esta tela — `lucide-react` renderiza `<svg>` sem `role`/`title` por padrão, então a maioria dos leitores de tela já ignora, mas o comportamento não é 100% garantido entre combinações de navegador/AT.
- Exceção correta: `Spinner` no botão "Concluindo..." recebe `aria-hidden="true"` explícito (ver item 12).

### c. Nome acessível único de página (`<h1>`) — PASSA

```tsx
<h1 className="font-heading text-2xl font-semibold tracking-tight">
  Template — Onboarding
</h1>
```
(`page.tsx:238-240`)

- Único `<h1>` da rota, sem conflito de nível de heading fixo (o salto para `<h3>` é tratado como observação separada, item "a").

### d. Contraste/cores — só tokens do design system — PASSA

- Busquei por cores arbitrárias (`#`, `rgb(`, `text-[`, `bg-[`) no arquivo: nenhuma ocorrência. Todas as classes de cor (`text-primary`, `bg-primary/10`, `text-muted-foreground` via `FieldDescription`/`dt`, `text-destructive` via `FieldError`/`Alert variant="destructive"`) são tokens do design system já validados nas telas irmãs.

---

## Conclusão

`onboarding` implementa corretamente os 12 requisitos de acessibilidade específicos da spec. O ponto de maior risco — a tensão entre `autoFocus` no campo "Nome de exibição" e o foco programático no heading de cada etapa, criada pela própria spec ao pedir os dois comportamentos simultaneamente para o mesmo instante inicial — foi resolvida com uma guarda de primeira renderização que deixa o `autoFocus` vencer apenas na carga inicial da rota (quando a navegação de URL já dá o contexto de "página nova", mesmo padrão das 4 telas irmãs) e o foco no heading vencer em toda transição real de etapa (`Avançar`/`Voltar`), inclusive ao retornar à Etapa 1 — que é exatamente o caso crítico que a spec quer proteger (mudança de conteúdo sem navegação de URL). A análise da ordem de commit do React (fase síncrona de `autoFocus` sempre antes da fase assíncrona de `useEffect`) confirma que esse comportamento é determinístico, não uma corrida de condições instável. A única ressalva de baixo risco é um possível anúncio duplo e muito breve ao voltar para a Etapa 1 (o input é focado por uma fração de segundo antes do heading assumir o foco) — não bloqueia teclado nem deixa o foco perdido.

O item 11 (`CardTitle` sem heading semântico) é o mesmo gap sistêmico do catálogo já registrado nas 4 telas irmãs, apenas anotado, não corrigido isoladamente aqui, conforme instrução. As observações adicionais (salto de nível de heading `h1→h3`, ícones decorativos sem `aria-hidden`) são de baixo risco — a primeira é nova nesta tela (decorrente de embutir o `h3` do Pattern original dentro da moldura "Template — …"), a segunda é herdada das telas irmãs. Nenhuma delas bloqueia o uso da tela por teclado ou leitor de tela.
