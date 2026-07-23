# Diagnóstico final — `selecao-perfil-corretora`

- **Slug:** `selecao-perfil-corretora` (4ª de 5 rotas do fluxo 5A — `PLANO-LOOP-80-20-TEMPLATES.md`, Fase 5)
- **Arquivos revisados:** `.build/telas/selecao-perfil-corretora.md` (spec), `.build/telas/acessibilidade-selecao-perfil-corretora.md` (auditoria), `src/app/templates/selecao-perfil-corretora/page.tsx` (código), `src/lib/templates-registry.ts` (registro).
- **Confrontado com:** `src/lib/components-registry.ts`, telas vizinhas (`login-simples`, `login-erro-validacao`).
- **Não editei nada em `src/`.** Este diagnóstico é só para o Rafael aprovar ou pedir retrabalho.

---

## Veredito

**PRONTA — com uma decisão de engenharia para o Rafael ratificar explicitamente (não é bloqueante, não é retrabalho).**

A tela cumpre a spec, passa nos 10 requisitos de acessibilidade específicos, usa só peças reais do catálogo, não tem cor/espaçamento hardcoded fora de token, está corretamente registrada e referencia corretamente as telas vizinhas do fluxo. Não há bloqueantes.

O único ponto que exige decisão do Rafael antes de seguir é o **`Select` "Cenário da busca (demonstração)"** que o `telas-construtor` adicionou por conta própria (fora da spec) para tornar os estados 5 e 6 demonstráveis — ver seção 4. Minha avaliação: **é aceitável e bem contido**, mas como foi uma escolha de engenharia não prevista, merece o seu "de acordo" formal e uma correção de processo para as próximas telas com muitos estados de backend.

---

## 1. Consistência com o design system — OK

| Verificação | Resultado |
|---|---|
| Só componentes reais do catálogo | **OK** — os 12 componentes importados (Alert, Avatar, Badge, Button, Card, Empty, Field, Label, RadioGroup, Select, Skeleton, Spinner) constam em `components-registry.ts`. Nenhum componente novo criado, nenhum Pattern instanciado diretamente. Composição de choice card é o padrão já validado em `src/components/examples/field-choice-card.tsx`. |
| Cores/espaçamentos por token | **OK** — só tokens/escala Tailwind: `bg-muted/30`, `bg-primary/10`, `text-primary`, `text-muted-foreground` e o `text-destructive` herdado de `Field`/`Alert`. A auditoria confirmou: nenhum `#`/`rgb(`/`text-[`/`bg-[` no arquivo. |
| Valores arbitrários (`min-h-[640px]`, `h-[76px]`) | **OK, por spec** — `min-h-[640px]` é a dimensão da moldura da tela simulada (igual às irmãs); `h-[76px]` é a altura do `Skeleton` calibrada para casar com o choice card real e evitar salto de layout — ambos explicitamente previstos na spec (seções "Layout da página" e "Estado 1"). Nenhum é cor nem quebra de token de tema. |
| `templates-registry.ts` atualizado | **OK** — `selecao-perfil-corretora` está em `templatesList` (linha 19) e **não** aparece mais em `inProgressTemplates` (removido; sobram lá só `onboarding` e as 3 telas de 5B). Movimentação concluída como a spec exigia. |
| Padrão de moldura "Template — …" | **OK** — `<h1>` + parágrafo `text-muted-foreground` + container `w-full rounded-lg border`, igual às telas irmãs / `dashboard-financeiro`. Card `max-w-md` (um pouco mais largo que o `max-w-sm` das irmãs) é decisão documentada na spec, justificada pelo conteúdo de choice cards com descrição. |
| Reuso das telas irmãs | **OK** — mesmo Badge "Ambiente de demonstração", mesmo padrão de `aria-live` e foco programático; ícone `UserCogIcon`/`UserXIcon` diferencia "escolher identidade" de "autenticar", como a spec pediu. |

---

## 2. Acessibilidade — sem bloqueantes

A auditoria (`.build/telas/acessibilidade-selecao-perfil-corretora.md`) aprovou os 10 requisitos específicos da spec. Revisando a severidade de cada item não-"Passa limpo":

| Item da auditoria | Severidade | Justificativa |
|---|---|---|
| **5 — `aria-describedby="selecao-erro"` está no `RadioGroup` raiz, não no `RadioGroupItem` que recebe o foco** | **Ajuste menor** — não bloqueante | `aria-describedby` não é herdado de ancestral pela árvore de acessibilidade, então a descrição pode não ser anunciada ao focar o rádio. **Mas** o requisito central já está garantido de outra forma: o `FieldError` tem `role="alert"` nativo e anuncia "Selecione um perfil para continuar." de forma confiável, independente da posição do foco. Adição bem-intencionada de efeito prático limitado, não uma falha do requisito. |
| **8 — `EmptyTitle` renderiza `<div>`, não heading semântico** | **Ajuste menor / sistêmico** — não bloqueante | "Nenhum acesso liberado" (estado vazio) não é anunciado como heading de seção. É o **mesmo** gap sistêmico já registrado em `CardTitle` nas 3 telas irmãs — qualquer template que usa `Empty` herda. Corrigir só aqui geraria inconsistência com o catálogo. A página tem `<h1>` real como âncora. |
| **d — `CardTitle` não é heading semântico** | **Ajuste menor / sistêmico** — não bloqueante | Idêntico ao já aceito em `login-simples`/`recuperacao-senha`. Decisão de catálogo, não desta tela. |
| **e — ícones decorativos sem `aria-hidden`** (`UserCogIcon`, `CircleAlertIcon`, `UserXIcon`, `RotateCcwIcon`, setas) | **Ajuste menor** — não bloqueante | SVG lucide sem `role`/`title` já é ignorado pela maioria dos leitores de tela. Boa prática marcar `aria-hidden`; lacuna de convenção do catálogo. Exceção correta: o `Spinner` do "Continuar" recebe `aria-hidden="true"` explícito, evitando anúncio duplicado com a região `aria-live`. |
| **f — `AvatarFallback` ("CA"/"CB") entra no nome acessível do rádio** (novo) | **Ajuste menor** — não bloqueante | Consequência direta e esperada do padrão "label envolve o card inteiro" que a própria spec pediu no item 2 (é o padrão de `field-choice-card.tsx`). As iniciais viram um prefixo redundante de 2 letras no nome acessível — não impede o entendimento. Candidato a refino do padrão de choice card no catálogo, não regressão desta tela. |
| **g — botão "Continuar" perde foco ao ser desabilitado durante o clique** | **Ajuste menor** — não bloqueante | Comportamento nativo do HTML (elemento focado que vira `disabled` joga foco para `<body>`), sistêmico em todo botão com `disabled` ligado a loading síncrono — mesmo padrão já aceito em `login-simples`/`recuperacao-senha`. A região `aria-live` "Continuando..." ainda anuncia a mudança; só a posição do foco fica em `<body>` durante o `setTimeout` de 1200ms. |

**Nenhum bloqueante.** Nenhum item impede o uso real com teclado ou leitor de tela. Os pontos mais delicados desta tela — que a auditoria confirmou resolvidos — são:
- **agrupamento semântico real** via `FieldSet`/`FieldLegend` (`<fieldset>`/`<legend>` reais, não `div`s), coexistindo com o `role="radiogroup"` nativo do Radix;
- **alvo de clique ampliado** do card inteiro via `FieldLabel` (`<label htmlFor>` real);
- **erro de validação** com foco programático no **primeiro `RadioGroupItem`** (não na mensagem) — decisão correta para um `radiogroup`;
- **foco programático no `AlertTitle`** ao falhar o carregamento, e **região `aria-live`** cobrindo o `Skeleton` (que não tem semântica própria);
- **nome da corretora repetido no texto corrido** do `FieldDescription`, não só no `Badge` (WCAG 1.4.1).

---

## 3. Referência na navegação do fluxo — CONFIRMADA

Ordem do fluxo 5A (spec + plano):
`login-simples → login-erro-validacao → recuperacao-senha → selecao-perfil-corretora → onboarding`

Ponto importante da spec: diferente de `recuperacao-senha` (desvio que não autentica ninguém), esta tela **é** o destino do caminho feliz do login.

- **Telas que chegam aqui (de):** confirmado no código-fonte — `login-simples` (`page.tsx:53`) e `login-erro-validacao` (`page.tsx:140`) já fazem `router.push("/templates/selecao-perfil-corretora")` no ramo de sucesso, desde que foram construídas. Como a spec previu, **nenhuma alteração nas telas irmãs foi necessária** — esta tela só precisava existir na rota certa para o link parar de ser "morto". **Correto.**
- **Continuar (para), com opção válida:** `handleContinuar` → `router.push("/templates/onboarding")` — próxima e última rota do fluxo 5A, ainda em `inProgressTemplates`. Link já aponta para o slug definitivo e passará a resolver quando `onboarding` for construída. Não é erro — é exatamente a situação em que esta tela estava até agora. **Correto.**
- **"Usar outra conta" (para):** `<Link href="/templates/login-simples">`, renderizado como `<a href>` real via `Button asChild`. Volta ao início do fluxo (não para `onboarding`) — coerente com "entrou com a conta errada". **Correto.**
- **Sem navegação de rota nos estados de erro/vazio/validação:** "Tentar novamente" refaz a busca fictícia, erro de validação e vazio permanecem na rota — como a tabela de navegação da spec define. **Correto.**

---

## 4. Decisão de engenharia fora da spec — `Select` "Cenário da busca (demonstração)"

**O que foi feito:** o `telas-construtor` adicionou, **fora do `Card`** (na moldura de documentação, entre o parágrafo de contexto e a tela simulada), um `Select` rotulado "Cenário da busca (demonstração)" que alterna a busca fictícia entre `sucesso` (3 vínculos), `erro` (falha ao carregar) e `vazio` (sem vínculo). Não estava na spec.

**Por que ele fez:** nas telas de login, digitar uma senha errada já demonstra naturalmente o estado de erro. Aqui os estados 5 (erro ao carregar) e 6 (vazio) são **desfechos de um backend fictício**, sem nenhum input de formulário natural que os dispare. A spec exige que a tela cubra esses dois estados (itens 5 e 6 da seção "Estados"), mas **não especifica como demonstrá-los**.

**Minha avaliação — aceitável, não devolver ao planejador:**

| Critério | Análise |
|---|---|
| Contaminação da composição | **Baixa.** Fica fora do `Card`, na moldura de docs — não entra na composição do painel real. O próprio comentário do código (linhas 64-70) declara: "só para fins de demonstração deste catálogo, não faz parte da composição do Card em si". |
| Peça usada | **Real.** `Select` do catálogo (`components-registry.ts`), rotulado com `<Label htmlFor>` acessível, entra corretamente na ordem de tab (auditoria item a). Nada hardcoded. |
| Alternativa se não tivesse feito | Sem gatilho, os estados 5 e 6 virariam **código inalcançável** — impossível verificar visualmente ou com leitor de tela dois estados que a spec exige cobrir. Isso seria um resultado **pior** para um catálogo cujo propósito é demonstrar estados ponta a ponta. |
| Clareza para o usuário final | Rótulo "(demonstração)" + texto de contexto deixam explícito que é andaime de demonstração, não parte do produto real. |

**Ressalva de processo (não desta tela):** foi, ainda assim, uma decisão de produto/engenharia tomada sozinho. O caminho "mais puro" seria devolver ao planejador a pergunta "como os estados 5 e 6 devem ser demonstrados?". Como o resultado é de baixo risco, isolado e autodocumentado, **não considero motivo para retrabalho** — mas recomendo que:

1. O Rafael **ratifique explicitamente** o padrão do seletor de cenário como convenção aceita para telas cujos estados vêm de backend fictício (não de input de formulário).
2. As **próximas specs com muitos estados de backend** (`onboarding` e as 3 telas de 5B — `apolices-ativas`, `novo-sinistro`, `painel-corretor`) já **especifiquem o gatilho de demonstração** de antemão, para o `telas-construtor` não precisar decidir sozinho de novo.

---

## 5. Decisões de produto pendentes (já sinalizadas na spec — não são retrabalho)

Levar para o Rafael, mas **não bloqueiam** a aprovação desta tela nem a próxima do fluxo:

1. **Premissa "1 login pode ter múltiplos vínculos perfil+corretora"** — assumida na spec por ser o cenário mais rico para demonstrar o catálogo. Se o modelo real do produto for sempre 1:1, esta tela deixa de fazer sentido como etapa obrigatória (viraria redirecionamento automático para `onboarding`). Decisão de produto.
2. **Persistência da seleção** — a escolha fica só no estado local desta rota; nada é passado para `/templates/onboarding` (nem query param, nem contexto). A spec deixa essa decisão para a spec de `onboarding` (ainda não escrita) ou para o Rafael.
3. **Ausência de busca/filtro** — a lista tem só 3 opções; se o cenário real tiver dezenas de vínculos, `input-group.tsx` resolveria sem componente novo. Fora de escopo por ora.
4. **Erro de sistema na confirmação (estado 7 falhando)** — mesma lacuna sistêmica das 3 telas irmãs: só a busca inicial modela falha, a confirmação é sempre bem-sucedida.

---

## Recomendação

**Aprovar como pronta e seguir para a próxima tela do fluxo (`onboarding`, última de 5A).**

Antes de construir `onboarding`, vale o Rafael:
- **Ratificar o padrão do `Select` de cenário** (seção 4) como convenção aceita, e pedir que as specs de telas com estados de backend já definam o gatilho de demonstração.
- Responder a **decisão nº 2** (persistência da seleção), porque ela afeta diretamente a spec de `onboarding` (o que essa tela recebe da anterior).

As observações de acessibilidade (itens 5, 8, d, e, f, g) são candidatas a um passe único de melhoria **no catálogo inteiro** (Card/Empty semânticos, `aria-hidden` em ícones decorativos e no `Avatar` de choice card, foco em botões que viram `disabled`), não correções pontuais nesta tela.
