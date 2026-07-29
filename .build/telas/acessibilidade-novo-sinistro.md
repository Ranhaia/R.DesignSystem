# Auditoria de acessibilidade — `novo-sinistro`

Fonte: `.build/telas/novo-sinistro.md` (seção "Requisitos de acessibilidade
específicos desta tela", 19 itens) + código em
`src/app/templates/novo-sinistro/page.tsx`. Auditoria estática (leitura de
código), sem execução da aplicação.

Resumo: **15 dos 19 itens da spec passam sem ressalva**. 4 achados reais
(A, B, C, D abaixo) — a maioria **herdada de Patterns já catalogados**
(`field-radio.tsx`, `upload.tsx`), não introduzida por esta tela, mas ainda
assim afeta a experiência real de teclado/leitor de tela nesta composição
específica e vale a pena registrar.

---

## Passa

### 1. Foco programático no heading de cada etapa
`page.tsx:181-191` — `headingRef` movido para o `h3` a cada troca de `step`
(pulando o mount inicial, que já tem `autoFocus` no primeiro campo). `h3`
em `page.tsx:473-479` com `ref={headingRef} tabIndex={-1}`. Correto,
mecanismo idêntico ao `onboarding`.

### 2. Região `aria-live="polite"` "Etapa X de 3"
`page.tsx:465-470`:
```
<p aria-live="polite" className="text-muted-foreground text-xs">
  Etapa {step + 1} de 3: {NOMES_ETAPAS[step]}
</p>
```
Renderizada a cada etapa, complementa o `Progress` visual. Correto.

### 3. Erro de validação — Etapa 1
Cada campo (`Apólice`, `Data`, `Descrição`) tem `Field data-invalid`,
`FieldError` (`role="alert"` embutido em `field.tsx:225-234`),
`aria-invalid`/`aria-describedby` no Atom correspondente (ex:
`page.tsx:500-503`, `571-574`, `621-624`). Foco no primeiro campo inválido
respeita a ordem visual Apólice → Tipo → Data → Descrição
(`page.tsx:195-205`). Correto.

### 4 (parcial — ver achado A). `RadioGroupItem` com `Label` associado
Cada opção tem `id={tipo-${item.value}}` + `FieldLabel htmlFor` correspondente
(`page.tsx:537-548`) — igual à composição validada em
`src/components/examples/field-radio.tsx`. Navegação por seta é nativa do
Radix. Este item específico (label por opção) passa; o nome do grupo como
um todo tem um gap real, ver achado A.

### 5. Date picker
Trigger expõe o valor selecionado como texto visível, nunca só ícone
(`page.tsx:580-585`, `formatarDataCompleta`). Navegação por teclado dentro
do `Calendar` é nativa do `react-day-picker`. A restrição de "não aceitar
data futura" foi **implementada** (não apenas registrada como gap aceito):
```
<Calendar mode="single" selected={data} onSelect={...} disabled={{ after: new Date() }} />
```
(`page.tsx:589-597`) — vai além do mínimo que a spec pedia (Lacunas item 6
previa aceitar isso como gap se não fosse trivial).

### 6 (parcial — ver achado B). Dropzone operável por teclado
`div[role="button"] tabIndex={0}` com `onKeyDown` tratando Enter/Espaço,
inclusive com `event.preventDefault()` no Espaço (`page.tsx:642-647`) —
correção que o Pattern catalogado original (`upload.tsx:63-64`) nem tem
(lá o Espaço rolaria a página). Este ponto específico (o `div` responde a
teclado) passa; o gap real é o `<input>` por baixo, ver achado B.

### 7. Mudança de estado do anexo é textual, não só cor/ícone
`AttachmentDescription` troca de texto conforme `item.state`
(`page.tsx:702-710`: "Enviando..."/"Processando..."/"Falha no
upload"/"Concluído"). Cumpre WCAG 1.4.1.

### 8. Botão "Remover" com `aria-label` incluindo o nome do arquivo
`page.tsx:717`: `aria-label={\`Remover ${item.nome}\`}`. Correto.

### 9. Erro de validação — Etapa 2
`FieldError id="anexos-erro" role="alert"` abaixo da dropzone
(`page.tsx:681-685`), foco programático em `dropzoneRef`
(`page.tsx:208-212`). Correto.

### 10. `Checkbox` de declaração
`Label htmlFor="declaracao"` associado (`page.tsx:822-825`), `FieldError
role="alert"` (`page.tsx:827-831`), foco programático em `declaracaoRef`
ao falhar (`page.tsx:214-219`). Correto.

### 11 (com nota — ver achado E). `AlertDialog` de confirmação
Título/descrição claros sobre a consequência real da ação
(`page.tsx:878-884`). Foco deve retornar ao botão que abriu o diálogo via
comportamento nativo do `FocusScope` do Radix — ver achado E para uma
ressalva sobre como o diálogo é aberto nesta tela (sem
`AlertDialogTrigger`).

### 12. Estado de envio (10)
Botão com `aria-disabled={enviando}`/`aria-busy={enviando}`
(`page.tsx:853-854`), nunca `disabled` nativo. Guarda `if (enviando)
return` em `handleVoltar` e `enviar` (`page.tsx:271, 276`). `Spinner
aria-hidden="true"` (`page.tsx:858`). Região `aria-live="polite"
sr-only` anunciando "Protocolando..." (`page.tsx:834-836`). Conteúdo da
etapa 3 desabilitado visualmente via `<fieldset disabled={enviando}>`
(`page.tsx:754-757`). Correto, mesmo padrão de todas as 5A/`apolices-ativas`.

### 13. Erro de sistema ao enviar (11)
`Alert variant="destructive"` com `role="alert"` nativo do componente +
foco programático em `AlertTitle` via `erroSistemaRef`
(`page.tsx:733-741`, `221-226`). Correto.

### 14. Foco no título da tela de sucesso
`tituloSucessoRef` focado quando `concluido` vira `true`
(`page.tsx:228-234`), `h2 ref={tituloSucessoRef} tabIndex={-1}`
(`page.tsx:427-429`). Correto.

### 15. `Select` "Cenário de envio (demonstração)"
`Label htmlFor="cenario-envio"` + `SelectTrigger id="cenario-envio"`
(`page.tsx:360-367`), posicionado fora do container principal, entra na
ordem de tab naturalmente (antes do `Card`, no header da página). Correto.

### 16. `aria-current="page"` no item "Sinistros"
`page.tsx:405`: `<SidebarMenuButton isActive aria-current="page">`.
Explícito, não depende só de `isActive` (que só estiliza). Correto.

### 17. Nenhum botão sem rótulo de texto visível
Voltar/Avançar/Enviar sinistro/Confirmar envio/Revisar
novamente/Tentar novamente/Ir para o Painel do corretor/Voltar para
Apólices — todos com texto visível. Única exceção é o botão "Remover" de
cada anexo (ícone-only, mas com `aria-label`, item 8) — exceção já
prevista e coberta.

### 18. `CardTitle asChild` (`<h2>`)
Ambos os ramos (`concluido` e não-`concluido`) usam `asChild` com `<h2>`
explícito (`page.tsx:425-433`). Mitiga o gap conhecido do `card.tsx`
(`CardTitle` renderiza `<div>` por padrão).

### 19. Ordem de tab lógica dentro de cada etapa
Campos → Voltar → Avançar/Enviar, sem `tabIndex` positivo em lugar
nenhum do arquivo. A Sidebar mockada fica antes do conteúdo no DOM (mesma
posição visual, à esquerda), mesmo padrão já usado/aceito em
`apolices-ativas`/`dashboard-financeiro`; abaixo de `md` ela some
(`hidden md:flex`) e não intercepta a ordem no mobile.

### Itens genéricos do checklist (fora da lista numerada da spec)
- **Toggle mostrar/ocultar senha**: não se aplica, esta tela não tem
  campo de senha.
- **Progresso de multi-step anunciado, não só visual**: `Progress`
  (Radix) já expõe `role="progressbar"`/`aria-valuenow` nativamente
  (`src/components/ui/progress.tsx:14-27`), somado ao `aria-live` textual
  do item 2 — duplamente coberto.
- **Contraste/tokens**: nenhuma cor fora de token nesta tela — só
  utilitários semânticos (`text-muted-foreground`, `text-destructive`,
  `bg-primary/10 text-primary`, etc.), nenhum hex/arbitrary value novo.

---

## Achados (reais, com trecho e porquê)

### A. `RadioGroup` "Tipo de sinistro" não tem nome de grupo acessível
`page.tsx:522-557`:
```tsx
<FieldSet>
  <FieldLabel>Tipo de sinistro</FieldLabel>
  <RadioGroup value={tipo} onValueChange={...} aria-invalid={...} aria-describedby={...}>
    {TIPOS_SINISTRO.map((item, index) => (
      <Field key={item.value} orientation="horizontal">
        <RadioGroupItem value={item.value} id={`tipo-${item.value}`} .../>
        <FieldLabel htmlFor={`tipo-${item.value}`} className="font-normal">
          {item.label}
        </FieldLabel>
      </Field>
    ))}
  </RadioGroup>
  ...
</FieldSet>
```
`FieldSet` renderiza um `<fieldset>` nativo (`field.tsx:10-22`), mas o
nome acessível de um `<fieldset>` só vem de um `<legend>` filho. Aqui é
usado `FieldLabel` (que renderiza `<label>`, via `label.tsx`) sem
`htmlFor` — um `<label>` sem `htmlFor` não associa a nada
programaticamente, é só texto estilizado. Não há `aria-labelledby`/
`aria-label` no `RadioGroup` (o `role="radiogroup"`) apontando para esse
texto. Resultado prático: ao tabular até o primeiro `RadioGroupItem` (ex:
"Colisão/acidente"), um leitor de tela não anuncia "Tipo de sinistro" —
só o rótulo da opção individual e a posição ("1 de 5"). Isso é um gap
real de WCAG 1.3.1/4.1.2 (agrupamento de campos relacionados).

**Não é introduzido por esta tela** — é exatamente a mesma composição do
exemplo já "validado" `src/components/examples/field-radio.tsx:15-16`
(`<FieldSet><FieldLabel>Plano de assinatura</FieldLabel>...`), então é um
gap sistêmico do catálogo, não desta spec. Ainda assim, vale registrar
porque afeta esta tela na prática. Correção sugerida: trocar `FieldLabel`
por `FieldLegend` (já existe em `field.tsx:24-42`, renderiza `<legend>`
nativo) dentro do `FieldSet`, ou adicionar `aria-labelledby` no
`RadioGroup` apontando para o id do rótulo.

### B. `<input type="file">` da dropzone continua na ordem de tab, sem rótulo
`page.tsx:672-679`:
```tsx
<input
  ref={uploadInputRef}
  type="file"
  multiple
  className="sr-only"
  disabled={enviando}
  onChange={(event) => addFiles(event.target.files)}
/>
```
Está dentro do mesmo `div[role="button"] tabIndex={0}` da dropzone
(`page.tsx:637-680`). `sr-only` só esconde visualmente — não remove o
elemento da ordem de tab (não é `tabIndex={-1}`, `aria-hidden`, nem
`display:none`). Como `<input>` é nativamente focável, o usuário de
teclado que tabula pela etapa 2 encontra **duas paradas consecutivas**
para o que é visualmente um único controle: primeiro o `div[role=button]`
(com texto "Arraste arquivos aqui..."), depois o `input[type=file]` puro,
sem `label`/`aria-label` — a maioria dos leitores de tela anunciaria algo
genérico tipo "Escolher arquivo, nenhum arquivo selecionado", sem
contexto do que está sendo anexado. É um gap de WCAG 4.1.2 (controle sem
nome acessível claro) e de previsibilidade de navegação.

**Idêntico ao Pattern catalogado** `src/components/patterns/upload.tsx:83-89`
— também não é original desta tela, é herdado do mecanismo real do
catálogo que a spec mandou reaplicar sem alterar (`novo-sinistro.md`,
linha 106: "sem alterar o mecanismo"). Correção sugerida (fora do escopo
desta auditoria, que não edita `src/`): `tabIndex={-1}` no `input` (ele
já é acionado programaticamente via `.click()` pelo `div`, não precisa
ser alcançável por Tab em separado) ou envolvê-lo num `<label
className="sr-only">Selecionar arquivos</label>`.

### C. `aria-describedby` do erro de "Tipo de sinistro" está no container do grupo, não no item focado
`page.tsx:524-533`:
```tsx
<RadioGroup
  value={tipo}
  onValueChange={...}
  aria-invalid={!!erroTipo}
  aria-describedby={erroTipo ? "tipo-sinistro-erro" : undefined}
>
```
O Radix `RadioGroup` usa "roving tabindex": só o item selecionado (ou o
primeiro, se nenhum selecionado) fica no fluxo de Tab — o `role="group"`/
`radiogroup` em si nunca recebe foco diretamente. `aria-describedby`
setado no container tende a não ser lido pela maioria dos leitores de
tela quando o foco está num `RadioGroupItem` filho (eles anunciam a
descrição do elemento *focado*, não a de um ancestral não focado). Na
prática, ao clicar "Avançar" com "Tipo de sinistro" vazio, o foco vai
para o primeiro `RadioGroupItem` (`tipoRef`, `page.tsx:198-199`), mas a
mensagem de erro "Selecione o tipo de sinistro." pode não ser anunciada
automaticamente — só fica visível para quem enxerga a tela. Isso mitiga
parcialmente o próprio objetivo do item 3/4 da spec ("erro de validação
não só por cor"). Sugestão: replicar o `aria-describedby` também no(s)
`RadioGroupItem`(s), ou garantir que o `FieldError` seja o próximo
elemento no DOM logo após o item focado (já é, `page.tsx:552-556`) — o
que ajuda leitura sequencial, mas não a associação direta por
`aria-describedby`.

### D. Texto de apoio "Documentos sugeridos..." infla o nome acessível da dropzone
`page.tsx:665-671`:
```tsx
<CloudUploadIcon className="text-foreground" />
<p>Arraste arquivos aqui ou clique para selecionar</p>
<p className="text-xs">
  Documentos sugeridos: boletim de ocorrência, fotos
  do ocorrido, nota fiscal
</p>
<input ... />
```
Ambos os parágrafos estão **dentro** do `div[role="button"]`. Como o
`div` não tem `aria-label` próprio, seu nome acessível é calculado a
partir do conteúdo textual de todos os descendentes — ou seja, toda vez
que o foco chega na dropzone (ou um leitor de tela a lê em modo de
navegação), o nome anunciado é a concatenação das duas frases, incluindo
a lista de documentos sugeridos, que a própria spec descreve como "texto
de apoio... **abaixo** da dropzone" (`novo-sinistro.md`, linha 129) — ou
seja, a intenção era esse texto ficar fora do controle interativo, só
como orientação visual/lida separadamente. Não é um erro de WCAG por si
só (nome verboso não é falha automática), mas é uma divergência real do
que a própria spec pediu e piora a experiência de quem usa leitor de
tela (ouve uma frase longa a cada vez que tabula até a dropzone, várias
vezes por sessão de anexação). Sugestão: mover o segundo `<p>` para fora
do `div[role="button"]`, como um irmão logo abaixo.

### E. `AlertDialog` de confirmação é controlado por estado, sem `AlertDialogTrigger`
`page.tsx:876-893` usa `<AlertDialog open={confirmOpen}
onOpenChange={setConfirmOpen}>` sem `AlertDialogTrigger` — a abertura
acontece via `setConfirmOpen(true)` dentro de `handleSubmit`
(`page.tsx:340`), diferente da composição sugerida pela spec (linhas
144-147 de `novo-sinistro.md`, que envolve o botão "Enviar sinistro" num
`AlertDialogTrigger asChild`). Isso é **funcionalmente equivalente** para
o retorno de foco (o `FocusScope` do Radix restaura o foco para o
elemento que estava ativo — o botão "Enviar sinistro" — no momento em
que o diálogo abriu, independente de usar `Trigger` ou abertura
controlada), então não deveria quebrar o item 11 da spec na prática. Mas
é uma divergência do mecanismo documentado que remove o
`aria-haspopup`/`aria-expanded`/`aria-controls` automáticos que o
`AlertDialogTrigger` do Radix adicionaria ao botão — uma perda pequena de
contexto anunciado ("abre um diálogo") antes do clique. Não é um code
smell que bloqueie a tela, mas recomendo confirmar com teste manual de
leitor de tela (fora do escopo desta auditoria estática) que o foco
realmente retorna ao botão "Enviar sinistro" ao cancelar.

---

## Conclusão

A tela está bem construída em relação à própria spec — 15/19 itens
numerados passam sem ressalva, e dois deles (restrição de data futura via
`Calendar disabled`, correção do `preventDefault` no Espaço da dropzone)
vão além do mínimo pedido. Os 4 achados reais (A–D) são majoritariamente
**gaps sistêmicos herdados de Patterns/exemplos já catalogados**
(`field-radio.tsx`, `upload.tsx`) — não bugs introduzidos por esta tela —
mas afetam a experiência real de navegação por teclado/leitor de tela
nesta composição específica (etapa "Tipo de sinistro" e etapa "Anexar
documentos"). Vale levar ao Rafael como um item de backlog transversal
("corrigir na fonte", nos Patterns, pra beneficiar todas as telas que os
reaproveitam), não só nesta tela. O achado E é uma nota de verificação
manual, não uma falha confirmada.
