# Diagnóstico final — `painel-corretor`

Revisão de fechamento da **3ª e última tela da Fase 5B** — e, com ela, o
encerramento do conjunto de 3 telas de seguros. Fontes cruzadas:
`.build/telas/painel-corretor.md` (spec), `.build/telas/acessibilidade-painel-corretor.md`
(auditoria a11y), `src/app/templates/painel-corretor/page.tsx` (código final),
`src/lib/templates-registry.ts`, `src/lib/components-registry.ts`,
`src/lib/patterns-registry.ts`, `src/lib/atomic-registry.ts`, os fontes
`ui/pagination.tsx` / `ui/table.tsx` / `ui/icon.tsx`, e o código das telas
vizinhas (`apolices-ativas`, `novo-sinistro`, `onboarding`). Revisão de leitura
apenas — **nada em `src/` foi alterado**.

---

## Veredito: **pronta com ajustes menores**

**Nenhum bloqueante.** Nada nesta tela impede uso real com teclado ou leitor de
tela. A tela cumpre os 16 requisitos de acessibilidade da própria spec, usa só
peças reais do catálogo, não tem cor fora de token, e está corretamente
registrada e cabeada na navegação do fluxo (entradas e saídas conferidas no
código das telas vizinhas, não só na spec).

Concordo com a recomendação do auditor: os **2 achados estruturais** são
**backlog transversal do catálogo**, não retrabalho desta tela — eles nascem da
composição herdada de `apolices-ativas`, e corrigir tela a tela só espalharia
divergência. Ver seção 2.

Duas ressalvas que **não bloqueiam**, mas precisam da sua decisão:

1. **Gap de processo**: o estágio mobile do pipeline **não foi executado** para
   esta tela — não existe `.build/telas/mobile-painel-corretor.md`, embora a
   spec exija a medição em 390×844 (Responsividade, item 9). Fechei a lacuna por
   leitura de código (seção 4), sem overflow estrutural encontrado. Recomendo a
   medição como confirmação de rotina, **não** como condição para liberar.
2. **A duplicação de anúncio `aria-live` já foi apontada como "ajuste menor
   recomendado" no diagnóstico de `apolices-ativas` e não foi feita** — agora
   está em 2 telas. Adiar de novo significa aceitá-la como padrão de fato. Ver
   seção 2.1.

---

## 1. Bloqueantes

**Nenhum.**

Critério aplicado — bloqueante = impede operar a tela por teclado ou leitor de
tela (conteúdo inalcançável, foco perdido/preso, controle sem nome acessível),
ou overflow horizontal medido da página.

| Achado | Origem | Por que NÃO é bloqueante |
|---|---|---|
| A — duplicação de anúncio nos estados "carregando" e "erro" | a11y, seção 3 | Redundância/verbosidade, não perda de conteúdo. A informação chega (2–3x), o foco vai para o lugar certo (`AlertTitle`), o botão "Tentar novamente" é alcançável. Nada fica inacessível. |
| B — ordem de tab diverge do texto literal do item 15 da spec | a11y, seção 15 | A ordem real segue a ordem visual/DOM (cima→baixo), sem `tabIndex` positivo. É uma ordem **coerente**, só diferente do que o texto da spec descreveu. Divergência de spec, não falha de acessibilidade. |
| C — `PaginationPrevious`/`Next` sem `aria-disabled` nos limites | a11y, obs. d | Clique na página 1 em "Página anterior" é no-op silencioso. Herdado fielmente do Pattern catalogado (`patterns/pagination.tsx`), sem regressão. Não engana sobre navegação nem trava foco. |
| D — "Ver apólice" repetido em até 5 linhas por página | a11y, seção 10 | Trade-off já aceito pela própria spec (item 10). Distinção existe pelo contexto da linha; só a navegação isolada por lista de links perde diferenciação. |
| E — "Portal do corretor" duplicado (`SidebarHeader` + `SidebarGroupLabel`) | a11y, obs. c | Dois `<div>`s sem ARIA ligando um ao outro — repetição de conteúdo, não de anúncio dinâmico. Idêntico nas 3 telas de 5B, por design da moldura. |
| F — estágio mobile não executado | processo | **Ausência de medição ≠ overflow medido.** Verificado por código (seção 4): sem caminho estrutural para overflow em 390px. |

---

## 2. Os 2 achados estruturais — concordo com "backlog transversal"

Ambos se repetem quase palavra por palavra em relação à auditoria de
`apolices-ativas` porque a composição que os origina foi reaplicada item por
item. Não são bugs desta tela.

### 2.1 Duplicação de anúncio `aria-live` (carregando / erro)

| Estado | Mecanismos concorrentes | Efeito |
|---|---|---|
| Carregando (clique em "Atualizar") | `CardDescription` (persistente) muda para "Carregando sinistros..." + `<p aria-live="polite" class="sr-only">` **novo** montado no bloco de skeleton (`page.tsx:416-418`) | Mesma frase ~2x. Pior: esse `<p>` é destruído quando `carregando` vira `false`, então **nunca anuncia "carregado"** — diverge do Pattern `skeleton.tsx`, onde o nó é persistente e alterna o texto |
| Erro | `CardDescription` = "Não foi possível carregar os sinistros" + `role="alert"` nativo do `Alert` lendo `AlertTitle` (texto idêntico, `page.tsx:214` vs. `:423-425`) + foco programático relendo o título | Mesma frase por 3 mecanismos quase simultâneos |

**Minha avaliação:** o auditor está certo em não bloquear e certo em recomendar
tratar na origem. Mas há um fato de processo que muda a decisão:
**o diagnóstico de `apolices-ativas` já classificou isso como "ajuste menor
recomendado antes de dar a tela por definitiva", e o `<p aria-live>` efêmero
continua lá** (`apolices-ativas/page.tsx:289`). Agora são 2 telas com o mesmo
desvio, e a spec de ambas declara explicitamente o objetivo oposto ("não
duplicar texto, só 1 região viva").

- **Se você aprovar como backlog transversal**: ok, é defensável — mas então
  vale abrir o item formalmente em `PENDENCIAS.md` como "região de status única"
  (mecanismo padronizado no catálogo), com as 3 telas de 5B listadas como
  consumidoras. Caso contrário ele vai morrer entre diagnósticos.
- **Se preferir resolver agora**: a correção continua barata e isolada nos 2
  arquivos — remover o `<p aria-live>` do bloco de skeleton (a `CardDescription`
  persistente já cobre carregando→carregado nas duas direções) e usar texto
  curto/genérico na `CardDescription` no estado de erro, deixando o `Alert` como
  fonte única da frase completa. **Não implemento nada aqui.**

### 2.2 Tensão entre ordem de tab literal (item 15) e composição visual

`CardHeader` (Badge + "Atualizar" + "Abrir novo sinistro") vem antes do
`CardContent` (busca) no DOM e visualmente. Sem `tabIndex` positivo — a escolha
correta, e o arquivo não tem nenhum (o único `tabIndex` é `-1` no `AlertTitle`) —
a ordem real é: Select cenário → sidebar → "Ver apólices" (KPI) → Atualizar →
Abrir novo sinistro → busca → linhas da tabela → paginação.

**Minha avaliação:** o código está certo e o **texto da spec está errado** — é o
mesmo veredito que dei em `apolices-ativas` (item 13) e a mesma classe de
divergência que resolvi a favor do código em `novo-sinistro` (`AlertDialog`
controlado). Duas seções da mesma spec pedem coisas que não podem ser
simultaneamente verdadeiras sem truque de `tabIndex`. **Sugiro corrigir o item
15 da spec, não o layout.** A única alternativa real é mover os 2 botões para
dentro do `CardContent`, abaixo da busca — o que contraria a composição visual
que a própria spec descreve (linha 100) e o precedente de `novo-sinistro`.

**Decisão que preciso de você:** se a intenção real era "busca antes dos botões
de ação" na navegação por teclado, isso é mudança de layout — e aí vale decidir
para as 3 telas de 5B de uma vez, não só aqui.

---

## 3. Correções factuais na auditoria (não mudam o veredito)

Os "2 pontos positivos que corrigem regressões nas telas irmãs" estão baseados
em informação **desatualizada**. Não é demérito da tela — é para você não
registrar no vault um histórico incorreto:

| Afirmação da auditoria | Fato verificado |
|---|---|
| "`apolices-ativas` usa `disabled` nativo no botão Atualizar, esta tela corrige a regressão" | `apolices-ativas/page.tsx:260` **já usa `aria-disabled={carregando}`**. Foi retro-corrigido em 2026-07-23 (`PENDENCIAS.md` item 4). |
| "`apolices-ativas` ainda usa `CardTitle` sem `asChild`, gap não corrigido" | `apolices-ativas/page.tsx:246` **já usa `<CardTitle asChild>`**. Mesmo passe de 2026-07-23. |
| "`apolices-ativas`/`novo-sinistro` ainda em `lucide-react`, ícones sem `aria-hidden`" | **Todas as 9 rotas de Template já importam `@/components/ui/icon`** — zero import de `lucide-react` em `src/app/templates/`. A migração Material Symbols foi concluída (commits recentes). |

**Leitura correta:** `painel-corretor` **não corrige regressões vivas** — ela
nasce alinhada a um catálogo que já tinha sido corrigido antes dela. Isso é o
resultado esperado do pipeline, e é uma boa notícia diferente: o passe sistêmico
de 2026-07-23 está pegando nas telas novas sem intervenção manual.

**Efeito colateral útil:** o item de `PENDENCIAS.md` #4 ("ícones decorativos
lucide sem `aria-hidden`, ~40+ ocorrências em 7 arquivos") pode ser **fechado**
— o Atom `icon.tsx` aplica `aria-hidden="true"` automaticamente quando não há
prop de acessibilidade (`icon.tsx:41-48`), e todas as telas já usam o Atom.
Vale atualizar o arquivo.

---

## 4. Responsividade — verificação por código (estágio mobile não executado)

Sem `mobile-painel-corretor.md`, conferi os 9 requisitos de responsividade da
spec direto no código. Nenhum caminho estrutural para overflow horizontal da
página:

1. **Sidebar mockada nasceu correta**: `<Sidebar collapsible="none" className="hidden h-full md:flex">`
   (`page.tsx:270`) — o bug de `RETROATIVO-MOBILE.md` **não** se repetiu. Área de
   conteúdo com `min-w-0 flex-1` (`page.tsx:305`), o que impede blowout de flex.
2. **Grade de KPIs**: `grid grid-cols-1 gap-4 sm:grid-cols-3` (`page.tsx:306`) —
   exatamente o que a spec pede, empilha abaixo de 640px.
3. **`CardHeader` do card de lista**: `flex flex-row flex-wrap ... gap-3` +
   bloco de ações `flex flex-wrap items-center gap-2` (`page.tsx:366`, `:375`) —
   Badge e os 2 botões quebram para a linha de baixo, não espremem.
4. **Tabela de 7 colunas**: confirmado em `ui/table.tsx:9-12` — o `Table` já
   embute o contêiner `relative w-full overflow-x-auto`, então o scroll é
   **contido no componente**, não vaza para a página. Comportamento já aceito
   como padrão do catálogo (`RETROATIVO-MOBILE.md`).
5. **`Pagination` com 5 páginas**: `PaginationLink` em `size="icon"`, sem
   larguras fixas em px. Cabe em 390px.
6. **Único candidato a medir**: a linha do `Select` de cenário
   (`page.tsx:248-256`) é `flex items-center gap-2` **sem `flex-wrap`**, com
   `SelectTrigger className="w-64"` (256px). Risco baixo: o trigger é item
   flexível com `flex-shrink: 1` (encolhe), e o `Label` não tem
   `whitespace-nowrap` (quebra em 2 linhas antes de empurrar). É o **mesmo
   padrão de `apolices-ativas`, `novo-sinistro`, `onboarding` e
   `selecao-perfil-corretora`** — se for mexer, mexa nas 5 de uma vez, como já
   registrei no diagnóstico de `novo-sinistro` (item 5).

**Recomendação**: rodar a medição de rotina em 390×844 nos 4 estados que a spec
lista (sucesso página 1, busca sem resultado, vazio real, erro) na próxima
sessão em que a ferramenta de resize estiver estável. **Não** condiciona a
liberação da tela.

---

## 5. Consistência com o design system

Tudo conferido, com uma única exceção de registro (não de código):

- **Só peças reais do catálogo.** Os 13 componentes importados existem em
  `src/lib/components-registry.ts`: alert, badge, button, card, empty,
  input-group, label, pagination, select, sidebar, skeleton, table — mais o
  `Icon`. Nenhum componente inventado, nenhum arquivo novo em `src/components/`.
- **Exceção de registro — `Icon` não está em `components-registry.ts`.** Ele
  está em `src/lib/atomic-registry.ts:139` (`{ name: "Icon", category: "atom" }`)
  e o arquivo existe (`src/components/ui/icon.tsx`), então **não é componente
  inventado**. O que falta é a entrada `{ slug: "icon", name: "Icon" }` no
  `components-registry.ts` — lacuna deixada pela migração Material Symbols, que
  afeta as **9 telas de Template**, não esta. Ajuste de 1 linha, decisão sua.
- **Patterns reaplicados como mecanismo, não copiados.** `skeleton`,
  `error-state`, `empty-state`, `search-experience` e `pagination` — os 5
  constam em `src/lib/patterns-registry.ts` (linhas 17, 16, 14, 19, 24).
  Primeira tela do projeto a renderizar `Pagination` dentro de uma jornada, como
  a spec previa.
- **Nenhuma cor fora de token.** Zero hex, zero `rgb()`, zero arbitrary de cor.
  Só utilitários semânticos (`text-muted-foreground`, `text-card-foreground` via
  `Card`, `variant="destructive"`). Único valor arbitrário é de dimensão:
  `min-h-[720px]` (`page.tsx:269`) — idêntico a `apolices-ativas:206` e
  `novo-sinistro`, justificado pela moldura da sidebar mockada.
- **`aria-label` PT-BR sobrescrito de fato, não por convenção.** Confirmado no
  fonte (`ui/pagination.tsx`): o `aria-label` fixo em inglês é declarado **antes**
  de `{...props}`, então o valor do consumidor vence. Os 3 pontos estão cobertos
  (`Pagination`, `PaginationPrevious`, `PaginationNext`). A decisão de **não**
  editar `ui/pagination.tsx` na origem está correta pela regra 3 do plano — mas
  agora que existe um consumidor real, trocar os 3 defaults para PT-BR é uma
  edição isolada de 1 arquivo que eliminaria a sobrescrita manual em toda tela
  futura (Lacuna 5 da spec, decisão sua).
- **`templates-registry.ts` atualizado corretamente**: `painel-corretor` está em
  `templatesList` (linha 23) e **não** aparece mais em `inProgressTemplates`,
  que agora está **vazio** (linhas 29-33, só comentários) — marco de fechamento
  da Fase 5. Verificado que a lista vazia não quebra nada: `template-index.tsx:35`
  faz `.map` sobre ela (renderiza nada, sem seção órfã).
- **Propagação automática na navegação global**: `templatesList` alimenta a nav
  lateral real (`sidebar-07/nav-templates.tsx:71`) e o breadcrumb
  (`app-shell.tsx:101`) — então a rota já aparece no menu e o breadcrumb resolve
  "Painel do corretor" em vez do slug cru. Nada a fazer.

---

## 6. Navegação do fluxo — confirmação explícita

Conferido no código das telas vizinhas, não só na spec. **Esta é a tela que
fecha os links intencionalmente mortos que os diagnósticos anteriores
registraram.**

**Entradas (de onde se chega aqui) — as 4 previstas na spec, todas funcionais agora:**

| Origem no código | Situação |
|---|---|
| `apolices-ativas/page.tsx:217` — item "Painel" da sidebar mockada | Cabeado, **deixou de ser 404** |
| `novo-sinistro/page.tsx:378` — item "Painel" da sidebar mockada | Cabeado, **deixou de ser 404** |
| `novo-sinistro/page.tsx:441` — CTA primário "Ir para o Painel do corretor" (tela de sucesso) | Cabeado, **deixou de ser 404** |
| `onboarding/page.tsx:344` — CTA final "Ir para o Painel do corretor" (boas-vindas, fim da 5A) | Cabeado, **deixou de ser 404** |

Nenhuma alteração foi necessária em nenhuma das 3 telas de origem, exatamente
como a spec previa. **Consequência operacional:** a ressalva do diagnóstico de
`novo-sinistro` ("não rode teste de usabilidade do fluxo 5B completo antes
disso, ou o participante termina numa página de erro") **está resolvida** — o
fluxo 5A→5B agora fecha ponta a ponta, sem link morto.

**Saídas (para onde se vai daqui) — todas para rotas que existem:**

| Origem no código | Destino | Situação |
|---|---|---|
| `page.tsx:286` — item "Apólices" da sidebar | `/templates/apolices-ativas` | Rota existe |
| `page.tsx:294` — item "Sinistros" da sidebar | `/templates/novo-sinistro` | Rota existe; mantém o significado já estabelecido ("abrir sinistro", não listar) |
| `page.tsx:323` — botão "Ver apólices" (KPI) | `/templates/apolices-ativas` | Rota existe |
| `page.tsx:392` — botão "Abrir novo sinistro" (header) | `/templates/novo-sinistro` | Rota existe |
| `page.tsx:524` — botão "Ver apólice" (cada linha) | `/templates/apolices-ativas` | Rota existe; sem passar o número da apólice adiante (Lacuna 1, provisório) |
| `page.tsx:454` — CTA do `Empty` (vazio real) | `/templates/novo-sinistro` | Rota existe — **navegação real**, não `toast()` placeholder como no CTA equivalente de `apolices-ativas`. Correto: aqui a tela de destino existe |

**Item ativo:** `page.tsx:279` — `<SidebarMenuButton isActive aria-current="page">`
em "Painel", com o atributo explícito (não confia só no `isActive`, que só
estiliza). Correto e consistente com as 2 telas irmãs.

**Protocolo sem destino:** `<TableCell>{sinistro.protocolo}</TableCell>`
(`page.tsx:508`) — texto simples, não link falso. Correto: não existe rota de
detalhe de sinistro no escopo de 5B.

**Zero link morto restante no fluxo 5A+5B.** Confirmado por grep: todos os
`href="/templates/..."` das 9 telas apontam para slugs em `templatesList`.

---

## 7. Decisões de produto da spec (não são retrabalho)

Registradas, nenhuma bloqueia:

1. **KPIs estáticos, fora do ciclo carregando/vazio/erro** (Lacuna 2) — decisão
   de escopo com precedente em `dashboard-financeiro`. Consequência visível: no
   estado "vazio real" os cards mostram "128 apólices / 14 sinistros em aberto"
   enquanto a lista diz "Nenhum sinistro cadastrado" — **contradição perceptível
   num teste de usabilidade**. Se for rodar teste com o cenário "vazio",
   considere derivar os KPIs do próprio mock (Lacuna 3, troca de fonte de dado,
   não de composição). É o ponto que eu levaria a você primeiro entre os de
   produto.
2. **Números de KPI fictícios, não derivados do mock de 23 sinistros** (Lacuna
   3) — aceitável sem backend; ver item acima.
3. **Sem persistência entre telas** (Lacuna 1) — mantida a decisão já ratificada
   (Context React existe e é lido para `corretora`, mas nada de sinistro/apólice
   é passado adiante). Coerente com as 2 fronteiras anteriores.
4. **Sem tela de detalhe de sinistro** (Lacuna 4) — 4ª tela fora do escopo.
5. **Erro só no carregamento inicial/"Atualizar"** (Lacuna 6) — lacuna sistêmica
   de todo o projeto.

---

## Recomendação

**Aprovar como pronta com ajustes menores.** A Fase 5B fecha aqui:
`inProgressTemplates` está vazio, as 9 rotas de Template existem, e o fluxo
5A→5B navega ponta a ponta sem link morto.

Antes de considerar a Fase 5 encerrada (não antes de "seguir para a próxima
tela" — não há próxima tela neste fluxo), decidir:

1. **A duplicação `aria-live` (seção 2.1)** — 2ª vez que aparece como
   recomendação. Ou corrige nas 2 telas agora (barato, isolado), ou abre
   formalmente em `PENDENCIAS.md` como item de catálogo. Deixar implícito é a
   única opção que eu não recomendo.
2. **O item 15 da spec (ordem de tab, seção 2.2)** — minha sugestão é corrigir a
   **spec** a favor do código, para as 3 telas de 5B de uma vez.
3. **Rodar o estágio mobile faltante** (seção 4) — confirmação de rotina; a
   leitura de código não encontrou risco.
4. **Atualizar `PENDENCIAS.md`** (seção 3) — item #4 sobre ícones lucide pode
   ser fechado; e as afirmações desatualizadas da auditoria não devem entrar no
   vault como histórico.
5. **Opcional, 1 linha cada**: adicionar `icon` ao `components-registry.ts`
   (seção 5) e trocar os 3 `aria-label` de `ui/pagination.tsx` para PT-BR na
   origem (Lacuna 5).
