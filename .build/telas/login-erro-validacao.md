# Especificação de tela — Login, erro de validação

- **Slug:** `login-erro-validacao` (`src/lib/templates-registry.ts`, hoje em `inProgressTemplates`; mover para `templatesList` só depois de construída)
- **Rota:** `src/app/templates/login-erro-validacao/page.tsx`
- **Fluxo:** Fase 5A — Fluxo de login (`PLANO-LOOP-80-20-TEMPLATES.md`, seção "Fase 5 — Jornadas de telas (login + seguros) rumo ao Case público")
- **Posição no fluxo:** 2ª de 5 rotas — `login-simples → login-erro-validacao → recuperacao-senha → selecao-perfil-corretora → onboarding`
- **Referência de estilo/estrutura:** `src/app/templates/dashboard-financeiro/page.tsx` (mesmo padrão de cabeçalho "Template — …" já usado em `.build/telas/login-simples.md`)
- **Depende da especificação irmã:** `.build/telas/login-simples.md` — esta tela é **o mesmo formulário de login em outro estado**, não uma tela nova de outro domínio. Toda a composição de campo de e-mail/senha, toggle de senha e botão de envio é idêntica à de `login-simples`; este documento foca só no que muda: os estados de erro.

## Onde esta tela se encaixa

É a variação "triste" da tela anterior (`login-simples`) dentro do mesmo fluxo — representa o formulário depois de uma tentativa de envio que falhou. Existem duas fontes de erro distintas nesta tela (ver "Estados" abaixo), e as duas precisam conviver no mesmo formulário porque na vida real o usuário pode errar dos dois jeitos em sequência. Depois de corrigir e reenviar com sucesso, o destino é o mesmo de `login-simples`: `selecao-perfil-corretora`.

**Decisão de escopo tomada aqui (ver lacuna registrada em `login-simples.md`):** "erro de validação" nesta tela cobre (a) campo obrigatório vazio / formato de e-mail inválido — validação client-side de verdade — e (b) "e-mail ou senha incorretos" — rejeição do backend, que na prática é comunicada com o mesmo tratamento visual de erro do formulário de login (banner + foco), não como um "erro de sistema" à parte. Erro de sistema (servidor fora do ar, timeout) continua fora do escopo das 5 telas — não incluído aqui.

## Objetivo da tela

Deixar claro pro usuário exatamente o que precisa corrigir para conseguir entrar — qual campo está errado (validação client-side) ou que a combinação e-mail/senha não bate (rejeição do servidor) — sem obrigar a redigitar tudo do zero.

## Estados que esta tela precisa cobrir

1. **Campo obrigatório vazio ao enviar** — usuário clicou "Entrar" com e-mail e/ou senha em branco. Cada campo vazio ganha `aria-invalid="true"` + mensagem inline abaixo dele ("Informe seu e-mail." / "Informe sua senha."). Foco vai para o primeiro campo inválido (e-mail antes de senha, na ordem visual).
2. **Formato de e-mail inválido** — e-mail preenchido mas sem formato válido (ex: sem "@"). Mesma mecânica do estado anterior, mensagem específica ("Informe um e-mail válido.").
3. **Credenciais incorretas (rejeição do backend)** — os dois campos têm formato válido, mas o servidor recusou a combinação. Não é erro de UM campo específico — mostrado como um banner de erro no topo do formulário ("E-mail ou senha incorretos."). Boa prática de segurança: ao entrar neste estado, o campo de senha é limpo (evita reenviar a senha errada sem querer), o e-mail permanece preenchido.
4. **Corrigindo** — usuário edita o(s) campo(s) sinalizado(s); ao digitar de novo, cada campo pode limpar seu próprio erro individualmente (não precisa esperar um novo envio) — mesmo comportamento padrão de campo controlado, sem necessidade de peça nova.
5. **Reenviando (carregando)** — mesmo estado "carregando" já especificado em `login-simples.md` (botão desabilitado, `Spinner` + "Entrando...", região `aria-live`), reaproveitado sem alteração.
6. **Sucesso no reenvio** — mesmo destino de `login-simples`: navega para `selecao-perfil-corretora`.

Fora de escopo (mantido igual à nota já registrada em `login-simples.md`): erro de sistema/rede (servidor indisponível, timeout) não é modelado em nenhuma das 5 telas do fluxo — lacuna a decidir com o Rafael se entrar no case.

## Composição — só peças reais do catálogo

Mesma base de `login-simples.md` (Card como painel, Field/Input/InputGroup para os campos, Button para o envio) **mais** as peças abaixo, específicas do estado de erro. Nenhum componente novo.

### Banner de credenciais incorretas (estado 3)

- **Molecule `alert.tsx`** (`Alert variant="destructive"`, `AlertTitle`, `AlertDescription`) posicionado no topo do `CardContent`, antes dos campos — mesmo padrão já usado no Pattern `error-state.tsx` (`src/components/patterns/error-state.tsx`): `Alert` já tem `role="alert"` embutido (anuncia sozinho ao entrar no DOM) e o título recebe `ref`+`tabIndex={-1}`+`.focus()` programático no mesmo `useEffect` que ativa o estado de erro, pra mover o foco de teclado pra lá.
  ```
  <Alert variant="destructive">
    <CircleAlertIcon />
    <AlertTitle ref={bannerRef} tabIndex={-1}>
      E-mail ou senha incorretos
    </AlertTitle>
    <AlertDescription>
      Confira os dados e tente novamente.
    </AlertDescription>
  </Alert>
  ```
  `CircleAlertIcon` confirmado em `lucide-react.d.ts` (mesma família de ícone já usada em outros Patterns de erro, ex: `ServerCrashIcon` em `error-state.tsx`).

### Campos com erro inline (estados 1 e 2)

- Mesma estrutura de `Field`/`FieldLabel`/`Input` de `login-simples.md`, acrescentando `data-invalid` no `Field`, `aria-invalid` no `Input`/`InputGroupInput`, e Molecule `field.tsx` (`FieldError`) logo abaixo do controle:
  ```
  <Field data-invalid={!!erroEmail}>
    <FieldLabel htmlFor="email">E-mail corporativo</FieldLabel>
    <Input id="email" type="email" aria-invalid={!!erroEmail}
           autoComplete="username" required
           aria-describedby={erroEmail ? "email-erro" : undefined} />
    {erroEmail && <FieldError id="email-erro">{erroEmail}</FieldError>}
  </Field>
  ```
  Igual para o campo de senha, dentro do `InputGroup` já especificado em `login-simples.md` (o `InputGroupInput` recebe `aria-invalid`, o `FieldError` fica fora do `InputGroup`, abaixo dele, do mesmo jeito).
  `FieldError` (`field.tsx`) já tem `role="alert"` embutido — cada mensagem se anuncia sozinha quando aparece, sem precisar de `aria-live` adicional.

### Foco no primeiro campo inválido (estados 1 e 2)

- Ao falhar a validação client-side, mover o foco programaticamente pro primeiro `Input`/`InputGroupInput` com erro (e-mail antes de senha) — mesmo princípio de gerenciamento de foco já usado no banner do estado 3, só que aplicado ao campo em vez do banner. Não existe peça nova aqui: é comportamento (`ref` + `.focus()`), não componente.

### Reaproveitado sem alteração de `login-simples.md`

- `Card`/`CardHeader`/`CardTitle`/`CardDescription`/`CardContent`/`CardFooter` (painel).
- Checkbox "Manter-me conectado" + Label.
- Link "Esqueci minha senha" (`Button variant="link" asChild` + `next/link`).
- Botão de envio (`Button type="submit" fullWidth`) e seu estado de carregamento (`Spinner` + região `aria-live`).
- Botão de mostrar/ocultar senha (`InputGroupButton` + `EyeIcon`/`EyeOffIcon`).

## Navegação

| Ação/link | Destino | Observação |
|---|---|---|
| Botão "Entrar" — reenvio com sucesso | `/templates/selecao-perfil-corretora` | Mesmo destino de sucesso de `login-simples`. |
| Botão "Entrar" — ainda inválido (novo erro) | Permanece em `/templates/login-erro-validacao` | Não navega — só atualiza o estado de erro exibido nesta mesma rota. |
| Link "Esqueci minha senha" | `/templates/recuperacao-senha` | Igual a `login-simples` — relevante principalmente aqui, já que é comum o usuário desistir de lembrar a senha depois de errar. |
| Texto "Fale com o suporte da sua corretora" (CardFooter) | Nenhum — fora do fluxo | Igual a `login-simples`. |

## Requisitos de acessibilidade específicos desta tela

1. **Banner de credenciais incorretas**: `Alert` já anuncia via `role="alert"` nativo — não duplicar com `aria-live` adicional em volta dele (diferente do estado de carregamento, que usa `aria-live` porque o `Button`/`Spinner` sozinho não anunciaria). Foco programático no `AlertTitle` (`tabIndex={-1}` + `.focus()`) é obrigatório — sem isso, quem usa teclado/leitor de tela permanece com foco no botão "Entrar" sem saber que a tela mudou.
2. **Mensagens de erro por campo (`FieldError`)**: cada `Input`/`InputGroupInput` inválido precisa de `aria-invalid="true"` E `aria-describedby` apontando pro `id` do `FieldError` correspondente — só o `role="alert"` do `FieldError` não é suficiente pra quem navega diretamente pro campo (ex: Tab a partir de outro ponto da página) associar o campo ao motivo do erro.
3. **Não sobrepor os dois tipos de erro sem necessidade**: se o backend rejeitar credenciais (estado 3), os campos em si NÃO devem ficar com `aria-invalid`/`FieldError` individual ao mesmo tempo — o erro é da combinação, não de um campo isolado; marcar os dois campos como inválidos junto com o banner seria redundante e confundiria qual é a causa real do problema.
4. **Foco no primeiro campo com erro (estados 1 e 2)**: mesma lógica do item 1, aplicada ao campo em vez do banner — sem isso, o usuário com leitor de tela não sabe que o formulário não foi enviado nem por quê.
5. **Campo de senha limpo no estado 3**: ao limpar o valor do campo de senha programaticamente (boa prática de segurança), garantir que o foco não é perdido/jogado pro topo da página sem motivo — o foco vai pro banner de erro (item 1), não pro campo de senha vazio, então não há conflito, mas vale confirmar na implementação que o `.focus()` do banner roda DEPOIS da limpeza do valor, não antes (evitar leitura de estado inconsistente).
6. **Herda os requisitos já listados em `login-simples.md`**: autocomplete de credenciais, label do checkbox associado, link "Esqueci minha senha" como `<a>` real, ordem de foco visual, e o gap sistêmico do `CardTitle` não ser heading semântico — não repetidos aqui, mas continuam valendo nesta tela.

## Lacunas para o Rafael decidir (não resolvidas aqui)

- Confirmar a decisão de escopo tomada acima: "credenciais incorretas" (rejeição do backend) entrar nesta tela de "erro de validação" foi uma escolha por analogia/consistência de fluxo (não deixar essa lacuna sem tela nenhuma), não uma instrução explícita do plano. Se o Rafael preferir tratar isso como um "erro de autenticação" à parte (banner diferente, tela diferente, ou nem modelar), é um ajuste isolado nesta especificação, não propaga pra `login-simples`.
- Mesma lacuna de erro de sistema (rede/servidor) já registrada em `login-simples.md` — continua sem tela nem estado dedicado nas 5 rotas do fluxo.
