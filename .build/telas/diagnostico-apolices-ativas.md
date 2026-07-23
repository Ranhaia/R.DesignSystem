# Diagnóstico final — `apolices-ativas`

- **Slug:** `apolices-ativas` (1ª das 3 telas de seguros do fluxo 5B — `PLANO-LOOP-80-20-TEMPLATES.md`, Fase 5). Ordem de 5B: `apolices-ativas → novo-sinistro → painel-corretor`.
- **Arquivos revisados:** `.build/telas/apolices-ativas.md` (spec), `.build/telas/acessibilidade-apolices-ativas.md` (auditoria), `src/app/templates/apolices-ativas/page.tsx` (código), `src/lib/templates-registry.ts` (registro).
- **Confrontado com:** `src/lib/components-registry.ts`, `src/lib/patterns-registry.ts`, `src/components/patterns/skeleton.tsx` (mecanismo original), telas vizinhas (`onboarding` / `dashboard-financeiro` — referências de estilo; `novo-sinistro` e `painel-corretor` — próximas de 5B, ainda em `inProgressTemplates`).
- **Não editei nada em `src/`.** Este diagnóstico é só para o Rafael aprovar ou pedir retrabalho.

---

## Veredito

**PRONTA COM UM AJUSTE MENOR RECOMENDADO — não é bloqueante, não é retrabalho, não exige reabrir a spec.**

**Sem bloqueantes.** A tela cumpre a spec, passa nos 13 requisitos de acessibilidade específicos, usa só peças reais do catálogo, não tem cor/espaçamento hardcoded fora de token, está corretamente registrada e referencia corretamente as telas vizinhas do fluxo. Nenhum item impede o uso real com teclado ou leitor de tela.

O único ponto que vale virar um pedido de ajuste (barato, isolado neste arquivo) antes de dar a tela por definitiva é a **duplicação de anúncio de leitor de tela em dois estados** (carregando e erro) — analisada em detalhe na seção 2. **Minha decisão: é verbosidade, não perda de informação — não bloqueia a entrega**, mas como é exatamente o tipo de duplicação que a própria spec pede para evitar (linha 88) e a correção é de baixíssimo custo, recomendo tratá-la como ajuste menor desta tela agora, não empurrar para um passe futuro de catálogo.

Além disso, esta é a **primeira tela de 5B** — é o ponto onde as duas decisões PROVISÓRIAS que o diagnóstico de `onboarding` pediu para o Rafael consolidar (persistência de dados entre telas e convenção do `Select` de cenário) deixam de ser teóricas e começam a valer de fato. Ver seção 4.

---

## 1. Consistência com o design system — OK

| Verificação | Resultado |
|---|---|
| Só componentes reais do catálogo | **OK** — os 12 componentes importados (Alert, Badge, Button, Card, Checkbox, Empty, Label, Popover, Select, Sidebar, Skeleton, Table) constam em `components-registry.ts`. Nenhum componente novo criado. |
| Reuso de Pattern real (mecanismo, não cópia) | **OK** — reaproveita o **mecanismo** de 5 Patterns catalogados em `patterns-registry.ts`: `skeleton` (estado carregando), `filters` (Popover + Checkbox + Badges removíveis), `empty-state` (vazio real, composição exata do componente do catálogo), `search-experience` (variante compacta de `Empty` para filtro sem resultado) e `error-state` (Alert destructive + foco no título). Aplicados em forma de tabela em vez de lista simples, como a spec previa — sem inventar peça nova. |
| Cores/espaçamentos por token | **OK** — a auditoria confirmou: nenhum `#`/`rgb(`/`text-[`/`bg-[` no arquivo. Só tokens/escala Tailwind: `text-muted-foreground`, `text-destructive` (via `Alert variant="destructive"`), `bg-secondary-foreground/10` (hover do botão de remover badge). |
| Valor arbitrário `min-h-[720px]` | **OK, por spec** — único valor arbitrário; dimensão da moldura da Sidebar mockada + conteúdo, mesmo espírito do `min-h-[640px]` das telas irmãs e do padrão de `dashboard-financeiro`. Não é cor nem quebra de token de tema. |
| `templates-registry.ts` atualizado | **OK** — `apolices-ativas` está em `templatesList` (linha 21) e **não** aparece mais em `inProgressTemplates`. Sobram lá só as 2 telas restantes de 5B (`novo-sinistro`, `painel-corretor`). Movimentação concluída como a spec exigia. |
| Padrão de moldura "Template — …" | **OK** — `<h1>` + parágrafo `text-muted-foreground` + `Select` de cenário fora do container + container `w-full rounded-lg border`. Segue a referência de `dashboard-financeiro` (Sidebar mockada, dado tabular) combinada com a convenção do `Select` de cenário das telas de 5A — sem conflito, exatamente como a spec descreve. |
| Sidebar mockada (não a `AppSidebar` real) | **OK** — `SidebarProvider` escopado + `Sidebar collapsible="none"`, mesmo padrão de `dashboard-financeiro`. **Melhora** o precedente: os itens "Painel"/"Sinistros" são `<a href>` reais via `asChild`+`Link`, e o item ativo "Apólices" tem `aria-current="page"` explícito (que `dashboard-financeiro` não tinha). |

---

## 2. Acessibilidade — sem bloqueantes; um ajuste menor recomendado (duplicação de anúncio)

A auditoria (`.build/telas/acessibilidade-apolices-ativas.md`) aprovou os 13 requisitos específicos da spec, incluindo os quatro pontos de atenção especial: `aria-current="page"` funcional no item ativo da sidebar, `scope="col"` em todas as 6 colunas, composição completa de Popover+Checkbox+Badges com rótulos/`aria-label` corretos, e o reuso da `CardDescription` como região viva.

### 2.1 O achado principal — duplicação de anúncio (o que a tarefa pediu para eu decidir)

A `CardDescription` foi reaproveitada como região `aria-live="polite"` (correto e pedido pela spec, linha 88). Ela funciona **sem duplicação** exatamente onde a spec descreve: contagem de resultados ao filtrar/desfiltrar, e transição carregando → sucesso. O problema aparece em **dois estados que a spec não previu literalmente nesse ponto**:

| Estado | Mecanismos que anunciam o mesmo texto | Efeito |
|---|---|---|
| **Início do carregamento** (clique em "Atualizar") | (1) `CardDescription` muda para "Carregando apólices..."; (2) um `<p aria-live="polite">Carregando apólices</p>` **novo** é montado dentro do bloco de skeleton | "Carregando apólices" anunciado ~2x em sequência próxima. Pior: esse `<p>` é destruído quando `carregando` vira `false`, então **nunca anuncia "carregado"** — diverge do `skeleton.tsx` original, onde o parágrafo é persistente e alterna o texto |
| **Erro ao carregar** | (1) `CardDescription` muda para "Não foi possível carregar as apólices"; (2) `role="alert"` nativo do `Alert` lê o `AlertTitle` (texto idêntico) ao entrar no DOM; (3) foco programático move para o `AlertTitle`, relendo o texto | Mesma frase comunicada por 3 mecanismos quase simultâneos |

### 2.2 Minha decisão sobre a severidade

- **Não é bloqueante.** Em nenhum dos dois casos há perda de conteúdo ou quebra de operação por teclado: a informação chega, o foco vai para o lugar certo (o `AlertTitle`, evitando foco perdido no botão que disparou a falha), o botão "Tentar novamente" é alcançável normalmente. É **redundância/verbosidade**, não falha funcional. A tarefa autoriza não bloquear quando não é grave — e não é.
- **Mas merece virar ajuste menor, não ser deixado como está.** A própria spec (linha 88) declara o objetivo de "não duplicar o texto, só uma fonte visível + 1 região viva". Os dois estados acima contrariam esse objetivo — a spec só não os antecipou porque descreveu a região viva pensando na contagem do filtro. Além disso, o `<p aria-live>` do skeleton não cumpre a segunda metade do item 4 da spec ("anunciar a transição carregando → **carregado**"), porque é destruído antes de poder anunciar o "carregado". Ou seja: não é só verbosidade estética, é um pequeno desvio do que a spec e o Pattern original pediam.
- **A correção é barata e isolada neste arquivo** (não mexe em catálogo, não reabre spec, não altera arquitetura). Caminhos possíveis (a decidir por quem for implementar — não implemento aqui):
  1. **Carregando:** simplesmente **remover** o `<p aria-live>` do bloco de skeleton — a `CardDescription` já cobre as duas direções (carregando → carregado) por ser persistente. É a opção mais limpa e a que mais respeita "só 1 região viva".
  2. **Erro:** fazer a `CardDescription` usar um texto **genérico e curto** no estado de erro (ex.: "Falha ao carregar") em vez de repetir palavra por palavra o `AlertTitle`, deixando o `Alert` como fonte única da frase completa. O foco programático no `AlertTitle` continua (é correto e necessário).

**Resumo:** classifico como **ajuste menor recomendado antes de dar a tela por definitiva**, não como bloqueante e não como retrabalho. Se o Rafael preferir aprovar já e agrupar num passe de refino, é defensável — mas registro que aqui a correção é pequena o suficiente para não valer a pena adiar.

### 2.3 Demais itens da auditoria — severidade

| Item | Severidade | Justificativa |
|---|---|---|
| **13 — ordem de tab "Atualizar" antes de "Filtros"** (diverge do texto literal do item 13, que pedia "filtro → … → Atualizar") | **Ajuste menor / tensão da própria spec** — não bloqueante | A spec descreve, em seções diferentes, uma composição visual (`Button` "Atualizar" no `CardHeader`, **acima** do filtro no `CardContent`) e um requisito de ordem de tab (filtro antes de Atualizar) que **não podem ser simultaneamente verdadeiros** sem `tabIndex` positivo artificial. O construtor priorizou a **ordem visual real** (sem truques de `tabIndex`), o que é a escolha correta pela regra geral de acessibilidade. A ordem resultante (Select cenário → sidebar → Atualizar → Filtros → Badges → linhas) é coerente de cima para baixo. **Vale o Rafael confirmar a intenção**: se realmente quiser "filtro antes de Atualizar" na navegação por teclado, isso exige mover o botão "Atualizar" para dentro do `CardContent`, abaixo do filtro (contrariando a composição visual do header, coerente com `dashboard-financeiro`). |
| **12 — `CardTitle`/`EmptyTitle` renderizam `<div>`, não heading semântico** | **Ajuste menor / sistêmico** — não bloqueante | Mesmo gap sistêmico do catálogo já registrado e aceito em todas as telas de 5A. O `<h1>` da página é a âncora de heading real (aqui sem sequer salto de nível, pois não há `<h2>`/`<h3>` na rota). Corrigir só aqui geraria inconsistência com o catálogo. |
| **"Portal do corretor" duplicado** (`SidebarHeader` + `SidebarGroupLabel`) | **Ajuste menor cosmético** — não bloqueante | Dois `<div>`s sem ARIA conectando um ao outro — não há duplicação de anúncio dinâmico, só repetição de conteúdo visível/lido em sequência. Fácil de evitar (rótulo de grupo mais específico ou omitido), mas de risco nulo para navegação. |
| **Botão "Atualizar" perde foco ao ficar `disabled` durante o próprio clique** | **Ajuste menor / sistêmico** — não bloqueante | Comportamento nativo do HTML, já registrado e aceito em `selecao-perfil-corretora`/`recuperacao-senha`. A `CardDescription` ainda anuncia "Carregando..." independente de onde o foco esteja. Não é regressão desta tela. |
| **Ícones decorativos sem `aria-hidden`** (9 ícones lucide) | **Ajuste menor / sistêmico** — não bloqueante | Mesma lacuna de convenção já aceita em todas as telas irmãs. SVG lucide sem `role`/`title` já é ignorado pela maioria dos leitores de tela. Candidato a passe único de catálogo. |
| **Texto "Abrir sinistro" repetido entre linhas da tabela** | **Observação de baixo risco** — não bloqueante | A própria spec (item 9) antecipa e aceita esse trade-off no volume atual (10 linhas), só exigindo `aria-label` com identificador da apólice se algum dia virar ícone-only. Distinção existe pelo contexto da linha. |
| **`id`s de checkbox com acento** (`filtro-Saúde`, `filtro-Empresarial`) | **Observação de baixo risco** — não bloqueante | HTML5 aceita; funciona em todos os navegadores/AT testáveis. Só menos convencional que ASCII puro. |

**Nenhum bloqueante.** Os pontos mais delicados que a auditoria confirmou resolvidos: `aria-current="page"` explícito (não só estilo via `isActive`), `scope="col"` em todas as colunas, `Checkbox`/`Label` associados via `htmlFor`, Badges removíveis com `aria-label` descritivo, número da apólice como texto simples (não link falso sem destino), e foco programático no `AlertTitle` no estado de erro.

---

## 3. Referência na navegação do fluxo — CONFIRMADA

Ordem de 5B (spec + plano): `apolices-ativas → novo-sinistro → painel-corretor`. Esta é a **1ª** tela de 5B.

- **Chegada nesta tela (de):** **entrada direta**, sem tela anterior cabeada dentro do escopo já construído — correto e intencional, conforme a spec ("Onde esta tela se encaixa"). Conceitualmente viria do "Painel do corretor", que ainda não existe. Não há link "morto" de entrada porque não há tela anterior tentando empurrar para cá.
- **Saída "Abrir sinistro" (linha da tabela, para):** `<Link href="/templates/novo-sinistro">` renderizado como `<a href>` real via `Button asChild` (2ª tela de 5B). Rota ainda em `inProgressTemplates` — link "morto" até `novo-sinistro` existir, **mesma situação** que `onboarding`→`painel-corretor` e `selecao-perfil-corretora`→`onboarding` já viveram. Aponta para o slug definitivo e passará a resolver quando a tela for construída. **Correto e intencional.**
- **Sidebar mockada — links de/para as telas vizinhas de 5B:**
  - "Painel" → `/templates/painel-corretor` (3ª de 5B, ainda em `inProgressTemplates`) — `<a href>` real. **Correto.**
  - "Apólices" → item ativo, não navega, com `aria-current="page"`. **Correto.**
  - "Sinistros" → `/templates/novo-sinistro` (2ª de 5B) — `<a href>` real. **Correto.**
  - Confirmado: a sidebar dá a **conexão visual e de navegação** com as outras 2 telas de seguros, exatamente como a spec pedia (item "Portal do corretor" com as 3 telas de 5B).
- **Sem navegação de rota nos demais fluxos:** "Atualizar", filtro (Popover/Checkboxes), Badges removíveis, "Nova apólice" (`toast()` placeholder, sem tela de destino no escopo — mesma lacuna do componente real do catálogo) e "Tentar novamente" permanecem na rota, só trocando o conteúdo do `Card`. **Correto**, conforme a tabela de navegação da spec.
- **Número da apólice sem destino:** renderizado como texto simples (`<TableCell>{apolice.numero}</TableCell>`), não como link falso — correto, não existe tela de detalhe de apólice no escopo de 5B.

---

## 4. Decisões PROVISÓRIAS que passam a valer AGORA (fronteira 5A → 5B)

O diagnóstico de `onboarding` (última de 5A) pediu ao Rafael que consolidasse duas decisões tomadas em Modo autônomo **antes de entrar na 5B**. Esta é a 1ª tela de 5B — o momento deixou de ser teórico.

### Decisão 1 — Persistência de dados entre telas: NÃO introduzida (mantida provisória)

- **O que a spec decidiu:** não introduzir nenhum mecanismo novo (query param, Context ou sessão). "Abrir sinistro" navega para `/templates/novo-sinistro` **sem carregar nenhum dado da apólice de origem** — `novo-sinistro` terá que assumir que o usuário escolhe a apólice de novo, ou que esse vínculo não é relevante para a demonstração.
- **Minha avaliação — razoável e coerente com o precedente**, mas **é aqui que a decisão começa a ter custo real**. Nas telas de 5A, "não passar dado" era quase inócuo (personalização cosmética). Numa jornada de seguros, "abrir um sinistro **a partir de uma apólice específica**" é justamente o vínculo que dá sentido à ação — perdê-lo é uma escolha de produto mais visível.
- **Ponto de atenção para o Rafael (decidir antes de especificar `novo-sinistro`):** se quiser o vínculo real, a reversão mais barata (já descrita na spec, Lacuna 1) é `apolices-ativas` passar `?apolice=AP-1042` no link e `novo-sinistro` ler via `useSearchParams` — mudança **isolada nessas 2 telas**. Como `novo-sinistro` ainda nem foi especificada, decidir isso agora evita que ela seja escrita já assumindo "sem pré-preenchimento" e depois precise ser refeita. **Não bloqueia esta tela**, mas é a decisão de maior impacto pendente.

### Decisão 2 — Convenção do `Select` de cenário: aplicada conforme já ratificada

- **O que foi feito:** `Select` "Cenário de carregamento (demonstração)" fora do container principal, com `Label htmlFor` associado, na ordem de tab correta — mesma convenção de `onboarding`/`selecao-perfil-corretora`. Diferença: **3 opções** (sucesso / vazio real / erro), porque uma tela de listagem tem mais desfechos de backend fictício sem gatilho natural que um formulário de submissão única. Os estados com gatilho natural (filtro sem resultado) **não** passam pelo `Select` — correto, mesmo princípio dos patterns reais.
- **Minha avaliação — aceitável e bem contido.** A spec já especificou o gatilho de antemão, então o construtor não improvisou (era exatamente a correção de processo pedida no diagnóstico de `selecao-perfil-corretora`). **Não é bloqueante.** Se o Rafael ainda não formalizou essa convenção para o catálogo inteiro, este é o momento — ela vai se repetir nas outras 2 telas de 5B.

---

## 5. Decisões de produto já sinalizadas na spec (não são retrabalho)

Levar para o Rafael, mas **não bloqueiam** a aprovação nem a próxima tela do fluxo:

1. **Sem tela de detalhe de apólice** — clicar no número não navega (correto). Se o produto real precisar, é uma 4ª tela fora do escopo de 5B.
2. **CTA "Nova apólice" (estado vazio real) sem tela de destino** — `toast()` placeholder, mesma lacuna do componente real do catálogo. Fluxo de "contratar nova apólice" é tela nova, fora de 5B.
3. **Sem busca textual nem paginação** — decisão de escopo (não esquecimento): reservadas para `painel-corretor` ("busca/paginação" na divisão do plano), para não demonstrar o mesmo Pattern duas vezes em telas vizinhas.
4. **Erro modelado só no carregamento inicial/"Atualizar"** — mesma lacuna sistêmica de todo o projeto (nenhuma tela modela falha de rede fora do ponto de carregamento/submissão principal). Como aqui só há leitura, esse é o único ponto de falha possível.

---

## Recomendação

**Aprovar como pronta.** Isso inicia o fluxo 5B (1/3 telas de seguros construídas). Não há bloqueantes.

Antes de dar a tela por definitiva / seguir para `novo-sinistro`, vale ao Rafael:

1. **Decidir o ajuste menor da seção 2.1 (duplicação de anúncio)** — minha recomendação é corrigir agora, por ser barato e isolado: remover o `<p aria-live>` redundante do skeleton (a `CardDescription` já cobre carregando→carregado) e usar um texto genérico na `CardDescription` no estado de erro (deixando o `Alert` como fonte única da frase). É a única pendência que aponto como candidata a mexer no código desta tela.
2. **Fechar a Decisão 1 da seção 4 (persistência de dados)** — ela afeta diretamente a spec de `novo-sinistro`, que ainda nem foi escrita. Decidir se "Abrir sinistro" leva o número da apólice (`?apolice=...`) agora evita retrabalho depois.
3. **Confirmar a intenção de ordem de tab** (item 13, seção 2.2) — se "filtro antes de Atualizar" era mesmo o desejado, exige reposicionar o botão; caso contrário, a ordem visual atual está correta e o texto do item 13 da spec é que estava em tensão com a composição.

As observações sistêmicas (heading semântico em `CardTitle`/`EmptyTitle`, `aria-hidden` em ícones decorativos, foco em botão que vira `disabled`, "Portal do corretor" duplicado) seguem candidatas a um **passe único de melhoria no catálogo inteiro**, não a correções pontuais nesta tela.
