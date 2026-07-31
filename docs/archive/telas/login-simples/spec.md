# Especificação de tela — Login simples

- **Slug:** `login-simples` (`src/lib/templates-registry.ts`, hoje em `inProgressTemplates`; mover para `templatesList` só depois de construída)
- **Rota:** `src/app/templates/login-simples/page.tsx`
- **Fluxo:** Fase 5A — Fluxo de login (`PLANO-LOOP-80-20-TEMPLATES.md`, seção "Fase 5 — Jornadas de telas (login + seguros) rumo ao Case público")
- **Posição no fluxo:** 1ª de 5 rotas — `login-simples → login-erro-validacao → recuperacao-senha → selecao-perfil-corretora → onboarding`
- **Referência de estilo/estrutura:** `src/app/templates/dashboard-financeiro/page.tsx` (título "Template — …" + parágrafo de contexto no topo, depois o container `w-full rounded-lg border` com a composição real)

## Onde esta tela se encaixa

`login-simples` é a **entrada** do fluxo — não existe tela anterior dentro da Fase 5 (quem chega aqui vem de fora do escopo: link direto, app nativo, etc.). É a versão "feliz" da tela de login: formulário de e-mail/senha, sem exibir erro de validação — isso é explicitamente responsabilidade da próxima tela (`login-erro-validacao`, mesma tela em outro estado). Depois do login bem-sucedido, o fluxo segue para `selecao-perfil-corretora` (o usuário escolhe com qual corretora/perfil está operando); `recuperacao-senha` só é alcançada pelo link "Esqueci minha senha" desta tela, fora do caminho principal de sucesso.

## Objetivo da tela

Permitir que o corretor autentique com e-mail e senha para acessar o portal — a tela precisa deixar claro que a autenticação está em andamento e levar, em caso de sucesso, para a etapa de seleção de perfil/corretora.

## Estados que esta tela precisa cobrir

Só os estados pertinentes ao caminho feliz — **erro de validação de campo e erro de credenciais NÃO fazem parte desta tela** (são o objeto da tela `login-erro-validacao`, mesmo componente em outro estado visual).

1. **Vazio/inicial** — campos "E-mail" e "Senha" vazios, foco inicial no campo de e-mail, senha oculta por padrão (`type="password"`), botão "Entrar" habilitado (a validação de campo obrigatório fica a cargo do HTML5 `required`/browser nesta tela; validação customizada com feedback visual é da próxima tela do fluxo).
2. **Preenchendo** — usuário digitando normalmente nos dois campos; nenhum estado visual especial além do foco padrão do Input.
3. **Senha oculta / senha visível** — alternância via botão de olho dentro do campo de senha (`type="password"` ↔ `type="text"`).
4. **"Manter-me conectado" marcado/desmarcado** — estado binário do Checkbox, sem impacto em outro elemento da tela.
5. **Carregando (enviando)** — depois do clique em "Entrar": campos e botão desabilitados (evita duplo envio), botão mostra Spinner + texto "Entrando...", região `aria-live` anuncia a mudança para quem usa leitor de tela.
6. **Sucesso** — fim do carregamento com credenciais válidas: navega para `selecao-perfil-corretora`. (Não há um "card de sucesso" nesta tela — sucesso = navegação, não um estado visual que fica na tela.)

Fora de escopo, registrar como responsabilidade de outra tela:
- Credenciais inválidas / campo vazio submetido → estado visual fica em `login-erro-validacao`.
- Indisponibilidade de servidor / erro genérico de rede → não coberto por nenhuma das 5 telas do fluxo hoje; **lacuna a registrar para o Rafael decidir** (hoje o fluxo só modela erro de validação, não erro de sistema).

## Composição — só peças reais do catálogo

Nenhum componente novo. Tudo abaixo já existe em `src/components/ui/` (Atoms/Molecules/Organisms confirmados em `src/lib/atomic-registry.ts`).

### Layout da página (moldura, mesmo padrão do Template de referência)

- `<h1>` "Template — Login simples" + parágrafo `text-muted-foreground` de contexto, igual ao cabeçalho de `dashboard-financeiro/page.tsx`.
- Container `w-full rounded-lg border` envolvendo a tela simulada, com um `div` interno centralizador (`flex min-h-[640px] items-center justify-center`, tom `bg-muted/30` ou equivalente em token) — o "fundo" da tela de login de verdade, sem sidebar (login não tem navegação do portal ainda).

### Painel de login

- **Organism `card.tsx`** (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`) — painel central, largura máxima tipo `max-w-sm`.
  - `CardHeader`: ícone decorativo (`ShieldCheckIcon` do lucide-react, confirmado em `lucide-react.d.ts`) + `CardTitle` "Entrar" + `CardDescription` "Acesse o portal com sua conta de corretor".
  - **Decisão de branding:** usar um ícone genérico do domínio de seguros (`ShieldCheckIcon`), **não** o logo "R.ds" (`r-logo.tsx`) — aquele é a marca do próprio design system/navegação do app, não da "corretora fictícia" simulada dentro da tela; misturar os dois confundiria as duas identidades.

- **Campo de e-mail** — Molecule `field.tsx` (`Field`, `FieldLabel`) envolvendo Atom `input.tsx` (`Input`):
  ```
  <Field>
    <FieldLabel htmlFor="email">E-mail corporativo</FieldLabel>
    <Input id="email" type="email" placeholder="nome@corretora.com.br"
           autoComplete="username" required />
  </Field>
  ```

- **Campo de senha** — Molecule `field.tsx` (`Field`, `FieldLabel`) envolvendo Molecule `input-group.tsx` (`InputGroup`, `InputGroupInput`, `InputGroupAddon`, `InputGroupButton`) para o botão de mostrar/ocultar senha:
  ```
  <Field>
    <FieldLabel htmlFor="senha">Senha</FieldLabel>
    <InputGroup>
      <InputGroupInput id="senha" type={visivel ? "text" : "password"}
                        autoComplete="current-password" required />
      <InputGroupAddon align="inline-end">
        <InputGroupButton type="button" size="icon-xs"
                           aria-label={visivel ? "Ocultar senha" : "Mostrar senha"}
                           aria-pressed={visivel}
                           onClick={() => setVisivel(v => !v)}>
          {visivel ? <EyeOffIcon /> : <EyeIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  </Field>
  ```
  `EyeIcon`/`EyeOffIcon` confirmados em `lucide-react.d.ts` (aliases com sufixo "Icon", mesma convenção já usada em `dashboard-financeiro/page.tsx` para `WalletIcon`/`BellIcon`).

- **Linha "Manter-me conectado" + "Esqueci minha senha"** (`flex justify-between items-center`):
  - Atom `checkbox.tsx` (`Checkbox`) + Atom `label.tsx` (`Label htmlFor`) — "Manter-me conectado".
  - Link para `recuperacao-senha`: **não existe Atom "Link" formal no catálogo** (`Link` está em `inProgressEntries` de `atomic-registry.ts`, "em construção"). Usar Atom `button.tsx` (`Button variant="link"`) com `asChild` envolvendo `next/link` `<Link href="/templates/recuperacao-senha">`, mesma solução usada para navegação real em Templates — resulta numa tag `<a>` de verdade, não um `<button onClick>`.

- **Botão de envio** — Atom `button.tsx` (`Button type="submit" fullWidth`):
  - Estado padrão: `<LogInIcon />` + "Entrar" (via prop `icon`/`label` da API nova do Button, ou `children` livre).
  - Estado carregando: `disabled`, conteúdo troca para `<Spinner />` (Atom `spinner.tsx`) + "Entrando...", mesmo padrão já usado no Pattern `loading.tsx` (`src/components/patterns/loading.tsx`) — Spinner como filho do Button, não um Button dedicado novo.
  - Região auxiliar `aria-live="polite"` + `className="sr-only"` anunciando "Entrando..." durante o carregamento, replicando o mesmo padrão de `loading.tsx` (`<p aria-live="polite" className="sr-only">`).

- **`CardFooter`** (opcional, informativo): texto `text-muted-foreground text-sm` "Ainda não tem acesso? Fale com o suporte da sua corretora." — **fora do fluxo** (não existe tela de contato/suporte na Fase 5); manter como texto estático, não como link, para não sugerir uma navegação que não existe.

### Peça opcional (não obrigatória, sinalizar como sugestão)

- Atom `badge.tsx` (`Badge variant="outline"`) "Ambiente de demonstração" no topo do painel — mesmo espírito do badge "Aguardando conexão" no card "QR connect" do `dashboard-financeiro`. Não é essencial ao objetivo da tela; incluir só se ajudar a deixar claro que os dados são fictícios (risco já anotado na Fase 5 do plano).

## Navegação

| Ação/link | Destino | Observação |
|---|---|---|
| Botão "Entrar" — credenciais válidas (sucesso) | `/templates/selecao-perfil-corretora` | Próximo passo real do fluxo depois do login. Rota ainda não construída (`inProgressTemplates`). |
| Botão "Entrar" — credenciais inválidas | `/templates/login-erro-validacao` | É a MESMA tela de login em outro estado (não implementado nesta rota) — a navegação para lá representa a demonstração do estado de erro como tela separada, seguindo o padrão de 1 rota por estado já adotado neste projeto. **Hipótese, não certeza** — sinalizar para o Rafael confirmar se é isso mesmo que ele quer (rota separada por estado) ou se prefere um único componente com toggle de estado. |
| Link "Esqueci minha senha" | `/templates/recuperacao-senha` | Rota ainda não construída. |
| Texto "Fale com o suporte da sua corretora" (CardFooter) | Nenhum — fora do fluxo | Não existe tela de suporte na Fase 5; manter como texto estático, não como link clicável, para não prometer uma navegação inexistente. |

## Requisitos de acessibilidade específicos desta tela

1. **Botão de mostrar/ocultar senha**: precisa ser um `<button>` real (via `InputGroupButton`, que já usa Atom `Button` por baixo — foco por Tab, ativação por Enter/Espaço garantidos), com `aria-label` alternando entre "Mostrar senha"/"Ocultar senha" e `aria-pressed` refletindo o estado atual. Clicar no botão não pode tirar o foco do campo de senha nem limpar o valor digitado — `InputGroupAddon` já delega foco corretamente para o input quando o clique não é num botão (`input-group.tsx`), então checar que esse comportamento não quebra quando o alvo do clique É o botão de olho.
2. **Estado de carregamento**: a região `aria-live="polite"` (`sr-only`) precisa ser a única fonte de anúncio da mudança "Entrando..." — o `Spinner` embutido no Button já carrega `role="status" aria-label="Loading"` (`spinner.tsx`); avaliar se isso causa anúncio duplicado (spinner + região aria-live) e, se sim, aplicar `aria-hidden` no Spinner quando usado dentro do Button (mesmo risco existe hoje no Pattern `loading.tsx`, mas vale confirmar aqui especificamente porque é o primeiro caso de "loading dentro de fluxo de autenticação").
3. **Campos com autocomplete correto**: `autoComplete="username"` no e-mail e `autoComplete="current-password"` na senha — não é só UX, é requisito de acessibilidade para quem depende de gerenciador de senha/preenchimento automático assistido.
4. **Checkbox "Manter-me conectado"**: `Label` associado via `htmlFor`/`id` (não só texto solto ao lado) para o nome acessível do controle ser lido corretamente pelo leitor de tela.
5. **Link "Esqueci minha senha"**: precisa renderizar como `<a href>` de verdade (via `Button asChild` + `next/link`), não como `<button onClick={router.push(...)}>` — mudar de rota deve continuar funcionando com atalhos nativos de navegador/leitor de tela (abrir em nova aba, listar links da página, etc.).
6. **Ordem de foco (tab order)**: deve seguir a ordem visual — e-mail → senha → botão de olho (dentro do campo de senha) → "Manter-me conectado" → "Esqueci minha senha" → "Entrar". Como os campos já vêm empilhados em DOM na mesma ordem visual, não deveria precisar de `tabIndex` manual — mas confirmar que o botão de olho embutido no `InputGroup` não quebra essa sequência.
7. **Gap conhecido do Card, não exclusivo desta tela**: `CardTitle` (`card.tsx`) renderiza uma `<div>`, não um heading semântico (`<h1>`-`<h6>`) — então "Entrar" não é anunciado como título de seção por leitores de tela. Isso já é um comportamento sistêmico de todo uso de `Card` no projeto (inclusive `dashboard-financeiro`), não um problema introduzido por esta tela — registrar a observação, mas não é bloqueante corrigir só aqui sem alinhar com o resto do catálogo.
8. **Nome acessível da página**: o `<h1>` "Template — Login simples" do cabeçalho de documentação (mesmo padrão do `dashboard-financeiro`) é o único heading de nível 1 da rota — não deveria haver conflito. Se o Rafael decidir depois que as rotas de Templates precisam de um `<title>` de página específico por rota (hoje o `layout.tsx` só define "R.ds" fixo), isso é uma melhoria de navegação por abas/rotor de leitor de tela que vale para as 8 telas da Fase 5 inteira, não só esta — registrar como possível item futuro, não requisito bloqueante desta tela isoladamente.

## Lacunas para o Rafael decidir (não resolvidas aqui)

- Não existe tratamento de erro de sistema (servidor indisponível, timeout) em nenhuma das 5 telas do fluxo de login planejadas — só erro de validação (`login-erro-validacao`). Se isso importar para o case público, é uma 6ª tela ou um estado a mais, fora do escopo definido até aqui.
- A hipótese de que "credenciais inválidas" navega para a rota separada `login-erro-validacao` (em vez de ser um estado alternável na mesma rota `login-simples`) não estava explícita no plano — decidida aqui por analogia com o padrão já usado no projeto (1 rota por estado, como Loading/Error State/Skeleton nos Patterns). Confirmar com o Rafael antes do `telas-construtor` assumir isso como definitivo.
