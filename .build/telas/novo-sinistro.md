# Especificação de tela — Novo sinistro

- **Slug:** `novo-sinistro` (`src/lib/templates-registry.ts`, hoje em `inProgressTemplates`; mover para `templatesList` só depois de construída)
- **Rota:** `src/app/templates/novo-sinistro/page.tsx`
- **Fluxo:** Fase 5B — telas de seguros (`PLANO-LOOP-80-20-TEMPLATES.md`, seção "Fase 5 — Jornadas de telas (login + seguros) rumo ao Case público")
- **Posição no fluxo:** **2ª das 3 telas de 5B**. Ordem: `apolices-ativas → novo-sinistro → painel-corretor`. Escolhida para cobrir **fluxo multi-etapa com upload e confirmação** (rótulo explícito do plano) — `apolices-ativas` já cobre listagem/filtro, `painel-corretor` (3ª, ainda não especificada) cobre busca/paginação.
- **Referências de estilo/estrutura combinadas, sem conflito entre elas:**
  - `src/app/templates/apolices-ativas/page.tsx` — moldura de **portal** (título "Template — …" + parágrafo de contexto, container `w-full rounded-lg border`, Sidebar mockada `SidebarProvider` escopado/`collapsible="none"`/`hidden md:flex`). Esta tela reaproveita a MESMA sidebar (3 itens: Painel/Apólices/Sinistros), porque é alcançada de dentro do portal (o item "Sinistros" e o botão "Abrir sinistro" de `apolices-ativas` já apontam pra cá) — diferente do fluxo de login, que é pré-portal e usa Card centralizado isolado.
  - `src/app/templates/onboarding/page.tsx` — MECANISMO do formulário multi-etapa (Progress + região `aria-live` "Etapa X de Y" + foco programático no heading de cada etapa via `ref`/`tabIndex={-1}`/`.focus()`, convenção do `Select` "Cenário (demonstração)" fora do container principal, troca de conteúdo do `Card` para o estado de sucesso sem navegar de rota).
  - `src/components/patterns/upload.tsx` — MECANISMO da etapa de anexos (dropzone com `<input type="file">` real por baixo + `Attachment`/`AttachmentMedia`/`AttachmentContent`/`AttachmentActions` usando a prop real `state`: idle/uploading/processing/error/done).
  - `src/components/patterns/confirmation-dialog.tsx` — MECANISMO do gate de confirmação antes do envio final (`AlertDialog` — ação de consequência real, abrir um sinistro, não é uma etapa comum do wizard, é uma confirmação explícita antes de um envio irreversível).
- **Não recebe dado de nenhuma tela anterior** (mesma decisão provisória já tomada na fronteira `apolices-ativas` → `novo-sinistro`, ver `.build/telas/apolices-ativas.md`, "Lacunas" item 1). Ver "Lacunas" item 1 abaixo para o "como reverter".

## Onde esta tela se encaixa

2ª tela de 5B. Entrada já cabeada por `apolices-ativas` (construída): o botão "Abrir sinistro" de cada linha da tabela e o item "Sinistros" da sidebar mockada já navegam para `/templates/novo-sinistro` — nenhuma alteração necessária em `apolices-ativas` para esta spec passar a valer, mesma situação que `onboarding` viveu em relação a `selecao-perfil-corretora`.

Depois desta tela: o desfecho de sucesso oferece dois destinos — "Ir para o Painel do corretor" (`/templates/painel-corretor`, 3ª tela de 5B, ainda não construída — link intencional e correto, mesma situação de link "morto até a tela existir" já usada em `onboarding`→`painel-corretor`) e "Voltar para Apólices" (`/templates/apolices-ativas`, já construída e funcional).

## Objetivo da tela

Um corretor (ou segurado, a depender do perfil) registra um novo sinistro relacionado a uma apólice existente: informa os dados do ocorrido, anexa os documentos comprobatórios (ex: boletim de ocorrência, fotos) e confirma explicitamente o envio antes de protocolar o pedido.

## Estados que esta tela precisa cobrir

Lista fechada nos estados que fazem sentido para um formulário multi-etapa com upload — não replica todos os 15 Patterns do catálogo, só os que esta composição específica usa:

1. **Etapa 1 de 3 — Dados do sinistro, vazio/inicial** — "Apólice relacionada" sem seleção, "Tipo de sinistro" sem marcação, "Data do ocorrido" sem data escolhida, "Descrição do ocorrido" vazia; `Progress` em ~33%; foco movido para o heading da etapa ao entrar (mesmo mecanismo do `multi-step-form.tsx`/`onboarding`).
2. **Preenchendo (qualquer etapa)** — usuário selecionando/digitando normalmente; nenhum estado visual especial além do foco padrão dos Atoms.
3. **Erro de validação — Etapa 1** — ao clicar "Avançar" com qualquer um dos 4 campos vazio: mensagem inline abaixo de cada campo inválido, foco no primeiro campo inválido na ordem visual (Apólice → Tipo → Data → Descrição).
4. **Etapa 2 de 3 — Anexar documentos, vazio** — nenhum arquivo ainda anexado; dropzone visível, lista de anexos ausente.
5. **Ciclo de vida do upload (mecanismo do Pattern `upload.tsx`)** — ao anexar um arquivo, ele passa por `uploading` → `processing` → `done` (ou `error`, mesmo gatilho de demonstração já usado no Pattern: nome de arquivo terminado em `.exe`); cada item tem ação "Remover".
6. **Erro de validação — Etapa 2** — ao clicar "Avançar" sem nenhum anexo com `state="done"`: mensagem inline abaixo da dropzone, foco na própria dropzone. Anexos ainda em `uploading`/`processing`/`error` não contam como válidos.
7. **Etapa 3 de 3 — Revisão e confirmação** — resumo somente leitura dos dados da etapa 1 (apólice, tipo, data, descrição) + lista dos documentos anexados (nome + estado "Concluído") + `Checkbox` obrigatório "Declaro que as informações fornecidas são verdadeiras".
8. **Erro de validação — Etapa 3** — clicar "Enviar sinistro" sem marcar o `Checkbox` de declaração: mensagem inline abaixo do campo, foco movido para o `Checkbox`. Não abre o diálogo de confirmação (estado 9) enquanto isso não for resolvido.
9. **Confirmação antes do envio (mecanismo do Pattern `confirmation-dialog.tsx`)** — com a declaração marcada, "Enviar sinistro" abre um `AlertDialog` pedindo confirmação explícita ("Confirmar abertura do sinistro?"), por ser uma ação de consequência real (protocolo gerado, não é só salvar um rascunho). Cancelar fecha o diálogo sem enviar nada (foco retorna ao botão que abriu, comportamento nativo do Radix).
10. **Enviando (protocolando o sinistro)** — depois de confirmar no `AlertDialog`: conteúdo da etapa 3 fica desabilitado, botão mostra Spinner + "Protocolando...", região `aria-live` anuncia a mudança — mesmo padrão de todas as telas de 5A/`apolices-ativas`.
11. **Erro de sistema ao enviar** — o envio final (backend fictício) falha: `Alert` destrutivo substitui o resumo da etapa 3, com botão "Tentar novamente" que reenvia (volta ao estado 10). Sem gatilho natural de formulário para esse desfecho — ver "Composição, gatilho de demonstração".
12. **Sucesso — sinistro protocolado** — envio concluído: todo o conteúdo do `Card` troca (sem navegar de rota, mesmo mecanismo do estado "enviado" de `recuperacao-senha`/"Tudo pronto!" de `onboarding`) para uma tela de confirmação com número de protocolo fictício e dois CTAs de saída.

Fora de escopo, registrado como responsabilidade de fora desta tela:
- Edição ou acompanhamento de um sinistro já aberto (esta spec cobre só a criação; não existe tela de detalhe/status de sinistro nas 3 telas de 5B).
- Validação de tipo/tamanho real de arquivo (o "erro de upload" desta spec reaproveita o gatilho de demonstração do Pattern, não é uma regra de negócio real de MIME type/tamanho máximo).
- Filtrar "Tipo de sinistro" pela categoria da apólice selecionada (ex: só mostrar "Colisão" se a apólice for Auto) — lista de tipos é genérica nesta spec, ver "Lacunas" item 2.

## Composição — só peças reais do catálogo

Nenhum componente novo. Tudo abaixo já existe em `src/components/ui/` (Atoms/Molecules/Organisms confirmados em `src/lib/atomic-registry.ts`) ou é o mecanismo de um Pattern já catalogado (`src/lib/patterns-registry.ts`) reaplicado com conteúdo desta tela.

### Layout da página (moldura de portal, mesmo padrão de `apolices-ativas`)

- `<h1>` "Template — Novo sinistro" + parágrafo `text-muted-foreground` de contexto.
- `Select` "Cenário de envio (demonstração)" **fora** do container principal (mesma posição de `onboarding`/`apolices-ativas`: entre o parágrafo de contexto e o container `w-full rounded-lg border`) — ver "Gatilho de demonstração" abaixo.
- Container `w-full rounded-lg border` envolvendo a Sidebar mockada + área de conteúdo (mesmo padrão de `apolices-ativas`/`dashboard-financeiro` — **não** o padrão `bg-muted/30 min-h-[640px]` de Card centralizado isolado das telas de login, porque esta tela vive dentro do portal, não antes dele).

### Gatilho de demonstração — `Select` "Cenário de envio (demonstração)"

Convenção já ratificada (`.build/telas/PENDENCIAS.md` item 2 — "válido pras 2 telas restantes de 5B"), não reaberta aqui:

```
<Label htmlFor="cenario-envio">Cenário de envio (demonstração)</Label>
<Select value={cenario} onValueChange={setCenario}>
  <SelectTrigger id="cenario-envio" size="sm" className="w-56"><SelectValue /></SelectTrigger>
  <SelectContent>
    <SelectItem value="sucesso">Sucesso</SelectItem>
    <SelectItem value="falha">Falha ao protocolar</SelectItem>
  </SelectContent>
</Select>
```

Controla só o desfecho do envio final (depois da confirmação no `AlertDialog`, estado 9→10→11/12) — não interfere na validação de campo de nenhuma etapa nem no ciclo de vida individual dos uploads (esses continuam determinísticos pelo nome do arquivo, mesmo mecanismo do Pattern `upload.tsx`).

### Sidebar mockada — Organism `sidebar.tsx` (mesma composição de `apolices-ativas`, item ativo diferente)

- `SidebarProvider` (escopado) + `Sidebar collapsible="none"` + `SidebarHeader` + `SidebarContent` + `SidebarGroup`/`SidebarGroupLabel` + `SidebarMenu`/`SidebarMenuItem`/`SidebarMenuButton`.
- Mesmos 3 itens de `apolices-ativas`, com o item ativo trocado:
  - "Painel" (`LayoutDashboardIcon`) → `/templates/painel-corretor`.
  - "Apólices" (`ShieldCheckIcon`) → `/templates/apolices-ativas`.
  - "Sinistros" (`ClipboardListIcon`) → item ativo (esta própria tela). **Precisa de `aria-current="page"` explícito** (mesmo gap já documentado em `apolices-ativas.md`, item de acessibilidade 2 — `isActive` do `SidebarMenuButton` só estiliza, não seta o atributo sozinho).
- **Regra fixa do catálogo, não repetir o bug já corrigido em produção** (`.build/telas/RETROATIVO-MOBILE.md`): `<Sidebar collapsible="none" className="hidden h-full md:flex">` desde a primeira versão do código — nunca só `className="h-full"`. Ver "Requisitos de responsividade".

### Área de conteúdo — Organism `card.tsx` envolvendo o formulário multi-etapa

- `Card` único dentro da área de conteúdo do portal (mesmo espírito do card grande de `apolices-ativas`, mas aqui o conteúdo é um formulário sequencial, não uma tabela).
- `CardHeader`: `CardTitle` "Registrar novo sinistro" (`asChild`, `<h2>`) + `CardDescription` "Etapa {n} de 3" ou descrição fixa, mais `Badge variant="outline"` "Ambiente de demonstração" (mesmo padrão de todas as telas de Template).
- `CardContent`: Progress + heading da etapa + conteúdo condicional pelas 3 etapas (mesmo mecanismo de `onboarding`).
- `CardFooter`: navegação Voltar/Avançar/Enviar (ausente na tela de sucesso, mesmo padrão de `onboarding`).

### Progresso e cabeçalho de etapa (mecanismo do Pattern `multi-step-form.tsx`, já reaplicado em `onboarding`)

- Atom `progress.tsx` (`Progress value={((step + 1) / 3) * 100}`).
- `<p aria-live="polite" className="text-muted-foreground text-xs">Etapa {step + 1} de 3: {nomeDaEtapa}</p>`.
- `<h3 ref={headingRef} tabIndex={-1}>{nomeDaEtapa}</h3>`, com foco programático a cada mudança de `step` (mesmo mecanismo de `onboarding`, inclusive a mesma ressalva: o `autoFocus` do primeiro campo da etapa 1 prevalece só no mount inicial; o foco no heading passa a valer a partir da 1ª troca real de etapa).
- Nomes das 3 etapas: "Dados do sinistro", "Anexar documentos", "Revisão e confirmação".

### Etapa 1 — Dados do sinistro

- Molecule `field.tsx` (`Field`, `FieldLabel`) + Atom `select.tsx` (`Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`) — "Apólice relacionada" (obrigatório, `autoFocus` na entrada da etapa 1). Lista de apólices fictícias no mesmo formato de `apolices-ativas` (`AP-1042 — Carla Souza — Auto` etc.) — não precisa ser o array idêntico (telas não compartilham estado), só a mesma convenção de rotulagem.
- Molecule `field.tsx` (`FieldSet`, `Field orientation="horizontal"`, `FieldLabel`) + Atom `radio-group.tsx` (`RadioGroup`, `RadioGroupItem`) — "Tipo de sinistro" (obrigatório), composição validada em `src/components/examples/field-radio.tsx`. Opções sugeridas: Colisão/acidente, Roubo ou furto, Incêndio, Danos a terceiros, Outro.
- Molecule `field.tsx` (`Field`, `FieldLabel`) + Atom `popover.tsx` (`Popover`, `PopoverTrigger asChild`, `PopoverContent`) + Organism `calendar.tsx` (`Calendar mode="single"`) + Atom `button.tsx` (trigger) — "Data do ocorrido" (obrigatório), composição validada em `src/components/examples/date-picker-demo.tsx`. **Ajuste obrigatório em relação ao exemplo original**: o trigger do exemplo usa `w-[280px]` fixo — nesta tela o trigger deve ser `w-full sm:w-[280px]` (ou equivalente responsivo), nunca largura fixa sozinha, para não forçar overflow dentro do `Field` em telas estreitas (ver "Requisitos de responsividade"). Restringir a datas não-futuras (não é possível abrir sinistro de uma data que ainda não aconteceu) via prop `disabled` do `Calendar`/`react-day-picker` (ex: matcher `{ after: new Date() }`) — se essa restrição não for trivial de implementar, registrar como gap aceito em vez de bloquear a tela (ver "Lacunas" item 6).
- Molecule `field.tsx` (`Field`, `FieldLabel`) + Atom `textarea.tsx` (`Textarea`) — "Descrição do ocorrido" (obrigatório, texto livre — primeiro uso real de `Textarea` num Template do catálogo, confirmado disponível desde a Fase 2 do plano mas nunca usado até agora).
- Erro de validação (estado 3): `Field data-invalid` + `FieldError` (`role="alert"` embutido) abaixo de cada campo inválido, `aria-invalid`/`aria-describedby` nos Atoms correspondentes, foco programático no primeiro campo inválido (ordem visual: Apólice → Tipo → Data → Descrição) — mesmo padrão de `onboarding`/`login-erro-validacao`.

### Etapa 2 — Anexar documentos (mecanismo do Pattern `upload.tsx`)

Reaproveita a composição do Pattern real do catálogo (`src/components/patterns/upload.tsx`), sem alterar o mecanismo, só o texto/domínio:

```
<div role="button" tabIndex={0} onClick={...} onKeyDown={...} onDragOver={...} onDragLeave={...} onDrop={...}>
  <CloudUploadIcon />
  <p>Arraste arquivos aqui ou clique para selecionar</p>
  <input ref={inputRef} type="file" multiple className="sr-only" onChange={...} />
</div>

{items.map((item) => (
  <Attachment state={item.state} size="sm">
    <AttachmentMedia><FileIcon /></AttachmentMedia>
    <AttachmentContent>
      <AttachmentTitle>{item.nome}</AttachmentTitle>
      <AttachmentDescription>{/* Enviando.../Processando.../Falha no upload/Concluído */}</AttachmentDescription>
    </AttachmentContent>
    <AttachmentActions>
      <Button size="icon-xs" variant="ghost" aria-label={`Remover ${item.nome}`}><Trash2Icon /></Button>
    </AttachmentActions>
  </Attachment>
))}
```

- Texto de apoio abaixo da dropzone (não obrigatório campo a campo, só orientação): "Documentos sugeridos: boletim de ocorrência, fotos do ocorrido, nota fiscal" — texto estático, sem validação individual por tipo de documento.
- Erro de validação (estado 6): pelo menos 1 anexo precisa estar em `state="done"` para avançar. Mensagem `role="alert"` abaixo da dropzone (mesmo texto de "nenhum documento anexado ainda"), foco programático na própria dropzone (`ref` no `div[role="button"]`).

### Etapa 3 — Revisão e confirmação

- `<dl>` resumindo os dados da etapa 1 (mesmo padrão de `onboarding`/`multi-step-form.tsx`, `<dt>`/`<dd>` em grid): Apólice relacionada, Tipo de sinistro, Data do ocorrido, Descrição do ocorrido (esta última em `<dd className="col-span-2">` — texto livre mais longo que os demais campos, não cabe bem na mesma coluna estreita das outras respostas curtas, ver "Requisitos de responsividade").
- Lista somente-leitura dos documentos anexados (reaproveita os mesmos `Attachment`/`AttachmentContent`/`AttachmentTitle` da etapa 2, sem `AttachmentActions` de remover — nesta etapa o anexo já está confirmado, só é exibido).
- Atom `checkbox.tsx` (`Checkbox`) + Atom `label.tsx` (`Label htmlFor`) — "Declaro que as informações fornecidas são verdadeiras" (obrigatório). Erro de validação (estado 8): `FieldError` abaixo do `Checkbox`, foco programático nele ao falhar — mesmo padrão do "termos" de `onboarding`.
- Botão "Enviar sinistro" **não envia diretamente** — abre o `AlertDialog` de confirmação (estado 9, ver abaixo). Só fica habilitado (sem bloquear clique, mas validando no handler) depois do `Checkbox` marcado.

### Estado 9 — Confirmação antes do envio (mecanismo do Pattern `confirmation-dialog.tsx`)

Reaproveita a composição do Pattern real do catálogo (`src/components/patterns/confirmation-dialog.tsx`):

```
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button type="button">Enviar sinistro</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Confirmar abertura do sinistro?</AlertDialogTitle>
      <AlertDialogDescription>
        Depois de enviado, o sinistro entra em análise e não pode ser editado por aqui. Confira os dados na etapa de revisão antes de confirmar.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Revisar novamente</AlertDialogCancel>
      <AlertDialogAction onClick={enviar}>Confirmar envio</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

`AlertDialogAction` dispara `enviar()` (mesma função que decide sucesso/falha pelo `Select` de cenário) e fecha o diálogo (comportamento nativo do Radix) — o `Card` por trás passa a mostrar o estado 10 (Enviando). Cancelar ("Revisar novamente") só fecha o diálogo, sem sair da etapa 3, foco retorna ao botão "Enviar sinistro" (nativo do Radix, sem código extra).

### Estado 10 — Enviando (protocolando)

- Atom `button.tsx` (o próprio `AlertDialogAction`/estado pós-diálogo, ou um placeholder na etapa 3 enquanto o diálogo fecha): `aria-disabled`/`aria-busy`, conteúdo troca para Atom `spinner.tsx` (`Spinner aria-hidden="true"`) + "Protocolando...", região `aria-live="polite"` `sr-only` — mesmo padrão de `onboarding`/`apolices-ativas` (`aria-disabled` em vez de `disabled` nativo, com guarda `if (enviando) return` no handler correspondente).
- Conteúdo da etapa 3 (resumo, anexos, checkbox) fica visualmente desabilitado durante o envio.

### Estado 11 — Erro de sistema ao enviar

```
<Alert variant="destructive">
  <CircleAlertIcon />
  <AlertTitle ref={erroRef} tabIndex={-1}>Não foi possível protocolar o sinistro</AlertTitle>
  <AlertDescription>Verifique sua conexão e tente novamente.</AlertDescription>
</Alert>
```

Substitui o resumo da etapa 3 enquanto o erro estiver ativo (mesmo princípio do estado 8 de `onboarding`). Atom `button.tsx` (`Button variant="outline"`, `RotateCcwIcon`) "Tentar novamente" reenvia (volta ao estado 10) **sem reabrir o `AlertDialog`** — a confirmação já foi dada uma vez, reabrir o diálogo a cada tentativa de reenvio seria fricção desnecessária.

### Estado 12 — Sucesso (protocolo gerado)

Todo o `CardHeader`/`CardContent`/`CardFooter` trocam de conteúdo (mesmo mecanismo condicional já usado em `recuperacao-senha`/`onboarding`), sem navegar de rota:

- Círculo de ícone decorativo (`bg-primary/10 text-primary`) com `CheckCircle2Icon` (mesmo ícone já usado em `success-feedback.tsx`, reforça "confirmação positiva").
- `CardTitle` "Sinistro protocolado com sucesso" (`asChild`, `<h2>`, recebe `ref`/`tabIndex={-1}` e foco programático ao entrar neste estado — mesmo mecanismo do `tituloSucessoRef` de `onboarding`) + `CardDescription` com o número de protocolo fictício (ex: `Protocolo SIN-2026-04821`, gerado localmente, não persistido — ver "Lacunas" item 4).
- Dois CTAs no `CardFooter`: `Button asChild` (`Link href="/templates/painel-corretor"`) "Ir para o Painel do corretor" (`ArrowRightIcon`) como ação primária, e `Button variant="outline" asChild` (`Link href="/templates/apolices-ativas"`) "Voltar para Apólices" como ação secundária.

### Ações de navegação entre etapas (`CardFooter`, presente nas etapas 1-3, ausente nos estados 11/12)

- Atom `button.tsx` (`Button variant="outline"`) "Voltar" — `aria-disabled` na etapa 1 (`step === 0`), mesmo padrão de `onboarding`.
- Atom `button.tsx` (`Button type="button"`) "Avançar" (etapas 1-2, valida e avança) / o `AlertDialog` "Enviar sinistro" (etapa 3, substitui o botão de avançar simples).
- Layout `flex justify-between` (Voltar à esquerda, Avançar/Enviar à direita) — mesma disposição de `onboarding`.

## Navegação

| Ação/link | Destino | Observação |
|---|---|---|
| Chegada nesta tela (via "Abrir sinistro" ou item "Sinistros" de `apolices-ativas`) | — | Já cabeada: `apolices-ativas` navega para `/templates/novo-sinistro` desde que foi construída — nada a alterar nela. Sem dado pré-carregado (ver "Lacunas" item 1). |
| Item "Painel" (sidebar mockada) | `/templates/painel-corretor` | Rota ainda não construída (3ª tela de 5B) — link intencional, mesma situação já vivida por `apolices-ativas`. |
| Item "Apólices" (sidebar mockada) | `/templates/apolices-ativas` | Rota já construída e funcional. |
| Item "Sinistros" (sidebar mockada) | Permanece em `/templates/novo-sinistro` | Item ativo (a própria tela) — não navega, precisa de `aria-current="page"`. |
| Botão "Voltar" (etapas 2-3) | Permanece na rota | Só muda a etapa exibida. Desabilitado (`aria-disabled`) na etapa 1. |
| Botão "Avançar" (etapas 1-2, válido) | Permanece na rota | Avança para a próxima etapa. |
| Botão "Avançar" (etapa 1 ou 2, inválido) | Permanece na rota | Exibe erro de validação (estados 3/6), sem avançar. |
| Botão "Enviar sinistro" (etapa 3, declaração não marcada) | Permanece na rota | Exibe erro de validação (estado 8), sem abrir o `AlertDialog`. |
| Botão "Enviar sinistro" (etapa 3, declaração marcada) | Permanece na rota | Abre o `AlertDialog` de confirmação (estado 9). |
| "Revisar novamente" (dentro do `AlertDialog`) | Permanece na rota | Fecha o diálogo, sem enviar nada. Foco volta ao botão "Enviar sinistro". |
| "Confirmar envio" (dentro do `AlertDialog`, cenário = sucesso) | Permanece na rota | Fecha o diálogo, mostra o estado de envio (10), depois troca para a tela de sucesso (12), sem navegação de URL. |
| "Confirmar envio" (dentro do `AlertDialog`, cenário = falha) | Permanece na rota | Fecha o diálogo, mostra o estado de envio (10), depois exibe erro de sistema (11), sem trocar para a tela de sucesso. |
| Botão "Tentar novamente" (erro ao enviar) | Permanece na rota | Reenvia (volta ao estado 10), sem reabrir o `AlertDialog`. |
| Botão "Ir para o Painel do corretor" (tela de sucesso) | `/templates/painel-corretor` | Rota ainda não construída (Fase 5B). |
| Botão "Voltar para Apólices" (tela de sucesso) | `/templates/apolices-ativas` | Rota já construída e funcional. |
| Área de dropzone / botão "Remover" de cada anexo (etapa 2) | Permanece na rota | Sem navegação — só altera a lista local de anexos. |

## Requisitos de acessibilidade específicos desta tela

1. **Foco programático no heading de cada etapa** (`h3 ref={headingRef} tabIndex={-1}`) a cada mudança de `step` — mesmo mecanismo de `onboarding`/`multi-step-form.tsx`, indispensável porque a troca de etapa não navega de rota.
2. **Região `aria-live="polite"` anunciando "Etapa X de 3: {nome}"** a cada transição, complementando o `Progress` visual.
3. **Erro de validação — Etapa 1**: `FieldError` (`role="alert"` nativo) por campo, `aria-invalid`/`aria-describedby` no `Select`/`RadioGroup`/trigger do date picker/`Textarea`, foco programático no primeiro campo inválido na ordem visual (Apólice → Tipo → Data → Descrição).
4. **`RadioGroup` "Tipo de sinistro"**: cada `RadioGroupItem` com `Label` associado via `htmlFor`/`id` (mesma composição validada de `field-radio.tsx`); navegação por seta entre opções é nativa do Radix, não precisa de código extra.
5. **Date picker (Popover + Calendar)**: o `Button` trigger precisa expor o valor selecionado como texto visível (já é o caso, reaproveitando `date-picker-demo.tsx`), não só um ícone; navegação por teclado dentro do `Calendar` (setas, Enter, Escape) é nativa do `react-day-picker`, sem gap conhecido. Se a restrição de "não aceitar datas futuras" for implementada via `disabled` do `Calendar`, confirmar que dias desabilitados continuam anunciados como indisponíveis pelo componente (comportamento padrão do Radix/`react-day-picker`, não custom).
6. **Dropzone de upload**: `div[role="button"] tabIndex={0}` com `onKeyDown` tratando Enter/Espaço (mesmo mecanismo do Pattern `upload.tsx`) — clicável e operável por teclado, o `<input type="file" className="sr-only">` por baixo é o mecanismo real de seleção, o `div` decorativo de arrastar-e-soltar é reforço visual, não o único caminho.
7. **Mudança de estado de cada anexo** (`uploading`→`processing`→`done`/`error`) muda o texto de `AttachmentDescription` (visível, não só cor/ícone) — mesmo princípio WCAG 1.4.1 já aplicado em `selecao-perfil-corretora`/`onboarding` (nunca só cor/ícone como única fonte da informação).
8. **Cada botão "Remover" de anexo precisa de `aria-label` específico** incluindo o nome do arquivo (ex: "Remover comprovante.pdf") — mesmo padrão já implementado no Pattern `upload.tsx` real.
9. **Erro de validação — Etapa 2 (nenhum anexo concluído)**: mensagem com `role="alert"` abaixo da dropzone, foco programático na própria dropzone (`ref` no `div[role="button"]`) ao falhar.
10. **`Checkbox` de declaração (etapa 3)**: `Label` associado via `htmlFor`/`id`; erro de validação via `FieldError` (`role="alert"`) com foco programático no próprio `Checkbox` ao falhar — mesmo padrão do "termos" de `onboarding`.
11. **`AlertDialog` de confirmação**: título e descrição claros sobre a consequência da ação (mesmo padrão do Pattern `confirmation-dialog.tsx`); foco retorna automaticamente ao botão "Enviar sinistro" ao cancelar/fechar (comportamento nativo do Radix `AlertDialog`, sem código extra necessário) — não implementar gerenciamento de foco manual redundante aqui.
12. **Estado de envio (10)**: `aria-disabled`/`aria-busy` no botão de ação (não `disabled` nativo, mesmo motivo já documentado em `button.tsx` — evita o salto de foco pro `<body>`), com guarda `if (enviando) return` no handler; `Spinner aria-hidden="true"`; região `aria-live="polite"` `sr-only` anunciando "Protocolando...".
13. **Erro de sistema ao enviar (estado 11)**: `Alert variant="destructive"` expõe `role="alert"` nativo + foco programático no `AlertTitle` (`ref`/`tabIndex={-1}`/`.focus()`) — mesmo mecanismo já auditado nas 5 telas de 5A e em `apolices-ativas`.
14. **Transição para a tela de sucesso (estado 12) precisa de foco programático no `CardTitle`** ("Sinistro protocolado com sucesso") — troca de conteúdo relevante sem navegação de URL, mesmo mecanismo do `tituloSucessoRef` de `onboarding`.
15. **`Select` "Cenário de envio (demonstração)"**: `Label htmlFor` associado, fora do container principal, entra corretamente na ordem de tab — mesma exigência já auditada nos `Select`s de cenário anteriores.
16. **Item "Sinistros" da sidebar mockada precisa de `aria-current="page"` explícito** — mesmo gap já documentado em `apolices-ativas.md` (`isActive` do `SidebarMenuButton` só estiliza).
17. **Nenhum botão fica sem rótulo de texto visível** (Voltar/Avançar/Enviar sinistro/Confirmar envio/Revisar novamente/Tentar novamente/Ir para o Painel do corretor/Voltar para Apólices — todos com texto, sem ícone-only) — mesmo princípio já aplicado em todo o fluxo de 5A/5B. Exceção já esperada: o botão "Remover" de cada anexo é ícone-only, mas tem `aria-label` (item 8) — mesmo padrão já aceito no Pattern `upload.tsx` real.
18. **Gap conhecido do catálogo, não introduzido por esta tela**: `CardTitle` (`card.tsx`) renderiza `<div>` por padrão — mitigado nesta tela via `asChild` (`<h2>`) nos títulos de seção, mesmo padrão já aplicado nas 7 telas de Template anteriores.
19. **Ordem de tab dentro de cada etapa** segue a ordem visual (campos → Voltar → Avançar/Enviar), sem `tabIndex` manual além dos `ref`s de foco programático já listados — a Sidebar mockada não deve interceptar essa ordem (mesmo padrão já usado em `apolices-ativas`/`dashboard-financeiro`).

## Requisitos de responsividade específicos desta tela

Breakpoint de referência do projeto: `md` = 768px (mesmo usado em todo o catálogo/Tailwind). Nenhuma parte desta tela pode causar overflow horizontal da PÁGINA inteira em qualquer largura, inclusive 390px (viewport de referência do estágio `telas-mobile`).

1. **Sidebar mockada — regra fixa, não repetir o bug já corrigido em produção**: `<Sidebar collapsible="none" className="hidden h-full md:flex">` desde a primeira versão do código desta tela (nunca só `className="h-full"`, causa raiz documentada em `.build/telas/RETROATIVO-MOBILE.md`, já corrigida em `dashboard-financeiro`/`apolices-ativas`). Abaixo de `md`, a sidebar mockada some inteiramente — a navegação real do mobile já é o hambúrguer da `AppShell`, não precisa duplicar. A área de conteúdo (`min-w-0 flex-1`) ocupa 100% da largura quando a sidebar está escondida.
2. **Date picker (Popover + Calendar), risco já conhecido pelo estágio `telas-mobile`**: o exemplo de referência (`date-picker-demo.tsx`) usa `w-[280px]` fixo no trigger — **não reaproveitar essa largura fixa sozinha nesta tela**. Usar `w-full sm:w-[280px]` (ou equivalente: fixo só a partir de `sm`/`md`, `w-full` abaixo disso) para o `Button` trigger, já que o `Field` que o envolve pode ficar mais estreito que 280px em telas pequenas (390px de largura útil, descontando padding do `Card`/container). O `PopoverContent` com o `Calendar` já é `w-auto`, sem risco — o ponto de atenção é só o trigger.
3. **Formulário de cada etapa (Field a Field)**: já empilha em coluna única por padrão (nenhum `grid`/`flex-row` nas etapas 1/2) — sem ajuste necessário, mas conferir que nenhum `Input`/`Select`/`Textarea` recebe largura fixa em `px` (todos devem ser `w-full` dentro do `Field`, mesmo padrão já usado em `onboarding`).
4. **`RadioGroup` "Tipo de sinistro"**: cada opção em `Field orientation="horizontal"` (label ao lado do radio) — como o texto de cada opção é curto (ex: "Roubo ou furto"), não precisa de ajuste para empilhar verticalmente abaixo de `md`; se o Rafael adicionar uma opção com texto bem mais longo depois, reavaliar quebra de linha.
5. **`Textarea` "Descrição do ocorrido"**: `w-full` nativo do componente, sem risco de overflow — altura cresce verticalmente (`rows`), não horizontalmente.
6. **Dropzone de upload**: `p-8` com texto centralizado, sem largura fixa — em 390px o texto "Arraste arquivos aqui ou clique para selecionar" deve quebrar em 2 linhas naturalmente (`text-center`), sem overflow.
7. **Lista de anexos (`Attachment`)**: `flex flex-wrap gap-3` (mesmo padrão do Pattern `upload.tsx` real) — os itens quebram linha em vez de forçar scroll horizontal. Confirmar que nenhum `Attachment` individual recebe `min-width` maior que a largura útil em 390px (o Pattern original usa `size="sm"`, que já é compacto).
8. **`<dl>` de revisão (etapa 3)**: usar `grid grid-cols-1 sm:grid-cols-2` (diferente do `grid-cols-2` fixo usado em `onboarding.tsx`) — decisão desta spec porque um dos pares é "Descrição do ocorrido", texto livre potencialmente longo, que fica melhor em `<dd className="col-span-2 sm:col-span-1">`... **ajuste**: como a descrição precisa de largura total mesmo em telas maiores (texto corrido, não um valor curto tipo "Ativado"/"Desativado"), o par Descrição deve ser `<dt className="sm:col-span-2">`/`<dd className="sm:col-span-2">` (ocupa as 2 colunas em qualquer largura ≥ `sm`), os demais pares (Apólice/Tipo/Data) seguem `grid-cols-1 sm:grid-cols-2` normal. Abaixo de `sm`, tudo em coluna única de qualquer forma, sem risco de overflow.
9. **Lista somente-leitura de anexos na revisão (etapa 3)**: mesma regra do item 7 (`flex flex-wrap`).
10. **`AlertDialog` de confirmação**: `AlertDialogContent` já é responsivo nativamente (centralizado, com `max-width` interno do componente) — sem ajuste necessário, mas confirmar que a descrição não recebe `white-space: nowrap` nem largura mínima forçada.
11. **Botões do `CardFooter`** (Voltar / Avançar / Enviar sinistro): `flex justify-between`, sem `flex-wrap` necessário — os rótulos são curtos o suficiente para caber lado a lado mesmo em 390px (mesmo padrão já validado em `onboarding`, que usa os mesmos dois botões com rótulos de tamanho parecido).
12. **Nenhuma tabela larga nesta tela** (diferente de `apolices-ativas`) — não há risco de precisar do `overflow-x-auto` embutido do `Table`, esse achado não se aplica aqui.
13. **Verificação obrigatória do estágio `telas-mobile`**: medir `document.documentElement.scrollWidth > window.innerWidth` em 390×844 nos 4 estados visualmente distintos mais prováveis de quebrar — etapa 1 (formulário), etapa 2 com pelo menos 1 anexo em cada estado do ciclo de vida, etapa 3 (revisão com `<dl>` + anexos), e a tela de sucesso (estado 12, dois botões no `CardFooter`).

## Lacunas para o Rafael decidir

Decisões PROVISÓRIAS tomadas em Modo autônomo (`PLANO-LOOP-80-20-TEMPLATES.md`, linhas ~54-70), pela opção mais barata de reverter e mais consistente com o que já existe no catálogo:

1. **PROVISÓRIO — Persistência de dados entre `apolices-ativas` e `novo-sinistro`**: mesma decisão já tomada e documentada em `apolices-ativas.md` (Lacunas item 1) — nenhum mecanismo novo introduzido, esta tela não recebe a apólice de origem, o campo "Apólice relacionada" (etapa 1) começa sempre vazio. **Como reverter**: `apolices-ativas` passar `?apolice=AP-1042` na URL do botão "Abrir sinistro", e esta tela ler via `useSearchParams` para pré-selecionar o `Select` — mudança isolada nas 2 telas.
2. **Lista de "Tipo de sinistro" genérica, não filtrada pela categoria da apólice selecionada**: um produto real provavelmente só mostraria "Colisão/acidente" para apólices Auto, por exemplo. Fora de escopo desta spec (aumentaria a complexidade do formulário sem pedido explícito) — se o Rafael quiser esse comportamento, é um ajuste pontual no `onValueChange` do `Select` de apólice filtrando as opções do `RadioGroup`.
3. **Confirmação via `AlertDialog` em vez de só uma 4ª etapa do wizard**: decisão desta spec — tratar "confirmação" (rótulo explícito do plano, "fluxo-multi-etapa-com-upload-e-confirmação") como um gate modal antes do envio, não como mais uma etapa do `Progress`, porque semanticamente é uma confirmação de uma ação irreversível (mesmo critério de "quando usar" já documentado no Pattern `confirmation-dialog.tsx`), não mais um passo de preenchimento. Se o Rafael preferir uma etapa "Confirmação" dentro do próprio wizard (sem modal), é uma reestruturação pontual desta spec — reverter é trocar o `AlertDialog` por uma 4ª etapa com `<dl>` + botão "Enviar sinistro" direto.
4. **Número de protocolo fictício, gerado localmente, não persistido**: mesmo princípio de dado fictício já usado em todo o catálogo (ex: saldo do `dashboard-financeiro`) — não há backend real, o valor existe só para dar realismo à tela de sucesso.
5. **Erro de sistema ao enviar modelado só no envio final (depois do `AlertDialog`)** — mesma lacuna sistêmica já registrada em todas as telas de 5A/`apolices-ativas`: nenhuma tela do catálogo modela falha de rede genérica fora do ponto de submissão/carregamento principal.
6. **Restrição de "data do ocorrido não pode ser futura"**: pedida na Composição (Etapa 1) como requisito, mas a viabilidade de implementar via `disabled` do `Calendar` depende de confirmação do `telas-construtor` ao ler o código-fonte de `calendar.tsx`/`react-day-picker` — se não for trivial, aceitar como gap conhecido (usuário pode tecnicamente escolher uma data futura, sem validação de bloqueio) em vez de bloquear a tela por causa disso.
7. **Erro de upload individual (`.exe`) é o mesmo gatilho de demonstração do Pattern `upload.tsx` real**, não uma regra de negócio (tipo de arquivo permitido, tamanho máximo) — mantido idêntico ao Pattern catalogado, para não inventar uma regra de validação de arquivo que não existe em nenhum outro lugar do catálogo.
8. **Sem tela de detalhe/acompanhamento do sinistro depois de protocolado**: as 3 telas de 5B não incluem uma tela de status de sinistro — se o produto real precisar disso, é uma 4ª tela fora do escopo atual, mesma lógica já registrada em `apolices-ativas.md` (Lacunas item 3, sem tela de detalhe de apólice).
