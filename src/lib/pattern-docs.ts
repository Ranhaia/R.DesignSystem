// Documentação dos 15 Patterns (mapa original em plans/current/design-system-piloto.md).
// Mesma regra do component-docs.ts: description/whenToUse/doGuidelines/
// dontGuidelines ficam como placeholder "[a preencher]" — conteúdo que
// Rafael escreve depois. `composition` e `accessibility` são reais,
// derivados do componente funcional de fato implementado em
// src/components/patterns/[slug].tsx — não são suposições.

export interface PatternDoc {
  description: string
  whenToUse: string
  composition: string[]
  accessibility: string[]
  doGuidelines: string[]
  dontGuidelines: string[]
  code: string
}

export const patternDocs: Record<string, PatternDoc> = {
  "empty-state": {
    description: "Mostra que uma lista ou área não tem conteúdo ainda.",
    whenToUse: "Primeira visita a uma listagem, ou depois de um filtro sem resultado.",
    composition: [
      "Empty / EmptyHeader / EmptyMedia / EmptyTitle / EmptyDescription / EmptyContent (Molecule \"empty\")",
      "Button (Atom)",
    ],
    accessibility: [
      "EmptyTitle e EmptyDescription renderizam <div>, não um heading semântico — se essa for a única mensagem da seção, considere um heading real (h2/h3) acima ou um aria-label no contêiner.",
      "A ação principal é um Button real, focável e acionável por teclado — não um link decorativo.",
    ],
    doGuidelines: ["Sempre ofereça uma ação principal (ex: criar o primeiro item)."],
    dontGuidelines: ["Não deixe a área vazia sem nenhuma orientação do que fazer a seguir."],
    code: `import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

<Empty className="border">
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Icon name="inbox" />
    </EmptyMedia>
    <EmptyTitle>Nenhuma apólice encontrada</EmptyTitle>
    <EmptyDescription>Crie a primeira apólice para começar.</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Nova apólice</Button>
  </EmptyContent>
</Empty>`,
  },

  loading: {
    description: "Indica que uma operação está em andamento e o conteúdo será exibido em breve.",
    whenToUse: "Ao carregar dados de API, processar uploads, ou navegar entre páginas.",
    composition: ["Card / CardContent (Organism)", "Button (Atom)", "Spinner (Atom)"],
    accessibility: [
      "Spinner já tem role=\"status\" + aria-label embutidos (Atom).",
      "Região aria-live=\"polite\" (sr-only) anuncia a transição carregando → carregado pra quem usa leitor de tela.",
      "Botão fica disabled durante o carregamento, evitando disparo duplicado da ação.",
    ],
    doGuidelines: ["Use skeleton para conteúdo conhecido, spinner para operações genéricas."],
    dontGuidelines: ["Não mantenha loading por mais de 10s sem feedback alternativo."],
    code: `const [loading, setLoading] = useState(false)

function handleLoad() {
  setLoading(true)
  setTimeout(() => setLoading(false), 1500)
}

<Button onClick={handleLoad} disabled={loading}>
  {loading && <Spinner />}
  Atualizar
</Button>
<p aria-live="polite" className="sr-only">
  {loading ? "Carregando dados" : ""}
</p>`,
  },

  "error-state": {
    description: "Informa que algo deu errado e orienta o usuário sobre o que fazer.",
    whenToUse: "Falha de rede, erro de servidor, permissão negada, recurso não encontrado.",
    composition: ["Alert / AlertTitle / AlertDescription (Molecule)", "Button (Atom)"],
    accessibility: [
      "Alert já renderiza role=\"alert\" (Molecule) — o leitor de tela anuncia o erro automaticamente quando o nó entra no DOM, sem aria-live manual.",
      "O foco é movido programaticamente pro título do erro (ref + tabIndex=-1 + .focus()) ao aparecer — sem isso, o foco ficaria \"perdido\" no elemento que disparou a falha.",
      "A ação de recuperação (\"Tentar novamente\") é o primeiro elemento focável depois do título.",
    ],
    doGuidelines: ["Ofereça ação para tentar novamente ou voltar. Seja específico sobre o erro."],
    dontGuidelines: ["Não use linguagem técnica ou código de erro sem explicação."],
    code: `const titleRef = useRef<HTMLDivElement>(null)
useEffect(() => { titleRef.current?.focus() }, [hasError])

<Alert variant="destructive">
  <Icon name="cloud_off" />
  <AlertTitle ref={titleRef} tabIndex={-1}>
    Não foi possível carregar o sinistro
  </AlertTitle>
  <AlertDescription>
    <Button size="sm" variant="outline" onClick={handleRetry}>
      Tentar novamente
    </Button>
  </AlertDescription>
</Alert>`,
  },

  skeleton: {
    description: "[a preencher]",
    whenToUse: "[a preencher]",
    composition: ["Skeleton (Atom)", "Avatar / AvatarFallback (Atom)", "Button (Atom)"],
    accessibility: [
      "Contêiner com aria-busy enquanto o Skeleton está visível.",
      "Região aria-live=\"polite\" (sr-only) anuncia a transição carregando/carregado — o Skeleton em si (só animate-pulse) não tem papel ARIA próprio.",
    ],
    doGuidelines: ["[a preencher]"],
    dontGuidelines: ["[a preencher]"],
    code: `<div aria-busy={!loaded} className="flex items-center gap-3">
  {loaded ? (
    <Avatar><AvatarFallback>CS</AvatarFallback></Avatar>
  ) : (
    <Skeleton className="size-10 rounded-full" />
  )}
</div>
<p aria-live="polite" className="sr-only">
  {loaded ? "Conteúdo carregado" : "Carregando conteúdo"}
</p>`,
  },

  "success-feedback": {
    description: "Confirma que uma ação foi concluída com sucesso.",
    whenToUse: "Após salvar, enviar, criar ou excluir um recurso.",
    composition: ["Alert / AlertTitle / AlertDescription (Molecule)", "Button (Atom)"],
    accessibility: [
      "Mesma vantagem do role=\"alert\" embutido no Alert — a confirmação é anunciada assim que aparece.",
      "Diferente de um toast, fica fixa na tela como referência permanente da ação concluída.",
    ],
    doGuidelines: ["Seja breve e específico sobre o que foi concluído."],
    dontGuidelines: ["Não use para ações óbvias como clicar em \"Salvar\" sem contexto."],
    code: `{saved && (
  <Alert>
    <Icon name="check_circle" />
    <AlertTitle>Alterações salvas</AlertTitle>
    <AlertDescription>
      Os dados da apólice foram atualizados com sucesso.
    </AlertDescription>
  </Alert>
)}
<Button onClick={() => setSaved(true)} disabled={saved}>
  Salvar alterações
</Button>`,
  },

  "search-experience": {
    description: "Padroniza a experiência de busca com input, resultados e estados.",
    whenToUse: "Qualquer funcionalidade de busca na aplicação.",
    composition: [
      "InputGroup / InputGroupAddon / InputGroupInput (Molecule input-group)",
      "Item / ItemContent / ItemTitle (Atom item)",
      "Empty / EmptyTitle / EmptyDescription (Molecule empty)",
    ],
    accessibility: [
      "Campo de busca tem aria-label explícito (\"Buscar apólice\"), já que não há <label> visível associado.",
      "Contagem de resultados é anunciada via aria-live=\"polite\" a cada tecla digitada.",
      "Estado vazio reaproveita o pattern Empty State em vez de só remover a lista sem explicação.",
    ],
    doGuidelines: ["Mostre resultados parciais enquanto digita. Indique quando não há resultados."],
    dontGuidelines: ["Não esconda o input de busca em menus ou submenus."],
    code: `const results = items.filter((item) => matches(item, query))

<InputGroup>
  <InputGroupAddon><Icon name="search" /></InputGroupAddon>
  <InputGroupInput
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    aria-label="Buscar apólice"
  />
</InputGroup>
<p aria-live="polite">{results.length} resultados encontrados</p>`,
  },

  crud: {
    description: "Padroniza o fluxo de criar, ler, atualizar e deletar recursos.",
    whenToUse: "Qualquer entidade gerenciável no sistema (produtos, usuários, pedidos).",
    composition: [
      "Table (Organism)",
      "Dialog (Organism) — criar/editar",
      "AlertDialog (Organism) — confirmar exclusão",
      "Field / FieldLabel / FieldContent (Molecule field)",
      "Input (Atom)",
      "Button (Atom)",
    ],
    accessibility: [
      "Cada botão de ação na linha da tabela tem aria-label específico (ex: \"Editar Carla Souza\"), não só um ícone mudo.",
      "Exclusão sempre passa por AlertDialog de confirmação antes de remover (Pattern Confirmation Dialog aplicado aqui dentro).",
      "O Dialog de criar/editar é totalmente controlado (open/onOpenChange) — não depende de um trigger visível por linha.",
    ],
    doGuidelines: ["Use o mesmo padrão de formulário, listagem e confirmação para todas as entidades."],
    dontGuidelines: ["Não crie fluxos CRUD inconsistentes entre entidades diferentes."],
    code: `<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>{editing ? "Editar corretor" : "Novo corretor"}</DialogTitle>
    </DialogHeader>
    <Field>
      <FieldLabel htmlFor="nome">Nome</FieldLabel>
      <FieldContent>
        <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      </FieldContent>
    </Field>
    <DialogFooter>
      <Button onClick={handleSave}>Salvar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },

  "multi-step-form": {
    description: "Guia o usuário através de formulários longos divididos em etapas.",
    whenToUse: "Cadastro complexo, onboarding, configuração em etapas.",
    composition: [
      "Field / FieldLabel / FieldContent (Molecule field)",
      "Input, Select (Atom)",
      "Progress (Atom)",
    ],
    accessibility: [
      "O foco move programaticamente pro heading (h3) da etapa atual a cada mudança de step — sem isso, o foco ficaria no botão \"Avançar\" da etapa anterior.",
      "Região aria-live=\"polite\" anuncia \"Etapa X de Y\" a cada transição.",
      "O Progress reforça visualmente o avanço, mas o texto (\"Etapa X de Y\") é o que importa pra quem não vê a barra.",
    ],
    doGuidelines: ["Mostre o progresso e permita voltar à etapa anterior."],
    dontGuidelines: ["Não use para formulários com menos de 3 etapas."],
    code: `const headingRef = useRef<HTMLHeadingElement>(null)
useEffect(() => { headingRef.current?.focus() }, [step])

<Progress value={((step + 1) / steps.length) * 100} />
<p aria-live="polite">Etapa {step + 1} de {steps.length}: {steps[step]}</p>
<h3 ref={headingRef} tabIndex={-1}>{steps[step]}</h3>`,
  },

  "confirmation-dialog": {
    description: "Pede confirmação antes de executar uma ação importante ou destrutiva.",
    whenToUse: "Excluir recurso, cancelar alterações não salvas, ação irreversível.",
    composition: ["AlertDialog (Organism)"],
    accessibility: [
      "Comportamento nativo do Radix: o foco retorna pro elemento que abriu o diálogo ao cancelar/fechar, sem código extra.",
      "Título e descrição do AlertDialogContent já são lidos automaticamente pelo leitor de tela ao abrir (padrão Radix).",
    ],
    doGuidelines: ["Nomeie o botão de confirmação com a ação específica (Excluir, Arquivar)."],
    dontGuidelines: ["Não use para ações reversíveis ou de baixo impacto."],
    code: `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Cancelar assinatura</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Cancelar assinatura?</AlertDialogTitle>
      <AlertDialogDescription>
        Essa ação não pode ser desfeita depois de confirmada.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Manter assinatura</AlertDialogCancel>
      <AlertDialogAction>Cancelar assinatura</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`,
  },

  "delete-flow": {
    description: "Padroniza o fluxo completo de exclusão de um recurso.",
    whenToUse: "Excluir qualquer entidade do sistema.",
    composition: [
      "AlertDialog (Organism)",
      "Item / ItemActions / ItemContent / ItemTitle (Atom item)",
      "Button (Atom)",
      "toast (sonner)",
    ],
    accessibility: [
      "Feedback pós-exclusão usa toast com ação \"Desfazer\" acessível por teclado — não é só um texto que desaparece.",
      "A confirmação prévia (AlertDialog) evita que a ação destrutiva aconteça sem intenção clara.",
    ],
    doGuidelines: ["Sempre peça confirmação. Ofereça desfazer quando possível."],
    dontGuidelines: ["Não exclua sem confirmação. Não use apenas um clique para exclusão."],
    code: `function handleDelete(doc) {
  setDocs((prev) => prev.filter((d) => d.id !== doc.id))
  toast(\`"\${doc.nome}" removido\`, {
    action: { label: "Desfazer", onClick: () => restore(doc) },
  })
}`,
  },

  pagination: {
    description: "Padroniza a navegação entre páginas de uma lista.",
    whenToUse: "Listas com mais de 20 itens, resultados de busca, tabelas grandes.",
    composition: [
      "Pagination / PaginationContent / PaginationItem / PaginationLink / PaginationPrevious / PaginationNext (Molecule pagination)",
      "Table (Organism)",
    ],
    accessibility: [
      "Pagination já inclui nav role=\"navigation\" aria-label=\"pagination\" e aria-current=\"page\" no link ativo — embutido no Molecule, sem ajuste necessário.",
    ],
    doGuidelines: ["Mostre o total de páginas e destaque a página atual."],
    dontGuidelines: ["Não use pagination para menos de 10 itens."],
    code: `const items = allItems.slice((page - 1) * pageSize, page * pageSize)

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} />
    </PaginationItem>
    {pages.map((p) => (
      <PaginationItem key={p}>
        <PaginationLink isActive={p === page} onClick={() => setPage(p)}>
          {p}
        </PaginationLink>
      </PaginationItem>
    ))}
  </PaginationContent>
</Pagination>`,
  },

  "infinite-scroll": {
    description: "Carrega mais conteúdo conforme o usuário rola a página.",
    whenToUse: "Feeds, timelines, galerias, resultados de busca contínua.",
    composition: ["Button (Atom)", "Spinner (Atom)"],
    accessibility: [
      "IntersectionObserver carrega mais itens automaticamente ao chegar no fim da lista, mas o botão \"Carregar mais\" continua sempre visível e funcional — a rolagem não é a única forma de acionar o carregamento.",
      "Região aria-live=\"polite\" (sr-only) anuncia quantos itens já foram carregados no total.",
    ],
    doGuidelines: ["Mostre indicador de carregamento ao buscar mais itens."],
    dontGuidelines: ["Não use infinite-scroll para conteúdo que o usuário precisa encontrar rapidamente."],
    code: `useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting && !loading) loadMore()
  })
  observer.observe(sentinelRef.current!)
  return () => observer.disconnect()
}, [loading])

<Button onClick={loadMore} disabled={loading}>
  {loading && <Spinner />}
  Carregar mais
</Button>
<p aria-live="polite" className="sr-only">{items.length} itens carregados</p>`,
  },

  filters: {
    description: "Padroniza a aplicação de filtros em listas e tabelas.",
    whenToUse: "Qualquer listagem que precise de refinamento por critérios.",
    composition: [
      "Popover / PopoverTrigger / PopoverContent (Atom popover)",
      "Checkbox, Label (Atom)",
      "Badge (Atom)",
    ],
    accessibility: [
      "Cada Badge de filtro aplicado tem um botão de remover com aria-label descritivo (ex: \"Remover filtro Auto\"), não só um ícone de X sem contexto.",
      "A contagem de resultados é anunciada via aria-live=\"polite\" a cada filtro ligado/desligado.",
    ],
    doGuidelines: ["Mostre os filtros ativos como chips removíveis."],
    dontGuidelines: ["Não esconda os filtros aplicados — o usuário precisa saber o que está filtrando."],
    code: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" size="sm"><Icon name="tune" />Filtros</Button>
  </PopoverTrigger>
  <PopoverContent>
    {categorias.map((c) => (
      <div key={c} className="flex items-center gap-2">
        <Checkbox checked={selected.includes(c)} onCheckedChange={() => toggle(c)} />
        <Label>{c}</Label>
      </div>
    ))}
  </PopoverContent>
</Popover>
{selected.map((c) => (
  <Badge key={c}>{c} <button aria-label={\`Remover filtro \${c}\`}>×</button></Badge>
))}`,
  },

  "filter-panel": {
    description: "Painel dedicado com múltiplos critérios de filtro avançados.",
    whenToUse: "Listas complexas com muitos campos filtráveis (relatórios, analytics).",
    composition: [
      "Popover / PopoverTrigger / PopoverContent (Atom popover)",
      "Command / CommandInput / CommandList / CommandGroup / CommandItem / CommandEmpty (Molecule command)",
      "Select / SelectTrigger / SelectContent / SelectItem / SelectValue (Molecule select)",
      "Calendar (Organism calendar, mode=\"range\")",
      "Badge (Atom)",
      "Button (Atom)",
    ],
    accessibility: [
      "O ícone dentro de cada chip é decorativo (o texto do chip já diz o valor) — leva aria-hidden=\"true\", não duplica informação pra leitor de tela.",
      "Cada chip de filtro aplicado tem um botão de remover com aria-label descritivo incluindo campo E valor (ex: \"Remover filtro Produto: Auto\"), não só um ícone de X sem contexto — mais específico que o Pattern \"Filters\" original porque aqui há vários campos diferentes ao mesmo tempo.",
      "A contagem de resultados é anunciada via aria-live=\"polite\" a cada filtro ligado/desligado.",
      "O campo multi-select (Produto) não fecha o Popover ao marcar um item — permite marcar vários em sequência sem reabrir; os campos de valor único (Corretora, Segurado) fecham ao selecionar, reduzindo passos.",
    ],
    doGuidelines: ["Agrupe filtros por categoria. Ofereça \"Limpar todos\"."],
    dontGuidelines: ["Não coloque filtros de baixo uso no painel principal."],
    code: `// Ícone é do CAMPO, não do valor — "Produto A", "Produto B"... usam o
// mesmo ícone. Única fonte, reaproveitada no controle E no chip.
const CAMPO_ICONE = { produto: "bar_chart", corretora: "shield", /* ... */ }

<Button variant="outline" size="sm">
  <Icon name="bar_chart" aria-hidden="true" />
  Produto
  {produtos.length > 0 && <Badge variant="secondary">{produtos.length}</Badge>}
</Button>

{chips.map((chip) => (
  <Badge key={chip.id} variant="secondary" className="gap-1.5">
    <Icon name={chip.icon} aria-hidden="true" />
    {chip.label}
    <button aria-label={\`Remover filtro \${chip.campo}: \${chip.label}\`} onClick={chip.onRemove}>
      <Icon name="close" size={0.75} />
    </button>
  </Badge>
))}`,
  },

  upload: {
    description: "Padroniza o fluxo de upload de arquivos com feedback de progresso.",
    whenToUse: "Upload de imagens, documentos, planilhas, qualquer arquivo.",
    composition: [
      "Attachment / AttachmentMedia / AttachmentContent / AttachmentTitle / AttachmentDescription / AttachmentActions (Molecule attachment)",
      "Button (Atom)",
    ],
    accessibility: [
      "A área de arrastar-e-soltar tem um <input type=\"file\"> real por baixo, acessível por teclado (role=\"button\" + tabIndex + Enter/Espaço) — arrastar não é a única forma de anexar.",
      "Cada anexo mostra a descrição textual do estado (\"Enviando...\", \"Processando...\", \"Falha no upload\", \"Concluído\"), não só uma cor ou ícone.",
    ],
    doGuidelines: ["Mostre progresso individual por arquivo. Valide tipo e tamanho antes de enviar."],
    dontGuidelines: ["Não aceite upload sem validação de tipo/tamanho."],
    code: `<div role="button" tabIndex={0} onClick={() => inputRef.current?.click()}
  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") inputRef.current?.click() }}
  onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
  <Icon name="cloud_upload" />
  <input ref={inputRef} type="file" multiple className="sr-only" onChange={handleFiles} />
</div>

<Attachment state={item.state} size="sm">
  <AttachmentMedia><Icon name="draft" /></AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>{item.nome}</AttachmentTitle>
    <AttachmentDescription>{stateLabel[item.state]}</AttachmentDescription>
  </AttachmentContent>
</Attachment>`,
  },

  "toast-strategy": {
    description: "Define quando e como usar notificações toast na aplicação.",
    whenToUse: "Feedbacks temporários, notificações não-críticas, confirmações rápidas.",
    composition: ["Button (Atom)", "toast (sonner, via <Toaster /> em app-shell.tsx)"],
    accessibility: [
      "O Sonner já anuncia toasts via região aria-live própria, embutida na biblioteca — nenhum ajuste manual necessário.",
      "Toasts de erro usam cor distinta, mas o TEXTO da mensagem é o que carrega a informação real pra quem usa leitor de tela, não só a cor.",
    ],
    doGuidelines: ["Use para feedbacks que não exigem ação do usuário. Agrupe notificações."],
    dontGuidelines: ["Não use toast para erros críticos ou mensagens que exigem ação."],
    code: `<Button onClick={() => toast.success("Apólice renovada com sucesso")}>Sucesso</Button>
<Button onClick={() => toast.error("Não foi possível enviar o sinistro")}>Erro</Button>
<Button onClick={() => toast.warning("O prazo de vigência termina em 3 dias")}>Aviso</Button>
<Button
  onClick={() =>
    toast.promise(() => sendClaim(), {
      loading: "Enviando sinistro...",
      success: "Sinistro enviado",
      error: "Falha ao enviar",
    })
  }
>
  Ação assíncrona
</Button>`,
  },

  "reactive-dashboard-panel": {
    description: "Orquestração de painéis interativos onde cada widget assina um Contrato Tridimensional (Exposed State, Event Triggers e Imperative Actions), permitindo sincronização reativa e desacoplada inspirada no ToolJet.",
    whenToUse: "Dashboards analíticos, painéis operacionais, estúdios interativos ou telas onde a seleção em um componente altera múltiplos outros.",
    composition: [
      "PanelProvider / useWidgetContract / useWidgetState (reactive-panel)",
      "Card / CardHeader / CardTitle / CardDescription / CardContent (ui/card)",
      "Table / TableHeader / TableRow / TableHead / TableBody / TableCell (ui/table)",
      "Badge (ui/badge)",
      "Button (ui/button)",
    ],
    accessibility: [
      "Cada card do painel usa títulos estruturados (h2/h3) para facilitar navegação por leitor de tela.",
      "A tabela mantém marcação semântica de linhas interativas com foco por teclado e feedback de seleção visual com contraste auditado.",
    ],
    doGuidelines: [
      "Use useWidgetContract em widgets emissores para expor apenas os dados necessários.",
      "Consuma estados de outros widgets via useWidgetState sem acoplamento direto de referências.",
    ],
    dontGuidelines: [
      "Não faça prop-drilling de estados entre múltiplos níveis de cards dentro do painel.",
      "Não force re-renderizações globais da página quando apenas um widget dependente precisa atualizar.",
    ],
    code: `<PanelProvider id="analytics-panel">
  <div className="grid grid-cols-12 gap-6">
    <CustomerTableWidget />
    <CustomerInspectorWidget />
  </div>
</PanelProvider>`,
  },
}
