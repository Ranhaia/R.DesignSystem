# Spec — File Uploader (Atom)

Status: especificação + implementação.
Parente mais próximo (definido em `PLANO-LOOP-80-20-TEMPLATES.md`, Fase 6.1,
linha 278): Input (`src/components/ui/input.tsx`) + o Pattern "Upload" já
existente (`src/components/patterns/upload.tsx`), que já implementa a
experiência completa (drag-and-drop, lista de arquivos, progresso) usando
peças soltas. File Uploader é o átomo formal e reutilizável que esse Pattern
deveria estar usando por baixo — só a ZONA de captura de arquivo, sem
reimplementar lista/progresso (isso continua sendo papel do
Pattern/Attachment).

---

## Fonte(s) consultada(s)

Fontes acessadas de verdade nesta sessão (todas públicas):

1. **`@nimbus-ds/file-uploader` — README publicado**
   `https://unpkg.com/@nimbus-ds/file-uploader/README.md`
   → descrição ("a box with a plus icon and an optional label"), proporções
   suportadas (1:1, 4:3, 3:4, 16:9, 9:16, 2:1, 1:2, flexível), casos de uso
   (recibo de pagamento, imagem de produto, planilha de dados de produto),
   componente relacionado (Thumbnail).
2. **`@nimbus-ds/file-uploader` — arquivo de tipos publicado**
   `https://unpkg.com/@nimbus-ds/file-uploader/dist/index.d.ts`
   → API real: `FileUploaderProps` (estende `InputHTMLAttributes<HTMLInputElement>`
   + `FileUploaderProperties`: `placeholder`, `accept`, `height`, `width`,
   `aspectRatio`, `flexDirection`, `onDrop`, `onDropReject`, `onDropSuccess`,
   `onError`, `children`, `dragOverlay`, `disableClickUpload`, `asOverlay`),
   subcomponentes estáticos `FileUploader.Skeleton` e `FileUploader.Overlay`.
3. **`@nimbus-ds/file-uploader` — bundle JS compilado**
   `https://unpkg.com/@nimbus-ds/file-uploader/dist/index.js`
   → confirma na implementação real: `aria-label="File drop zone"` +
   `role="region"` no overlay de arrastar; `<input type="file">` nativo por
   baixo do drop zone; nenhum `onKeyDown` customizado (depende do suporte
   nativo de teclado do `<input type="file">`, mesma decisão tomada aqui);
   `accept` default `"image/jpeg,image/gif,image/png"`; ícone
   `PlusCircleIcon` tamanho 20; `data-testid`s
   (`file-uploader-container`/`file-uploader-overlay`/
   `file-uploader-skeleton-container`).
4. **Doc pública do site Nimbus**
   `https://nimbus.nuvemshop.com.br/documentation/atomic-components/file-uploader`
   → confirma descrição, "when to use" e anatomia em prosa, sem tabela de
   props adicional além do typedef.
5. **Precedente interno já existente e validado neste projeto** (não é
   fonte externa, mas é o comportamento real já revisado por Rafael):
   `src/components/patterns/upload.tsx` — já implementa `<input type="file">`
   real com `sr-only`, `onDrop`/`onDragOver`/`onDragLeave`, e um wrapper
   decorativo com `role="button"` + `tabIndex` + handler de teclado próprio
   (Enter/Espaço) ao lado do input escondido.
6. `src/components/ui/chip.tsx` e `src/components/ui/input.tsx` — padrão de
   código (data-slot, `cn`, tokens semânticos, ausência de cor fixa).
7. `src/lib/component-docs.ts` (entradas `button`, `chip`) e
   `src/lib/pattern-docs.ts` (entrada `upload`) — formato exato de saída
   exigido e para não contradizer a acessibilidade já documentada do
   Pattern.

**Não encontrado / não assumido:** o typedef real do Nimbus não expõe uma
prop `maxSize` (validação de tamanho não é responsabilidade do
`FileUploader` da Nimbus — fica a cargo de quem consome `onDropReject`
combinado com lógica própria). A prop `maxSize`/`onFilesRejected` deste
átomo é uma decisão provisória deste projeto (ver seção Props), não
sourced do Nimbus — pedida explicitamente no escopo desta tarefa
("props accept/multiple/maxSize/onFilesSelected").

---

## Decisão de anatomia: por que o root é um único `<label>`

O Pattern `upload.tsx` (fonte 5) usa **dois** elementos interativos
sobrepostos: uma `<div role="button" tabIndex={0}>` decorativa com handler
de teclado próprio (`onKeyDown` para Enter/Espaço chamando
`inputRef.current?.click()`) e, dentro dela, um `<input type="file"
className="sr-only">` separado. Funciona, mas duplica a superfície de
interação (dois alvos focáveis fazendo a mesma coisa, um dependendo de
JS pra teclado).

O bundle real do Nimbus (fonte 3) também não usa handler de teclado
customizado — depende do suporte nativo do `<input type="file">`. Esta
implementação segue a mesma ideia, mas resolve a associação com
**um único elemento raiz**: um `<label htmlFor={id}>` envolvendo o texto
visível + `<input id={id} type="file" className="sr-only">`. Resultado:

- Um clique em qualquer parte do label (inclusive fora do input) abre o
  seletor de arquivo — comportamento nativo de `<label>`, sem JS.
- `Tab` foca o `<input>` (não o label) e `Enter`/`Espaço` abrem o seletor —
  comportamento nativo de `<input type="file">`, sem handler de teclado
  customizado.
- Drag-and-drop (`onDrop`/`onDragOver`/`onDragLeave`) fica nos mesmos
  handlers do `<label>`, como reforço visual — mesma ideia do Pattern,
  arrastar não é a única forma de anexar.

---

## Composição

Export único: **`FileUploader`** (mesmo padrão de export único de `Chip` e
`Badge`). Sem subcomponentes de composição — diferente do Nimbus, que
expõe `FileUploader.Skeleton` e `FileUploader.Overlay` (fonte 2). Não
implementados aqui porque fogem do escopo desta tarefa (o átomo é só a
zona de captura; lista/progresso continuam sendo papel do
Pattern/Attachment) — registrar depois se Rafael quiser paridade.

Entrada esperada em `composition-registry.ts`:
```ts
"file-uploader": ["FileUploader"],
```

---

## Descrição

*(traduzido do README oficial do `@nimbus-ds/file-uploader`, fonte 1)*

O File Uploader é um componente para receber arquivos por upload — uma
caixa com um ícone e um rótulo opcional.

## Quando utilizar

*(traduzido da doc pública Nimbus, fonte 4, adaptado ao contexto de seguros
deste projeto)*

- Receber comprovantes/recibos anexados pelo usuário.
- Receber imagens (ex.: fotos de sinistro, documentos digitalizados).
- Receber planilhas ou outros arquivos de dados.

## Anatomia

| Parte | Descrição |
|---|---|
| Elemento raiz | Um `<label>` com `data-slot="file-uploader"`, `data-dragging` e `data-disabled`. Recebe os handlers de drag-and-drop (`onDragOver`/`onDragLeave`/`onDrop`) como reforço visual — não é a única forma de anexar. |
| Ícone | `<Icon name="cloud_upload" />` — mesmo ícone já confirmado em uso real no Pattern Upload (`src/components/patterns/upload.tsx`) e em `src/app/templates/novo-sinistro/page.tsx`. |
| Texto | Rótulo visível explicando a ação (prop `label`, default "Arraste um arquivo ou clique para selecionar"). |
| Input nativo | `<input type="file">` real, associado ao label via `htmlFor`/`id`, visualmente escondido com `sr-only` (nunca `display:none`) mas focável e navegável por teclado — herda toda a acessibilidade nativa do elemento. |

---

## Variantes

Nenhuma. O Nimbus real não expõe enum de variante visual para
`FileUploader` (fonte 2) — só props de dimensão/proporção
(`aspectRatio`, `width`, `height`), que não fazem sentido para uma zona de
drop de largura flexível dentro deste catálogo (o átomo aqui é pensado
para ocupar a largura do container, como o Pattern já faz). Não
inventada uma escala de variante.

## Tamanhos

Nenhum. Mesmo raciocínio de `variants` acima — o Nimbus usa `width`/
`height`/`aspectRatio` livres (não uma escala fixa tipo sm/md/lg), e este
átomo não reproduz esse controle fino porque foge do escopo (zona de
drop de formulário, não thumbnail de galeria). Se Rafael quiser paridade
com o uso de galeria do Nimbus, é decisão dele, registrar depois.

## Estados

| Estado | Descrição |
|---|---|
| Default | Estado de repouso, borda tracejada. |
| Dragging | `data-dragging` verdadeiro enquanto um arquivo é arrastado sobre a zona — borda e fundo usam `--primary`. |
| Focus | O `<input>` real recebe foco de teclado (`Tab`); o anel de foco (`focus-visible:ring`, mesma régua do `Input`) é aplicado ao `<label>` via `has-[:focus-visible]`. |
| Disabled | prop `disabled` — desativa o `<input>` nativamente, remove do fluxo de clique/drag (`pointer-events-none`) e reduz a opacidade. |

---

## Props

| Nome | Tipo | Default | Descrição |
|---|---|---|---|
| `label` | `string` | `"Arraste um arquivo ou clique para selecionar"` | Texto visível dentro da zona de drop, explicando a ação (satisfaz a exigência de a11y do enunciado: aria-label OU texto visível — aqui é texto visível). |
| `accept` | `string` | — | Repassado direto ao `<input type="file">` nativo. Mesmo nome/papel da prop `accept` do Nimbus (fonte 2). |
| `multiple` | `boolean` | `false` | Repassado direto ao `<input>` nativo. Default `false` (diverge do Pattern, que sempre usa `multiple` — aqui fica explícito por chamada, mais seguro como default de átomo genérico). |
| `maxSize` | `number` | — | Tamanho máximo aceito por arquivo, em bytes. **Decisão provisória, sem paralelo direto no Nimbus** (ver seção "Não encontrado" acima) — pedida explicitamente no escopo desta tarefa. Sem limite quando ausente. |
| `onFilesSelected` | `(files: File[]) => void` | — | Chamado com os arquivos aceitos (dentro do limite de `maxSize`, quando informado). Nome próprio deste projeto — equivalente em espírito ao `onDropSuccess`/`onDrop` do Nimbus (fonte 2), mas único callback tanto para clique quanto para drop (mais simples, já que a origem do arquivo não muda o que o chamador precisa fazer). |
| `onFilesRejected` | `(files: File[]) => void` | — | Chamado com os arquivos que excederam `maxSize`. Só dispara quando `maxSize` é informado. Equivalente em espírito ao `onDropReject` do Nimbus (fonte 2), mas aplicado tanto a clique quanto a drop. |
| `disabled` | `boolean` | `false` | Desativa o `<input>` nativamente e bloqueia clique/drag. |
| `id` | `string` | auto-gerado via `React.useId()` | Associa `<label htmlFor>` ao `<input id>`. Só precisa ser passado manualmente se o chamador precisar referenciar o id de fora. |
| `...props` | `React.ComponentProps<"input">` (exceto `type`/`onChange`/`id`) | — | Demais atributos nativos repassados ao `<input type="file">` (ex.: `name`, `required`, `capture`, `aria-describedby`). |

---

## Acessibilidade mínima exigida

- **`<input type="file">` real por baixo** — nunca upload simulado. Herda
  de graça toda a navegação por teclado e leitura de tela de um input
  nativo.
- **Nunca `display:none` puro** — o input usa a classe `sr-only` (mesmo
  padrão já em uso no Pattern Upload, `src/components/patterns/upload.tsx`,
  linha 87), que remove visualmente mas mantém no fluxo de foco/leitor de
  tela.
- **Label associado corretamente** — `<input id={resolvedId}>` dentro de
  `<label htmlFor={resolvedId}>` (dupla garantia: funciona tanto pela
  aninhagem quanto pelo atributo, redundante de propósito).
- **Texto visível explicando a ação** — prop `label`, sempre renderizada
  como `<span>` dentro do `<label>`, satisfaz a exigência sem depender só
  de `aria-label`.
- **Foco visível** — `has-[:focus-visible]:border-ring` +
  `has-[:focus-visible]:ring-[3px]` no `<label>`, mesma régua de token do
  `Input` (`focus-visible:ring-ring/50`).
- **Arrastar não é a única forma de anexar** — clique/teclado no
  `<label>`/`<input>` sempre funcionam, independente de drag-and-drop
  (mesma garantia documentada em `pattern-docs.ts`, entrada `upload`).

---

## Código de exemplo

```tsx
import { FileUploader } from "@/components/ui/file-uploader"

// Uso simples, um arquivo
<FileUploader onFilesSelected={(files) => console.log(files)} />

// Múltiplos arquivos, tipo restrito
<FileUploader
  multiple
  accept="image/*"
  label="Arraste uma imagem ou clique para selecionar"
  onFilesSelected={(files) => console.log(files)}
/>

// Com limite de tamanho
<FileUploader
  maxSize={5 * 1024 * 1024}
  onFilesSelected={(files) => console.log("aceitos", files)}
  onFilesRejected={(files) => console.log("rejeitados (muito grandes)", files)}
/>
```

---

## Boas práticas / Evite

```ts
doGuidelines: ["[a preencher]"]
dontGuidelines: ["[a preencher]"]
```

(Conteúdo narrativo — fica para Rafael escrever depois, regra fixa do
projeto desde a Fase 0. Não preenchido com texto inventado.)
