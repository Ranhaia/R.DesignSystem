---
slug: attachment
nome: Attachment
camada: molecule
codigo: src/components/ui/attachment.tsx
story: src/components/ui/attachment.stories.tsx
status: piloto
sinonimos: [anexo, arquivo-anexado]
vizinhos: [file-uploader, thumbnail, card]
referencias: [shadcn:attachment, spec:attachment]
---

# Attachment

Exibe um anexo de arquivo ou mídia com metadados, miniatura, estado de processamento e ações rápidas. Representa arquivos já selecionados ou enviados em formulários e conversas.

## Quando usar

- Exibição de arquivos vinculados a uma mensagem de chat ou comentário.
- Lista de documentos anexados em um formulário de solicitação ou sinistro.
- Pré-visualização de imagem ou PDF com opção de download e exclusão.

## Quando NÃO usar

- Área interativa para selecionar ou soltar arquivos do dispositivo → `file-uploader`.
- Apenas miniatura visual ou avatar de mídia sem metadados de arquivo → `thumbnail`.
- Cartão com conteúdo estruturado amplo e múltiplos blocos de texto → `card`.

## Anatomia

| Parte | O que é |
|---|---|
| `Attachment` | Raiz com `data-slot="attachment"`, agrupa mídia, conteúdo textual e ações em layout flexível. |
| `AttachmentMedia` | Contêiner quadrado com `data-slot="attachment-media"` para exibir ícone do tipo de arquivo ou imagem de pré-visualização. |
| `AttachmentContent` | Área de texto com `data-slot="attachment-content"` contendo título e descrição do arquivo. |
| `AttachmentTitle` | Nome do arquivo com `data-slot="attachment-title"`, exibido em negrito médio com truncamento. |
| `AttachmentDescription` | Metadados do anexo com `data-slot="attachment-description"`, como tamanho ou mensagem de erro. |
| `AttachmentActions` | Contêiner de botões de ação rápida com `data-slot="attachment-actions"`. |
| `AttachmentAction` | Botão de ação pontual com `data-slot="attachment-action"`, padrão `variant="ghost"` e tamanho `icon-xs`. |
| `AttachmentTrigger` | Gatilho clicável com `data-slot="attachment-trigger"`, cobrindo o cartão para ações primárias. |
| `AttachmentGroup` | Contêiner horizontal com `data-slot="attachment-group"` para rolar múltiplos anexos com rolagem suave. |

## Composição

Usa: [`button`](button.md).

## Props

| Prop | Tipo | Padrão | O que faz |
|---|---|---|---|
| `size` | `default` · `sm` · `xs` | `default` | Escala do cartão, ajustando preenchimento, tipografia e tamanho da mídia |
| `orientation` | `horizontal` · `vertical` | `horizontal` | Direção do layout dos elementos internos |
| `state` | `idle` · `uploading` · `processing` · `error` · `done` | `done` | Estado de carregamento ou conclusão do arquivo |
| `variant` (AttachmentMedia) | `icon` · `image` | `icon` | Formato da mídia exibida entre ícone de tipo ou miniatura de imagem |
| `size` (AttachmentAction) | `icon-xs` · `icon-sm` · `icon` | `icon-xs` | Tamanho do botão de ação herdado de Button |
| `asChild` (AttachmentTrigger) | `boolean` | `false` | Delega a renderização para o elemento filho |

## Variantes

| Valor | Quando usar |
|---|---|
| `icon` | Documentos em geral como relatórios ou planilhas identificados por ícone |
| `image` | Fotos, ilustrações ou mídias visuais com miniatura recortada |

## Tamanhos

| Valor | Medida | Quando usar |
|---|---|---|
| `default` | — | Padrão para formulários e telas principais de detalhes |
| `sm` | — | Caixas de comentários e áreas laterais compactas |
| `xs` | — | Linhas densas em tabelas e campos compactos de mensagens |

## Estados

| Estado | Como aparece |
|---|---|
| Padrão (`done`) | Borda sólida com fundo de cartão e miniatura totalmente opaca |
| `idle` | Borda tracejada (`border-dashed`), indicando arquivo pronto para upload |
| `uploading` / `processing` | Efeito `shimmer` animado no título e opacidade reduzida na miniatura |
| `error` | Borda vermelha com `border-destructive/30` e texto de erro em `text-destructive` |
| Foco | Anel sutil com `focus-within:ring-1 focus-within:ring-ring` quando o gatilho recebe foco |

## Conteúdo

- O título deve exibir o nome original do arquivo com extensão: "relatorio-anual.pdf".
- A descrição deve informar o tamanho em formato legível ("2,4 MB") ou o status ("Enviando...").
- Em caso de falha, use uma descrição clara do problema: "Arquivo excede 10 MB".

## Acessibilidade

- **Teclado:** Ao usar `AttachmentTrigger`, o cartão inteiro é focável via Tab e ativado com Enter ou Espaço. As ações em `AttachmentActions` recebem foco individual na sequência.
- **Leitor de tela:** Informar o nome e tamanho do anexo via rótulo acessível no `AttachmentTrigger` ou descrição ligada via `aria-describedby`.
- **Foco:** O anel de foco `focus-within` envolve o cartão quando um elemento interno recebe foco.
- **Cuidados:** Botões em `AttachmentAction` que usam apenas ícones devem obrigatoriamente incluir `aria-label` descritivo (ex.: "Remover anexo").

## Tokens usados

- **Cor:** `bg-card` `bg-destructive` `bg-muted` `border-destructive`
  `text-card-foreground` `text-destructive` `text-foreground`
  `text-muted-foreground`
- **Tipografia:** `font-medium` `leading-tight` `text-sm` `text-xs`
- **Espaço:** `gap-1` `gap-1.5` `gap-2` `gap-2.5` `gap-3` `inset-0`
  `min-w-0` `min-w-40` `mt-0.5` `p-1` `p-1.5` `p-2` `px-1` `px-1.5`
  `px-2` `px-2.5` `py-1` `py-1.5` `py-2` `right-3` `size-3.5` `size-4`
  `size-6` `top-3` `w-10` `w-24` `w-30` `w-7` `w-8`
- **Raio:** `rounded-lg` `rounded-md` `rounded-xl`
- **Foco:** `ring-ring`

## Faça

- Mostre a extensão do arquivo e o tamanho formatado para orientar a pessoa usuária.
- Forneça ações claras como pré-visualizar ou remover quando permitido.
- Agrupe múltiplos anexos utilizando `AttachmentGroup` para manter rolagem horizontal organizada.

## NÃO faça

- Omitir `aria-label` nos botões de ação rápida com apenas ícone → passe `aria-label` explícito em `AttachmentAction`.
- Usar anexo vertical em espaços horizontais estreitos sem altura suficiente → use orientação `horizontal`.
- Deixar nomes longos quebrarem o layout → mantenha o truncamento padrão do `AttachmentTitle`.

## Exemplo mínimo

```tsx
import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
import { Icon } from "@/components/ui/icon"

<Attachment>
  <AttachmentMedia>
    <Icon name="description" />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>documento.pdf</AttachmentTitle>
    <AttachmentDescription>1,2 MB</AttachmentDescription>
  </AttachmentContent>
</Attachment>
```
