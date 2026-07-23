# Especificação de tela — Recuperação de senha

- **Slug:** `recuperacao-senha` (`src/lib/templates-registry.ts`, hoje em `inProgressTemplates`; mover para `templatesList` só depois de construída)
- **Rota:** `src/app/templates/recuperacao-senha/page.tsx`
- **Fluxo:** Fase 5A — Fluxo de login (`PLANO-LOOP-80-20-TEMPLATES.md`, seção "Fase 5 — Jornadas de telas (login + seguros) rumo ao Case público")
- **Posição no fluxo:** 3ª de 5 rotas — `login-simples → login-erro-validacao → recuperacao-senha → selecao-perfil-corretora → onboarding`
- **Referência de estilo/estrutura:** `src/app/templates/dashboard-financeiro/page.tsx` (título "Template — …" + parágrafo de contexto no topo, container `w-full rounded-lg border`) e, mais diretamente, `src/app/templates/login-simples/page.tsx` / `src/app/templates/login-erro-validacao/page.tsx` — mesmo Card `max-w-sm` centralizado, mesmo Badge "Ambiente de demonstração", mesmo padrão de foco/`aria-live`.
- **Depende das especificações irmãs:** `.build/telas/login-simples.md` e `.build/telas/login-erro-validacao.md` — o link "Esqueci minha senha" de ambas já aponta para `/templates/recuperacao-senha`; esta tela é o destino desse link, não uma continuação linear do login (ver "Onde esta tela se encaixa").

## Onde esta tela se encaixa

`recuperacao-senha` **não é a próxima etapa depois de um login bem-sucedido** — a ordem `login-simples → login-erro-validacao → recuperacao-senha → selecao-perfil-corretora → onboarding` listada no plano é a ordem de **construção** das 5 rotas, não o caminho de navegação do usuário. Na navegação real: o usuário chega aqui clicando em "Esqueci minha senha" a partir de `login-simples` OU `login-erro-validacao` (link já implementado nas duas), pede o link de redefinição, recebe a confirmação de envio, e a partir daí só tem um caminho de volta: **para o login** (`login-simples`), não para `selecao-perfil-corretora`. Redefinir a senha não autentica o usuário — ele ainda precisa voltar e entrar com a nova senha, que é uma etapa fora do escopo destas 5 telas (não existe uma 6ª rota "definir nova senha"; o clique no link enviado por e-mail é tratado como fora do app, ver "Lacunas").

**Decisão de escopo tomada aqui:** esta tela cobre só o pedido de redefinição (capturar e-mail + confirmar envio), não a definição da nova senha em si — segue à risca o nome "Recuperação de senha" (não "Nova senha") do `templates-registry.ts`.

## Objetivo da tela

Deixar o usuário informar o e-mail corporativo da conta para receber um link de redefinição de senha, e confirmar de forma clara que o envio aconteceu (ou que precisa reenviar), sem prometer nada que a tela não entrega (ela não troca a senha, só dispara o pedido).

## Estados que esta tela precisa cobrir

1. **Vazio/inicial** — formulário com campo "E-mail corporativo" vazio, foco automático no campo, botão "Enviar link de redefinição" habilitado.
2. **Preenchendo** — usuário digitando; nenhum estado visual especial além do foco padrão do Input.
3. **Erro de validação** — campo vazio ou formato de e-mail inválido ao tentar enviar (mesma mecânica de `login-erro-validacao`: `aria-invalid`, `FieldError` inline, foco movido para o campo).
4. **Carregando (enviando)** — depois do clique em "Enviar link de redefinição": campo e botão desabilitados, botão mostra Spinner + "Enviando...", região `aria-live` anuncia a mudança.
5. **Sucesso (e-mail enviado)** — o Card muda de conteúdo (não navega de rota): ícone/título/descrição trocam para confirmação ("Verifique seu e-mail" + o endereço informado), com opção de reenviar e link para voltar ao login. Foco precisa ser movido para o novo título, mesmo princípio já usado no banner de erro de `login-erro-validacao`.
6. **Reenvio com cooldown** — dentro do estado de sucesso: botão "Reenviar e-mail" fica desabilitado por um tempo simulado (ex: 30s) com contagem regressiva visível; ao esgotar o cooldown, o botão reabilita e a mudança é anunciada.

**Decisão de segurança/UX tomada aqui, sem estado de erro dedicado:** esta tela **não modela** um estado de "e-mail não encontrado". Fluxos reais de recuperação de senha evitam confirmar/negar se um e-mail existe na base (proteção contra enumeração de contas) — por isso o estado 5 (sucesso) é exibido sempre que o formato do e-mail é válido, independentemente de existir ou não do lado do backend fictício. Isso é uma decisão de produto replicada aqui por boas práticas do domínio, não uma instrução explícita do plano — sinalizada em "Lacunas" para o Rafael confirmar.

Fora de escopo, registrar como responsabilidade de fora destas 5 telas:
- Definir a nova senha depois de clicar no link recebido por e-mail → não existe rota "nova senha" no fluxo; o clique no link é tratado como acontecendo fora do app (mesma lacuna de "fluxo que continua fora do protótipo" já seria esperada num link de e-mail real).
- Indisponibilidade de servidor / erro genérico de rede → mesma lacuna já registrada em `login-simples.md` e `login-erro-validacao.md`, não coberta em nenhuma das 5 telas.

## Composição — só peças reais do catálogo

Nenhum componente novo. Tudo abaixo já existe em `src/components/ui/` (Atoms/Molecules/Organisms confirmados em `src/lib/atomic-registry.ts`).

### Layout da página (moldura, mesmo padrão das telas irmãs)

- `<h1>` "Template — Recuperação de senha" + parágrafo `text-muted-foreground` de contexto.
- Container `w-full rounded-lg border` com `div` interno `bg-muted/30 flex min-h-[640px] items-center justify-center p-6` — mesma moldura de `login-simples`/`login-erro-validacao` (sem sidebar, sem navegação do portal).

### Painel (estados 1-4: formulário)

- **Organism `card.tsx`** (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) — mesmo `max-w-sm`.
  - `CardHeader`: `Badge variant="outline"` "Ambiente de demonstração" (Atom `badge.tsx`, igual às duas telas irmãs) + círculo de ícone decorativo com `KeyRoundIcon` (lucide-react, confirmado em `lucide-react.d.ts`) — ícone diferente do `ShieldCheckIcon` usado em `login-simples`/`login-erro-validacao`, para diferenciar visualmente "recuperar acesso" de "entrar", mantendo a mesma linguagem (círculo `bg-primary/10 text-primary`).
  - `CardTitle` "Esqueceu sua senha?" + `CardDescription` "Informe seu e-mail corporativo para receber o link de redefinição".
- **Campo de e-mail** — Molecule `field.tsx` (`Field`, `FieldLabel`, `FieldError`) envolvendo Atom `input.tsx` (`Input`), mesmo padrão de `login-erro-validacao`:
  ```
  <Field data-invalid={!!erroEmail}>
    <FieldLabel htmlFor="email">E-mail corporativo</FieldLabel>
    <Input id="email" type="email" placeholder="nome@corretora.com.br"
           autoComplete="email" autoFocus required
           value={email} onChange={handleEmailChange}
           aria-invalid={!!erroEmail}
           aria-describedby={erroEmail ? "email-erro" : undefined} />
    {erroEmail && <FieldError id="email-erro">{erroEmail}</FieldError>}
  </Field>
  ```
  `autoComplete="email"` (não `"username"`) — aqui não há campo de senha na mesma tela, então o autofill correto do navegador é o de e-mail puro.
- **Botão de envio** — Atom `button.tsx` (`Button type="submit" fullWidth`):
  - Estado padrão: `<SendIcon />` + "Enviar link de redefinição".
  - Estado carregando: `disabled`, conteúdo troca para `<Spinner />` (Atom `spinner.tsx`) + "Enviando...", mesmo padrão de `login-simples`/`login-erro-validacao`.
  - Região auxiliar `aria-live="polite"` + `className="sr-only"` anunciando "Enviando..." durante o carregamento.
- **Link "Voltar para login"** — mesma solução das telas irmãs (Atom `button.tsx` `Button variant="link" asChild` + `next/link`), com `ArrowLeftIcon` (lucide-react, confirmado) antes do texto, posicionado abaixo do botão de envio (não dentro do `CardFooter`, para ficar visível sem rolar em qualquer um dos dois estados do Card).

### Painel (estados 5-6: confirmação/reenvio)

Mesmo `Card` da rota, conteúdo do `CardHeader`/`CardContent` trocado condicionalmente (`{enviado ? (...) : (...)}`), não uma rota nova:

- `CardHeader`: círculo de ícone trocado para `MailCheckIcon` (lucide-react, confirmado) + `CardTitle` "Verifique seu e-mail" + `CardDescription` `Enviamos um link de redefinição para {email}` (interpolando o valor real digitado).
- **Confirmação** — Molecule `alert.tsx` (`Alert`, `AlertTitle`, `AlertDescription`, variant `default` — não `destructive`, mesmo componente já usado no Pattern `success-feedback.tsx` como referência de composição):
  ```
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
- **Botão "Reenviar e-mail"** — Atom `button.tsx` (`Button variant="outline"`), com `RotateCcwIcon` (lucide-react, confirmado):
  - Habilitado: "Reenviar e-mail".
  - Durante o cooldown: `disabled`, texto "Reenviar em 00:30" (contagem regressiva simulada com `setInterval`/`useEffect`, sem componente novo — é lógica de estado, não peça de catálogo).
  - Clique reenvia: reaproveita o mesmo estado 4 (carregando) e, ao concluir, reinicia o cooldown do estado 6.
- **Link "Voltar para login"** — reaproveitado do estado de formulário, mesma posição relativa (abaixo dos botões de ação).

## Navegação

| Ação/link | Destino | Observação |
|---|---|---|
| Botão "Enviar link de redefinição" — e-mail válido (sucesso) | Permanece em `/templates/recuperacao-senha` | Não navega de rota — o Card troca de conteúdo para o estado de confirmação (estado 5), igual ao princípio já usado em `login-erro-validacao` (banner que aparece na mesma rota). |
| Botão "Enviar link de redefinição" — e-mail vazio/formato inválido | Permanece em `/templates/recuperacao-senha` | Só atualiza o estado de erro exibido (estado 3), sem navegar. |
| Botão "Reenviar e-mail" (estado 6, fora do cooldown) | Permanece em `/templates/recuperacao-senha` | Repete o ciclo carregando → confirmação, sem navegar. |
| Link "Voltar para login" (presente nos dois estados do Card) | `/templates/login-simples` | Fecha o ciclo desta tela — volta para o início do fluxo, não para `selecao-perfil-corretora` (ver "Onde esta tela se encaixa" — esta tela não autentica ninguém). |

**Quem chega nesta tela:** link "Esqueci minha senha" de `login-simples` e de `login-erro-validacao` (ambos já implementados, apontando para `/templates/recuperacao-senha`) — não precisa de nenhuma alteração nas telas irmãs para esta especificação.

## Requisitos de acessibilidade específicos desta tela

1. **Erro de validação do e-mail (estado 3)**: mesmo padrão já auditado em `login-erro-validacao` — `aria-invalid="true"` no `Input` + `aria-describedby` apontando para o `id` do `FieldError` (que já tem `role="alert"` embutido em `field.tsx`), e foco programático movido para o campo ao falhar o envio.
2. **Transição para o estado de confirmação (estado 5)**: como o `CardTitle`/`CardDescription`/ícone trocam de conteúdo inteiramente dentro da mesma rota (sem navegação de página), é obrigatório mover o foco programaticamente para o novo `AlertTitle` (`ref` + `tabIndex={-1}` + `.focus()`, mesmo mecanismo do `bannerRef` em `login-erro-validacao`) — sem isso, quem usa leitor de tela continua com foco no botão "Enviar" e não é informado de que o conteúdo da tela mudou. O `Alert` já tem `role="alert"` nativo (anuncia sozinho ao entrar no DOM), então não duplicar com `aria-live` adicional ao redor dele.
3. **Cooldown do botão "Reenviar e-mail" (estado 6)**: o texto da contagem regressiva ("Reenviar em 00:30") não pode ser só decorativo — precisa estar associado ao botão via `aria-describedby` (explicando por que está desabilitado) ou embutido no próprio `aria-label` do botão. Quando o cooldown termina e o botão reabilita, essa mudança de disponibilidade precisa ser anunciada (região `aria-live="polite"` separada, `sr-only`, seguindo o mesmo padrão já usado no estado de carregamento das telas irmãs) — sem isso, quem não vê a tela não sabe quando pode tentar reenviar de novo.
4. **Campo de e-mail com autocomplete correto**: `autoComplete="email"` (não `"username"`, que é o valor certo só quando há também um campo de senha na mesma tela, caso das telas irmãs) — requisito de acessibilidade para preenchimento automático assistido, não só conveniência.
5. **Link "Voltar para login"**: precisa renderizar como `<a href>` de verdade (`Button asChild` + `next/link`, mesma solução já usada nas telas irmãs para "Esqueci minha senha"), presente e no mesmo lugar relativo nos dois estados do Card — não pode desaparecer ou mudar de posição entre os estados 1-4 e 5-6, para não quebrar a expectativa de quem já tabulou até ele.
6. **Endereço de e-mail interpolado na confirmação**: `Enviamos um link de redefinição para {email}` precisa ler o valor real do estado (não um placeholder fixo) — importante para quem usa leitor de tela confirmar que o e-mail correto foi usado, sem precisar voltar ao campo do formulário (que já não está mais na tela nesse estado).
7. **Gap conhecido do Card, não exclusivo desta tela**: mesmo gap sistêmico já registrado em `login-simples.md` — `CardTitle` (`card.tsx`) renderiza uma `<div>`, não um heading semântico. Nesta tela o impacto é maior que nas irmãs porque o título muda de conteúdo dinamicamente (estado 1→5) sem ser um heading real — reforça a necessidade do item 2 (foco programático) como a forma de comunicar a mudança, já que não dá para contar com anúncio automático de heading.

## Lacunas para o Rafael decidir (não resolvidas aqui)

- **Decisão de segurança/UX "sem estado de e-mail não encontrado"** (ver seção "Estados"): replicada aqui por boas práticas comuns de recuperação de senha (evitar enumeração de contas), não por instrução explícita do plano. Se o Rafael preferir um caminho didático que mostre esse erro mesmo assim (para fins de demonstração do catálogo, já que este é um ambiente fictício sem risco real de segurança), é um estado a mais nesta tela, reaproveitando o mesmo `Alert variant="destructive"` já usado em `login-erro-validacao`.
- **Ausência de uma 6ª rota "definir nova senha"**: o fluxo do plano define só estas 5 telas; o clique no link enviado por e-mail (que levaria a uma tela de "criar nova senha") fica fora do protótipo. Se isso entrar no case público depois, é uma tela nova fora do escopo desta especificação.
- **Duração/mecânica do cooldown de reenvio** (30s sugerido aqui): valor arbitrário de demonstração, sem instrução do plano — ajustável livremente na implementação sem impacto em nenhuma outra tela.
