# Especificação de tela — Seleção de perfil/corretora

- **Slug:** `selecao-perfil-corretora` (`src/lib/templates-registry.ts`, hoje em `inProgressTemplates`; mover para `templatesList` só depois de construída)
- **Rota:** `src/app/templates/selecao-perfil-corretora/page.tsx`
- **Fluxo:** Fase 5A — Fluxo de login (`PLANO-LOOP-80-20-TEMPLATES.md`, seção "Fase 5 — Jornadas de telas (login + seguros) rumo ao Case público")
- **Posição no fluxo:** 4ª de 5 rotas — `login-simples → login-erro-validacao → recuperacao-senha → selecao-perfil-corretora → onboarding`
- **Referência de estilo/estrutura:** `src/app/templates/dashboard-financeiro/page.tsx` (título "Template — …" + parágrafo de contexto no topo, container `w-full rounded-lg border`) e, mais diretamente, `src/app/templates/login-simples/page.tsx` / `login-erro-validacao/page.tsx` / `recuperacao-senha/page.tsx` — mesmo Card `max-w-sm` (aqui um pouco mais largo, ver "Composição") centralizado num painel `bg-muted/30 min-h-[640px]`, mesmo Badge "Ambiente de demonstração", mesmo padrão de foco programático/`aria-live`.
- **Depende das especificações irmãs:** `.build/telas/login-simples.md` e `.build/telas/login-erro-validacao.md` — ver "Onde esta tela se encaixa" abaixo: diferente de `recuperacao-senha` (desvio sem autenticação), esta É a continuação do caminho de sucesso do login.

## Onde esta tela se encaixa

Diferente de `recuperacao-senha` (que é um desvio — quem chega lá não se autenticou), `selecao-perfil-corretora` **é** o destino do caminho feliz de login. Já verifiquei o código-fonte das duas telas anteriores e **não há lacuna de navegação a corrigir**:

- `login-simples/page.tsx` (linha 53): `router.push("/templates/selecao-perfil-corretora")` ao final do `setTimeout` de sucesso.
- `login-erro-validacao/page.tsx` (linha 140): mesmo destino, no ramo `if (senha === SENHA_DEMO_CORRETA)` do reenvio.

Ou seja, as duas telas anteriores **já apontam para este slug** desde que foram construídas (a própria spec de `login-simples.md`, seção "Navegação", já registrava isso como "próximo passo real do fluxo depois do login... rota ainda não construída"). Nada a ajustar nelas — esta tela só precisa existir na rota certa para o link parar de ser "morto".

Depois desta tela, o fluxo segue para `onboarding` (5ª e última rota de 5A, também ainda não construída — mesma situação que esta tela estava até agora: uma tela posterior referenciando um slug que ainda não tem rota).

## Objetivo da tela

Depois de autenticado, deixar o usuário escolher com qual combinação de **perfil** (papel de acesso — ex: Corretor, Gestor, Analista) e **corretora** (empresa vinculada) ele quer operar nesta sessão, antes de seguir para o onboarding — cobrindo o caso real de um usuário com vínculo a mais de uma corretora e/ou mais de um papel.

**Premissa de domínio assumida aqui** (comum em portais de corretagem de seguros, não instrução explícita do plano — sinalizada em "Lacunas"): o mesmo login pode ter acesso a múltiplas combinações perfil+corretora (ex: é Corretor numa corretora e Gestor em outra, ou tem dois vínculos de corretora diferentes). Se na prática o Rafael decidir que 1 login = 1 corretora sempre, esta tela vira um passo dispensável do fluxo — decisão de produto, não algo para o `telas-construtor` resolver sozinho.

## Estados que esta tela precisa cobrir

1. **Carregando (buscando vínculos)** — a tela chega aqui logo após a autenticação; antes de mostrar as opções, uma busca (fictícia, `setTimeout`) traz a lista de perfis/corretoras vinculados ao login. Lista de cards substituída por Skeleton no formato final (mesmo número de linhas do resultado real, ex.: 3).
2. **Lista carregada, nada selecionado** — 3 opções (ver composição) renderizadas como "choice cards" via `RadioGroup`, nenhuma marcada por padrão, botão "Continuar" habilitado mas bloqueado por validação (ver estado 4) — decisão tomada aqui: não pré-selecionar nenhuma opção automaticamente mesmo quando há só 1 resultado possível, para o usuário sempre confirmar explicitamente com qual vínculo está entrando (justamente o objetivo da tela).
3. **Selecionando** — usuário clica em qualquer parte de um card (não só no círculo do rádio) e a seleção muda; card selecionado ganha destaque de borda/fundo (mecanismo nativo do `FieldLabel`, ver Composição).
4. **Erro de validação (nada selecionado ao continuar)** — usuário clica em "Continuar" sem escolher nenhuma opção: mensagem inline abaixo do grupo de opções, foco movido para o primeiro rádio do grupo.
5. **Erro ao carregar a lista** — a busca de vínculos falha (rede/backend fictício): `Alert` destrutivo substitui a lista de cards, com botão "Tentar novamente" que repete o estado 1.
6. **Vazio (sem vínculo algum)** — a busca retorna sem nenhum perfil/corretora associado ao login (edge case real: conta criada mas acesso ainda não liberado por nenhuma corretora): `Empty` state com orientação de contato com o suporte, sem opção de continuar.
7. **Enviando seleção (confirmando)** — depois de clicar "Continuar" com uma opção válida marcada: card selecionado e demais opções desabilitados, botão mostra Spinner + "Continuando...", região `aria-live` anuncia a mudança — mesmo padrão dos botões de submit das 3 telas irmãs.
8. **Sucesso** — fim do carregamento: navega para `/templates/onboarding`. Não há "card de sucesso" fixo nesta tela (mesmo princípio já usado em `login-simples`: sucesso = navegação, não estado visual que permanece).

Fora de escopo, registrar como responsabilidade de fora destas 5 telas:
- Indisponibilidade de servidor / erro genérico de rede na confirmação (estado 7 falhando) → mesma lacuna sistêmica já registrada em `login-simples.md`/`login-erro-validacao.md`/`recuperacao-senha.md`: nenhuma das telas do fluxo modela erro de sistema na etapa final de confirmação, só na etapa de carregamento inicial (estado 5 desta tela cobre só a *busca* falhar, não a *confirmação* falhar).
- Persistir a seleção (perfil+corretora escolhidos) para a sessão real além desta tela → ver "Lacunas".

## Composição — só peças reais do catálogo

Nenhum componente novo. Tudo abaixo já existe em `src/components/ui/` (Atoms/Molecules/Organisms confirmados em `src/lib/atomic-registry.ts`).

### Layout da página (moldura, mesmo padrão das telas irmãs)

- `<h1>` "Template — Seleção de perfil/corretora" + parágrafo `text-muted-foreground` de contexto.
- Container `w-full rounded-lg border` com `div` interno `bg-muted/30 flex min-h-[640px] items-center justify-center p-6` — mesma moldura de `login-simples`/`login-erro-validacao`/`recuperacao-senha` (sem sidebar, sem navegação do portal — o usuário ainda não "entrou" no portal de fato).

### Painel — Organism `card.tsx`

- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter` — largura um pouco maior que as telas irmãs (`max-w-md` em vez de `max-w-sm`), porque o conteúdo são cards de opção com descrição, não só campos de formulário de 1 coluna estreita.
  - `CardHeader`: `Badge variant="outline"` "Ambiente de demonstração" (Atom `badge.tsx`, igual às telas irmãs) + círculo de ícone decorativo (`bg-primary/10 text-primary`) com `UserCogIcon` (lucide-react — confirmar em `lucide-react.d.ts` antes de usar; ícone diferente de `ShieldCheckIcon`/`KeyRoundIcon`/`MailCheckIcon` já usados nas telas irmãs, para reforçar que esta etapa é "escolher identidade", não autenticar).
  - `CardTitle` "Escolha como continuar" + `CardDescription` "Você tem acesso a mais de um perfil ou corretora — selecione com qual deseja continuar".

### Estado 1 — Carregando

- 3× Atom `skeleton.tsx` (`Skeleton`) no formato aproximado de um choice card (`h-[76px] w-full rounded-md`, empilhados com o mesmo `gap-3` do `RadioGroup` real, para não haver salto de layout ao trocar para a lista carregada).
- Região `aria-live="polite"` + `className="sr-only"`: "Carregando perfis disponíveis..." — obrigatório porque `Skeleton` (`skeleton.tsx`) é um `<div>` puramente decorativo, sem nenhum `aria-*`/`role` embutido (confirmado lendo o componente-fonte), então não anuncia nada sozinho.

### Estados 2-4 — Lista de opções (choice cards)

Composição validada por um exemplo já existente no catálogo (`src/components/examples/field-choice-card.tsx`) — não é uma composição inventada para esta tela, é o padrão "radio como cartão selecionável" que o próprio `field.tsx` já suporta nativamente via `has-data-[state=checked]:border-primary` embutido no `FieldLabel`.

- Molecule `field.tsx`: `FieldSet` (semântica de `<fieldset>`) envolvendo `FieldLegend` (texto "Perfil e corretora") + Atom `radio-group.tsx` (`RadioGroup`).
- Cada opção: `FieldLabel` (envolve o `Field` inteiro — clique em qualquer parte da opção seleciona, não só no círculo) → `Field orientation="horizontal"` → `FieldContent` (`FieldTitle` + `FieldDescription`) + Atom `avatar.tsx` (`Avatar`, `AvatarFallback` com iniciais da corretora) + Atom `radio-group.tsx` (`RadioGroupItem`).

  ```
  <FieldSet>
    <FieldLegend variant="label">Perfil e corretora</FieldLegend>
    <RadioGroup value={selecionado} onValueChange={setSelecionado}>
      <FieldLabel htmlFor="opcao-1">
        <Field orientation="horizontal">
          <Avatar>
            <AvatarFallback>CA</AvatarFallback>
          </Avatar>
          <FieldContent>
            <FieldTitle>
              Corretor
              <Badge variant="secondary">Corretora Alfa Seguros</Badge>
            </FieldTitle>
            <FieldDescription>
              Acesso completo às apólices e sinistros da Corretora Alfa Seguros
            </FieldDescription>
          </FieldContent>
          <RadioGroupItem value="corretor-alfa" id="opcao-1" />
        </Field>
      </FieldLabel>
      {/* + 2 opções no mesmo padrão, ex.: Gestor · Corretora Beta Corretagem,
          Analista · Corretora Alfa Seguros — mesma corretora, papel diferente,
          para deixar claro que a chave é a COMBINAÇÃO perfil+corretora, não
          só a corretora */}
    </RadioGroup>
  </FieldSet>
  ```

  Dados de exemplo sugeridos (fictícios, sem CPF/CNPJ/dado real — respeita o risco já anotado na Fase 5 do plano): "Corretor · Corretora Alfa Seguros", "Gestor · Corretora Beta Corretagem", "Analista · Corretora Alfa Seguros".

- Atom `badge.tsx` (`variant="secondary"`) dentro de `FieldTitle` para o nome da corretora — **decisão de acessibilidade**: o nome da corretora também precisa estar no texto corrido de `FieldDescription` (não só dentro do badge), porque um badge sozinho não pode ser o único portador de uma informação que diferencia as opções (ver "Requisitos de acessibilidade").
- **Erro de validação (estado 4)**: Molecule `field.tsx` (`FieldError`, já tem `role="alert"` embutido) logo abaixo do `RadioGroup`, dentro do mesmo `FieldSet`: "Selecione um perfil para continuar." Foco movido programaticamente para o primeiro `RadioGroupItem` do grupo ao falhar (não para a mensagem de erro — em um `radiogroup`, mover o foco para dentro do próprio grupo é o padrão esperado, diferente do banner de `login-erro-validacao` que não tem um controle de formulário "óbvio" para focar).

### Estado 5 — Erro ao carregar a lista

- Molecule `alert.tsx` (`Alert variant="destructive"`, `AlertTitle`, `AlertDescription`) no lugar do `RadioGroup`, mesmo padrão de foco já usado em `login-erro-validacao`/`recuperacao-senha` (`ref` + `tabIndex={-1}` + `.focus()` no `AlertTitle`):
  ```
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
- Atom `button.tsx` (`Button variant="outline"`, `RotateCcwIcon`) "Tentar novamente" — repete a busca fictícia (volta ao estado 1).

### Estado 6 — Vazio (sem vínculo)

- Molecule `empty.tsx` (`Empty`, `EmptyHeader`, `EmptyMedia variant="icon"`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`) no lugar do `RadioGroup`:
  ```
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <UserXIcon />
      </EmptyMedia>
      <EmptyTitle>Nenhum acesso liberado</EmptyTitle>
      <EmptyDescription>
        Sua conta ainda não tem perfil ou corretora vinculados. Fale com o
        suporte da sua corretora para liberar o acesso.
      </EmptyDescription>
    </EmptyHeader>
  </Empty>
  ```
  Sem `EmptyContent`/CTA de ação (nenhuma tela de suporte existe na Fase 5 — mesma decisão já tomada em `login-simples` para o texto do `CardFooter`: informativo, não um link para lugar nenhum).

### Ações finais (`CardFooter`, presente nos estados 2-4)

- Atom `button.tsx` (`Button type="submit" fullWidth`) "Continuar":
  - Padrão: `<ArrowRightIcon />` + "Continuar".
  - Carregando (estado 7): `disabled`, `<Spinner />` + "Continuando...", região `aria-live="polite"` `sr-only` — mesmo padrão das 3 telas irmãs.
  - `disabled` também quando nenhuma opção está marcada seria uma alternativa a validar-no-clique (estado 4) — **decisão tomada aqui**: manter habilitado e validar no clique (mesmo padrão de `recuperacao-senha`/`login-erro-validacao`, que sempre deixam o botão clicável e mostram erro inline), em vez de desabilitar sem explicação — desabilitar sem dizer o motivo é pior para quem usa leitor de tela (não fica claro por que o botão "não funciona").
- Atom `button.tsx` (`Button variant="link"`, `asChild` + `next/link`) "Usar outra conta" com `ArrowLeftIcon` — mesma solução de link real (`<a href>`) já usada em "Voltar para login" (`recuperacao-senha`).

## Navegação

| Ação/link | Destino | Observação |
|---|---|---|
| Chegada nesta tela (login bem-sucedido) | — | Já cablada: `login-simples` e `login-erro-validacao` navegam para `/templates/selecao-perfil-corretora` desde que foram construídas — nada a alterar nelas. |
| Botão "Continuar" — opção selecionada (sucesso) | `/templates/onboarding` | Próxima e última rota do fluxo 5A. Rota ainda não construída (`inProgressTemplates`) — mesma situação que esta tela estava até agora. |
| Botão "Continuar" — nada selecionado | Permanece em `/templates/selecao-perfil-corretora` | Só exibe o erro de validação (estado 4), sem navegar. |
| Botão "Tentar novamente" (estado de erro ao carregar) | Permanece em `/templates/selecao-perfil-corretora` | Refaz a busca fictícia, volta ao estado 1 (carregando). |
| Link "Usar outra conta" | `/templates/login-simples` | Sai do fluxo de seleção e volta ao início do login — mesmo princípio do link "Voltar para login" de `recuperacao-senha`, para quem entrou com a conta errada. |

## Requisitos de acessibilidade específicos desta tela

1. **Agrupamento semântico real do conjunto de opções**: usar `FieldSet` (`<fieldset>`) + `FieldLegend` (`<legend>`) envolvendo o `RadioGroup`, não só uma pilha de `div`s clicáveis — sem isso, um leitor de tela não anuncia "grupo de opções: Perfil e corretora, 3 itens" ao entrar na região, só uma lista solta de rádios sem contexto.
2. **Alvo de clique/toque do card inteiro, não só o círculo do rádio**: `FieldLabel` precisa envolver o `Field` inteiro (padrão já confirmado em `src/components/examples/field-choice-card.tsx`) para que clicar em qualquer parte do card (título, descrição, avatar) marque a opção — importante para quem tem baixa precisão motora, não só para quem usa mouse.
3. **A informação que diferencia as opções não pode depender só de cor/badge**: o nome da corretora aparece dentro de um `Badge` (cor de destaque) mas **também** precisa estar no texto corrido do `FieldDescription` de cada opção — se o badge fosse a única fonte da informação, falharia o critério de "não usar só cor" (WCAG 1.4.1) para quem não percebe a diferenciação visual do badge.
4. **Estado selecionado não depende só da borda/fundo destacados**: o destaque visual (`has-data-[state=checked]:border-primary`, embutido no `FieldLabel`) é redundante com o estado real de seleção do `role="radio"` (`aria-checked`, nativo do Radix `RadioGroupItem`) — ou seja, já está corretamente implementado sem trabalho extra; só confirmar na auditoria que nenhum `className` customizado sobrescreve essa classe do `FieldLabel`.
5. **Erro de validação (estado 4)**: `FieldError` já tem `role="alert"` embutido (`field.tsx`) — não precisa de `aria-live` adicional ao redor dele. Mas o foco programático ao falhar deve ir para o **primeiro `RadioGroupItem` do grupo** (não para a mensagem de erro), porque o controle que o usuário precisa corrigir é a seleção em si, dentro de um `radiogroup` — replicar o `ref`/`.focus()` num dos itens do grupo, não um `bannerRef` genérico como nas telas irmãs.
6. **Estado de carregamento (estado 1)**: `Skeleton` não tem nenhuma semântica própria (confirmado no código-fonte — `<div>` puro, sem `aria-busy`/`role="status"`) — obrigatório acompanhar com uma região `aria-live="polite"` `sr-only` textual ("Carregando perfis disponíveis..."), mesmo padrão já usado nos estados de carregamento das 3 telas irmãs.
7. **Erro ao carregar a lista (estado 5)**: foco programático no `AlertTitle` ao entrar nesse estado (`ref` + `tabIndex={-1}` + `.focus()`), mesmo mecanismo já auditado em `login-erro-validacao`/`recuperacao-senha` — sem isso, quem usa leitor de tela permanece com foco em qualquer controle anterior e não é avisado de que a busca falhou.
8. **Gap conhecido do catálogo, não introduzido por esta tela**: `EmptyTitle` (`empty.tsx`) renderiza uma `<div>`, não um heading semântico (mesmo padrão de `CardTitle` já registrado como gap sistêmico em `login-simples.md`) — o estado 6 (vazio) fica sem heading real de seção. Não é um problema exclusivo desta tela (qualquer Pattern/Template que já usa `Empty` tem o mesmo gap) — registrar, não corrigir isoladamente aqui.
9. **Botão "Continuar" nunca fica `disabled` sem explicação**: manter clicável mesmo sem seleção e validar no clique (ver Composição) é, em si, um requisito de acessibilidade — um botão `disabled` sem motivo comunicado deixa quem usa leitor de tela sem saber por que a ação "não funciona".
10. **Link "Usar outra conta"**: precisa renderizar como `<a href>` de verdade (`Button asChild` + `next/link`), mesma exigência já auditada nas telas irmãs para "Esqueci minha senha"/"Voltar para login".

## Lacunas para o Rafael decidir (não resolvidas aqui)

- **Premissa "1 login pode ter múltiplos vínculos perfil+corretora"**: assumida aqui por ser o cenário mais rico para demonstrar o catálogo (choice cards, `Empty`, erro de carregamento) — se o modelo real do produto for sempre 1:1, esta tela deixa de fazer sentido como etapa obrigatória do fluxo (viraria um redirecionamento automático direto para `onboarding`, sem escolha nenhuma).
- **Persistência da seleção**: hoje a escolha de perfil/corretora fica só no estado local desta rota — ao navegar para `/templates/onboarding`, nada é passado adiante (nem query param, nem contexto React). Num produto real isso precisaria virar sessão/contexto; como `onboarding` ainda não foi especificado, deixo essa decisão para a spec daquela tela (ou para o Rafael, se quiser resolver antes).
- **Ausência de campo de busca/filtro**: a lista de exemplo tem só 3 opções, então não incluí nenhum mecanismo de busca. Se o cenário real tiver dezenas de corretoras vinculadas a um mesmo login, a composição `input-group.tsx` (`InputGroup` + `InputGroupInput` + `InputGroupAddon` com `SearchIcon`, mesmo padrão já usado no Pattern `search-experience.tsx`) resolveria sem componente novo — mas decidi não incluir por padrão, para não inflar a tela além do que o objetivo pede.
- **Erro de sistema na confirmação (estado 7 falhando)**: mesma lacuna já registrada nas 3 telas irmãs — só a busca inicial (estado 5) modela falha; a confirmação da escolha (clique em "Continuar") sempre é tratada como bem-sucedida nesta especificação.
